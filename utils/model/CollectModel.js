
import { Base } from "../base.js";

class CollectModel extends Base {
    constructor() {
        super();
    }

    getMyCollect(page, cback){
        var params = {
            url : "collect/my_collect?page"+page,
            callBack: cback
        }
        this.request(params)
    }

    getAllCollect(cback){
        var params = {
            url: "collect/list",
            callBack: cback
        }
        this.request(params)
    }

    createCollect(data, cback){
        var params = {
            url :"collect/create",
            data : data,
            type : "POST",
            callBack:cback
        }
        this.request(params)
    }
    

}

export { CollectModel };