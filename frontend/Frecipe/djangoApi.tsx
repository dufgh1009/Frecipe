import axios from 'axios';

const callApi = async (method: string, path: string, data: object) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://127.0.0.1:8000';
  const fullUrl = `${baseUrl}${path}`;
  if (method === 'post') {
    return axios[method](fullUrl, data, { headers });
  }
  // axios({
  //   method: 'post',
  //   url: fullUrl,
  //   data: data,
  //   headers: headers,
  // })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

export default {
  receipt: (url: object) => callApi('post', '/ocr/', url),
};
