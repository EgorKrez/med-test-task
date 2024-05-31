import axios from 'axios';

const getCookie = (name: string) => {
  return document.cookie.split('; ').map(
    c => c.split('=')
  ).find(
    ([n]) => n === name
  )?.[1]
}

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(r => {
  r.headers.set('Authorization', `Bearer ${getCookie('jwt')}`)

  return r;
})
