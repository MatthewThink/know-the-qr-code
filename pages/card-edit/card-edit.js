// pages/card/card-edit/card-edit.js

Page({
    data: {
     
    },

    //加载完成后 读取用户信息
    onLoad: function () {
      let userInfo = wx.getStorageSync("userInfo");
      let user_card = wx.getStorageSync("user_card");
      this.setData({
        userInfo: userInfo,
        user_card: user_card
      })
    },

    formSubmit: function (e) {
        let value = e.detail.value;
        console.log(value);
        let user_name = value.user_true_name;
        let user_phone = value.user_true_phone;
        let user_gongsi = value.user_gongsi;
        let user_zhiwu = value.user_zhiwu;
        let user_email = value.user_email;
        let user_address = value.address;
        let user_jianjie = value.user_jianjie;
        if (!user_name){
          wx.showToast({
            icon:"none",
            title: '姓名不能为空',
            duration:2500
          });return;
        }
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!user_phone || !myreg.test(user_phone)) {
          wx.showToast({
            icon: "none",
            title: '请输入正确的手机号',
            duration: 2500
          });return;
        }
        if (!user_gongsi) {
          wx.showToast({
            icon: "none",
            title: '公司名称不能为空',
            duration: 2500
          }); return;
        }
        if (!user_zhiwu) {
          wx.showToast({
            icon: "none",
            title: '职务名称不能为空',
            duration: 2500
          }); return;
        }
        if (!user_email) {
          wx.showToast({
            icon: "none",
            title: '邮箱不能为空',
            duration: 2500
          }); return;
        }
        let data={
          user_name: user_name,
          user_phone: user_phone,
          user_gongsi: user_gongsi,
          user_zhiwu: user_zhiwu,
          user_email: user_email,
          user_address: user_address,
          user_jianjie: user_jianjie,
        }
        wx.setStorageSync("user_card", data);
        wx.showToast({
          icon:"success",
          title: '创建成功',
          duration:2500,
          success:function(){
             setTimeout(()=>{
               wx.switchTab({ url: '/pages/card/card', })
             },2500)
          }
        })
      
       

    },
    // completeAfter: function () {
    //     var that = this
    //     that.setData({
    //         btn_disabled: false,
    //         submitIsLoading: false
    //     })
    // },
    // initpostCardInfoData: function (data) {
    //     var that = this
    //     that.setData({
    //         btn_disabled: false,
    //         submitIsLoading: false
    //     })
    //     dg.alert("保存成功", function (res) {
    //         let url = '../card-home/card-home';
    //         dg.switchTab({
    //             url: url,
    //             fail: function (res) {
    //                 dg.navigateTo({
    //                     url: url,
    //                 });
    //             },
    //         });
    //     }, "提示");
    // },
    // //验证手机号码
    // check_phone_bind: function (e) {
    //     var that = this
    //     var phone_v = e.detail.value
    //     if (!(/^1\d{10}$/.test(phone_v))) {
    //         that.setData({
    //             yzm_btn_disabled: true
    //         })
    //     } else {
    //         that.setData({
    //             yzm_btn_disabled: false,
    //             this_user_phone: phone_v
    //         })
    //     }
    // },
    // //发送验证码
    // send_phone_code_bind: function () {
    //     let requestUrl = this.data.baseUrl + "/Api/sendPphoneCode.html";
    //     let requestData = {
    //         phone: this.data.this_user_phone,
    //         _: Date.now()
    //     };
    //     requestUtil.get(requestUrl, requestData, (Info) => {
    //         this.initgetUserPhoneCode(Info);
    //     }, this);
    // },
    // initgetUserPhoneCode: function (data) {
    //     var that = this
    //     //倒计时
    //     that.setData({
    //         yzm_btn_disabled: true
    //     })
    //     that.getShengTime()
    // },
    // getShengTime: function () {
    //     var that = this
    //     var yijing_time = that.data.yzm_all_time - 1;
    //     if (that.data.yzm_all_time > 0) {
    //         that.setData({
    //             yzm_all_time: yijing_time,
    //             yzm_btn_text: '等待' + yijing_time + '秒'
    //         })
    //         setTimeout(function () {
    //             that.getShengTime();
    //         }
    //             , 1000)
    //     } else {
    //         that.setData({
    //             yzm_btn_disabled: false,
    //             yzm_btn_text: '获取验证码',
    //             yzm_all_time: 60
    //         })
    //     }
    // },

    //选择上传图片(可以暂时保存在本地，图片还可以显示)
    // onChooseImg: function () {
    //     const uploadFiles = this.data.uploadFiles;
    //     var that = this;
    //     dg.chooseImage({
    //         count: this.data.max_upload_files_count - uploadFiles.length,
    //         success: (res) => {
    //             //each里头的函数是个什么鬼 TODO
    //             _.each(res.tempFilePaths, file => uploadFiles.push({
    //                 file: file, status: 0
    //             }));
    //             that.setData({ uploadFiles: uploadFiles });
    //             //上传图片
    //             this.onUploadImg();
    //         },
    //     })
    // },

    // //上传图片()
    // onUploadImg: function () {
    //     if (this.data.isUpload) return; //检测是否有文件正在上传
        
    //     var that = this;
    //     that.setData({ isUpload: true });

    //     let index = 0;
    //     const uploadFiles = [].concat(this.data.postimg);

    //     //递归调用
    //     const handler = (index) => {
    //         //定义当前
    //         const uploadFile = uploadFiles[index], state = uploadFile.status;
    //         if (state == 2) {
    //             handler(index + 1);
    //         } else {
    //             //更新当前上传文件的状态为：上传中
    //             uploadFile.status = 1;
    //             //上传文件
    //             let requestUrl = that.data.baseUrl + "/Api/uploadImg.html";
    //             that.pushRQId = requestUtil.upload(requestUrl, uploadFile.file, 'file', {}, res => {
    //                 //更新当前上传文件状态为：完成
    //                 uploadFile.status = 2;
    //                 uploadFile.url = res;
    //                 that.setData({ uploadFiles: uploadFiles });
    //             }, that, {
    //                     completeAfter: () => {
    //                         //索引加一，判断数组长度，进行递归
    //                         index++;
    //                         if (index < uploadFiles.length) handler(index);
    //                         else that.setData({ isUpload: false })
    //                     },
    //                     error: () => uploadFile.state = 3,
    //                     failAfter: () => uploadFile.state = 3,
    //                 });
    //         }
    //     };

    //     handler(0); //执行handler函数
    // },

    // //删除imglist图片
    // del_list_pic_bind: function (e) {

    //     var that = this
    //     var index = e.currentTarget.id;
    //     var datas = that.data.card_info.imglist;
    //     var imgid = that.data.card_info.imgid;
    //     datas.splice(index, 1)
    //     imgid.splice(index, 1)

    //     let card_info = this.data.card_info;
    //     card_info.imglist = datas;
    //     card_info.imgid = imgid;

    //     that.setData({
    //         card_info: card_info,
    //     })
    // },

    // //删除postimg图片
    // del_pic_bind: function (e) {
    //     var that = this
    //     var index = e.currentTarget.id;
    //     var datas = that.data.postimg;
    //     datas.splice(index, 1);

    //     let postimg = datas;

    //     that.setData({
    //         postimg: postimg,
    //     })

    // },
    // //上传图片
    // chooseimg_bind: function () {
    //     var that = this
    //     if (that.data.card_info.imglist) {
    //         var img_lenth = (that.data.postimg ? that.data.postimg.length : 0) + that.data.card_info.imglist.length
    //     } else {
    //         var img_lenth = that.data.postimg.length
    //     }


    //     dg.chooseImage({
    //         count: 9,
    //         sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //         success: function (res) {
    //             // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //             let postimg = that.data.postimg.concat(res.tempFilePaths);

    //             that.setData({
    //                 postimg: postimg
    //             });
    //         }
    //     })
    // },

    // /**
    //  * 上传图片
    //  */
    // uploadImage: function (paths, callback, imgs) {
    //     const path = paths.shift();
    //     imgs = imgs || [];
    //     let requesetUrl = this.data.baseUrl + "/Api/imgUpload.html";
    //     requestUtil.upload(requesetUrl, path, 'file', {}, (imgUrl) => {
    //         imgs.push(imgUrl);
    //         if (paths.length) {
    //             this.uploadImage(paths, callback, imgs);
    //         } else {
    //             callback.apply(this, [imgs]);
    //         }
    //     });
    // },

    // /**
    //  * 地图上选择地址
    //  */
    // chooseLocation: function (e) {
    //     let that = this;
    //     wx.chooseLocation({
    //         success: function (res) {
    //             let location = {
    //                 address: res.address + res.name,
    //                 longitude: res.longitude,
    //                 latitude: res.latitude,
    //             };
    //             that.setData({
    //                 location: location,
    //             });
    //         },
    //         fail: function (res) {
    //             if (res.errMsg.indexOf('den') !== -1) {
    //                 dg.confirm("是否重新授权获取地理位置？", function (res) {
    //                     if (res.confirm) {
    //                         dg.openSetting({});
    //                     }
    //                 }, '授权失败');
    //             }
    //         }
    //     });
    // },

    // chage_phone_bind: function () {
    //     dg.navigateTo({
    //         url: '/pages/card/card-phone/card-phone',
    //         fail: function (res) {
    //             dg.switchTab({
    //                 url: '/pages/card/card-phone/card-phone',
    //             })
    //         }
    //     })
    // },
})