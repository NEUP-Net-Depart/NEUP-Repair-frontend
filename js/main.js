/**
 * Created by VOID001 on 27/11/2016.
 *
 */

function skip() {
    // Disable all anime
    $("#blue-screen").addClass("blue-vanish");
    $("#intro").addClass("intro-show");
    $("#intro-button").addClass("intro-button-show");
    $("#hidden-table").addClass("hidden-table-show").show();
}
$(document).ready(function() {
    $('select').material_select();
    //$('#comment').trigger();
    $('.modal').modal();
});
$("#hidden-table").hide();
//debug();
var percent = 0;
function percentageGrow() {
    if(percent >= 100) {
        percent = 100;
        clearInterval(flag);
        $("#percentage").text(percent);
        $("#blue-screen").addClass("blue-vanish");
        $("#intro").addClass("intro-show");
        $("#intro-button").addClass("intro-button-show");
        return;
    }
    if(percent < 100) {
        percent = percent + Math.floor(Math.random() * 100000 % 5);
        if(percent > 100) {
            percent = 100;
        }
        $("#percentage").text(percent);
        return;
    }
}

$("#do-it-now").click(function () {
    $("#hidden-table").show();
    $("html, body").animate({
        scrollTop: $("#hidden-table").offset().top
    }, 1000);
    $("#hidden-table").addClass("hidden-table-show");
});

$("#show-agreement").click(function() {
    $("#agreement-modal").modal('open');
    $("#agreement").removeClass("read-first");
    $('.tooltipped').tooltip('remove');
});

$("#skipAnime").click(function() {
    skip();
    /* Introduction is not useful to him, lead him to form*/
    $("html, body").animate({
        scrollTop: $("#hidden-table").offset().top
    }, 1000);
});

$('#agreement').click(function() {
    if($('#agreement').hasClass("read-first")) {
        Materialize.toast("请先阅读《免责声明》", 2000);
        return false;
    }
    return true;
});

$('#agree').click(function() {
    $('#agreement').prop("checked", "checked");
});

function validate(obj) {
    obj = $.parseJSON(obj);
    if(obj["name"] == ""){
        Materialize.toast("请输入姓名", 2000, "red");
        return false
    }
    if(obj["stu_id"] == "" || isNaN(obj["stu_id"])) {
        Materialize.toast("请输入正确的学号", 2000, "red");
        return false
    }
    if(obj["service_type"] == undefined) {
        Materialize.toast("请选择服务类型", 2000, "red");
        return false
    }
    if(obj["date"] == undefined) {
        Materialize.toast("请选择日期", 2000, "red");
        return false
    }
    if(obj["agreement"] == undefined) {
        Materialize.toast("请同意许可协议", 2000, "red");
        return false
    }
    return true;
}

$("#submit").click(function() {
    jsonObj = JSON.stringify($('form').serializeObject());
    if(!validate(jsonObj)) return false;
    $.ajax({
        url: host + "/api/v1/orders",
        data: jsonObj,
        method: "POST",
        async: true,
        success: function (resp) {
            console.log(resp);
            if(resp['success'] == true) {
                resp = resp["data"]
                $("#spin").removeClass("active");
                img = new Image();
                img.src = 'data:image/png;base64,' + resp["qrcode"];
                $("#result-modal-qrcode").html(img);
                $("#result-modal-msg").html("此二维码为维修凭证 仅出现一次 请将此二维码截图并保存 或者<a href=/order.html?secret=" + resp['secret_id'] + ">复制此链接 </a>");
            }
            else {
                $("#spin").removeClass("active");
                Materialize.toast(resp['msg'], 5000, "red")
            }
            //$('#submit').hide();
        }
    });
    $("#result-modal").modal("open");
    return false;
    // Active Modal
});

var date = "";

$("#fri").click(function() {
    date = "fri";
});

$("#tue").click(function() {
    date = "tue";
});

/* Use for convert form to JSON */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    /* Add Service Type */
    o['service_type'] = $("#service_type").val();
    o['date'] = date;
    return o;
};
flag = setInterval(percentageGrow, 50);
