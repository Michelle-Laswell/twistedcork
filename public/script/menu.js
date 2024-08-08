// TABBED MENU ON THE MENU PAGE
function openMenu(evt, menuName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) { // Fix the loop to iterate over tablinks
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

// Shopping Cart Functions
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
                    var password = document.getElementById("password").value;

                    if (username === "yourUsername" && password === "yourPassword") {
                        loginModal.style.display = "none";

                        let selectedItems = [];
                        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
                        checkboxes.forEach(function(checkbox) {
                            let item = checkbox.value;
                            let quantityInput = checkbox.parentElement.querySelector("input[type='number']");
                            let quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                            selectedItems.push({ item: item, quantity: quantity });
                        });

                        console.log("Selected Items:", selectedItems);
                        alert("Order Summary:\n" + selectedItems.map(item => `${item.quantity} x ${item.item}`).join("\n"));
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

        checkbox.addEventListener('change', function() {
            const itemName = this.value;
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            if (this.checked) {
                addToCart(itemName, itemPrice, quantity);
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