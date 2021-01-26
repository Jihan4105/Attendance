function LectureSelectFix() {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/HelloWorld",
        data: {},
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "";
            for (var i = 0; i < 10;i++) {
                html += '<tr>'
                html += '<td>' + items[No].No + '</td>'
                html += '<td>' + items[No].className + '</td>'
                html += '<td>' + items[No].time + '</td>'
                html += '<td>' + items[No].proFessor + '</td>'
                html += '</tr>'
            }
            html += '</tbody>' + '</table>'
            $("#lecturelist").empty();
            $("#lecturelist").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
}

function LectureSelectDelete() {
    var isNumberChk = $("input:checkbox[name=no]").is(":checked");
    if (!isNumberChk) {
        alert("삭제할 항목을 선택해주세요.");
    }
    else {
        alert("선택된 항목들이 삭제되었습니다!");
    }
}

function GoFixSite() {
    $("#mainBase").load("./html/lecture_Fixpage.html #lecturefix");
}

function GoAddSite() {
    $("#mainBase").load("./html/lecture_AddPage.html #lectureadd")
}

$(document).ready(function () {
    $('#lecturelist tr').click(function (event) {
        if (event.target.nodeName.toLowerCase() == 'td') {
            var checkbox = $(this).find('td:first-child :checkbox');
            checkbox.attr('checked', !checkbox.is(':checked'));
        }
    });
});