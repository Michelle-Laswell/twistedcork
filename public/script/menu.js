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

//DISPLAY LOGINFORM WHEN THE ORDER BUTTON IS CLICKED

document.addEventListener("DOMContentLoaded", function() {
    // Select the order button by its class
    var orderButton = document.querySelector('.orderbtn');
    
    // Check if the order button exists to avoid errors
    if (orderButton) {
        // Add click event listener to the order button
        orderButton.addEventListener('click', function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();
            
            // Select the login form by its ID and change its display style to "block"
            var loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.style.display = 'block';
            }
        });
    }
});


/*
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Find the order button by its class name
    var orderButton = document.querySelector('.orderbtn');
    
    // Check if the order button exists to avoid errors
    if (orderButton) {
        // Add click event listener to the order button
        orderButton.addEventListener('click', function() {
            // Display the login form by changing its style
            document.getElementById('id01').style.display = 'block';
        });
    }
});
*/

// LOGIN FORM - SHOWS PASSWORD WHEN CHECKED
function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

//CODE FOR THE PAYMENT FORM
// Example items (replace with actual logic to fetch items)
const items = [
    { name: "Item 1", price: 10.00 },
    { name: "Item 2", price: 15.00 },
    { name: "Item 3", price: 20.00 }
];

// Function to display order summary
function displayOrderSummary() {
    const orderList = document.getElementById('order-list');
    const totalPriceSpan = document.getElementById('total-price');
    let totalPrice = 0;

    // Clear existing items
    orderList.innerHTML = '';

    // Add each item to the order summary
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}: $${item.price.toFixed(2)}`;
        orderList.appendChild(listItem);
        totalPrice += item.price;
    });

    // Update total price
    totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;
}

// Call displayOrderSummary when the page loads
document.addEventListener('DOMContentLoaded', displayOrderSummary);

// Form submit event listener (replace with actual form submission logic)
const form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Replace with your form submission logic (e.g., payment processing)
    alert('Payment processed successfully!');
});