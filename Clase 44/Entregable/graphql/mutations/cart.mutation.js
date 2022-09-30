export const cartMutation = `
addToCart(product: CreatedProductInput!, ownerId: ID!): Product,
deleteCart(id: ID!): Cart,
deleteCartProd(ownerId: ID!, prodId: ID!): Product`