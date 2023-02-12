/* ------------------------------ HELP ENGLISH ------------------------------ */
{

/*:
@target MZ

@plugindesc v4.0.0 - Essential plugin for all Eli plugins.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-book-rpg-maker-mv-mz

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

This plugin optimizes all of my other plugins, making them less code and
easier to maintain and implement improvements. Also, add some little things
to playtest games.

============================================================================
Features
============================================================================

● Provide methods and code that add a better performance on all Eli 
plugins.
● Optionally let you use MV animations with all MV features.
● Optionally set Pixel Perfect to your game.
● Optionally Disable Effekseer.
● Optionally remove scroll bars for games with low resolution.
● Add playtest settings to automatically open Dev Tools.
● Set dev tools and game window positions.
● Quickly debug your game with the Dev Tools Focus option.
● A quick restart of your playtest using F5.

============================================================================
How to use
============================================================================

Put above all other Eli plugins.

♦ MV Animation ♦

Although you can already use MV animation without a plugin, some little 
things need to be adjusted for it to work better, and this plugin does it.

♦ Disable Effekseer ♦

This is an experimental attempt to disable Effekseer from the core codes.
But to completely disable it, you need to replace the Main.js with the 
one provided with this plugin.

♦ Pixel Perfect ♦

Setting this to true will make your game pixel perfect.

♦ Window Scroll Bars ♦

If you ever used low resolutions on your game, you may have encountered 
an issue that the game window was showing the system scroll bars on the 
side.
Setting this to true will remove the scroll bars.

♦ Dev Tools Focus ♦

If you use the Dev tools(F12), you will notice that when it is open, 
your game stops running. With this setting on, your game will still run 
even with the Dev Tools opened.

♦ Quick F5 ♦

Press F5 to restart the game application no longer closes the game window 
and opens again. I just restart your game without closing it.

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
Version 4.0.0 - 08/24/2021
- Added plugin parameters that make testing the game easier.
- Added plugin parameter to make the game pixel perfect.
- Added plugin parameter to disable Effekseer
- Code almost completely rewritten. Older versions of dependent plugins may 
not work. Make sure you have downloaded dependent plugin updates as well.
Version 3.3.2 - 05/08/2021
- Fixed a crash with VisuMZ_1_EventsMoveCore when spawn events.
Version 3.3.1 - 05/06/2021
- Fixed a bug when checking the type of a data object.
Version 3.3.0 - 05/03/2021
- Added Game Pad button codes.
Version 3.2.0 - 02/08/2021
- Improvements on the Eli.ColorManager object.
Version 3.1.0 - 01/30/2021
- Add method to get the event id where a plugin command is executed.
Version 3.0.0 - 12/18/2020
- Reorganized the Eli.Book object.
- Added Eli.Book.PluginManager, Eli.Book.Easing and Eli.Book.ColorManager.
Version 2.3.1 - 12/16/2020
- Add compatibility patch to Galv_EventSpawnerMZ.js
Version 2.3.0 - 11/28/2020
- Changed the way plugin gets the ease type.
- Add a full keyboard code object.
Version 2.2.0 - 11/11/2020
- Fixed a bug when evaluate some expressions with eli.needEval().
- Adds a custom scene base.
- Adds log e log table functions.
- Add easing functions from Robert Penner.
- Add method to get the next and previous event commands on game 
interpreter.
Version 2.1.1 - 10/28/2020
- Fixed a bug that gives an error in some plugin commands.
Version 2.1.0 - 20/10/2020
• Method to read map data that are not loaded.
• Some methods to convert especific plugin parameters that define 
blend mode, picture origin and easying type.
Version 2.0.0 - 10/16/2020
• Add ui parameter on setPresetPos.
• Add new method to check the type of a $dataObject.
• Add new classes to cover MV animations in any sprite.
• Add new method to processEscapeCharacters or formula(eval).
• Add new method to convert escape characters on plugin command/arguments.
• Add new method to process plugin paramenters.
• Add new method to register plugin commands.
Version 1.3.0 - 09/26/2020
• Created my own button class
Version 1.2.0 - 09/23/2020
• Changed the convert colors function.
Version 1.1.0 - 09/16/2020
• Add new methods(see more on help file):
• eli.ruleOf3 (don't laugh... xD)
• eli.centerX
• eli.centerY
• eli.centerPos
• eli.divideByTheLargest
• Sprite.prototype.scaledWidth
• Sprite.prototype.scaledHeight
• Sprite.prototype.stretchScaleToScreen
• ImageManager.saveOldCache
• ImageManager.restoreOldCache
Version 1.0.0 - 10/09/2020
• Plugin release!

@param engine
@text Engine Settings
@type struct<engineSt>
@desc Mv Animation Settings
@default {"mvAnimation":"{\"enable\":\"false\",\"directory\":\"\",\"smooth\":\"false\",\"rate\":\"4\"}","pixelPerfect":"false","disableEffekseer":"false","styleOverflow":"false"}

@param playtest
@text Playtest Settings
@type struct<developerSt>
@desc
@default {"openDevTools":"false","nwWindowPos":"0, 0","gameFocus":"false","quickRestart":"true"}

*/

/* ----------------------------- ENGINE SETTINGS ---------------------------- */
{

/*~struct~engineSt:

@param mvAnimation
@text Mv Animation
@type struct<mvAnimationSt>
@desc Mv Animation Settings
@default false

@param pixelPerfect
@text Pixel Perfect
@type boolean
@desc
@default false

@param disableEffekseer
@text Disable Effekseer
@type boolean
@desc Set it to true, wil completely wipe out any effekseer reference from your code.
@default false

@param styleOverflow
@text Window Scroll Bars
@type boolean
@desc Remove the scroll bars of the game window that can appear when resolution is low.
@default true

*/

}

/* -------------------------------- PLAY TEST ------------------------------- */
{
/*~struct~developerSt:

@param openDevTools
@text Open Dev Tools
@type boolean
@desc If true, it will open the Dev Tools automatically.
@default false

@param nwWindowPos
@text Game Window Position
@type text
@desc Change the game window position when open Dev Tools. Separate X, Y with a comma. Set -1 to not change.
@default 51, 187

@param gameFocus
@text Dev Tools Focus
@type boolean
@desc If true, the game will keep playing even with the Dev Tools opened.
@default false

@param quickRestart
@text Quick F5
@type boolean
@desc If true, when press F5 the game will reload faster.
@default false

*/
}

/* ------------------------------ MV ANIMATION ------------------------------ */
{

/*~struct~mvAnimationSt:

@param enable
@text Enable
@type boolean
@desc Mv Animation Settings
@default false

@param smooth
@text Smooth Flashes
@type boolean
@desc If true, it will change the behavior of the target/screen flash animations. See help file.
@default false

@param rate
@text Animation rate
@type number
@desc Set this to 1 if you are using smooth animation. Default is 4.
@default 4

*/

}

} // End Help English

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_Book = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

