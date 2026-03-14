import { login } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { validateSchema } from "../../app/validation.ts";
import { addUser } from "../../models/userModel.ts";
import { userRegisterSchema } from "../../schema/userSchema.ts";
import { registerView } from "../../views/loginView.ts";

export const registerController = (ctx: Context) => {
    return render(registerView(), ctx);
}

export const registerPostController = async (ctx: Context) => {
    const { request, headers } = ctx;
    const formData = await request.formData();
    
    const { isValid, errors, validated } = validateSchema("register", formData, userRegisterSchema);

    if (!isValid) {
        return render(registerView(errors), ctx, 400);
    }

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
    return redirect(headers, "/", `Created user \"${validated.username}\" and logged in.`);

}