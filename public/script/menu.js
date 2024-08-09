// TABBED MENU ON THE MENU PAGE
function openMenu(evt, menuName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tabcolor", "");
    }
    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.firstElementChild.className += " tabcolor";

    // CHANGE THE IMAGE BASED ON THE TAB CLICKED
    var menuImage = document.getElementById("menuImage");
    if (menuName === 'Drinks') {
        menuImage.src = "images/tcmenu2.JPG";
    } else {
        menuImage.src = "images/tcmenu4.JPG";
    }
}

    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("myLink").click();
});


// SHOPPING CART FUNCTIONS
let cart = [];

function addToCart(item, price, quantity) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ item, price, quantity });
        console.log(`Added new item to cart: ${item}`);
    }
    displayCartItems();
    updateTotalPrice();
}

function removeFromCart(item) {
    cart = cart.filter(cartItem => cartItem.item !== item);
    displayCartItems();
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById("totalPrice");
    const subtotal = cart.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
    const tax = subtotal * 0.06;
    const totalPrice = subtotal + tax;
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)} (including 6% tax)`;
}

function displayCartItems() {
    const cartContainer = document.getElementById("cartItems");
    cartContainer.innerHTML = "";
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.innerText = `${item.item} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}`;
        cartContainer.appendChild(itemElement);
    });
}

function clearForm() {
    const checkboxes = document.querySelectorAll(".food-item input[type='checkbox'], .drink-item input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    const quantityInputs = document.querySelectorAll(".food-item input[type='number'], .drink-item input[type='number']");
    quantityInputs.forEach(input => {
        input.value = 1; // Reset quantity to 1 or any default value
    });

    cart = [];
    displayCartItems();
    updateTotalPrice();
}

document.getElementById("clear").addEventListener("click", function() {
    clearForm();
});

// Attach event listeners to all items (both food and drink items)
document.querySelectorAll('.food-item, .drink-item').forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const quantityInput = item.querySelector('input[type="number"]');
    console.log(item, checkbox);

    checkbox.addEventListener('change', function() {
        const itemName = this.value;
        const itemPrice = parseFloat(this.getAttribute('data-price'));
        const itemId = parseInt(this.getAttribute('data-id')); // Assuming you have data-id attribute for item ID
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        if (this.checked) {
            addToCart(itemName, itemPrice, quantity, itemId);
        } else {
            removeFromCart(itemName);
        }
    });

    quantityInput.addEventListener('change', function() {
        const itemName = checkbox.value;
        const quantity = parseInt(this.value);
        if (checkbox.checked) {
            const item = cart.find(item => item.item === itemName);
            if (item) {
                item.quantity = quantity;
            }
            displayCartItems();
            updateTotalPrice();
        }
    });
});

document.getElementById("orderbtn").addEventListener("click", function(event) {
    event.preventDefault();

    fetch('forms/loginForm.html')
        .then(response => response.text())
        .then(data => {
            const loginFormContainer = document.getElementById("loginFormContainer");
            loginFormContainer.innerHTML = data;
            const loginModal = document.getElementById("loginModal");
            loginModal.style.display = "block";

            // Dynamically load forms.js
            const script = document.createElement('script');
            script.src = 'path/to/forms.js'; // Update with the correct path to forms.js
            script.onload = attachLoginFormEventListeners;
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error loading login form:', error));
});

// Function to attach event listeners to the login form
function attachLoginFormEventListeners() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("pswd").value;

        if (username !== "" && password !== "") {
            console.log('Attempting login with:', { email: username, pswd: password });

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    pswd: password                               
                })
            })
            .then(response => {
                console.log('Login response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Login response data:', data);
                if (data.message === 'Login successful') {
                    alert("Login successful!");

                    fetch('forms/paymentForm.html')
                        .then(response => response.text())
                        .then(paymentFormData => {
                            console.log('Payment form loaded');
                            const loginFormContainer = document.getElementById("loginFormContainer");
                            loginFormContainer.innerHTML = paymentFormData;
                            const loginModal = document.getElementById("loginModal");
                            loginModal.style.display = "none"; // Close the login modal
                        })
                        .catch(error => {
                            console.error('Error loading payment form:', error);
                            alert('Error loading payment form');
                        });
                } else {
                    alert("Failed to login.");

                    fetch('forms/registrationForm.html')
                        .then(response => response.text())
                        .then(registrationFormData => {
                            const loginFormContainer = document.getElementById("loginFormContainer");
                            loginFormContainer.innerHTML = registrationFormData;
                        })
                        .catch(error => {
                            console.error('Error loading registration form:', error);
                            alert('Error loading registration form');
                        });
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
                alert('Error during login');
            });
        } else {
            alert("Invalid login credentials. Please register.");
        }
    });

    document.getElementById("showLoginPasswordCheckbox").addEventListener("change", function() {
        const passwordInput = document.getElementById("pswd");
        if (this.checked) {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });

    document.getElementById("cancelBtn1").addEventListener("click", function() {
        const loginModal = document.getElementById("loginModal");
        loginModal.style.display = "none";
        clearForm();
    });

    document.querySelector(".signup a").addEventListener("click", function(event) {
        event.preventDefault();

        fetch('forms/registrationForm.html')
            .then(response => response.text())
            .then(data => {
                const loginFormContainer = document.getElementById("loginFormContainer");
                loginFormContainer.innerHTML = data;
            })
            .catch(error => console.error('Error loading registration form:', error));
    });
}

// Close modal when clicking outside of it
window.addEventListener("click", function(event) {
    const loginModal = document.getElementById("loginModal");
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
});




/*
// Shopping Cart Functions
let cart = [];

function addToCart(item, price, quantity, itemId) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ item, price, quantity, itemId });
        console.log(`Added new item to cart: ${item}`);
    }
    displayCartItems();
    updateTotalPrice();
}

function updateCartItemQuantity(item, quantity) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity = quantity;
    }
    displayCartItems();
    updateTotalPrice();
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = '';
    cart.forEach(cartItem => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <span>${cartItem.item} - $${cartItem.price} x ${cartItem.quantity}</span>
            <button class="remove-btn" data-item="${cartItem.item}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.getAttribute('data-item');
            removeFromCart(item);
        });
    });
}

// Function to remove item from cart
function removeFromCart(item) {
    cart = cart.filter(cartItem => cartItem.item !== item);
    displayCartItems();
    updateTotalPrice();
}

// Function to update total price
function updateTotalPrice() {
    const totalPriceElement = document.getElementById("totalPrice");
    const subtotal = cart.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
    const tax = subtotal * 0.06;
    const totalPrice = subtotal + tax;
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)} (including 6% tax)`;
}

