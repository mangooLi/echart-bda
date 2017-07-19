
import { Component, OnInit } from '@angular/core';
declare var echarts:any;
declare var $:any;
declare var moment:any;
@Component({
  selector: 'app-user-analysis',
  templateUrl: './user-analysis.component.html',
  styleUrls: ['./user-analysis.component.css']
})
export class UserAnalysisComponent implements OnInit {

    constructor() { }
    toggleTable(){
        $('.ua-table').slideToggle();
    }



    totalUser=120000;
    realNameUser=86780;
    activeUser=10500;
    openCount=13000;
    dataRanger="";
    //下面是折线图相关参数
    myChart=null;
    //折线图的options
    option = {
        
          tooltip: {
              trigger: 'axis'
          },
          // legend: {
          //     data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          // },
          grid: {
              left: '5%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                  name:'搜索引擎',
                  type:'line',
                  stack: '总量',
                  data:[820, 932, 901, 934, 1290, 1330, 1320]
              }
          ]
    };
    table={
      
       
        dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
        
        clickToSelect:true,
        singleSelect:false,
        pagination: false,//是否分页
        customSort:(name,order) =>{},
        pageSize: 10,//单页记录数
        pageList: [10, 20, 50],//分页步进值
        sidePagination: "client",//服务端分页
        buttonsAlign: "left",//按钮对齐方式 子询价编号 发货地址 送货地址 货物名称 货物数量 所需车长 询价时间 紧急程度 询价状态
        columns: [
            // {field: "state",checkbox: true},
            {field: "index",title: "日期",align: "center",valign: "middle",},
            {field: "phoneNumber",title: "新增用户", order: "desc"},
            {field: "carNumber",title: "活跃用户",titleTooltip: ""},
            {field: "realName",title: "启动次数"},
            {field: "carType",title: "累计用户"},
        
        ],
        cellStyle:( row, index)=>{
          return {classes:'table_cell'}
        },
        data: [],
        onSort:(name,order)=>{
           
        },
        onClickRow:(row)=>{
           
        },
        
       
        // },
        actionFormatter:function(value, row, index){
           
        },
        locale: "zh-CN"//中文支持,
        
    
    }

    //绘制折线图
    render(){
        var dom = document.getElementById("user-container");
        var myChart = echarts.init(dom);
        if (this.option && typeof this.option === "object") {
            myChart.setOption(this.option, true);
        }
    }



   
    test(){
        // alert('frheui');
        var data=this.option.series[0].data;
        
        data=data.map((item,index)=>{
            return item+=index*20;
        })
        this.option.series[0]= {
                  name:'搜索引擎',
                  type:'line',
                  stack: '总量',
                  data:data
              }
        this.render();
    }
    ngOnInit() {
    
       
        
        this.render();
        $('div .daterangepicker_input').hide();
        $('#user_dataRange').daterangepicker({
            startDate: "06/06/2016",
            endDate: "06/12/2017",
            showWeekNumbers : true, 
            format : 'YYYY-MM-DD',
            ranges : {  
                //'最近1小时': [moment().subtract('hours',1), moment()],  
                '最近7日': [moment().subtract('days', 6), moment()],  
                '最近30日': [moment().subtract('days', 29), moment()]  
            }, 
            locale : {  
                applyLabel : '确定',  
                cancelLabel : '取消',  
                fromLabel : '起始时间',  
                toLabel : '结束时间',  
                customRangeLabel : '自定义',  
                daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
                monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                        '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
                firstDay : 1  
            }
        }, (start, end, label) =>{
                this.dataRanger=start.format('YYYY/MM/DD')+"-"+end.format('YYYY/MM/DD');
            }  
        );

        $('#user_table').bootstrapTable(this.table);
        $('.no-records-found td').text('暂无数据')

       
    }

}
