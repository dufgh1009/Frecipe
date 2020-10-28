import axios from 'axios';

const callApi = async (
  method: string,
  path: string,
  data: object | null,
  jwt: string,
  params = {},
) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://k3d204.p.ssafy.io:9999';
  const fullUrl = `${baseUrl}${path}`;
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, { headers, params });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

export default {
  AWS_S3_SERVER: 'https://frecipe-pjt.s3.ap-northeast-2.amazonaws.com/',

  createAccount: (form: object) => callApi('post', '/users/', form),
  findId: (form: object) => callApi('post', '/finds/id/', form),

  login: (form: object) => callApi('post', '/users/login/', form),

  getUser: (userNo: number, token: string) =>
    callApi('get', `/users/${userNo}`, null, token),

  //   createSupplies: (id, token, form) =>
  //     callApi("post", `/checks/${id}/new/`, form, token),
  //   myChecklist: (id, token) =>
  //     callApi("get", `/checks/${id}/checklist/`, null, token),
  //   searchSupply: (form) => callApi("post", "/checks/search/"),

  //   detect: (form) => callApi("post", "/utilities/detect/", form),
  //   checkStuff: (id, token, form) =>
  //     callApi("post", `/checks/${id}/distinction/`, form, token),

  //   dateSend: (form) => callApi("post", "/utilities/date/", form),
  //   placeSend: (form) => callApi("post", "/utilities/place/", form),
};
