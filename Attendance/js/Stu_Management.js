var global_stu_table
var global_old_stu_identity
function Stu_List_Lookup() {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Stu_List_Lookup",
        data: {},
        dataType: "json",
        method: "post",
        success: function (result) {
            global_stu_table = result.stu_list;
            var html = "";
            for (var i = 0; i < result.stu_list.length;i++) {
                html += '<tr>';
                html += '<td class="row-id">' + '<input type="checkbox" data-name="' + result.stu_list[i].stu_name +'" name="stu_chklist" onchange="Stu_Inputbox_Auto_Edit(this)">' + '</td>';
                html += '<td>' + result.stu_list[i].stu_name + '</td>';
                html += '<td>' + result.stu_list[i].stu_identity + '</td>';
                html += '<td>' + result.stu_list[i].ph + '</td>';
                html += '</tr>';
            }
            $("#stu_list_id").empty();
            $("#stu_list_id").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Stu_Register_Button() {
    var stu_name = $("#stu_name_id").val();
    var stu_identity = $("#stu_identity_id").val();
    var ph = $("#stu_ph_id").val();
    Stu_Register(stu_name, stu_identity, ph)
        .done(function () {
            alert("추가되었습니다!");
            $("#stu_name_id").val("");
            $("#stu_identity_id").val("");
            $("#stu_ph_id").val("");
            Stu_Search_Href();
        })
        .fail(function () {
            alert("실폐하였습니다!");
        })
}

function Stu_Register(stu_name, stu_identity, ph) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Stu_Register",
        data: {
            stu_name: stu_name,
            stu_identity: stu_identity,
            ph: ph
        },
        dataType: "json",
        method: "post",
        success: function (result) {
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Stu_Inputbox_Auto_Edit(chk) {
    if (chk.checked) {
        $('input:checkbox[name="stu_chklist"]').each(function () {
            this.checked = false;
        });
        chk.checked = true;
    }
}

function Stu_Delete_Button() {
    var chklist = document.getElementsByName("stu_chklist");
    var arr = [];
    for (var i = 0, k = 0; i < chklist.length; i++) {
        if (chklist[i].checked == true) {
            arr[k] = chklist[i].dataset.name;
            k++;
        }
    }
    if (arr.length == 0) {
        alert("삭제할 항목을 선택해 주십시오.");
        return false;
    }
    Stu_Delete(arr[0])
        .done(function () {
            Stu_List_Lookup()
                .done(function () {
                    alert("성공적으로 삭제되었습니다!");
                });
        })
        .fail(function () {
            alert("삭제실폐");
            return;
        });
}

function Stu_Delete(stu_name) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Stu_Delete",
        data: {
            stu_name: stu_name
        },
        dataType: "json",
        method: "post",
        success: function (result) {
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Stu_Update_Button() {
    var k = -1;
    var chklist = document.getElementsByName("stu_chklist");
    for (var i = 0; i < chklist.length; i++) {
        if (chklist[i].checked == true) {
            global_old_stu_identity = global_stu_table[i].stu_identity;
            k = i;
        }
    }
    if (k == -1) {
        alert("수정할 항목을 선택해 주십시오.");
        return false;
    }
    else {
        Stu_Update_Page_Load(k);
    }
}

function Stu_Update_Page_Load(k) {
    $("#main_base_id").load("./html/Stu_Update_Page.html #stu_update_div_id", function () {
        $("#upd_stu_name_id").val(global_stu_table[k].stu_name);
        $("#upd_stu_identity_id").val(global_stu_table[k].stu_identity);
        $("#upd_ph_id").val(global_stu_table[k].ph);
    });
}

function Stu_Update_Page_Button() {
    var stu_name = $("#upd_stu_name_id").val();
    var stu_identity = $("#upd_stu_identity_id").val();
    var ph = $("#upd_ph_id").val();
    Stu_Update(stu_name, stu_identity, ph)
        .done(function () {
            alert("수정되었습니다!");
            Stu_Search_Href();
        })
        .fail(function () {
            alert("실폐하였습니다.");
        });
}

function Stu_Update(stu_name, stu_identity, ph) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Stu_Update",
        data: {
            global_old_stu_identity: global_old_stu_identity,
            stu_name: stu_name,
            stu_identity: stu_identity,
            ph: ph
        },
        dataType: "json",
        method: "post",
        success: function (result) {
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}