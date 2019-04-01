<template>
    <div>
        <h1>截图上传</h1>

        <!-- 上传图片 -->

        <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-change="setImage">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <div class="screen-shot-style">
            <el-dialog
            title="截图"
            :visible.sync="dialogVisible"
            :before-close="handleClose">


            <div style="width: 400px; height:300px; border: 1px solid gray; display: inline-block; margin-top: 20px;">
                <vue-cropper
                    ref='cropper'
                    :guides="true"
                    :view-mode="2"
                    drag-mode="crop"
                    :auto-crop-area="0.5"
                    :min-container-width="250"
                    :min-container-height="180"
                    :background="true"
                    :rotatable="true"
                    :src="imgSrc"
                    alt="Source Image"
                    :img-style="{ 'width': '400px', 'height': '300px' }">
                </vue-cropper>
            </div>
            <div style="line-height:100px;align:center; margin-top: 220px; margin-right: 40px; height: 100px; width: 100px; border: 1px dashed #d9d9d9; float: right; border-radius:6px;">
            <img v-if="cropImg" :src="cropImg" style="border-radius:6px; width: 100px; height: 100px; " />
            <span v-else >预览</span>
            </div>
            <br/>
            <br />

            <el-button size="mini" type="primary" plain @click="cropImage" v-if="imgSrc != ''" style="margin-right: 40px;">剪切</el-button>
            <el-button size="mini" type="primary" plain @click="rotate" v-if="imgSrc != ''">旋转</el-button>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        
    </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
export default {
    components: {
      VueCropper,
    },

    data() {
        return {
            imgSrc: '',
            cropImg: '',
            imageUrl: '',
            dialogVisible: false,
        };
    },

    methods: {

        handleClose(done) {
            this.dialogVisible = false;
            // this.$confirm('确认关闭？')
            // .then(_ => {
            //     done();
            // })
            // .catch(_ => {});
        },

        setImage(files) {
            let THIS = this;
            const file = files.raw;
            // if (!file.type.includes('image/')) {
            // alert('Please select an image file');
            // return;
            // }
            this.dialogVisible=true;
            this.cropImg = '';
            if (typeof FileReader === 'function') {
            const reader = new FileReader();
            reader.onload = (event) => {
                debugger
                this.imgSrc = event.target.result;
                // rebuild cropperjs with the updated source
                this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
            } else {
            alert('Sorry, FileReader API not supported');
            }
        },

        cropImage() {
            // get image data for post processing, e.g. upload or setting image src
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        rotate() {
            // guess what this does :)
            this.$refs.cropper.rotate(90);
        },


        submit() {
            this.dialogVisible = false;
            // get image data for post processing, e.g. upload or setting image src
            this.imageUrl = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },

    }
}
</script>

<style lang="stylus">
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .screen-shot-style {
      >>>.el-dialog__title {
          float: left;
      }
  }
</style>

