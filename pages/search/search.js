// pages/search/search.js

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
        types : [
            {
                name: '找车',
                value: 1,
            },
            {
                name: '找人',
                value: 2,
            }
        ],
        //['keyword','destCity','starCity','departureTime','type']
        postData : {
            keyword:'',
            starCity:'',
            destCity:'',
            departureTime:'',
            type:'',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._loadCity()
    },
    search:function(event)
    {
        var that = this
        orderModel.searchOrder(this.data.postData, 1, function(res){
            console.log(res.data);
            that.setData({
                ordersPage: res.data
            })
        })
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
    /**
     * 进详情页
     */
    detail: function (event) {
        var id = homeModel.getDataSet(event, 'id')
        wx.navigateTo({
            url: '../detail/detail?id=' + id,
        })
    },
    bindKeywordChange:function(e){

        this.data.postData.keyword = e.detail.value;
        this.changePostData(this.data.postData);
    },
    bindStarCityChange: function (e) {
        this.data.postData.starCity = this.data.city[e.detail.value];
        this.changePostData(this.data.postData);
    },
    bindDestCityChange: function (e) {
        this.data.postData.destCity = this.data.city[e.detail.value];
        this.changePostData(this.data.postData);
    },
    bindDateChange:function(e){
        this.data.postData.departureTime = e.detail.value;
        this.changePostData(this.data.postData);
    },
    bindTypeChange: function (e) {
        console.log(e.detail.value);
        this.data.postData.type = e.detail.value;
        this.changePostData(this.data.postData);
    },
    changePostData: function (data) {
        this.setData({
            postData: data
        });
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.showLoading({ title: '加载中...' })//开启加载显示
        this.setData({
            ordersPage : {},
            postData:{
                keyword: '',
                starCity: '',
                destCity: '',
                departureTime: '',
                type: '',
            },
            types: [
                {
                    name: '找车',
                    value: 1,
                },
                {
                    name: '找人',
                    value: 2,
                }
            ],
        })

        setTimeout(function () {
            wx.hideNavigationBarLoading();    //在当前页面隐藏导航条加载动画
            wx.stopPullDownRefresh();    //停止下拉动作
            wx.hideLoading();//关闭加载显示
        }, 1000)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        //上拉加载分页
        if (this.data.ordersPage.page < this.data.ordersPage.pageCount) {
            var nextPage = this.data.ordersPage.page + 1;
            var that = this;
            wx.showLoading({ title: '加载中...' })//开启加载显示
            orderModel.searchOrder(this.data.postData, nextPage, function (res) {
                console.log(res);
                that.data.ordersPage.page = res.data.page;
                that.data.ordersPage.count = res.data.count;
                for (var i = 0; i < res.data.list.length; i++) {
                    that.data.ordersPage.list.push(res.data.list[i]);
                }
                that.setData({
                    ordersPage: that.data.ordersPage
                })
                wx.hideLoading();//关闭加载显示
            });
        }
    },

})