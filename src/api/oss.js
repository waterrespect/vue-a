import request from '@/utils/request'

export default {
    //图片删除
    pic_delete(fileKey) {
        return request({
            url: `/api/oss/file/fileDelete/${fileKey}`,
            method: 'get',
        })
    },
}


