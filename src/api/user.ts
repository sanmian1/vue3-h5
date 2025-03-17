// src/api/user.ts
import request from './index';

export const getUserInfo = (params: any) => request.get('/user/info', { params });