const activarDropdown = () => {
	$(".dropdown-content").hide();

	$(".drop-div").on("click", function(){
		var content = $(this).next();
		// "!" = "No"
		if(!content.is(":visible")){
			content.slideDown();
			$(".dropdown-content").not(content).slideUp();
		} else {
			content.slideUp();
		}
	});
}