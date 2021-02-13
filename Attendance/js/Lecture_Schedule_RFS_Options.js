function Lec_Schedule_Class_Lookup() {
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
            $("#sel1_id").empty();
            $("#sel1_id").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Lec_Class_Select() {
    var no = $("#sel1_id option:selected").data("no");
    Lec_Schedule_Lookup(no);
}

function Lec_Schedule_Lookup(no) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Lec_Schedule_Lookup",
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
                html += '<td class="row-id">' + '<input id="schedulechk" class="schedulechk" name="schedulechk" type="checkbox" data-no="' + result.scheduleitems[classNo].classNo + '" data-date="' + result.scheduleitems[classNo].date + '" data-time="' + result.scheduleitems[classNo].time + '" data-id="' + result.scheduleitems[classNo].id + '" onchange="Auto_Inputbox_Edit(this)">' + '</td>';
                html += '<td>' + result.scheduleitems[classNo].date + '</td>';
                html += '<td>' + result.scheduleitems[classNo].time + '</td>';
                html += '</tr>';
            }
            $("#schedule_list_id").empty();
            $("#schedule_list_id").append(html); +
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Lec_Sch_Register() {
    var no = $("#sel1_id option:selected").data("no");
    var raw_date = $("#schedule_datepicker_id").dxDateBox("instance").option('value');
    var month = raw_date.getMonth() + 1;
    var day = raw_date.getDate();
    if (month < 10) { month = '0' + month; }
    if (day < 10) { day = '0' + day;}
    var date = raw_date.getFullYear() + "-" + month + "-" + day;
    var time = $("#schedule_time_id").val();
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
    Sch_Register(no, date, time)
        .done(function () {
            alert("추가되었습니다!")
            Lec_Schedule_Lookup(no);
            $("#schedule_date_id").val("");
            $("#schedule_time_id").val("");
        })
        .fail(function () {
            alert("Failed");
        });
}

function Sch_Register(no, date, time) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Sch_Register",
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

var global_selected_chk_no;
function Auto_Inputbox_Edit(chk) {
    if (chk.checked) {
        $('input:checkbox[name="schedulechk"]').each(function () {
            this.checked = false;
        });
        chk.checked = true;
        global_selected_chk_no = $(chk).data("no");
        global_chk_id = $(chk).data("id");
        var date = $(chk).data("date");
        var time = $(chk).data("time");
        $("#schedule_datepicker_id").val(date);
        $("#schedule_time_id").val(time);
    }
    else {
        $("#schedule_datepicker_id").val("");
        $("#schedule_time_id").val("");
    }
}

var global_chk_id;
function Lec_Sch_Fix() {
    var raw_date = $("#schedule_datepicker_id").dxDateBox("instance").option('value');
    var month = raw_date.getMonth() + 1;
    var day = raw_date.getDate();
    if (month < 10) { month = '0' + month; }
    if (day < 10) { day = '0' + day; }
    var date = raw_date.getFullYear() + "-" + month + "-" + day;
    var time = $("#schedule_time_id").val();
    var no = $("#sel1_id option:selected").data("no");
    if (no == undefined) {
        alert("강의명을 위에서 선택해 주세요!");
        return;
    }
    else if (!$('input:checkbox[name="schedulechk"]').is(":checked")) {
        alert("항목을 선택해 주십시오!");
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
    Sch_Fix(global_selected_chk_no, date, time)
        .done(function () {
            alert("수정되었습니다!");
            Lec_Schedule_Lookup(no);
        })
        .fail(function () {
            alert("실폐하였습니다.");
        });
}

function Sch_Fix(global_selected_chk_no, date, time) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Sch_Fix",
        data: {
            classNo: global_selected_chk_no,
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

function Lec_Sch_Delete() {
    var no = $("#sel1_id option:selected").data("no");
    if (no == undefined) {
        alert("강의명을 위에서 선택해 주세요!");
        return;
    }
    else if (!$('input:checkbox[name="schedulechk"]').is(":checked")) {
        alert("항목을 선택해 주십시오!");
        return;
    }
    Sch_Delete(global_chk_id)
        .done(function () {
            alert("삭제되었습니다!");
            Lec_Schedule_Lookup(no);
        })
        .fail(function () {
            alert("실폐하였습니다.");
        });
}

function Sch_Delete(id) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Sch_Delete",
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