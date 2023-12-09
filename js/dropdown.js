

$(document).ready(function(){
	
	var sections = $('span').hide();
	
	$("p").click(function(){
		var dv_apa = $(this).parent().next();
		// "!" = "No"
		if(!dv_apa.is(":visible")){
			dv_apa.slideDown();
			$("span").not(dv_apa).slideUp();
		} else {
			dv_apa.slideUp();
		}
	});
});


