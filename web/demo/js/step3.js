// step3

app.controller('step3',['$scope','$http','$modal','mypro','mydata',function($scope,$http,$modal,mypro,mydata){
	
	var dlist=['$scope.w1','$scope.w1s','$scope.w2_1','$scope.w2_1s','$scope.w2_2','$scope.w2_2s','$scope.w3','$scope.w4_1','$scope.w4_2','$scope.w5','$scope.w6_1_1','$scope.w6_1_2','$scope.w6_2_1','$scope.w6_2_2','$scope.w7_1','$scope.w7_2','$scope.w8_1','$scope.w8_2','$scope.w8_3','$scope.w9','$scope.w10_1','$scope.w10_2_1','$scope.w10_2_2','$scope.w10_2_3','$scope.w11_1','$scope.w11_2','$scope.w11_3','$scope.w11_4','$scope.w11_5','$scope.w12','$scope.w13_1','$scope.w13_2','$scope.w13_3','$scope.w14','$scope.w15_1','$scope.w15_2'];
	for(var i=0,l=dlist.length;i<l;i++){
		eval(dlist[i]+'=$scope.data3[i];');
	}
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s3.id,
		ttxt:$scope.app.steps.s3.title
	});
	
	// modal
	mydata.show().then(function(data){
		var mdata=data.data.page3;
		$('#step3 .fa-book').each(function(i){
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
	$('#step3 .t-gray').each(function(){
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
		$scope.s3=data.data.data1;
	})
	
	mypro.l3=33;
	//mypro.p3=0;
	
	$scope.$watch('w1s+w2_1s+w2_2s+w3+w4_1+w4_2+w5+w6_1_1+w6_1_2+w6_2_1+w6_2_2+w7_1+w7_2+w8_1+w8_2+w8_3+w9+w10_1+w10_2_1+w10_2_2+w10_2_3+w11_1+w11_2+w11_3+w11_4+w11_5+w12+w13_1+w13_2+w13_3+w14+w15_1+w15_2',function(n,o){
		if(n!==o){
			//console.log(n.length);
			mypro.p3=n.length;
		}
	});
	
	$scope.$watch('w1',function(n,o){
		if(n!==o){
			$scope.w1s='';
		}
	});
	$scope.$watch('w2_1',function(n,o){
		if(n!==o){
			$scope.w2_1s='';
		}
	});
	$scope.$watch('w2_2',function(n,o){
		if(n!==o){
			$scope.w2_2s='';
		}
	});
	$scope.$watch(function(){
		var ts3=0;
		mypro.ps3=[];
		$('.r_score').each(function(i){
			mypro.ps3[i]=$(this).text()*1;
			ts3+=mypro.ps3[i];
		});
		return ts3;
	},function(n,o){
		if(n!==o){
			//console.log(n);
			mypro.ts3=n;
		}
	});
	
}])
.controller('myp3',['$scope','mypro',function($scope,mypro){
	var value,type,p,color=['danger','warning','info','success'];
	$scope.ps3v=0;
	$scope.ps3t=color[0];
	$scope.$watch(function(){
		return mypro.p3;
	},function(n,o){
		if(n!==o){
			value=n;
			$scope.max=mypro.l3;
			p=value/$scope.max;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps3v=value;
			$scope.ps3t=type;
		}
	});
	
	// easypiechart
	
	var mycolor=[$scope.app.color.danger,$scope.app.color.warning,$scope.app.color.info,$scope.app.color.success];
	$scope.options3={
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
		return mypro.ts3;
	},function(n,o){
		if(!isNaN(n)){
			$scope.score3=n;
		}
	});
	
}]);
