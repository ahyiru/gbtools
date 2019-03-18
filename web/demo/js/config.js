;'use strict';

/*	20150609
**	angular myweb
**	ah.yiru@gmail.com
*/

var app=angular.module('app');

app.run(['$rootScope','$state','$stateParams',function($rootScope,$state,$stateParams){
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}])

	.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
		$urlRouterProvider
			.when('','/app/基本信息')
			//.otherwise('/app/基本信息');
			.otherwise('/404');
		$stateProvider
			.state('app',{
				abstract:true,
				url:'/app',
				templateUrl:'tpls/app.html'
			})
			.state('app.info',{
				url:'/基本信息',
				templateUrl:'tpls/info.html'
			})
			.state('app.step',{
				abstract:true,
				url:'/step',
				templateUrl:'tpls/step.html'
			})
			.state('app.step.step1',{
				url:'/第一步',
				templateUrl:'tpls/step1.html'
			})
			.state('app.step.step2',{
				url:'/第二步',
				templateUrl:'tpls/step2.html'
			})
			.state('app.step.step3',{
				url:'/第三步',
				templateUrl:'tpls/step3.html'
			})
			.state('app.step.step4',{
				url:'/第四步',
				templateUrl:'tpls/step4.html'
			})
			.state('app.step.step5',{
				url:'/第五步',
				templateUrl:'tpls/step5.html'
			})
			.state('app.step.step6',{
				url:'/第六步',
				templateUrl:'tpls/step6.html'
			})
			.state('app.step.step7',{
				url:'/第七步',
				templateUrl:'tpls/step7.html'
			})
			.state('app.step.step8',{
				url:'/第八步',
				templateUrl:'tpls/step8.html'
			})
			.state('app.step.step9',{
				url:'/第九步',
				templateUrl:'tpls/step9.html'
			})
			.state('app.step.step10',{
				url:'/完成',
				templateUrl:'tpls/step10.html'
			})
			.state('app.score',{
				url:'/得分情况',
				templateUrl:'tpls/score.html'
			})
			.state('page',{
				abstract:true,
				url:'',
				template:'<div class="mypage container" ng-controller="page"><div class="row signpage"><div class="col-md-4 col-md-offset-4"><div class="signtitle"><h3>绿色建筑星级评估系统</h3></div><div class="myanimate" ui-view></div></div></div></div>'
			})
			.state('page.login',{
				url:'/登录',
				templateUrl:'tpl/signin.html'
			})
			.state('page.signup',{
				url:'/注册',
				templateUrl:'tpl/signup.html'
			})
			.state('page.fpwd',{
				url:'/找回密码',
				templateUrl:'tpl/fpwd.html'
			})
			.state('404',{
				url:'/404',
				templateUrl:'tpl/404.html'
			})
			
	}])
