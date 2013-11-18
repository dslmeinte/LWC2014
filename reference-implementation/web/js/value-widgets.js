QLrt.BooleanInputWidget = function () {

	var elt = QLrt.mk('input').attr('type', 'checkbox');

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


QLrt.MoneyInputWidget = function (options) {

	var /* val */ disabled = options && options.disabled;
	var elt = QLrt.mk('input').attr('type', 'text').prop('disabled', disabled).autoNumeric('init');

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


QLrt.StringInputWidget = function () {};


