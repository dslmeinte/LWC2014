$(document).ready(function() {

	var form = new QLrt.FormWidget({ name: "Widgets gallery", submitCallback: persist});

	var stringValue = new QLrt.SimpleFormElementWidget({ name: "string value", label: "string value", valueWidget: new QLrt.StringValueWidget()}).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "string defined?", valueWidget: new QLrt.BooleanValueWidget(
		new QLrt.LazyValue(function () { return [ stringValue ]; }, function (stringValue) { return stringValue !== undefined; }, true)
	) }).appendTo(form);

	var qualityEnum = [ "good", "bad", "don't know" ];
	var enumValue = new QLrt.SimpleFormElementWidget({ name: "enum value", label: "enum value; Quality:", valueWidget: new QLrt.EnumValueWidget(qualityEnum) }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "enum choice defined?", valueWidget: new QLrt.BooleanValueWidget(
			new QLrt.LazyValue(function () { return [ enumValue ]; }, function (enumValue) { return enumValue !== undefined; }, true)
		) }).appendTo(form);
	new QLrt.SimpleFormElementWidget({ label: "enum choice:", valueWidget: new QLrt.StringValueWidget(
			new QLrt.LazyValue(function () { return [ enumValue ]; }, function (enumValue) { return enumValue; })
		) }).appendTo(form);

	$('#QL-content').append(form.domElement());
	form.activate();

	function persist (data) {
		localStorage['QL-persist'] = JSON.stringify(data);
	}

});

