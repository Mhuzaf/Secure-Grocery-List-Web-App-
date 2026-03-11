import { login } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import { validateSchema } from "../../app/validation.ts";
import { SessionProps } from "../../models/sessionsModel.ts";
import { addUser } from "../../models/userModel.ts";
import { userRegisterSchema } from "../../schema/userSchema.ts";
import { registerView } from "../../views/loginView.ts";

export const registerController = (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    return render(registerView(), ctx);
}

export const registerPostController = async (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    const { request, headers } = ctx;
    const formData = await request.formData();
    
    const { isValid, errors, validated } = validateSchema(formData, userRegisterSchema);

    if (!isValid) {
        return render(registerView(errors), ctx, 400);
    }

    console.log(validated);
    await addUser({
        username: validated.username, 
        password: validated.password, 
        access: "normal",
        email: validated.email,
        phoneNo: validated.phone,
        city: "test city",
        street: "test street",
        roomNo: "123"
    });

    login(headers, validated.username);
    return redirect(headers, "/", `Created user \"${validated.username}\"`);

}