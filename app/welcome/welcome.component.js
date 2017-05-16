/**
 * Created by VOID001 on 01/12/2016.
 */

angular.module('welcome')
    .component('welcome', {
        templateUrl: 'welcome/welcome.template.html',
        controller: ['$http', function($http) {
            var self = this;
            
            //Init Clipboard
            var clipboard = new Clipboard('#clipboard-btn');
            clipboard.on('success', function(e) {
                console.log('反正给别人看看又不会怀孕，窝们就不删debug信息咯');
                Materialize.toast("复制成功 " + e.text, 1000, "green");
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);
            });
            
            $http({
                method: 'GET',
                url: host + '/api/v1/announce',
            }).then(function(resp){
                data = resp.data;
                self.announce = data.data;
            });
            
            function validate(obj) {
                obj = $.parseJSON(obj);
				console.log(obj["name"].length);
                if(obj["name"] == "" || obj["name"].length > 4 ){
                    Materialize.toast("请正确输入姓名", 2000, "red");
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
                if(obj["date"] == undefined || obj["date"] == "") {
                    Materialize.toast("请选择日期", 2000, "red");
                    return false
                }
                if(obj["area"] == undefined || obj["area"] == "") {
                    Materialize.toast("请选择所在校区", 2000, "red");
                    return false
                }
                if(obj["contact"] == "") {
                    Materialize.toast("请填写联系方式以便我们及时与你联系", 2000, "red");
                    return false
                }
                if(obj["agreement"] == undefined) {
                    Materialize.toast("请同意许可协议", 2000, "red");
                    return false
                }
                return true;
            }
            
            function changeNavColor () {
                $('#nav').addClass("light-green");
            }
            
            function skip() {
                // Disable all anime
                $("#blue-screen").addClass("blue-vanish");
                $("#intro").addClass("intro-show");
                $("#intro-button").addClass("intro-button-show");
                $("#hidden-table").addClass("hidden-table-show").show();
            }
    
            $('select').material_select();
            $('.modal').modal();
  
    
    
            self.doItNow = function() {
                $(".full-height").addClass('full-height-anime');
                $(".full-height").removeClass('full-height');
                $("#hidden-table").show();
                $("html, body").animate({
                    scrollTop: $("#hidden-table").offset().top - $(".nav-wrapper").height()
                }, 1000);
                $("#hidden-table").addClass("hidden-table-show");
            };
            
            self.readMore = function() {
                $("#more-modal").modal('open');
            };
    
    
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
    
    
    
            $("#show-agreement").click(function() {
                $("#agreement-modal").modal('open');
                $("#agreement").removeClass("read-first");
                $('.tooltipped').tooltip('remove');
            });
    
            $("#skipAnime").click(function() {
                skip();
                /* Introduction is not useful to him, lead him to form*/
                $("html, body").animate({
                    scrollTop: $("#hidden-table").offset().top - $(".nav-wrapper").height()
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
    
            $("#submit").click(function() {
                jsonObj = JSON.stringify($('form').serializeObject());
                console.log(jsonObj);
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
                            $("#result-modal-msg").html("此二维码为维修凭证 仅出现一次 请将此二维码截图并保存 或者复制此秘钥" +
                                "<input id='secret_id' type='text' value="+ resp['secret_id'] + ">" +
                                "<button id='clipboard-btn' class='btn waves-effect blue' data-clipboard-target='#secret_id'>点此复制到剪贴板</button>" +
                                "<br><br><br>先锋硬件部预约维修时间为 每周二，周五晚7点至9点<br>维修地点:<br>南湖: 学生活动中心204<br>浑南: 五舍B104<br>如果想要咨询其他硬件，软件问题，欢迎加入东大电脑问题总群 群号码: 343106460"
                            );
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
        }]
    
    });
