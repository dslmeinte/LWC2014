$(document).ready(function() {
	function updateElt1() {
		$('#elt1').toggle( $('#elt2').prop('checked') );
	}
	updateElt1();
	$('#elt2').change(updateElt1);
	$('#elt3').autoNumeric('init');
	$('#elt4').autoNumeric('init');
	$('#elt5').autoNumeric('init');
	function updateElt5() {
		$('#elt5').val( (($('#elt3').autoNumeric('get')) - ($('#elt4').autoNumeric('get'))) );
	}
	updateElt5();
	$('#elt4').change(updateElt5);
	$('#elt3').change(updateElt5);
	function form1FilledIn() {
		return( false );
	};
});

