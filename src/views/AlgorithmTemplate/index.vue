<template>
  <structure3>
    <template #card-r-1>
      <div class="AT-container">
        <header>
          <!-- <span
            class="blue-button AT-header__button"
            @click="newDialogVisible = true"
          >
            新增算法模板
          </span> -->
        </header>
        <main>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            height="100%"
          >
            <el-table-column
              prop="name"
              label="模板名称"
            />
            <el-table-column
              prop="type"
              label="算法类型"
            />
            <el-table-column label="操作">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-button
                    link
                    type="primary"
                    O-B
                    @click="showTemplate(scope.row)"
                  >
                    详情
                  </el-button>
                  <el-button
                    link
                    type="primary"
                    O-B
                    @click="runTemplate(scope.row)"
                  >
                    执行
                  </el-button>
                  <!-- <el-button
                    link
                    type="danger"
                    O-B
                    @click="deleteTemplate(scope.row)"
                  >
                    删除
                  </el-button> -->
                </div>
              </template>
            </el-table-column>
          </el-table>
        </main>
        <footer>
          <!-- <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          /> -->
        </footer>
      </div>
    </template>
    <template #shadow>
      <PlatformDrawer
        v-model:visible="visible"
        title="模板详情"
        size="500px"
        @changeVisible="(v) => {visible = v}"
      >
        <div class="AT-drawer">
          <div
            v-for="drawer, i in drawerList"
            :key="i"
            class="AT-drawer__item"
            O-R
          >
            <span>{{ drawer.name }}：</span>
            <span>{{ drawer.value }}</span>
          </div>
        </div>
      </PlatformDrawer>
      <ATDeleteDialog
        v-model:visible="deleteDialogVisible"
        :data="deleteTemplateData"
        @changeVisible="(v) => {deleteDialogVisible = v}"
        @delete="deleteTemplateAfterConfirm"
      />
      <ATRunDialog
        v-model:visible="runDialogVisible"
        :data="runTemplateData"
        @changeVisible="(v) => {runDialogVisible = v}"
        @run="runTemplateAfterConfirm"
      />
      <ATNewDialog
        v-model:visible="newDialogVisible"
        @changeVisible="(v) => {newDialogVisible = v}"
        @confirm="newTemplateAfterConfirm"
      />
    </template>
  </structure3>
</template>

<script>
import structure3 from '@/components/Structure/structure3.vue'
import PlatformDrawer from '@/components/PlatformDrawer'
import ATDeleteDialog from '@/components/PlatformDialog/ATDeleteDialog.vue'
import ATRunDialog from '@/components/PlatformDialog/ATRunDialog.vue'
import ATNewDialog from '@/components/PlatformDialog/ATNewDialog.vue'
export default {
  components: {
    structure3,
    PlatformDrawer,
    ATDeleteDialog,
    ATRunDialog,
    ATNewDialog
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 100,
      small: false,
      background: false,
      disabled: false,
      total: 1299,
      tableData: [
        {
          id: '212121',
          name: '算法模板名称',
          type: '算法类型',
          intr: '算法介绍'
        }
      ],
      visible: false,
      deleteDialogVisible: false,
      runDialogVisible: false,
      newDialogVisible: false,
      drawerList: [],
      deleteTemplateData: null,
      runTemplateData: null
    }
  },
  mounted() {

  },
  methods: {
    handleSizeChange(size) {
      console.log(size)
    },
    handleCurrentChange(number) {
      console.log(number)
    },
    showTemplate(row) {
      this.visible = true
      const sortList = [{
        key: 'name',
        name: '模板名称'
      }, {
        key: 'type',
        name: '算法类型'
      }, {
        key: 'intr',
        name: '算法介绍'
      }]
      const drawerList = []
      sortList.forEach((item) => {
        drawerList.push({
          name: item.name,
          value: row[item.key]
        })
      })
      this.drawerList = drawerList
    },
    runTemplate(row) {
      this.runTemplateData = row
      this.runDialogVisible = true
      console.log(row)
    },
    deleteTemplate(row) {
      this.deleteTemplateData = {
        templateName: row.templateName,
        creator: row.creator,
        creationTime: row.creationTime,
        templateData: row
      }
      this.deleteDialogVisible = true
    },
    deleteTemplateAfterConfirm(template) {
      console.log(template)
    },
    runTemplateAfterConfirm(data) {
      console.log(data)
    },
    newTemplateAfterConfirm(template) {
      console.log(template)
    }
  }

}
</script>

<style>
.AT-container {
  height: 100%;
}
.AT-container > header {
  height: 40px;
  text-align: left;
}
.AT-container > footer {
  height: 40px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}
.AT-container > main {
  height: calc(100% - 40px * 2);
}
.AT-header__button {
  display: inline-block;
  padding: 8px;
  border-radius: 12px;
}
.AT-drawer {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  text-align: left;
}
.AT-drawer__item {
  display: grid;
  grid-template-columns: 35% 65%;
}
</style>
