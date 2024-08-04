// src/app/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/music-app'
});

export const register = (username: any, password: any, email: any) => {
  return api.post('/register', { username, password, email });
};

export const login = (username: string, password: string) => {
  return api.post('/login', { username, password });
};
