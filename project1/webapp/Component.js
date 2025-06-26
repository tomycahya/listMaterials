/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/Device", "project1/model/models"],
  function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("project1.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
        // Akan logout ketika tidak ada aktivitas selama 5 menit
        this._initIdleTimeout();
      },
      _initIdleTimeout: function () {
        var that = this;
        var timeout = 300000; // 5 menit
        var timer;

        var resetTimer = function () {
          clearTimeout(timer);
          timer = setTimeout(function () {
            sap.m.MessageBox.warning(
              "Session expired. Redirecting to login...",
              {
                onClose: function () {
                  that.getRouter().navTo("RouteView1", {}, true); // gunakan `that` di sini
                },
              }
            );
          }, timeout);
        };

        // Reset timer on user activity
        document.addEventListener("mousemove", resetTimer);
        document.addEventListener("keydown", resetTimer);
        resetTimer();
      },
    });
  }
);
