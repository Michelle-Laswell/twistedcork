document.addEventListener("DOMContentLoaded", function() {
    // Toggle password visibility in the login form
    const showPasswordCheckbox = document.getElementById("showLoginPasswordCheckbox");
    if (showPasswordCheckbox) {
        console.log("Show Password Checkbox found");
        showPasswordCheckbox.addEventListener("change", function() {
            const passwordField = document.getElementById("pswd");
            if (this.checked) {
                passwordField.type = 'text';
            } else {
                passwordField.type = 'password';
            }
        });
    } else {
        console.log("Show Password Checkbox not found");
    }

    // Clear login form fields when the cancel button is clicked
    const cancelLoginButton = document.getElementById('cancelBtn1');
    if (cancelLoginButton) {
        console.log("Cancel Login Button found");
        cancelLoginButton.onclick = function() {
            const usernameField = document.getElementById('username');
            const passwordField = document.getElementById('pswd');
            const showPasswordCheckbox = document.getElementById('showLoginPasswordCheckbox');
            
            if (usernameField && passwordField && showPasswordCheckbox) {
                usernameField.value = '';
                passwordField.value = '';
                showPasswordCheckbox.checked = false;
            } else {
                console.log("One or more login form fields not found");
            }
        };
    } else {
        console.log("Cancel Login Button not found");
    }

    // Clear registration form when the cancel button is clicked
    const cancelRegistrationButton = document.getElementById('cancelBtn');
    if (cancelRegistrationButton) {
        console.log("Cancel Registration Button found");
        cancelRegistrationButton.onclick = function() {
            const registrationForm = document.getElementById('registrationForm');
            if (registrationForm) {
                registrationForm.reset();
            } else {
                console.log("Registration Form not found");
            }
        };
    } else {
        console.log("Cancel Registration Button not found");
    }

    // Show login form when order button is clicked
    const orderButton = document.getElementById("orderbtn");
    if (orderButton) {
        console.log("Order Button found");
        orderButton.addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById("login").style.display = "block";
        });
    } else {
        console.log("Order Button not found");
    }

    // Handle login form submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        console.log("Login Form found");
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("pswd").value;

            if (username !== "" && password !== "") {
                fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: username, pswd: password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Login successful') {
                        document.getElementById("login").style.display = "none";
                        fetch('paymentForm.html')
                            .then(response => response.text())
                            .then(paymentFormData => {
                                document.getElementById("loginFormContainer").innerHTML = paymentFormData;
                            })
                            .catch(error => console.error('Error loading payment form:', error));
                    } else {
                        console.error('Login failed:', data.message);
                    }
                })
                .catch(error => console.error('Error during login:', error));
            } else {
                alert("Invalid login credentials. Please register.");
            }
        });
    } else {
        console.log("Login Form not found");
    }

    // Add event listeners for the registration password visibility checkbox
    const registrationCheckbox = document.getElementById("showRegistrationPasswordCheckbox");
    if (registrationCheckbox) {
        console.log("Registration Password Checkbox found");
        registrationCheckbox.addEventListener("change", toggleRegistrationPasswordVisibility);
    } else {
        console.log("Registration Password Checkbox not found");
    }

    // Function to toggle password visibility in the registration form
    function toggleRegistrationPasswordVisibility() {
        const passwordField = document.getElementById("pswd");
        const repeatPasswordField = document.getElementById("pswd-repeat");
        const type = passwordField.type === "password" ? "text" : "password";
        passwordField.type = type;
        repeatPasswordField.type = type;
    }
});

/*document.addEventListener("DOMContentLoaded", function() {
    // Toggle password visibility in the login form
    const showPasswordCheckbox = document.getElementById("showLoginPasswordCheckbox");
    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener("change", function() {

/*document.addEventListener("DOMContentLoaded", function() {
	// Toggle password visibility in the login form
	const showPasswordCheckbox = document.getElementById("showLoginPasswordCheckbox");
	if (showPasswordCheckbox) {
		showPasswordCheckbox.addEventListener("change", function() {
			const passwordField = document.getElementById("pswd");
			passwordField.type = passwordField.type === "password" ? "text" : "password";
		});
	}

	// Clear login form when the cancel button is clicked
	const cancelLoginButton = document.getElementById('cancelBtn1');
	if (cancelLoginButton) {
		cancelLoginButton.onclick = function() {
			const loginForm = document.getElementById('login-form');
			loginForm.reset(); // Reset the form fields    
		};
	}

	// Clear registration form when the cancel button is clicked
	const cancelRegistrationButton = document.getElementById('cancelBtn');
	if (cancelRegistrationButton) {
		cancelRegistrationButton.onclick = function() {
			document.getElementById('registrationForm').reset();
		};
	}

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

	// Handle cancel button click in the login form
	if (cancelLoginButton) {
		cancelLoginButton.addEventListener("click", function() {
			document.getElementById("login").style.display = "none";
		});
	}

	// Add event listeners for the registration password visibility checkbox
	const registrationCheckbox = document.getElementById("showRegistrationPasswordCheckbox");
	if (registrationCheckbox) {
		registrationCheckbox.addEventListener("change", toggleRegistrationPasswordVisibility);
	}
});

// Function to toggle password visibility in the registration form
function toggleRegistrationPasswordVisibility() {
	const passwordField = document.getElementById("pswd");
	const repeatPasswordField = document.getElementById("pswd-repeat");
	const type = passwordField.type === "password" ? "text" : "password";
	passwordField.type = type;
	repeatPasswordField.type = type;
}
*/