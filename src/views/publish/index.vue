<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航开始部分 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航结束 -->
      </div>
      <el-form ref="form" :model="article" label-width="40px">
        <el-form-item label="标题">
            <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-tiptap
          v-model="article.content"
          :extensions="extensions"
          height="300"
          placeholder="请输入文章内容"
          ></el-tiptap>
            <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
        </el-form-item>
        <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
            v-for="(channel, index) in channels"
            :key="index"
            :label="channel.name" :value="channel.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onPublish(false)">{{$route.query.id ? '修改' : '发布'}}</el-button>
            <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
   </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getSpecifyArticle, upArticle } from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  CodeBlock,
  Blockquote,
  TextAlign,
  Preview,
  Fullscreen
} from 'element-tiptap'
// import { upImages } from '@/api/images'
// 移入element-tiptap 样式
import 'element-tiptap/lib/index.css'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      channels: [], // 文章频道
      channel_id: null, // 文章频道id
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 文章类型(-1:自动，0-无图，1-1张，3-3张)
          images: [] // 文章封面图片地址
        }
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }), // 代表最多有5级标题 可改
        new Bold({ bubble: true }), // 加粗
        new Image({}
        ), // 图片
        // 在气泡菜单中渲染菜单按钮
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new TextAlign(), // 对齐方式
        new Blockquote(), // 引用
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new CodeBlock(), // 代码块
        new Fullscreen(), // 全屏
        new Preview() // 预览
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    // 由于发布文章和修改文章用的是统一个组件 所以需要通过请求路径判断一下 当路径中带有请求参数id 就请求展示对应该id的文章内容
    if (this.$route.query.id) {
      this.upDataArticle()
    }
  },
  mounted () {},
  methods: {
    onPublish (draft = false) {
      // 判断 请求路径中带有参数 则执行编辑操作,五参数则执行添加操作
      // 文章id
      const articleId = this.$route.query.id
      if (articleId) {
        // 修改内容
        upArticle(articleId, this.article, draft).then(res => {
          // console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '修改'}成功`,
            type: 'success'
          })
          // 修改成功 跳转到文章管理页面
          this.$router.push('/article')
        })
      } else {
        // 添加发布内容
        addArticle(this.article, draft).then(res => {
          // console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          // 添加成功 跳转到文章管理页面
          this.$router.push('/article')
        })
      }
    },
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    // 加载要修改的文章内容
    upDataArticle () {
      getSpecifyArticle(this.$route.query.id).then(res => {
        // console.log(res)
        // 模版绑定显示
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
