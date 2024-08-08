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

// SHOW PASSWORD WHEN CHECKED
function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var showPasswordCheckbox = document.getElementById("showPasswordCheckbox");
    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener("change", toggleLoginPasswordVisibility);
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
