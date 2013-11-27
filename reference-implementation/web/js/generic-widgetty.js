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
		parent = parent_;
	};

	this.changed = function () {
		parent.changed();
	};

};

