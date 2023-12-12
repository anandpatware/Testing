

var Register = {
    name: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null,

    Init: function () {
        this.name = document.getElementById("Navbar_name");

        this.username = document.getElementById("Navbar_username");
        this.email = document.getElementById("Navbar_email");
        this.password = document.getElementById("Navbar_password");
        this.confirmPassword = document.getElementById("Navbar_confirmPassword");
    },

    Check: function () {
        const data = { name: this.name.value, username: this.username.value, email: this.email.value, password: this.password.value, confirmPassword: this.confirmPassword.value };
        if (this.Validation(data)) {

            alert("F ser registered    y!!!");
            return true;
        }
        else {
            return false;
        }
    },

    Validation: function (data) {

        if (!data.name || !data.username ||! data.email || !data.password ||! data.confirmPassword) {
            alert("All fields are required");
            return false;
        }


        const nameRegex = /^[A-Za-z]+$/;

        if (!nameRegex.test(data.name)) {
            alert("name should not contain integers or special characters");
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(data.email)) {
            alert("Enter a valid email address");
            return false;
            
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

        if (!passwordRegex.test(data.password)) {
            alert("Password is not of required format!!");
            return false;
        }
        if (data.password != data.confirmPassword) {
            alert("password and condirm pqsssword not matching");
            return false;
        }
        return true;


    },


    CheckValidation: function () {

        const nameerror = document.getElementById("name-error");
        const usernameerror = document.getElementById("username-error");

        const emailerror = document.getElementById("email-error");


        const passworderror = document.getElementById("password1-error");
        const confirmpassworderror = document.getElementById("password2-error");


        const nameRegex = /^[A-Za-z]+$/;

        this.name.addEventListener("keyup", () => {
            if (this.name.value == "") {
                nameerror.innerHTML = "name should not be empty";
                nameerror.style.color = "red";
            } else if (!nameRegex.test(this.name.value)) {
                nameerror.innerHTML = "name should not contain digits";
                nameerror.style.color = "red";
            }
            else {
                nameerror.innerHTML = "";
            }
        });
        this.username.addEventListener("keyup", () => {
            if (this.username.value == "") {
                usernameerror.innerHTML = "username should not be empty";
                usernameerror.style.color = "red";
            }
            else {
                usernameerror.innerHTML = "";
            }

        });



        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.email.addEventListener("keyup", () => {
            if (!emailPattern.test(this.email.value)) {
                emailerror.innerHTML = "please enter the valid email id";
                emailerror.style.color = "red";
            }
            else {
                emailerror.innerHTML = "";
            }

        });

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
        this.password.addEventListener("keyup", () => {
            if (this.password.value == "") {
                passworderror.innerHTML = "password atleast  be of length 8";
                passworderror.style.color = "red";
            }
            else if (!passwordRegex.test(this.password.value)) {

                passworderror.innerHTML = " password should contain- atleast -one Capital letter - one small letter -one digit -one special character ";
                passworderror.style.color = "red";
            }
            else {
                passworderror.innerHTML = "password is fine";
                passworderror.style.color = "green";
            }
        });


        this.confirmPassword.addEventListener("keyup", () => {
            if (this.password.value != this.confirmPassword.value) {
                confirmpassworderror.innerHTML = "didnt match to password";
                confirmpassworderror.style.color = "red";
            }
            else {
                confirmpassworderror.innerHTML = "";
            }
        });
    }
}