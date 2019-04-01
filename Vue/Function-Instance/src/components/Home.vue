<template>
  <div class="home">
    <h1>Vue 项目功能实例</h1>

    <el-table :data="tableData" border style="width: 80%; margin-left: 10%;" >
    <el-table-column prop="function" label="功能" min-width="20%" align="center">
    </el-table-column>
    <el-table-column prop="description" label="描述" min-width="65%" align="center">
    </el-table-column>
    <el-table-column prop="link" label="跳转" min-width="15%" align="center">
      <template slot-scope="scope">
        <el-button type='primary' @click="gotoPage(scope.row)">截图上传</el-button>
      </template>
    </el-table-column>
  </el-table>
    
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      tableData: [{
          function: '截图上传',
          description: '截图上传，在上传图片前可先对图片进行剪切，再上传(该功能目前存在兼容性，IE 只支持 JPG 格式)。',
          link: '/ScreenShotUpload'
        }, 
        {
          function: '截图上传',
          description: '截图上传，在上传图片前可先对图片进行剪切，再上传(IE 支持 JPG、PNG 格式)。',
          link: '/UploadImgCompatible'
        },
        ]
    };
  },

  methods: {
    gotoPage(row)
    {
      console.log(row);
      this.$router.push({path:row.link});
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
