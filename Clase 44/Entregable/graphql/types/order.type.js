export const orderType = `
    type Client {
        username: String,
        email: String,
        name: String,
        phone: Int, 
        address: String,
    }
    type OrderContent {
        products: [Product],
        total: Int,
        orderNo: String,
    }
    type Order {
        id: ID!
        client: Client!,
        order: OrderContent,
        owner: String,
    }`;
