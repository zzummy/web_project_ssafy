import { apiInstance } from "./index.js";

const api = apiInstance();

function listNotice(param, success, fail) {
  api.get(`/notice`, { params: param }).then(success).catch(fail);
}

function listNoticeAll(success, fail) {
  api.get(`/notice/list`).then(success).catch(fail);
}

function writeNotice(notice, success, fail) {
  api.post(`/notice`, JSON.stringify(notice)).then(success).catch(fail);
}

function getNotice(noticeno, success, fail) {
  api.get(`/notice/${noticeno}`).then(success).catch(fail);
}

function modifyNotice(notice, success, fail) {
  api.put(`/notice`, JSON.stringify(notice)).then(success).catch(fail);
}

function deleteNotice(noticeno, success, fail) {
  api.delete(`/notice/${noticeno}`).then(success).catch(fail);
}

export {
  listNotice,
  listNoticeAll,
  writeNotice,
  getNotice,
  modifyNotice,
  deleteNotice,
};
