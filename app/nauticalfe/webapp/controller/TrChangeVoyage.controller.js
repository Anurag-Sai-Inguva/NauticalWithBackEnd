sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
        // "sap/ui/core/routing/History",
        "sap/ui/core/SortOrder",
        "sap/ui/model/odata/v2/ODataModel"

    ],
    function (BaseController, Fragment, ODataModel, SortOrder) {
        "use strict";

        //   var SortOrder = CoreLibrary.SortOrder;
        return BaseController.extend("nauticalfe.controller.TrChangeVoyage", {
            onInit() {
                var hideButton = this.byId("Hide");
                var hideButton1 = this.byId("Hide1");
                if (hideButton) {
                    hideButton.attachPress(this.toggleNavContainer.bind(this));
                }
                if (hideButton1) {
                    hideButton1.attachPress(this.toggleBarAndNavContainer.bind(this));
                }
                var ts = this.getOwnerComponent().getModel('tsFields')
                console.log(ts)

            },
            handleNav: function (evt) {
                var navCon = this.byId("navCon");
                var target = evt.getSource().data("target");
                if (target) {
                    var animation = this.byId("animationSelect").getSelectedKey();
                    navCon.to(this.byId(target), animation);
                } else {
                    navCon.back();
                }
            },
            //  for navigation of nav container 2 
            handleNavToPanelA: function () {
                this.navigateToPanel("panelA");
            },

            handleNavToPanelB: function () {
                this.navigateToPanel("panelB");
            },

            navigateToPanel: function (panelId) {
                var navCon = this.byId("navCon2");
                navCon.to(this.byId(panelId));
            },


            // for visiblity of nav container 1
            toggleNavContainer: function () {
                var navCon = this.byId("navCon");
                var bar = this.byId("HBox10");
                // Get the current visibility state of the NavContainer
                var currentVisibility = navCon.getVisible();

                // Toggle the visibility state
                navCon.setVisible(!currentVisibility);
                bar.setVisible(!currentVisibility);


            },
            // for visiblity of nav container 2
            toggleBarAndNavContainer: function () {
                var navCon2 = this.byId("navCon2");
                var bar2 = this.byId("HBox20");
                var currentVisibility = navCon2.getVisible();

                navCon2.setVisible(!currentVisibility);
                bar2.setVisible(!currentVisibility);
            },
            // Event handler for adding a row
            onAddRow: function () {
                var oTable = this.getView().byId("vesselRefDetails1");
                var oModel = oTable.getModel("Vdata");
                var oData = oModel.getProperty("/TechnicalBidding");

                // Create a new row with default values for properties
                var newEntry = {
                    Heads: "",


                };

                // Add the new row to your data array
                oData.push(newEntry);
                // oModel.push(newEntry);

                // Set the updated data to the model
                oModel.setProperty("/TechnicalBidding", oData);
            },
            onDeleteRow: function () {
                var oTable = this.getView().byId("vesselRefDetails1");
                var oModel = oTable.getModel("Vdata");
                var aSelectedItems = oTable.getSelectedItems();

                if (aSelectedItems.length > 0) {
                    var aData = oModel.getProperty("/TechnicalBidding"); // Assuming "/TechnicalBidding" is the path to your array data

                    aSelectedItems.forEach(function (oItem) {
                        var oContext = oItem.getBindingContext("Vdata");
                        var sPath = oContext.getPath();
                        var iIndex = parseInt(sPath.split("/").pop()); // Extract the index from the path

                        aData.splice(iIndex, 1); // Remove the item from the array
                    });

                    oModel.setProperty("/TechnicalBidding", aData); // Set the updated array back to the model

                    oTable.removeSelections(); // Clear the selection after deletion
                } else {
                    // Alert when no row is selected
                    alert("Please select a row to delete");
                }
            },
            showCharges: function () {
                var oView = this.getView()
                if (!this.byId('voyageCharges')) {
                    Fragment.load({
                        name: "nauticalfe.fragments.TrVoyageCharges",
                        controller: this,
                        id: oView.getId()
                    }).then(function (oDialog) {
                        oDialog.open()
                    })
                }
                else {
                    this.byId('voyageCharges').open()
                }
            },
            
            exitDialog: function () {
                var oDialog = this.byId('voyageCharges');
                if (oDialog) {
                    oDialog.close();
                }
            },
            sortascLegId_Tab1: function () {
                var oTable = this.getView().byId("tstab1")
                var oBinding = oTable.getBinding("rows");
                console.log(oTable,oBinding)
                if(oBinding && oBinding.sort) {
                    var sSortField = "LegId"
                    var bDescending = false;
                    var oSorter = new sap.ui.model.Sorter(sSortField, bDescending);
                    oBinding.sort(oSorter);
                }
            },
            sortdescLegId_Tab1:function(){
                var oTable = this.getView().byId("tstab1")
                var oBinding = oTable.getBinding("rows");
                console.log(oTable,oBinding)
                if(oBinding && oBinding.sort) {
                    var sSortField = "LegId"
                    var bDescending = true;
                    var oSorter = new sap.ui.model.Sorter(sSortField, bDescending);
                    oBinding.sort(oSorter);
                }
            },
            sortascLegId_Tab2: function () {
                var oTable = this.getView().byId("tstab2")
                var oBinding = oTable.getBinding("rows");
                console.log(oTable,oBinding)
                if(oBinding && oBinding.sort) {
                    var sSortField = "LegId"
                    var bDescending = false;
                    var oSorter = new sap.ui.model.Sorter(sSortField, bDescending);
                    oBinding.sort(oSorter);
                }
            },
            sortdescLegId_Tab2:function(){
                var oTable = this.getView().byId("tstab2")
                var oBinding = oTable.getBinding("rows");
                console.log(oTable,oBinding)
                if(oBinding && oBinding.sort) {
                    var sSortField = "LegId"
                    var bDescending = true;
                    var oSorter = new sap.ui.model.Sorter(sSortField, bDescending);
                    oBinding.sort(oSorter);
                }
            }

        });
    }
);
