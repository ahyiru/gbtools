// ruleServer

app.factory('mydata',function($http){
	var rdata=function(){
		return $http({
			method:'GET',
			url:'json/rules.js'
		})
	};
	var idata=function(){
		return $http({
			method:'GET',
			url:'json/infos.js'
		})
	};
	return {
		show:function(){
			return rdata();
		},
		geti:function(){
			return idata();
		}
	}
})
