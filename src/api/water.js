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