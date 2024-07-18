// ALL PAGES WITH A NAVIGATION BAR

// SHOWS ACTIVE PAGE IN THE NAVBAR

document.addEventListener("DOMContentLoaded", () => {
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.navbar a');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if(menuItem[i].href === currentLocation){
            menuItem[i].className = "active";
        }
    }
});