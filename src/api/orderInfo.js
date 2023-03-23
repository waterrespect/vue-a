import request from '@/utils/request'

const api_name = '/admin/order/orderInfo'
export default {
    //訂單列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            param: searchObj
        })
    },
    //訂單狀態
    getStatusList() {
        return request({
            url: `${api_name}/getStatusList`,
            method: 'get',
        })
    },
    //訂單詳情
    getById(id) {
        return request({
          url: `${api_name}/show/${id}`,
          method: 'get'
        })
      }    
}


