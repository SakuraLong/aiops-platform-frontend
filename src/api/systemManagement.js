import request from '@/utils/request'

/**
 * @description 根据用户等级-1获取对应权限的角色列表
 * @returns {Promise}
 */
export function getRoleList() {
  return request({
    url: '/role/query',
    method: 'get'
  })
}

/**
 * @description 添加角色, 该角色等级为当前用户最高角色的等级的-1，最低为1
 * @param {object} params
// {
//   level: 1,
//   name: '管理员',
//   role: 'admin',
//   desc: '可管理除管理员外其他角色权限',
//   createTime: timestamp,
//   lastEditTime: timestamp,
//   authorityListDict: {
//     // 故障注入授权
//     'Fault-injection': literal[true, false],
//     // 运维数据监控授权
//     DataMonitor: literal[true, false],
//     // 故障检测授权
//     Detection: literal[true, false],
//     // 故障诊断授权
//     Diagnosis: literal[true, false],
//     // 系统管理
//     Manage: literal[true, false],
//     // 系统日志
//     SystemLog: literal[true, false]
//   }
// }
 * @returns {Promise}
 */

export function addRole(params) {
  return request({
    url: '/role/add',
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'Application/Json'
    }
  })
}

/**
 * @description 修改角色权限
 * @param {object} params
// {
//   level: 1,
//   name: '管理员',
//   role: 'admin',
//   desc: '可管理除管理员外其他角色权限',
//   createTime: timestamp,
//   lastEditTime: timestamp,
//   authorityListDict: {
//     // 故障注入授权
//     'Fault-injection': literal[true, false],
//     // 运维数据监控授权
//     DataMonitor: literal[true, false],
//     // 故障检测授权
//     Detection: literal[true, false],
//     // 故障诊断授权
//     Diagnosis: literal[true, false],
//     // 系统管理
//     Manage: literal[true, false],
//     // 系统日志
//     SystemLog: literal[true, false]
//   }
// }
 * @returns {Promise}
 */
export function updateRole(params) {
  return request({
    url: '/role/modify',
    method: 'put',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'Application/Json'
    }
  })
}

/**
 * @description 删除角色
 * @param {object} params
// {
//   level: 1,
//   name: '管理员',
//   role: 'admin',
//   desc: '可管理除管理员外其他角色权限',
//   createTime: timestamp,
//   lastEditTime: timestamp,
//   authorityListDict: {
//     // 故障注入授权
//     'Fault-injection': literal[true, false],
//     // 运维数据监控授权
//     DataMonitor: literal[true, false],
//     // 故障检测授权
//     Detection: literal[true, false],
//     // 故障诊断授权
//     Diagnosis: literal[true, false],
//     // 系统管理
//     Manage: literal[true, false],
//     // 系统日志
//     SystemLog: literal[true, false]
//   }
// }
 * @returns {Promise}
 */
export function deleteRole(params) {
  return request({
    url: '/role/delete',
    method: 'delete',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'Application/Json'
    }
  })
}
/**
 * @description 获取当前用户所能授权（等级-1）的角色列表
 * @returns
 */
export function getRoleTypes() {
  return request({
    url: '/role/queryauth',
    method: 'get'
  })
}
/**
 * @description 获取比当前用户最高角色等级-1的用户列表
 * @returns
 */
export function getUserList() {
  return request({
    url: '/user/query',
    method: 'get'
  })
}

/**
 * @description ·添加·对应用户
 * @param {object} params
{
  id: 0,
  name: '张三',
  phone: '13478414545',
  email: '',
  department: '管理部门',
  description: '',
  password: 'nkcs@aiops',
  createTime: timestamp,
  lastEditTime: timestamp,
  ownRoles: ['user']
}
 * @returns {Promise}
 */
export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'Application/Json'
    }
  })
}

/**
 * @description ·修改·对应用户
 * @param {object} params
{
  id: 0,
  name: '张三',
  phone: '13478414545',
  email: '',
  department: '管理部门',
  description: '',
  password: 'nkcs@aiops',
  createTime: timestamp,
  lastEditTime: timestamp,
  ownRoles: ['user']
}
 * @returns {Promise}
 */
export function updateUser(params) {
  return request({
    url: '/user/modify',
    method: 'put',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'Application/Json'
    }
  })
}

/**
 * @description ·删除·对应用户
 * @param {{id:string}} params
 * {
 *  id: 0
 * }
 * @returns {Promise}
 */
export function deleteUser(params) {
  return request({
    url: '/user/delete',
    method: 'delete',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'Application/Json'
    }
  })
}

/**
 * @description 批量·删除·对应用户
 * @param {[Number]} params
 * [
 *  0,
 *  1,
 *  2
 * ]
 * @returns {Promise}
 */
export function deleteBatchUser(params) {
  return request({
    url: '/user/deletebatch',
    method: 'delete',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'Application/Json'
    }
  })
}
