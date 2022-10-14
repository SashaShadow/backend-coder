import { allColors } from '../allColors.ts';
import { Context, helpers } from '../deps.ts';

const colors: string[] = [];

const isValidColor = (newColor: string): boolean => {
    const exist = allColors.some((color: string) => color == newColor)
    return exist;
}

export const getColors = async (ctx: Context) => {
    ctx.response.status = 200;
    ctx.response.body = {colors};
}

export const createColor = async (ctx: Context) => {
    try {
        const { color } = await ctx.request.body().value;
        console.log(color);
        if (isValidColor(color)) {
            colors.push(color);
            ctx.response.status = 201;
            ctx.response.body = {message: "Color agregado", color}
        } else {
            ctx.response.status = 400;
            ctx.response.body = {error: 'El valor debe ser un string y un color css valido'}
        }   
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = {error: err}
    }
}