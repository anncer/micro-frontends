// 双周报接口
import Api from "@/service";
import type { IBaseRequest } from '../global/types.d';

enum BiweeklyApi {
  times = "api/share/file/weekly/newspaper/weekly/",
  report = 'api/share/file/biweekly/',
  deptPeriods = 'api/share/file/biweekly/leader/',
  leaderView = 'api/share/file/biweekly/annual/',
  upload = 'api/share/file/weekly/newspaper/upload',  //人员对应所
  permissionView = 'api/share/file/biweekly/dept/user/person', //所对应人员
  permissionSet = 'api/share/file/biweekly/dept/user',
  permissionEdit = 'api/share/file/biweekly/dept/user/person/insert',
  permissionDelete = 'api/share/file/biweekly/dept/user/',
  roleUser = 'api/share/file/biweekly/dept/user/role',
  roleDept = 'api/share/file/biweekly/dept/user/selector',
}

// 获取年度期数
export const getYearTimes = (time: string|number) => {
  return Api.get<IBaseRequest<any>>({
    url: `${BiweeklyApi.times}${time}`,
  });
};

// 获取单位年度上传的周报  f2
export const getYearReport = (deptId: string, year: string|number) => {
  return Api.get<IBaseRequest<any>>({
    url: `${BiweeklyApi.report}${deptId}/${year}`,
  });
};

// f3
export const getPeriodsReport = (leaderId: string, periodsId: string|number) => {
  return Api.get<IBaseRequest<any>>({
    url: `${BiweeklyApi.deptPeriods}${leaderId}/${periodsId}`,
  });
};

// f4
export const getLeaderView = (leaderId: string, year: string|number) => {
  return Api.get<IBaseRequest<any>>({
    url: `${BiweeklyApi.leaderView}${leaderId}/${year}`,
  });
};

// 上传周报
export const setReportMessage = (data: any) => {
  return Api.post<IBaseRequest<any>>({
    url: `${BiweeklyApi.upload}`,
    data
  });
};

export const getPermissionSet = () => {
  return Api.get<IBaseRequest<any>>({
    url: `${BiweeklyApi.permissionSet}`
  });
}

export const getPermissionView = () => {
  return Api.get<IBaseRequest<any>>({
    url: `${BiweeklyApi.permissionView}`
  });
}

export const setPermissionEdit = (data:any) => {
  return Api.post<IBaseRequest<any>>({
    url: `${BiweeklyApi.permissionEdit}`,
    data
  });
}

export const setPermissionDelete = (id: string) => {
  return Api.delete<IBaseRequest<any>>({
    url: `${BiweeklyApi.permissionDelete}${id}`,
  });
}

// 获取可选人员
export const getPermissionUser = () => {
  return Api.get<IBaseRequest<any>>({
    url: `${BiweeklyApi.roleUser}`
  });
}

// 获取可选机构
export const getPermissionDept = () => {
  return Api.get<IBaseRequest<any>>({
    url: `${BiweeklyApi.roleDept}`
  });
}
