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
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("updateTypeTable").setVisible(false);
      },
      
      onBackPress: function () {
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
      }, 
      
      newEntries: function () {
        this.getView().byId("createTypeTable").setVisible(false)
        this.getView().byId("entryTypeTable").setVisible(true)
        this.getView().byId("mainPageFooter").setVisible(true)


      },
      
      onSave: function () {
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
                oSelectedItem.getBindingContext().getProperty("MULTI_CHOICE")
            ]
  
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
      },
      onUpdate : function(){
         
        var BNAME =  this.getView().byId("inp1").getValue();
        var CODE =  this.getView().byId("inp2").getValue();
        var VALUE =  this.getView().byId("inp3").getValue();
        var CVALUE =  this.getView().byId("inp4").getValue();
        var CUNIT =  this.getView().byId("inp5").getValue();
        var DATATYPE =  this.getView().byId("inp6").getValue();
        var TABLENAME =  this.getView().byId("inp7").getValue();
        var MULTI_CHOICE =  this.getView().byId("inp8").getValue();
       
        let data = {
          BNAME: BNAME,
          CODE :CODE,
          VALUE: VALUE,
          CVALUE:CVALUE,
          CUNIT:CUNIT,  
          DATATYPE:DATATYPE,
          TABLENAME:TABLENAME,
          MULTI_CHOICE:MULTI_CHOICE
 
        };
        console.log(data);
 
        
        var oView = this.getView();
        var JsonData = JSON.stringify(data)
        let EndPoint = "/odata/v4/nautical/MAS/"+ data.BNAME;
        console.log(EndPoint);
        fetch(EndPoint, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JsonData
        })
          .then(function (res) {
           
            if (res.ok) {
              // location.reload();
              console.log("Entry updated successfully");
              MessageToast.show(`Entry updated successfully`);
              oView.getModel().refresh();
              oView.byId("createTypeTable").setVisible(true)
       
             oView.byId("mainPageFooter2").setVisible(false);
             oView.byId("updateTypeTable").setVisible(false);
             
 
            }
            else {
              res.json().then((data) => {
                if (data && data.error && data.error.message) {
                    // Show the error message from the backend
                    MessageToast.show(data.error.message);
                    return
                }
                });
            }
          })
          .catch(function (err) {
            console.log("error", err);
          })},

      pressEdit : function(){
        
        if(aSelectedIds.length){
          if(aSelectedIds.length > 1){
             MessageToast.show("Please select one row");
             return
          }
        }else {
          MessageToast.show("Please select a row");
          return;
        }
 
        this.getView().byId("createTypeTable").setVisible(false);
        let u1 = aSelectedIds[0][0];
        let u2 = aSelectedIds[0][1];
        let u3 = aSelectedIds[0][2];
        let u4 = aSelectedIds[0][3];
        let u5 = aSelectedIds[0][4];
        let u6 = aSelectedIds[0][5];
        let u7 = aSelectedIds[0][6];
        this.getView().byId("inp1").setText(u1);
        this.getView().byId("inp2").setValue(u2);
        this.getView().byId("inp3").setValue(u3);
        this.getView().byId("inp4").setValue(u4);
        this.getView().byId("inp5").setValue(u5);
        this.getView().byId("inp6").setValue(u6);
        this.getView().byId("inp7").setValue(u7);
        this.getView().byId('updateTypeTable').setVisible(true);
        // console.log(aSelectedIds[0][0], aSelectedIds[0][1]);
        this.getView().byId("mainPageFooter2").setVisible(true);
 
        // this.onUpdate(code, desc);
      }
    });
  }
);