import type { TableColumnProp } from 'composite-ware/packages/components/table'

export const viewColumns: TableColumnProp[] = [
  {
    label: "序号",
    type: "index",
    align: 'center',
    width: '60px',
  },
  {
    label: '单位',
    code: 'deptName',
    align: 'center'
  },
  {
    label: '分管院长',
    code: 'yuanzhang',
    align: 'center'
  },
  {
    label: '院首席专家',
    code: 'shouxi',
    align: 'center'
  },
  {
    label: '院长助理',
    code: 'zhuli',
    align: 'center'
  }
]

export const settingColumns:TableColumnProp[] = [
  {
    label: "序号",
    type: "index",
    width: '60px',
    align: 'center',
  },
  {
    label: '姓名',
    code: 'userName',
    align: 'center',
    width: '120px'
  },
  {
    label: '角色',
    code: 'userRoleName',
    align: 'center',
    width: '160px'
  },
  {
    label: '分管单位',
    code: 'deptNames',
    align: 'left',
    renderSlot: () => {
      return `<p style="text-align: center">分管单位</p>`
    }
  }
]
