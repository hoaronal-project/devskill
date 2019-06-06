var id_document;
var timeSave = 60;
var timedownload = 10;
var timeleft = timeSave;
var saveTimer, downloadTimer;
var save_checked = true;
var btSaveClick = true;
var modal;
$(document).ready(function () {
    var max_fields = 10;
    var x = 1;
    var timeoutId;
    id_document = $('#id_document').val();
    //ajax setup token
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token-pages"]').attr('content')
        }
    });
    $('#builder').show();
    $('#loadingLoader').hide();
    $('.editor-full').jqte();
    $('.editor-mini').jqte({
        "left": false,
        "ol": false,
        "ul": false,
        "right": false,
        "center": false
    });
    $(".onv_close,.js_modal-cancel").click(function () {
        $(this).parents(".onv_modal").fadeOut().fadeOut("slow");
    });

    $('#rangeLineSpacing').css('background-image', '-webkit-gradient(linear, left top,right top,color-stop(0.' + $('#rangeLineSpacing').val() + ', #0c9dff),color-stop(0.' + $('#rangeLineSpacing').val() + ', #C5C5C5))');
    $('#rangeFontSize').css('background-image', '-webkit-gradient(linear, left top,right top,color-stop(0.' + $('#rangeFontSize').val() + ', #0c9dff),color-stop(0.' + $('#rangeFontSize').val() + ', #C5C5C5))');

    window.onbeforeunload = function () {
        if (btSaveClick === false) {
            return "Are you sure that you want to leave this page?";
        }
    }
    //upload images
    $('#upload').on('change', function () {
        readFile(this);
    });
    //check today
    $(".dummyCheckbox").click(function (evt) {
        section = $(this).parents('.onv_modal').data('container');
        $this = $(this).parents('.formtodate').children('.form__date');
        if (!$this.hasClass('is-disabled')) {
            $this.addClass('is-disabled');
            if (section === 'education') {
                $('select[name=MonthToEdu_modal]').prop('disabled', true);
                $('select[name=YearToEdu_modal]').prop('disabled', true);
                $('select[name=MonthToEdu_modal] option[value=Present]').prop('selected', 'selected');
                $("select[name=YearToEdu_modal] option[value=Present]").prop('selected', 'selected');
            }
            else {
                $('select[name=MonthToExp_modal]').prop('disabled', true);
                $('select[name=YearToExp_modal]').prop('disabled', true);
                $('select[name=MonthToExp_modal] option[value=Present]').prop('selected', 'selected');
                $("select[name=YearToExp_modal] option[value=Present]").prop('selected', 'selected');
            }
        }
        else {
            $this.removeClass('is-disabled');
            if (section === 'education') {
                $('select[name=MonthToEdu_modal]').prop('disabled', false);
                $('select[name=YearToEdu_modal]').prop('disabled', false);
                $('select[name=MonthToEdu_modal] option[value=01]').prop('selected', 'selected');
                $("select[name=YearToEdu_modal] option[value=2010]").prop('selected', 'selected');
            }
            else {
                $('select[name=MonthToExp_modal]').prop('disabled', false);
                $('select[name=YearToExp_modal]').prop('disabled', false);
                $('select[name=MonthToExp_modal] option[value=01]').prop('selected', 'selected');
                $("select[name=YearToExp_modal] option[value=2017]").prop('selected', 'selected');
            }
        }
    });

    $('.upload-result').on('click', function (ev) {
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {
            $.ajax({
                url: ajaxURL + "image-crop",
                type: "POST",
                data: {"image": resp, "id_resume": id_document},
                success: function (data) {
                    html = '<img id="src_modal" src="' + data['src'] + '" />';
                    $("#src_modal").prop('src', data['src']);
                    $("#avatar_src").prop('src', data['src']);
                }
            });
        });
    });
    //open template
    document.getElementById("defaultOpen").click();
    //download
    modal = document.getElementById('ModalDownload');
    $('#btnDownload').click(function (e) {
        if (btSaveClick === true) {
            modal.style.display = "block";
            counttimeDownload(timedownload);
        }
        else {
            showerrodown();
        }
    });
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearInterval(downloadTimer);
            document.getElementById("downloadtime").textContent = timedownload;

        }
    }
    //define datepicker
    $(document).ready(function () {
        var date_input = $('input[name="cv_date"]'); //our date input has the name "date"
        var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
        var options = {
            format: 'dd/mm/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        };
        date_input.datepicker(options);
    })
    //Load template khi nguoi dung thay doi.
    $('.templateItem').click(function () {
        var id_template = $(this).children('.template').data('template-id');
        if (save_checked === false) {
            saveAll('false');
            clearInterval(saveTimer);
            timeleft = timeSave;
            document.getElementById("countdowntimer").textContent = '0';
        }
        if (typeof id_template === 'undefined') {
            id_template = $(this).data('template-id');
        }
        $('#Template').find('.templateItem').each(function () {
            if ($(this).children('.template').data('template-id') === id_template) {
                $(this).children('.template').addClass('active');
            }
            else {
                $(this).children('.template').removeClass('active');
            }
        });
        $('#manageListTemplate').find('.templateItem').each(function () {
            if ($(this).data('template-id') === id_template) {
                $(this).removeClass('is-inactive');
            }
            else {
                $(this).addClass('is-inactive');
            }
        });
        loadingtask(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            $.ajax({
                method: "Post",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    'id_template': id_template,
                    'id': id_document
                }),
                url: ajaxURL + "changeTemplate",
                beforeSend: function () {

                },
                complete: function () {
                    let timeoutId;
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(function () {
                        loadingtask(false);
                    }, (3000));
                    AutoSaveData();
                },
                success: function (data) {
                    //refresh iframe
                    $('#iframe').css("display", "none");
                    $('#iframe').fadeOut(function () {
                        $(this).attr('src', function (i, val) {
                            return val;
                        });
                    }).fadeIn();
                    //go tab preview
                    document.getElementById("previewOpen").click();
                    createAlert('', '', Lang.get('label.Alert.Save.success'), 'info', false, true, 'pageMessages');
                },
                error: function (error) {
                    swal(Lang.get('label.Alert.Save.fail'), "", "error");
                }
            })
        }, (2000));

    });
    // event  input range
    $('input[type="range"]').mousemove(function () {
        var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
        $(this).css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + val + ', #0c9dff), '
            + 'color-stop(' + val + ', #C5C5C5)'
            + ')'
        );
    });
    //change font size
    $("#rangeFontSize").mousedown(function () {
        $(this).data('prev', $(this).val());
    });
    //change font size
    $("#rangeFontSize").change(function () {
        var prev = $(this).data('prev');
        $(this).removeData('prev');
        var x = document.getElementById("rangeFontSize").value;
        x = (x - prev) / 2;
        document.getElementById('iframe').contentWindow.changeFontSize(x);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            AutoSaveData();
        }, (500));
    });
    // change line spacing
    $("#rangeLineSpacing").mousedown(function () {
        $(this).data('prev', $(this).val());
    });
    $("#rangeLineSpacing").change(function () {
        var prev = $(this).data('prev');
        $(this).removeData('prev');
        var x = document.getElementById("rangeLineSpacing").value;
        x = (x - prev) / 2;
        document.getElementById('iframe').contentWindow.changeLineSpacing(x);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            AutoSaveData();
        }, (500));
    });
    //change font
    $("#fFamilyTxt").change(function () {
        var font = document.getElementById("fFamilyTxt").value;
        document.getElementById('iframe').contentWindow.changeFontFamily(font);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            AutoSaveData();
        }, (500));
    });
    //change color
    $(document).on('click', '.c-color-schemes__row', function () {
        $(".c-color-schemes div.c-color-schemes__row").each(function (i, el) {
            $(el).removeClass("is-active");
        });
        $(this).addClass("is-active");
        var mainColor = $(this).find(".c-color-schemes__list div").eq(0).css('background-color');
        var sideColor = $(this).find(".c-color-schemes__list div").eq(1).css('background-color');
        var fontColor = $(this).find(".c-color-schemes__list div").eq(2).css('background-color');
        document.getElementById('iframe').contentWindow.changeColor(mainColor, sideColor, fontColor);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            AutoSaveData();
        }, (500));
    });
    //Save CV share
    $("#cv_Savelink").click(function () {
        var id_document = $('#id_document').val();
        link = root + '/share-cv/' + id_document;

        $("#cv_btShare").prop("disabled", false);
        $.ajax({
            url: ajaxURL + "saveJsonShare",
            data: {
                id_resume: id_document
            },
            success: function (data) {
                createAlert('', '', Lang.get('label.Alert.Save.success'), 'info', false, true, 'pageMessages');
            },
            error: function (error) {
                swal(Lang.get('label.Alert.Save.fail'), "", "error");
            }
        })
    });
    $(document).on('click', '.resonl__clipboard', function () {

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($("#resonlText").text()).select();
            document.execCommand("copy");
            createAlert('', '', Lang.get('label.Alert.copyToClipboard'), 'info', false, true, 'pageMessages');
        }, (1000));
    });
    $(document).on('click', '#saveDocument', function () {
        btSaveClick = true;
        $('#saveDocument').addClass('is-disabled-save');
        saveAll('true');
        clearInterval(saveTimer);
        timeleft = timeSave;
        document.getElementById("countdowntimer").textContent = '0';
    });
    //delete item
    $(document).on('click', '.js_modal-delete', function () {
        let pos = $(this).parents('.onv_modal').data('pos');
        let container = "js_list-container-" + $(this).parents('.onv_modal').data('container');
        let section = $(this).parents('.onv_modal').data('container');
        let uniqid = $(this).parents('.onv_modal').data('uniqid');
        let object = null;
        swal({
                title: Lang.get('label.Alert.titleConfirm'),
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: Lang.get('label.Alert.confirmButton'),
                cancelButtonText: Lang.get('label.Alert.cancelButton'),
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    createAlert('', '', Lang.get('label.Alert.Save.success'), 'info', false, true, 'pageMessages');
                    document.getElementById('iframe').contentWindow.deleteItem(container, pos);
                }
                else {
                }
            });
        $(this).parents(".onv_modal").css("display", "none");
    });
    //add sections
    $('#resetLayoutBtn').click(function () {
        document.getElementById('iframe').contentWindow.addSections();
    });
    //save item
    $(document).on('click', '.js_modal-save', function () {
        let pos = $(this).parents('.onv_modal').data('pos');
        let uniqid = $(this).parents('.onv_modal').data('uniqid');
        let section = $(this).parents('.onv_modal').data('container');
        if (section === "summary") {
            let summary = $("#summary_modal").val();
            var object = {'summary': summary};
            if (summary === "") {
                $("#shake_summary").effect("shake");
                $("#error_summary").text("Trường này không thể để trống");
            }
            else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            }
        } else if (section === "experience") {
            let position = $("#positionExp_modal").val();
            let company = $("#companyExp_modal").val();
            let experience = $("#experienceExp_modal").val();
            let month_from = $('select[name=MonthFromExp_modal]').val();
            let year_from = $('select[name=YearFromExp_modal]').val();
            let month_to = $('select[name=MonthToExp_modal]').val();
            let year_to = $('select[name=YearToExp_modal]').val();
            var object = {
                'position': position,
                'company': company,
                'experience': experience,
                'month_from': month_from,
                'year_from': year_from,
                'month_to': month_to,
                'year_to': year_to
            };
            if (company === "") {
                $("#shake_company").effect("shake");
                $("#error_company").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            }
        }
        else if (section === "education") {
            let schoolname = $("#schoolname_modal").val();
            let degree = $("#degree_modal").val();
            let description = $("#description_modal").val();
            let month_from = $('select[name=MonthFromEdu_modal]').val();
            let year_from = $('select[name=YearFromEdu_modal]').val();
            let month_to = $('select[name=MonthToEdu_modal]').val();
            let year_to = $('select[name=YearToEdu_modal]').val();
            var object = {
                'schoolname': schoolname,
                'degree': degree,
                'description': description,
                'month_from': month_from,
                'year_from': year_from,
                'month_to': month_to,
                'year_to': year_to
            };
            if (schoolname === "") {
                $("#shake_schoolname").effect("shake");
                $("#error_schoolname").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");

            }
        }
        else if (section === "skills") {
            let skill = $("#skill_modal").val();
            let rating = $('input[name=level_modal]:checked').val();
            var object = {'skill': skill, 'rating': rating};
            if (skill === "") {
                $("#shake_skills").effect("shake");
                $("#error_skills").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");

            }
        }
        else if (section === "letter_content") {
            let citydate = $("#citydate_modal").val();
            let recipient = $("#recipient_modal").val();
            let content = $("#content_modal").val();
            var object = {'citydate': citydate, 'recipient': recipient, 'content': content};
            if (recipient === "") {
                $("#shake_interests").effect("shake");
                $("#error_interests").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            }
        }
        else if (section === "interests") {
            let interest = $("#interest_modal").val();
            var object = {'interest': interest};
            if (interest === "") {
                $("#shake_interests").effect("shake");
                $("#error_interests").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            }
        }
        else if (section === "awards") {
            let award = $("#award_modal").val();
            var object = {'award': award};
            if (award === "") {
                $("#shake_award").effect("shake");
                $("#error_award").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            }
        }
        else if (section === "additional") {
            let additional = $("#additional_modal").val();
            var object = {'additional': additional};
            if (additional === "") {
                $("#shake_additional").effect("shake");
                $("#error_additional").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            }
        }
        else if (section === "activities") {
            let activity = $("#activity_modal").val();
            let achievement = $("#achievement_modal").val();
            var object = {'activity': activity, 'achievement': achievement};
            if (activity === "") {
                $("#shake_activity").effect("shake");
                $("#error_activity").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            }
        }
        else if (section === "languages") {
            let language = $("#language_modal").val();
            let fluency = $("#fluency_modal").val();
            var object = {'language': language, 'fluency': fluency};
            if (language === "") {
                $("#shake_language").effect("shake");
                $("#error_language").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            }
        }
        else if (section === "projects") {
            let project = $("#project_modal").val();
            var object = {'project': project};
            if (project === "") {
                $("#shake_project").effect("shake");
                $("#error_project").text("Trường này không thể để trống");
            } else {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            }
        }
        else if (section === "references") {
            let refer_name = $("#refer_name_modal").val();
            let refer_email = $("#refer_email_modal").val();
            let refer_phone = $("#refer_phone_modal").val();
            let refer_profession = $("#refer_profession_modal").val();
            var object = {
                'refer_name': refer_name,
                'refer_email': refer_email,
                'refer_phone': refer_phone,
                'refer_profession': refer_profession
            };
            if (refer_phone !== "") {
                if (!validatePhone(refer_phone)) {
                    $("#shake_refer_phone").effect("shake");
                    $("#error_refer_phone").text("không đúng định dạng số điện thoại");
                }
                else {
                    $("#error_refer_phone").text("");
                }
            }
            else {
                $("#shake_refer_phone").effect("shake");
                $("#error_refer_phone").text("Trường này không thể để trống");
            }
            if (refer_email !== "") {
                if (!validateEmail(refer_email)) {
                    $("#shake_refer_email").effect("shake");
                    $("#error_refer_email").text("không đúng định dạng email");
                }
                else {
                    $("#error_refer_email").text("");
                }
            }
            else {
                $("#shake_refer_email").effect("shake");
                $("#error_refer_email").text("Trường này không thể để trống");
            }

            if (refer_profession === "") {
                $("#shake_refer_profession").effect("shake");
                $("#error_refer_profession").text("Trường này không thể để trống");
            }
            else {
                $("#error_refer_profession").text("");
            }
            if (refer_name === "") {
                $("#shake_refer_name").effect("shake");
                $("#error_refer_name").text("Trường này không thể để trống");
            }
            else {
                $("#error_refer_name").text("");
            }
            if ($("#error_refer_name").text() === "" && $("#error_refer_profession").text() === "" && $("#error_refer_email").text() === "" && $("#error_refer_phone").text() === "") {
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
                $("#error_refer_profession").text("");
            }
        }
        else if (section === "crop") {
            sleep(1000).then(() => {
                let src = $("#avatar_src").prop('src');
                var object = {'src': src};
                document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
                $(this).parents(".onv_modal").fadeOut("slow");
            });
        }
        else if (section === "contact") {
            let name = $("#name_modal").val();
            let profession = $("#profession_modal").val();
            let address = $("#address_modal").val();
            let phone = $("#phone_modal").val();
            let email = $("#email_modal").val();
            let placeofbirth = $("#placeofbirth_modal").val();
            let dateofbirth = $("#dateofbirth_modal").val();
            let marital = $("#marital_modal").val();
            let citizenship = $("#citizenship_modal").val();
            let website = $("#website_modal").val();
            let facebook = $("#facebook_modal").val();
            let linkedin = $("#linkedin_modal").val();
            var object = {
                'name': name,
                'profession': profession,
                'address': address,
                'phone': phone,
                'email': email,
                'website': website,
                'placeofbirth': placeofbirth,
                'dateofbirth': dateofbirth,
                'linkedin': linkedin,
                'facebook': facebook,
                'marital': marital,
                'citizenship': citizenship
            };
            document.getElementById('iframe').contentWindow.saveModal(section, pos, object);
            $(this).parents(".onv_modal").fadeOut("slow");
        } else if (section === "sections") {
            var array = [];
            $('#sections_form').find('input').each(function () {
                if ($(this).is(":checked")) {
                    array.push($(this).val());
                }
            });
            $(this).parents(".onv_modal").fadeOut("slow");
            swal({
                    title: Lang.get('label.Alert.titleConfirm'),
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: Lang.get('label.Alert.confirmButton'),
                    cancelButtonText: Lang.get('label.Alert.cancelButton'),
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        if (save_checked === false) {
                            saveAll('false');
                            clearInterval(saveTimer);
                            timeleft = timeSave;
                            document.getElementById("countdowntimer").textContent = '0';
                        }
                        loadingtask(true);
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(function () {
                            $.ajax({
                                url: ajaxURL + "addSections",
                                method: "Post",
                                data: JSON.stringify({
                                    'sections': array,
                                    'id_resume': id_document
                                }),
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                beforeSend: function () {

                                },
                                complete: function () {
                                    let timeoutId;
                                    clearTimeout(timeoutId);
                                    timeoutId = setTimeout(function () {
                                        loadingtask(false);
                                    }, (3000));
                                    AutoSaveData();
                                },
                                success: function (data) {
                                    $('#iframe').css("display", "none");
                                    $('#iframe').fadeOut(function () {
                                        $(this).attr('src', function (i, val) {
                                            return val;
                                        });
                                    }).fadeIn();
                                    createAlert('', '', Lang.get('label.Alert.Save.success'), 'info', false, true, 'pageMessages');
                                },
                                error: function (error) {
                                }
                            });
                        }, (2000));

                    }
                    else {
                        swal(Lang.get('label.Alert.messCancel'), "", "error");
                    }
                });
        }
    });
    $(document).on('click', '.entryDelPersonal', function () {
        $(this).parents('.has-sortable').find('input').val("");
    });
});

