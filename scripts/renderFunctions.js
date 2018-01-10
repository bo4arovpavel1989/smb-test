(function(){
	var statRenderFunctions=[];
	
	statRenderFunctions[0] = function(results,formFields){	
		/*
		var context = {results:results};	
		$('#loadResults').empty();
		var source   = $("#results_table").html();
		var template = Handlebars.compile(source);
		var html    = template(context);
		$('#loadResults').append(html);*/
		renderHeader(formFields);
		$("#gridContainer").show();
		$("#gridContainer").dxDataGrid({
			dataSource: results,
			selection: {
				mode: "multiple"
			},
			"export": {
				enabled: true,
				fileName: "Результаты тестирования",
				allowExportSelectedData: true
			},
			groupPanel: {
				visible: true
			},
			columns: [
				{
					dataField: "surname",
					caption: "Фамилия",
					width: 150
				}, 
				{
					dataField: "name",
					caption: "Имя",
					width: 150
				}, 
				{
					dataField: "parentname",
					caption: "Отчество",
					width: 150
				},
				{
					dataField: "relation",
					caption: "Результат, %",
					width: 150
				}, {
					dataField: "date",
					caption: "Дата",
					dataType: "date",
					width: 150
				}     
			]
		});
		$("#gridContainer").show();
	}
	
	statRenderFunctions[1] = function(results,formFields){
		$('#header_here').empty();
		var context = {shift:formFields.shift};
		if(formFields.dept=='1') context.dept = 'оперативной группы'
		else if(formFields.dept=='2') context.dept = 'суточной смены'
		var visualData=[];
		results.forEach(function(result,index){
			var date = new Date(result.date);
			var fullName = result.surname.charAt(0).toUpperCase() + 
			result.surname.slice(1).toLowerCase()+
			result.name.charAt(0).toUpperCase()+
			result.parentname.charAt(0).toUpperCase()+' ('+
			date.getFullYear()+'-'+
			(date.getMonth()+1)+'-'+
			date.getDate()+')';
			var relation = result.relation;
			visualData.push({name:fullName,relation:relation});
		});
		$("#chart").show();
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
			argumentAxis: { 
				label: {
					displayMode: "stagger",
					staggeringSpacing: 10
				}
			},
			title: { 
				text: "Результаты тестирования сотрудников "+ context.dept+' №'+context.shift
			}
		});
		$("#chart").show();
	}
	
	statRenderFunctions[2] = function(data,formFields){
		var dataToShow = [
			{mark:'отлично',relation:0},
			{mark:'хорошо',relation:0},
			{mark:'удовлетворительно',relation:0},
			{mark:'неудовлетворительно',relation:0}
		];
		calculateDataForPie();
		var context = {shift:formFields.shift};
		if(formFields.dept=='1') context.dept = 'оперативной группы'
		else if(formFields.dept=='2') context.dept = 'суточной смены'
		$('#header_here').empty();
		$("#pie").show();
		$("#pie").dxPieChart({
			size: {
				width: 1000
			},
			palette: "bright",
			dataSource: dataToShow,
			series: [
				{
					argumentField: "mark",
					valueField: "relation",
					label: {
						visible: true,
						connector: {
							visible: true,
							width: 1
						}
					}
				}
			],
			diameter:0.7,
			legend: {
				position: "inside",
				horizontalAlignment: "center",
				verticalAlignment: "bottom"
			},
			title: "Результаты тестирования сотрудников "+ context.dept+' №'+context.shift,
			"export": {
				enabled: true
			},
			onPointClick: function (e) {
				var point = e.target;
				toggleVisibility(point);
			},
			onLegendClick: function (e) {
				var arg = e.target;
		
				toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
			}
		});
		
		function toggleVisibility(item) {
			if(item.isVisible()) {
				item.hide();
			} else { 
				item.show();
			}
		}
		
		function calculateDataForPie(){
			data.forEach(function(d){
				console.log(d)
				if(d.relation>=90)dataToShow[0].relation++;
				if(d.relation>=80 && d.relation<90)dataToShow[1].relation++;
				if(d.relation>=50 && d.relation<80)dataToShow[2].relation++;
				else dataToShow[3].relation++;
			});
		}
		
		$("#pie").show();		
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
		var source   = $("#results_header").html();
		var template = Handlebars.compile(source);
		var html    = template(context);
		$('#header_here').append(html);	
	}
	
	window.renderHeader=renderHeader;
	window.statRenderFunctions = statRenderFunctions;
	window.questionRenderFunctions = questionRenderFunctions;
})();