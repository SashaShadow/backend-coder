import multer from '@koa/multer';
import { User } from '../dbmodels/dbsConfig.js';

const storage = multer.diskStorage({
    destination: (ctx, file, cb) => {
      cb(null, 'public')
    },
    filename: (ctx, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
   })

const validateData = (ctx, file, cb) => {
  const newPhone = ctx.request.body.phone;
  const newEmail = ctx.request.body.email;
  const newUser = ctx.request.body.username;
  ctx.session.fileError = '';
  
  User.findOne({$or: [{username: newUser}, {email: newEmail}, {phone: newPhone}]})
  .then(user => {
      if (user) {
          cb(null, false)
      } else if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
          cb(null, false);
          return ctx.session.fileError = 'Solo se permiten formatos .png, .jpg y .jpeg';
      }
  })
}

export const upload = multer({ storage: storage, fileFilter: (ctx, file, cb) => validateData(ctx, file, cb) });
  