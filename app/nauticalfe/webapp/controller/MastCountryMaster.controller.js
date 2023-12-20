sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/core/Fragment",
        
    ],
    function(BaseController,History,Fragment) {
      "use strict";
 
      return BaseController.extend("nauticalfe.controller.MastCountryMaster", {
        onInit() {
        },
        backPress:function(){
          const oHistory = History.getInstance();
          const sPreviousHash = oHistory.getPreviousHash();
 
          if (sPreviousHash !== undefined) {
            window.history.go(-1);
          }
          else {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("MastView", {}, true);
          }
       },
       onPress: function () {
        var oView = this.getView(),
          oButton = oView.byId("button");
        if (!this._oMenuFragment) {
          this._oMenuFragment = Fragment.load({
            name: "nauticalfe.fragments.MastOptionsDropDown",
                        id: oView.getId(),
            controller: this
          }).then(function(oMenu) {
            oMenu.openBy(oButton);
            this._oMenuFragment = oMenu;
            return this._oMenuFragment;
          }.bind(this));
        } else {
          this._oMenuFragment.openBy(oButton);
        }
      },
      newEntries: function () {
        this.getView().byId("createTypeTable").setVisible(false)
        this.getView().byId("entryTypeTable").setVisible(true)
        this.getView().byId("mainPageFooter").setVisible(true)


      },onSave: function () {

        var value1 =  this.getView().byId("value").getValue();
        var value2 =  this.getView().byId("fieldDesc").getValue();
        
        var data = {
          ZF_VALUE: value1,
          ZF_DESC: value2
        };
        console.log(data);


        var that = this;
        var JsonData = JSON.stringify(data)
        let EndPoint = "/odata/v4/nautical/ZCOUNTRY";
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
          that.getView().getModel().refresh();
      }


      });
    }
  );
 