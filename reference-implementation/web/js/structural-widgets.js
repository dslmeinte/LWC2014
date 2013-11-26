QLrt.FormWidget = function (settings) {

	if (typeof (settings) !== 'object' || settings.name === undefined
			|| settings.submitCallback === undefined
			|| settings.updateCallback === undefined) {
		throw "invalid or incomplete settings";
	}

	var outerContainer = QLrt.mk('div').hide().append(QLrt.mk('h2').text('Form: ' + settings.name));
	var innerContainer = QLrt.mk('div', 'form').appendTo(outerContainer);
	var submitButton = QLrt.mk('button').prop('disabled', true).appendTo(outerContainer).click(settings.onsubmit);

	this.domElement = function () {
		return outerContainer;
	};

	var children = [];

	this.append = function (widget) {
		children.push(widget);
		innerContainer.append(widget.domElement());
		if (widget instanceof QLrt.Notifier) {
			widget.setListener(this);
		}
	};

	this.globalUpdate = function () {
		settings.updateCallback();
		submitButton.prop('disabled', !this.complete());
	};

	this.activate = function () {
		this.globalUpdate();	// initial setting of correct visualization
		outerContainer.show();
	};

	this.complete = function () {
		return _.all(children, function (subWidget) { return subWidget.complete(); });
	};

};


QLrt.GroupWidget = function (settings) {

	QLrt.Notifier.call(this);

	var container = QLrt.mk('div', 'group');

	this.domElement = function () {
		return container;
	};

	var children = [];

	this.append = function (widget) {
		children.push(widget);
		container.append(widget.domElement());
		if (widget instanceof QLrt.Notifier) {
			widget.setListener(this);
		}
	};

	this.appendTo = function (parent) {
		parent.append(this);
		return this;	// for chaining
	};

	var visible_ = true;

	this.visible = function (val) {
		visible_ = val;
		container.toggle(val);
	};

	this.complete = function () {
		return visible_ && _.all(children, function (subWidget) { return subWidget.complete(); });
	};

};
QLrt.GroupWidget.prototype = Object.create(QLrt.Notifier.prototype);


QLrt.SimpleFormElementWidget = function (settings) {

	QLrt.Notifier.call(this);

	if (typeof (settings) !== 'object' || settings.label === undefined
			|| settings.value === undefined) {
		throw "invalid or incomplete settings";
	}

	if (settings.value instanceof QLrt.Notifier) {
		settings.value.setListener(this);
	}

	var outerContainer = QLrt.mk('div', 'simpleFormElement');
	QLrt.mk('label').appendTo(outerContainer).append(settings.label).append(settings.value.domElement());

	this.domElement = function () {
		return outerContainer;
	};

	this.appendTo = function (parent) {
		parent.append(this);
		return this;	// for chaining
	};

	this.value = function () {
		return settings.value.value();
	};

	this.complete = function () {
		return settings.value.complete();
	};

};
QLrt.SimpleFormElementWidget.prototype = Object.create(QLrt.Notifier.prototype);



