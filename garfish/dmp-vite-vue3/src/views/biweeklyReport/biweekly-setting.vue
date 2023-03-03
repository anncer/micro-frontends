<template>
  <ce-card class="biweekly-content " :body-style="{paddingTop: '0', height: '100%'}" :shadow="false">
    <el-tabs v-model="active" class="biweekly-tabs">
      <el-tab-pane label="权限查看" name="view" class="biweekly-tab">
        <ce-table :columns="viewColumns" :data="viewList" stripe></ce-table>
      </el-tab-pane>
      <el-tab-pane label="权限配置" name="config" class="biweekly-set">
        <div style="margin-bottom: 20px;text-align:right;padding-right: 20px;">
          <ce-button @click="handleAdd">添加人员</ce-button>
        </div>
        <ce-table :columns="settingColumns" :data="settingList" stripe>
          <el-table-column  align="center" label="操作" width="140">
            <template #default="scope">
                <span class="biweekly-t-btn" @click="handleOpera(scope.row)">编辑</span>
                <span class="biweekly-t-btn" style="color:#f56c6c" @click="handleDelete(scope.row)">删除</span>
            </template>
          </el-table-column>
        </ce-table>
        <el-dialog v-model="userDialogShow" top="20vh" width="720px" :title="dialogTitle" :before-close="handleCancle">
          <div style="padding: 20px;padding-bottom: 0;">
            <ce-item label="主管领导：" v-if="editUserName" label-width="100px" style="width: 100%;">
              <el-input v-model="editUserName" disabled></el-input>
            </ce-item>
            <ce-item label="主管领导：" label-width="100px" v-else style="width: 100%;">
              <el-select v-model="selectionUser" placeholder="请选择或输入姓名搜索" style="width: 100%;" :loading="loading" clearable filterable >
                <el-option v-for="item in allUserList" :key="item.userId" :label="item.userName" :value="item.userId" />
              </el-select>
            </ce-item>
            <ce-item label="分管部门：" label-width="100px" style="margin-top: 20px;width: 100%;">
                <el-select v-model="selectionDept" placeholder="请选择（可多选）" clearable filterable multiple style="width: 100%;">
                  <el-option v-for="item in allDeptList" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
                </el-select>
            </ce-item>
            <div style="text-align: center;margin-top:40px;padding-bottom: 10px;">
              <ce-button @click="handleConfirm">确定</ce-button>
              <ce-button plain style="margin-left: 20px;" @click="handleCancle"> 取消</ce-button>
            </div>
           <div>
           </div>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </ce-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPermissionDept, getPermissionSet, getPermissionView, getPermissionUser, setPermissionEdit, setPermissionDelete } from '@/api/biweekly'
import { viewColumns, settingColumns } from './config'
import { ElMessage, ElMessageBox } from 'element-plus'

const active = ref('view')

const dialogTitle = ref('添加分管领导')

const userDialogShow = ref(false)

const selectionUser = ref()

const selectionDept = ref()

const allUserList:any = ref([])
// const optionsUserList:any = ref([])
const allDeptList:any = ref([])

const editUserName = ref('')
const editUserId = ref('')

const handleCancle = () => {
  userDialogShow.value = false
  editUserId.value = ''
  editUserName.value = ''
  selectionUser.value = ''
  selectionDept.value = ''
}

const handleAdd = () => {
  dialogTitle.value = '添加分管领导'
  userDialogShow.value = true
}

const handleConfirm = () => {
  if ((selectionUser.value || editUserName) && selectionDept.value.length) {
    let _userId = ""
    let _userName = ""
    if (editUserName.value && editUserId.value) {
      _userId = editUserId.value
      _userName = editUserName.value
    } else if (selectionUser.value){
      _userId = selectionUser.value
      const selectedUserArr = allUserList.value.filter((it: any) => it.userId === _userId)
      _userName = selectedUserArr.length ? selectedUserArr[0].userName : ""
    }
    const res: any = []
    selectionDept.value.forEach((id: any) => {
      const obj = { userId: _userId, userName: _userName, deptId: "", deptName: "" }
      allDeptList.value.forEach((org: any) => {
        if (org.deptId === id) {
          obj.deptId = id
          obj.deptName = org.deptName
          res.push(obj)
        }
      })
    });
    if (res.length && _userId && _userName) {
      doEditPermission(res)
    }

  } else {
    ElMessage({
      message: '请选择人员或组织机构',
      type: 'error',
    })
  }
}

const viewList:any = ref([])

function makeNameStr(type: string, name: string) {
  return type ? type + '，' + name : name
}

