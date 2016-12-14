angular.module('navbar')
    .component('navbar', {
        templateUrl: 'navbar/navbar.template.html',
        controller: [function(){
            var self = this;
            self.active = [];
            self.css = {};
            self.css.triangle = "triangle";
            self.items = {
                orders: {
                    index: 0,
                    title: "维修记录"
                },
                admin: {
                    index: 1,
                    title: "工作人员入口"
                },
                home: {
                    index:2,
                    title: "主页"
                }
            };
            self.setActive = function($param) {
                //console.log($param);
                //console.log(self.active);
                self.active = [];
                self.active[$param] = "active";
            };
            $('.button-collapse').sideNav({
                    menuWidth: 300, // Default is 240
                    edge: 'left', // Choose the horizontal origin
                    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    draggable: true // Choose whether you can drag to open on touch screens
                }
            );
        }]
    
    });

