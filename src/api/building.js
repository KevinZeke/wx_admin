import axios from 'axios'
import apiConf from './api.conf'
import Qs from 'qs'

export function getList(curPage, pageSize) {
    // Common::get('curPage'), Common::get('pageSize')
    return axios.get(apiConf.building.listUrl, {params: {curPage, pageSize}});
}

export function getPageInfo(curPage, pageSize) {
    // Common::get('curPage'), Common::get('pageSize')
    return axios.get(apiConf.building.pageCountUrl, {params: {curPage, pageSize}});
}



export function insertOne(longi, lati, jz_type, jz_address, jz_data, other) {
    return axios.post(apiConf.building.insert1url, Qs.stringify(
        {longi, lati, jz_type, jz_address, jz_data, other}), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
}

export function updateById(id, longi, lati, jz_type, jz_address, jz_data, other) {
    return axios.post(apiConf.building.updateByidUrl, Qs.stringify(
        {id, longi, lati, jz_type, jz_address, jz_data, other}), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
}


export function getById(id) {
    return axios.get(apiConf.building.getByidUrl, {params: {id}});
}

export function del(id) {
    return axios.get(apiConf.building.delByidUrl, {params: {id}});
}