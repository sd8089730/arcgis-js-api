// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.34/esri/copyright.txt for details.

define({documentTypes:{arcgis:{caption:"Metadatos de ArcGIS",editorCaption:"Metadatos",description:""}},emptyOption:"Vacía",conditionals:{ISO19139A1_ROW4:"Si el nivel de la jerarquía de metadatos es de dataset, se requiere un cuadro de delimitación geográfica o una descripción geográfica.",ISO19139A1_ROW6:"Se requiere un identificador de dataset o el nombre del dataset.",ISO19139A1_ROW7:"Si se selecciona Otras restricciones, el valor Otras restricciones será necesario.",ISO19139A1_ROW9:"Si el alcance no es un dataset ni una serie, será necesaria la descripción del nivel.",ISO19139A1_ROW10_11_12:"Si el alcance es un dataset o una serie, será necesaria una declaración, paso de proceso o fuente de datos.",ISO19139A1_ROW15:"Si selecciona Disponibilidad de punto de control, será necesaria la descripción del punto de control.",ISO19139A1_ROW18:"Si la distribución está documentada, será necesario el formato o el distribuidor/formato.",INSPIRE_AccessLimitation:" Se requiere al menos un código de restricción de acceso legal o un código de clasificación de seguridad. (INSPIRE)",INSPIRE_UseLimitation:" Se requiere al menos una limitación de uso. (INSPIRE)",INSPIRE_ConformanceResult:"Para un informe de consistencia de dominio se requiere un resultado de conformidad. (INSPIRE)",INSPIRE_DomainConsistency:"Se requiere un informe de consistencia de dominio. (INSPIRE)",INSPIRE_LineageStatement:"Si el alcance es un dataset o una serie, se requiere una declaración de linaje. (INSPIRE).",FGDC_DescIfTemporal:"Se requiere una descripción para una extensión temporal. (FGDC)",FGDC_Keywords:"Se requiere un tema, etiqueta o palabra clave de tema. (FGDC)",FGDC_Reports:"Se requieren los informes de omisión de completitud y consistencia conceptual. (FGDC)",FGDC_Temporal:"Se requiere al menos una extensión temporal. (FGDC)",NAP_Contact:"Se requiere una dirección/punto de entrega, número de teléfono/voz o recurso en línea/URL. (NAP)",GEN_BoundingBox:"Se requiere al menos un cuadro de delimitación geográfica.",GEN_ReportResult:"Se requiere un resultado de conformidad o cuantitativo.",minLessThanMax:"El valor mínimo debe ser menor que el valor máximo."},hints:{integerGreaterThanZero:"(introduce un entero > 0)",integerGreaterThanOne:"(introduzca un entero > 1)",integer0To100:"(introduce un entero de 0 a 100)",maxScale:"(introduce un entero > 0, por ejemplo, 50.000)",minScale:"(introduce un entero > 0, por ejemplo, 150.000.000)",number0To100:"(introduce un número de 0 a 100)",number0To360:"(introduce un número de 0 a 360)",number90To90:"(introduce un número de -90 a 90)",listOfDoubles:"(introduce una lista de números y utiliza un espacio para separarlos)"},htmlEditor:{button:"Editar..."},sections:{overview:"Vista general",esri:"Esri",resource:"Recurso",reference:"Referencia",content:"Contenido",distribution:"Distribución",quality:"Calidad",eainfo:"Campos",representation:"Representación",metadata:"Metadatos"},metadataStyle:{caption:"Estilo de metadatos de ArcGIS",changeButton:"Cambiar...",dialogTitle:"Selecciona un estilo de metadatos",updating:"Actualizando el documento...","Item Description":"Descripción del elemento","FGDC CSDGM Metadata":"Metadatos CSDGM de FGDC","ISO 19139 Metadata Implementation Specification":"Especificación de la implementación de metadatos según ISO 19139","ISO 19139 Metadata Implementation Specification GML3.2":"Especificación GML3.2 de la implementación de metadatos según ISO 19139","INSPIRE Metadata Directive":"Directiva de metadatos de INSPIRE","North American Profile of ISO19115 2003":"Perfil de Norteamérica de ISO19115 2003"},aggrInfo:{caption:"MD_AggregateInformation",datasetHint:"Se requiere un identificador de dataset o el nombre del dataset.",aggrDSIdent:"Identificador de dataset",aggrDSName:"Nombre de dataset"},appSchInfo:{caption:"Esquema de aplicación",asName:"Nombre de esquema",asSchLang:"Lenguaje de esquema",asCstLang:"Lenguaje de restricción",asAscii:"ASCII",asGraFile:"Archivo de gráficos",asGraFile_src:"Fuente de archivo de origen",asSwDevFile:"Archivo de desarrollo de software",asSwDevFile_src:"Fuente de archivo de desarrollo de software",asSwDevFiFt:"Formato de archivo de desarrollo de software"},citation:{caption:"Citación",section:{titlesAndDates:"Títulos y fechas",links:"Direcciones URL",identifiers:"Identificadores",presentation:"Forma",other:"Otro",edition:"Edición",series:"Series"},conditionalDate:{caption:"Fecha de citación",msg:"Se requiere la fecha de creación, de publicación o de revisión.",msg_nap:"Se requiere una fecha de citación."},resTitle:"Título",resAltTitle:"Título alternativo",collTitle:"Título colectivo",date:{createDate:"Fecha de creación",pubDate:"Fecha de publicación",reviseDate:"Fecha de revisión",notavailDate:"Fecha no disponible",inforceDate:"Fecha en vigor",adoptDate:"Fecha de adopción",deprecDate:"Fecha de desaprobación",supersDate:"Fecha de sustitución"},isbn:"ISBN",issn:"ISSN",citId:{caption:"Identificador",identCode:"Código",identAuth:"Citación de autoridad"},resEd:"Edición",resEdDate:"Fecha de edición",datasetSeries:{seriesName:"Nombre",issId:"Problema",artPage:"Página"},otherCitDet:"Otros detalles",contactCaption:"Contacto de citación"},cntAddress:{caption:"Dirección",delPoint:"Punto de entrega",city:"Ciudad",adminArea:"Área administrativa",postCode:"Código postal",country:"País",eMailAdd:"Correo Electrónico",addressType:{caption:"Tipo de dirección",postal:"Postal",physical:"Postal",both:"Ambas"}},cntOnlineRes:{caption:"Recurso online",linkage:"URL",protocol:"Protocolo",appProfile:"Perfil de aplicación",orName:"Nombre",orDesc:"Descripción"},cntPhone:{caption:"Teléfono",voiceNum:"Voz",faxNum:"Fax",tddtty:"¿TDD/TTY?"},codeRef:{caption:"Identificador",identCode:"Código",idCodeSpace:"Espacio del código",idVersion:"Versión",identAuth:"Citación de autoridad"},constraints:{caption:"Restricciones",useLimit:"Límite de uso",general:{caption:"General"},legal:{caption:"Legal",accessConsts:"Restricciones de acceso",useConsts:"Restricciones de uso",othConsts:"Otras restricciones"},security:{caption:"Seguridad",classSys:"Sistema de clasificación",userNote:"Nota del usuario",handDesc:"Descripción del manejo"}},contInfo:{caption:"Información de contenido",section:{CovDesc:"Descripción de cobertura",ImgDesc:"Descripción de la imagen",FetCatDesc:"Catálogo de entidades"},attDesc:"Descripción del atributo",covDim:{caption:"Rango o banda",seqID:"Identificador de secuencia",seqIDType:"Tipo de identificador de secuencia",dimDescrp:"Descriptor"},RangeDim:{caption:"Dimensión del rango"},Band:{caption:"Banda",minVal:"Valor Mínimo",maxVal:"Valor Máximo",valUnit:"Unidades de valor",pkResp:"Respuesta pico",bitsPerVal:"Bits por valor",toneGrad:"Gradación de tonos",sclFac:"Factor de escala",offset:"Desplazamiento"},CovDesc:{caption:"Descripción de cobertura",section:{description:"Descripción",rangesAndBands:"Rangos y bandas"}},ImgDesc:{caption:"Descripción de la imagen",section:{description:"Descripción",rangesAndBands:"Rangos y bandas"},illElevAng:"Ángulo de elevación de la iluminación",illAziAng:"Ángulo acimutal de iluminación",cloudCovPer:"Porcentaje de cobertura de nubes",cmpGenQuan:"Calidad de compresión",trianInd:"¿Indicador de triangulación?",radCalDatAv:"¿Disponibilidad de datos de calibración radiométrica?",camCalInAv:"¿Disponibilidad de información de calibración de cámara?",filmDistInAv:"¿Disponibilidad de información de distorsión de película?",lensDistInAv:"¿Disponibilidad de información de distorsión de lente?",imagQuCode:"Código de calidad",prcTypCde:"Código de nivel de procesamiento"},FetCatDesc:{caption:"Catálogo de entidades",section:{description:"Descripción",featureTypes:"Tipos de entidad",citation:"Citación"},compCode:"¿Cumple con ISO 19110?",incWithDS:"Included With Dataset?",catCitation:"Citación de catálogo de entidades",catFetTyps:{caption:"Tipo de entidad",genericName:"Nombre",codeSpace:"Espacio del código"}}},contact:{caption:"Contacte",section:{name:"Nombre de contacto",info:"Información de contacto",hoursAndInstructions:"Horario e instrucciones"},conditionalName:{caption:"Nombre de contacto",msg:"Se requiere el nombre individual, el nombre de la organización o el nombre de la posición.",msg_fgdc:"Se requiere el nombre individual o el nombre de la organización."},rpIndName:"Nombre del individuo",rpOrgName:"Nombre de la organización",rpPosName:"Nombre del cargo",rpCntInfo:"Información de contacto",cntHours:"Horas de servicio",cntInstr:"Instrucciones de contacto"},distInfo:{caption:"Información de distribución",section:{format:"Formato",distributor:"Distribuidor",transfer:"Opciones de transferencia"},distFormat:{caption:"Formato de distribución",formatName:"Nombre del Formato",formatVer:"Versión de formato",formatAmdNum:"Número de corrección",formatSpec:"Especificación",fileDecmTech:"Técnica de descompresión",formatInfo:"Contenido de información"},distributor:{caption:"Distribuidor"},distTranOps:{caption:"MD_DigitalTransferOptions",section:{unitsAndSize:"Unidades"},unitsODist:"Unidades de distribución",transSize:"Tamaño de transferencia",offLineMed:{caption:"Medio sin conexión",medDensity:"Densidad",medDenUnits:"Unidades de densidad",medVol:"Volúmenes",medNote:"Nota del medio"}},distorOrdPrc:{caption:"Proceso de clasificación",resFees:"Cuotas",planAvDtTm:"Fecha de disponibilidad",planAvTmPd:{caption:"Periodo de fecha de disponibilidad",tmBegin:"Fecha/hora de inicio",tmEnd:"Fecha/hora de finalización"},ordInstr:"Instrucciones de clasificación",ordTurn:"Giro"}},dqInfo:{caption:"Calidad de datos",section:{scope:"Alcance",report:"Informe",lineage:"Linaje"},dqScope:{section:{level:"Nivel",extent:"Extensión"},scpLvl:"Nivel del alcance",scpLvlDesc:"Descripción del nivel",scpExt:"Extensión de alcance"},report:{section:{measure:"Medición",evaluation:"Evaluación",result:"Resultado",conformance:"Conformidad"},measDesc:"Descripción de medida",measName:"Nombre de medida",measDateTm:"Fecha de medida",measId:"Identificador de medida",evalMethDesc:"Método de evaluación",evalProc:"Cita de procedimiento",ConResult:{caption:"Resultado de conformidad",conExpl:"Explicación",conSpec:"Especificación",conPass:{caption:"Grado",_1:"Conforme",_0:"No conforme"}},QuanResult:{caption:"Resultado cuantitativo",quanVal:"Valor",quanValType:"Tipo de valor",quanValUnit:"Unidades de valor",errStat:"Estadística de errores"}},dataLineage:{section:{statement:"Estamento",dataSource:"Fuente de Datos",prcStep:"Paso de proceso"},statement:"Declaración de linaje",dataSource:{caption:"Fuente de Datos",section:{description:"Descripción",srcRefSys:"Sistema de Referencia",srcExt:"Extensión",srcCitatn:"Citación"},srcDesc:"Descripción de la fuente",srcScale:{rfDenom:"Denominador de escala"},srcRefSys:"Sistema de referencia de origen",srcExt:"Extensión de la fuente",srcCitatn:"Citación de fuente"},prcStep:{caption:"Paso de proceso",section:{description:"Descripción",stepProc:"Procesador",stepSrc:"Fuente de Datos"},stepDesc:"Descripción del proceso",stepRat:"Razonamiento",stepDateTm:"Fecha del paso de proceso",stepProc:"Procesador",stepSrc:"Fuente de Datos"}}},eainfo:{caption:"Información de entidad y atributo",section:{detailed:"Detalles",overview:"Vista general"},detailed:{caption:"Detalles de entidad y atributos",section:{enttyp:"Entidad",attr:"Atributos"},enttyp:{caption:"Tipo de Entidad",enttypl:"Etiqueta",enttypt:"Objeto",enttypc:"Calcular",enttypd:"Definición",enttypds:"Fuente de definición"},attr:{caption:"Atributo",section:{description:"Descripción",value:"Valor",domain:"Dominio"},attrlabl:"Etiqueta",attalias:"Alias",attrdef:"Definición",attrdefs:"Fuente de definición",attrtype:"Tipo",attwidth:"Ancho",atprecis:"Precisión",attscale:"Escala",atindex:"Indexado",attrvai:{attrva:"Explicación del valor",attrvae:"Precisión del valor"},attrmfrq:"Frecuencia de medición de valor",begdatea:"Fecha de inicio de valores",enddatea:"Fecha de finalización de valores",attrdomv:{caption:"Dominio",edom:{caption:"Enumerado",edomv:"Valor",edomvd:"Definición",edomvds:"Fuente de definición"},rdom:{caption:"Rango",rdommin:"Valor Mínimo",rdommax:"Valor Máximo",rdommean:"Media",rdomstdv:"Desviación Típica",attrunit:"Unidades",attrmres:"Resolución de medición"},codesetd:{caption:"Conjunto de códigos",codesetn:"Nombre",codesets:"Origen"},udom:{caption:"No representable"}}}},overview:{caption:"Vista general",eaover:"Resumen",eadetcit:"Citación"}},extent:{caption:"Extensión",section:{description:"Descripción",geographic:"Geográfico",temporal:"Temporal",vertical:"Vertical"},exDesc:"Descripción de extensión",geoEle:{caption:"Extensión geográfica",GeoBndBox:{caption:"Cuadro de delimitación",esriExtentType:"¿Extensión para buscar?",exTypeCode:"¿La extensión contiene el recurso?",westBL:"Longitud de delimitación hacia el oeste",eastBL:"Longitud de delimitación hacia el este",southBL:"Latitud de delimitación hacia el sur",northBL:"Latitud de delimitación hacia el norte"},GeoDesc:{caption:"Descripción geográfica",exTypeCode:"¿La descripción contiene el recurso?",identCode:"Código"}},tempEle:{caption:"Extensión temporal",TM_Period:"Período de tiempo",TM_Instant:"Instante de tiempo",tmPosition:"fecha",tmBegin:"Fecha de inicio",tmEnd:"Fecha de fin"},vertEle:{caption:"Extensión vertical",vertMinVal:"Valor Mínimo",vertMaxVal:"Valor Máximo"}},graphOver:{caption:"Gráfico de exploración",bgFileName:"Examinar URL de gráfico",bgFileDesc:"Descripción de archivo gráfico de exploración",bgFileType:"Tipo de archivo gráfico de exploración"},keywords:{caption:"Palabras Claves",section:{topicCategory:"Tema",searchKeys:"Etiquetas",themeKeys:"Tema",placeKeys:"Lugar",tempKeys:"Temporal",discKeys:"Disciplina",stratKeys:"Estrato",productKeys:"Producto",subTopicCatKeys:"Subtema",otherKeys:"Otro"},delimited:"Palabras Claves",searchKeys:"Etiquetas",themeKeys:"Palabras clave del tema",placeKeys:"Palabras clave del lugar",tempKeys:"Palabras clave temporales",discKeys:"Palabras clave de disciplina",stratKeys:"Palabras clave de estrato",productKeys:"Palabras clave de producto",subTopicCatKeys:"Palabras clave del subtema",otherKeys:"Otras palabras clave",thesaName:"Citación de diccionario",thesaLang:"Idioma del diccionario"},locales:{caption:"Localizaciones",locale:"Regional",resTitle:"Título",idAbs:"Resumen"},maintenance:{caption:"Mantenimiento",section:{frequency:"Frecuencia",scope:"Alcance",note:"Nota"},usrDefFreq:"Frecuencia personalizada",dateNext:"Próxima actualización",maintScp:"Alcance de la actualización",upScpDesc:{caption:"MD_ScopeDescription",attribSet:"Atributos",attribIntSet:"Instancias de atributo",featSet:"Características",featIntSet:"Instancias de entidad",datasetSet:"Dataset",other:"Otras instancias"},maintNote:"Nota de mantenimiento",maintCont:"Contacto de mantenimiento"},metadata:{section:{profile:"Perfil",details:"Alcance"},mdFileID:"Identificador de archivos",mdParentID:"Identificador principal",datasetURI:"URI de dataset",dataSetFn:"Función de dataset",mdDateSt:"Fecha de metadatos",mdLang:"Lenguaje de metadatos",mdChar:"Juego de caracteres",mdHrLv:"Nivel de jerarquía",mdHrLvName:"Nombre de nivel de jerarquía",mdContact:"Contacto de metadatos",mdMaint:"Mantenimiento de metadatos",mdConst:"Restricciones de metadatos"},porCatInfo:{caption:"Cita de la representación"},refSysInfo:{caption:"Referencia espacial"},resource:{section:{citation:"Citación",details:"Detalles",description:"Descripción",keywords:"Palabras Claves",status:"Estado",resolution:"Resolución",representation:"Representación",browse:"Gráfico de exploración",format:"Formato",usage:"Us",aggregateInfo:"Agregación",additional:"Adicional"},idAbs:"Descripción (resumen)",idPurp:"Resumen (propósito)",suppInfo:"Información complementaria",idCredit:"Créditos",envirDesc:"Entorno de procesamiento",dataLang:"Lenguaje de recurso",dataExt:"Extensión de recurso",idPoC:"Punto de contacto",resMaint:"Mantenimiento del recurso",resConst:"Restricciones de recurso",dsFormat:"Formato de recurso",dataScale:{caption:"Escala de datos",equScale:"Resolución de escala",scaleDist:"Resolución de la distancia",scaleDist_value:"Distancia"},idSpecUse:{caption:"Uso de recurso",specUsage:"Uso específico",usageDate:"Fecha de uso",usrDetLim:"Limitaciones",usrCntInfo:"Contacto de uso"}},service:{caption:"Servicio",svType:"Tipo de servicio",svType_Name:"Nombre",svAccProps:"Propiedades de acceso",svCouplRes:{caption:"Recurso acoplado",svOpName:"Nombre de operación",svResCitId:"Identificador de recurso"},svCoupleType:"Tipo de acoplamiento"},scaleRange:{caption:"Rango de Escala",maxScale:"Escala máxima",minScale:"Ecala mínima"},spatRepInfo:{caption:"Representación espacial",section:{dimension:"Dimensión",parameters:"Parámetros"},numDims:"Número de dimensiones",tranParaAv:"¿Disponibilidad de parámetro de transformación?",axisDimension:{caption:"Dimensión",dimSize:"Tamaño",dimResol:{caption:"Resolución",_value:"Valor de resolución",uom:"Unidades de resolución"}},VectSpatRep:{caption:"Vector",geometObjs:"Objetos geométricos",geoObjCnt:"Recuento de objetos"},GridSpatRep:{caption:"Cuadrícula"},Georect:{caption:"Rectificado geográficamente",section:{centerPoint:"Punto central",cornerPts:"Puntos de esquina"},chkPtAv:"¿Disponibilidad de punto de control?",chkPtDesc:"Descripción del (punto) de control",ptInPixel:"Punto en píxel",transDimDesc:"Descripción de la dimensión de transformación",transDimMap:"Asignación de la dimensión de transformación",cornerPts:{caption:"Punto de esquina",pos:"Posición",gmlDesc:"Descripción",gmlDescRef:"Referencia",gmlIdent:"Identificador",codeSpace:"Espacio de código del identificador"}},Georef:{caption:"Georreferenciable",ctrlPtAv:"¿Disponibilidad de punto de control?",orieParaAv:"¿Disponibilidad de parámetro de orientación?",orieParaDs:"Descripción del parámetro de orientación",georefPars:"Parámetros georeferenciados",paraCit:"Citación de parámetros"},Indref:{caption:"Indirecto"}},booleanOptions:{_false:"No",_true:"Sí"},codelist:{CountryCode:"País",LanguageCode:"Idioma",MonetaryUnits:"Unidades monetarias",MonetaryUnits_empty:"Sin moneda universal",PresentationForm:"Formulario de presentación de datos geoespaciales FGDC",CI_PresentationFormCode:"Formulario de presentación",CI_RoleCode:"Rol",CI_OnLineFunctionCode:"Función",IMS_ContentType:"Tipo de contenido",DQ_ElementDimension:"Dimensión",DQ_ElementType:"Tipo de informe",DQ_EvaluationMethodTypeCode:"Tipo de evaluación",DS_AssociationTypeCode:"Tipo de asociación",DS_InitiativeTypeCode:"Tipo de iniciativa",LI_SourceType:"Tipo de Fuente",MD_CellGeometryCode:"Geometría de celda",MD_CharacterSetCode:"Juego de caracteres",MD_ClassificationCode:"Clasificación",MD_CoverageContentTypeCode:"Tipo de contenido",MD_DimensionNameTypeCode:"Tipo de dimensión",MD_GeometricObjectTypeCode:"Tipo de objeto geométrico",MD_ImagingConditionCode:"Condición de la imagen",MD_MaintenanceFrequenceCode:"Frecuencia de actualización",MD_MediumFormatCode:"Código de formato",MD_MediumNameCode:"Nombre del medio",MD_PixelOrientationCode:"Orientación de píxel",MD_ProgressCode:"Estado",MD_RestrictionCode:"Código de restricción",MD_ScopeCode:"Alcance",MD_SpatialRepresentationTypeCode:"Tipo de representación espacial",MD_TopicCategoryCode:"Categoría de tema",MD_TopologyLevelCode:"Nivel de topología",RS_Dimension:"Dimensión",SV_CouplingType:"Tipo de acoplamiento",UCUM:"Unidades",UCUM_Length:"Unidades de distancia"}});