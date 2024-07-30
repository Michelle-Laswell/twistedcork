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

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myLink").click();

    var orderBtn = document.getElementById("orderbtn");
    var loginModal = document.getElementById("loginModal");
    var loginFormContainer = document.getElementById("loginFormContainer");
    var closeModal = document.getElementsByClassName("close")[0];

    orderBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Load the login form dynamically
        fetch('loginForm.html')
            .then(response => response.text())
            .then(data => {
                loginFormContainer.innerHTML = data;
                loginModal.style.display = "block"; // Show the login modal

                // Add event listener for the login form submission
                document.getElementById("login").addEventListener("submit", function(event) {
                    event.preventDefault(); // Prevent the default form submission

                    // Perform login validation here
                    var username = document.getElementById("username").value;
                    var password = document.getElementById("password").value;

                    if (username === "yourUsername" && password === "yourPassword") {
                        loginModal.style.display = "none"; // Hide the login modal

                        // Gather selected items and their quantities
                        let selectedItems = [];
                        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
                        checkboxes.forEach(function(checkbox) {
                            let item = checkbox.value;
                            let quantityInput = checkbox.parentElement.querySelector("input[type='number']");
                            let quantity = quantityInput ? quantityInput.value : 1;
                            selectedItems.push({ item: item, quantity: quantity });
                        });

                        // Process or display the collected data
                        console.log("Selected Items:", selectedItems);

                        // Optionally, you can send this data to the server or display it on the page
                        // Example: Displaying the data in an alert
                        alert("Order Summary:\n" + selectedItems.map(item => `${item.quantity} x ${item.item}`).join("\n"));
                    } else {
                        alert("Invalid login credentials. Please register.");
                    }
                });

                // Add event listener for the "Register for an Account" link
                document.querySelector(".signup a").addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior

                    // Load the registration form dynamically
                    fetch('forms/registrationForm.html')
                        .then(response => response.text())
                        .then(data => {
                            loginFormContainer.innerHTML = data;
                        })
                        .catch(error => console.error('Error loading registration form:', error));
                });

                // Add event listener for the "Cancel" button
                document.querySelector(".cancelbtn").addEventListener("click", function() {
                    loginModal.style.display = "none"; // Hide the login modal
                });
            })
            .catch(error => console.error('Error loading login form:', error));
    });

    closeModal.addEventListener("click", function() {
        loginModal.style.display = "none"; // Hide the login modal
    });

    window.addEventListener("click", function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none"; // Hide the login modal if clicked outside
        }
    });
});

// SHOW PASSWORD WHEN CHECKED
function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}