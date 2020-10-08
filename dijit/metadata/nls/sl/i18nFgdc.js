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

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"Brez",notComplete:"Ni dokončano",other:"Drugo",present:"Prisotno",unknown:"Neznano",unpublishedMaterial:"Neobjavljen material"},hints:{integerGreaterThanOne:"(vnesite celo število > 1)",integer0To100:"(vnesite celo število 0..100)"},citeinfo:{caption:"Informacije o navedku",origin:"Informator",pubdate:"Datum objave",pubtime:"Čas objave",title:"Naslov",edition:"Izdaja",geoform:{caption:"Oblika predstavitve geoprostorskih podatkov",atlas:"Atlas",audio:"Zvočni zapis",diagram:"Diagram",sDocument:"Dokument",globe:"Globus",map:"Karta",model:"Model",multiMediaPresentation:"Večpredstavnostna predstavitev",profile:"Profil",rasterDigitalData:"Digitalni rastrski podatki",remoteSensingImage:"Slika daljinskega zaznavanja",section:"Odsek",spreadsheet:"Preglednica",tabularDigitalData:"Digitalni tabelarični podatki",vectorDigitalData:"Digitalni vektorski podatki",video:"Videoposnetek",view:"Pogled"},serinfo:{caption:"Informacije o seriji",sername:"Ime serije",issue:"Identifikacija težave"},pubinfo:{caption:"Informacije o objavi",pubplace:"Kraj objave",publish:"Izdajatelj"},othercit:"Druge podrobnosti o navedku",onlink:"Spletno povezovanje (URL)"},cntinfo:{caption:"Podatki za stik",section:{primary:"Primarno",phoneAndEmail:"Telefonska številka in e-pošta",hoursAndInstructions:"Ure in navodila"},cntorgp:{caption:"Po organizaciji",cntorg:"Organizacija",cntper:"Oseba"},cntperp:{caption:"Po osebi",cntper:"Oseba",cntorg:"Organizacija"},cntpos:"Položaj",cntaddr:{caption:"Naslov",addrtype:{caption:"Tip naslova",mailing:"Poštni naslov",physical:"Fizični naslov",mailingAndPhysical:"Poštni in fizični naslov"},address:"Naslov",city:"Mesto",state:"Pokrajina",postal:"Poštna številka",country:"Država"},cntvoice:"Glas",cnttdd:"Telefon TDD/TTY (za naglušne)",cntfax:"Faks",cntemail:"E-pošta",hours:"Ure",cntinst:"Navodila"},dataqual:{caption:"Informacije o kakovosti podatkov",section:{attributeAccuracy:"Natančnost atributa",logicalConsistency:"Logična doslednost",completeness:"Celovitost",positionalAccuracy:"Položajna natančnost",lineage:"Poreklo",cloudCover:"Oblačnost"},attracc:{caption:"Natančnost atributa",attraccr:"Poročilo o natančnosti atributa",qattracc:{caption:"Ocena natančnosti kvantitativnega atributa",attraccv:"Vrednost natančnosti atributa",attracce:"Pojasnilo natančnosti atributa"}},logic:"Poročilo o logični doslednosti",complete:"Poročilo o celovitosti",posacc:"Položajna natančnost",horizpa:{caption:"Horizontalna položajna natančnost",horizpar:"Poročilo o horizontalni položajni natančnosti",qhorizpa:{caption:"Ocena kvantitativne horizontalne položajne natančnosti",horizpav:"Vrednost horizontalne položajne natančnosti",horizpae:"Pojasnilo horizontalne položajne natančnosti"}},vertacc:{caption:"Vertikalna položajna natančnost",vertaccr:"Poročilo o vertikalni položajni natančnosti",qvertpa:{caption:"Ocena kvantitativne vertikalne položajne natančnosti",vertaccv:"Vrednost vertikalne položajne natančnosti",vertacce:"Pojasnilo vertikalne položajne natančnosti"}},lineage:{caption:"Poreklo"},srcinfo:{caption:"Informacije o viru",srccite:"Navedek vira",srcscale:"Imenovalec merila vira",typesrc:{caption:"Tip medija vira",paper:"Papir",stableBaseMaterial:"Material na trdni podlagi",microfiche:"Mikrofiš",microfilm:"Mikrofilm",audiocassette:"Avdiokaseta",chart:"Grafikon",filmstrip:"Trak filma",transparency:"Prosojnost",videocassette:"Videokaseta",videodisc:"Videodisk",videotape:"Videotrak",physicalModel:"Fizični model",computerProgram:"Računalniški program",disc:"Disk",cartridgeTape:"Kaseta s trakom",magneticTape:"Magnetni trak",online:"S povezavo",cdrom:"CD-ROM",electronicBulletinBoard:"Elektronska oglasna deska",electronicMailSystem:"Elektronski poštni sistem"},srctime:"Časovno obdobje vsebine vira",srccurr:"Referenca o aktualnosti vira",srccitea:"Okrajšava navedka vira",srccontr:"Prispevek vira"},procstep:{caption:"Korak postopka",procdesc:"Opis postopka",srcused:"Okrajšava navedka, uporabljenega v viru",procdate:"Datum obdelave",proctime:"Čas obdelave",srcprod:"Okrajšava navedka, nastalega v viru",proccont:"Stik za obdelavo"},cloud:"Oblačnost"},distinfo:{caption:"Informacije o distribuciji",section:{distributor:"Distributer",description:"Opis",orderProcess:"Postopek naročila",prerequisites:"Predpogoj",availability:"Razpoložljivost"},distrib:"Distributer",resdesc:{caption:"Opis vira",liveData:"Živi podatki in karte",downloadableData:"Prenosljivi podatki",offlineData:"Podatki brez povezave",staticMapImages:"Statične slike karte",sDocument:"Drugi dokumenti",application:"Aplikacije",geographicService:"Geografske storitve",clearingHouse:"Klirinške hiše",mapFiles:"Datoteke karte",geographicActivies:"Geografske dejavnosti"},distliab:"Izjava o odgovornosti o distribuciji",custom:"Postopek naročila kupca",techpreq:"Tehnični predpogoji",availabl:"Razpoložljivost"},eainfo:{caption:"Informacije o entiteti in atributu",overview:"Opis pregleda",eaover:"Pregled entitete in atributa",eadetcit:"Navedek podrobnosti o entiteti in atributu"},idinfo:{caption:"Informacije o identifikaciji",section:{timeAndStatus:"Čas in status",constraints:"Omejitve",contact:"Stik",additional:"Dodatno"},citeinfo:"Navedek",descript:{caption:"Opis",sAbstract:"Izvleček",purpose:"Namen",supplinf:"Dodatne informacije"},timeperd:{caption:"Časovno obdobje vsebine",current:{caption:"Referenca o aktualnosti",groundCondition:"Stanje tal",publicationDate:"Datum objave"}},status:{caption:"Status",progress:{caption:"Napredek",complete:"Dokončano",inWork:"V delu",planned:"Načrtovano"},update:{caption:"Pogostost vzdrževanja in posodabljanja",continual:"Neprekinjeno",daily:"Dnevno",weekly:"Tedensko",monthly:"Mesečno",annually:"Letno",unknown:"Neznano",asNeeded:"Po potrebi",irregular:"Neredno",nonePlanned:"Ni načrtovano"}},spdom:{caption:"Obseg",bounding:{caption:"Omejitvene koordinate",westbc:"Zahodna omejitvena G.Š.",eastbc:"Vzhodna omejitvena G.Š.",northbc:"Severna omejitvena G.Š.",southbc:"Južna omejitvena G.Š."}},keywords:{caption:"Ključne besede",theme:"Tema",place:"Kraj",stratum:"Razred",temporal:"Časovno",thesaursus:"Povezan slovar sopomenk",delimited:"Ključne besede",themektIsoTopicCategory:"Tema ISO...",themektIsoTopicDialog:"Tema ISO",placektGnis:"Informacijski sistem geografskih imen"},accconst:"Omejitve dostopa",useconst:"Omejitve uporabe",ptcontac:"Oseba za stik za podatke",browse:{caption:"Dodaj grafiko",browsen:"Dodaj URL grafike",browsed:"Dodaj opis grafike",browset:"Dodaj določen tip grafike"},datacred:"Navedba vira sklopa podatkov",secinfo:{caption:"Varnostne informacije",secsys:"Sistem varnostnega klasificiranja",secclass:{caption:"Varnostno klasificiranje",topSecret:"Strogo zaupno",secret:"Zaupno",confidential:"Tajno",restricted:"Omejeno",unclassified:"Neklasificirano",sensitive:"Občutljivo"},sechandl:"Opis varnostnega obravnavanja"},sNative:"Domorodno okolje sklopa podatkov",crossref:"Navzkrižna referenca"},metadata:{idinfo:"Identifikacija",dataqual:"Kakovost",spdoinfo:"Prostorska organizacija podatkov",spref:"Koordinatni sistem",eainfo:"Entiteta in atribut",distinfo:"Distribucija",metainfo:"Metapodatki"},metainfo:{caption:"Informacije o metapodatkih",section:{dates:"Datumi metapodatkov",contact:"Stik za metapodatke",standard:"Standard metapodatkov",additional:"Dodatno"},metd:"Datum metapodatkov",metrd:"Datum pregleda metapodatkov",metfrd:"Datum naslednjega pregleda metapodatkov",metstdn:"Standardno ime metapodatkov",metstdv:"Standardna različica metapodatkov",metac:"Omejitve dostopa do metapodatkov",metuc:"Omejitve uporabe metapodatkov",metsi:{caption:"Varnostne informacije o metapodatkih",metscs:"Sistem varnostnega klasificiranja metapodatkov",metsc:"Varnostno klasificiranje metapodatkov",metshd:"Opis varnostnega obravnavanja metapodatkov"}},spref:{caption:"Informacije o koordinatnem sistemu",horizsys:{caption:"Horizontalni koordinatni sistem",geograph:{caption:"Geografsko",latres:"Ločljivost geografske širine",longres:"Ločljivost geografske dolžine",geogunit:{caption:"Enote geografskih koordinat",decimalDegrees:"Decimalne stopinje",decimalMinutes:"Decimalne minute",decimalSeconds:"Decimalne sekunde",degreesAndDecimalMinutes:"Stopinje in decimalne minute",degreesMinutesAndDecimalSeconds:"Stopinje, minute in decimalne sekunde",radians:"Radiani",grads:"Gradi"}},planar:{caption:"Planarno"},local:{caption:"Lokalno",localdes:"Lokalni opis",localgeo:"Informacije o lokalnem georeferenciranju"},geodetic:{caption:"Geodetski model",horizdn:{caption:"Ime horizontalnega geodetskega datuma",nad83:"Geodetski datum za Severno Ameriko iz leta 1983",nad27:"Geodetski datum za Severno Ameriko iz leta 1927"},ellips:{caption:"Ime elipsoida",grs80:"Geodetski referenčni sistem 80",clarke1866:"Clarke 1866"},semiaxis:"Velika polos",denflat:"Imenovalec sploščenosti"}},vertdef:{caption:"Vertikalni koordinatni sistem",altsys:{caption:"Višinski sistem",altdatum:{caption:"Ime višinskega geodetskega datuma",navd88:"Geodetski vertikalni datum za Severno Ameriko iz leta 1988",ngvd29:"Nacionalni geodetski vertikalni datum iz leta 1929"},altres:"Višinska ločljivost",altunits:{caption:"Enote višinske razdalje",meters:"Metri",feet:"Čevlji"},altenc:{caption:"Metoda šifriranja višine",explicit:"Izrecna višinska koordinata, ki vključuje horizontalne koordinate",implicit:"Implicitna koordinata",attribute:"Vrednosti atributa"}},depthsys:{caption:"Globinski sistem",depthdn:{caption:"Ime globinskega geodetskega datuma",option1:"Lokalna površina",option2:"Hidrografska ničla; referenca za merjenje globine",option3:"Najnižja astronomska plima",option4:"Najvišja astronomska plima",option5:"Srednja oseka",option6:"Srednja plima",option7:"Srednja morska gladina",option8:"Referenca višinske točke merjenja",option9:"Srednje nizka večletna plima",option10:"Srednje visoka večletna plima",option11:"Srednje nizko letno povprečje plime",option12:"Srednja visoko letno povprečje plime",option13:"Srednje nižja nizka plima",option14:"Srednje nižja nizka večletna plima",option15:"Srednje višja visoka plima",option16:"Srednje višja nizka plima",option17:"Srednje nižja visoka plima",option18:"Največja plima",option19:"Polmesečna nižja nizka plima",option20:"Najmanjša razlika plime in oseke",option21:"Visoka plima",option22:"Višja visoka plima",option23:"Nizka plima",option24:"Referenčna nizka plima",option25:"Najnižja nizka plima",option26:"Nižja nizka plima",option27:"Najnižja običajno nizka plima",option28:"Srednja raven plime",option29:"Indijska spomladanska nizka plima",option30:"Največja razlika plime",option31:"Najmanjša razlika plime",option32:"Referenčna raven reke Columbia",option33:"Referenčna raven nizke plime Mehiškega zaliva",option34:"Najnižja ekvatorialna plima",option35:"Približna najnižja astronomska plima",option36:"Ni popravkov"},depthres:"Ločljivost globine",depthdu:{caption:"Enote globinske razdalje",meters:"Metri",feet:"Čevlji"},depthem:{caption:"Metoda šifriranja globine",explicit:"Izrecna koordinata globine, ki vključuje horizontalne koordinate",implicit:"Implicitna koordinata",attribute:"Vrednosti atributa"}}}},timeinfo:{caption:"Informacije o časovnem obdobju",sngdate:"Enojen datum",mdattim:"Mnogo datumov",rngdates:"Razpon datumov",caldate:"Datum",time:"Čas",begdate:"Začetni datum",begtime:"Začetni čas",enddate:"Končni datum",endtime:"Končni čas"}});