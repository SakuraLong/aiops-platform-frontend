import { downloadLog } from '@/api/log'
import { downloadMetric } from '@/api/metric'
import { downloadTrace } from '@/api/trace'
import { generateRandomStringBase } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { message } from '@/utils/utils'

const generateRandomString = generateRandomStringBase()

class Event {
  constructor() {
    this.eventMap = new Map()
  }
  addEventListener(eventName, func) {
    if (!this.eventMap.has(eventName)) this.eventMap.set(eventName, [])
    this.eventMap.get(eventName).push(func)
  }
  removeEventListener(eventName, func) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, this.eventMap.get(eventName).filter((f) => f !== func))
    }
  }
  trigger(eventName, params) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.get(eventName).forEach((func) => {
        func(params)
      })
    }
  }
}

class ExportItem {
  dict = {
    log: downloadLog,
    metric: downloadMetric,
    trace: downloadTrace
  }
  statusList = ['导出中', '待下载', '已下载', '导出失败']
  progressStatus = [null, 'success', 'success', 'exception']
  progressIndeterminates = [true, true, false, false]
  constructor(manager, type, params) {
    this.id = generateRandomString()
    this.date = new Date()
    this.manager = manager
    this.type = type
    this.params = params
    this.downloadFunc = this.dict[type]
    this.err = null
    this.res = null
    this.status = 0

    this.export()
  }
  export() {
    this.downloadFunc(this.params).then((res) => {
      this.status = 1
      this.res = res
      this.manager.trigger('change', {
        id: this.id
      })
      message('有下载任务完成', 'success')
    }).catch((err) => {
      this.status = 3
      this.err = err
      this.manager.trigger('change', {
        id: this.id
      })
      message('有下载任务失败')
    })
  }
  download() {
    this.status = 2
    saveAs(new Blob([this.res]), this.type + this.id + '.zip')
    this.manager.trigger('change', {
      id: this.id
    })
  }
  getDate() {
    return this.date
  }
  getId() {
    return this.id
  }
  getData() {
    return {
      id: this.id,
      type: this.type,
      date: new Date(this.date),
      dateStr: this.date.toLocaleString(),
      status: this.status,
      statusStr: this.statusList[this.status],
      progressStatus: this.progressStatus[this.status],
      progressIndeterminates: this.progressIndeterminates[this.status],
      err: this.err
    }
  }
}

class ExportManager extends Event {
  constructor() {
    super()
    this.exportList = []
    this.exportItemsMap = new Map()
    this.addEventListener('change', this.change.bind(this))
  }
  createDownload(type, params) {
    const exportItem = new ExportItem(this, type, params)
    this.addEventListener(exportItem.getId() + '-download', exportItem.download.bind(exportItem))
    this.exportItemsMap.set(exportItem.getId(), {
      item: exportItem,
      data: exportItem.getData()
    })
    this.update()
  }
  download(id) {
    this.trigger(id + '-download')
  }
  delete(id) {
    const exportItem = this.exportItemsMap.get(id).item
    this.removeEventListener(exportItem.getId() + '-download', exportItem.download.bind(exportItem))
    this.exportItemsMap.delete(id)
    this.update()
  }
  change(event) {
    const id = event !== undefined ? event.id : null
    if (id) {
      const dict = this.exportItemsMap.get(id)
      const item = dict.item
      dict.data = item.getData()
    } else {
      const list = Array.from(this.exportItemsMap.keys())
      list.forEach((key) => {
        const dict = this.exportItemsMap.get(key)
        const item = dict.item
        dict.data = item.getData()
      })
    }
    this.update()
  }
  update() {
    const list = Array.from(this.exportItemsMap.values())
    this.exportList = []
    list.forEach((value) => {
      this.exportList.push(value.data)
    })
    this.trigger('update', {
      exportList: this.exportList
    })
  }
}

export default ExportManager
