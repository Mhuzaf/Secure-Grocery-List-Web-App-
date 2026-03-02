import { render } from "../../app/render.ts";
import { loginView } from "../../views/loginView.ts";

export const loginController = ({ request } : { request: Request }) => {
    return render(loginView(), request);
}