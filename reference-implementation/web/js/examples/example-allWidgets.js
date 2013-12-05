$(document).ready(function() {

	var form = new QLrt.FormWidget({ name: "Widgets gallery", submitCallback: persist});

	var stringValue = new QLrt.SimpleFormElementWidget({ name: "string value", label: "String value:", valueWidget: new QLrt.StringValueWidget()}).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "string defined?", valueWidget: new QLrt.BooleanValueWidget(
		new QLrt.LazyValue(function () { return [ stringValue ]; }, function (stringValue) { return stringValue !== undefined; }, true)
	) }).appendTo(form);

	var qualityEnum = [ "good", "bad", "don't know" ];
	var enumValue = new QLrt.SimpleFormElementWidget({ name: "enum value", label: "Enum value - Quality:", valueWidget: new QLrt.EnumValueWidget(qualityEnum) }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "enum choice defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ enumValue ]; }, function (enumValue) { return enumValue !== undefined; }, true)
		) }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "enum choice:", valueWidget: new QLrt.StringValueWidget(
			new QLrt.LazyValue(function () { return [ enumValue ]; }, function (enumValue) { return enumValue; })
		) }).appendTo(form);

	var dateValue = new QLrt.SimpleFormElementWidget({ name: "date value", label: "Date value:", valueWidget: new QLrt.DateValueWidget() }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "date value defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ dateValue ]; }, function (dateValue) { return dateValue !== undefined; }, true)
		) }).appendTo(form);

	var integerValue = new QLrt.SimpleFormElementWidget({ name: "integer value", label: "Integer value:", valueWidget: new QLrt.IntegerValueWidget() }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "integer value defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ integerValue ]; }, function (integerValue) { return integerValue !== undefined; }, true)
		) }).appendTo(form);

	var decimalValue = new QLrt.SimpleFormElementWidget({ name: "decimal value", label: "Decimal value:", valueWidget: new QLrt.DecimalValueWidget() }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "decimal value defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ decimalValue ]; }, function (decimalValue) { return decimalValue !== undefined; }, true)
		) }).appendTo(form);

	var integerRangeValue = new QLrt.SimpleFormElementWidget({ name: "integer range value", label: "Integer range value:", valueWidget: new QLrt.RangeValueWidget({ min: 0, max: 10, type: 'integer' }) }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "integer range value", valueWidget: new QLrt.IntegerValueWidget(
			new QLrt.LazyValue(function () { return [ integerRangeValue ]; }, function (integerValue) { return integerValue; }, true)
		) }).appendTo(form);

	$('#QL-content').append(form.domElement());
	form.activate();

	function persist (data) {
		localStorage['QL-persist'] = JSON.stringify(data);
	}

});

