import render from "../app/render.ts";
import loginView from "../views/loginView.ts";

const loginController = () => {
    return render(loginView());
}

export default loginController;