{

Eli.String = {

    regRemoveSpace: /\s/g,

    removeSpaces(str){
        return str.replace(this.regRemoveSpace, "")
    },
}

Eli.Array = {

    shuffle(array){
        const shuffleArray = []
            
        while(array.length > 0){
            const randomIndex = Math.floor(Math.random() * array.length)
            const randomElement = array.splice(randomIndex, 1)

            shuffleArray.push(randomElement[0])
        }
        
        return shuffleArray
    },

}

Eli.Utils = {

    regExtractMeta: /<([^<>:]+)(:?)([^>]*)>/g,
    regRemoveEscapeCodes: /(\\.\[[^]])/gi,
    regVariable1: /\x1b\x1b/g,
    regVariable2: /\x1bV\[(\d+)\]/gi,

    makeDeepCopy(object){ // Thanks to LTN games!
        const parseObject = function(string)  {
            try {
                return JSON.parse(string, (key, value) => {
                    try {
                        return parseObject(value)
                    } catch (e) {
                        return value
                    }
                })
            } catch (e) {
                return string
                }
        }

        return parseObject(JSON.stringify(object))
    },

    isMVAnimation(animation) {
        return !!animation.frames
    },

    getIdByName(searchName, data){
        return searchName
    },

    miliSecondsToFrames(ms){
        return Math.floor( ms / 1000 * 60)
    },

    secondsToFrames(seconds){
        return Math.floor(seconds * 60)
    },

    minutesToFrames(minutes){
        return Math.floor(minutes * Math.pow(60, 2) )
    },

    hoursToFrames(hours){
        return Math.floor( hours * Math.pow(60, 3) )
    },

    framesToMiliSeconds(frames){
        return Math.floor( frames * 1000 / 60)
    },

    framesToSeconds(frames){
        return Math.floor(frames / 60)
    },

    framesToMinutes(frames){
        return Math.floor( frames / Math.pow(60, 2))
    },

    framesToHours(frames){
        return Math.floor( frames / Math.pow(60, 3) )
    },

    isRpgMakerMV(){
        return Utils.RPGMAKER_NAME === "MV"
    },

    isRpgMakerMZ(){
        return Utils.RPGMAKER_NAME === "MZ"
    },

    calculateScreenPosition(align, offset, size, coordinate = "x"){
        const screenSize = coordinate === "x" ? Graphics.width : Graphics.height
        const mainSize = screenSize - size

        switch(align){
            case "center":  
                return (mainSize / 2) + offset
            case "right":
            case "bottom":  
                return mainSize + offset
            case "left":
            case "top":
                return 0 + offset
        }

        return offset
    },
    
    centerXPos(objWidth, baseWidth = Graphics.width){
        return Math.abs(objWidth - baseWidth) / 2
    },

    centerYPos(objHeight, baseHeight = Graphics.height){
        return Math.abs(objHeight - baseHeight) / 2
    },

    centerPos(objWidth, objHeight, baseWidth, baseHeight){
        return {
            x:  this.centerXPos(objWidth, baseWidth),
            y:  this.centerYPos(objHeight, baseHeight),
        }
    },

    divideByTheLargest(num1, num2){
        const max = Math.max(num1, num2)
        const min = Math.min(num1, num2)

        return max / min
    },

    isDataActor(data) {
        return data.hasOwnProperty("nickname")
    },
    
    isDataArmor(data) {
        return data.hasOwnProperty("atypeId")
    },
    
    isDataClass(data) {
        return data.hasOwnProperty("learnings")
    },
    
    isDataEnemy(data) {
        return data.hasOwnProperty("dropItems")
    },
    
    isDataItem(data) {
        return data.hasOwnProperty("itypeId")
    },
    
    isDataMapInfo(data) {
        return data.hasOwnProperty("expanded")
    },
    
    isDataSkills(data) {
        return data.hasOwnProperty("stypeId")
    },
    
    isDataStates(data) {
        return data.hasOwnProperty("stepsToRemove")
    },
    
    isDataSystem(data) {
        return data.hasOwnProperty("locale")
    },
    
    isDataTroops(data) {
        return data.hasOwnProperty("members")
    },
    
    isDataWeapon(data) {
        return data.hasOwnProperty("wtypeId")
    },

    isEvent(character){
        return character instanceof Game_Event
    },
    
    isPlayer(character){
        return character instanceof Game_Player
    },
    
    isFollower(character){
        return character instanceof Game_Follower
    },

    isVehicle(character){
        return character instanceof Game_Vehicle
    },

    scene(){
        return SceneManager._scene
    },

    isScene(scene){
        return this.scene() instanceof scene
    },

    convertEscapeVariablesOnly(text){
        text = text.replace(/\\/g, '\x1b')
        text = text.replace(this.regVariable1, '\\')
        text = text.replace(this.regVariable2, function() {
            return $gameVariables.value(+arguments[1])
        }.bind(this))

        return text
    },

    convertEscapeCharacters(text){
        const rect = new Rectangle(0,0,0,0)
        const tempWin = new Window_Base(rect)
        text = tempWin.convertEscapeCharacters(text)

        return text
    },

    processDynamicValues(type, value) {
        switch(type){
            case "Number": return Number(value)
            case "Text": return value
            case "Eval": try {return eval(value)} catch(err){return value}
        }

    },

    needEval(param) {
        if(isNaN(param)){

            try{
                return eval(param)
            }catch(err){
                return param
            }

        }else{
            return param
        }
    },

    processEscapeVarOrFormula(arg){
        if(typeof arg !== 'string') return arg
        
        const rawArg = arguments[0]
        arg = this.convertEscapeVariablesOnly(rawArg)
        if(rawArg === arg){
            return this.needEval(arg)
        }else{
            return arg
        }
    },

    getDefaultEasingType(type){
        const easingType = ["Constant speed", "Slow start", "Slow end", "Slow start and end"];
        return easingType.indexOf(type);
    },
    
    getPicOrigin(type){
        const origin =  {
            UpperLeft: 0,
            Center: 1,
        };

        return origin[type];
    },

    getBlendMode(mode){
        const blend =  {
            Normal: 0,
            Additive: 1,
            Multiply: 2,
            Screen: 3
        }

        return blend[mode]
    },

    getDataMap(mapId) {
        const xhr = new XMLHttpRequest()
        const fileName = "Map%1.json".format(mapId.padZero(3))
        const url = "data/" + fileName

        xhr.open("GET", url, false)
        xhr.send()

        return JSON.parse(xhr.responseText)
    },

    getTextWidth(text){
        const tempWin = new Window_Base(new Rectangle(0, 0, 1000, 1000))

        return tempWin.textSizeEx(text).width
    },

}

Eli.KeyCodes = {
    keyboard: {
        backspace:8, tab:9, enter:13, shift:16, ctrl:17, alt:18, pausebreak:19, capslock:20, 
        esc:27, space:32, pageup:33, pagedown:34, end:35, home:36, 
        leftarrow:37, uparrow:38, rightarrow:39, downarrow:40, insert:45, delete:46, 
        0:48, 1:49, 2:50, 3:51, 4:52, 5:53, 6:54, 7:55, 8:56, 9:57, 
        a:65, b:66, c:67, d:68, e:69, f:70, g:71, h:72, i:73, j:74, k:75, l:76, m:77, n:78, 
        o:79, p:80, q:81, r:82, s:83, t:84, u:85, v:86, w:87, x:88, y:89, z:90, 
        leftwindowkey:91, rightwindowkey:92, selectkey:93, 
        numpad0:96, numpad1:97, numpad2:98, numpad3:99, numpad4:100, numpad5:101, 
        numpad6:102, numpad7:103, numpad8:104, numpad9:105, 
        multiply:106, add:107, subtract:109, decimalpoint:110, divide:111, 
        f1:112, f2:113, f3:114, f4:115, f5:116, f6:117, f7:118, f8:119, f9:120, f10:121, f11:122, f12:123,
        numlock:144, scrolllock:145, semicolon:186, equalsign:187, comma:188, dash:189, period:190,
        forwardslash:191, graveaccent:192, openbracket:219, backslash:220, closebracket:221, singlequote:222
    },

    gamepad: {
        a: 0, b: 1, x: 2, y: 3, lb: 4, rb: 5, lt: 6, rt: 7, select: 8,
        start: 9, l3: 10, r3: 11, up: 12, down: 13, left: 14, right: 15
    },

    defaultKeyboard: [
        9, 13, 16, 17, 18, 27, 32, 33, 34, 37, 38, 39, 
        40, 45, 81, 87, 88, 90, 96, 98, 100, 102, 104, 120
    ],

    defaultGamepad: [0, 1, 2, 3, 4, 5, 12, 13, 14, 15],

    isDefaultKeyboard(keyCode){
        return this.defaultKeyboard.includes(keyCode)
    },

    isDefaultGamepad(keyCode){
        return this.defaultGamepad.includes(keyCode)
    },
}

Eli.PluginManager = {

    currentEventId: 0,
    currentInterpreter: null,

    getPluginName(){
        const srcScript = document.currentScript.src
        const start = srcScript.lastIndexOf("/") + 1
        const end = srcScript.lastIndexOf(".js")
        const pluginName = srcScript.substring(start, end)

        return pluginName
    },

    convertParameters(parameters){ // Thanks to LTN games!
        const parseParameters = function(string)  {
            try {
                return JSON.parse(string, (key, value) => {
                    try {
                        return parseParameters(value)
                    } catch (e) {
                        return value
                    }
                })
            } catch (e) {
                return string
                }
        }

        return parseParameters(JSON.stringify(parameters));
    },

    createParameters(){
        const pluginName = this.getPluginName()
        const rawParameters = PluginManager.parameters(pluginName)
        const param = this.convertParameters(rawParameters)

        return param
    },

    registerCommands(plugin, commands){
        if(Eli.Utils.isRpgMakerMV()) return
        const pluginName = this.getPluginName()

        for(const command of commands){
            const callBack = command
            PluginManager.registerCommand(pluginName, command, plugin[callBack].bind(plugin))
        }
    },

    getCommandNames(plugin){
        if(Eli.Utils.isRpgMakerMV()) return []
        const commands = []
        for(const prop in plugin){
            if(prop.startsWith("cmd_")){
                commands.push(prop)
            }
        }
        return commands
    },
}

Eli.ColorManager = {

    names: [
            "ALICEBLUE", "ANTIQUEWHITE", "AQUA", "AQUAMARINE", "AZURE", "BEIGE", "BISQUE", "BLACK", "BLANCHEDALMOND", "BLUE", "BLUEVIOLET", "BROWN", 
            "BURLYWOOD", "CADETBLUE", "CHARTREUSE", "CHOCOLATE", "CORAL", "CORNFLOWERBLUE", "CORNSILK", "CRIMSON", "CYAN", "DARKBLUE", "DARKCYAN", 
            "DARKGOLDENROD", "DARKGRAY", "DARKGREY", "DARKGREEN", "DARKKHAKI", "DARKMAGENTA", "DARKOLIVEGREEN", "DARKORANGE", "DARKORCHID", "DARKRED", 
            "DARKSALMON", "DARKSEAGREEN", "DARKSLATEBLUE", "DARKSLATEGRAY", "DARKSLATEGREY", "DARKTURQUOISE", "DARKVIOLET", "DEEPPINK", "DEEPSKYBLUE", 
            "DIMGRAY", "DIMGREY", "DODGERBLUE", "FIREBRICK", "FLORALWHITE", "FORESTGREEN", "FUCHSIA", "GAINSBORO", "GHOSTWHITE", "GOLD", "GOLDENROD", 
            "GRAY", "GREY", "GREEN", "GREENYELLOW", "HONEYDEW", "HOTPINK", "INDIANRED", "INDIGO", "IVORY", "KHAKI", "LAVENDER", "LAVENDERBLUSH", 
            "LAWNGREEN", "LEMONCHIFFON", "LIGHTBLUE", "LIGHTCORAL", "LIGHTCYAN", "LIGHTGOLDENRODYELLOW", "LIGHTGRAY", "LIGHTGREY", "LIGHTGREEN", 
            "LIGHTPINK", "LIGHTSALMON", "LIGHTSEAGREEN", "LIGHTSKYBLUE", "LIGHTSLATEGRAY", "LIGHTSLATEGREY", "LIGHTSTEELBLUE", "LIGHTYELLOW", 
            "LIME", "LIMEGREEN", "LINEN", "MAGENTA", "MAROON", "MEDIUMAQUAMARINE", "MEDIUMBLUE", "MEDIUMORCHID", "MEDIUMPURPLE", "MEDIUMSEAGREEN", 
            "MEDIUMSLATEBLUE", "MEDIUMSPRINGGREEN", "MEDIUMTURQUOISE", "MEDIUMVIOLETRED", "MIDNIGHTBLUE", "MINTCREAM", "MISTYROSE", "MOCCASIN", 
            "NAVAJOWHITE", "NAVY", "OLDLACE", "OLIVE", "OLIVEDRAB", "ORANGE", "ORANGERED", "ORCHID", "PALEGOLDENROD", "PALEGREEN", "PALETURQUOISE", 
            "PALEVIOLETRED", "PAPAYAWHIP", "PEACHPUFF", "PERU", "PINK", "PLUM", "POWDERBLUE", "PURPLE", "REBECCAPURPLE", "RED", "ROSYBROWN", "ROYALBLUE", 
            "SADDLEBROWN", "SALMON", "SANDYBROWN", "SEAGREEN", "SEASHELL", "SIENNA", "SILVER", "SKYBLUE", "SLATEBLUE", "SLATEGRAY", "SLATEGREY", "SNOW", 
            "SPRINGGREEN", "STEELBLUE", "TAN", "TEAL", "THISTLE", "TOMATO", "TURQUOISE", "VIOLET", "WHEAT", "WHITE", "WHITESMOKE", "YELLOW", "YELLOWGREEN",
        ],

    // Thanks! - https://css-tricks.com/converting-color-spaces-in-javascript/
    nameToRGB(name) {
        // Create fake div
        const fakeDiv = document.createElement("div")
        fakeDiv.style.color = name
        document.body.appendChild(fakeDiv)

        // Get color of div
        const cs = window.getComputedStyle(fakeDiv)
        const pv = cs.getPropertyValue("color")
        
        // Remove div after obtaining desired color value
        document.body.removeChild(fakeDiv)

        return pv
    },

    hexToRgb(hex) {       
        const r = this.getHexValue(hex, 1, 3)
        const g = this.getHexValue(hex, 3, 5)
        const b = this.getHexValue(hex, 5, 7)
        const hasAlpha = hex.length > 7
        let color = ''

        if(hasAlpha){
            const a = this.getHexValue(hex, 7, 9)
            color = `rgba(${r}, ${g}, ${b}, ${a})`

        }else{
            color = `rgb(${r}, ${g}, ${b})`
        }

        return color
    },

    getHexValue(hex, start, end){
        return parseInt(hex.slice(start, end), 16)
    },

    isHexColor(color){
        return color[0] === '#'
    },

    isRgb(color){
        return !isNaN(color[0])
    },

    isHtmlColor(color){
        return isNaN(color[0])
    },

    getColorType(color){
        if(this.isHexColor(color)){
            return 'hex'

        }else if(this.isRgb(color)){
            return 'rgb'

        }else if(this.isHtmlColor(color)){
            return 'html'

        }else{
            console.log(`The string ${color} is not a valid color format`)
        }
    },

    formatColorToArray(color){
        if(!color.includes('(')){
            color = `(${color})`
        }
        
        const start = color.indexOf('(')
        const end = color.indexOf(')')
        const colorValues = color.slice(start+1, end)        
        return colorValues.split(',').map(item => +item);
    },

    convert(color, needArray){
        const colorType = this.getColorType(color);
 
        switch(colorType){
            case 'hex': 
                color = this.hexToRgb(color)
                break
            case 'html': 
                color = this.nameToRGB(color)
                break
        }

        if(needArray){
            color = this.formatColorToArray(color)
        }

        return color
    },

}

Eli.EventManager = {

    App: null,

    setApp(){
        this.App = Eli.Utils.isRpgMakerMZ() ? Graphics._app : Graphics._renderer
    }
}

Eli.Book = {

    Version: ['4', '0', '0'],
    parameters: {
        engine: {
            mvAnimation: {enable: false, directory: '', smooth: false, rate: 0},
            pixelPerfect: false,
            disableEffekseer: false,
            styleOverflow: false,
        },
        playtest: {openDevTools: false, nwWindowPos: -1, gameFocus: false, quickRestart: false},

    },
    alias: {},

    initialize(){
        this.initParameters()
        this.setDocumentStyle()
        window.addEventListener("load", this.onWindowLoad.bind(this))
    },

    initParameters(){
        const parameters = Eli.PluginManager.createParameters()
        this.parameters = parameters
    },

    setDocumentStyle(){
        document.body.style.overflow = this.engine().styleOverflow ? "hidden" : ""
    },

    param(){
        return this.parameters
    },

    engine(){
        return this.parameters.engine
    },

    playtest(){
        return this.parameters.playtest
    },

    getMvAnimation(){
        return this.parameters.engine.mvAnimation
    },

    isPixelPerfect(){
        return this.parameters.engine.pixelPerfect
    },

    onWindowLoad(){
        if(Utils.isNwjs() && Utils.isOptionValid("test")){

            if(this.playtest().openDevTools){
                nw.Window.get().showDevTools()
               
                const [x, y] =  this.playtest().nwWindowPos.split(",").map(item => Number(item))
                if(x > -1){
                    nw.Window.get().x = x
                    nw.Window.get().y = y
                }
                setTimeout(() => {nw.Window.get().focus()}, 1500)

            }
        }
    },

    cmd_callScene(args){
        const sceneClass = args.name

        if(sceneClass === "Scene_Status"){
            const index = Number(args.actorId)
            const partyMember = this.members()[index]
            $gameParty.setMenuActor(partyMember)
            SceneManager.push(window[sceneClass])
            
        }else if(sceneClass === "Scene_Name"){
            const actorId = Number(args.actorId)
            const maxCharacters = args.maxCharacters
            Eli.PluginManager.currentInterpreter._params = [actorId, maxCharacters]
            Eli.PluginManager.currentInterpreter.command303()

        }else{
            SceneManager.push(window[sceneClass])
        }
    },

}

Eli.Book.initialize()

/* ---------------------------- DISABLE EFFEKSEER --------------------------- */
if(Eli.Book.engine().disableEffekseer && Eli.Utils.isRpgMakerMZ()){

SceneManager.updateEffekseer = function() {
    // if (Graphics.effekseer) {
    //     Graphics.effekseer.update();
    // }
}

EffectManager.isReady = function() {
    // this.checkErrors();
    // for (const url in this._cache) {
    //     const effect = this._cache[url];
    //     if (!effect.isLoaded) {
    //         return false;
    //     }
    // }
    return true
}

EffectManager.clear = function() {
    // for (const url in this._cache) {
    //     const effect = this._cache[url];
    //     Graphics.effekseer.releaseEffect(effect);
    // }
    this._cache = {}
}

}

/* ========================================================================== */
/*                                  SAVE DATA                                 */
/* ========================================================================== */

function Eli_SavedContents() {
    this.initialize.apply(this, arguments)
}

Eli_SavedContents.prototype.initialize = function(){
    this.contents = {}
}

Eli_SavedContents.prototype.createNewContent = function(pluginName){
    this.contents[pluginName] = {}
}

Eli_SavedContents.prototype.createContentWithPluginParameters = function(pluginName, pluginParameters){
    this.contents[pluginName] = Utils.makeDeepCopy(pluginParameters)
}

Eli_SavedContents.prototype.addNewDataToContent = function(pluginName, newData, value){
    this.contents[pluginName][newData] = value
}

var $eliData = null

/* ========================================================================== */
/*                                    MAKER                                   */
/* ========================================================================== */

{

const Alias = Eli.Book.alias

/* ========================================================================== */
/*                                    CORE                                    */
/* ========================================================================== */

/* -------------------------------- GRAPHICS -------------------------------- */
{

Alias.Graphics_createCanvas = Graphics._createCanvas
Graphics._createCanvas = function() {
    Alias.Graphics_createCanvas.call(this)
    if(Eli.Book.isPixelPerfect()){
        document.body.style.imageRendering = "pixelated"
        document.getElementById("gameCanvas").style.imageRendering = "pixelated"
    }
}

Alias.Graphics_setupPixi = Graphics._setupPixi
Graphics._setupPixi = function() {
    Alias.Graphics_setupPixi.call(this)
    if(Eli.Book.isPixelPerfect()){
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
    }
}

}

/* --------------------------------- BITMAP --------------------------------- */
{

Alias.Bitmap_updateScaleMode = Bitmap.prototype._updateScaleMode
Bitmap.prototype._updateScaleMode = function() {
    if(this._baseTexture && Eli.Book.isPixelPerfect()){
        this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
    }else{
        Alias.Bitmap_updateScaleMode.call(this)
    }
}

Alias.Bitmap_createBaseTexture = Bitmap.prototype._createBaseTexture
Bitmap.prototype._createBaseTexture = function(source) {
    if(this.context && Eli.Book.isPixelPerfect()) {
        this.context.imageSmoothingEnabled = false
        this.context.lineCap = "square"
        this.context.lineJoin = "miter"
    }
    
    Alias.Bitmap_createBaseTexture.call(this, source)
}

}

/* --------------------------------- SPRITE --------------------------------- */
{

Alias.Sprite_initialize = Sprite.prototype.initialize
Sprite.prototype.initialize = function(bitmap) {
    Alias.Sprite_initialize.call(this, bitmap)
    this._animationSpritesMz = []
    this.initMVAnimationProp()
    this.createMainRect()
}

Sprite.prototype.createMainRect = function(){
    this.mainRect = new Rectangle(this.x, this.y, this.width, this.height)
}

Sprite.prototype.refreshMainRect = function(skipUpdate){
    const global = this.getGlobalPosition(new Point(), skipUpdate)
    this.mainRect = new Rectangle(global.x, global.y, this.width, this.height)
}

Sprite.prototype.scaledWidth = function(){
    return this.scale.x * this.width
}

Sprite.prototype.scaledHeight = function(){
    return this.scale.y * this.height
}

Sprite.prototype.scaledFrameWidth = function(){
    return this.scale.x * this._frame.width
}

Sprite.prototype.scaledFrameHeight = function(){
    return this.scale.y * this._frame.height
}

Sprite.prototype.centerPositionX = function(baseWidth){
    const x = Eli.Utils.centerXPos(this.scaledWidth(), baseWidth)
    this.x = x
}

Sprite.prototype.centerPositionY = function(baseHeight){
    const y = Eli.Utils.centerYPos(this.scaledHeight(), baseHeight)
    this.y = y
}

Sprite.prototype.centerPositionTo = function(baseWidth, baseHeight){
    const x = Eli.Utils.centerXPos(this.scaledWidth(), baseWidth)
    const y = Eli.Utils.centerYPos(this.scaledHeight(), baseHeight)
    this.move(x, y)
}

Sprite.prototype.stretchScaleTo = function(keepRatio, baseWidth = Graphics.width, baseHeight = Graphics.height){
    const bitmapWidth = this.width
    const bitmapHeight = this.height
    const upScale = baseWidth > bitmapWidth || baseHeight > bitmapHeight

    if(keepRatio){
        const widthRatio = baseWidth / bitmapWidth
        const heightRatio = baseHeight / bitmapHeight
        const finalScale = Math.min(widthRatio, heightRatio)

        this.scale.set(finalScale, finalScale)

    }else{
        const widthRatio = Eli.Utils.divideByTheLargest(bitmapWidth, baseWidth)
        const heightRatio = Eli.Utils.divideByTheLargest(bitmapHeight, baseHeight)
        const scaleX = Math.abs(1 - widthRatio)
        const scaleY = Math.abs(1 - heightRatio)

        if(upScale){
            this.scale.set(1 + scaleX, 1 + scaleY)
        }else{
            this.scale.set(1 - scaleX, 1 - scaleY)
        }
    }
}

Sprite.prototype.isMainRectClicked = function(){
    return TouchInput.isTriggered() && this.mainRect.contains(TouchInput._x, TouchInput._y)
}

/* -------------------------------- ANIMATION ------------------------------- */

if(Eli.Utils.isRpgMakerMZ()){

Alias.Sprite_update = Sprite.prototype.update
Sprite.prototype.update = function() {
    Alias.Sprite_update.call(this)
    this.updateAnimationSprites()
    this.updateMzAnimations()
}

Sprite.prototype.initMVAnimationProp = function() {
    this._animationSprites = []
    this._effectTarget = this
}

Sprite.prototype.updateAnimationSprites = function() {}

Sprite.prototype.updateMzAnimations = function(){
    for (const sprite of this._animationSpritesMz) {
        if (!sprite.isPlaying()) {
            this.removeAnimation(sprite);
        }
    }
}

Sprite.prototype.isAnimationPlaying = function() {
    return this._animationSprites.length > 0 || this._animationSpritesMz.length > 0
}

Sprite.prototype.startAnimation = function(animationId, mirror, delay){
    const animation = Eli.Utils.makeDeepCopy($dataAnimations[animationId])

    if(Eli.Utils.isMVAnimation(animation)){
        this.startAnimationMV(animation, mirror, delay)
    }else{
        this.startAnimationMZ(animation, mirror, delay)
    }
}

Sprite.prototype.startAnimationMV = function(animation, mirror, delay){

}

Sprite.prototype.startAnimationMZ = function(animation, mirror, delay){
    const sprite = new Sprite_Animation()
    const targetSprites = [this]
    const baseDelay = this.animationBaseDelay()
    const previous = delay > baseDelay ? this.lastAnimationSprite() : null

    // if (this.animationShouldMirror(targetSprites[0])) {
    //     mirror = !mirror
    // }

    sprite.targetObjects = [this]
    animation.offsetX += this.width/2
    animation.offsetY += this.height
    sprite.setup(targetSprites, animation, mirror, delay, previous)
    this.parent.addChild(sprite)
    this._animationSpritesMz.push(sprite)
}

Sprite.prototype.lastAnimationSprite = function() {
    return this._animationSpritesMz[this._animationSpritesMz.length - 1]
}

Sprite.prototype.isAnimationForEach = function(animation) {
    const mv = Eli.Utils.isMVAnimation(animation)
    return mv ? animation.position !== 3 : animation.displayType === 0
}

Sprite.prototype.animationBaseDelay = function() {
    return 8
}

Sprite.prototype.animationNextDelay = function() {
    return 12
}

Sprite.prototype.animationShouldMirror = function(target) {
    return target && target.isActor && target.isActor();
}

Sprite.prototype.removeAnimation = function(sprite) {
    this._animationSpritesMz.remove(sprite)
    this.removeChild(sprite)
    for (const target of sprite.targetObjects) {
        if (target.endAnimation) {
            target.endAnimation()
        }
    }
    sprite.destroy()
}

Sprite.prototype.removeAllAnimations = function() {
    for (const sprite of this._animationSpritesMz.clone()) {
        this.removeAnimation(sprite)
    }
}

if(Eli.Book.getMvAnimation().enable){

Sprite.prototype.startAnimationMV = function(animation, mirror, delay){
    const sprite = new Sprite_AnimationMV()

    sprite.setup(this._effectTarget, animation, mirror, delay)
    this.parent.addChild(sprite)
    this._animationSprites.push(sprite)
}

Sprite.prototype.updateAnimationSprites = function() {
    if (this.isAnimationPlaying()) {
        const sprites = this._animationSprites.clone()
        this._animationSprites = []
        for (const sprite of sprites) {
            if (sprite.isPlaying()) {
                this._animationSprites.push(sprite)
            }else{
                sprite.destroy()
            }
        }
    }
}

} // end Eli.Book.getMvAnimation().enable

} // End Eli.Utils.isRpgMakerMZ()

}

/* ========================================================================== */
/*                                    SCENE                                   */
/* ========================================================================== */

/* ------------------------------- SCENE BOOT ------------------------------- */
Alias.Scene_Boot_initialize = Scene_Boot.prototype.initialize
Scene_Boot.prototype.initialize = function(){
    Alias.Scene_Boot_initialize.call(this)
    Eli.EventManager.setApp()
}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_start = Scene_Map.prototype.start
Scene_Map.prototype.start = function() {
    if(this._transfer){
        this.beforeStartAndTransferIsOn()
    }
    Alias.Scene_Map_start.call(this)
}

Scene_Map.prototype.beforeStartAndTransferIsOn = function() {}

}

/* ========================================================================== */
/*                                   MANAGER                                  */
/* ========================================================================== */

/* ------------------------------ DATA MANAGER ------------------------------ */
{

Alias.DataManager_createGameObjects = DataManager.createGameObjects
DataManager.createGameObjects = function() {
    Alias.DataManager_createGameObjects.call(this)
    $eliData = new Eli_SavedContents()
}

Alias.DataManager_makeSaveContents = DataManager.makeSaveContents
DataManager.makeSaveContents = function() {
    const alias = Alias.DataManager_makeSaveContents.call(this)
    alias.eli = $eliData

    return alias
}

Alias.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Alias.DataManager_extractSaveContents.call(this, contents)
    $eliData = contents.eli
}

}

