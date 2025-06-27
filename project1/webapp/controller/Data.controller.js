sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  function (BaseController, History) {
    "use strict";

    return BaseController.extend("project1.controller.Data", {
      onInit: function () {
        // Akan logout ketika tidak ada aktivitas selama 5 menit
        this._initIdleTimeout();
      },
      onNavBack() {
        var that = this;
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
      _getSmartTable: function () {
        if (!this._oSmartTable) {
          this._oSmartTable = this.getView().byId("LineItemsSmartTable");
        }
        return this._oSmartTable;
      },
      onSort: function () {
        var oSmartTable = this._getSmartTable();
        if (oSmartTable) {
          oSmartTable.openPersonalisationDialog("Sort");
        }
      },
      onFilter: function () {
        var oSmartTable = this._getSmartTable();
        if (oSmartTable) {
          oSmartTable.openPersonalisationDialog("Filter");
        }
      },
      onGroup: function () {
        var oSmartTable = this._getSmartTable();
        if (oSmartTable) {
          oSmartTable.openPersonalisationDialog("Group");
        }
      },
      onItemPress: function (oEvent) {
        // Ambil context dari item yang dipilih di SmartTable
        var oItem = oEvent.getSource();
        var oContext = oItem.getBindingContext();
        var materialNo = oContext ? oContext.getProperty("materialno") : null; // Ganti "ID" sesuai nama property di model

        this.getOwnerComponent().getRouter().navTo("RouteDetail", { materialNo: materialNo });
      },
    });
  }
);