function getViewList (){
  getPermissionView()
    .then(res => {
      const data = res.data
      if (data && data.length) {
        const _d = data.map((it: any) => {
          const { deptPersons } = it
          let yuanzhang = ""
          let zhuli = ""
          let shouxi = ""
          if (deptPersons && deptPersons.length) {
            deptPersons.forEach((per:any) => {
              if (per.userRoleCode === "ROLE_YUANLINGDAO") {
                yuanzhang = makeNameStr(yuanzhang,  per.userName)
              } else if (per.userRoleCode === "ROLE_YUANZHANGZHULI") {
                zhuli = makeNameStr(zhuli,  per.userName)
              } else if (per.userRoleCode === "ROLE_YIJIZHUANJIA") {
                shouxi = makeNameStr(shouxi,  per.userName)
              }
            });
          }
          Object.assign(it, { yuanzhang, zhuli, shouxi })
          return it
        })
        viewList.value = _d
      } else {
        viewList.value = []
      }
    })
    .catch( _ => {
      viewList.value = []
    })
}

const settingList:any = ref([])

function getSetList() {
  getPermissionSet()
    .then(res => {
      const data = res.data
      if (data && data.length) {
        const _d = data.map((it: any) => {
          const { orgList } = it
          const deptNames:any[] = []
          if (orgList && orgList.length) {
            orgList.forEach((org: any) => {
              deptNames.push(org.deptName)
            });
            it.deptNames = deptNames.join('，')
          }
          return it
        })
        settingList.value = _d
      } else {
        settingList.value = []
      }
    })
    .catch(_ => {
      settingList.value = []
    })
}

function doEditPermission (data:any) {
  setPermissionEdit(data)
    .then(res => {
      if (res.code === 200) {
         ElMessage({
          message: '操作成功',
          type: 'success'
         })
        getSetList()
        getViewList()
        handleCancle()
      } else {
        ElMessage({
          message: '操作失败',
          type: 'error'
        })
      }
    })
}

function getUsers () {
  getPermissionUser()
    .then((res:any) => {
      if (res.code === 200) {
        allUserList.value = res.data
      } else {
        allUserList.value = []
        ElMessage({
          message: '获取人员信息失败！',
          type: 'error'
        })
      }
    })
}

const loading = ref(false)

// function remoteMethod (value: string) {
//   if (value) {
//     loading.value = true
//     getAllUsers({name: value})
//       .then(res => {
//         loading.value = false
//         const newarr = res.data.filter((user:any) => {
//           return allUserList.value.some((u:any) => u.id === user.id)
//         })
//         allUserList.value.forEach((user:any) => {
//           res.data.filrer
//         });
//         allUserList.value = allUserList.value.concat(newarr)
//         optionsUserList.value = res.data
//       })
//       .catch(_ => {
//         loading.value = false
//       })
//   } else {
//     optionsUserList.value = allUserList.value
//   }
// }

function getDepts () {
  getPermissionDept()
    .then((res: any) => {
      if (res.data) {
        allDeptList.value = res.data
      } else {
        allDeptList.value = []
        ElMessage({
          message: '获取组织机构信息失败！',
          type: 'error'
        })
      }
    })
}

function doRemovePermission(id: string) {
  setPermissionDelete(id)
    .then(res => {
      if (res.code === 200) {
         ElMessage({
          message: '删除成功！',
          type: 'success',
        })
        getSetList()
        getViewList()
      } else {
         ElMessage({
          message: '删除失败！',
          type: 'error',
        })
      }
    })
    .catch(_ => {
      ElMessage({
        message: '删除失败！',
        type: 'error',
      })
    })
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    '删除后将不能恢复，确定删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      confirmButtonClass: 'btnFalse'
    }
  ).then(_ => {
    doRemovePermission(row.userId)
  })
}

const handleOpera = (row: any) => {
  const { userName, userId } = row
  editUserId.value = userId
  editUserName.value = userName
  selectionDept.value = row.orgList.map((it:any) => it.deptId)
  dialogTitle.value = '编辑分管单位'
  userDialogShow.value = true
}

getUsers()
getDepts()
getViewList()
getSetList()


</script>

<style scoped lang="scss">
@import "./index.scss";
@import '@/styles/mixin.scss';
.biweekly-content{
  margin-top: 0;
  height: 100%;
}

.biweekly-tabs {
  display: flex;
  flex-direction:column;
  height: 100%;
}

.biweekly-tabs :deep(.el-tabs__content){
    flex: 1;
    overflow: hidden;
}
.biweekly-tab{
  height: 100%;
  // display: flex;
  // flex-direction: column;
  overflow-y: scroll;
  @include scrollBar();
}
.biweekly-set{
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .ce-table{
    flex: 1;
    overflow-y: scroll;
  }
}
</style>
