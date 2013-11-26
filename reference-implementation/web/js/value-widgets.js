QLrt.BooleanValueWidget = function () {

	QLrt.Notifier.call(this);

	var elt = QLrt.mk('input').attr('type', 'checkbox').change(this.changeCallback);

	this.domElement = function () {
		return elt;
	};

	this.value = function (val) {
		return elt.prop('checked');
	};

	this.complete = function () {
		return true;
	};

};
QLrt.BooleanValueWidget.prototype = Object.create(QLrt.Notifier.prototype);


QLrt.MoneyValueWidget = function (options) {

	QLrt.Notifier.call(this);

	var /* val */ disabled = options && options.disabled;
	var elt = QLrt.mk('input').attr('type', 'text').prop('disabled', disabled).autoNumeric('init').change(this.changeCallback);

	this.domElement = function () {
		return elt;
	};

	this.value = function (val) {
		if (val === undefined) {
			return elt.autoNumeric('get');
		}
		elt.val(val);
	};

	this.complete = function () {
		return this.value() !== undefined;
	};

};
QLrt.MoneyValueWidget.prototype = Object.create(QLrt.Notifier.prototype);


QLrt.StringValueWidget = function () {

	QLrt.Notifier.call(this);

};
QLrt.StringValueWidget.prototype = Object.create(QLrt.Notifier.prototype);

