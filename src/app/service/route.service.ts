import { Injectable } from '@angular/core';



let baseUrl="http://192.168.0.123:5000/bda/"//孙驰
// let baseUrl="http://192.168.0.36:5000/bda/"//刘飞
// let baseUrl="http://192.168.0.124:886/bda/"//相鹏s
// let baseUrl="/bda/"//dev




@Injectable()
export class RouteService {

   
    
    constructor() { }
    
    getBaseUrl() {
        return baseUrl;
    }


    tTransaction={
        transactionSun(type,startTime,endTime){
            return baseUrl+`Transaction/TransactionSum?type=${type}&startTime=${startTime}&endTime=${endTime}`
        },
        transactionChart(type,startTime,endTime,skip,count){
            return baseUrl+`Transaction/TransactionChart?type=${type}&startTime=${startTime}&endTime=${endTime}&skip=${skip}&count=${count}`
        },
        transactionExprot(type,startTime,endTime){
            return baseUrl+`Transaction/TransactionExprot?type=${type}&startTime=${startTime}&endTime=${endTime}`
            
        }
    }
    tLine={
        getHotTopLines(top,startTime,endTime){
            return baseUrl+`Line/GetHotTopLines?top=${top}&startTime=${startTime}&endTime=${endTime}`
        },
        getHotTopLinesDetail(top,dateType,startTime,endTime){
            return baseUrl+`Line/GetHotLinesChartsAsync?top=${top}&dateType=${dateType}&startTime=${startTime}&endTime=${endTime}`
        },
        exportHotTopLines(top,dateType,startTime,endTime){
            return baseUrl+`Line/ExportHotLines?top=${top}&dateType=${dateType}&startTime=${startTime}&endTime=${endTime}`
        }
    }
    cCapacity={
        getCapacityList(top){
            return baseUrl+`Capacity/GetCapacityList?top=${top}`
        }
    }

    
    Main={
        getCustomerOrdersCount(top,startTime,endTime){
            return baseUrl+`Main/GetCustomerOrdersCount?top=${top}&startTime=${startTime}&endTime=${endTime}`
        },
        getList(){
            return baseUrl+`Main/GetList`
        },
        initData(){
            return baseUrl+`Main/InitData`;
        },
        getVehicleCount(){
            return baseUrl+`Main/GetVehicleCount`;
        },
        getWithdrawalsMoney(){
            return baseUrl+`Main/GetWithdrawalsMoney`
        }
    }

    cGoodTraffic={
        /**
         * 获取货物流出省份数据
        */
        getOutFlowTop(top,startTime,endTime){
            return baseUrl+`GoodTraffic/GetOutFlowTop?top=${top}&startTime=${startTime}&endTime=${endTime}`
        },
        /**
         * 货物流出折线图所需数据
        */
        getOutFlowChartsAsync(top,pageSize,pageIndex,dateType,startTime,endTime){
            return baseUrl+`GoodTraffic/GetOutFlowChartsAsync?top=${top}&pageSize=${pageSize}&pageIndex=${pageIndex}&dateType=${dateType}&startTime=${startTime}&endTime=${endTime}`
        },
        //导出
        getOutFlowExprot(top,dateType,startTime,endTime){
            return baseUrl+`GoodTraffic/GetOutFlowExprot?top=${top}&dateType=${dateType}&startTime=${startTime}&endTime=${endTime}`
        },
        //货物流入省份数据
        getInFlowTop(top,startTime,endTime){
            return baseUrl+`GoodTraffic/GetInFlowTop?top=${top}&startTime=${startTime}&endTime=${endTime}`
        },
        /**
         * 货物流入折线图所需数据
        */
        getInFlowChartsAsync(top,pageSize,pageIndex,dateType,startTime,endTime){
            return baseUrl+`GoodTraffic/GetInFlowChartsAsync?top=${top}&pageSize=${pageSize}&pageIndex=${pageIndex}&dateType=${dateType}&startTime=${startTime}&endTime=${endTime}`
        },
        //导出
        getInFlowExprot(top,dateType,startTime,endTime){
            return baseUrl+`GoodTraffic/GetInFlowExprot?top=${top}&dateType=${dateType}&startTime=${startTime}&endTime=${endTime}`
        },

    }


    tCar={
        getOneCarTransactionNum(type,startTime,endTime){
            return baseUrl+`Car/OneCarTransactionNum?type=${type}&startTime=${startTime}&endTime=${endTime}`
        },
        getCarTransactionNumTop5(type,startTime,endTime){
            return baseUrl+`Car/CarTransactionNumTop5?type=${type}&startTime=${startTime}&endTime=${endTime}`
        },
        getCarFeeAmountTop5(type,startTime,endTime){
            return baseUrl+`Car/CarFeeAmountTop5?type=${type}&startTime=${startTime}&endTime=${endTime}`
        },
        getCodeNumTop5(type,startTime,endTime){
            return baseUrl+`Car/CodeNumTop5?type=${type}&startTime=${startTime}&endTime=${endTime}`
        },
        getCarAverageTop5(type,startTime,endTime){
            return baseUrl+`Car/CarAverageTop5?type=${type}&startTime=${startTime}&endTime=${endTime}`
        }
    }

}
