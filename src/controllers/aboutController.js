import render from "../app/render.js";
import aboutView from "../views/aboutView.js";

const aboutController = () => {
    return render(aboutView());
}

export default aboutController;