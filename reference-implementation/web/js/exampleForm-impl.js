$(document).ready(function() {

	// enums are realized as arrays of string literals:
	var quality = ['good', 'bad', "don't know"];

	/*
	 * The following code duplicates the structure and details of the example
	 * model in the assignment's text.
	 */
	var form = new QLrt.FormWidget({ name: "Box1HouseOwning", render: update });
	var hasSoldHouse = new QLrt.SimpleFormWidget({ label: "Did you sell a house in 2010?", input: new QLrt.BooleanInputWidget() }).appendTo(form);
	var hasBoughtHouse = new QLrt.SimpleFormWidget({ label: "Did you buy a house in 2010?", input: new QLrt.BooleanInputWidget() }).appendTo(form);
	var hasMaintLoan = new QLrt.SimpleFormWidget({ label: "Did you enter a loan for maintenance/reconstruction?", input: new QLrt.BooleanInputWidget() }).appendTo(form);

	var group1 = (new QLrt.GroupWidget()).appendTo(form);
	var sellingPrice = (new QLrt.SimpleFormWidget({ label: "Price the house was sold for:", input: new QLrt.MoneyInputWidget() })).appendTo(group1);
	var privateDebt = (new QLrt.SimpleFormWidget({ label: "Private debts for the sold house:", input: new QLrt.MoneyInputWidget() })).appendTo(group1);
	var valueResidue = (new QLrt.SimpleFormWidget({ label: "Value residue:", input: new QLrt.MoneyInputWidget({ disabled: true }) })).appendTo(group1);

	// add to DOM:
	$('#QL-content').append(form.domElement());

	// updates the entire view:
	function update () {
		group1.visible(hasSoldHouse.value());
		valueResidue.value(sellingPrice.complete() && privateDebt.complete() ? ( sellingPrice.value() - privateDebt.value() ) : undefined );
		// (would like to use an Option monad for this)
	}

	form.activate();

});

