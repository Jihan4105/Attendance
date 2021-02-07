function Att_List_Lookup(no, from_date, until_date) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Att_List_Lookup",
        data: {
            no: no,
            from_date: from_date,
            until_date: until_date
        },
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "";
            for (var i = 0; i < result.att_list.length;i++) {
                html += '<tr>';
                html += '<td>' + result.att_list[i].className + '</td>';
                html += '<td>' + result.att_list[i].professor + '</td>';
                html += '<td>' + result.att_list[i].date + '</td>';
                html += '<td>' + result.att_list[i].time + '</td>';
                html += '<td>' + result.att_list[i].student_name + '</td>';
                html += '<td>' + result.att_list[i].att + '</td>';
                html += '</tr>';
            }
            $("#att_list_id").empty();
            $("#att_list_id").append(html); +
                deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Att_Class_Lookup() {
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
            $("#att_class_id").empty();
            $("#att_class_id").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Att_Lookup_Button() {
    var no = $("#att_class_id option:selected").data("no");
    var raw_date = $("#att_from_date_id").dxDateBox("instance").option('value');
    var month = raw_date.getMonth() + 1;
    var day = raw_date.getDate();
    if (month < 10) { month = '0' + month; }
    if (day < 10) { day = '0' + day; }
    var from_date = raw_date.getFullYear() + "-" + month + "-" + day;
    var raw_date = $("#att_until_date_id").dxDateBox("instance").option('value');
    var month = raw_date.getMonth() + 1;
    var day = raw_date.getDate();
    if (month < 10) { month = '0' + month; }
    if (day < 10) { day = '0' + day; }
    var until_date = raw_date.getFullYear() + "-" + month + "-" + day;
    Att_List_Lookup(no, from_date, until_date);
} 