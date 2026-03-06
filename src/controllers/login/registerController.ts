import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import Routes from "../../app/routes.ts";
import { validateSchema } from "../../app/validation.ts";
import { userRegisterSchema } from "../../schema/userSchema.ts";
import { registerView } from "../../views/loginView.ts";

export const registerController = (request: Request) => {
    return render(registerView(), request);
}

export const registerPostController = async (request: Request) => {
    const formData = await request.formData();
    
    const { isValid, errors } = validateSchema(formData, userRegisterSchema);

    if (!isValid) {
        return render(registerView(errors), request, 400);
    }

    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    
    // TODO: replace with validation.js
    const validUser = true;
    const headers = new Headers();
    
    if (validUser) {
        console.log(username, password, email);

        return redirect(headers, Routes.HOME.route, "User Created");
    }

}