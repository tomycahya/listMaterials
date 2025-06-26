sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  function (BaseController, History) {
    "use strict";

    return BaseController.extend("project1.controller.Data", {
      onInit: function () {},
      onNavBack() {
        var that = this
        sap.m.MessageBox.error("Apakah Anda yakin ingin keluar?", {
          title: "Information",
          actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
          emphasizedAction: sap.m.MessageBox.Action.NO,
          onClose: function (oAction) {
            if (oAction === sap.m.MessageBox.Action.YES) {
              const oHistory = sap.ui.core.routing.History.getInstance();
              const sPreviousHash = oHistory.getPreviousHash();

              if (sPreviousHash !== undefined) {
                window.history.go(-1);
              } else {
                const oRouter = that.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView1", {}, true);
              }
            }
          },
        });
      },
    });
  }
);
