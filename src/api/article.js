import request from '@/utils/request'

const api_name = '/api/article'

export default {
    //保存或新建文章
    saveorupdate(article) {
        return request({
            // url: `${api_name}/auth/save`,
            url: `${api_name}/save`,
            method: 'post',
            data: article
        })
    },
}


