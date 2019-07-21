// pages/row/index.js
import { UserModel } from '../../utils/model/UserModel.js'

var userModel = new UserModel();


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
        this.__load()
    },
    onShow : function(){
        this.__load()
    },
    __load : function(){
        this.setData({
            canIUse: wx.canIUse('button.open-type.getUserInfo'),
            userInfo: wx.getStorageSync('userInfo')
        })
    },
    bindGetUserInfo(e) {
        this.updateUserInfo(e.detail.userInfo);
    },
    updateUserInfo : function(userInfo){
        var that = this
        wx.downloadFile({
            url: userInfo.avatarUrl,
            success(res) {
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFilePath, //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success: res => { //成功的回调
                        var postData = {
                            username: userInfo.nickName,
                            avatar: res.data
                        }
                        userModel.updateUserInfo(postData, function (res) {
                            that.setData({
                                userInfo: res.data
                            })
                            wx.setStorageSync('userInfo', res.data);
                        });
                    }
                })
            }
        })
        
    },
    bindEditTab: function(event){
        wx.navigateTo({
            url: '../userEdit/userEdit',
        })
    },
    bindCollectTab: function (event) {
        wx.navigateTo({
            url: '../myCollect/myCollect',
        })
    },
    bindOrderTab: function (event) {
        wx.navigateTo({
            url: '../myCarpool/myCarpool',
        })
    }

})