// step7

app.controller('step7',['$scope','$http','$modal','mypro','mydata',function($scope,$http,$modal,mypro,mydata){
	
	var dlist=['$scope.w1','$scope.w2_1','$scope.w2_2','$scope.w3_1','$scope.w3_2','$scope.w4','$scope.w5','$scope.w6','$scope.w7_1','$scope.w7_2','$scope.w7_3','$scope.w8','$scope.w9','$scope.w10_1','$scope.w10_2','$scope.w11_1','$scope.w11_2','$scope.w12_1','$scope.w12_2','$scope.w13','$scope.w13s'];
	for(var i=0,l=dlist.length;i<l;i++){
		eval(dlist[i]+'=$scope.data7[i];');
	}
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s7.id,
		ttxt:$scope.app.steps.s7.title
	});
	
	// modal
	mydata.show().then(function(data){
		var mdata=data.data.page7;
		$('#step7 .fa-book').each(function(i){
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
	$('#step7 .t-gray').each(function(){
		$(this).on('click',function(){
			if($(this).hasClass('fa-plus-square')){
				$(this).attr('class','fa fa-minus-square t-gray');
				$(this).parent().parent().after('<textarea></textarea>');
				$(this).parent().parent().next().focus();
			}
			else{
				$(this).attr('class','fa fa-plus-square t-gray');
				$(this).parent().parent().next().remove();
			}
		})
	});
	
	mydata.geti().then(function(data){
		$scope.s7=data.data.data5;
	})
	
	mypro.l7=20;
	//mypro.p7=0;
	
	$scope.$watch('w1+w2_1+w2_2+w3_1+w3_2+w4+w5+w6+w7_1+w7_2+w7_3+w8+w9+w10_1+w10_2+w11_1+w11_2+w12_1+w12_2+w13+w13s',function(n,o){
		if(n!==o){
			//console.log(n.length);
			mypro.p7=n.length;
			if($scope.w13==1) mypro.p7--;
		}
	});
	
	$scope.$watch('w13',function(n,o){
		if(n!==o){
			$scope.w13s='';
		}
	});
	
	$scope.$watch(function(){
		var ts7=0;
		mypro.ps7=[];
		$('.r_score').each(function(i){
			mypro.ps7[i]=$(this).text()*1;
			ts7+=mypro.ps7[i];
		});
		return ts7;
	},function(n,o){
		if(n!==o){
			//console.log(n);
			mypro.ts7=n;
		}
	});
	
}])
.controller('myp7',['$scope','mypro',function($scope,mypro){
	var value,type,p,color=['danger','warning','info','success'];
	$scope.ps7v=0;
	$scope.ps7t=color[0];
	$scope.$watch(function(){
		return mypro.p7;
	},function(n,o){
		if(n!==o){
			value=n;
			$scope.max=mypro.l7;
			p=value/$scope.max;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps7v=value;
			$scope.ps7t=type;
		}
	});
	
	// easypiechart
	
	var mycolor=[$scope.app.color.danger,$scope.app.color.warning,$scope.app.color.info,$scope.app.color.success];
	$scope.options7={
		// barColor:'#fad733',
		trackColor:'#e8eff0',
		scaleColor:false,
		lineCap:'butt',
		lineWidth:2.2,
		size:38,
		rotate:0,
		animate:1000,
		easing:'easeOutBounce'
	};
	$scope.$watch(function(){
		return mypro.ts7;
	},function(n,o){
		if(!isNaN(n)){
			$scope.score7=n;
		}
	});
	
}]);
