var global_sidenav_idTopPosition;
var global_class_table;
var global_class_att_average;

$(function () {
    var myStorage = window.localStorage;
    var user_email = myStorage.getItem("AMS_user_email");
    if (user_email == null) {
        $(location).attr('href', './index.html');
        alert("다시 로그인 하세요");
    }
    $(window).resize(function () {
        if ($("body").width() <= 576) {
            $("#sidenav_id").hide();
            $(".main_class").css("margin-left", "0px");
            $(".footer").css("margin-left", "0px");
        }
        else {
            $("#sidenav_id").show();
            $(".main_class").css("margin-left", "200px");
            $(".footer").css("margin-left", "200px");
        }
    });
    $("#sidenav_id").css("margin-top", $("#topnav_id").outerHeight());
    Lec_Lookup_For_DashBoard()
        .done(function () {
            var deferred = $.Deferred();
            var obj = JSON.stringify(global_class_table);
            $.ajax({
                url: "./WebService/WebService.asmx/Main_Dash_Board",
                data: {
                    class_table : obj
                },
                dataType: "json",
                method: "post",
                success: function (result) {
                    global_class_att_average = result.items;
                    deferred.resolve(result);
                },
                error: function (result) {
                    deferred.reject();
                }
            });
            return deferred.promise();
        })
        .fail(function () {

        })
})();

function Sidenav_Show_Hide() {
    if ($("#sidenav_id").css("display") == "none") {
        $("#sidenav_id").show();
    } else {
        $("#sidenav_id").hide();
    }
}

function Submenu_Show_Hide(where) {
    //$("#dropdown-btn").toggleClass("active");
    var dropdownContent = $(where);
    if (dropdownContent[0].style.display === "block") {
        dropdownContent[0].style.display = "none";
    } else {
        dropdownContent[0].style.display = "block";
    }
}

function Lec_Search_Href() {
    $("#main_base_id").load("./html/Lec_Search_Page.html #search_div_id", function () {
        Lec_Lookup();
    });
}

function Show_Calender(where) {
    var deferred = $.Deferred();
    try {
        $(where).dxDateBox({
            location: "after",
            width: '100%',
            widget: "dxDateBox",
            type: "date",
            displayFormat: "yyyy-MM-dd",
            value: new Date()
        });
        deferred.resolve();
    }
    catch (e){
        deferred.reject();
    }
    return deferred.promise();
}

function Lec_Schedule_Href() {
    $("#main_base_id").load("./html/Lec_Schedule_Page.html #schedule_div_id", function () {
        Lec_Schedule_Class_Lookup();
        Show_Calender('#schedule_datepicker_id');
    });
}

function Lec_Register_Href() { 
    $("#main_base_id").load("./html/Lec_Register_Page.html #register_div_id");
}

function Lec_Learner_Href() {
    $("#main_base_id").load("./html/Lec_Learner_Page.html #learner_div_id", function () {
        Lec_Lea_Class_Lookup();
    });
}

function Att_Href() {
    $("#main_base_id").load("./html/Att_Page.html #att_div_id", function () {
        Att_Class_Lookup();
        Show_Calender('#att_from_date_id')
            .done(function () {
                //$("#att_from_date_id").dxDateBox("instance").option("width", "60%");
            });
        Show_Calender('#att_until_date_id')
            .done(function () {
                //$("#att_until_date_id").dxDateBox("instance").option("value", ");
            });
    });
}

function Stu_Search_Href() {
    $("#main_base_id").load("./html/Stu_Search_Page.html #stu_search_div_id", function () {
        Stu_List_Lookup();
    });
}

function Stu_Register_Href() {
    $("#main_base_id").load("./html/Stu_Register_Page.html #stu_register_div_id");
}

function Show_Popup_Table() {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Stu_List_Lookup",
        data: {},
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

function Logout() {
    var myStorage = window.localStorage;
    myStorage.removeItem("AMS_user_email");
    $(location).attr('href', './index.html');
}

function Lec_Lookup_For_DashBoard() {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Lec_Lookup",
        data: {},
        dataType: "json",
        method: "post",
        success: function (result) {
            global_class_table = result.items;
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Dash_Board_List_Lookup() {
    var deferred = $.Deferred();
    $.ajax({
        url: "./WebService/WebService.asmx/Dash_Board_List_Lookup",
        data: {},
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "";
            for (No in result.dashboard_item) {
                html += '<tr>';
                html += '<td>' + result.dashboard_item[No].className + '</td>';
                html += '<td>' + result.dashboard_item[No].proFessor + '</td>';
                html += '<td>' + result.dashboard_item[No].stu_num + '</td>';
                html += '</tr>';
            }
            $("#dashboard_list_id").empty();
            $("#dashboard_list_id").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

function Upping_Lecture_Lookup() {
    $.ajax({
        url: "./WebService/WebService.asmx/Upping_Lecture_Lookup",
        data: {},
        dataType: "json",
        method: "post",
        success: function (result) {
            var html = "";
            if (result.upping_lecture.length == 0) {
                html += '<tr>';
                html += '<td>오늘</td>';
                html += '<td>X</td>';
                html += '<td>X</td>';
                html += '<td>X</td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td>내일</td>';
                html += '<td>X</td>';
                html += '<td>X</td>';
                html += '<td>X</td>';
                html += '</tr>';
            }
            else if (result.upping_lecture.length == 1) {
                html += '<tr>';
                html += '<td>오늘</td>';
                html += '<td>' + result.upping_lecture[i].className + '</td>';
                html += '<td>' + result.upping_lecture[i].proFessor + '</td>';
                html += '<td>' + result.upping_lecture[i].time + '</td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td>내일</td>';
                html += '<td>X</td>';
                html += '<td>X</td>';
                html += '<td>X</td>';
                html += '</tr>';
            }
            else if (result.upping_lecture.length == 2) {
                for (i = 0; i < result.upping_lecture.length; i++) {
                    if (i == 0) {
                        html += '<tr>';
                        html += '<td>오늘</td>';
                        html += '<td>' + result.upping_lecture[i].className + '</td>';
                        html += '<td>' + result.upping_lecture[i].proFessor + '</td>';
                        html += '<td>' + result.upping_lecture[i].time + '</td>';
                        html += '</tr>';
                    }
                    else {
                        html += '<tr>';
                        html += '<td>내일</td>';
                        html += '<td>' + result.upping_lecture[i].className + '</td>';
                        html += '<td>' + result.upping_lecture[i].proFessor + '</td>';
                        html += '<td>' + result.upping_lecture[i].time + '</td>';
                        html += '</tr>';
                    }
                }
            }
            $("#upping_lecture_id").empty();
            $("#upping_lecture_id").append(html);
            deferred.resolve(result);
        },
        error: function (result) {
            deferred.reject();
        }
    });
}