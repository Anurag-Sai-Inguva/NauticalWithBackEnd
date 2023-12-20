// const { location } = require("express/lib/response");

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/model/odata/v4/Context",
    "sap/ui/model/odata/v4/ODataContextBinding",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History", "sap/ui/core/Fragment"
  ],
  function (BaseController, ODataModel, Context, MessageBox, ODataContextBinding, MessageToast, History, Fragment) {
    "use strict";
    let aSelectedIds = [];
    var emptyrowAdded = 0;

    let rowData = {};

    return BaseController.extend("nauticalfe.controller.PortMaster", {

      onInit: function () {

      },
      onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteView1");
      },
      backPress: function () {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView", {}, true);
        }
      }, onExit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("MastView");
      }, onPress: function () {
        var oView = this.getView(),
          oButton = oView.byId("button");
        if (!this._oMenuFragment) {
          this._oMenuFragment = Fragment.load({
            name: "nauticalfe.fragments.MastOptionsDropDown",
            id: oView.getId(),
            controller: this
          }).then(function (oMenu) {
            oMenu.openBy(oButton);
            this._oMenuFragment = oMenu;
            return this._oMenuFragment;
          }.bind(this));
        } else {
          this._oMenuFragment.openBy(oButton);
        }
      },
      onPress: function () {

        var oView = this.getView(),

          oButton = oView.byId("button");

        if (!this._oMenuFragment) {

          this._oMenuFragment = Fragment.load({

            name: "nauticalfe.fragments.MastUpdDropDown",

            id: oView.getId(),

            controller: this

          }).then(function (oMenu) {

            oMenu.openBy(oButton);

            this._oMenuFragment = oMenu;

            return this._oMenuFragment;

          }.bind(this));

        } else {

          this._oMenuFragment.openBy(oButton);

        }

      },
      // testing v2  api creat operation

      

      onTableUpdateFinished: function (oEvent) {
        console.log(("table updated clicked"));
        let oTable = oEvent.getSource();

        // Get the binding information
        let oBindingInfo = oTable.getBindingInfo("items");

        // Get the number of items displayed in the table
        let iDisplayedItems = oTable.getItems().length;

        // Log or display the information
        // console.log("Binding Path:", oBindingInfo.path);
        console.log("Number of Items Displayed:", iDisplayedItems);
        // this.ensureMinimumRows(iDisplayedItems);

        // this.getView().getModel().refresh();
      },
      ensureMinimumRows: function (iDisplayedItems) {
        let oTable = this.byId("createTypeTable");
        let numRowsToAdd = (9) - iDisplayedItems;
        console.log(numRowsToAdd);
        if (numRowsToAdd > 0) {
          for (let i = 0; i < numRowsToAdd; i++) {
            let oRow = new sap.m.ColumnListItem(); // Create an empty row
            // Add cells for each column in the table
            oRow.addCell(new sap.m.Input({ maxLength: 4 }));
            oRow.addCell(new sap.m.Input()); // Add cells for each field/column you want to display
            // Add more cells if needed for other fields
            oTable.addItem(oRow); // Add the empty row to the table
          }
        }

      },
      onAddRow: function () {
        let oTable = this.byId("createTypeTable");
        emptyrowAdded++;

        // Get the number of items displayed in the table
        let iDisplayedItems = oTable.getItems().length;


        console.log("Number of Items Displayed:", iDisplayedItems);
        let numRowsToAdd = 8 - iDisplayedItems;

        console.log("adding One row", numRowsToAdd);
        var oRow = new sap.m.ColumnListItem(); // Create an empty row
        // Add cells for each column in the table
        oRow.addCell(new sap.m.Input({ maxLength: 4 }));
        oRow.addCell(new sap.m.Input()); // Add cells for each field/column you want to display
        // Add more cells if needed for other fields
        oTable.addItem(oRow); // Add the empty row to the table


      },
      // onCreateDialog: function () {
      //   var oView = this.getView();
      //   var oDialog = oView.byId("createDialog");

      //   if (!oDialog) {
      //     oDialog = new sap.m.Dialog("createDialog", {
      //       title: "Create New Entry",
      //       contentWidth: "400px",
      //       content: new sap.m.VBox({
      //         items: [
      //           new sap.m.Label({ text: " Voyage Code " }),
      //           new sap.m.Input({ value: "", id: "inputCode", required: true, maxLength:4 }), // Corrected ID
      //           new sap.m.Label({ text: "Description" }),
      //           new sap.m.Input({ value: "", id: "inputDescription", required: true }) // Corrected ID
      //         ]
      //       }),
      //       beginButton: new sap.m.Button({
      //         text: "Close",
      //         press: function () {
      //           oDialog.close();
      //         },
      //     }),
      //     endButton: new sap.m.Button({
      //       text: "Create",
      //         press: function (){
      //           oDialog.onCreateEntry()
      //         }
      //       })
      //     });
      //     oView.addDependent(oDialog);
      //   }
      //   oDialog.open();

      // },
      onShowDialogForCreate: function (oEvent) {
        let oDialog = this.byId("helloDialog")
        // console.log("clicked",oDialog);
        if (oDialog) {

          oDialog.open();
        }

      },
      openDialogForUpdate: function () {
        let oDialog = this.byId("helloDialog2")
        // console.log("clicked",oDialog);
        let code1 = this.getView().byId("charterCode2");
        let desc1 = this.getView().byId("charterDesc2");
        console.log(aSelectedIds[0], rowData.VOYDES);
        code1.setValue(aSelectedIds[0][0]);
        desc1.setValue(aSelectedIds[0][1]);
        if (oDialog) {

          oDialog.open();
        }


      },
      handleCloseCreate: function () {
        let oDialog = this.byId("helloDialog")
        // console.log("clicked",oDialog);
        if (oDialog) {

          oDialog.close();
        }
      },
      handleCloseUpdate: function () {
        let oDialog = this.byId("helloDialog2")
        // console.log("clicked",oDialog);
        if (oDialog) {

          oDialog.close();
        }

      },

      onCreateEntry: function () {
        var oView = this.getView();
        var oCodeInput = oView.byId("charterCode");
        var oDescInput = oView.byId("charterDesc");

        if (!oCodeInput || !oDescInput) {
          sap.m.MessageToast.show("Inputs not found or initialized properly.");
          return;
        }

        var sCode = oCodeInput.getValue();
        var sDescription = oDescInput.getValue();
        console.log(sCode, sDescription);

        if (!sCode.trim() || !sDescription.trim()) {
          sap.m.MessageToast.show("Please fill in all required fields.");
          return;
        }

        // Your logic to create the entry goes here
        rowData.VOYCD = sCode;
        rowData.VOYDES = sDescription

        // this.onCreate(); // Close the dialog after successful creation
        this.createData(); // Close the dialog after successful creation

        // after hitting dialog box  closing the dialog box 
        let oDialog = this.byId("helloDialog")
        // console.log("clicked",oDialog);
        if (oDialog) {
          oDialog.close();
        }

      },
      onCreate: function () {

        // this.selectedItems(oEvent);
        console.log(rowData);

        let that = this.getView();

        let data = {
          "Voycd": rowData.VOYCD,
          "Voydes": rowData.VOYDES
        }
        let JsonData = JSON.stringify(data)
        // console.log(JsonData);

        let EndPoint = "https://35.185.33.183:8001/sap/opu/odata/nauti/NAUTICALCV_SRV/VoyTypeSet";
        fetch(EndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JsonData
        })
          .then((res, error) => {
            if (res) {
              // console.log(res);
              // console.log(res.status, res.ok, res.message);

              if (res.status == "201") {

                console.log("Entity created successfully");
                MessageToast.show("Entry Created Successfully.");
                emptyrowAdded++;
                that.getModel().refresh();
                if (aSelectedIds.length) {

                  this.getView().byId('createTypeTable').removeSelections();
                }
                // location.reload();
                // that.byId('createTable').removeSelections();

              } else {
                // Check if the response contains a message
                res.json().then((data) => {
                  if (data && data.error && data.error.message) {
                    // Show the error message from the backend
                    MessageToast.show(data.error.message);
                  }
                });
              }

            }
            else {
              console.log("Failed and response with code : ", res.status);
            }
          })
          .catch(function (err) {
            console.log("error", err);
          })
      },

      selectedItems: function (oEvent) {
        // console.log("hello");
        let oTable = oEvent.getSource();
        let aSelectedItems = oTable.getSelectedItems();


        aSelectedIds = aSelectedItems.map(function (oSelectedItem) {

          // console.log(oSelectedItem.getBindingContext());

          if (oSelectedItem.getBindingContext()) {

            let cells = oSelectedItem.getCells();
            // console.log(cells);

            return [oSelectedItem.getBindingContext().getProperty("Voycd"), oSelectedItem.getBindingContext().getProperty("Voydes")]

          } else {

            let cells = oSelectedItem.getCells();
            console.log(cells);
            rowData.VOYCD = cells[0].getValue(); // Assuming the first cell holds VOYCD
            rowData.VOYDES = cells[1].getValue();
            console.log(rowData);
            return rowData

          }

        });
        console.log(aSelectedIds);
        // console.log("Selected Travel IDs: " + aSelectedTravelIds.join(","));
        return aSelectedIds;

      },
      // function for pop up dialog box for update
      onShowUpdateDialog: function () {

        let oTable = this.getView().byId('createTypeTable');
        if (aSelectedIds.length == 0) {
          MessageToast.show("Please select  a  row");
          return
        }
        if (aSelectedIds.length > 1) {
          MessageToast.show("Please select  one  row only ");
          return
        }
        this.getView().byId('charterDesc2').setValue(aSelectedIds[0][1]);
        this.openDialogForUpdate();


      },

      //  Function  for  updating  an row
      onUpdate: function () {
        let oTable = this.getView().byId('createTypeTable');

        rowData.VOYDES = this.getView().byId("charterDesc2").getValue();
        var oVoyageUpdate = {
          "Voycd": aSelectedIds[0][0], // Provide the Voyage Type code you want to update
          "Voydes": rowData.VOYDES // Update with the new Description 
        }
        //  console.log(oVoyageUpdate);

        var JsonData = JSON.stringify(oVoyageUpdate);

        let EndPoint = "http://35.185.33.183:8001/sap/opu/odata/nauti/NAUTICALCV_SRV/VoyTypeSet" + oVoyageUpdate.Voycd; // Adjust the endpoint as needed

        //  console.log(EndPoint);

        fetch(EndPoint, {
          method: 'PATCH', // Use PUT for updating existing resource
          headers: {
            'Content-Type': 'application/json'
          },
          body: JsonData
        })
          .then((res) => {
            if (res.ok) {
              console.log("Item updated Successfully");
              MessageToast.show(" Item updated Successfully");

              this.getView().getModel().refresh();
              this.handleCloseUpdate();
              this.getView().byId('createTypeTable').removeSelections();
              aSelectedIds = [];

            } else {
              // Check if the response contains a message
              res.json().then((data) => {
                if (data && data.error && data.error.message) {
                  // Show the error message from the backend
                  MessageToast.show(data.error.message);
                }
              });
              //  console.log("Failed to update Voyage Type entity");
            }
          })
          .catch(function (err) {
            console.log("Error:", err);
          })


      },
      onDeleteVoyageType: function () {

        let aItems = this.byId("createTypeTable").getSelectedItems();

        if (!aItems.length) {

          MessageToast.show("Please Select  Items ");

          return;
        }

        const that = this;  // creatinh reference for use in Dialog
        sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
          MessageBox.confirm(
            "Are you sure you want to delete the selected items?", {
            title: "Confirm Deletion",
            onClose: function (oAction) {
              if (oAction === MessageBox.Action.OK) {
                // User confirmed deletion
                that.deleteSelectedItems(aItems);
              } else {
                // User canceled deletion
                sap.m.MessageToast.show("Deletion canceled");
              }
            }
          }
          );
        });

      }, // ending fn
      deleteSelectedItems: function (aItems) {
        aItems.forEach(function (oItem) {
          oItem.getBindingContext().delete().catch(function (oError) {
            if (!oError.canceled) {
              // Error was already reported to message model
            }
          });
        });
      },

     //Anurag and Himanshu 
      newEntries: function () {
        this.getView().byId("createTypeTable").setVisible(false)
        this.getView().byId("entryTypeTable").setVisible(true)
        this.getView().byId("mainPageFooter").setVisible(true)


      },onSave: function () {

        var value1 =  this.getView().byId("value").getValue();
        var value2 =  this.getView().byId("fieldDesc").getValue();
        var value3 =  this.getView().byId("country").getValue();
        var value4 =  this.getView().byId("countryName").getValue();

        var data = {
          ZF_VALUE: value1,
          ZF_DESC: value2,
          COUNTRY:value3,
          COUNTRYN:value4
        };
        console.log(data);


        var that = this;
        var JsonData = JSON.stringify(data)
        let EndPoint = "/odata/v4/nautical/ZPORT";
        fetch(EndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JsonData
        })
          .then(function (res) {
            
            if (res.ok) {
              location.reload();
              console.log("Entity created successfully");
              MessageToast.show(`Entity created successfully`)
             

            }
            else {
              console.log("Failed");
              MessageToast.show(`Failed`)
            }
          })
          .catch(function (err) {
            console.log("error", err);
          })
          this.getView().byId("createTypeTable").setVisible(true)
          this.getView().byId("entryTypeTable").setVisible(false)
          this.getView().byId("mainPageFooter").setVisible(false)
          location.reload()

         
          





      }


    });

  });

