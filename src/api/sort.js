import request from '@/utils/request'

const api_name = '/admin/label/category'

export default {
    //分类列表
    Category_findByParentId(id) {
        return request({
            url: `${api_name}/findChildren/${id}`,
            method: 'get',
        })
    },
}


