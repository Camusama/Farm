<template>
  <div class="app-container">
    <el-button size="large"
               icon="el-icon-circle-plus-outline"
               style="margin-bottom:18px;"
               @click="handleAdd()">新增</el-button>
    <el-dialog :visible.sync="AddVisible"
               title="新增农药">
      <el-form :model="addForm">
        <el-form-item label="类别"
                      width="40%">
          <el-input v-model="addForm.class"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="农药"
                      width="40%">
          <el-input v-model="addForm.name"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="基本介绍"
                      width="40%">
          <el-input v-model="addForm.summary"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="注意事项"
                      width="40%">
          <el-input v-model="addForm.warn"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="使用方法"
                      width="40%">
          <el-input v-model="addForm.usage"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="选择图片"
                      width="40%">
          <br>
          <upload :img="this.addForm.img"
                  @addImgUrl='addImgUrl'></upload>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="AddVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row>
      <el-table-column align="center"
                       label="编号"
                       width="95">
        <template slot-scope="scope">
          {{scope.$index+(page - 1) * limit + 1}}
        </template>
      </el-table-column>
      <el-table-column label="类别"
                       width="100">
        <template slot-scope="scope">
          {{ scope.row.class }}
        </template>
      </el-table-column>
      <el-table-column label="农药"
                       width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="基本介绍"
                       :show-overflow-tooltip="true"
                       prop="summary">
        <template slot-scope="scope">
          {{ scope.row.summary }}
        </template>
      </el-table-column>
      <el-table-column label="注意事项"
                       :show-overflow-tooltip="true"
                       prop="warn">
        <template slot-scope="scope">
          {{ scope.row.warn }}
        </template>
      </el-table-column>
      <el-table-column label="使用方法"
                       :show-overflow-tooltip="true"
                       prop="usage">
        <template slot-scope="scope">
          {{ scope.row.usage }}
        </template>
      </el-table-column>
      <el-table-column label="图片位置"
                       width="400"
                       prop="img"
                       align="center">
        <template slot-scope="scope">
          {{ scope.row.img }}
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       width="180"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="EditVisible"
               title="编辑作物">
      <el-form :model="editForm">
        <el-form-item label="类别"
                      width="40%">
          <el-input v-model="editForm.class"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="农药"
                      width="40%">
          <el-input v-model="editForm.name"
                    :disabled="true"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="基本介绍"
                      width="40%">
          <el-input v-model="editForm.summary"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="注意事项"
                      width="40%">
          <el-input v-model="editForm.warn"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="使用方法"
                      width="40%">
          <el-input v-model="editForm.usage"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="图片"
                      width="40%">
          <br>
          <img width="30%"
               :src="this.CDN +this.editForm.img"
               alt="">
        </el-form-item>
        <el-form-item label="更改图片"
                      width="40%">
          <br>
          <upload :img="this.editForm.img"
                  @addImgUrl='editImgUrl'></upload>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="EditVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitEdit()">确 定
        </el-button>
      </div>
    </el-dialog>
    <el-pagination :current-page="page"
                   :page-size="limit"
                   :page-sizes="[ 10, 20, 30]"
                   :total="total"
                   style="float:right;margin-top:10px"
                   background
                   layout="total, sizes, prev, pager, next, jumper"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import upload from '@/components/upload'
import { getIndex, editBiocide, addBiocide, delBiocide } from '@/api/backend/FarmRel/biocide'
import { Message, MessageBox } from 'element-ui'

export default {

  components: {
    upload
  },
  data () {
    return {
      CDN: process.env.CDN,
      editId: '',
      EditVisible: false,
      AddVisible: false,
      editForm: {
        class: '',
        name: '',
        summary: '',
        warn: '',
        usage: '',
        img: ''
      },
      addForm: {
        class: '',
        name: '',
        summary: '',
        warn: '',
        usage: '',
        img: ''
      },
      listLoading: true,
      list: null,
      page: 1,
      limit: 10,
      total: 0
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    addImgUrl (imgurl) {
      this.addForm.img = imgurl
    },
    editImgUrl (imgurl) {
      this.editForm.img = imgurl
    },
    fetchData () {
      this.listLoading = true
      getIndex(this.limit, this.page).then(res => {
        this.list = res.data.rows
        this.page = res.page
        this.limit = res.limit
        this.total = res.data.count
        this.listLoading = false
      })
    },
    handleEdit (index, row) {
      this.editForm.class = row.class
      this.editForm.name = row.name
      this.editForm.summary = row.summary
      this.editForm.warn = row.warn
      this.editForm.usage = row.usage
      this.editForm.img = row.img
      this.editId = row.id
      this.EditVisible = true
    },
    submitEdit () {
      editBiocide(this.editId, this.editForm).then(res => {
        if (res.code === 0) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
          this.editForm.class = ''
          this.editForm.name = ''
          this.editForm.summary = ''
          this.editForm.warn = ''
          this.editForm.usage = ''
          this.editForm.img = ''
          this.editId = ''
          this.EditVisible = false
          this.fetchData()
          this.editId = ''
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleAdd () {
      this.addForm.class = ''
      this.addForm.img = ''
      this.addForm.name = ''
      this.addForm.summary = ''
      this.addForm.warn = ''
      this.addForm.usage = ''
      this.AddVisible = true
    },
    submitAdd () {
      addBiocide(this.addForm).then(res => {
        if (res.code === 0) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
          this.addForm.name = ''
          this.addForm.summary = ''
          this.addForm.class = ''
          this.addForm.warn = ''
          this.addForm.usage = ''
          this.addForm.img = ''
          this.AddVisible = false
          this.fetchData()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除该农药, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBiocide(row.id).then(res => {
          if (res.code === 0) {
            Message({
              message: res.msg,
              type: 'success',
              duration: 5 * 1000
            })
            this.fetchData()
          }
        })
      })
    },
    handleSizeChange (val) {
      this.limit = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.fetchData()
    }
  }
}
</script>
