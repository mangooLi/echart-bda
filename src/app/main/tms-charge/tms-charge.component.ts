import { CommonService } from './../../service/common.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

declare var bootbox: any;
declare var echarts;
declare var $: any;
@Component({
    selector: 'app-tms-charge',
    templateUrl: './tms-charge.component.html',
    styleUrls: ['./tms-charge.component.css']
})
export class TmsChargeComponent implements OnInit {
    povinceList = [];
    cityList = [];
    endCityList = [];
    startProvinceCode = '16';
    startCityCode = '1614';
    endProvinceCode = '11';
    endCityCode = '1108';
    carLength = '11';
    carLengthList = [{ value: 10, text: '9.6米' }, { value: 11, text: '13米' }, { value: 14, text: '17.5米' }];
    time = '2';
    timeList = [{ value: 2, text: '月' }, { value: 1, text: '季度' }, { value: 0, text: '年' }];
    feeAmountList = [];
    tableTitle = [];
    tableData = [];
    tableTime = [];
    total = 100;
    startTime: string;
    endTime: string;
    chartCarLength = 10;
    title: string;
    dateRange: string;
    constructor(
        private DataService: DataService,
        private commonService: CommonService
    ) { }


    ngOnInit() {



        // ref.update({'key-1-1':'value-1-1'});

        this.getProvince();
        this.getEndCity(this.endProvinceCode);
        this.getStartCity(this.startProvinceCode);

        this.getFreightRateChart('tcharge-analysis-chart', 10);
        const date = new Date();
        const currentTime = date.getFullYear() + '-' + (date.getMonth());
        this.tableTime = this.getYearAndMonth(this.getPastHalfYear(), currentTime);
        this.startTime = this.getPastHalfYear();
        this.endTime = currentTime;
        this.dateRange=this.startTime+'至'+this.endTime;
        this.onQuery();
        $('#querydateRange').dateRangePicker({
            format: 'YYYY-MM-DD',
            separator: ' 至',
            // startDate: currentTime,
            endDate: this.commonService.getEndDay()
        }).bind('datepicker-change', (event, obj) => {
            console.log('changed', this.time, typeof this.time);
            this.startTime = this.commonService.transformDate(obj.date1);
            this.endTime = this.commonService.transformDate(obj.date2);
            this.dateRange=this.startTime+'至'+this.endTime;
            switch (Number(this.time)) {
                case 1:
                case 2: {
                    if (obj.date1.getFullYear() !== obj.date2.getFullYear()) {
                        bootbox.alert("时间单位为'季度'或者'月'时，起始时间应位于同一年")
                        $('#querydateRange').val('');
                        this.startTime = '';
                        this.endTime = '';
                    }
                    break;
                }
                default: break;
            }
        });
        this.dateRange = this.startTime + '至' + this.endTime;
        $('#querydateRange').val(this.startTime + '至' + this.endTime);

    }

    onSelect(tab) {
        switch (tab) {
            case 'one':
                this.getFreightRateChart('tcharge-analysis-chart', 10);
                this.chartCarLength = 10;
                break;
            case 'tow':
                this.getFreightRateChart('tcharge-chartTow', 11);
                this.chartCarLength = 11;
                break;
            case 'three':
                this.getFreightRateChart('tcharge-chartThree', 14);
                this.chartCarLength = 14;
                break;
            default:
                break;
        }
    }

    getYearAndMonth(start, end) {
        const result = [];
        const starts = start.split('-');
        const ends = end.split('-');
        let staYear = parseInt(starts[0]);
        let staMon = parseInt(starts[1]);
        const endYear = parseInt(ends[0]);
        const endMon = parseInt(ends[1]);
        while (staYear <= endYear) {
            if (staYear === endYear) {
                while (staMon < endMon + 1) {
                    result.unshift(staYear + '-' + staMon);
                    staMon++;
                }
                staYear++;
            } else {
                staMon++;
                if (staMon > 12) {
                    staMon = 1;
                    staYear++;
                }
                result.unshift(staYear + '-' + staMon);
            }
        }
        return result;
    }

    getPastHalfYear() {
        const curDate = (new Date()).getTime();
        const halfYear = 365 / 2 * 24 * 3600 * 1000;
        const pastResult = curDate - halfYear;
        const pastDate = new Date(pastResult),
            pastYear = pastDate.getFullYear(),
            pastMonth = pastDate.getMonth() + 1,
            pastDay = pastDate.getDate();
        return pastYear + '-' + pastMonth;
    }


    changeStartProvince() {
        this.startCityCode = '';
        this.getStartCity(this.startProvinceCode);
    }

    changeEndProvince() {
        this.endCityCode = '';
        this.getEndCity(this.endProvinceCode);
    }

    getProvince() {
        this.DataService.getProvince().subscribe(res => {
            this.povinceList = res.data;
        });
    }

    getStartCity(provinceCode) {
        if (!provinceCode) { return; };
        this.DataService.getCity(provinceCode).subscribe(res => {
            this.cityList = res.data;
        });
    }

