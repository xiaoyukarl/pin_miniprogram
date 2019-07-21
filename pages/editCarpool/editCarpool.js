// pages/editCarpool/editCarpool.js

import { OrderModel } from '../../utils/model/OrderModel.js';
var orderModel = new OrderModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._loadCity()
        this.setData({
            id : options.id
        })
        this.showMyOrder(options.id)
    },
    showMyOrder : function(id){
        var that = this
        orderModel.getMyOrderDetail(id, function (res) {
            var postData = {
                content: res.data.content,
                departureTime: res.data.departureTime,
                destCity: res.data.destCity,
                img: '',
                starCity: res.data.starCity,
                telephone: res.data.telephone,
                title: res.data.title,
                type: res.data.type,
            }
            var img = '';
            if (res.data.imgUrl){
                img = res.data.imgUrl
            }else{
                img = '../../images/cam.png';
            }
            console.log(postData)
            that.setData({
                img: img,
                order : res.data,
                postData: postData
            })
        })
    },
    submitCarpool:function(envent){
        var reg = new RegExp('data:image')
        if (reg.test(this.data.img)){
            this.data.postData.img = this.data.img;
        }
        // console.log(this.data.postData);
        orderModel.updateMyOrder(this.data.id, this.data.postData, function(res){
            wx.navigateBack({
                delta: 1
            })
            wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1000
            })
        });textclass
    },
    _loadCity: function () {
        var city = wx.getStorageSync('city');
        if (!city) {
            this.getCityData();
        } else {
            this.setData({
                city: city
            })
        }
    },
    getCityData: function () {
        var that = this;
        var params = {
            url: 'config/city',
            callBack: function (res) {
                that.setData({
                    city: res.data
                })
                wx.setStorageSync('city', res.data);
            }
        };
        var baseModel = new Base();
        baseModel.request(params);
    },
    bindStarCityChange: function (e) {
        this.data.postData.starCity = this.data.city[e.detail.value];
        this.changePostData(this.data.postData);
    },
    bindDestCityChange: function (e) {
        this.data.postData.destCity = this.data.city[e.detail.value];
        this.changePostData(this.data.postData);
    },
    bindDateChange: function (e) {
        this.data.postData.departureTime = e.detail.value;
        this.changePostData(this.data.postData);
    },
    bindTitleChange: function (e) {
        this.data.postData.title = e.detail.value;
        this.changePostData(this.data.postData);
    },
    bindTelChange: function (e) {
        this.data.postData.telephone = e.detail.value;
        this.changePostData(this.data.postData);
    },
    bindContentChange: function (e) {
        this.data.postData.content = e.detail.value;
        this.changePostData(this.data.postData);
    },
    changePostData: function (data) {
        this.setData({
            postData: data
        });
    },
    uploadImg: function () {
        var that = this;
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function (res) {
                var tem = res.tempFilePaths[0];
                console.log(tem)
                wx.getFileSystemManager().readFile({
                    filePath: tem, //图片url
                    encoding: 'base64', //编码格式
                    success: res => {
                        //成功的回调
                        //that.data.postData.img = 'data:image/jpeg;base64,' + res.data
                        //that.data.img = 'data:image/jpeg;base64,' + res.data
                        that.setData({
                            img: 'data:image/jpeg;base64,' + res.data,
                            postData: that.data.postData,
                        })
                        console.log(that.data.postData)
                    }
                })

            }
        })
    }

})