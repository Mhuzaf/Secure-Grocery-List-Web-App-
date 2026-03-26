import { login } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { checkCredentials } from "../../models/userModel.ts";
import { loginView } from "../../views/login/loginView.ts";

export const loginController = (ctx: Context) => {
    const { errors } = ctx;
    return render(loginView(errors), ctx);
}

export const loginPostController = async (ctx: Context, next) => {
    const { headers, isValid, validated } = ctx;

    if (!isValid) return next(ctx);

    const validCredentials = await checkCredentials(validated.username, validated.password);
    
    if (!validCredentials) {
        return redirect(headers, "/login", `Invalid credentials.`);
    }

    login(headers, validated.username);
    return redirect(headers, "/", `Welcome back, ${validated.username}!`);
}