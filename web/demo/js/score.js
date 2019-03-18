// step1

app.controller('myframe',['$scope','$state','mydata','mypro',function($scope,$state,mydata,mypro){
	scroll(0,0);
	if(!mypro.info||!mypro.wvalue){
		alert('信息已过期，请重新填写！');
		$state.go('app.info');
		return false;
	}
	
	var n=new Date();
	$scope.ctime=n.getFullYear()+'-'+((m=(n.getMonth()+1))<10?'0'+m:m)+'-'+((d=n.getDate())<10?'0'+d:d);
	$scope.tscore=mypro.tscore||0;
	$scope.rate=mypro.rate;
	var f=mypro.info[5];
	$scope.myshow=true;
	$scope.lastid=8;
	
	$scope.ds={
		't3':mypro.ts3||0,
		't4':mypro.ts4||0,
		't5':mypro.ts5||0,
		't6':mypro.ts6||0,
		't7':mypro.ts7||0,
		't8':mypro.ts8||0,
		't9':mypro.ts9||0,
		't10':mypro.ts10||0
	};
	
	$scope.scores=[{
		'id':1,
		'name':$scope.app.steps.s3.title,
		'rate':$scope.ds.t3,
		'wv':mypro.wvalue[0]
		},{
		'id':2,
		'name':$scope.app.steps.s4.title,
		'rate':$scope.ds.t4,
		'wv':mypro.wvalue[1]
		},{
		'id':3,
		'name':$scope.app.steps.s5.title,
		'rate':$scope.ds.t5,
		'wv':mypro.wvalue[2]
		},{
		'id':4,
		'name':$scope.app.steps.s6.title,
		'rate':$scope.ds.t6,
		'wv':mypro.wvalue[3]
		},{
		'id':5,
		'name':$scope.app.steps.s7.title,
		'rate':$scope.ds.t7,
		'wv':mypro.wvalue[4]
		},{
		'id':6,
		'name':$scope.app.steps.s8.title,
		'rate':$scope.ds.t8,
		'wv':mypro.wvalue[5]
		},{
		'id':7,
		'name':$scope.app.steps.s9.title,
		'rate':$scope.ds.t9,
		'wv':mypro.wvalue[6]
		}];
	
	var dsv={
		't3':(mypro.ts3*mypro.wvalue[0]||0).toFixed(2)*1,
		't4':(mypro.ts4*mypro.wvalue[1]||0).toFixed(2)*1,
		't5':(mypro.ts5*mypro.wvalue[2]||0).toFixed(2)*1,
		't6':(mypro.ts6*mypro.wvalue[3]||0).toFixed(2)*1,
		't7':(mypro.ts7*mypro.wvalue[4]||0).toFixed(2)*1,
		't8':(mypro.ts8*mypro.wvalue[5]||0).toFixed(2)*1,
		't9':(mypro.ts9*mypro.wvalue[6]||0).toFixed(2)*1,
		't10':mypro.ts10||0
	};
	
	$scope.lastrate=$scope.ds.t10*10;
	$scope.twv=(mypro.rate==1&&'一星')||(mypro.rate==2&&'二星')||(mypro.rate==3&&'三星')||'无星级';
	if(f==1){
		$scope.myshow=false;
		$scope.scores.length=5;
		$scope.lastid=6;
	};
	
	mydata.geti().then(function(data){
		var mydata=data.data;
		
		//page3
		  //控制项
		$scope.p4=mydata.datap[0].slists;
		for(var i=0,j=$scope.p4.length;i<j;i++){
			$scope.p4[i].m=$scope.data2[i]?'满足':'不满足';
		}
		  //得分项
		$scope.c4=mydata.data1;
		for(var i=0,j=$scope.c4.length;i<j;i++){
			$scope.c4[i].id=$scope.c4[i].title.split(' ')[0];
			$scope.c4[i].txt=$scope.c4[i].title.split(' ')[1];
			$scope.c4[i].score=$scope.c4[i].tsc;
			$scope.c4[i].score1=mypro.ps3?mypro.ps3[i]:0;
		}
		
		//page4
		  //控制项
		$scope.p5=mydata.datap[1].slists;
		for(var i=0,j=$scope.p5.length;i<j;i++){
			$scope.p5[i].m=$scope.data2[i+4]?'满足':'不满足';
		}
		  //得分项
		$scope.c5=mydata.data2;
		for(var i=0,j=$scope.c5.length;i<j;i++){
			$scope.c5[i].id=$scope.c5[i].title.split(' ')[0];
			$scope.c5[i].txt=$scope.c5[i].title.split(' ')[1];
			$scope.c5[i].score=$scope.c5[i].tsc;
			$scope.c5[i].score1=mypro.ps4?mypro.ps4[i]:0;
		}
		
		//page5
		  //控制项
		$scope.p6=mydata.datap[2].slists;
		for(var i=0,j=$scope.p6.length;i<j;i++){
			$scope.p6[i].m=$scope.data2[i+8]?'满足':'不满足';
		}
		  //得分项
		$scope.c6=mydata.data3;
		for(var i=0,j=$scope.c6.length;i<j;i++){
			$scope.c6[i].id=$scope.c6[i].title.split(' ')[0];
			$scope.c6[i].txt=$scope.c6[i].title.split(' ')[1];
			$scope.c6[i].score=$scope.c6[i].tsc;
			$scope.c6[i].score1=mypro.ps5?mypro.ps5[i]:0;
		}
		
		//page6
		  //控制项
		$scope.p7=mydata.datap[3].slists;
		for(var i=0,j=$scope.p7.length;i<j;i++){
			$scope.p7[i].m=$scope.data2[i+11]?'满足':'不满足';
		}
		  //得分项
		$scope.c7=mydata.data4;
		for(var i=0,j=$scope.c7.length;i<j;i++){
			$scope.c7[i].id=$scope.c7[i].title.split(' ')[0];
			$scope.c7[i].txt=$scope.c7[i].title.split(' ')[1];
			$scope.c7[i].score=$scope.c7[i].tsc;
			$scope.c7[i].score1=mypro.ps6?mypro.ps6[i]:0;
		}
		
		//page7
		  //控制项
		$scope.p8=mydata.datap[4].slists;
		for(var i=0,j=$scope.p8.length;i<j;i++){
			$scope.p8[i].m=$scope.data2[i+14]?'满足':'不满足';
		}
		  //得分项
		$scope.c8=mydata.data5;
		for(var i=0,j=$scope.c8.length;i<j;i++){
			$scope.c8[i].id=$scope.c8[i].title.split(' ')[0];
			$scope.c8[i].txt=$scope.c8[i].title.split(' ')[1];
			$scope.c8[i].score=$scope.c8[i].tsc;
			$scope.c8[i].score1=mypro.ps7?mypro.ps7[i]:0;
		}
		
		if(f!=1){
			//page8
			  //控制项
			$scope.p9=mydata.datap[5].slists;
			for(var i=0,j=$scope.p9.length;i<j;i++){
				$scope.p9[i].m=$scope.data2[i+21]?'满足':'不满足';
			}
			  //得分项
			$scope.c9=mydata.data6;
			for(var i=0,j=$scope.c9.length;i<j;i++){
				$scope.c9[i].id=$scope.c9[i].title.split(' ')[0];
				$scope.c9[i].txt=$scope.c9[i].title.split(' ')[1];
				$scope.c9[i].score=$scope.c9[i].tsc;
				$scope.c9[i].score1=mypro.ps8?mypro.ps8[i]:0;
			}
			
			//page9
			  //控制项
			$scope.p10=mydata.datap[6].slists;
			for(var i=0,j=$scope.p10.length;i<j;i++){
				$scope.p10[i].m=$scope.data2[i+25]?'满足':'不满足';
			}
			  //得分项
			$scope.c10=mydata.data7;
			for(var i=0,j=$scope.c10.length;i<j;i++){
				$scope.c10[i].id=$scope.c10[i].title.split(' ')[0];
				$scope.c10[i].txt=$scope.c10[i].title.split(' ')[1];
				$scope.c10[i].score=$scope.c10[i].tsc;
				$scope.c10[i].score1=mypro.ps9?mypro.ps9[i]:0;
			}
		}
		
		//page10
		  //得分项
		$scope.c11=mydata.data8;
		for(var i=0,j=$scope.c11.length;i<j;i++){
			$scope.c11[i].id=$scope.c11[i].title.split(' ')[0];
			$scope.c11[i].txt=$scope.c11[i].title.split(' ')[1];
			$scope.c11[i].score=$scope.c11[i].tsc;
			$scope.c11[i].score1=mypro.ps10?mypro.ps10[i]:0;
		}
		
	});
	
	$('#myprint').on('click',function(){
		/* $('#myframe>foem').css({
		   'height':'auto',
		   'overflow':'visible'
		}).printArea();  */
		window.print();
	})
	mychart(dsv,f);
	
}]);

