// step1

app.controller('step1',['$scope','mypro',function($scope,mypro){
	
	$scope.$emit('to_right',{
		tid:$scope.app.steps.s1.id,
		ttxt:$scope.app.steps.s1.title
	});

	$scope.s1=[];

	
	$('input[type=text]:not(:disabled)').each(function(i){
		$scope.s1[i]=$scope.data1[i];
	});

	if(mypro.info){
		$scope.s1r=mypro.info[4]*1;
		$scope.s1[0]=mypro.info[0];
		$scope.s1[1]=mypro.info[1];
		$scope.s1[3]=mypro.info[2];
	}

	//mypro.l1=Object.keys($scope.s1).length;
	//mypro.l1=$scope.s1.length;
	$scope.$watch('s1',function(n,o){
		if(n!==o){
			mypro.info[0]=n[0];
			var x=0;
			angular.forEach(n,function(v,k){
				if(v!==''&&v!==undefined) x++;
				$scope.data1[k]=v;
			});
			$scope.s1d=(n[3]&&n[4])?(n[3]/n[4]).toFixed(2):0;
			mypro.p1=x;
		}
	},true);
}])
.controller('myp1',['$scope','mypro',function($scope,mypro){
	var value,type,p,color=['danger','warning','info','success'];
	//$scope.ps1v=3/14*100;
	//$scope.ps1t=color[0];
	$scope.$watch(function(){
		return mypro.p1;
	},function(n,o){
		//if(n!==o){
			value=(n+3)||6;
			$scope.max=14;
			p=value/14;
			p<0.25?type=color[0]:p<0.5?type=color[1]:p<0.75?type=color[2]:type=color[3];
			$scope.ps1v=value;
			$scope.ps1t=type;
		//}
	})
}])