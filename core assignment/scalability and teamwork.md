# Scalability suggestions #

# Introduction #
In the focus assignment for LWC2014, we specifically referred to 

* People working concurrently on a single model and/or language definition
* The size of models, in terms of elements (i.e. large questionnaires, or complex layouts in 
QLS)

In this document, we provide some hints as to what could be useful ways of demonstrating how a language workbench supports this.

# An example case #
Envision a situation where a team of 4-5 people are working on creation of an online tax reporting application, in which QL is used to define the question forms involved.
In these questionnaires, it is obvious that

* the amount of questions is large
* many questions are conditioned by answers to other questions

This case can be used as a basis for the team collaboration and scalability assignment. Having a team of 4-5 people working on possibly related parts of the tax form questionnaire will lead to overlap in questions they touch, changes made in other peoples parts of the questionnaire due to dependencies etc. How does a language workbench deal with this in terms of e.g. concurrent editing support, sharing of models, merging and versioning, ....

At the same time, tax forms get quite big, especially when multiple forms of income tax are involved. How does this affect he language workbench and its users, performance, ....

# An easier to implement suggestion #
Of course, tax forms are different per country, and not completely trivial to reimplement as part of a workshop assignment that you will only have a limited amount of time to work on.
Therefor, we suggest the following: generate a large questionaire that implements a binary search tree. If done properly, such a questionnaire can be used to demonstrate how you solve the same issues you would encounter with a tax form - both in terms of size and in team cooperation.