    getEndCity(provinceCode) {
        if (!provinceCode) { return; };
        this.DataService.getCity(provinceCode).subscribe(res => {
            this.endCityList = res.data;
        });
    }


    getLineData(typeTime, carlength, startTime, endTime, origin, destination, skip, count) {
        this.DataService.getfreightRate(typeTime, carlength, startTime, endTime, origin, destination, skip, count).subscribe(res => {
            if (typeTime === '1') {
                res.data.list.forEach(element => {
                    element.time = '第' + element.time + '季度';
                });
            }
            this.feeAmountList = res.data.list;
            this.total = res.data.total;
        });
    }

    getChartData(typeTime, carlength, startTime, endTime, origin, destination, skip, count) {
        this.DataService.getfreightRate(typeTime, carlength, startTime, endTime, origin, destination, skip, count).subscribe(res => {
            const xData = [];
            const yData = [];
            res.data.list.map((item, index) => {
                typeTime === '1' ? xData.push('第' + item.time + '季度') : xData.push(item.time)
                yData.push(item.feeAmount);
            });
            const analysisQuery = document.getElementById('tcharge-chartQuery');
            const analysisDomChartQuery = echarts.init(analysisQuery);

            if (!this.startProvinceCode || !this.startCityCode || !this.endProvinceCode || !this.endCityCode) {
                this.title = '';
            } else {
                this.title =
                    $('#startProvince').find('option:selected').text() + $('#startCity').find('option:selected').text() + '-'
                    + $('#endProvince').find('option:selected').text() + $('#endCity').find('option:selected').text();
            }

            analysisDomChartQuery.setOption(this.echartOption(this.title, xData, yData), true);
        });
    }


    onQuery() {
        const origin = this.startCityCode ? this.startCityCode : this.startProvinceCode;
        const destination = this.endCityCode ? this.endCityCode : this.endProvinceCode;
        this.getLineData(this.time, this.carLength, this.startTime, this.endTime, origin, destination, 0, 10);
        this.getChartData(this.time, this.carLength, this.startTime, this.endTime, origin, destination, 0, -1);
    }




    getFreightRateChart(elementId, carlength) {
        this.tableData = [];
        this.tableTitle = [];
        const analysisTow = document.getElementById(elementId);
        const analysisDomChartTow = echarts.init(analysisTow);
        const date = new Date();
        const currentTime = date.getFullYear() + '-' + (date.getMonth());
        this.DataService.getFreightRateChart(2, carlength, this.getPastHalfYear(), currentTime, 0, -1).subscribe(res => {
            for (let index = 0; index < res.data.length; index++) {
                this.tableTitle.push(res.data[index].key);
                const arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].value[index]) {
                        arr.push(res.data[i].value[index]);
                    }
                }
                if (arr.length > 0) {
                    arr.unshift({ feeAmount: this.tableTime[index] });
                    this.tableData.push(arr);
                }
            }
            const yData = [];
            res.data.forEach((item, index) => {
                const arr = [];
                item.value.forEach((items) => {
                    arr.push(items.feeAmount);
                });
                yData.push({ title: this.tableTitle[index], data: arr });
            });
            analysisDomChartTow.setOption(this.echartLeftOption('', this.tableTime, yData), true);
        });
    }



    onPageIndexChange(event) {
        const origin = this.startCityCode ? this.startCityCode : this.startProvinceCode;
        const destination = this.endCityCode ? this.endCityCode : this.endProvinceCode;
        this.getLineData(this.time, this.carLength, '2017-01-01', '2017-06-01', origin, destination, event.pageSkip, event.pageSize);
    }

    getFreightRateExpro() {
        const origin = this.startCityCode ? this.startCityCode : this.startProvinceCode;
        const destination = this.endCityCode ? this.endCityCode : this.endProvinceCode;
        this.DataService.getFreightRateExpro(this.time, this.carLength, '2017-01-01', '2017-06-01', origin, destination)
    }

    getFreightRateChartExprot() {
        const origin = this.startCityCode ? this.startCityCode : this.startProvinceCode;
        const destination = this.endCityCode ? this.endCityCode : this.endProvinceCode;
        const date = new Date();
        const currentTime = date.getFullYear() + '-' + (date.getMonth());
        this.DataService.getFreightRateChartExprot(this.time, this.chartCarLength, this.getPastHalfYear(), currentTime)
    }

    echartOption(text, xData, yData) {
        return {
            title: {
                text: text,
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                left: '3%',
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
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: text,
                    type: 'line',
                    stack: '总量6',
                    data: yData,
                }
            ]
        };
    }

    echartLeftOption(text, xData, yData) {
        const series = [];
        yData.forEach((item, index) => {
            series.push({
                name: item.title,
                type: 'line',
                smooth: true,
                // stack: '总量6',
                data: item.data
            });
        });
        return {
            title: {
                text: text,
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: this.tableTitle,
                x: 'center',
                bottom: 0,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '20%',
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
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: series
        };
    }

}
