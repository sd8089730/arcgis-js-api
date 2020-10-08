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

define({general:{cancel:"Annullér",close:"Luk",none:"Ingen",ok:"OK",other:"Andet",stamp:"Stempel",now:"Nu",choose:"Vælg ét:"},editor:{noMetadata:"Der er ingen metadata for dette element.",xmlViewOnly:"Den type metadata, der er knyttet til dette element, understøttes ikke af editoren. Metadata skal være i ArcGIS-format.",editorDialog:{caption:"Metadata",captionPattern:"Metadata for {title}"},primaryToolbar:{view:"Vis",viewXml:"Vis XML",edit:"Redigér",initializing:"Loading...",startingEditor:"Starter editor...",loadingDocument:"Indlæser dokument...",updatingDocument:"Opdaterer dokument...",generatingView:"Genererer visning...",errors:{errorGeneratingView:"Der opstod en fejl under generering af visningen.",errorLoadingDocument:"Der opstod en fejl under indlæsning af dokumentet."}},changesNotSaved:{prompt:"Dit dokument indeholder ændringer, der ikke er blevet gemt.",dialogTitle:"Luk Metadata Editor",closeButton:"Luk"},download:{caption:"Hent",dialogTitle:"Hent",prompt:"Klik her for at hente din fil."},load:{caption:"Åbn",dialogTitle:"Åbn",typeTab:"Nyt dokument",fileTab:"Åbn fil",templateTab:"En skabelon",itemTab:"Dit element",filePrompt:"Vælg en lokal ArcGIS Metadata XML-fil. Metadata skal være i ArcGIS format.",templatePrompt:"Opret metadata",pullItem:"Udfyld metadata med elementoplysninger.",importWarning:"Den valgte fil bliver ikke vist i ArcGIS-format. Overførte metadata skal være i ArcGIS-format.",loading:"Loading...",noMetadata:"Du kan oprette metadata til dette element ved at vælge en af følgende indstillinger.",unrecognizedMetadata:"Den type metadata, der er knyttet til dette element, understøttes ikke af editoren. Du kan oprette understøttede metadata ved at vælge en af følgende indstillinger.",errorLoading:"Der opstod en fejl under indlæsning.",warnings:{badFile:"Den valgte fil kunne ikke indlæses.",notAnXml:"Den valgte fil er ikke en XML-fil.",notSupported:"Denne filtype understøttes ikke."},portalCaption:"Overskriv"},save:{caption:"Gem",dialogTitle:"Gem metadata",working:"Gemmer metadata...",errorSaving:"Der opstod en fejl, dine metadata blev ikke gemt.",saveDialog:{pushCaption:"Anvend ændringerne til elementet"}},saveAndClose:{caption:"Gem og luk"},saveDraft:{caption:"Hent",dialogTitle:"Hent"},validate:{caption:"Bekræft",dialogTitle:"Validering",docIsValid:"Dit dokument er gyldigt."},viewHtml:{caption:"Vis",dialogTitle:"Vis metadata",savePrompt:"Dit dokument indeholder ændringer, der ikke er gemt. Du skal gemme ændringerne, hvis de skal vises i metadata.",saveButton:"Gem og vis",portalNone:"Der er ikke oprettet standardbaserede metadata. Du skal gemme, før du kan få vist metadata."},del:{caption:"Slet",dialogTitle:"Slet metadata",prompt:"Er du sikker på, at du vil slette disse metadata?",working:"Sletter metadata...",errorDeleting:"Der opstod en fejl, dine metadata blev ikke slettet.",portalNone:"Der er intet metadata-dokument at slette. Der er ikke oprettet standardbaserede metadata.",portalPrompt:"Dette sletter metadata-dokumentet og nulstiller elementets metadata til element-oplysninger som titel, beskrivelse, etc.",portalPrompt2:"Dette vil slette standardbaserede metadata. Er du sikker på, at du vil slette disse metadata?",portalButton:"Slet og luk"},transform:{caption:"Omdan",dialogTitle:"Omdan til",prompt:"",working:"Omdanner...",errorTransforming:"Der opstod en fejl under omdannelse af dokumentet."},errorDialog:{dialogTitle:"Der opstod en fejl"}},arcgis:{portal:{metadataButton:{caption:"Metadata"}}},calendar:{button:"Kalender...",title:"Kalender"},geoExtent:{button:"Indstil geografisk udstrækning...",title:"Geografisk udstrækning",navigate:"Navigér",draw:"Tegn et rektangel",drawHint:"Tryk ned for at begynde, og slip for at afslutte."},hints:{date:"(yyyy eller yyyy-mm eller yyyy-mm-dd)",dateTime:"(yyyy-mm-ddThh:mm:ss.sss[+-]hh:mm)",dateOrDateTime:"(yyyy eller yyyy-mm eller yyyy-mm-dd eller yyyy-mm-ddThh:mm:ss.sss[+-]hh:mm)",delimitedTextArea:"(brug komma eller ny linje til at adskille)",fgdcDate:"(yyyy eller yyyy-mm eller yyyy-mm-dd)",fgdcTime:"(hh:mm:ss.sss[+-]hh:mm)",integer:"(indtast et heltal)",latitude:"(decimalgrader)",longitude:"(decimalgrader)",number:"(indtast et tal)",numberGreaterThanZero:"(indtast et tal > 0)"},isoTopicCategoryCode:{caption:"Emnekategori",boundaries:"Administrative og politiske grænser",farming:"Landbrug",climatologyMeteorologyAtmosphere:"Atmosfære og klima",biota:"Biologi og økologi",economy:"Forretning og økonomi",planningCadastre:"Matrikeloversigt",society:"Kultur, samfund og demografi",elevation:"Højdemåling og afledede produkter",environment:"Miljø og fredning",structure:"Anlæg og infrastruktur",geoscientificInformation:"Geologi og geofysik",health:"Sundhed og sygdom",imageryBaseMapsEarthCover:"Billeder og baggrundskort",inlandWaters:"Indenlandske vandressourcer",location:"GPS- og geodætiske netværk",intelligenceMilitary:"Militær",oceans:"Oceaner og flodmundinger",transportation:"Transportsystemer",utilitiesCommunication:"Offentlige værker og kommunikation"},multiplicity:{moveElementDown:"Flyt sektion ned",moveElementUp:"Flyt sektion op",removeElement:"Fjern sektion",repeatElement:"Gentag sektion"},optionalNode:{switchTip:"Medtag eller udelad denne sektion."},serviceTypes:{featureService:"Featuretjeneste",mapService:"Korttjeneste",imageService:"Billedtjeneste",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} - {message}",patternWithHint:"{label} - {message} {hint}",ok:"OK",empty:"Der kræves en værdi.",date:"Værdien skal være en dato.",integer:"Værdien skal være et heltal.",number:"Værdien skal være et tal.",other:"Ugyldig værdi."},validationPane:{clearMessages:"Ryd meddelelser",prompt:"(klik på hver meddelelse nedenfor, og indtast de krævede oplysninger i det angivne felt)"}});