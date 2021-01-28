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
                html += '<td class="row-id">' + result.items[No].No + '.' + '<input type="checkbox" name="no">' + '</td>';
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
}

function DeleteButton() {
    var isNumChk = $("input:checkbox[name='no']").is(":checked");
    var my_tbody = document.getElementById("lecturelist");
    var nom = document.getElementsByName("no");
    if (!isNumChk) {
        alert("한개 이상의 삭제할 항목을 선택해 주십시오.");
        return false;
    }
    else {
        for (var i = 0; i < nom.length; i++) {
            if (nom[i].checked == true) {
                my_tbody.deleteRow(i);
                i--;
            }
        }
        $(".row-id").each(function (i) {
            $(this).text(i + 1);
            $(this).append('.' + '<input type="checkbox" name="no">');
        });
        alert("성공적으로 삭제되었습니다!");
    }
}

function GoFixSite() {
    $("#mainBase").load("./html/lecture_Fixpage.html #lecturefix");
}

function GoAddSite() {
    $("#mainBase").load("./html/lecture_AddPage.html #lectureadd")
}