;'use strict';
/*	20150423
**	angular test
**	ah.yiru@gmail.com
*/

//var fs=require('fs');

app.factory('userInfo',['$http',function($http){
	var userUrl='./tpl/userInfo.js';
	var getInfo=function(){
		return $http({
			method:'GET',
			url:userUrl,
			data:{}
		})
	}
	return {
		userList:function(){
			return getInfo();
		}
	}
}])
.controller('page', ['$scope', function($scope){
	$('body').removeClass('mybody');
}])
.controller('signinCtrl',['$scope','$state','userInfo',function($scope,$state,userInfo){
	$scope.authError=null;
	$scope.login=function(){
		userInfo.userList()
		.then(function(data){
			angular.forEach(data.data.user,function(users){
				if($scope.email===users.email&&$scope.password===users.password){
					//console.log($scope.password);
					$scope.authError='登录成功！';
					$state.go('app.info');
					return;
				}
			})
			if(!$scope.authError){
				$scope.authError='信息填写错误！';
				return;
			}
		},function(){
			$scope.authError='网络错误！';
		})
		$scope.authError=null;
	}
}])
.directive('mailTip',function(){
	return{
		restrict: 'EA',
		template: '<ul></ul>',
		link:function(scope,ele,attrs,ctrl){
			var input=ele.prev().children('input'),ul=ele.children('ul');
			mymail(input,ul);
		}
	}
})
.controller('signupCtrl',['$scope','$state','userInfo',function($scope,$state,userInfo){
	$scope.signup=function(){
		alert('暂不支持注册，请使用试用版！');
		$state.go('app.info');
		return;
		//console.log($scope.name+','+$scope.email);
		var myadd={"name":$scope.name,"email":$scope.email};
		userInfo.userList().then(function(data){
			//console.log(data.data.user);
		})
	}
}])
.directive('chkName',['$timeout','userInfo',function($timeout,userInfo){
	return{
		require:'ngModel',//如果不设置require选项,ngModelController(第四个参数)就不会被注入到指令中.
		link:function(scope,ele,attrs,ctrl){
			var timeout;
			scope.$watch(attrs.ngModel,function(n){
				if(n){
					if(timeout){
						$timeout.cancel(timeout);
					}
					timeout=$timeout(function(){
						userInfo.userList(n)
							.then(function(data){
								ctrl.$setValidity('server',true);
								ctrl.$setValidity('cname',true);
								angular.forEach(data.data.user,function(users){
									if(n===users.name){
										ctrl.$setValidity('cname',false);
									}
								})
							},function(){
								ctrl.$setValidity('server',false);
							})
					},350)
				}
			})
		}
	}
}])
.directive('chkEmail',['$timeout','userInfo',function($timeout,userInfo){
	return{
		require:'ngModel',
		link:function(scope,ele,attrs,ctrl){
			var timeout;
			scope.$watch(attrs.ngModel,function(n){
				if(n){
					if(timeout){
						$timeout.cancel(timeout);
					}
					timeout=$timeout(function(){
						userInfo.userList(n)
							.then(function(data){
								ctrl.$setValidity('server',true);
								ctrl.$setValidity('cemail',true);
								angular.forEach(data.data.user,function(users){
									if(n===users.email){
										ctrl.$setValidity('cemail',false);
									}
								})
							},function(){
								ctrl.$setValidity('server',false);
							})
					},350)
				}
			})
		}
	}
}])
//	失去焦点时绑定
.directive('chkRepsd',function(){
	return{
		require:'ngModel',
		link:function(scope,ele,attrs,ctrl){
			ele.on('blur',function(){
				scope.$apply(function(){
					if(password.value){
						if(ctrl.$viewValue!==password.value){
							ctrl.$setValidity('crepsd',false);
						}
					}
				})
			}).on('focus',function(){
				scope.$apply(function(){
					ctrl.$setValidity('crepsd',true);
				})
			})
		}
	}
})

.controller('fpwdCtrl',['$scope','$state','userInfo',function($scope,$state,userInfo){
	$scope.authError=null;
	$scope.fpwd=function(){
		userInfo.userList()
		.success(function(data){
			var a=0;
			angular.forEach(data.user,function(users){
				if($scope.email===users.email){
					a=1;
					return;
				}
			})
			if(a){
				$scope.authError='重置成功，请重新登录！';
				alert('重置成功，请重新登录！');
				$state.go('page.login');
				return;
			}
			else{
				$scope.authError='此邮箱未注册，请注册！';
				return;
			}
			
		})
		.error(function(){
			$scope.authError='网络错误！';
		})
		$scope.authError=null;
	}
}]);

var mymail=function(input,ul){
	var mail=['@qq.com','@gmail.com','@126.com','@163.com','@hotmail.com','@yahoo.com','@live.com','@sohu.com','@sina.com'],
		cur=-1;
	var w=$('#mymail').width();
	ul.css('width',w);
	ul.hide();
	input.on('input',function(){
		var n=$(this).val();
		cur=-1;
		if(n){
			var li='',showmail=[];
			ul.show();
			angular.forEach(mail,function(m){
				li+='<li>'+n+''+m+'</li>';
			})
			
			if(/@/.test(n)){
				li='';
				var fi=n.replace(/@.*/,''),
					ni=n.replace(/.*@/,'');
				$.map(mail,function(am){
					var myreg=new RegExp(ni);
					if(myreg.test(am)){
						showmail.push(am);
					}
				})
				$.map(showmail,function(sm){
					li+='<li>'+fi+''+sm+'</li>'
				})
			}
			
			ul.html(li);
			
			var myli=ul.find('li');
			myli.each(function(i){
				$(this).on('click',function(e){
					e.stopPropagation();
					input.val($(this).text());
					ul.hide();
				})
				
				$(this).on('mouseenter',function(){
					$(this).css('cursor','pointer');
					$(this).addClass('mysel').siblings().removeClass('mysel');
					cur=i;
					input.val($(this).text());
				})
			})
		}
		else{
			ul.hide();
		}
	})
	
	input.on('keyup',function(e){
		var k=e.which||e.keyCode,
			li=ul.find('li'),
			l=li.length;
		if(l){
			switch(k){
				case 38:
					ul.show();
					cur--;
					if(cur<0) cur=l-1;
					li.eq(cur).addClass('mysel').siblings().removeClass('mysel');
					input.val(li.eq(cur).text());
					break;
				case 40:
					ul.show();
					cur++;
					if(cur>l-1) cur=0;
					li.eq(cur).addClass('mysel').siblings().removeClass('mysel');
					input.val(li.eq(cur).text());
					break;
				case 13:
					if(cur>-1){
						ul.hide();
						cur=-1;
						break;
					}
				default:
					break;
			}
		}
	})
	
	$(document).on('click',function(e){
		e.stopPropagation();
		ul.hide();
	})
}
