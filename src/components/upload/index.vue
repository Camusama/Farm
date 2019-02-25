<template>
  <div>
    <el-upload ref="upload"
               :action="postUrl"
               :file-list="fileList"
               list-type="picture-card"
               :on-success='onSuccess'
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['img'],
  data () {
    return {
      postUrl: process.env.CDN + '/uploadimg',
      dialogImageUrl: this.img,
      dialogVisible: false,
      imgurl: '',
      fileList: []
    };
  },
  methods: {
    handleRemove (file, fileList) {
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSuccess (res, file, filelist) {
      if (filelist.length > 1) {
        this.fileList = [filelist[filelist.length - 1]]
      }
      this.imgurl = res.data
      this.$emit('addImgUrl', this.imgurl)
    }
  },
  watch: {
    img (newimg) {
      if (newimg === '') {
        this.$refs.upload.clearFiles()
      }
    }
  }
}
</script>
