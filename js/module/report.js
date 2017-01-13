
angular.module('report', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("report", {
                    url: '/report/:userId/:ordId',
                    templateUrl: 'view/report.html',
                    resolve: {
	                	report_list: function (httpService,$rootScope,$stateParams) {
	                        return httpService.get($rootScope.baseURL+
	                        	'report/phoneSelectReportByParams.do?userId='+$stateParams.userId+'&ordId='+$stateParams.ordId)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                         	for(var i=0;i<data.length;i++){
	                         		data[i]['rep_state']= (data[i].repState==3)?"报告已完成":"报告生成中"
	                         	}
	                                return data;
	                            });
	                    },
	                },
                    controller: function($scope,httpService,report_list,$rootScope){
                    	console.log(report_list)
                    	$scope.reports=report_list
                    	
                    },
                })
        }
    ])