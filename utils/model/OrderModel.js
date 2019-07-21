
import { Base } from "../base.js";

class OrderModel extends Base {

    constructor() {
        super();
    }

    getHomeOrders(cback, page) {
        var params = {
            url: 'order/home?page=' + page,
            callBack: cback
        };
        this.request(params);
    }

    getOrderDetail(id, cback){
        var params = {
            url: 'order/show/' + id,
            callBack: cback
        };
        this.request(params);
    }

    getMyOrderList(cback, page){
        var params = {
            url: 'order/my_order?page=' + page,
            callBack: cback
        };
        this.request(params);
    }

    getMyCollect(page, cback){
        var params = {
            url: 'order/collect?page=' + page,
            callBack: cback
        };
        this.request(params);
    }

    collect(id, cback){
        var params = {
            url: 'order/collect?page=' + page,
            callBack: cback
        };
        this.request(params);
    }

    getMyOrderDetail(id, cback){
        var params = {
            url: 'order/detail/' + id,
            callBack: cback
        };
        this.request(params);
    }

    createOrder(data, cback){
        var params = {
            url: 'order/create',
            data: data,
            type: "POST",
            callBack: cback
        }
        this.request(params);
    }

    updateMyOrder(id, data, cback){
        var params = {
            url: 'order/update/' + id,
            data: data,
            type: "POST",
            callBack:cback
        }
        this.request(params);
    }

    searchOrder(data, page, cback){
        var params = {
            url: 'order/search/?page=' + page +'&'+this.build(data),
            callBack: cback
        }
        this.request(params);
    }


    build (obj){
        var params = []
        Object.keys(obj).forEach((key) => {
            let value = obj[key]
            // 如果值为undefined我们将其置空
            if (typeof value === 'undefined') {
                value = ''
            }
            // 对于需要编码的文本（比如说中文）我们要进行编码
            params.push([key, encodeURIComponent(value)].join('='))
        })
        return params.join('&')
    }
}

export {OrderModel}