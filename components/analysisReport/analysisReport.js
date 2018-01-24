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
    params:{
      reportName: '2018年1月',
      reportId: 111
    },
    data: [
      {
        label: '询盘统计',
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
        reportId: 12
      },
      {
        reportName: '2017年度',
        reportId: 222
      },
      {
        reportName: '2017年第四季度',
        reportId: 12
      },
      {
        reportName: '2017年12月',
        reportId: 444
      }
    ]
  },

  ready() {
    // this.getList();
    this.triggerEvent('selectReport', {params:this.data.list[0]});
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
      this.triggerEvent('selectReport', {params:this.data.params});
    },
    //获取分析报告列表
    getList() {
      app
        .get('/report/pastreport')
        .then(e => {
          console.log(e.list);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
});
