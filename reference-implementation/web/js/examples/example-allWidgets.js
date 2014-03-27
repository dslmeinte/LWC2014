$(document).ready(function() {

	var form = new QLrt.FormWidget({ name: "Widgets gallery", submitCallback: persist});

	new QLrt.TextWidget({ text: "This form contains an example for each of the available widgets." }).appendTo(form);

	var valueSection = new QLrt.SectionWidget({ label: "Value input" }).appendTo(form);
	var computedSection = new QLrt.SectionWidget({ label: "Computed values (definedness-check)" }).appendTo(form);

	var stringValue = new QLrt.SimpleFormElementWidget({ name: "string value", label: "String value:", valueWidget: new QLrt.StringValueWidget()}).appendTo(valueSection);
	new QLrt.SimpleFormElementWidget({ label: "string defined?", valueWidget: new QLrt.BooleanValueWidget(
		new QLrt.LazyValue(function () { return [ stringValue ]; }, function (stringValue) { return stringValue !== undefined; }, true)
	) }).appendTo(computedSection);
	var qualityEnum = [ "good", "bad", "don't know" ];
	var enumValue = new QLrt.SimpleFormElementWidget({ name: "enum value", label: "Enum value - Quality:", valueWidget: new QLrt.EnumValueWidget(qualityEnum) }).appendTo(valueSection);
	new QLrt.SimpleFormElementWidget({ label: "enum choice defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ enumValue ]; }, function (enumValue) { return enumValue !== undefined; }, true)
		) }).appendTo(computedSection);
	new QLrt.SimpleFormElementWidget({ label: "enum choice:", valueWidget: new QLrt.StringValueWidget(
			new QLrt.LazyValue(function () { return [ enumValue ]; }, function (enumValue) { return enumValue; })
		) }).appendTo(computedSection);

	var dateValue = new QLrt.SimpleFormElementWidget({ name: "date value", label: "Date value:", valueWidget: new QLrt.DateValueWidget() }).appendTo(valueSection);
	new QLrt.SimpleFormElementWidget({ label: "date value defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ dateValue ]; }, function (dateValue) { return dateValue !== undefined; }, true)
		) }).appendTo(computedSection);

	var integerValue = new QLrt.SimpleFormElementWidget({ name: "integer value", label: "Integer value:", valueWidget: new QLrt.IntegerValueWidget() }).appendTo(valueSection);
	new QLrt.SimpleFormElementWidget({ label: "integer value defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ integerValue ]; }, function (integerValue) { return integerValue !== undefined; }, true)
		) }).appendTo(computedSection);

	var decimalValue = new QLrt.SimpleFormElementWidget({ name: "decimal value", label: "Decimal value:", valueWidget: new QLrt.DecimalValueWidget() }).appendTo(valueSection);
	new QLrt.SimpleFormElementWidget({ label: "decimal value defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ decimalValue ]; }, function (decimalValue) { return decimalValue !== undefined; }, true)
		) }).appendTo(computedSection);

	var integerRangeValue = new QLrt.SimpleFormElementWidget({ name: "integer range value", label: "Integer range value:", valueWidget: new QLrt.RangeValueWidget({ min: 0, max: 10, type: 'integer' }) }).appendTo(valueSection);
	new QLrt.SimpleFormElementWidget({ label: "integer range value", valueWidget: new QLrt.IntegerValueWidget(
			new QLrt.LazyValue(function () { return [ integerRangeValue ]; }, function (integerValue) { return integerValue; }, true)
		) }).appendTo(computedSection);

	var booleanValue = new QLrt.SimpleFormElementWidget({ name: "boolean value", label: "Boolean value:", valueWidget: new QLrt.BooleanValueWidget() }).appendTo(valueSection);
	new QLrt.SimpleFormElementWidget({ label: "boolean value defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ booleanValue ]; }, function (booleanValue) { return booleanValue !== undefined; }, true)
		) }).appendTo(computedSection);

	$('#QL-content').append(form.domElement());
	form.activate();

	function persist (data) {
		localStorage['QL-persist'] = JSON.stringify(data);
	}

});

