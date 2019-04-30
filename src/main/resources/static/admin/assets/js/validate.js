function showMessage(type, msg, selector){
    var alertBox = '';
    if(type == 'error'){
        alertBox = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' + '<span class="badge badge-pill badge-danger">Thất bại</span>' +  msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        $(selector).html(alertBox);
    } else if(type == 'success'){
        alertBox = '<div class="alert alert-success alert-dismissible fade show" role="alert">' + '<span class="badge badge-pill badge-success">Thành công</span>' +  msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        $(selector).html(alertBox);
    }
}
