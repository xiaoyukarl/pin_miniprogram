// pages/detail/detail.js

import { OrderModel } from '../../utils/model/OrderModel.js';
import { CollectModel } from '../../utils/model/CollectModel.js';
var orderModel = new OrderModel();
var collectModel = new CollectModel();

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
        console.log(options);
        this.setData({
            id : options.id,
            isCollect : 2
        })
        this.showDetail(options.id);
        this.checkHasCollect(options.id)
        console.log(this.data)
    },
    showDetail : function(id){
        var that = this
        orderModel.getOrderDetail(id, function(res){
            //console.log(res.data)
            that.setData({
                detail :res.data
            })
        })
    },
    checkHasCollect:function(id){
        var collect = wx.getStorageSync('collect');
        for(var v in collect){
            if (v == id && collect[v] == 1){
                this.setData({
                    isCollect:1
                })
            }
        }
    },
    bindCollectTag: function(event)
    {
        var data = {
            isCollect: this.data.isCollect == 1 ? 2 : 1,
            orderId : this.data.id
        };
        var that = this
        console.log(data)
        collectModel.createCollect(data, function(res){
            console.log(res)
            var msg = '已收藏'
            if (res.data.isCollect == 2){
                msg = '取消'
            }
            that.setData({
                isCollect: res.data.isCollect
            })
            //重置缓存
            collectModel.getAllCollect(function (res) {
                console.log(res.data)
                wx.setStorageSync('collect', res.data)
            })
            wx.showToast({
                title: msg,
                icon: 'success',
                duration: 1000
            })
        })
    }

})