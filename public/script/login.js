
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

        const orderPromises = cart.map(item => {
            return fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId,
                    menuItemId: item.id, // Assuming `id` is stored in the cart item
                    menuItemName: item.name,
                    quantity: item.quantity,
                    orderDate: new Date().toISOString()
                })
            });
        });

        const orderResponses = await Promise.all(orderPromises);

        if (orderResponses.every(res => res.ok)) {
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            window.location.href = '/paymentForm.html'; // Redirect to payment form
        } else {
            alert('Failed to place order.');
        }
    } else {
        alert('Invalid login credentials.');
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