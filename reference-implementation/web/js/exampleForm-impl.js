$(document).ready(function() {

	// enums are realized as arrays of string literals:
	var quality = ['good', 'bad', "don't know"];

	/*
	 * The following code duplicates the structure and details of the example
	 * model in the assignment's text.
	 */
	var form = new QLrt.FormWidget({ name: "Box1HouseOwning", updateCallback: update, submitCallback: function () {} });
	var hasSoldHouse = new QLrt.SimpleFormElementWidget({ label: "Did you sell a house in 2010?", value: new QLrt.BooleanValueWidget() }).appendTo(form);
	var hasBoughtHouse = new QLrt.SimpleFormElementWidget({ label: "Did you buy a house in 2010?", value: new QLrt.BooleanValueWidget() }).appendTo(form);
	var hasMaintLoan = new QLrt.SimpleFormElementWidget({ label: "Did you enter a loan for maintenance/reconstruction?", value: new QLrt.BooleanValueWidget() }).appendTo(form);

	var group1 = (new QLrt.GroupWidget()).appendTo(form);
	var sellingPrice = (new QLrt.SimpleFormElementWidget({ label: "Price the house was sold for:", value: new QLrt.MoneyValueWidget() })).appendTo(group1);
	var privateDebt = (new QLrt.SimpleFormElementWidget({ label: "Private debts for the sold house:", value: new QLrt.MoneyValueWidget() })).appendTo(group1);
	var valueResidue = (new QLrt.SimpleFormElementWidget({ label: "Value residue:", value: new QLrt.MoneyValueWidget({ disabled: true }) })).appendTo(group1);

	// add to DOM:
	$('#QL-content').append(form.domElement());

	// updates the entire view:
	function update () {
		group1.visible(hasSoldHouse.value());
		if (sellingPrice.complete() && privateDebt.complete()) {
			valueResidue.value(sellingPrice.value() - privateDebt.value());
		}
		// TODO  introduce a Complete monad
	}

	form.activate();

});

