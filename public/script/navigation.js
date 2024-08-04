// ALL PAGES WITH A NAVIGATION BAR

// SHOWS ACTIVE PAGE IN THE NAVBAR
/*
document.addEventListener("DOMContentLoaded", () => {
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.navbar a');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if(menuItem[i].href === currentLocation){
            menuItem[i].className = "active";
        }
    }
}); */ 

document.addEventListener('DOMContentLoaded', function() {
    var currentUrl = new URL(window.location.href);
    var links = document.querySelectorAll('.navbar a');
    
    links.forEach(function(link) {
        var linkUrl = new URL(link.href);
        
        if (linkUrl.pathname === currentUrl.pathname) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});



