var url = '';
var port = window.location.port;
var protocol = '';
if (window.location.hostname == 'localhost') {
    protocol = 'http://'
} else {
    protocol = 'https://'
}
if (port !== null && port !== '') {
    url = protocol + window.location.hostname + ':' + window.location.port;
} else {
    url = protocol + window.location.hostname;
}

$('#btnRegister').click(function () {
    var registerJson = new Object();
    registerJson.email = $('#register-email').val();
    $.ajax({
        type: 'POST',
        url: url + "/register",
        async: 'true',
        data: JSON.stringify(registerJson),
        contentType: 'application/json',
        dataType: "json",
        error: function (request, status, error) {
            console.log('Error ' + request.responseText + "\n" + status + "\n" + error);
        },
        success: function (dataResponse) {
            if (dataResponse.isSuccess) {

            } else {
                //Set error messages

            }
        }
    });
});