//=============================================================================
// RPG Maker MZ - MewglesCustomGameover
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (V1.0) Allows customization of the GameOver screen
 * @author Mewgles
 * @url https://mewgles.itch.io/custom-gameover-mz
 *
 * @param -----Command Window-----
 * @desc Settings for the command window
 *
 * @param Use_Command_Window
 * @desc Switches the command window on/off
 * @type select
 * @option true
 * @option false
 * @default true
 *
 * @param Command_Window_X
 * @desc Sets the X-coordinates for the command window
 * 0 = centered
 * @type number
 * @default 0
 *
 * @param Command_Window_Y
 * @desc Sets the Y-coordinates for the command window
 * 0 = centered
 * @type number
 * @default 0
 *
 * @param Wait_For_Window
 * @desc Sets a timer before the window appears
 * @type number
 * @default 150
 *
 * @param Window_Style
 * @desc Sets the window style
 * @type select
 * @option standard
 * @option transparent
 * @default standard
 *
 * @param -----Allowed Commands-----
 * @desc Setting the allowed commands, no window
 * created when all are blank
 *
 * @param Continue
 * @desc Enables/disables the continue command
 * @type select
 * @option enable
 * @option disable
 * @default enable 
 *
 * @param To_Title
 * @desc Enables/disables the to title command
 * @type select
 * @option enable
 * @option disable
 * @default enable
 *
 * @param Quit
 * @desc Enables/disables the quit command to 
 * directly exit the game
 * @type select
 * @option enable
 * @option disable
 * @default enable
 *
 * @param -----Other Options-----
 * @desc Other options for this plugin
 *
 * @param Skip_To_Scene
 * @type select
 * @option Scene_Title
 * @option Scene_Load
 * @option disable
 * @default disable
 * @desc Skips to specified scene without showing
 * the GameOver screen
 *
 *------------------------------------------------------------------------------
 * @command set_window
 * @text Scene_Gameover settings
 * @desc Allows adjust the GameOver screen
 *
 * @arg -----Base Settings-----
 *
 * @arg Use_Command_Window
 * @type select
 * @option true
 * @option false
 * @text Change command window
 * @desc Switches the command window on/off
 *
 * @arg Wait_For_Window
 * @type number
 * @text 
 * @min 1
 * @desc Set the timer before the window appears
 * lowest is 1 ( 1 = 1 frame)
 * 
 * @arg Window_Style
 * @type select
 * @option standard
 * @option transparent
 * @text Change window style
 * @desc Sets the window style
 *
 * @arg -----Commands-----
 *
 * @arg Continue
 * @type select
 * @option enable
 * @option disable
 * @text Allow/disallow continue
 * @desc Enables/disables the continue command
 *
 * @arg To_Title
 * @type select
 * @option enable
 * @option disable
 * @text Allow/disallow going to title
 * @text Enables/disables the to title command
 *
 * @arg Quit
 * @type select
 * @option enable
 * @option disable
 * @text Allow/disallow to quit
 * @desc Enables/disables the quit command to
 * directly exit the game
 *
 * @arg -----Other Options-----
 *
 * @arg Skip_To_Scene
 * @type select
 * @option Scene_Title
 * @option Scene_Load
 * @option disable
 * @text Skip to a certain scene
 * @desc Skip to specified scene without showing
 * the GameOver screen
 *
 * @arg Change_Background
 * @type string
 * @text Change background
 * @desc Changes the background of the
 * GameOver screen
 *
 *------------------------------------------------------------------------------
 * @command restore
 * @text Restore Scene_Gameover settings
 * @desc Allows to restore the settings to the
 * base values set in the plugin manager
 *
 * @arg -----Base Settings-----
 *
 * @arg Use_Command_Window
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the command window use
 * 
 * @arg Wait_For_Window
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the timer before the command
 * window appearance
 *
 * @arg Window_Style
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the window style
 * 
 * @arg -----Commands-----
 *
 * @arg Continue
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the continue command
 *
 * @arg To_Title
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the to title command
 *
 * @arg Quit
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the quit command
 *
 * @arg -----Other Options-----
 *
 * @arg Skip_To_Scene
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the Scene skip settings
 *
 * @arg Background
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the background image
 *
 * @help 
 * Mewgles Custom GameOver
 *------------------------------------------------------------------------------
 * ## Terms of use ##
 *
 * Note: 
 * Since RMMZ is very new I do not guarantee that this plugin works with other
 * plugins without causing errors. For further info see the support and
 * bug report section.
 *
 * Non-commercial use:
 * This Plugin may be used for non-commercial projects as long as you give
 * credit to Mewgles. 
 * (Discord Mewgles#5913)
 *
 * Commercial use:
 * This Plugin may be used for commercial projects as long as you give credit
 * and notify me on release. (Discord Mewgles#5913)
 *
 *------------------------------------------------------------------------------
 * ## Features ##
 *
 * - Add a adjustable command window to the GameOver screen
 *	(Continue, ToTitle, Quit)
 * - Individual X and Y coordinates
 * - Adjustable command window style
 * - Set a timer for the window to appear
 * - Skip the GameOver screen entirely and switch to Scene_Title or
 *   Scene_Load upon gameover
 * - Plugin commands to adjust the following options during the game:
 *		- Display gameover commmand window on/off
 *		- Adjust the timer before the window shows up
 *		- Window style
 *		- Enables/disables the commands individually
 *		- Change the Scene-Skip option
 *		- Change the GameOver screen background
 *
 *------------------------------------------------------------------------------
 * ## Setting up the command window ##
 * 
 * Coordinates:
 * To set up the window you simply adjust the settings in the plugin manager 
 * or with the plugin commands. The X and Y coordinates are set to 0 by 
 * default. It then centers the command window to the same position as the
 * titlescreen command window. Any other value than 0 will override it to 
 * the coordinates you set it to at the respective axis.
 *
 * Allowed commands:
 * Should be self-explanatory. Continue will be greyed out in case ther is 
 * no savefile found when being enabled.
 *
 * Skip to another scene:
 * This option skips the GameOver screen entirely and immediately switches
 * to the set scene after fading out. Note that if you choose Scene_Load
 * and there is no savefile found, the plugin will skip to Scene_Title
 * instead.
 *
 *------------------------------------------------------------------------------
 * ## Using the plugin commands ##
 *
 * Scene_Gameover settings:
 * This command lets you change most of the settings you're able to set 
 * in the plugin manager during the game. This can be useful for tutorial
 * purposes aswell as special events. It also lets you change the background
 * image of the scene in case you want to display something different based on
 * the situation.
 *
 * Restore Scene_Gameover settings:
 * This command restores the settings to their original values which were set
 * through the plugin manager. The values you want to keep you can set
 * to "Keep" or leave blank. For the ones you want to reset, choose "Reset".
 *
 *------------------------------------------------------------------------------
 * ## Support and Bug reports ##
 *
 * If you have any issues feel free to contact me on Discord at Mewgles#5913
 * or you can join my server for special text channels, in-depth support
 * and news regarding my work at https://discord.gg/b4MwdG3
 *
 * You can always get the newest versions of my plugins at my website
 * (atelier-mew.com). I try to keep things up to date on steam too, but
 * workshop has been buggy lately and refused ot update.
 *
 *------------------------------------------------------------------------------
 * ## To Do / Planned Udpates ##
 *
 * - 
 *
 *------------------------------------------------------------------------------
 * ## Changelog ##
 *
 *------------------------------------------------------------------------------
 */
 
(() => {

	const pluginName = "MewglesCustomGameover";
	const parameters = PluginManager.parameters('MewglesCustomGameover');
	
	
//Variables used in the plugin (varname = Type(parameters['ParameterName']|| StandardValue))

	//Command window
	let eg_use_command_window = String(parameters['Use_Command_Window'] || 'true');
	const eg_command_window_x = Number(parameters['Command_Window_X'] || 0);
	const eg_command_window_y = Number(parameters['Command_Window_Y'] || 0);
	let eg_wait_for_input = Number(parameters['Wait_For_Window'] || 150);
	let eg_window_style = String(parameters['Window_Style'] || 'standard');

	//Allowed commands
	let eg_continue = String(parameters['Continue'] || 'enable');
	let eg_to_title = String(parameters['To_Title'] || 'enable');
	let eg_quit = String(parameters['Quit'] || 'enable');
	
	//Other options
	let eg_skip_to_scene = String(parameters['Skip_To_Scene'] || 'disable');
	
	//Plugin internal variables
	let eg_background_image = "GameOver";
	
	
//########### Commands #######################################

	PluginManager.registerCommand(pluginName, "set_window", args => {
		if(args.Use_Command_Window === 'true' || args.Use_Command_Window === 'false'){
			eg_use_command_window = String(args.Use_Command_Window);
		}
		if(args.Wait_For_Window > 0){
			eg_wait_for_input = Number(args.Wait_For_Window);
		}
		if(args.Window_Style === 'standard' || args.Window_Style === 'transparent'){
			eg_window_style = String(args.Window_Style);
		}
		if(args.Continue === 'enable' || args.Continue === 'disable'){
			eg_continue = String(args.Continue);
		}
		if(args.To_Title === 'enable' || args.Continue === 'disable'){
			eg_to_title = String(args.To_Title);
		}
		if(args.Quit === 'enable' || args.Quit === 'disable'){
			eg_quit = String(args.Quit);
		}
		if(args.Skip_To_Scene === 'Scene_Title' || args.Skip_To_Scene === 'Scene_Load' || args.Skip_To_Scene === 'disable'){
			eg_skip_to_scene = String(args.Skip_To_Scene);
		}
		if(args.Change_Background.length > 0){
			eg_background_image = String(args.Change_Background);
		}
	});
	
	
	PluginManager.registerCommand(pluginName, "restore", args => {
		if(args.Use_Command_Window === 'Reset'){
			eg_use_command_window = String(parameters['Use_Command_Window'] || 'true');
		}
		if(args.Wait_For_Window === 'Reset'){
			eg_wait_for_input = Number(parameterse['Wait_For_Window'] || 150);
		}
		if(args.Window_Style === 'Reset'){
			eg_window_style = String(parameters['Window_Style'] || 'standard');
		}
		if(args.Continue === 'Reset'){
			eg_continue = String(parameters['Continue'] || 'enable');
		}
		if(args.To_Title === 'Reset'){
			eg_to_title = String(parameters['To_Title'] || 'enable');
		}
		if(args.Quit === 'Reset'){
			eg_quit = String(parameters['Quit'] || 'enable');
		}
		if(args.Skip_To_Scene === 'Reset'){
			eg_skip_to_scene = String(parameters['Skip_To_Scene'] || 'disable');
		}
		if(args.Background === 'Reset'){
			eg_background_image = "GameOver";
		}
	});
	
//########### Scene_Manager changes	- alias - #######################################

	const _mew_eg_SceneManager_goto = SceneManager.goto;
	SceneManager.goto = function(sceneClass) {
		_mew_eg_SceneManager_goto.apply(this, arguments);
		if (sceneClass) {
			if(sceneClass === Scene_Gameover){
				switch(eg_skip_to_scene){
					case 'Scene_Title':
						sceneClass = Scene_Title;
						break;
					case 'Scene_Load':
						if(DataManager.isAnySavefileExists()){
							sceneClass = Scene_Load;
						} else {
							sceneClass = Scene_Title;
						}
						break;
				}
			}
			this._nextScene = new sceneClass();
		} 
		if (this._scene) {
			this._scene.stop();
		}
		
	};
	
	
//########### Scene_Gameover changes - overrides - #######################################

	Scene_Gameover.prototype.create = function() {
		Scene_Base.prototype.create.call(this);
		this.playGameoverMusic();
		this.createBackground();
		if(eg_use_command_window === 'true' && this.checkAvailableCommands()){
			this.count = eg_wait_for_input;
			this.command_length = 0;
			this.createWindowLayer();
			this.createCommandWindow();
		}
	};
	
	Scene_Gameover.prototype.checkAvailableCommands = function(){
		if(eg_continue === 'enable' || eg_to_title === 'enable' || eg_quit === 'enable'){
			this.commands_enabled = true;
			return true;
		} else {
			return false;
		}
	};
	
	Scene_Gameover.prototype.createCommandWindow = function(){
		const rect = this.commandWindowRect();
		this._commandWindow = new Window_GameoverCommand(rect);
		if(eg_window_style === 'standard'){
			this._commandWindow.setBackgroundType(0);
		}
		if(eg_window_style === 'transparent'){
			this._commandWindow.setBackgroundType(1);
		}
		if(eg_continue === 'enable'){
			this._commandWindow.setHandler("continue", this.commandContinue.bind(this));
		}
		if(eg_to_title === 'enable'){
			this._commandWindow.setHandler("toTitle", this.commandToTitle.bind(this));
		}
		if(eg_quit === 'enable'){
			this._commandWindow.setHandler("gameEnd", this.commandQuit.bind(this));
		}
		this.addWindow(this._commandWindow);
	};
	
	Scene_Gameover.prototype.commandWindowRect = function() {
		const offsetX = $dataSystem.titleCommandWindow.offsetX;
		const offsetY = $dataSystem.titleCommandWindow.offsetY;
		const ww = this.mainCommandWidth();
		const wh = this.calcWindowHeight(this.getCommandListLength(), true);
		return new Rectangle(this.getWX(ww, offsetX), this.getWY(wh, offsetY), ww, wh);
	};
	
	Scene_Gameover.prototype.getWX = function(ww, offsetX){
		if(eg_command_window_x > 0){
			return eg_command_window_x;
		} else {
			return ((Graphics.boxWidth - ww) / 2 + offsetX);
		}
	};
	
	Scene_Gameover.prototype.getWY = function(wh, offsetY){
		if(eg_command_window_y > 0){
			return eg_command_window_y;
		} else {
			return (Graphics.boxHeight - wh - 96 + offsetY);
		}
	};
	
	Scene_Gameover.prototype.getCommandListLength = function(){
		if(eg_continue === 'enable'){
			this.command_length += 1;
		}
		if(eg_to_title ==='enable'){
			this.command_length += 1;
		}
		if(eg_quit === 'enable'){
			this.command_length += 1;
		}
		
		return this.command_length;
	};
	
	Scene_Gameover.prototype.commandContinue = function(){
		this._commandWindow.close();
		SceneManager.push(Scene_Load);
	};
	
	
	Scene_Gameover.prototype.commandToTitle = function(){
		this._commandWindow.close();
		SceneManager.goto(Scene_Title);
	};
	
	
	Scene_Gameover.prototype.commandQuit = function(){
		this._commandWindow.close();
		SceneManager.exit();
	};


	Scene_Gameover.prototype.update = function() {
		if(eg_use_command_window === 'true' && this.commands_enabled){
			if(this.count > 0){
				this.count -= 1;
			}
			if(this.count === 0){
				this._commandWindow.open();
			}
		} else {
			if (this.isActive() && !this.isBusy() && this.isTriggered()) {
				this.gotoTitle();
			}
		}
		Scene_Base.prototype.update.call(this);
	};
	

	Scene_Gameover.prototype.createBackground = function() {
		this._backSprite = new Sprite();
		this._backSprite.bitmap = ImageManager.loadSystem(eg_background_image);
		this.addChild(this._backSprite);
	};
	

//########### Custom Window_GameoverCommand #######################################

	function Window_GameoverCommand(){
		this.initialize(...arguments);
	}
	
	
	Window_GameoverCommand.prototype = Object.create(Window_Command.prototype);
	Window_GameoverCommand.constructor = Window_GameoverCommand;
	
	
	Window_GameoverCommand.prototype.initialize = function(rect) {
		Window_Command.prototype.initialize.call(this, rect);
		this.openness = 0;
		this.selectContinue();
	};
	
	
	Window_GameoverCommand.prototype.makeCommandList = function() {
		const continueEnabled = this.isContinueEnabled();
		if(eg_continue === 'enable'){
			this.addCommand(TextManager.continue_, "continue", continueEnabled);
		}
		if(eg_to_title === 'enable'){
			this.addCommand(TextManager.toTitle, "toTitle");
		}
		if(eg_quit === 'enable'){
			this.addCommand(TextManager.gameEnd, "gameEnd");
		}
	};


	Window_GameoverCommand.prototype.isContinueEnabled = function() {
		return DataManager.isAnySavefileExists();
	};
	

	Window_GameoverCommand.prototype.processOk = function() {
		Window_Command.prototype.processOk.call(this);
	};


	Window_GameoverCommand.prototype.selectContinue = function() {
		if(eg_continue === 'enable' && this.isContinueEnabled()){
			this.selectSymbol("continue");
		} else if(eg_to_title === 'enable'){
			this.selectSymbol("toTitle");
		} else {
			this.selectSymbol("gameEnd");
		}
	};
	

})();
