<template>
  <div class="biweekly-view">
    <div class="biweekly-head">
      <div class="biweekly-title">双周报查看</div>
      <div class="biweekly-search">
        <div class="biweekly-s-item">
          <el-select v-model="selectedYear" placeholder="Select">
            <el-option v-for="item in yearsArr" :key="item" :label="item" :value="item" />
          </el-select>
          <span>年</span>
        </div>
      </div>
    </div>
    <div class="biweekly-content " v-loading="loading">
      <ce-table :columns="columns" :border="true" :data="list">
        <el-table-column prop="noSubmit" label="未提交单位（个）" align="center">
          <template #default="scope">
            <span class="biweekly-t-btn" :class="{ disabled: !scope.row.noSubmit }" @click="handleDetail(scope.row)">{{ scope.row.noSubmit }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="submitStopTime" label="提交截止时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template #default="scope">
            <span class="biweekly-t-btn" @click="runPage(scope.row)">详情</span>
          </template>
        </el-table-column>
      </ce-table>
    </div>
  </div>
  <el-dialog v-model="dialogTableVisible" top="20vh" width="300px" custom-class="ce-selector_dialog" title="未提交双周报单位">
      <div class="unable-box">
        <div class="unable-box-item">
          <span class="unable-i-h">序号</span>
          <span class="unable-i-c">单位名称</span>
        </div>
        <div v-for="(it, idx) in unAbleDepts" :key="it" class="unable-box-item">
          <span class="unable-i-h">{{ idx + 1 }}</span>
          <span class="unable-i-c">{{ it }}</span>
        </div>
      </div>
  </el-dialog>
</template>
<!-- 双周报领导分管部门上传情况汇总 -->
<script lang="ts" setup>
import { nextTick, ref } from "vue";
import { getServiceTime, getUserInfo, getUserDetail } from '@/api/global'
import { getYearTimes, getLeaderView } from '@/api/biweekly'
// import { TableColumns } from 'composite-ware/types/components/table/src/default'
import { useRouter } from 'vue-router';
const router = useRouter();

defineOptions({
  name: 'biweeklyView',
})

const dialogTableVisible = ref(false)

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

// 获取服务器时间并出示话
async function getTime(cb: Function) {

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

async function getPeriodical(times: string | number) {
  const res = await getYearTimes(times)
  yearTimes.value = res.data
}

async function getLeaderFs(dept: string, year: string | number) {
  const res = await getLeaderView(dept, year)

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
          getLeaderFs(userId, selectedYear.value)
        })
    })
}

const unAbleDepts = ref(<any[]>[])

const handleDetail = (row:any) => {
  if (row.noSubmit) {
    unAbleDepts.value = row.maxList.filter((f: any) => !f.fileId).map((f: any) => f.deptName)
    nextTick(() => {
      dialogTableVisible.value = true
    })
  }
}

const runPage = (row:any) => {
  router.push({
    path: '/biweeklyBranched',
    query: {
      periodsId: row.periodsId,
      uid: userId,
      year: row.annual,
      month: row.month,
      qi: row.biweekly
    }
  });
}
getTime(() => {
  getPeriodical(currentYear)
  getUserMsg()
})


const columns: any = [
  {
    code: '',
    label: "序号",
    type: "index",
    align: 'center',
    width: '60'
  },
  {
    label: "期数",
    code: 'periodsName',
    align: 'center',
  },
  {
    label: "应提交单位（个）",
    code: 'shouldSubmit',
    align: 'center',
  },
  // {
  //   label: "未提交单位（个）",
  //   code: 'noSubmit',
  //   align: 'center',
  // },
  // {
  //   label: "提交截止时间",
  //   code: 'submitStopTime',
  //   align: 'center',
  // },
]

</script>


<style scoped lang="scss">
@import "./index.scss";
</style>
