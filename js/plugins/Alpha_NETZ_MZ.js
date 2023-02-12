/*:
 * @plugindesc (v.0.5)[BASIC] Multiplayer for RPG Maker
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/plugins/alpha-net-z/
 *
 * @help
 *
 * Alpha NET Z plugin is still in development
 *
 * WebPage: https://kdworkshop.net/plugins/alpha-net-z/
 * Documentation: https://github.com/KageDesu/Alpha-NET-Z/wiki
 *
 * Required content:
 *  - plugin Alpha_Core.js
 *  - plugin SocketIO.js
 *  - file css\anet.css
 *  - folder img\Alpha\*all files*
 *
 *

 * @param ANETZ @text @desc
 * 
 * 
 * @param connection:s
 * @text Connection
 * @type struct<LConnectionSettings>
 * @default {"serverIp":"195.161.41.20","serverPort":"3034"}
 * @desc [PRO] If you don't have own server, don't change this settings
 * 
 * 
 * @param spacer|gamesettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param gameModeSettingsGroup
 * @text Multiplayer Settings
 * 
 * @param onlySameMap:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Wait Map Transfer?
 * @default false
 * @desc When player transferred to the new map he will wait until all players not transfered on same map.
 * 
 * @param singlePlayerAllowed:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text New Game Allowed?
 * @default true
 * @desc If false, the menu item "New Game" will not be displayed in title menu
 * 
 * @param roomFilter:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Rooms Filter?
 * @on ON
 * @off OFF
 * @default false
 * @desc [PRO] If filter is ON, you can see only this (same) game rooms in lobby
 * 
 * @param playersSettingsGroup
 * @text Players Settings
 * 
 * 
 * @param actorsForNetwork:intA
 * @parent playersSettingsGroup
 * @type actor[]
 * @text Actors
 * @default ["1","2","3","4"]
 * @desc Available actors for network game players. More than 2 - PRO only.
 * 
 * @param isActorSelectionAllowed:b
 * @parent playersSettingsGroup
 * @text Actor selection?
 * @type boolean
 * @default true
 * @desc Can player select actor in lobby?
 * 
 * @param isSinglePlayerStartAllowed:b
 * @parent playersSettingsGroup
 * @text One player start?
 * @type boolean
 * @default true
 * @desc If in room only 1 player (host), he can start game alone?
 * 
 * @param playerActorNameType
 * @parent playersSettingsGroup
 * @text Player Name for Actor
 * @type select
 * @option Not Show
 * @option Instead Name
 * @option Instead Nickname
 * @default Instead Nickname
 * @desc Show network player name instead of his Actor name (or nickname)
 * 
 * @param playerLeaveGameCommonEvent:int
 * @parent playersSettingsGroup
 * @text On Player Disconnect CE
 * @type common_event
 * @default 0
 * @desc That common event will be called when somebody leave (disconnect) game. 0 - nothing
 * 
 * @param globalData:s
 * @text Global Data
 * @type struct<LGlobalData>
 * @default {"globalVariablesIds:intA":"[]","globalSwitchesIds:intA":"[]"}
 * @desc All this data will be automatically synchronized between all players
 * 


 * @command EventStartOptions
 * @text Event Options
 * @desc Event network start options
 * 
 * @arg whoSelector
 * @text Who can start
 * @type select
 * @option All
 * @option Master
 * @option Master Except
 * @option Actor List
 * @option Actor List Except
 * @desc Select who can start this event
 * @default All
 * 
 * @arg actorList
 * @text Actors List
 * @type actor[]
 * @default []
 * @desc Actors list for 'Execute For' if you select 'Actor List' or 'Actor List Except'
 * 
 * @arg lockMode
 * @text Lock Event?
 * @type boolean
 * @default false
 * @desc If true - event will be locked while exectuted. Nobody can't start locked event
 * 
 * @arg sharedMode
 * @text Shared Mode
 * @type select
 * @option No
 * @option Strict
 * @option Optional
 * @desc [No implemented!] Shared event - starts for all players simultaneously, synchronized commands execution
 * @default No
 * 
 * 
 * @command EventCommandSelector
 * @text Command Options
 * @desc Next Event Command network start options
 * 
 * @arg whoSelector
 * @text Execute for
 * @type select
 * @option All
 * @option Master
 * @option Master Except
 * @option Actor List
 * @option Actor List Except
 * @option Me Except
 * @desc Select for who this event command will be executed
 * @default All
 * 
 * @arg actorList
 * @text Actors List
 * @type actor[]
 * @default []
 * @desc Actors list for 'Execute For' if you select 'Actor List' or 'Actor List Except'
 * 
 * @arg scope
 * @text Scope
 * @type select
 * @option Same map
 * @option All world
 * @default Same map
 * @desc For which players will the virtual command be executed?
 * 
 * @arg executeMode
 * @text Execute Mode
 * @type select
 * @option Auto
 * @option Virtual
 * @option Common Event
 * @default Auto
 * @desc How this command will be exectuted for other players. Read Wiki for more info
 * 
 * @command SharedBattle
 * @text Set Shared Battle
 * @desc Make next Battle Processing command shared between all players
 * 
 * @arg battleId
 * @text ID
 * @default
 * @desc Unique battle ID. Empty - not shared battle (by default)
 * 
 * 
 * 


 */
/*~struct~LConnectionSettings:

@param serverIp
@text IP
@type combo
@option localhost
@option 195.161.41.20
@desc Server IP address (ip4)
@default 195.161.41.20

@param serverPort
@text Port
@default 3034

*/

/*~struct~LGlobalData:

@param globalVariablesIds:intA
@type variable[]
@text Variables
@default []
@desc Variables for auto synchronizaton

@param globalSwitchesIds:intA
@type switch[]
@text Switches
@default []
@desc Switches for auto synchronizaton

*/
// * INITIAL S FILE

var Imported = Imported || {};
Imported.Alpha_NETZ = true;

var ANET = {};
ANET.Version = 50; // 0.5.0
ANET.ServerRev = 111; // * Необходимая ревизия сервера

// * Данный символ переопределяется в 1_DevSymbol_TEST как dev
ANET._define = 'build'; // * По умолчанию -> сборка

ANET.link = function (library) {
    this[library.name] = library;
};

ANET.isDEV = function () {
    return ANET._define == 'dev';
};


ANET.w = (e) => AA.w(e);

if(!Imported.Alpha_Core) {

    if(ANET.isDEV()) {
        console.warn("Alpha NETZ require Alpha_@Core plugin!");
    } else
        alert("Alpha NETZ require Alpha_@Core plugin!");
}

ANET.isPro = function() {
    return false;
};
//Compressed by MV Plugin Builder
(function(){var a0_0x2c4f=['1116096lDLmzy','NET','Network','You\x20try\x20get\x20data\x20from\x20Server,\x20but\x20NOT\x20connection!','length','idmeg','myId','CggFl','Timeout\x20for:\x20','sCLnG','FaHOB','fsjyG','MeWqX','gameTitle','Network\x20inited','onLeaveRoom','NpAcU','_isWaitServer','isShouldWaitServer','hideLoader','name','686641fsKaLQ','62819ASkxNo','setConnectionToMasterCallback','Trace','getGameVersion','Callback\x20for:\x20','qMuyE','isConnected','getLightestColor','startConnection','nVrUo','1181867vWpTPF','ANNetwork','client','send','isOnlySameMapMode','Send:\x20','getNetworkGameInfoData','isMasterClient','GREEN','get','onRoomClosed','5129xoIMsD','dTNQO','getRoomData','1pSLGGe','log','isMZ','callback','Lobby','http://','requestRoomRefresh','leaveRoom','Send,\x20get!:\x20','_isHost','Color','isWaitServer','onRoomDataFromServer','pcEmN','xsEpZ','You\x20are\x20joined\x20to\x20room:\x20','hwCLz','fullName','trace','apply','You\x20are\x20Master\x20(host)\x20of\x20room:\x20','VjZkg','ebHen','dynUt','serverPort','setConnection','Send,\x20callback:\x20','You\x20try\x20send\x20callback\x20message,\x20but\x20NOT\x20connection!','closeRoom','ySCiB','lyXmH','fAqxy','setRoomJoin','showLoader','8UcwXLk','room','111842lLIotJ','DevLog','You\x20try\x20send\x20message,\x20but\x20NOT\x20connection!','socket','isSameMapMode','setRoomMaster','xpbHv','HSvLl','Lgtiz','actorsForNetwork','setFrom','disconnect','833407OnkdXX','owvGn','eQgZv','PWWGJ','Mxbrz','reset','stop'];var a0_0x4755a8=a0_0x17f5;function a0_0x17f5(_0x2a467e,_0x2209e8){_0x2a467e=_0x2a467e-0x8b;var _0x2c4f7e=a0_0x2c4f[_0x2a467e];return _0x2c4f7e;}(function(_0x2ba86c,_0x43e36f){var _0x215aed=a0_0x17f5;while(!![]){try{var _0x1518f3=-parseInt(_0x215aed(0xc1))+-parseInt(_0x215aed(0xae))*parseInt(_0x215aed(0xac))+parseInt(_0x215aed(0xe1))+parseInt(_0x215aed(0xba))+parseInt(_0x215aed(0xec))+parseInt(_0x215aed(0xd7))+parseInt(_0x215aed(0xd6))*parseInt(_0x215aed(0xef));if(_0x1518f3===_0x43e36f)break;else _0x2ba86c['push'](_0x2ba86c['shift']());}catch(_0x4585c9){_0x2ba86c['push'](_0x2ba86c['shift']());}}}(a0_0x2c4f,0xb94f7),window['ANNetwork']=function(){},window[a0_0x4755a8(0xc2)]=window[a0_0x4755a8(0xe2)],function(){var _0x22b4c4=a0_0x4755a8,_0x852804,_0x9d0023;_0x852804=new KDCore[(_0x22b4c4(0xaf))](_0x22b4c4(0xc3)),_0x852804['setColors'](KDCore[_0x22b4c4(0x94)][_0x22b4c4(0xe9)],KDCore[_0x22b4c4(0x94)]['BLACK'][_0x22b4c4(0xde)](0x23)),_0x852804['on'](),_0x9d0023=window[_0x22b4c4(0xe2)],_0x9d0023[_0x22b4c4(0xdd)]=function(){return this['socket']!=null;},_0x9d0023[_0x22b4c4(0xc7)]=function(){var _0x1c17e8=_0x22b4c4;if('lyXmH'===_0x1c17e8(0xa8)){var _0x8b6ff5;return(_0x8b6ff5=this[_0x1c17e8(0xb1)])!=null?_0x8b6ff5['id']:void 0x0;}else{function _0x544f60(){var _0x420ccb=_0x1c17e8;if(!this[_0x420ccb(0xe8)]())return;if(this[_0x420ccb(0xad)]==null)return;this[_0x420ccb(0xe4)](_0x1619fe[_0x420ccb(0x8e)](_0x420ccb(0xa6)));}}},_0x9d0023[_0x22b4c4(0xe8)]=function(){var _0x50351f=_0x22b4c4;if(_0x50351f(0xbe)===_0x50351f(0xcd)){function _0x270227(){var _0x2750ca=_0x50351f;return this[_0x2750ca(0xad)]=_0x4fb446,this[_0x2750ca(0x93)]=![],_0x4ac25f['p'](_0x2750ca(0x99)+this[_0x2750ca(0xad)][_0x2750ca(0xd5)]);}}else return this[_0x50351f(0x93)]===!![];},_0x9d0023[_0x22b4c4(0xb2)]=function(){var _0x1a3f07=_0x22b4c4;if(_0x1a3f07(0xcc)!==_0x1a3f07(0xcc)){function _0x309be0(){var _0x2bbdc8=_0x1a3f07;return this['socket']=null,this[_0x2bbdc8(0xe3)]=null,this[_0x2bbdc8(0xd2)]=![],this[_0x2bbdc8(0x93)]=![],_0x2bbdc8(0xcf)['p']();}}else return ANET['PP']['isOnlySameMapMode']();},_0x9d0023['isBusy']=function(){var _0x52c567=_0x22b4c4;return this[_0x52c567(0xdd)]()&&(this[_0x52c567(0x95)]()||ANGameManager['isShouldWaitServer']());},_0x9d0023['isWaitServer']=function(){var _0x257f5c=_0x22b4c4;if(_0x257f5c(0x9a)===_0x257f5c(0x9a))return this[_0x257f5c(0xdd)]()&&this[_0x257f5c(0xd2)]===!![];else{function _0x3a88d4(){var _0x5b2cad=_0x257f5c;if(this[_0x5b2cad(0xad)]==null)return;_0x717b7a[_0x5b2cad(0xd0)](),this['send'](_0x2d0526['Lobby'](_0x5b2cad(0x91),this[_0x5b2cad(0xad)][_0x5b2cad(0xd5)]));}}},function(){var _0x9d6504=_0x22b4c4;return _0x9d0023['initSystem']=function(){var _0x5420ca=a0_0x17f5;if(_0x5420ca(0xb4)===_0x5420ca(0xb4))return this[_0x5420ca(0xb1)]=null,this[_0x5420ca(0xe3)]=null,this[_0x5420ca(0xd2)]=![],this[_0x5420ca(0x93)]=![],_0x5420ca(0xcf)['p']();else{function _0x1f4017(){var _0x22832a=_0x5420ca;return this[_0x22832a(0x93)]===!![];}}},_0x9d0023[_0x9d6504(0xc0)]=function(){var _0x528ad6=_0x9d6504,_0x288add;NetClientMethodsManager['setConnectionToMasterCallback'](null);if((_0x288add=this[_0x528ad6(0xe3)])!=null){if(_0x528ad6(0xe0)===_0x528ad6(0xbd)){function _0x370bc5(){var _0x247525=_0x528ad6;_0xbe8e5d['p'](_0x247525(0xa5));}}else _0x288add['disconnect']();}this['_isWaitServer']=![],this[_0x528ad6(0xb1)]=null,ANGameManager[_0x528ad6(0xbf)]();},_0x9d0023[_0x9d6504(0xdf)]=function(){var _0x48402f=_0x9d6504,_0x22efa5,_0x25a101,_0x41f41a;_0x25a101=ANET['PP']['serverIp'](),_0x41f41a=ANET['PP'][_0x48402f(0xa2)](),_0x22efa5=_0x48402f(0x8f)+_0x25a101+':'+_0x41f41a,console[_0x48402f(0x8b)]('Connect\x20to\x20'+_0x22efa5),this[_0x48402f(0xb1)]=io(_0x22efa5),this[_0x48402f(0xe3)]=new NetworkClientHandler(this[_0x48402f(0xb1)]);},_0x9d0023[_0x9d6504(0xa3)]=function(_0x486611){var _0x5448c3=_0x9d6504;NetClientMethodsManager[_0x5448c3(0xd8)](_0x486611),this[_0x5448c3(0xdf)]();},_0x9d0023[_0x9d6504(0xe4)]=function(_0x3d2234,_0x317110=![]){var _0x3b281f=_0x9d6504;if(!this[_0x3b281f(0xdd)]()){if(_0x3b281f(0xdc)===_0x3b281f(0xdc))_0x852804['p'](_0x3b281f(0xb0));else{function _0x465b74(){var _0x14b290=_0x3b281f;return this[_0x14b290(0xdd)]()&&(this[_0x14b290(0x95)]()||_0x155933[_0x14b290(0xd3)]());}}}else{if(!_0x317110){if(_0x3b281f(0xed)==='yrKup'){function _0x39aea9(){var _0x55dc24=_0x3b281f,_0x2ce00e;return(_0x2ce00e=this[_0x55dc24(0xb1)])!=null?_0x2ce00e['id']:void 0x0;}}else _0x852804['p'](_0x3b281f(0xe6)+_0x3d2234[_0x3b281f(0x9b)]());}_0x3d2234[_0x3b281f(0xb8)](this[_0x3b281f(0xb1)]['id'])['send']();}},_0x9d0023[_0x9d6504(0xea)]=function(_0x3982a8,_0x4d393d,_0x1a839a){var _0x258f95=_0x9d6504,_0x34ba7c,_0x5cbe6e,_0x56a055;!this['isConnected']()?_0x852804['p'](_0x258f95(0xc4)):(_0x56a055=_0x3982a8[_0x258f95(0x9b)](),this[_0x258f95(0xd2)]=!![],HUIManager[_0x258f95(0xab)](),_0x5cbe6e=function(..._0xe61098){var _0x29ab95=_0x258f95;if(_0x29ab95(0x9f)!==_0x29ab95(0xcb)){_0x852804['p'](_0x29ab95(0xc9)+_0x56a055);if(_0x1a839a!=null){if(_0x29ab95(0xc6)!==_0x29ab95(0xc6)){function _0x153c65(){var _0x29a35b=_0x29ab95;return this[_0x29a35b(0xad)]=_0x5123f4,this[_0x29a35b(0x93)]=!![],_0x58bf23['p']('You\x20are\x20Master\x20(host)\x20of\x20room:\x20'+this[_0x29a35b(0xad)][_0x29a35b(0xd5)]);}}else _0x1a839a[_0x29ab95(0x9d)](this,_0xe61098);}return ANNetwork[_0x29ab95(0xd2)]=![],HUIManager[_0x29ab95(0xd4)]();}else{function _0x232b0b(){var _0x571f20=_0x29ab95;return _0x3bcbd4['p'](_0x571f20(0xc9)+_0x33fbb5),_0x499be4!=null&&_0x4c7bf7[_0x571f20(0x9d)](this,_0x266368),_0x5f3bd2[_0x571f20(0xd2)]=![],_0x4efb78[_0x571f20(0xd4)]();}}},_0x34ba7c=function(..._0x21bdd3){var _0x14071b=_0x258f95;return _0x852804['p']('Response\x20(get)\x20for:\x20'+_0x56a055),_0x4d393d!=null&&_0x4d393d[_0x14071b(0x9d)](this,_0x21bdd3),ANNetwork[_0x14071b(0xd2)]=![],HUIManager[_0x14071b(0xd4)]();},_0x852804['p'](_0x258f95(0x92)+_0x56a055),_0x3982a8[_0x258f95(0xb8)](this[_0x258f95(0xb1)]['id'])[_0x258f95(0xea)](_0x34ba7c,_0x5cbe6e,0x7d0));},_0x9d0023['callback']=function(_0x6f7e0b,_0x116229){var _0x34b08b=_0x9d6504,_0x459086,_0x5ada1c;if(!this[_0x34b08b(0xdd)]())_0x852804['p'](_0x34b08b(0xa5));else{if(_0x34b08b(0xb5)!=='HSvLl'){function _0x36dfcc(){return;}}else _0x5ada1c=_0x6f7e0b['fullName'](),_0x459086=function(..._0x1b0227){var _0x411168=_0x34b08b;return _0x852804['p'](_0x411168(0xdb)+_0x5ada1c),_0x116229['apply'](this,_0x1b0227);},_0x852804['p'](_0x34b08b(0xa4)+_0x5ada1c),_0x6f7e0b[_0x34b08b(0xb8)](this['socket']['id'])[_0x34b08b(0x8d)](_0x459086);}},_0x9d0023[_0x9d6504(0x9c)]=function(_0x261fb6){var _0x2af842=_0x9d6504;if(_0x2af842(0xbb)===_0x2af842(0x98)){function _0x2af321(){return;}}else return this['send'](NMS[_0x2af842(0xd9)](_0x261fb6));};}(),function(){var _0x5cfdc1=_0x22b4c4;if(_0x5cfdc1(0xca)!=='hMveh')return _0x9d0023[_0x5cfdc1(0xb3)]=function(_0x16021e){var _0x5946dd=_0x5cfdc1;return this[_0x5946dd(0xad)]=_0x16021e,this[_0x5946dd(0x93)]=!![],_0x852804['p'](_0x5946dd(0x9e)+this[_0x5946dd(0xad)][_0x5946dd(0xd5)]);},_0x9d0023[_0x5cfdc1(0xaa)]=function(_0x4c1d7b){var _0x532160=_0x5cfdc1;if(_0x532160(0x97)==='RifML'){function _0xb4758f(){return;}}else return this['room']=_0x4c1d7b,this['_isHost']=![],_0x852804['p'](_0x532160(0x99)+this[_0x532160(0xad)][_0x532160(0xd5)]);},_0x9d0023[_0x5cfdc1(0x96)]=function(_0x5baa51){var _0x3d1476=_0x5cfdc1;if('BslMr'!=='MswOn')this[_0x3d1476(0xad)]=_0x5baa51;else{function _0x48c3b1(){var _0x39c0a9=_0x3d1476,_0x52a7b7,_0x44e680;!this['isConnected']()?_0x5de40b['p'](_0x39c0a9(0xa5)):(_0x44e680=_0x54d107[_0x39c0a9(0x9b)](),_0x52a7b7=function(..._0x3c150d){var _0xbe1ebe=_0x39c0a9;return _0x117a27['p'](_0xbe1ebe(0xdb)+_0x44e680),_0x4bcdcf[_0xbe1ebe(0x9d)](this,_0x3c150d);},_0x479a41['p'](_0x39c0a9(0xa4)+_0x44e680),_0x2397e5[_0x39c0a9(0xb8)](this[_0x39c0a9(0xb1)]['id'])[_0x39c0a9(0x8d)](_0x52a7b7));}}},_0x9d0023[_0x5cfdc1(0xeb)]=function(){var _0x215dde=_0x5cfdc1;if('LhYfC'!==_0x215dde(0xa9)){if(!this['isConnected']())return;if(this[_0x215dde(0xad)]==null){if(_0x215dde(0xb6)==='qGZjD'){function _0x759af3(){return;}}else return;}this[_0x215dde(0x91)](),this[_0x215dde(0x93)]=![],this['room']=null;}else{function _0x1b99b3(){var _0xfced51=_0x215dde;_0x385134[_0xfced51(0xb9)]();}}},_0x9d0023[_0x5cfdc1(0xa6)]=function(){var _0x454109=_0x5cfdc1;if(_0x454109(0xc8)===_0x454109(0xc8)){if(!this[_0x454109(0xe8)]()){if(_0x454109(0xd1)!==_0x454109(0xbc))return;else{function _0x2db8bf(){var _0x2a7f3d=_0x454109;return _0x2c0d5e['PP'][_0x2a7f3d(0xe5)]();}}}if(this[_0x454109(0xad)]==null)return;this[_0x454109(0xe4)](NMS['Lobby']('closeRoom'));}else{function _0x5caffa(){var _0x4aa375=_0x454109;_0x57cfd8['p'](_0x4aa375(0xc4));}}},_0x9d0023['leaveRoom']=function(){var _0x1ec025=_0x5cfdc1;if('SbTod'!=='SbTod'){function _0x39437e(){var _0x4f5727=a0_0x17f5;return{'id':_0xdd53bf['VD'][_0x4f5727(0xda)](),'title':_0x5a0e17[_0x4f5727(0xce)],'version':_0x3755e4[_0x4f5727(0x8c)]()?0x0:0x1,'maxPlayers':_0x578267['PP']['actorsForNetwork']()[_0x4f5727(0xc5)],'mode':0x0};}}else{if(this[_0x1ec025(0xad)]==null)return;ANGameManager[_0x1ec025(0xd0)](),this[_0x1ec025(0xe4)](NMS[_0x1ec025(0x8e)](_0x1ec025(0x91),this[_0x1ec025(0xad)][_0x1ec025(0xd5)]));}},_0x9d0023[_0x5cfdc1(0x90)]=function(){var _0x212783=_0x5cfdc1;if(!this['isConnected']()){if(_0x212783(0xa0)===_0x212783(0xa7)){function _0x32b20b(){var _0x1e9e62=_0x212783;_0x39303e['setConnectionToMasterCallback'](_0x2f3b1b),this[_0x1e9e62(0xdf)]();}}else return;}this[_0x212783(0xe4)](NMS[_0x212783(0x8e)](_0x212783(0xee)));};else{function _0x119f38(){var _0x7ed5dc=_0x5cfdc1;_0x36956f[_0x7ed5dc(0x9d)](this,_0x281349);}}}(),_0x9d0023[_0x22b4c4(0xe7)]=function(){var _0x35a6c9=_0x22b4c4;if(_0x35a6c9(0xa1)===_0x35a6c9(0xa1))return{'id':ANET['VD'][_0x35a6c9(0xda)](),'title':$dataSystem['gameTitle'],'version':KDCore[_0x35a6c9(0x8c)]()?0x0:0x1,'maxPlayers':ANET['PP'][_0x35a6c9(0xb7)]()[_0x35a6c9(0xc5)],'mode':0x0};else{function _0x34abdf(){var _0x940038=_0x35a6c9;if(!this['isConnected']())return;if(this[_0x940038(0xad)]==null)return;this[_0x940038(0x91)](),this[_0x940038(0x93)]=![],this[_0x940038(0xad)]=null;}}};}());
})();

// Generated by CoffeeScript 2.5.1
// * Глабольный менеджер с основными методами системы
ANET.System = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.System;
  (function() {    // * Начальная загрузка компонентов
    // -----------------------------------------------------------------------
    //TODO: * Лог свой для сообщений версий
    _.initSystem = function() {
      "INIT ANET SYSTEM".p();
      this.loadParameters();
      this.applyParameters();
      ANET.loadPluginCommands();
      HUIManager.init();
    };
    _.loadParameters = function() {
      return ANET.PP = new ANET.ParamsManager();
    };
    _.applyParameters = function() {};
  })();
  // -----------------------------------------------------------------------

  // * Все эти команды нельзя запускать через опции (виртуально), но
  // * их теоретически можно вызывать через общее событие у другого игрока
  //TODO: Например конфигурация классов (dinamyc методов)
  _.ForbiddenVirtualCommandsList = [
    // * Message
    101,
    102,
    103,
    104,
    105,
    // * Flow Control
    111,
    112,
    113,
    115,
    118,
    119,
    108,
    // * Party
    129,
    // * Movement
    201,
    202,
    204,
    206,
    // * Character
    216,
    217,
    // * Timing
    230,
    // * Scene Control
    302,
    303,
    351,
    352,
    // * System Settings
    137,
    // * Meta
    0,
    401,
    402,
    403,
    411,
    413,
    657
  ];
  // * Список комманд которые запускаются через общее событие, а не виртуально
  _.NonVirtualCommandsList = [
    // * Flow Control
    117,
    // * Scene Control
    301
  ];
  // * Дополнительные полня для синхронизации в битве
  _.BattlerObserverFields = [
    "_tpbChargeTime",
    //"_tpbCastTime"
    //"_tpbIdleTime"
    //"_tpbTurnCount"
    //"_tpbTurnEnd"
    //"_speed"
    //"_actionState"
    //"_damagePopup"
    //"_effectType"
    //"_motionType"
    //"_weaponImageId"
    //"_motionRefresh"
    //"_selected"
    "_tpbState"
  ];
  _.ActorObserverFields = ["_name", "_nickname", "_classId", "_level", "_characterName", "_characterIndex", "_faceName", "_faceIndex", "_battlerName", "_exp", "_equips"];
  return _.EnemyObserverFields = [
    "_enemyId",
    //"_letter"
    //"_plural"
    "_screenX",
    "_screenY"
  ];
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный менедреж отвечает за различие в версиях плагина для MZ и MV
ANET.VD = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.VD;
  _.getGameVersion = function() {
    if (KDCore.isMZ()) {
      return $dataSystem.advanced.gameId;
    } else {
      return $dataSystem.versionId;
    }
  };
  return _.getWindowBackgroundType = function() {
    if (KDCore.isMZ()) {
      return 2;
    } else {
      return 0;
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x3a32=['keyCode','_input','_createWaitPlayersAlert','showWaitingInfo','LQCIZ','Uovex','call','removeInput','oyWjM','bottom','TWPnQ','isLoaderActive','Cfbvb','classList','</p>','width','_shouldPreventDefault','_waitPlayers','343390SBmHlq','lRCWY','mouseleave','showInput','_createRelativeParent','TYyHX','_notify','PmCGi','AWcmQ','_createNotify','isInputActive','gReUu','height','3BlPEbJ','mouseenter','11693HNHpCq','rsLkB','_canvasRelativeElements','uDoYw','soyGk','262399evJpZT','GiVYJ','_createInputField','isUnderMouse','WaldD','wMNuG','1ROeVcO','head','insertAdjacentHTML','isWaitingInfoActive','_waitingInfoThread','_updateCanvas','_createLoadSpinner','HUIManager','CUUkz','center','Xukim','HWMRb','hideLoader','EpiWg','</label>','tBjBS','SEMqK','style','body','YWWYr','clear','SMwAG','appendChild','getElementsByTagName','CftRM','RdAri','value','log','div','1771878yudLXN','blockquote','anetLoader','updateCanvasHtmlElements','903006IFoABg','notifySucess','error','_loadCSS','CwBrH','20647XesPUj','<link\x20rel=\x22stylesheet\x22\x20href=\x22css/anet.css\x22\x20/>','196993cPeLmY','createElement','beforeend','anetWaitPlayersAlert','hideWaitingInfo','_disableContextMenu','setInputValue','anetInputName','44CVGeBW','EebOQ','<input\x20type=\x22input\x22\x20class=\x22form__field\x22\x20placeholder=\x22','getElementById','<cite>','_onKeyDown','add','2xKzykP','init','_isMouseHoverHtmlElement','WElMV','removeChild','_loader','warn','anetCanvasElements','addEventListener','anetInput','field','_loaderThread'];function a0_0x9f15(_0xca0986,_0x2f3182){_0xca0986=_0xca0986-0x7a;var _0x3a32fe=a0_0x3a32[_0xca0986];return _0x3a32fe;}var a0_0x4da997=a0_0x9f15;(function(_0x3444ee,_0xc4a2b7){var _0x45b0f7=a0_0x9f15;while(!![]){try{var _0x2e2c48=parseInt(_0x45b0f7(0xa2))*parseInt(_0x45b0f7(0xe4))+-parseInt(_0x45b0f7(0x93))+-parseInt(_0x45b0f7(0xa0))*parseInt(_0x45b0f7(0xa7))+parseInt(_0x45b0f7(0xd3))*parseInt(_0x45b0f7(0xdd))+-parseInt(_0x45b0f7(0xad))*parseInt(_0x45b0f7(0xd5))+-parseInt(_0x45b0f7(0xce))+parseInt(_0x45b0f7(0xca));if(_0x2e2c48===_0xc4a2b7)break;else _0x3444ee['push'](_0x3444ee['shift']());}catch(_0x4247b9){_0x3444ee['push'](_0x3444ee['shift']());}}}(a0_0x3a32,0x7383a),window[a0_0x4da997(0xb4)]=function(){},function(){var _0x3e16e1=a0_0x4da997,_0x5af307;_0x5af307=window[_0x3e16e1(0xb4)],_0x5af307[_0x3e16e1(0xe5)]=function(){var _0x28b37d=_0x3e16e1;this[_0x28b37d(0xe6)]=![],this[_0x28b37d(0xd1)](),this[_0x28b37d(0x97)](),this['_createLoadSpinner'](),this[_0x28b37d(0x9c)](),Graphics[_0x28b37d(0xda)]();},_0x5af307[_0x3e16e1(0xaa)]=function(){var _0xcdaaf9=_0x3e16e1;if(_0xcdaaf9(0xa5)===_0xcdaaf9(0xde)){function _0x3901b4(){var _0x4c1b34=_0xcdaaf9;return _0x22ad6c[_0x4c1b34(0x87)](this),_0x1932f4['updateCanvasHtmlElements']();}}else return this['_isMouseHoverHtmlElement']===!![];},_0x5af307['onGameSceneChanged']=function(){if('yrKkI'!=='yrKkI'){function _0x29757b(){return;}}else return this['hideWaitingInfo']();},_0x5af307['showLoader']=function(_0x4fb571=0xc8){var _0x4c170a=_0x3e16e1,_0x1e4d7b;try{if(this[_0x4c170a(0x8c)]()){if('bNqDa'===_0x4c170a(0xb8)){function _0x4c141a(){var _0x4a5c62=_0x4c170a;return _0x1d9e0f[_0x4a5c62(0xe6)]=![];}}else return;}this['_loaderThread']=setTimeout(function(){var _0x1a93e3=_0x4c170a;if(_0x1a93e3(0xc5)!==_0x1a93e3(0xd2)){if(!document[_0x1a93e3(0xe0)](_0x1a93e3(0xcc)))return document[_0x1a93e3(0xbf)]['appendChild'](HUIManager[_0x1a93e3(0x7a)]);}else{function _0x9a5dec(){var _0x11308b=_0x1a93e3,_0x32d6be;try{return this[_0x11308b(0x99)]['error'](_0x1d209e);}catch(_0x138f00){return _0x32d6be=_0x138f00,_0x5e484c[_0x11308b(0x7b)](_0x32d6be);}}}},_0x4fb571);}catch(_0x182539){_0x1e4d7b=_0x182539,console[_0x4c170a(0x7b)](_0x1e4d7b);}},_0x5af307[_0x3e16e1(0xb9)]=function(){var _0x55a104=_0x3e16e1,_0xe1a53d;try{if('gFWIE'!==_0x55a104(0x9e)){if(!this['isLoaderActive']())return;clearTimeout(this['_loaderThread']),this['_loaderThread']=null;if(document[_0x55a104(0xe0)]('anetLoader')){if(_0x55a104(0xb5)===_0x55a104(0xb5))document[_0x55a104(0xbf)][_0x55a104(0xe8)](this[_0x55a104(0x7a)]);else{function _0x156bbc(){var _0x59212a=_0x55a104;return _0x380992['isInputActive']()?![]:_0x1ed3ad[_0x59212a(0x87)](this);}}}}else{function _0x15f8c4(){return _0x5adbf3=_0x125397,_0x3723f5['warn'](_0x2022a3);}}}catch(_0x52e03e){if(_0x55a104(0xba)===_0x55a104(0x98)){function _0x24befd(){var _0x2051b9=_0x55a104;this[_0x2051b9(0x88)]();}}else _0xe1a53d=_0x52e03e,console[_0x55a104(0xc8)](_0xe1a53d);}},_0x5af307[_0x3e16e1(0x8c)]=function(){var _0xe682a6=_0x3e16e1;return this[_0xe682a6(0x80)]!=null;},_0x5af307[_0x3e16e1(0x84)]=function(_0x55eb33,_0x4dad15,_0x58e6b4=0xc8){var _0x2dde1b=_0x3e16e1,_0x430aea;try{if(_0x2dde1b(0x9a)!==_0x2dde1b(0x86)){if(this[_0x2dde1b(0xb0)]())return;this[_0x2dde1b(0xb1)]=setTimeout(function(){var _0xb6d9f=_0x2dde1b;if(_0xb6d9f(0xac)!==_0xb6d9f(0xac)){function _0x5871ac(){return;}}else return HUIManager[_0xb6d9f(0x83)](_0x55eb33,_0x4dad15);},_0x58e6b4);}else{function _0x1d598a(){return;}}}catch(_0x5bf940){_0x430aea=_0x5bf940,console[_0x2dde1b(0x7b)](_0x430aea);}},_0x5af307[_0x3e16e1(0xd9)]=function(){var _0x53d815=_0x3e16e1,_0x4de2b9;try{if(_0x53d815(0xbd)===_0x53d815(0xbd)){if(!this[_0x53d815(0xb0)]())return;clearTimeout(this[_0x53d815(0xb1)]),this[_0x53d815(0xb1)]=null;if(this[_0x53d815(0x92)]!=null){if(_0x53d815(0x85)==='LQCIZ')document[_0x53d815(0xe0)](_0x53d815(0x7c))[_0x53d815(0xe8)](this[_0x53d815(0x92)]),this['_waitPlayers']=null;else{function _0x39cc1e(){var _0x5c74c7=_0x53d815;if(!this[_0x5c74c7(0x8c)]())return;_0xe2713a(this[_0x5c74c7(0x80)]),this[_0x5c74c7(0x80)]=null,_0x48ecfb[_0x5c74c7(0xe0)](_0x5c74c7(0xcc))&&_0x58db54[_0x5c74c7(0xbf)][_0x5c74c7(0xe8)](this[_0x5c74c7(0x7a)]);}}}}else{function _0xdb76c(){var _0x34fab6=_0x53d815;return _0x10b785[_0x34fab6(0x87)](this);}}}catch(_0x165969){if(_0x53d815(0xa8)!==_0x53d815(0xa8)){function _0x1f6d77(){var _0x26bb6c=_0x53d815;_0x57afba[_0x26bb6c(0xbf)][_0x26bb6c(0xe8)](this[_0x26bb6c(0x7a)]);}}else _0x4de2b9=_0x165969,console[_0x53d815(0x7b)](_0x4de2b9);}},_0x5af307[_0x3e16e1(0xb0)]=function(){var _0x5d49cb=_0x3e16e1;return this[_0x5d49cb(0xb1)]!=null;},_0x5af307['notifyError']=function(_0x43fa63){var _0x479e5f=_0x3e16e1,_0x5f4fa3;try{return this[_0x479e5f(0x99)][_0x479e5f(0xd0)](_0x43fa63);}catch(_0x5490f0){return _0x5f4fa3=_0x5490f0,console[_0x479e5f(0x7b)](_0x5f4fa3);}},_0x5af307[_0x3e16e1(0xcf)]=function(_0x61c05){var _0x5994fb=_0x3e16e1;if(_0x5994fb(0xbc)!==_0x5994fb(0xbc)){function _0x4300bb(){var _0x2aca20=_0x5994fb;this[_0x2aca20(0x7a)]=_0x438746[_0x2aca20(0xd6)](_0x2aca20(0xc9)),this['_loader']['id']=_0x2aca20(0xcc),this[_0x2aca20(0x80)]=null;}}else{var _0x519fbd;try{return this[_0x5994fb(0x99)]['success'](_0x61c05);}catch(_0x5ded64){return _0x519fbd=_0x5ded64,console[_0x5994fb(0x7b)](_0x519fbd);}}},_0x5af307[_0x3e16e1(0x9d)]=function(){var _0x8a9361=_0x3e16e1;return this[_0x8a9361(0x82)]!=null;},_0x5af307[_0x3e16e1(0x96)]=function(_0x5c0623){var _0x22ff6f=_0x3e16e1;if(_0x22ff6f(0xc0)===_0x22ff6f(0xa6)){function _0x83e692(){return;}}else this['_input']!=null&&this[_0x22ff6f(0x88)](),this[_0x22ff6f(0xa9)](_0x5c0623);},_0x5af307['removeInput']=function(){var _0x5333c6=_0x3e16e1;if(this[_0x5333c6(0x82)]==null){if(_0x5333c6(0x8d)===_0x5333c6(0x8d))return;else{function _0x5c3a6c(){return'';}}}HUIManager[_0x5333c6(0xe6)]=![],document[_0x5333c6(0xe0)](_0x5333c6(0x7c))[_0x5333c6(0xe8)](this[_0x5333c6(0x82)]),this[_0x5333c6(0x82)]=null;},_0x5af307['getInputValue']=function(){var _0x4f124a=_0x3e16e1,_0x7a9783;if(this[_0x4f124a(0x82)]==null)return'';return(_0x7a9783=document[_0x4f124a(0xe0)](_0x4f124a(0xdc)))!=null?_0x7a9783[_0x4f124a(0xc7)]:void 0x0;},_0x5af307[_0x3e16e1(0xdb)]=function(_0x12625f){var _0x253bf9=_0x3e16e1,_0x5be6ff;if(this[_0x253bf9(0x82)]==null){if(_0x253bf9(0xa3)===_0x253bf9(0xa3))return;else{function _0x15d7e4(){_0x5d1beb=_0x542914,_0x34a8f5['warn'](_0x3a0062);}}}(_0x5be6ff=document[_0x253bf9(0xe0)](_0x253bf9(0xdc)))!=null&&(_0x5be6ff['value']=_0x12625f);},_0x5af307[_0x3e16e1(0xcd)]=function(){var _0x4e1fb1=_0x3e16e1;if(this[_0x4e1fb1(0xa4)]==null)return;this[_0x4e1fb1(0xa4)][_0x4e1fb1(0xbe)]['zIndex']=0x2,this[_0x4e1fb1(0xa4)][_0x4e1fb1(0x90)]=Graphics[_0x4e1fb1(0x90)],this[_0x4e1fb1(0xa4)][_0x4e1fb1(0x9f)]=Graphics[_0x4e1fb1(0x9f)],Graphics['_centerElement'](this[_0x4e1fb1(0xa4)]);},_0x5af307[_0x3e16e1(0xd1)]=function(){var _0x92f6c9=_0x3e16e1;document[_0x92f6c9(0xc4)](_0x92f6c9(0xae))[0x0]['insertAdjacentHTML'](_0x92f6c9(0xd7),_0x92f6c9(0xd4));},_0x5af307[_0x3e16e1(0xb3)]=function(){var _0x238773=_0x3e16e1;this['_loader']=document[_0x238773(0xd6)](_0x238773(0xc9)),this['_loader']['id']=_0x238773(0xcc),this[_0x238773(0x80)]=null;},_0x5af307['_createNotify']=function(){var _0x22ffab=_0x3e16e1;this[_0x22ffab(0x99)]=new Notyf({'duration':0x578,'position':{'x':_0x22ffab(0xb6),'y':_0x22ffab(0x8a)},'ripple':![]});},_0x5af307['_createWaitPlayersAlert']=function(_0x434854,_0x15803a){var _0x2ada62=_0x3e16e1,_0x47cf20;this[_0x2ada62(0x92)]=document[_0x2ada62(0xd6)](_0x2ada62(0xcb)),this[_0x2ada62(0x92)]['id']=_0x2ada62(0xd8),this[_0x2ada62(0x92)][_0x2ada62(0x8e)][_0x2ada62(0xe3)]('speech-bubble'),_0x47cf20='<p>'+_0x434854+_0x2ada62(0x8f)+_0x2ada62(0xe1)+_0x15803a+'</cite>',this['_waitPlayers']['insertAdjacentHTML'](_0x2ada62(0xd7),_0x47cf20),this['_canvasRelativeElements'][_0x2ada62(0xc3)](this[_0x2ada62(0x92)]);},_0x5af307[_0x3e16e1(0x97)]=function(){var _0x25d777=_0x3e16e1;this['_canvasRelativeElements']=document['createElement'](_0x25d777(0xc9)),this['_canvasRelativeElements']['id']=_0x25d777(0x7c),this[_0x25d777(0xcd)](),document[_0x25d777(0xbf)][_0x25d777(0xc3)](this['_canvasRelativeElements']);},_0x5af307[_0x3e16e1(0xa9)]=function(_0x33d2cf){var _0xfd07cc=_0x3e16e1;if(_0xfd07cc(0x89)!==_0xfd07cc(0x89)){function _0x479097(){var _0x568721=_0xfd07cc;this[_0x568721(0xa4)]=_0x1acc5e[_0x568721(0xd6)]('div'),this[_0x568721(0xa4)]['id']=_0x568721(0x7c),this[_0x568721(0xcd)](),_0x3603f9['body'][_0x568721(0xc3)](this[_0x568721(0xa4)]);}}else{var _0x308f46;this[_0xfd07cc(0x82)]=document[_0xfd07cc(0xd6)](_0xfd07cc(0xc9)),this[_0xfd07cc(0x82)]['id']=_0xfd07cc(0x7e),this['_input']['addEventListener'](_0xfd07cc(0xa1),function(){var _0x1e6070=_0xfd07cc;return HUIManager[_0x1e6070(0xe6)]=!![];}),this[_0xfd07cc(0x82)][_0xfd07cc(0x7d)](_0xfd07cc(0x95),function(){var _0x263421=_0xfd07cc;if(_0x263421(0xc2)==='HivTC'){function _0x2e0828(){return;}}else return HUIManager[_0x263421(0xe6)]=![];}),this[_0xfd07cc(0x82)][_0xfd07cc(0x8e)][_0xfd07cc(0xe3)]('form__group'),this['_input'][_0xfd07cc(0x8e)]['add'](_0xfd07cc(0x7f)),_0x308f46=_0xfd07cc(0xdf)+_0x33d2cf+'\x22\x20name=\x22anetInputName\x22\x20id=\x27anetInputName\x27\x20required\x20/>\x20<label\x20for=\x22anetInputName\x22\x20class=\x22form__label\x22>'+_0x33d2cf+_0xfd07cc(0xbb),this[_0xfd07cc(0x82)][_0xfd07cc(0xaf)](_0xfd07cc(0xd7),_0x308f46),this[_0xfd07cc(0xa4)][_0xfd07cc(0xc3)](this[_0xfd07cc(0x82)]);}};}(),function(){var _0x574bdd;_0x574bdd=Scene_Map['prototype'];}(),function(){var _0x2aea75=a0_0x4da997,_0x331b54,_0x5f1ad9,_0x5003e1;_0x5003e1=Input,_0x5f1ad9=_0x5003e1[_0x2aea75(0x91)],_0x5003e1[_0x2aea75(0x91)]=function(){var _0x3aa19b=_0x2aea75;if(_0x3aa19b(0xc6)==='RdAri'){if(HUIManager[_0x3aa19b(0x9d)]())return![];else{if(_0x3aa19b(0xab)!=='WaldD'){function _0x1081e2(){var _0x42febd=_0x3aa19b;if(this[_0x42febd(0xb0)]())return;this[_0x42febd(0xb1)]=_0x4bb27d(function(){var _0x3913ee=_0x42febd;return _0x5aa1b7[_0x3913ee(0x83)](_0x13f335,_0x2da86b);},_0x3853e0);}}else return _0x5f1ad9[_0x3aa19b(0x87)](this);}}else{function _0x4ea1ef(){var _0x53be02;_0x53be02=_0x5b9f49['prototype'];}}},_0x331b54=_0x5003e1[_0x2aea75(0xe2)],_0x5003e1[_0x2aea75(0xe2)]=function(_0x135515){var _0x13f745=_0x2aea75;if(HUIManager[_0x13f745(0x9d)]()){if(_0x13f745(0xb7)!=='Xukim'){function _0x7bbef7(){return![];}}else{if(_0x135515[_0x13f745(0x81)]===0x5a||_0x135515['keyCode']===0x58||_0x135515[_0x13f745(0x81)]===0x20){if(_0x13f745(0x9b)===_0x13f745(0x8b)){function _0x5d1b4b(){var _0x5694fc=_0x13f745;if(!_0x442ff3['getElementById'](_0x5694fc(0xcc)))return _0xbcb502[_0x5694fc(0xbf)][_0x5694fc(0xc3)](_0x5316cb[_0x5694fc(0x7a)]);}}else{this[_0x13f745(0xc1)]();return;}}}}return _0x331b54[_0x13f745(0x87)](this,_0x135515);};}(),function(){var _0x43fb42=a0_0x4da997,_0x385458,_0x446ac6;_0x446ac6=Graphics,_0x385458=_0x446ac6[_0x43fb42(0xb2)],_0x446ac6[_0x43fb42(0xb2)]=function(){var _0x370bb8=_0x43fb42;if(_0x370bb8(0xe7)!==_0x370bb8(0x94))return _0x385458[_0x370bb8(0x87)](this),HUIManager[_0x370bb8(0xcd)]();else{function _0x5b05a5(){return this['_isMouseHoverHtmlElement']===!![];}}};}());
})();

// Generated by CoffeeScript 2.5.1
// * Дополнительные расширения для KDCore

// * Расширение, чтобы без XDev работал плагин
(function() {
  var __STR_P;
  __STR_P = String.prototype.p;
  String.prototype.p = function(anotherText) {
    if (ANET.isDEV()) {
      __STR_P.call(this, anotherText);
    } else {

    }
  };
})();

// * NOTHING

//Compressed by MV Plugin Builder
(function(){var a0_0x4f58=['call','HLVFM','jnbhT','send','data','EmptyMessage','355824LrwkXX','paVQz','apply','24755fXhUeF','itwKr','name','emit','XmENk','cLzKd','_makeData','6291WmzDDD','from','get','320259YpPKkv','XoUFC','27YCGJPR','yCgII','ELRCq','Rjulu','NetMessage','LXMJV','broadcast','waited','socket','setData','Socket','250062DXCGDf','callback','1gHtQai','1499FGdiUy','260258MiUhtm','4doXqnt','setName','MgDWf','trace','kRrLe','iqMbk','WithTimeout','123QIibVU','7jwPZlk','FeWNG','SetOwnSocket','setTo'];function a0_0x5ad5(_0x24e470,_0x3f0ee2){_0x24e470=_0x24e470-0x10c;var _0x4f5864=a0_0x4f58[_0x24e470];return _0x4f5864;}var a0_0xc0eab3=a0_0x5ad5;(function(_0x886372,_0x2a3e08){var _0x375b48=a0_0x5ad5;while(!![]){try{var _0x518dd1=-parseInt(_0x375b48(0x131))*parseInt(_0x375b48(0x115))+-parseInt(_0x375b48(0x13b))*parseInt(_0x375b48(0x132))+-parseInt(_0x375b48(0x13c))*-parseInt(_0x375b48(0x118))+-parseInt(_0x375b48(0x122))+-parseInt(_0x375b48(0x11f))*-parseInt(_0x375b48(0x124))+-parseInt(_0x375b48(0x12f))+-parseInt(_0x375b48(0x134))*-parseInt(_0x375b48(0x133));if(_0x518dd1===_0x2a3e08)break;else _0x886372['push'](_0x886372['shift']());}catch(_0x514aa1){_0x886372['push'](_0x886372['shift']());}}}(a0_0x4f58,0x42cf4));var NetMessage;NetMessage=function(){var _0x216d54=a0_0x5ad5;class _0x7e78df{constructor(_0x3a8f18){var _0x4a57f7=a0_0x5ad5;if(_0x4a57f7(0x138)===_0x4a57f7(0x126)){function _0x143977(){var _0x2c922b=_0x4a57f7;return this[_0x2c922b(0x120)]=_0x714d65,this;}}else this[_0x4a57f7(0x12c)]=_0x3a8f18,this[_0x4a57f7(0x11a)]=_0x4a57f7(0x137),this[_0x4a57f7(0x120)]='',this['to']='',this[_0x4a57f7(0x113)]='',this[_0x4a57f7(0x12b)]=![];}[_0x216d54(0x135)](_0x5f31f2){var _0x9ce893=_0x216d54;return this[_0x9ce893(0x11a)]=_0x5f31f2,this;}[_0x216d54(0x10e)](_0x550dde){return this['to']=_0x550dde,this;}['setFrom'](_0x5df2a4){var _0x1853f6=_0x216d54;if(_0x1853f6(0x139)!==_0x1853f6(0x123))return this[_0x1853f6(0x120)]=_0x5df2a4,this;else{function _0xcd7607(){if(_0xc90178)return;return _0x1a1057=!![],_0x347fb6(_0x144722),_0x562173['apply'](this,_0x308e03);}}}['setData'](_0x3be218){return this['data']=_0x3be218,this;}['fullName'](){var _0x221cd0=_0x216d54;if(_0x221cd0(0x125)===_0x221cd0(0x125))return this[_0x221cd0(0x113)]!=null&&this[_0x221cd0(0x113)]['id']?this[_0x221cd0(0x11a)]+'_'+this[_0x221cd0(0x113)]['id']:this['name'];else{function _0x4c9bdb(){var _0x26a1c4=_0x221cd0;this[_0x26a1c4(0x12c)]=_0x59be28,this[_0x26a1c4(0x11a)]=_0x26a1c4(0x137),this[_0x26a1c4(0x120)]='',this['to']='',this[_0x26a1c4(0x113)]='',this[_0x26a1c4(0x12b)]=![];}}}[_0x216d54(0x112)](_0x1bf202){var _0x1a2752=_0x216d54;if(_0x1a2752(0x136)==='MgDWf')return this[_0x1a2752(0x12c)]['emit'](this['name'],this[_0x1a2752(0x11e)](_0x1bf202)),this;else{function _0x6c38c3(){return this['to']=_0x9c775f,this;}}}[_0x216d54(0x130)](_0x22df8f,_0x405b30){var _0x3d955=_0x216d54;if(_0x3d955(0x129)!==_0x3d955(0x129)){function _0x13fb5e(){return;}}else return this[_0x3d955(0x12c)][_0x3d955(0x11b)](this[_0x3d955(0x11a)],this[_0x3d955(0x11e)](_0x405b30),_0x22df8f),this;}[_0x216d54(0x121)](_0x4403ff,_0x3c65ff,_0x20cc93,_0x484e95){var _0x234dc2=_0x216d54,_0x454bce;return _0x454bce=_0x7e78df['WithTimeout'],this['socket'][_0x234dc2(0x11b)](this[_0x234dc2(0x11a)],this['_makeData'](_0x484e95),_0x454bce(_0x4403ff,_0x3c65ff,_0x20cc93)),this;}[_0x216d54(0x12a)](_0x1b971f){var _0x48af53=_0x216d54;return this['socket'][_0x48af53(0x12a)][_0x48af53(0x11b)](this['name'],this[_0x48af53(0x11e)](_0x1b971f));}[_0x216d54(0x11e)](_0x19cc9a=null){var _0x19baf7=_0x216d54;if(_0x19baf7(0x11c)!==_0x19baf7(0x10c)){var _0xa14836;_0xa14836={};if(_0x19cc9a==null){if(_0x19baf7(0x110)===_0x19baf7(0x110))_0x19cc9a=this['data'];else{function _0x45e1be(){var _0x1f7be1=_0x19baf7;return this[_0x1f7be1(0x114)](_0x8e2c74)[_0x1f7be1(0x135)](_0x1f7be1(0x137))['setData'](_0x291a87);}}}else this['data']=_0x19cc9a;return _0xa14836[_0x19baf7(0x113)]=_0x19cc9a,_0xa14836['from']=this['from'],_0xa14836['to']=this['to'],_0xa14836[_0x19baf7(0x12b)]=this[_0x19baf7(0x12b)],_0xa14836;}else{function _0x1aa6cf(){var _0x27f11b=_0x19baf7;return this[_0x27f11b(0x113)]!=null&&this['data']['id']?this['name']+'_'+this[_0x27f11b(0x113)]['id']:this[_0x27f11b(0x11a)];}}}static[_0x216d54(0x10d)](_0x480156){var _0x5c0696=_0x216d54;if(_0x5c0696(0x11d)!==_0x5c0696(0x119))return _0x7e78df[_0x5c0696(0x12e)]=_0x480156;else{function _0x5b494f(){return;}}}static['Trace'](_0x50c263,_0x3882ef){var _0x22a0c3=_0x216d54;return this['EmptyMessage'](_0x3882ef)[_0x22a0c3(0x135)](_0x22a0c3(0x137))[_0x22a0c3(0x12d)](_0x50c263);}static['EmptyMessage'](_0x3b8105=null){var _0xe48e4f=_0x216d54;if(_0xe48e4f(0x127)!==_0xe48e4f(0x111)){var _0x432d1c,_0x2095e6;return _0x2095e6=_0x3b8105,_0x3b8105==null&&(_0x2095e6=this[_0xe48e4f(0x12e)]),_0x432d1c=new _0x7e78df(_0x2095e6),_0x2095e6!=null&&_0x432d1c['setFrom'](_0x2095e6['id']),_0x432d1c;}else{function _0x5755b2(){var _0x519617=_0xe48e4f,_0x380877;return _0x380877=this[_0x519617(0x114)](_0x2d7a9c),_0x380877[_0x519617(0x12d)]({'id':_0x30ad4c,'content':_0x141a85}),_0x380877;}}}static['EmptyMessageWithFlag'](_0x486c55,_0x74de66,_0x438233=null){var _0x2ced26=_0x216d54,_0x496cd2;return _0x496cd2=this[_0x2ced26(0x114)](_0x438233),_0x496cd2[_0x2ced26(0x12d)]({'id':_0x486c55,'content':_0x74de66}),_0x496cd2;}static[_0x216d54(0x13a)](_0x2edad4,_0x455981,_0x257810){var _0x560462,_0xffacd8;return _0x560462=![],_0xffacd8=setTimeout(function(){if(_0x560462)return;return _0x560462=!![],_0x455981();},_0x257810),function(..._0x3c9b43){var _0x1dcf82=a0_0x5ad5;if(_0x560462){if('paVQz'===_0x1dcf82(0x116))return;else{function _0x202a6b(){var _0x48b8cf=_0x1dcf82;return this[_0x48b8cf(0x11a)]+'_'+this[_0x48b8cf(0x113)]['id'];}}}return _0x560462=!![],clearTimeout(_0xffacd8),_0x2edad4[_0x1dcf82(0x117)](this,_0x3c9b43);};}};return _0x7e78df[_0x216d54(0x12e)]=null,_0x7e78df;}[a0_0xc0eab3(0x10f)](this),window['NMS']=NetMessage,window[a0_0xc0eab3(0x128)]=NetMessage;
})();

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных игрока
var NetPlayerDataWrapper;

NetPlayerDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetPlayerDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetPlayerDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    var plName;
    // * Загружаем с настроек, если нету, то случайное
    if (String.any(ConfigManager.netPlayerName)) {
      plName = ConfigManager.netPlayerName;
    } else {
      if ($gameTemp._tempPlayerNetworkName == null) {
        $gameTemp._tempPlayerNetworkName = "Player " + Math.randomInt(1000);
      }
      plName = $gameTemp._tempPlayerNetworkName;
    }
    return {
      id: ANNetwork.myId(),
      name: plName,
      mapId: 0,
      actorId: 0,
      index: 0,
      scene: "",
      characterReady: false,
      isMapMaster: false,
      onEvent: 0,
      onCommonEvent: 0
    };
  };
  _.isCharOnMap = function(p) {
    return p.mapId === $gameMap.mapId() && p.characterReady === true;
  };
  _.isCurrentPlayerActor = function(actor, p) {
    return actor.actorId() === p.actorId;
  };
  _.isOnEvent = function(p, eventId) {
    return p.onEvent === eventId;
  };
  _.getRequestedNetworkState = function(p) {
    if (p.scene === "menu") {
      return 2;
    }
    if (p.scene === "battle") {
      return 5;
    }
    if (_.isOnAnyEvent(p)) {
      return 1;
    }
    return -1;
  };
  _.getNetCharacterForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameMap.networkCharacterById(p.id);
  };
  _.getActorForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameActors.actor(p.actorId);
  };
  _.isOnAnyEvent = function(p) {
    if (p == null) {
      return false;
    }
    return (p.onEvent > 0 || p.onCommonEvent > 0) && _.isCharOnMap(p);
  };
})();

// ■ END NetPlayerDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных комнаты
var NetRoomDataWrapper;

NetRoomDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetRoomDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetRoomDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    return {
      name: "Room " + Math.randomInt(100),
      masterId: "",
      masterName: "",
      inGame: false,
      playersIds: [],
      readyPlayersIds: [],
      gameId: 0,
      gameTitle: "",
      rpgVersion: 0,
      maxPlayers: 0,
      gameMode: 0,
      canConnect: true
    };
  };
  _.isRoomFull = function(r) {
    if (r == null) {
      return true;
    }
    return r.playersIds.length >= r.maxPlayers;
  };
  _.isRoomProperToJoin = function(r) {
    var e, myGameId;
    if (r == null) {
      return false;
    }
    try {
      // * Нельзя подключиться если разные игры
      myGameId = ANET.VD.getGameVersion();
      if (r.gameId !== myGameId) {
        return false;
      }
      // * Пока нельзя подключаться к уже запущенной игре
      if (r.inGame === true) {
        return false;
      }
      // * Нельзя подключаться, если комната полная
      if (_.isRoomFull(r)) {
        return false;
      }
      // * Если разные движки
      if (!_.isMyRPGVersion(r)) {
        return false;
      }
    } catch (error) {
      // * Если специальный флаг
      //TODO: Пока не обрабатывается
      //if r.canConnect is false
      //    return false
      e = error;
      ANET.w(e);
    }
    return true;
  };
  _.isMyRPGVersion = function(r) {
    if (r == null) {
      return false;
    }
    if (r.rpgVersion === 0) {
      return KDCore.isMZ();
    } else {
      return KDCore.isMV();
    }
  };
})();

// ■ END NetRoomDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var NetworkClientHandler;

NetworkClientHandler = class NetworkClientHandler {
  constructor(socket) {
    this.socket = socket;
    this._init();
  }

  disconnect() {
    var ref;
    return (ref = this.socket) != null ? ref.disconnect() : void 0;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetworkClientHandler.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _, _C;
  //@[DEFINES]
  _C = null; //? ClientManager
  _ = NetworkClientHandler.prototype;
  _._init = function() {
    _C = NetClientMethodsManager;
    // * Задаём ссылку на собственный сокет в класс сообщений
    // Чтобы можно было отправлять сообщения каждый раз не передавая сокет
    NetMessage.SetOwnSocket(this.socket);
    return this._handleCommands();
  };
  _._handleCommands = function() {
    this._handleBaseSocketEvents();
    this._handleDebugEvents();
    return this._handleANETServerEvents();
  };
  _._handleBaseSocketEvents = function() {
    this.socket.on('disconnect', function() {
      return _C.onDisconnect();
    });
    this.socket.on('connect', function() {
      return _C.onConnect();
    });
    return this.socket.on('connect_error', function() {
      return _C.onConnectionError();
    });
  };
  _._handleDebugEvents = function() {
    return this.socket.on('trace', function(n) {
      return console.log("Trace: " + n);
    });
  };
  _._handleANETServerEvents = function() {
    return this.socket.on('serverPrc', (n) => {
      return this._handleServerPrcEvent(n);
    });
  };
  _._handleServerPrcEvent = function(n) {
    var content, eventHandlerMethodName, flag, id;
    ({id, flag, content} = n);
    eventHandlerMethodName = id + "_" + flag;
    if (_C.isExistPrcEvent(eventHandlerMethodName)) {
      return _C.handlePrcEvent(eventHandlerMethodName, content);
    } else {
      return console.log("Unknown Event from server " + eventHandlerMethodName);
    }
  };
})();

// ■ END NetworkClientHandler.coffee
//---------------------------------------------------------------------------

var Notyf = function () {
    "use strict";
    var n, t, o = function () {
            return (o = Object.assign || function (t) {
                for (var i, e = 1, n = arguments.length; e < n; e++)
                    for (var o in i = arguments[e]) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
                return t
            }).apply(this, arguments)
        },
        s = (i.prototype.on = function (t, i) {
            var e = this.listeners[t] || [];
            this.listeners[t] = e.concat([i])
        }, i.prototype.triggerEvent = function (t, i) {
            var e = this;
            (this.listeners[t] || []).forEach(function (t) {
                return t({
                    target: e,
                    event: i
                })
            })
        }, i);

    function i(t) {
        this.options = t, this.listeners = {}
    }(t = n = n || {})[t.Add = 0] = "Add", t[t.Remove = 1] = "Remove";
    var v, e, a = (r.prototype.push = function (t) {
        this.notifications.push(t), this.updateFn(t, n.Add, this.notifications)
    }, r.prototype.splice = function (t, i) {
        var e = this.notifications.splice(t, i)[0];
        return this.updateFn(e, n.Remove, this.notifications), e
    }, r.prototype.indexOf = function (t) {
        return this.notifications.indexOf(t)
    }, r.prototype.onUpdate = function (t) {
        this.updateFn = t
    }, r);

    function r() {
        this.notifications = []
    }(e = v = v || {}).Dismiss = "dismiss";
    var c = {
            types: [{
                type: "success",
                className: "notyf__toast--success",
                backgroundColor: "#3dc763",
                icon: {
                    className: "notyf__icon--success",
                    tagName: "i"
                }
            }, {
                type: "error",
                className: "notyf__toast--error",
                backgroundColor: "#ed3d3d",
                icon: {
                    className: "notyf__icon--error",
                    tagName: "i"
                }
            }],
            duration: 2e3,
            ripple: !0,
            position: {
                x: "right",
                y: "bottom"
            },
            dismissible: !(e.Click = "click")
        },
        p = (d.prototype.on = function (t, i) {
            var e;
            this.events = o(o({}, this.events), ((e = {})[t] = i, e))
        }, d.prototype.update = function (t, i) {
            i === n.Add ? this.addNotification(t) : i === n.Remove && this.removeNotification(t)
        }, d.prototype.removeNotification = function (t) {
            var i, e, n = this,
                o = this._popRenderedNotification(t);
            o && ((e = o.node).classList.add("notyf__toast--disappear"), e.addEventListener(this.animationEndEventName, i = function (t) {
                t.target === e && (e.removeEventListener(n.animationEndEventName, i), n.container.removeChild(e))
            }))
        }, d.prototype.addNotification = function (t) {
            var i = this._renderNotification(t);
            this.notifications.push({
                notification: t,
                node: i
            }), this._announce(t.options.message || "Notification")
        }, d.prototype._renderNotification = function (t) {
            var i, e = this._buildNotificationCard(t),
                n = t.options.className;
            return n && (i = e.classList).add.apply(i, n.split(" ")), this.container.appendChild(e), e
        }, d.prototype._popRenderedNotification = function (t) {
            for (var i = -1, e = 0; e < this.notifications.length && i < 0; e++) this.notifications[e].notification === t && (i = e);
            if (-1 !== i) return this.notifications.splice(i, 1)[0]
        }, d.prototype.getXPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.x) || "right"
        }, d.prototype.getYPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.y) || "bottom"
        }, d.prototype.adjustContainerAlignment = function (t) {
            var i = this.X_POSITION_FLEX_MAP[this.getXPosition(t)],
                e = this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],
                n = this.container.style;
            n.setProperty("justify-content", e), n.setProperty("align-items", i)
        }, d.prototype._buildNotificationCard = function (n) {
            var t, o = this,
                i = n.options,
                e = i.icon;
            this.adjustContainerAlignment(i);
            var s = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__toast"
                }),
                a = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__ripple"
                }),
                r = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__wrapper"
                }),
                c = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__message"
                });
            c.innerHTML = i.message || "";
            var p, d, l, u, f, h = i.background || i.backgroundColor;
            e && "object" == typeof e && (p = this._createHTLMElement({
                tagName: "div",
                className: "notyf__icon"
            }), d = this._createHTLMElement({
                tagName: e.tagName || "i",
                className: e.className,
                text: e.text
            }), (l = null !== (t = e.color) && void 0 !== t ? t : h) && (d.style.color = l), p.appendChild(d), r.appendChild(p)), r.appendChild(c), s.appendChild(r), h && (i.ripple ? (a.style.background = h, s.appendChild(a)) : s.style.background = h), i.dismissible && (u = this._createHTLMElement({
                tagName: "div",
                className: "notyf__dismiss"
            }), f = this._createHTLMElement({
                tagName: "button",
                className: "notyf__dismiss-btn"
            }), u.appendChild(f), r.appendChild(u), s.classList.add("notyf__toast--dismissible"), f.addEventListener("click", function (t) {
                var i, e;
                null !== (e = (i = o.events)[v.Dismiss]) && void 0 !== e && e.call(i, {
                    target: n,
                    event: t
                }), t.stopPropagation()
            })), s.addEventListener("click", function (t) {
                var i, e;
                return null === (e = (i = o.events)[v.Click]) || void 0 === e ? void 0 : e.call(i, {
                    target: n,
                    event: t
                })
            });
            var m = "top" === this.getYPosition(i) ? "upper" : "lower";
            return s.classList.add("notyf__toast--" + m), s
        }, d.prototype._createHTLMElement = function (t) {
            var i = t.tagName,
                e = t.className,
                n = t.text,
                o = document.createElement(i);
            return e && (o.className = e), o.textContent = n || null, o
        }, d.prototype._createA11yContainer = function () {
            var t = this._createHTLMElement({
                tagName: "div",
                className: "notyf-announcer"
            });
            t.setAttribute("aria-atomic", "true"), t.setAttribute("aria-live", "polite"), t.style.border = "0", t.style.clip = "rect(0 0 0 0)", t.style.height = "1px", t.style.margin = "-1px", t.style.overflow = "hidden", t.style.padding = "0", t.style.position = "absolute", t.style.width = "1px", t.style.outline = "0", document.body.appendChild(t), this.a11yContainer = t
        }, d.prototype._announce = function (t) {
            var i = this;
            this.a11yContainer.textContent = "", setTimeout(function () {
                i.a11yContainer.textContent = t
            }, 100)
        }, d.prototype._getAnimationEndEventName = function () {
            var t, i = document.createElement("_fake"),
                e = {
                    MozTransition: "animationend",
                    OTransition: "oAnimationEnd",
                    WebkitTransition: "webkitAnimationEnd",
                    transition: "animationend"
                };
            for (t in e)
                if (void 0 !== i.style[t]) return e[t];
            return "animationend"
        }, d);

    function d() {
        this.notifications = [], this.events = {}, this.X_POSITION_FLEX_MAP = {
            left: "flex-start",
            center: "center",
            right: "flex-end"
        }, this.Y_POSITION_FLEX_MAP = {
            top: "flex-start",
            center: "center",
            bottom: "flex-end"
        };
        var t = document.createDocumentFragment(),
            i = this._createHTLMElement({
                tagName: "div",
                className: "notyf"
            });
        t.appendChild(i), document.body.appendChild(t), this.container = i, this.animationEndEventName = this._getAnimationEndEventName(), this._createA11yContainer()
    }

    function l(t) {
        var n = this;
        this.dismiss = this._removeNotification, this.notifications = new a, this.view = new p;
        var i = this.registerTypes(t);
        this.options = o(o({}, c), t), this.options.types = i, this.notifications.onUpdate(function (t, i) {
            return n.view.update(t, i)
        }), this.view.on(v.Dismiss, function (t) {
            var i = t.target,
                e = t.event;
            n._removeNotification(i), i.triggerEvent(v.Dismiss, e)
        }), this.view.on(v.Click, function (t) {
            var i = t.target,
                e = t.event;
            return i.triggerEvent(v.Click, e)
        })
    }
    return l.prototype.error = function (t) {
        var i = this.normalizeOptions("error", t);
        return this.open(i)
    }, l.prototype.success = function (t) {
        var i = this.normalizeOptions("success", t);
        return this.open(i)
    }, l.prototype.open = function (i) {
        var t = this.options.types.find(function (t) {
                return t.type === i.type
            }) || {},
            e = o(o({}, t), i);
        this.assignProps(["ripple", "position", "dismissible"], e);
        var n = new s(e);
        return this._pushNotification(n), n
    }, l.prototype.dismissAll = function () {
        for (; this.notifications.splice(0, 1););
    }, l.prototype.assignProps = function (t, i) {
        var e = this;
        t.forEach(function (t) {
            i[t] = null == i[t] ? e.options[t] : i[t]
        })
    }, l.prototype._pushNotification = function (t) {
        var i = this;
        this.notifications.push(t);
        var e = void 0 !== t.options.duration ? t.options.duration : this.options.duration;
        e && setTimeout(function () {
            return i._removeNotification(t)
        }, e)
    }, l.prototype._removeNotification = function (t) {
        var i = this.notifications.indexOf(t); - 1 !== i && this.notifications.splice(i, 1)
    }, l.prototype.normalizeOptions = function (t, i) {
        var e = {
            type: t
        };
        return "string" == typeof i ? e.message = i : "object" == typeof i && (e = o(o({}, e), i)), e
    }, l.prototype.registerTypes = function (t) {
        var i = (t && t.types || []).slice();
        return c.types.map(function (e) {
            var n = -1;
            i.forEach(function (t, i) {
                t.type === e.type && (n = i)
            });
            var t = -1 !== n ? i.splice(n, 1)[0] : {};
            return o(o({}, e), t)
        }).concat(i)
    }, l
}();
//Compressed by MV Plugin Builder
(function(){var a0_0x5616=['sendInitialMapData','2647hbWBar','getNetCharacterForPlayer','START\x20BINDING\x20ACTORS','actorsForNetwork','playersActors','Color','37RXZgtp','length','staticActorBinging','SCGTk','READY\x20TO\x20START\x20GAME','playersData','iVkSp','actorBingingFromSelection','setupNetworkGame','onLeaveRoom','Player\x20data\x20for\x20','init','fXzHq','setWait','BLACK','myIndex','XMoIq','vujaJ','reserveCommonEvent','VhNUd','networkGameStarted','isAllPlayerOnSameMap','every','reset','_waitMode','1338486AuhqzD','isNextScene','startGame','setColors','updateWaiting','onRefreshGameParty','getPlayerDataById','QqGXx','nSafeRefresh','requestNetworkStateIcon','XHAoA','_shouldWaitPlayerOnSameMap','jOQbJ','isInited','2185635kLsgev','refresh','onRoomPlayers','VEiga','uGuDY','_nLocalActorMode','battle','DevLog','PzScn','isMapMaster','ANGameManager','sendMapLoaded','21811eTsXjR','push','ecPQv','sendPlayerName','resetWait','isCharOnMap','index','onMapLoaded','XiNTB','anotherPlayers','sceneChange','find','_actors','actorId','xEVGV','NGAME','getRequestedNetworkState','menu','isPlayerDataExists','bindingActors','tnfAh','myActorId','sendActorReady','isSameMapMode','CiwWR','Yabov','Game','name','uKBwm','sendBindActorFromGame','FyJHy','myPlayerData','isAllPlayersActorsReady','refreshNetworkStates','\x20not\x20finded!','characterReady','NCSbW','679eomClZ','NdIgv','sendSceneChanging','battleData','NetGame','nZAGf','onGamePlayers','mapId','playersOnMap','isActorSelectionAllowed','isShouldWaitServer','LEpae','showLoader','39rMPAxa','PUjSS','onPlayerName','1467051rSoDrm','bjPcQ','Player\x20leave\x20game','bkzSB','47420dEjVGv','HqLtO','isBattleMaster','UBgGX','getPlayerLeaveGameCommonEventId','28357MqEtVs','tdJat','cHGPB','createMyPlayerData','RDASk','myId','createLocal','anotherPlayersOnMap','filter','JPzRL','10akDCWI'];var a0_0xe6fffb=a0_0x4b93;function a0_0x4b93(_0x37c312,_0x27d754){_0x37c312=_0x37c312-0x1d3;var _0x5616c6=a0_0x5616[_0x37c312];return _0x5616c6;}(function(_0x469444,_0x445afd){var _0x2580fb=a0_0x4b93;while(!![]){try{var _0x2e8dd7=parseInt(_0x2580fb(0x21f))+parseInt(_0x2580fb(0x1e8))*parseInt(_0x2580fb(0x239))+-parseInt(_0x2580fb(0x1eb))+-parseInt(_0x2580fb(0x1f4))*-parseInt(_0x2580fb(0x206))+-parseInt(_0x2580fb(0x200))*-parseInt(_0x2580fb(0x1db))+-parseInt(_0x2580fb(0x1ef))*parseInt(_0x2580fb(0x1fe))+-parseInt(_0x2580fb(0x22d));if(_0x2e8dd7===_0x445afd)break;else _0x469444['push'](_0x469444['shift']());}catch(_0x5ab938){_0x469444['push'](_0x469444['shift']());}}}(a0_0x5616,0xdddcf),window['ANGameManager']=function(){},function(){var _0x133bef=a0_0x4b93,_0x2f5622,_0x13d9b6;_0x2f5622=new KDCore[(_0x133bef(0x234))](_0x133bef(0x1df)),_0x2f5622[_0x133bef(0x222)](KDCore[_0x133bef(0x205)]['AQUA'],KDCore[_0x133bef(0x205)][_0x133bef(0x214)]['getLightestColor'](0x23)),_0x2f5622['on'](),_0x13d9b6=window[_0x133bef(0x237)],_0x13d9b6[_0x133bef(0x1e5)]=function(){var _0x3b80eb=_0x133bef;if('IjsJB'!=='IjsJB'){function _0x5ed8b7(){var _0x15760d=a0_0x4b93;return _0x3f7e0b[_0x15760d(0x1f1)]();}}else return this[_0x3b80eb(0x21e)]!=null;},_0x13d9b6[_0x133bef(0x211)]=function(){var _0x40d28c=_0x133bef;if(_0x40d28c(0x1e9)===_0x40d28c(0x1e9))return this['reset'](),this[_0x40d28c(0x1f7)](),ANPlayersManager[_0x40d28c(0x23c)]();else{function _0x181914(){return;}}},_0x13d9b6[_0x133bef(0x21d)]=function(){var _0x4dc638=_0x133bef;if(_0x4dc638(0x22b)===_0x4dc638(0x22b))this[_0x4dc638(0x21a)]=![],this[_0x4dc638(0x21e)]=null,this[_0x4dc638(0x20b)]=null,ANBattleManager[_0x4dc638(0x1de)]=null;else{function _0x56a6d0(){var _0x1c4f07=_0x4dc638;return this[_0x1c4f07(0x21e)]=_0x48448c,_0x35796d[_0x1c4f07(0x1e7)](0x1f4);}}},_0x13d9b6['createMyPlayerData']=function(){var _0x282a9e=_0x133bef;this[_0x282a9e(0x20b)]=[],this[_0x282a9e(0x20b)][_0x282a9e(0x23a)](NetPlayerDataWrapper[_0x282a9e(0x1fa)]());},_0x13d9b6[_0x133bef(0x22c)]=function(){var _0x49eb36=_0x133bef;if(_0x49eb36(0x1fd)===_0x49eb36(0x241)){function _0xdb4f8f(){var _0x4250aa=_0x49eb36;_0x533109[_0x4250aa(0x238)](),_0x3b08a0[_0x4250aa(0x1ff)](),(this[_0x4250aa(0x22a)]===!![]||this[_0x4250aa(0x21a)]===!![])&&this[_0x4250aa(0x213)](_0x4250aa(0x1e3));}}else return this[_0x49eb36(0x20b)]!=null;},_0x13d9b6[_0x133bef(0x1d5)]=function(){var _0x55858a=_0x133bef;if(_0x55858a(0x1ee)!==_0x55858a(0x212))return this[_0x55858a(0x225)](ANNetwork[_0x55858a(0x1f9)]());else{function _0x7fe178(){return this['playersData']!=null;}}},_0x13d9b6[_0x133bef(0x24e)]=function(){var _0x3d49ec=_0x133bef;return this[_0x3d49ec(0x1d5)]()[_0x3d49ec(0x246)];},_0x13d9b6['myIndex']=function(){var _0x192103=_0x133bef;if('vdzzk'===_0x192103(0x235)){function _0x4e039f(){var _0x306d60=_0x192103;return this[_0x306d60(0x1f7)]();}}else return this['myPlayerData']()[_0x192103(0x23f)];},_0x13d9b6[_0x133bef(0x236)]=function(){var _0x48b9c8=_0x133bef;return this[_0x48b9c8(0x1d5)]()[_0x48b9c8(0x236)]===!![];},_0x13d9b6['isBattleMaster']=function(){var _0x2634f1=_0x133bef;if(_0x2634f1(0x23b)!==_0x2634f1(0x23b)){function _0x2b8fb7(){var _0x12f029=_0x2634f1,_0x518066;return _0x518066=this[_0x12f029(0x215)](),this[_0x12f029(0x20b)][_0x12f029(0x1fc)](function(_0x20786b){var _0x1bf3f0=_0x12f029;return _0x20786b[_0x1bf3f0(0x23f)]!==_0x518066;});}}else return ANBattleManager['isBattleMaster']();},_0x13d9b6[_0x133bef(0x24b)]=function(_0x123f73){var _0x1b3401=_0x133bef,_0x5aaddf;return _0x5aaddf=this[_0x1b3401(0x20b)][_0x1b3401(0x244)](function(_0x24cb43){return _0x24cb43['id']===_0x123f73;}),_0x5aaddf!=null;},_0x13d9b6[_0x133bef(0x225)]=function(_0x1364dd){var _0x1cf838=_0x133bef,_0x1f88a3;_0x1f88a3=this[_0x1cf838(0x20b)][_0x1cf838(0x244)](function(_0xa4dd34){return _0xa4dd34['id']===_0x1364dd;});if(_0x1f88a3!=null)return _0x1f88a3;else{if(_0x1cf838(0x20c)!==_0x1cf838(0x20c)){function _0x2b58f3(){var _0x4feace=_0x1cf838;_0x237d54[_0x4feace(0x218)](_0x4c867f);}}else ANET['w'](_0x1cf838(0x210)+_0x1364dd+_0x1cf838(0x1d8));}return null;},_0x13d9b6['setupNewNetworkGame']=function(){var _0x7e3f37=_0x133bef;if(_0x7e3f37(0x247)!==_0x7e3f37(0x251))return this[_0x7e3f37(0x21a)]=!![],$gameParty[_0x7e3f37(0x20e)]();else{function _0x14c788(){var _0x16f76d=_0x7e3f37;return this['playersData'][_0x16f76d(0x21c)](function(_0x1590cd){var _0x581395=_0x16f76d;return _0x1590cd[_0x581395(0x1d9)]===!![];});}}},_0x13d9b6['onNewGameMapSetup']=function(){var _0x4414d3=_0x133bef;if(_0x4414d3(0x209)==='SCGTk')$gameTemp['_nLocalActorMode']=![],this[_0x4414d3(0x22a)]=ANNetwork['isSameMapMode']();else{function _0x2403e8(){var _0x223a02=_0x4414d3;return this[_0x223a02(0x21a)]=!![],_0x4f031a['setupNetworkGame']();}}},_0x13d9b6[_0x133bef(0x240)]=function(){var _0x494485=_0x133bef;ANMapManager[_0x494485(0x238)](),ANMapManager[_0x494485(0x1ff)](),(this[_0x494485(0x22a)]===!![]||this['networkGameStarted']===!![])&&this[_0x494485(0x213)](_0x494485(0x1e3));},_0x13d9b6[_0x133bef(0x213)]=function(_0x13030a){var _0x7aea13=_0x133bef;return this['_waitMode']=_0x13030a,HUIManager[_0x7aea13(0x1e7)](0x1f4);},_0x13d9b6[_0x133bef(0x23d)]=function(){var _0x39657d=_0x133bef;return this[_0x39657d(0x213)](null),HUIManager['hideLoader']();},_0x13d9b6[_0x133bef(0x21b)]=function(){var _0x778aad=_0x133bef;return this[_0x778aad(0x20b)][_0x778aad(0x21c)](function(_0x3f0e7c){var _0x4b7575=_0x778aad;if(_0x4b7575(0x1e6)!==_0x4b7575(0x1f6))return _0x3f0e7c['mapId']===$gameMap[_0x4b7575(0x1e2)]();else{function _0x526351(){var _0x3e8508=_0x4b7575;return this['myPlayerData']()[_0x3e8508(0x23f)];}}});},_0x13d9b6[_0x133bef(0x242)]=function(){var _0x3a1df9=_0x133bef;if('fElat'!==_0x3a1df9(0x1d4)){var _0x2105c6;return _0x2105c6=this['myIndex'](),this['playersData'][_0x3a1df9(0x1fc)](function(_0x41e8e7){var _0x7f41b6=_0x3a1df9;if(_0x7f41b6(0x216)!==_0x7f41b6(0x1f0))return _0x41e8e7['index']!==_0x2105c6;else{function _0x51a286(){var _0x3d9d05=_0x7f41b6;this[_0x3d9d05(0x21a)]=![],this[_0x3d9d05(0x21e)]=null,this[_0x3d9d05(0x20b)]=null,_0xf477ad[_0x3d9d05(0x1de)]=null;}}});}else{function _0x503e5c(){return _0x4ae1b1['id']===_0x503ba5;}}},_0x13d9b6['anotherPlayersOnMap']=function(){var _0x2d4684=_0x133bef;return this[_0x2d4684(0x242)]()[_0x2d4684(0x1fc)](function(_0x335c49){var _0xcc866b=_0x2d4684;return NetPlayerDataWrapper[_0xcc866b(0x23e)](_0x335c49);});},_0x13d9b6[_0x133bef(0x1d6)]=function(){var _0x4bf9b6=_0x133bef;return this[_0x4bf9b6(0x20b)][_0x4bf9b6(0x21c)](function(_0x3e76c4){var _0x1847ae=_0x4bf9b6;return _0x3e76c4[_0x1847ae(0x1d9)]===!![];});},_0x13d9b6['refreshNetworkStates']=function(){var _0x312745=_0x133bef;if(_0x312745(0x1da)===_0x312745(0x255)){function _0x112c54(){var _0x2954b6=_0x312745;return this['anotherPlayers']()[_0x2954b6(0x1fc)](function(_0x3565fa){var _0x3e64b5=_0x2954b6;return _0x4d31c2[_0x3e64b5(0x23e)](_0x3565fa);});}}else{var _0x217fc5,_0x1ae4ba,_0x34f179,_0x4343ee,_0x91412f,_0x187278;_0x91412f=this[_0x312745(0x1fb)]();for(_0x1ae4ba=0x0,_0x34f179=_0x91412f[_0x312745(0x207)];_0x1ae4ba<_0x34f179;_0x1ae4ba++){if(_0x312745(0x229)==='EMdsM'){function _0x26738a(){var _0x61c078=_0x312745,_0x3a37fb;_0x3195fe['p'](_0x61c078(0x1ed)),_0x3a37fb=_0x3c4a4b['PP']['getPlayerLeaveGameCommonEventId'](),_0x3a37fb>0x0&&_0x55415c[_0x61c078(0x218)](_0x3a37fb);}}else _0x4343ee=_0x91412f[_0x1ae4ba],_0x187278=NetPlayerDataWrapper[_0x312745(0x249)](_0x4343ee),_0x217fc5=NetPlayerDataWrapper[_0x312745(0x201)](_0x4343ee),_0x217fc5!=null&&_0x217fc5[_0x312745(0x228)](_0x187278);}}},_0x13d9b6[_0x133bef(0x24c)]=function(){var _0x13311d=_0x133bef;_0x13311d(0x202)['p'](),this['networkGameStarted']=![];if(ANET['PP'][_0x13311d(0x1e4)]()){if(_0x13311d(0x1f5)!==_0x13311d(0x1f5)){function _0x1dae6e(){var _0x1384d5=_0x13311d,_0x44a350,_0xa0296a,_0x493a23,_0x4f14d6;_0x29ab4c[_0x1384d5(0x245)]=[],_0x4f14d6=this[_0x1384d5(0x20b)];for(_0x44a350=0x0,_0xa0296a=_0x4f14d6[_0x1384d5(0x207)];_0x44a350<_0xa0296a;_0x44a350++){_0x493a23=_0x4f14d6[_0x44a350],_0x493a23[_0x1384d5(0x246)]>0x0&&_0x493a23[_0x1384d5(0x1d9)]===!![]&&_0x50eb6e['_actors']['push'](_0x493a23[_0x1384d5(0x246)]);}_0x2548b5['refresh'](),_0x124c9d['nSafeRefresh']();}}else this['actorBingingFromSelection']();}else{if(_0x13311d(0x226)!==_0x13311d(0x24d))this[_0x13311d(0x208)]();else{function _0x4f08df(){var _0x47506d=_0x13311d;this[_0x47506d(0x208)]();}}}},_0x13d9b6[_0x133bef(0x20d)]=function(){var _0xf3f4b1=_0x133bef;if(_0xf3f4b1(0x1ec)!==_0xf3f4b1(0x231))ANPlayersManager[_0xf3f4b1(0x24f)]();else{function _0x5f3498(){var _0x55c9be=_0xf3f4b1;return _0x205fa1[_0x55c9be(0x1d9)]===!![];}}},_0x13d9b6[_0x133bef(0x208)]=function(){var _0x8ff6a0=_0x133bef,_0x442ac9;_0x442ac9=ANET['PP'][_0x8ff6a0(0x203)]()[this[_0x8ff6a0(0x215)]()-0x1],ANPlayersManager[_0x8ff6a0(0x1d3)](_0x442ac9);},_0x13d9b6[_0x133bef(0x223)]=function(){var _0x5f36fe=_0x133bef;if(!this[_0x5f36fe(0x1e5)]())return;switch(this[_0x5f36fe(0x21e)]){case _0x5f36fe(0x1e3):if(this[_0x5f36fe(0x21b)]()){if('goONt'!==_0x5f36fe(0x1dc))this[_0x5f36fe(0x23d)](),this[_0x5f36fe(0x22a)]=![],this[_0x5f36fe(0x21a)]===!![]&&this['bindingActors']();else{function _0xa95fbe(){var _0x525069=_0x5f36fe;_0x26f30f[_0x525069(0x228)](_0x445a15);}}}break;case _0x5f36fe(0x204):if(this[_0x5f36fe(0x1d6)]()){if(_0x5f36fe(0x1e0)!==_0x5f36fe(0x1e0)){function _0x8bcd4e(){var _0x4af2cc=_0x5f36fe;_0x300c02=_0x4c6ad4[_0x1f476b],_0xde1a7c=_0x58276b[_0x4af2cc(0x249)](_0x1f5e69),_0x5ea7ce=_0x4111c9['getNetCharacterForPlayer'](_0x111455),_0xd506d2!=null&&_0x296afe['requestNetworkStateIcon'](_0x351858);}}else this[_0x5f36fe(0x23d)](),this['startGame']();}break;}},_0x13d9b6[_0x133bef(0x221)]=function(){var _0xe6ccd2=_0x133bef;_0xe6ccd2(0x20a)['p'](),ANMapManager[_0xe6ccd2(0x1ff)]();},_0x13d9b6['anotherPlayerLeaveGame']=function(_0x31b644){var _0x38ef79=_0x133bef,_0x51b042;_0x2f5622['p'](_0x38ef79(0x1ed)),_0x51b042=ANET['PP'][_0x38ef79(0x1f3)](),_0x51b042>0x0&&$gameTemp[_0x38ef79(0x218)](_0x51b042);},_0x13d9b6[_0x133bef(0x1dd)]=function(){var _0x50c9dd=_0x133bef,_0x4c3a7e;_0x4c3a7e='unknown';if(!SceneManager[_0x50c9dd(0x220)](Scene_Map)){if(_0x50c9dd(0x1f8)===_0x50c9dd(0x252)){function _0x5bc7da(){var _0x35d3c0=_0x50c9dd;_0x2198be=_0x41221d[_0x2fb66f],_0x39613c['actorId']>0x0&&_0x3ab401[_0x35d3c0(0x1d9)]===!![]&&_0x3b5964[_0x35d3c0(0x245)][_0x35d3c0(0x23a)](_0x39d6a6[_0x35d3c0(0x246)]);}}else _0x4c3a7e=_0x50c9dd(0x24a);}SceneManager['isNextScene'](Scene_Battle)&&(_0x4c3a7e=_0x50c9dd(0x233)),ANNetwork['send'](NMS[_0x50c9dd(0x253)](_0x50c9dd(0x243),_0x4c3a7e));},_0x13d9b6[_0x133bef(0x1ea)]=function(_0x2ffc95,_0x8aa13b){var _0x56c75f=_0x133bef,_0x15e116;if(this[_0x56c75f(0x24b)]()){if(_0x56c75f(0x219)===_0x56c75f(0x217)){function _0x359f76(){var _0x461a2=_0x56c75f;_0x3016aa[_0x461a2(0x24f)]();}}else _0x15e116=this[_0x56c75f(0x225)](_0x2ffc95),_0x15e116!=null&&(_0x15e116[_0x56c75f(0x254)]=_0x8aa13b);}else{}},_0x13d9b6[_0x133bef(0x22f)]=function(_0x3b8a1a){var _0x3b6b09=_0x133bef,_0x2a7bd7;_0x2a7bd7=this[_0x3b6b09(0x1d5)](),this[_0x3b6b09(0x20b)]=_0x3b8a1a,!this['getPlayerDataById'](ANNetwork[_0x3b6b09(0x1f9)]())&&this[_0x3b6b09(0x20b)][_0x3b6b09(0x23a)](_0x2a7bd7);},_0x13d9b6[_0x133bef(0x1e1)]=function(_0x427bfb){var _0x386968=_0x133bef;if(_0x386968(0x1f2)===_0x386968(0x1f2))this[_0x386968(0x22f)](_0x427bfb),this[_0x386968(0x1d7)](),$gameMap['nSafeRefresh']();else{function _0x90afd9(){var _0x2f5040=_0x386968;'START\x20BINDING\x20ACTORS'['p'](),this['networkGameStarted']=![],_0x5b165a['PP'][_0x2f5040(0x1e4)]()?this[_0x2f5040(0x20d)]():this[_0x2f5040(0x208)]();}}},_0x13d9b6[_0x133bef(0x224)]=function(){var _0x27cce7=_0x133bef;if('pYled'!=='pYled'){function _0x59f50a(){var _0x45ee0e=a0_0x4b93;return this[_0x45ee0e(0x225)](_0x58a45c['myId']());}}else{var _0x3ac8f4,_0x2cd162,_0x2d9b8c,_0x561bfe;$gameParty['_actors']=[],_0x561bfe=this[_0x27cce7(0x20b)];for(_0x3ac8f4=0x0,_0x2cd162=_0x561bfe['length'];_0x3ac8f4<_0x2cd162;_0x3ac8f4++){_0x2d9b8c=_0x561bfe[_0x3ac8f4],_0x2d9b8c[_0x27cce7(0x246)]>0x0&&_0x2d9b8c[_0x27cce7(0x1d9)]===!![]&&$gameParty[_0x27cce7(0x245)][_0x27cce7(0x23a)](_0x2d9b8c[_0x27cce7(0x246)]);}$gamePlayer[_0x27cce7(0x22e)](),$gameMap[_0x27cce7(0x227)]();}},_0x13d9b6[_0x133bef(0x20f)]=function(){var _0x1d24ea=_0x133bef;if(_0x1d24ea(0x230)==='VEiga')return this['createMyPlayerData']();else{function _0x24017d(){var _0x4bdc5a=_0x1d24ea;_0xc21d9d[_0x4bdc5a(0x232)]=![],this[_0x4bdc5a(0x22a)]=_0x18af78[_0x4bdc5a(0x250)]();}}};}(),window[a0_0xe6fffb(0x248)]=ANGameManager);
})();

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]
var DataObserver;

DataObserver = class DataObserver {
  constructor(_checkTime = 0, _instante = false) {
    this._checkTime = _checkTime;
    this._instante = _instante;
    this._fields = {};
    this._isDataChanged = false;
    this._isShouldSkipCheck = false;
    this._timer = 0;
    return;
  }

  // * отправка без проверки изменений (по таймеру, если задан)
  setInstanteMode() {
    return this._instante = true;
  }

  // * проверка изменений (по таймеру, если задан)
  setCheckMode() {
    return this._instante = false;
  }

  // * не проверять изменения, устанавливать флаг _isDataChanged сразу (по истечению таймера)
  setCheckInterval(_checkTime) {
    this._checkTime = _checkTime;
  }

  // * Пропустить проверку данных, например когда данные пришли от сервера
  skip() {
    return this._isShouldSkipCheck = true;
  }

  addFields(obj, fieldsList) {
    var f, i, len;
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      this.readField(obj, f);
    }
  }

  removeFields(fieldsList) {
    var f, i, len, results;
    results = [];
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      results.push(delete this._fields[f]);
    }
    return results;
  }

  // * Прочитать все значения с объекта
  refreshAll(obj) {
    var f;
    for (f in this._fields) {
      this.readField(obj, f);
    }
    return this._isDataChanged = false;
  }

  readField(obj, field) {
    return this._fields[field] = obj[field];
  }

  check(obj) {
    var f;
    // * Если данные изменены, но зачем снова проверять?
    // * Всё равно не отслеживается какое именно поле было изменнено
    if (this.isDataChanged()) {
      return;
    }
    this._timer--;
    // * Если таймер, то ждём, не проверяем
    if (this._timer > 0) {
      return;
    }
    this._timer = this._checkTime;
    // * Если надо пропустить проверку, то пропускаем
    if (this._isShouldSkipCheck === true) {
      this._isShouldSkipCheck = false;
      return;
    }
    // * Если постоянное обновление, то сразу флаг и пропускаем проверку
    if (this._instante === true) {
      this._isDataChanged = true;
      return;
    }
    for (f in this._fields) {
      if (obj[f] !== this._fields[f]) {
        this._isDataChanged = true;
        break;
      }
    }
  }

  isDataChanged() {
    return this._isDataChanged === true;
  }

  // * Получить данные всех полей для отправки на сервер
  getDataForNetwork(obj) {
    this.refreshAll(obj);
    return this._fields;
  }

  // * Установить данные всех полей, когда пришли с сервера
  setDataFromNetwork(obj, observerData) {
    var f;
    for (f in this._fields) {
      obj[f] = observerData[f];
    }
    this.refreshAll(obj);
  }

};

//Compressed by MV Plugin Builder
(function(){var a0_0x3891=['sBhEN','stop','onConnectCallback','event_event_virtualEventCommand','onBattleInputState','onConnect','folhI','fRDju','inputActorId','data','TQHDg','Handle\x20Event:\x20','MAGENTA','onBattleMethod','type','DmHJA','VAhjG','isBusyForNetworkData','undefined','SHARED\x20EVENT\x20CAN\x20CONTINUE','onPlayerLocation','JhPnZ','HWcUa','event_game_customCommandLink','battle_battleMethodReceived','room','SHARED\x20EVENT\x20IN','event_map_initialMapSynchronization','event_map_eventMove','event_map_playerLocation','BLACK','306473RiyCFk','xJyXC','wPPeD','RHCns','onPlayerMove','alert','Client\x20not\x20match\x20server\x20version','Can\x27t\x20connect\x20to\x20server!','onBattleMethodReceived','setConnectionToMasterCallback','onLogWindowMessage','nRegisterCustomCommandCE','Color','event_battle_battleMethodReceived','350503aPOjeJ','HdGBD','notifyError','onPlayerName','RRHJD','TlfLq','event_game_observerData','callback','tTONm','map_eventMove','event_battle_serverBattleData','SHARED\x20EVENT\x20ANSWER','event_battle_animation','IWnVt','action','event_battle_battleMethod','event_battleMethodReceived','BoKjv','_scene','moyiY','event_game_variable','zsdwW','KcbFy','RRolO','1rHOjnY','onConnectionError','onVariableValue','SHARED\x20EVENT\x20FORCE\x20CANCELLED','who','ptyDN','event_map_playerMove','REFRESH\x20PARTY','Event\x20End:\x20','sKQXq','DevLog','mapId','event_event_sharedChoice','onInitialMapSync','TLNwF','CUSTOM\x20COMMAND\x20IN','qgjqY','MCAwg','event_event_registerOnShared','74078gIZTWP','onVirtualCommand','callSceneCallback','Connected','tqKLx','onCustomCommand','onBattleDataFromServer','ServerRev','Lobby','contains','onBattleAnimation','DGceE','inputState','Please\x20update\x20Alpha\x20NET\x20Z\x20plugin','map_playerMove','event_battle_input','oBWeO','name','onEventMove','282278YzFnor','battle_battleMethod','event_battle_inputAction','onSharedEventChoiceActionFromServer','setupNewNetworkGame','event_lobby_refreshRoomData','playersData','event_battle_logMessage','onContinueSharedEvent','event_game_userCommand','warn','1RTSKnP','471700xHzzmY','getLightestColor','serverVerCheck','event_game_switch','method','NetClientMethodsManager','cmd','ibtOI','141241DBkJur','Scjub','onRefreshGameParty','event_','SvjYx','text','game_observerData','onRoomPlayers','handlePrcEvent','onLostConnection','event_event_sharedForceCancel','reAlpha','event_game_refreshParty','onGamePlayers','onSwitchValue','gxbly','wjzPs','isExistPrcEvent','STARTING\x20GAME','bdetn','event_lobby_roomClosed','420341WUvHJQ','event_event_registerDone','pyrOA','onRegisterOnSharedEventResponse','CUSTOM\x20LINK\x20IN'];var a0_0x18a808=a0_0xd37f;function a0_0xd37f(_0x548be4,_0x30cd13){_0x548be4=_0x548be4-0x1af;var _0x389160=a0_0x3891[_0x548be4];return _0x389160;}(function(_0x279d99,_0x364e54){var _0x17e4c0=a0_0xd37f;while(!![]){try{var _0x10e7bc=-parseInt(_0x17e4c0(0x21b))+parseInt(_0x17e4c0(0x1e2))+parseInt(_0x17e4c0(0x229))+parseInt(_0x17e4c0(0x1bb))+parseInt(_0x17e4c0(0x1da))+parseInt(_0x17e4c0(0x1ce))*parseInt(_0x17e4c0(0x1d9))+-parseInt(_0x17e4c0(0x1f7))*parseInt(_0x17e4c0(0x241));if(_0x10e7bc===_0x364e54)break;else _0x279d99['push'](_0x279d99['shift']());}catch(_0x571cf7){_0x279d99['push'](_0x279d99['shift']());}}}(a0_0x3891,0x90c5a),window[a0_0x18a808(0x1df)]=function(){},function(){var _0x1dbfb7=a0_0x18a808,_0x15005f,_0xd61eb3;_0x15005f=new KDCore[(_0x1dbfb7(0x1b2))]('NET\x20Client'),_0x15005f['setColors'](KDCore[_0x1dbfb7(0x227)][_0x1dbfb7(0x208)][_0x1dbfb7(0x1ed)](0xc8),KDCore[_0x1dbfb7(0x227)][_0x1dbfb7(0x21a)][_0x1dbfb7(0x1db)](0xc8)),_0x15005f['on'](),_0xd61eb3=window['NetClientMethodsManager'],_0xd61eb3[_0x1dbfb7(0x224)]=function(_0x47fbd4){var _0x48e2bd=_0x1dbfb7;this[_0x48e2bd(0x1fe)]=_0x47fbd4;},_0xd61eb3[_0x1dbfb7(0x201)]=function(){var _0x20b793=_0x1dbfb7;_0x15005f['p'](_0x20b793(0x1be)),ANNetwork[_0x20b793(0x230)](NMS[_0x20b793(0x1c3)](_0x20b793(0x1dc),ANET[_0x20b793(0x1c2)]),function(_0x18f913){var _0x20eddb=_0x20b793;if('piqmM'!=='TfaYW'){if(!_0x18f913){if(_0x20eddb(0x22d)!==_0x20eddb(0x22d)){function _0x80c887(){var _0x29e62e=_0x20eddb,_0x5b9390;try{return'SHARED\x20EVENT\x20CHOICE\x20ACTION'['p'](),_0x436992[_0x29e62e(0x1d1)](_0x2a24aa);}catch(_0x2b7c8d){return _0x5b9390=_0x2b7c8d,_0x593bb7['warn'](_0x29e62e(0x1ec),_0x5b9390);}}}else return _0x15005f['p'](_0x20eddb(0x221)),window[_0x20eddb(0x220)](_0x20eddb(0x1c8)),ANNetwork[_0x20eddb(0x1fd)]();}}else{function _0x5aed79(){var _0x2efa4b=_0x20eddb;_0xd7363a['p'](_0x2efa4b(0x1b0)+_0x30e85b);}}});if(this[_0x20b793(0x1fe)]!=null)return this[_0x20b793(0x1fe)](0x1);},_0xd61eb3['onDisconnect']=function(){var _0x3efdf6=_0x1dbfb7,_0x19431b;return _0x15005f['p']('Disconnected'),(_0x19431b=SceneManager[_0x3efdf6(0x23b)])!=null&&_0x19431b[_0x3efdf6(0x1eb)](),HUIManager[_0x3efdf6(0x22b)]('Disconnected\x20from\x20server'),ANNetwork[_0x3efdf6(0x1fd)]();},_0xd61eb3[_0x1dbfb7(0x242)]=function(){var _0x584401=_0x1dbfb7;return _0x15005f['p'](_0x584401(0x222)),this['onConnectCallback']!=null&&this['onConnectCallback'](0x0),ANNetwork[_0x584401(0x1fd)]();},_0xd61eb3[_0x1dbfb7(0x1f3)]=function(_0x352088){var _0x51de35=_0x1dbfb7;return NetClientMethodsManager[_0x51de35(0x1e5)+_0x352088]!=null;},_0xd61eb3[_0x1dbfb7(0x1ea)]=function(_0x5bc44b,_0x213ae4){var _0x1ecf92=_0x1dbfb7,_0x41fd7f;_0x41fd7f=['game_observerData',_0x1ecf92(0x232),_0x1ecf92(0x1c9),_0x1ecf92(0x1cf),_0x1ecf92(0x214)][_0x1ecf92(0x1c4)](_0x5bc44b);if(!_0x41fd7f){if(_0x1ecf92(0x1b6)===_0x1ecf92(0x1b6))_0x15005f['p'](_0x1ecf92(0x207)+_0x5bc44b);else{function _0x5247d6(){var _0x12c0e1=_0x1ecf92,_0x13a28d,_0x2202e5,_0x36cb1a;try{return'CUSTOM\x20COMMAND\x20IN'['p'](),{name:_0x36cb1a,data:_0x13a28d}=_0x2a7c95,_0x3b697e[_0x12c0e1(0x1c0)](_0x36cb1a,_0x13a28d);}catch(_0x177a82){return _0x2202e5=_0x177a82,_0x11b911[_0x12c0e1(0x1d8)](_0x12c0e1(0x1d7),_0x2202e5);}}}}NetClientMethodsManager[_0x1ecf92(0x1e5)+_0x5bc44b](_0x213ae4),this[_0x1ecf92(0x1bd)](_0x5bc44b),!_0x41fd7f&&_0x15005f['p'](_0x1ecf92(0x1b0)+_0x5bc44b);},_0xd61eb3[_0x1dbfb7(0x1bd)]=function(_0x630782){var _0x5c8536=_0x1dbfb7;if(_0x5c8536(0x211)!==_0x5c8536(0x211)){function _0x4c2cda(){return _0x478a0c['event_'+_0x16ca77]!=null;}}else{var _0x445a21;return(_0x445a21=SceneManager[_0x5c8536(0x23b)])!=null?_0x445a21['onServerEvent'](_0x630782):void 0x0;}},_0xd61eb3['event_lobby_changePlayerName']=function(_0x4832a0){var _0x5af0e4=_0x1dbfb7;return ANGameManager[_0x5af0e4(0x22c)](_0x4832a0['who'],_0x4832a0['name']);},_0xd61eb3[_0x1dbfb7(0x1d3)]=function(_0x26ab8b){var _0x170474=_0x1dbfb7;if(SceneManager[_0x170474(0x20d)]()){if(_0x170474(0x21e)==='RHCns')return;else{function _0x5689e2(){var _0x277c8a=_0x170474;return _0xfa75e9=_0x57753e,_0x33b8cb['warn'](_0x277c8a(0x1dd),_0x378c01);}}}return ANGameManager[_0x170474(0x1e9)](_0x26ab8b[_0x170474(0x1d4)]),ANNetwork['onRoomDataFromServer'](_0x26ab8b[_0x170474(0x215)]);},_0xd61eb3[_0x1dbfb7(0x1f6)]=function(_0x5793f6){return ANNetwork['onRoomClosed']();},_0xd61eb3['event_lobby_startGame']=function(){var _0x4ebb2f=_0x1dbfb7;return ANGameManager[_0x4ebb2f(0x1d2)](),_0x4ebb2f(0x1f4)['p']();},_0xd61eb3['event_game_playersData']=function(_0x2b1d91){var _0x557c73=_0x1dbfb7;return ANGameManager[_0x557c73(0x1ef)](_0x2b1d91),'GAME\x20PLAYERS\x20DATA\x20REFRESHED'['p']();},_0xd61eb3[_0x1dbfb7(0x1ee)]=function(){var _0x3a4dcc=_0x1dbfb7;return ANGameManager[_0x3a4dcc(0x1e4)](),_0x3a4dcc(0x1af)['p']();},_0xd61eb3[_0x1dbfb7(0x22f)]=function(_0x2f790b){var _0x2f83a6=_0x1dbfb7,_0x36d034;try{return ANSyncDataManager['onObserverData'](_0x2f790b['id'],_0x2f790b[_0x2f83a6(0x20a)],_0x2f790b[_0x2f83a6(0x205)]);}catch(_0x299bb6){if(_0x2f83a6(0x203)!=='DfGrn')return _0x36d034=_0x299bb6,console[_0x2f83a6(0x1d8)](_0x2f83a6(0x22f),_0x36d034);else{function _0x28d336(){var _0x25d09a=_0x2f83a6;return _0x164ce4[_0x25d09a(0x200)](_0x53e851[_0x25d09a(0x1c7)],_0x2d75b9[_0x25d09a(0x204)]);}}}},_0xd61eb3[_0x1dbfb7(0x23d)]=function(_0x5f59c4){var _0x48c188=_0x1dbfb7;if(_0x48c188(0x1cb)!=='oBWeO'){function _0x28d1ba(){var _0xa55dc8=_0x48c188,_0x5bd68b;try{return _0x32e337[_0xa55dc8(0x223)]();}catch(_0x3744c6){return _0x5bd68b=_0x3744c6,_0x5de93b[_0xa55dc8(0x1d8)](_0xa55dc8(0x239),_0x5bd68b);}}}else{var _0x4153dd;try{if('mOlIn'!==_0x48c188(0x23c))return ANSyncDataManager[_0x48c188(0x243)](_0x5f59c4['id'],_0x5f59c4[_0x48c188(0x205)]);else{function _0x54fd29(){return;}}}catch(_0xc4d292){return _0x4153dd=_0xc4d292,console[_0x48c188(0x1d8)](_0x48c188(0x23d),_0x4153dd);}}},_0xd61eb3['event_game_switch']=function(_0x58bed7){var _0x2cf24e=_0x1dbfb7;if(_0x2cf24e(0x246)==='EBJMo'){function _0x26c6c0(){var _0x5cece2=_0x2cf24e,_0x1021ec;try{return _0x33b149[_0x5cece2(0x1c1)](_0x287a31);}catch(_0x5d4362){return _0x1021ec=_0x5d4362,_0x1ffc07[_0x5cece2(0x1d8)](_0x5cece2(0x233),_0x1021ec);}}}else{var _0x4a873e;try{return ANSyncDataManager[_0x2cf24e(0x1f0)](_0x58bed7['id'],_0x58bed7[_0x2cf24e(0x205)]);}catch(_0x133a50){if('HdGBD'!==_0x2cf24e(0x22a)){function _0x4a64ef(){var _0x2924a4=_0x2cf24e;_0x4d176e['p']('Connected'),_0xaefd2e['callback'](_0x55cf3a[_0x2924a4(0x1c3)](_0x2924a4(0x1dc),_0x450f36[_0x2924a4(0x1c2)]),function(_0x503641){var _0x30c0d2=_0x2924a4;if(!_0x503641)return _0x116278['p'](_0x30c0d2(0x221)),_0xdbac07[_0x30c0d2(0x220)](_0x30c0d2(0x1c8)),_0x35efd3['stop']();});if(this[_0x2924a4(0x1fe)]!=null)return this['onConnectCallback'](0x1);}}else return _0x4a873e=_0x133a50,console['warn'](_0x2cf24e(0x1dd),_0x4a873e);}}},_0xd61eb3[_0x1dbfb7(0x247)]=function(_0x533c77){var _0x3abbf3=_0x1dbfb7;if('lsPoT'!=='lsPoT'){function _0x3d9306(){var _0x4921cd=a0_0xd37f;if(!_0x52b9f5)return _0x51b8cf['p']('Client\x20not\x20match\x20server\x20version'),_0x51eaed['alert'](_0x4921cd(0x1c8)),_0x50765f[_0x4921cd(0x1fd)]();}}else{var _0x2b941a;try{return ANPlayersManager[_0x3abbf3(0x21f)](_0x533c77['id'],_0x533c77[_0x3abbf3(0x205)]);}catch(_0x529997){return _0x2b941a=_0x529997,console[_0x3abbf3(0x1d8)](_0x3abbf3(0x247),_0x2b941a);}}},_0xd61eb3['event_map_playerLocation']=function(_0x500174){var _0x76ebe=_0x1dbfb7;if('xJyXC'!==_0x76ebe(0x21c)){function _0xb98eb2(){var _0xe50375=_0x76ebe,_0x27b6b5;try{return _0x1b9b5b[_0xe50375(0x210)](_0x3911ba['id'],_0x2242e0[_0xe50375(0x205)]);}catch(_0x5386ca){return _0x27b6b5=_0x5386ca,_0x53f8b1['warn'](_0xe50375(0x219),_0x27b6b5);}}}else{var _0x19746b;try{return ANPlayersManager[_0x76ebe(0x210)](_0x500174['id'],_0x500174['data']);}catch(_0x158516){return _0x19746b=_0x158516,console[_0x76ebe(0x1d8)](_0x76ebe(0x219),_0x19746b);}}},_0xd61eb3[_0x1dbfb7(0x218)]=function(_0x3aee5b){var _0x2bac14=_0x1dbfb7;if(_0x2bac14(0x240)!=='RRolO'){function _0x3c618f(){var _0x235397=_0x2bac14;return _0x51c8be=_0x53235a,_0x18f01e[_0x235397(0x1d8)](_0x235397(0x1ec),_0x36b9a5);}}else{var _0x88abf0;try{return ANMapManager[_0x2bac14(0x1cd)](_0x3aee5b[_0x2bac14(0x1b3)],_0x3aee5b['id'],_0x3aee5b['data']);}catch(_0x1aa264){if(_0x2bac14(0x206)===_0x2bac14(0x212)){function _0x21d864(){var _0x50efbb=_0x2bac14;this[_0x50efbb(0x1fe)](0x0);}}else return _0x88abf0=_0x1aa264,console['warn'](_0x2bac14(0x218),_0x88abf0);}}},_0xd61eb3[_0x1dbfb7(0x217)]=function(_0x2614ae){var _0xd2f83a=_0x1dbfb7,_0x5a0b6d;try{if(_0xd2f83a(0x22e)===_0xd2f83a(0x202)){function _0x24de5e(){var _0x21677f=_0xd2f83a;return _0x8f8486[_0x21677f(0x225)](_0x529b01['cmd'],_0x48ab38['text']);}}else{if($gameMap['mapId']()===_0x2614ae)return ANMapManager['onInitialMapSync']();}}catch(_0x33de57){return _0x5a0b6d=_0x33de57,console['warn']('event_map_eventMove',_0x5a0b6d);}},_0xd61eb3[_0x1dbfb7(0x1ff)]=function(_0xff930e){var _0x5de524=_0x1dbfb7;if(_0x5de524(0x1f5)==='bdetn'){var _0x13225b;try{if(_0x5de524(0x1bf)!==_0x5de524(0x231))return ANInterpreterManager[_0x5de524(0x1bc)](_0xff930e);else{function _0xf81e71(){return _0x5eda3a['onInitialMapSync']();}}}catch(_0x3b10bd){return _0x13225b=_0x3b10bd,console[_0x5de524(0x1d8)]('event_event_virtualEventCommand',_0x13225b);}}else{function _0x2149cc(){var _0x54febf=_0x5de524;return'SHARED\x20EVENT\x20CAN\x20CONTINUE'['p'](),_0x3dbd98[_0x54febf(0x1d6)](_0x4c2618);}}},_0xd61eb3[_0x1dbfb7(0x238)]=function(_0x4aa4b0){var _0x40a28f=_0x1dbfb7,_0x2dc7c2;try{if(_0x40a28f(0x21d)===_0x40a28f(0x21d))return ANBattleManager['onBattleMethod'](_0x4aa4b0['id'],_0x4aa4b0[_0x40a28f(0x1de)],_0x4aa4b0[_0x40a28f(0x205)]);else{function _0x3ba941(){this['onConnectCallback']=_0x196fa8;}}}catch(_0x255038){return _0x2dc7c2=_0x255038,console[_0x40a28f(0x1d8)](_0x40a28f(0x238),_0x2dc7c2);}},_0xd61eb3[_0x1dbfb7(0x235)]=function(_0x394106){var _0x1e28fb=_0x1dbfb7,_0x4c7e8a;try{return ANBattleManager[_0x1e28fb(0x1c5)](_0x394106);}catch(_0x451fb0){return _0x4c7e8a=_0x451fb0,console[_0x1e28fb(0x1d8)]('event_battle_animation',_0x4c7e8a);}},_0xd61eb3[_0x1dbfb7(0x228)]=function(_0x367d70){var _0x2bfe65=_0x1dbfb7;if(_0x2bfe65(0x23a)==='qIZnZ'){function _0x34cd77(){var _0x31d3f5=_0x2bfe65;_0x441bc6['p'](_0x31d3f5(0x207)+_0x4f9118);}}else{var _0x445242;try{return ANBattleManager[_0x2bfe65(0x223)]();}catch(_0x5cc8a9){if(_0x2bfe65(0x1fc)===_0x2bfe65(0x1f1)){function _0x5b3025(){var _0x19f465=_0x2bfe65,_0x16cbe2;_0x16cbe2=[_0x19f465(0x1e8),_0x19f465(0x232),_0x19f465(0x1c9),'battle_battleMethod',_0x19f465(0x214)][_0x19f465(0x1c4)](_0x366ffb),!_0x16cbe2&&_0x15d526['p'](_0x19f465(0x207)+_0x43270d),_0x12b905[_0x19f465(0x1e5)+_0x1d1732](_0xc29098),this['callSceneCallback'](_0x163c11),!_0x16cbe2&&_0xa8c9a7['p']('Event\x20End:\x20'+_0x8641fc);}}else return _0x445242=_0x5cc8a9,console['warn']('event_battleMethodReceived',_0x445242);}}},_0xd61eb3[_0x1dbfb7(0x1d5)]=function(_0x402ab1){var _0x3585c4=_0x1dbfb7;if(_0x3585c4(0x1b9)===_0x3585c4(0x1b9)){var _0x546428;try{return ANBattleManager[_0x3585c4(0x225)](_0x402ab1[_0x3585c4(0x1e0)],_0x402ab1['text']);}catch(_0x29b6d0){return _0x546428=_0x29b6d0,console[_0x3585c4(0x1d8)](_0x3585c4(0x1d5),_0x546428);}}else{function _0x32f864(){var _0x1269ce=_0x3585c4;return _0x18c649['p'](_0x1269ce(0x222)),this[_0x1269ce(0x1fe)]!=null&&this[_0x1269ce(0x1fe)](0x0),_0x175007[_0x1269ce(0x1fd)]();}}},_0xd61eb3[_0x1dbfb7(0x1ca)]=function(_0x5a1afc){var _0x51f125=_0x1dbfb7,_0x3e73ca;try{return ANBattleManager[_0x51f125(0x200)](_0x5a1afc[_0x51f125(0x1c7)],_0x5a1afc['inputActorId']);}catch(_0x123bc2){if(_0x51f125(0x1e1)!==_0x51f125(0x1e1)){function _0x5a3d9d(){var _0x481fd2=_0x51f125,_0x53fa98,_0x48a49c,_0xcb2125;try{return'CUSTOM\x20LINK\x20IN'['p'](),{name:_0xcb2125,commonEventId:_0x53fa98}=_0x52a30b,typeof _0x126860!==_0x481fd2(0x20e)&&_0x19792e!==null?_0x4060f6[_0x481fd2(0x226)](_0xcb2125,_0x53fa98):void 0x0;}catch(_0x407dd1){return _0x48a49c=_0x407dd1,_0x32608d['warn'](_0x481fd2(0x1d7),_0x48a49c);}}}else return _0x3e73ca=_0x123bc2,console[_0x51f125(0x1d8)]('event_battle_input',_0x3e73ca);}},_0xd61eb3[_0x1dbfb7(0x1d0)]=function(_0x49dadc){var _0x2cd6a9=_0x1dbfb7;if(_0x2cd6a9(0x20c)!==_0x2cd6a9(0x20c)){function _0x456e2f(){var _0x377c2d;return(_0x377c2d=_0x1fd7d3['_scene'])!=null?_0x377c2d['onServerEvent'](_0xab286f):void 0x0;}}else{var _0x33450d;try{if(_0x2cd6a9(0x1c6)!==_0x2cd6a9(0x1c6)){function _0x55297b(){var _0xa12fcf=_0x2cd6a9;return _0x4c67ce=_0x3a5195,_0x36e43e[_0xa12fcf(0x1d8)](_0xa12fcf(0x1ba),_0x1366b4);}}else return ANBattleManager['onBattleInputAction'](_0x49dadc[_0x2cd6a9(0x204)],_0x49dadc[_0x2cd6a9(0x237)]);}catch(_0x3c89cb){if(_0x2cd6a9(0x1f9)!==_0x2cd6a9(0x23f))return _0x33450d=_0x3c89cb,console[_0x2cd6a9(0x1d8)](_0x2cd6a9(0x1d0),_0x33450d);else{function _0x3e3809(){var _0x5f4c83=_0x2cd6a9;return _0x2911d3['onPlayerName'](_0x572f8[_0x5f4c83(0x245)],_0x402f55[_0x5f4c83(0x1cc)]);}}}}},_0xd61eb3['event_battle_serverBattleData']=function(_0x14f873){var _0x3b9b44=_0x1dbfb7,_0x5bec31;try{return ANBattleManager['onBattleDataFromServer'](_0x14f873);}catch(_0x5bee37){if(_0x3b9b44(0x236)!==_0x3b9b44(0x236)){function _0x5c868d(){var _0x5386b7=_0x3b9b44,_0x33cd9f;try{return _0x1f2abd[_0x5386b7(0x209)](_0x458b80['id'],_0x321cdb[_0x5386b7(0x1de)],_0xb36189['data']);}catch(_0x13e0cc){return _0x33cd9f=_0x13e0cc,_0x32f597[_0x5386b7(0x1d8)]('event_battle_battleMethod',_0x33cd9f);}}}else return _0x5bec31=_0x5bee37,console['warn'](_0x3b9b44(0x233),_0x5bec31);}},_0xd61eb3['event_event_registerOnShared']=function(_0x433388){var _0x364741=_0x1dbfb7,_0x367970;try{if('hYuah'!=='hYuah'){function _0x35f275(){return _0x829bdf['onRoomClosed']();}}else return _0x364741(0x216)['p'](),ANInterpreterManager['onRegisterOnSharedEventRequest'](_0x433388);}catch(_0x5631dc){if(_0x364741(0x1b8)!=='OPaXT')return _0x367970=_0x5631dc,console[_0x364741(0x1d8)]('event_event_registerOnShared',_0x367970);else{function _0x4f3c9d(){var _0xfcd993=_0x364741;return _0xfcd993(0x1fb)['p'](),{name:_0x1b4b0c,commonEventId:_0x4eaaaf}=_0x481b99,typeof _0x331c9a!==_0xfcd993(0x20e)&&_0x241333!==null?_0xa2b902['nRegisterCustomCommandCE'](_0x36ab33,_0x354518):void 0x0;}}}},_0xd61eb3[_0x1dbfb7(0x1f8)]=function(_0x586708){var _0x4a5feb=_0x1dbfb7,_0x5b18ff;try{return _0x4a5feb(0x234)['p'](),ANInterpreterManager[_0x4a5feb(0x1fa)](_0x586708);}catch(_0x2b9cbc){return _0x5b18ff=_0x2b9cbc,console['warn']('event_event_registerDone',_0x5b18ff);}},_0xd61eb3['event_event_sharedCanContinue']=function(_0x5542a9){var _0x330ff6=_0x1dbfb7,_0x4f84ed;try{return _0x330ff6(0x20f)['p'](),ANInterpreterManager[_0x330ff6(0x1d6)](_0x5542a9);}catch(_0x58165b){return _0x4f84ed=_0x58165b,console[_0x330ff6(0x1d8)]('event_event_sharedCanContinue',_0x4f84ed);}},_0xd61eb3[_0x1dbfb7(0x1ec)]=function(_0x4a85b0){var _0x565046=_0x1dbfb7,_0x1d783e;try{if('lGOhT'===_0x565046(0x20b)){function _0x3b6aa9(){var _0x53d1d9=_0x565046;return _0x53d1d9(0x1b7)['p'](),{name:_0x1df472,data:_0x1d4245}=_0x1c5096,_0x3a8396['onCustomCommand'](_0x5de5e0,_0x2817bd);}}else return _0x565046(0x244)['p'](),ANInterpreterManager['onSharedEventForceCancelFromServer'](_0x4a85b0);}catch(_0x1d3a86){if(_0x565046(0x1f2)===_0x565046(0x1e6)){function _0x13aab4(){var _0x2eb6c1=_0x565046,_0x36e7b8;try{return _0x127642['onLogWindowMessage'](_0x282e0f['cmd'],_0x188127[_0x2eb6c1(0x1e7)]);}catch(_0x2f003b){return _0x36e7b8=_0x2f003b,_0x623187['warn'](_0x2eb6c1(0x1d5),_0x36e7b8);}}}else return _0x1d783e=_0x1d3a86,console[_0x565046(0x1d8)](_0x565046(0x1ec),_0x1d783e);}},_0xd61eb3[_0x1dbfb7(0x1b4)]=function(_0x19257f){var _0x5b916d=_0x1dbfb7;if(_0x5b916d(0x1b1)!=='uojCu'){var _0x448816;try{return'SHARED\x20EVENT\x20CHOICE\x20ACTION'['p'](),ANInterpreterManager['onSharedEventChoiceActionFromServer'](_0x19257f);}catch(_0x260037){return _0x448816=_0x260037,console[_0x5b916d(0x1d8)]('event_event_sharedForceCancel',_0x448816);}}else{function _0x51fe21(){var _0x34e28b=_0x5b916d;if(_0x37e64c[_0x34e28b(0x1b3)]()===_0x235b61)return _0x1c8114[_0x34e28b(0x1b5)]();}}},_0xd61eb3[_0x1dbfb7(0x1d7)]=function(_0x542679){var _0x4702e0=_0x1dbfb7;if(_0x4702e0(0x23e)!=='DbfMQ'){var _0x577054,_0x46f8c0,_0x332ffa;try{return _0x4702e0(0x1b7)['p'](),{name:_0x332ffa,data:_0x577054}=_0x542679,nAPI[_0x4702e0(0x1c0)](_0x332ffa,_0x577054);}catch(_0x44243f){return _0x46f8c0=_0x44243f,console[_0x4702e0(0x1d8)](_0x4702e0(0x1d7),_0x46f8c0);}}else{function _0x4cec9d(){var _0x315c8f=_0x4702e0,_0x5728de;try{if(_0x4b2e58['mapId']()===_0x1e2c68)return _0x1b8a12['onInitialMapSync']();}catch(_0x2b81d9){return _0x5728de=_0x2b81d9,_0x12163b[_0x315c8f(0x1d8)]('event_map_eventMove',_0x5728de);}}}},_0xd61eb3[_0x1dbfb7(0x213)]=function(_0x39f561){var _0x4f71d3=_0x1dbfb7,_0x40c18f,_0x23b5ca,_0x241da5;try{if(_0x4f71d3(0x1e3)!=='Scjub'){function _0x56faad(){var _0x560a10=_0x4f71d3;return _0x17a165=_0x6e856f,_0x4c0cae[_0x560a10(0x1d8)](_0x560a10(0x239),_0x3ff102);}}else return _0x4f71d3(0x1fb)['p'](),{name:_0x241da5,commonEventId:_0x40c18f}=_0x39f561,typeof $gameSystem!==_0x4f71d3(0x20e)&&$gameSystem!==null?$gameSystem[_0x4f71d3(0x226)](_0x241da5,_0x40c18f):void 0x0;}catch(_0x4c3c39){return _0x23b5ca=_0x4c3c39,console[_0x4f71d3(0x1d8)]('event_game_userCommand',_0x23b5ca);}};}());
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x4e87=['onBattleAnimation','ANBattleManager','isShouldWaitServer','sendBattleMethodReceived','ngQVL','map','MCAMm','animation','ySEfU','_waitMode','Rajcm','zJqFq','isBattleMaster','packForNetwork','sendBattleMethod','nSetCurrentClientInput','update','gwDTq','RED','wElDN','inBattle','onBattleInputAction','sendRegisterOnBattle','rkBFY','setFromNetwork','1390158TuqVCR','battleId','actor','registerOnLocalBattle','XePlW','571399fguKhs','_inputting','resetWait','isLocal','_isDataChanged','info','CALL\x20BATTLE\x20METHOD','isForceBattleSyncMode','callBattleMethod','battleMethodReceived','setup','onBattleEnd','NetBattle','sendBattleStarted','unpackBattlerFromNetwork','gUGkf','_registerToExistsSharedBattle','showLoader','battleInputActionDone','_logWindow','KOfGL','isMV','registerOnBattle','register','selectNextCommand','clear','TIME\x20OUT','ZZmUd','SETUP','sendBattleAnimation','LNGGA','_currentActor','QQAQw','send','yuqRS','qLott','cURmQ','onBattleMethod','actorId','inputtingAction','1ARaKSk','battleMembers','_previousNetBattleActors','onBattleMethodReceived','Battle','Utils','onBattleDataFromServer','animationId','qDiVl','GZwRI','setColors','WslWy','started','_requestInitialSharedBattleRefresh','ended','WAIT','Rqjcc','options','_battleMethodsPool','length','_lastBattleManagerInputActor','DevLog','nClearClientInput','168132lyBwpG','updateWaiting','issiE','awFjf','REGISTER\x20SUCCESS','vuXtQ','sendBattlerObserver','268973rPadun','logMessage','actors','CmCwa','vxWub','_lastBattleManagerInputValue','vJPij','3rnPKQU','XbouV','sendWindowLogMessage','1poLJkT','STARTED\x20LOCAL\x20BATTLE','OcvQn','Kneai','1lUUrIz','targets','get','hideLoader','rqUhP','qyVNK','_callBattleMethodOnServer','PnOmO','PjFJe','local','Biqnq','isLoaderActive','svwTZ','muIcU','isBattleLocal','getLightestColor','onLogWindowMessage','isOneBattler','_waitTimeout','370775RrXsaO','653901oTtjgs','battleData','requestAnimation','mirror','sendBattleEnded','1093115eAjDel','Ozkto','add','netDataObserver','setWait','input','Join\x20Shared\x20battle','HVyZp','myActorId','onBattleRegisterResult','_waitPool','sendBattleInputAction','nynfW','sendInputState','Color','isBattleRegistred','rudAP','onBattleInputState','leader','updateInputChange','addText','battleMethod'];var a0_0xeb60a=a0_0x2a79;function a0_0x2a79(_0x3a0bfd,_0x30e02d){_0x3a0bfd=_0x3a0bfd-0xc0;var _0x4e877c=a0_0x4e87[_0x3a0bfd];return _0x4e877c;}(function(_0x366958,_0x1eb092){var _0x1bbd10=a0_0x2a79;while(!![]){try{var _0x2d820b=-parseInt(_0x1bbd10(0x13b))*parseInt(_0x1bbd10(0x124))+-parseInt(_0x1bbd10(0x121))*-parseInt(_0x1bbd10(0xd4))+-parseInt(_0x1bbd10(0x128))*parseInt(_0x1bbd10(0x11a))+parseInt(_0x1bbd10(0xcf))+-parseInt(_0x1bbd10(0xfc))*parseInt(_0x1bbd10(0x141))+-parseInt(_0x1bbd10(0x13c))+parseInt(_0x1bbd10(0x113));if(_0x2d820b===_0x1eb092)break;else _0x366958['push'](_0x366958['shift']());}catch(_0x562971){_0x366958['push'](_0x366958['shift']());}}}(a0_0x4e87,0xd83db),window[a0_0xeb60a(0x158)]=function(){},function(){var _0x5cc4cf=a0_0xeb60a,_0x1aa158,_0x590826;_0x1aa158=new KDCore[(_0x5cc4cf(0x111))](_0x5cc4cf(0xe0)),_0x1aa158[_0x5cc4cf(0x106)](KDCore[_0x5cc4cf(0x14f)][_0x5cc4cf(0xc8)],KDCore['Color']['BLACK'][_0x5cc4cf(0x137)](0x87)),_0x1aa158['on'](),_0x590826=window[_0x5cc4cf(0x158)],_0x590826[_0x5cc4cf(0xc2)]=function(){var _0x4f730a=_0x5cc4cf;if(_0x4f730a(0x148)!==_0x4f730a(0x148)){function _0x344fcd(){return;}}else{if(this[_0x4f730a(0x13d)]!=null){if(_0x4f730a(0x134)!=='tJdXk')return this[_0x4f730a(0x13d)][_0x4f730a(0x11c)][0x0]===ANGameManager[_0x4f730a(0x149)]();else{function _0x237ed7(){var _0xbb71c8=_0x4f730a;return _0x4e83a5['Utils'][_0xbb71c8(0xe2)](_0x2202be);}}}else{if(_0x4f730a(0xf7)===_0x4f730a(0xf6)){function _0x5c92eb(){var _0x46d22b=_0x4f730a;return this[_0x46d22b(0x13d)][_0x46d22b(0x11c)][0x0]===_0x2eff8c[_0x46d22b(0x149)]();}}else return $gameParty[_0x4f730a(0xca)]();}}},_0x590826[_0x5cc4cf(0x150)]=function(){var _0x2a50e1=_0x5cc4cf;return this[_0x2a50e1(0x13d)]!=null;},_0x590826[_0x5cc4cf(0x136)]=function(){var _0x3c7869=_0x5cc4cf;if(this['battleData']!=null)return this['battleData'][_0x3c7869(0xd7)];else{if('Maext'!=='Maext'){function _0x15a640(){return;}}else return!![];}},_0x590826[_0x5cc4cf(0x159)]=function(){var _0x2f0806=_0x5cc4cf;return this[_0x2f0806(0x160)]!=null;},_0x590826[_0x5cc4cf(0xfd)]=function(){var _0x27a40d=_0x5cc4cf;if(this[_0x27a40d(0x150)]()){if(_0x27a40d(0x15f)!=='ySEfU'){function _0x1777dc(){var _0x5603d6=_0x27a40d;this[_0x5603d6(0xd6)]();}}else return this[_0x27a40d(0x13d)][_0x27a40d(0x11c)][_0x27a40d(0x15c)](function(_0xf45d5e){var _0x2b3577=_0x27a40d;return $gameActors[_0x2b3577(0xd1)](_0xf45d5e);});}else return[$gameParty[_0x27a40d(0x153)]()];},_0x590826[_0x5cc4cf(0x145)]=function(_0x3481e0){var _0x574e0a=_0x5cc4cf;return this[_0x574e0a(0x160)]=_0x3481e0,this['_waitPool']=0x0,this[_0x574e0a(0x13a)]=0x168,HUIManager[_0x574e0a(0xe5)](0x3e8);},_0x590826[_0x5cc4cf(0xd6)]=function(){var _0x129af3=_0x5cc4cf;if('CDApT'!==_0x129af3(0x12c))return this[_0x129af3(0x145)](null),HUIManager[_0x129af3(0x12b)]();else{function _0x28fa6c(){var _0x572e98=_0x129af3;this[_0x572e98(0x10e)]=[];}}},_0x590826[_0x5cc4cf(0xc6)]=function(){var _0x48be22=_0x5cc4cf;if(_0x48be22(0x15d)!==_0x48be22(0x15d)){function _0x37fbdb(){var _0x249273=_0x48be22;return this[_0x249273(0x150)]()?this[_0x249273(0x13d)][_0x249273(0x11c)][_0x249273(0x15c)](function(_0x27a693){var _0x327955=_0x249273;return _0x56debe[_0x327955(0xd1)](_0x27a693);}):[_0x1337b9[_0x249273(0x153)]()];}}else{if(this[_0x48be22(0x159)]())this['_waitTimeout']<=0x0?(_0x1aa158['p'](_0x48be22(0xee)),this[_0x48be22(0xd6)]()):(this[_0x48be22(0x13a)]--,this[_0x48be22(0x114)]());else{if('gwDTq'===_0x48be22(0xc7)){if(this[_0x48be22(0x10e)][_0x48be22(0x10f)]>0x0){if('EhcPJ'===_0x48be22(0xf2)){function _0x1dcf12(){var _0xc5cf05=_0x48be22;_0xc5cf05(0xda)['p'](),_0xa03998[_0xc5cf05(0x119)](_0x2abdfe),_0x55e133[_0xc5cf05(0x144)]['_isDataChanged']=!![],this[_0xc5cf05(0xc4)](_0x1ca856,_0x322d77[_0xc5cf05(0xc3)](),_0xd18020),_0x42f295['PP'][_0xc5cf05(0xdb)]()&&(this[_0xc5cf05(0x145)]('battleMethod'),this[_0xc5cf05(0x14b)]+=0x1);}}else this[_0x48be22(0x12e)](...this[_0x48be22(0x10e)]['shift']());}if(HUIManager[_0x48be22(0x133)]()){if(_0x48be22(0x115)!==_0x48be22(0x115)){function _0x49130a(){var _0x393845=_0x48be22;this[_0x393845(0x13d)]={'isLocal':!![],'battleId':_0x393845(0x131),'actors':[_0x14a57b[_0x393845(0x149)]()]},_0x4d3cce['p']('STARTED\x20LOCAL\x20BATTLE');}}else HUIManager['hideLoader']();}}else{function _0x1a9487(){return _0x26d5f1['send'](_0x36e578['Battle']('started'));}}}}},_0x590826[_0x5cc4cf(0x114)]=function(){var _0x2d05b2=_0x5cc4cf;if(_0x2d05b2(0x135)!=='WLxXE'){if(!this[_0x2d05b2(0x159)]()){if(_0x2d05b2(0x120)!=='vJPij'){function _0x1abb09(){_0x2b8d71[_0x2fe485](_0x2dc455);}}else return;}_0x2d05b2(0x10b)['p'](this[_0x2d05b2(0x14b)]);switch(this['_waitMode']){case _0x2d05b2(0x156):this[_0x2d05b2(0x14b)]===$gameParty['battleMembers']()['length']&&this[_0x2d05b2(0xd6)]();}}else{function _0x56d517(){return _0x479f7b['nSetCurrentClientInput']();}}},_0x590826[_0x5cc4cf(0x154)]=function(){var _0x20b369=_0x5cc4cf;if('aMYAC'!=='DaoMK'){if($gameParty[_0x20b369(0x139)]())return;if(this[_0x20b369(0x110)]!==BattleManager[_0x20b369(0xf3)])this[_0x20b369(0x110)]=BattleManager['_currentActor'],this[_0x20b369(0x14e)]();else{if(this[_0x20b369(0x11f)]!==BattleManager[_0x20b369(0xd5)]){if(_0x20b369(0x12f)!==_0x20b369(0xf8))this[_0x20b369(0x11f)]=BattleManager[_0x20b369(0xd5)],this[_0x20b369(0x14e)]();else{function _0x4f6862(){var _0x352b83=_0x20b369;this[_0x352b83(0xe4)]();}}}}}else{function _0x2d5e06(){var _0x519639=_0x20b369,_0x32f649,_0xf3737d;_0xf3737d=_0x43f2cd[_0x519639(0xd5)],_0x1cbe67[_0x519639(0xf3)]!=null?_0x32f649=_0x216bb1['_currentActor']['actorId']():_0x32f649=null,_0x19564a[_0x519639(0xf5)](_0x49d928['Battle'](_0x519639(0x146),{'inputState':_0xf3737d,'inputActorId':_0x32f649}));}}},_0x590826['registerOnLocalBattle']=function(){var _0x30ab11=_0x5cc4cf;this['battleData']={'isLocal':!![],'battleId':_0x30ab11(0x131),'actors':[ANGameManager[_0x30ab11(0x149)]()]},_0x1aa158['p'](_0x30ab11(0x125));},_0x590826['onBattleStarted']=function(){var _0x20886b=_0x5cc4cf;if('ZZmUd'!==_0x20886b(0xef)){function _0x73f30f(){var _0x4df69f=_0x20886b;this[_0x4df69f(0x13a)]<=0x0?(_0x39ad34['p'](_0x4df69f(0xee)),this[_0x4df69f(0xd6)]()):(this[_0x4df69f(0x13a)]--,this[_0x4df69f(0x114)]());}}else this[_0x20886b(0x10e)]=[],this['_lastBattleManagerInputValue']=![],this['_lastBattleManagerInputActor']=null,this[_0x20886b(0xe1)]();},_0x590826[_0x5cc4cf(0xdf)]=function(){var _0x233c89=_0x5cc4cf;!this[_0x233c89(0x136)]()&&this[_0x233c89(0x140)](),this[_0x233c89(0x13d)]=null;},_0x590826[_0x5cc4cf(0xdc)]=function(_0x25a5be,_0xb6ae0f,_0x4d2deb){var _0x5e964f=_0x5cc4cf;if(_0x5e964f(0xc0)!==_0x5e964f(0xc0)){function _0x587031(){var _0x93613c=_0x5e964f,_0x1392fa,_0x1766b2;try{_0x1766b2=_0x166398[_0x93613c(0x129)][_0x93613c(0x15c)](function(_0x520014){var _0x539862=_0x93613c;return _0x5515b0[_0x539862(0x101)][_0x539862(0xe2)](_0x520014);}),_0x2b0134[_0x93613c(0x13e)](_0x1766b2,_0x2fb5c8['animationId'],_0xdef860[_0x93613c(0x13f)]);}catch(_0x3aaa62){_0x1392fa=_0x3aaa62,_0xf461c3['w'](_0x1392fa);}}}else{if($gameParty[_0x5e964f(0x139)]())return;ANET['PP'][_0x5e964f(0xdb)]()?(this[_0x5e964f(0x10e)]==null&&(this[_0x5e964f(0x10e)]=[]),this[_0x5e964f(0x10e)]['push']([_0x25a5be,_0xb6ae0f,_0x4d2deb])):this[_0x5e964f(0x12e)](_0x25a5be,_0xb6ae0f,_0x4d2deb);}},_0x590826['_callBattleMethodOnServer']=function(_0x4a52a3,_0x82087,_0x5670c8){var _0x40db45=_0x5cc4cf;_0x40db45(0xda)['p'](),ANSyncDataManager[_0x40db45(0x119)](_0x4a52a3),_0x4a52a3[_0x40db45(0x144)][_0x40db45(0xd8)]=!![],this[_0x40db45(0xc4)](_0x82087,_0x4a52a3[_0x40db45(0xc3)](),_0x5670c8),ANET['PP'][_0x40db45(0xdb)]()&&(this[_0x40db45(0x145)](_0x40db45(0x156)),this[_0x40db45(0x14b)]+=0x1);},_0x590826[_0x5cc4cf(0x13e)]=function(_0x21bccc,_0x4e1ed2,_0x44158c=![]){var _0x29d4d5=_0x5cc4cf,_0x2fdfd3,_0x7bc50f;if($gameParty[_0x29d4d5(0x139)]())return;_0x2fdfd3=_0x21bccc['map'](function(_0x52e83f){var _0x582d21=_0x29d4d5;if('JUMmX'==='sAIIH'){function _0x174c12(){_0x3fe68b=_0x9d599c,_0x3e1b7c['w'](_0x1163fa);}}else return _0x52e83f[_0x582d21(0xc3)]();}),_0x7bc50f={'animationId':_0x4e1ed2,'mirror':_0x44158c,'targets':_0x2fdfd3},this[_0x29d4d5(0xf1)](_0x7bc50f);},_0x590826[_0x5cc4cf(0xe6)]=function(){var _0x8a8763=_0x5cc4cf,_0x1cd46f;_0x1cd46f=BattleManager[_0x8a8763(0xfb)]();if(KDCore[_0x8a8763(0xe9)]())return;if(_0x1cd46f==null)return;this[_0x8a8763(0x14c)](ANGameManager['myActorId'](),_0x1cd46f);},_0x590826[_0x5cc4cf(0xea)]=function(_0x1b8277){var _0x371b54=_0x5cc4cf;if(_0x371b54(0xf4)!==_0x371b54(0x122))return _0x1aa158['p']('Try\x20register\x20battle:\x20'+_0x1b8277[_0x371b54(0xd0)]),this[_0x371b54(0xcc)](_0x1b8277);else{function _0x1eb9bf(){var _0x216b30=_0x371b54;_0x395bce[_0x216b30(0xf5)](_0x22eedf[_0x216b30(0x100)](_0x216b30(0xdd)));}}},_0x590826['_registerToExistsSharedBattle']=function(){var _0x335091=_0x5cc4cf;_0x1aa158['p'](_0x335091(0x147)),$gameTemp[_0x335091(0x109)]=!![];},_0x590826[_0x5cc4cf(0x14c)]=function(_0x474f60,_0x2b4f04){var _0xd7f75e=_0x5cc4cf;ANNetwork['send'](NMS[_0xd7f75e(0x100)]('inputAction',{'action':_0x2b4f04,'inputActorId':_0x474f60}));},_0x590826[_0x5cc4cf(0x14e)]=function(){var _0x1ce117=_0x5cc4cf;if(_0x1ce117(0x142)===_0x1ce117(0x132)){function _0x3506b9(){var _0x6ea254=_0x1ce117,_0x447a5a;try{this[_0x6ea254(0x14b)]+=0x1;}catch(_0x2ee8ad){_0x447a5a=_0x2ee8ad,_0x28c219['w'](_0x447a5a);}}}else{var _0x51d6ba,_0x25e6d3;_0x25e6d3=BattleManager[_0x1ce117(0xd5)];if(BattleManager[_0x1ce117(0xf3)]!=null){if(_0x1ce117(0xc1)===_0x1ce117(0x116)){function _0x57a95a(){var _0x623e66=_0x1ce117;return this[_0x623e66(0x145)](null),_0x39468b[_0x623e66(0x12b)]();}}else _0x51d6ba=BattleManager[_0x1ce117(0xf3)][_0x1ce117(0xfa)]();}else{if('rAwvY'!==_0x1ce117(0x10c))_0x51d6ba=null;else{function _0x180363(){var _0x37335d=_0x1ce117,_0x3c6023;_0x3c6023=_0x1a77c9[_0x37335d(0xfb)]();if(_0x18637b[_0x37335d(0xe9)]())return;if(_0x3c6023==null)return;this[_0x37335d(0x14c)](_0x3baf68[_0x37335d(0x149)](),_0x3c6023);}}}ANNetwork[_0x1ce117(0xf5)](NMS[_0x1ce117(0x100)](_0x1ce117(0x146),{'inputState':_0x25e6d3,'inputActorId':_0x51d6ba}));}},_0x590826[_0x5cc4cf(0x123)]=function(_0x557d50,_0x52b4c1){var _0x5ebc66=_0x5cc4cf;ANNetwork[_0x5ebc66(0xf5)](NMS[_0x5ebc66(0x100)](_0x5ebc66(0x11b),{'cmd':_0x557d50,'text':_0x52b4c1}));},_0x590826[_0x5cc4cf(0xe1)]=function(){var _0x274f1f=_0x5cc4cf;if('ngQVL'!==_0x274f1f(0x15b)){function _0x53f53b(){return;}}else return ANNetwork[_0x274f1f(0xf5)](NMS[_0x274f1f(0x100)](_0x274f1f(0x108)));},_0x590826[_0x5cc4cf(0x140)]=function(){var _0x3db31c=_0x5cc4cf;return ANNetwork[_0x3db31c(0xf5)](NMS[_0x3db31c(0x100)](_0x3db31c(0x10a)));},_0x590826[_0x5cc4cf(0xc4)]=function(_0x4d6575,_0x120738,_0x59e110){var _0x3ed538=_0x5cc4cf,_0xe5b2df;_0xe5b2df={'method':_0x4d6575,'id':_0x120738,'data':_0x59e110},ANNetwork[_0x3ed538(0xf5)](NMS[_0x3ed538(0x100)](_0x3ed538(0x156),_0xe5b2df),!![]);},_0x590826['sendBattleAnimation']=function(_0x540e81){var _0x57a697=_0x5cc4cf;ANNetwork['send'](NMS['Battle'](_0x57a697(0x15e),_0x540e81));},_0x590826['sendBattleMethodReceived']=function(){var _0x3d556e=_0x5cc4cf;if(_0x3d556e(0x151)!=='FwsPC')ANNetwork[_0x3d556e(0xf5)](NMS['Battle'](_0x3d556e(0xdd)));else{function _0x29bee5(){var _0x2d82f4=_0x3d556e;if(!_0x1abdc1[_0x2d82f4(0xca)]())return;return _0x522da5[_0x2d82f4(0xd5)]=_0x89f7de,_0x1b63ce===_0x207876[_0x2d82f4(0x149)]()?_0xd102fb['nSetCurrentClientInput']():_0x167022[_0x2d82f4(0x112)]();}}},_0x590826['sendRegisterOnBattle']=function(_0xc24ff6){var _0x1c794f=_0x5cc4cf;if(_0x1c794f(0xc9)!==_0x1c794f(0xc9)){function _0x482a37(){return;}}else ANNetwork[_0x1c794f(0x12a)](NMS[_0x1c794f(0x100)](_0x1c794f(0xeb),_0xc24ff6),function(_0x30f301){var _0x36e95a=_0x1c794f;return ANBattleManager[_0x36e95a(0x14a)](_0x30f301);},function(){var _0x4d7626=_0x1c794f;return BattleManager['nSetNetworkBattle'](null),ANBattleManager[_0x4d7626(0xd2)]();});},_0x590826[_0x5cc4cf(0x102)]=function(_0x1fe510){var _0x4e86b1=_0x5cc4cf;if(!this[_0x4e86b1(0x150)]()){if(_0x4e86b1(0x11e)!==_0x4e86b1(0x11e)){function _0x125e4a(){return;}}else return;}if(this[_0x4e86b1(0x136)]())return;this[_0x4e86b1(0x13d)][_0x4e86b1(0xd0)]===_0x1fe510['battleId']&&($gameTemp[_0x4e86b1(0xfe)]=[...this[_0x4e86b1(0x13d)]['actors']],this[_0x4e86b1(0x13d)]=_0x1fe510);},_0x590826[_0x5cc4cf(0x14a)]=function(_0x1bd6b4){var _0x383ce4=_0x5cc4cf;_0x383ce4(0x117)['p'](),this[_0x383ce4(0x13d)]=_0x1bd6b4,BattleManager[_0x383ce4(0xde)](..._0x1bd6b4[_0x383ce4(0x10d)]),_0x383ce4(0xf0)['p'](_0x1bd6b4[_0x383ce4(0x10d)]),console[_0x383ce4(0xd9)](_0x1bd6b4);if(!this[_0x383ce4(0xc2)]()){if(_0x383ce4(0x126)!==_0x383ce4(0x127))this[_0x383ce4(0xe4)]();else{function _0xd90fb3(){var _0x4a6022=_0x383ce4;this['_battleMethodsPool']['length']>0x0&&this[_0x4a6022(0x12e)](...this['_battleMethodsPool']['shift']()),_0x21a525[_0x4a6022(0x133)]()&&_0x18da72[_0x4a6022(0x12b)]();}}}},_0x590826[_0x5cc4cf(0x157)]=function(_0x38d1ed){var _0x287cac=_0x5cc4cf,_0x55a6f0,_0xd93720;try{_0xd93720=_0x38d1ed[_0x287cac(0x129)][_0x287cac(0x15c)](function(_0x561599){var _0x21086a=_0x287cac;return ANET[_0x21086a(0x101)][_0x21086a(0xe2)](_0x561599);}),$gameTemp[_0x287cac(0x13e)](_0xd93720,_0x38d1ed[_0x287cac(0x103)],_0x38d1ed['mirror']);}catch(_0x16dfe8){if('uXWEx'!=='mHRIb')_0x55a6f0=_0x16dfe8,ANET['w'](_0x55a6f0);else{function _0x3d055b(){var _0x5bc17d=_0x287cac;return _0x60709f[_0x5bc17d(0xf5)](_0x113acf[_0x5bc17d(0x100)]('ended'));}}}},_0x590826[_0x5cc4cf(0xf9)]=function(_0x4f9ac9,_0x2c7578,_0xdf70eb){var _0x5188a0=_0x5cc4cf,_0x17bba8,_0x3fd677;try{ANET['PP']['isForceBattleSyncMode']()&&this[_0x5188a0(0x15a)](),_0x17bba8=ANET[_0x5188a0(0x101)][_0x5188a0(0xe2)](_0x4f9ac9),_0x17bba8[_0x2c7578]!=null&&_0x17bba8[_0x2c7578](_0xdf70eb);}catch(_0x19e32a){_0x3fd677=_0x19e32a,ANET['w'](_0x3fd677);}},_0x590826[_0x5cc4cf(0xff)]=function(){var _0x4acdbe=_0x5cc4cf,_0x1ea8dd;try{if(_0x4acdbe(0xd3)!==_0x4acdbe(0xd3)){function _0x57b6cf(){var _0x5e1043=_0x4acdbe;return this[_0x5e1043(0x160)]=_0x5804c6,this[_0x5e1043(0x14b)]=0x0,this[_0x5e1043(0x13a)]=0x168,_0x1f5e72[_0x5e1043(0xe5)](0x3e8);}}else this['_waitPool']+=0x1;}catch(_0x2c76d2){_0x1ea8dd=_0x2c76d2,ANET['w'](_0x1ea8dd);}},_0x590826[_0x5cc4cf(0x152)]=function(_0x2376a0,_0x1ffa98){var _0x55ab5e=_0x5cc4cf;if('KOfGL'===_0x55ab5e(0xe8)){var _0x1dcb24;try{if(_0x55ab5e(0x118)==='OMyjf'){function _0x13b5fe(){var _0x45e37d=_0x55ab5e;return _0x2beed9[_0x45e37d(0xca)]();}}else{if(!$gameParty[_0x55ab5e(0xca)]()){if(_0x55ab5e(0xe3)!=='gUGkf'){function _0x2d9dd5(){var _0x2db910=_0x55ab5e;if(!_0x41e5e5[_0x2db910(0xc2)]())return;return _0x287e92[_0x2db910(0xfb)]()[_0x2db910(0xce)](_0x4dc6e5),_0x5251d2['selectNextCommand']();}}else return;}BattleManager[_0x55ab5e(0xd5)]=_0x2376a0;if(_0x1ffa98===ANGameManager[_0x55ab5e(0x149)]()){if(_0x55ab5e(0x107)===_0x55ab5e(0x107))return BattleManager[_0x55ab5e(0xc5)]();else{function _0xdab4f7(){_0x192248['clear']();}}}else{if('RvHrR'!=='RvHrR'){function _0x217ee5(){_0x7190c6=_0x29da71,_0x5a9bc0['w'](_0x507f74);}}else return BattleManager[_0x55ab5e(0x112)]();}}}catch(_0x4209fa){_0x1dcb24=_0x4209fa,ANET['w'](_0x1dcb24);}}else{function _0x7d0baf(){var _0x390b87=_0x55ab5e;_0x133957[_0x390b87(0x155)](_0xb21845);}}},_0x590826[_0x5cc4cf(0xcb)]=function(_0x457800,_0x2e9d72){var _0x3092c4=_0x5cc4cf;if(_0x3092c4(0xcd)===_0x3092c4(0x12d)){function _0x1eea06(){return;}}else{var _0xcd1103;try{if(_0x3092c4(0x105)===_0x3092c4(0x105)){if(!ANGameManager[_0x3092c4(0xc2)]()){if(_0x3092c4(0x14d)!=='nynfW'){function _0x36d01a(){return;}}else return;}return BattleManager[_0x3092c4(0xfb)]()[_0x3092c4(0xce)](_0x2e9d72),BattleManager[_0x3092c4(0xec)]();}else{function _0x5240aa(){_0x28a93e=_0x1eb28d,_0x13e5c9['w'](_0x1de442);}}}catch(_0x1b249b){if('gHcti'===_0x3092c4(0x130)){function _0x4e3d87(){var _0x35e3de=_0x3092c4;_0x35e3de(0x117)['p'](),this[_0x35e3de(0x13d)]=_0x2e00df,_0x3709f2[_0x35e3de(0xde)](..._0x338ef4[_0x35e3de(0x10d)]),_0x35e3de(0xf0)['p'](_0x1035f1[_0x35e3de(0x10d)]),_0x1ec583[_0x35e3de(0xd9)](_0x8fe782),!this['isBattleMaster']()&&this[_0x35e3de(0xe4)]();}}else _0xcd1103=_0x1b249b,ANET['w'](_0xcd1103);}}},_0x590826[_0x5cc4cf(0x138)]=function(_0x2daff9,_0x4edaa6){var _0xf75a37=_0x5cc4cf;if(_0xf75a37(0x11d)!==_0xf75a37(0x11d)){function _0x5dff7f(){var _0x5a36be=_0xf75a37;_0x130caf['send'](_0xa99d03[_0x5a36be(0x100)]('inputAction',{'action':_0x645499,'inputActorId':_0x355ae1}));}}else{var _0x57f1db,_0x5e282f,_0x3e9c9e;try{if(!$gameParty[_0xf75a37(0xca)]())return;switch(_0x2daff9){case _0xf75a37(0x143):(_0x5e282f=BattleManager['_logWindow'])!=null&&_0x5e282f[_0xf75a37(0x155)](_0x4edaa6);break;default:(_0x3e9c9e=BattleManager[_0xf75a37(0xe7)])!=null&&_0x3e9c9e[_0xf75a37(0xed)]();}}catch(_0x2dc18c){if(_0xf75a37(0x104)!=='qDiVl'){function _0x15783b(){var _0x3aa055=_0xf75a37;_0x2a2408[_0x3aa055(0xf5)](_0x2d4c62[_0x3aa055(0x100)](_0x3aa055(0x11b),{'cmd':_0x7700db,'text':_0x2e0b06}));}}else _0x57f1db=_0x2dc18c,ANET['w'](_0x57f1db);}}};}());
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x41db=['wrGpF','executeMode','FiBkB','31121vJHmvJ','isPassEventFilterOptions','1547231uKFRgn','eventStarted','isOnAnyEvent','_sharedEventMaster','lWolH','hVZIe','code','nSyncWaitCommandData','executeCommand','_reservedNetworkSharedEvent','218937JYWAXy','Ocdig','idilq','VjLlL','osfTy','jejws','Virtual','eventEnded','DevLog','1670905HUBDNu','nSetEndCallback','984049rwCqGz','LnQZo','4JSHpis','eTfjk','diKmf','tXFrb','sendEventEnded','GrtcW','iSlan','eYpFO','AQuYO','Same\x20map','myPlayerData','NetIntr','pmwNN','_shouldForceExitSharedEvent','qptkR','NonVirtualCommandsList','nOnSyncedEventCommandResponse','onRegisterOnSharedEventRequest','WFwwN','reserveNetworkSharedEvent','resetSharedEvent','qHrIJ','mapId','hideWaitingInfo','Color','DHljX','send','GCLZv','sharedCanContinue','event','registerDone','ggrTG','nfvBT','TWXpI','isBusy','onSharedEventChoiceActionFromServer','LrtFl','UAKkW','Common\x20Event','1vTHlom','kuQHj','200936PFfghr','sharedForceCancel','nAllowContinueSharedEvent','forceCancelSharedEvent','isEventRunning','ELdBX','isVirtualCommand','Waiting\x20players','setColors','LsCXX','isSharedEventMaster','ZHUmz','showWaitingInfo','startVirtualCommand','729647ldqBRA','KcDJG','isNetworkSharedEventReserved','onVirtualCommand','myActorId','jLzAw','undefined','oaepW','NbaMo','ClYmB','getLightestColor','options','Shared\x20event\x20force\x20cancelled','onSharedEventForceCancelFromServer','_sharedInterpreter','_interpreter','list','nIsSharedEventCanBeForceCancelled','AJLBF','isSharedEventIsRunning','BLACK','indent','sendForceCancelSharedEvent','sendSharedEventRequireRegister','JbnAm','setupSharedInterpreter','FIMLr','eventId','LCSES','wCVtq','Press\x20ESC\x20to\x20cancel','YELLOW','hideWaitPlayersOnSharedEvent','Shared\x20Choice\x20accepted\x20from\x20server','Event','retrieveNetworkSharedEvent','SEND\x20ALL\x20CANCEL\x20EVENT','2UrtXDC','contains','checkEventRunning','registerOnShared','parameters','Qsglj','index','sharedChoice','sendEventStarted','sendEventVirtualCommand','onContinueSharedEvent','lBfdc','vLoBw','ANInterpreterManager'];function a0_0x27d6(_0xaf7706,_0x2b970d){_0xaf7706=_0xaf7706-0x15b;var _0x41db9a=a0_0x41db[_0xaf7706];return _0x41db9a;}var a0_0x56d556=a0_0x27d6;(function(_0x30fb02,_0x191100){var _0x495eb7=a0_0x27d6;while(!![]){try{var _0x34e177=-parseInt(_0x495eb7(0x17e))*parseInt(_0x495eb7(0x1b2))+parseInt(_0x495eb7(0x1c2))+parseInt(_0x495eb7(0x189))+parseInt(_0x495eb7(0x18b))*-parseInt(_0x495eb7(0x172))+parseInt(_0x495eb7(0x174))+-parseInt(_0x495eb7(0x1b4))*parseInt(_0x495eb7(0x161))+-parseInt(_0x495eb7(0x187));if(_0x34e177===_0x191100)break;else _0x30fb02['push'](_0x30fb02['shift']());}catch(_0x2dad25){_0x30fb02['push'](_0x30fb02['shift']());}}}(a0_0x41db,0xce3b9),window[a0_0x56d556(0x16e)]=function(){},function(){var _0x437714=a0_0x56d556,_0x23d63b,_0x243615;_0x23d63b=new KDCore[(_0x437714(0x186))](_0x437714(0x196)),_0x23d63b[_0x437714(0x1bc)](KDCore[_0x437714(0x1a3)][_0x437714(0x15b)],KDCore['Color'][_0x437714(0x1d6)][_0x437714(0x1cc)](0xf)),_0x23d63b['on'](),_0x243615=window[_0x437714(0x16e)],_0x243615['eventProcessExit']=function(){var _0xf69a8a=_0x437714;if($gameMessage['isBusy']()){if(_0xf69a8a(0x16c)!==_0xf69a8a(0x1dc))$gameMessage['nSetEndCallback'](_0x243615['eventProcessExit']);else{function _0x1f3f79(){var _0x420c9d=_0xf69a8a;if(!this[_0x420c9d(0x1be)]())return;_0x442147['p']('Shared\x20event\x20force\x20cancelled'),_0x420c9d(0x160)['p'](),this[_0x420c9d(0x1d8)](),this[_0x420c9d(0x15c)]();}}}else{if(!$gameMap[_0xf69a8a(0x1b8)]()){if(_0xf69a8a(0x1b9)!==_0xf69a8a(0x16d))_0x243615['sendEventEnded'](),_0x243615[_0xf69a8a(0x19f)]();else{function _0x1e2aea(){return;}}}}},_0x243615[_0x437714(0x163)]=function(){var _0x26c189=_0x437714;if(_0x26c189(0x1da)!==_0x26c189(0x1da)){function _0x123025(){var _0x756f76=_0x26c189,_0x5a2715;if(!this[_0x756f76(0x1be)]())return;_0x5a2715={'mapId':_0x3bac53['mapId'](),'eventId':this[_0x756f76(0x1d0)]['eventId'](),'index':_0xbe3c54,'action':_0x8fbefb},_0x17ebc3[_0x756f76(0x1a5)](_0x669a6b[_0x756f76(0x15e)](_0x756f76(0x168),_0x5a2715));}}else{var _0x498291;if(NetPlayerDataWrapper[_0x26c189(0x176)](ANGameManager[_0x26c189(0x195)]())){if(_0x26c189(0x1ca)===_0x26c189(0x1ca))!$gameMap[_0x26c189(0x1b8)]()&&(!$gameMessage[_0x26c189(0x1ad)]()&&this[_0x26c189(0x18f)]());else{function _0x4aff28(){return;}}}else $gameMap[_0x26c189(0x1b8)]()&&(_0x498291=$gameMap[_0x26c189(0x1d1)][_0x26c189(0x1dd)](),this[_0x26c189(0x169)](_0x498291));}},_0x243615[_0x437714(0x1c1)]=function(_0x16fb9a,_0x3f92e4,_0x52ce6c){var _0x177ee4=_0x437714,_0xc194e8,_0x59526d,_0x4eb288;try{if(_0x16fb9a[0x0][_0x177ee4(0x17a)]===0x7b&&_0x3f92e4>0x0)_0x59526d=[_0x52ce6c,_0x3f92e4,_0x16fb9a[0x0]['parameters'][0x0]],$gameSelfSwitches['setValue'](_0x59526d,_0x16fb9a[0x0][_0x177ee4(0x165)][0x1]===0x0);else{if(_0x177ee4(0x1b3)===_0x177ee4(0x1b3))_0x4eb288=new Game_Interpreter(),_0x4eb288['setup'](_0x16fb9a,_0x3f92e4),_0x4eb288[_0x177ee4(0x17c)]();else{function _0x4d88be(){return typeof _0x2792d9!=='undefined'&&_0x98509!==null?_0x5e45f2['hideWaitingInfo']():void 0x0;}}}}catch(_0x466de1){if(_0x177ee4(0x1c9)!==_0x177ee4(0x191))_0xc194e8=_0x466de1,ANET['w'](_0xc194e8);else{function _0x16f471(){var _0x145b2d=_0x177ee4;_0x650bb0[_0x145b2d(0x1ad)]()?_0x278dc5[_0x145b2d(0x188)](_0x3217b4['eventProcessExit']):!_0x172dc3[_0x145b2d(0x1b8)]()&&(_0x4ae86d['sendEventEnded'](),_0x356813[_0x145b2d(0x19f)]());}}}},_0x243615[_0x437714(0x1ba)]=function(_0x12346e){var _0x3d1504=_0x437714;if(_0x3d1504(0x18e)===_0x3d1504(0x182)){function _0x5a42da(){var _0x116b9f=_0x3d1504;!_0x1b17b0[_0x116b9f(0x1b8)]()&&(_0x2a2dc5[_0x116b9f(0x18f)](),_0x218682['resetSharedEvent']());}}else return!ANET['System'][_0x3d1504(0x19a)][_0x3d1504(0x162)](_0x12346e);},_0x243615[_0x437714(0x19f)]=function(){var _0x486086=_0x437714;if(_0x486086(0x1bd)!=='GhfSQ')this[_0x486086(0x1d0)]=null,this[_0x486086(0x177)]=![],this['hideWaitPlayersOnSharedEvent']();else{function _0x4e4257(){_0x50d7ac=_0x52e87d,_0x47d182['w'](_0x594cee);}}},_0x243615[_0x437714(0x1db)]=function(_0x23f272,_0x5762eb){var _0x4064d=_0x437714;if(_0x4064d(0x1af)===_0x4064d(0x1c7)){function _0x43783d(){var _0x2e8c8c=_0x4064d;return _0x2e351e[_0x2e8c8c(0x1a5)](_0x1b5509[_0x2e8c8c(0x15e)](_0x2e8c8c(0x185)));}}else{this[_0x4064d(0x1d0)]=_0x23f272,this['_sharedEventMaster']=_0x5762eb,$gameTemp[_0x4064d(0x198)]=![];if($gameTemp['isNetworkSharedEventReserved']())return;if(this['_sharedInterpreter']==null){if(_0x4064d(0x193)===_0x4064d(0x1b0)){function _0x519513(){var _0x2c7c9f=_0x4064d,_0x254a48;if(this[_0x2c7c9f(0x1be)]())return;_0x254a48={'mapId':_0x292404[_0x2c7c9f(0x1a1)](),'eventId':this['_sharedInterpreter'][_0x2c7c9f(0x1dd)](),'actorId':_0x1e083f['myActorId'](),'index':this[_0x2c7c9f(0x1d0)][_0x2c7c9f(0x17b)][_0x2c7c9f(0x167)],'indent':this[_0x2c7c9f(0x1d0)]['nSyncWaitCommandData'][_0x2c7c9f(0x1d7)]},_0x1c9d1e[_0x2c7c9f(0x1a5)](_0x2be78b[_0x2c7c9f(0x15e)](_0x2c7c9f(0x1a9),_0x254a48));}}else return;}_0x23d63b['p']('Shared\x20event\x20registred\x20'+this[_0x4064d(0x1d0)][_0x4064d(0x1dd)]());}},_0x243615[_0x437714(0x1be)]=function(){var _0x27b7b3=_0x437714;if(_0x27b7b3(0x18a)!=='LnQZo'){function _0x472579(){var _0x51fb21=_0x27b7b3,_0x59ecb8;if(!this[_0x51fb21(0x1be)]())return;_0x59ecb8={'mapId':_0x1a183f[_0x51fb21(0x1a1)](),'eventId':this['_sharedInterpreter'][_0x51fb21(0x1dd)]()},_0x3fb163[_0x51fb21(0x1a5)](_0xe4e45d['Event']('sharedForceCancel',_0x59ecb8));}}else return this['isSharedEventIsRunning']()&&this[_0x27b7b3(0x177)]===!![];},_0x243615[_0x437714(0x1d5)]=function(){var _0x28f463=_0x437714;return this['_sharedInterpreter']!=null&&$gameMap[_0x28f463(0x1b8)]();},_0x243615[_0x437714(0x1b7)]=function(){var _0x5807e6=_0x437714;if(!this['isSharedEventMaster']())return;_0x23d63b['p'](_0x5807e6(0x1ce)),_0x5807e6(0x160)['p'](),this[_0x5807e6(0x1d8)](),this[_0x5807e6(0x15c)]();},_0x243615['showWaitPlayersOnSharedEvent']=function(){var _0x3ee30f=_0x437714,_0xdd2ddf,_0x26d797;this['hideWaitPlayersOnSharedEvent'](),_0xdd2ddf=_0x3ee30f(0x1bb),_0x26d797='',this[_0x3ee30f(0x1be)]()&&this[_0x3ee30f(0x1d0)][_0x3ee30f(0x1d3)]()&&(_0x26d797=_0x3ee30f(0x1e0)),typeof HUIManager!==_0x3ee30f(0x1c8)&&HUIManager!==null&&HUIManager['showWaitingInfo'](_0xdd2ddf,_0x26d797,0x3e8);},_0x243615[_0x437714(0x15c)]=function(){var _0x3cd526=_0x437714;if(_0x3cd526(0x190)!==_0x3cd526(0x181))return typeof HUIManager!==_0x3cd526(0x1c8)&&HUIManager!==null?HUIManager[_0x3cd526(0x1a2)]():void 0x0;else{function _0x1c27c9(){return;}}},_0x243615['sendEventStarted']=function(_0x3ddb16){var _0x16719f=_0x437714;return ANNetwork[_0x16719f(0x1a5)](NMS[_0x16719f(0x15e)](_0x16719f(0x175),_0x3ddb16));},_0x243615['sendEventEnded']=function(){var _0x478f2a=_0x437714;return ANNetwork[_0x478f2a(0x1a5)](NMS[_0x478f2a(0x15e)](_0x478f2a(0x185)));},_0x243615[_0x437714(0x16a)]=function(_0x4dc25c,_0x341b3a,_0xd25e5c){var _0x145aed=_0x437714,_0x29dea3,_0x22b3ed,_0x55111c;_0x22b3ed={'code':0x0,'indent':0x0,'parameters':[]},_0x55111c={'list':[_0x4dc25c,_0x22b3ed]},_0x29dea3={'mapId':$gameMap[_0x145aed(0x1a1)](),'eventId':_0xd25e5c,'event':_0x55111c,'options':_0x341b3a},ANNetwork['send'](NMS[_0x145aed(0x15e)]('virtualEventCommand',_0x29dea3));},_0x243615[_0x437714(0x1d9)]=function(){var _0x5a284e=_0x437714,_0x263d0c;if(!this[_0x5a284e(0x1be)]()){if('AOJAh'!==_0x5a284e(0x1c3))return;else{function _0x2c3176(){var _0x6d8889=_0x5a284e;({mapId:_0x1dea7a,eventId:_0x1b8903,actorId:_0x2e6bd9,index:_0x2e7c88,indent:_0x3a99e7}=_0x51f200);if(_0x4d73a3[_0x6d8889(0x1a1)]()!==_0x334b3a)return;if(!_0x9c9658[_0x6d8889(0x1be)]())return;if(_0x1aac3e[_0x6d8889(0x1d0)][_0x6d8889(0x1dd)]()!==_0x53fd4e)return;_0xdc032e['_sharedInterpreter']['nOnSyncedEventCommandResponse'](_0xe2025f,_0x4c4e90,_0x2e1c28);}}}_0x263d0c={'mapId':$gameMap[_0x5a284e(0x1a1)](),'eventId':this[_0x5a284e(0x1d0)]['eventId'](),'index':this[_0x5a284e(0x1d0)]['nSyncWaitCommandData'][_0x5a284e(0x167)],'indent':this[_0x5a284e(0x1d0)][_0x5a284e(0x17b)][_0x5a284e(0x1d7)]},ANNetwork[_0x5a284e(0x1a5)](NMS[_0x5a284e(0x15e)](_0x5a284e(0x164),_0x263d0c));},_0x243615['sendSharedEventRegisteredDone']=function(){var _0x2299fc=_0x437714,_0x576e82;if(this[_0x2299fc(0x1be)]())return;_0x576e82={'mapId':$gameMap[_0x2299fc(0x1a1)](),'eventId':this['_sharedInterpreter'][_0x2299fc(0x1dd)](),'actorId':ANGameManager[_0x2299fc(0x1c6)](),'index':this[_0x2299fc(0x1d0)][_0x2299fc(0x17b)][_0x2299fc(0x167)],'indent':this[_0x2299fc(0x1d0)]['nSyncWaitCommandData']['indent']},ANNetwork[_0x2299fc(0x1a5)](NMS[_0x2299fc(0x15e)](_0x2299fc(0x1a9),_0x576e82));},_0x243615['sendSharedEventReadyToContinue']=function(){var _0x5a3541=_0x437714;if('ClYmB'!==_0x5a3541(0x1cb)){function _0x405437(){return;}}else{var _0x35940b;if(!this['isSharedEventMaster']())return;_0x35940b={'mapId':$gameMap[_0x5a3541(0x1a1)](),'eventId':this[_0x5a3541(0x1d0)][_0x5a3541(0x1dd)]()},ANNetwork[_0x5a3541(0x1a5)](NMS[_0x5a3541(0x15e)](_0x5a3541(0x1a7),_0x35940b));}},_0x243615[_0x437714(0x1d8)]=function(){var _0x3218a4=_0x437714,_0x3fadb2;if(!this[_0x3218a4(0x1be)]())return;_0x3fadb2={'mapId':$gameMap[_0x3218a4(0x1a1)](),'eventId':this['_sharedInterpreter'][_0x3218a4(0x1dd)]()},ANNetwork[_0x3218a4(0x1a5)](NMS['Event'](_0x3218a4(0x1b5),_0x3fadb2));},_0x243615['sendChoiceSelection']=function(_0x4aec86,_0x3c3b77){var _0x552c58=_0x437714,_0x2570a1;if(!this[_0x552c58(0x1be)]())return;_0x2570a1={'mapId':$gameMap[_0x552c58(0x1a1)](),'eventId':this['_sharedInterpreter'][_0x552c58(0x1dd)](),'index':_0x4aec86,'action':_0x3c3b77},ANNetwork[_0x552c58(0x1a5)](NMS[_0x552c58(0x15e)]('sharedChoice',_0x2570a1));},_0x243615[_0x437714(0x1c5)]=function(_0x102dba){var _0xbd707a=_0x437714;if(_0xbd707a(0x179)!==_0xbd707a(0x179)){function _0x2dd9d0(){var _0x4e354f=_0xbd707a;!_0x458db7['isBusy']()&&this[_0x4e354f(0x18f)]();}}else{var _0x23b9f3,_0x550c7b,_0x3f274b;try{if(_0xbd707a(0x1de)!==_0xbd707a(0x1bf)){if(_0x102dba[_0xbd707a(0x1cd)]['scope']===_0xbd707a(0x194)){if($gameMap[_0xbd707a(0x1a1)]()!==_0x102dba[_0xbd707a(0x1a1)]){if(_0xbd707a(0x178)==='AodZI'){function _0x461e45(){var _0x4d68b6=_0xbd707a;_0x2a38e1=new _0x53f6b3(),_0x48f536['setup'](_0xa9d960,_0x386937),_0x1a9295[_0x4d68b6(0x17c)]();}}else return;}}if(!ANET['Utils'][_0xbd707a(0x173)](_0x102dba[_0xbd707a(0x1cd)])){if(_0xbd707a(0x199)===_0xbd707a(0x199))return;else{function _0x27de67(){var _0x43a625=_0xbd707a;_0x255ef4=[_0x57aab1,_0xcc45a7,_0x3f6d7e[0x0][_0x43a625(0x165)][0x0]],_0x3736f4['setValue'](_0x3f498a,_0x2bc1d0[0x0]['parameters'][0x1]===0x0);}}}_0x550c7b=_0x102dba[_0xbd707a(0x1a8)],_0x3f274b=_0x550c7b[_0xbd707a(0x1d2)];switch(_0x102dba[_0xbd707a(0x1cd)][_0xbd707a(0x170)]){case _0xbd707a(0x184):_0x243615[_0xbd707a(0x1c1)](_0x3f274b,_0x102dba[_0xbd707a(0x1dd)],_0x102dba[_0xbd707a(0x1a1)]);break;case _0xbd707a(0x1b1):$gameTemp['reserveVirtualCommonEvent'](_0x550c7b);break;default:_0x243615[_0xbd707a(0x1ba)](_0x3f274b[0x0]['code'])?_0x243615[_0xbd707a(0x1c1)](_0x3f274b,_0x102dba[_0xbd707a(0x1dd)],_0x102dba[_0xbd707a(0x1a1)]):$gameTemp['reserveVirtualCommonEvent'](_0x550c7b);}}else{function _0x51a991(){return this['_sharedInterpreter']!=null&&_0x5414c5['isEventRunning']();}}}catch(_0x29b17f){_0x23b9f3=_0x29b17f,ANET['w'](_0x23b9f3);}}},_0x243615[_0x437714(0x19c)]=function(_0x15f8cc){var _0x116cec=_0x437714;if(_0x116cec(0x192)==='eYpFO'){var _0x493cd9,_0x3d41da,_0x4939c3,_0x6d926d,_0x5b0612;try{if(_0x116cec(0x1a6)!==_0x116cec(0x1a6)){function _0xc9d63e(){return;}}else{({mapId:_0x5b0612,eventId:_0x3d41da,index:_0x6d926d,indent:_0x4939c3}=_0x15f8cc);if($gameMap[_0x116cec(0x1a1)]()!==_0x5b0612){if('WFwwN'!==_0x116cec(0x19d)){function _0x33ec79(){return _0x2408b5=_0x3eca27,_0xc16e90['w'](_0x2365b8);}}else return;}if(_0x243615[_0x116cec(0x1d5)]())return;if(_0x6d926d!==0x0)return;$gameTemp[_0x116cec(0x19e)](_0x3d41da);return;}}catch(_0x5c2141){if(_0x116cec(0x183)==='bOplf'){function _0x58ae80(){return;}}else _0x493cd9=_0x5c2141,ANET['w'](_0x493cd9);}}else{function _0x47b59a(){var _0xc3d2d8=_0x116cec;_0x52eb77[_0xc3d2d8(0x1c0)](_0x84f69f,_0x25a46f,0x3e8);}}},_0x243615['onRegisterOnSharedEventResponse']=function(_0x10c201){var _0x2fcd14=_0x437714;if(_0x2fcd14(0x1d4)===_0x2fcd14(0x1d4)){var _0x936044,_0x5e4171,_0x69747d,_0xc9e2f2,_0x23cf46,_0xa03cb3;try{if(_0x2fcd14(0x1aa)==='ggrTG'){({mapId:_0xa03cb3,eventId:_0x69747d,actorId:_0x936044,index:_0x23cf46,indent:_0xc9e2f2}=_0x10c201);if($gameMap[_0x2fcd14(0x1a1)]()!==_0xa03cb3){if('QLPej'!==_0x2fcd14(0x18c))return;else{function _0x4865ca(){return;}}}if(!_0x243615[_0x2fcd14(0x1be)]())return;if(_0x243615['_sharedInterpreter']['eventId']()!==_0x69747d){if('LLWdt'!==_0x2fcd14(0x1a0))return;else{function _0x5d69d9(){return;}}}_0x243615[_0x2fcd14(0x1d0)][_0x2fcd14(0x19b)](_0x23cf46,_0xc9e2f2,_0x936044);}else{function _0x238200(){return;}}}catch(_0x5543d3){if(_0x2fcd14(0x1ab)!==_0x2fcd14(0x1ab)){function _0x467713(){var _0x6affa5=_0x2fcd14,_0x3ec5aa;if(!this['isSharedEventMaster']())return;_0x3ec5aa={'mapId':_0x4e8a4c[_0x6affa5(0x1a1)](),'eventId':this[_0x6affa5(0x1d0)][_0x6affa5(0x1dd)]()},_0x4877de[_0x6affa5(0x1a5)](_0x5c71ca[_0x6affa5(0x15e)](_0x6affa5(0x1a7),_0x3ec5aa));}}else _0x5e4171=_0x5543d3,ANET['w'](_0x5e4171);}}else{function _0x35a481(){var _0x4b5e54=_0x2fcd14;_0x4b0027[_0x4b5e54(0x1b8)]()&&(_0x2ebc87=_0x2689f1[_0x4b5e54(0x1d1)][_0x4b5e54(0x1dd)](),this[_0x4b5e54(0x169)](_0x1ef037));}}},_0x243615[_0x437714(0x16b)]=function(_0x14b6a1){var _0x431df9=_0x437714,_0x14a446,_0x39a075,_0x12c166;try{if('CuYlx'!=='CuYlx'){function _0x2b68be(){var _0xf2d573=a0_0x27d6;!_0x374eb7[_0xf2d573(0x1b8)]()&&(!_0x5f51ea[_0xf2d573(0x1ad)]()&&this[_0xf2d573(0x18f)]());}}else{({mapId:_0x12c166,eventId:_0x39a075}=_0x14b6a1);if($gameMap[_0x431df9(0x1a1)]()!==_0x12c166)return;if(!_0x243615[_0x431df9(0x1d5)]())return;if(_0x243615[_0x431df9(0x1be)]()){if(_0x431df9(0x166)===_0x431df9(0x17f)){function _0x686afb(){var _0x467f04=_0x431df9;_0xe210e8===_0x28a637[_0x467f04(0x17d)]&&_0x510a9b[_0x467f04(0x15f)]();}}else return;}if(_0x243615['_sharedInterpreter'][_0x431df9(0x1dd)]()!==_0x39a075){if(_0x431df9(0x180)===_0x431df9(0x197)){function _0x22b142(){var _0x151a92=_0x431df9;_0x3ecaa0['sendEventEnded'](),_0x20841b[_0x151a92(0x19f)]();}}else return;}return _0x243615[_0x431df9(0x1d0)][_0x431df9(0x1b6)]();}}catch(_0xc634c9){return _0x14a446=_0xc634c9,ANET['w'](_0x14a446);}},_0x243615[_0x437714(0x1cf)]=function(_0x35972e){var _0x374c07=_0x437714,_0x1f2eb0,_0x353eae,_0x4fd10b;try{({mapId:_0x4fd10b,eventId:_0x353eae}=_0x35972e);if($gameMap[_0x374c07(0x1a1)]()!==_0x4fd10b){if(_0x374c07(0x171)==='FiBkB')return;else{function _0x560b6b(){var _0x4d8ad8=_0x374c07;if(_0x40b5b4['mapId']()!==_0x897d54[_0x4d8ad8(0x1a1)])return;}}}if(_0x243615[_0x374c07(0x1be)]())return;if(_0x243615[_0x374c07(0x1d5)]()){if(_0x374c07(0x1df)===_0x374c07(0x1df)){if(_0x243615[_0x374c07(0x1d0)][_0x374c07(0x1dd)]()!==_0x353eae)return;return $gameTemp[_0x374c07(0x198)]=!![];}else{function _0x31ea00(){return;}}}else{if($gameTemp[_0x374c07(0x1c4)]()){if(_0x374c07(0x18d)===_0x374c07(0x1a4)){function _0x36e7b7(){var _0x68bed5=_0x374c07;return this[_0x68bed5(0x1d5)]()&&this['_sharedEventMaster']===!![];}}else _0x353eae===$gameTemp['_reservedNetworkSharedEvent']&&$gameTemp[_0x374c07(0x15f)]();}}}catch(_0x55e298){return _0x1f2eb0=_0x55e298,ANET['w'](_0x1f2eb0);}},_0x243615[_0x437714(0x1ae)]=function(_0x4b2f60){var _0x2616ce=_0x437714,_0x213d03,_0x22067f,_0x395c14,_0x197dcb,_0xe39d16;try{({mapId:_0xe39d16,eventId:_0x395c14,action:_0x213d03,index:_0x197dcb}=_0x4b2f60);if($gameMap[_0x2616ce(0x1a1)]()!==_0xe39d16)return;if(!_0x243615[_0x2616ce(0x1d5)]()){if(_0x2616ce(0x16f)===_0x2616ce(0x16f))return;else{function _0x423381(){return;}}}if(_0x243615[_0x2616ce(0x1d0)][_0x2616ce(0x1dd)]()!==_0x395c14){if(_0x2616ce(0x1ac)!==_0x2616ce(0x1ac)){function _0x2ce42d(){return;}}else return;}return $gameTemp['nSelectionActionFromNetwork']={'action':_0x213d03,'index':_0x197dcb},_0x23d63b['p'](_0x2616ce(0x15d));}catch(_0x5ade7d){return _0x22067f=_0x5ade7d,ANET['w'](_0x22067f);}};}());
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку игровых карт

//@[GLOBAL]
window.ANMapManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetMap");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = window.ANMapManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendMapLoaded = function() {
    return ANNetwork.send(NMS.Map("loaded", $gameMap.mapId()));
  };
  _.sendInitialMapData = function() {
    // * Отправляем принудительно свои данные всем игрокам на карте
    ANSyncDataManager.sendPlayerObserver();
    ANPlayersManager.sendPlayerLocation();
    if (ANGameManager.isMapMaster()) {
      this.sendMapEventsInitialPositions();
    }
  };
  _.sendEventMove = function(eventId) {
    var data;
    data = {
      id: eventId,
      mapId: $gameMap.mapId(),
      data: $gameMap.event(eventId).getMoveDataForNetwork()
    };
    ANNetwork.send(NMS.Map("eventMove", data), true);
  };
  // * Данную команду выполняет только мастер карты, когда кто-то подключается к карте
  _.sendMapEventsInitialPositions = function() {
    var ev, eventId, i, len, ref;
    ref = $gameMap.events();
    for (i = 0, len = ref.length; i < len; i++) {
      ev = ref[i];
      if (ev == null) {
        continue;
      }
      eventId = ev.eventId();
      setTimeout((function() {
        return ANMapManager.sendEventMove(eventId);
      }), 50); //TODO: Надо ли эту задержку?
    }
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.onEventMove = function(mapId, eventId, moveData) {
    var e, event;
    try {
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      event = $gameMap.event(eventId);
      if (event != null) {
        event.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onInitialMapSync = function() {
    var e;
    try {
      this.sendInitialMapData();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку данных игроков и их персонажей

//@[GLOBAL]
var ANPlayersManager;

ANPlayersManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetPlayer");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = ANPlayersManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendBindActorFromGame = function(actorId) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), this.bindActorResult.bind(this));
  };
  _.sendBindActorFromLobby = function(actorId, callback) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), callback);
  };
  _.sendPlayerName = function() {
    return ANNetwork.send(NMS.Lobby("setPlayerName", ANGameManager.myPlayerData().name));
  };
  _.sendActorReady = function() {
    var actorData;
    actorData = $gameActors.actor(ANGameManager.myPlayerData().actorId);
    ANNetwork.send(NMS.Game("actorReady", actorData));
    return ANGameManager.setWait('playersActors');
  };
  _.sendPlayerMove = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: $gamePlayer.getMoveDataForNetwork()
    };
    return ANNetwork.send(NMS.Map("playerMove", data), true);
  };
  _.sendPlayerLocation = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: [$gamePlayer.x, $gamePlayer.y]
    };
    return ANNetwork.send(NMS.Map("playerLocation", data));
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.bindActorResult = function(result) {
    //TODO: Если true - зарезервировали,  дальше либо кастомизация, либо отправка
    // клиент готов начинать игру (и ожидание игроков включается)
    // false - значит данный персонаж занят, надо обрабатыватЬ!
    if (result === true) {
      "BINDING GOOD, send ActorReady".p();
      //TODO: Сейчас без кастомизации
      this.sendActorReady();
    }
  };
  _.onPlayerMove = function(id, moveData) {
    var char, e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onPlayerLocation = function(id, positionData) {
    var char, e;
    try {
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.setPosition(positionData[0], positionData[1]);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x5c0e=['sendGlobalVariableChange','1725154vbKkBY','SEND\x20BATTLER\x20OBSERVER','_onBattlerResultObserverData','_dataClass','inBattle','YTIlS','sendBattlerResultObserver','myId','5608682CDkbIx','gVYQp','Imcfh','_sendObserverData','QEVaL','NPvRP','variable','eventChar','Color','ANSyncDataManager','getActorForPlayer','From\x20server:\x20unknown\x20observer\x20data\x20type:\x20','AQUA','event','17480pNOtcf','onSwitchFromServer','_itemId','onVariableValue','Game','sendEventObserver','mapId','isOneBattler','PQUiZ','getLightestColor','zjBgv','Utils','sendSyncGlobalVariables','hzgSt','212258aaUimb','observer','getPlayerDataById','getObserverDataForNetwork','_equips','_convertActorEquipmens','yVvWx','EzgVc','_onPlayerActorObserverData','playerActor','1VyayiV','DataSync','61oWdCgi','sendBattlerObserver','KFMtK','_nNetworkActorPickRequest','MVkZu','BLACK','battler','sendPlayerObserver','leader','DAAjE','tgZOU','cxgRu','_requestInitialSharedBattleRefresh','1625568MbgKaA','onVariableFromServer','XGFEf','UFaMI','map','aKgNM','send','battleUnits','unpackBattlerFromNetwork','JtZUS','1818260WTVliu','ALGeq','nRefreshSharedBattleState','sendBattleUnitsObserver','playerChar','CsYCX','networkCharacterById','AuHCg','HVezz','IgkvN','tTbOW','_onBattlerObserverData','ObSZS','battlerResult','_onEventCharObserverData','_nLocalActorMode','_onPlayerCharObserverData','applyObserverData','SEND\x20BATTLER\x20RESULT','rTYQw','result','length','_onBattleUnitsObserverData','ORfki','rXLSO','packForNetwork','374106LtrfRr','switch'];var a0_0x2d1ea4=a0_0x2407;function a0_0x2407(_0x241984,_0x5725d8){_0x241984=_0x241984-0x188;var _0x5c0e89=a0_0x5c0e[_0x241984];return _0x5c0e89;}(function(_0x24a2f2,_0x4924fe){var _0x24d162=a0_0x2407;while(!![]){try{var _0x555ec4=-parseInt(_0x24d162(0x1c6))*parseInt(_0x24d162(0x193))+-parseInt(_0x24d162(0x189))+-parseInt(_0x24d162(0x1c9))+-parseInt(_0x24d162(0x1a2))+-parseInt(_0x24d162(0x1ac))+-parseInt(_0x24d162(0x1df))*-parseInt(_0x24d162(0x195))+parseInt(_0x24d162(0x1d1));if(_0x555ec4===_0x4924fe)break;else _0x24a2f2['push'](_0x24a2f2['shift']());}catch(_0x393ec2){_0x24a2f2['push'](_0x24a2f2['shift']());}}}(a0_0x5c0e,0xe0840),window[a0_0x2d1ea4(0x1da)]=function(){},function(){var _0x319c4e=a0_0x2d1ea4,_0x11d816,_0x4ee858;_0x11d816=new KDCore['DevLog'](_0x319c4e(0x194)),_0x11d816['setColors'](KDCore['Color'][_0x319c4e(0x1dd)],KDCore[_0x319c4e(0x1d9)][_0x319c4e(0x19a)][_0x319c4e(0x1e8)](0x23)),_0x11d816['on'](),_0x4ee858=window['ANSyncDataManager'],_0x4ee858[_0x319c4e(0x19c)]=function(){var _0x3348c7=_0x319c4e;return this[_0x3348c7(0x1d4)](_0x3348c7(0x1b0),ANNetwork['myId'](),$gamePlayer[_0x3348c7(0x18c)]());},_0x4ee858[_0x319c4e(0x1e4)]=function(_0x5cf1de){var _0xf100c2=_0x319c4e;if(_0xf100c2(0x1ab)===_0xf100c2(0x1ab))this[_0xf100c2(0x1d4)](_0xf100c2(0x1d8),{'mapId':$gameMap[_0xf100c2(0x1e5)](),'eventId':_0x5cf1de},$gameMap[_0xf100c2(0x1de)](_0x5cf1de)[_0xf100c2(0x18c)]());else{function _0x160e83(){return;}}},_0x4ee858['sendActorObserver']=function(){var _0xf30591=_0x319c4e;if(_0xf30591(0x1b6)!==_0xf30591(0x1b6)){function _0xde5d37(){var _0x174d02=_0xf30591;_0x27c095[_0x174d02(0x1bd)](_0x5ce23e);}}else return this[_0xf30591(0x1d4)](_0xf30591(0x192),ANNetwork[_0xf30591(0x1d0)](),$gameParty[_0xf30591(0x19d)]()[_0xf30591(0x18c)]());},_0x4ee858[_0x319c4e(0x1af)]=function(_0x495e64){var _0x109bed=_0x319c4e,_0xfd047;if($gameParty[_0x109bed(0x1e6)]()){if('YTIlS'!==_0x109bed(0x1ce)){function _0x480cd0(){var _0x58dbc5=_0x109bed,_0x288c5a;_0x288c5a={'type':_0x2fdf92,'id':_0xf78b6d,'data':_0x4b7334},_0x5059f0['send'](_0x1f52e0[_0x58dbc5(0x1e3)](_0x58dbc5(0x18a),_0x288c5a),!![]);}}else return;}_0xfd047=_0x495e64[_0x109bed(0x1a6)](function(_0x1415cf){var _0x3be099=_0x109bed;return[_0x1415cf[_0x3be099(0x1c5)](),_0x1415cf[_0x3be099(0x18c)]()];}),this[_0x109bed(0x1d4)]('battleUnits',null,_0xfd047);},_0x4ee858[_0x319c4e(0x196)]=function(_0x273850){var _0x32842b=_0x319c4e;return _0x32842b(0x1ca)['p'](),this['_sendObserverData'](_0x32842b(0x19b),_0x273850[_0x32842b(0x1c5)](),_0x273850['getObserverDataForNetwork']());},_0x4ee858[_0x319c4e(0x1cf)]=function(_0x48fd8d){var _0x136e9d=_0x319c4e;_0x136e9d(0x1be)['p']();if($gameParty[_0x136e9d(0x1e6)]()){if(_0x136e9d(0x1d2)!==_0x136e9d(0x190))return;else{function _0x2eb5f6(){_0x59d18c=_0x166160,_0x56c075['w'](_0x47a72e);}}}return this[_0x136e9d(0x1d4)](_0x136e9d(0x1b9),_0x48fd8d[_0x136e9d(0x1c5)](),_0x48fd8d[_0x136e9d(0x1c0)]()['getObserverDataForNetwork']());},_0x4ee858[_0x319c4e(0x1d4)]=function(_0x1ddcdc,_0x3bb8db,_0x245ad3){var _0x287bf4=_0x319c4e;if('lVVRz'===_0x287bf4(0x1a5)){function _0x300105(){return;}}else{var _0x304a20;_0x304a20={'type':_0x1ddcdc,'id':_0x3bb8db,'data':_0x245ad3},ANNetwork[_0x287bf4(0x1a8)](NMS[_0x287bf4(0x1e3)](_0x287bf4(0x18a),_0x304a20),!![]);}},_0x4ee858[_0x319c4e(0x1c8)]=function(_0x3ec268,_0x569263){var _0x4c2dfe=_0x319c4e,_0x1ac56d;_0x1ac56d={'id':_0x3ec268,'data':_0x569263},ANNetwork[_0x4c2dfe(0x1a8)](NMS[_0x4c2dfe(0x1e3)](_0x4c2dfe(0x1d7),_0x1ac56d));},_0x4ee858['sendGlobalSwitchChange']=function(_0x4decf6,_0x1dbfca){var _0x23bbf4=_0x319c4e,_0x55740d;_0x55740d={'id':_0x4decf6,'data':_0x1dbfca},ANNetwork[_0x23bbf4(0x1a8)](NMS[_0x23bbf4(0x1e3)](_0x23bbf4(0x1c7),_0x55740d));},_0x4ee858[_0x319c4e(0x1eb)]=function(){},_0x4ee858['onObserverData']=function(_0x3d296e,_0x5e91b6,_0x23f6bb){var _0x5f45d3=_0x319c4e;if(_0x5f45d3(0x1ad)!==_0x5f45d3(0x19e))switch(_0x5e91b6){case _0x5f45d3(0x1b0):return this[_0x5f45d3(0x1bc)](_0x3d296e,_0x23f6bb);case'eventChar':return this[_0x5f45d3(0x1ba)](_0x3d296e,_0x23f6bb);case _0x5f45d3(0x192):return this[_0x5f45d3(0x191)](_0x3d296e,_0x23f6bb);case _0x5f45d3(0x19b):return this[_0x5f45d3(0x1b7)](_0x3d296e,_0x23f6bb);case'battlerResult':return this['_onBattlerResultObserverData'](_0x3d296e,_0x23f6bb);case'battleUnits':return this['_onBattleUnitsObserverData'](_0x23f6bb);default:_0x11d816['p'](_0x5f45d3(0x1dc)+_0x5e91b6);}else{function _0x830ac2(){var _0x116f7b=_0x5f45d3;switch(_0x1d47dd){case _0x116f7b(0x1b0):return this['_onPlayerCharObserverData'](_0x2bc243,_0x4adf09);case'eventChar':return this[_0x116f7b(0x1ba)](_0x550d2e,_0x496096);case _0x116f7b(0x192):return this[_0x116f7b(0x191)](_0x5a32f5,_0x28a2dc);case'battler':return this['_onBattlerObserverData'](_0x1e625a,_0x50a652);case _0x116f7b(0x1b9):return this[_0x116f7b(0x1cb)](_0x1291ee,_0x2f7fc8);case _0x116f7b(0x1a9):return this['_onBattleUnitsObserverData'](_0x3a349e);default:_0x2ec085['p'](_0x116f7b(0x1dc)+_0x1a52d8);}}}},_0x4ee858[_0x319c4e(0x1bc)]=function(_0x2e89f4,_0x3c9150){var _0x1e72b2=_0x319c4e,_0x223c28,_0x10860c;try{_0x223c28=$gameMap[_0x1e72b2(0x1b2)](_0x2e89f4);if(_0x223c28!=null){if(_0x1e72b2(0x199)===_0x1e72b2(0x1bf)){function _0x6abc62(){var _0x2b304d=_0x1e72b2,_0x2af39b;if(_0x5922b6['isOneBattler']())return;_0x2af39b=_0x3cb824[_0x2b304d(0x1a6)](function(_0x21c8cf){var _0x94aba6=_0x2b304d;return[_0x21c8cf['packForNetwork'](),_0x21c8cf[_0x94aba6(0x18c)]()];}),this['_sendObserverData']('battleUnits',null,_0x2af39b);}}else _0x223c28[_0x1e72b2(0x1bd)](_0x3c9150);}}catch(_0x3e7737){if('pSeOe'!==_0x1e72b2(0x1b4))_0x10860c=_0x3e7737,ANET['w'](_0x10860c);else{function _0x517851(){var _0x233254=_0x1e72b2;this[_0x233254(0x18e)](_0x4053c2[0x1]),_0x46562c[_0x233254(0x1bd)](_0x18e211[0x1]);}}}},_0x4ee858['_onEventCharObserverData']=function(_0x5a1aec,_0x554ddb){var _0x105135=_0x319c4e,_0x4ff8c9,_0x391dc4,_0x34e0c3,_0x8dfe40;try{({mapId:_0x8dfe40,eventId:_0x34e0c3}=_0x5a1aec);if($gameMap['mapId']()!==_0x8dfe40){if(_0x105135(0x1b8)===_0x105135(0x1b8))return;else{function _0x4b9584(){_0x4cdf86['applyObserverData'](_0x2022b5);}}}_0x391dc4=$gameMap[_0x105135(0x1de)](_0x34e0c3),_0x391dc4!=null&&_0x391dc4[_0x105135(0x1bd)](_0x554ddb);}catch(_0x2cfc0e){if('SgKpF'!==_0x105135(0x18f))_0x4ff8c9=_0x2cfc0e,ANET['w'](_0x4ff8c9);else{function _0x39c8e1(){var _0xed594d=_0x105135;_0x204866=_0x34ee89[_0x23aa28],_0x4e8699=_0x1cafaa[_0xed594d(0x1ea)]['unpackBattlerFromNetwork'](_0x45077e[0x0]),_0x2a3afb!=null&&(this['_convertActorEquipmens'](_0x6e540[0x1]),_0x589c8c[_0xed594d(0x1bd)](_0x7c6b5d[0x1]));}}}},_0x4ee858[_0x319c4e(0x191)]=function(_0x1376af,_0x26aff5){var _0x1be685=_0x319c4e,_0x117b9e,_0x1a377a,_0x1bca5f;try{if($gameTemp[_0x1be685(0x1bb)]===!![]){if(_0x1be685(0x1e7)!==_0x1be685(0x1e7)){function _0x436fc0(){var _0x466bab=_0x1be685,_0xfa63c7;_0xfa63c7={'id':_0x3e8e22,'data':_0xb263d4},_0x288002[_0x466bab(0x1a8)](_0x40a8e8['Game'](_0x466bab(0x1c7),_0xfa63c7));}}else $gameTemp['_nNetworkActorPickRequest']=!![];}_0x1bca5f=ANGameManager[_0x1be685(0x18b)](_0x1376af),_0x117b9e=NetPlayerDataWrapper[_0x1be685(0x1db)](_0x1bca5f),$gameTemp['_nNetworkActorPickRequest']=![];if(_0x117b9e==null)return;this[_0x1be685(0x18e)](_0x26aff5),_0x117b9e[_0x1be685(0x1bd)](_0x26aff5);}catch(_0x12dd22){if(_0x1be685(0x197)===_0x1be685(0x197))_0x1a377a=_0x12dd22,ANET['w'](_0x1a377a);else{function _0x401c4b(){_0x94283e=_0x477450,_0x503274['w'](_0x35b97c);}}}},_0x4ee858[_0x319c4e(0x1b7)]=function(_0x4d23a0,_0x569463){var _0x504567=_0x319c4e,_0x5bdadd,_0x4d40e0;try{if(!$gameParty[_0x504567(0x1cd)]()){if(_0x504567(0x1e9)!==_0x504567(0x1a0))return;else{function _0x2c1613(){var _0x570acf=_0x504567;return[_0x5ac7dc[_0x570acf(0x1c5)](),_0x48cebc[_0x570acf(0x18c)]()];}}}_0x5bdadd=ANET[_0x504567(0x1ea)]['unpackBattlerFromNetwork'](_0x4d23a0);if(_0x5bdadd==null)return;this[_0x504567(0x18e)](_0x569463),_0x5bdadd['applyObserverData'](_0x569463);}catch(_0x3fafea){_0x4d40e0=_0x3fafea,ANET['w'](_0x4d40e0);}},_0x4ee858[_0x319c4e(0x18e)]=function(_0x49ef0e){var _0x82cc9d=_0x319c4e,_0x5eb589,_0x239ae7,_0x4096be,_0x1bef77;if(_0x49ef0e['_equips']==null){if(_0x82cc9d(0x1a4)!==_0x82cc9d(0x1a4)){function _0x52d925(){return;}}else return;}for(_0x5eb589=_0x4096be=0x0,_0x1bef77=_0x49ef0e[_0x82cc9d(0x18d)]['length'];0x0<=_0x1bef77?_0x4096be<_0x1bef77:_0x4096be>_0x1bef77;_0x5eb589=0x0<=_0x1bef77?++_0x4096be:--_0x4096be){if(_0x82cc9d(0x1d6)===_0x82cc9d(0x1d6))_0x239ae7=_0x49ef0e['_equips'][_0x5eb589],_0x49ef0e[_0x82cc9d(0x18d)][_0x5eb589]=new Game_Item(),_0x49ef0e['_equips'][_0x5eb589]['_dataClass']=_0x239ae7[_0x82cc9d(0x1cc)],_0x49ef0e[_0x82cc9d(0x18d)][_0x5eb589]['_itemId']=_0x239ae7[_0x82cc9d(0x1e1)];else{function _0x4349d0(){_0x4390c3=_0x3930bb,_0x997f4d['w'](_0x8b8802);}}}},_0x4ee858['_onBattlerResultObserverData']=function(_0x54df2e,_0x30ca46){var _0x4c5840=_0x319c4e,_0x19cac7,_0x20c15a,_0x4c4656;try{if(_0x4c5840(0x1d3)===_0x4c5840(0x1d3)){if(!$gameParty[_0x4c5840(0x1cd)]())return;_0x19cac7=ANET[_0x4c5840(0x1ea)][_0x4c5840(0x1aa)](_0x54df2e);if(_0x19cac7==null)return;if((_0x4c4656=_0x19cac7[_0x4c5840(0x1c0)]())!=null){if(_0x4c5840(0x188)===_0x4c5840(0x188))_0x4c4656['applyObserverData'](_0x30ca46);else{function _0x5111f6(){_0x50e573=_0x1a11b5,_0x22c62a['w'](_0xe1f42f);}}}}else{function _0xa41a2c(){var _0x499ce0=_0x4c5840;this['_sendObserverData'](_0x499ce0(0x1d8),{'mapId':_0x1cccd8['mapId'](),'eventId':_0x2a0d18},_0x3bab8f[_0x499ce0(0x1de)](_0x5cf0a3)['getObserverDataForNetwork']());}}}catch(_0x165991){_0x20c15a=_0x165991,ANET['w'](_0x20c15a);}},_0x4ee858[_0x319c4e(0x1c2)]=function(_0x38f574){var _0x201242=_0x319c4e,_0x18538d,_0xb90c51,_0x556f90,_0xd6a99d,_0x4387f9;try{if('CsYCX'===_0x201242(0x1b1)){if(!$gameParty[_0x201242(0x1cd)]())return;for(_0x556f90=0x0,_0xd6a99d=_0x38f574[_0x201242(0x1c1)];_0x556f90<_0xd6a99d;_0x556f90++){_0x4387f9=_0x38f574[_0x556f90],_0x18538d=ANET['Utils'][_0x201242(0x1aa)](_0x4387f9[0x0]);if(_0x18538d!=null){if('QEVaL'!==_0x201242(0x1d5)){function _0x37ee56(){var _0x5638ea=_0x201242;_0x397a69[_0x5638ea(0x198)]=!![];}}else this['_convertActorEquipmens'](_0x4387f9[0x1]),_0x18538d[_0x201242(0x1bd)](_0x4387f9[0x1]);}}$gameTemp['_requestInitialSharedBattleRefresh']===!![]&&(BattleManager[_0x201242(0x1ae)](),$gameTemp[_0x201242(0x1a1)]=![]);}else{function _0x28b5d4(){var _0xe8fc79=_0x201242,_0x7ace45;try{_0x59f4e0[_0xe8fc79(0x1e0)](_0x1560ec,_0x50fc78);}catch(_0x1da8c4){_0x7ace45=_0x1da8c4,_0x5ad71f['w'](_0x7ace45);}}}}catch(_0x74cebe){if(_0x201242(0x1b5)!==_0x201242(0x19f))_0xb90c51=_0x74cebe,ANET['w'](_0xb90c51);else{function _0x5f0ee2(){var _0x18cb48=_0x201242;return this[_0x18cb48(0x1d4)](_0x18cb48(0x192),_0x516c44['myId'](),_0x4c48b4['leader']()[_0x18cb48(0x18c)]());}}}},_0x4ee858[_0x319c4e(0x1e2)]=function(_0x453f65,_0x4a29fa){var _0x685d77=_0x319c4e,_0x5dbbe8;try{if('aKgNM'===_0x685d77(0x1a7))$gameVariables[_0x685d77(0x1a3)](_0x453f65,_0x4a29fa);else{function _0x5e1a5e(){var _0xff0537=_0x685d77;_0x383997[_0xff0537(0x1bd)](_0x33a409);}}}catch(_0x1d3d01){if(_0x685d77(0x1b3)===_0x685d77(0x1c4)){function _0x1f5d40(){_0x30efc2=_0x39287e,_0x5784f8['w'](_0x4fdaa9);}}else _0x5dbbe8=_0x1d3d01,ANET['w'](_0x5dbbe8);}},_0x4ee858['onSwitchValue']=function(_0x110e2,_0x111b84){var _0x284b1b=_0x319c4e;if('liYvg'!==_0x284b1b(0x1c3)){var _0x25269c;try{$gameSwitches[_0x284b1b(0x1e0)](_0x110e2,_0x111b84);}catch(_0x4c9cde){_0x25269c=_0x4c9cde,ANET['w'](_0x25269c);}}else{function _0x3b1dd7(){var _0x2af2c1=_0x284b1b;if(!_0x430704['inBattle']())return;_0x162ca3=_0x18667d[_0x2af2c1(0x1ea)][_0x2af2c1(0x1aa)](_0x22fadb);if(_0x30a272==null)return;this[_0x2af2c1(0x18e)](_0x5da063),_0x467ed4[_0x2af2c1(0x1bd)](_0x4cbb6d);}}};}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANET Common Utils Methods.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Набор вспомогательных функций для ANET
AA.Utils.ANET = {};

//?shortcut
ANET.Utils = AA.Utils.ANET;

(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.ANET;
  // * Проверка, что комментарий является NET командой
  _.isNetCommentCommand = function(commentLine) {
    if (!String.any(commentLine)) {
      return false;
    }
    // * Все команды начинаются с буквы заглавной N, затем пробел и команда
    return /N\s.+/.exec(commentLine);
  };
  _.getNetCommentCommand = function(commentLine) {
    var command;
    if (!this.isNetCommentCommand(commentLine)) {
      return "";
    }
    // * Возвращает первое слово после N
    command = /N\s(!*\w+)/.exec(commentLine)[1];
    if (!String.any(command)) {
      return "";
    }
    return command;
  };
  //TODO: Можно все все данные для сети через метод аналогичный передавать для безопасности
  // * Сохраняет Battler в определённый формат для отправки по сети
  _.packBattlerForNetwork = function(battler) {
    if (battler instanceof Game_Actor) {
      return {
        type: "actor",
        id: battler.actorId()
      };
    } else {
      return {
        type: "enemy",
        id: battler.index()
      };
    }
  };
  // * Возвращяет конкретный Battler из данных сети
  _.unpackBattlerFromNetwork = function(data) {
    if (data.type === "actor") {
      return $gameActors.actor(data.id);
    } else {
      return $gameTroop.members()[data.id];
    }
  };
  _.isMyActorInValidListToStart = function(list, isInclude) {
    var e;
    try {
      list = JsonEx.parse(list).map(function(i) {
        return parseInt(i);
      });
      return list.contains(ANGameManager.myActorId()) === isInclude;
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  _.isPassEventFilterOptions = function(options) {
    var e;
    try {
      switch (options.whoSelector) {
        case "All":
          return true;
        case "Master":
          return ANNetwork.isMasterClient();
        case "Master Except":
          return !ANNetwork.isMasterClient();
        case "Actor List":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, true);
        case "Actor List Except":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, false);
        case "Me Except":
          // * Если команда пришла с сервера, то явно эта проверка не касается этого клиента
          // * В опциях запуска события - не используется
          return true;
        default:
          return false;
      }
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  // * Событие запущенно каким-либо игроком?
  _.isEventStartedByAny = function(eventId) {
    var e;
    try {
      return ANGameManager.anotherPlayersOnMap().some(function(p) {
        return NetPlayerDataWrapper.isOnEvent(p, eventId);
      });
    } catch (error) {
      e = error;
      ANET.w(e);
      // * В случае ошибки безопаснее вернуть true
      return true;
    }
  };
  // * Собрать опции для команды события по параметрам из комменатрия (аналог опций из команды плагина)
  // * Список должен быть строкой! [1, 2, 3]
  _.buildEventCommandOptions = function(selector, list, scope, mode) {
    return {
      "actorList": list,
      "executeMode": mode,
      "scope": scope,
      "whoSelector": selector
    };
  };
  // * Конвертировать из команды комменатрия в параметр команды плагина
  _.convertEventCommandScopeAndMode = function(commentLine) {
    var mode, scope;
    // * SCOPE
    if (commentLine.contains("world")) {
      scope = "All world";
    } else {
      scope = "Same map";
    }
    // * MODE
    if (commentLine.contains("virtual")) {
      mode = "Virtual";
    } else if (commentLine.contains("common")) {
      mode = "Common Event";
    } else {
      mode = "Auto";
    }
    return {scope, mode};
  };
  // * Изъять список персонажей из комментария
  // * Формат выходной [1, 2, 3....]
  _.extractActorsListFromComment = function(commentLine) {
    var list, regex, resultList;
    regex = /forActors\s+([\d,\s*]*)/gm;
    resultList = regex.exec(commentLine);
    if (resultList == null) {
      return "[]";
    }
    if (resultList[1] == null) {
      return "[]";
    }
    list = "[" + resultList[1] + "]";
    return list;
  };
  _.parseEventStartOptionsFromCommentLine = function(commentLine) {
    var e, nStartOptions;
    try {
      // * Стандартный набор
      nStartOptions = {
        lockMode: "false",
        sharedMode: "No",
        whoSelector: "All",
        actorList: "[]"
      };
      if (commentLine.contains("lock")) {
        nStartOptions.lockMode = "true";
      }
      if (commentLine.contains("shared")) {
        nStartOptions.sharedMode = "Strict";
        // * Только если есть флаг sharedMode
        if (commentLine.contains("optional")) {
          nStartOptions.sharedMode = "Optional";
        }
      }
      if (commentLine.contains("master")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Master Except";
        } else {
          nStartOptions.whoSelector = "Master";
        }
      } else if (commentLine.contains("forActors")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Actor List Except";
        } else {
          nStartOptions.whoSelector = "Actor List";
        }
        nStartOptions.actorList = ANET.Utils.extractActorsListFromComment(commentLine);
      }
      return nStartOptions;
    } catch (error) {
      e = error;
      ANET.w(e);
      return null;
    }
  };
})();

// ■ END ANET Common Utils Methods.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__displayStartMessages, ALIAS__endBattle, ALIAS__processEscape, ALIAS__selectNextActor, ALIAS__selectPreviousActor, ALIAS__setup, ALIAS__update, _;
  //@[DEFINES]
  _ = BattleManager;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    ALIAS__setup.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      if (!ANBattleManager.isBattleRegistred()) {
        // * Только если данные боя не установлены, но проверка сетевой битвы
        this.nSetupNetworkBattle();
      }
    }
  };
  //@[ALIAS]
  ALIAS__endBattle = _.endBattle;
  _.endBattle = function() {
    ALIAS__endBattle.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      // * Убрать флаг сетевой битвы
      this.nSetNetworkBattle(null);
    }
  };
  //@[ALIAS]
  ALIAS__selectNextActor = _.selectNextActor;
  _.selectNextActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectNextActorOnClient();
    } else {
      ALIAS__selectNextActor.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__selectPreviousActor = _.selectPreviousActor;
  _.selectPreviousActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectPreviousActorOnClient();
    } else {
      ALIAS__selectPreviousActor.call(this);
    }
  };
  //@[ALIAS]
  // * В сетевом режиме Update вызывается только на мастере боя!
  ALIAS__update = _.update;
  _.update = function(activeTime) {
    ALIAS__update.call(this, activeTime);
    if (!ANNetwork.isConnected()) {
      return;
    }
    this.nUpdateNetwork();
  };
  //TEMP
  //TODO: Временно отключено начальное сообщение в бою
  //@[ALIAS]
  ALIAS__displayStartMessages = _.displayStartMessages;
  _.displayStartMessages = function() {
    if (ANNetwork.isConnected()) {

    } else {
      // * EMPTY
      return ALIAS__displayStartMessages.call(this);
    }
  };
  
  //TEMP
  //TODO: Если шанс побега не сработал, будет баг
  // * Временно шанс побега 100%
  //@[ALIAS]
  ALIAS__processEscape = _.processEscape;
  _.processEscape = function() {
    if (ANNetwork.isConnected()) {
      this._escapeRatio = 101;
    }
    return ALIAS__processEscape.call(this);
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = BattleManager;
  _.nSetNetworkBattle = function(netBattleId) {
    this.netBattleId = netBattleId;
  };
  _.nIsNetworkBattle = function() {
    return this.netBattleId != null;
  };
  _.nSetupNetworkBattle = function() {
    var battleData;
    if (this.nIsNetworkBattle()) {
      battleData = {
        battleId: this.netBattleId,
        options: [$gameTroop._troopId, this._canEscape, this._canLose]
      };
      ANBattleManager.registerOnBattle(battleData);
    } else {
      ANBattleManager.registerOnLocalBattle();
    }
  };
  _.nSelectNextActorOnClient = function() {
    // * Если данный флаг == true, то игрок переключает меню ввод с группы на персонажа своего
    // * (Это если нажать Escape и появилось Party Commands, а затем снова на Fight)
    if (this._isShouldWaitMyNetworkAction === true) {
      // * Выбираем только своего персонажа снова (а не первого)
      this._currentActor = $gameParty.leader();
      if (KDCore.isMV()) {
        this._actorIndex = this.myNetworkActorIndex();
        $gameTemp._isBattleSceneShouldBeRefreshed = true;
      }
      return this._isShouldWaitMyNetworkAction = false;
    } else {
      ANBattleManager.battleInputActionDone();
      return this._inputting = false;
    }
  };
  
  // * В стандартном тактическом режиме боя если нажать "отмена" (назад)
  // * То мы можем поменять выбор предыдущего персонажа, но в сети,
  // * мы не можем это сделать, поэтому просто "выходим" на меню группы
  _.nSelectPreviousActorOnClient = function() {
    return this._currentActor = null;
  };
  _.nUpdateNetwork = function() {
    ANBattleManager.updateInputChange();
    $gameTroop.nUpdateBattleDataSync();
    $gameParty.nUpdateBattleDataSync();
  };
  _.nClearClientInput = function() {
    this._inputting = false;
    this._currentActor = null;
    this._isShouldWaitMyNetworkAction = true;
    if (KDCore.isMV()) {
      this.startTurn();
    }
  };
  _.nSetCurrentClientInput = function() {
    $gameParty.makeActions(); // * Чтобы был inputting action
    this._currentActor = $gameParty.leader();
    if (KDCore.isMV()) {
      this._actorIndex = this.myNetworkActorIndex();
    }
    // * Готов к отправке действия сразу (по умолчанию)
    // * Команда 'Fight' делает false (см nSelectNextActorOnClient)
    return this._isShouldWaitMyNetworkAction = false;
  };
  _.nRefreshSharedBattleState = function() {
    var e;
    try {
      if (SceneManager._scene.nRefreshSharedBattle != null) {
        SceneManager._scene.nRefreshSharedBattle();
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Если во время боя был удалён (вышел) сетевой игрок
  // * Без этого метода, игра переключает (или зависат) ввод другого игрока (который вышел)
  _.nSafeRemoveActor = function() {
    var e;
    if (this._phase !== "input") {
      return;
    }
    try {
      if (this._currentActor !== $gameParty.leader()) {
        return this.selectNextActor();
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  // * Можно ли клиенту (не BattleMaster) самостоятельно обновлять BattleManager
  _.nIsLocalForceUpdatePhase = function() {
    return this.isAborting() || this.isBattleEnd();
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ConfigManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__applyData, ALIAS__makeData, _;
  //@[DEFINES]
  _ = ConfigManager;
  // * Сохранение и загрузка сетевого имени игрока

  //@[ALIAS]
  ALIAS__makeData = _.makeData;
  _.makeData = function() {
    var config;
    config = ALIAS__makeData.call(this);
    config.netPlayerName = this.netPlayerName;
    return config;
  };
  
  //@[ALIAS]
  ALIAS__applyData = _.applyData;
  _.applyData = function(config) {
    ALIAS__applyData.call(this, config);
    this.netPlayerName = config.netPlayerName;
  };
})();

// ■ END ConfigManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Action.prototype;
  // * Задать действие из сети (т.е. из действия другого игрока)
  _.setFromNetwork = function(action) {
    var f;
    this.clear();
    this._nParseActionItem(action._item);
    for (f in action) {
      if (f === "_item") {
        // * пропускаем Game_Item, он уже сконвертирован
        continue;
      }
      this[f] = action[f];
    }
  };
  // * Класс Game_Item отдельно
  _._nParseActionItem = function(item) {
    var f;
    if (item == null) {
      return;
    }
    for (f in item) {
      this._item[f] = item[f];
    }
  };
})();

// ■ END Game_Action.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nCreateObserver();
    }
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  _.nCreateObserver = function() {
    this.netDataObserver = new DataObserver();
    this.nFillObserver();
    // * Создаём после nFillObserver, чтобы не было в списке полей Observer
    this.isDataObserverHaveChanges = false;
    this.netDataObserver.refreshAll(this);
  };
  // * Тут применён автоматический сбор всех полей
  _.nFillObserver = function() {
    var entries, fields, i, len, value;
    fields = [];
    entries = Object.entries(this);
    for (i = 0, len = entries.length; i < len; i++) {
      value = entries[i];
      if (value[0] === 'netDataObserver') {
        // * Так как сбор полей идёт после создания netDataObserver, то его надо исключить
        continue;
      }
      fields.push(value[0]);
    }
    this.netDataObserver.addFields(this, fields);
  };
  _.nUpdateObserver = function() {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.check(this);
    if (this.netDataObserver.isDataChanged()) {
      this.nDataObserverHaveChanges();
      this.netDataObserver.refreshAll(this);
    }
  };
  // * Тут мы напрямую не отправляем данные, так как мы не знаем кому (Battler) мы принадлежим
  // * Ставится флаг в TRUE, и Battler сам отправить данные
  _.nDataObserverHaveChanges = function() {
    return this.isDataObserverHaveChanges = true;
  };
  _.getObserverDataForNetwork = function() {
    this.isDataObserverHaveChanges = false;
    return this.netDataObserver.getDataForNetwork(this);
  };
  _.applyObserverData = function(data) {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.setDataFromNetwork(this, data);
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(actorId) {
    ALIAS__setup.call(this, actorId);
    // * Чтобы refreshNetwork не вызывался когда ещё Actor не создан
    if (ANNetwork.isConnected()) {
      this.refreshNetworkDummy = this.refreshNetwork;
      if (ANET.PP.playerActorNameType() > 0) {
        this.nSetupPlayerActorName();
      }
    }
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshNetworkDummy();
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  // * Данный персонаж - мой сетевой персонаж (текущего игрока)
  _.isMyNetworkActor = function() {
    if ($gameTemp._nLocalActorMode === true) {
      // * Тут сделано разделение специально, чтобы уменьшить проблемы с LocalActor
      // * Суть в том, что при LocalActor могут отправляться данные всех персонажей,
      // * так как проверка через leader() обращается в Game_Actors, а ID всегда на
      // * своего персонажа (стоит Instance Mode, в этом ещё дело)
      // * Пока отключил передачу СВОИХ данных в режиме Local
      return false;
    }
    if ($gameParty.inBattle()) {
      return this.isMyNetworkBattler();
    } else {
      return this.actorId() === ANGameManager.myActorId();
    }
  };
  _.updateDataObserver = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this._updateDataObserver();
      } else {

      }
    } else {
      if (this.isMyNetworkActor()) {
        // * Если НЕ в бою, то проверка observer только свого персонажа
        // * Только приём данных
        this._updateDataObserver();
      }
    }
  };
  // * Отправка Observer только своего персонажа
  _.dataObserverHaveChanges = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this.requestNetBattleDataPush();
        // * Если только я в бою, то отправляю обычные данные
        // * Чтобы другие игроки видели HP и MP
        // TODO: Опция?
        if ($gameParty.isOneBattler()) {
          ANSyncDataManager.sendActorObserver();
        }
      }
    } else {
      // * Если не в бою, то только свои данные
      if (this.isMyNetworkActor()) {
        ANSyncDataManager.sendActorObserver();
      }
    }
  };
  
  //TODO: Может просто все все свойства передавать?
  // собрать их автоматически
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.ActorObserverFields);
  };
  //?{DYNAMIC}
  _.refreshNetworkDummy = function() {}; // * EMPTY
  _.refreshNetwork = function() {
    // * Тут нельзя делать проверку на текущих Actor или нет, так как вызывает Stack Overflow
    // * Метод refresh вызывается ещё до того как Actor создан (класс)
    // * Принудительная отправка
    if (!$gameParty.inBattle()) {
      this.dataObserverHaveChanges();
    }
  };
  // * Установить заместо имени (никнейма) персонажа имя сетевого игрока
  _.nSetupPlayerActorName = function() {
    var playerData;
    // * Устанавливаем только своему персонажу, так как myPlayerData есть в начале игры
    // * Данные других персонажей прийдут сами с Observer сразу
    if (this.actorId() !== ANGameManager.myActorId()) {
      return;
    }
    playerData = ANGameManager.myPlayerData();
    if (playerData == null) {
      return;
    }
    if (ANET.PP.playerActorNameType() === 1) {
      this._name = playerData.name;
    } else if (ANET.PP.playerActorNameType() === 2) {
      this._nickname = playerData.name;
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actors.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__actor, _;
  //@[DEFINES]
  _ = Game_Actors.prototype;
  //TODO: Есть проблемы у этого способа! Надо больше тестов
  //TODO: Добавить дополнительные проверки, так как слишком опасно
  //@[ALIAS]
  ALIAS__actor = _.actor;
  _.actor = function(actorId) {
    // * Возвращять текущего персонажа для выборки в событии
    // * Выборка LOCAL ACTOR работает только если указан Actor с ID = 1
    //TODO: Может это и не надо, но сделал для меньших проблем, так как метод опасно переопределять
    if (ANNetwork.isConnected() && $gameTemp._nLocalActorMode === true && actorId === 1) {
      if ($gameTemp._nNetworkActorPickRequest === true) {
        $gameTemp._nNetworkActorPickRequest = false;
        return ALIAS__actor.call(this, actorId);
      } else {
        return this._data[ANGameManager.myActorId()];
      }
    } else {
      return ALIAS__actor.call(this, actorId);
    }
  };
})();

// ■ END Game_Actors.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__onBattleEnd, ALIAS__onBattleStart, ALIAS__startDamagePopup, _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nInitializeNetwork();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    if (ANNetwork.isConnected()) {
      this._nStartBattleObserver();
    }
    return ALIAS__onBattleStart.call(this, ...arguments);
  };
  
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this._nEndBattleObserver();
    }
  };
  // * Отдельная реализация, чтобы передавать battleResult
  //@[ALIAS]
  ALIAS__startDamagePopup = _.startDamagePopup;
  _.startDamagePopup = function() {
    if (ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler()) {
      ANSyncDataManager.sendBattlerResultObserver(this);
      ANBattleManager.callBattleMethod(this, "startDamagePopup", null);
    }
    return ALIAS__startDamagePopup.call(this);
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  _.nInitializeNetwork = function() {
    this._nRegisterSyncBattleMethod("requestEffect");
    this._nRegisterSyncBattleMethod("requestMotion");
    this._nRegisterSyncBattleMethod("startWeaponAnimation");
    this._nRegisterSyncBattleMethod("setActionState");
    // * Sound effects
    this._nRegisterSyncBattleMethod("performDamage");
    this._nRegisterSyncBattleMethod("performCollapse");
    this._nRegisterSyncBattleMethod("performMiss");
    this._nRegisterSyncBattleMethod("performRecovery");
    this._nRegisterSyncBattleMethod("performEvasion");
    this._nRegisterSyncBattleMethod("performMagicEvasion");
    this._nRegisterSyncBattleMethod("performCounter");
    this._nRegisterSyncBattleMethod("performReflection");
  };
  // * Данный баттлер является моим (этого сетевого игрока)
  _.isMyNetworkBattler = function() {
    if (ANNetwork.isConnected()) {
      return this === $gameParty.leader();
    } else {
      return true;
    }
  };
  // * Подписать метод на синхронизацию через сервер
  _._nRegisterSyncBattleMethod = function(methodName) {
    var alias;
    alias = this[methodName];
    this[methodName] = function() {
      if (ANNetwork.isConnected() && ANGameManager.isBattleMaster()) {
        // * В данной реализации передаётся только один аргумент, так как ... перед arguments
        ANBattleManager.callBattleMethod(this, methodName, ...arguments);
      }
      return alias.call(this, ...arguments);
    };
  };
  _.isNeedNetPushBattleData = function() {
    return this._netBattleObserverNeedToPush === true;
  };
  _.onNetBattleDataPushed = function() {
    return this._netBattleObserverNeedToPush = null;
  };
  _.requestNetBattleDataPush = function() {
    return this._netBattleObserverNeedToPush = true;
  };
  (function() {    // * Специальный Data Observer для боя
    // -----------------------------------------------------------------------
    // * Данные только для боя (эти данные передаёт только Battle Master)
    _._nStartBattleObserver = function() {
      // * Включаем Instance режим
      //@netDataObserver.setInstanteMode()
      this.netDataObserver.setCheckInterval(ANET.PP.battleDataRefreshRate());
      this._addBattleFieldsToNetowrkDataObserver();
    };
    // * Добавляем дополнительные поля в Observer
    _._addBattleFieldsToNetowrkDataObserver = function() {
      this.netDataObserver.addFields(this, ANET.System.BattlerObserverFields);
    };
    // * После битвы нет необходимости хранить observer
    return _._nEndBattleObserver = function() {
      // * Возвращаем режим проверки
      this._applyDataObserverInitialParameters();
      // * Убираем добавленные для боя поля
      this.netDataObserver.removeFields(this, ANET.System.BattlerObserverFields);
    };
  })();
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__meetsItemConditions, ALIAS__onBattleEnd, ALIAS__onBattleStart, _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    ALIAS__onBattleStart.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setCheckMode();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setInstanteMode();
    }
  };
  //TEMP
  //TODO: Временное решение, так как нет проверки кто именно
  // * Так как вещи другого игрока нет в инвентаре мастера боя, то
  // * мы пропускаем проверку на наличие вещи в инвентаре $gameParty.hasItem(item)
  //@[ALIAS]
  ALIAS__meetsItemConditions = _.meetsItemConditions;
  _.meetsItemConditions = function(item) {
    if (ANNetwork.isConnected()) {
      return this.meetsUsableItemConditions(item);
    } else {
      return ALIAS__meetsItemConditions.call(this, item);
    }
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  // * Специальное представление данных для сети
  _.packForNetwork = function() {
    return ANET.Utils.packBattlerForNetwork(this);
  };
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this._applyDataObserverInitialParameters();
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    _._applyDataObserverInitialParameters = function() {
      // * Тут нужен Instante, чтобы данные на карте всегда были актуальны
      // * Если CheckMode, то при помощи событий можно менять параметры ХП
      // * всей группы и ХП других игроков будут отображаться не правильно
      this.netDataObserver.setInstanteMode();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
    };
    //TODO: Можно автоматически и удалять лишнее (см. Game_ActionResult)
    _._fillNetworkObserver = function() {
      this.netDataObserver.addFields(this, ["_hp", "_mp", "_tp", "_paramPlus", "_states", "_stateTurns", "_buffs", "_buffTurns"]);
    };
    //TODO: updateStateTurns и баффы не должны выполняться на фантоме (???)

    // * Этот метод должны вызывать потомки верхнего уровня, так как нету Update в этом классе
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANNetwork.isConnected()) {
      return this._updateDataObserver();
    }
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    //TODO: Добавить API для разработчиков плагинов вносить свои поля (и так со всем Observers)
    // * Движение передаётся отдельным методом для достижения плавности
    _._fillNetworkObserver = function() {
      return this.netDataObserver.addFields(this, ["_opacity", "_blendMode", "_walkAnime", "_stepAnime", "_directionFix", "_transparent", "_direction"]);
    };
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
  _.moveStraightFromServer = function(moveData) {
    // * Всегда успех, так как если нет, то данные и не прийдут от другого игрока
    this.setMovementSuccess(true);
    this.setDirection(moveData.direction);
    this._x = moveData.x;
    this._y = moveData.y;
    this._realX = moveData.realX;
    this._realY = moveData.realY;
    // * Чтобы синхронизировать правильно бег
    this._moveSpeed = moveData.moveSpeed;
    this.increaseSteps();
  };
  _.getMoveDataForNetwork = function() {
    return {
      direction: this._direction,
      moveSpeed: this.realMoveSpeed(),
      x: this.x,
      y: this.y,
      realX: this._realX,
      realY: this._realY
    };
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
  //TODO: Есть проблема, dead enemies не исчезают у второго игрока

  // * Дополнительные найстройки Observer для врагов
  _._addBattleFieldsToNetowrkDataObserver = function() {
    Game_Battler.prototype._addBattleFieldsToNetowrkDataObserver.call(this);
    // * Данные поля не нужны (наверное) врагам, так как не видно их полосу
    this.netDataObserver.removeFields(this, ["_tpbChargeTime"]);
  };
  // * Только мастер битвы может отправлять данные (вызывается из Scene_Battle)
  _.updateDataObserver = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this._updateDataObserver();
    }
  };
  _.dataObserverHaveChanges = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this.requestNetBattleDataPush();
    }
  };
  // * Добавляем свои поля
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.EnemyObserverFields);
  };
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  (function() {    // * Синхронизация движения
    // -----------------------------------------------------------------------
    var ALIAS__moveStraight, ALIAS__updateSelfMovement;
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(d) {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          // * Запоминаем предыдующие координаты (перед движением)
          this.___x = this.x;
          this.___y = this.y;
          // * Движение
          ALIAS__moveStraight.call(this, d);
          // * Если координаты сменились, значит персонаж
          // совершил движение, можно отправить на сервер
          if (this.___x !== this.x || this.___y !== this.y) {
            return ANMapManager.sendEventMove(this.eventId());
          }
        } else {

        }
      } else {
        // * SKIP MOVEMENT
        // * Движение событий выполняется только на мастере карты
        return ALIAS__moveStraight.call(this, d);
      }
    };
    
    //@[ALIAS]
    ALIAS__updateSelfMovement = _.updateSelfMovement;
    return _.updateSelfMovement = function() {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          return ALIAS__updateSelfMovement.call(this);
        } else {

        }
      } else {
        // * NOTHING
        // * Обновление движения события только на мастере карты
        return ALIAS__updateSelfMovement.call(this);
      }
    };
  })();
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.dataObserverHaveChanges = function() {
    if (ANGameManager.isMapMaster()) {
      ANSyncDataManager.sendEventObserver(this.eventId());
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
// * Если мы не отправляем данные Observer,
// * то check не будет работать, пока не сбросить флаг

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Followers.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isSomeoneCollided, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Followers.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    if (ANNetwork.isConnected()) {
      return this._data = [];
    } else {
      // * Нет последователей! Используется другой класс
      return ALIAS__setup.call(this);
    }
  };
  
  // * Учёт коллизий с сетевыми игроками при движении событий
  // * В этом методе, а не в NETCharactersGroup, чтобы было больше совместимости
  //@[ALIAS]
  ALIAS__isSomeoneCollided = _.isSomeoneCollided;
  _.isSomeoneCollided = function(x, y) {
    if (ANNetwork.isConnected()) {
      return $gameMap.netCharsIsSomeoneCollided(x, y);
    } else {
      return ALIAS__isSomeoneCollided.call(this, x, y);
    }
  };
})();

// ■ END Game_Followers.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  (function() {    // * Статус запуска события
    // -----------------------------------------------------------------------
    var ALIAS__clear, ALIAS__initialize, ALIAS__setup, ALIAS__update, ALIAS__updateWaitMode;
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(depth) {
      ALIAS__initialize.call(this, depth);
      this._nRunningCheckTimer = 0;
      // * Отключаем некоторые команды
      if (ANNetwork.isConnected()) {
        this.nDisableNotNetCommands();
      }
    };
    //@[ALIAS]
    ALIAS__setup = _.setup;
    _.setup = function(list, eventId) {
      ALIAS__setup.call(this, list, eventId);
      if (ANNetwork.isConnected()) {
        // * Сброс сетевой битвы, если началось другое событие
        BattleManager.nSetNetworkBattle(null);
        this.nCheckEventStartOptions();
        if (!this.isPassStartOptions()) { // * Проверка опций запуска события
          this._list = []; // * Не будет выполняться
        } else {
          ANInterpreterManager.sendEventStarted(eventId);
          if (this.nIsEventIsShared()) {
            this.nPrepareSharedEvent();
          }
          this.nClearFlags();
        }
      }
    };
    
    //@[ALIAS]
    ALIAS__clear = _.clear;
    _.clear = function() {
      ALIAS__clear.call(this);
      if (ANNetwork.isConnected()) {
        ANInterpreterManager.eventProcessExit();
        this.nClearFlags();
      }
    };
    //@[ALIAS]
    ALIAS__update = _.update;
    _.update = function() {
      ALIAS__update.call(this);
      if (ANNetwork.isConnected()) {
        this._nRunningCheckTimer++;
        if (this._nRunningCheckTimer >= 60) {
          ANInterpreterManager.checkEventRunning();
          this._nRunningCheckTimer = 0;
        }
      }
    };
    //@[ALIAS]
    ALIAS__updateWaitMode = _.updateWaitMode;
    return _.updateWaitMode = function() {
      if (this._waitMode === 'netPlayersPool') {
        return this.nUpdateWaitPlayersPool();
      } else if (this._waitMode === 'netNextCommand') {
        return this.nUpdateWaitServerNextCommandPermission();
      } else {
        return ALIAS__updateWaitMode.call(this);
      }
    };
  })();
  (function() {    // * Выполнение команд в сети
    // -----------------------------------------------------------------------
    var ALIAS__command108;
    //@[ALIAS, STORED]
    _.ALIAS__executeCommand = _.executeCommand;
    _.executeCommand = function() {
      if (ANNetwork.isConnected()) {
        if (this.nIsOptionsForCurrentCommand()) {
          return this.nProcessCommandWithOptions();
        }
      }
      return _.ALIAS__executeCommand.call(this);
    };
    //TODO: MV
    //@[ALIAS]
    ALIAS__command108 = _.command108;
    return _.command108 = function(params) {
      if (ANNetwork.isConnected()) {
        if (KDCore.isMV()) {
          params = this._params;
        }
        // * Проверить комментарий на наличие NET команд
        this._nCheckNetComment(params[0]);
      }
      return ALIAS__command108.call(this, params);
    };
  })();
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x1b34=['contains','_nSendCommandToServer','_nLocalActorMode','_nProcessCommandForAll','yYUEw','_index','isMasterClient','parameters','338473cmklkx','isPassStartOptions','isMyActorInValidListToStart','nClearCommandOptions','787537tJmpyi','sAWWB','HmqTH','PeRcB','ALIAS__executeCommand','_nSharedEventOuterStartFlag','142193rlSWQh','4751ByyjfX','isEventStartedByAny','_nProcessCommandForMaster','localActor','_nSkipCommand','xuqTJ','nIsLockedEvent','sendEventVirtualCommand','nIsOptionsForCurrentCommand','1CssZXC','95691CSRsHu','isHaveNetworkStartOptions','nSetCommandOptions','415316fcnQXZ','All','IvjMP','lockMode','CdpUI','207126yScWIZ','any','IkmvO','Master','iIcxR','forActors','!master','command','true','_nRunningCheckTimer','isPassEventFilterOptions','getNetCommentCommand','jooUc','System','CNTxq','_nOnNetCommand_ActorListSelectorEventCommand','nRequestMasterOnlyChoicesModeForNextChoice','choicesForMaster','_nCheckNetComment','N\x20wait\x20can\x20be\x20used\x20only\x20in\x20Shared\x20Events','KluBd','sYRLh','tvoXI','_nCommandOptionsRequested','eventId','nDisableNotNetCommands','nCheckEventStartOptionsFromCommentCommand','prototype','call','YqQyq','_nProcessCommandForActorsList','1OrlYgr','vyDlO','nCheckEventStartOptions','1zdtreW','119UhloYb','currentCommand','Me\x20Except','warn','uHxAO','start','Actor\x20List','rmtGw','actorList','nSetNetworkBattle','nStartOptions','isSharedEventIsRunning','wait','ForbiddenVirtualCommandsList','nIsEventIsShared','!forActors','BNFWy','_nOnNetCommand_SingleSelectorEventCommand','FANDx','WmxvX','code','all','KKksV','_nProcessCommandNotMe','nIsHaveCommandOptions','Utils','wMcUg','OWEdS','nCommandStartOptions','nClearFlags','RhsNn'];function a0_0x1b98(_0x53b7d7,_0x42ef26){_0x53b7d7=_0x53b7d7-0xd6;var _0x1b345c=a0_0x1b34[_0x53b7d7];return _0x1b345c;}(function(_0x535d83,_0x150aa0){var _0x28dbfc=a0_0x1b98;while(!![]){try{var _0x3742af=parseInt(_0x28dbfc(0x124))*parseInt(_0x28dbfc(0x138))+-parseInt(_0x28dbfc(0xfd))*parseInt(_0x28dbfc(0x12f))+-parseInt(_0x28dbfc(0x13c))+parseInt(_0x28dbfc(0xda))+parseInt(_0x28dbfc(0x139))+parseInt(_0x28dbfc(0xf9))*-parseInt(_0x28dbfc(0x12e))+parseInt(_0x28dbfc(0x128))*parseInt(_0x28dbfc(0xfc));if(_0x3742af===_0x150aa0)break;else _0x535d83['push'](_0x535d83['shift']());}catch(_0x4610aa){_0x535d83['push'](_0x535d83['shift']());}}}(a0_0x1b34,0x4ab1d),function(){var _0x4246d7=a0_0x1b98,_0x43054c;_0x43054c=Game_Interpreter[_0x4246d7(0xf5)],_0x43054c[_0x4246d7(0xf3)]=function(){var _0xa4d736,_0x219546,_0x2086ed,_0x395627,_0x59e42c;_0x219546=function(){var _0x2538e3=a0_0x1b98;return _0x43054c[_0x2538e3(0xe1)+_0xa4d736]=function(){return!![];};},_0x59e42c=[0x81,0xca,0xce,0xd8,0xd9,0x89];for(_0x2086ed=0x0,_0x395627=_0x59e42c['length'];_0x2086ed<_0x395627;_0x2086ed++){_0xa4d736=_0x59e42c[_0x2086ed],_0x219546(_0xa4d736);}},_0x43054c[_0x4246d7(0x115)]=function(){var _0x3f844d=_0x4246d7;return this['_nCommandOptionsRequested']===!![]&&this[_0x3f844d(0x119)]!=null;},_0x43054c[_0x4246d7(0x127)]=function(){var _0x2e45cc=_0x4246d7;if(_0x2e45cc(0xde)!==_0x2e45cc(0x11b))return this[_0x2e45cc(0xf1)]=![],this[_0x2e45cc(0x119)]=null;else{function _0x394af7(){_0x4edbe2=_0x5444a0[_0x1771cf],_0x16f60e(_0x7559da);}}},_0x43054c[_0x4246d7(0x13b)]=function(_0x35782e){var _0x3ba168=_0x4246d7;if('QvMGU'===_0x3ba168(0xe6)){function _0x35e79d(){return!![];}}else return this[_0x3ba168(0x119)]=_0x35782e,this['_nCommandOptionsRequested']=!![];},_0x43054c[_0x4246d7(0x137)]=function(){var _0x2f17b3=_0x4246d7;if(!this[_0x2f17b3(0x115)]()){if(_0x2f17b3(0x134)!==_0x2f17b3(0x134)){function _0x3b0640(){var _0x51ae70=_0x2f17b3;return this['_nCommandOptionsRequested']=![],this[_0x51ae70(0x119)]=null;}}else return![];}if(ANET['System'][_0x2f17b3(0x10a)]['contains'](this[_0x2f17b3(0xfe)]()[_0x2f17b3(0x111)]))return![];return!![];},_0x43054c['nProcessCommandWithOptions']=function(){var _0x48336d=_0x4246d7;if(_0x48336d(0x113)===_0x48336d(0x113)){var _0x21c0e9;try{this['_nCommandOptionsRequested']=![];switch(this[_0x48336d(0x119)]['whoSelector']){case _0x48336d(0xd6):return this[_0x48336d(0x11f)]();case _0x48336d(0xdd):return this['_nProcessCommandForMaster'](!![]);case'Master\x20Except':return this[_0x48336d(0x131)](![]);case _0x48336d(0x103):return this[_0x48336d(0xf8)](!![]);case'Actor\x20List\x20Except':return this[_0x48336d(0xf8)](![]);case _0x48336d(0xff):return this[_0x48336d(0x114)]();}}catch(_0x5a393e){if(_0x48336d(0xe8)===_0x48336d(0xf0)){function _0x5d4ddf(){var _0x3cb4f9=_0x48336d;return _0x2ef01e[_0x3cb4f9(0x12c)]['call'](this);}}else _0x21c0e9=_0x5a393e,ANET['w'](_0x21c0e9);}return _0x43054c[_0x48336d(0x12c)][_0x48336d(0xf6)](this);}else{function _0x1befa0(){var _0x4b6c34=_0x48336d;_0x1f92c1[_0x4b6c34(0x11e)]=![],this[_0x4b6c34(0xe3)]=0x0,this[_0x4b6c34(0x127)]();}}},_0x43054c['_nProcessCommandForAll']=function(){var _0x1c258d=_0x4246d7;return this['_nSendCommandToServer'](),_0x43054c[_0x1c258d(0x12c)][_0x1c258d(0xf6)](this);},_0x43054c[_0x4246d7(0x131)]=function(_0x312c4a){var _0x5054c7=_0x4246d7;if(ANNetwork[_0x5054c7(0x122)]()===_0x312c4a)return _0x43054c['ALIAS__executeCommand'][_0x5054c7(0xf6)](this);else{if('YqQyq'===_0x5054c7(0xf7))return this[_0x5054c7(0x11d)](),this['_nSkipCommand']();else{function _0x2f77fd(){var _0x22461d=_0x5054c7;if(!this[_0x22461d(0x13a)]())return!![];if(this[_0x22461d(0x135)]()){if(_0x12efb5[_0x22461d(0x116)][_0x22461d(0x130)](this[_0x22461d(0xf2)]()))return![];}return _0x3ed9fb[_0x22461d(0x116)][_0x22461d(0xe4)](this[_0x22461d(0x107)]);}}}},_0x43054c[_0x4246d7(0xf8)]=function(_0x3d375c){var _0x48724d=_0x4246d7;this[_0x48724d(0x11d)]();if(ANET[_0x48724d(0x116)][_0x48724d(0x126)](this[_0x48724d(0x119)][_0x48724d(0x105)],_0x3d375c))return _0x43054c['ALIAS__executeCommand'][_0x48724d(0xf6)](this);else{if(_0x48724d(0x10f)===_0x48724d(0xd9)){function _0x2bf424(){var _0x255649=_0x48724d;return this[_0x255649(0x119)]=_0x2aa859,this['_nCommandOptionsRequested']=!![];}}else return this[_0x48724d(0x133)]();}},_0x43054c['_nProcessCommandNotMe']=function(){var _0x3d23ab=_0x4246d7;return this[_0x3d23ab(0x11d)](),this[_0x3d23ab(0x133)]();},_0x43054c[_0x4246d7(0x133)]=function(){var _0x4a9833=_0x4246d7;if(_0x4a9833(0xd7)===_0x4a9833(0x118)){function _0x5a43f9(){var _0x382f75=_0x4a9833;_0xe9ca1b=_0x338baa,_0xea8d01['w'](_0x5dddb7),this[_0x382f75(0x107)]=null;}}else return this[_0x4a9833(0x121)]++,this['nClearCommandOptions'](),!![];},_0x43054c[_0x4246d7(0x11d)]=function(){var _0x34e1c5=_0x4246d7;if('QKqVB'!=='gPOIa')ANInterpreterManager[_0x34e1c5(0x136)](this['currentCommand'](),this[_0x34e1c5(0x119)],this['eventId']());else{function _0x5d856e(){var _0x20e5ae=_0x34e1c5;!_0x38efd4[_0x20e5ae(0xdb)](_0x5e5684)&&(_0x119c50=null),_0x22169e[_0x20e5ae(0x106)](_0x25d9c7);}}},_0x43054c[_0x4246d7(0xec)]=function(_0x1c20e3){var _0x41bc97=_0x4246d7,_0x330131;_0x330131=ANET['Utils'][_0x41bc97(0xe5)](_0x1c20e3);if(!String[_0x41bc97(0xdb)](_0x330131)){if(_0x41bc97(0x12b)===_0x41bc97(0xef)){function _0xe68456(){var _0x2df7d5=_0x41bc97;return this[_0x2df7d5(0x107)]!=null;}}else return;}switch(_0x330131){case _0x41bc97(0x132):this['_nOnNetCommand_LocalActor'](_0x1c20e3);break;case _0x41bc97(0x112):this[_0x41bc97(0x10e)](_0x41bc97(0xd6),_0x1c20e3);break;case'!me':this[_0x41bc97(0x10e)](_0x41bc97(0xff),_0x1c20e3);break;case'master':this[_0x41bc97(0x10e)](_0x41bc97(0xdd),_0x1c20e3);break;case _0x41bc97(0xe0):this[_0x41bc97(0x10e)]('Master\x20Except',_0x1c20e3);break;case _0x41bc97(0xdf):this[_0x41bc97(0xe9)](_0x1c20e3,!![]);break;case _0x41bc97(0x10c):this['_nOnNetCommand_ActorListSelectorEventCommand'](_0x1c20e3,![]);break;case _0x41bc97(0x109):if(ANInterpreterManager[_0x41bc97(0x108)]()){if(_0x41bc97(0xfa)!==_0x41bc97(0xfa)){function _0x2775e3(){var _0x9057b=_0x41bc97;return _0x21dd9e[_0x9057b(0xe1)+_0x4fa429]=function(){return!![];};}}else this['nRequestSyncedNextEventCommand']();}else console[_0x41bc97(0x100)](_0x41bc97(0xed));break;case _0x41bc97(0xeb):if(ANInterpreterManager[_0x41bc97(0x108)]())this[_0x41bc97(0xea)]();else{if(_0x41bc97(0x101)===_0x41bc97(0x129)){function _0x126bbe(){var _0x3f18c2=_0x41bc97;return this['_nCommandOptionsRequested']===!![]&&this[_0x3f18c2(0x119)]!=null;}}else console[_0x41bc97(0x100)]('N\x20choicesForMaster\x20can\x20be\x20used\x20only\x20in\x20Shared\x20Events');}break;case _0x41bc97(0x102):break;default:console[_0x41bc97(0x100)]('Unknown\x20NET\x20Comment\x20command\x20'+_0x330131);}},_0x43054c['nSetSharedBattle']=function(_0xc74af1){var _0x1e3590=_0x4246d7;if('WmxvX'!==_0x1e3590(0x110)){function _0x4491c4(){var _0x3595a5=_0x1e3590;if(_0x407b03[_0x3595a5(0x116)][_0x3595a5(0x130)](this['eventId']()))return![];}}else{if(!String[_0x1e3590(0xdb)](_0xc74af1)){if(_0x1e3590(0x12a)===_0x1e3590(0x12a))_0xc74af1=null;else{function _0x2d6cec(){var _0x4dcb1b=_0x1e3590;this[_0x4dcb1b(0x107)]=_0x299372[_0x4dcb1b(0x123)][0x3];}}}BattleManager[_0x1e3590(0x106)](_0xc74af1);}},_0x43054c[_0x4246d7(0x11a)]=function(){var _0x1c2acf=_0x4246d7;$gameTemp[_0x1c2acf(0x11e)]=![],this[_0x1c2acf(0xe3)]=0x0,this[_0x1c2acf(0x127)]();},function(){var _0x33aea7=_0x4246d7;return _0x43054c['isHaveNetworkStartOptions']=function(){var _0x399ca1=a0_0x1b98;return this[_0x399ca1(0x107)]!=null;},_0x43054c[_0x33aea7(0x125)]=function(){var _0x4c4daf=_0x33aea7;if('rmtGw'!==_0x4c4daf(0x104)){function _0x40189f(){var _0x4d0509=_0x4c4daf;if(!this[_0x4d0509(0x115)]())return![];if(_0x55f70e[_0x4d0509(0xe7)][_0x4d0509(0x10a)][_0x4d0509(0x11c)](this[_0x4d0509(0xfe)]()['code']))return![];return!![];}}else{if(this[_0x4c4daf(0x10b)]()&&$gameTemp[_0x4c4daf(0x12d)]===!![])return!![];else{if(!this[_0x4c4daf(0x13a)]())return!![];if(this[_0x4c4daf(0x135)]()){if(ANET[_0x4c4daf(0x116)][_0x4c4daf(0x130)](this[_0x4c4daf(0xf2)]()))return![];}return ANET[_0x4c4daf(0x116)]['isPassEventFilterOptions'](this[_0x4c4daf(0x107)]);}}},_0x43054c['nIsLockedEvent']=function(){var _0x1ddd03=_0x33aea7;if(_0x1ddd03(0x117)!==_0x1ddd03(0xdc)){var _0x5ac66d;return this[_0x1ddd03(0xf2)]()>0x0&&((_0x5ac66d=this['nStartOptions'])!=null?_0x5ac66d[_0x1ddd03(0xd8)]:void 0x0)===_0x1ddd03(0xe2);}else{function _0x152997(){var _0x2367c5=_0x1ddd03;return this[_0x2367c5(0x133)]();}}},_0x43054c[_0x33aea7(0xfb)]=function(){var _0x1d0ce9=_0x33aea7;if(_0x1d0ce9(0xee)===_0x1d0ce9(0x10d)){function _0xbd50bd(){var _0x127c94=_0x1d0ce9;return this[_0x127c94(0x11d)](),_0x3e2ff8[_0x127c94(0x12c)][_0x127c94(0xf6)](this);}}else{var _0x1138d5,_0x4861ca,_0x5013ce;this[_0x1d0ce9(0x107)]=null;try{_0x4861ca=(_0x5013ce=this['_list'])!=null?_0x5013ce['find'](function(_0x4263fd){var _0x2ec4c2=_0x1d0ce9,_0xf3a1ef;return _0x4263fd[_0x2ec4c2(0x111)]===0x165&&((_0xf3a1ef=_0x4263fd[_0x2ec4c2(0x123)])!=null?_0xf3a1ef[0x1]:void 0x0)==='EventStartOptions';}):void 0x0;if(_0x4861ca!=null)this[_0x1d0ce9(0x107)]=_0x4861ca[_0x1d0ce9(0x123)][0x3];else{if(_0x1d0ce9(0x120)===_0x1d0ce9(0x120))this['nCheckEventStartOptionsFromCommentCommand']();else{function _0x26a4bf(){var _0x531d6f=_0x1d0ce9;this[_0x531d6f(0xf4)]();}}}}catch(_0xf35cfe){_0x1138d5=_0xf35cfe,ANET['w'](_0x1138d5),this[_0x1d0ce9(0x107)]=null;}}};}();}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  // * Обработка комманд из комментариев (алтернатива командам плагинов)

  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //input: "N localActor" | "N localActor end"
  _._nOnNetCommand_LocalActor = function(commentLine) {
    if (commentLine.contains("end")) {
      $gameTemp._nLocalActorMode = false;
    } else {
      $gameTemp._nLocalActorMode = true;
    }
  };
  
  //input: "N (selector)" | "N (selector) [scope]" | "N (selector) [scope] [mode]"
  //selcetor: all, !me, master, !master
  //scope: world, mode: virtual
  _._nOnNetCommand_SingleSelectorEventCommand = function(selector, commentLine) {
    var mode, scope;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    this._nSetAnyEventCommandOptions(selector, "[]", scope, mode);
  };
  // * Установить опции команды события для следующей комманды
  _._nSetAnyEventCommandOptions = function(selector, list, scope, mode) {
    var options;
    if (!String.any(scope)) {
      // * Стандартные значения из команды плагина
      scope = "Same map";
    }
    if (!String.any(mode)) {
      mode = "Auto";
    }
    options = ANET.Utils.buildEventCommandOptions(selector, list, scope, mode);
    this.nSetCommandOptions(options);
  };
  _._nOnNetCommand_ActorListSelectorEventCommand = function(commentLine, isInclude) {
    var list, mode, scope, selector;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    list = ANET.Utils.extractActorsListFromComment(commentLine);
    selector = "Actor List";
    if (!isInclude) {
      selector += " Except";
    }
    this._nSetAnyEventCommandOptions(selector, list, scope, mode);
  };
  // * Есть ли опции (условия) запуска события для сети (проверка команды - комментария)
  _.nCheckEventStartOptionsFromCommentCommand = function() {
    var commentLine;
    if (this._list == null) {
      return;
    }
    commentLine = KDCore.Utils.getEventCommentValue("N start", this._list);
    if (commentLine == null) {
      return;
    }
    this.nStartOptions = ANET.Utils.parseEventStartOptionsFromCommentLine(commentLine);
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0xc37b=['dlCLQ','nIsEventIsShared','5262FsZfkj','tCCKz','nOnSyncedEventCommandResponse','_nRepeatAnswerToServerTimer','nStartOptions','reset','hideWaitPlayersOnSharedEvent','JaQRs','hRTgp','isReady','onAnswer','index','7385428bfpVlY','dVdcY','nRequireChoiceOnlyForMaster','HXOvq','resetSharedEvent','nRequestSyncedNextEventCommand','nSyncWaitCommandData','nAllowContinueSharedEvent','indent','pDPys','contains','isCancel','MyMKv','XVXAe','nPlayerPool','1137211TMpoQf','QdFfe','nSetWaitStartNextCommandFromServer','nRequestMasterOnlyChoicesModeForNextChoice','nPrepareSharedEvent','49VyNAMd','1xXsESb','CNqRs','sharedMode','nKRXL','jFOFb','_indent','OUUTER\x20START','hTOer','PLAYER\x20ANSWER\x20','2bUjSDJ','nSetWaitPlayerPool','32443lqXscl','PREPARE\x20SHARED\x20MOD','9mAvgwx','isSinglePool','WBPbZ','nClearSharedSyncEventCommandWait','netPlayersPool','WwrNs','Shared\x20Event\x20Choices\x20in\x20Master\x20only\x20mode','1345208ozRHxH','forceCancelSharedEvent','Strict','register','493529uStEsL','lBGhM','isHaveNetworkStartOptions','_waitMode','setupSharedInterpreter','EfTEy','showWaitPlayersOnSharedEvent','1478993RgcDvT','_eventId','netNextCommand','_index','STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20READY','nIsEventIsSharedAndStrict','terminate','nUpdateWaitServerNextCommandPermission','_nSharedEventOuterStartFlag','clear','AEJSc','WAIT\x20SERVER\x20FOR\x20NEXT\x20COMMAND','isSharedEventMaster','UfQqR','_canContinueSharedEvent','STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20CANCELED!','sendSharedEventReadyToContinue','wdqnE'];function a0_0x3e40(_0xd4471c,_0x3cdf2c){_0xd4471c=_0xd4471c-0x6d;var _0xc37b=a0_0xc37b[_0xd4471c];return _0xc37b;}(function(_0x21356d,_0x3cb1a1){var _0x399eff=a0_0x3e40;while(!![]){try{var _0x3aee40=-parseInt(_0x399eff(0x90))+parseInt(_0x399eff(0x89))*-parseInt(_0x399eff(0xaf))+parseInt(_0x399eff(0x7c))*-parseInt(_0x399eff(0x76))+-parseInt(_0x399eff(0x9b))+-parseInt(_0x399eff(0x85))*parseInt(_0x399eff(0x94))+-parseInt(_0x399eff(0x87))*parseInt(_0x399eff(0x7b))+parseInt(_0x399eff(0xbb));if(_0x3aee40===_0x3cb1a1)break;else _0x21356d['push'](_0x21356d['shift']());}catch(_0x1da733){_0x21356d['push'](_0x21356d['shift']());}}}(a0_0xc37b,0xc3495),function(){var _0x537d7f=a0_0x3e40,_0xee11f4;_0xee11f4=Game_Interpreter['prototype'],_0xee11f4['nIsEventIsShared']=function(){var _0x7d933a=a0_0x3e40,_0x39a6bd;try{return this[_0x7d933a(0x96)]()&&this[_0x7d933a(0xb3)]['sharedMode']!=='No';}catch(_0x2a3be7){return _0x39a6bd=_0x2a3be7,ANET['w'](_0x39a6bd),![];}},_0xee11f4['nIsEventIsSharedAndStrict']=function(){var _0x3f9264=a0_0x3e40,_0x2cc3b3,_0x5df4ee;try{if(_0x3f9264(0xb6)!==_0x3f9264(0x73))return this[_0x3f9264(0xae)]()&&((_0x5df4ee=this[_0x3f9264(0xb3)]['sharedMode'])!=null?_0x5df4ee[_0x3f9264(0x71)](_0x3f9264(0x92)):void 0x0);else{function _0x30558c(){return;}}}catch(_0x1368a4){if(_0x3f9264(0x8e)!=='WwrNs'){function _0x15ddd7(){var _0xa5c218=_0x3f9264;if(this[_0xa5c218(0x97)]!==_0xa5c218(0x9d))return;this[_0xa5c218(0xa9)]=!![],this['_nRepeatAnswerToServerTimer']=-0x1,_0x130a6b[_0xa5c218(0xb5)]();}}else return _0x2cc3b3=_0x1368a4,ANET['w'](_0x2cc3b3),![];}},_0xee11f4['nIsSharedEventCanBeForceCancelled']=function(){var _0x544a61=a0_0x3e40;return!this[_0x544a61(0xa0)]()&&this[_0x544a61(0x6d)]['index']===0x0;},_0xee11f4[_0x537d7f(0x7a)]=function(){var _0x1a784d=_0x537d7f;ANInterpreterManager[_0x1a784d(0xbf)](),_0x1a784d(0x88)['p'](this[_0x1a784d(0x9c)]),$gameTemp['_nSharedEventOuterStartFlag']==null?(this[_0x1a784d(0x75)]=null,ANInterpreterManager[_0x1a784d(0x98)](this,!![]),this['nRequestSyncedNextEventCommand']()):(_0x1a784d(0x82)['p'](),$gameTemp['_nSharedEventOuterStartFlag']=null,ANInterpreterManager[_0x1a784d(0x98)](this,![]),this[_0x1a784d(0xc0)]());},_0xee11f4['nIsSharedEventWaitPoolCancelled']=function(){var _0x51c8a6=_0x537d7f,_0x5c9428;try{if(!this['nIsSharedEventCanBeForceCancelled']()){if(_0x51c8a6(0x99)==='EfTEy')return;else{function _0x5f3e07(){var _0x185b79=_0x51c8a6;_0x57b3d5[_0x185b79(0xbf)](),'PREPARE\x20SHARED\x20MOD'['p'](this[_0x185b79(0x9c)]),_0x3a2940[_0x185b79(0xa3)]==null?(this[_0x185b79(0x75)]=null,_0x211289[_0x185b79(0x98)](this,!![]),this[_0x185b79(0xc0)]()):('OUUTER\x20START'['p'](),_0x44cf9a[_0x185b79(0xa3)]=null,_0x4fb922[_0x185b79(0x98)](this,![]),this[_0x185b79(0xc0)]());}}}if(Input[_0x51c8a6(0x72)]())return Input[_0x51c8a6(0xa4)](),ANInterpreterManager[_0x51c8a6(0x91)](),this[_0x51c8a6(0xa1)](),!![];}catch(_0x1fabc9){if(_0x51c8a6(0xbc)==='LuEGB'){function _0x50932b(){return _0xf31799=_0x5c82c7,_0x1be301['w'](_0x4f3ece),![];}}else _0x5c9428=_0x1fabc9,ANET['w'](_0x5c9428);}return![];},_0xee11f4[_0x537d7f(0xc0)]=function(){var _0x136a5d=_0x537d7f;this[_0x136a5d(0x6d)]={'index':this[_0x136a5d(0x9e)],'indent':this[_0x136a5d(0x81)]},ANInterpreterManager['isSharedEventMaster']()?this['nSetWaitPlayerPool']():this[_0x136a5d(0x78)](),ANInterpreterManager[_0x136a5d(0x9a)]();},_0xee11f4[_0x537d7f(0xb1)]=function(_0x2e1ff5,_0x3fc990,_0x49578f){var _0x13f690=_0x537d7f;if(_0x13f690(0x74)===_0x13f690(0x70)){function _0x4a4b11(){var _0x28aa20=_0x13f690;this[_0x28aa20(0x86)]();}}else{var _0x35b5e8;try{if(this[_0x13f690(0x6d)]==null)return;if(this[_0x13f690(0x75)]==null){if(_0x13f690(0xb7)!==_0x13f690(0xb7)){function _0x103eff(){return _0x1a6d1e=_0x28a9bc,_0x49f343['w'](_0x56899e),![];}}else return;}if(this[_0x13f690(0x6d)][_0x13f690(0xba)]===_0x2e1ff5&&this[_0x13f690(0x6d)][_0x13f690(0x6f)]===_0x3fc990){if('xWlxt'!==_0x13f690(0x7d))return _0x13f690(0x84)['p'](_0x49578f),this[_0x13f690(0x75)][_0x13f690(0xb9)](_0x49578f);else{function _0x59c895(){var _0x8ae2bd=_0x13f690,_0x2840fd;try{return this[_0x8ae2bd(0x96)]()&&this[_0x8ae2bd(0xb3)][_0x8ae2bd(0x7e)]!=='No';}catch(_0x21029e){return _0x2840fd=_0x21029e,_0x18abf3['w'](_0x2840fd),![];}}}}}catch(_0x384ee5){if(_0x13f690(0x8b)!==_0x13f690(0x77))_0x35b5e8=_0x384ee5,ANET['w'](_0x35b5e8);else{function _0x5e8dea(){var _0x7c9527=_0x13f690;return'PLAYER\x20ANSWER\x20'['p'](_0x4d3c3d),this[_0x7c9527(0x75)]['onAnswer'](_0x5cebdd);}}}}},_0xee11f4[_0x537d7f(0x86)]=function(){var _0x294f5a=_0x537d7f;'START\x20POOL'['p']();if(this[_0x294f5a(0x75)]==null)this[_0x294f5a(0x75)]=new PlayersWaitPool();else{if(_0x294f5a(0xad)===_0x294f5a(0xad))this[_0x294f5a(0x75)][_0x294f5a(0xb4)]();else{function _0x45436d(){var _0x1f1f01=_0x294f5a;'STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20READY'['p'](),_0x1d134a[_0x1f1f01(0xab)](),_0x40195f[_0x1f1f01(0xb5)](),this[_0x1f1f01(0x8c)](),this[_0x1f1f01(0x97)]='';}}}this[_0x294f5a(0x75)][_0x294f5a(0x93)](),this[_0x294f5a(0x97)]=_0x294f5a(0x8d);},_0xee11f4['nUpdateWaitPlayersPool']=function(){var _0xf622df=_0x537d7f,_0x3a5ccf;this[_0xf622df(0x75)]['update']();if(this['nIsSharedEventWaitPoolCancelled']())return _0xf622df(0xaa)['p'](),!![];_0x3a5ccf=!this['nPlayerPool'][_0xf622df(0xb8)]();if(!_0x3a5ccf){if(_0xf622df(0xbe)===_0xf622df(0xbe))_0xf622df(0x9f)['p'](),ANInterpreterManager[_0xf622df(0xab)](),ANInterpreterManager['hideWaitPlayersOnSharedEvent'](),this['nClearSharedSyncEventCommandWait'](),this[_0xf622df(0x97)]='';else{function _0x31b3f5(){var _0x37fd1b=_0xf622df;this['_nRepeatAnswerToServerTimer']--,this[_0x37fd1b(0xb2)]===0x0&&this[_0x37fd1b(0x78)]();}}}return _0x3a5ccf;},_0xee11f4[_0x537d7f(0x8c)]=function(){this['nSyncWaitCommandData']=null;},_0xee11f4[_0x537d7f(0x78)]=function(){var _0x33cc5f=_0x537d7f;if(_0x33cc5f(0x7f)!==_0x33cc5f(0xa8))this[_0x33cc5f(0xa9)]=![],ANInterpreterManager['sendSharedEventRegisteredDone'](),_0x33cc5f(0xa6)['p'](),this['_nRepeatAnswerToServerTimer']=0x3c,this[_0x33cc5f(0x97)]=_0x33cc5f(0x9d);else{function _0x49581e(){return'STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20CANCELED!'['p'](),!![];}}},_0xee11f4[_0x537d7f(0xa2)]=function(){var _0x58ccbf=_0x537d7f,_0x4f50c9;if($gameTemp['_shouldForceExitSharedEvent']===!![])return this[_0x58ccbf(0xa1)](),!![];_0x4f50c9=!this[_0x58ccbf(0xa9)];if(!_0x4f50c9)'CAN\x20PROCESS\x20TO\x20NEXT\x20COMMAND'['p'](),this['_waitMode']='';else{if(this[_0x58ccbf(0xb2)]>=0x0){if(_0x58ccbf(0xac)===_0x58ccbf(0x95)){function _0x1eef3f(){var _0x37f4c8=_0x58ccbf;_0x37f4c8(0x82)['p'](),_0x151799[_0x37f4c8(0xa3)]=null,_0x18e1ee['setupSharedInterpreter'](this,![]),this[_0x37f4c8(0xc0)]();}}else this['_nRepeatAnswerToServerTimer']--,this['_nRepeatAnswerToServerTimer']===0x0&&this[_0x58ccbf(0x78)]();}}return!![];},_0xee11f4[_0x537d7f(0x6e)]=function(){var _0x5a5643=_0x537d7f;if(_0x5a5643(0x80)===_0x5a5643(0x83)){function _0x579d84(){var _0x40ee4a=_0x5a5643;this[_0x40ee4a(0x6d)]={'index':this[_0x40ee4a(0x9e)],'indent':this[_0x40ee4a(0x81)]},_0xd64b7e[_0x40ee4a(0xa7)]()?this[_0x40ee4a(0x86)]():this[_0x40ee4a(0x78)](),_0x421aca['showWaitPlayersOnSharedEvent']();}}else{if(this[_0x5a5643(0x97)]!=='netNextCommand')return;this[_0x5a5643(0xa9)]=!![],this[_0x5a5643(0xb2)]=-0x1,ANInterpreterManager[_0x5a5643(0xb5)]();}},_0xee11f4[_0x537d7f(0x79)]=function(){var _0x4c2455=_0x537d7f;if(_0x4c2455(0xa5)===_0x4c2455(0xa5)){if(this[_0x4c2455(0x75)]!=null&&this['nPlayerPool'][_0x4c2455(0x8a)]()){if(_0x4c2455(0xb0)==='duzJl'){function _0x5cc17a(){_0x45f240=_0x543b24,_0x335dc4['w'](_0x5516af);}}else return;}_0x4c2455(0x8f)['p'](),$gameTemp[_0x4c2455(0xbd)]=!![];}else{function _0x5b0409(){var _0x4e4c05=_0x4c2455,_0x1c2de1,_0x2f08cb;try{return this[_0x4e4c05(0xae)]()&&((_0x2f08cb=this[_0x4e4c05(0xb3)][_0x4e4c05(0x7e)])!=null?_0x2f08cb[_0x4e4c05(0x71)](_0x4e4c05(0x92)):void 0x0);}catch(_0x30476a){return _0x1c2de1=_0x30476a,_0x337129['w'](_0x1c2de1),![];}}}};}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__refresh, ALIAS__setup, ALIAS__setupStartingEvent, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this._networkCharacters = new NETCharactersGroup();
  };
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    ALIAS__setup.call(this, mapId);
    if (ANNetwork.isConnected()) {
      // * Клиент переходит на новую карту
      ANGameManager.onNewGameMapSetup();
      this.setupNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      return this.updateNetwork();
    }
  };
  
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    if (ANNetwork.isConnected()) {
      return this.refreshNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__setupStartingEvent = _.setupStartingEvent;
  _.setupStartingEvent = function() {
    if (ANNetwork.isConnected()) {
      if ($gameTemp.isNetworkSharedEventReserved()) {
        return this.nSetupNetworkSharedEvent();
      }
    }
    return ALIAS__setupStartingEvent.call(this);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  // * Безопасное обновление карты, так как может вызываться когда пришли данные игроков (на любой сцене в любой момент)
  _.nSafeRefresh = function() {
    var e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (typeof $dataMap === "undefined" || $dataMap === null) {
        return;
      }
      this.refresh();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.netCharsIsSomeoneCollided = function(x, y) {
    return this._networkCharacters.isSomeoneCollided(x, y);
  };
  _.netChars = function() {
    return this._networkCharacters.characters();
  };
  _.networkCharacterById = function(id) {
    return this._networkCharacters.characterById(id);
  };
  // * Инициализация персонажей отображаемых на карте
  _.setupNetworkCharacters = function() {
    return this._networkCharacters.setup();
  };
  _.updateNetwork = function() {
    return this._networkCharacters.update();
  };
  _.refreshNetworkCharacters = function() {
    return this._networkCharacters.refresh();
  };
  // * Запуск общего события (которое пришло от сервера)
  _.nSetupNetworkSharedEvent = function() {
    var e, event;
    try {
      event = this.event($gameTemp.retrieveNetworkSharedEvent());
      if (event == null) {
        return false;
      }
      $gameTemp._nSharedEventOuterStartFlag = true;
      event.start();
      return true;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
    return false;
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__clear, _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (ANNetwork.isConnected()) {
      return this.nEndCallback();
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  _.nSetEndCallback = function(_nEndCallbackMethod) {
    this._nEndCallbackMethod = _nEndCallbackMethod;
  };
  _.nEndCallback = function() {
    if (this._nEndCallbackMethod != null) {
      this._nEndCallbackMethod();
      this._nEndCallbackMethod = null;
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__battleMembers, ALIAS__leader, ALIAS__setupStartingMembers, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__battleMembers = _.battleMembers;
  _.battleMembers = function() {
    if (ANNetwork.isConnected()) {
      return ANBattleManager.battleMembers();
    } else {
      return ALIAS__battleMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__setupStartingMembers = _.setupStartingMembers;
  _.setupStartingMembers = function() {
    if (ANNetwork.isConnected()) {
      // * Нет начальной группы
      this._actors = [];
    } else {
      ALIAS__setupStartingMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__leader = _.leader;
  _.leader = function() {
    if (ANNetwork.isConnected()) {
      return this.networkLeader();
    } else {
      return ALIAS__leader.call(this);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.setupNetworkGame = function() {};
  // * В бою участвует только один персонаж?
  _.isOneBattler = function() {
    return this.battleMembers().length <= 1;
  };
  //TODO: как задать после выбора персонажа, чтобы каждый раз не вычислять
  _.networkLeader = function() {
    var actorId;
    actorId = ANGameManager.myPlayerData().actorId;
    return $gameActors.actor(actorId);
  };
  //TODO: Есть метод onRefreshGameParty (в ANGameManager) -> путаница может быть
  // * Этот метод вызывается когда группа была изменена (кто-то отключился)
  _.nRefreshNetworkActors = function() {
    var actor, e, i, id, len, playerForActor, ref;
    try {
      ref = this.members();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        id = actor.actorId();
        // * Ищем игрока для каждого Actor
        playerForActor = ANGameManager.playersData.find(function(pl) {
          return pl.actorId === id;
        });
        // * Если нету больше игрока с таким Actor, удаляем из партии
        if (playerForActor == null) {
          this.removeActor(id);
          ANGameManager.anotherPlayerLeaveGame(id);
        }
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------
//TODO: Возможно это и на сцену битвы надо? (или там по другому работает)

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__moveStraight = _.moveStraight;
  _.moveStraight = function(d) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveStraight.call(this, d);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        return ANPlayersManager.sendPlayerMove();
      }
    } else {
      return ALIAS__moveStraight.call(this, d);
    }
  };
  
  //@[ALIAS]
  ALIAS__moveDiagonally = _.moveDiagonally;
  _.moveDiagonally = function(horz, vert) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveDiagonally.call(this, horz, vert);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        ANPlayersManager.sendPlayerMove();
      }
    } else {
      ALIAS__moveDiagonally.call(this, horz, vert);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      return this.updateNetwork();
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.dataObserverHaveChanges = function() {
    return ANSyncDataManager.sendPlayerObserver();
  };
  _.updateNetwork = function() {
    var ref;
    if ($gameParty.isEmpty()) {
      return;
    }
    // * Проверяем и обновляем DataObserver своего персонажа
    // * Тут этот ? (првоерка Null) нужна!
    return (ref = $gameParty.leader()) != null ? ref.updateDataObserver() : void 0;
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(switchId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, switchId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalSwitch(switchId)) {
          ANSyncDataManager.sendGlobalSwitchChange(switchId, this.value(switchId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, switchId, value);
    }
  };
  
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  _.isGlobalSwitch = function(switchId) {
    return ANET.PP.globalSwitchesIds().contains(switchId);
  };
  _.onSwitchFromServer = function(switchId, value) {
    this._data[switchId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  // * Инициализация набора общих событий для команд пользователя
  _.nInitCustomCommandsCE = function() {
    if (this.nCustomCommandsCE == null) {
      return this.nCustomCommandsCE = {};
    }
  };
  // * Проверка, есть ли для кастомной команды общее событие (и запуск если есть)
  _.nCheckCustomCommandForCEStart = function(name) {
    var ceId, e;
    try {
      this.nInitCustomCommandsCE();
      ceId = this.nCustomCommandsCE[name];
      if ((ceId != null) && ceId > 0) {
        $gameTemp.reserveCommonEvent(ceId);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Зарегестрировать вызов общего события для кастомной команды
  _.nRegisterCustomCommandCE = function(name, ceId) {
    var e;
    try {
      this.nInitCustomCommandsCE();
      this.nCustomCommandsCE[name] = ceId;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCommonEventReserved, ALIAS__requestAnimation, ALIAS__retrieveCommonEvent, _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    // * Виртуальные общие события от сервера
    this._virtualEventQueue = [];
  };
  
  //@[ALIAS]
  ALIAS__isCommonEventReserved = _.isCommonEventReserved;
  _.isCommonEventReserved = function() {
    return this.isVirtualCommonEventReserved() || ALIAS__isCommonEventReserved.call(this);
  };
  
  // * Виртуальные события в приоритете
  //@[ALIAS]
  ALIAS__retrieveCommonEvent = _.retrieveCommonEvent;
  _.retrieveCommonEvent = function() {
    if (this.isVirtualCommonEventReserved()) {
      return this._virtualEventQueue.shift();
    } else {
      return ALIAS__retrieveCommonEvent.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__requestAnimation = _.requestAnimation;
  _.requestAnimation = function() {
    if (ANNetwork.isConnected()) {
      // * В бою анимацию синхронизируется (только мастер)(отправляется другим игрокам)
      if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
        ANBattleManager.requestAnimation(...arguments);
      }
    }
    return ALIAS__requestAnimation.call(this, ...arguments);
  };
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  (function() {    // * Virtual Common Events
    // -----------------------------------------------------------------------
    _.reserveNetworkSharedEvent = function(_reservedNetworkSharedEvent) {
      this._reservedNetworkSharedEvent = _reservedNetworkSharedEvent;
    };
    _.isNetworkSharedEventReserved = function() {
      return this._reservedNetworkSharedEvent >= 1;
    };
    // * Забираем (и сразу очищаем)
    _.retrieveNetworkSharedEvent = function() {
      var eventId;
      eventId = this._reservedNetworkSharedEvent;
      this._reservedNetworkSharedEvent = 0;
      return eventId;
    };
    _.reserveVirtualCommonEvent = function(list) {
      return this._virtualEventQueue.push(list);
    };
    _.isVirtualCommonEventReserved = function() {
      return this._virtualEventQueue.length > 0;
    };
  })();
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Troop.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Troop.prototype;
})();

// ■ END Game_Troop.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Unit.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Unit.prototype;
  _.nUpdateBattleDataSync = function() {
    var members;
    members = this.members();
    if (members.some(function(m) {
      return m.isNeedNetPushBattleData();
    })) {
      ANSyncDataManager.sendBattleUnitsObserver(members);
      members.forEach(function(m) {
        return m.onNetBattleDataPushed();
      });
    }
  };
})();

// ■ END Game_Unit.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(variableId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, variableId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalVariable(variableId)) {
          ANSyncDataManager.sendGlobalVariableChange(variableId, this.value(variableId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, variableId, value);
    }
  };
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      return this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  _.isGlobalVariable = function(varId) {
    return ANET.PP.globalVariablesIds().contains(varId);
  };
  _.getAllGlobalVariablesData = function() {
    var i, j, variables;
    variables = [];
    for (i = j = 1; j <= 8; i = ++j) {
      variables.push([i, this.value[i]]);
    }
    return variables;
  };
  _.onVariableFromServer = function(varId, value) {
    this._data[varId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1


// Generated by CoffeeScript 2.5.1
// * Глабольный набор вспомогательных функций для пользователя
var nAPI;

nAPI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = nAPI;
  (function() {    // * NETWORK STATE
    // -----------------------------------------------------------------------
    _.isNetworkGame = function() {
      var e;
      try {
        return ANNetwork.isConnected();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    _.myPlayerIndex = function() {
      var e;
      try {
        return ANGameManager.myIndex();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.myActorId = function() {
      var e;
      try {
        return ANGameManager.myActorId();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.playersCount = function() {
      var e;
      try {
        return ANGameManager.playersData.length;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    return _.isMasterClient = function() {
      var e;
      try {
        return _.isNetworkGame() && ANNetwork.isMasterClient();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * HUI
    // -----------------------------------------------------------------------
    _.showGreenAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifySucess(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showRedAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifyError(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showInfoMessage = function(text1, text2 = "") {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.showWaitingInfo(text1, text2, 1) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    return _.hideInfoMessage = function() {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.hideWaitingInfo() : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * USER SERVER COMMANDS
    // -----------------------------------------------------------------------
    //@[ALIAS SUPPORT]
    // * FOR ALIASING (for plugin developers and custom commands implementation)
    _.onCustomCommand = function(name, data) {
      var e;
      try {
        if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
          $gameSystem.nCheckCustomCommandForCEStart(name);
        }
      } catch (error) {
        e = error;
        ANET.w(e);
      }
      console.log("Custom network command received: " + name);
    };
    // * USER CUSTOM CODE HERE
    _.sendCustomCommand = function(name, data) {
      var e;
      try {
        if (!_.isNetworkGame()) {
          return;
        }
        return ANNetwork.callback(NMS.Game("userCommand", {name, data}), function() {
          //TODO: Может не надо выполнять и на данном клиенте?
          // * Сразу выполняем и на данном клиенте
          // * Так как сервер эту команду выполнит в режиме ретрансляции
          return nAPI.onCustomCommand(name, data);
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Подписать на определённую (кастомную) команду выполенине общего события
    return _.registerCommonEventForCommand = function(name, commonEventId) {
      var e;
      try {
        return ANNetwork.callback(NMS.Game("customCommandLink", {name, commonEventId}), function() {
          if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
            $gameSystem.nRegisterCustomCommandCE(name, commonEventId);
          }
          return console.log("Custom network command register to Common Event is done");
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс для персонажей на карте других игроков
var NETCharacter;

NETCharacter = class NETCharacter extends Game_Character {
  constructor(id) {
    super();
    this.id = id;
    //* Иконка сетеввого состояния игрока (меню, карта, торговля, чат и т.д.)
    this.networkStateIcon = null;
    this.refresh();
  }

  // * Синхронизация движения
  playerData() {
    return ANGameManager.getPlayerDataById(this.id);
  }

  actor() {
    return $gameActors.actor(this.playerData().actorId);
  }

  refresh() {
    var charIndex, charName;
    if (this.actor() == null) {
      return;
    }
    charName = this.actor().characterName();
    charIndex = this.actor().characterIndex();
    return this.setImage(charName, charIndex);
  }

  // * Сетевое состояние игрока
  // * =====================================================================
  requestNetworkStateIcon(networkStateIcon) {
    this.networkStateIcon = networkStateIcon;
  }

};

(function() {  
  // * =====================================================================

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharacter.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharacter.prototype;
})();

// ■ END NETCharacter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный класс содержит NETCharacter всех игроков на карте (аналог Game_Followers)
//?[STORABLE]
//@[GLOBAL]
var NETCharactersGroup;

NETCharactersGroup = class NETCharactersGroup {
  constructor() {
    this._data = [];
  }

  setup() {
    "SETUP NETWORK CHARS".p();
    this._data = [];
    this._refreshCharacters();
  }

  // * Вызывается из Game_Map.refresh
  refresh() {
    var char, i, len, ref;
    this._refreshCharacters();
    ref = this._data;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      char.refresh();
    }
  }

  characters() {
    return this._data;
  }

  characterById(id) {
    return this.characters().find(function(c) {
      return c.id === id;
    });
  }

  update() {
    var c, i, len, ref, results;
    ref = this.characters();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      results.push(c.update());
    }
    return results;
  }

  isSomeoneCollided(x, y) {
    return this.characters().some(function(c) {
      return c.pos(x, y);
    });
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharactersGroup.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharactersGroup.prototype;
  
  // * Данный метод удаляет (отключённых) и создаёт (подклюённых) персонажей
  _._refreshCharacters = function() {
    var char, i, len, pl, x;
    this._removeNotExistsCharacters();
    this._addNewCharacters();
    this._refreshNetworkCharactersSprites();
    x = ANGameManager.anotherPlayers();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Удаляем (отключился или ушёл на другую карту)
  _._removeNotExistsCharacters = function() {
    var char, i, len, ref, x;
    x = ANGameManager.anotherPlayersOnMap();
    ref = this.characters();
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      if (char == null) {
        continue;
      }
      if (!x.find(function(c) {
        return c.id === char.id;
      })) {
        this._data.delete(char);
      }
    }
  };
  // * Добавляем новых персонажей
  //TODO: Надо проверять!
  _._addNewCharacters = function() {
    var char, i, len, pl, x;
    x = ANGameManager.anotherPlayersOnMap();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Пересоздать спрайты персонажей
  _._refreshNetworkCharactersSprites = function() {
    var ref;
    if (!KDCore.Utils.isSceneMap()) {
      return;
    }
    if ((ref = SceneManager._scene._spriteset) != null) {
      ref.refreshNetworkCharacters();
    }
  };
})();

// ■ END NETCharactersGroup.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessages.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _CM, _M;
  //@[DEFINES]
  _M = NetMessage;
  _CM = function(name, flag, data, socket) {
    return _M.EmptyMessageWithFlag(flag, data, socket).setName(name);
  };
  // * Обозначения
  // f - имя комманды (флага)
  // d - данные
  // s - сокет (либо ничего)

  //?LOBBY COMMANDS
  _M.Lobby = function(f, d, s) {
    return _CM('lobby', f, d, s);
  };
  //?MAP COMMANDS
  _M.Map = function(f, d, s) {
    return _CM('map', f, d, s);
  };
  //?GAME COMMANDS
  _M.Game = function(f, d, s) {
    return _CM('game', f, d, s);
  };
  //?INTERPRETER COMMANDS
  _M.Event = function(f, d, s) {
    return _CM('event', f, d, s);
  };
  //?BATTLE COMMANDS
  _M.Battle = function(f, d, s) {
    return _CM('battle', f, d, s);
  };
})();

// ■ END NetMessages.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс которые работает с параметрами и командами плагина
(function() {
  var ParamsManager;
  ParamsManager = class ParamsManager extends KDCore.ParamLoader {
    constructor() {
      super("ANETZ");
      this._prepareParameters();
    }

    
      // * Настройки соединения
    serverIp() {
      return this._ip;
    }

    serverPort() {
      return this._port;
    }

    isOnlySameMapMode() {
      return this.getParam("onlySameMap", true);
    }

    // * Набор персонажей Actors для сетевой игры
    //?VERSION
    actorsForNetwork() {
      return this.getParam("actorsForNetwork", [1, 2, 3, 4]);
    }

    // * Можно ли выбирать персонажа себе
    isActorSelectionAllowed() {
      return this.getParam("isActorSelectionAllowed", true);
    }

    // * Можно ли начать сетевую игру одному
    isSingleActorNetworkGameAllowed() {
      return this.getParam("isSinglePlayerStartAllowed", true);
    }

    // * Доступна ли обычная локальная Новая игра
    isSinglePlayerAllowed() {
      return this.getParam("singlePlayerAllowed", true);
    }

    getPlayerLeaveGameCommonEventId() {
      return this.getParam("playerLeaveGameCommonEvent", 0);
    }

    globalVariablesIds() {
      return this._globalVars;
    }

    globalSwitchesIds() {
      return this._globalSwitches;
    }

    // * Отображение имени игрока заместо имени персонажа
    // * 0 - Не показывать, 1 - Name, 2 - Nickname
    //?DINAMIC
    playerActorNameType() {
      return 0;
    }

    // * Можно ли просматривать статус других игроков
    isOtherPlayersMenuStatusAllowed() {
      return true;
    }

    // * Видно ли других игроков в меню
    isOtherPlayersVisibleInMenu() {
      return true;
    }

    // * Ожидание получения действия от каждого игрока в битве
    isForceBattleSyncMode() {
      return true;
    }

    // * Время обновления данных игрока (на карте)
    playerDataRefreshRate() {
      return 60;
    }

    // * Время обновления данных в битве (влияет на производительность)
    battleDataRefreshRate() {
      return 60;
    }

    isRoomFilterON() {
      return ANET.isPro() && this.getParam("roomFilter", false);
    }

  };
  ANET.link(ParamsManager);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.ParamsManager.prototype;
  _._prepareParameters = function() {
    this._prepareConnectionSettings();
    this._preparePlayerActorName();
    return this._prepareGlobalData();
  };
  //?VERSION
  _._prepareConnectionSettings = function() {
    var p;
    p = this.getParam("connection", {
      serverIp: "195.161.41.20",
      serverPort: "3034"
    });
    this._ip = p.serverIp;
    this._port = p.serverPort;
  };
  _._preparePlayerActorName = function() {
    var p;
    p = this.getParam("playerActorNameType", "");
    switch (p) {
      case "Instead Name":
        this.playerActorNameType = function() {
          return 1;
        };
        break;
      case "Instead Nickname":
        this.playerActorNameType = function() {
          return 2;
        };
        break;
    }
  };
  // * Ничего, так как 0 по умолчанию
  _._prepareGlobalData = function() {
    var p;
    p = this.getParam("globalData", {
      globalSwitchesIds: [],
      globalVariablesIds: []
    });
    this._globalVars = p.globalVariablesIds;
    this._globalSwitches = p.globalSwitchesIds;
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания других игроков
var PlayersWaitPool;

PlayersWaitPool = class PlayersWaitPool {
  constructor() {
    // * Запоминается при создании, чтобы можно было сбросить
    // * Это нужно, чтобы если игрок новый переместился на карту, его
    // * не добавили в ожидание, если на этой карте уже запущено общее событие
    this._anotherPlayersIds = ANGameManager.anotherPlayersOnMap().map(function(pl) {
      return pl.actorId;
    });
    this.reset();
    return;
  }

  // * Зарегестрировать (отправить на сервер)
  register() {
    this.resetTimer();
    ANInterpreterManager.sendSharedEventRequireRegister();
  }

  // * Только один игрок (мастер события) запустил событие (один на карте или в игре)
  isSinglePool() {
    return this._anotherPlayersIds.length === 0;
  }

  // * Проверить, что игроки, которые в пуле, онлайн (не отключились)
  checkPool() {
    var i, id, len, player, playersOnMap, ref;
    playersOnMap = ANGameManager.anotherPlayersOnMap();
    ref = this._anotherPlayersIds;
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      // * Если игрока больше нет на карте, мы его удаляем из пула
      player = playersOnMap.find(function(pl) {
        return pl.actorId === id;
      });
      if (player == null) {
        this._anotherPlayersIds.delete(id);
        // * Игрок отключился, делаем ему true, чтобы можно было продолжить событие
        // * (в следующей команде он уже участвовать не будет, так как будет Reset)
        this._playersReady[id] = true;
      }
    }
  }

  // * Ответ от сервера
  onAnswer(actorId) {
    return this._playersReady[actorId] = true;
  }

  update() {
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      if (!this.isReady()) {
        this.checkPool();
        this.register();
      }
    }
  }

  isReady() {
    var pl, ref, value;
    ref = this._playersReady;
    for (pl in ref) {
      value = ref[pl];
      if (value === false) {
        // * Если хоть одно значение false, значит не готов
        return false;
      }
    }
    return true;
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

  // * Сбросить до нового ожидания
  reset() {
    var i, id, len, ref;
    // * Добавляем себя как готового всегда (тут не важент именно ID)
    // * В принципе можно и не добавлять, так как важнее другие игроки
    this._playersReady = {
      myActorId: true
    };
    ref = this._anotherPlayersIds;
    // * Добавляем всех игроков как изначально не готовых
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      this._playersReady[id] = false;
    }
    this.resetTimer();
  }

};

// Generated by CoffeeScript 2.5.1
// * Команды плагина
// * Нет класса или менеджера, так как только методы регистрации команд
(function() {
  var registerPluginCommandsMV, registerPluginCommandsMZ;
  // * Основной метод загрузки (регистрации команд плагина)
  ANET.loadPluginCommands = function() {
    if (KDCore.isMZ()) {
      registerPluginCommandsMZ('Alpha_NETZ');
      return registerPluginCommandsMZ('Alpha_NETZ_MZ');
    } else {
      return registerPluginCommandsMV();
    }
  };
  registerPluginCommandsMZ = function(pluginName) {
    PluginManager.registerCommand(pluginName, 'EventCommandSelector', function(args) {
      var e;
      try {
        return this.nSetCommandOptions(args);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
    PluginManager.registerCommand(pluginName, 'SharedBattle', function(args) {
      var e;
      try {
        return this.nSetSharedBattle(args.battleId);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
  };
  registerPluginCommandsMV = function() {
    var e;
    try {
      // * Этот метод только для MV существует
      return ANET.registerMVPluginCommands();
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__terminate, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    if (ANNetwork.isBusy()) {
      return ANGameManager.updateWaiting();
    } else {
      //console.log("wait network...")
      return ALIAS__update.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__terminate = _.terminate;
  _.terminate = function() {
    // * Смена сцены
    if (ANNetwork.isConnected()) {
      ANGameManager.sendSceneChanging();
    }
    return ALIAS__terminate.call(this);
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {
    HUIManager.hideLoader();
    return SceneManager.goto(Scene_Title);
  };
  
  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  _.netOn_lobby_roomClosed = function() {
    // * По умолчанию из любой сцены выходит в главное меню
    return SceneManager.goto(Scene_Title);
  };
  // * Когда пришло какое-либо сообщение от сервера
  //?EVENT
  _.onServerEvent = function(name) {
    var eventMethod;
    if (SceneManager.isBusyForNetworkData()) {
      return;
    }
    eventMethod = "netOn_" + name;
    if (this[eventMethod] != null) {
      console.log("Call scene callback for event " + name);
      this[eventMethod]();
    }
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeInputWindow, ALIAS__commandFight, ALIAS__stop, ALIAS__updateBattleProcess, ALIAS__updateTpbAutoBattle, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  //@[ALIAS, STORED]
  _.ALIAS__NET_start = _.start;
  _.start = function() {
    // * Если бой в сетевом режиме и ещё не зарегестрирован, то сцена боя не отрисовывается
    if (ANNetwork.isConnected() && BattleManager.nIsNetworkBattle() && !ANBattleManager.isBattleRegistred()) {
      return;
    }
    // * Метод Start вызывается автоматически у SceneManager, поэтому когда
    // * данные прийдут, сцена старт
    _.ALIAS__NET_start.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleStarted();
    }
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleEnd();
    }
  };
  //TODO: Есть проблема, ввод доступен, пока ждём сервер battleMethod
  //TODO: Может просто деактивировать все окна? Чтобы нельзя было выбирать действие

  // * Игрок не может видеть команды "ввода" персонажей других игроков
  //@[ALIAS]
  ALIAS__changeInputWindow = _.changeInputWindow;
  _.changeInputWindow = function() {
    ALIAS__changeInputWindow.call(this);
    if (ANNetwork.isConnected() && BattleManager.isInputting() && !$gameParty.isOneBattler()) {
      if (BattleManager.actor() != null) {
        if (BattleManager.actor() !== $gameParty.leader()) {
          this.endCommandSelection();
        }
      }
    }
  };
  
  //@[ALIAS]
  ALIAS__commandFight = _.commandFight;
  _.commandFight = function() {
    if (ANNetwork.isConnected()) {
      // * Игрок снова должен сделать выбор
      BattleManager._isShouldWaitMyNetworkAction = true;
    }
    ALIAS__commandFight.call(this);
  };
  // * Должен идти перед переопределением общим, поэтому в этом файле
  if (KDCore.isMV()) {
    //@[ALIAS]
    ALIAS__updateBattleProcess = _.updateBattleProcess;
    _.updateBattleProcess = function() {
      if (ANNetwork.isConnected()) {
        if (!this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
          this.changeInputWindow();
        }
        return BattleManager.update(); // * Надо обновлять не зависимо от условия вверху
      } else {
        return ALIAS__updateBattleProcess.call(this);
      }
    };
  }
  //@[ALIAS]
  ALIAS__updateBattleProcess = _.updateBattleProcess;
  _.updateBattleProcess = function() {
    // * На данный момент, если игрок один в битве, то он ничего не отравляет на сервер
    if (ANNetwork.isConnected()) {
      if ($gameParty.isOneBattler()) {
        // * Только обновлять данные HP и MP другим игрокам
        $gameParty.leader().updateDataObserver();
      } else {
        // * Логика сетевого боя (общая для мастера и клиентов)
        this.nUpdateBattleProcess();
        if (ANGameManager.isBattleMaster()) {
          ANBattleManager.update();
          // * Если ждём сервер, то не обновляем BattleManager
          if (ANBattleManager.isShouldWaitServer()) {
            return;
          }
        } else {
          // * BattleManager update (ALIAS__updateBattleProcess) выполняет только мастер битвы
          if (!BattleManager.nIsLocalForceUpdatePhase()) {
            return;
          }
        }
      }
    }
    ALIAS__updateBattleProcess.call(this);
  };
  
  // * На всякий случай отключу автобитву
  //@[ALIAS]
  ALIAS__updateTpbAutoBattle = _.updateTpbAutoBattle;
  _.updateTpbAutoBattle = function() {
    if (ANNetwork.isConnected()) {

    } else {
      return ALIAS__updateTpbAutoBattle.call(this);
    }
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * Когда пришли данные о битве от сервера (регистрация, новый участник)
  // * Этот метод выполняется на клиентах, которые УЖЕ в битве (а не на тех, кто присоединился)
  _.netOn_battle_serverBattleData = function() {
    var battler, battlerId, i, j, len, len1, ref, ref1;
    ref = $gameParty.battleMembers();
    // * Для всех новых, надо выполнять некоторые методы
    for (i = 0, len = ref.length; i < len; i++) {
      battler = ref[i];
      if (!$gameTemp._previousNetBattleActors.contains(battler.actorId())) {
        battler.onBattleStart();
        battler.makeActions();
      }
    }
    ref1 = $gameTemp._previousNetBattleActors;
    // * Всех старых, надо удалить из битвы
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      battlerId = ref1[j];
      if (!ANBattleManager.battleData.actors.contains(battlerId)) {
        $gameParty.removeActor(battlerId);
        BattleManager.nSafeRemoveActor();
      }
    }
    $gameTemp._previousNetBattleActors = [];
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    $gameTemp.requestBattleRefresh();
  };
  _.nOnBattleStarted = function() {
    // * Отправляем на сервер, что мы начали бой
    ANBattleManager.onBattleStarted();
  };
  _.nOnBattleEnd = function() {
    // * Отправляем на сервер, что мы покинули (закончили) бой
    ANBattleManager.onBattleEnd();
  };
  _.nUpdateBattleProcess = function() {
    var actor, enemy, i, j, len, len1, ref, ref1;
    // * За отправку данных отвечает только мастер боя
    if (ANGameManager.isBattleMaster()) {
      ref = $gameParty.battleMembers();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        actor.updateDataObserver();
      }
      ref1 = $gameTroop.members();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        enemy = ref1[j];
        enemy.updateDataObserver();
      }
    }
  };
  _.nRefreshSharedBattle = function() {
    // * Обновить спрайты врагов
    return this._spriteset.nRefreshNetBattle();
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  // * Загружаем и инициализируем сетевой код
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    ANET.System.initSystem();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//TODO: Может просто не подключать эти методы? Если не сетевой режим
(function() {
  var ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    if (ANNetwork.isConnected()) {
      ANGameManager.onMapLoaded();
      $gameParty.nRefreshNetworkActors();
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

//@[ALIAS]
//ALIAS__update = _.update
//_.update = ->
//    ALIAS__update.call(@)

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    //TODO: Если игрок отключился, надо общее событие!
    $gameParty.nRefreshNetworkActors();
    $gameMap.refreshNetworkCharacters();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Menu.prototype;
})();

// ■ END Scene_Menu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_MenuBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_MenuBase.prototype;
  //?EVENT
  // * Когда пришли какие-либо данные DataObserver
  _.netOn_game_observerData = function() {
    return this.refreshNetwork();
  };
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    var e, ref;
    try {
      $gameParty.nRefreshNetworkActors();
      // * Если есть окно с персонажами, обновить его
      // * Можно было вынести в класс Scene_Menu, но не хочу плодить одинаковые методы
      // * Так как тут в Scene_MenuBase тоже нужен метод
      if ((ref = this._statusWindow) != null) {
        ref.refresh();
      }
    } catch (error) {
      //TODO: Сделать как и в ALphaNET общий Refresh всех окон сцены
      e = error;
      ANET.w(e);
    }
  };
  // * Обновить все окна при изменениях данных из сети
  _.refreshNetwork = function() {
    var child, e, i, len, ref;
    if (!ANNetwork.isConnected()) {
      return;
    }
    try {
      this.updateActor();
      if (this._windowLayer == null) {
        return;
      }
      ref = this._windowLayer.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        if ((child != null) && (child.refresh != null)) {
          child.refresh();
        }
      }
      return;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Scene_MenuBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Scene_NetworkGameMenu;

Scene_NetworkGameMenu = class Scene_NetworkGameMenu extends Scene_MenuBase {
  constructor() {
    super();
    return;
  }

  create() {
    super.create();
    // * Например если вернулись "назад" на эту сцену, то не надо снова соединяться
    if (!ANNetwork.isConnected()) {
      this._initNetwork();
    } else {
      this._initSceneComponents();
      this.refreshWelcomeText();
    }
  }

  update() {
    var ref;
    super.update();
    this._updateBackButton();
    this._updateRandomJoin(); //2
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.update();
    }
  }

  stop() {
    HUIManager.removeInput();
    HUIManager.hideLoader();
    return super.stop();
  }

  refreshWelcomeText() {
    var e, ref;
    try {
      return (ref = this._welcomeLine) != null ? ref.drawTextFull("Welcome, " + ANGameManager.myPlayerData().name) : void 0;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  refreshPlayersCountText(count = 0) {
    var e;
    try {
      if (this._playerCountText == null) {
        return;
      }
      this._playerCountText.clear();
      return this._playerCountText.drawTextFull("Players on server: " + count);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  //?EVENT
  netOn_lobby_changePlayerName() {
    var ref;
    this.refreshWelcomeText();
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.call();
    }
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  // * Этот метод тут, чтобы перекрыть Scene_MenuBase реализацию
  // * Так как пока нет необходимости $gameParty менять
  netOn_lobby_refreshRoomData() {} // * NOTHING

};

(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._initNetwork = function() {
    HUIManager.showLoader();
    ANNetwork.initSystem();
    ANNetwork.setConnection(this._onConnectionStatus.bind(this));
  };
  //?EVENT
  // * 0 - error, 1 - connect
  _._onConnectionStatus = function(statusCode) {
    switch (statusCode) {
      case 0:
        this._onConnectionRefused();
        break;
      case 1:
        this._onConnectionGood();
    }
  };
  _._onConnectionRefused = function() {
    HUIManager.hideLoader();
    HUIManager.notifyError("Server not response in time");
    return this.popScene();
  };
  _._onConnectionGood = function() {
    //TODO: Server version check
    HUIManager.hideLoader();
    if (!ANGameManager.isInited()) {
      ANGameManager.init();
    }
    HUIManager.notifySucess("Connected to server");
    return this._initSceneComponents();
  };
  // * Отрисовка меню, если соединение  было установлено
  _._initSceneComponents = function() {
    this._createNetworkMenu(); //1
    this._createWelcomeText(); //1
    HUIManager.showInput("Room Name...");
    this._createServerPlayerCountText();
    this._createPlayerCountRefreshThread();
  };
  _._updateBackButton = function() {
    var ref;
    if (KDCore.isMV()) {
      return;
    }
    // * Тут может быть вылет, если нет проверки null (?)
    return (ref = this._cancelButton) != null ? ref.visible = !HUIManager.isLoaderActive() : void 0;
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._createWelcomeText = function() {
    //TODO: From UI Text Component with user settings
    this._welcomeLine = KDCore.Sprite.FromBitmap(400, 60);
    this._welcomeLine.bitmap.fontSize = 38;
    this._welcomeLine.x = Graphics.width / 2 - this._welcomeLine.bitmap.width / 2;
    this._welcomeLine.y = 80;
    return this.addChild(this._welcomeLine);
  };
  _._createNetworkMenu = function() {
    var rect, wh, ww, wx, wy;
    ww = 400;
    wh = this.calcWindowHeight(4, true);
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._commandsWindow = new Window_NetworkGameMenu(rect);
    this._commandsWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandsWindow.setHandler('createRoom', this.commandCreateRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRoom', this.commandJoinRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRandRoom', this.commandJoinRandRoomMenu.bind(this)); //2
    this._commandsWindow.setHandler('settings', this.commandSettings.bind(this));
    return this.addWindow(this._commandsWindow);
  };
  _._createServerPlayerCountText = function() {
    this._playerCountText = KDCore.Sprite.FromBitmap(280, 40);
    this._playerCountText.bitmap.fontSize = 18;
    this._playerCountText.x = Graphics.width / 2 - this._playerCountText.bitmap.width / 2;
    this._playerCountText.y = this._commandsWindow.y + this._commandsWindow.height + 20;
    return this.addChild(this._playerCountText);
  };
  _._createPlayerCountRefreshThread = function() {
    var refreshMethod;
    refreshMethod = function() {
      //return if SceneManager.isSceneChanging()
      return ANNetwork.callback(NMS.Lobby("playersCountOnServ"), (count) => {
        var e;
        try {
          if (SceneManager.isSceneChanging()) {
            return;
          }
          return this.refreshPlayersCountText(count);
        } catch (error) {
          e = error;
          return ANET.w(e);
        }
      });
    };
    this._playerCountRefreshThread = new KDCore.TimedUpdate(300, refreshMethod.bind(this));
    this._playerCountRefreshThread.call();
  };
  _.commandCreateRoomMenu = function() {
    var newRoomData;
    this._lastRoomName = HUIManager.getInputValue();
    if (!String.any(this._lastRoomName)) {
      this._lastRoomName = "Room_" + Math.randomInt(1000);
    }
    // * Отправляем данные об текущей игре (клиенте)
    newRoomData = {
      name: this._lastRoomName,
      gameInfo: ANNetwork.getNetworkGameInfoData()
    };
    ANNetwork.get(NMS.Lobby("createRoom", newRoomData), (result) => {
      return this._onRoomCreated(result);
    }, () => {
      console.log("Can't create Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onRoomCreated = function(roomData) {
    if (roomData != null) {
      ANNetwork.setRoomMaster(roomData);
      SceneManager.push(Scene_NetworkRoom);
    } else {
      //TODO: save in confing manager room name (???)
      HUIManager.notifyError("Can't create room with name: " + this._lastRoomName);
      this._commandsWindow.activate();
    }
  };
  _.commandJoinRoomMenu = function() {
    return SceneManager.push(Scene_NetworkRoomsList);
  };
  _.commandSettings = function() {
    return SceneManager.push(Scene_NetworkSettings);
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  // * Методы обработки подключения к случайной комнате
  _.commandJoinRandRoomMenu = function() {
    this.roomsList = null; // * Обнуляем список комнат
    this.requestRoomsListFromServer();
    this._waitRoomsForRandomJoin = true;
  };
  _.requestRoomsListFromServer = function() {
    ANNetwork.get(NMS.Lobby("getRoomsList"), (result) => {
      return this.roomsList = result;
    }, () => {
      // * Timeout
      console.log("Server not returns rooms list in time");
      return this._onCantJointRandomRoom();
    });
  };
  _._onCantJointRandomRoom = function() {
    this._waitRoomsForRandomJoin = false;
    this._commandsWindow.activate();
    HUIManager.notifyError("No available open rooms to join");
  };
  // * Ждём список комнат и пытаемся подключиться к случайной
  _._updateRandomJoin = function() {
    var randomRoomName;
    if (!this._waitRoomsForRandomJoin) {
      return;
    }
    if (this.roomsList == null) {
      return;
    }
    //TODO: filter добавить статус в иггре ил в лобии для комнаты и количество игроков
    console.info(this.roomsList);
    this._waitRoomsForRandomJoin = false;
    this.applyFiltersToRoomList();
    if (this.roomsList.length === 0) {
      this._onCantJointRandomRoom();
    } else {
      randomRoomName = this.roomsList.sample().name;
      this.joinToRoomRequest(randomRoomName);
    }
  };
  _.applyFiltersToRoomList = function() {
    if (this.roomsList == null) {
      this.roomsList = [];
    }
    if (this.roomsList.length === 0) {
      return;
    }
    this.roomsList = this.roomsList.filter((r) => {
      return this.isProperRoomToJoin(r);
    });
  };
  _.isProperRoomToJoin = function(roomData) {
    return NetRoomDataWrapper.isRoomProperToJoin(roomData);
  };
  _.joinToRoomRequest = function(roomName) {
    ANNetwork.get(NMS.Lobby("joinToRoom", roomName), (result) => {
      return this._onJoinedToRoom(result);
    }, () => {
      console.log("Can't join to Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._commandsWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Scene_NetworkRoom;

Scene_NetworkRoom = class Scene_NetworkRoom extends Scene_MenuBase {
  constructor() {
    super();
    this._startingGameTransition = false;
  }

  create() {
    super.create();
    this.createRoomTitle();
    this.createCommands();
    this.createPlayersList();
    if (ANET.PP.isActorSelectionAllowed()) {
      this.createActorSelectWindow();
    }
    this.refreshRoom();
  }

  start() {
    super.start();
    ANNetwork.requestRoomRefresh();
    // * Так как есть искуственная задержка загрузки сцены на MV
    if (KDCore.isMV()) {
      setTimeout((function() {
        try {
          return ANNetwork.requestRoomRefresh();
        } catch (error) {

        }
      }), 300);
    }
  }

  isBottomHelpMode() {
    return false;
  }

  refreshRoom() {
    this.room = ANNetwork.room;
    this._refreshRoomTitle();
    this._refreshPlayerList();
    this._refreshActorsList();
    return this._windowCommands.refresh();
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  netOn_lobby_refreshRoomData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  // * Когда игрок выбирает персонажа
  netOn_game_playersData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  netOn_lobby_startGame() {
    this._startingGameTransition = true;
    //TODO: Тут надо вызывать метод Scene_Title.commandNewGame
    // * Сейчас нету _commandWindow, так что временно создадим его чтобы не было ошибки
    this._commandWindow = {
      close: function() {}
    };
    Scene_Title.prototype.commandNewGame.call(this);
  }

  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  netOn_lobby_roomClosed() {
    if (!this._shouldNotPopScene) {
      // * Из этой сцены мы возвращаемся в сетевое меню (если мы не мастер)
      // * Для мастера не надо, так как сцена и так закрывается сама и получается
      // * что возврат происходит на Scene_Title
      return this.popScene();
    }
  }

  update() {
    return super.update();
  }

  //TODO: Готов клиент или нет
  //if ANNetwork.isMasterClient() and Input.isTriggered('ok')
  //    ANNetwork.send(NMS.Lobby("startGame"))
  stop() {
    super.stop();
    // * Если TRUE - значит мы переходим на сцену с игрой и не надо закрывать коммнату
    if (this._startingGameTransition === true) {
      return;
    }
    if (ANNetwork.isMasterClient()) {
      this._shouldNotPopScene = true;
      return ANNetwork.closeRoom();
    } else {
      return ANNetwork.leaveRoom();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkRoom.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoom.prototype;
  _.createRoomTitle = function() {
    this.createHelpWindow();
    return this._refreshRoomTitle();
  };
  _._refreshRoomTitle = function() {
    var ref, roomHostName;
    if (ANNetwork.isMasterClient()) {
      roomHostName = "\\C[1]" + ANGameManager.myPlayerData().name + " (you)";
    } else {
      if (this.room == null) {
        roomHostName = "Fetching...";
      } else {
        roomHostName = (ref = ANGameManager.getPlayerDataById(this.room.masterId)) != null ? ref.name : void 0;
      }
    }
    return this._helpWindow.setText("Room: %1, Host: %2".format(ANNetwork.room.name, roomHostName));
  };
  _._refreshPlayerList = function() {
    this._playersListWindow.refresh();
  };
  _.createCommands = function() {
    this._windowCommands = new Window_NetworkRoomCommands(new Rectangle(0, this._helpWindow.y + this._helpWindow.height, 600, 100));
    this._windowCommands.setHandler('cancel', this.popScene.bind(this));
    this._windowCommands.setHandler('leave', this.popScene.bind(this));
    this._windowCommands.setHandler('start', this._onStartRoomCommand.bind(this));
    this._windowCommands.setHandler('ready', this._onReadyInRoomCommand.bind(this));
    this._windowCommands.setHandler('character', this._onCharacterSelectCommand.bind(this));
    this.addWindow(this._windowCommands);
    this._windowCommands.activate();
  };
  _._onStartRoomCommand = function() {
    if (this._isAllInRoomReady()) { // TODO: В Wrapper, так как окно тоже проверяет
      if (ANNetwork.isMasterClient()) {
        ANNetwork.send(NMS.Lobby("startGame"));
      }
    } else {
      this._windowCommands.activate();
    }
  };
  _._onReadyInRoomCommand = function() {};
  //TODO: Ничего пока нет
  _._onCharacterSelectCommand = function() {
    this._windowActorsList.show();
    this._windowActorsList.open();
    this._windowActorsList.activate();
    return this._playersListWindow.close();
  };
  //TODO: Флаги готовности, сбрасывать при нажатии Character
  // * См. readyPlayersIds у данных комнаты
  _._isAllInRoomReady = function() {
    return true;
  };
  _.createActorSelectWindow = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._windowActorsList = new Window_NetworkActorsList(new Rectangle(wx, wy, ww, wh));
    this._windowActorsList.setHandler('cancel', this._onActorSelectCancel.bind(this));
    this._windowActorsList.setHandler('ok', this._onActorSelectOk.bind(this));
    this._windowActorsList.hide();
    return this.addWindow(this._windowActorsList);
  };
  _._onActorSelectCancel = function() {
    return this._cancelActorSelection();
  };
  _._cancelActorSelection = function() {
    this._windowActorsList.close();
    this._windowCommands.activate();
    return this._playersListWindow.open();
  };
  _._onActorSelectOk = function() {
    var selectedActorId;
    selectedActorId = this._windowActorsList.selectedActorId();
    if (selectedActorId <= 0) {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    } else {
      ANPlayersManager.sendBindActorFromLobby(selectedActorId, this._onBindActorResult.bind(this));
    }
  };
  _._onBindActorResult = function(resultFlag) {
    if (resultFlag === true) {
      this._cancelActorSelection();
    } else {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    }
    this.refreshRoom();
  };
  _._refreshActorsList = function() {
    var ref;
    return (ref = this._windowActorsList) != null ? ref.refresh() : void 0;
  };
  _.createPlayersList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._playersListWindow = new Window_NetworkRoomPlayersList(new Rectangle(wx, wy, ww, wh));
    this.addWindow(this._playersListWindow);
    this._refreshPlayerList();
  };
})();

// ■ END Scene_NetworkRoom.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сцена со списком комнат на сервере
var Scene_NetworkRoomsList;

Scene_NetworkRoomsList = class Scene_NetworkRoomsList extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    //TODO: Потом сделать чтобы сервер сам отправлял когда меняется список комнат
    // * Сейчас опасно, так как может быть уже 4 из 4, а информация не обновилась
    this._refreshRoomsListThread = new KDCore.TimedUpdate(60, this._requestRoomsListFromServer.bind(this));
    this._createRoomsList();
    this._requestRoomsListFromServer();
  }

  refreshRooms() {
    if (ANET.PP.isRoomFilterON()) {
      this.applyFilterToRooms();
    }
    return this._roomsListWindow.refreshRooms(this.roomsList);
  }

  //?VERSION
  applyFilterToRooms() {}

  update() {
    super.update();
    return this._refreshRoomsListThread.update();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomsList.prototype;
  _._requestRoomsListFromServer = function() {
    // * В первый раз показываем Loader
    if (this.roomsList == null) {
      HUIManager.showLoader();
    }
    ANNetwork.callback(NMS.Lobby("getRoomsList"), (result) => {
      // * Если сцена была закрыта, а комнаты пришли
      if (!(SceneManager._scene instanceof Scene_NetworkRoomsList)) {
        return;
      }
      this.roomsList = result;
      if (this.roomsList == null) {
        return;
      }
      this.refreshRooms();
      return HUIManager.hideLoader();
    });
    this.refreshRooms();
  };
  _._createRoomsList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 140;
    wx = 50;
    wy = 70;
    this._roomsListWindow = new Window_NetworkRoomsList(new Rectangle(wx, wy, ww, wh));
    this._roomsListWindow.setHandler('cancel', this.popScene.bind(this));
    this._roomsListWindow.setHandler('ok', this._onJoinRoomCommand.bind(this));
    this._roomsListWindow.activate();
    return this.addWindow(this._roomsListWindow);
  };
  _._onJoinRoomCommand = function() {
    var roomData;
    roomData = this._roomsListWindow.getSelectedRoom();
    if (NetRoomDataWrapper.isRoomProperToJoin(roomData)) {
      ANNetwork.get(NMS.Lobby("joinToRoom", roomData.name), (result) => {
        return this._onJoinedToRoom(result);
      }, () => {
        console.log("Can't join to Room, server not response in time");
        return this._roomsListWindow.activate();
      });
    } else {
      SoundManager.playBuzzer();
      this._roomsListWindow.activate();
    }
  };
  
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._roomsListWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

//TODO: События на обработку: список комнат обновлися, успешное подключение, плохое подключение

// Generated by CoffeeScript 2.5.1
// * Сцена настроек для сетевой игры

//TODO: Пока что просто ввод имени игрока
var Scene_NetworkSettings;

Scene_NetworkSettings = class Scene_NetworkSettings extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    return this._showNameInput();
  }

  stop() {
    this._savePlayerName();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel() || Input.isTriggered('ok')) {
      return this.popScene();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkSettings.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkSettings.prototype;
  _._showNameInput = function() {
    HUIManager.showInput("Enter your name for network...");
    HUIManager.setInputValue(ANGameManager.myPlayerData().name);
  };
  _._savePlayerName = function() {
    var newName;
    newName = HUIManager.getInputValue();
    if (String.any(newName)) {
      ANGameManager.myPlayerData().name = newName;
      // * Отправим на сервер
      ANPlayersManager.sendPlayerName();
      ConfigManager.netPlayerName = newName;
      ConfigManager.save();
    }
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
})();

// ■ END Scene_NetworkSettings.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Skill.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Skill.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Skill.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Status.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Status.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме зависит от параметра
    if (ANNetwork.isConnected()) {
      return ANET.PP.isOtherPlayersMenuStatusAllowed();
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Status.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this);
    if (ANNetwork.isConnected()) {
      ANNetwork.stop();
    }
    if (ANET.isDEV()) {
      return "Precc C for fast connect".p();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANET.isDEV()) {
      //TODO: Добавить потом параметр плагина, чтобы люди могли тестить быстро
      return this.nUpdateDebugStart();
    }
  };
  (function() {    // * Добавляем команду сетевой игры в главное меню
    var ALIAS__calcWindowHeight, ALIAS__commandWindowRect, ALIAS__createCommandWindow;
    
    //@[ALIAS]
    ALIAS__createCommandWindow = _.createCommandWindow;
    _.createCommandWindow = function() {
      ALIAS__createCommandWindow.call(this);
      return this._commandWindow.setHandler("network", this.commandNetwork.bind(this));
    };
    //@[ALIAS]
    ALIAS__commandWindowRect = _.commandWindowRect;
    _.commandWindowRect = function() {
      // * little trick to not overwrite method
      this.___isOneMoreCommand = !Imported.VisuMZ_0_CoreEngine;
      return ALIAS__commandWindowRect.call(this);
    };
    //@[ALIAS]
    ALIAS__calcWindowHeight = _.calcWindowHeight;
    _.calcWindowHeight = function(numLines, selectable) {
      if (this.___isOneMoreCommand === true) {
        numLines += 1;
        if (!ANET.PP.isSinglePlayerAllowed()) {
          // * Если одиночная игра не доступна, то нет одной позиции в меню (Новая ира)
          numLines -= 1;
        }
      }
      return ALIAS__calcWindowHeight.call(this, numLines, selectable);
    };
  })();
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  (function() {    // DEV FAST GAME START
    // --------------------------------------------------------
    // * Метод только для отладки (быстрый старт на кнопку C)
    _.nUpdateDebugStart = function() {
      if (Input.isTriggered('c')) {
        this.nFastConnectToDevRoom();
      }
      if ($gameTemp._isDevNetGameWaitPlayers === true) {
        if (ANGameManager.playersData.length > 1) {
          return this.nFastGameStart();
        }
      }
    };
    //?EVENT
    _.netOn_lobby_startGame = function() {
      if ($gameTemp._isDevNetGameStart !== true) {
        return;
      }
      Scene_Title.prototype.commandNewGame.call(this);
    };
    _.nFastConnectToDevRoom = function() {
      if (ANET.PP.isActorSelectionAllowed()) {
        console.warn("Can't connect in Dev room in Actor Select mode");
        return;
      }
      ANNetwork.initSystem();
      return ANNetwork.setConnection(function(status) {
        if (status === 1) {
          HUIManager.notifySucess("Connected to server");
          ANGameManager.init();
          return ANNetwork.get(NMS.Lobby("createRoom", {
            name: "dev",
            gameInfo: ANNetwork.getNetworkGameInfoData()
          }), function(roomData) {
            if (roomData != null) {
              ANNetwork.setRoomMaster(roomData);
              return $gameTemp._isDevNetGameWaitPlayers = true;
            } else {
              return ANNetwork.get(NMS.Lobby("joinToRoom", "dev"), function(roomData) {
                $gameTemp._isDevNetGameStart = true;
                return ANNetwork.setRoomJoin(roomData);
              }, function() {
                return console.log("Can't join to Room, server not response in time");
              });
            }
          }, function() {
            return console.log("Can't create Room, server not response in time");
          });
        } else {
          return HUIManager.notifyError("Server not response in time");
        }
      });
    };
    _.nFastGameStart = function() {
      if (ANNetwork.isMasterClient()) {
        $gameTemp._isDevNetGameStart = true;
        return ANNetwork.send(NMS.Lobby("startGame"));
      }
    };
  })();
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {}; // * NOTHING
  _.commandNetwork = function() {
    this._commandWindow.close();
    return SceneManager.push(Scene_NetworkGameMenu);
  };
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeScene, _;
  //@[DEFINES]
  _ = SceneManager;
  //@[ALIAS]
  ALIAS__changeScene = _.changeScene;
  _.changeScene = function() {
    if (ANNetwork.isConnected() && this.isSceneChanging()) {
      if (typeof HUIManager !== "undefined" && HUIManager !== null) {
        HUIManager.onGameSceneChanged();
      }
    }
    ALIAS__changeScene.call(this);
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = SceneManager;
  //? ONLY FOR MV
  _.isSceneReadyForNetwork = function() {
    return true;
  };
  // * Сцена занята для событий из сети (scene events) (общий метод для MV и MZ)
  _.isBusyForNetworkData = function() {
    return SceneManager.isSceneChanging() || !SceneManager.isSceneReadyForNetwork();
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__retreat, _;
  //@[DEFINES]
  _ = Sprite_Actor.prototype;
  //TEMP
  //TODO: Временное врешение, работает только на мастере
  //@[ALIAS]
  ALIAS__retreat = _.retreat;
  _.retreat = function() {
    if (ANNetwork.isConnected()) {
      if ($gameParty.leader() === this._battler) {
        return this.startMove(300, 0, 30);
      } else {

      }
    } else {
      // * Другой персонаж не убегает
      return ALIAS__retreat.call(this);
    }
  };
})();

// ■ END Sprite_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setCharacter, ALIAS__updateOther, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__updateOther = _.updateOther;
  _.updateOther = function() {
    ALIAS__updateOther.call(this);
    return this._updateNetworkCharacter();
  };
  
  //@[ALIAS]
  ALIAS__setCharacter = _.setCharacter;
  _.setCharacter = function(character) {
    ALIAS__setCharacter.call(this, character);
    this._isNetworkCharacter = ANNetwork.isConnected() && character instanceof NETCharacter;
    // * Смена методов
    if (this._isNetworkCharacter === true) {
      this._updateNetworkCharacter = this._updateNetworkCharacterMain;
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //?DYNAMIC
  _._updateNetworkCharacter = function() {}; // * DUMMY
  _._updateNetworkCharacterMain = function() {
    return this._updateNetworkStateIcon();
  };
  _._updateNetworkStateIcon = function() {
    if (this.netStateIcon == null) {
      this._createNetworkStateIcon();
    } else {
      this.netStateIcon.x = this.x;
      this.netStateIcon.y = this.y - this.height;
    }
  };
  _._createNetworkStateIcon = function() {
    var e, ref;
    this.netStateIcon = new ANET.Sprite_PlayerNetworkStatus(this);
    this.netStateIcon.setupNETCharacter(this._character);
    try {
      // * Не лучший способ
      if ((ref = SceneManager._scene._spriteset) != null) {
        ref.addNetworkStatusIconForCharacter(this.netStateIcon);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Gauge.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__smoothness, _;
  //TTT

  //@[DEFINES]
  _ = Sprite_Gauge.prototype;
  //@[ALIAS]
  ALIAS__smoothness = _.smoothness;
  _.smoothness = function() {
    // * Делаем более плавное заполнение для сетевой битвы, чтобы не было видно "рывков"
    // * Рывки есть так как с сервера данные обновляются примерно раз в секунду в бою
    if (ANNetwork.isConnected()) {
      if (this._statusType === "time" && $gameParty.inBattle()) {
        return 60;
      }
    }
    return ALIAS__smoothness.call(this);
  };
})();

// ■ END Sprite_Gauge.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_PlayerNetworkStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_PlayerNetworkStatus;
  Sprite_PlayerNetworkStatus = class Sprite_PlayerNetworkStatus extends Sprite_Balloon {
    constructor() {
      super();
      this.visible = false;
      return;
    }

    setupNETCharacter(_character) {
      this._character = _character;
      return this._checkStateThread = new KDCore.TimedUpdate(10, this._updateStateCheck.bind(this));
    }

    loadBitmap() {
      this.bitmap = ImageManager.loadAA("PlayerStateIcons");
      return this.setFrame(0, 0, 0, 0);
    }

    setup(iconId) {
      if (iconId == null) {
        if (this.visible === true) {
          this.reset();
        }
      } else {
        if (this._balloonId === iconId) {
          return;
        }
        this._balloonId = iconId;
        this.visible = true;
        this.restart();
      }
    }

    restart() {
      return this._duration = 5 * this.speed() + this.waitTime();
    }

    reset() {
      this._duration = 0;
      this._balloonId = -1;
      return this.visible = false;
    }

    // * Не используется, так как прикрепляется к персонажу
    updatePosition() {} // * EMPTY

    update() {
      super.update();
      this._checkStateThread.update();
      // * Начинается снова
      if (this._balloonId >= 0 && this._duration <= 0) {
        this._firstStep = true;
        return this.restart();
      }
    }

    frameIndex() {
      var frameIndex, index;
      index = (this._duration - this.waitTime()) / this.speed();
      frameIndex = 4 - Math.max(Math.floor(index), 0);
      if (this._firstStep == null) {
        return frameIndex;
      } else {
        if (frameIndex === 0) {
          return 1;
        } else {
          return frameIndex;
        }
      }
    }

    // * PRIVATE =====================================================
    _updateStateCheck() {
      if (this._character == null) {
        return;
      }
      this.setup(this._character.networkStateIcon);
    }

  };
  ANET.link(Sprite_PlayerNetworkStatus);
})();

// ■ END Sprite_PlayerNetworkStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Battle.prototype;
  // * Началась битва
  // * Проверим и спрячем "dead" врагов (если мы присоединились)
  _.nRefreshNetBattle = function() {
    var e, i, len, ref, ref1, s;
    try {
      // * Если мы мастер, то не надо, значит мы НЕ присоединились
      if (ANBattleManager.isBattleMaster()) {
        return;
      }
      ref = this._enemySprites;
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s == null) {
          continue;
        }
        if (!((ref1 = s._enemy) != null ? ref1.isAlive() : void 0)) {
          s.hide();
        }
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Spriteset_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCharacters, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createCharacters = _.createCharacters;
  _.createCharacters = function() {
    ALIAS__createCharacters.call(this);
    if (ANNetwork.isConnected()) {
      this._createNetworkCharacters();
      this._createNetworkCharactersInfo();
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _._createNetworkCharacters = function() {
    // * Отдельный массив для удобства
    this._networkCharacterSprites = [];
    this.refreshNetworkCharacters();
  };
  _.refreshNetworkCharacters = function() {
    var char, i, j, len, len1, ref, ref1, spr;
    ref = this._networkCharacterSprites;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      this._removeNetCharInfo(char);
      this._characterSprites.delete(char);
      this._tilemap.removeChild(char);
    }
    this._networkCharacterSprites = [];
    ref1 = $gameMap.netChars();
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      char = ref1[j];
      spr = new Sprite_Character(char);
      this._characterSprites.push(spr);
      this._networkCharacterSprites.push(spr);
      this._tilemap.addChild(spr);
    }
  };
  
  // * Специальный слой для иконок статусов и имён сетевых персонажей
  _._createNetworkCharactersInfo = function() {
    this._networkCharactersInfoSprites = [];
    this._networkCharactersInfoLayer = new Sprite();
    this._networkCharactersInfoLayer.z = 9;
    this._tilemap.addChild(this._networkCharactersInfoLayer);
  };
  // * Добавить иконку статуса для персонажа
  _.addNetworkStatusIconForCharacter = function(iconSpr) {
    this._destroyNetStatusIconDuplicate(iconSpr);
    this._networkCharactersInfoSprites.push(iconSpr);
    this._networkCharactersInfoLayer.addChild(iconSpr);
  };
  
  // * Надо найти и удалить, если икона уже существует для персонажа
  // * при refreshNetworkCharacters, их иконки не удаляются с ними
  // * так как находятся на другом слое
  _._destroyNetStatusIconDuplicate = function(iconSpr) {
    var i, len, ref, spr;
    if (iconSpr == null) {
      return;
    }
    ref = this._networkCharactersInfoSprites;
    //TODO: Возможно после создания таблиц имён надо разлелить метод
    // так как сейчас удаляется любой спрайт из массива с соответсвием персонажа
    for (i = 0, len = ref.length; i < len; i++) {
      spr = ref[i];
      if (spr == null) {
        continue;
      }
      if (spr._character === iconSpr._character) {
        this._networkCharactersInfoLayer.removeChild(spr);
        this._networkCharactersInfoSprites.delete(spr);
      }
    }
  };
  // * Удаляет все связанные с персонажем спрайты информации (статус, имя)
  _._removeNetCharInfo = function(char) {
    if (char == null) {
      return;
    }
    return this._destroyNetStatusIconDuplicate(char.netStateIcon);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addText, ALIAS__clear, _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (this.isNeedSendLogToServer()) {
      return ANBattleManager.sendWindowLogMessage("clear", null);
    }
  };
  //@[ALIAS]
  ALIAS__addText = _.addText;
  _.addText = function(text) {
    ALIAS__addText.call(this, text);
    if (this.isNeedSendLogToServer()) {
      ANBattleManager.sendWindowLogMessage("add", text);
    }
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  _.isNeedSendLogToServer = function() {
    return ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler();
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCancelEnabled, ALIAS__isCursorMovable, ALIAS__isOkEnabled, ALIAS__processCancel, ALIAS__processOk, ALIAS__select, ALIAS__start, ALIAS__update, _;
  //TODO: ПРОВЕРИТЬ НА MV

  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  //@[ALIAS]
  ALIAS__isCursorMovable = _.isCursorMovable;
  _.isCursorMovable = function() {
    if (this.nIsNetworkSelection()) {
      return ANInterpreterManager.isSharedEventMaster();
    } else {
      return ALIAS__isCursorMovable.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__isOkEnabled = _.isOkEnabled;
  _.isOkEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isOkEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__isCancelEnabled = _.isCancelEnabled;
  _.isCancelEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isCancelEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.nIsNetworkSelection()) {
      this.nUpdateNetworkSelection();
    }
  };
  // * Можно это тоже, но не обязательно, и так выбор не может сделать второй игрок
  //@[ALIAS]
  //ALIAS__processHandling = _.processHandling
  //_.processHandling = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processHandling.call(@)

  //@[ALIAS]
  //ALIAS__processTouch = _.processTouch
  //_.processTouch = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processTouch.call(@)

  //@[ALIAS]
  ALIAS__select = _.select;
  _.select = function(index) {
    if (this.nIsNetworkSelection()) {
      // * Если мастер, то выбор проходит и отправляем всем выбор
      if (ANInterpreterManager.isSharedEventMaster()) {
        ALIAS__select.call(this, index);
        return this.nSendNetworkSelection(index);
      } else {
        // * Если не мастер, но выбор пришёл с сервера (т.е. есть флаг), то ставим выбор
        if (this.nIsSelectFromNetworkMaster === true) {
          this.nIsSelectFromNetworkMaster = false;
          return ALIAS__select.call(this, index);
        } else {

        }
      }
    } else {
      // * NOTHING
      // * Клиент сам не может менять выбор
      return ALIAS__select.call(this, index);
    }
  };
  
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      this.nSetNetworkSelectMode(false);
    }
  };
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    if (ANNetwork.isConnected()) {
      this.nPrepareNetworkSelection();
    }
    ALIAS__start.call(this);
  };
  
  //@[ALIAS]
  ALIAS__processOk = _.processOk;
  _.processOk = function() {
    ALIAS__processOk.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('ok');
    }
  };
  //@[ALIAS]
  ALIAS__processCancel = _.processCancel;
  _.processCancel = function() {
    ALIAS__processCancel.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('cancel');
    }
  };
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  (function() {    // * Выбор (только одного игрока) в общем событии
    // -----------------------------------------------------------------------
    // * Подготовка окна к выбору по сети
    _.nPrepareNetworkSelection = function() {
      // * Обнуляем действие из сети
      $gameTemp.nSelectionActionFromNetwork = null;
      this.nSetNetworkSelectMode($gameTemp.nRequireChoiceOnlyForMaster);
      // * Сбрасываем флаг (чтобы не повторился на следующем выборе)
      $gameTemp.nRequireChoiceOnlyForMaster = false;
      // * При открытии окна, первый выбор Default всегда проходит (не запрещён) на клиенте
      // * Поэтому ставим разрешающий флаг (якобы от сервера первый выбор)
      this.nIsSelectFromNetworkMaster = true;
      // * Очищаем последний отправленный индекс
      this.__nLastSentIndex = null;
    };
    _.nSetNetworkSelectMode = function(_networkSelectMode) {
      this._networkSelectMode = _networkSelectMode;
    };
    _.nIsNetworkSelection = function() {
      return this._networkSelectMode === true && ANNetwork.isConnected();
    };
    // * Отправить на сервер индекс выбора
    _.nSendNetworkSelection = function(index) {
      // * Чтобы не спамить
      if (this.__nLastSentIndex === index) {
        return;
      }
      this.__nLastSentIndex = index;
      ANInterpreterManager.sendChoiceSelection(index, null);
    };
    // * Отправить на сервер действие (ОК, отмена)
    _.nSendNetworkSelectionAciton = function(action) {
      ANInterpreterManager.sendChoiceSelection(this.index(), action);
    };
    // * Ожидание действие от сервера (не мастер)
    return _.nUpdateNetworkSelection = function() {
      var action, index;
      if ($gameTemp.nSelectionActionFromNetwork == null) {
        return;
      }
      if (ANInterpreterManager.isSharedEventMaster()) {
        return;
      }
      ({action, index} = $gameTemp.nSelectionActionFromNetwork);
      this.nIsSelectFromNetworkMaster = true;
      if (index != null) {
        // * Всегда ставим выбор аналогичный масетеру (пришёл от сервера который), затем уже действия
        this.select(index);
      }
      switch (action) {
        case 'ok':
          this.processOk();
          break;
        case 'cancel':
          this.processCancel(); // select
          break;
      }
      // * Ничего, выбор всегда идёт
      // * Флаг обработан, очищаем
      $gameTemp.nSelectionActionFromNetwork = null;
    };
  })();
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isFormationEnabled, ALIAS__isSaveEnabled, _;
  //@[DEFINES]
  _ = Window_MenuCommand.prototype;
  // * Команда Formation запрещена в сетевой игре всегда
  //@[ALIAS]
  ALIAS__isFormationEnabled = _.isFormationEnabled;
  _.isFormationEnabled = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__isFormationEnabled.call(this, ...arguments);
    }
  };
  
  //TODO: Временно отключил команду сохранения в сетевой игре
  //@[ALIAS]
  ALIAS__isSaveEnabled = _.isSaveEnabled;
  _.isSaveEnabled = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__isSaveEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCurrentItemEnabled, _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function(rect) {
    ALIAS__initialize.call(this, rect);
    if (ANNetwork.isConnected()) {
      if (ANET.PP.isOtherPlayersVisibleInMenu() === false) {
        this.setOnlyMyPlayerInMenuMode();
      }
    }
  };
  //@[ALIAS]
  ALIAS__isCurrentItemEnabled = _.isCurrentItemEnabled;
  _.isCurrentItemEnabled = function() {
    if (ANNetwork.isConnected()) {
      return this.isCurrentItemEnabledInNetworkGame();
    } else {
      return ALIAS__isCurrentItemEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  (function() {    // * Команды Skill, Statis, Equip
    // -----------------------------------------------------------------------
    _.isCurrentItemEnabledInNetworkGame = function() {
      if (this.isSymbolOnlyForMyNetActor()) {
        return this.isCurrentActorIsMyNetActor();
      } else {
        return true;
      }
    };
    // * Набор команд, которые доступны только для текущего игрока (персонажа)
    _.isSymbolOnlyForMyNetActor = function() {
      var e, isOnlyForMyActor, symbol;
      try {
        // * Плохой вариант получения команды, но работает
        symbol = SceneManager._scene._commandWindow.currentSymbol();
        // * Навыки и экипировка - только для моего персонажа
        isOnlyForMyActor = symbol === 'skill' || symbol === 'equip';
        if (ANET.PP.isOtherPlayersMenuStatusAllowed() === false) {
          isOnlyForMyActor = isOnlyForMyActor || (symbol === 'status');
        }
        return isOnlyForMyActor;
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
    
    // * Выбранный (Index) персонаж принадлежит мне? (мой персонаж)
    return _.isCurrentActorIsMyNetActor = function() {
      var actor, e;
      try {
        actor = $gameParty.members()[this.index()];
        return actor.isMyNetworkActor();
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
  })();
  (function() {    // * Cписок игроков
    // -----------------------------------------------------------------------
    
    // * Будет видно только моего персонажа
    return _.setOnlyMyPlayerInMenuMode = function() {
      this.maxItems = function() {
        return 1;
      };
      this.actor = function(index) {
        return $gameParty.leader();
      };
      return this.selectLast = function() {
        return this.smoothSelect(0);
      };
    };
  })();
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Window_NetworkActorsList;

Window_NetworkActorsList = class Window_NetworkActorsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this.select(0);
  }

  maxItems() {
    return this.actorsForNetwork().length;
  }

  maxCols() {
    return 2;
  }

  actorsForNetwork() {
    return ANET.PP.actorsForNetwork();
  }

  isCurrentItemEnabled() {
    var e;
    try {
      return this.isEnable(this.index());
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  }

  selectedActorId() {
    if (!this.isCurrentItemEnabled()) {
      return 0;
    }
    return this.getActorData(this.index()).id;
  }

  isEnable(index) {
    var actorId;
    actorId = this.getActorData(index).id;
    return !ANGameManager.playersData.some(function(pl) {
      return pl.actorId === actorId;
    });
  }

  drawItem(index) {
    var actorData, faceBitmap, rect;
    actorData = this.getActorData(index);
    if (actorData == null) {
      return;
    }
    rect = this.itemRect(index);
    faceBitmap = ImageManager.loadFace(actorData.faceName);
    faceBitmap.addLoadListener(() => {
      return this._drawActor(rect, actorData, index);
    });
  }

  itemHeight() {
    return 110;
  }

  getActorData(index) {
    return $dataActors[this.actorsForNetwork()[index]];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkActorsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkActorsList.prototype;
  _._drawActor = function(rect, a, index) {
    this.changePaintOpacity(this.isEnable(index));
    this._drawActorInfo(rect, a);
    this._drawActorClass(rect, a);
    if (!this.isEnable(index)) {
      this._drawNetworkStatus(rect);
    }
    this.changePaintOpacity(1);
  };
  _._drawActorInfo = function(rect, a) {
    this.drawFaceWithCustomSize(a.faceName, a.faceIndex, rect.x + 4, rect.y + 2, this.itemHeight() - 8);
    return this.drawText(a.name, rect.x + 120, rect.y + 4, 168);
  };
  _._drawActorClass = function(rect, a) {
    var className;
    className = $dataClasses[a.classId].name;
    if (KDCore.isMV()) {
      this.changeTextColor(this.crisisColor());
    } else {
      this.changeTextColor(ColorManager.crisisColor());
    }
    this.contents.fontSize -= 8;
    this.drawText(className, rect.x + 132, rect.y + 44, 168);
    this.contents.fontSize += 8;
    return this.resetTextColor();
  };
  _._drawNetworkStatus = function(rect) {
    if (KDCore.isMV()) {
      this.changeTextColor(this.deathColor());
    } else {
      this.changeTextColor(ColorManager.deathColor());
    }
    this.contents.fontSize -= 8;
    this.drawText('Picked', rect.x + 270, rect.y + 4);
    this.contents.fontSize += 8;
    this.resetTextColor();
  };
})();

// ■ END Window_NetworkActorsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

//TODO: Version for MV (rect!)
var Window_NetworkGameMenu;

Window_NetworkGameMenu = class Window_NetworkGameMenu extends Window_Command {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  makeCommandList() {
    this.addCommand("Create Room", "createRoom");
    this.addCommand("Join Room", "joinRoom");
    this.addCommand("Join Random Room", "joinRandRoom");
    this.addCommand("Settings", "settings");
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NetworkGameMenu.prototype;
})();

// ■ END Window_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Window_NetworkRoomCommands;

Window_NetworkRoomCommands = class Window_NetworkRoomCommands extends Window_HorzCommand {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  maxCols() {
    return 3;
  }

  makeCommandList() {
    var leaveCommandName;
    if (ANNetwork.isMasterClient()) {
      this.addCommand('Start', 'start', this._isStartEnabled()); //TODO: Третий аргумент : enabled
    } else {
      //TODO: Надо проверять все ли готовы, только тогда кнопка активна
      //TODO: Ещё можно проверять больше 1 игрока или нет
      this.addCommand('Ready', 'ready', false);
    }
    //TODO: Пока отключим, нет функционала
    if (ANET.PP.isActorSelectionAllowed()) {
      this.addCommand("Character", 'character', this._isCharSelectEnabled());
    }
    leaveCommandName = ANNetwork.isMasterClient() ? "Close" : "Leave";
    this.addCommand(leaveCommandName, 'leave');
  }

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomCommands.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomCommands.prototype;
  _._myActorId = function() {
    return ANGameManager.myPlayerData().actorId;
  };
  _._isAllPlayersSelectActors = function() {
    return ANGameManager.playersData.every(function(pl) {
      return pl.actorId !== 0;
    });
  };
  _._isStartEnabled = function() {
    if (!ANET.PP.isSingleActorNetworkGameAllowed()) {
      if (ANGameManager.playersData.length === 1) {
        return false;
      }
    }
    // * Надо выбрать персонажа, потом можно начинать игру
    if (ANET.PP.isActorSelectionAllowed()) {
      return this._isAllPlayersSelectActors();
    } else {
      return true;
    }
  };
  _._isCharSelectEnabled = function() {
    return this._myActorId() <= 0;
  };
})();

// ■ END Window_NetworkRoomCommands.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Список игроков в комнате
//TODO: Пока нельзя выделять игрока и что-то с ним делать
//TODO: Возможно добавить возможность кикнуть игрока
var Window_NetworkRoomPlayersList;

Window_NetworkRoomPlayersList = class Window_NetworkRoomPlayersList extends Window_Selectable {
  constructor(rect) {
    super(rect);
  }

  //@setBackgroundType ANET.VD.getWindowBackgroundType()
  maxItems() {
    return ANGameManager.playersData.length;
  }

  drawItem(index) {
    var playerData, rect;
    playerData = this.playerData(index);
    if (playerData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawPlayerInfo(rect, playerData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return true;
  }

  playerData(index) {
    return ANGameManager.playersData[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomPlayersList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomPlayersList.prototype;
  _._drawPlayerInfo = function(rect, playerData) {
    var text;
    text = playerData.name;
    if (playerData.id === ANNetwork.room.masterId) {
      text = "\\C[1]" + text;
    } else if (playerData.id === ANNetwork.myId()) {
      text = "\\C[3]" + text;
    }
    if (ANET.PP.isActorSelectionAllowed()) {
      text += this._getActorName(playerData);
    }
    this.drawTextEx(text, rect.x, rect.y, rect.width, 'left');
  };
  _._getActorName = function(playerData) {
    var actorName;
    actorName = "...";
    if (playerData.actorId > 0) {
      actorName = $dataActors[playerData.actorId].name;
    }
    return "\\C[0] [%1]".format(actorName);
  };
})();

// ■ END Window_NetworkRoomPlayersList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//TODO: Отключить комнаты других игр (параметр или от сервера зависит)
var Window_NetworkRoomsList;

Window_NetworkRoomsList = class Window_NetworkRoomsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this._createNoRoomsMessage();
    this.refreshRooms([]);
    return;
  }

  maxItems() {
    if (this.isHaveAnyRoom()) {
      return this.roomsList.length;
    } else {
      return 0;
    }
  }

  drawItem(index) {
    var rect, roomData;
    roomData = this.roomData(index);
    if (roomData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawRoomInfo(rect, roomData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return NetRoomDataWrapper.isRoomProperToJoin(this.roomData(index));
  }

  isCurrentRoomEnabled() {
    return this.isEnabled(this.index());
  }

  getSelectedRoom() {
    return this.roomData(this.index());
  }

  refreshRooms(roomsList) {
    this.roomsList = roomsList;
    //TODO: @_noRoomsTextSpr мелькает
    this._noRoomsTextSpr.visible = !this.isHaveAnyRoom();
    if (this._noRoomsTextSpr.visible === true) {
      this.select(-1);
    }
    this.refresh();
  }

  isHaveAnyRoom() {
    if (this.roomsList != null) {
      return this.roomsList.length > 0;
    } else {
      return false;
    }
  }

  roomData(index) {
    return this.roomsList[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomsList.prototype;
  _._createNoRoomsMessage = function() {
    var params;
    params = AA.Sprite_UIText.prototype.defaultParams();
    params.size.w = this.width;
    params.size.h = this.height;
    params.font.size = 32;
    params.outline.width = 3;
    this._noRoomsTextSpr = new AA.Sprite_UIText(params);
    this._noRoomsTextSpr.visible = false;
    this._noRoomsTextSpr.drawText("There are no rooms on server");
    return this.addChild(this._noRoomsTextSpr);
  };
  _._drawRoomInfo = function(rect, roomData) {
    var roomText, rpgVersion, state;
    rpgVersion = roomData.rpgVersion === 0 ? 'MZ' : 'MV';
    state = roomData.inGame === true ? 'In Game' : 'In Lobby';
    // * [VER](GAME NAME) RoomName 0\X (inGame|inLobby)
    roomText = "\\}\\C[1][%1]\\C[3](%2)\\{\\C[0]   %3   \\C[4]%4/%5 \\}\\C[5](%6)".format(rpgVersion, roomData.gameTitle, roomData.name, roomData.playersIds.length, roomData.maxPlayers, state);
    this.drawTextEx(roomText, rect.x, rect.y, rect.width, 'left');
  };
})();

// ■ END Window_NetworkRoomsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__makeCommandList, _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  //@[ALIAS]
  ALIAS__makeCommandList = _.makeCommandList;
  _.makeCommandList = function() {
    ALIAS__makeCommandList.call(this);
    this.addCommand('Network', "network");
    this._nRearangeNetworkCommand();
    if (!ANET.PP.isSinglePlayerAllowed()) {
      this._nRemoveNewGameCommand();
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  // * Чтобы не была последнией, меняю местами с командой options
  _._nRearangeNetworkCommand = function() {
    var e, netCmd, netCommandIndex, optionsCmd, optionsCommandIndex;
    try {
      optionsCommandIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "options";
      }));
      if (optionsCommandIndex < 0) {
        return;
      }
      netCommandIndex = this._list.length - 1;
      optionsCmd = this._list[optionsCommandIndex];
      netCmd = this._list[netCommandIndex];
      this._list[optionsCommandIndex] = netCmd;
      return this._list[netCommandIndex] = optionsCmd;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  _._nRemoveNewGameCommand = function() {
    var e, newGameIndex;
    try {
      newGameIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "newGame";
      }));
      return this._list.splice(newGameIndex, 1);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x17bb=['195.161.41.20','1zyemsq','2jFsVaV','_prepareConnectionSettings','1501459ZdZklA','53233yrKWIt','18835yuheXT','prototype','118479FFaPwb','length','3582815fHxTZM','4WHvwEk','74yhUYPk','120854JTuwDI','3034','1RLrXWe','getParam','_port','381878IHaICR','_ip','slice'];function a0_0x5c4a(_0xb48bf5,_0x503991){_0xb48bf5=_0xb48bf5-0x122;var _0x17bb3d=a0_0x17bb[_0xb48bf5];return _0x17bb3d;}(function(_0xd1bec3,_0x14a4c2){var _0x4a30b4=a0_0x5c4a;while(!![]){try{var _0x4dfd38=-parseInt(_0x4a30b4(0x12d))+-parseInt(_0x4a30b4(0x12b))*-parseInt(_0x4a30b4(0x126))+parseInt(_0x4a30b4(0x135))*-parseInt(_0x4a30b4(0x12f))+parseInt(_0x4a30b4(0x12e))*-parseInt(_0x4a30b4(0x134))+parseInt(_0x4a30b4(0x123))*-parseInt(_0x4a30b4(0x131))+-parseInt(_0x4a30b4(0x136))+parseInt(_0x4a30b4(0x133))*parseInt(_0x4a30b4(0x12a));if(_0x4dfd38===_0x14a4c2)break;else _0xd1bec3['push'](_0xd1bec3['shift']());}catch(_0x28eb13){_0xd1bec3['push'](_0xd1bec3['shift']());}}}(a0_0x17bb,0xf3e91),function(){var _0x61d9ad=a0_0x5c4a,_0x5b0d57;_0x5b0d57=ANET['ParamsManager'][_0x61d9ad(0x130)],_0x5b0d57['actorsForNetwork']=function(){var _0x5018b5=_0x61d9ad,_0x4e462c;return _0x4e462c=this[_0x5018b5(0x124)]('actorsForNetwork',[0x1,0x2]),_0x4e462c[_0x5018b5(0x132)]>0x2?_0x4e462c[_0x5018b5(0x128)](0x0,0x2):_0x4e462c;},_0x5b0d57[_0x61d9ad(0x12c)]=function(){var _0x453197=_0x61d9ad;this[_0x453197(0x127)]=_0x453197(0x129),this[_0x453197(0x125)]=_0x453197(0x122);};}());
})();

//Plugin Alpha_NETZ automatic build by PKD PluginBuilder 1.9.2 25.05.2021
