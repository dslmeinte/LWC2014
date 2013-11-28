$(document).ready(function() {

	// enums are realized as arrays of string literals:
	var quality = ['good', 'bad', "don't know"];

	/*
	 * The following code duplicates the structure and details of the example
	 * model in the assignment's text.
	 */
	var form = new QLrt.FormWidget({ name: "Box1HouseOwning", submitCallback: function () {} });
	var hasSoldHouse = new QLrt.SimpleFormElementWidget({ name: "hasSoldHouse", label: "Did you sell a house in 2010?", valueWidget: new QLrt.BooleanValueWidget() }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ name: "hasBoughtHouse", label: "Did you buy a house in 2010?", valueWidget: new QLrt.BooleanValueWidget() }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ name: "hasMaintLoan", label: "Did you enter a loan for maintenance/reconstruction?", valueWidget: new QLrt.BooleanValueWidget() }).appendTo(form);

	var group1 = (new QLrt.GroupWidget(new QLrt.LazyValue(
			function () { return [ hasSoldHouse ]; },
			function (hasSoldHouse) { return hasSoldHouse; }
		))).appendTo(form);
	var sellingPrice = (new QLrt.SimpleFormElementWidget({ name: "sellingPrice", label: "Price the house was sold for:", valueWidget: new QLrt.MoneyValueWidget() })).appendTo(group1);
	var privateDebt = (new QLrt.SimpleFormElementWidget({ name: "privateDebt", label: "Private debts for the sold house:", valueWidget: new QLrt.MoneyValueWidget() })).appendTo(group1);
	(new QLrt.SimpleFormElementWidget({ label: "Value residue:", valueWidget: new QLrt.MoneyValueWidget(new QLrt.LazyValue(
			function () { return [ sellingPrice, privateDebt ]; },
			function (sellingPrice, privateDebt) { return (sellingPrice === undefined || privateDebt === undefined ? undefined : sellingPrice - privateDebt); }
		)) })).appendTo(group1);

	// add to DOM:
	$('#QL-content').append(form.domElement());

	form.activate();

});

