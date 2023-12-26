sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
 
        return Controller.extend("nauticalfe.controller.TrVoyageOptions", {
            onInit: function () {
                var voyage = this.getView().byId("VoyageOperations")
                voyage.addStyleClass("VoyageOperations")

                var heading = this.getView().byId("HeadOptions")
                heading.addStyleClass("HeadOptions")

                
            },
            CreateVoyage:function(){
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("TrCaptureVoyage")    
            },

            changeVoyage:function(){
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteTrChangeVoyage")   
            }
            
        });
    });