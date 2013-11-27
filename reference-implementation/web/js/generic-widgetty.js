/*
 * Some generic code useful for doing "widgetty stuff"...
 */


/**
 * Convenience function wrapping $('<... class="...">).
 */
QLrt.mk = function (tagName, className) {
	var elt = $('<' + tagName + '></' + tagName + '>');
	if (className !== undefined) {
		elt.addClass(className);
	}
	return elt;
};


/**
 * Base type.
 */
QLrt.Child = function () {

	var parent = null;

	this.setParent = function (parent_) {
		if (parent !== null) {
			throw "parent cannot be re-set";
		}
		parent = parent_;
	};

	this.appendTo = function (parent_) {
		this.setParent(parent_);
		if (parent.append !== undefined) {
			parent.append(this);
		}
		return this;	// for chaining
	};

	this.changed = function () {
		parent.changed();
	};

};

