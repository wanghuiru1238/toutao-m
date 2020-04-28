<template>
  <div class="article-container">
      <el-card class="top-card">
        <div slot="header" class="clearfix">
                <!-- 面包屑导航开始部分 -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- 面包屑导航结束 -->
        </div>
        <!-- 表单数据开始部分 -->
        <el-form ref="form" :model="form" label-width="50px" size="small">
            <el-form-item label="状态:">
                <el-radio-group v-model="form.resource">
                <el-radio label="全部"></el-radio>
                <el-radio label="草稿"></el-radio>
                <el-radio label="待审核"></el-radio>
                <el-radio label="审核失败"></el-radio>
                <el-radio label="审核通过"></el-radio>
                <el-radio label="已删除"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select v-model="form.region" placeholder="请选择频道">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker
                    v-model="form.data1"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">筛选</el-button>
            </el-form-item>
            </el-form>
        <!-- 表单数据结束 -->
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            根据筛选条件共查询到 46148 条结果：
        </div>
         <!-- 数据列表开始部分 -->
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            size="small"
            class="table-list">
            <el-table-column
            prop="date"
            label="日期"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
       </el-table>
      <!-- 数据列表结束 -->
      <!-- 列表分页开始部分 -->
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        background>
      </el-pagination>
      <!-- 列表分页结束 -->
      </el-card>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      article: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    loadArticle () {
      getArticle().then(res => {
        // console.log(res)
        this.article = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
.top-card {
    margin-bottom: 30px;
}
.table-list {
    margin-bottom: 20px;
}
</style>
