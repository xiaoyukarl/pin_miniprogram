
import { HomeModel } from '../../utils/model/HomeModel.js';
import { OrderModel } from '../../utils/model/OrderModel.js';
import { CollectModel } from '../../utils/model/CollectModel.js';
var homeModel = new HomeModel();
var orderModel = new OrderModel();
var collectModel = new CollectModel();

Page({
    data: {
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
    },
    navigateTo(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    },
    onLoad: function () {
        var banners = wx.getStorageSync('banners')
        if (!banners) {
            this.getBanners();
        }else{
            this.setData({
                banners : banners
            })
        }
        var ordersPage = wx.getStorageSync('ordersPage')
        if (!ordersPage){
            this.getOrders();
        }else{
            this.setData({
                ordersPage: ordersPage
            })
        }
        this.getCollect()
    },
    getCollect : function(){
        collectModel.getAllCollect(function(res){
            console.log(res.data)
            wx.setStorageSync('collect', res.data)
        })
    },
    getBanners: function(){
        var that = this;
        homeModel.getBannerData(function (res) {
            that.setData({
                banners: res.data
            })
            wx.setStorageSync('banners', res.data)
        })
        
    },
    getOrders : function(){
        var that = this;
        orderModel.getHomeOrders(function(res){
            that.setData({
                ordersPage : res.data
            })
            wx.setStorageSync('ordersPage', res.data)//缓存
        }, 1);
    }, 
    onPullDownRefresh: function () {
        //下拉刷新页面
        wx.showNavigationBarLoading();    //在当前页面显示导航条加载动画
        this.getBanners();
        this.getOrders();
        this.getCollect()
        setTimeout(function () {
            wx.hideNavigationBarLoading();    //在当前页面隐藏导航条加载动画
            wx.stopPullDownRefresh();    //停止下拉动作
        }, 1000)
    },
    onReachBottom: function () {
        //上拉加载分页
        if (this.data.ordersPage.page < this.data.ordersPage.pageCount) {
            var nextPage = this.data.ordersPage.page + 1;
            var that = this;
            wx.showLoading({title: '加载中...'})//开启加载显示
            orderModel.getHomeOrders(function (res) {
                console.log(res);
                that.data.ordersPage.page = res.data.page;
                that.data.ordersPage.count = res.data.count;
                for (var i = 0; i < res.data.list.length; i++) {
                    that.data.ordersPage.list.push(res.data.list[i]);
                }
                that.setData({
                    ordersPage: that.data.ordersPage
                })
                wx.setStorageSync('ordersPage', that.data.ordersPage)//缓存
                wx.hideLoading();//关闭加载显示
            }, nextPage);
        }
    },
    detail : function(event){
        var id = homeModel.getDataSet(event, 'id')
        wx.navigateTo({
            url: '../detail/detail?id='+id,
        })
    }
})