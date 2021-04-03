import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
  // return request('/api/login');
}
export async function queryNotices() {
  return request('/api/notices');
  // return request('/api/login');
}
