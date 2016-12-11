
angular.module('report', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("report", {
                    url: '/report/:id',
                    templateUrl: 'view/report.html',
                    resolve: {
	                	report_list: function (httpService,$rootScope,$stateParams) {
	                        return httpService.get($rootScope.baseURL+'report/phoneGetReportByUserId.do?userId='+$stateParams.id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
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