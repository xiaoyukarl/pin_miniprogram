// pages/myCollect/myCollect.js
import { CollectModel } from '../../utils/model/CollectModel.js';
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
        var collectPage = wx.getStorageSync('collectPage');
        if (collectPage){
            this.setData({
                collectPage: res.data
            })
        }else{
            this.getMyCollect()
        }
        
    },
    getMyCollect : function(){
        var that = this
        collectModel.getMyCollect(1, function(res){
            that.setData({
                collectPage : res.data
            })
        })
    },
    onPullDownRefresh: function () {
        //下拉刷新页面
        wx.showNavigationBarLoading();    //在当前页面显示导航条加载动画
        this.getMyCollect();
        setTimeout(function () {
            wx.hideNavigationBarLoading();    //在当前页面隐藏导航条加载动画
            wx.stopPullDownRefresh();    //停止下拉动作
        }, 1000)
    },
    onReachBottom: function () {
        //上拉加载分页
        if (this.data.collectPage.page < this.data.collectPage.pageCount) {
            var nextPage = this.data.collectPage.page + 1;
            var that = this;
            wx.showLoading({ title: '加载中...' })//开启加载显示
            collectModel.getMyCollect(nextPage, function (res) {
                console.log(res);
                that.data.collectPage.page = res.data.page;
                that.data.collectPage.count = res.data.count;
                for (var i = 0; i < res.data.list.length; i++) {
                    that.data.collectPage.list.push(res.data.list[i]);
                }
                that.setData({
                    collectPage: that.data.collectPage
                })
                wx.setStorageSync('collectPage', that.data.collectPage)//缓存
                wx.hideLoading();//关闭加载显示
            });
        }
    },
    detail: function (event) {
        var id = collectModel.getDataSet(event, 'id')
        wx.navigateTo({
            url: '../detail/detail?id=' + id,
        })
    }
})