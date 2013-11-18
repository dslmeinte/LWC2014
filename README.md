Language Workbench Challenge 2014
=================================

This repository holds the _reference implementation_ for the semantics of the QL and QLS languages,
as defined in the [assignment](http://www.languageworkbenches.net/wp-content/uploads/2013/11/Call-for-Participation.pdf).
Specifically, it implements the example questionnaire shown in the assignment.

**Status of implementation**: under construction


## Architecture of implementation

(Or "architecture", really...)

Characteristics:
* Technology: HTML5, i.e. HTML+JavaScript+CSS
* Widget-based: the input elements render into the DOM and encapsulate required logic
* Reactive: input elements signal when their input has changed, so changes can be propagated
* Storage: ```localstorage``` is used to store the questionnaire input (as JSON)

The implementation of the example questionnaire is geared towards code generation in the sense that it builds up the necessary code corresponding to the example model directly in JavaScript, instead of interpreting a data structure.
However, the interpretative style should be equally simple to realize, depending on the concrete JavaScript syntax of the model.


## Repository organization

The repository contains (currently) one folder holding an Eclipse JavaScript project with the implementation.

