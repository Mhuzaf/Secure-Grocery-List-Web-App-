import render from "../app/render.js";
import notFoundView from "../views/notFoundView.js";

const notFoundController = () => {
    return render(notFoundView(), 404);
}

export default notFoundController;