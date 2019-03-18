// myright

app.controller('myinfo',['$scope','$state','mypro',function($scope,$state,mypro){
	$('body').addClass('mybody');
	scroll(0,0);
	$scope.info={
		name:'',builder:'',b_area:'',standard:'1',btype:'1',ptype:'1'
	};
	mypro.info=[];
	$scope.$watch('info',function(n,o){
		if(n!==o){
			var f=-1;
			angular.forEach(n,function(v){
				f++;
				mypro.info[f]=v;
			});
		}
	},true);
	
  }])
