import * as bcrypt from 'bcrypt';

export const createHash = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (userPassword: string, password: string): boolean => {
  return bcrypt.compareSync(userPassword, password)
}
