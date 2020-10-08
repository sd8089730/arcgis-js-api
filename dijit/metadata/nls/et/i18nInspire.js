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

define({documentTypes:{data:{caption:"INSPIRE (andmed)",description:""},service:{caption:"INSPIRE (teenus)",description:""}},dataThemeKeywords:{caption:"Inspire andmete teema"},inspireServiceType:{discovery:"Discovery teenus",view:"Teenuse vaatamine",download:"Teenuse allalaadimine",transformation:"Transformatsiooni teenus",invoke:"Teenuse aktiveerimine",other:"Muu teenus"},keywordSections:{dataTheme:"Inspire andmete teema",serviceCategory:"ISO 19119 teenuse kategooria",gemetConcept:"GEMET-i kontseptsioon",otherKeywords:"Muud võtmesõnad"},LanguageCode:{bul:"bulgaaria",cze:"tšehhi",dan:"taani",dut:"hollandi",eng:"inglise",est:"eesti",fin:"soome",fre:"prantsuse",ger:"saksa",gre:"kreeka",hun:"ungari",gle:"gaeli (iiri)",ita:"itaalia",lav:"läti",lit:"leedu",mlt:"malta",pol:"poola",por:"portugali",rum:"rumeenia",slo:"slovaki",slv:"sloveeni",spa:"hispaania",swe:"rootsi",chi:"hiina",kor:"korea",nor:"norra",rus:"vene",tur:"türgi"},otherConstraints:{noLimitations:"piiranguteta",confidentialityOfProceedings:"Ametivõimude menetluste konfidentsiaalsus...",internationalRelations:"Rahvusvahelised suhted, avalik julgeolek või riigikaitse",courseOfJustice:"Õigusemõistmise kulg, kõigi inimeste õigus õiglasele kohtulahendile...",confidentialityOfCommercial:"Ärilise või tööstusliku teabe konfidentsiaalsus...",intellectualProperty:"Intellektuaalomandi õigused",confidentialityOfPersonalData:"Isikuandmete ja/või failide konfidentsiaalsus...",interestsOrProtection:"Teavet esitanud isikute huvid või kaitsmine...",protectionOfEnvironment:"Keskkonna kaitsmine, millega selline teave on seotud...",freeText:"Vaba tekst"},serviceType:{humanInteractionService:"100 Inimestevahelised geograafilised koostoimeteenused",humanCatalogueViewer:"101 Kataloogivaatur",humanGeographicViewer:"102 Geograafiline vaatur",humanGeographicSpreadsheetViewer:"103 Geograafilise töölehe vaatur",humanServiceEditor:"104 Teenuse redaktor",humanChainDefinitionEditor:"105 Ahela defineerimise redaktor",humanWorkflowEnactmentManager:"106 Töövoo jõustamise haldur",humanGeographicFeatureEditor:"107 Geograafiliste funktsioonide redaktor",humanGeographicSymbolEditor:"108 Geograafiliste sümbolite redaktor ",humanFeatureGeneralizationEditor:"109 Funktsioonide üldistamise redaktor",humanGeographicDataStructureViewer:"110 Geograafilise andmestruktuuri vaatur",infoManagementService:"200 Geograafilise mudeli / informatsiooni haldamise teenus",infoFeatureAccessService:"201 Funktsioonidele juurdepääsu teenus",infoMapAccessService:"202 Kaartidele juurdepääsu teenus",infoCoverageAccessService:"203 Kattealale juurdepääsu teenus",infoSensorDescriptionService:"204 Anduri kirjeldamise teenus",infoProductAccessService:"205 Tootele juurdepääsu teenus",infoFeatureTypeService:"206 Funktsioonitüübi teenus",infoCatalogueService:"207 Kataloogi teenus",infoRegistryService:"208 Registriteenus",infoGazetteerService:"209 Kohanimeloendi teenus",infoOrderHandlingService:"210 Tellimuste käsitsemise teenus",infoStandingOrderService:"211 Alaline tellimuseteenus",taskManagementService:"300 Geograafilise töövoo / tööde haldamise teenused",chainDefinitionService:"301 Ahela defineerimise teenus",workflowEnactmentService:"302 Töövoo jõustamise teenus",subscriptionService:"303 Tellimise teenus",spatialProcessingService:"400 Geograafilise töötlemise teenused – ruumilised",spatialCoordinateConversionService:"401 Koordinaatide teisendamise teenus",spatialCoordinateTransformationService:"402 Koordinaatide teisendamise teenus",spatialCoverageVectorConversionService:"403 Katteala/vektori teisendamise teenus",spatialImageCoordinateConversionService:"404 Kujutise koordinaadi teisendamise teenus",spatialRectificationService:"405 Parandamise teenus",spatialOrthorectificationService:"406 Õigekirja parandamise teenus",spatialSensorGeometryModelAdjustmentService:"407 Anduri geomeetrilise mudeli reguleerimise teenus",spatialImageGeometryModelConversionService:"408 Kujutise geomeetrilise mudeli teisendamise teenus",spatialSubsettingService:"409 Alamhulga teenus",spatialSamplingService:"410 Proovivõtu teenus",spatialTilingChangeService:"411 Tailimise muutmise teenus",spatialDimensionMeasurementService:"412 Dimensioonide mõõtmise teenus",spatialFeatureManipulationService:"413 Funktsioonide käsitsemise teenused",spatialFeatureMatchingService:"414 Funktsioonide sobitamise teenused",spatialFeatureGeneralizationService:"415 Funktsioonide üldistamise teenus",spatialRouteDeterminationService:"416 Marsruudi määramise teenus",spatialPositioningService:"417 Positsioneerimisteenus",spatialProximityAnalysisService:"418 Lähedusanalüüsi teenus",thematicProcessingService:"500 Geograafilise töötlemise teenused – temaatilised",thematicGoparameterCalculationService:"501 Geoparameetrite arvutamise teenus",thematicClassificationService:"502 Temaatilise klassifikatsiooni teenus",thematicFeatureGeneralizationService:"503 Funktsioonide üldistamise teenus",thematicSubsettingService:"504 Alamhulga teenus",thematicSpatialCountingService:"505 Ruumilise loendamise teenus",thematicChangeDetectionService:"506 Muudatuste tuvastamise teenus",thematicGeographicInformationExtractionService:"507 Geograafilise teabe tuletamise teenused",thematicImageProcessingService:"508 Rasterandmete töötlemise teenus",thematicReducedResolutionGenerationService:"509 Vähendatud resolutsiooni loomise teenus",thematicImageManipulationService:"510 Rasterandmete käsitsemise teenused",thematicImageUnderstandingService:"511 Kujutise mõistmise teenused",thematicImageSynthesisService:"512 Kujutise sünteesi teenused",thematicMultibandImageManipulationService:"513 Mitme lainesagedusega rasterandmete käsitsemine",thematicObjectDetectionService:"514 Objekti tuvastamise teenus",thematicGeoparsingService:"515 Geoparsimise teenus",thematicGeocodingService:"516 Geokodeerimise teenus",temporalProcessingService:"600 Geograafilise töötlemise teenused – ajutised",temporalReferenceSystemTransformationService:"601 Ajutise baassüsteemi teisendamise teenus",temporalSubsettingService:"602 Alamhulga teenus",temporalSamplingService:"603 Valimi teenus",temporalProximityAnalysisService:"604 Ajutise läheduse analüüsi teenus",metadataProcessingService:"700 Geograafilise töötlemise teenused – metaandmed",metadataStatisticalCalculationService:"701 Statistilise arvutuse teenus",metadataGeographicAnnotationService:"702 Geograafilise annoteerimise teenused",comService:"800 Geograafilise kommunikatsiooni teenused",comEncodingService:"801 Kodeerimisteenus",comTransferService:"802 Ülekandeteenus",comGeographicCompressionService:"803 Geograafiline tihendamise teenus",comGeographicFormatConversionService:"804 Geograafilise formaadi teisendamise teenus",comMessagingService:"805 Sõnumiteenus",comRemoteFileAndExecutableManagement:"806 Failide ja täitmisfailide kaughaldus"},useLimitation:{noCondition:"Tingimusi ei rakendata",unknownCondition:"Tingimused teadmata",freeText:"Vaba tekst"}});