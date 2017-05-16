/**
 * Created by VOID001 on 14/12/2016.
 */
angular
    .module('admin')
    .component('admin', {
        templateUrl: 'admin/admin.template.html',
        controller: ['$http', '$cookies', '$state', function($http, $cookies, $state) {
            $("#nav").removeClass("blue");
            $("#nav").addClass("black");
            var self = this;
            self.auth = {};
            self.logged = false;
            self.doLogin = function() {
                console.log(self.auth);
                if(self.auth.user_name == undefined) {
                    Materialize.toast("请输入用户名", 2000, "red");
                    return false
                }
                if(self.auth.password == undefined) {
                    Materialize.toast("不要玩坏人家啦, 快输入密码", 2000, "red")
                    return false
                }
                $http({
                    method: 'POST',
                    url: host + '/api/v1/auth',
                    data: self.auth
                }).then(function(resp){
                    console.log(resp.data);
                    data = resp.data;
                    if(data.success != true){
                        Materialize.toast(data.msg, 2000, "red");
                        return
                    }
                    if(data.success){
                        Materialize.toast("登录成功", 2000, "green");
                        $cookies.put("X-NEUPRepair-Token", data.data);
						var redirect = $cookies.get("redirect");
						if(redirect) {
							$cookies.remove("redirect");
						    window.location.href = "/#/orders/" + redirect;
						}
						window.location.reload()
                    }
                })
            };
            // Just POST an empty struct with Cookie Header
            $http({
                method: 'POST',
                url: host + '/api/v1/auth',
                data: {}
            }).then(function(resp){
                data = resp.data;
                if(data.success) {
                    self.logged = true;
                    return
                }
                self.logged = false;
                return
            });
            
            $http({
                method: 'GET',
                url: host + '/api/v1/announce',
            }).then(function(resp){
                data = resp.data;
                self.announce = data.data;
            });
            
            
            self.Update = function() {
                $http({
                    method: 'PUT',
                    url: host +'/api/v1/announce',
                    data: {announce: self.announce }
                }).then(function(resp){
                    data = resp.data;
                    if(!data.success) {
                        Materialize.toast(data.msg, 2000, "red");
                        return
                    }
                    Materialize.toast("更新成功", 2000, "green");
                })
            };
            
            self.Logout = function() {
                $cookies.remove('X-NEUPRepair-Token');
                window.location.reload()
            }
        }]
    });
