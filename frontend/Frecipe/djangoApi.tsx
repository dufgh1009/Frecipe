import axios from 'axios';

const callApi = async (method: string, path: string, data: object) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://k3d204.p.ssafy.io:8000';
  const fullUrl = `${baseUrl}${path}`;
  if (method === 'post') {
    return axios[method](fullUrl, data, { headers });
  }
};

export default {
  receipt: (url: object) => callApi('post', '/ocr/', url),
};
