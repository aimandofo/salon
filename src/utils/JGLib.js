/**
 * jg庫
 */

import Config from '../Config.json'
// import shopdata from '../data/shop.json'
import {getLocalJsonData, saveLocalJsonData} from './function'
import constant from './constant'
// import device from './device'
import {postData} from './netFetch'

class JGLib {
  constructor () {
    this.shopData = null;
    this.onMessage = [];
    document.addEventListener('message', this.ListenerMessage.bind(this))
    // 改写alert
    window.alert = function (txt, fun) {
      let shield = document.createElement('DIV');
      shield.id = 'shield';
      shield.style.position = 'absolute';
      shield.style.left = '0px';
      shield.style.top = '0px';
      shield.style.width = '100%';
      shield.style.height = '100%';
      shield.style.background = '#333';
      shield.style.textAlign = 'center';
      shield.style.zIndex = '19901000';
      shield.style.filter = 'alpha(opacity=.5)';
      shield.style.opacity = '.5';
      let alertFram = document.createElement('DIV');
      alertFram.id = 'alertFram';
      alertFram.style.position = 'absolute';
      alertFram.style.left = '10%';
      alertFram.style.top = '35%';
      alertFram.style.width = '80%';
      alertFram.style.background = '#fff'; // "#ccc";
      alertFram.style.overflow = 'hidden';
      alertFram.style.textAlign = 'center';
      alertFram.style.borderRadius = '5px';
      alertFram.style.zIndex = '19901024';
      window.tFun = fun;
      // console.log(window.tFun, 'asdfasdf')
      let strHtml = '<ul style="list-style:none;margin:0px;' +
        'padding:0px;background:#FFFFFF;width:100%">\n';
      strHtml += ' <li style="background:#FFFFFF;font-size:15px;' +
        'text-align:left;height:30px;margin:10px;padding:10px' +
        'line-height:30px;' +
        'border-bottom: 1px solid #EBEBEB;">' +
        '提 示</li>\n';
      strHtml += ' <li style="padding:10px;background:#fff;' +
        'text-align:left;font-size:18px;margin-left:30px' +
        'border-bottom: 1px solid #EBEBEB;">' + txt + '</li>\n';
      strHtml += ' <li style="background:#FFFFFF;' +
        'text-align:right;font-size:14px;height:45px;' +
        'line-height:45px;">' +
        '<span onclick="{' +
        '        document.body.removeChild(alertFram);\n' +
        '        document.body.removeChild(shield);\n' +
        '        if (tFun) {\n' +
        '          tFun();\n' +
        '        }}" ' +
        'style="width: 50%;cursor: pointer;' +
        'background:#6776ff;color: #fff;' +
        'margin-right: 40px;margin:20px;padding: 5px">確 定</span></li>\n';
      strHtml += '</ul>\n';
      alertFram.innerHTML = strHtml;
      document.body.appendChild(alertFram);
      document.body.appendChild(shield);

      alertFram.focus();
    }
    document.body.onselectstart = function () { return false; };
    if (Config.debug) {
      this.testHeaders(); // debug
    }
  }
  // debug
  testHeaders () {
    window.headers = {
      PixelRatio: '2.5',
      'app-type': 'RNAPP',
      appName: 'aimandofor',
      appParam: 'aimandofor',
      bufferData: 'uuu_bufferData190803',
      debug: false,
      height: '816',
      msgkey: '',
      'os - type': 'android',
      shopid: Config.testshop, // 'uuu',
      template: 'salon',
      userid: '13110564077',
      verApp: '1.0.83',
      width: '432'
    }
    window.headers.shopid = Config.testshop;
    let url = Config.upserver + '/aimandofo/shopData/shopid/' + Config.testshop
    // console.log(url);
    postData(url, null).then((data) => {
      if (data) {
        this.shopData = data.data;
        saveLocalJsonData(constant.SHOPDATA, data.data)
      }
    })
  }

  // 設置信息
  setOnMessage (onMessage, name = '') {
    const id = name + 'kklkals'
    this.onMessage.push({
      name: name,
      onMessage: onMessage,
      id: id
    })
    return id;
  }
  // 刪除 onMessage對列
  unOnMessage (id) {
    for (let i = 0; i < this.onMessage.length; i++) {
      if (this.onMessage[i].id === id) {
        this.onMessage.splice(i, 1);
        return
      }
    }
  }
  // 轉化給 用戶
  sendMessage (data) {
    this.onMessage.map((item) => {
      if (item.name === '' || item.name === data.type) {
        item.onMessage(data)
      }
    })
  }
  // 接收信息
  ListenerMessage (msg) {
    let data = null;
    try {
      data = JSON.parse(msg.data)
    } catch (e) {
      // alert("erro")
    }
    if (data === null) {
      return false;
    }
    switch (data.type) {
      case 'initData': {
          // 初始值
        window.headers = data.headers;
        this.shopData = data.data;
        saveLocalJsonData(constant.SHOPDATA, data.data)
        // saveLocalData(constant.SHOPDATA, JSON.stringify(data.data))
        // device.console(data.headers);
        this.sendMessage({type: 'init'})
        break;
      }
      /* case 'getdata': {
        data = data.data;
        if (data === null) {
          return false;
        }
        saveLocalData(constant.SHOPDATA, JSON.stringify(data))
        break;
      } */
      /* case 'clearGoods': {
        break;
      } */
      default :
        this.sendMessage(data)
        break;
    }
  }

  // 獲取數據
  async getShopData () {
    if (typeof window.headers.shopid === 'undefined' ||
      window.headers.shopid === '') {
      this.shopData = null;
      return null;
    }
    if (this.shopData !== null) {
      return this.shopData;
    }
    try {
      this.shopData = getLocalJsonData(constant.SHOPDATA);
     // this.shopData = JSON.parse(data)
    } catch (e) {
    }
    /* if (Config.debug && this.shopData === null) {
      this.shopData = shopdata
    } else {

    } */
    return this.shopData;
  }

  // aiman 信息
  async getShopInfo () {
    await this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    return {
      shopid: this.shopData.shopid,
      shopName: this.shopData.shopName,
      logo: this.shopData.logo,
      address: this.shopData.address,
      describ: this.shopData.describ,
      shopTime: this.shopData.shopTime,
      bgImage: this.shopData.bgImage,
      browseImage: this.shopData.browseImage,
      city: this.shopData.chr_city,
      isCollect: this.shopData.isCollect,
      phone: this.shopData.phone
    };
  }
  // 商品
  async getGoods (callBack = null) {
    await this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    let rel = {
      goods: this.shopData.goods,
      goodsType: this.shopData.menutypeData
    };
    if (callBack) {
      callBack(rel);
      return true;
    }
    return rel;
  }

  // 功能
  async getFunList () {
    await this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    return this.shopData.itemFun;
  }

  // blogs
  async getBlogs (callBack = null) {
    await this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    if (callBack !== null) {
      return callBack(this.shopData.blog)
    }
    return this.shopData.blog
  }

  async getworkinfo () {
    await this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    // console.log('asdfasd', this.shopData.workinfo)
    return this.shopData.workinfo
  }
  // 購物車
  getCartList () {
    const cartData = getLocalJsonData(constant.CARTDATA);
    if (cartData !== null) {
      return cartData;
    }
    return {
      selected: [],
      lens: {maxPrice: 0, length: 0}
    }
  }
}

function getJGLib () {
  let lib = window.jglib;
  if (!lib) {
    // console.log('new jglib')
    lib = new JGLib();
  }
  window.jglib = lib;
  return lib;
}

const jglib = getJGLib();// new JGLib()

export default jglib
