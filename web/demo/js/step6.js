// step6

app.controller('step6',['$scope','$http','$modal','mypro','mydata',function($scope,$http,$modal,mypro,mydata){
	
	var dlist=['$scope.w1','$scope.w2','$scope.w3','$scope.w4','$scope.w5','$scope.w6_1','$scope.w6_2','$scope.w7','$scope.w8','$scope.w9','$scope.w10','$scope.w10s1','$scope.w10s1s','$scope.w10s2','$scope.w10s3_1','$scope.w10s3_1s','$scope.w10s3_2','$scope.w11','$scope.w11s','$scope.w12','$scope.w13','$scope.w14_1','$scope.w14_2','$scope.w14_3'];
	for(var i=0,l=dlist.length;i<l;i++){
		eval(dlist[i]+'=$scope.data6[i];');
	}
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s6.id,
		ttxt:$scope.app.steps.s6.title
	});
	
	// modal
	mydata.show().then(function(data){
		var mdata=data.data.page6;
		$('#step6 .fa-book').each(function(i){
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
	$('#step6 .t-gray').each(function(){
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
		$scope.s6=data.data.data4;
	})
	
	mypro.l6=17;
	//mypro.p6=0;
	
	// var wt='w1+w2+w3+w4+w5+w6_1+w6_2+w7+w8+w9+w10s1+w10s1s+w10s2+w10s3_1+w10s3_1s+w10s3_2+w11s1+w11s2+w12+w13+w14_1+w14_2+w14_3';
	$scope.$watch('w1+w2+w3+w4+w5+w6_1+w6_2+w7+w8+w9+w10s1+w10s1s+w10s2+w10s3_1+w10s3_1s+w10s3_2+w11s+w12+w13+w14_1+w14_2+w14_3',function(n,o){
		if(n!==o){
			//console.log(n.length);
			mypro.p6=n.length;
			if($scope.w10s1==1) mypro.p6--;
			if($scope.w10s3_1||$scope.w10s3_2) mypro.p6--;
			if($scope.w10s3_1==1) mypro.p6--;
		}
	});
	
	$scope.$watch('w11',function(n,o){
		if(n!==o){
			$scope.w11s='';
		}
	});
	$scope.$watch('w10',function(n,o){
		if(n!==o){
			$scope.w10s1='';
			$scope.w10s1s='';
			$scope.w10s2='';
			$scope.w10s3_1='';
			$scope.w10s3_1s='';
			$scope.w10s3_2='';
		}
	});
	$scope.$watch('w10s1',function(n,o){
		if(n!==o){
			$scope.w10s1s='';
		}
	});
	$scope.$watch('w10s3_1',function(n,o){
		if(n!==o){
			$scope.w10s3_1s='';
		}
	});
	
	$scope.$watch(function(){
		var ts6=0;
		mypro.ps6=[];
		$('.r_score').each(function(i){
			mypro.ps6[i]=$(this).text()*1;
			ts6+=mypro.ps6[i];
		});
		return ts6;
	},function(n,o){
		if(n!==o){
			//console.log(n);
			mypro.ts6=n;
		}
	});
	
}])
.controller('myp6',['$scope','mypro',function($scope,mypro){
	var value,type,p,color=['danger','warning','info','success'];
	$scope.ps6v=0;
	$scope.ps6t=color[0];
	$scope.$watch(function(){
		return mypro.p6;
	},function(n,o){
		if(n!==o){
			value=n;
			$scope.max=mypro.l6;
			p=value/$scope.max;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps6v=value;
			$scope.ps6t=type;
		}
	});
	
	// easypiechart
	
	var mycolor=[$scope.app.color.danger,$scope.app.color.warning,$scope.app.color.info,$scope.app.color.success];
	$scope.options6={
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
		return mypro.ts6;
	},function(n,o){
		if(!isNaN(n)){
			$scope.score6=n;
		}
	});
	
}]);
