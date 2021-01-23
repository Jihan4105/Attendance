var sideNavTopPosition;

$(function () {
    $(window).resize(function () {
        if ($("body").width() <= 576) {
            $("#sideNav").hide();
            $(".main").css("margin-left", "0px");
            $(".footer").css("margin-left", "0px");
        }
        else {
            $("#sideNav").show();
            $(".main").css("margin-left", "200px");
            $(".footer").css("margin-left", "200px");
        }
    });
    $("#sideNav").css("margin-top", $("#topNav").outerHeight());
})();

function sideNavShowHide() {
    if ($("#sideNav").css("display") == "none") {
        $("#sideNav").show();
    } else {
        $("#sideNav").hide();
    }
}

function submenuShowHide() {
    $("#dropdown-btn").toggleClass("active");
    var dropdownContent = $("#dropdown-container");
    if (dropdownContent[0].style.display === "block") {
        dropdownContent[0].style.display = "none";
    } else {
        dropdownContent[0].style.display = "block";
    }
}

function LectureSearch() {
    $("#mainBase").load("./html/lecture_Search.html #lectureSearching");
}