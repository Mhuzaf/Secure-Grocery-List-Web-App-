import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import Routes from "../../app/routes.ts";
import { validateSchema } from "../../app/validation.ts";
import { userLoginSchema } from "../../schema/userSchema.ts";
import { loginView } from "../../views/loginView.ts";

export const loginController = ({ request } : { request: Request }) => {
    return render(loginView(), request);
}

export const loginPostController = async ({ request } : { request: Request }) => {
    const formData = await request.formData();
    
    const { isValid, errors } = validateSchema(formData, userLoginSchema);

    if (!isValid) {
        return render(loginView(errors), request, 400);
    }

    const username = formData.get("username");
    const password = formData.get("password");

    // TODO: replace with validation.js
    const validCredentials = true;
    const headers = new Headers();
    
    if (validCredentials) {
        console.log(username, password);

        return redirect(headers, Routes.HOME.route, `Logged in as ${username}`);
    }
}