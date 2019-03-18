// step2

app.controller('step2',['$scope','$modal','mypro','mydata',function($scope,$modal,mypro,mydata){
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s2.id,
		ttxt:$scope.app.steps.s2.title
	});
	
	// modal
	var modal2=function(){
		mydata.show().then(function(data){
			var mdata=data.data.page2;
			$('#step2 .fa-book').each(function(i){
				$(this).on('click',function(){
					//console.log(mdata[i]);
					var content='<h4 class="modaltitle">'+mdata[i][0]+'</h4>';
					for(var j=1,l=mdata[i].length;j<l;j++){
						content+='<p class="modalp">'+mdata[i][j]+'</p>';
					}
					$modal.open({
						template:'<div class="modal-body">'+content+'</div><div class="modal-footer"><button class="btn btn-info" ng-click="cancel()">关闭</button></div>',
						controller:'mymodal'
					});
				})
			})
		});
		
	};
	setTimeout(modal2,500);
	
	mydata.geti().then(function(data){
		$scope.lists=data.data.datap;
		$scope.$watch(function(){
			return mypro.info;
		},function(n,o){
			if(n&&n[5]==1){
				$scope.lists.length=5;
				$('.myrm').remove();
				// set data
				var flag=0;
				angular.forEach($scope.lists,function(v,k){
					angular.forEach(v.slists,function(v1,k1){
						v1.chk=$scope.data2[flag];
						flag++;
					});
				});
				if($scope.data2[flag]){
					span.text('全部取消');
					$scope.chkall=true;
				}
				else{
					span.text('全部满足');
					$scope.chkall=false;
				};
				// end set data
			}
		}) 
		
		var span=$('#chkall span'),
			myall=function(tf){
				angular.forEach($scope.lists,function(v){
					angular.forEach(v.slists,function(v1){
						v1.chk=tf;
					});
				});
			};
		
		$scope.myca=function(){
			var l=$('#chk input').length;
			mypro.l2=l;
			if($scope.chkall){
				span.text('全部取消');
				myall(true);
				mypro.p2=l;
			}
			else{
				span.text('全部满足');
				myall(false);
				mypro.p2=0;
			}
		};
		
		$scope.$watch('lists',function(n,o){
			if(n!==o){
				var l=$('#chk input').length,
					f=0,count=0;
				angular.forEach(n,function(v,k){
					angular.forEach(v.slists,function(v1,k1){
						if(v1.chk) count++;
						$scope.data2[f]=v1.chk;
						f++;
					});
				});
				if(count===l){
					span.text('全部取消');
					$scope.chkall=true;
					$scope.data2[f]=true;
				}
				else{
					span.text('全部满足');
					$scope.chkall=false;
					$scope.data2[f]=false;
				}
				mypro.l2=l;
				mypro.p2=count;
			}
		},true);
	},function(){
		console.log('err');
	});
	
}])
.controller('myp2',['$scope','mypro',function($scope,mypro){
	
	
	var value,type,p,color=['danger','warning','info','success'];
	$scope.ps2v=0;
	$scope.ps2t=color[0];
	$scope.$watch(function(){
		return mypro.p2;
	},function(n,o){
		if(n!==o){
			value=n;
			$scope.max=mypro.l2;
			p=value/$scope.max;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps2v=value;
			$scope.ps2t=type;
		}
	});
	
}]);
