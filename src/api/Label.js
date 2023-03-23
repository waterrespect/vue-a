import request from '@/utils/request'

const api_name = '/admin/label'

export default {
    //  1、获取所有标签
    Get_Label_List(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    //  2、添加或修改标签
    Post_Label_Add_Or_Update() {
        return request({
            url: `${api_name}/addOrUpdate`,
            method: 'post',
            data : labelVo
        })
    },
}


