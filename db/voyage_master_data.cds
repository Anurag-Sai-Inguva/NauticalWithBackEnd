using {
    Country,
    Currency
} from '@sap/cds/common';

//Voyage Master 
namespace NAUTI_MAS;


//voyage type table
entity VOYTYP {
   key VOYCD  : String(4)@assert.unique @mandatory @assert.notNull;     //Voyage code
       VOYDES : String(40); //Voyage Code Description
};

//Cargo Type Master table
entity CARTYP {

   key CARCD  : String(4)@assert.unique @mandatory @assert.notNull;//Vessel Type
    CARDES : String(40); //Cargo type description
};

//Currency Master Data type table
entity CURR {

   Key NAVOYCUR     : String(4); //Currency Type

    NAVOYGCURDES : String(40) //Currency Description


};


//Bid Master Data table
entity BIDMASTER{
   key BNAME: String(12)@assert.unique @mandatory @assert.notNull;
   key CODE : String(10)@assert.unique @mandatory @assert.notNull; //This field represents a unique Code
     VALUE: String(50); //value
     CVALUE:String;
     CUNIT:String;  
     DATATYPE : String(3); //data type
     TABLENAME: String(20);
     MULTI_CHOICE:Boolean;
}

//Port Master Code table
entity ZPORT {

    ZF_VALUE : String(50); //Type of currency

    ZF_DESC  : String(50); // field description

    Key COUNTRY  : Country; //country

    COUNTRYN : Country; //country


};

//Unit of Measurement table
entity NAVOYGUOM {
   KEY UOM    : String(3); //unit of measurement
    UOMDES : String(30); //UOM Description


};

//Cost Component table
entity NAVOYGC {

   key COSTCODE : String(4)@assert.unique @mandatory @assert.notNull;
    //cost code

    CSTCODES : String(35); //cost code description


};

//Event Master Data table
entity EVENT_MAS {

   key EVTTY : String(20)    @assert.unique @mandatory @assert.notNull; //Event type

    TEXT  : String(40); //Event text description


};

//Reference Document Search Help table
entity REF_DOC_S {
    DOCIND  : String(1) ;//Reference document indicator (PSX)
    DOCDESC : String(20) //Doc Desc
};