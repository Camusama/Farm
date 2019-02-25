<template>
  <div class="app-container">
    <el-button size="large"
               icon="el-icon-circle-plus-outline"
               style="margin-bottom:18px;"
               @click="handleAdd()">新增</el-button>
    <el-dialog :visible.sync="AddVisible"
               title="新增月份信息">
      <el-form :model="addForm">
        <el-form-item label="作物"
                      width="40%">
          <br>
          <el-select v-model="addForm.cropname"
                     placeholder="请选择">
            <el-option v-for="item in cropOption"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="月份"
                      width="40%">
          <br>
          <el-select v-model="addForm.name"
                     placeholder="请选择">
            <el-option v-for="item in monthOption"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本月气候"
                      width="40%">
          <el-input v-model="addForm.point1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="本月农事"
                      width="40%">
          <el-input v-model="addForm.point2"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="注意事项"
                      width="40%">
          <el-input v-model="addForm.point3"
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
      <el-table-column label="作物"
                       width="100">
        <template slot-scope="scope">
          {{ scope.row.cropname }}
        </template>
      </el-table-column>
      <el-table-column label="月份"
                       width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="本月气候"
                       :show-overflow-tooltip="true"
                       prop="summary">
        <template slot-scope="scope">
          {{ scope.row.weather }}
        </template>
      </el-table-column>
      <el-table-column label="本月农事"
                       :show-overflow-tooltip="true"
                       prop="warn">
        <template slot-scope="scope">
          {{ scope.row.farm }}
        </template>
      </el-table-column>
      <el-table-column label="注意事项"
                       :show-overflow-tooltip="true"
                       prop="usage">
        <template slot-scope="scope">
          {{ scope.row.warn }}
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
               title="编辑">
      <el-form :model="editForm">
        <el-form-item label="作物"
                      width="40%">
          <br>
          <el-select v-model="editForm.cropname"
                     placeholder="请选择">
            <el-option v-for="item in cropOption"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月份"
                      width="40%">
          <br>
          <el-select v-model="editForm.name"
                     placeholder="请选择">
            <el-option v-for="item in monthOption"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本月气候"
                      width="40%">
          <el-input v-model="editForm.point1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="本月农事"
                      width="40%">
          <el-input v-model="editForm.point2"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="注意事项"
                      width="40%">
          <el-input v-model="editForm.point3"
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
import { getIndex, editMonth, addMonth, delMonth } from '@/api/backend/CropRel/month'
import { getCrop } from '@/api/common'
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
        cropname: '',
        name: '',
        point1: '',
        point2: '',
        point3: '',
        img: ''
      },
      addForm: {
        cropname: '',
        name: '',
        point1: '',
        point2: '',
        point3: '',
        img: ''
      },
      cropOption: [],
      monthOption: [
        { name: '一月' },
        { name: '二月' },
        { name: '三月' },
        { name: '四月' },
        { name: '五月' },
        { name: '六月' },
        { name: '七月' },
        { name: '八月' },
        { name: '九月' },
        { name: '十月' },
        { name: '十一月' },
        { name: '十二月' }
      ],
      listLoading: true,
      list: null,
      page: 1,
      limit: 10,
      total: 0
    }
  },
  created () {
    this.fetchData()
    getCrop().then(res => {
      this.cropOption = res.data
    })
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
      this.editForm.cropname = row.cropname
      this.editForm.name = row.name
      this.editForm.point1 = row.weather
      this.editForm.point2 = row.farm
      this.editForm.point3 = row.warn
      this.editForm.img = row.img
      this.editId = row.id
      this.EditVisible = true
    },
    submitEdit () {
      editMonth(this.editId, this.editForm).then(res => {
        if (res.code === 0) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
          this.editForm.cropname = ''
          this.editForm.name = ''
          this.editForm.point1 = ''
          this.editForm.point2 = ''
          this.editForm.point3 = ''
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
      this.addForm.cropname = ''
      this.addForm.img = ''
      this.addForm.name = ''
      this.addForm.point1 = ''
      this.addForm.point2 = ''
      this.addForm.point3 = ''
      this.AddVisible = true
    },
    submitAdd () {
      addMonth(this.addForm).then(res => {
        if (res.code === 0) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
          this.addForm.name = ''
          this.addForm.point1 = ''
          this.addForm.cropname = ''
          this.addForm.point2 = ''
          this.addForm.point3 = ''
          this.addForm.img = ''
          this.AddVisible = false
          this.fetchData()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除该月份信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMonth(row.id).then(res => {
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
