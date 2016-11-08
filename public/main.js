$(document).ready(function(){
	
	$("#submit").on("click", function(){
		
		if(!$("#authorInput").val().trim()===""&&!$("#titleInput").val().trim()==""){
		
		$.ajax({
			
			url:"/submit",
			type:"POST",
			data: {
				title: $("#titleInput").val(),
				author: $("#authorInput").val()
			},
			success: function(){
				console.log("stored!");
				$("p").html("book stored!");
			}
			
		});
		}
		
		else{
			$("p").html("book not stored!");
		}
	});
	
	$("#title").on("click", function(){
		
		$.ajax({
			
			url:"/title",
			type: "POST",
			dataType:"json",
			data: {
				titles: $("#titleSearch").val()
			},
			success: function(res){
				$("p").html(JSON.stringify(res));
				console.log(res);
			}
			
		});
		
	});
	
	$("#author").on("click", function(){
		
		
		$.ajax({
			
			url: "/author",
			type:"POST",
			dataType: "json",
			data:{
				authors: $("#authorSearch").val()
			},
			success: function(res){
				$("p").html(JSON.stringify(res));
				console.log(res);
			}
			
		})
	});
	
});