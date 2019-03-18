// step10

app.controller('step10',['$scope','$http','$modal','mypro','mydata',function($scope,$http,$modal,mypro,mydata){
	
	var dlist=['$scope.w1','$scope.w2','$scope.w3','$scope.w4','$scope.w5','$scope.w6','$scope.w7','$scope.w8','$scope.w9','$scope.w10','$scope.w11','$scope.w12'];
	var ddata;
	if(mypro.info[5]==1) ddata='$scope.data8';else ddata='$scope.data10';
	for(var i=0,l=dlist.length;i<l;i++){
		eval(dlist[i]+'='+ddata+'[i];');
	}
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s10.id,
		ttxt:$scope.app.steps.s10.title
	});
	
	// modal
	mydata.show().then(function(data){
		var mdata=data.data.page10;
		$('#step10 .fa-book').each(function(i){
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
	$('#step10 .t-gray').each(function(){
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
		$scope.s10=data.data.data8;
	})
	
	mypro.l10=12;
	//mypro.p10=0;
	
	$scope.$watch('w1+w2+w3+w4+w5+w6+w7+w8+w9+w10+w11+w12',function(n,o){
		if(n!==o){
			//console.log(n.length);
			mypro.p10=n.length;
		}
	});
	
	$scope.$watch(function(){
		var ts10=0;
		mypro.ps10=[];
		$('.r_score').each(function(i){
			mypro.ps10[i]=$(this).text()*1;
			ts10+=mypro.ps10[i];
		});
		return ts10;
	},function(n,o){
		if(n!==o){
			n>10&&(n=10)&&alert('此项以达到最大值！');
			mypro.ts10=n;
		}
	});
	
}])
.controller('myp10',['$scope','mypro',function($scope,mypro){
	var value,type,p,color=['danger','warning','info','success'];
	$scope.ps10v=0;
	$scope.ps10t=color[0];
	$scope.$watch(function(){
		return mypro.p10;
	},function(n,o){
		if(n!==o){
			value=n;
			$scope.max=mypro.l10;
			p=value/$scope.max;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps10v=value;
			$scope.ps10t=type;
		}
	});
	
	// easypiechart
	
	var mycolor=[$scope.app.color.danger,$scope.app.color.warning,$scope.app.color.info,$scope.app.color.success];
	$scope.options10={
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
		return mypro.ts10;
	},function(n,o){
		if(!isNaN(n)){
			$scope.score10=n;
			$scope.percent10=n*10;
		}
	});
	
}]);
