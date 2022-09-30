export const productMutation = `
createProduct(product: ProductoInput): Product,
updateProduct(prodId: ID!, prodMod: ProductoInput): Product,
deleteProduct(prodId: ID!): Product,`