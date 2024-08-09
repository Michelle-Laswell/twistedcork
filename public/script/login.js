
ddocument.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const pswd = document.getElementById('pswd').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, pswd })
        });

        const result = await response.json();
        console.log('Response from server:', result);

        if (response.ok) {
            window.location.href = '/paymentForm.html'; // Redirect to payment form after successful login
        } else {
            alert(result.message || 'Error during login');
            window.location.href = '/registrationForm.html'; // Redirect to registration form if login fails
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login');
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
*/