//==========================================================================
// EliMZ_SelfSwitches.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_SelfVariables

@plugindesc v3.0.0 - Enhance the self switch commands and functionality.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-self-switches-for-rpg-maker-mz

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

You know that you can enable/disable self switches from an event page. But 
if you want to turn on/off a self switch of other events you will have to 
use the script call. The thing is that not everyone is familiar with the 
script call command.

This plugin enables you to turn on/off the self switch of other events
(even more than one) with a simple and easy plugin command!
Also add new self switches to events!

============================================================================
Features
============================================================================

● Turn on/off/toggle self switches of one or more events with a plugin 
command.
● Add more self switches to events.
● Change the value of self switches with a delay(frames/seconds/minutes)

============================================================================
How to use
============================================================================

To use more self switches than the default ones(A, B, C, D) you have to 
name a regular switch like that: "SS: E"(without quotes, it's not case 
sensitive).
You can use it in page conditions too.

The plugin will auto remove the "SS:" and any white space, 
leaving only the "E".

So, you can check the value like any other self switch in the conditional 
branch script call:
$gameSelfSwitches.value([1, 12, "E"])

Then if you want to activate the new self switch "E", use the plugin 
command and just put "E" in the self switch field.

The plugin command also have a delay argument. If it is greater than zero, 
then the self switch will change it's value according to the delay 
set(frames, seconds or minutes).

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
Version 3.0.0 - 08/09/2020
- Now you can turn self switches with a delay in frames, seconds or minutes.
- Adapted to work with Eli Book 4.0.0.

Version 2.1.0 - 07/23/2021
- Add an option to change various self switches values at the same time.

Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.

Version 1.0.1 - 11/24/2020
- Code clean up.

Version 1.0.0 - 11/14/2020
- Plugin release!

@command changeValue
@text Change
@desc Change a self switch value

@arg mapId
@text Map Id
@type text
@desc Choose a map Id. Leave at 0 to refer to the current map.
@default 0

@arg eventId
@text Event Id
@type text
@desc Leave at zero to refer to current event. Separate each one with a comma.
@default 0

@arg sswitch
@text Self Switch
@type text
@desc Choose a self switch letter. It is not case sensitive. Separate each one with a comma.
@default A

@arg value
@text Value
@type select
@option true
@option false
@option toggle
@desc Choose either false, true or toogle.
@default true

@arg delay
@text Delay value
@type text
@desc Set a time delay for the self switch to change. Leave at zero for instant.
@default 0

@arg unit
@text Delay Unit
@type select
@option frames
@option seconds
@option minutes
@desc Choose the unit that will be applied to the delay.
@default frames
@parent delay

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SelfSwitches = true

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin above all Eli plugins.
Please download it for free.`
    const pluginName = (() => {
        const srcScript = document.currentScript.src
        const start = srcScript.lastIndexOf("/") + 1
        const end = srcScript.lastIndexOf(".js")
        const pluginName = srcScript.substring(start, end)

        return pluginName
    })();
    const requiredVersion = ['4','0','0'];
    const updateWarning = `${pluginName} needs the EliMZ_Book ${requiredVersion} version.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    }
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook()
            Eli.alert = true
        }
    }

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook()
            Eli.alert = true
        }
    };
    
    if(!Imported.Eli_Book) needInstallBook()
    if(Eli.Book.Version < requiredVersion) needUpdateBook()
     
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

{

Eli.SelfSwitches = {

    parameters: {},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){},

    initPluginCommands(){
        const commands = ["changeValue"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    processValue(args, key){
        if(args.value === "toggle"){
            return !$gameSelfSwitches.value(key)

        }else{
            return args.value === "true"
        }
    },

    getTimeOut(args){
        const timeUnit = args.unit
        const timeValue = Number(args.delay)
        switch(timeUnit){
            case "frames": return Eli.Utils.framesToMiliSeconds(timeValue)
            case "seconds": return timeValue * 1000
            case "minutes": return timeValue * 60 * 1000
        }
    },

    changeValue(args){
        const ms = this.getTimeOut(args)

        setTimeout(() => {

            const mapId = Number(args.mapId) || $gameMap.mapId()
            const events = args.eventId.split(",")
            const sswitch = Eli.String.removeSpaces(args.sswitch.toUpperCase()).split(",")
    
            for(let eventId of events){
                eventId = Number(eventId) || Eli.PluginManager.currentEventId
    
                for(const switchKey of sswitch){
                    const key = [mapId, eventId, switchKey]
                    const value = this.processValue(args, key)
                    $gameSelfSwitches.setValue(key, value)
                }
    
            }
        }, ms)
    },

}

const Plugin = Eli.SelfSwitches
const Alias = Eli.SelfSwitches.alias

Plugin.initialize()

/* ========================================================================== */
/*                                 GAME EVENT                                 */
/* ========================================================================== */

Alias.Game_Event_meetsConditions = Game_Event.prototype.meetsConditions
Game_Event.prototype.meetsConditions = function(page){
    const alias = Alias.Game_Event_meetsConditions.call(this, page)

    if(this.meetsSelfSwitchConditions(page)){
        return true
    }

    return alias
}

Game_Event.prototype.meetsSelfSwitchConditions = function(page){
    const c = page.conditions
    const dataSwitches = $dataSystem.switches
    const sw1Id = dataSwitches[c.switch1Id].toUpperCase()
    const sw2Id = dataSwitches[c.switch2Id].toUpperCase()

    if(sw1Id.includes("SS:")){
        const letter = Eli.String.removeSpaces(sw1Id.substr(3))
        const key = [this._mapId, this._eventId, letter]
        const ssValue = $gameSelfSwitches.value(key)

        if(ssValue){
            return true
        }
    }

    if(sw2Id.includes("SS:")){
        const letter = Eli.String.removeSpaces(sw2Id.substr(3))
        const key = [this._mapId, this._eventId, letter]
        const ssValue = $gameSelfSwitches.value(key)

        if(ssValue){
            return true
        }
    }

    return false
}

}