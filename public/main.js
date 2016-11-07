$(document).ready(function(){
	
	$("#submit").on("click", function(){
		
		$.ajax({
			
			url:"/submit",
			type:"POST",
			data: {
				title: $("#titleInput").val(),
				author: $("#authorInput").val()
			}
			
		});
		
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