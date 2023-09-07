/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"usil_configuracion_portal_reserva/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
