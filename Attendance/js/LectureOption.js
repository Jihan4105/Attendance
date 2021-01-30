var table = [];
var deferred = $.Deferred();
var arry = [];
$.ajax({
    url: "./WebService/WebService.asmx/HelloWorld",
    data: {},
    dataType: "json",
    method: "post",
    success: function (result) {
        table = result.items;
        deferred.resolve(result);
    },
    error: function (result) {
        deferred.reject();
    }
});

function LectureLookup() {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/HelloWorld",
        data: {},
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "";
            for (No in result.items) {
                html += '<tr>';
                html += '<td class="row-id">' + result.items[No].No + '.' + '<input type="checkbox" data-no="' + result.items[No].No + '" name="no">' + '</td>';
                html += '<td>' + result.items[No].className + '</td>';
                html += '<td>' + result.items[No].time + '</td>';
                html += '<td>' + result.items[No].proFessor + '</td>';
                html += '</tr>';
            }
            $("#lecturelist").empty();
            $("#lecturelist").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function DeleteButton() {
    var my_tbody = document.getElementById("lecturelist");
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
    Deleting(arr[0])
        .done(function () {
            LectureLookup()
                .done(function () {
                    alert("성공적으로 삭제되었습니다!");
                });
        })
        .fail(function () {
            alert("삭제실폐");
            return;
        });
}

function GoFixSite() {
    $("#mainBase").load("./html/lecture_Fixpage.html #lecturefix");
}

function GoAddSite() {
    $("#mainBase").load("./html/lecture_AddPage.html #lectureadd")
}

function AddTableRow() {
    var sub = $("#subject").val();
    var time = $("#times").val();
    var per = $("#person").val();
    Adding(sub, time, per)
        .done(function () {
            LectureSearch();
        });
}

function FixTableRow() {
    var sub = $("#subject").val();
    var time = $("#times").val();
    var per = $("#person").val();
    Fixing(arry[0], sub, time, per)
        .done(function () {
            alert("수정되었습니다!");
            LectureSearch();
        })
        .fail(function () {
            alert("실폐하였습니다.");
        });
}

function Deleting(no) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/lecture_delete",
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

function Adding(sub, time, per) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/lecture_add",
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

function Fixing(num, sub, time, per) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/lecture_fix",
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

function UpdatePage() {
    var my_tbody = document.getElementById("lecturelist");
    var nom = document.getElementsByName("no");
    for (var i = 0, k = 0; i < nom.length; i++) {
        if (nom[i].checked == true) {
            $("#subject").attr("placeholder", table[i].className);
            $("#times").attr("placeholder", table[i].time);
            $("#person").attr("placeholder", table[i].proFessor);
            arry[k] = nom[i].dataset.no;
            k++;
        }
    }
    if (arry.length == 0) {
        alert("수정할 항목을 선택해 주십시오.");
        return false;
    }
    else if (arry.length > 1) {
        alert("한개만 선택해 주십시오.");
        arry = [];
        return false;
    }
    GoFixSite();
}