import axios from 'axios';

const modoosAxios = axios.create({
  baseURL: 'https://modustudy.com', // 백엔드 서버 URL
  withCredentials: true,
});

export default modoosAxios;
