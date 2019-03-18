// step5

app.controller('step5',['$scope','$http','$modal','mypro','mydata',function($scope,$http,$modal,mypro,mydata){
	
	var dlist=['$scope.w1','$scope.w2_1','$scope.w2_2','$scope.w2_3','$scope.w3','$scope.w4_1','$scope.w4_2','$scope.w5_1','$scope.w5_2','$scope.w6','$scope.w7','$scope.w7s','$scope.w8','$scope.w8s_1','$scope.w8s_2','$scope.w9','$scope.w10','$scope.w10s','$scope.w10s00','$scope.w10s01','$scope.w10s11','$scope.w11','$scope.w11s','$scope.w12','$scope.w12s_1','$scope.w12s_2'];
	for(var i=0,l=dlist.length;i<l;i++){
		eval(dlist[i]+'=$scope.data5[i];');
	}
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s5.id,
		ttxt:$scope.app.steps.s5.title
	});
	
	// modal
	mydata.show().then(function(data){
		var mdata=data.data.page5;
		$('#step5 .fa-book').each(function(i){
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
	$('#step5 .t-gray').each(function(){
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
		$scope.s5=data.data.data3;
	})
	
	mypro.l5=16;
	//mypro.p5=0;
	
	// var wt='w1+w2_1+w2_2+w2_3+w3+w4_1+w4_2+w5_1+w5_2+w6+w7+w8+w9+w10s+w11+w12';
	$scope.$watch('w1+w2_1+w2_2+w2_3+w3+w4_1+w4_2+w5_1+w5_2+w6+w7+w7s+w8+w8s_1+w8s_2+w9+w10s00+w10s01+w10s11+w11+w11s+w12+w12s_1+w12s_2',function(n,o){
		if(n!==o){
			//console.log(n.length);
			mypro.p5=n.length;
			if($scope.w7==1) mypro.p5--;
			if($scope.w8==1) mypro.p5--;
			if($scope.w8s_1||$scope.w8s_2) mypro.p5--;
			if($scope.w11==1) mypro.p5--;
			if($scope.w12==1) mypro.p5--;
			if($scope.w12s_1||$scope.w12s_2) mypro.p5--;
			
			// console.log(mypro.p5);
		}
	});
	
	$scope.$watch('w7',function(n,o){
		if(n!==o){
			$scope.w7s='';
		}
	});
	$scope.$watch('w8',function(n,o){
		if(n!==o){
			$scope.w8s_1='';
			$scope.w8s_2='';
		}
	});
	$scope.$watch('w10',function(n,o){
		if(n!==o){
			$scope.w10s='';
			$scope.w10s00='';
			$scope.w10s01='';
			$scope.w10s11='';
		}
	});
	$scope.$watch('w10s',function(n,o){
		if(n!==o){
			$scope.w10s00='';
			$scope.w10s01='';
			$scope.w10s11='';
		}
	});
	$scope.$watch('w11',function(n,o){
		if(n!==o){
			$scope.w11s='';
		}
	});
	$scope.$watch('w12',function(n,o){
		if(n!==o){
			$scope.w12s_1='';
			$scope.w12s_2='';
		}
	});
	
	$scope.$watch(function(){
		var ts5=0;
		mypro.ps5=[];
		$('.r_score').each(function(i){
			mypro.ps5[i]=$(this).text()*1;
			ts5+=mypro.ps5[i];
		});
		return ts5;
	},function(n,o){
		if(n!==o){
			//console.log(n);
			mypro.ts5=n;
		}
	});
	
}])
.controller('myp5',['$scope','mypro',function($scope,mypro){
	var value,type,p,color=['danger','warning','info','success'];
	$scope.ps5v=0;
	$scope.ps5t=color[0];
	$scope.$watch(function(){
		return mypro.p5;
	},function(n,o){
		if(n!==o){
			value=n;
			$scope.max=mypro.l5;
			p=value/$scope.max;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps5v=value;
			$scope.ps5t=type;
		}
	});
	
	// easypiechart
	
	var mycolor=[$scope.app.color.danger,$scope.app.color.warning,$scope.app.color.info,$scope.app.color.success];
	$scope.options5={
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
		return mypro.ts5;
	},function(n,o){
		if(!isNaN(n)){
			$scope.score5=n;
		}
	});
	
}]);