function readFile(input) {
    if (input.files[0].size / 1024 / 1024 > 2) {
        alert('Giới hạn ảnh dưới 2MB');
    }
    else if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            result = e.target.result;
            arrTarget = result.split(';');
            tipo = arrTarget[0];
            if (tipo == 'data:image/jpeg' || tipo == 'data:image/png') {
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                });
                $('.upload-demo').addClass('ready');
            } else {
                alert('Chỉ chấp nhận ảnh có đuôi .png và .jpg');
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function counttimeDownload(timeleft) {
    downloadTimer = setInterval(function () {
        document.getElementById("downloadtime").textContent = timeleft;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById('iframe').contentWindow.downloadpdf(id_document, namedownload);
        }
        timeleft--;
    }, 1000);
}

function validatePhone(txtPhone) {
    var filter = /^[0-9-+]+$/;
    if (filter.test(txtPhone)) {
        return true;
    }
    else {
        return false;
    }
}

function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}

function saveAll(CheckCreatePDF) {

    save_checked = true;
    let font, fontsize, linespacing;
    font = $("#fFamilyTxt option:selected").text();
    fontsize = $('#rangeFontSize').val();
    linespacing = $('#rangeLineSpacing').val();
    var edit_page = JSON.stringify({'font': font, 'fontsize': fontsize, 'linespacing': linespacing}, null, 4);
    document.getElementById('iframe').contentWindow.saveAll(id_document, edit_page, namedownload, CheckCreatePDF);
}

