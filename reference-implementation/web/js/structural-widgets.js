/*
 * Widgets that take care of structure.
 */

QLrt.FormWidget = function (settings) {

	if (typeof (settings) !== 'object' || settings.name === undefined
			|| settings.submitCallback === undefined
			|| settings.updateCallback === undefined) {
		throw "invalid or incomplete settings";
	}

	var outerContainer = QLrt.mk('div').hide().append(QLrt.mk('h2').text('Form: ' + settings.name));
	var innerContainer = QLrt.mk('div', 'form').appendTo(outerContainer);
	var submitButton = QLrt.mk('button').prop('disabled', true).append("Submit").appendTo(outerContainer).click(settings.onsubmit);

	this.domElement = function () {
		return outerContainer;
	};

	var children = [];

	this.append = function (widget) {
		children.push(widget);
		innerContainer.append(widget.domElement());
		if (widget instanceof QLrt.Child) {
			widget.setParent(this);
		}
	};

	this.changed = function () {
		settings.updateCallback();
		submitButton.prop('disabled', !this.complete());
	};

	this.activate = function () {
		this.changed();			// initial setting of correct visualization
		outerContainer.show();
	};

	this.complete = function () {
		return _.all(children, function (subWidget) { return subWidget.complete(); });
	};

};


QLrt.GroupWidget = function (settings) {

	QLrt.Child.call(this);

	var container = QLrt.mk('div', 'group');

	this.domElement = function () {
		return container;
	};

	var children = [];

	this.append = function (widget) {
		children.push(widget);
		container.append(widget.domElement());
		if (widget instanceof QLrt.Child) {
			widget.setParent(this);
		}
	};

	this.appendTo = function (parent) {
		this.setParent(parent);
		parent.append(this);
		return this;	// for chaining
	};

	var visible_ = true;

	this.visible = function (val) {
		visible_ = val;
		container.toggle(val);
	};

	this.complete = function () {
		return !visible_ || _.all(children, function (subWidget) { return subWidget.complete(); });
	};

};
QLrt.GroupWidget.prototype = Object.create(QLrt.Child.prototype);


QLrt.SimpleFormElementWidget = function (settings) {

	QLrt.Child.call(this);

	if (typeof (settings) !== 'object' || settings.label === undefined
			|| settings.valueWidget === undefined) {
		throw "invalid or incomplete settings";
	}

	if (settings.valueWidget instanceof QLrt.Child) {
		settings.valueWidget.setParent(this);
	}

	var outerContainer = QLrt.mk('div', 'simpleFormElement');
	QLrt.mk('label').appendTo(outerContainer).append(settings.label).append(settings.valueWidget.domElement());

	this.domElement = function () {
		return outerContainer;
	};

	this.appendTo = function (parent) {
		this.setParent(parent);
		parent.append(this);
		return this;	// for chaining
	};

	this.value = function () {
		return settings.valueWidget.value();
	};

	this.setValue = function (val) {
		return settings.valueWidget.setValue(val);
	};

	this.complete = function () {
		return settings.valueWidget.complete();
	};

};
QLrt.SimpleFormElementWidget.prototype = Object.create(QLrt.Child.prototype);


// TODO  introduce QLrt.BaseCompoundWidget having children

