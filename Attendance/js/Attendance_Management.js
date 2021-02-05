function Att_List_Lookup(no) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Att_List_Lookup",
        data: {
            no: no
            /*date: date,
            time: time,
            student_name: student_name,*/
        },
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "";
            for (var i = 0; i < result.att_list.length;i++) {
                /*
                 * <th>과목</th>
                    <th>날짜</th>
                    <th>시간</th>
                    <th>학생명</th>
                    <th>출석여부</th>
                 */
                html += '<tr>';
                html += '<td>' + result.att_list[i].className + '</td>';
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

function Att_Class_Select() {
    var no = $("#att_class_id option:selected").data("no");
    Att_Date_Lookup(no)
        .done(function () {
            Att_List_Lookup(no);
        })
        .fail(function () {
            alert("실폐");
        });
}

function Att_Date_Lookup(no) {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Att_Date_Lookup",
        data: {
            no: no
        },
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "<option value='' selected disabled>" + "Please select" + "</option>";
            for (var i = 0; i < result.scheduleitems.length; i++) {
                html += "<option data-date=" + result.scheduleitems[i].date + ">" + result.scheduleitems[i].date + "</option>";
            }
            $("#att_date_id").empty();
            $("#att_date_id").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();

}