import { login } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { validateSchema } from "../../app/validation.ts";
import { getCities, getDistricts } from "../../models/locationsModel.ts";
import { addUser } from "../../models/userModel.ts";
import { userRegisterSchema } from "../../schema/userSchema.ts";
import { registerView } from "../../views/loginView.ts";

export const registerController = (ctx: Context) => {
    const cities = getCities();
    const districts = getDistricts();
    return render(registerView(cities, districts), ctx);
}

export const registerPostController = async (ctx: Context) => {
    const { request, headers } = ctx;
    const formData = await request.formData();
    
    const { isValid, errors, validated } = validateSchema("register", formData, userRegisterSchema);

    if (!isValid) {
        return render(registerView(getCities(), getDistricts(), errors), ctx, 400);
    } else if (validated.password != validated.confirmPassword) {
        return redirect(headers, "/register", `An error occured.`);
    }

    // TODO: validate this stronger
    const city = getDistricts().find(dist => {
        return (dist.district == validated.citydistrict);
    });

    if (!city) return redirect(headers, "/register", `An error occured.`); 

    await addUser({
        username: validated.username, 
        password: validated.password, 
        access: "normal",
        email: validated.email,
        phoneNo: validated.phone,
        city: city.city,
        district: validated.district,
        street: validated.street,
        roomNo: validated.roomNo
    });

    login(headers, validated.username);
    return redirect(headers, "/register", `Created user \"${validated.username}\" and logged in.`);

}