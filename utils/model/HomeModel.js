import { Base } from "../base.js";

class HomeModel extends Base {
    constructor() {
        super();
    }


    getBannerData(cback) {
        var params = {
            url: 'banner/home',
            data: '',
            callBack: cback
        };
        this.request(params);
    }

}

export { HomeModel };