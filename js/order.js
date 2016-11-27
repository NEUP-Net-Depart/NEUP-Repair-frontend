/**
 * Created by VOID001 on 27/11/2016.
 */

// Initialize

$("#submit").hide();
var submitted = false;

$.ajax({
    url : host + "/api/v1/orders/" + getUrlParameter("secret"),
    method: "GET",
    async: true,
    success: function(resp) {
        var servicemap = new Object();

        servicemap['os_inst'] = "操作系统安装";
        servicemap['software_inst'] = "软件安装";
        servicemap['hardware_fix'] = "硬件更换、维修";
        servicemap['data_recover'] = "数据恢复";
        servicemap['cleanup'] = "清灰";
        servicemap['others'] = "其他";

        console.log(resp);
        if(resp['success'] == true){
            data = resp['data'];
            $("#get_name").html(data['name']);
            $("#get_stu_id").html(data['stu_id']);
            $("#get_service_type").html(servicemap[data['service_type']] || "");
            $("#get_comment").html(data['comment']);
            $("#spin-submit").hide();
            $("#submit").show();
            if(data['done_flag']) {
                $("#submit").text("已结束");
                $("#submit").removeClass("yellow");
                $("#submit").addClass("green");
                $("#submit").append('<i class="material-icons right">done</i>');
                $(".blue").addClass("green");
                submitted = true;
            }
        }
        else
        {
            msg = resp['msg'];
            $("#get_name").html(msg);
            $("#get_stu_id").html(msg);
            $("#get_comment").html(msg);
            $("#get_service_type").html(msg);
            $("#spin-submit").html(msg);
            $(".blue").addClass("red");
            $(".blue").removeClass("blue");
        }
    }
});

$("#submit").click(function() {
    $.ajax({
        url: host + "/api/v1/orders/" + getUrlParameter("secret"),
        method: "PUT",
        async: true,
        success: function (resp) {
            if (!submitted) {
                if(resp['success'] = true) {
                    $("#submit").text("已结束");
                    $("#submit").removeClass("yellow");
                    $("#submit").addClass("green");
                    $("#submit").append('<i class="material-icons right">done</i>');
                    $(".blue").addClass("green")
                    submitted = true;
                }
                else
                {
                    Materialize.toast(resp['msg'], 4000, "red");
                }
            }
        }
    });
    return false;
})

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

$(document).ready(function() {

});
