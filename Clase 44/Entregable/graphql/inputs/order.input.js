export const orderInput = `
    input ClientInput {
        username: String!,
        email: String!,
        name: String!,
        phone: String!, 
        address: String!,
    }
    input OrderContentInput {
        products: [CreatedProductInput]!,
        total: Int!,
        orderNo: String!,
    }
    input OrderInput {
        client: ClientInput!,
        order: OrderContentInput!,
        owner: String!,
    }`;