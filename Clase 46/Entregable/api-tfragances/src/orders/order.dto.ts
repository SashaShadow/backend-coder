import { CreatedProduct } from "src/carts/cart.dto";

export interface OrderFormat {
    readonly products: CreatedProduct[];
    readonly total: number;
    readonly orderNo: string;
    readonly id: string; 
}

export interface Client {
    readonly username: string;
    readonly email: string;
    readonly name: string;
    readonly phone: number;
    readonly address: string;
    readonly id: string; 
}

export class CreateOrderDTO {
    readonly client: Client;
    readonly order: OrderFormat;
    readonly owner: string;
}