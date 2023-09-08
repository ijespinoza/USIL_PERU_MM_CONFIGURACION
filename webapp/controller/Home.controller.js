sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageBox,Filter,FilterOperator,Fragment) {
        "use strict";
        let that;
        let oView;
        let ODATA_CONFIGURACIONES;
        let filaUpdateNotificacion,filaUpdateTesoreria;
        let oFilasSociedades=[], oFilaOrgCompras =[],  oFilaGrpCompras =[];
        let MODEL;       

        return Controller.extend("usilconfiguracionportalreserva.controller.Home", {
            onInit: function () {
                that = this;
                oView = that.getView();                
                ODATA_CONFIGURACIONES = this.getOwnerComponent().getModel("ODATA_CONFIGURACIONES");
                that.onObtenerResponsables();                
                let aResponsables = [];
                let oModel = new sap.ui.model.json.JSONModel({
                    Responsables: aResponsables
                  });
                that.getView().byId("frg-DatosMaestros--idTbResponsables").setModel(oModel);	
                /*	
			    ODATA_PROVEEDORES = this.getOwnerComponent().getModel("ODATA_PROVEEDORES");
                MODEL = this.getOwnerComponent().getModel()
                that.onLimpiarNotificaciones();
                this.onLimpiarTesoreria();
                this.onListaSeteoModelo();                
                this.onListaEventos();
                this.onListaDirigido();
                this.onListaSociedades();
                this.onlistaSociedadesHana();
                this.onListaOrgCompras();
                this.onListaGrpCompras();
                this.onListaEmpresas();
                this.onlistaOrgComprasHana();
                this.onlistaGrupoComprasHana();
                this.onListaInformacionProveedorTesoreria();
                //funciones para recepcion
                this.onListaTiposRecepcion();
                this.onListaTiposDocumento();
                this.onListaImportancia();
                this.onListaDocumento();
                var oModelTable= this.getOwnerComponent().getModel("tablaNotificaciones");
                this.onlistaNotificaciones(oModelTable);

                this._dialog = {}*/
                
            },
            /*
            onListaSociedades:function(){
                var aListaSociedades =
                [
                    {
                        id:"PE01",
                        descripcion:"Country Template PE",
                        waers:"PEN"
                    },
                    {
                        id:"PE02",
                        descripcion:"USIL sociedad",
                        waers:"PEN"
                    },
                    {
                        id:"PE03",
                        descripcion:"USIL publica",
                        waers:"PEN"
                    }
                
                ];
                var oModel = this.getOwnerComponent().getModel();
                oModel.setProperty("/sociedadesSap", aListaSociedades);
            },
            onListaOrgCompras:function(){
                var aListOrgCompras= [
                    {
                        codigo:"ORG1",
                        descripcion:"Organizacion de compras 1"
                    },
                    {
                        codigo:"ORG2",
                        descripcion:"Organizacion de compras 2"
                    },
                    {
                        codigo:"ORG3",
                        descripcion:"Organizacion de compras 3"
                    },
                ]
                var oModel = this.getOwnerComponent().getModel();
                oModel.setProperty("/orgComprasSap", aListOrgCompras);
            },
            onListaGrpCompras:function(){
                var aListGrpCompras= [
                    {
                        codigo:"GRP1",
                        descripcion:"Grupo de compras 1"
                    },
                    {
                        codigo:"GRP2",
                        descripcion:"Grupo de compras 2"
                    },
                    {
                        codigo:"GRP3",
                        descripcion:"Grupo de compras 3"
                    },
                ]
                var oModel = this.getOwnerComponent().getModel();
                oModel.setProperty("/grupoComprasSap", aListGrpCompras);
            },
            onlistaNotificaciones: function(){
                var filters = [];
                var estado = new Filter("estado", FilterOperator.EQ, true);
                filters.push(estado);
                that.onReadEntityCombo(this.getOwnerComponent().getModel(),"/Notificaciones","/filas",filters,"evento,destino")
            },
            onReadEntityCombo:function(modeloGeneral,entidad,modelo,filters,expand){
                if(expand == undefined){
                    expand="";
                }
                ODATA_PROVEEDORES.read(entidad, {		
                    filters: filters,		
                    urlParameters: {
                        "$expand":expand
                    },
                    success: function (result) {
                        sap.ui.core.BusyIndicator.hide();
                        var aLista = result.results;
                        if(modelo == "/sociedades"){
                            oFilasSociedades = aLista;
                            if(aLista.length>0){
                                var lista= aLista[0].sociedades.results;
                                modeloGeneral.setProperty(modelo, lista);
                            }                            
                        }else if(modelo == "/orgCompras"){
                            oFilaOrgCompras = aLista;
                            if(aLista.length>0){
                                var lista= aLista[0].organizacionCompras.results;
                                modeloGeneral.setProperty(modelo, lista);
                            }                            
                        }else if(modelo == "/grupoCompras"){
                            oFilaGrpCompras = aLista;
                            if(aLista.length>0){
                                var lista= aLista[0].grupoCompras.results;
                                modeloGeneral.setProperty(modelo, lista);
                            }                            
                        }else{
                            modeloGeneral.setProperty(modelo, aLista);
                        }
                        return  aLista;
                    },
                    error: function (err) {
                        var error = err;
                        MessageBox.error("Error al listar datos de la entidad:" + entidad);
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            },         
            onListaSeteoModelo:function(){
                var oModelEmpty = new JSONModel();
                this.getOwnerComponent().setModel(oModelEmpty,"Notificaciones");
                this.getOwnerComponent().setModel(oModelEmpty,"TiposProvee");
                this.getOwnerComponent().setModel(oModelEmpty,"Tesoreria");
                //this.onLimpiarNotificaciones();
                this.getOwnerComponent().setModel(new JSONModel(),"datosRecepcionDocumentos");
                this.getOwnerComponent().setModel(new JSONModel(),"datosSociedades");
                this.getOwnerComponent().setModel(new JSONModel(),"tablaNotificaciones");
            },
            onListaEventos:function(){
                const oModelNotificaciones = this.getOwnerComponent().getModel("Notificaciones");
                var filters = [];
			    that.onReadEntityCombo(oModelNotificaciones,"/Eventos","/evento",filters)
                // var aLista= [
                //     {
                //         text:"",
                //         key:"0"
                //     },
                //     {
                //         text:"Factura procesada   (Proveedor)",
                //         key:"1"
                //     },
                //     {
                //         text:"Factura Rechazada   (Proveedor)",
                //         key:"2"
                //     },
                //     {
                //         text:"Factura por Revisar (Cliente)",
                //         key:"3"
                //     },
                //     {
                //         text:"Corrección de Fact. (Cliente)",
                //         key:"4"
                //     },
                //     {
                //         text:"Factura procesada   (Proveedor)",
                //         key:"5"
                //     },

                // ]
                // oModelNotificaciones.setProperty("/evento", aLista);
                // console.log(oModelNotificaciones);                          
                //oView.byId(idVista).setModel(oModelLista);
            },
            onListaDirigido:function(){
                const oModelNotificaciones = this.getOwnerComponent().getModel("Notificaciones");
                var filters = [];
			    that.onReadEntityCombo(oModelNotificaciones,"/Destinos","/dirigido",filters)
                // var aLista= [
                //     {
                //         text:"",
                //         key:"0"
                //     },
                //     {
                //         text:"Proveedor",
                //         key:"1"
                //     },
                //     {
                //         text:"Cliente (Usuarios)",
                //         key:"2"
                //     },

                // ]
                // oModelNotificaciones.setProperty("/dirigido", aLista);
                // console.log(oModelNotificaciones);                          
                //oView.byId(idVista).setModel(oModelLista);
            },
            onNotificaciones:function(){
                this.getSplitContObj().to(this.createId("idPagNotificaciones"));
            },
            onDatosMaestros:function(){
                this.getSplitContObj().to(this.createId("idPagDatosMaestros"));
            },
            onTesoreria:function(){
                this.getSplitContObj().to(this.createId("idPagTesoreria"));
            },
            onRecepcion:function(){
                this.getSplitContObj().to(this.createId("idPagRecepcion"));
            },
            onConstantes:function(){
                this.getSplitContObj().to(this.createId("idPagConstantes"));
            },
            getSplitContObj: function () {
                var result = this.byId("idSplitContainer");
                if (!result) {
                    Log.error("SplitApp object can't be found");
                }
                return result;
            },
            onAñadirFilaNotificaciones: async function(){
                var oModelDatosNoti= this.getOwnerComponent().getModel("datosNotificaciones");              
                if(oModelDatosNoti== undefined || oModelDatosNoti==null){
                    MessageBox.error("Ingrese valores en el formulario");
                   return;
                }
                var datosNofiticaciones= oModelDatosNoti.getData();

                try {
                    var oNotificacion=
                    { 
                    "asunto" :datosNofiticaciones.asunto, 
                    "cuerpo" :datosNofiticaciones.cuerpo,
                    "estado" : true, 
                    "evento_ID" :datosNofiticaciones.evento,
                    "destino_ID" :datosNofiticaciones.dirigido,			
                    }
                    const solicitud = await that.onCrearEntitiy("/Notificaciones" , oNotificacion);
                    MessageBox.success("Se agrego correctamente la Notificación");
                    that.onLimpiarNotificaciones();
                    that.onlistaNotificaciones();
                } catch (error) {
                    MessageBox.error("Error al agregar una notificación");
                    console.log(error)
                }
            },
            onEditarFilaNotificaciones:function(e){
                var fila = e.getSource().getBindingContext().getObject();
                filaUpdateNotificacion=fila;
                var datosNoti = 
                {
                    evento:fila.evento_ID,
                    dirigido:fila.destino_ID,
                    asunto:fila.asunto,
                    cuerpo:fila.cuerpo,
                    boton:true
                }
                this.getOwnerComponent().setModel(new JSONModel(datosNoti),"datosNotificaciones");

            },
            onActualizarDatosNotificacion: async function(){ 
                var oModelDatosNoti= this.getOwnerComponent().getModel("datosNotificaciones");
                var datosNofiticaciones= oModelDatosNoti.getData();     
                var oNotificacion=
                    { 
                    "asunto" :datosNofiticaciones.asunto, 
                    "cuerpo" :datosNofiticaciones.cuerpo,
                    "estado" : true, 
                    "evento_ID" :datosNofiticaciones.evento,
                    "destino_ID" :datosNofiticaciones.dirigido,			
                    }   
                try {
                    const update = await that.onUpdateEntitiy("/Notificaciones(guid'"+ filaUpdateNotificacion.ID + "')" , oNotificacion);
                    MessageBox.success("Se agrego actualizo correctamente la Notificación");
                    that.onLimpiarNotificaciones();
                    var oModelTable= this.getOwnerComponent().getModel("tablaNotificaciones");
                    that.onlistaNotificaciones(oModelTable);
                } catch (error) {
                    MessageBox.error("Error al actualizar la notificación");
                    
                }
            },
            onCancelarNotificacion:function(){
                that.onLimpiarNotificaciones();
            },
            onEliminarFilaNotificaciones: async function(){
                var filasSeleccionadas = that.oView.byId("frg-Notificaciones--clientes").getSelectedItems();
                if(filasSeleccionadas.length == 0){
                    MessageBox.error("Seleccione una fila por favor");
                    return;
                }
                MessageBox.error("Esta seguro de eliminar las notificaciones seleccionadas?", {
                    actions: ["Si", "No"],
                    emphasizedAction: "Manage Products",
                    onClose: function (sAction) {
                       if(sAction== "Si"){
                            that.onEliminarFilasNoti(filasSeleccionadas)
                       }
                    }
                });
            },
            onEliminarFilasNoti: async function(filasSeleccionadas){
                var aErrores=[];
                var sResponsivePaddingClasses = "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer";
                for (let index = 0; index < filasSeleccionadas.length; index++) {
                    var fila = filasSeleccionadas[index].getBindingContext().getObject();
                    var oNotificacion={
                        estado:false
                    }
                    try {
						const update = await that.onUpdateEntitiy("/Notificaciones(guid'"+ fila.ID + "')" , oNotificacion);
					} catch (error) {
						aErrores.push({"mensaje":"Hubo un error al eliminar una notifiacion","entidad":"Notificaciones","Fila":index,"Asunto":fila.asunto});
					}			                   
                }
                if(aErrores.length>0){
                    var sTexto = "<ul>";
                    $.each(aErrores, (idx, value) => {                        
                        sTexto += "<li>" + value.mensaje + " Asunto: " + value.Asunto + "</li>";
                    });
                    sTexto += "</ul>";
                    MessageBox.error("Hubo errores al eliminar las notificaciones", {
                        title: "Error",
                        id: "messageBoxId2",
                        details: sTexto,
                        styleClass: sResponsivePaddingClasses
                    });
                }else{
                    MessageBox.success("Se eliminaron correctamente las notificaciones");
                    var oModelTable= this.getOwnerComponent().getModel("tablaNotificaciones");
                    that.onlistaNotificaciones(oModelTable);
                    var filasSeleccionadas = that.oView.byId("frg-Notificaciones--clientes").removeSelections();
                }

                console.log(aErrores);
            },
            onLimpiarNotificaciones: function(){
                var datosNoti = 
                {
                    evento:"",
                    dirigido:"",
                    asunto:"",
                    cuerpo:"",
                    boton:false
                }
                this.getOwnerComponent().setModel(new JSONModel(datosNoti),"datosNotificaciones");
            },
            //funciones para Datos maestros
            //grupode ocmpras
            onlistaGrupoComprasHana: function(){
                var filters = [];               
                that.onReadEntityCombo(this.getOwnerComponent().getModel(),"/MaestroGrupoCompras","/grupoCompras",filters,"grupoCompras")
            },
            onAbrirGrpCompras:function(){
                if (!this._valueHelpDialogGrp) {
					this._valueHelpDialogGrp = sap.ui.xmlfragment(
						"frg-GrpComprasSAP","usilconfiguracionportalreserva.fragment.Dialogos.GrpCompras",
						this
					);
					this.getView().addDependent(this._valueHelpDialogGrp);
				}               
				this._valueHelpDialogGrp.open();              
            },
            _closeDialoggrupoCompras: function () {
                this._valueHelpDialogGrp.close();
            },
            onAgregargrupoCompras: async function(){
                var filasSeleccionadas = sap.ui.getCore().byId("frg-GrpComprasSAP--idTbGrpComprasSAP").getSelectedItems();      
                if(filasSeleccionadas.length == 0){
                    MessageBox.error("Seleccione una fila por favor");
                    return;
                }
                var aGrpCompras = [];
                $.each(filasSeleccionadas, (idx, value) => {     
                    var fila = value.getBindingContext().getObject();              
                    var oGrpCompras=
                    { 
                    "descripcion" :fila.descripcion, 
                    "codigo" :fila.codigo,
                    "estado" : true            
                    }
                    aGrpCompras.push(oGrpCompras);
                });
                var oMaestroGrpCompras = 
                {
                    grupoCompras: aGrpCompras
                }               
                try {                   
                    //valido si existe una fila ya creada en el maestro de sociedades
                    //si no existe crea
                    if(oFilaGrpCompras.length == 0){
                        const solicitud = await that.onCrearEntitiy("/MaestroGrupoCompras" , oMaestroGrpCompras);
                    }else{
                        //si existe update
                        const update = await that.onUpdateEntitiy("/MaestroGrupoCompras(guid'"+ oFilaGrpCompras[0].ID + "')" , oMaestroGrpCompras);
                    }                            
                    MessageBox.success("Se agrego correctamente las grupo compras");                   
                    that.onlistaGrupoComprasHana();
                    that._closeDialoggrupoCompras();
                } catch (error) {
                    MessageBox.error("Error al agregar las grupo compras");
                    console.log(error)
                }               
            },
            //Org compras
            onlistaOrgComprasHana: function(){
                var filters = [];               
                that.onReadEntityCombo(this.getOwnerComponent().getModel(),"/MaestroOrgCompras","/orgCompras",filters,"organizacionCompras")
            },
            onAbrirOrgCompras:function(){
                if (!this._valueHelpDialogOrg) {
					this._valueHelpDialogOrg = sap.ui.xmlfragment(
						"frg-OrgComprasSAP","usilconfiguracionportalreserva.fragment.Dialogos.OrgCompras",
						this
					);
					this.getView().addDependent(this._valueHelpDialogOrg);
				}               
				this._valueHelpDialogOrg.open();              
            },
            _closeDialogOrgCompras: function () {
                this._valueHelpDialogOrg.close();
            },
            onAgregarOrgCompras: async function(){
                var filasSeleccionadas = sap.ui.getCore().byId("frg-OrgComprasSAP--idTbOrgComprasSAP").getSelectedItems();      
                if(filasSeleccionadas.length == 0){
                    MessageBox.error("Seleccione una fila por favor");
                    return;
                }
                var aOrgCompras = [];
                $.each(filasSeleccionadas, (idx, value) => {     
                    var fila = value.getBindingContext().getObject();              
                    var oOrgCompras=
                    { 
                    "descripcion" :fila.descripcion, 
                    "codigo" :fila.codigo,
                    "estado" : true            
                    }
                    aOrgCompras.push(oOrgCompras);
                });
                var oMaestroOrgCompras = 
                {
                    organizacionCompras: aOrgCompras
                }               
                try {                   
                    //valido si existe una fila ya creada en el maestro de sociedades
                    //si no existe crea
                    if(oFilaOrgCompras.length == 0){
                        const solicitud = await that.onCrearEntitiy("/MaestroOrgCompras" , oMaestroOrgCompras);
                    }else{
                        //si existe update
                        const update = await that.onUpdateEntitiy("/MaestroOrgCompras(guid'"+ oFilaOrgCompras[0].ID + "')" , oMaestroOrgCompras);
                    }                            
                    MessageBox.success("Se agrego correctamente las org compras");                   
                    that.onlistaOrgComprasHana();
                    that._closeDialogOrgCompras();
                } catch (error) {
                    MessageBox.error("Error al agregar las org compras");
                    console.log(error)
                }               
            },
            //sociedades
            onlistaSociedadesHana: function(oModelTable){
                var filters = [];
                //var estado = new Filter("estado", FilterOperator.EQ, true);
                //filters.push(estado);
                that.onReadEntityCombo(this.getOwnerComponent().getModel(),"/MaestroSociedades","/sociedades",filters,"sociedades")
            },
            onAbrirSociedades:function(){
                if (!this._valueHelpDialog) {
					this._valueHelpDialog = sap.ui.xmlfragment(
						"frg-SociedadesSAP","usilconfiguracionportalreserva.fragment.Dialogos.Sociedades",
						this
					);
					this.getView().addDependent(this._valueHelpDialog);
				}               
				this._valueHelpDialog.open();              
            },
            _closeDialog: function () {
                this._valueHelpDialog.close();
            },
            onAgregarSociedades: async function(){
                var filasSeleccionadas = sap.ui.getCore().byId("frg-SociedadesSAP--idTbSociedadesSAP").getSelectedItems();      
                if(filasSeleccionadas.length == 0){
                    MessageBox.error("Seleccione una fila por favor");
                    return;
                }
                var aSociedades = [];
                $.each(filasSeleccionadas, (idx, value) => {          
                    var fila = value.getBindingContext().getObject();              
                    var oSociedad=
                    { 
                    "descripcion" :fila.descripcion, 
                    "codigo" :fila.id,
                    "estado" : true, 
                    "moneda" :fila.waers            
                    }
                    aSociedades.push(oSociedad);
                });
                var oMaestroSociedades = 
                {
                    sociedades: aSociedades
                }               
                try {                   
                    //valido si existe una fila ya creada en el maestro de sociedades
                    //si no existe crea
                    if(oFilasSociedades.length == 0){
                        const solicitud = await that.onCrearEntitiy("/MaestroSociedades" , oMaestroSociedades);
                    }else{
                        //si existe update
                        const update = await that.onUpdateEntitiy("/MaestroSociedades(guid'"+ oFilasSociedades[0].ID + "')" , oMaestroSociedades);
                    }                            
                    MessageBox.success("Se agrego correctamente las sociedades");                   
                    that.onlistaSociedadesHana();
                    that._closeDialog();
                } catch (error) {
                    MessageBox.error("Error al agregar las sociedades");
                    console.log(error)
                }               
            },
            //funciones para Datos maestros
            //Funciones para tesoreria
            onListaEmpresas:function(){
                const oModelTesoreria = this.getOwnerComponent().getModel("Tesoreria");
                var filters = [];
			    that.onReadEntityCombo(oModelTesoreria,"/Proveedores","/empresas",filters)
            },
            onListaInformacionProveedorTesoreria(){
                var filters = [];
                var estado = new Filter("estado", FilterOperator.EQ, true);
                filters.push(estado);
                that.onReadEntityCombo(this.getOwnerComponent().getModel(),"/InformacionProveedor","/informacionProveedor",filters)
            },
            onLimpiarTesoreria: function(){
                var oTesoreria=
                    { 
                    "empresa" :"",
                    "razonSocial" :false,
                    "estado" : true, 
                    "fechaPagoFactura" :false,
                    "fechaPagoDetraccion" :false,
                    "pagoFactura" :false,
                    "pagoDetraccion" :false,
                    "boton":false
                    }
                this.getOwnerComponent().setModel(new JSONModel(oTesoreria),"datosTesoreria");
            },
            onAñadirFilaTesoreria: async function(){
                var oModelDatosTesoreria= this.getOwnerComponent().getModel("datosTesoreria");                
                if(oModelDatosTesoreria== undefined || oModelDatosTesoreria==null){
                    MessageBox.error("Ingrese valores en el formulario");
                   return;
                }
                var datosTesoreria= oModelDatosTesoreria.getData();         
                var oItemText = that.oView.byId("frg-Tesoreria--combProveedor")._getSelectedItemText();      
                try {
                    var oTesoreria=
                    { 
                    "ruc" :datosTesoreria.empresa, 
                    "razonSocial" :oItemText,
                    "estado" : true, 
                    "fechaPagoFactura" :datosTesoreria.fechaPagoFactura? "X": "",
                    "fechaPagoDetraccion" :datosTesoreria.fechaPagoDetraccion? "X": "",	
                    "pagoFactura" :datosTesoreria.pagoFactura? "X": "",	
                    "pagoDetraccion" :datosTesoreria.pagoDetraccion? "X": "",			
                    }
                    const solicitud = await that.onCrearEntitiy("/InformacionProveedor" , oTesoreria);
                    MessageBox.success("Se agrego correctamente la información");
                    that.onLimpiarTesoreria();
                    that.onListaInformacionProveedorTesoreria();
                } catch (error) {
                    MessageBox.error("Error al agregar la infoacionar");
                    console.log(error)
                }
            },
            onEditarFilaTesoreria:function(e){
                var fila = e.getSource().getBindingContext().getObject();
                filaUpdateTesoreria=fila;
                var datosteso = 
                { 
                    "empresa" :fila.ruc,
                    "razonSocial" :false,
                    "estado" : true, 
                    "fechaPagoFactura" :fila.fechaPagoFactura == "" ? false: true,
                    "fechaPagoDetraccion" :fila.fechaPagoDetraccion == "" ? false: true,
                    "pagoFactura" :fila.pagoFactura == "" ? false: true,
                    "pagoDetraccion" :fila.pagoDetraccion == "" ? false: true,
                    "boton":true
                    }
                this.getOwnerComponent().setModel(new JSONModel(datosteso),"datosTesoreria");

            },
            onActualizarDatosNotificacion: async function(){ 
                var oModelDatosTeso= this.getOwnerComponent().getModel("datosTesoreria");
                var datosTesoreria= oModelDatosTeso.getData();
                var oItemText = that.oView.byId("frg-Tesoreria--combProveedor")._getSelectedItemText();      
                var oTesoreria=
                    { 
                        "ruc" :datosTesoreria.empresa, 
                        "razonSocial" :oItemText,
                        "estado" : true, 
                        "fechaPagoFactura" :datosTesoreria.fechaPagoFactura? "X": "",
                        "fechaPagoDetraccion" :datosTesoreria.fechaPagoDetraccion? "X": "",	
                        "pagoFactura" :datosTesoreria.pagoFactura? "X": "",	
                        "pagoDetraccion" :datosTesoreria.pagoDetraccion? "X": "",				
                    }   
                try {
                    const update = await that.onUpdateEntitiy("/InformacionProveedor(guid'"+ filaUpdateTesoreria.ID + "')" , oTesoreria);
                    MessageBox.success("Se agrego actualizo correctamente la información");
                    that.onLimpiarTesoreria();
                    that.onListaInformacionProveedorTesoreria();
                } catch (error) {
                    MessageBox.error("Error al actualizar la información");
                    
                }
            },
            onEliminarFilaTesoreria: async function(){
                var filasSeleccionadas = that.oView.byId("frg-Tesoreria--idTableTesoreria").getSelectedItems();
                if(filasSeleccionadas.length == 0){
                    MessageBox.error("Seleccione una fila por favor");
                    return;
                }
                MessageBox.error("¿Está seguro de eliminar los datos seleccionados?", {
                    actions: ["Si", "No"],
                    emphasizedAction: "Manage Products",
                    onClose: function (sAction) {
                       if(sAction== "Si"){
                            that.onEliminarFilasTeso(filasSeleccionadas)
                       }
                    }
                });
            },
            onEliminarFilasTeso: async function(filasSeleccionadas){
                var aErrores=[];
                var sResponsivePaddingClasses = "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer";
                for (let index = 0; index < filasSeleccionadas.length; index++) {
                    var fila = filasSeleccionadas[index].getBindingContext().getObject();
                    var oTesoreria={
                        estado:false
                    }
                    try {
						const update = await that.onUpdateEntitiy("/InformacionProveedor(guid'"+ fila.ID + "')" , oTesoreria);
					} catch (error) {
						aErrores.push({"mensaje":"Hubo un error al eliminar una fila","entidad":"InformacionProveedor","Fila":index,"empresa":fila.razonSocial});
					}			                   
                }
                if(aErrores.length>0){
                    var sTexto = "<ul>";
                    $.each(aErrores, (idx, value) => {                        
                        sTexto += "<li>" + value.mensaje + " Empresa: " + value.empresa + "</li>";
                    });
                    sTexto += "</ul>";
                    MessageBox.error("Hubo errores al eliminar los datos", {
                        title: "Error",
                        id: "messageBoxId2",
                        details: sTexto,
                        styleClass: sResponsivePaddingClasses
                    });
                }else{
                    MessageBox.success("Se eliminaron correctamente los datos");                                        
                    that.onListaInformacionProveedorTesoreria();
                    var filasSeleccionadas = that.oView.byId("frg-Tesoreria--idTableTesorerias").removeSelections();
                }

                console.log(aErrores);
            },
            onCancelarNotificacion:function(){
                that.onLimpiarTesoreria();
            },
            //recepcion de documentos
            onListaTiposRecepcion: function(){
                var filters = [];          
                const oModelNotificaciones = this.getOwnerComponent().getModel("TiposProvee");     
                that.onReadEntityCombo(oModelNotificaciones,"/TiposProvee","/tiposProvedor",filters);
            },
            onListaTiposDocumento: function(){
                var filters = [];          
                const oModelNotificaciones = this.getOwnerComponent().getModel("TiposProvee");     
                that.onReadEntityCombo(oModelNotificaciones,"/TiposDocumento","/tiposDocumento",filters);
            },
            onListaImportancia: function(){
                var filters = [];          
                const oModelNotificaciones = this.getOwnerComponent().getModel("TiposProvee");     
                that.onReadEntityCombo(oModelNotificaciones,"/Importancia","/tiposImportancia",filters);
            },
            onListaDocumento: function(){
                var filters = [];          
                const oModelNotificaciones = this.getOwnerComponent().getModel("TiposProvee");     
                that.onReadEntityCombo(oModelNotificaciones,"/Documentos","/documentos",filters);
            },
            onAñadirFilRecepcionDocumentos: async function(){
                var oModelDatosRecep= this.getOwnerComponent().getModel("datosRecepcionDocumentos");              
                if(oModelDatosRecep== undefined || oModelDatosRecep==null){
                    MessageBox.error("Ingrese valores en el formulario");
                   return;
                }
                var datosRecepcion= oModelDatosRecep.getData();

                try {
                    var oRecepcion=
                    { 
                    "tipoDocumento_ID" :datosRecepcion.tiposDocs, 
                    "tipoProvee_ID" :datosRecepcion.cuerpo,
                    "estado" : true, 
                    "documento_ID" :datosRecepcion.documento,
                    "importancia_ID" :datosRecepcion.tipoImportancia,			
                    "recomendacion" :datosRecepcion.recomendacion,			
                    }
                    const solicitud = await that.onCrearEntitiy("/RecepcionDocumentos" , oRecepcion);
                    MessageBox.success("Se agrego correctamente el documento");
                    that.onLimpiarNotificaciones();
                    that.onlistaNotificaciones();
                } catch (error) {
                    MessageBox.error("Error al agregar el documento");
                    console.log(error)
                }
            },
            onEditarFilaRecepcionDocumentos:function(e){
                var fila = e.getSource().getBindingContext().getObject();
                filaUpdateNotificacion=fila;
                var datosNoti = 
                {
                    evento:fila.evento_ID,
                    dirigido:fila.destino_ID,
                    asunto:fila.asunto,
                    cuerpo:fila.cuerpo,
                    boton:true
                }
                this.getOwnerComponent().setModel(new JSONModel(datosNoti),"datosNotificaciones");

            },
            onActualizarRecepcionDocumentos: async function(){ 
                var oModelDatosNoti= this.getOwnerComponent().getModel("datosNotificaciones");
                var datosNofiticaciones= oModelDatosNoti.getData();     
                var oNotificacion=
                    { 
                    "asunto" :datosNofiticaciones.asunto, 
                    "cuerpo" :datosNofiticaciones.cuerpo,
                    "estado" : true, 
                    "evento_ID" :datosNofiticaciones.evento,
                    "destino_ID" :datosNofiticaciones.dirigido,			
                    }   
                try {
                    const update = await that.onUpdateEntitiy("/Notificaciones(guid'"+ filaUpdateNotificacion.ID + "')" , oNotificacion);
                    MessageBox.success("Se agrego actualizo correctamente la Notificación");
                    that.onLimpiarNotificaciones();
                    var oModelTable= this.getOwnerComponent().getModel("tablaNotificaciones");
                    that.onlistaNotificaciones(oModelTable);
                } catch (error) {
                    MessageBox.error("Error al actualizar la notificación");
                    
                }
            },
            onCancelarRecepcionDocumentos:function(){
                that.onLimpiarNotificaciones();
            },
            onEliminarFilaRecepcionDocumentos: async function(){
                var filasSeleccionadas = that.oView.byId("frg-Notificaciones--clientes").getSelectedItems();
                if(filasSeleccionadas.length == 0){
                    MessageBox.error("Seleccione una fila por favor");
                    return;
                }
                MessageBox.error("Esta seguro de eliminar las notificaciones seleccionadas?", {
                    actions: ["Si", "No"],
                    emphasizedAction: "Manage Products",
                    onClose: function (sAction) {
                       if(sAction== "Si"){
                            that.onEliminarFilasNoti(filasSeleccionadas)
                       }
                    }
                });
            },
            onEliminarFilasRecepcionDoc: async function(filasSeleccionadas){
                var aErrores=[];
                var sResponsivePaddingClasses = "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer";
                for (let index = 0; index < filasSeleccionadas.length; index++) {
                    var fila = filasSeleccionadas[index].getBindingContext().getObject();
                    var oNotificacion={
                        estado:false
                    }
                    try {
						const update = await that.onUpdateEntitiy("/Notificaciones(guid'"+ fila.ID + "')" , oNotificacion);
					} catch (error) {
						aErrores.push({"mensaje":"Hubo un error al eliminar una notifiacion","entidad":"Notificaciones","Fila":index,"Asunto":fila.asunto});
					}			                   
                }
                if(aErrores.length>0){
                    var sTexto = "<ul>";
                    $.each(aErrores, (idx, value) => {                        
                        sTexto += "<li>" + value.mensaje + " Asunto: " + value.Asunto + "</li>";
                    });
                    sTexto += "</ul>";
                    MessageBox.error("Hubo errores al eliminar las notificaciones", {
                        title: "Error",
                        id: "messageBoxId2",
                        details: sTexto,
                        styleClass: sResponsivePaddingClasses
                    });
                }else{
                    MessageBox.success("Se eliminaron correctamente las notificaciones");
                    var oModelTable= this.getOwnerComponent().getModel("tablaNotificaciones");
                    that.onlistaNotificaciones(oModelTable);
                    var filasSeleccionadas = that.oView.byId("frg-Notificaciones--clientes").removeSelections();
                }

                console.log(aErrores);
            },
            onLimpiarRecepcionDocumentos: function(){
                var datosNoti = 
                {
                    evento:"",
                    dirigido:"",
                    asunto:"",
                    cuerpo:"",
                    boton:false
                }
                this.getOwnerComponent().setModel(new JSONModel(datosNoti),"datosNotificaciones");
            },

            
            onUpdateFinishedConstantes: function(evento){
                const length = evento.getParameter("total");
                let titletable = this._getResourceBundle().getText("titleTableConstantes");
                if(length > 0){
                    titletable = this._getResourceBundle().getText("titleTableConstantesCount", length);
                }
                MODEL.setProperty("/titleTableConstantes", titletable);
            },

          
            onMostrarDialogoAgregarConstante : async function () {
                MODEL.setProperty("/constante",{});
                MODEL.setProperty("/valueStateNombre","None");
                MODEL.setProperty("/valueStateTextNombre","");
                MODEL.setProperty("/valueStatevalor","None");
                MODEL.setProperty("/valueStateTextValor","");
                MODEL.setProperty("/valueStateDescripcion","None");
                MODEL.setProperty("/valueStateTextDescripcion","");

                let dialog = this._dialog["AgregarConstante"];
                if(!dialog){
                    dialog = await this.loadFragment({
                        name: "usilconfiguracionportalreserva.fragment.Dialogos.AgregarConstante"
                    });
                    this._dialog["AgregarConstante"] = dialog;
                }
                dialog.open();
            },


         
            onAgregarConstante : function () {
                const constante = MODEL.getProperty("/constante");
                if(!constante.nombre){
                    MODEL.setProperty("/valueStateNombre","Error");
                    MODEL.setProperty("/valueStateTextNombre","EL nombre es obligatorio");
                    return;
                }
                if(!constante.valor){
                    MODEL.setProperty("/valueStatevalor","Error");
                    MODEL.setProperty("/valueStateTextValor","EL valor es obligatorio");
                    return;
                }
                if(!constante.descripcion){
                    MODEL.setProperty("/valueStateDescripcion","Error");
                    MODEL.setProperty("/valueStateTextDescripcion","La descripción es obligatorio");
                    return;
                }
                const dialogo = this._dialog["AgregarConstante"];
                dialogo.close();
                const idConstante = constante.ID;
                if(idConstante){
                    this._actualizarConstante(constante);
                    return;
                }
                this._guardarConstante(constante);
            },

         
            onEditarConstante: async function (evento) {
                this.onMostrarDialogoAgregarConstante();
                const constante = evento.getSource().getBindingContext().getObject();
                MODEL.setProperty("/constante",constante);
            },

            onValidarNombreConstante: function (evento) {
                const nombre = evento.getParameter("value");
                const input = evento.getSource();
                if(!nombre){
                    input.setValueState("Error");
                    input.setValueStateText("Error");
                    return;
                }
                input.setValueState("Success");
                input.setValueStateText("Nombre correcto");
            },
           
            onValidarValorConstante: function (evento) {
                const nombre = evento.getParameter("value");
                const input = evento.getSource();
                if(!nombre){
                    input.setValueState("Error");
                    input.setValueStateText("Error");
                    return;
                }
                input.setValueState("Success");
                input.setValueStateText("Valor correcto");
            },

         
            onValidarDescripcionConstante: function (evento) {
                const nombre = evento.getParameter("value");
                const input = evento.getSource();
                if(!nombre){
                    input.setValueState("Error");
                    input.setValueStateText("Error");
                    return;
                }
                input.setValueState("Success");
                input.setValueStateText("Descripción correcta");
            },

           
            _getResourceBundle : function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },

            _guardarConstante : async function (constante) {
                const data = {
                    "nombre": constante.nombre,
                    "valor": constante.valor,
                    "descripcion": constante.descripcion
                }
                const request = await this.onCrearEntitiy("/Constantes", data);
                if(request){
                    MessageBox.success(`La constante ${constante.nombre} se guardó con éxito`);
                }
            },

            _actualizarConstante : async function (constante) {
                const data = {
                    valor: constante.valor
                }
                const request = await this.onUpdateEntitiy(`/Constantes('guid${constante.ID}')`,data);
                if(request){
                    MessageBox.success(`La constante ${constante.nombre} se actualizó con éxito`);
                }
            },      
            */   
            onvalidarCampos: async function(fila){
            let valid = true;
            let aMensajes = [];
            let regexCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if(fila.nombre == ""){                
              aMensajes.push("Por favor ingrese un nombre");
              
            }
            if(fila.apellido == ""){                
             aMensajes.push("Por favor ingrese los apellidos");                
            }
            if(fila.email == ""){
                
                aMensajes.push("Por favor ingrese un correo");              
              
            }else if(fila.email){
              let test =  regexCorreo.test(fila.email);
              if(!test){
                aMensajes.push("Por favor ingrese un correo valido"); 
              }
            }
            // Crea un arreglo de MessageStrips basado en el array aMensajes
            const aMessageStrips = aMensajes.map(function (sMensaje, iIndex) {
                return new sap.m.MessageStrip({                    
                    text: sMensaje,
                    type: sap.ui.core.MessageType.Error ,// Define el tipo de mensaje, como Error
                    icon: "sap-icon://status-error",
                    showIcon: true,
                });
            });

             // Crea un diálogo personalizado para mostrar los MessageStrips
             const oDialog = new sap.m.Dialog({
                 title: "Validación de campos",
                 icon: "sap-icon://status-error",
                 content: aMessageStrips, // Agrega los MessageStrips al contenido del diálogo
                 beginButton: new sap.m.Button({
                     text: "Cerrar",
                     press: function () {
                         oDialog.close();
                     }
                 }),
                 afterClose: function () {
                     oDialog.destroy(); // Limpia el diálogo después de cerrarlo
                 }
             });
             if(aMensajes.length>0){
                valid = false;
                oDialog.open();                
             }

             return valid;
                         
            },
            onGuardarResponsable: async function(oEvent){ 
                let mensaje= "";  
                let oItem = oEvent.getSource().getBindingContext().getObject();
                let obj = {
                    "ID":oItem.ID,
                    "nombre": oItem.nombre,
                    "apellido": oItem.apellido,
                    "estado": oItem.estado,
                    "delete": false,
                    "email":oItem.email
                }; 
                
                let valid = await that.onvalidarCampos(oItem)
                if(!valid){
                   return;
                }
                if(oItem.ID != undefined){
                    mensaje = "¿Estás seguro de actualizar el usuario?";
                    let usuarioExistenteEdit = await that.onValidarUsuarioExistenteEdit(oItem);
                    if(!usuarioExistenteEdit){
                        that.onAbrirDialogMensajes(["El correo ya se encuentra en uso por otro usuario."],"El correo ya se encuentra registrado");
                        return;
                        }
                }
                else{
                    mensaje = "¿Estás seguro de crear el usuario?";
                    let usuarioExistente = await that.onValidarUsuarioExistente(oItem);                
                    if(!usuarioExistente){
                    that.onAbrirDialogMensajes(["El correo ya se encuentra en uso por otro usuario."],"El correo ya se encuentra registrado");
                    return;
                    }
                }            
                
                sap.m.MessageBox.confirm(mensaje, {
                    title: "Confirmación",
                    onClose: async function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.OK) {
                            sap.ui.core.BusyIndicator.show();  
                            await that.onEsperarSegundos(1000);
            
                            if(oItem.ID == undefined){
                                obj.ID = 0;
                                const solicitud = await that.onCrearEntitiy("/MaestroResponsable",obj); 
                                MessageBox.success("Usuario responsable creado con éxito.");
                            }
                            else{
                                const solicitud = await that.onUpdateEntitiy("/MaestroResponsable/" + oItem.ID ,obj);
                                MessageBox.success("Usuario responsable actualizado con éxito.");
                            }                 
                            that.onObtenerResponsables();
                            sap.ui.core.BusyIndicator.hide();  
                        }                          
                    }
                });               

               

            },   
            onCrearResponsables: async  function() {              
                var oTable = that.getView().byId("frg-DatosMaestros--idTbResponsables"); 
                var oModel = oTable.getModel();  
                var aResponsables = oModel.getProperty("/Responsables");  
                aResponsables.push({
                  codigo: "",
                  nombre: "",
                  apellido: "",
                  edit: true,
                  estado: true, // Por defecto, establecemos el estado como "Activo"
                  email:""
                });

                let obj = {
                    "ID":0,
                    "nombre": "",
                    "apellido": "",
                    "estado": true,
                    "delete": false,
                    "email": ""
                };    
                oModel.setProperty("/Responsables", aResponsables);  
                oTable.setModel(oModel);
              },
              onValidarUsuarioActivo: async function(fila){
               let valid;
                (fila.estado)?valid = false:valid=true
                return valid;
              },
              onValidarUsuarioExistenteEdit: function(fila){
                let valid = false;
                var oTable = this.getView().byId("frg-DatosMaestros--idTbResponsables");
                var aItems = oTable.getModel().getData().Responsables;
                var bCorreoExistente = false;
                for (var i = 0; i < aItems.length; i++) {
                    var sCorreoExistente = aItems[i].email; 
                    if (aItems[i].ID != fila.ID) { // Evita comparar con el elemento actual
                        
                        if (sCorreoExistente == fila.email) {
                            bCorreoExistente = true;
                            break;
                        }
                    }
                }
                if (!bCorreoExistente) {
                    valid = true;
                }
                return valid;
              },
              onValidarUsuarioExistente: function(fila){
                let valid = true;
                var oTable = this.getView().byId("frg-DatosMaestros--idTbResponsables");
                var aItems = oTable.getModel().getData().Responsables;
                var bCorreoExistente = false;
                for (var i = 0; i < aItems.length; i++) {
                    var sCorreoExistente = aItems[i].email; 
                    if (aItems[i].ID != undefined) { // Evita comparar con el elemento actual
                        
                        if (sCorreoExistente == fila.email) {
                            bCorreoExistente = true;
                            break;
                        }
                    }
                }
                if (bCorreoExistente) {
                    valid = false;
                }
                return valid;
              },
              onAbrirDialogMensajes: function(aMensajes,tituloDialog){
                const aMessageStrips = aMensajes.map(function (sMensaje, iIndex) {
                    return new sap.m.MessageStrip({                    
                        text: sMensaje,
                        type: sap.ui.core.MessageType.Error ,// Define el tipo de mensaje, como Error
                        icon: "sap-icon://status-error",
                        showIcon: true,
                    });
                });
    
                 // Crea un diálogo personalizado para mostrar los MessageStrips
                 const oDialog = new sap.m.Dialog({
                     title: tituloDialog,
                     icon: "sap-icon://status-error",
                     content: aMessageStrips, // Agrega los MessageStrips al contenido del diálogo
                     beginButton: new sap.m.Button({
                         text: "Cerrar",
                         press: function () {
                             oDialog.close();
                         }
                     }),
                     afterClose: function () {
                         oDialog.destroy(); // Limpia el diálogo después de cerrarlo
                     }
                 });
                 oDialog.open();
              },
              onEliminarResponsable: async function (oEvent) {
                var oTable = this.getView().byId("frg-DatosMaestros--idTbResponsables"); 
                let oItem = oEvent.getSource().getBindingContext().getObject();
                if(oItem.ID==undefined){                  
                  var aResponsables = oTable.getModel().getProperty("/Responsables");
                  var nIndex = aResponsables.indexOf(oItem);
                  if (nIndex !== -1) {
                    aResponsables.splice(nIndex, 1);
                    oTable.getModel().setProperty("/Responsables", aResponsables);
                  }
                  return;
                }
                let valid = await that.onValidarUsuarioActivo(oItem);
                if(!valid){
                that.onAbrirDialogMensajes(["No puede eliminar un usuario activo"],"Eliminar usuario");
                return;
                }
                sap.m.MessageBox.confirm("¿Estás seguro de eliminar el usuario?", {
                    title: "Confirmación",
                    onClose: async function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.OK) {
                            
                            sap.ui.core.BusyIndicator.show();  
                            await that.onEsperarSegundos(1000);
                                           
                            let obj = {
                                "ID":0,
                                "nombre": "",
                                "apellido": "",
                                "estado": false,
                                "delete": true,
                                "email":""
                            }; 
                            const solicitud = await that.onUpdateEntitiy("/MaestroResponsable/" + oItem.ID ,obj);
                            that.onObtenerResponsables();  
                            MessageBox.success("Usuario eliminado con éxito");  
                            sap.ui.core.BusyIndicator.hide(); 
                        } 
                    }
                });                         
              },
              onEditarResponsable: function(oEvent){               
                
                 let sPath = oEvent.getSource().getBindingContext().sPath.split("/")[2];
                 let oTable = this.getView().byId("frg-DatosMaestros--idTbResponsables");
                 let data = this.getView().byId("frg-DatosMaestros--idTbResponsables").getModel().getData().Responsables;
                 let fila = data[sPath];                 
                 fila.edit = !fila.edit;   
                 let oModel = new sap.ui.model.json.JSONModel({
                    Responsables: data
                 });              
                 oTable.setModel(oModel);
              },

              onCrearEntitiy:function(path,data){
                return new Promise((resolve,reject) => {
                    ODATA_CONFIGURACIONES.create(path,data,{
                        success: resolve,
                        error: reject
                    });
                });
            },
            onUpdateEntitiy:function(path,data){
                return new Promise((resolve,reject) => {
                    ODATA_CONFIGURACIONES.update(path,data,{
                        success: resolve,
                        error: reject
                    });
                });
            },
           
            onObtenerResponsables: function(){                
                ODATA_CONFIGURACIONES.read('/MaestroResponsable', {		
                    //filters: filters,		
                    urlParameters: {
                        "$expand":""
                    },
                    success: function (result) {                  
                      var oTable = that.getView().byId("frg-DatosMaestros--idTbResponsables"); 
                      $.each(result.results,function(i,item){
                        item.edit = false; 
                        item.ID = item.ID.toString(); 
                      });
                      let oModel = new sap.ui.model.json.JSONModel({
                      Responsables: result.results
                      });
                      oTable.setModel(oModel);                        
                    },
                    error: function (err) {                        
                        var error = err;
                        MessageBox.error("Error al listar datos de la entidad:" + entidad);
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            },
            onSearch: function (oEvent) {
                // Obtén el valor de búsqueda del campo de entrada                
                var sSearchValue = oEvent.mParameters.newValue;            
                // Obtiene la referencia a la tabla y al modelo de datos
                var oTable = this.getView().byId("frg-DatosMaestros--idTbResponsables");
                var oModel = oTable.getModel();            
                // Aplica el filtro a los datos del modelo
                var aFilters = [];
                if (sSearchValue) {
                    sSearchValue = sSearchValue.toString();
                    aFilters.push(new sap.ui.model.Filter([
                        new sap.ui.model.Filter("nombre", sap.ui.model.FilterOperator.Contains, sSearchValue.toString()),
                        new sap.ui.model.Filter("apellido", sap.ui.model.FilterOperator.Contains, sSearchValue.toString()),
                        new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sSearchValue.toString()),
                        new sap.ui.model.Filter("email", sap.ui.model.FilterOperator.Contains, sSearchValue.toString())
                    ], false));
                }
            
                oTable.getBinding("items").filter(aFilters);
            },
            onEsperarSegundos(milisegundos) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, milisegundos); 
                });
              },                 
              
        });
    });
