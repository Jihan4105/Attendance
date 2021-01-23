function LectureSelectFix() {
    var isNumberChk = $("input:checkbox[name=no]").is(":checked");
    if (!isNumberChk) {
        alert("수정할 항목을 선택해주세요.");
    }
    else {
        var checkedStates = [$("#no1").is(":checked"), $("#no2").is(":checked"), $("#no3").is(":checked"), $("#no4").is(":checked")];
        var alerts=[];
        for (var i = 0; i < 4; i++) {
            if (checkedStates[i] == true) {
                alerts.push(i + 1);
            }
        }
        alert(alerts + "번 을 선택하셨습니다");
        GoFixSite();
    }
}

function LectureSelectDelete(){
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