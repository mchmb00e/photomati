const activarDropdown = () => {
	$(".dropdown-content").hide();
	$(".dropdown-content").first().slideDown();

	$(".drop-div").on("click", function() {

		var content = $(this).next();
		// "!" = "No"
		if(!content.is(":visible")){
			content.slideDown();
			$(".dropdown-content").not(content).slideUp();
		} else {
			content.slideUp();
		}
	});

	$("#boton-siguiente").on("click", (e) => {
		$(".dropdown-content").each(function() {
			if ($(this).is(":visible") && $(this).next().next().length > 0) {
				
				$("#steps").animate({
					scrollTop: $(this).offset().top - $("#showResult").offset().top + $("#steps").scrollTop()
				}, 500);
				$(this).slideUp();
				$(this).next().next().slideDown();
				
				return false;
			}
		});
	});
}