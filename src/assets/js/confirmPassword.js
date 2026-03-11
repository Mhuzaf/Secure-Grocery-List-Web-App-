const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm_password");

const comparePasswords = () => {
    if (password.value == confirmPass.value) {
        confirmPass.setCustomValidity("");
    } else {
        confirmPass.setCustomValidity("Must match password field");
    }
}

password.addEventListener("change", comparePasswords);
confirmPass.addEventListener("change", comparePasswords);