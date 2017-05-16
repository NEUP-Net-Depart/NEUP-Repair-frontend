/**
 * Created by VOID001 on 04/12/2016.
 */

angular
    .module('orderList')
    .component('orderList',{
        templateUrl: 'order-list/order-list.template.html',
        bindings: { orders: '<' },
        controller: ['$http', '$filter', function($http, $filter) {
            var self = this;
            self.secretID = "";
            self.toHuman = {
                "id": "ID",
                "area": "校区",
                "contact": "联系方式",
                "date": "预约时间",
                "name": "姓名",
                "stu_id": "学号",
                "comment": "备注",
                "agreement": "是否同意免责声明",
                "service_type": "服务类型",
                "secret_id": "维修凭证",
                "done_flag": "状态",
                "create_time": "创建时间",
                "update_time": "更新时间",
                "os_inst" : "操作系统安装",
                "software_inst" : "软件安装",
                "hardware_fix" : "硬件更换、维修",
                "data_recover" : "数据恢复",
                "cleanup" : "清灰",
                "others" : "其他", 
                "fri" : "星期五",
                "tue" : "星期二"
    
            };
            orders = self.orders;
            if(!orders.success) {
                Materialize.toast("Error: " + orders.message,1000, "red");
            }
            else {
                Materialize.toast("Success! " , 1000, "green");
            }
            console.log(orders);
			for(i in orders.data.data) {
				orders.data.data[i].service_type = self.toHuman[orders.data.data[i].service_type];
				orders.data.data[i].date = self.toHuman[orders.data.data[i].date];
			}
            self.orderData = orders.data.data;
    
            // Set Pager Begin
            self.totPage = orders.data.page_count;
            self.pageOn = orders.data.page_on;
            self.prevPage = self.pageOn - 1;
            self.nextPage = self.pageOn + 1;
            self.PageArr = [];
    
            for(i = 1; i <= self.totPage; i++) {
                var pageState = {};
                pageState.index = i;
                pageState.on = "waves-effect";
                if(i == orders.data.page_on) {
                    pageState.on = "active"
                }
                self.PageArr.push(pageState);
            }
    
            self.disable_next = "waves-effect";
            self.disable_prev = "waves-effect";
            if(orders.data.page_on <= 1 ) {
                self.disable_prev = "disable";
                self.prevPage = 1;
            }
            if (orders.data.page_on >= orders.data.page_count) {
                self.disable_next = "disable";
                self.nextPage = orders.data.page_count;
            }
    
            // Set Pager End
    
            self.delOrder = function(id) {
                Materialize.toast("No permission to delete[" + id + "]", 3000, "red");
            };
    
            self.expireOrder = function(id) {
                // Here add expire logic
                Materialize.toast("Expire Complete", 1000, "green");
            };
            
            console.log(self.orderData);
            togglend = false;
            self.dat1 = self.orderData;
            self.dat2 = self.orderData;
            self.ToggleNotDoneText = "只显示未完成预约";
            self.ToggleNotDone = function() {
                if(!togglend) {
                    self.dat1 = $filter('filter')(self.dat1, {
                        done_flag: false,
                    });
                    self.ToggleNotDoneText = "显示未完成&已完成预约";
                } else {
                    self.dat1 = $filter('filter')(orders.data.data, {});
                    self.ToggleNotDoneText = "只显示未完成预约";
                }
                self.orderData = intersect(self.dat1,self.dat2);
                togglend = !togglend;
            };
            
            toggletw = false;
            self.ToggleThisWeekText = "只显示本周预约";
            self.ToggleThisWeek = function() {
                if(!toggletw) {
                    arr = [];
                    self.dat2 = $filter('filter')(self.dat2, weekFilter)
                    self.ToggleThisWeekText = "显示全部预约";
                } else {
                    self.dat2 = $filter('filter')(orders.data.data, {})
                    self.ToggleThisWeekText = "只显示本周预约";
                }
                self.orderData = intersect(self.dat1,self.dat2);
                toggletw = !toggletw;
            };
            
            function intersect(arr1, arr2) {
               tarr = [];
               flag = {};
               for(var i = 0; i < arr1.length; i++) {
                   for(var j = 0; j < arr2.length; j++) {
                       if(arr1[i] == arr2[j] && flag[arr1[i].id] == undefined) {
                           tarr.push(arr1[i]);
                           flag[arr1[i].id] = true;
                       }
                   }
               }
               return tarr;
            }
    
            weekFilter = function(value, index, array) {
                now_date = new Date(Date.now());
                delta = now_date.getDay();
                first_day_date = new Date(now_date.setDate(now_date.getDate() - delta + 1));
                now_date = new Date(Date.now());
                last_day_date = new Date(now_date.setDate(now_date.getDate() + 7 - delta));
                cur_date = new Date(value.create_time)
                if(cur_date >= first_day_date && cur_date <= last_day_date) {
                    console.log(cur_date + " Satisfied");
                    return true
                }
                return false;
            }
        }]
    });
