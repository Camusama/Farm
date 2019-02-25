<template>
  <div class="app-container">
    <el-button size="large"
               icon="el-icon-circle-plus-outline"
               style="margin-bottom:18px;"
               @click="handleAdd()">新增</el-button>
    <el-dialog :visible.sync="AddVisible"
               title="新增用户">
      <el-form :model="addFrom">
        <el-form-item label="用户名"
                      width="40%">
          <el-input v-model="addFrom.username"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码"
                      width="40%">
          <el-input v-model="addFrom.password"
                    autocomplete="off" />
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
          {{ scope.$index +1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="是否管理员"
                       width="110"
                       prop="authority_id"
                       align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.authority_id"> 是 </span>
          <span v-else>否</span>
        </template>
      </el-table-column>

      <!-- <el-table-column class-name="status-col"
                       label="状态"
                       width="110"
                       align="center">
        <i class="el-icon-edit"></i>
      </el-table-column> -->
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
      <el-table-column align="center"
                       prop="updated_at"
                       label="修改日期"
                       width="240">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updated_at.toString().slice(0,-5).split('T').join(" ") }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       prop="created_at"
                       label="创建日期"
                       width="240">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at.toString().slice(0,-5).split('T').join(" ") }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="EditVisible"
               title="编辑用户">
      <el-form :model="editFrom">
        <el-form-item label="用户名"
                      width="40%">
          <el-input v-model="editFrom.username"
                    :disabled="true"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码"
                      width="40%">
          <el-input v-model="editFrom.password"
                    autocomplete="off" />
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
import { getIndex, editUser, addUser, delUser } from '@/api/backend/user'
import { Message, MessageBox } from 'element-ui'

export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      editId: '',
      EditVisible: false,
      AddVisible: false,
      editFrom: {
        username: '',
        password: ''
      },
      addFrom: {
        username: '',
        password: ''
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
      this.editFrom.username = row.username
      this.editId = row.id
      this.EditVisible = true
    },
    submitEdit () {
      editUser(this.editId, this.editFrom).then(res => {
        if (res.code === 0) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
          this.editFrom.password = ''
          this.EditVisible = false
          this.fetchData()
          this.editId = ''
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleAdd () {
      this.AddVisible = true
    },
    submitAdd () {
      addUser(this.addFrom).then(res => {
        if (res.code === 0) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
          this.addFrom.username = ''
          this.addFrom.password = ''
          this.AddVisible = false
          this.fetchData()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(row.id).then(res => {
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
