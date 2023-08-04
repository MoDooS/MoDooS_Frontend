import axios, { Axios } from 'axios';

const modoosAxios = axios.create({
  baseURL: 'https://modustudy.com', // 백엔드 서버 URL
});

export default modoosAxios;
