sap.ui.define(
  ["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator"],
  function (Controller,MessageBox,BusyIndicator) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
      onInit: function () {},
      onLoginPress: function () {
        var that = this
        var payload = {
          userName: this.getView().byId("usernameInput").getValue().toUpperCase(),
        };

        var odata = this.getView().getModel();
        //   var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl);
        var sEntityPath = "/loginUserSet";
        BusyIndicator.show(0)
        odata.create(sEntityPath, payload, {
          success: function (res) {
             BusyIndicator.hide()
            if(res.responCode === 200) {
              localStorage.setItem("name", res.name);
              localStorage.setItem("userName", res.userName);
              localStorage.setItem("persNumber", res.persNumber);
              MessageBox.success(res.responText, {onClose: function () {
                  that.getOwnerComponent().getRouter().navTo("RouteData");
                },})
              
              
            }
            else {
              BusyIndicator.hide()
              MessageBox.error(res.responText);
              this.clearForm()
            }

          }.bind(this),
          error: function (e) {
            BusyIndicator.hide()
            MessageBox.error("Error", e)
          }.bind(this),
        });
      },

      clearForm: function () {
        this.getView().byId("usernameInput").setValue("");
      }
    });
  }
);
