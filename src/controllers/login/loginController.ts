import { login } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { validateSchema } from "../../app/validation.ts";
import { checkCredentials } from "../../models/userModel.ts";
import { userLoginSchema } from "../../schema/userSchema.ts";
import { loginView } from "../../views/loginView.ts";

export const loginController = (ctx: Context) => {
    return render(loginView(), ctx);
}

export const loginPostController = async (ctx: Context) => {
    const { request, headers } = ctx;
    const formData = await request.formData();
    
    const { isValid, errors, validated } = validateSchema(formData, userLoginSchema);

    if (!isValid) {
        return render(loginView(errors), ctx, 400);
    }

    const validCredentials = await checkCredentials(validated.username, validated.password);
    
    if (!validCredentials) {
        return redirect(headers, "/login", `Invalid credentials.`);
    }

    login(headers, validated.username);
    return redirect(headers, "/", `Logged in as ${validated.username}`);
}