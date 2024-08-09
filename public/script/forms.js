document.addEventListener("DOMContentLoaded", function() {
    // Toggle password visibility
    const showPasswordCheckbox = document.getElementById("showLoginPasswordCheckbox");
    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener("change", function() {
            const passwordField = document.getElementById("pswd");
            if (passwordField.type === "password") {
                passwordField.type = "text";
            } else {
                passwordField.type = "password";
            }
        });
    }

    // CLEARS FORM WHEN THE CANCEL BUTTON IS CLICKED
    document.getElementById('cancelBtn1').onclick = function() {
        var loginForm = document.getElementById('login-form');
        loginForm.reset(); // Reset the form fields    
    };

    document.getElementById('cancelBtn').onclick = function() {
        document.getElementById('registrationForm').reset();
    };

    // Show login form when order button is clicked
    const orderButton = document.getElementById("orderbtn");
    if (orderButton) {
        orderButton.addEventListener("click", function() {
            document.getElementById("login").style.display = "block";
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            // Perform login validation here
            const isValidLogin = true; // Replace with actual validation logic

            if (isValidLogin) {
                document.getElementById("login").style.display = "none";
                document.getElementById("paymentForm").style.display = "block"; // Show payment form
            } else {
                alert("Invalid login credentials");
            }
        });
    }

    // Handle cancel button click
    const cancelButton = document.getElementById("cancelBtn1");
    if (cancelButton) {
        cancelButton.addEventListener("click", function() {
            document.getElementById("login").style.display = "none";
        });
    }
});

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

    const registrationCheckbox = document.getElementById("showRegistrationPasswordCheckbox");
    if (registrationCheckbox) {
        console.log("Registration checkbox found");
        registrationCheckbox.addEventListener("change", toggleRegistrationPasswordVisibility);
    } else {
        console.log("Registration checkbox not found");
    }
});

/*
document.getElementById('login-form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const email = document.getElementById('username').value;
	const pswd = document.getElementById('pswd').value;

	const response = await fetch('/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, pswd })
	});

	if (response.ok) {
		const { customerId } = await response.json();
		const cart = JSON.parse(localStorage.getItem('cart')) || [];

		const orderResponse = await fetch('/api/orders', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ cart, customerId })
		});

		if (orderResponse.ok) {
			alert('Order placed successfully!');
			localStorage.removeItem('cart');
		} else {
			alert('Failed to place order.');
		}
	} else {
		alert('Invalid login credentials.');
	}
});

/*
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

// CLEARS FORM WHEN THE CANCEL BUTTON IS CLICKED
document.getElementById('cancelBtn1').onclick = function() {
    var loginForm = document.getElementById('login-form');
    loginForm.reset(); // Reset the form fields    
};

document.getElementById('cancelBtn').onclick = function() {
    document.getElementById('registrationForm').reset();
};
*/
