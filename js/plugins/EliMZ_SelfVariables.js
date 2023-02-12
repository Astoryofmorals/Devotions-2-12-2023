//==========================================================================
// EliMZ_SelfVariables.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc Adds self variables to events!
@author Hakuen Studio | v2.0.0
@url https://hakuenstudio.itch.io/

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

Keep track of a lot of different variables can let you more sensitive to 
make a mistake. That's why self variables come in handy!
It works like self switches, but you can use numbers instead of just 
true/false(ON/OFF). And just use one variable in a lot of events!

============================================================================
Features
============================================================================

● Add self variables to events.
● These self variables are persistent across the map.
● Can be used in the conditions tab of an event page.
● Can be used with control variables default event command.
● Can use plugin command to change the self variable of other events/maps.

============================================================================
How to use
============================================================================

After installing the plugin, the only thing you need to do is name a game 
variable like this:
SV: your variable name here.

It has to start with "SV:" (It is case sensitive).

Now you can use the control variable normally that it will work like a 
self variable.

● You can also use the control variables normally in the conditional 
branch, but you can also use the script call below:

Current event -> this.selfVariableValue(varId)
Other events -> $gameVariables.selfValue([mapId, eventId, varId])

Script call to change values:

Current event -> this.setSelfVariableValue(varId, value)
Other events -> $gameVariables.setSelfValue([mapId, eventId, varId], value)

To change the value of a self variable of other events in the same or 
different map, you can also use the plugin command.

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio

============================================================================
Update log
============================================================================
Version 2.0.0 - 19/03/2021
- Plugin release!

Version 1.0.0 - 12/25/2020
- Plugin release!

@command set
@text Control Self Variables
@desc Change the value of self variables from other events or maps.

@arg mapId
@text Map Id
@type text
@desc Choose a map Id. Leave at 0 to refer to the current map.
@default 0

@arg eventId
@text Event Id
@type text
@desc Choose the event Id.
@default 1

@arg sVar
@text Self Var id
@type text
@desc Choose the var id here.
@default 1

@arg operationType
@text Operation Type
@type select
@option Set
@option Add
@option Sub
@option Mul
@option Div
@option Mod
@desc Choose the operation type.
@default Set

@arg value
@text Value
@type text
@desc You can set the value here. Can use formulas.
@default 0

*/

"use strict"

var Eli = Eli || {};
var Imported = Imported || {};
Imported.Eli_SelfVariables = true;

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin above all Eli plugins.
Please download it for free.`
    const pluginName = (() => {
        const url = String(document.currentScript._url);
        const start = url.indexOf('Eli');
        const end = url.length - 3;
        const pluginName = url.substring(start, end);

        return pluginName;
    })();
    const requiredVersion = ['3','0','0']
    const updateWarning = `${pluginName} needs an updated version of EliMZ_Book.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    };
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook();
            Eli.alert = true;
        }
    };

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook();
            Eli.alert = true;
        }
    };
    
    if(!Imported.Eli_Book) needInstallBook();
    if(Eli.Book.Version < requiredVersion) needUpdateBook();
     
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

{

Eli.SelfVariables = {

    parameters: EliPluginManager.createParameters() || {},
    alias: {},
    currentEventId: 0,

    initialize(){
        EliPluginManager.registerCommands(this);
    },

    set(args){
        const mapId = +args.mapId || $gameMap.mapId();
        const eventId = +args.eventId;
        const varId = +args.sVar;
        const key = [mapId, eventId, varId];
        const newValue = +(EliBook.processEscapeVarOrFormula(args.value));
        const currentValue = $gameVariables.selfValue(key)
        const value = this.calculateValue(args.operationType, currentValue, newValue);

        $gameVariables.setSelfValue(key, value);
    },
    
    calculateValue(operationType, currentValue, newValue){
        switch(operationType){
            case "Set": return newValue;
            case "Add": return currentValue + newValue;
            case "Sub": return currentValue - newValue;
            case "Mul": return currentValue * newValue;
            case "Div": return currentValue / newValue;
            case "Mod": return currentValue % newValue;
        }
    },

};

const Alias = Eli.SelfVariables.alias;
const Plugin = Eli.SelfVariables;

Plugin.initialize();

/* ========================================================================== */
/*                                   OBJECTS                                  */
/* ========================================================================== */

/* -------------------------------- VARIABLES ------------------------------- */

Alias.Game_Variables_clear = Game_Variables.prototype.clear;
Game_Variables.prototype.clear = function() {
    Alias.Game_Variables_clear.call(this);
    this._selfData = {};
};

Game_Variables.prototype.isSelf = function(variableId){
    return !!($dataSystem.variables[variableId] && $dataSystem.variables[variableId].includes("SV:"));
};

Game_Variables.prototype.selfValue = function(key){
    return this._selfData[key] || 0;
};

Game_Variables.prototype.setSelfValue = function(key, value) {
    if(value){
        this._selfData[key] = Math.floor(value) || value;
    }else{
        delete this._selfData[key];
    }

    this.onChange();
};

Alias.Game_Variables_value = Game_Variables.prototype.value;
Game_Variables.prototype.value = function(variableId) {
    const alias = Alias.Game_Variables_value.call(this, variableId);

    if(this.isSelf(variableId)){
        const key = [$gameMap.mapId(), Plugin.currentEventId, variableId];
        return this.selfValue(key);
    }else{
        return alias;
    }
};

Alias.Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
    const oldValue = this._data[variableId] || 0;
    Alias.Game_Variables_setValue.call(this, variableId, value);

    if(this.isSelf(variableId) && Plugin.currentEventId > 0){
        const key = [$gameMap.mapId(), Plugin.currentEventId, variableId];
        this._data[variableId] = oldValue;
        this.setSelfValue(key, value);
    }
};

/* ------------------------------- GAME EVENT ------------------------------- */

Alias.Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
Game_Event.prototype.meetsConditions = function(page) {
    const alias = Alias.Game_Event_meetsConditions.call(this, page);

    if(this.meetsSelfVariableConditions(page)){
        return true;
    }

    return alias;
};

Game_Event.prototype.meetsSelfVariableConditions = function(page){
    const c = page.conditions;

    if (c.variableValid && $gameVariables.isSelf(c.variableId)) {        
        const key = [this._mapId, this._eventId, c.variableId];

        if ($gameVariables.selfValue(key) >= c.variableValue) {
            return true;
        }
    }

    return false;
};

/* ---------------------------- GAME INTERPRETER ---------------------------- */

Game_Interpreter.prototype.selfVariableValue = function(variableId) {
    if($gameVariables.isSelf(variableId)){
        const key = [this._mapId, this._eventId, variableId];
        return $gameVariables.selfValue(key);
    }else{
        return 0;
    }
};

Game_Interpreter.prototype.setSelfVariableValue = function(variableId, value) {
    if($gameVariables.isSelf(variableId)){
        const key = [this._mapId, this._eventId, variableId];
        return $gameVariables.setSelfValue(key, value);
    }
};

// Control variable
Alias.Game_Interpreter_command122 = Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function(params) {
    if(this._eventId){
        Plugin.currentEventId = this._eventId;
    }

    return Alias.Game_Interpreter_command122.call(this, params);
};

// Conditional Branch
Alias.Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function(params) {
    if(params[0] == 1 && this._eventId > 0){
        Plugin.currentEventId = this._eventId;
    }

    return Alias.Game_Interpreter_command111.call(this, params);
};

}