var global_sidenav_idTopPosition;

$(function () {
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
})();

function sidenav_id_Show_Hide() {
    if ($("#sidenav_id").css("display") == "none") {
        $("#sidenav_id").show();
    } else {
        $("#sidenav_id").hide();
    }
}

function Submenu_Show_Hide() {
    //$("#dropdown-btn").toggleClass("active");
    var dropdownContent = $("#dropdown-container");
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

function Show_Calender() {
    var deferred = $.Deferred();
    try {
        $("#schedule_date_id").dxDateBox({
            type: "date",
            value: new Date(),
            displayFormat: "yyyy-MM-dd",
            width: "100%"
        });
        deferred.resolve(result);
    }
    catch (e){
        deferred.reject();
    }
    return deferred.promise();
}

function Lec_Schedule_Href() {
    $("#main_base_id").load("./html/Lec_Schedule_Page.html #schedule_div_id", function () {
        Lec_Schedule_Class_Lookup();
        Show_Calender()
            .done(function () {

            })
            .fail(function () {

            }),
    });
}

function Lec_Register_Href() {
    $("#main_base_id").load("./html/Lec_Register_Page.html #register_div_id");
}