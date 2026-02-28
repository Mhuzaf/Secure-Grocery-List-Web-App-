import render from "../app/render.ts";
import notFoundView from "../views/notFoundView.ts";

const notFoundController = () => {
    return render(notFoundView(), 404);
}

export default notFoundController;