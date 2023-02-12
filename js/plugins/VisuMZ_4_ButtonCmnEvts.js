//=============================================================================
// VisuStella MZ - Button Common Events
// VisuMZ_4_ButtonCmnEvts.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ButtonCmnEvts = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ButtonCommonEvents = VisuMZ.ButtonCommonEvents || {};
VisuMZ.ButtonCommonEvents.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [ButtonCommonEvents]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Button_Common_Events_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, there's only a few keys on your keyboard that perform any kind
 * of action when pressed on the map screen. This plugin allows you to bind
 * Common Events to various other keys to expand the keyboard's functionality.
 * Plugin Commands can be used during the middle of a playthrough to change up
 * which Common Events are bound to each key as well, allowing you, the game
 * dev, to have full control over which keys can be used during the map screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to bind Common Events to the number keys, alphabet keys,
 *   symbols, numpad, and more.
 * * Change which Common Events run during a playthrough.
 * * Clear Common Events from keys to remove any bindings.
 * * Show visible buttons on the screen to indicate which buttons can be
 *   pressed on the keyboard (or with the mouse on the screen).
 * * Apply icons to the visible buttons and change them over time.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Compatibility Issues
 * ============================================================================
 *
 * This plugin will most likely have compatibility issues with anything that
 * alters keystrokes or makes use of them through a different manner. If you
 * are using another plugin that does something with keystrokes on the map
 * screen, the likelihood of clashing can occur if these plugins utilize the
 * same keystrokes and we will not be held accountable for that as it is
 * something within your power to change by simply picking different keys.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the Plugin Parameters, you will see a list of all the keys that you can
 * bind to a Common Event. If that number is something other than 0, then the
 * number associated with it will be the Common Event that will run. If you
 * assign it to a Common Event ID that does not exist, you will get an error so
 * please be wary of that.
 *
 * You may also notice that some of the keys have in parenthesis a word like
 * (OK) or (Cancel) next to them. What this means is that those keys already
 * have a function assigned to them by the game. If you assign a Common Event
 * to these keys and the 'Forbid Default Bound Keys?' Plugin Parameter is set
 * to 'false', then the native function of the key will be removed in favor of
 * the Common Event you've assigned.
 *
 * Here is a list of the keys that already have a command assigned:
 *
 * Key - What they're assigned to
 *   - Q         - Assigned to PageUp
 *   - W         - Assigned to PageDown
 *   - Shift     - Assigned to Dash
 *   - Z         - Assigned to OK
 *   - X         - Assigned to Cancel
 *   - Space     - Assigned to OK
 *   - Left      - Assigned to moving left
 *   - Up        - Assigned to moving up
 *   - Right     - Assigned to moving right
 *   - Down      - Assigned to moving down
 *   - Insert    - Assigned to Cancel
 *   - Page Up   - Assigned to PageUp
 *   - Page Down - Assigned to PageDown
 *   - Numpad 0  - Assigned to Cancel
 *   - Numpad 2  - Assigned to moving down
 *   - Numpad 4  - Assigned to moving left
 *   - Numpad 6  - Assigned to moving right
 *   - Numpad 8  - Assigned to moving up
 *
 * Once again, if you assign Common Events to these keys, the Common Event will
 * removing the binding the key had natively. However, this will only apply
 * while the player is in the field map and if the 'Forbid Default Bound Keys?'
 * Plugin Parameter is set to 'false'. Being inside of a menu or battle system
 * will restore the previously native functions.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Assign Button-Related Notetags ===
 * 
 * ---
 *
 * <Assign Button Common Event: id>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Makes this object selectable in the Item scene or Skill scene and have it
 *   become assignable to a button slot.
 * - If the object is originally usable (ie a Healing Potion or Healing Spell),
 *   the button assignment process will take priority and override it.
 * - Replace 'id' with a number representing the ID of the Common Event you
 *   wish to assign to a button.
 * - This needs to be used together with the <Assign Button Slots: x, x, x>
 *   notetag in order to have any effect.
 *
 * ---
 *
 * <Assign Button Slot: x>
 * <Assign Button Slot: x, x, x>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Lists the keyboard keys that can be assigned a Common Event when pressed.
 * - If the object is originally usable (ie a Healing Potion or Healing Spell),
 *   the button assignment process will take priority and override it.
 * - Replace 'x' with a number or letter representing the button you wish to
 *   assign a Common Event to.
 * - This needs to be used together with the <Assign Button Common Event: id>
 *   notetag in order to have any effect.
 * - The choices that become available will be listed in the order found in
 *   this notetag.
 * - Forbidden, non-existent, and non-valid keys will be filtered out of this
 *   list and cannot be assigned a Common Event.
 * 
 *   Example:
 * 
 *   <Assign Button Slot: A, S, D, F>
 *   <Assign Button Slot: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0>
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Change Button Common Event
 * - Change the Common Event bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to change.
 *
 *   Common Event ID:
 *   - Change the Common Event bound to specific key(s).
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 *
 * ---
 * 
 * System: Change Visibility
 * - Determines whether or not buttons are shown on screen.
 * 
 *   Visible?
 *   - Show or hide the visible Button Common Events on the screen?
 * 
 * ---
 *
 * System: Clear All Button Common Events
 * - Clears Common Events from all keys.
 *
 * ---
 *
 * System: Clear Button Common Event
 * - Clears any Common Events bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to clear.
 *
 * ---
 *
 * System: Clear Common Event ID(s)
 * - Clears any keys with the marked Common Event ID(s).
 * 
 *   Common Event ID(s):
 *   - Clears any keys with the marked Common Event ID(s).
 *
 * ---
 * 
 * System: Run Stored Button Common Event
 * - Run the Common Event stored on a specific key.
 * 
 *   Target Key:
 *   - Run the Common Event stored in this key.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the Plugin Parameters for this plugin. They manage all the key
 * bindings and which Common Events are linked by default to which keys. These
 * links are not permanent as they can be changed/cleared with Plugin Commands.
 *
 * ---
 *
 * Restriction
 * 
 *   Forbid Default Bound Keys?:
 *   - Forbid already bound input keys?
 *   - Allowing them may cause clashes.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show On Screen?:
 *   - Show buttons on screen by default?
 * 
 *   Change Tone on Hover?:
 *   - Change the tone of the button on hover?
 * 
 *   Hover Tone:
 *   - Tone settings upon hovering.
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Button Width:
 *   - The width of the visible button on screen.
 * 
 *   Button Height:
 *   - The height of the visible button on screen.
 * 
 *   Picture Filename:
 *   - Picture used as a button background.
 *   - If left empty, ignore drawing a picture.
 * 
 *   Undeclared Icons:
 *   - If a Button Common Event doesn't have an assigned icon,
 *     use one of these instead.
 * 
 *   JS: Draw Data:
 *   - JavaScript code that determines how to draw the visible button.
 *
 * ---
 * 
 * Button Positions
 * 
 *   JS: Bottom Point:
 *   JS: Above Point:
 *   JS: Left Point:
 *   JS: Right Point:
 *   - The X and Y coordinates for where the specific side buttons start.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Assignment Settings
 * ============================================================================
 *
 * The Assignment Settings Plugin Parameters apply to whenever you use the
 * Assign Button-Related Notetags in-game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Instructions:
 *   - The instruction text that appears when assigning a Common Event to
 *     a button.
 *
 * ---
 *
 * Window
 * 
 *   Key Align:
 *   - Text alignment for the button assignment window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the button assignment window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Key Settings
 * ============================================================================
 *
 * The Key Settings allow you to adjust the Common Event you want to bind to
 * each keyboard key along with whether or not you want the said key to appear
 * visibly on the screen.
 *
 * ---
 *
 * Key Settings
 * 
 *   Common Event ID:
 *   - The default common event tied to this key.
 *   - Leave it at 0 for no common event.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show Button?:
 *   - Show the button visibly on the screen?
 * 
 *   Requires Bind?:
 *   - If the button is shown, does it require a Common Event to be shown?
 * 
 *   Button Label:
 *   - What text do you want to display as the button label?
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 * 
 *   JS: Position:
 *   - The X and Y coordinates for where this button is positioned.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: February 12, 2021
 * * Bug Fixes!
 * ** Pressing a Button Common Event key while stepping onto a below priority
 *    touch event will no longer give priority tot he Button Common Event. Fix
 *    made by Arisu.
 * 
 * Version 1.02: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When pressing Button Common Events with the keyboard, any visible buttons
 *    on the screen will also flash their color tone briefly to show that they
 *    are being pressed. This is only if the Hover Tone Plugin Parameter is
 *    enabled. Update made by Yanfly.
 * * New Features!
 * ** New Notetags Added by Yanfly!
 * *** <Assign Button Common Event: id>
 * *** <Assign Button Slot: x, x, x>
 * ** New Plugin Command added by Yanfly!
 * *** System: Clear Common Event ID(s)
 * **** Clears any keys with the marked Common Event ID(s).
 * *** System: Run Stored Button Common Event
 * **** Run the Common Event stored on a specific key.
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Assignment Settings
 * 
 * Version 1.01: December 4, 2020
 * * Feature Update!
 * ** Plugin Command "System: Change Button Common Event" can now use code for
 *    icons. You can insert $gameVariables.value(50) in it and it will use
 *    whichever number is stored inside it as an icon. Update made by Irina.
 *
 * Version 1.00: August 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeButtonCommonEvent
 * @text System: Change Button Common Event
 * @desc Change the Common Event bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to change.
 * @default []
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Change the Common Event bound to specific key(s).
 * @default 0
 *
 * @arg Icon:eval
 * @text Button Icon
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ButtonCommonEventsVisibility
 * @text System: Change Visibility
 * @desc Determines whether or not buttons are shown on screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the visible Button Common Events on the screen?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearAllButtonCommonEvents
 * @text System: Clear All Button Common Events
 * @desc Clears Common Events from all keys.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearButtonCommonEvent
 * @text System: Clear Button Common Event
 * @desc Clears any Common Events bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to clear.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearButtonCommonEventID
 * @text System: Clear Common Event ID(s)
 * @desc Clears any keys with the marked Common Event ID(s).
 *
 * @arg CommonEventID:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Clears any keys with the marked Common Event ID(s).
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RunButtonCommonEvent
 * @text System: Run Stored Button Common Event
 * @desc Run the Common Event stored on a specific key.
 *
 * @arg Key:str
 * @text Target Key
 * @type combo
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Run the Common Event stored in this key.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ButtonCommonEvents
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc Adjust the general settings for this plugin.
 * @default {"ForbidInputKeys:eval":"true","Buttons":"","ShowButtonsOnScreen:eval":"true","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","ButtonWidth:num":"60","ButtonHeight:num":"60","ButtonFilename:str":"","IconsUsed:arraynum":"[\"160\",\"161\",\"162\",\"163\",\"164\",\"165\"]","DrawJS:func":"\"// Declare Constants\\nconst w = this.width;\\nconst h = this.height;\\n\\n// Draw Background\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\\n\\n// Draw Picture\\nif (this.pictureBitmap()) {\\n    const picBitmap = this.pictureBitmap();\\n    const pw = picBitmap.width;\\n    const ph = picBitmap.height;\\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\\n}\\n\\n// Draw Icon\\nconst iconIndex = this.buttonIcon();\\nconst iconBitmap = ImageManager.loadSystem(\\\"IconSet\\\");\\nconst iw = ImageManager.iconWidth;\\nconst ih = ImageManager.iconHeight;\\nconst ix = (iconIndex % 16) * iw;\\nconst iy = Math.floor(iconIndex / 16) * ih;\\nconst jw = Math.floor(this.width / iw) * iw;\\nconst jh = Math.floor(this.height / ih) * ih;\\nconst jx = Math.floor((this.width - jw) / 2);\\nconst jy = Math.floor((this.height - jh) / 2);\\nthis.bitmap._context.imageSmoothingEnabled = false;\\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\\nthis.bitmap._context.imageSmoothingEnabled = true;\\n\\n// Draw Button Label\\nconst text = this.buttonLabel();\\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');\"","Positions":"","BottomPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\\nlet y = container.height - buttonHeight;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","AbovePointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\\nlet y = container.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","LeftPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","RightPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.width;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param Assign:struct
 * @text Assignment Settings
 * @type struct<Assign>
 * @desc Adjust the assignment settings for this plugin.
 * @default {"Vocab":"","Instruction:str":"Assign to which button slot?","Window":"","AssignWindow_KeyAlign:str":"center","AssignWindow_RectJS:func":"\"// Declare Constants\\nconst slots = arguments[0];\\nconst cellSize = (Window_Base.prototype.lineHeight() * 2) + 8;\\n\\n// Calculate X, Y, W, H\\nlet ww = ($gameSystem.windowPadding() * 2) + (slots.length * cellSize);\\nww = ww.clamp(Graphics.boxWidth / 3, Graphics.boxWidth);\\nlet wh = this.calcWindowHeight(3, true);\\nlet wx = Math.round((Graphics.boxWidth - ww) / 2);\\nlet wy = Math.round((Graphics.boxHeight - wh) / 2);\\n\\n// Create Window Rectangle\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param NumberKeys
 * @text Number Keys
 *
 * @param KeyCode49:struct
 * @text Key: 1
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 0;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode50:struct
 * @text Key: 2
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode51:struct
 * @text Key: 3
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 2;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode52:struct
 * @text Key: 4
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 3;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode53:struct
 * @text Key: 5
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 4;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode54:struct
 * @text Key: 6
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 5;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode55:struct
 * @text Key: 7
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 6;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode56:struct
 * @text Key: 8
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 7;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode57:struct
 * @text Key: 9
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 8;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode48:struct
 * @text Key: 0
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 9;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param LetterKeys
 * @text Letter Keys
 *
 * @param KeyCode65:struct
 * @text Key: A
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"A","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode66:struct
 * @text Key: B
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"B","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode67:struct
 * @text Key: C
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"C","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode68:struct
 * @text Key: D
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"D","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode69:struct
 * @text Key: E
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"E","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode70:struct
 * @text Key: F
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"F","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode71:struct
 * @text Key: G
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"G","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode72:struct
 * @text Key: H
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"H","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode73:struct
 * @text Key: I
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"I","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode74:struct
 * @text Key: J
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"J","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode75:struct
 * @text Key: K
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"K","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode76:struct
 * @text Key: L
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"L","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode77:struct
 * @text Key: M
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"M","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode78:struct
 * @text Key: N
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"N","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode79:struct
 * @text Key: O
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"O","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode80:struct
 * @text Key: P
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"P","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode81:struct
 * @text Key: Q (PgUp)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Q","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode82:struct
 * @text Key: R
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"R","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode83:struct
 * @text Key: S
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"S","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode84:struct
 * @text Key: T
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"T","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode85:struct
 * @text Key: U
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"U","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode86:struct
 * @text Key: V
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"V","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode87:struct
 * @text Key: W (PgDn)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"W","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode88:struct
 * @text Key: X (Cancel)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"X","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode89:struct
 * @text Key: Y
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Y","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode90:struct
 * @text Key: Z (OK)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Z","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param SymbolKeys
 * @text Symbol Keys
 *
 * @param KeyCode192:struct
 * @text Key: ` ~
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"~","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x - buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode189:struct
 * @text Key: - _
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 10;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode187:struct
 * @text Key: = +
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 11;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode219:struct
 * @text Key: [ {
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"[","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode221:struct
 * @text Key: ] }
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"]","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 11;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode220:struct
 * @text Key: \ |
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\\","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 12;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode186:struct
 * @text Key: ; :
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":";","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode222:struct
 * @text Key: ' "
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\"","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode188:struct
 * @text Key: , <
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode190:struct
 * @text Key: . >
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode191:struct
 * @text Key: / ?
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"?","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param MiscKeys
 * @text Misc Keys
 *
 * @param KeyCode32:struct
 * @text Key: Space (OK)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Space","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode37:struct
 * @text Key: Left (Left)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 3;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode38:struct
 * @text Key: Up (Up)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"^","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode39:struct
 * @text Key: Right (Right)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">>","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 1;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode40:struct
 * @text Key: Down (Down)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"v","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode45:struct
 * @text Key: Insert
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Ins","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode46:struct
 * @text Key: Delete
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Del","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode36:struct
 * @text Key: Home
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Home","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode35:struct
 * @text Key: End
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"End","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode33:struct
 * @text Key: Page Up (PgUp)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgUp","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode34:struct
 * @text Key: Page Down (PgDn)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgDn","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param NumPadKeys
 * @text NumPad Keys
 *
 * @param KeyCode96:struct
 * @text Key: NumPad 0 (Cancel)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode97:struct
 * @text Key: NumPad 1
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode98:struct
 * @text Key: NumPad 2 (Down)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode99:struct
 * @text Key: NumPad 3
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode100:struct
 * @text Key: NumPad 4 (Left)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode101:struct
 * @text Key: NumPad 5
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode102:struct
 * @text Key: NumPad 6 (Right)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode103:struct
 * @text Key: NumPad 7
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode104:struct
 * @text Key: NumPad 8 (Up)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode105:struct
 * @text Key: NumPad 9
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode110:struct
 * @text Key: NumPad .
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":".","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode107:struct
 * @text Key: NumPad +
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode109:struct
 * @text Key: NumPad -
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode106:struct
 * @text Key: NumPad *
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"*","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode111:struct
 * @text Key: NumPad /
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"/","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param ForbidInputKeys:eval
 * @text Forbid Default Keys?
 * @parent Forbidden
 * @type boolean
 * @on Forbid
 * @off Allow
 * @desc Forbid already bound input keys?
 * Allowing them may cause clashes.
 * @default true
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButtonsOnScreen:eval
 * @text Show On Screen?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show buttons on screen by default?
 * @default true
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Buttons
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the button on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param ButtonWidth:num
 * @text Button Width
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The width of the visible button on screen.
 * @default 80
 *
 * @param ButtonHeight:num
 * @text Button Height
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The height of the visible button on screen.
 * @default 80
 *
 * @param ButtonFilename:str
 * @text Picture Filename
 * @parent Buttons
 * @type file
 * @dir img/pictures/
 * @desc Picture used as a button background.
 * If left empty, ignore drawing a picture.
 * @default 
 *
 * @param IconsUsed:arraynum
 * @text Undeclared Icons
 * @parent Buttons
 * @type string[]
 * @desc If a Button Common Event doesn't have an assigned icon, use one of these instead.
 * @default ["160","161","162","163","164","165"]
 *
 * @param DrawJS:func
 * @text JS: Draw Data
 * @parent Buttons
 * @type note
 * @desc JavaScript code that determines how to draw the visible button.
 * @default "// Declare Constants\nconst w = this.width;\nconst h = this.height;\n\n// Draw Background\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\n\n// Draw Picture\nif (this.pictureBitmap()) {\n    const picBitmap = this.pictureBitmap();\n    const pw = picBitmap.width;\n    const ph = picBitmap.height;\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\n}\n\n// Draw Icon\nconst iconIndex = this.buttonIcon();\nconst iconBitmap = ImageManager.loadSystem(\"IconSet\");\nconst iw = ImageManager.iconWidth;\nconst ih = ImageManager.iconHeight;\nconst ix = (iconIndex % 16) * iw;\nconst iy = Math.floor(iconIndex / 16) * ih;\nconst jw = Math.floor(this.width / iw) * iw;\nconst jh = Math.floor(this.height / ih) * ih;\nconst jx = Math.floor((this.width - jw) / 2);\nconst jy = Math.floor((this.height - jh) / 2);\nthis.bitmap._context.imageSmoothingEnabled = false;\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\nthis.bitmap._context.imageSmoothingEnabled = true;\n\n// Draw Button Label\nconst text = this.buttonLabel();\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');"
 * 
 * @param Positions
 * @text Button Positions
 *
 * @param BottomPointJS:func
 * @text JS: Bottom Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the bottom buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\nlet y = container.height - buttonHeight;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param AbovePointJS:func
 * @text JS: Above Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the uppoer buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\nlet y = container.y;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param LeftPointJS:func
 * @text JS: Left Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the left-side buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.x;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param RightPointJS:func
 * @text JS: Right Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the right-side buttons end.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.width;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Assign Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Assign:
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param Instruction:str
 * @text Instructions
 * @parent Vocab
 * @desc The instruction text that appears when assigning a Common Event to a button.
 * @default Assign to which button slot?
 * 
 * @param Window
 *
 * @param AssignWindow_KeyAlign:str
 * @text Key Align
 * @parent Window
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the button assignment window?
 * @default center
 *
 * @param AssignWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window
 * @type note
 * @desc Code used to determine the dimensions for the button assignment window.
 * @default {"Vocab":"","Instruction:str":"Assign to which button slot?","Window":"","AssignWindow_KeyAlign:str":"center","AssignWindow_RectJS:func":"\"// Declare Constants\\nconst slots = arguments[0];\\nconst cellSize = (Window_Base.prototype.lineHeight() * 2) + 8;\\n\\n// Calculate X, Y, W, H\\nlet ww = ($gameSystem.windowPadding() * 2) + (slots.length * cellSize);\\nww = ww.clamp(Graphics.boxWidth / 3, Graphics.boxWidth);\\nlet wh = this.calcWindowHeight(3, true);\\nlet wx = Math.round((Graphics.boxWidth - ww) / 2);\\nlet wy = Math.round((Graphics.boxHeight - wh) / 2);\\n\\n// Create Window Rectangle\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Key Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeySettings:
 *
 * @param CommonEventID:num
 * @text Common Event ID
 * @parent NeededData
 * @type common_event
 * @desc The default common event tied to this key.
 * Leave it at 0 for no common event.
 * @default 0
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButton:eval
 * @text Show Button?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the button visibly on the screen?
 * @default false
 *
 * @param ShowOnlyIfCePresent:eval
 * @text Requires Bind?
 * @parent ShowButton:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If the button is shown, does it require a Common Event to be shown?
 * @default true
 *
 * @param ButtonText:str
 * @text Button Label
 * @parent Buttons
 * @desc What text do you want to display as the button label?
 * @default Untitled
 *
 * @param ButtonIcon:num
 * @text Button Icon
 * @parent Buttons
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @param PositionJS:func
 * @text JS: Position
 * @parent Buttons
 * @type note
 * @desc The X and Y coordinates for where this button is positioned.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\nconst bottomPoint = this.bottomPoint();\nconst abovePoint = this.abovePoint();\nconst leftPoint = this.leftPoint();\nconst rightPoint = this.rightPoint();\n\n// Calculate Coordinates\nlet x = 0;\nlet y = 0;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 */
//=============================================================================

const _0x5206=['SHIFT','_buttonCommonEventIcons','contents','CANCEL','round','_context','floor','RegExp','createAssignButtonCommonEventsWindow','WIN_OEM_CLEAR','buttonIcon','RightPointJS','EXCLAMATION','name','exit','buttonWidth','getButtonCommonEventIcon','BACK_SLASH','QUESTION_MARK','Game_System_initialize','PRINT','_icon','iconWidth','addCommand','BottomPointJS','innerWidth','ButtonCommonEvents','COMMA','getButtonCommonEvent','STRUCT','HYPHEN_MINUS','Instruction','buttonLabel','drawItem','rowSpacing','bind','F24','call','IconsUsed','imageSmoothingEnabled','isEventRunning','blt','addChild','ALTGR','4AyVsiR','PA1','isKeyButtonCommonEventValid','Window_ItemList_isEnabled','boxWidth','EISU','create','486471ZaJNBx','ButtonHeight','190189uNLXnE','WIN_OEM_AUTO','ext','updateOpacity','reserveCommonEvent','clearColorTone','some','Scene_Item','WIN_OEM_PA2','isBusy','Scene_Skill','JUNJA','width','CanAssignButtonCommonEvent','PLAY','Scene_Map_createSpriteset','callCommonEvent','isPressed','460016GQNKVS','toUpperCase','AssignWindow_KeyAlign','setColorTone','height','calcWindowHeight','forceSelect','createSpriteset','PRINTSCREEN','163063xMoZdx','_assignButtonCommonEventsWindow','windowPadding','NUM','F20','ButtonText','makeCommandList','onClick','NUMPAD0','LEFT','match','ARRAYFUNC','stringKeyMap','changePaintOpacity','lineHeight','NUMPAD4','DIVIDE','trim','WIN_OEM_FJ_ROYA','PGUP','prototype','numberFontFace','_key','drawTitle','log','INSERT','drawText','ButtonWidth','2SANCmN','_buttonCommonEventKeyCodes','_buttonCommonEventShowButtons','assignButtonCommonEventWindowTitle','HoverTone','SUBTRACT','removeChild','WIN_ICO_00','GREATER_THAN','_buttonCommonEventsSpriteContainer','DELETE','initButtonCommonEvents','updateIcon','346295MmlSln','drawIcon','commonEventID','1304152blZlnq','rightPoint','SELECT','WIN_ICO_CLEAR','NUMPAD7','indexOf','AssignButtonSlots','onMouseExit','includes','replace','iconHeight','ZOOM','HELP','DOLLAR','onKeyDown','ARRAYJSON','setButtonCommonEventIcon','PIPE','CLOSE_BRACKET','WIN_OEM_FJ_JISHO','makeDefaultButtonCommonEvents','F12','BUTTON_LABEL_ALIGN','destroy','createButtonSprites','parameters','ForbidInputKeys','Scene_Boot_onDatabaseLoaded','isCommandEnabled','WIN_OEM_FINISH','BACKSPACE','KeysArray','PGDN','isSceneMap','isButtonCommonEventOk','Scene_Item_onItemOk','clamp','constructor','Scene_Skill_onItemOk','clearButtonCommonEventID','VOLUME_MUTE','UNDERSCORE','setData','NUMPAD2','F22','F17','Window_SkillList_isEnabled','WIN_OEM_CUSEL','createButtonCommonEventsSpriteContainer','CAPSLOCK','setShowButtonCommonEventButtons','mainFontSize','currentExt','scrollBaseY','drawData','flashColorTone','item','ChangeButtonCommonEvent','itemHeight','WIN_OEM_FJ_MASSHOU','CTRL','registerCommand','Scene_Map_isAnyButtonPressed','eventsXy','WIN_OEM_JUMP','isTriggerIn','push','update','itemRect','ENTER_SPECIAL','SceneManager_onKeyDown','76650pJBGcF','EXSEL','gradientFillRect','isPlaytest','isSceneChanging','SLEEP','max','SLASH','itemBackColor1','length','split','_itemWindow','clearButtonCommonEventIcon','EQUALS','opacity','PERIOD','CLEAR','maxCols','FUNC','LeftPointJS','isShowButtonCommonEventButtons','onItemOk','setButtonCommonEvent','isButtonCommonEventForbidden','resetFontSettings','ButtonIcon','WIN_OEM_COPY','LESS_THAN','PLUS','NUMPAD8','Settings','fontSize','KeyCode%1','Keys','ESC','DrawJS','CLOSE_PAREN','checkEventTriggerTouchInForwardLocation','leftPoint','createBitmap','version','assign','refresh','ENTER','onButtonAssistAssign','ADD','assignButtonCommonEventsWindowRect','status','itemRectWithPadding','CONTEXT_MENU','fontFace','initialize','return\x200','ClearButtonCommonEventID','DECIMAL','processButtonCommonEvent','QUOTE','AssignCommonEvent','F11','initMembers','clearButtonCommonEvent','NONCONVERT','WIN_OEM_FJ_LOYA','_scene','activate','2AvCNNJ','F18','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','F23','WIN_OEM_WSCTRL','MULTIPLY','buttonHeight','CONVERT','filter','_commonEventID','settings','bitmap','ConvertParams','parse','META','WIN_ICO_HELP','ClearButtonCommonEvent','MINUS','ACCEPT','targetOpacity','flashButtonPress','_windowLayer','isActive','CommonEventID','NUMPAD6','loadButtomCommonEventImage','isAnyButtonPressed','map','onButtonAssistCancel','AbovePointJS','JSON','NUMPAD3','ARRAYSTRUCT','General','OPEN_BRACKET','OPEN_CURLY_BRACKET','colSpacing','F15','description','AMPERSAND','WIN_OEM_ENLW','EREOF','pictureBitmap','TAB','SPACE','WIN_OEM_FJ_TOUROKU','DOUBLE_QUOTE','iconIndex','onColorTone','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SEMICOLON','Icon','children','HOME','keyCode','onMouseEnter','bottomPoint','NUMPAD5','EXECUTE','isEnabled','isCommonEventPressed','PERCENT','_buttomCommonEventImage','VOLUME_DOWN','!!\x20ERROR\x20VisuMZ_4_ButtonCmnEvts\x20ERROR\x20!!\x0aKey\x20%1\x20cannot\x20be\x20bound!\x0aIt\x20is\x20a\x20forbidden\x20keybased\x20on\x0ayour\x20Plugin\x20Parameter\x20settings!','OPEN_PAREN','note','setHandler','STR','KANA','format','_slots','ShowButtonsOnScreen','ASTERISK','playOkSound','RunButtonCommonEvent','process_VisuMZ_ButtonCommonEvents_Parameters','loadPicture'];const _0x4ec4=function(_0x22ac9e,_0x1b3bf0){_0x22ac9e=_0x22ac9e-0x110;let _0x520645=_0x5206[_0x22ac9e];return _0x520645;};const _0x5608de=_0x4ec4;(function(_0x579323,_0x477d00){const _0x312fb0=_0x4ec4;while(!![]){try{const _0x5c182f=-parseInt(_0x312fb0(0x1d0))+parseInt(_0x312fb0(0x217))+parseInt(_0x312fb0(0x207))*-parseInt(_0x312fb0(0x1eb))+-parseInt(_0x312fb0(0x214))*parseInt(_0x312fb0(0x1c7))+-parseInt(_0x312fb0(0x14d))*-parseInt(_0x312fb0(0x1ce))+parseInt(_0x312fb0(0x1e2))+-parseInt(_0x312fb0(0x25e));if(_0x5c182f===_0x477d00)break;else _0x579323['push'](_0x579323['shift']());}catch(_0x21798d){_0x579323['push'](_0x579323['shift']());}}}(_0x5206,0xb94b5));var label='ButtonCommonEvents',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x59e890){const _0x2086b5=_0x4ec4;return _0x59e890[_0x2086b5(0x13b)]&&_0x59e890[_0x2086b5(0x173)][_0x2086b5(0x21f)]('['+label+']');})[0x0];VisuMZ[label][_0x5608de(0x12a)]=VisuMZ[label][_0x5608de(0x12a)]||{},VisuMZ[_0x5608de(0x159)]=function(_0x4e4c04,_0x5157fe){const _0x8353ab=_0x5608de;for(const _0x4e7b6a in _0x5157fe){if(_0x4e7b6a[_0x8353ab(0x1f5)](/(.*):(.*)/i)){const _0xd1d796=String(RegExp['$1']),_0x50c7d6=String(RegExp['$2'])[_0x8353ab(0x1e3)]()['trim']();let _0x31a0c1,_0x51fd9d,_0x155514;switch(_0x50c7d6){case _0x8353ab(0x1ee):_0x31a0c1=_0x5157fe[_0x4e7b6a]!==''?Number(_0x5157fe[_0x4e7b6a]):0x0;break;case'ARRAYNUM':_0x51fd9d=_0x5157fe[_0x4e7b6a]!==''?JSON[_0x8353ab(0x15a)](_0x5157fe[_0x4e7b6a]):[],_0x31a0c1=_0x51fd9d[_0x8353ab(0x168)](_0x560472=>Number(_0x560472));break;case'EVAL':_0x31a0c1=_0x5157fe[_0x4e7b6a]!==''?eval(_0x5157fe[_0x4e7b6a]):null;break;case'ARRAYEVAL':_0x51fd9d=_0x5157fe[_0x4e7b6a]!==''?JSON[_0x8353ab(0x15a)](_0x5157fe[_0x4e7b6a]):[],_0x31a0c1=_0x51fd9d['map'](_0x4be628=>eval(_0x4be628));break;case _0x8353ab(0x16b):_0x31a0c1=_0x5157fe[_0x4e7b6a]!==''?JSON[_0x8353ab(0x15a)](_0x5157fe[_0x4e7b6a]):'';break;case _0x8353ab(0x226):_0x51fd9d=_0x5157fe[_0x4e7b6a]!==''?JSON['parse'](_0x5157fe[_0x4e7b6a]):[],_0x31a0c1=_0x51fd9d[_0x8353ab(0x168)](_0x37088e=>JSON[_0x8353ab(0x15a)](_0x37088e));break;case _0x8353ab(0x11e):_0x31a0c1=_0x5157fe[_0x4e7b6a]!==''?new Function(JSON[_0x8353ab(0x15a)](_0x5157fe[_0x4e7b6a])):new Function(_0x8353ab(0x140));break;case _0x8353ab(0x1f6):_0x51fd9d=_0x5157fe[_0x4e7b6a]!==''?JSON[_0x8353ab(0x15a)](_0x5157fe[_0x4e7b6a]):[],_0x31a0c1=_0x51fd9d[_0x8353ab(0x168)](_0x349892=>new Function(JSON[_0x8353ab(0x15a)](_0x349892)));break;case _0x8353ab(0x191):_0x31a0c1=_0x5157fe[_0x4e7b6a]!==''?String(_0x5157fe[_0x4e7b6a]):'';break;case'ARRAYSTR':_0x51fd9d=_0x5157fe[_0x4e7b6a]!==''?JSON['parse'](_0x5157fe[_0x4e7b6a]):[],_0x31a0c1=_0x51fd9d[_0x8353ab(0x168)](_0x37e9eb=>String(_0x37e9eb));break;case _0x8353ab(0x1b8):_0x155514=_0x5157fe[_0x4e7b6a]!==''?JSON['parse'](_0x5157fe[_0x4e7b6a]):{},_0x31a0c1=VisuMZ[_0x8353ab(0x159)]({},_0x155514);break;case _0x8353ab(0x16d):_0x51fd9d=_0x5157fe[_0x4e7b6a]!==''?JSON[_0x8353ab(0x15a)](_0x5157fe[_0x4e7b6a]):[],_0x31a0c1=_0x51fd9d['map'](_0x3dc3ec=>VisuMZ[_0x8353ab(0x159)]({},JSON[_0x8353ab(0x15a)](_0x3dc3ec)));break;default:continue;}_0x4e4c04[_0xd1d796]=_0x31a0c1;}}return _0x4e4c04;},(_0x569046=>{const _0x3e8b41=_0x5608de,_0x21437f=_0x569046['name'];for(const _0x3d7129 of dependencies){if(!Imported[_0x3d7129]){alert(_0x3e8b41(0x17e)['format'](_0x21437f,_0x3d7129)),SceneManager[_0x3e8b41(0x1a9)]();break;}}const _0x17c287=_0x569046[_0x3e8b41(0x173)];if(_0x17c287[_0x3e8b41(0x1f5)](/\[Version[ ](.*?)\]/i)){const _0x413057=Number(RegExp['$1']);_0x413057!==VisuMZ[label][_0x3e8b41(0x134)]&&(alert(_0x3e8b41(0x14f)[_0x3e8b41(0x193)](_0x21437f,_0x413057)),SceneManager[_0x3e8b41(0x1a9)]());}if(_0x17c287['match'](/\[Tier[ ](\d+)\]/i)){const _0x52a1b3=Number(RegExp['$1']);_0x52a1b3<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x21437f,_0x52a1b3,tier)),SceneManager[_0x3e8b41(0x1a9)]()):tier=Math[_0x3e8b41(0x112)](_0x52a1b3,tier);}VisuMZ[_0x3e8b41(0x159)](VisuMZ[label][_0x3e8b41(0x12a)],_0x569046[_0x3e8b41(0x230)]);})(pluginData),PluginManager[_0x5608de(0x254)](pluginData[_0x5608de(0x1a8)],_0x5608de(0x250),_0x1ce0a4=>{const _0x2832bc=_0x5608de;VisuMZ[_0x2832bc(0x159)](_0x1ce0a4,_0x1ce0a4);const _0x358180=_0x1ce0a4[_0x2832bc(0x12d)],_0x4def2c=_0x1ce0a4[_0x2832bc(0x164)],_0x258bee=_0x1ce0a4[_0x2832bc(0x180)];for(let _0x276fe4 of _0x358180){_0x276fe4=_0x276fe4[_0x2832bc(0x220)](/\s*\(.*?\)\s*/g,'')[_0x2832bc(0x1e3)]()[_0x2832bc(0x1fc)]();const _0x5aadef=TextManager[_0x2832bc(0x1f7)]['indexOf'](_0x276fe4);_0x5aadef>0x0&&($gameSystem[_0x2832bc(0x122)](_0x5aadef,_0x4def2c),$gameSystem['setButtonCommonEventIcon'](_0x5aadef,_0x258bee));}}),PluginManager['registerCommand'](pluginData[_0x5608de(0x1a8)],'ButtonCommonEventsVisibility',_0x33faa4=>{const _0x88b790=_0x5608de;VisuMZ[_0x88b790(0x159)](_0x33faa4,_0x33faa4);const _0x239a31=_0x33faa4['Visible'];$gameSystem[_0x88b790(0x249)](_0x239a31);}),PluginManager[_0x5608de(0x254)](pluginData[_0x5608de(0x1a8)],_0x5608de(0x15d),_0x703d03=>{const _0x45a77c=_0x5608de;VisuMZ[_0x45a77c(0x159)](_0x703d03,_0x703d03);const _0x5a683f=_0x703d03[_0x45a77c(0x12d)];for(let _0x35211d of _0x5a683f){_0x35211d=_0x35211d[_0x45a77c(0x220)](/\s*\(.*?\)\s*/g,'')[_0x45a77c(0x1e3)]()[_0x45a77c(0x1fc)]();const _0x1db009=TextManager['stringKeyMap']['indexOf'](_0x35211d);if(_0x1db009>0x0)$gameSystem[_0x45a77c(0x122)](_0x1db009,0x0);}}),PluginManager[_0x5608de(0x254)](pluginData[_0x5608de(0x1a8)],'ClearAllButtonCommonEvents',_0x210308=>{const _0x11f21e=_0x5608de;$gameSystem[_0x11f21e(0x208)]={};}),PluginManager[_0x5608de(0x254)](pluginData[_0x5608de(0x1a8)],_0x5608de(0x141),_0x2aac91=>{const _0x16fc5f=_0x5608de;VisuMZ[_0x16fc5f(0x159)](_0x2aac91,_0x2aac91);const _0x54f845=_0x2aac91[_0x16fc5f(0x164)];for(const _0x36209f of _0x54f845){$gameSystem[_0x16fc5f(0x23e)](_0x36209f);}}),PluginManager['registerCommand'](pluginData[_0x5608de(0x1a8)],_0x5608de(0x198),_0x1720f2=>{const _0x12efd0=_0x5608de;VisuMZ[_0x12efd0(0x159)](_0x1720f2,_0x1720f2);let _0x18f5ed=_0x1720f2['Key'][_0x12efd0(0x1e3)]()[_0x12efd0(0x1fc)]();_0x18f5ed=_0x18f5ed[_0x12efd0(0x220)](/\s*\(.*?\)\s*/g,'')['toUpperCase']()[_0x12efd0(0x1fc)]();const _0x190fa6=TextManager[_0x12efd0(0x1f7)][_0x12efd0(0x21c)](letter),_0x249a74=$gameSystem[_0x12efd0(0x1b7)](_0x190fa6);_0x249a74>0x0&&$gameTemp[_0x12efd0(0x1d4)](_0x249a74);}),VisuMZ[_0x5608de(0x1b5)][_0x5608de(0x1a2)]={'AssignCommonEvent':/<ASSIGN BUTTON COMMON EVENT:[ ](.*)>/i,'AssignButtonSlots':/<ASSIGN BUTTON (?:SLOT|SLOTS):[ ](.*)>/i},VisuMZ[_0x5608de(0x1b5)][_0x5608de(0x232)]=Scene_Boot[_0x5608de(0x1ff)]['onDatabaseLoaded'],Scene_Boot[_0x5608de(0x1ff)]['onDatabaseLoaded']=function(){const _0x4af079=_0x5608de;VisuMZ[_0x4af079(0x1b5)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x4af079(0x199)](),ImageManager[_0x4af079(0x166)]();},Scene_Boot[_0x5608de(0x1ff)][_0x5608de(0x199)]=function(){const _0x4dc844=_0x5608de,_0x3312a9=[];for(let _0x47cf55=0x30;_0x47cf55<=0x39;_0x47cf55++){_0x3312a9[_0x4dc844(0x259)](_0x47cf55);}for(let _0x11e504=0x41;_0x11e504<=0x5a;_0x11e504++){_0x3312a9[_0x4dc844(0x259)](_0x11e504);}for(let _0x14c569=0xba;_0x14c569<=0xc0;_0x14c569++){_0x3312a9[_0x4dc844(0x259)](_0x14c569);}for(let _0x5ca89b=0xdb;_0x5ca89b<=0xde;_0x5ca89b++){_0x3312a9[_0x4dc844(0x259)](_0x5ca89b);}for(let _0xc18322=0x20;_0xc18322<=0x28;_0xc18322++){_0x3312a9[_0x4dc844(0x259)](_0xc18322);}for(let _0x3d9872=0x2d;_0x3d9872<=0x2e;_0x3d9872++){_0x3312a9[_0x4dc844(0x259)](_0x3d9872);}for(let _0x110689=0x60;_0x110689<=0x6f;_0x110689++){_0x3312a9[_0x4dc844(0x259)](_0x110689);}VisuMZ['ButtonCommonEvents'][_0x4dc844(0x236)]=_0x3312a9;},Input[_0x5608de(0x123)]=function(_0x14c8ee){const _0x5540ee=_0x5608de;if(!VisuMZ[_0x5540ee(0x1b5)][_0x5540ee(0x12a)]['General'][_0x5540ee(0x231)])return![];return!!Input['keyMapper'][_0x14c8ee];},ImageManager['loadButtomCommonEventImage']=function(){const _0x238c0c=_0x5608de,_0x5780c7=VisuMZ[_0x238c0c(0x1b5)][_0x238c0c(0x12a)][_0x238c0c(0x16e)]['ButtonFilename'];this['_buttomCommonEventImage']=_0x5780c7?ImageManager[_0x238c0c(0x19a)](_0x5780c7):new Bitmap(0x1,0x1);},TextManager['stringKeyMap']=['','','',_0x5608de(0x19e),'','',_0x5608de(0x223),'',_0x5608de(0x235),_0x5608de(0x178),'','',_0x5608de(0x11c),_0x5608de(0x137),_0x5608de(0x25c),'',_0x5608de(0x19b),_0x5608de(0x253),'ALT','PAUSE',_0x5608de(0x248),_0x5608de(0x192),_0x5608de(0x1cc),_0x5608de(0x1db),'FINAL','HANJA','',_0x5608de(0x12e),_0x5608de(0x154),_0x5608de(0x149),_0x5608de(0x15f),'MODECHANGE',_0x5608de(0x179),_0x5608de(0x1fe),_0x5608de(0x237),'END',_0x5608de(0x182),_0x5608de(0x1f4),'UP','RIGHT','DOWN',_0x5608de(0x219),_0x5608de(0x1af),_0x5608de(0x187),_0x5608de(0x1ea),_0x5608de(0x204),_0x5608de(0x211),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x5608de(0x17f),_0x5608de(0x127),_0x5608de(0x119),_0x5608de(0x20f),_0x5608de(0x1ad),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x5608de(0x13d),'',_0x5608de(0x111),_0x5608de(0x1f3),'NUMPAD1',_0x5608de(0x242),_0x5608de(0x16c),_0x5608de(0x1fa),_0x5608de(0x186),_0x5608de(0x165),_0x5608de(0x21b),_0x5608de(0x129),'NUMPAD9',_0x5608de(0x152),_0x5608de(0x139),'SEPARATOR',_0x5608de(0x20c),_0x5608de(0x142),_0x5608de(0x1fb),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x5608de(0x146),_0x5608de(0x22c),'F13','F14',_0x5608de(0x172),'F16',_0x5608de(0x244),_0x5608de(0x14e),'F19',_0x5608de(0x1ef),'F21',_0x5608de(0x243),_0x5608de(0x150),_0x5608de(0x1bf),'','','','','','','','','NUM_LOCK','SCROLL_LOCK',_0x5608de(0x22a),_0x5608de(0x252),_0x5608de(0x17a),_0x5608de(0x14a),_0x5608de(0x1fd),'','','','','','','','','','CIRCUMFLEX',_0x5608de(0x1a7),_0x5608de(0x17b),'HASH',_0x5608de(0x224),_0x5608de(0x18a),_0x5608de(0x174),_0x5608de(0x240),_0x5608de(0x18e),_0x5608de(0x130),_0x5608de(0x196),_0x5608de(0x128),_0x5608de(0x228),_0x5608de(0x1b9),_0x5608de(0x170),'CLOSE_CURLY_BRACKET','TILDE','','','','',_0x5608de(0x23f),_0x5608de(0x18c),'VOLUME_UP','','',_0x5608de(0x17f),'EQUALS',_0x5608de(0x1b6),_0x5608de(0x15e),_0x5608de(0x11b),_0x5608de(0x113),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x5608de(0x16f),_0x5608de(0x1ac),_0x5608de(0x229),_0x5608de(0x144),'',_0x5608de(0x15b),_0x5608de(0x1c6),'',_0x5608de(0x15c),_0x5608de(0x20e),'',_0x5608de(0x21a),'','','WIN_OEM_RESET',_0x5608de(0x257),'WIN_OEM_PA1',_0x5608de(0x1d8),'WIN_OEM_PA3',_0x5608de(0x151),_0x5608de(0x246),'WIN_OEM_ATTN',_0x5608de(0x234),_0x5608de(0x126),_0x5608de(0x1d1),_0x5608de(0x175),'WIN_OEM_BACKTAB','ATTN','CRSEL',_0x5608de(0x25f),_0x5608de(0x176),_0x5608de(0x1de),_0x5608de(0x222),'',_0x5608de(0x1c8),_0x5608de(0x1a4),''],VisuMZ[_0x5608de(0x1b5)][_0x5608de(0x25d)]=SceneManager[_0x5608de(0x225)],SceneManager[_0x5608de(0x225)]=function(_0x46fc2a){const _0x2f453e=_0x5608de;this[_0x2f453e(0x238)]()&&this[_0x2f453e(0x1c9)](_0x46fc2a)&&this[_0x2f453e(0x14b)][_0x2f453e(0x143)](_0x46fc2a['keyCode']),VisuMZ[_0x2f453e(0x1b5)][_0x2f453e(0x25d)]['call'](this,_0x46fc2a);},SceneManager[_0x5608de(0x238)]=function(){const _0xca84b0=_0x5608de;return this[_0xca84b0(0x14b)]&&this['_scene'][_0xca84b0(0x23c)]===Scene_Map;},SceneManager[_0x5608de(0x1c9)]=function(_0x2a42d0){const _0x4bcf31=_0x5608de;return!Input[_0x4bcf31(0x123)](_0x2a42d0[_0x4bcf31(0x183)]);},VisuMZ[_0x5608de(0x1b5)][_0x5608de(0x1ae)]=Game_System[_0x5608de(0x1ff)]['initialize'],Game_System[_0x5608de(0x1ff)]['initialize']=function(){const _0xacdcbf=_0x5608de;VisuMZ[_0xacdcbf(0x1b5)][_0xacdcbf(0x1ae)][_0xacdcbf(0x1c0)](this),this[_0xacdcbf(0x212)]();},Game_System[_0x5608de(0x1ff)][_0x5608de(0x212)]=function(){const _0x33c5b2=_0x5608de;this['_buttonCommonEventKeyCodes']={},this[_0x33c5b2(0x19c)]={},this[_0x33c5b2(0x209)]=VisuMZ[_0x33c5b2(0x1b5)][_0x33c5b2(0x12a)]['General'][_0x33c5b2(0x195)],this[_0x33c5b2(0x22b)]();},Game_System[_0x5608de(0x1ff)][_0x5608de(0x22b)]=function(){const _0x547633=_0x5608de,_0x158842=VisuMZ[_0x547633(0x1b5)][_0x547633(0x12a)],_0x42722d=_0x547633(0x12c);for(const _0x40effb of VisuMZ[_0x547633(0x1b5)][_0x547633(0x236)]){const _0x419c29=_0x42722d[_0x547633(0x193)](_0x40effb);!!_0x158842[_0x419c29]&&(this[_0x547633(0x122)](_0x40effb,_0x158842[_0x419c29][_0x547633(0x164)]),this['setButtonCommonEventIcon'](_0x40effb,_0x158842[_0x419c29][_0x547633(0x125)]));}},Game_System[_0x5608de(0x1ff)][_0x5608de(0x1b7)]=function(_0x58c86e){const _0x4cbd7f=_0x5608de;if(this[_0x4cbd7f(0x208)]===undefined)this[_0x4cbd7f(0x212)]();return this[_0x4cbd7f(0x208)][_0x58c86e]||0x0;},Game_System[_0x5608de(0x1ff)][_0x5608de(0x122)]=function(_0x39e583,_0x18c8c8){const _0x30dea4=_0x5608de;if(this['_buttonCommonEventKeyCodes']===undefined)this['initButtonCommonEvents']();if($gameTemp[_0x30dea4(0x261)]()&&Input[_0x30dea4(0x123)](_0x39e583)&&_0x18c8c8!==0x0){const _0x526b65=_0x30dea4(0x18d)[_0x30dea4(0x193)](TextManager[_0x30dea4(0x1f7)][_0x39e583]);alert(_0x526b65);return;}this[_0x30dea4(0x208)][_0x39e583]=_0x18c8c8;},Game_System[_0x5608de(0x1ff)][_0x5608de(0x148)]=function(_0x15634d){const _0x1e870c=_0x5608de;if(this[_0x1e870c(0x208)]===undefined)this['initButtonCommonEvents']();delete this['_buttonCommonEventKeyCodes'][_0x15634d];},Game_System[_0x5608de(0x1ff)][_0x5608de(0x1ab)]=function(_0x548b63){const _0x1d8465=_0x5608de;if(this['_buttonCommonEventIcons']===undefined)this['initButtonCommonEvents']();return this[_0x1d8465(0x19c)][_0x548b63]||0x0;},Game_System[_0x5608de(0x1ff)][_0x5608de(0x227)]=function(_0x5d17d7,_0x52163c){const _0x2dc1e1=_0x5608de;if(this['_buttonCommonEventIcons']===undefined)this[_0x2dc1e1(0x212)]();this['_buttonCommonEventIcons'][_0x5d17d7]=_0x52163c;},Game_System[_0x5608de(0x1ff)][_0x5608de(0x118)]=function(_0xf5a640){const _0x1a29ca=_0x5608de;if(this[_0x1a29ca(0x19c)]===undefined)this[_0x1a29ca(0x212)]();delete this['_buttonCommonEventIcons'][_0xf5a640];},Game_System['prototype'][_0x5608de(0x120)]=function(){const _0x43784b=_0x5608de;if(this[_0x43784b(0x209)]===undefined)this[_0x43784b(0x212)]();return this[_0x43784b(0x209)];},Game_System[_0x5608de(0x1ff)]['setShowButtonCommonEventButtons']=function(_0x167a06){const _0x5aea62=_0x5608de;if(this['_buttonCommonEventShowButtons']===undefined)this[_0x5aea62(0x212)]();this['_buttonCommonEventShowButtons']=_0x167a06;},Game_System[_0x5608de(0x1ff)][_0x5608de(0x23e)]=function(_0x58a1d1){const _0x3ea5b6=_0x5608de;for(const _0x139149 of VisuMZ[_0x3ea5b6(0x1b5)][_0x3ea5b6(0x236)]){this[_0x3ea5b6(0x1b7)](_0x139149)===_0x58a1d1&&(this[_0x3ea5b6(0x148)](_0x139149),this[_0x3ea5b6(0x118)](_0x139149));}},VisuMZ['ButtonCommonEvents'][_0x5608de(0x1df)]=Scene_Map[_0x5608de(0x1ff)][_0x5608de(0x1e9)],Scene_Map[_0x5608de(0x1ff)][_0x5608de(0x1e9)]=function(){const _0x148b01=_0x5608de;VisuMZ[_0x148b01(0x1b5)]['Scene_Map_createSpriteset']['call'](this),this['createButtonCommonEventsSpriteContainer']();},Scene_Map[_0x5608de(0x1ff)][_0x5608de(0x247)]=function(){const _0xf08824=_0x5608de;if(this[_0xf08824(0x23c)]!==Scene_Map)return;this[_0xf08824(0x210)]=new Sprite_ButtonCommonEventsContainer(),this[_0xf08824(0x1c5)](this[_0xf08824(0x210)]);},Scene_Map[_0x5608de(0x1ff)][_0x5608de(0x143)]=function(_0x5b20c6){const _0x4d3473=_0x5608de;if(!this[_0x4d3473(0x239)]())return;if($gameMap&&$gameMap[_0x4d3473(0x1c3)]())return;const _0x3f8fac=$gameSystem[_0x4d3473(0x1b7)](_0x5b20c6)||0x0;_0x3f8fac>0x0&&$dataCommonEvents[_0x3f8fac]&&($gameTemp['reserveCommonEvent'](_0x3f8fac),this[_0x4d3473(0x210)][_0x4d3473(0x161)](_0x5b20c6));},Scene_Map['prototype'][_0x5608de(0x239)]=function(){const _0x502567=_0x5608de;if(!this[_0x502567(0x163)]())return![];if($gameMessage[_0x502567(0x1d9)]())return![];if(SceneManager[_0x502567(0x110)]())return![];if($gamePlayer[_0x502567(0x131)]())return![];return!![];},VisuMZ[_0x5608de(0x1b5)]['Scene_Map_isAnyButtonPressed']=Scene_Map[_0x5608de(0x1ff)][_0x5608de(0x167)],Scene_Map[_0x5608de(0x1ff)][_0x5608de(0x167)]=function(){const _0x12a35e=_0x5608de;return VisuMZ[_0x12a35e(0x1b5)][_0x12a35e(0x255)]['call'](this)||this[_0x12a35e(0x210)]?.[_0x12a35e(0x167)]();},Game_Player[_0x5608de(0x1ff)][_0x5608de(0x131)]=function(){const _0x37a61=_0x5608de;let _0x5b5692=this['x'],_0x264a45=this['y'];for(const _0x1a1e83 of $gameMap[_0x37a61(0x256)](_0x5b5692,_0x264a45)){if(!_0x1a1e83)continue;if(_0x1a1e83[_0x37a61(0x258)]([0x1,0x2]))return!![];}return![];};function Sprite_ButtonCommonEventsContainer(){this['initialize'](...arguments);}Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)]=Object[_0x5608de(0x1cd)](Sprite[_0x5608de(0x1ff)]),Sprite_ButtonCommonEventsContainer['prototype'][_0x5608de(0x23c)]=Sprite_ButtonCommonEventsContainer,Sprite_ButtonCommonEventsContainer['prototype'][_0x5608de(0x13f)]=function(){const _0x36cbb1=_0x5608de;Sprite[_0x36cbb1(0x1ff)][_0x36cbb1(0x13f)]['call'](this),this[_0x36cbb1(0x147)](),this[_0x36cbb1(0x22f)]();},Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)][_0x5608de(0x147)]=function(){const _0xce516b=_0x5608de;this[_0xce516b(0x1dc)]=Graphics['width'],this[_0xce516b(0x1e6)]=Graphics['height'];},Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)][_0x5608de(0x1aa)]=function(){const _0x4f5b38=_0x5608de;return VisuMZ[_0x4f5b38(0x1b5)]['Settings']['General'][_0x4f5b38(0x206)];},Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)][_0x5608de(0x153)]=function(){const _0x4f70a1=_0x5608de;return VisuMZ[_0x4f70a1(0x1b5)][_0x4f70a1(0x12a)][_0x4f70a1(0x16e)][_0x4f70a1(0x1cf)];},Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)][_0x5608de(0x185)]=function(){const _0x24b2ed=_0x5608de;try{return VisuMZ[_0x24b2ed(0x1b5)][_0x24b2ed(0x12a)][_0x24b2ed(0x16e)][_0x24b2ed(0x1b3)][_0x24b2ed(0x1c0)](this);}catch(_0x66beed){if($gameTemp['isPlaytest']())console[_0x24b2ed(0x203)](_0x66beed);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer['prototype'][_0x5608de(0x132)]=function(){const _0x5ce424=_0x5608de;try{return VisuMZ['ButtonCommonEvents']['Settings'][_0x5ce424(0x16e)][_0x5ce424(0x11f)]['call'](this);}catch(_0x163560){if($gameTemp['isPlaytest']())console[_0x5ce424(0x203)](_0x163560);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)][_0x5608de(0x218)]=function(){const _0x1ee7f1=_0x5608de;try{return VisuMZ[_0x1ee7f1(0x1b5)][_0x1ee7f1(0x12a)][_0x1ee7f1(0x16e)][_0x1ee7f1(0x1a6)][_0x1ee7f1(0x1c0)](this);}catch(_0x446986){if($gameTemp[_0x1ee7f1(0x261)]())console[_0x1ee7f1(0x203)](_0x446986);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)]['abovePoint']=function(){const _0x4765bb=_0x5608de;try{return VisuMZ[_0x4765bb(0x1b5)][_0x4765bb(0x12a)]['General'][_0x4765bb(0x16a)][_0x4765bb(0x1c0)](this);}catch(_0x3a4beb){if($gameTemp[_0x4765bb(0x261)]())console[_0x4765bb(0x203)](_0x3a4beb);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)][_0x5608de(0x22f)]=function(){const _0x278db3=_0x5608de,_0x57eea8=VisuMZ[_0x278db3(0x1b5)][_0x278db3(0x12a)],_0x239ed8=_0x278db3(0x12c);for(const _0x821d of VisuMZ[_0x278db3(0x1b5)]['KeysArray']){const _0x5e930d=_0x239ed8[_0x278db3(0x193)](_0x821d);if(!_0x57eea8[_0x5e930d])continue;if(!_0x57eea8[_0x5e930d]['ShowButton'])continue;const _0x50fce5=new Sprite_ButtonCommonEvent(_0x821d);this['addChild'](_0x50fce5);const _0x5be84c=_0x50fce5[_0x278db3(0x157)]()['PositionJS'][_0x278db3(0x1c0)](this)||new Point(0x0,0x0);_0x50fce5['x']=_0x5be84c['x'],_0x50fce5['y']=_0x5be84c['y'];}},Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)][_0x5608de(0x167)]=function(){const _0x303866=_0x5608de;return this[_0x303866(0x181)][_0x303866(0x1d6)](_0x4fd661=>_0x4fd661[_0x303866(0x189)]());},Sprite_ButtonCommonEventsContainer[_0x5608de(0x1ff)][_0x5608de(0x161)]=function(_0x2a469b){const _0x23583e=_0x5608de,_0x57b084=this[_0x23583e(0x181)]['filter'](_0x243fcf=>_0x243fcf&&_0x243fcf[_0x23583e(0x201)]===_0x2a469b);for(const _0x2dd9d1 of _0x57b084){if(!_0x2dd9d1)continue;_0x2dd9d1[_0x23583e(0x24e)]();}};function Sprite_ButtonCommonEvent(){this['initialize'](...arguments);}Sprite_ButtonCommonEvent[_0x5608de(0x1ff)]=Object[_0x5608de(0x1cd)](Sprite_Clickable[_0x5608de(0x1ff)]),Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x23c)]=Sprite_ButtonCommonEvent,Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x13f)]=function(_0x3798da){const _0x2e78e4=_0x5608de;this[_0x2e78e4(0x201)]=_0x3798da,Sprite_Clickable[_0x2e78e4(0x1ff)][_0x2e78e4(0x13f)][_0x2e78e4(0x1c0)](this),this[_0x2e78e4(0x133)](),this[_0x2e78e4(0x11a)]=this[_0x2e78e4(0x160)]();},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x157)]=function(){const _0x4c7d2e=_0x5608de,_0x4c7f54='KeyCode%1'[_0x4c7d2e(0x193)](this[_0x4c7d2e(0x201)]);return VisuMZ[_0x4c7d2e(0x1b5)][_0x4c7d2e(0x12a)][_0x4c7f54]||{};},Sprite_ButtonCommonEvent['prototype'][_0x5608de(0x133)]=function(){const _0x1283b3=_0x5608de,_0x4d691b=VisuMZ[_0x1283b3(0x1b5)][_0x1283b3(0x12a)][_0x1283b3(0x16e)];this[_0x1283b3(0x158)]=new Bitmap(_0x4d691b['ButtonWidth'],_0x4d691b[_0x1283b3(0x1cf)]),this['_icon']=this[_0x1283b3(0x1a5)](),this[_0x1283b3(0x136)]();},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x177)]=function(){const _0x4c2148=_0x5608de;return ImageManager[_0x4c2148(0x18b)];},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x216)]=function(){const _0x57602a=_0x5608de;return $gameSystem['getButtonCommonEvent'](this[_0x57602a(0x201)]);},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x1bb)]=function(){const _0x7b1da6=_0x5608de;if(!this[_0x7b1da6(0x157)]())return'';return this[_0x7b1da6(0x157)]()[_0x7b1da6(0x1f0)];},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x1a5)]=function(){const _0x2449f8=_0x5608de;if(!this[_0x2449f8(0x216)]())return 0x0;const _0x6aff20=$gameSystem['getButtonCommonEventIcon'](this['_key']);if(_0x6aff20!==0x0)return _0x6aff20;const _0x3d7d5c=VisuMZ[_0x2449f8(0x1b5)][_0x2449f8(0x12a)][_0x2449f8(0x16e)],_0x174ebe=_0x3d7d5c[_0x2449f8(0x1c1)],_0x25032e=Math['max'](_0x174ebe[_0x2449f8(0x115)],0x1);let _0x1ab3f8=_0x174ebe[this['_key']%_0x25032e]||0x0;return _0x1ab3f8;},Sprite_ButtonCommonEvent['prototype'][_0x5608de(0x136)]=function(){const _0x379329=_0x5608de;this[_0x379329(0x158)]['clear']();const _0x4af256=VisuMZ[_0x379329(0x1b5)]['Settings'][_0x379329(0x16e)];_0x4af256[_0x379329(0x12f)][_0x379329(0x1c0)](this);},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)]['isClickEnabled']=function(){const _0x28de44=_0x5608de;if(this[_0x28de44(0x11a)]<0xff)return![];return this[_0x28de44(0x216)]()>0x0;},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x184)]=function(){const _0x3c17ac=_0x5608de;Sprite_Clickable['prototype'][_0x3c17ac(0x184)][_0x3c17ac(0x1c0)](this),this[_0x3c17ac(0x17d)]();},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x21e)]=function(){const _0x5087d2=_0x5608de;Sprite_Clickable[_0x5087d2(0x1ff)][_0x5087d2(0x21e)][_0x5087d2(0x1c0)](this),this[_0x5087d2(0x1d5)]();},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)]['onClick']=function(){const _0x17e39d=_0x5608de;Sprite_Clickable[_0x17e39d(0x1ff)][_0x17e39d(0x1f2)][_0x17e39d(0x1c0)](this),this[_0x17e39d(0x1e0)](),this[_0x17e39d(0x21e)]();},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)]['onColorTone']=function(){const _0x16f441=_0x5608de,_0x55dd8a=VisuMZ[_0x16f441(0x1b5)][_0x16f441(0x12a)][_0x16f441(0x16e)];_0x55dd8a['ChangeTone']&&this[_0x16f441(0x1e5)](_0x55dd8a[_0x16f441(0x20b)]);},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x1d5)]=function(){const _0x524d1e=_0x5608de;this[_0x524d1e(0x1e5)]([0x0,0x0,0x0,0x0]);},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x24e)]=function(){const _0x541049=_0x5608de;this[_0x541049(0x17d)](),setTimeout(this[_0x541049(0x1d5)][_0x541049(0x1be)](this),0x64);},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x1e0)]=function(){const _0x5c7cba=_0x5608de;if(!SceneManager['_scene']['isButtonCommonEventOk']())return;if($gameMap&&$gameMap[_0x5c7cba(0x1c3)]())return;const _0x3ed3fc=this[_0x5c7cba(0x216)]();$gameTemp[_0x5c7cba(0x1d4)](_0x3ed3fc),this[_0x5c7cba(0x21e)](),this['flashColorTone']();},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x189)]=function(){const _0xb2eeb8=_0x5608de;if(!this[_0xb2eeb8(0x1e1)]())return![];if(this[_0xb2eeb8(0x1e0)]()<=0x0)return![];return!![];},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x25a)]=function(){const _0xbd4d4a=_0x5608de;Sprite_Clickable[_0xbd4d4a(0x1ff)][_0xbd4d4a(0x25a)][_0xbd4d4a(0x1c0)](this),this[_0xbd4d4a(0x1d3)](),this[_0xbd4d4a(0x213)]();},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x1d3)]=function(){const _0x579f43=_0x5608de,_0x3d25aa=this['targetOpacity']();if(this[_0x579f43(0x11a)]>_0x3d25aa)this[_0x579f43(0x11a)]-=0x10;else this[_0x579f43(0x11a)]<_0x3d25aa&&(this[_0x579f43(0x11a)]+=0x10);},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x160)]=function(){const _0x84c33b=_0x5608de;if($gameMessage&&$gameMessage['isBusy']())return 0x0;if(!$gameSystem[_0x84c33b(0x120)]())return 0x0;if(this[_0x84c33b(0x157)]()['ShowOnlyIfCePresent']){const _0x32d3bc=this['commonEventID']();if(!$dataCommonEvents[_0x32d3bc])return 0x0;}return 0xff;},Sprite_ButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x213)]=function(){const _0xf51fa9=_0x5608de;if(this[_0xf51fa9(0x1b0)]===this['buttonIcon']())return;this[_0xf51fa9(0x1b0)]=this[_0xf51fa9(0x1a5)](),this[_0xf51fa9(0x136)]();},VisuMZ['ButtonCommonEvents'][_0x5608de(0x24d)]=function(){const _0x4fbf2c=_0x5608de,_0x33db93=this['width'],_0x41778b=this[_0x4fbf2c(0x1e6)],_0x95ed43=ColorManager[_0x4fbf2c(0x114)](),_0x55f72c=ColorManager['itemBackColor2']();this[_0x4fbf2c(0x158)][_0x4fbf2c(0x260)](0x1,0x1,_0x33db93-0x2,_0x41778b-0x2,_0x95ed43,_0x55f72c,!![]),this['bitmap']['strokeRect'](0x1,0x1,_0x33db93-0x2,_0x41778b-0x2,_0x95ed43);if(this['pictureBitmap']()){const _0x27fda1=this[_0x4fbf2c(0x177)](),_0x3cdaf5=_0x27fda1[_0x4fbf2c(0x1dc)],_0x2945c6=_0x27fda1[_0x4fbf2c(0x1e6)];this[_0x4fbf2c(0x158)][_0x4fbf2c(0x1c4)](_0x27fda1,0x0,0x0,_0x3cdaf5,_0x2945c6,0x0,0x0,_0x33db93,_0x41778b);}const _0x357870=this['buttonIcon'](),_0xba2310=ImageManager['loadSystem']('IconSet'),_0x1c438e=ImageManager['iconWidth'],_0x528ce6=ImageManager[_0x4fbf2c(0x221)],_0x2b0e2b=_0x357870%0x10*_0x1c438e,_0x878125=Math['floor'](_0x357870/0x10)*_0x528ce6,_0x421699=Math[_0x4fbf2c(0x1a1)](this[_0x4fbf2c(0x1dc)]/_0x1c438e)*_0x1c438e,_0x1bc066=Math[_0x4fbf2c(0x1a1)](this['height']/_0x528ce6)*_0x528ce6,_0x5eff8a=Math[_0x4fbf2c(0x1a1)]((this[_0x4fbf2c(0x1dc)]-_0x421699)/0x2),_0x3bec72=Math['floor']((this[_0x4fbf2c(0x1e6)]-_0x1bc066)/0x2);this[_0x4fbf2c(0x158)][_0x4fbf2c(0x1a0)][_0x4fbf2c(0x1c2)]=![],this[_0x4fbf2c(0x158)][_0x4fbf2c(0x1c4)](_0xba2310,_0x2b0e2b,_0x878125,_0x1c438e,_0x528ce6,_0x5eff8a,_0x3bec72,_0x421699,_0x1bc066),this[_0x4fbf2c(0x158)][_0x4fbf2c(0x1a0)][_0x4fbf2c(0x1c2)]=!![];const _0x817a39=this[_0x4fbf2c(0x1bb)]();this[_0x4fbf2c(0x158)][_0x4fbf2c(0x13e)]=$gameSystem['numberFontFace'](),this[_0x4fbf2c(0x158)][_0x4fbf2c(0x12b)]=$gameSystem[_0x4fbf2c(0x24a)](),this[_0x4fbf2c(0x158)][_0x4fbf2c(0x205)](_0x817a39,0x0,0x0,_0x33db93,this[_0x4fbf2c(0x158)][_0x4fbf2c(0x12b)]+0x4,'center');},VisuMZ[_0x5608de(0x1b5)][_0x5608de(0x1dd)]=function(_0x50138f){const _0x18e0e0=_0x5608de;if(!_0x50138f)return![];if(![_0x18e0e0(0x1d7),_0x18e0e0(0x1da)]['includes'](SceneManager[_0x18e0e0(0x14b)][_0x18e0e0(0x23c)][_0x18e0e0(0x1a8)]))return![];const _0x4adfca=VisuMZ[_0x18e0e0(0x1b5)][_0x18e0e0(0x1a2)],_0x2835ab=_0x50138f[_0x18e0e0(0x18f)];return _0x2835ab[_0x18e0e0(0x1f5)](_0x4adfca[_0x18e0e0(0x145)])&&_0x2835ab[_0x18e0e0(0x1f5)](_0x4adfca[_0x18e0e0(0x21d)]);},TextManager[_0x5608de(0x20a)]=VisuMZ[_0x5608de(0x1b5)][_0x5608de(0x12a)]['Assign'][_0x5608de(0x1ba)],Scene_ItemBase[_0x5608de(0x1ff)][_0x5608de(0x1a3)]=function(){const _0x430612=_0x5608de,_0x4c7121=VisuMZ[_0x430612(0x1b5)][_0x430612(0x1a2)],_0x2c10a8=this[_0x430612(0x24f)]()[_0x430612(0x18f)];_0x2c10a8[_0x430612(0x1f5)](_0x4c7121['AssignButtonSlots']);const _0x4f7c53=String(RegExp['$1'])[_0x430612(0x116)](',')[_0x430612(0x168)](_0x4cf55a=>String(_0x4cf55a)[_0x430612(0x1e3)]()[_0x430612(0x1fc)]())[_0x430612(0x155)](_0x3d2df9=>TextManager[_0x430612(0x1f7)][_0x430612(0x21f)](_0x3d2df9))['filter'](_0x103689=>VisuMZ[_0x430612(0x1b5)][_0x430612(0x236)][_0x430612(0x21f)](TextManager[_0x430612(0x1f7)][_0x430612(0x21c)](_0x103689)))[_0x430612(0x155)](_0x55d646=>!Input[_0x430612(0x123)](TextManager['stringKeyMap'][_0x430612(0x21c)](_0x55d646)));_0x2c10a8[_0x430612(0x1f5)](_0x4c7121[_0x430612(0x145)]);const _0x37ba9c=eval(RegExp['$1']),_0x57338f=this['assignButtonCommonEventsWindowRect'](_0x4f7c53),_0x1ee349=new Window_AssignButtonCommonEvent(_0x57338f);_0x1ee349[_0x430612(0x241)](_0x37ba9c,_0x4f7c53),this[_0x430612(0x1c5)](_0x1ee349),this[_0x430612(0x1ec)]=_0x1ee349,_0x1ee349[_0x430612(0x190)](_0x430612(0x135),this[_0x430612(0x138)][_0x430612(0x1be)](this)),_0x1ee349[_0x430612(0x190)]('cancel',this[_0x430612(0x169)]['bind'](this));},Scene_ItemBase[_0x5608de(0x1ff)][_0x5608de(0x13a)]=function(_0x4f0451){const _0x20fb31=_0x5608de,_0x576bf9=VisuMZ[_0x20fb31(0x1b5)][_0x20fb31(0x12a)]['Assign'];if(_0x576bf9&&_0x576bf9['AssignWindow_RectJS'])return _0x576bf9['AssignWindow_RectJS'][_0x20fb31(0x1c0)](this,_0x4f0451);const _0x5aa657=Window_Base[_0x20fb31(0x1ff)][_0x20fb31(0x1f9)]()*0x2+0x8;let _0x157c73=$gameSystem[_0x20fb31(0x1ed)]()*0x2+_0x4f0451[_0x20fb31(0x115)]*_0x5aa657;_0x157c73=_0x157c73[_0x20fb31(0x23b)](Graphics[_0x20fb31(0x1cb)]/0x3,Graphics[_0x20fb31(0x1cb)]);let _0x279f0b=this[_0x20fb31(0x1e7)](0x3,!![]),_0x4f1bdd=Math['round']((Graphics[_0x20fb31(0x1cb)]-_0x157c73)/0x2),_0xe1a5de=Math[_0x20fb31(0x19f)]((Graphics['boxHeight']-_0x279f0b)/0x2);return new Rectangle(_0x4f1bdd,_0xe1a5de,_0x157c73,_0x279f0b);},Scene_ItemBase[_0x5608de(0x1ff)][_0x5608de(0x138)]=function(){const _0x51f496=_0x5608de,_0x8c7147=this[_0x51f496(0x1ec)][_0x51f496(0x24b)](),_0x46ab35=this['_assignButtonCommonEventsWindow'][_0x51f496(0x156)],_0x37c016=this[_0x51f496(0x24f)]()[_0x51f496(0x17c)];$gameSystem[_0x51f496(0x23e)](_0x46ab35),$gameSystem[_0x51f496(0x122)](_0x8c7147,_0x46ab35),$gameSystem['setButtonCommonEventIcon'](_0x8c7147,_0x37c016),this[_0x51f496(0x1ec)][_0x51f496(0x136)](),setTimeout(this[_0x51f496(0x169)]['bind'](this),0x1f4);},Scene_ItemBase[_0x5608de(0x1ff)][_0x5608de(0x169)]=function(){const _0x3fa140=_0x5608de;this[_0x3fa140(0x162)][_0x3fa140(0x20d)](this['_assignButtonCommonEventsWindow']),this[_0x3fa140(0x1ec)][_0x3fa140(0x22e)](),this[_0x3fa140(0x1ec)]=undefined,this[_0x3fa140(0x117)][_0x3fa140(0x14c)](),this['_itemWindow']['callUpdateHelp']();},VisuMZ['ButtonCommonEvents'][_0x5608de(0x23a)]=Scene_Item['prototype']['onItemOk'],Scene_Item[_0x5608de(0x1ff)][_0x5608de(0x121)]=function(){const _0x36fb83=_0x5608de;VisuMZ[_0x36fb83(0x1b5)][_0x36fb83(0x1dd)](this[_0x36fb83(0x24f)]())?this[_0x36fb83(0x1a3)]():VisuMZ[_0x36fb83(0x1b5)]['Scene_Item_onItemOk']['call'](this);},VisuMZ['ButtonCommonEvents']['Scene_Skill_onItemOk']=Scene_Skill['prototype'][_0x5608de(0x121)],Scene_Skill[_0x5608de(0x1ff)][_0x5608de(0x121)]=function(){const _0x2ebd9b=_0x5608de;VisuMZ['ButtonCommonEvents']['CanAssignButtonCommonEvent'](this['item']())?this[_0x2ebd9b(0x1a3)]():VisuMZ['ButtonCommonEvents'][_0x2ebd9b(0x23d)][_0x2ebd9b(0x1c0)](this);},VisuMZ[_0x5608de(0x1b5)][_0x5608de(0x1ca)]=Window_ItemList[_0x5608de(0x1ff)][_0x5608de(0x188)],Window_ItemList['prototype'][_0x5608de(0x188)]=function(_0x7f0df3){const _0x73e183=_0x5608de;return VisuMZ[_0x73e183(0x1b5)][_0x73e183(0x1dd)](_0x7f0df3)?!![]:VisuMZ[_0x73e183(0x1b5)][_0x73e183(0x1ca)]['call'](this,_0x7f0df3);},VisuMZ[_0x5608de(0x1b5)][_0x5608de(0x245)]=Window_SkillList['prototype'][_0x5608de(0x188)],Window_SkillList[_0x5608de(0x1ff)][_0x5608de(0x188)]=function(_0x3f0c90){const _0x35fe9d=_0x5608de;return VisuMZ['ButtonCommonEvents'][_0x35fe9d(0x1dd)](_0x3f0c90)?!![]:VisuMZ[_0x35fe9d(0x1b5)][_0x35fe9d(0x245)][_0x35fe9d(0x1c0)](this,_0x3f0c90);};function Window_AssignButtonCommonEvent(){const _0x36cd8b=_0x5608de;this[_0x36cd8b(0x13f)](...arguments);}Window_AssignButtonCommonEvent[_0x5608de(0x1ff)]=Object[_0x5608de(0x1cd)](Window_HorzCommand[_0x5608de(0x1ff)]),Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x23c)]=Window_AssignButtonCommonEvent,Window_AssignButtonCommonEvent[_0x5608de(0x22d)]=VisuMZ[_0x5608de(0x1b5)][_0x5608de(0x12a)]['Assign'][_0x5608de(0x1e4)],Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x13f)]=function(_0x190784){const _0xb383bd=_0x5608de;this[_0xb383bd(0x156)]=0x0,this[_0xb383bd(0x194)]=[],Window_HorzCommand[_0xb383bd(0x1ff)][_0xb383bd(0x13f)][_0xb383bd(0x1c0)](this,_0x190784);},Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x11d)]=function(){return this['_slots']['length']||0x1;},Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x171)]=function(){return 0x0;},Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x251)]=function(){const _0x1810c1=_0x5608de;return Window_Scrollable[_0x1810c1(0x1ff)][_0x1810c1(0x251)][_0x1810c1(0x1c0)](this)*0x2+0x8;},Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x241)]=function(_0x125a6b,_0x51baf2){const _0xe0783d=_0x5608de;this[_0xe0783d(0x156)]=_0x125a6b,this[_0xe0783d(0x194)]=_0x51baf2,this[_0xe0783d(0x136)]();let _0x1b92db=0x0;for(const _0x4cc4cb of this[_0xe0783d(0x194)]){const _0x124da=TextManager[_0xe0783d(0x1f7)][_0xe0783d(0x21c)](_0x4cc4cb);$gameSystem[_0xe0783d(0x1b7)](_0x124da)===this['_commonEventID']&&(_0x1b92db=this['_slots'][_0xe0783d(0x21c)](_0x4cc4cb));}this[_0xe0783d(0x1e8)](_0x1b92db),this['refreshCursor']();},Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x1f1)]=function(){const _0x140f35=_0x5608de;if(!this[_0x140f35(0x194)])return;for(const _0x1f795e of this[_0x140f35(0x194)]){const _0x2a5ae9=TextManager[_0x140f35(0x1f7)][_0x140f35(0x21c)](_0x1f795e),_0x59ede9=VisuMZ[_0x140f35(0x1b5)][_0x140f35(0x12a)]['KeyCode%1'[_0x140f35(0x193)](_0x2a5ae9)],_0x3d2836=_0x59ede9[_0x140f35(0x1f0)];this[_0x140f35(0x1b2)](_0x3d2836,_0x140f35(0x135),!![],_0x2a5ae9);}},Window_AssignButtonCommonEvent['prototype'][_0x5608de(0x25b)]=function(_0x41e5f8){const _0x410cbd=_0x5608de,_0x194bf6=Window_HorzCommand['prototype']['itemRect'][_0x410cbd(0x1c0)](this,_0x41e5f8);return _0x194bf6['y']+=this[_0x410cbd(0x1f9)]()+0x8-this[_0x410cbd(0x1bd)]()/0x2-this[_0x410cbd(0x24c)](),_0x194bf6;},Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x136)]=function(){const _0x4e813d=_0x5608de;Window_HorzCommand[_0x4e813d(0x1ff)][_0x4e813d(0x136)]['call'](this);if(!this[_0x4e813d(0x194)])return;this[_0x4e813d(0x202)]();},Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x202)]=function(){const _0x31291a=_0x5608de;this[_0x31291a(0x124)](),this[_0x31291a(0x1f8)](!![]);const _0x325437=TextManager[_0x31291a(0x20a)];this['drawText'](_0x325437,0x0,0x0,this[_0x31291a(0x1b4)],'center');},Window_AssignButtonCommonEvent[_0x5608de(0x1ff)][_0x5608de(0x1bc)]=function(_0x1ab377){const _0x105fde=_0x5608de,_0x56da10=this[_0x105fde(0x13c)](_0x1ab377),_0x43048d=this['_list'][_0x1ab377][_0x105fde(0x1d2)],_0x59fd9c=$gameSystem[_0x105fde(0x1ab)](_0x43048d),_0x2f8aad=_0x56da10['x']+Math[_0x105fde(0x19f)]((_0x56da10[_0x105fde(0x1dc)]-ImageManager[_0x105fde(0x1b1)])/0x2),_0x8fdd32=_0x56da10['y']+Math[_0x105fde(0x19f)]((_0x56da10[_0x105fde(0x1e6)]-ImageManager[_0x105fde(0x221)]/0x2)/0x2);this[_0x105fde(0x215)](_0x59fd9c,_0x2f8aad,_0x8fdd32),this[_0x105fde(0x124)](),this[_0x105fde(0x19d)][_0x105fde(0x13e)]=$gameSystem[_0x105fde(0x200)](),this['contents']['fontSize']=$gameSystem[_0x105fde(0x24a)](),this[_0x105fde(0x1f8)](this[_0x105fde(0x233)](_0x1ab377));const _0x1a517f=Window_AssignButtonCommonEvent['BUTTON_LABEL_ALIGN'];this[_0x105fde(0x205)](this['commandName'](_0x1ab377),_0x56da10['x'],_0x56da10['y'],_0x56da10[_0x105fde(0x1dc)],_0x1a517f);},Window_AssignButtonCommonEvent['prototype'][_0x5608de(0x197)]=function(){SoundManager['playEquip']();};