<template>
 <div class="biweekly-head">
  <div class="biweekly-title">
    <span>双周报上传</span>
    <button class="biweekly-btn biweekly-btn-dark fr" style="marginTop: -10px;marginRight:20px;">
      <span class="biweekly-btn-inner" @click="downTemplate">模板下载</span>
    </button>
  </div>
  <div class="biweekly-search">
    <div class="biweekly-s-item">
      <el-select v-model="selectedYear" placeholder="Select" @change="handleChangeYear">
        <el-option v-for="item in yearsArr" :key="item" :label="item" :value="item" />
      </el-select>
      <span>年</span>
    </div>
  </div>
 </div>
 <div class="biweekly-content biweekly-table-b" v-loading="loading" >
  <div class="biweekly-c-title">
    <button class="biweekly-btn" @click="handleMutDown">
      <span class="biweekly-btn-inner">批量下载</span>
    </button>
  </div>
  <ce-table :columns="columns" :border="true" :data="list" @selection-change="handleSelectionChange">
    <el-table-column prop="fileName" label="文件名称"  align="center" minWidth="220">
      <template #default="scope">
        <span class="biweekly-link" @click="handleViewFile(scope.row)">{{ scope.row.fileName }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="createName" label="填报人" align="center" minWidth="100"></el-table-column>
    <el-table-column prop="submitStopTime" label="提交截止时间" align="center" minWidth="150">
      <template #default="scope">
        <span v-if="Number(scope.row.status) === 1" :style="{color: '#f74b4b'}">{{  scope.row.submitStopTime.slice(0, 16) }}</span>
        <span v-else >{{ scope.row.submitStopTime.slice(0, 16) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="160">
      <template #default="scope">
        <div class="biweekly-t-btns">
          <el-upload
            ref="fileUploadRefs"
            class="biweekly-t-btn"
            v-if="scope.row.status === '1'"
            accept=".doc,.docx,.ppt,.pptx,.pps,.xls,.xlsx,.pdf"
            v-model:file-list="fileList"
            :action="actions"
            :data="uploadParam"
            :headers="header"
            :auto-upload="false"
            :on-change="fileChange"
            :show-file-list="false"
            :on-error="uploadReportError"
            :before-upload="uploadReportLoading"
            :on-success="uploadReportSuccess"
          >
            <span @click="handleUpload(scope.row)">{{ scope.row.fileId ? '更新': '上传' }}</span>
          </el-upload>
          <span v-if="scope.row.status === '0' && scope.row.fileId" class="biweekly-t-btn disabled">更新</span>
          <span v-if="scope.row.fileId" class="biweekly-t-btn" @click="handleViewFile(scope.row)">预览</span>
          <span v-if="scope.row.fileId" class="biweekly-t-btn" @click="handleDownload(scope.row)">下载</span>
        </div>
      </template>
    </el-table-column>
  </ce-table>
 </div>
</template>
<!-- 双周报 单位上传页面 -->
<!-- 此功能只能同时有一个上传或更新开启 -->
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getServiceTime, getUserInfo, getUserDetail, GlobalApi, downLoadFileMut, downLoadAsStream } from '@/api/global'
import { ElMessage } from 'element-plus'
import { getYearTimes, getPermissionDept, getYearReport, setReportMessage } from '@/api/biweekly'
import cookie from "@/utils/cache";
import type { UploadProps } from 'element-plus'
import { ElLoading, ElMessageBox } from 'element-plus'
import { makeDownFile, downFile, viewFile, getDeptSortNum } from './useHooks'

defineOptions({
  name: 'biweeklyReport',
})

const actions = GlobalApi.uploadFile
const uploadParam: any = ref({
  appName: "cmp-application"
})
const header: any = ref({
  'ESP-TOKEN': cookie.get("ESP-TOKEN")
})

// 上传或更新文件
let periods = ''
let periodsId = ''

const loading = ref<boolean>(false)

const startYear = 2023
const selectedYear = ref<string>('')
const yearsArr = ref<any>([])

let currentTime = new Date()
let currentYear = currentTime.getFullYear()

let userId = ''
let userName = ''
let deptId = ''
let deptName = ''
let deptLvCode = ''

let fileName = ''
const fileUploadRefs = ref()

// 获取服务器时间并出示话
async function getTime (cb:Function) {

  loading.value = true

  const res = await getServiceTime()

  if (res.data) {
    currentTime = new Date(res.data)
    currentYear = currentTime.getFullYear()
  }

  selectedYear.value = currentYear.toString()

  const num = currentYear - startYear

  for (let index = 0; index <= num; index++) {
    yearsArr.value.push((startYear + index).toString())
  }
  cb && cb()
}

let list = ref<any>([])

let yearTimes = ref([])

async function getPeriodical(times: string| number) {
  const res = await getYearTimes(times)
  yearTimes.value = res.data
}

async function getDeptReports(dept: string, year: string | number) {
  const res = await getYearReport(dept, year)

  loading.value = false
  list.value = res.data
}

async function getUserMsg() {
  getUserInfo()
    .then(res => {
      const id = res.data.id
      getUserDetail(id)
        .then(rrr => {
          deptId = rrr.data.deptId
          deptName = rrr.data.deptName
          userId = rrr.data.id
          userName = rrr.data.name
          getDeptReports(deptId, selectedYear.value)
        })
    })
}


const allDeptList = ref([])

function getDepts() {
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

const handleViewFile = (file:any) => {
  viewFile(file.fileId)
}

const handleDownload = (file: any) => {
  downFile(file.filePath)
}

const handleChangeYear = () => {
  getDeptReports(deptId, selectedYear.value)
}

let selectionFiles = <any[]>[]

const handleSelectionChange = (selection:any) => {
  const fs = selection.map((f: any) => f.fileId)
  selectionFiles = fs.filter((fe:any) => fe)
}

const downTemplate = () => {
  downLoadAsStream("545178146270347264")
    .then(res => {
      makeDownFile(res, '双周报模板.docx')
    })
}

const handleMutDown = () => {
  if (selectionFiles.length){
    const arr = selectionFiles.map(id => {return {id}})
    downLoadFileMut(arr).then((res:any) => {
      const fileName = deptName || selectedYear.value ? `双周报-${selectedYear.value}年-${deptName}.zip` : '双周报.zip'
      makeDownFile(res, fileName)
    })
  } else {
    ElMessage({
      message: '请选择文件~',
      type: 'info',
    })
  }
}

let rowId = ''

const handleUpload = (row: any) => {
  periods = row.periods
  periodsId = row.periodsId
  deptLvCode = row.levelCode
  deptName = row.deptName
  deptId = row.deptId
  rowId = row.id
}

const fileList = ref()

const fileChange: UploadProps['onChange'] = (res: any) => {
  const n = res.name.split('.')
  fileName = res.name
  const codestr = getDeptSortNum(deptId, allDeptList.value)
  console.log(codestr, 'codestr')
  const name = `${codestr}-${deptName}-${periods}.${n[n.length - 1]}`.replaceAll(' ', '')
  const f = <any>new File([res.raw], name, {type: res.raw.type})
  f.uid = res.uid
  res.raw = f
  fileUploadRefs.value.submit()
}

const uploadReportError: UploadProps['onError'] = (response: any) => {
  fileUploadRefs.value.clearFiles()
  fileList.value = []
  uploadLoading.value.close()

  ElMessageBox.alert('上传失败，请重试！', '提示', {
    confirmButtonText: '确定',
    callback: () => {
    }
  })
}

const uploadLoading: any = ref()

const uploadReportLoading: UploadProps['beforeUpload'] = (response: any) => {
  uploadLoading.value = ElLoading.service({
    lock: true,
    text: '正在上传中，请耐心等待',
  })
}
const uploadReportSuccess: UploadProps['onSuccess'] = (response: any) => {
  fileUploadRefs.value.clearFiles()
  fileList.value = []
  uploadLoading.value.close()
  if (response.code === 200) {
    const filePath = response.data.filePath
    const fileId = response.data.id
    const data = <any>{
      filePath,
      fileId,
      fileName,
      createId: userId,
      createName: userName,
      deptId,
      levelCode: deptLvCode,
      // deptCode,
      deptName,
      // 期名
      periods,
      // 期ID
      periodsId,
      // 年度
      annual: selectedYear.value
    }
    if (rowId) {
      data.id = rowId
    }
    if (userId && userName && deptId && deptName && periods && periodsId) {
      setReportMessage(data)
        .then(res => {
          ElMessage({
            showClose: true,
            message: '上传成功',
            type: 'success',
          })
          getDeptReports(deptId, selectedYear.value)
        })
    }
  }
}

onMounted(() => {
  getDepts()
  getTime(() => {
    getPeriodical(currentYear)
    getUserMsg()
  })
})

const columns:any = [
  {
    label: "选择",
    code: '',
    type: "selection",
    align: 'right',
    width: '40'
  },
  {
    code: '',
    label: "全选",
    type: "index",
    align: 'left',
    width: '60'
  },
  {
    label: "处所单位",
    code: 'deptName',
    align: 'center',
    minWidth: '160'
  },
  {
    label: "期数",
    code: 'periods',
    align: 'center',
    minWidth: '150'
  }
]

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
