/*global QUnit*/

sap.ui.define([
	"usil_configuracion_portal_reserva/controller/Home.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Home Controller");

	QUnit.test("I should test the Home controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
