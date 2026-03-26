import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { getCities, getDistricts } from "../../models/locationsModel.ts";
import { manageLocationsView } from "../../views/manage/manageLocationsView.ts";

export const manageLocationsController = (ctx: Context) => {
    const { errors } = ctx;
    return render(manageLocationsView(getCities(), getDistricts(), errors), ctx);
}