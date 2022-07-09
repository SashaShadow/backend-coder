const blog = {
    Id:"999",
    posts:[
    {
    id:"123",author:{id:"1",nombre:"Pablo",apellido:"Perez",DNI:"20442654",direccion:"CABA 123",telefono:"1567876547"},title:"My awesome blog post",comments:[{id:"324",commenter:{id:"2",nombre:"Nicole",apellido:"Gonzalez",DNI:"20442638",direccion:"CABA 456",telefono:"1567811543"}},{id:"325",commenter:{id:"3",nombre:"Pedro",apellido:"Mei",DNI:"20446938",direccion:"CABA 789",telefono:"1567291542"}}]
    },
    {
    id:"1123",author:{id:"2",nombre:"Nicole",apellido:"Gonzalez",DNI:"20442638",direccion:"CABA 456",telefono:"1567811543"},title:"My awesome blog post",comments:[{id:"1324",commenter:{id:"1",nombre:"Pablo",apellido:"Perez",DNI:"20442654",direccion:"CABA 123",telefono:"1567876547"}},{id:"1325",commenter:{id:"3",nombre:"Pedro",apellido:"Mei",DNI:"20446938",direccion:"CABA 789",telefono:"1567291542"}}]
    },
    {
    id:"2123",author:{id:"3",nombre:"Pedro",apellido:"Mei",DNI:"20446938",direccion:"CABA 789",telefono:"1567291542"},title:"My awesome blog post",comments:[{id:"2324",commenter:{id:"2",nombre:"Nicole",apellido:"Gonzalez",DNI:"20442638",direccion:"CABA 456",telefono:"1567811543"}},{id:"2325",commenter:{id:"1",nombre:"Pablo",apellido:"Perez",DNI:"20442654",direccion:"CABA 123",telefono:"1567876547"}}]
    }
    ]
 }


import { normalize, denormalize, schema } from 'normalizr';
import util from 'util';

const print = (obj) => {
 console.log(util.inspect(obj, false, 12, true))
}

//Definimos un esquema para usuarios (autores y comentadores)
const userSchema = new schema.Entity('users')

// Definimos un esquema de comentarios
const commentSchema = new schema.Entity('comments', {
 commenter: userSchema
})

// Definimos un esquema de posts
const postSchema = new schema.Entity('posts', {
 author: userSchema,
 comments: [ commentSchema ]
})

// Definimos el esquema del blog
const blogSchema = new schema.Entity('blog', {
 posts: [ postSchema ]
})


console.log(JSON.stringify(blog).length)

// console.log('===== OBJETO ORIGINAL =====')
// console.log(JSON.stringify(blog).length)
// print(blog)

// console.log('===== OBJETO NORMALIZADO =====')
// const normalizedBlog = normalize(blog, blogSchema)
// console.log(JSON.stringify(normalizedBlog).length)
// print(normalizedBlog)


// console.log('===== OBJETO DENORMALIZADO =====')
// const denormalizedBlog = denormalize(normalizedBlog.result, blogSchema, normalizedBlog.entities)
// console.log(JSON.stringify(denormalizedBlog).length)
// print(denormalizedBlog)

