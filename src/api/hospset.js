import request from '@/utils/request'

export default {
    //医院设置列表
    getHospSetList(current, limit, searchObj) {
        return request({
            url: `/admin/hosp/hospitalSet/findPage/${current}/${limit}`,
            method: 'post',
            data: searchObj // 使用json传递
        })
    },
    //删除医院设置
    deleteHospSet(id) {
        return request ({
        url: `/admin/hosp/hospitalSet/${id}`,
        method: 'delete'
        })
     },
    // 批量删除
    batchHospSet(idList) {
        return request ({
            url : `/admin/hosp/hospitalSet/batchRemove`,
            method: `delete`,
            data: idList
        })
    },
    //  锁定和取消锁定
    lockHospSet(id,status) {
        return request ({
          url: `/admin/hosp/hospitalSet/lockHospital/${id}/${status}`,
          method: 'put'
        })
    },
    //  添加医院设置
    saveHospSet(hospitalSet) {
        return request ({
            url : `/admin/hosp/hospitalSet/saveHospitalSet`,
            method : 'post',
            data : hospitalSet
        })
    },
    //  医院id查找
    getHospSet(id) {
        return request ({
            url : `/admin/hosp/hospitalSet/getHospSet/${id}`,
            method : 'get',
        })
    },
     // 医院修改
    updateHospSet(hospitalSet) {
        return request ({
            url : `/admin/hosp/hospitalSet/updateHospitalSet`,
            method : 'post',
            data : hospitalSet
        })
    }
}


