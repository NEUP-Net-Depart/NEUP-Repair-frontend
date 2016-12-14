/**
 * Created by VOID001 on 04/12/2016.
 */

angular
    .module('orderList')
    .component('orderList',{
        templateUrl: 'order-list/order-list.template.html',
        bindings: { orders: '<' },
        controller: ['$http', function($http) {
            var self = this;
            self.secretID = "";
            self.toHuman = {
                "id": "ID",
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
                "others" : "其他"
    
            };
            orders = self.orders;
            if(!orders.success) {
                Materialize.toast("Error: " + orders.message,1000, "red");
            }
            else {
                Materialize.toast("Success! " , 1000, "green");
            }
            console.log(orders);
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
            }
        }]
    });