function AutoSaveData() {
    btSaveClick = false;
    save_checked = false;
    $('#saveDocument').removeClass('is-disabled-save');
    if (timeleft === timeSave) {
        timeleft = timeSave;
        saveTimer = setInterval(function () {
            timeleft--;
            document.getElementById("countdowntimer").textContent = timeleft;
            if (timeleft <= 0)
                clearInterval(saveTimer);
            if (timeleft === 0) {
                saveAll('false');
                timeleft = timeSave;
            }
        }, 1000);
    }
}

function getAutoSaveJson() {
    let color, font, fontsize, linespacing;
    $('#colorpick').find('.c-color-schemes div').each(function (i, el) {
        if ($(this).hasClass('is-active')) {
            color = $(this).data('template-color-id');
        }
    });
    font = $("#fFamilyTxt option:selected").text();
    fontsize = $('#rangeFontSize').val();
    linespacing = $('#rangeLineSpacing').val();
    var edit_page = JSON.stringify({
        'font': font,
        'fontsize': fontsize,
        'linespacing': linespacing,
        'color': color
    }, null, 4);

    document.getElementById('iframe').contentWindow.AutoSaveJson(id_document, edit_page);
}

function openTab(evt, tacegory, id_document) {
    var shareCV = true;

    if (tacegory === 'Preview' && $('.js-navbar-preview').hasClass('is-active') === false) {
        $('#iframe').css("display", "none");
        $('#iframe').fadeOut(function () {
            $(this).attr('src', function (i, val) {
                return val;
            });
        }).fadeIn();
    } else if (tacegory !== 'Preview' && tacegory !== 'Resume' && $('.js-navbar-preview').hasClass('is-active') === true || $('.js-navbar-online').hasClass('is-active') === true) {
        if (save_checked === false) {
            saveAll('false');
            clearInterval(saveTimer);
            timeleft = timeSave;
            document.getElementById("countdowntimer").textContent = '0';
        }
    } else if (tacegory == 'Resume') {

        if (save_checked === false) {
            shareCV = false;
            swal({
                    title: Lang.get('label.Alert.confirmSave'),
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: Lang.get('label.Alert.confirmButton'),
                    cancelButtonText: Lang.get('label.Alert.cancelButton'),
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {


                        btSaveClick = true;
                        $('#saveDocument').addClass('is-disabled-save');
                        saveAll('true');
                        clearInterval(saveTimer);
                        timeleft = timeSave;
                        document.getElementById("countdowntimer").textContent = '0';

                        loadingtask(true);
                        timeoutId = setTimeout(function () {
                            loadingtask(false);
                            var i, tabcontent, tablinks;
                            tabcontent = document.getElementsByClassName("section-content");
                            for (i = 0; i < tabcontent.length; i++) {
                                tabcontent[i].style.display = "none";
                            }
                            tablinks = document.getElementsByClassName("navbar__link");
                            for (i = 0; i < tablinks.length; i++) {
                                tablinks[i].className = tablinks[i].className.replace(" is-active", "");
                            }
                            document.getElementById(tacegory).style.display = "block";

                        }, (2000));

                    }
                });
        }
    }
    if (shareCV) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("section-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("navbar__link");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" is-active", "");
        }
        document.getElementById(tacegory).style.display = "block";
        evt.currentTarget.className += " is-active";
    }
}

