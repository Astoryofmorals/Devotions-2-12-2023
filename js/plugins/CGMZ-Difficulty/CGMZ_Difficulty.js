/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/difficulty/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_VehicleEncounters
 * @plugindesc Add a difficulty system to your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.5.0
 * ----------------------------------------------------------------------------
 * Description: Use this plugin to add a difficulty select with many different
 * customization settings created by you. The difficulty select scene can be
 * accessed from anywhere and the difficulty setting is available via script
 * call for eventing custom difficulty differences on maps.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Images----------------------------------------
 * Using default resolution, the image size which fits best is 446px wide.
 * Images will be automatically scaled if they are wider than the window,
 * and images will be automatically centered if they are not as wide as the
 * window.
 * ------------------------Rating Parameter------------------------------------
 * The difficulty's rating parameter is a number meant to represent the
 * difficulty in number form. It is not displayed anywhere. It is used in the
 * Get Difficulty Plugin Command, for use in eventing custom difficulty
 * differences in your game.
 * -----------------------Default Difficulty-----------------------------------
 * The default difficulty must be the name of a difficulty you have set up.
 * If you mistype the name or the difficulty name does not exist it could
 * cause issues.
 * ---------------------------Saved Games--------------------------------------
 * This plugin partially supports saved games. Difficulty settings other than
 * the difficulty name can be changed and are supported in saved games. The
 * name is saved and changes to difficulty name may behave weird in saved
 * games.
 * -------------------------Plugin Commands------------------------------------
 * This plugin supports the following plugin commands:
 * Set Difficulty - This will set the difficulty of the game to the given value
 *
 * Get Difficulty - This will get the difficulty rating of the current
 *                  difficulty and store it in a variable
 *
 * Call Scene - This will call the difficulty select scene
 * ---------------------------JavaScript---------------------------------------
 * To call the difficulty scene with JavaScript, use the following:
 * SceneManager.push(CGMZ_Scene_Difficulty);
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JavaScript file MUST be CGMZ_Difficulty.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version 1.0.0 - Initial Release
 *
 * @command Set Difficulty
 * @desc Forcibly sets the difficulty
 *
 * @arg difficulty
 * @text Difficulty
 * @desc Name of the difficulty (exact capitalization required) to set
 *
 * @command Get Difficulty
 * @desc Get the difficulty rating in a variable - for use in eventing
 *
 * @arg variableId
 * @text Variable ID
 * @default 0
 * @type variable
 * @desc Variable to store the difficulty rating in
 *
 * @command Call Scene
 * @desc Calls the Difficulty scene
 *
 * @param Difficulty Options
 *
 * @param Difficulties
 * @parent Difficulty Options
 * @type struct<Difficulties>[]
 * @desc Set up difficulties here
 * @default []
 *
 * @param Default Difficulty
 * @parent Difficulty Options
 * @desc The name (case sensitive) of the difficulty to use at game start.
 *
 * @param Window Options
 *
 * @param Display Window Info
 * @parent Window Options
 * @type select[]
 * @option Name
 * @option Image
 * @option Enemy Stats
 * @option Enemy Gold
 * @option Enemy EXP
 * @option Encounter Rate
 * @option Escape Rate
 * @option Preemptive Rate
 * @option Surprise Rate
 * @option Description
 * @option Blank Line
 * @desc The information displayed and order it is in on display window
 * @default ["Name","Image","Enemy Stats","Enemy Gold","Enemy EXP","Encounter Rate","Escape Rate","Preemptive Rate","Surprise Rate","Description"]
 * 
 * @param Visible Commands
 * @parent Window Options
 * @type number
 * @min 1
 * @default 3
 * @desc This is the number of commands that will be visible in the difficulty select window without scrolling
 *
 * @param Transparent Windows
 * @parent Window Options
 * @type boolean
 * @desc Whether the crafting windows are transparent or not
 * @default false
 *
 * @param Background Image
 * @parent Window Options
 * @type file
 * @dir img/pictures
 * @desc Image to show in the background of the scene. Default blurry map used if none provided.
 *
 * @param Auto Close Scene On Select
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc If true, the difficulty select scene will close when the player selects a difficulty.
 *
 * @param Text Options
 *
 * @param Label Text Color
 * @parent Text Options
 * @type number
 * @default 1
 * @desc The color of the label text
 *
 * @param Current Difficulty
 * @parent Text Options
 * @desc Text to describe current difficulty in difficulty select scene
 * @default Current:
 *
 * @param Enemy Stats
 * @parent Text Options
 * @desc Text to describe enemy stat modifier in difficulty select scene
 * @default Enemy Stats: 
 *
 * @param Enemy Gold
 * @parent Text Options
 * @desc Text to describe enemy gold modifier in difficulty select scene
 * @default Enemy Gold: 
 *
 * @param Enemy Exp
 * @parent Text Options
 * @desc Text to describe enemy exp modifier in difficulty select scene
 * @default Enemy Exp: 
 *
 * @param Encounter Rate
 * @parent Text Options
 * @desc Text to describe encounter rate modifier in difficulty select scene
 * @default Encounter Rate: 
 *
 * @param Escape Rate
 * @parent Text Options
 * @desc Text to describe escape rate modifier in difficulty select scene
 * @default Escape Rate: 
 *
 * @param Preemptive Rate
 * @parent Text Options
 * @desc Text to describe preemptive rate modifier in difficulty select scene
 * @default Preemptive Rate: 
 *
 * @param Surprise Rate
 * @parent Text Options
 * @desc Text to describe surprise rate modifier in difficulty select scene
 * @default Surprise Rate: 
