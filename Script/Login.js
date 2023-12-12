
var Login = {

    username: null,
    password: null,
   

    Init: function () {
        this.username = document.getElementById("Navbar_username");
        this.password = document.getElementById("Navbar_password");
    },
    CustomValidation: function () {
        const usernameerror = document.getElementById("username-error");
        const passworderror = document.getElementById("password-error");


        this.username.addEventListener("keyup", () => {
            if (this.username.value == "") {
                usernameerror.innerHTML = "username should not be empty";
                usernameerror.style.color = "red";
            }
            else {
                usernameerror.innerHTML = "";
            }
        });
        this.password.addEventListener("keyup", () => {
            if (this.password.value == "") {
                passworderror.innerHTML = "password should not be empty";
                passworderror.style.color = "red";
            }
            else {
                passworderror.innerHTML = "";
            }

        });



    }
}