var mychart=function(data,f){
	
	var series=[{name:'节地',data:[data.t3],stack:1},{name:'节能',data:[data.t4],stack:1},{name:'节水',data:[data.t5],stack:1},{name:'节材',data:[data.t6],stack:1},{name:'室内',data:[data.t7],stack:1},{name:'施工',data:[data.t8],stack:1},{name:'运营',data:[data.t9],stack:1}],
		last={name:'创新',data:[data.t10],stack:1};
	var s3={name:'三星',data:[30],stack:0,showInLegend:false},
		s2={name:'二星',data:[20],stack:0,showInLegend:false},
		s1={name:'一星',data:[10],stack:0,showInLegend:false},
		s0={name:'未达星级',data:[50],stack:0,showInLegend:false};
	
	var mycolor=['#058DC7','#50B432','#ED561B','#DDDF00','#24CBE5','#64E572','#FF9655','#FFF263','#00FF00','#00FF33','#00FF66','#00FF99'];
	if(f==1){
		series.length=5;
		mycolor=['#058DC7','#50B432','#ED561B','#DDDF00','#24CBE5','#64E572','#00FF00','#00FF33','#00FF66','#00FF99'];
	}
	
	series.push(last);
	series.reverse();
	series.push(s3);
	series.push(s2);
	series.push(s1);
	series.push(s0);
	
	Highcharts.setOptions({
		colors:mycolor
	});
	$('#mychart').highcharts({
		chart:{
			type:'bar'
		},
		title:{
			text:'项目得分情况',
			margin:0
		},
		xAxis:{
			//categories:['standard','score'],
			labels:{
				enabled:false
			},
			tickWidth:0
		},
		yAxis:{
			min:0,
			title:{
				text: ''
			},
			gridLineDashStyle:'longdash'
		},
		legend: {
			reversed: true,
		},
		credits:{
			enabled:false
		},
		plotOptions:{
			series: {
				stacking:'normal',
				dataLabels:{
					enabled:true,
					formatter:function(){
						if(this.series.name=='未达星级'||this.series.name=='一星'||this.series.name=='二星'||this.series.name=='三星'){
							return this.series.name;
						}
						else return this.series.yData[0];
					}/* ,
					color:(Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
					style:{
						textShadow:'0 0 3px black'
					} */
				},
				animation: {
					duration:1500
					//easing:'easeOutBounce'
				},
				//borderRadius:5,
				//colorByPoint:true,
				//colors:['red','green','yellow','gray','orange'],
				//colors:['#058DC7','#50B432','#ED561B','#DDDF00','#24CBE5','#64E572','#FF9655','#FFF263','#6AF9C4'],
				pointWidth:52,
				groupPadding: 0.1
			}
		},
		series:series
	});
}