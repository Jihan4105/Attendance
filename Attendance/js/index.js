$(function () {
    var myStorage = window.localStorage;
    var remember_email = myStorage.getItem("AMS_remember_email");
    if (remember_email != "") {
        $('input:checkbox[name="remember"]').prop("checked", true);
    }
    $("#email").val(remember_email);
})();

function Login() {
    var deferred = $.Deferred();
    var email = $("#email").val();
    var pwd = $("#pwd").val();
    $.ajax({
        url: "./WebService/WebService.asmx/Login",
        data: {
            email: email
        },
        dataType: "json",
        method: "post",
        success: function (result) {
            if (result.user_list.length === 0) {
                alert("없는 사용자 입니다");
                $("#email").val("");
                $("#pwd").val("");
                $("#email").focus();
                deferred.reject();
            }
            else {
                if (result.user_list[0].password === pwd) {
                    var myStorage = window.localStorage;
                    if ($('input:checkbox[name="remember"]').is(":checked")) {
                        myStorage.setItem("AMS_remember_email", result.user_list[0].email);
                    }
                    myStorage.setItem("AMS_user_email", result.user_list[0].email);
                    $(location).attr('href', './main.html');
                }
                else {
                    alert("비밀번호가 옳지 않습니다!");
                    $("#pwd").val("");
                    $("#pwd").focus();
                    deferred.reject();
                }
            }
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Remember_Button() {
    if (!$('input:checkbox[name="remember"]').is(":checked")) {
        var myStorage = window.localStorage;
        myStorage.setItem("AMS_remember_email", "");
    }
}