// Function to clear form inputs and checkboxes
function clearForm() {
    const checkboxes = document.querySelectorAll(".food-item input[type='checkbox'], .drink-item input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    const quantityInputs = document.querySelectorAll(".food-item input[type='number'], .drink-item input[type='number']");
    quantityInputs.forEach(input => {
        input.value = 1; // Reset quantity to 1 or any default value
    });

    cart = [];
    displayCartItems();
    updateTotalPrice();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myLink").click();

    var orderBtn = document.getElementById("orderbtn");
    var loginModal = document.getElementById("loginModal");
    var loginFormContainer = document.getElementById("loginFormContainer");
    var closeModal = document.getElementsByClassName("close")[0];

    orderBtn.addEventListener("click", function(event) {
        event.preventDefault();

        fetch('loginForm.html')
            .then(response => response.text())
            .then(data => {
                loginFormContainer.innerHTML = data;
                loginModal.style.display = "block";

                document.getElementById("login").addEventListener("submit", function(event) {
                    event.preventDefault();

                    var username = document.getElementById("username").value;
                    var password = document.getElementById("pswd").value;

                    if (username !== "" && password !== "") {
                        loginModal.style.display = "none";

                        // Send cart data to the server
                        fetch('/api/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: username,
                                pswd: password                               
                        
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.message) {
                                alert("Order saved successfully!");
                                clearForm(); // Clear the cart after saving the order
                            } else {
                                alert("Failed to save order.");
                            }
                        })
                        .catch(error => console.error('Error saving order:', error));
                    } else {
                        alert("Invalid login credentials. Please register.");
                    }
                });

                document.querySelector(".signup a").addEventListener("click", function(event) {
                    event.preventDefault();

                    fetch('forms/registrationForm.html')
                        .then(response => response.text())
                        .then(data => {
                            loginFormContainer.innerHTML = data;
                        })
                        .catch(error => console.error('Error loading registration form:', error));
                });

                document.querySelector(".cancelbtn").addEventListener("click", function() {
                    loginModal.style.display = "none";
                    clearForm(); // Clear form inputs and checkboxes when cancel button is clicked
                });
            })
            .catch(error => console.error('Error loading login form:', error));
    });

    closeModal.addEventListener("click", function() {
        loginModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    });

    const clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", function() {
        cart = [];
        displayCartItems();
        updateTotalPrice();
    });

    // Attach event listeners to all items (both food and drink items)
    document.querySelectorAll('.food-item, .drink-item').forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const quantityInput = item.querySelector('input[type="number"]');
        console.log (item, checkbox);

        checkbox.addEventListener('change', function() {
            const itemName = this.value;
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            const itemId = parseInt(this.getAttribute('data-id')); // Assuming you have data-id attribute for item ID
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            if (this.checked) {
                addToCart(itemName, itemPrice, quantity, itemId);
            } else {
                removeFromCart(itemName);
            }
        });

        quantityInput.addEventListener('change', function() {
            const itemName = checkbox.value;
            const quantity = parseInt(this.value);
            if (checkbox.checked) {
                updateCartItemQuantity(itemName, quantity);
            }
        });
    });
});
*/