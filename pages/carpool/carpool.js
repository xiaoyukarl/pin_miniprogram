// pages/carpool/index.js
import {Config} from '../../utils/config.js';
import { Base } from '../../utils/base.js';
import { HomeModel } from '../../utils/model/HomeModel.js';
import { OrderModel } from '../../utils/model/OrderModel.js';
var homeModel = new HomeModel();
var orderModel = new OrderModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        city:[],
        postData : {
            starCity: '',
            destCity: '',
            type : '',
            title :'',
            content : '',
            telephone : '',
            departureTime : '',
            img : ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._loadCity()
        this.data.postData.type = options.type;
    },
    submitCarpool:function(event){
        console.log(this.data.postData);

        orderModel.createOrder(this.data.postData, function(res){
            //重新加载信息
            wx.switchTab({
                url: "../index/index",
                success: function () {
                    //提示发布
                    wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        duration: 1000
                    })
                }
            });
        });

    },
    _loadCity : function(){
        var city = wx.getStorageSync('city');
        if (!city) {
            this.getCityData();
        } else {
            this.setData({
                city: city
            })
        }
    },
    getCityData : function(){
        var that = this;
        var params = {
            url: 'config/city',
            callBack:function(res){
                that.setData({
                    city: res.data
                })
                wx.setStorageSync('city', res.data);
            }
        };
        var baseModel = new Base();
        baseModel.request(params);
    },
    bindStarCityChange:function(e){
        this.data.postData.starCity = this.data.city[e.detail.value];
        this.changePostData(this.data.postData);
    },
    bindDestCityChange: function (e) {
        this.data.postData.destCity = this.data.city[e.detail.value];
        this.changePostData(this.data.postData);
    },
    bindDateChange : function(e){
        this.data.postData.departureTime = e.detail.value;
        this.changePostData(this.data.postData);
    },
    bindTitleChange :function(e){
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
    changePostData : function(data){
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
                        that.data.postData.img = 'data:image/jpeg;base64,' + res.data
                        that.setData({
                            postData: that.data.postData,
                        })
                        console.log(that.data.postData)
                    }
                })

            }
        })
    }
})