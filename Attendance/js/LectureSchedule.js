function ScheduleLookup() {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/ScheduleTable",
        data: {},
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "<option value='' selected disabled>" + "Please select" + "</option>";
            for (No in result.scheduleitems) {
                html += "<option data-no="+result.scheduleitems[No].No+">" + result.scheduleitems[No].className + "</option>";
            }
            $("#sel1").empty();
            $("#sel1").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function SelectLecture(sel) {
    var val = sel.value;
    var no = $("#sel1 option:selected").data("no");
    SearchclassSchedule(no);
}

function SearchclassSchedule(no) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/SearchclassSchedule",
        data: {
            classno: no
        },
        dataType: "json",
        method: "post",
        success: function (result) {
            scheduletable = result.scheduleitems;
            var html = "";
            for (classNo in result.scheduleitems) {
                html += '<tr>';
                html += '<td class="row-id">' + '<input class="schedulechk" name="schedulechk" type="checkbox" data-no="' + result.scheduleitems[classNo].classNo + '" data-date="' + result.scheduleitems[classNo].date + '" data-time="' + result.scheduleitems[classNo].time +'" data-id="'+result.scheduleitems[classNo].id+'" onchange="EditScheduleInput(this)">' + '</td>';
                html += '<td>' + result.scheduleitems[classNo].date + '</td>';
                html += '<td>' + result.scheduleitems[classNo].time + '</td>';
                html += '</tr>';
            }
            $("#schedulelist").empty();
            $("#schedulelist").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function ScheduleAdd() {
    var no = $("#sel1 option:selected").data("no");
    var date = $("#schedule_date").val();
    var time = $("#schedule_time").val();
    if (no == undefined) {
        alert("강의명을 위에서 선택해 주세요!"); 
        return;
    }
    else if (date == "" && time == "") {
        alert("박스안에 추가할 값을 넣어주세요!");
        return;
    }
    else if (date == "") {
        alert("날짜를 넣어주세요!");
        return;
    }
    else if (time == "") {
        alert("시간을 넣어주세요!");
        return;
    }
    reScheduling(no, date, time)
        .done(function () {
            alert("추가되었습니다!")
            SearchclassSchedule(no);
            $("#schedule_date").val("");
            $("#schedule_time").val("");
        })
        .fail(function () {
            alert("Failed");
        });
}

function reScheduling(no, date, time) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/reScheduling",
        data: {
            no: no,
            date: date,
            time: time
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

var lastselectedChkNo;
function EditScheduleInput(chk) {
    if (chk.checked) {
        $('input:checkbox[name="schedulechk"]').each(function () {
            this.checked = false;
        });
        chk.checked = true;
        lastselectedChkNo = $(chk).data("no");
        id = $(chk).data("id");
        var date = $(chk).data("date");
        var time = $(chk).data("time");
        $("#schedule_date").val(date);
        $("#schedule_time").val(time);
    }
    else {
        $("#schedule_date").val("");
        $("#schedule_time").val("");
    }
}

var id;
function FixScheduleRow() {
    var date = $("#schedule_date").val();
    var time = $("#schedule_time").val();
    var no = $("#sel1 option:selected").data("no");
    if (no == undefined) {
        alert("강의명을 위에서 선택해 주세요!");
        return;
    }
    if (!$('input:checkbox[name="schedulechk"]').is(":checked")) {
        alert("항목을 선택해 주십시오!");
        return;
    }
    FixingSchedule(id, lastselectedChkNo, date, time)
        .done(function () {
            alert("수정되었습니다!");
            SearchclassSchedule(no);
        })
        .fail(function () {
            alert("실폐하였습니다.");
        });
}

function FixingSchedule(id, lastselectedChkNo, date, time) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Schedule_Fix",
        data: {
            id: id,
            classNo: lastselectedChkNo,
            date: date,
            time: time
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

function DeleteScheduleRow() {
    var no = $("#sel1 option:selected").data("no");
    if (no == undefined) {
        alert("강의명을 위에서 선택해 주세요!");
        return;
    }
    else if (!$('input:checkbox[name="schedulechk"]').is(":checked")) {
        alert("항목을 선택해 주십시오!");
        return;
    }
    DeleteSchedule(id)
        .done(function () {
            alert("삭제되었습니다!");
            SearchclassSchedule(no);
        })
        .fail(function () {
            alert("실폐하였습니다.");
        });
}

function DeleteSchedule(id) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/DeleteSchedule",
        data: {
            id: id
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