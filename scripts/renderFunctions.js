(function(){
	var statRenderFunctions=[];
	
	statRenderFunctions[0] = function(results){	
		var context = {results:results};	
		$('#loadResults').empty();
		var source   = $("#results_table").html();
		var template = Handlebars.compile(source);
		var html    = template(context);
		$('#loadResults').append(html);
	}
	
	statRenderFunctions[1] = function(results){
		var visualData=[];
		results.forEach(function(result,index){
			var date = new Date(result.date);
			var fullName = result.surname.charAt(0).toUpperCase() + 
			result.surname.slice(1).toLowerCase()+
			result.name.charAt(0).toUpperCase()+
			result.parentname.charAt(0).toUpperCase()+' ('+
			date.getFullYear()+'-'+
			(date.getMonth()+1)+'-'+
			(date.getDate()+1)+')';
			var relation = result.relation;
			visualData.push({name:fullName,relation:relation});
		});
		
		 $("#chart").dxChart({
			dataSource: visualData, 
			series: {
				argumentField: "name",
				valueField: "relation",
				name: "результат,%",
				type: "bar",
				color: '#1DF7AA'
			},
			"export": {
				enabled: true
			},
			title: { 
				text: "Результаты тестирования сотрудников оперативной группы №1"
			}
		});
	}
	
	statRenderFunctions[2] = function(data){
		
	}
		
	var questionRenderFunctions = function(questions,q,a){
		var context = {question:q, questions:questions,answer:''};
		
		if(a==0) context.answer='правильный';
		else if(a==1) context.answer='частично-верный';
		else context.answer='неверный';
		
		$('#loadQuestions').empty();
		var source   = $("#questions_table").html();
		var template = Handlebars.compile(source);
		var html    = template(context);
		$('#loadQuestions').append(html);
	}
	
	var renderHeader = function(formFields){
		var context = {shift:formFields.shift};
		if(formFields.dept=='1') context.dept = 'оперативной группы'
		else if(formFields.dept=='2') context.dept = 'суточной смены'
		
		$('#header_here').empty();
		if($('.dxc-title').find('text').length>0){
			$('.dxc-title').find('text').text('Результаты тестирования сотрудников '+context.dept+' №'+context.shift);
		}else{	
			var source   = $("#results_header").html();
			var template = Handlebars.compile(source);
			var html    = template(context);
			$('#header_here').append(html);
		}	
	}
	
	window.renderHeader=renderHeader;
	window.statRenderFunctions = statRenderFunctions;
	window.questionRenderFunctions = questionRenderFunctions;
})();