function OpenModal(section, pos, uniqid, bl_delete, object, fieldNull) {
    $(".editor-full").jqteVal('');
    $(".editor-mini").jqteVal('');
    $('#' + section).removeData('pos');
    $('#' + section).removeData('uniqid');
    $('#' + section).attr('data-pos', pos);
    $('#' + section).attr('data-uniqid', uniqid);
    $('#' + section).find('.js_modal-delete').css('display', 'inline');
    if (bl_delete) {
        $('#' + section).find('.js_modal-delete').css('display', 'none');
        $('#' + section).find('.js_modal-delete').prop('disabled', true);
    }
    $('#' + section).find('.js_disabled-field').removeClass('is-disabled-filed');
    if (section !== 'AddSectionsModal') {
        Object.keys(fieldNull).map(function (objectKey, index) {
            $("#" + fieldNull[objectKey] + "_modal").parents('.js_disabled-field').addClass('is-disabled-filed');
        });
    }
    if (section === 'EducationModal') {
        $("#error_schoolname").text("");
        $('#EducationModal').removeData('pos');
        $('#EducationModal').removeData('uniqid');
        $('#EducationModal').attr('data-pos', pos);
        $('#EducationModal').attr('data-uniqid', uniqid);
        $("#schoolname_modal").jqteVal(object['schoolname']);
        $("#degree_modal").jqteVal(object['degree']);
        $("#description_modal").jqteVal(object['description']);
        $('select[name=MonthFromEdu_modal] option[value="' + object['month_from'] + '"]').prop('selected', 'selected');
        $("select[name=YearFromEdu_modal] option[value=" + object['year_from'] + "]").prop('selected', 'selected');
        $('select[name=MonthToEdu_modal] option[value="' + object['month_to'] + '"]').prop('selected', 'selected');
        $("select[name=YearToEdu_modal] option[value=" + object['year_to'] + "]").prop('selected', 'selected');
        if (object['month_to'] === 'Present') {
            $('#form_education').addClass('is-disabled');
            $('#checkbox-education').attr('checked', true);
            $('select[name=MonthToEdu_modal]').prop('disabled', true);
            $('select[name=YearToEdu_modal]').prop('disabled', true);
        }
        else {
            $('select[name=MonthToEdu_modal]').prop('disabled', false);
            $('select[name=YearToEdu_modal]').prop('disabled', false);
            $('#form_education').removeClass('is-disabled');
            $('#checkbox-education').attr('checked', false);
        }
    }
    else if (section === 'ExperienceModal') {
        $("#error_company").text("");
        $("#positionExp_modal").jqteVal(object['position']);
        $("#companyExp_modal").jqteVal(object['company']);
        $("#experienceExp_modal").jqteVal(object['experience']);
        $('select[name=MonthFromExp_modal] option[value="' + object['month_from'] + '"]').prop('selected', 'selected');
        $('select[name=YearFromExp_modal] option[value=' + object['year_from'] + ']').prop('selected', 'selected');
        $('select[name=MonthToExp_modal] option[value="' + object['month_to'] + '"]').prop('selected', 'selected');
        $("select[name=YearToExp_modal] option[value=" + object['year_to'] + "]").prop('selected', 'selected');
        if (object['month_to'] === 'Present') {
            $('#form_experience').addClass('is-disabled');
            $('#checkbox-experience').attr('checked', true);
            $('select[name=MonthToExp_modal]').prop('disabled', true);
            $('select[name=YearToExp_modal]').prop('disabled', true);
        }
        else {
            $('select[name=MonthToExp_modal]').prop('disabled', false);
            $('select[name=YearToExp_modal]').prop('disabled', false);
            $('#form_experience').removeClass('is-disabled');
            $('#checkbox-experience').attr('checked', false);
        }
    }
    else if (section === 'InterestsModal') {
        $("#error_interests").text("");
        $("#interest_modal").jqteVal(object['interest']);
    }
    else if (section === 'ProjectsModal') {
        $("#error_project").text("");
        $("#project_modal").jqteVal(object['project']);
    }
    else if (section === 'AwardsModal') {
        $("#error_award").text("");
        $("#award_modal").jqteVal(object['award']);
    }
    else if (section === 'SkillsModal') {
        $("#error_skills").text("");
        $("#skill_modal").jqteVal(object['skill']);
        $('input[name="level_modal"][value="' + object['rating'] + '"]').prop('checked', true)
    }
    else if (section === 'ContactModal') {
        $("#name_modal").val(object['name']);
        $("#profession_modal").val(object['profession']);
        $("#address_modal").jqteVal(object['address']);
        $("#phone_modal").val(object['phone']);
        $("#email_modal").val(object['email']);
        $("#website_modal").val(object['website']);
        $("#placeofbirth_modal").val(object['placeofbirth']);
        $("#dateofbirth_modal").val(object['dateofbirth']);
        $("#linkedin_modal").val(object['linkedin']);
        $("#facebook_modal").val(object['facebook']);
        $("#marital_modal").val(object['marital']);
        $("#citizenship_modal").val(object['citizenship']);
    }
    else if (section === 'SummaryModal') {
        $("#error_summary").text("");
        $("#summary_modal").jqteVal(object['summary']);
    }
    else if (section === 'AdditionalModal') {
        $("#error_additional").text("");
        $("#additional_modal").jqteVal(object['additional']);
    }
    else if (section === 'AddSectionsModal') {
        $("#sections_form input[name='sections']").each(function (i, el) {
            $(this).removeAttr("checked");
        });
        object.forEach(function (currentValue, index, arr) {
            $("#sections_form input[name='sections']").each(function (i, el) {
                if ($(this).val() === currentValue) {
                    $(this).prop("checked", 'true');
                }
            });
        });
    }
    else if (section === 'CropModal') {
        html = '<script>$uploadCrop = $("#upload-demo").croppie({enableExif: true,viewport: {width: ' + object['width'] + ',height: ' + object['height'] + ',type: "square"},boundary: {height: 300}});</script>';
        $("#define-upload").children().remove();
        $("#upload-demo").children().remove();
        $("#define-upload").append(html);
        $("#src_modal").prop('src', object['src']);
    }
    else if (section === 'Letter_ContentModal') {
        $("#error_interests").text("");
        $("#citydate_modal").jqteVal(object['citydate']);
        $("#recipient_modal").jqteVal(object['recipient']);
        $("#content_modal").jqteVal(object['content']);
    }
    else if (section === 'LanguagesModal') {
        $("#error_language").text("");
        $("#language_modal").jqteVal(object['language']);
        $("#fluency_modal").jqteVal(object['fluency']);
    }
    else if (section === 'ActivitiesModal') {
        $("#error_activities").text("");
        $("#activity_modal").jqteVal(object['activity']);
        $("#achievement_modal").jqteVal(object['achievement']);
    }
    else if (section === 'ReferencesModal') {
        $("#error_reference").text("");
        $("#refer_name_modal").jqteVal(object['refer_name']);
        $("#refer_email_modal").val(object['refer_email']);
        $("#refer_phone_modal").val(object['refer_phone']);
        $("#refer_profession_modal").jqteVal(object['refer_profession']);
    }
    var modal = document.getElementById(section);
    modal.style.display = "block";
}

