import axios from 'axios'
import apiConf from './api.conf'
import Qs from 'qs'

export function getList(curPage, pageSize) {
    // Common::get('curPage'), Common::get('pageSize')
    return axios.get(apiConf.water.listUrl, {params: {curPage, pageSize}});
}

export function getPageInfo(curPage, pageSize) {
    // Common::get('curPage'), Common::get('pageSize')
    return axios.get(apiConf.water.pageCountUrl, {params: {curPage, pageSize}});
}

export function insertOne(xfsid, longi, lati, qc_type, qc_guige, other) {
    return axios.post(apiConf.water.insert1url, Qs.stringify(
        {xfsid, longi, lati, qc_type, qc_guige, other}), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
}

export function updateById(id, xfsid, longi, lati, qc_type, qc_guige, other) {
    return axios.post(apiConf.water.updateByidUrl, Qs.stringify(
        {id, xfsid, longi, lati, qc_type, qc_guige, other}), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
}


export function getById(id) {
    return axios.get(apiConf.water.getByidUrl, {params: {id}});
}

export function del(id) {
    return axios.get(apiConf.water.delByidUrl, {params: {id}});
}