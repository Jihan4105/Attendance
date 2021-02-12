var global_stu_table;

function ShowPopup(mode) {
    PopupDataGrid = "";

    ProjectBody = $("#ProjectBody");

    $("#PopupModalPanel").remove();
    $("#PopupWindow").remove();


    var str = "<div id='PopupModalPanel' style='display: none; z-index: 990; background-color: transparent; position: absolute; left: 0px; top: 0px;'>";
    ProjectBody.append(str);

    str = "<div id='PopupWindow' style='display: none; z-index: 999; width: 600px; background-color: white; border: 1px solid lightgray; position: absolute; left: 20px; top: 80px; box-shadow: 3px 3px 6px grey;'>" +
        "   <div id='PopupHeader' class='d-flex w-100' style='background-color: #cbd1d8; border: 1px solid #acb6c1; cursor: move;' onmousedown='popupStartDrag(event, this)'>" +
        "       <div id='PopupTitle' class='p-2' style='margin-left:20px; font-size: 18px; font-weight: bold;'>학생명부</div>" +
        "   </div>" +
        "   <div id='PopupBody' style='padding:15px;'>" +
        "       <table class='table table-striped'>" +
        "           <thead style='background-color: lightgray'>" +
        "               <tr>" +
        "                   <th>체크</th>" +
        "                   <th>학생명</th>" +
        "                   <th>학번</th>" +
        "                   <th>전화번호</th>" +
        "               </tr>" +
        "           </thead>" +
        "           <tbody id='popup_stu_list_id'>" +
        "           </tbody>" +
        "       </table>" +
        "   </div > " +
        "   <div id='PopupFooter' class='d-flex justify-content-center' style='padding:15px;'>" +
        "       <div>" +
        "           <button id='PopupOKButton' class='btn btn-secondary btn-sm' style='width: 100px;' onclick='PopupOk()'>OK</button>" +
        "           <button id='PopupCancelButton' class='btn btn-secondary btn-sm' style='width: 100px; margin-left: 30px; display:inline-block; float:right;' onclick='PopupClose()'>CANCEL</button>" +
        "       </div>" +
        "   </div>" +
        "</div>";
    ProjectBody.append(str);
    var width = $(document).width();
    var height = $(document).height();
    $("#PopupModalPanel").width(width);
    $("#PopupModalPanel").height(height);
    var modalPanel = $("#PopupModalPanel");
    var popupWindow = $("#PopupWindow");
    var popupBody = $("#PopupBody");
    var array;
    setTimeout(function () {
        Show_Popup_Table()
            .done(function (result) {
                global_stu_table = result.stu_list;
                var html = "";
                for (var i = 0; i < result.stu_list.length; i++) {
                    html += '<tr>';
                    html += '<td class="row-id">' + '<input type="checkbox" data-name="' + result.stu_list[i].stu_name + '" name="popup_stu_chklist">' + '</td>';
                    html += '<td>' + result.stu_list[i].stu_name + '</td>';
                    html += '<td>' + result.stu_list[i].stu_identity + '</td>';
                    html += '<td>' + result.stu_list[i].ph + '</td>';
                    html += '</tr>';
                }
                $("#popup_stu_list_id").empty();
                $("#popup_stu_list_id").append(html);
            })
        modalPanel.show();
        popupWindow.show();
    }, 300);
}

function popupStartDrag(e, obj) {
    popupTargetObj = obj.parentElement;
    var e_obj = window.event ? window.event : e;
    popupDivLeft = popupGetLeft(popupTargetObj) - e_obj.clientX;
    popupDivTop = popupGetTop(popupTargetObj) - e_obj.clientY;

    document.onmousemove = popupMoveDrag;
    document.onmouseup = popupStopDrag;
    if (e_obj.preventDefault) e_obj.preventDefault();
}


function popupMoveDrag(e) {
    var e_obj = window.event ? window.event : e;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var dmvy = parseInt(e_obj.clientY + popupDivTop);
    var dmvx = parseInt(e_obj.clientX + popupDivLeft);

    if (dmvy < 5) {
        dmvy = 5;
    }
    else if (dmvy > (windowHeight - $(popupTargetObj).outerHeight(true) - 5)) {
        dmvy = parseInt(windowHeight - $(popupTargetObj).outerHeight(true) - 5);
    }

    if (dmvx < 5) {
        dmvx = 5;
    }
    else if (dmvx > (windowWidth - $(popupTargetObj).outerWidth(true) - 5)) {
        dmvx = parseInt(windowWidth - $(popupTargetObj).outerWidth(true) - 5);
    }


    popupTargetObj.style.left = dmvx + "px";
    popupTargetObj.style.top = dmvy + "px";
    return false;
}

function popupStopDrag() {
    document.onmousemove = null;
    document.onmouseup = null;
}

function popupGetLeft(o) {
    return parseInt(o.style.left.replace('px', ''));
}

function popupGetTop(o) {
    return parseInt(o.style.top.replace('px', ''));
}

function PopupOk() {
    var chklist = document.getElementsByName("popup_stu_chklist");
    var arr = [];
    var judge = 1;
    for (var i = 0; i < chklist.length; i++) {
        if (chklist[i].checked == true) {
            var tmp = {stu_name: global_stu_table[i].stu_name, stu_identity: global_stu_table[i].stu_identity };
            arr.push(tmp);
            judge = 0;
        }
    }
    if (judge == 1) {
        alert("삭제할 항목을 선택해 주십시오.");
        return false;
    }
    Popup_List_Push_Learner(arr)
        .done(function () {
            Lec_Lea_Lookup(global_selected_classNo);
            $("#PopupModalPanel").remove();
            $("#PopupWindow").remove();
        })
}

function Popup_List_Push_Learner(arr) {
    var deferred = $.Deferred();
    var arr_obj = JSON.stringify(arr);
    $.ajax({
        url: "./WebService/WebService.asmx/Popup_List_Push_Learner",
        data: {
            classNo: global_selected_classNo,
            arr_obj: arr_obj
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

function PopupClose() {
    $("#PopupModalPanel").remove();
    $("#PopupWindow").remove();
}