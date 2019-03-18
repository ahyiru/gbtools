// step_e

app.controller('step9',['$scope','$http','$modal','mypro','mydata',function($scope,$http,$modal,mypro,mydata){
	
	var dlist=['$scope.w1_1','$scope.w1_2','$scope.w1_3','$scope.w2_1','$scope.w2_2','$scope.w3_1','$scope.w3_2','$scope.w3_3','$scope.w4_1','$scope.w4_2','$scope.w4_3','$scope.w5_1','$scope.w5_2','$scope.w6_1','$scope.w6_2','$scope.w7_1','$scope.w7_2','$scope.w8_1','$scope.w8_2','$scope.w9_1','$scope.w9_2','$scope.w9_3','$scope.w10_1','$scope.w10_2','$scope.w10_3','$scope.w11_1','$scope.w11_2','$scope.w12_1','$scope.w12_2','$scope.w12_3','$scope.w13_1','$scope.w13_2','$scope.w13_3','$scope.w13_4'];
	for(var i=0,l=dlist.length;i<l;i++){
		eval(dlist[i]+'=$scope.data9[i];');
	}
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s9.id,
		ttxt:$scope.app.steps.s9.title
	});
	
	// modal
	mydata.show().then(function(data){
		var mdata=data.data.page9;
		$('#step9 .fa-book').each(function(i){
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
	$('#step9 .t-gray').each(function(){
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
		$scope.s9=data.data.data7;
	})
	
	mypro.l9=34;
	//mypro.p_e=0;
	
	$scope.$watch('w1_1+w1_2+w1_3+w2_1+w2_2+w3_1+w3_2+w3_3+w4_1+w4_2+w4_3+w5_1+w5_2+w6_1+w6_2+w7_1+w7_2+w8_1+w8_2+w9_1+w9_2+w9_3+w10_1+w10_2+w10_3+w11_1+w11_2+w12_1+w12_2+w12_3+w13_1+w13_2+w13_3+w13_4',function(n,o){
		if(n!==o){
			//console.log(n.length);
			mypro.p9=n.length;
		}
	});
	
	$scope.$watch(function(){
		var ts9=0;
		mypro.ps9=[];
		$('.r_score').each(function(i){
			mypro.ps9[i]=$(this).text()*1;
			ts9+=mypro.ps9[i];
		});
		return ts9;
	},function(n,o){
		if(n!==o){
			mypro.ts9=n;
		}
	});
	
}])
.controller('myp9',['$scope','mypro',function($scope,mypro){
	var value,type,p,color=['danger','warning','info','success'];
	$scope.ps9v=0;
	$scope.ps9t=color[0];
	$scope.$watch(function(){
		return mypro.p9;
	},function(n,o){
		if(n!==o){
			value=n;
			$scope.max=mypro.l9;
			p=value/$scope.max;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps9v=value;
			$scope.ps9t=type;
		}
	});
	
	// easypiechart
	
	var mycolor=[$scope.app.color.danger,$scope.app.color.warning,$scope.app.color.info,$scope.app.color.success];
	$scope.options9={
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
		return mypro.ts9;
	},function(n,o){
		if(!isNaN(n)){
			$scope.score9=n;
		}
	});
	
}]);
