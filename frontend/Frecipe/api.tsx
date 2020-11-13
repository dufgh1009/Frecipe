import axios from 'axios';

const callApi = async (
  method: string,
  path: string,
  data: object | null,
  jwt: string | null,
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
  createAccount: (form: object) => callApi('post', '/users', form, null),
  login: (form: object) => callApi('post', '/users/login', form, null),
  findId: (form: object) => callApi('post', '/finds/id', form, null),

  // setting
  getUser: (token: string) => callApi('get', '/users/details', null, token),
  updateUser: (form: object, token: string) =>
    callApi('put', '/users.', form, token),
  deleteUser: (token: string) => callApi('delete', '/users', null, token),

  // refrigerator
  addFridges: (form: Array<any>, token: string) =>
    callApi('post', '/fridges', form, token),
  getFridges: (token: string) => callApi('get', '/fridges', null, token),
  delFridge: (id: number, token: string) =>
    callApi('delete', `/fridges/delete/${id}`, null, token),
  delFridges: (token: string) =>
    callApi('delete', '/fridges/delete/all', null, token),

  // recipe recommend
  sevenIngredient: (token: string) =>
    callApi('get', '/fridges/recommands', null, token),

  // community
  getRecipe: () => callApi('get', '/recipes', null, null),
  createRecipe: (form: object, token: string) =>
    callApi('post', '/recipes', form, token),
  recipeDetail: (id: number) => callApi('get', `/recipes/${id}`, null, null),
};
