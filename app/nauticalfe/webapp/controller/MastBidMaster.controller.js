// sap.ui.define(
//   [
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/core/routing/History"
//   ],
//   function (BaseController,History) {
//     "use strict";
 
//     return BaseController.extend("nauticalfe.controller.MastBidMaster", {
//       onInit() {
//       }, onBackPress: function () {
//         const oHistory = History.getInstance();
//         const sPreviousHash = oHistory.getPreviousHash();

//         if (sPreviousHash !== undefined) {
//           window.history.go(-1);
//         } else {
//           const oRouter = this.getOwnerComponent().getRouter();
//           oRouter.navTo("MastView", {}, true);
//         }
//       },onBackPressHome: function () {
//         const oRouter = this.getOwnerComponent().getRouter();
//         oRouter.navTo("RouteView1");
//       },onPressExit:function () {
//         const oRouter = this.getOwnerComponent().getRouter();
//         oRouter.navTo("MastView");
//       }, newEntries: function () {
//         this.getView().byId("createTypeTable").setVisible(false)
//         this.getView().byId("entryTypeTable").setVisible(true)
//         this.getView().byId("mainPageFooter").setVisible(true)


//       },onSave: function () {

//         var value1 =  this.getView().byId("BNAME").getValue();
//         var value2 =  this.getView().byId("CODE").getValue();
//         var value3 =  this.getView().byId("VALUE").getValue();
//         var value4 =  this.getView().byId("CVALUE").getValue();
//         var value5 =  this.getView().byId("CUNIT").getValue();
//         var value6 =  this.getView().byId("DATATYPE").getValue();
//         var value7 =  this.getView().byId("TABLENAME").getValue();
//         var value8 =  this.getView().byId("MULTI_CHOICE").getSelec();

        
//         var data = {

//           BNAME: value1,
//           CODE:value2,
//           VALUE:value3,
//           CVALUE:value4,
//           CUNIT:value5,
//           DATATYPE:value6,
//           TABLENAME:value7,
//           MULTI_CHOICE: value8

//         };
//         console.log(data);


       
//         var JsonData = JSON.stringify(data)
//         let EndPoint = "/odata/v4/nautical/CLASS";
//         fetch(EndPoint, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JsonData
//         })
//           .then(function (res) {
            
//             if (res.ok) {
//               location.reload();
//               console.log("Entity created successfully");
//               MessageToast.show(`Entity created successfully`)
             

//             }
//             else {
//               console.log("Failed");
//               MessageToast.show(`Failed`)
//             }
//           })
//           .catch(function (err) {
//             console.log("error", err);
//           })
//           this.getView().byId("createTypeTable").setVisible(true)
//           this.getView().byId("entryTypeTable").setVisible(false)
//           this.getView().byId("mainPageFooter").setVisible(false)

//       }
//     });
//   }
// );
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
  ],
  function (BaseController,History,MessageToast) {
    "use strict";
    let aSelectedIds=[];
    return BaseController.extend("nauticalfe.controller.MastBidMaster", {
      onInit() {
      }, onBackPress: function () {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView", {}, true);
        }
      },onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteView1");
      },onPressExit:function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("MastView");
      }, newEntries: function () {
        this.getView().byId("createTypeTable").setVisible(false)
        this.getView().byId("entryTypeTable").setVisible(true)
        this.getView().byId("mainPageFooter").setVisible(true)


      },onSave: function () {

        var BNAME =  this.getView().byId("BNAME").getValue();
        var CODE =  this.getView().byId("CODE").getValue();
        var VALUE =  this.getView().byId("VALUE").getValue();
        var CVALUE =  this.getView().byId("CVALUE").getValue();
        var CUNIT =  this.getView().byId("CUNIT").getValue();
        var DATATYPE =  this.getView().byId("DATATYPE").getValue();
        var TABLENAME =  this.getView().byId("TABLENAME").getValue();
        var MULTI_CHOICE =  this.getView().byId("MULTI_CHOICE").getSelected();
               
         
        var data = {

          BNAME: BNAME,
          CODE :CODE,
          VALUE: VALUE,
          CVALUE:CVALUE,
          CUNIT:CUNIT,  
          DATATYPE:DATATYPE,
          TABLENAME:TABLENAME,
          MULTI_CHOICE:MULTI_CHOICE

        };

        var JsonData = JSON.stringify(data)
        let EndPoint = "/odata/v4/nautical/MAS";
        fetch(EndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JsonData
        })
          .then(function (res) {
           
            if (res.ok) {
              location.reload()
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

      },
      selectedItems: function (oEvent) {
        // console.log("hello");
        let oTable = oEvent.getSource();
        let aSelectedItems = oTable.getSelectedItems();
       
 
        aSelectedIds = aSelectedItems.map(function (oSelectedItem) {
 
          if (oSelectedItem.getBindingContext()) {
            let cells = oSelectedItem.getCells();
            console.log(cells);
            return [
            oSelectedItem.getBindingContext().getProperty("BNAME"),
            oSelectedItem.getBindingContext().getProperty("CODE"),
            oSelectedItem.getBindingContext().getProperty("VALUE"),
            oSelectedItem.getBindingContext().getProperty("CVALUE"),
            oSelectedItem.getBindingContext().getProperty("CUNIT"),
            oSelectedItem.getBindingContext().getProperty("DATATYPE"),
            oSelectedItem.getBindingContext().getProperty("TABLENAME"),
            oSelectedItem.getBindingContext().getProperty("MULTI_CHOICE")]
 
          } else {
 
          }
        });
        console.log(aSelectedIds);
        return aSelectedIds;
 
      },
      onDeletePress: function () {
 
        let aItems = this.byId("createTypeTable").getSelectedItems();
 
        if (!aItems.length) {
 
          MessageToast.show("Please Select  Items ");
 
          return;
        }
 
        const that = this;  // creatinh reference for use in Dialog
        sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
          MessageBox.confirm(
            "Are you sure  to delete the selected items?", {
              title: "Confirm ",
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
      }
    });
  }
);