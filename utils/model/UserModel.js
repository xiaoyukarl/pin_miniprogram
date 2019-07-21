import { Base } from "../base.js";

class UserModel extends Base {

    constructor() {
        super();
    }

    getUserInfo(cback) {
        var params = {
            url: 'user/info',
            type: 'POST',
            callBack: cback
        }
        this.request(params)
    }

    updateUserInfo(postData, cback) {
        var params = {
            url: 'user/update',
            type: 'POST',
            data: postData,
            callBack: cback
        }
        this.request(params)
    }
}

export { UserModel }