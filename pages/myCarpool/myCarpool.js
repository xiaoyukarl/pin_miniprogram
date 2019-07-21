// pages/myOrder/myOrder.js
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
        this.getMyOrderList();
        // var myOrderList = wx.getStorageSync('myOrderList')
        // if (!myOrderList) {
        //     this.getMyOrderList();
        // } else {
        //     this.setData({
        //         myOrderList: myOrderList
        //     })
        // }
    },
    onShow :function(){
        this.getMyOrderList();
    },
    editOrder:function(event){
        var id = orderModel.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../editCarpool/editCarpool?id='+id,
        })
    },
    getMyOrderList :function(){
        var that = this
        orderModel.getMyOrderList(function(res){
            that.setData({
                myOrderList: res.data
            })
            wx.setStorageSync('myOrderList', res.data)//缓存
        },1)
    },
    onPullDownRefresh: function () {
        //下拉刷新页面
        wx.showNavigationBarLoading();    //在当前页面显示导航条加载动画
        this.getMyOrderList();
        setTimeout(function () {
            wx.hideNavigationBarLoading();    //在当前页面隐藏导航条加载动画
            wx.stopPullDownRefresh();    //停止下拉动作
        }, 1000)
    },
    onReachBottom: function () {
        //上拉加载分页
        if (this.data.myOrderList.page < this.data.myOrderList.pageCount) {
            var nextPage = this.data.myOrderList.page + 1;
            var that = this;
            wx.showLoading({ title: '加载中...' })//开启加载显示
            homeModel.getHomeOrders(function (res) {
                console.log(res);
                that.data.myOrderList.page = res.data.page;
                that.data.myOrderList.count = res.data.count;
                for (var i = 0; i < res.data.list.length; i++) {
                    that.data.myOrderList.list.push(res.data.list[i]);
                }
                that.setData({
                    myOrderList: that.data.myOrderList
                })
                wx.setStorageSync('myOrderList', that.data.myOrderList)//缓存
                wx.hideLoading();//关闭加载显示
            }, nextPage);
        }
    },

})