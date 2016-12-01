angular.module('navbar')
    .component('navbar', {
        templateUrl: 'navbar/navbar.template.html',
        controller: [function(){
            var self = this;
            self.active = [];
            self.items = {
                repair: {
                    index: 0,
                    title: "维修记录"
                },
                admin: {
                    index: 1,
                    title: "工作人员入口"
                },
                main: {
                    index:2,
                    title: "主页",
                }
            };
            self.setActive = function($param) {
                //console.log($param);
                //console.log(self.active);
                self.active = [];
                self.active[$param] = "active";
            }
        }]
    })

