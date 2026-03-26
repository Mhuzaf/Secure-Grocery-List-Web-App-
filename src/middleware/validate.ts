import { Context } from "../app/router.ts";
import { validateSchema } from "../app/validation.ts";

export const validate = (formName: string, schema) => {
    return async (ctx: Context, next) => {
        const { request } = ctx;
        const formData = await request.formData();
        const validation = validateSchema(formName, formData, schema);
        if (!validation.isValid) {
            console.log(validation);
            ctx.status = 400;
        }
            
        return next({...ctx, ...validation});
    };
}