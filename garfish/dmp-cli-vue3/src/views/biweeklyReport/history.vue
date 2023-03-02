<template>
  <div class="biweekly-view">
    <div class="biweekly-head">
      <div class="biweekly-title">
        <span>双周报查看</span>
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
      <ce-table :columns="columns" :border="true" :data="list"
        @selection-change="handleSelectionChange">
        <el-table-column prop="fileName" label="文件名称" align="center" minWidth="250">
          <template #default="scope">
            <span class="biweekly-link" @click="handleView(scope.row)">{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="填报人" align="center" minWidth="100"></el-table-column>
        <el-table-column prop="submitStopTime" label="提交截止时间" align="center" minWidth="150">
          <template #default="scope">
            <span>{{ scope.row.submitStopTime.slice(0, 16) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template #default="scope">
            <div class="biweekly-t-btns">
              <span v-if="scope.row.fileId" class="biweekly-t-btn" @click="handleView(scope.row)">预览</span>
              <span v-if="scope.row.fileId" class="biweekly-t-btn" @click="handleDownload(scope.row)">下载</span>
            </div>
          </template>
        </el-table-column>
      </ce-table>
    </div>
    <div class="biweekly-back">
      <span class="biweekly-back-btn" @click="handleBack">返回</span>
    </div>
  </div>
</template>
<!-- 双周报 单位上传页面 -->
<script lang="ts" setup>
import { ref } from "vue";
import { getServiceTime, getUserInfo, getUserDetail, GlobalApi, downLoadFileMut } from '@/api/global'
import { getYearTimes, getYearReport, setReportMessage } from '@/api/biweekly'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { makeDownFile, downFile, viewFile } from './useHooks'

defineOptions({
  name: 'biweeklyReport',
})

const router = useRouter();

const params: any = router.currentRoute.value.query;

const deptId = params.dp
const deptName = params.dn

const handleBack = () => {
  router.go(-1)
}

const loading = ref<boolean>(false)

const startYear = 2023
const selectedYear = ref<string>('')
const yearsArr = ref<any>([])

let currentTime = new Date()
let currentYear = currentTime.getFullYear()

// 获取服务器时间并出示话
async function getTime (cb:Function) {

  loading.value = true

  const res = await getServiceTime()

  loading.value = false

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
  loading.value = true
  const res = await getYearReport(dept, year)
  list.value = res.data
  loading.value = false
}

const handleView = (file:any) => {
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

const handleMutDown = () => {
  if (selectionFiles.length) {
    const arr = selectionFiles.map(id => {return {id}})
    // ${selectedYear.value}年-
    const fileName = deptName || selectedYear.value ? `双周报-${deptName}.zip` : '双周报.zip'
    downLoadFileMut(arr).then((res:any) => {
      makeDownFile(res, fileName)
    })
  } else {
    ElMessage({
      message: '请选择文件~',
      type: 'info',
    })
  }
}

getTime(() => {
  getPeriodical(currentYear)
  getDeptReports(deptId, selectedYear.value)
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
    minWidth: '130'
  }
]

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
