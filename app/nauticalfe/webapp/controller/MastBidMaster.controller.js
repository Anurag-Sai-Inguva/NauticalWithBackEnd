sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/core/routing/History"
    ],
    function (BaseController,History) {
      "use strict";
   
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
  
          var value1 =  this.getView().byId("BNAME").getValue();
          var value2 =  this.getView().byId("CODE").getValue();
          var value3 =  this.getView().byId("VALUE").getValue();
          var value4 =  this.getView().byId("CVALUE").getValue();
          var value5 =  this.getView().byId("CUNIT").getValue();
          var value6 =  this.getView().byId("DATATYPE").getValue();
          var value7 =  this.getView().byId("TABLENAME").getValue();
          var value8 =  this.getView().byId("MULTI_CHOICE").getValue();
  
          
          var data = {
  
            BNAME: value1,
            CODE:value2,
            VALUE:value3,
            CVALUE:value4,
            CUNIT:value5,
            DATATYPE:value6,
            TABLENAME:value7,
            MULTI_CHOICE: value8
  
          };
          console.log(data);
  
  
         
          var JsonData = JSON.stringify(data)
          let EndPoint = "/odata/v4/nautical/CLASS";
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

        }
      });
    }
  );