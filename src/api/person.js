import fetch from '@/utils/fetch'


export function getList(page, size) {
  return fetch({
    url: '/agent/fetchself',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function changePwd(pwd) {
  return fetch({
    url: '/user/changepwd',
    method: 'get',
    params: {
      pwd
    }
  })
}

//提现
export function getMoney(params) {
  return fetch({
    url: '/agent_withdraw/save',
    method: 'post',
    data:params
  })
}

