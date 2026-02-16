const loginView = () => {
    return `
        <form action="" id="loginForm">
            <label for="username">Username: </label>
            <br>
            <input type="text" name="uname" id="username">
            <br><br>
            <label for="password">Password: </label>
            <br>
            <input type="password" name="pw" id="password">
            <br><br>
            <input type="submit" value="Submit">
        </form>
    `;
};

export default loginView;

