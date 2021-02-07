var global_table = [];
var deferred = $.Deferred();
var global_arry = [];
$.ajax({
    url: "./WebService/WebService.asmx/Lec_Lookup",
    data: {},
    dataType: "json",
    method: "post",
    success: function (result) {
        global_table = result.items;
        deferred.resolve(result);
    },
    error: function (result) {
        deferred.reject();
    }
});

function Lec_Lookup() {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Lec_Lookup",
        data: {},
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "";
            for (No in result.items) {
                html += '<tr>';
                html += '<td class="row-id">' + '<input type="checkbox" data-no="' + result.items[No].No + '" name="no">' + '</td>';
                html += '<td>' + result.items[No].className + '</td>';
                html += '<td>' + result.items[No].time + '</td>';
                html += '<td>' + result.items[No].proFessor + '</td>';
                html += '</tr>';
            }
            $("#lec_list_id").empty();
            $("#lec_list_id").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Lec_Delete_Button() {
    var nom = document.getElementsByName("no");
    var arr = [];
    for (var i = 0, k = 0; i < nom.length; i++) {
        if (nom[i].checked == true) {
            arr[k] = nom[i].dataset.no;
            k++;
        }
    }
    if (arr.length == 0) {
        alert("삭제할 항목을 선택해 주십시오.");
        return false;
    }
    else if (arr.length > 1) {
        alert("한개만 선택해 주십시오.");
        return false;
    }
    Lec_Delete(arr[0])
        .done(function () {
            Lec_Lookup()
                .done(function () {
                    alert("성공적으로 삭제되었습니다!");
                });
        })
        .fail(function () {
            alert("삭제실폐");
            return;
        });
}

function Lec_Fix_Page_Load() {
    $("#main_base_id").load("./html/Lec_Fix_Page.html #fix_div_id", function () {
        $("#subject_fix").val($("#tmp_storage_id").data("subject"));
        $("#times_fix").val($("#tmp_storage_id").data("time"));
        $("#person_fix").val($("#tmp_storage_id").data("person"));
    });
}

function Lec_Register_Button() {
    var sub = $("#register_subject_id").val();
    var time = $("#register_time_id").val();
    var per = $("#register_professor_id").val();
    Lec_Register(sub, time, per)
        .done(function () {
            Lec_Search_Href();
        });
}

function Lec_Fix_Button() {
    var sub = $("#subject_fix").val();
    var time = $("#times_fix").val();
    var per = $("#person_fix").val();
    Lec_Fix(global_arry[0], sub, time, per)
        .done(function () {
            alert("수정되었습니다!");
            Lec_Search_Href();
        })
        .fail(function () {
            alert("실폐하였습니다.");
        });
}

function Lec_Delete(no) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Lec_Delete",
        data: {
            classNo: no
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

function Lec_Register(sub, time, per) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Lec_Register",
        data: {
            sub: sub,
            time: time,
            person: per
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

function Lec_Fix(num, sub, time, per) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Lec_Fix",
        data: {
            num: num,
            sub: sub,
            time: time,
            person: per
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
function Lec_Fix_Page_Button() {
    var nom = document.getElementsByName("no");
    for (var i = 0, k = 0; i < nom.length; i++) {
        if (nom[i].checked == true) {
            $("#tmp_storage_id").data("subject", global_table[i].className);
            $("#tmp_storage_id").data("time", global_table[i].time);
            $("#tmp_storage_id").data("person", global_table[i].proFessor);
            global_arry[k] = nom[i].dataset.no;
            k++;
        }
    }
    if (global_arry.length == 0) {
        alert("수정할 항목을 선택해 주십시오.");
        return false;
    }
    else if (global_arry.length > 1) {
        alert("한개만 선택해 주십시오.");
        global_arry = [];
        return false;
    }
    Lec_Fix_Page_Load();
}

function Show_Popover() {
    $('[data-toggle="popover"]').popover();
}

function Lec_Lea_Class_Lookup() {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Lec_Schedule_Class_Lookup",
        data: {},
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "<option value='' selected disabled>" + "Please select" + "</option>";
            for (No in result.scheduleitems) {
                html += "<option data-no=" + result.scheduleitems[No].No + ">" + result.scheduleitems[No].className + "</option>";
            }
            $("#lea_class_id").empty();
            $("#lea_class_id").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}
var global_selected_classNo;
function Lec_Lea_Class_Select() {
    global_selected_classNo = $("#lea_class_id option:selected").data("no");
    Lec_Lea_Lookup(global_selected_classNo);
}
var global_learner_table = [];
function Lec_Lea_Lookup(no) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Lec_Lea_Lookup",
        data: {
            no: no
        },
        dataType: "json",
        method: "post",
        success: function (result) {
            global_learner_table = result.scheduleitems;
            var html = "";
            for (var i = 0; i < result.scheduleitems.length; i++) {
                /*<th>선택</th>
                    <th>과목</th>
                    <th>수강자</th>
                    <th>학번</th>*/
                html += '<tr>';
                html += '<td class="row-id">' + '<input class="schedulechk" data-name=' + result.scheduleitems[i].stu_name+' name="lea_chk" type="checkbox" onchange="Auto_Chkbox(this)">' + '</td>';
                html += '<td>' + result.scheduleitems[i].className + '</td>';
                html += '<td>' + result.scheduleitems[i].stu_name + '</td>';
                html += '<td>' + result.scheduleitems[i].stu_identity + '</td>';
                html += '</tr>';
            }
            $("#lea_list_id").empty();
            $("#lea_list_id").append(html); 
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Lec_Lea_Delete_Button() {
    var chklist = document.getElementsByName("lea_chk");
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
    Lea_Delete(arr[0])
        .done(function () {
            Lec_Lea_Lookup(global_selected_classNo)
                .done(function () {
                    alert("성공적으로 삭제되었습니다!");
                });
        })
        .fail(function () {
            alert("삭제실폐");
            return;
        });
}

function Lea_Delete(stu_name) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Lea_Delete",
        data: {
            stu_name: stu_name,
            no: global_selected_classNo
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

function Auto_Chkbox(chk) {
    if (chk.checked) {
        $('input:checkbox[name="lea_chk"]').each(function () {
            this.checked = false;
        });
        chk.checked = true;
    }
}
