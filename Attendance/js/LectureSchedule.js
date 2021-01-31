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
            var html = "";
            for (classNo in result.scheduleitems) {
                html += '<tr>';
                html += '<td class="row-id">' + '<input class="schedulechk" name="schedulechk" type="checkbox" data-no="' + result.scheduleitems[classNo].classNo + '" data-date="' + result.scheduleitems[classNo].date + '" data-time="' + result.scheduleitems[classNo].time +'" name="no" onchange="EditScheduleInput(this)">' + '</td>';
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
    reScheduling(no, date, time)
        .done(function () {
            SearchclassSchedule(no);
            $("#schedule_date").val("");
            $("#schedule_time").val("");
        })
        .fail(function () {
            alert("aaa");
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

function FixScheduleRow() {
    var date = $("#schedule_date").val();
    var time = $("#schedule_time").val();
    Fixing(sub, time, per)
        .done(function () {
            alert("수정되었습니다!");
            LectureSearch();
        })
        .fail(function () {
            alert("실폐하였습니다.");
        });
}