/* ------------------------------ SCENE MANAGER ----------------------------- */
{

Alias.SceneManager_isGameActive = SceneManager.isGameActive
SceneManager.isGameActive = function() {
    return  Alias.SceneManager_isGameActive.call(this) || 
            (Eli.Book.playtest().gameFocus && $gameTemp.isPlaytest())
}

Alias.SceneManager_reloadGame = SceneManager.reloadGame
SceneManager.reloadGame = function() {
    if(Eli.Book.playtest().quickRestart && Utils.isNwjs()){
        location.reload()
    }else{
        Alias.SceneManager_reloadGame.call(this)
    }
}

}

/* ========================================================================== */
/*                                   OBJECTS                                  */
/* ========================================================================== */

// Plugin Command
Alias.Game_Interpreter_command357 = Game_Interpreter.prototype.command357
Game_Interpreter.prototype.command357 = function(params){
    Eli.PluginManager.currentInterpreter = this
    if(this._eventId > 0){
        Eli.PluginManager.currentEventId = this._eventId
    }

    return Alias.Game_Interpreter_command357.call(this, params)
}

/* ========================================================================== */
/*                                   SPRITES                                  */
/* ========================================================================== */

/* --------------------------- SPRITE ANIMATION MV -------------------------- */
if(Eli.Utils.isRpgMakerMZ()){

Alias.Sprite_AnimationMV_updateFlash = Sprite_AnimationMV.prototype.updateFlash
Sprite_AnimationMV.prototype.updateFlash = function() {
    if(this._flashDuration > 0){

        if(this._targets.filter){
            Alias.Sprite_AnimationMV_updateFlash.call(this)
        }else{
            this.updateFlashForSingleTarget()
        }
    }
}

Sprite_AnimationMV.prototype.updateFlashForSingleTarget = function(){
    const d = this._flashDuration--
    this._flashColor[3] *= (d - 1) / d
    this._targets.setBlendColor(this._flashColor)
}

Sprite_AnimationMV.prototype.hasAnyFlashDuration = function(){
    return this._flashDuration > 0 || this._screenFlashDuration > 0
}

Alias.Sprite_AnimationMV_onEnd = Sprite_AnimationMV.prototype.onEnd
Sprite_AnimationMV.prototype.onEnd = function() {
    if(this.hasAnyFlashDuration() && Eli.Book.getMvAnimation().smooth){
        this.visible = false
    }else if(this._targets.filter){
        Alias.Sprite_AnimationMV_onEnd.call(this)
    }else{
        this.onEndSingleTarget()
    }
}

Sprite_AnimationMV.prototype.onEndSingleTarget = function(){
    this._flashDuration = 0
    this._screenFlashDuration = 0
    this._hidingDuration = 0
    this._targets.setBlendColor([0, 0, 0, 0])
    this._targets.show() 
}

Alias.Sprite_AnimationMV_processTimingData = Sprite_AnimationMV.prototype.processTimingData
Sprite_AnimationMV.prototype.processTimingData = function(timing) {
    const rate = this._rate
    this._rate = Eli.Book.getMvAnimation().rate
    Alias.Sprite_AnimationMV_processTimingData.call(this, timing)
    this._rate = rate
}

Alias.Sprite_AnimationMV_isPlaying = Sprite_AnimationMV.prototype.isPlaying
Sprite_AnimationMV.prototype.isPlaying = function() {
    return Alias.Sprite_AnimationMV_isPlaying.call(this) || this.hasAnyFlashDuration()
}

Alias.Sprite_AnimationMV_updatePosition = Sprite_AnimationMV.prototype.updatePosition
Sprite_AnimationMV.prototype.updatePosition = function() {
    /* This was suppose to go on the updateMain function. But there is no way to set
    it there, without overwriting it. So I put this here, that happens right before
    the this._duration property is lowered.
    */
    this._duration = Math.max(0, this._duration)
    Alias.Sprite_AnimationMV_updatePosition.call(this)
}

}

/* ========================================================================== */
/*                                     END                                    */
/* ========================================================================== */

/*
© ® » «  ∆ ™ ≠ ≤ ≥ ▫ ♫
• ■ ▪ ● ▬ ♦
► ▲ ▼ ◄
→ ← ↑ ↔ ↨
*/

}


}