$(function(){
	$("#filters button").click(function(){
		$(this).toggleClass("active");
	});

	$(document).on("focus",".search-bar > input",function(){
		$(this).parent().addClass("active");
	})
	.on("blur",".search-bar > input",function(){
		$(this).parent().removeClass("active");
	});
});