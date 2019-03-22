/**
 * Created by win7 on 2017/9/15.
 */
import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'

export function getList(page, size) {
  return fetch({
    url: '/agent/list',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function charge(chargeForm) {
  return fetch({
    url: '/agent/charge',
    method: 'get',
    params: {
      chargeForm
    }
  })
}

//  代理金币充值
export function chargeGold(chargeForm) {
  return fetch({
    url: '/agent/chargeGold',
    method: 'get',
    params: {
      chargeForm
    }
  })
}

export function clearRebate(chargeForm) {
  return fetch({
    url: '/agent/clearRebate',
    method: 'get',
    params: {
      chargeForm
    }
  })
}

export function agent(agentForm, method) {
  return fetch({
    url: '/agent',
    method: method,
    params: {
      agentForm
    }
  })
}

export function fetchList(query) {
  return fetch({
    url: '/agent/fetchdelegates',
    method: 'get',
    params: query
  })
}

export function deleteAgent(id) {
  return fetch({
    url: '/agent/delagent',
    method: 'get',
    params: {'id': id}
  })
}
//商品列表
export function getGoodsList(pageNumber,size) {
  return fetch({
    url: '/goods/list',
    method: 'get',
    params: {
      // "session_id": getToken(),
      "page":pageNumber,
      "size":size
    }
  })
}
//删除商品
export function getDeleteGoods(id) {
  let ary={
    id: id
  };
  return fetch({
    url: '/goods/delete',
    method: 'post',
    data:ary
  })
}
//批量删除商品
export function getDeleteBatch(multipleSelection) {
  return fetch({
    url: '/goods/delete_batch',
    method: 'post',
    data:multipleSelection
  })
}
//添加商品
export function getAddGoods(params) {
  return fetch({
    url: '/goods/save',
    method: 'post',
    data : params
  })
}
//商品分类
export function getGoodsCategoryList(name,price,giftVoucher,goodsCategory) {
  return fetch({
    url: '/goods_category/list',
    method: 'get',
    params : {
      "name": name,
      "price":price,
      "gift_voucher": giftVoucher,
      "goods_category": {'id':goodsCategory},
    }
  })
}
//商品详情
export function getGoodsDetail(id) {
  return fetch({
    url: '/goods/detail',
    method: 'get',
    params : {
      "id":id,
    }
  })
}
//兑换列表
export function getChangeList(pageNumber,size) {
  return fetch({
    url: '/goods_exchange_record/list',
    method: 'get',
    params: {
      "page":pageNumber,
      "size":size
    }
  })
}
//游戏公告列表
export function gameNoticeList(pageNumber,size) {
  return fetch({
    url: '/notice/list',
    method: 'get',
    params: {
      "page":pageNumber,
      "size":size
    }
  })
}
//添加游戏公告
export function addGameNotice(params) {
  return fetch({
    url: '/notice/save',
    method: 'post',
    data : params
  })
}
//游戏公告详情
export function gameNoticeDetail(id) {
  return fetch({
    url: '/notice/detail',
    method: 'get',
    params: {
      "id":id
    }
  })
}
//删除游戏公告
export function deleteGameNotice(params) {
  return fetch({
    url: '/notice/delete',
    method: 'post',
    data : params
  })
}
//活动列表
export function activityList(pageNumber,size) {
  return fetch({
    url: '/image_text/list',
    method: 'get',
    params: {
      "page":pageNumber,
      "size":size
    }
  })
}
//添加活动
export function addActivity(params) {
  return fetch({
    url: '/image_text/save',
    method: 'post',
    data : params
  })
}
//活动详情
export function activityDetail(id) {
  return fetch({
    url: '/image_text/detail',
    method: 'get',
    params: {
      "id":id
    }
  })
}
//删除活动
export function deleteActivity(params) {
  return fetch({
    url: '/image_text/delete',
    method: 'post',
    data : params
  })
}
//分享编辑
export function addShare(params) {
  return fetch({
    url: '/share',
    method: 'post',
    data : params
  })
}

//提现列表
export function getWithdraw(params) {
  return fetch({
    url: '/agent_withdraw/list',
    method: 'get',
    params:params
  })
}

//分享信息
export function getShare() {
  return fetch({
    url: '/share_detail',
    method: 'get'
  })
}

//确认提现
export function withdrawConfirm(params) {
  return fetch({
    url: '/agent_withdraw/confirm',
    method: 'post',
    data:params
  })
}
