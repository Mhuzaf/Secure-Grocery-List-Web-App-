import { login } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import Routes from "../../app/routes.ts";
import { validateSchema } from "../../app/validation.ts";
import { checkCredentials } from "../../models/userModel.ts";
import { userLoginSchema } from "../../schema/userSchema.ts";
import { loginView } from "../../views/loginView.ts";

export const loginController = (request: Request ) => {
    return render(loginView(), request);
}

export const loginPostController = async (request: Request ) => {
    const formData = await request.formData();
    
    const { isValid, errors, validated } = validateSchema(formData, userLoginSchema);

    if (!isValid) {
        return render(loginView(errors), request, 400);
    }

    // TODO: replace with validation.js
    const validCredentials = await checkCredentials(validated.username, validated.password);
    const headers = new Headers();
    
    if (!validCredentials) {
        return redirect(headers, Routes.LOGIN.route, `Invalid credentials.`);
    }
    
    console.log(validated.username, validated.password);
    login(headers, validated.username);
    return redirect(headers, Routes.HOME.route, `Logged in as ${validated.username}`);
}