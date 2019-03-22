/**
 * Created by win7 on 2017/9/22.
 */
import fetch from '@/utils/fetch'

export function getList(page, size) {
  return fetch({
    url: '/player/list',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function getMemberList(page, size) {
  return fetch({
    url: '/player/memberlist',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function getListVip(page, size) {
  return fetch({
    url: '/player/listvip',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function charge(chargeForm) {
  return fetch({
    url: '/player/charge',
    method: 'get',
    params: {
      // chargeForm
      chargeForm
    }
  })
}

export function chargeGold(chargeForm) {
  return fetch({
    url: '/player/chargeGold',
    method: 'get',
    params: {
      // chargeForm
      chargeForm
    }
  })
}

export function changeUserDelegate(chargeForm) {
  return fetch({
    url: '/player/changeUserDelegate',
    method: 'get',
    params: {
      // chargeForm
      chargeForm
    }
  })
}

export function upGoals(chargeForm) {
  return fetch({
    url: '/agent/upGoal',
    method: 'get',
    params: {
      chargeForm
    }
  })
}

export function downGoals(chargeForm) {
  return fetch({
    url: '/agent/downGoal',
    method: 'get',
    params: {
      chargeForm
    }
  })
}

export function fetchPlayer(id) {
  return fetch({
    url: '/player/fetchplayer',
    method: 'get',
    params: {
      id
    }
  })
}

export function fetchList(query) {
  return fetch({
    url: '/player/fetchplayers',
    method: 'get',
    params: query
  })
}

export function fetchListWithReferee(query) {
  return fetch({
    url: '/player/fetchPlayersRef',
    method: 'get',
    params: query
  })
}

export function fetchListVip(query) {
  return fetch({
    url: '/player/fetchplayersvip',
    method: 'get',
    params: query
  })
}



