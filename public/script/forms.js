// Function to toggle password visibility in the login form
function toggleLoginPasswordVisibility() {
    console.log("toggleLoginPasswordVisibility called");
    var x = document.getElementById("pswd");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// Function to toggle password visibility in the registration form
function toggleRegistrationPasswordVisibility() {
    console.log("toggleRegistrationPasswordVisibility called");
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

// Add event listeners for the checkboxes
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const loginCheckbox = document.getElementById("showLoginPasswordCheckbox");
    if (loginCheckbox) {
        console.log("Login checkbox found");
        loginCheckbox.addEventListener("change", toggleLoginPasswordVisibility);
    } else {
        console.log("Login checkbox not found");
    }

    const registrationCheckbox = document.getElementById("showRegistrationPasswordCheckbox");
    if (registrationCheckbox) {
        console.log("Registration checkbox found");
        registrationCheckbox.addEventListener("change", toggleRegistrationPasswordVisibility);
    } else {
        console.log("Registration checkbox not found");
    }
});
/*

// Add event listener for form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const pswd = document.getElementById('pswd').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pswd })
    });

    if (response.ok) {
        // Redirect to payment form on successful login
        window.location.href = '/paymentForm.html';
    } else {
        // Handle login failure
        const result = await response.json();
        alert(result.message);
    }
});
*/
