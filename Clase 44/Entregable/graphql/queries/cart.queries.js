export const cartQueries = `
    getCarts: [Cart],
    getOwnCart(id: ID!): Cart,
    getCartProducts(id : ID!): [Product]`