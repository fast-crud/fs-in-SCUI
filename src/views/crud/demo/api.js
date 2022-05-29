import mock from './mock';
async function request({ url, data, params }) {
  for (let item of mock) {
    if (url.startsWith(item.path)) {
      return new Promise((resolve) => {
        let ret = item.handle({ body: data, params });
        console.log('ret', ret);
        setTimeout(() => {
          resolve(ret.data);
        }, 200);
      });
    }
  }
  throw new Error('找不到mock请求');
}
const apiPrefix = '/FormGroup';
export function GetList(query) {
  return request({
    url: apiPrefix + '/page',
    method: 'get',
    data: query,
  });
}

export function AddObj(obj) {
  return request({
    url: apiPrefix + '/add',
    method: 'post',
    data: obj,
  });
}

export function UpdateObj(obj) {
  return request({
    url: apiPrefix + '/update',
    method: 'post',
    data: obj,
  });
}

export function DelObj(id) {
  return request({
    url: apiPrefix + '/delete',
    method: 'post',
    params: { id },
  });
}

export function GetObj(id) {
  return request({
    url: apiPrefix + '/info',
    method: 'get',
    params: { id },
  });
}
