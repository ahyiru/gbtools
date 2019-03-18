;'use strict';
/*	20150609
**	angular myweb
**	ah.yiru@gmail.com
*/

angular.module('app')
	.controller('AppCtrl',['$scope','$state',function($scope,$state){
		$scope.app={
			name:'绿色建筑星级评估系统',
			version:'0.0.1',
			author:'yiru',
			github:'https://github.com/ahyiru/gbtools',
			website:'http://www.ahyiru.com/gbtools/demo/',
			weChat:'ahyiru',
			color:{
				primary: '#7266ba',
				info:    '#23b7e5',
				success: '#27c24c',
				warning: '#fad733',
				danger:  '#f05050',
				light:   '#e8eff0',
				dark:    '#3a3f51',
				black:   '#1c2b36'
			},
			steps:{
				s1:{
					id:"1",
					title:"项目详细信息"
				},
				s2:{
					id:"2",
					title:"项目控制性条件"
				},
				s3:{
					id:"3",
					title:"节地与室外环境"
				},
				s4:{
					id:"4",
					title:"节能与能源利用"
				},
				s5:{
					id:"5",
					title:"节水与水资源利用"
				},
				s6:{
					id:"6",
					title:"节材与材料资源利用"
				},
				s7:{
					id:"7",
					title:"室内环境质量"
				},
				s8:{
					id:"8",
					title:"施工管理"
				},
				s9:{
					id:"9",
					title:"运营管理"
				},
				s10:{
					id:"10",
					title:"提高与创新"
				}
			},
			settings:{
				themeID:1,
				navbarHeaderColor:'bg-black',
				navbarCollapseColor:'bg-white-only',
				asideColor:'bg-black',
				headerFixed:true,
				asideFixed:false,
				asideFolded:false,
				asideDock:false,
				container:false
			}
		};
		$scope.data1=[],$scope.data2=[],$scope.data3=[],$scope.data4=[],$scope.data5=[],$scope.data6=[],$scope.data7=[],$scope.data8=[],$scope.data9=[],$scope.data10=[],$scope.caf=false;

		console.group('%c 欢迎光临我的网站！','color:#f05050;font-size:18px');
			console.log(' 喜欢看源码？请移步%c GitHub.%c https://github.com/ahyiru','font-size:15px;color:#23b7e5;','font-size:14px;;');
			console.log(' 如有意见和建议，请发email至%c ah.yiru@gmail.com %c联系我。','font-size:15px;color:#fad733','');
			console.log(' 也可关注我的微信公众号%c yiru_js%c 。%c 我们一起来探索这个美妙的世界！','font-size:15px;color:#27c24c;','','font-size:15px;color:#7266ba;');
		console.groupEnd();
		
	}])
	.controller('myhead',function($scope){
		$scope.fst='全屏';
		$scope.fsi=true;
		$scope.fs=function (){
			if(!document.fullscreenElement&&!document.msFullscreenElement&&!document.mozFullscreenElement&&!document.webkitFullscreenElement){
				if(document.documentElement.requestFullscreen){
					document.documentElement.requestFullscreen();
				}
				else if(document.documentElement.msRequestFullscreen){
					document.documentElement.msRequestFullscreen();
				}
				else if(document.documentElement.mozRequestFullscreen){
					document.documentElement.mozRequestFullscreen();
				}
				else if(document.documentElement.webkitRequestFullscreen){
					document.documentElement.webkitRequestFullscreen();
				}
				$scope.fst='退出全屏';
			}
			else{
				if(document.exitFullscreen){
					document.exitFullscreen();
				}
				else if(document.msExitFullscreen){
					document.msExitFullscreen();
				}
				else if(document.mozCanselFullscreen){
					document.mozCanselFullscreen();
				}
				else if(document.webkitExitFullscreen){
					document.webkitExitFullscreen();
				}
				$scope.fst='全屏';
			}
		};
	})
	.controller('mymodal',function($scope,$modalInstance){
		$scope.cancel=function (){
			$modalInstance.dismiss('cancel');
		};
	});
	