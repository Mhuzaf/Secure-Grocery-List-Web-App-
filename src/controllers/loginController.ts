import { render } from "../app/render.ts";
import { loginView } from "../views/loginView.ts";

export const loginController = () => {
    return render(loginView());
}