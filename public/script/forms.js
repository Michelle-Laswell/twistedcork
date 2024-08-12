	// SHOW PASSWORD WHEN CHECKED FOR LOGIN FORM
	function togglePasswordVisibility() {
        const passwordField = document.getElementById('pswd');
        const checkbox = document.getElementById('showLoginPasswordCheckbox');
        if (checkbox.checked) {
            passwordField.type = 'text'; // Show the password
        } else {
            passwordField.type = 'password'; // Hide the password
        }
    }

	// SHOW PASSWORD WHEN CHECKED FOR REGISTRATION FORM
	function toggleRegistrationPasswordVisibility() {
		const passwordFields = document.querySelectorAll('#pswd, #pswd-repeat');
		passwordFields.forEach(field => {
			field.type = field.type === 'password' ? 'text' : 'password';
		});
	}

	// Toggle password visibility in the login form
	const showLoginPasswordCheckbox = document.getElementById("showLoginPasswordCheckbox");
	if (showLoginPasswordCheckbox) {
		console.log("Show Login Password Checkbox found");
		showLoginPasswordCheckbox.addEventListener("change", toggleLoginPasswordVisibility);
	} else {
		console.log("Show Login Password Checkbox not found");
	}

	// Toggle password visibility in the registration form
	const showRegistrationPasswordCheckbox = document.getElementById("showPasswordCheckbox");
	if (showRegistrationPasswordCheckbox) {
		console.log("Show Registration Password Checkbox found");
		showRegistrationPasswordCheckbox.addEventListener("change", toggleRegistrationPasswordVisibility);
	} else {
		console.log("Show Registration Password Checkbox not found");
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
				passwordField.type = 'password'; // Ensure password field is hidden when form is cleared
			} else {
				console.log("One or more login form fields not found");
			}
		};
	} else {
		console.log("Cancel Login Button not found");
	}

	// Handle login form submission
	const loginForm = document.getElementById("login-form");
	if (loginForm) {
		console.log("Login Form found");
		loginForm.addEventListener("submit", function(event) {
			event.preventDefault();
			console.log("Login form submitted");

			const username = document.getElementById("username").value;
			const password = document.getElementById("pswd").value;

			fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: username, pswd: password })
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const contentType = response.headers.get('Content-Type');
				if (contentType && contentType.includes('application/json')) {
					return response.json();
				} else {
					throw new Error('Received non-JSON response');
				}
			})
			.then(data => {
				console.log("Login response received:", data);
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
		});
	} else {
		console.log("Login Form not found");
	}

	// Handle registration form submission
	const registrationForm = document.getElementById('registrationForm');
	if (registrationForm) {
		registrationForm.addEventListener('submit', async (event) => {
			event.preventDefault();

			const formData = new FormData(registrationForm);
			const data = Object.fromEntries(formData.entries());

			try {
				const response = await fetch('/api/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});

				if (response.ok) {
					window.location.href = 'loginForm.html'; // Redirect to login form
				} else {
					const errorData = await response.json();
					alert(`Registration failed: ${errorData.message}`);
				}
			} catch (error) {
				console.error('Error:', error);
				alert('An error occurred during registration.');
			}
		});

		document.getElementById('showPasswordCheckbox').addEventListener('click', toggleRegistrationPasswordVisibility);
	}
