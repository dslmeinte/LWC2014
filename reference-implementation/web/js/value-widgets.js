/*
 * Implementations of ValueWidgets, i.e. widgets which holds and visualize a value.
 */


QLrt.BooleanValueWidget = function (options) {

	QLrt.Child.call(this);

	var self = this;

	var /* val */ disabled = options && options.disabled;
	var elt = QLrt.mk('input').attr('type', 'checkbox').prop('disabled', disabled).change(self.changed);

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
QLrt.BooleanValueWidget.prototype = Object.create(QLrt.Child.prototype);


QLrt.MoneyValueWidget = function (options) {

	QLrt.Child.call(this);

	var self = this;

	var /* val */ disabled = options && options.disabled;
	var elt = QLrt.mk('input').attr('type', 'text').autoNumeric('init').prop('disabled', disabled).change(self.changed);

	this.domElement = function () {
		return elt;
	};

	this.value = function (val) {
		if (val === undefined) {
			return elt.autoNumeric('get');
		}
		elt.autoNumeric('set', ( typeof(val) === 'number' ? val : "" ));
	};

	this.complete = function () {
		return this.value() !== "";
	};

};
QLrt.MoneyValueWidget.prototype = Object.create(QLrt.Child.prototype);


QLrt.StringValueWidget = function () {

	QLrt.Child.call(this);

	// TODO  implement

};
QLrt.StringValueWidget.prototype = Object.create(QLrt.Child.prototype);


