import axios from 'axios';

const callApi = async (
  method: string,
  path: string,
  data: object | null,
  jwt: string,
  params = {},
) => {
  const headers = {
    // Authorization: `Bearer ${jwt}`,
    // 'Content-Type': 'application/json',
    'X-AUTH-TOKEN': jwt,
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

  // 로그인, 로그아웃, 아이디비밀번호 찾기
  createAccount: (form: object) => callApi('post', '/users', form),
  login: (form: object) => callApi('post', '/users/login', form),
  findId: (form: object) => callApi('post', '/finds/id', form),

  // setting
  getUser: (token: string) => callApi('get', '/users/details', null, token),
  updateUser: (form: object, token: string) =>
    callApi('put', '/users.', form, token),
  deleteUser: (token: string) => callApi('delete', '/users', null, token),

  // recipe recommend
  sevenIngredient: (token: string) =>
    callApi('get', '/fridges/recommands', null, token),

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
