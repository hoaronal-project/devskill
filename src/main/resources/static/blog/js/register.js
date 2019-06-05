$('#btnRegister').click(function () {
    alert($('#register-email').val());
    var registerJson = new Object();
    registerJson.email = $('#register-email').val();
    $.ajax({
        type    : 'POST',
        url     : url + "/register",
        async   : 'true',
        data: JSON.stringify(registerJson),
        contentType : 'application/json',
        dataType: "json",
        error: function (request, status, error) {
            console.log('Error ' + request.responseText + "\n" + status + "\n" + error);
        },
        success: function (dataResponse) {
            if(dataResponse.isSuccess){

            }else{
                //Set error messages

            }
        }
    });
});