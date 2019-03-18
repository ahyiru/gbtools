// myright

app.controller('myright',['$scope','$state','mypro',function($scope,$state,mypro){
	
	// 判断浏览器是否禁用cookie!
	if(!navigator.cookieEnabled){
		alert('请退出隐私模式或启用cookie,然后重新填写信息！');
		$state.go('app.info');
		return false;
	};
	
	mypro.info=$.trim(mypro.info);
	mypro.info||(mypro.info=localStorage.getItem('coo'));
	if(!mypro.info){
		alert('信息已过期，请重新填写！');
		$state.go('app.info');
		return false;
	}
	else{
		mypro.info=mypro.info.split(',');
		try{
			localStorage.setItem('coo',mypro.info);
		}
		catch (e){
			alert('你处于无痕模式，请退出无痕模式后重新填写信息！');
			$state.go('app.info');
			return false;
		}
		
	}

	$('body').removeClass('mybody');

	//console.log(mypro.info[5]);
	
	var btype=['居住','公共'],
		ptype=['设计','运营'];
	
	var w=[],we=1;
	
	$scope.type=btype[mypro.info[4]-1]+''+ptype[mypro.info[5]-1];
	
	$scope.$watch(function(){
		return mypro.info[0];
	},function(n,o){
		$scope.name=mypro.info[0];
	});
	
	if(mypro.info[5]==1){
		$scope.app.steps.s10.id=8;
		
		if(mypro.info[4]==1){
			w[0]=0.21,w[1]=0.24,w[2]=0.20,w[3]=0.17,w[4]=0.18;
		}
		if(mypro.info[4]==2){
			w[0]=0.16,w[1]=0.28,w[2]=0.18,w[3]=0.19,w[4]=0.19;
		}
	}
	if(mypro.info[5]==2){
		$scope.app.steps.s10.id=10;
		
		if(mypro.info[4]==1){
			w[0]=0.17,w[1]=0.19,w[2]=0.16,w[3]=0.14,w[4]=0.14,w[5]=0.10,w[6]=0.10;
		}
		if(mypro.info[4]==2){
			w[0]=0.13,w[1]=0.23,w[2]=0.14,w[3]=0.15,w[4]=0.15,w[5]=0.10,w[6]=0.10;
		}
	}

	mypro.wvalue=w;
	
	var url='app.step.step';
	
	$scope.$on('to_right',function(d,data){
		$scope.tid=+data.tid;
		$scope.ttxt=data.ttxt;
		
		if($scope.tid==1){
			$scope.myprev=true;
		}else $scope.myprev=false;
		if(mypro.info[5]==1&&$scope.tid==8||$scope.tid==10) $scope.mynext='完 成';
		else $scope.mynext='下一步';
		
	});
	
	$scope.$watch(function(){
		var tscore=0;
		if(mypro.info[5]==1) tscore=(mypro.ts3||0)*w[0]+(mypro.ts4||0)*w[1]+(mypro.ts5||0)*w[2]+(mypro.ts6||0)*w[3]+(mypro.ts7||0)*w[4]+(mypro.ts10||0)*we;
		if(mypro.info[5]==2) tscore=(mypro.ts3||0)*w[0]+(mypro.ts4||0)*w[1]+(mypro.ts5||0)*w[2]+(mypro.ts6||0)*w[3]+(mypro.ts7||0)*w[4]+(mypro.ts8||0)*w[5]+(mypro.ts9||0)*w[6]+(mypro.ts10||0)*we;
		tscore=tscore.toFixed(2);
		return tscore;
	},function(n,o){
		$scope.tscore=n;
		if(n>=80) $scope.rate=3;
		else if(n>=60) $scope.rate=2;
		else if(n>=50) $scope.rate=1;
		else $scope.rate=0;

		mypro.tscore=$scope.tscore;
		mypro.rate=$scope.rate;
	});
	

	$scope.prev=function(){
		
		$('.radio-list').each(function(i){
			eval('$scope.data'+$scope.tid+'[i]=$(this).find("input:checked").val()');
		})
		
		if(mypro.info[5]==1&&$scope.tid==10) $state.go(url+7);
		else $state.go(url+($scope.tid-1));
		
	};
	$scope.next=function(){
		
		$('.radio-list').each(function(i){
			eval('$scope.data'+$scope.tid+'[i]=$(this).find("input:checked").val()');
		});
		if($scope.mynext=='完 成'){
			//mypro.wvalue=w;
			//mypro.tscore=$scope.tscore;
			//mypro.rate=$scope.rate;
			$state.go('app.score');
			scroll(0,0);
		}else{
			if(mypro.info[5]==1&&$scope.tid==7) $state.go(url+10);
			else $state.go(url+($scope.tid+1));
		}
	};
  }])
