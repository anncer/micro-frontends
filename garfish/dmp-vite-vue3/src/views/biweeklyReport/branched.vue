<template>
  <div class="biweekly-view biweekly-branched ">
    <div class="biweekly-head">
      <div class="biweekly-title">双周报查看</div>
      <div class="biweekly-search">
        <div class="biweekly-s-item" >
          <span class="biweekly-t-btn biweekly-s-l" :class="{ disabled: !isHasQi || (qiIndex === allPeriodical.length - 1) }" @click="handleNext(1)">
            <el-icon>
              <ArrowLeft />
            </el-icon>
            <span>上一期</span>
          </span>
          <el-select v-model="selectedYear" placeholder="Select">
            <el-option v-for="item in yearsArr" :key="item" :label="item" :value="item" />
          </el-select>
          <span>年</span>
          <el-select v-model="selectedMonth" placeholder="Select" @change="handleQiChange">
            <el-option v-for="item in 12" :key="item" :label="item < 10 ? '0' + item : item" :value="item.toString()" />
          </el-select>
          <span>月</span>
          <el-select v-model="selectedQi" placeholder="Select" @change="handleQiChange">
            <el-option v-for="item in 2" :key="item" :label="item === 1 ? '一' : '二'" :value="item.toString()" />
          </el-select>
          <span>期</span>
          <span class="biweekly-t-btn biweekly-s-r" :class="{ disabled: !isHasQi || (qiIndex === 0) }" @click="handleNext(-1)">
            <span>下一期</span>
            <el-icon>
              <ArrowRight />
            </el-icon>
          </span>
        </div>
      </div>
    </div>
     <div class="biweekly-c-title">
      <button class="biweekly-btn" @click="handleMutDown">
        <span class="biweekly-btn-inner">批量下载</span>
      </button>
    </div>
    <div class="biweekly-content biweekly-table-b" v-loading="loading">

      <ce-table :columns="columns" :border="true" :data="list" @selection-change="handleSelectionChange">
        <el-table-column prop="fileName" label="文件名称" align="center" minWidth="220" >
          <template #default="scope">
            <span class="biweekly-link" @click="handleView(scope.row)">{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="填报人" align="center" minWidth="100"></el-table-column>
        <el-table-column prop="uploadTime" label="上传时间" align="center" minWidth="125">
          <template #default="scope">
            <span>{{ scope.row.uploadTime.slice(0, 16) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" minWidth="160">
          <template #default="scope">
            <span v-if="scope.row.fileId" class="biweekly-t-btn" @click="handleView(scope.row)">预览</span>
            <span v-if="scope.row.fileId" class="biweekly-t-btn" @click="handleDownload(scope.row)">下载</span>
            <span class="biweekly-t-btn" @click="runPage(scope.row)">历史查询</span>
          </template>
        </el-table-column>
      </ce-table>
    </div>
    <div class="biweekly-back">
      <span class="biweekly-back-btn" @click="handleBack">返回</span>
    </div>
  </div>
</template>
<!-- 双周报领导分管部门某期上传情况详情 -->
<script lang="ts" setup>
import { ref } from "vue";
import { downLoadFileMut } from '@/api/global'
import { getYearTimes, getPeriodsReport } from '@/api/biweekly'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { makeDownFile, downFile, viewFile } from './useHooks'

defineOptions({
  name: 'biweeklyView',
})

const router = useRouter();

const params: any = router.currentRoute.value.query;

let selectedPeriods = params.periodsId
const userId = params.uid
const selectedYear = ref(params.year)
const selectedMonth = ref(params.month)
const selectedQi = ref(params.qi)
const loading = ref<boolean>(false)

const isHasQi = ref(false)
const qiIndex = ref(0)

const yearsArr = ref<any>([])

let list = ref<any>([])

const allPeriodical = ref<any>([])

// 获取所有期数，并取得所有的年度
async function getPeriodical() {
  const res = await getYearTimes(0)
  allPeriodical.value = res.data
  const arr = <any[]>[]
  res.data.forEach((it:any) => {
    if (!arr.includes(it.annual)) {
      arr.push(it.annual)
    }
  })
  yearsArr.value = arr
  setQiIndex()
}

async function getLeaderFs(leader: string, periods: string) {
  loading.value = true
  const res = await getPeriodsReport(leader, periods)
  loading.value = false
  list.value = res.data
}

getPeriodical()

if (selectedPeriods && userId){
  getLeaderFs(userId, selectedPeriods)
}

const setCurrQi = (curr:any) => {
  selectedYear.value = curr.annual
  selectedMonth.value = curr.month.toString()
  selectedQi.value = curr.biweekly.toString()
}

const handleNext = (step: number) => {
  if (isHasQi.value) {
    if (step > 0) {
      // run + 1
      if (qiIndex.value < allPeriodical.value.length - 1) {
        qiIndex.value += 1
        const curr = allPeriodical.value[qiIndex.value]
        curr && (selectedPeriods = curr.id)
        setCurrQi(curr)
        getLeaderFs(userId, selectedPeriods)
      }
    } else {
      if (qiIndex.value !== 0) {
        // run -1
        qiIndex.value -= 1
        const curr = allPeriodical.value[qiIndex.value]
        selectedPeriods = curr.id
        setCurrQi(curr)
        getLeaderFs(userId, selectedPeriods)
      }
    }
  }
}

const runPage = (row:any) => {
  router.push({
    path: '/biweeklyHistory',
    query: {
      dp: row.deptId,
      dn: row.deptName
    }
  });
}
const handleBack = () => {
  router.go(-1)
}
let selectionFiles = <any[]>[]

const handleSelectionChange = (selection: any) => {
  const fs = selection.map((f: any) => f.fileId)
  selectionFiles = fs.filter((fe: any) => fe)
}

const handleMutDown = () => {
  if(selectionFiles.length) {
    const arr = selectionFiles.map(id => { return { id } })
    const fileName = selectedYear.value && selectedMonth.value && selectedQi.value
        ? `双周报-${selectedYear.value}年${selectedMonth.value}月${selectedQi.value}期.zip` : '双周报.zip'
    downLoadFileMut(arr).then((res: any) => {
      makeDownFile(res, fileName)
    })
  } else {
    ElMessage({
      message: '请选择文件~',
      type: 'info',
    })
  }
}

const setQiIndex = () => {
  allPeriodical.value.forEach((it: any, index: number) => {
    if (it.id === selectedPeriods) {
      qiIndex.value = index
      isHasQi.value = true
      selectedPeriods = it.id
    }
  })
}

const handleQiChange = () => {
  selectedPeriods = null
  allPeriodical.value.forEach((it:any, index:number) => {
    const { annual, month, biweekly } = it
    if (annual.toString() === selectedYear.value && month.toString() === selectedMonth.value && biweekly.toString() === selectedQi.value) {
      qiIndex.value = index
      selectedPeriods = it.id
    }
  })
  if (selectedPeriods) {
    getLeaderFs(userId, selectedPeriods)
  } else {
    list.value = []
  }
}

const handleDownload = (file: any) => {
  downFile(file.filePath)
}

const handleView = (file: any) => {
  viewFile(file.fileId)
}

// getPeriodical(currentYear)

const columns: any = [
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
