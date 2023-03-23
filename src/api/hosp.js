import request from '@/utils/request'

export default {
    //医院列表
    getHospList(page, limit, searchObj) {
        return request({
            url: `/admin/hosp/hospital/list/${page}/${limit}`,
            method: 'get',
            params: searchObj // 使用json传递
        })
    },
    //根据dict_code查询所有子节点(省)
    findByDictCode(dictCode) {
        return request ({
            url : `/admin/cmn/dict/findByDictCode/${dictCode}`,
            method : 'get'
        })
    },
    //根据id查询下级数据字典
    findByParentId(id) {
        return request({
            url: `/admin/cmn/dict/findChildren/${id}`,
            method: 'get'
          })
    },
    //  更新医院状态   
    updateStatus(id, status) {
        return request({
            url: `/admin/hosp/hospital/updateHospitalStatus/${id}/${status}`,
            method: 'get'
        })
    },
    //查看医院详情
    getHospitalById(id) {
        return request({
            url: `/admin/hosp/hospital/showHospital/${id}`,
            method: 'get'
        })
    },
    //查看医院科室
    getDeptbyHoscode(hoscode) {
        return request({
            url: `/admin/hosp/department/getDeptList/${hoscode}`,
            method: 'get'
        })
    },
    //  查询预约规则
    getScheduleRule(page, limit, hoscode, depcode) {
        return request ({
            url : `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
            method : 'get'
        })
    },
    //  查询排班详细信息
    getScheduleDetail(hoscode, depcode, workDate) {
        return request ({
            url : `/admin/hosp/schedule/getScheduleDetail/${hoscode}/${depcode}/${workDate}`,
            method : 'get'
        })
    },
}


