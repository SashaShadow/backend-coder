import { buildSchema } from 'graphql';
import { productType } from "./types/product.type.js";
import { productInput } from "./inputs/product.input.js";
import { productQueries } from './queries/product.queries.js';
import { productMutation } from "./mutations/product.mutation.js";
import { cartType } from "./types/cart.type.js";
import { cartInput } from "./inputs/cart.input.js";
import { cartQueries } from "./queries/cart.queries.js";
import { cartMutation } from "./mutations/cart.mutation.js";
import { messageType } from "./types/message.type.js";
import { messageInput } from "./inputs/message.input.js";
import { messageQueries } from "./queries/message.queries.js";
import { messageMutation } from "./mutations/message.mutation.js";
import { orderType } from "./types/order.type.js";
import { orderInput } from "./inputs/order.input.js";
import { orderQueries } from "./queries/order.queries.js";
import { orderMutation } from "./mutations/order.mutation.js";

export const Schema = buildSchema(`
  ${productType}
  ${cartType}
  ${messageType}
  ${orderType}

  ${productInput}
  ${messageInput}
  ${orderInput}

  type Query {
    ${productQueries}
    ${cartQueries}
    ${messageQueries}
    ${orderQueries}
  }
  type Mutation {
   ${productMutation}
   ${cartMutation}
   ${messageMutation}
   ${orderMutation}
  }
`);