export const productInput = `
  input ProductoInput {
    name: String,
    price: Int,
    stock: Int,
    photo: String,
    code: String,
    desc: String
  }
  input CreatedProductInput {
    _id: ID!,
    quantity: Int,
    name: String,
    price: Int,
    stock: Int,
    photo: String,
    code: String,
    desc: String
  }`;