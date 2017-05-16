/**
 * Created by VOID001 on 02/12/2016.
 */

angular
    .module('order')
    .component('order',{
        bindings: {
            //order: '<',
            secretID: '<'
        },
        templateUrl: 'order/order.template.html',
        controller: ['$http', '$cookies', function($http, $cookies) {
            var self = this;
            console.log(self.secretID);
            
            // Initialize
            
            $("#submit").hide();
            var submitted = false;
            
            $http({
                url: host + "/api/v1/orders/" + self.secretID,
                method: "GET"
            }).then(function(resp) {
                var servicemap = new Object();
                
                servicemap['os_inst'] = "操作系统安装";
                servicemap['software_inst'] = "软件安装";
                servicemap['hardware_fix'] = "硬件更换、维修";
                servicemap['data_recover'] = "数据恢复";
                servicemap['cleanup'] = "清灰";
                servicemap['others'] = "其他";
                
                console.log(resp);
                data = resp.data
                if(data.success == true){
                    udata = data.data;
                    $("#get_name").html(udata['name']);
                    $("#get_stu_id").html(udata['stu_id']);
                    $("#get_service_type").html(servicemap[udata['service_type']] || "");
                    $("#get_comment").html(udata['comment']);
                    $("#spin-submit").hide();
                    $("#submit").show();
                    if(udata.done_flag == true) {
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
                    msg = data.msg;
                    $("#get_name").html(msg);
                    $("#get_stu_id").html(msg);
                    $("#get_comment").html(msg);
                    $("#get_service_type").html(msg);
                    $("#spin-submit").html(msg);
                    $(".blue").addClass("red");
                    $(".blue").removeClass("blue");
                }
            });
            
            self.Submit = function() {
                $http({
                    method: 'PUT',
                    url: host + '/api/v1/orders/' + self.secretID
                }).then(function(resp){
                    data = resp.data
                    if (!submitted) {
                        if (data.success == true) {
                            $("#submit").text("已结束");
                            $("#submit").removeClass("yellow");
                            $("#submit").addClass("green");
                            $("#submit").append('<i class="material-icons right">done</i>');
                            $(".blue").addClass("green");
                            submitted = true;
                        }
                        else {
						    if(data.msg == "没有权限进行此操作") {
							    $cookies.put("redirect", self.secretID);
								window.location.href = "/#/admin";
							}
                            Materialize.toast(data.msg, 4000, "red");
                        }
                    }
                });
            }
            
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
        }]
    })
