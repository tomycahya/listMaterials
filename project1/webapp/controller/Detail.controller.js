sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History"
  ],
  function (Controller, MessageBox, History) {
    "use strict";

    return Controller.extend("project1.controller.detail", {
      onInit: function () {
        this.getOwnerComponent()
          .getRouter()
          .getRoute("RouteDetail")
          .attachPatternMatched(this.onattachPatternMatched, this);
      },
      
      onattachPatternMatched:function (params) {
        var oModel = this.getOwnerComponent().getModel()
        var ojsonModel = new sap.ui.model.json.JSONModel();
        var oBusyDialog = new sap.m.BusyDialog({
          title: "Loading...",
          text: "Please wait while the data is being loaded.",
        })
        
        // console.log(oModel)
        var index = params.getParameter("arguments").materialNo
        var oFilter = new sap.ui.model.Filter("materialno", "EQ", index);
        oBusyDialog.open()
          oModel.read("/getDataTytPolSet", {
            filters: [oFilter],
            success: function (oData) {
              oBusyDialog.close(); // Close busy indicator
              // console.log(oData.results[0]);
              ojsonModel.setData(oData.results[0]);
              this.getView().setModel(ojsonModel);
            }.bind(this),
            error: function (e) {
              oBusyDialog.close(); // Close busy indicator
              MessageBox.error("Error fetching data: " + e.message);
            }
          });
      },
      onNavBack: function () {
        var oHistory, sPreviousHash;

        oHistory = History.getInstance();
        sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getOwnerComponent().getRouter().navTo("RouteData");
        }
      },
    });
  }
);
