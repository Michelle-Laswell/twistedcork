// SHOWS ACTIVE PAGE IN THE NAVBAR

document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.navbar a');
    links.forEach(function(link) {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});

//PUTS CURRENT DATE IN THE PLACEHOLDER OF RESERVATION FORM
        
window.onload = function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var day = ('0' + now.getDate()).slice(-2);
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);

    var formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    document.getElementById('reservation-date').value = formattedDate;
};

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

/*
// SCROLL TO TOP BUTTON
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
*/