function createAlert(title, summary, details, severity, dismissible, autoDismiss, appendToId) {
    var iconMap = {
        info: "fa fa-check-square-o",
        success: "fa fa-thumbs-up",
        warning: "fa fa-exclamation-triangle",
        danger: "fa ffa fa-exclamation-circle"
    };
    var iconAdded = false;
    var alertClasses = ["alert", "animated", "flipInX"];
    alertClasses.push("alert-" + severity.toLowerCase());
    if (dismissible) {
        alertClasses.push("alert-dismissible");
    }
    var msgIcon = $("<i />", {
        "class": iconMap[severity]
    });
    var msg = $("<div />", {
        "class": alertClasses.join(" ")
    });
    if (title) {
        var msgTitle = $("<h4 />", {
            html: title
        }).appendTo(msg);
        if (!iconAdded) {
            msgTitle.prepend(msgIcon);
            iconAdded = true;
        }
    }
    if (summary) {
        var msgSummary = $("<strong />", {
            html: summary
        }).appendTo(msg);

        if (!iconAdded) {
            msgSummary.prepend(msgIcon);
            iconAdded = true;
        }
    }
    if (details) {
        var msgDetails = $("<p />", {
            html: details
        }).appendTo(msg);

        if (!iconAdded) {
            msgDetails.prepend(msgIcon);
            iconAdded = true;
        }
    }
    if (dismissible) {
        var msgClose = $("<span />", {
            "class": "close",
            "data-dismiss": "alert",
            html: "<i class='fa fa-times-circle'></i>"
        }).appendTo(msg);
    }
    $('#' + appendToId).prepend(msg);
    if (autoDismiss) {
        setTimeout(function () {
            msg.addClass("flipOutX");
            setTimeout(function () {
                msg.remove();
            }, 1000);
        }, 1000);
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function showerrodown() {
    modal.style.display = "none";
    swal(Lang.get('label.Alert.messErrorDownload'), "", "error");
}

function loadingtask(is) {
    if (is) {
        $('#builder').addClass('is-loading-save');
        $('#loading-wrapper').show();
    }
    else {
        $('#builder').removeClass('is-loading-save');
        $('#loading-wrapper').hide();
    }
}

function hiddenSections(sections) {
    var timeoutId;
    swal({
            title: Lang.get('label.Alert.titleConfirm'),
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: Lang.get('label.Alert.confirmButton'),
            cancelButtonText: Lang.get('label.Alert.cancelButton'),
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                if (save_checked === false) {
                    saveAll('false');
                    clearInterval(saveTimer);
                    timeleft = timeSave;
                    document.getElementById("countdowntimer").textContent = '0';
                }
                loadingtask(true);
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    $.ajax({
                        url: ajaxURL + "hiddenSections",
                        method: "Post",
                        data: JSON.stringify({
                            'sections': sections,
                            'id_resume': id_document
                        }),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function () {
                        },
                        complete: function () {
                            let timeoutId;
                            clearTimeout(timeoutId);
                            timeoutId = setTimeout(function () {
                                loadingtask(false);
                            }, (3000));
                            AutoSaveData();
                        },
                        success: function (data) {
                            $('#iframe').css("display", "none");
                            $('#iframe').fadeOut(function () {
                                $(this).attr('src', function (i, val) {
                                    return val;
                                });
                            }).fadeIn();
                            createAlert('', '', Lang.get('label.Alert.Save.success'), 'info', false, true, 'pageMessages');
                        },
                        error: function (error) {
                        }
                    });
                }, (2000));
            }
            else {
            }
        });
}