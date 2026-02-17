import render from "../app/render.js";
import loginView from "../views/loginView.js";

const loginController = () => {
    return render(loginView());
}

export default loginController;