.controller('myleft',['$scope','$state','$location','mypro',function($scope,$state,$location,mypro){
	
	$scope.$watch(function(){
		return mypro.info;
	},function(n,o){
		if(n[5]==1){
			$('.myrm').remove();
		}
	});
	
	$scope.$watch(function(){
		var s=$location.path();
		//s=s.substr(s.length-3,3);
		s=s.split('/')[s.split('/').length-1];
		return s;
	},function(n,o){
		
		n=='第一步'&&(n=1)||n=='第二步'&&(n=2)||n=='第三步'&&(n=3)||n=='第四步'&&(n=4)||n=='第五步'&&(n=5)||n=='第六步'&&(n=6)||n=='第七步'&&(n=7)||n=='第八步'&&(n=8)||n=='第九步'&&(n=9)||n=='完成'&&(n=10);

		if(mypro.info[5]==1){
			if(n==8||n==9) $state.go('app.step.step10');
			if(n==10) n=8;
		}
		
		$('.mystep>li').eq(n-1).addClass('active').siblings().removeClass('active');
		if(window.innerWidth<=991){
			$('.mystep>li').hide();
			$('.mystep>li').eq(n-1).show();
		};

		$scope.chkResult=function(){
			$('.radio-list').each(function(i){
				eval('$scope.data'+n+'[i]=$(this).find("input:checked").val()');
			});
			$state.go('app.score');	
		};

		// start 点击
		$('.mystep>li').each(function(i){
			$(this).off('click').on('click',function(){//不能用one('click'),y?
				$('.radio-list').each(function(j){
					eval('$scope.data'+n+'[j]=$(this).find("input:checked").val()');
				});
				$state.go('app.step.step'+(i+1));
			})

		})
		// end click
		
		scroll(0,0);
		myscroll($('.myleft'),$('.myright'));
	});
	
  }]);
 
 var myscroll=function(left,right){
	
	var	mybig=function(){
			//	显示侧边
			$('.mystep>li').show();
			//	取消绑定
			$(window).off('scroll');
			var ot=left.offset().top,
				lh=left.height(),
				rh=right.height(),
				//rh=$('.mymain').height()+40,
				wh=$(window).height(),
				BT=80,
				sr=lh+BT-wh;
			//console.log(lh+','+rh);
			if(lh<rh){
				$(window).on('scroll',function(){
					var st=$(this).scrollTop();//$(document).scrollTop();$(window).scrollTop();
					if(st>ot){
						if(sr>0){
							if(st>ot+sr){
								left.css({'position':'fixed','top':-sr+'px'});
							}
							else{
								left.css({'position':'relative','top':'0'});
							}
						}
						else{
							left.css({'position':'fixed','top':'0'});
						}
					}
					else{
						left.css({'position':'relative','top':'0'});
					}
				})
			}
		},
		mysmall=function(){
			// 侧边隐藏头部显示当前状态
			$('.mystep>li').hide();
			$('.mystep>li').eq($('.badge').text()-1).show();
			//	取消绑定
			$(window).off('scroll');
			var lh=left.height(),
				rh=right.height();
				//rh=$('.mymain').height()+40;
			$(window).on('scroll',function(){
				var st=$(this).scrollTop();
				if(st>50){
					left.css({'position':'fixed','top':'0'});
					right.css('margin-top',lh+'px');
				}
				else{
					left.css({'position':'relative','top':'0'});
					right.css('margin-top','0');
				}
			})
		},
		myinit=function(){
			//	初始状态
			left.css({'position':'relative','top':'0'});
			right.css('margin-top','0');
			
			if(window.innerWidth>991) mybig(left,right);
			else mysmall(left,right);
		};
	myinit();
	$(window).resize(function(){
		myinit();
	});
};