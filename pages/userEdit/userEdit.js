// pages/userEdit/userEdit.js

import { UserModel } from '../..//utils/model/UserModel.js'

var userModel = new UserModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarBase64 : '',
        tempUsername : '',
        tempTelephone : '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo: wx.getStorageSync("userInfo")
        })
    },
    changeAvatar: function () {
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
                        that.data.userInfo.avatarUrl = 'data:image/jpeg;base64,' + res.data
                        that.setData({
                            userInfo: that.data.userInfo,
                            avatarBase64: 'data:image/jpeg;base64,' + res.data
                        })
                    }
                })

            }
        })
    },
    bindTelInput :function(e){
        this.setData({
            tempTelephone : e.detail.value
        })
    },
    bindNameInput: function (e) {
        this.setData({
            tempUsername: e.detail.value
        })
    },
    updateUserInfo :function(event){
        
        var data = {
            username: this.data.tempUsername ? this.data.tempUsername : this.data.userInfo.username,
            avatar: this.data.avatarBase64,
            telephone: this.data.tempTelephone ? this.data.tempTelephone : this.data.userInfo.telephone,
        }
        userModel.updateUserInfo(data,function(res){
            wx.setStorageSync("userInfo", res.data)
            wx.navigateBack({
                delta: 1
            })
            wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1000
            })
        })
    }

})

