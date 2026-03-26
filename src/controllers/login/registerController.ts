import { login } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { getCities, getDistricts } from "../../models/locationsModel.ts";
import { addUser } from "../../models/userModel.ts";
import { registerView } from "../../views/login/registerView.ts";

export const registerController = (ctx: Context) => {
    const { errors } = ctx;
    const cities = getCities();
    const districts = getDistricts();
    return render(registerView(cities, districts, errors), ctx);
}

export const registerPostController = async (ctx: Context, next) => {
    const { headers, isValid, validated } = ctx;
    
    if (!isValid || validated.password != validated.confirmPassword) 
        return next(ctx);

    const city = getDistricts().find(dist => {
        return (dist.district == validated.citydistrict);
    });

    // TODO: dont redirect and return with error
    if (!city) return redirect(headers, "/", `An error occured.`); 

    await addUser({
        username: validated.username, 
        password: validated.password, 
        access: "normal",
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        phoneNo: validated.phone,
        city: city.city,
        district: validated.district,
        street: validated.street,
        roomNo: validated.roomNo
    });

    login(headers, validated.username);
    return redirect(headers, "/", `Created user \"${validated.username}\" and logged in.`);

}