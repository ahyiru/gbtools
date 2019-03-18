// step4

app.controller('step4',['$scope','$http','$modal','mypro','mydata',function($scope,$http,$modal,mypro,mydata){
	
	var dlist=['$scope.w1','$scope.w2','$scope.w2s','$scope.w3','$scope.w3s','$scope.w4','$scope.w5','$scope.w6','$scope.w7','$scope.w8_1','$scope.w8_2','$scope.w8_3','$scope.w9','$scope.w10','$scope.w11','$scope.w12_1','$scope.w12_2','$scope.w13','$scope.w14','$scope.w15','$scope.w16_1','$scope.w16_2','$scope.w16_3'];
	for(var i=0,l=dlist.length;i<l;i++){
		eval(dlist[i]+'=$scope.data4[i];');
	}
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s4.id,
		ttxt:$scope.app.steps.s4.title
	});
	
	// modal
	mydata.show().then(function(data){
		var mdata=data.data.page4;
		$('#step4 .fa-book').each(function(i){
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
	$('#step4 .t-gray').each(function(){
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
		$scope.s4=data.data.data2;
	})
	
	mypro.l4=21;
	//mypro.p4=0;
	
	// var wt='w1+w2s+w3s+w4+w5+w6+w7+w8_1+w8_2+w8_3+w9+w10+w11+w12_1+w12_2+w13+w14+w15+w16_1+w16_2+w16_3';
	$scope.$watch('w1+w2s+w3s+w4+w5+w6+w7+w8_1+w8_2+w8_3+w9+w10+w11+w12_1+w12_2+w13+w14+w15+w16_1+w16_2+w16_3',function(n,o){
		if(n!==o){
			//console.log(n.length);
			mypro.p4=n.length;
		}
	});
	
	$scope.$watch('w2',function(n,o){
		if(n!==o){
			$scope.w2s='';
		}
	});
	$scope.$watch('w3',function(n,o){
		if(n!==o){
			$scope.w3s='';
		}
	});
	
	$scope.$watch(function(){
		var ts4=0;
		mypro.ps4=[];
		$('.r_score').each(function(i){
			mypro.ps4[i]=$(this).text()*1;
			ts4+=mypro.ps4[i];
		});
		return ts4;
	},function(n,o){
		if(n!==o){
			//console.log(n);
			mypro.ts4=n;
		}
	});
	
}])
.controller('myp4',['$scope','mypro',function($scope,mypro){
	var value,type,p,color=['danger','warning','info','success'];
	$scope.ps4v=0;
	$scope.ps4t=color[0];
	$scope.$watch(function(){
		return mypro.p4;
	},function(n,o){
		if(n!==o){
			value=n;
			$scope.max=mypro.l4;
			p=value/$scope.max;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps4v=value;
			$scope.ps4t=type;
		}
	});
	
	// easypiechart
	
	var mycolor=[$scope.app.color.danger,$scope.app.color.warning,$scope.app.color.info,$scope.app.color.success];
	$scope.options4={
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
		return mypro.ts4;
	},function(n,o){
		if(!isNaN(n)){
			$scope.score4=n;
		}
	});
	
}]);
