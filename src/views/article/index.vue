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
              <!-- 默认lable为文本和选中之后的value值 -->
                <el-radio-group v-model="status">
                <el-radio :label="null">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
                <el-radio :label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select v-model="channelId" placeholder="请选择频道">
                <el-option
                label="全部"
                :value="null"
                >
                </el-option>
                <el-option
                :label="channel.name"
                :value="channel.id"
                v-for="(channel, index) in channels"
                :key="index"
                >
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker
                    v-model="rangeDate"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00']"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="loading" type="primary" @click="loadArticle(1)">筛选</el-button>
            </el-form-item>
            </el-form>
        <!-- 表单数据结束 -->
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            根据筛选条件共查询到 {{ total_count }} 条结果：
        </div>
         <!-- 数据列表开始部分 -->
         <!-- 1.给table组件里的data属性绑定要展示的素组列表数据 注意: 表格组件会自动遍历
         2.设置表格列-
         lable设定列的标题
         prop设定渲染列表项数据字段
         3.表格列若需要展示其他非文本内容(例如:图片 按钮等)需使用自定义表格列模版
         注意: 自定义列模版需要使用template标签包起来-->
        <el-table
            class="article-list"
            :data="article"
            stripe
            style="width: 100%"
            size="small"
            v-loading="loading"
            >
            <el-table-column
            prop="date"
            label="封面">
            <template slot-scope="scope">
              <!-- 用组件设置封面图片  lazy懒加载-->
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.cover.images[0]"
                fit="cover"
                lazy>
                <!-- 加载图片时的占位内容 -->
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                </el-image>
              <!-- <img class="article-cover" v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="">
              <img class="article-cover" v-else src="./noimage.gif" alt=""> -->
            </template>
            </el-table-column>
            <el-table-column
            prop="title"
            label="标题">
            </el-table-column>
            <el-table-column
            label="状态">
            <!-- 如在自定义列模版中获取当前遍历项数据  要在template标签上设置slot-scop="scope" -->
            <template slot-scope="scope">
                <el-tag
                :type="articleStatus[scope.row.status].type">
                {{ articleStatus[scope.row.status].text }}
                </el-tag>
                <!-- <el-tag type: 'info' v-if="scope.row.status === 0">草稿</el-tag>
                <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
                <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>
                <el-tag type="warning" v-else-if="scope.row.status === 3">审核失败</el-tag>
                <el-tag type="danger" v-else-if="scope.row.status === 4">已删除</el-tag> -->
            </template>
        </el-table-column>
        <el-table-column
            prop="pubdate"
            label="发布时间">
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button
                size="small"
                circle
                type="primary"
                icon="el-icon-edit"
                @click="$router.push('/publish?id=' + scope.row.id)"
                ></el-button>
                <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="onDeleteArticle(scope.row.id)"
                ></el-button>
            </template>
        </el-table-column>
       </el-table>
      <!-- 数据列表结束 -->
      <!-- 列表分页开始部分 -->
      <el-pagination
        layout="prev, pager, next"
        :total="total_count"
        background
        :disabled="loading"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :current-page.sync="page"
        >
      </el-pagination>
      <!-- 列表分页结束 -->
      </el-card>
  </div>
</template>

<script>
import { getArticle, getArticleChannels, deleteArticle } from '@/api/article'
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
      article: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      total_count: 0, // 文章总条数
      pageSize: 10, // 每页数据条数
      status: null, // 文章查询状态[0 1 2 3 4],不传默认是全部
      channels: [], // 文章频道列表
      channelId: null, // 查询文章频道
      rangeDate: null, // 查询日期范围
      loading: true, // 表格数据loading加载中
      page: 1 // 当前展示页
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle(1)
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticle (page = 1) {
      // 请求一开始 显示加载中loading
      this.loading = true
      getArticle({
        page: page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 起始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止日期
      }).then(res => {
        // console.log(res)
        this.article = res.data.data.results
        this.total_count = res.data.data.total_count
        // 请求结束 关闭loading加载中
        this.loading = false
      })
    },
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    // onSubmit () {
    //   console.log('submit!')
    // },
    onCurrentChange (page) {
      // console.log(page)
      this.loadArticle(page)
    },
    onDeleteArticle (articleId) {
      this.$confirm('是否确认删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(11)
        deleteArticle(articleId.toString()).then(res => {
          // console.log(res)
          // 删除成功更新当前页文章列表
          this.loadArticle(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
.article-list {
  margin-bottom: 25px;
}
.article-cover {
  width: 100px;
  background-size: cover;
}
</style>
