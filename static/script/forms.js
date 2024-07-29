// Function to toggle password visibility in the login form
function toggleLoginPasswordVisibility() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// Function to toggle password visibility in the registration form
function toggleRegistrationPasswordVisibility() {
    var x = document.getElementById("pswd");
    var y = document.getElementById("pswd-repeat");
    if (x.type === "password" && y.type === "password") {
        x.type = "text";
        y.type = "text";
    } else {
        x.type = "password";
        y.type = "password";
    }
}