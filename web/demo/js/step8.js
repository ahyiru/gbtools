// step_e

app.controller('step8',['$scope','$http','$modal','mypro','mydata',function($scope,$http,$modal,mypro,mydata){
	
	var dlist=['$scope.w1','$scope.w2','$scope.w3_1','$scope.w3_2','$scope.w3_3','$scope.w4_1','$scope.w4_2','$scope.w4_3','$scope.w4_4','$scope.w5_1','$scope.w5_2','$scope.w5_3','$scope.w6','$scope.w7','$scope.w7s1','$scope.w7s2','$scope.w8','$scope.w9_1','$scope.w9_2','$scope.w10','$scope.w11_1','$scope.w11_2','$scope.w11_3','$scope.w12_1','$scope.w12_2','$scope.w12_3','$scope.w12_4','$scope.w13'];
	for(var i=0,l=dlist.length;i<l;i++){
		eval(dlist[i]+'=$scope.data8[i];');
	}
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s8.id,
		ttxt:$scope.app.steps.s8.title
	});
	
	// modal
	mydata.show().then(function(data){
		var mdata=data.data.page8;
		$('#step8 .fa-book').each(function(i){
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
	$('#step_e .t-gray').each(function(){
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
		$scope.s8=data.data.data6;
	})
	
	mypro.l8=26;
	//mypro.p8=0;
	
	$scope.$watch('w1+w2+w3_1+w3_2+w3_3+w4_1+w4_2+w4_3+w4_4+w5_1+w5_2+w5_3+w6+w7+w7s1+w7s2+w8+w9_1+w9_2+w10+w11_1+w11_2+w11_3+w12_1+w12_2+w12_3+w12_4+w13',function(n,o){
		if(n!==o){
			//console.log(n.length);
			mypro.p8=n.length;
			if($scope.w7) mypro.p8--;
		}
	});
	
	$scope.$watch('w7',function(n,o){
		if(n!==o){
			$scope.w7s1='';
			$scope.w7s2='';
		}
	});
	
	$scope.$watch(function(){
		var ts8=0;
		mypro.ps8=[];
		$('.r_score').each(function(i){
			mypro.ps8[i]=$(this).text()*1;
			ts8+=mypro.ps8[i];
		});
		return ts8;
	},function(n,o){
		if(n!==o){
			mypro.ts8=n;
		}
	});
	
}])
.controller('myp8',['$scope','mypro',function($scope,mypro){
	var value,type,p,color=['danger','warning','info','success'];
	$scope.ps8v=0;
	$scope.ps8t=color[0];
	$scope.$watch(function(){
		return mypro.p8;
	},function(n,o){
		if(n!==o){
			value=n;
			$scope.max=mypro.l8;
			p=value/$scope.max;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps8v=value;
			$scope.ps8t=type;
		}
	});
	
	// easypiechart
	
	var mycolor=[$scope.app.color.danger,$scope.app.color.warning,$scope.app.color.info,$scope.app.color.success];
	$scope.options8={
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
		return mypro.ts8;
	},function(n,o){
		if(!isNaN(n)){
			$scope.score8=n;
		}
	});
	
}]);
