export interface CreatedProduct {
    readonly name: string;
    readonly price: number;
    readonly stock: number;
    readonly photo: string;
    readonly code: string;
    readonly desc: string;
    readonly id: string; 
    quantity: number;
}

export class CreateCartDTO {
    readonly products: CreatedProduct[];
    readonly owner: string;
}