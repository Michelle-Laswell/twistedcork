// SCRIPT FOR HOME PAGE

 //PUTS CURRENT DATE IN THE PLACEHOLDER OF THE RESERVATION FORM       
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
