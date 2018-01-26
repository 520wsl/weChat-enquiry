// components/analysisReport/analysisReport.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 选择项
    active: {
      type: String,
      value: '1'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    CDN: app.CDN,
    reportId: 1,
    params: {
      reportName: '2018年1月',
      reportId: 74
    },
    data: [
      {
        label: '基础数据',
        url: '/pages/home/analysisReport/index/index'
      },
      {
        label: '标王分析',
        url: '/pages/home/analysisReport/has/has'
      },
      {
        label: '运营建议',
        url: '/pages/home/analysisReport/operating/operating'
      }
    ],
    list: [
      {
        reportName: '2018年1月',
        reportId: 74
      },
      {
        reportName: '2017年度',
        reportId: 74
      },
      {
        reportName: '2017年第四季度',
        reportId: 74
      },
      {
        reportName: '2017年12月',
        reportId: 74
      }
    ]
  },

  ready() {
    this.getList();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 切换tab
    clickHandle(e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        active: index
      });
    },
    //选择报告列表id
    bindPickerChange(e) {
      this.setData({
        params: this.data.list[e.detail.value]
      });
      this.triggerEvent('selectReport', { params: this.data.params });
    },
    //获取分析报告列表
    getList() {
      app
        .get('/report/list')
        .then(e => {
          if (e.status == 200) {
            this.setData({
              list: e.data
            });
            this.triggerEvent('selectReport', { params: this.data.list[0] });
          }
          console.log(e.list);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
});
