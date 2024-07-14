// ALL PAGES WITH A NAVIGATION BAR

// SHOWS ACTIVE PAGE IN THE NAVBAR
document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.navbar a');
    links.forEach(function(link) {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});