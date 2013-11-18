function mkSimpleFormElement(id, label, inputElt) {
	var divElt = $('<div>').addClass('simpleFormElement');
	var labelElt = $('<label>').attr('for', id);
	divElt.append(labelElt);
	divElt.append(inputElt);
}
