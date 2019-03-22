import fetch from '@/utils/fetch'

export function runWx(params) {
  return fetch({
    url: '/wx/run',
    method: 'get',
    params
  })

}
