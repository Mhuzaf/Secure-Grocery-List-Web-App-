import render from "../app/render.ts";
import aboutView from "../views/aboutView.ts";

const aboutController = () => {
    return render(aboutView());
}

export default aboutController;