*/
/*~struct~Difficulties:
 * @param Name
 * @type text
 * @desc The name of the difficulty. Must be unique.
 *
 * @param Description
 * @type note
 * @default ""
 * @desc The description of the difficulty.
 *
 * @param Rating
 * @type number
 * @min 0
 * @default 0
 * @desc A number rating for the difficulty, used to store difficulty in game variable (see documentation)
 *
 * @param Image
 * @type file
 * @dir img
 * @desc The description of the difficulty.
 *
 * @param Enemy Stat Modifier
 * @type number
 * @default 100
 * @min 0
 * @desc The percentage change (multiplicative) of base stats the enemy has (higher = harder)
 *
 * @param Enemy Gold Modifier
 * @type number
 * @default 100
 * @min 0
 * @desc The percentage change (multiplicative) of gold the enemy awards (higher = easier)
 *
 * @param Enemy Exp Modifier
 * @type number
 * @default 100
 * @min 0
 * @desc The percentage change (multiplicative) of experience the enemy awards (higher = easier)
 *
 * @param Encounter Rate Modifier
 * @type number
 * @default 100
 * @min 0
 * @desc The percentage change (multiplicative) of encounter rate (higher = harder)
 *
 * @param Escape Ratio Modifier
 * @type number
 * @default 100
 * @min 0
 * @desc The percentage change (multiplicative) of escape success chance (higher = easier)
 *
 * @param Preemptive Modifier
 * @type number
 * @default 100
 * @min 0
 * @desc The percentage change (multiplicative) of preemptive battle chance (higher = easier)
 *
 * @param Surprise Modifier
 * @type number
 * @default 100
 * @min 0
 * @desc The percentage change (multiplicative) of surprise battle chance (higher = harder)
*/
var Imported = Imported || {};
Imported.CGMZ_Difficulty = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Difficulty"] = "1.0.0";
CGMZ.Difficulty = CGMZ.Difficulty || {};
CGMZ.Difficulty.parameters = PluginManager.parameters('CGMZ_Difficulty');
CGMZ.Difficulty.DefaultDifficulty = CGMZ.Difficulty.parameters["Default Difficulty"];
CGMZ.Difficulty.VisibleCommands = Number(CGMZ.Difficulty.parameters["Visible Commands"]);
CGMZ.Difficulty.LabelTextColor = Number(CGMZ.Difficulty.parameters["Label Text Color"]);
CGMZ.Difficulty.TransparentWindows = (CGMZ.Difficulty.parameters["Transparent Windows"] === "true");
CGMZ.Difficulty.AutoCloseSceneOnSelect = (CGMZ.Difficulty.parameters["Auto Close Scene On Select"] === "true");
CGMZ.Difficulty.BackgroundImage = CGMZ.Difficulty.parameters["Background Image"];
CGMZ.Difficulty.CurrentDifficulty = CGMZ.Difficulty.parameters["Current Difficulty"];
CGMZ.Difficulty.EnemyStatsText = CGMZ.Difficulty.parameters["Enemy Stats"];
CGMZ.Difficulty.EnemyGoldText = CGMZ.Difficulty.parameters["Enemy Gold"];
CGMZ.Difficulty.EnemyExpText = CGMZ.Difficulty.parameters["Enemy Exp"];
CGMZ.Difficulty.EncounterRateText = CGMZ.Difficulty.parameters["Encounter Rate"];
CGMZ.Difficulty.EscapeRateText = CGMZ.Difficulty.parameters["Escape Rate"];
CGMZ.Difficulty.SurpriseRateText = CGMZ.Difficulty.parameters["Surprise Rate"];
CGMZ.Difficulty.PreemptiveRateText = CGMZ.Difficulty.parameters["Preemptive Rate"];
CGMZ.Difficulty.Difficulties = JSON.parse(CGMZ.Difficulty.parameters["Difficulties"]);
CGMZ.Difficulty.DisplayWindowInfo = JSON.parse(CGMZ.Difficulty.parameters["Display Window Info"]);
//=============================================================================
// CGMZ_Difficulty
//-----------------------------------------------------------------------------
// Data class used to store difficulty data. Only the difficulty name is
// saved.
//=============================================================================
function CGMZ_Difficulty() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Difficulty.prototype.initialize = function(difficulty) {
	this._name = difficulty.Name;
	this._description = JSON.parse(difficulty.Description);
	this._rating = Number(difficulty.Rating);
	this._image = difficulty.Image;
	this._enemyStatModifier = parseFloat(difficulty["Enemy Stat Modifier"]) / 100.0;
	this._enemyGoldModifier = parseFloat(difficulty["Enemy Gold Modifier"]) / 100.0;
	this._enemyExpModifier = parseFloat(difficulty["Enemy Exp Modifier"]) / 100.0;
	this._encounterRateModifier = parseFloat(difficulty["Encounter Rate Modifier"]) / 100.0;
	this._escapeRatioModifier = parseFloat(difficulty["Escape Ratio Modifier"]) / 100.0;
	this._preemptiveModifier = parseFloat(difficulty["Preemptive Modifier"]) / 100.0;
	this._surpriseModifier = parseFloat(difficulty["Surprise Modifier"]) / 100.0;
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Save the difficulty name
//=============================================================================
//-----------------------------------------------------------------------------
// Add difficulty name to save data
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_CGMZ_Core_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Difficulty_CGMZ_Core_createPluginData.call(this);
	this._difficulty = CGMZ.Difficulty.DefaultDifficulty;
};
//-----------------------------------------------------------------------------
// Get difficulty
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDifficulty = function() {
	if(!this._difficulty) this._difficulty = CGMZ.Difficulty.DefaultDifficulty;
	return this._difficulty;
};
//-----------------------------------------------------------------------------
// Set difficulty
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setDifficulty = function(difficulty) {
	this._difficulty = difficulty;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Unsaved Difficulty Data handling
//=============================================================================
//-----------------------------------------------------------------------------
// Add difficulty data
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Difficulty_CGMZ_Temp_createPluginData.call(this);
	this.initializeDifficulties();
};
//-----------------------------------------------------------------------------
// Initialize Difficulties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeDifficulties = function() {
	this._difficulties = {};
	for(let i = 0; i < CGMZ.Difficulty.Difficulties.length; i++) {
		const difficulty = new CGMZ_Difficulty(JSON.parse(CGMZ.Difficulty.Difficulties[i]));
		this._difficulties[difficulty._name] = difficulty;
	}
};
//-----------------------------------------------------------------------------
// Register Difficulty Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Difficulty_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Difficulty", "Call Scene", this.pluginCommandDifficultyCallScene);
	PluginManager.registerCommand("CGMZ_Difficulty", "Set Difficulty", this.pluginCommandDifficultySetDifficulty);
	PluginManager.registerCommand("CGMZ_Difficulty", "Get Difficulty", this.pluginCommandDifficultyGetDifficulty);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call difficulty scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDifficultyCallScene = function() {
	SceneManager.push(CGMZ_Scene_Difficulty);
};
//-----------------------------------------------------------------------------
// Plugin Command - Force set difficulty
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDifficultySetDifficulty = function(args) {
	$cgmz.setDifficulty(args.difficulty);
};
//-----------------------------------------------------------------------------
// Plugin Command - Get difficult yrating into variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDifficultyGetDifficulty = function(args) {
	const difficulty = $cgmzTemp.getDifficulty($cgmz.getDifficulty());
	$gameVariables.setValue(Number(args.variableId), difficulty._rating);
};
//-----------------------------------------------------------------------------
// Get a specific difficulty object by name
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getDifficulty = function(name) {
	return this._difficulties[name];
};
//-----------------------------------------------------------------------------
// Get all difficulties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getDifficulties = function() {
	return this._difficulties;
};
//=============================================================================
// Game Enemy
//-----------------------------------------------------------------------------
// Change gold and exp by difficulty modifier. Also change base params
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Change the enemy exp
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_GameEnemy_exp = Game_Enemy.prototype.exp;
Game_Enemy.prototype.exp = function() {
	const difficulty = $cgmzTemp.getDifficulty($cgmz.getDifficulty());
    return alias_CGMZ_Difficulty_GameEnemy_exp.call(this) * difficulty._enemyExpModifier;
};
//-----------------------------------------------------------------------------
// Alias. Change the enemy gold
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_GameEnemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function() {
	const difficulty = $cgmzTemp.getDifficulty($cgmz.getDifficulty());
    return alias_CGMZ_Difficulty_GameEnemy_gold.call(this) * difficulty._enemyGoldModifier;
};
//-----------------------------------------------------------------------------
// Alias. Change the enemy base params
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_GameEnemy_paramBase = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
	const difficulty = $cgmzTemp.getDifficulty($cgmz.getDifficulty());
    return alias_CGMZ_Difficulty_GameEnemy_paramBase.call(this, paramId) * difficulty._enemyStatModifier;
};
//=============================================================================
// Game Party
//-----------------------------------------------------------------------------
// Change surprise and preemptive rates by modifiers
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Change the preemptive rate by difficulty modifier
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_GameParty_ratePreemptive = Game_Party.prototype.ratePreemptive;
Game_Party.prototype.ratePreemptive = function(troopAgi) {
    const difficulty = $cgmzTemp.getDifficulty($cgmz.getDifficulty());
    return alias_CGMZ_Difficulty_GameParty_ratePreemptive.call(this, troopAgi) * difficulty._preemptiveModifier;
};
//-----------------------------------------------------------------------------
// Alias. Change the surprise rate by difficulty modifier
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_GameParty_rateSurprise = Game_Party.prototype.rateSurprise;
Game_Party.prototype.rateSurprise = function(troopAgi) {
    const difficulty = $cgmzTemp.getDifficulty($cgmz.getDifficulty());
    return alias_CGMZ_Difficulty_GameParty_rateSurprise.call(this, troopAgi) * difficulty._surpriseModifier;
};
//=============================================================================
// BattleManager
//-----------------------------------------------------------------------------
// Change escape ratio by difficulty modifier
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Change escape ratio by difficulty modifier
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
	alias_CGMZ_Difficulty_BattleManager_makeEscapeRatio.call(this);
	const difficulty = $cgmzTemp.getDifficulty($cgmz.getDifficulty());
    this._escapeRatio *= difficulty._escapeRatioModifier;
};
//=============================================================================
// Game Map
//-----------------------------------------------------------------------------
// Change encounter step by difficulty modifier
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Change encounter step by difficulty modifier
//-----------------------------------------------------------------------------
const alias_CGMZ_Difficulty_GameMap_encounterStep = Game_Map.prototype.encounterStep;
Game_Map.prototype.encounterStep = function() {
	const difficulty = $cgmzTemp.getDifficulty($cgmz.getDifficulty());
    return Number(alias_CGMZ_Difficulty_GameMap_encounterStep.call(this) * difficulty._encounterRateModifier);
};
//=============================================================================
// CGMZ_Scene_Difficulty
//-----------------------------------------------------------------------------
// Handle the difficulty select scene
//=============================================================================
function CGMZ_Scene_Difficulty() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Difficulty.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Difficulty.prototype.constructor = CGMZ_Scene_Difficulty;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create difficulty windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createCurrentDifficultyWindow();
	this.createListWindow();
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create current difficulty window
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.createCurrentDifficultyWindow = function() {
	const rect = this.currentDifficultyWindowRect();
    this._currentDifficultyWindow = new CGMZ_Window_Difficulty_CurrentDifficulty(rect);
	this._currentDifficultyWindow.refresh();
    this.addWindow(this._currentDifficultyWindow);
};
//-----------------------------------------------------------------------------
// Get current difficulty window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.currentDifficultyWindowRect = function() {
	const x = Graphics.boxWidth / 12;
	const width = Graphics.boxWidth / 4;
	const height = this.calcWindowHeight(2, false);
	const y = Graphics.boxHeight / 12;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_Difficulty_DifficultyList(rect);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.refresh();
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.listWindowRect = function() {
	const x = this._currentDifficultyWindow.x;
	const y = this._currentDifficultyWindow.y + this._currentDifficultyWindow.height;
	const width = this._currentDifficultyWindow.width;
	const height = this.calcWindowHeight(CGMZ.Difficulty.VisibleCommands, true);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect()
    this._displayWindow = new CGMZ_Window_Difficulty_Display(rect);
	this._displayWindow.refresh();
	this._listWindow.setDisplayWindow(this._displayWindow);
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.displayWindowRect = function() {
	const x = this._listWindow.x + this._listWindow.width;
	const y = this._currentDifficultyWindow.y;
	const width = Graphics.boxWidth * 7 / 12;
	const height = Graphics.boxHeight - Graphics.boxHeight / 6;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.onListOk = function() {
	$cgmz.setDifficulty(this._listWindow.item()._name);
	this._currentDifficultyWindow.refresh();
	this._listWindow.activate();
	if(CGMZ.Difficulty.AutoCloseSceneOnSelect) this.popScene();
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_Difficulty.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(CGMZ.Difficulty.BackgroundImage) {
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadPicture(CGMZ.Difficulty.BackgroundImage);
		this.addChild(this._backgroundCustomSprite);
	}
};
//=============================================================================
// CGMZ_Window_Difficulty_CurrentDifficulty
//-----------------------------------------------------------------------------
// Shows current difficulty
//=============================================================================
function CGMZ_Window_Difficulty_CurrentDifficulty(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_Difficulty_CurrentDifficulty.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_Difficulty_CurrentDifficulty.prototype.constructor = CGMZ_Window_Difficulty_CurrentDifficulty;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_CurrentDifficulty.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Difficulty.TransparentWindows));
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_CurrentDifficulty.prototype.refresh = function() {
	this.contents.clear();
	this.drawCurrentDifficulty();
};
//-----------------------------------------------------------------------------
// Draw current difficulty
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_CurrentDifficulty.prototype.drawCurrentDifficulty = function() {
	this.changeTextColor(ColorManager.textColor(CGMZ.Difficulty.LabelTextColor));
	this.drawText(CGMZ.Difficulty.CurrentDifficulty, 0, 0, this.contents.width, 'center');
	this.changeTextColor(ColorManager.normalColor());
	this.drawText($cgmz.getDifficulty(), 0, this.lineHeight(), this.contents.width, 'center');
};
//=============================================================================
// CGMZ_Window_Difficulty_DifficultyList
//-----------------------------------------------------------------------------
// Selectable window for choosing a profession in a list.
//=============================================================================
function CGMZ_Window_Difficulty_DifficultyList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_Difficulty_DifficultyList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_Difficulty_DifficultyList.prototype.constructor = CGMZ_Window_Difficulty_DifficultyList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_DifficultyList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Difficulty.TransparentWindows));
	this.select(0);
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_DifficultyList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_DifficultyList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_DifficultyList.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_DifficultyList.prototype.makeItemList = function() {
    this._data = [];
	let difficulties = $cgmzTemp.getDifficulties();
	for(const difficulty in $cgmzTemp.getDifficulties()) {
		this._data.push(difficulties[difficulty]);
	}
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_DifficultyList.prototype.drawItem = function(index) {
    let item = this._data[index];
    let rect = this.itemRectWithPadding(index);
    this.drawText(item._name, rect.x, rect.y, rect.width, 'left');
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_DifficultyList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_DifficultyList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this._displayWindow.setItem(this.item());
	}
};
//=============================================================================
// CGMZ_Window_Difficulty_Display
//-----------------------------------------------------------------------------
// Shows current difficulty modifiers
//=============================================================================
function CGMZ_Window_Difficulty_Display(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_Difficulty_Display.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_Difficulty_Display.prototype.constructor = CGMZ_Window_Difficulty_Display;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_Display.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Difficulty.TransparentWindows));
	this._difficulty = null;
	this._difficultyImage = new Sprite();
	this.addInnerChild(this._difficultyImage);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Set the currently displayed difficulty
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_Display.prototype.setItem = function(difficulty) {
	if(this._difficulty === difficulty) return;
	this._difficulty = difficulty;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_Display.prototype.refresh = function() {
	this.contents.clear();
	if(!this._difficulty) return;
	this.loadDifficultyImage(); // calls the drawing function after image load
};
//-----------------------------------------------------------------------------
// Load the difficulty image
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_Display.prototype.loadDifficultyImage = function() {
	const imageData = $cgmzTemp.getImageData(this._difficulty._image);
	this._difficultyImage.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
	this._difficultyImage.bitmap.addLoadListener(this.drawCurrentDifficulty.bind(this));
};
//-----------------------------------------------------------------------------
// Draw difficulty info
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_Display.prototype.drawCurrentDifficulty = function() {
	let y = 0;
	for(const section of CGMZ.Difficulty.DisplayWindowInfo) {
		switch(section) {
			case "Name":
				this.drawText(this._difficulty._name, 0, y, this.contents.width, 'center');
				y += this.lineHeight();
				break;
			case "Image":
				this.showImage(y);
				y += this._difficultyImage.height;
				break;
			case "Enemy Stats":
				this.drawStandardLine(CGMZ.Difficulty.EnemyStatsText, Number(this._difficulty._enemyStatModifier*100) + "%", y);
				y += this.lineHeight();
				break;
			case "Enemy Gold":
				this.drawStandardLine(CGMZ.Difficulty.EnemyGoldText, Number(this._difficulty._enemyGoldModifier*100) + "%", y);
				y += this.lineHeight();
				break;
			case "Enemy EXP":
				this.drawStandardLine(CGMZ.Difficulty.EnemyExpText, Number(this._difficulty._enemyExpModifier*100) + "%", y);
				y += this.lineHeight();
				break;
			case "Encounter Rate":
				this.drawStandardLine(CGMZ.Difficulty.EncounterRateText, Number(this._difficulty._encounterRateModifier*100) + "%", y);
				y += this.lineHeight();
				break;
			case "Escape Rate":
				this.drawStandardLine(CGMZ.Difficulty.EscapeRateText, Number(this._difficulty._escapeRatioModifier*100) + "%", y);
				y += this.lineHeight();
				break;
			case "Preemptive Rate":
				this.drawStandardLine(CGMZ.Difficulty.PreemptiveRateText, Number(this._difficulty._preemptiveModifier*100) + "%", y);
				y += this.lineHeight();
				break;
			case "Surprise Rate":
				this.drawStandardLine(CGMZ.Difficulty.SurpriseRateText, Number(this._difficulty._surpriseModifier*100) + "%", y);
				y += this.lineHeight();
				break;
			case "Description":
				y += this.CGMZ_drawText(this._difficulty._description, 0, 0, y, this.contents.width, 'left');
				break;
			case "Blank Line": y += this.lineHeight();
		}
	}
};
//-----------------------------------------------------------------------------
// Show difficulty image (only scale x value, don't care about y scaling here)
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_Display.prototype.showImage = function(y) {
	const scaleX = Math.min(1.0, this.contents.width/this._difficultyImage.width);
	this._difficultyImage.scale.x = scaleX;
	this._difficultyImage.x = (this.contents.width - this._difficultyImage.width * scaleX) / 2;
	this._difficultyImage.y = y;
	this._difficulty._image ? this._difficultyImage.show() : this._difficultyImage.hide();
};
//-----------------------------------------------------------------------------
// Draw standard difficulty line
//-----------------------------------------------------------------------------
CGMZ_Window_Difficulty_Display.prototype.drawStandardLine = function(label, descriptor, y) {
	const totalString = '\\c[' + CGMZ.Difficulty.LabelTextColor + ']' + label + '\\c[0]' + descriptor;
	this.CGMZ_drawTextLine(totalString, 0, y, this.contents.width, 'left');
};