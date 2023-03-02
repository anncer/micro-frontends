export const viewFile = (fileId:any) => {
  window.open('/api/fs/wps/view?fileId=' + fileId)
}

export const downFile = (filePath: any) => {
  window.open('/api/fs/file/download/path?filePath=' + filePath)
}

export const makeDownFile = (file:any, name:any) => {
  const blob = new Blob([file]) // 构造一个blob对象来处理数据
  // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
  // IE10以上支持blob但是依然不支持download
  if ('download' in document.createElement('a')) {
    // 支持a标签download的浏览器
    const link = document.createElement('a') // 创建a标签
    link.download = name // a标签添加属性
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click() // 执行下载
    URL.revokeObjectURL(link.href) // 释放url
    document.body.removeChild(link) // 释放标签
  } else {
    const nav = (window.navigator as any);
    // 其他浏览器
    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blob, name);
    }
  }
}

export const getDeptSortNum = (id:string, list: any[]) => {
  const resarr = list.filter((dept:any) => id === dept.deptId)
  return resarr.length ? resarr[0].num : ''
}
