import { Config } from 'config.js';


class Base {
    constructor() {
        this.BaseUrl = Config.BaseUrl;
    }

    request(params, noRefetch) {
        var url = this.BaseUrl + params.url;
        if (!params.type) {
            params.type = 'GET';
        }
        wx.request({
            url: url,
            data: params.data,
            method: params.type,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: function (res) {
                var code = res.statusCode.toString();
                var startChar = code.charAt(0);
                if (startChar == '2') {
                    if(res.data.code != 0){
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }else{
                        params.callBack && params.callBack(res.data)
                    }
                } else {
                    if (params.code == '401' && !noRefetch) {
                        that._refetch(params);
                    }
                    if (noRefetch) {
                        params.callBack && params.callBack(res.data);
                    }
                }
            },
            fail: function (res) {
                console.log(res);
            }
        })
    }

    _refetch(params) {
        var token = new Token();
        token.getTokenFromServer((res) => {
            this.request(params, true);
        });
    }
    /**
     * 获取元素绑定的值
     */
    getDataSet(envent, key) {
        return envent.currentTarget.dataset[key];
    }


    
}
export { Base };