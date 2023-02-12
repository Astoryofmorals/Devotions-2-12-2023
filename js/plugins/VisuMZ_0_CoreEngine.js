//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.73;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.73] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x52da50=_0x3a86;(function(_0x5aef49,_0x423198){const _0x24edc2=_0x3a86,_0x3dab59=_0x5aef49();while(!![]){try{const _0x553870=-parseInt(_0x24edc2(0x32c))/0x1*(-parseInt(_0x24edc2(0x831))/0x2)+parseInt(_0x24edc2(0x55c))/0x3+-parseInt(_0x24edc2(0x861))/0x4*(parseInt(_0x24edc2(0x4a4))/0x5)+-parseInt(_0x24edc2(0x97d))/0x6*(-parseInt(_0x24edc2(0x1bc))/0x7)+-parseInt(_0x24edc2(0x9af))/0x8*(parseInt(_0x24edc2(0xa11))/0x9)+parseInt(_0x24edc2(0x242))/0xa*(parseInt(_0x24edc2(0x2bd))/0xb)+-parseInt(_0x24edc2(0x97f))/0xc*(-parseInt(_0x24edc2(0x883))/0xd);if(_0x553870===_0x423198)break;else _0x3dab59['push'](_0x3dab59['shift']());}catch(_0x46ff7d){_0x3dab59['push'](_0x3dab59['shift']());}}}(_0x377c,0x3ab8b));var label=_0x52da50(0x9bb),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x52da50(0x2f9)](function(_0x52fa00){const _0x5976af=_0x52da50;return _0x52fa00[_0x5976af(0x5a4)]&&_0x52fa00[_0x5976af(0x2f7)][_0x5976af(0x3fc)]('['+label+']');})[0x0];VisuMZ[label][_0x52da50(0x630)]=VisuMZ[label][_0x52da50(0x630)]||{},VisuMZ[_0x52da50(0x30e)]=function(_0x2e8173,_0x4bed8f){const _0x28b264=_0x52da50;for(const _0x5525c4 in _0x4bed8f){if(_0x5525c4[_0x28b264(0x2bb)](/(.*):(.*)/i)){const _0x553071=String(RegExp['$1']),_0x1d2b68=String(RegExp['$2'])['toUpperCase']()[_0x28b264(0x748)]();let _0x44418f,_0x166709,_0xd118d0;switch(_0x1d2b68){case _0x28b264(0x3f1):_0x44418f=_0x4bed8f[_0x5525c4]!==''?Number(_0x4bed8f[_0x5525c4]):0x0;break;case _0x28b264(0x8b8):_0x166709=_0x4bed8f[_0x5525c4]!==''?JSON[_0x28b264(0x812)](_0x4bed8f[_0x5525c4]):[],_0x44418f=_0x166709[_0x28b264(0x1d7)](_0x2da57a=>Number(_0x2da57a));break;case _0x28b264(0x52f):_0x44418f=_0x4bed8f[_0x5525c4]!==''?eval(_0x4bed8f[_0x5525c4]):null;break;case _0x28b264(0x1b5):_0x166709=_0x4bed8f[_0x5525c4]!==''?JSON[_0x28b264(0x812)](_0x4bed8f[_0x5525c4]):[],_0x44418f=_0x166709[_0x28b264(0x1d7)](_0x13ea3d=>eval(_0x13ea3d));break;case _0x28b264(0x7d8):_0x44418f=_0x4bed8f[_0x5525c4]!==''?JSON[_0x28b264(0x812)](_0x4bed8f[_0x5525c4]):'';break;case _0x28b264(0x8e9):_0x166709=_0x4bed8f[_0x5525c4]!==''?JSON[_0x28b264(0x812)](_0x4bed8f[_0x5525c4]):[],_0x44418f=_0x166709[_0x28b264(0x1d7)](_0x443c3b=>JSON['parse'](_0x443c3b));break;case'FUNC':_0x44418f=_0x4bed8f[_0x5525c4]!==''?new Function(JSON[_0x28b264(0x812)](_0x4bed8f[_0x5525c4])):new Function(_0x28b264(0x368));break;case _0x28b264(0x94a):_0x166709=_0x4bed8f[_0x5525c4]!==''?JSON[_0x28b264(0x812)](_0x4bed8f[_0x5525c4]):[],_0x44418f=_0x166709['map'](_0x454162=>new Function(JSON['parse'](_0x454162)));break;case _0x28b264(0x9df):_0x44418f=_0x4bed8f[_0x5525c4]!==''?String(_0x4bed8f[_0x5525c4]):'';break;case'ARRAYSTR':_0x166709=_0x4bed8f[_0x5525c4]!==''?JSON['parse'](_0x4bed8f[_0x5525c4]):[],_0x44418f=_0x166709['map'](_0x474952=>String(_0x474952));break;case _0x28b264(0x7e8):_0xd118d0=_0x4bed8f[_0x5525c4]!==''?JSON[_0x28b264(0x812)](_0x4bed8f[_0x5525c4]):{},_0x2e8173[_0x553071]={},VisuMZ[_0x28b264(0x30e)](_0x2e8173[_0x553071],_0xd118d0);continue;case _0x28b264(0x3b6):_0x166709=_0x4bed8f[_0x5525c4]!==''?JSON[_0x28b264(0x812)](_0x4bed8f[_0x5525c4]):[],_0x44418f=_0x166709[_0x28b264(0x1d7)](_0x296327=>VisuMZ['ConvertParams']({},JSON['parse'](_0x296327)));break;default:continue;}_0x2e8173[_0x553071]=_0x44418f;}}return _0x2e8173;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x3c4)]=SceneManager['exit'],SceneManager[_0x52da50(0x448)]=function(){const _0x12b48b=_0x52da50;VisuMZ[_0x12b48b(0x9bb)][_0x12b48b(0x3c4)]['call'](this);if(Utils[_0x12b48b(0x892)]>=_0x12b48b(0x9e0)){if('AHZxx'!==_0x12b48b(0x739))return _0x47773b=_0x3d1fa4[_0x12b48b(0x5d1)](/(\d)/gi,(_0x5a08e7,_0x34582f)=>'PRESERVCONVERSION(%1)'[_0x12b48b(0x8de)](_0x9d43da(_0x34582f))),_0x12b48b(0x22a)['format'](_0x5936b6,_0x5bcc29,_0x28a1b0);else{if(typeof nw===_0x12b48b(0x3af))nw[_0x12b48b(0xa10)][_0x12b48b(0x95e)]();}}},(_0x5c81aa=>{const _0x48e5d2=_0x52da50,_0x2b9a83=_0x5c81aa[_0x48e5d2(0x215)];for(const _0x1841ef of dependencies){if(!Imported[_0x1841ef]){alert(_0x48e5d2(0x7ad)[_0x48e5d2(0x8de)](_0x2b9a83,_0x1841ef)),SceneManager['exit']();break;}}const _0xf364cd=_0x5c81aa[_0x48e5d2(0x2f7)];if(_0xf364cd[_0x48e5d2(0x2bb)](/\[Version[ ](.*?)\]/i)){const _0x503887=Number(RegExp['$1']);_0x503887!==VisuMZ[label][_0x48e5d2(0x328)]&&(alert(_0x48e5d2(0x914)[_0x48e5d2(0x8de)](_0x2b9a83,_0x503887)),SceneManager['exit']());}if(_0xf364cd[_0x48e5d2(0x2bb)](/\[Tier[ ](\d+)\]/i)){if(_0x48e5d2(0x797)===_0x48e5d2(0x18a))this['_forcedBattleSys']=0x0;else{const _0x46816e=Number(RegExp['$1']);_0x46816e<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x48e5d2(0x8de)](_0x2b9a83,_0x46816e,tier)),SceneManager['exit']()):tier=Math['max'](_0x46816e,tier);}}VisuMZ[_0x48e5d2(0x30e)](VisuMZ[label]['Settings'],_0x5c81aa['parameters']);})(pluginData),((()=>{const _0x65f8d=_0x52da50;if(VisuMZ[_0x65f8d(0x9bb)][_0x65f8d(0x630)][_0x65f8d(0x7cf)][_0x65f8d(0x1d5)]??!![]){if(_0x65f8d(0x66d)===_0x65f8d(0x913))this[_0x65f8d(0x425)]=![],this[_0x65f8d(0xa09)]=0x0,this['x']=_0x2cbc2d['width']*0xa,this['y']=_0x532d76[_0x65f8d(0x394)]*0xa;else for(const _0x2c8d95 in $plugins){const _0x221572=$plugins[_0x2c8d95];_0x221572[_0x65f8d(0x215)][_0x65f8d(0x2bb)](/(.*)\/(.*)/i)&&(_0x221572[_0x65f8d(0x215)]=String(RegExp['$2'][_0x65f8d(0x748)]()));}}})()),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],'AnimationPoint',_0x4341c9=>{const _0x351e4f=_0x52da50;if(!SceneManager[_0x351e4f(0x1aa)])return;if(!SceneManager[_0x351e4f(0x1aa)][_0x351e4f(0x4b3)])return;VisuMZ['ConvertParams'](_0x4341c9,_0x4341c9);const _0xb4c7e1=Math[_0x351e4f(0x442)](_0x4341c9[_0x351e4f(0x714)]),_0x10186d=Math[_0x351e4f(0x442)](_0x4341c9['pointY']);$gameTemp[_0x351e4f(0x59f)](_0xb4c7e1,_0x10186d,_0x4341c9[_0x351e4f(0x349)],_0x4341c9[_0x351e4f(0x330)],_0x4341c9[_0x351e4f(0x580)]);}),PluginManager['registerCommand'](pluginData[_0x52da50(0x215)],_0x52da50(0x86f),_0x1f152b=>{const _0xbd4aa1=_0x52da50;VisuMZ['ConvertParams'](_0x1f152b,_0x1f152b);const _0x120818=Math[_0xbd4aa1(0x442)](_0x1f152b[_0xbd4aa1(0x9de)])['clamp'](0x0,0x64),_0x35ba30=AudioManager['_currentBgm'];_0x35ba30&&(_0xbd4aa1(0x3f7)===_0xbd4aa1(0x3f7)?(_0x35ba30[_0xbd4aa1(0x9de)]=_0x120818,AudioManager[_0xbd4aa1(0x5e0)](_0x35ba30)):this[_0xbd4aa1(0x42d)][_0x4c7fe7]=this[_0xbd4aa1(0x534)](_0x46aad1(_0x28edd6)));}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],_0x52da50(0x509),_0x4e9661=>{const _0x381a7a=_0x52da50;VisuMZ[_0x381a7a(0x30e)](_0x4e9661,_0x4e9661);const _0x5937e3=Math['round'](_0x4e9661[_0x381a7a(0x20a)])['clamp'](0x32,0x96),_0x480561=AudioManager[_0x381a7a(0x42a)];if(_0x480561){if(_0x381a7a(0x567)!=='wGfew')_0x480561[_0x381a7a(0x20a)]=_0x5937e3,AudioManager['playBgm'](_0x480561);else return _0x381a7a(0x98f);}}),PluginManager[_0x52da50(0x19e)](pluginData['name'],'AudioChangeBgmPan',_0x1aa796=>{const _0x5c5c17=_0x52da50;VisuMZ['ConvertParams'](_0x1aa796,_0x1aa796);const _0x1b6877=Math['round'](_0x1aa796[_0x5c5c17(0x891)])['clamp'](-0x64,0x64),_0x743b39=AudioManager[_0x5c5c17(0x42a)];if(_0x743b39){if(_0x5c5c17(0x456)!==_0x5c5c17(0x456)){if(_0x160564[_0x5c5c17(0xa27)]())return;_0x1d5ed3['ConvertParams'](_0x158eb0,_0x275c2d);const _0x4cee87=[_0x5c5c17(0x426),'bgs','me','se'];for(const _0x3ea0ce of _0x4cee87){const _0x58d0c9=_0x8d9bb1[_0x3ea0ce],_0x93de72=_0x5c5c17(0x7c7)[_0x5c5c17(0x8de)](_0x3ea0ce);for(const _0x5e4a13 of _0x58d0c9){_0x55ee8e[_0x5c5c17(0x1ea)](_0x93de72,_0x5e4a13);}}}else _0x743b39[_0x5c5c17(0x891)]=_0x1b6877,AudioManager[_0x5c5c17(0x5e0)](_0x743b39);}}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],'AudioChangeBgsVolume',_0x4b0c6e=>{const _0x38ab72=_0x52da50;VisuMZ[_0x38ab72(0x30e)](_0x4b0c6e,_0x4b0c6e);const _0x44db8c=Math[_0x38ab72(0x442)](_0x4b0c6e[_0x38ab72(0x9de)])['clamp'](0x0,0x64),_0x345434=AudioManager['_currentBgs'];_0x345434&&(_0x38ab72(0x482)===_0x38ab72(0xa28)?this[_0x38ab72(0x4df)]()?this[_0x38ab72(0x3b4)]():_0x38cb95[_0x38ab72(0x9bb)][_0x38ab72(0x8c6)][_0x38ab72(0x4cc)](this):(_0x345434[_0x38ab72(0x9de)]=_0x44db8c,AudioManager['playBgs'](_0x345434)));}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],_0x52da50(0x32a),_0x3f79d0=>{const _0x3202e1=_0x52da50;VisuMZ['ConvertParams'](_0x3f79d0,_0x3f79d0);const _0x19dd03=Math[_0x3202e1(0x442)](_0x3f79d0[_0x3202e1(0x20a)])[_0x3202e1(0x522)](0x32,0x96),_0x244ab7=AudioManager[_0x3202e1(0x751)];_0x244ab7&&(_0x244ab7[_0x3202e1(0x20a)]=_0x19dd03,AudioManager[_0x3202e1(0x8d6)](_0x244ab7));}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],'AudioChangeBgsPan',_0x17cb60=>{const _0x11f32c=_0x52da50;VisuMZ['ConvertParams'](_0x17cb60,_0x17cb60);const _0x463efe=Math['round'](_0x17cb60[_0x11f32c(0x891)])['clamp'](-0x64,0x64),_0xd24e9f=AudioManager['_currentBgs'];_0xd24e9f&&('htsef'!==_0x11f32c(0x1eb)?(_0xd24e9f[_0x11f32c(0x891)]=_0x463efe,AudioManager[_0x11f32c(0x8d6)](_0xd24e9f)):this[_0x11f32c(0x5e6)]());}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x20b),_0x43faa0=>{const _0x238068=_0x52da50;if(!$gameTemp[_0x238068(0x6c9)]())return;const _0x9c1704=Input[_0x238068(0x8ff)]();navigator[_0x238068(0x6fa)]&&navigator[_0x238068(0x6fa)][_0x238068(0x58f)](_0x9c1704);}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],'ExportAllMapText',_0x543430=>{const _0x4aab3d=_0x52da50;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x4aab3d(0x60b)]())return;SceneManager[_0x4aab3d(0x1aa)][_0x4aab3d(0x949)]=![],VisuMZ['CoreEngine'][_0x4aab3d(0x3ac)]();}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],_0x52da50(0x7e5),_0x390cab=>{const _0x11b531=_0x52da50;if(!$gameTemp[_0x11b531(0x6c9)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x11b531(0x1aa)][_0x11b531(0x949)]=![],VisuMZ[_0x11b531(0x9bb)][_0x11b531(0x1c5)]();}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x5ae),_0x35cd0c=>{const _0x55443c=_0x52da50;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x55443c(0x60b)]())return;if(!$gameMap)return;if($gameMap[_0x55443c(0x9ea)]()<=0x0)return;VisuMZ[_0x55443c(0x30e)](_0x35cd0c,_0x35cd0c);const _0xaccc8a=_0x55443c(0x900)['format']($gameMap['mapId']()[_0x55443c(0x7a4)](0x3)),_0x5ac9ed=VisuMZ[_0x55443c(0x9bb)]['ExtractStrFromMap']($gameMap[_0x55443c(0x9ea)]());VisuMZ[_0x55443c(0x9bb)]['ExportString'](_0x5ac9ed,_0xaccc8a,!![]);}),PluginManager['registerCommand'](pluginData[_0x52da50(0x215)],_0x52da50(0x4f6),_0x2d650b=>{const _0x5eca95=_0x52da50;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x5eca95(0x60b)]())return;if(!$gameParty[_0x5eca95(0xa27)]())return;VisuMZ[_0x5eca95(0x30e)](_0x2d650b,_0x2d650b);const _0x58fa8f=_0x5eca95(0x262)[_0x5eca95(0x8de)]($gameTroop[_0x5eca95(0x412)][_0x5eca95(0x7a4)](0x4)),_0x1e05f4=VisuMZ['CoreEngine'][_0x5eca95(0x32d)]($gameTroop[_0x5eca95(0x412)]);VisuMZ[_0x5eca95(0x9bb)]['ExportString'](_0x1e05f4,_0x58fa8f,!![]);}),VisuMZ['CoreEngine']['ExportString']=function(_0x42ef77,_0x437366,_0x284414){const _0x21c59e=_0x52da50,_0x58b21b=require('fs');let _0x27329a='Exported_Script_%1.txt'['format'](_0x437366||'0');_0x58b21b[_0x21c59e(0x967)](_0x27329a,_0x42ef77,_0x3d5c4=>{const _0x5c8365=_0x21c59e;if('noROb'!=='LOJuX'){if(_0x3d5c4)throw err;else _0x284414&&alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'['format'](_0x27329a));}else _0x3895e2['CoreEngine']['WindowLayer_render'][_0x5c8365(0x4cc)](this,_0x149a3f);});},VisuMZ[_0x52da50(0x9bb)]['ExportStrFromAllMaps']=function(){const _0x4386aa=_0x52da50,_0x2072b6=[];for(const _0x54786a of $dataMapInfos){if(!_0x54786a)continue;_0x2072b6[_0x4386aa(0x281)](_0x54786a['id']);}const _0x38fc5b=_0x2072b6[_0x4386aa(0x69a)]*0x64+Math['randomInt'](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'['format'](_0x38fc5b)),this[_0x4386aa(0xa02)]=[],this[_0x4386aa(0x864)]=$dataMap;for(const _0x4c1ec2 of _0x2072b6){if(_0x4386aa(0x5b5)==='PwYOD')return typeof _0x55f65d===_0x4386aa(0x87b)?_0x4941ea['CoreEngine']['TextManager_param'][_0x4386aa(0x4cc)](this,_0x1a73bc):this[_0x4386aa(0x294)](_0x157838);else VisuMZ[_0x4386aa(0x9bb)][_0x4386aa(0x8b3)](_0x4c1ec2);}setTimeout(VisuMZ[_0x4386aa(0x9bb)][_0x4386aa(0x951)][_0x4386aa(0x4e6)](this),_0x38fc5b);},VisuMZ['CoreEngine'][_0x52da50(0x8b3)]=function(_0x5ccc8e){const _0x10d884=_0x52da50,_0x2427fb=_0x10d884(0x7d1)['format'](_0x5ccc8e[_0x10d884(0x7a4)](0x3)),_0x4f7100=new XMLHttpRequest(),_0x3533d5=_0x10d884(0x56b)+_0x2427fb;_0x4f7100[_0x10d884(0x935)](_0x10d884(0x35a),_0x3533d5),_0x4f7100[_0x10d884(0x9db)]('application/json'),_0x4f7100[_0x10d884(0x675)]=()=>this[_0x10d884(0x29f)](_0x4f7100,_0x5ccc8e,_0x2427fb,_0x3533d5),_0x4f7100[_0x10d884(0x90c)]=()=>DataManager[_0x10d884(0x5c4)]('$dataMap',_0x2427fb,_0x3533d5),_0x4f7100[_0x10d884(0x440)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x29f)]=function(_0x340dcb,_0x5215c9,_0x2c52d3,_0x429287){const _0xd65a1f=_0x52da50;$dataMap=JSON[_0xd65a1f(0x812)](_0x340dcb[_0xd65a1f(0x9b0)]),DataManager[_0xd65a1f(0x8bb)]($dataMap),this[_0xd65a1f(0xa02)][_0x5215c9]=VisuMZ[_0xd65a1f(0x9bb)][_0xd65a1f(0x3d2)](_0x5215c9),$dataMap=this[_0xd65a1f(0x864)];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x951)]=function(){const _0x263989=_0x52da50,_0x206e50=_0x263989(0x9a1);this['_storedMapText'][_0x263989(0x6da)](undefined)[_0x263989(0x6da)]('')['remove'](null);const _0x5d5155=this[_0x263989(0xa02)][_0x263989(0x30f)](_0x263989(0x840))['trim']();VisuMZ[_0x263989(0x9bb)][_0x263989(0x623)](_0x5d5155,_0x206e50,!![]),SceneManager[_0x263989(0x1aa)][_0x263989(0x949)]=!![];},VisuMZ['CoreEngine']['ExtractStrFromMap']=function(_0x3f10d9){const _0xf8aa02=_0x52da50;if(!$dataMap)return'';let _0x3b0b41='█'[_0xf8aa02(0x4a5)](0x46)+'\x0a\x0a',_0x257e7f='═'[_0xf8aa02(0x4a5)](0x46)+'\x0a\x0a',_0x25b105='';this[_0xf8aa02(0x67f)]=0x0;for(const _0xfe43b8 of $dataMap[_0xf8aa02(0x6fc)]){if(!_0xfe43b8)continue;let _0x3d719b=_0xfe43b8['id'],_0x556fdc=_0xfe43b8[_0xf8aa02(0x215)],_0x1a8ce2=_0xfe43b8['pages'];for(const _0x4137f5 of _0x1a8ce2){const _0x3d3aca=_0x1a8ce2['indexOf'](_0x4137f5)+0x1;let _0x4be6b5=_0x257e7f+_0xf8aa02(0x4d7),_0x11c541=VisuMZ[_0xf8aa02(0x9bb)][_0xf8aa02(0x99a)](_0x4137f5['list']);if(_0x11c541[_0xf8aa02(0x69a)]>0x0){if(_0x25b105[_0xf8aa02(0x69a)]>0x0){if(_0xf8aa02(0x7f6)!==_0xf8aa02(0x270))_0x25b105+=_0x257e7f+_0xf8aa02(0x840);else{const _0x27eeec=_0x44102c['width']-_0x2e036b[_0xf8aa02(0x19b)]-_0x34afaf[_0xf8aa02(0x9bb)][_0xf8aa02(0x630)]['UI'][_0xf8aa02(0x766)]*0x2,_0x306e7b=_0x4e843['prototype'][_0xf8aa02(0x6d2)][_0xf8aa02(0x4cc)](this)*0x4;if(_0x27eeec>=_0x306e7b)_0x25a634[_0xf8aa02(0x5ab)](!![]);}}else{const _0x11e005=$dataMapInfos[_0x3f10d9]['name'];_0x25b105+=_0x3b0b41+_0xf8aa02(0x588)[_0xf8aa02(0x8de)](_0x3f10d9,_0x11e005||_0xf8aa02(0x246))+_0x3b0b41;}_0x25b105+=_0x4be6b5[_0xf8aa02(0x8de)](_0x3d719b,_0x556fdc,_0x3d3aca,_0x11c541);}}}return _0x25b105[_0xf8aa02(0x69a)]>0x0&&(_0x25b105+=_0x257e7f),_0x25b105;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x1c5)]=function(){const _0x2ca201=_0x52da50,_0x3031aa=$dataTroops[_0x2ca201(0x69a)]*0xa+Math[_0x2ca201(0x607)](0xa);alert(_0x2ca201(0x275)['format'](_0x3031aa));const _0x21c133=[];for(const _0x3503ca of $dataTroops){if(!_0x3503ca)continue;const _0x42bb64=_0x3503ca['id'];_0x21c133[_0x42bb64]=VisuMZ[_0x2ca201(0x9bb)][_0x2ca201(0x32d)](_0x42bb64);}setTimeout(VisuMZ[_0x2ca201(0x9bb)][_0x2ca201(0x427)][_0x2ca201(0x4e6)](this,_0x21c133),_0x3031aa);},VisuMZ['CoreEngine'][_0x52da50(0x32d)]=function(_0x4f2be6){const _0x483c6c=_0x52da50;if(!$dataTroops[_0x4f2be6])return'';let _0x30341c='█'[_0x483c6c(0x4a5)](0x46)+'\x0a\x0a',_0x5aad9c='═'[_0x483c6c(0x4a5)](0x46)+'\x0a\x0a',_0x14919b='';this[_0x483c6c(0x67f)]=0x0;const _0x11b004=$dataTroops[_0x4f2be6];let _0x59c576=_0x11b004[_0x483c6c(0x72e)];for(const _0x3cb0f4 of _0x59c576){const _0x2b57ca=_0x59c576[_0x483c6c(0x450)](_0x3cb0f4)+0x1;let _0x433b70=_0x5aad9c+_0x483c6c(0x7be),_0x453d59=VisuMZ[_0x483c6c(0x9bb)]['ExtractStrFromList'](_0x3cb0f4[_0x483c6c(0x536)]);_0x453d59[_0x483c6c(0x69a)]>0x0&&(_0x14919b[_0x483c6c(0x69a)]>0x0?_0x483c6c(0x239)!==_0x483c6c(0x239)?(_0xbca0f6[_0x483c6c(0x9bb)][_0x483c6c(0x713)][_0x483c6c(0x4cc)](this),this[_0x483c6c(0x5fc)]()):_0x14919b+=_0x5aad9c+_0x483c6c(0x840):_0x14919b+=_0x30341c+_0x483c6c(0x721)[_0x483c6c(0x8de)](_0x4f2be6,_0x11b004[_0x483c6c(0x215)]||_0x483c6c(0x246))+_0x30341c,_0x14919b+=_0x433b70['format'](_0x2b57ca,_0x453d59));}if(_0x14919b[_0x483c6c(0x69a)]>0x0){if(_0x483c6c(0x579)===_0x483c6c(0x579))_0x14919b+=_0x5aad9c;else{const _0x5eb456=_0x5d41f6[_0x483c6c(0x455)](_0x3a5d2e);_0x4ca441[_0x483c6c(0x9eb)](_0x1705c4,!_0x5eb456);}}return _0x14919b;},VisuMZ[_0x52da50(0x9bb)]['exportAllTroopStrings']=function(_0x1cf8ee){const _0x166085=_0x52da50,_0x22438e=_0x166085(0x35d);_0x1cf8ee[_0x166085(0x6da)](undefined)['remove']('')[_0x166085(0x6da)](null);const _0x17ac92=_0x1cf8ee[_0x166085(0x30f)](_0x166085(0x840))['trim']();VisuMZ[_0x166085(0x9bb)][_0x166085(0x623)](_0x17ac92,_0x22438e,!![]),SceneManager[_0x166085(0x1aa)][_0x166085(0x949)]=!![];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x99a)]=function(_0x8004e9){const _0x250e3d=_0x52da50;let _0x4ed445='\x0a'+'─'[_0x250e3d(0x4a5)](0x46)+'\x0a',_0x4a3cbf='\x0a'+'┄'[_0x250e3d(0x4a5)](0x46)+'\x0a',_0x52a4fb='';for(const _0x45b17c of _0x8004e9){if(_0x250e3d(0x3f4)===_0x250e3d(0x3f4)){if(!_0x45b17c)continue;if(_0x45b17c[_0x250e3d(0x2a4)]===0x65){_0x52a4fb+=_0x4ed445+'\x0a',_0x52a4fb+='〘Show\x20Text〙\x0a';if(_0x45b17c[_0x250e3d(0x683)][0x4]!==''&&_0x45b17c[_0x250e3d(0x683)][0x4]!==undefined){if('ttXwA'===_0x250e3d(0x422))_0x52a4fb+=_0x250e3d(0x7d7)[_0x250e3d(0x8de)](_0x45b17c[_0x250e3d(0x683)][0x4]);else return this[_0x250e3d(0x64d)](_0x40786d);}}else{if(_0x45b17c[_0x250e3d(0x2a4)]===0x191)_0x52a4fb+='%1\x0a'[_0x250e3d(0x8de)](_0x45b17c['parameters'][0x0]);else{if(_0x45b17c['code']===0x192)_0x250e3d(0x56c)!==_0x250e3d(0x56c)?this[_0x250e3d(0x819)][_0x250e3d(0x56e)](_0x368746[_0x250e3d(0x610)]['SellBgType']):(_0x52a4fb+=_0x4ed445,_0x52a4fb+=_0x250e3d(0x30d)[_0x250e3d(0x8de)](_0x4a3cbf,_0x45b17c[_0x250e3d(0x683)][0x0]+0x1,_0x45b17c['parameters'][0x1]));else{if(_0x45b17c[_0x250e3d(0x2a4)]===0x193)_0x52a4fb+=_0x4ed445,_0x52a4fb+='%1〘Choice\x20Cancel〙%1'['format'](_0x4a3cbf);else{if(_0x45b17c[_0x250e3d(0x2a4)]===0x194)_0x52a4fb+=_0x4ed445,_0x52a4fb+='%1〘End\x20Choice\x20Selection〙%1'['format'](_0x4a3cbf);else{if(_0x45b17c[_0x250e3d(0x2a4)]===0x69)_0x52a4fb+=_0x4ed445+'\x0a',_0x52a4fb+='〘Scrolling\x20Text〙\x0a';else{if(_0x45b17c[_0x250e3d(0x2a4)]===0x6c)_0x52a4fb+=_0x4ed445+'\x0a',_0x52a4fb+='》Comment《\x0a%1\x0a'[_0x250e3d(0x8de)](_0x45b17c[_0x250e3d(0x683)][0x0]);else{if(_0x45b17c[_0x250e3d(0x2a4)]===0x198)_0x52a4fb+=_0x250e3d(0x92d)[_0x250e3d(0x8de)](_0x45b17c[_0x250e3d(0x683)][0x0]);else{if(_0x45b17c[_0x250e3d(0x2a4)]===0x75){const _0x231a1a=$dataCommonEvents[_0x45b17c[_0x250e3d(0x683)][0x0]];if(_0x231a1a&&this[_0x250e3d(0x67f)]<=0xa){this[_0x250e3d(0x67f)]++;let _0x329ab0=VisuMZ[_0x250e3d(0x9bb)][_0x250e3d(0x99a)](_0x231a1a[_0x250e3d(0x536)]);_0x329ab0[_0x250e3d(0x69a)]>0x0&&(_0x52a4fb+=_0x4ed445,_0x52a4fb+=_0x4a3cbf,_0x52a4fb+=_0x250e3d(0x82f)[_0x250e3d(0x8de)](_0x231a1a['id'],_0x231a1a[_0x250e3d(0x215)]),_0x52a4fb+=_0x4a3cbf,_0x52a4fb+=_0x329ab0,_0x52a4fb+=_0x4a3cbf,_0x52a4fb+='〘Common\x20Event\x20%1:\x20%2〙\x20End'['format'](_0x231a1a['id'],_0x231a1a[_0x250e3d(0x215)]),_0x52a4fb+=_0x4a3cbf),this['_commonEventLayers']--;}}}}}}}}}}}else this['renderNoMask'](_0x26770c);}return _0x52a4fb[_0x250e3d(0x69a)]>0x0&&(_0x250e3d(0x7eb)===_0x250e3d(0x7dc)?(this[_0x250e3d(0x4a0)][_0x250e3d(0x675)]=null,this[_0x250e3d(0x952)]()):_0x52a4fb+=_0x4ed445),_0x52a4fb;},PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x53b),_0x455b90=>{const _0x3b1ac4=_0x52da50;VisuMZ[_0x3b1ac4(0x30e)](_0x455b90,_0x455b90);const _0x5c2666=_0x455b90['URL'];VisuMZ[_0x3b1ac4(0x2c2)](_0x5c2666);}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],_0x52da50(0x65c),_0x36e39e=>{const _0x40c39b=_0x52da50;VisuMZ[_0x40c39b(0x30e)](_0x36e39e,_0x36e39e);const _0x275286=_0x36e39e[_0x40c39b(0x455)]||0x0;$gameParty['gainGold'](_0x275286);}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x665),_0x18ccaf=>{const _0xcc4c22=_0x52da50;if(!SceneManager[_0xcc4c22(0x5da)]())return;VisuMZ[_0xcc4c22(0x30e)](_0x18ccaf,_0x18ccaf);const _0x541e2e=_0x18ccaf[_0xcc4c22(0x360)];SceneManager['_scene'][_0xcc4c22(0x527)](_0x541e2e);}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],'PictureCoordinatesMode',_0x1da7ff=>{const _0x2b9d03=_0x52da50;if(!$gameTemp[_0x2b9d03(0x6c9)]())return;if(!Utils['isNwjs']())return;VisuMZ[_0x2b9d03(0x30e)](_0x1da7ff,_0x1da7ff);const _0x50f764=_0x1da7ff[_0x2b9d03(0x18d)]||0x1;$gameTemp[_0x2b9d03(0x2a9)]=_0x50f764;}),PluginManager['registerCommand'](pluginData[_0x52da50(0x215)],_0x52da50(0x4c8),_0x3c1fd1=>{const _0x22bdc4=_0x52da50;VisuMZ['ConvertParams'](_0x3c1fd1,_0x3c1fd1);const _0x53a4c0=_0x3c1fd1[_0x22bdc4(0x7dd)]||0x1,_0x290a1c=_0x3c1fd1[_0x22bdc4(0x326)]||_0x22bdc4(0x64a),_0x325706=$gameScreen[_0x22bdc4(0x2a8)](_0x53a4c0);_0x325706&&(_0x22bdc4(0x259)===_0x22bdc4(0x259)?_0x325706['setEasingType'](_0x290a1c):this[_0x22bdc4(0x3f8)]());}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],'PictureEraseAll',_0x537a3f=>{const _0x307888=_0x52da50;for(let _0x4c645c=0x1;_0x4c645c<=0x64;_0x4c645c++){$gameScreen[_0x307888(0x4cd)](_0x4c645c);}}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x46d),_0x49c2d0=>{const _0x45ce67=_0x52da50;VisuMZ[_0x45ce67(0x30e)](_0x49c2d0,_0x49c2d0);const _0x5aad9f=Math['min'](_0x49c2d0[_0x45ce67(0x345)],_0x49c2d0['EndingID']),_0x12a088=Math[_0x45ce67(0x31b)](_0x49c2d0['StartID'],_0x49c2d0[_0x45ce67(0x1a8)]);for(let _0x5946b1=_0x5aad9f;_0x5946b1<=_0x12a088;_0x5946b1++){$gameScreen['erasePicture'](_0x5946b1);}}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x646),_0x5568a3=>{const _0x7f762f=_0x52da50;VisuMZ['ConvertParams'](_0x5568a3,_0x5568a3);const _0x159cec=Math['round'](_0x5568a3['PictureID'])[_0x7f762f(0x522)](0x1,0x64),_0x4e7b9e=_0x5568a3['Settings'],_0x3692ef=_0x4e7b9e['Origin']['clamp'](0x0,0x1),_0x3bf971=Math[_0x7f762f(0x442)](_0x4e7b9e[_0x7f762f(0x69d)]||0x0),_0xbf8f5d=Math[_0x7f762f(0x442)](_0x4e7b9e[_0x7f762f(0x2a6)]||0x0),_0x30d208=Math[_0x7f762f(0x442)](_0x4e7b9e[_0x7f762f(0x52d)]||0x0),_0x390b84=Math[_0x7f762f(0x442)](_0x4e7b9e[_0x7f762f(0x8f5)]||0x0),_0x17ee63=Math['round'](_0x4e7b9e[_0x7f762f(0x4f8)])[_0x7f762f(0x522)](0x0,0xff),_0x440aa3=_0x4e7b9e[_0x7f762f(0x734)],_0xe184b0=_0x7f762f(0x45f),_0x420cd6=_0x5568a3[_0x7f762f(0x9c0)]?'Smooth':_0x7f762f(0x488),_0x559299=_0xe184b0['format'](_0x5568a3[_0x7f762f(0x719)],_0x420cd6);$gameScreen[_0x7f762f(0x6f0)](_0x159cec,_0x559299,_0x3692ef,_0x3bf971,_0xbf8f5d,_0x30d208,_0x390b84,_0x17ee63,_0x440aa3);}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],_0x52da50(0x767),_0x1d16d8=>{const _0x4ad2de=_0x52da50;VisuMZ[_0x4ad2de(0x30e)](_0x1d16d8,_0x1d16d8);const _0x9ad4a8=_0x1d16d8[_0x4ad2de(0x2d1)]||_0x4ad2de(0x977),_0x15a739=_0x1d16d8[_0x4ad2de(0x2be)][_0x4ad2de(0x522)](0x1,0x9),_0x4476d5=_0x1d16d8[_0x4ad2de(0x386)][_0x4ad2de(0x522)](0x1,0x9),_0x370be7=_0x1d16d8[_0x4ad2de(0x7fd)]||0x1,_0x48bcea=_0x1d16d8['Wait'];$gameScreen[_0x4ad2de(0x2a2)](_0x9ad4a8),$gameScreen['startShake'](_0x15a739,_0x4476d5,_0x370be7);if(_0x48bcea){const _0x23c607=$gameTemp[_0x4ad2de(0x478)]();if(_0x23c607)_0x23c607['wait'](_0x370be7);}}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],_0x52da50(0x5b6),_0x18fb82=>{const _0x33e154=_0x52da50;if($gameParty[_0x33e154(0xa27)]())return;VisuMZ[_0x33e154(0x30e)](_0x18fb82,_0x18fb82);const _0x49b187=_0x18fb82[_0x33e154(0x4fc)],_0x4fbffe=(_0x18fb82[_0x33e154(0x740)]||0x0)/0x64;for(const _0x6f980d of _0x49b187){const _0x5d4a2e=Math[_0x33e154(0x977)]()<=_0x4fbffe;$gameSwitches['setValue'](_0x6f980d,_0x5d4a2e);}}),PluginManager['registerCommand'](pluginData[_0x52da50(0x215)],_0x52da50(0x1c9),_0x3f796c=>{const _0x20606d=_0x52da50;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x3f796c,_0x3f796c);const _0x27aee6=Math[_0x20606d(0x8e5)](_0x3f796c[_0x20606d(0x345)],_0x3f796c[_0x20606d(0x1a8)]),_0x4bb47e=Math[_0x20606d(0x31b)](_0x3f796c[_0x20606d(0x345)],_0x3f796c[_0x20606d(0x1a8)]),_0x5757fc=(_0x3f796c[_0x20606d(0x740)]||0x0)/0x64;for(let _0x239a42=_0x27aee6;_0x239a42<=_0x4bb47e;_0x239a42++){const _0x3b4c35=Math['random']()<=_0x5757fc;$gameSwitches[_0x20606d(0x9eb)](_0x239a42,_0x3b4c35);}}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],'SwitchToggleOne',_0x5b8ed3=>{const _0x20f77e=_0x52da50;if($gameParty[_0x20f77e(0xa27)]())return;VisuMZ['ConvertParams'](_0x5b8ed3,_0x5b8ed3);const _0x56b08c=_0x5b8ed3[_0x20f77e(0x4fc)];for(const _0x14737a of _0x56b08c){const _0x31e82c=$gameSwitches['value'](_0x14737a);$gameSwitches[_0x20f77e(0x9eb)](_0x14737a,!_0x31e82c);}}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x755),_0x1c1872=>{const _0x57fdb3=_0x52da50;if($gameParty[_0x57fdb3(0xa27)]())return;VisuMZ[_0x57fdb3(0x30e)](_0x1c1872,_0x1c1872);const _0x2cb681=Math[_0x57fdb3(0x8e5)](_0x1c1872[_0x57fdb3(0x345)],_0x1c1872[_0x57fdb3(0x1a8)]),_0x13fa61=Math['max'](_0x1c1872[_0x57fdb3(0x345)],_0x1c1872[_0x57fdb3(0x1a8)]);for(let _0x470dd6=_0x2cb681;_0x470dd6<=_0x13fa61;_0x470dd6++){const _0x31d5d9=$gameSwitches[_0x57fdb3(0x455)](_0x470dd6);$gameSwitches[_0x57fdb3(0x9eb)](_0x470dd6,!_0x31d5d9);}}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x87a),_0x291270=>{const _0x5f9cfc=_0x52da50;VisuMZ[_0x5f9cfc(0x30e)](_0x291270,_0x291270);const _0x47691e=_0x291270[_0x5f9cfc(0x4ea)]||0x1;$gameSystem[_0x5f9cfc(0x1ee)](_0x47691e);}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x9c2),_0x28b63e=>{const _0x357b05=_0x52da50;if($gameParty[_0x357b05(0xa27)]())return;VisuMZ[_0x357b05(0x30e)](_0x28b63e,_0x28b63e);const _0x28036a=_0x28b63e[_0x357b05(0x4ea)];if(_0x28036a[_0x357b05(0x2bb)](/Front/i)){if(_0x357b05(0x546)!==_0x357b05(0x546)){const _0x5189f7=this[_0x357b05(0x1e8)]();this['changeTextColor'](_0x1daaab[_0x357b05(0x971)]());const _0x14d0ca=_0x4c9ce5[_0x357b05(0x9bb)][_0x357b05(0x630)]['UI'][_0x357b05(0x1a2)];this[_0x357b05(0x780)](_0x14d0ca,_0x2dfc46,_0x1a4237,_0x5189f7,'center');}else $gameSystem[_0x357b05(0x8e4)](![]);}else _0x28036a[_0x357b05(0x2bb)](/Side/i)?_0x357b05(0x930)!==_0x357b05(0x930)?(_0x29b13a+='\x0a',_0x4367fe+=_0x450fc8[_0x357b05(0x683)][0x0]):$gameSystem[_0x357b05(0x8e4)](!![]):$gameSystem[_0x357b05(0x8e4)](!$gameSystem[_0x357b05(0x6b7)]());}),PluginManager['registerCommand'](pluginData[_0x52da50(0x215)],'SystemLoadAudio',_0x476852=>{const _0x332df9=_0x52da50;if($gameParty[_0x332df9(0xa27)]())return;VisuMZ[_0x332df9(0x30e)](_0x476852,_0x476852);const _0x45d54e=[_0x332df9(0x426),_0x332df9(0x316),'me','se'];for(const _0x393a6e of _0x45d54e){const _0xca5002=_0x476852[_0x393a6e],_0x591498=_0x332df9(0x7c7)[_0x332df9(0x8de)](_0x393a6e);for(const _0x3b7ce4 of _0xca5002){if(_0x332df9(0x8b1)===_0x332df9(0x2ce))return this[_0x332df9(0x3c9)](_0x45c050,_0x458359);else AudioManager[_0x332df9(0x1ea)](_0x591498,_0x3b7ce4);}}}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x702),_0x18581=>{const _0x58a18e=_0x52da50;if($gameParty[_0x58a18e(0xa27)]())return;VisuMZ[_0x58a18e(0x30e)](_0x18581,_0x18581);const _0x438c7e=[_0x58a18e(0x2fc),_0x58a18e(0x1b7),_0x58a18e(0x555),'characters',_0x58a18e(0x619),_0x58a18e(0x688),_0x58a18e(0x1d1),_0x58a18e(0x54d),_0x58a18e(0x643),_0x58a18e(0x362),_0x58a18e(0x810),_0x58a18e(0x26d),_0x58a18e(0x696),_0x58a18e(0x5e4)];for(const _0x3ef738 of _0x438c7e){const _0x27c5b8=_0x18581[_0x3ef738],_0x1c7690=_0x58a18e(0x2a0)[_0x58a18e(0x8de)](_0x3ef738);for(const _0x32b397 of _0x27c5b8){_0x58a18e(0x24f)!==_0x58a18e(0x49b)?ImageManager['loadBitmap'](_0x1c7690,_0x32b397):(_0x32742f[_0x58a18e(0x9bb)]['Graphics_centerElement']['call'](this,_0x317b3b),this[_0x58a18e(0xa23)](_0x1d817f));}}}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],'SystemSetBattleSystem',_0x1278d4=>{const _0x3fda8c=_0x52da50;if($gameParty[_0x3fda8c(0xa27)]())return;VisuMZ[_0x3fda8c(0x30e)](_0x1278d4,_0x1278d4);const _0x387390=_0x1278d4[_0x3fda8c(0x4ea)][_0x3fda8c(0x5d6)]()['trim'](),_0x58f00d=VisuMZ['CoreEngine'][_0x3fda8c(0x36e)](_0x387390);$gameSystem[_0x3fda8c(0x695)](_0x58f00d);}),VisuMZ[_0x52da50(0x9bb)]['CreateBattleSystemID']=function(_0x3cf70f){const _0x582a2f=_0x52da50;_0x3cf70f=_0x3cf70f||_0x582a2f(0x718),_0x3cf70f=String(_0x3cf70f)[_0x582a2f(0x5d6)]()['trim']();switch(_0x3cf70f){case'DTB':return 0x0;case'TPB\x20ACTIVE':if(Imported['VisuMZ_1_OptionsCore']){if('PLqRZ'===_0x582a2f(0x8f4)){if(_0x25cd24[_0x582a2f(0xa27)]())return![];return this['name']()&&this['name']()['charAt'](0x0)==='!';}else ConfigManager[_0x582a2f(0x53c)]=!![];}return 0x1;case _0x582a2f(0x5d5):if(Imported[_0x582a2f(0x55f)]){if(_0x582a2f(0x98e)===_0x582a2f(0x98e))ConfigManager[_0x582a2f(0x53c)]=![];else{const _0x1d9715='_stored_systemColor';this['_colorCache']=this[_0x582a2f(0x42d)]||{};if(this['_colorCache'][_0x1d9715])return this[_0x582a2f(0x42d)][_0x1d9715];const _0x56290d=_0x5e0e85[_0x582a2f(0x9bb)][_0x582a2f(0x630)]['Color'][_0x582a2f(0x936)];return this['getColorDataFromPluginParameters'](_0x1d9715,_0x56290d);}}return 0x2;case _0x582a2f(0x5b3):if(Imported[_0x582a2f(0x1a1)])return'CTB';break;case'STB':if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x582a2f(0x98f);break;case _0x582a2f(0x5ff):if(Imported[_0x582a2f(0x4f0)])return _0x582a2f(0x5ff);break;case _0x582a2f(0x1cc):if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x582a2f(0x1cc);break;case _0x582a2f(0x7a8):if(Imported[_0x582a2f(0x5af)])return _0x582a2f(0x7a8);break;case'ETB':if(Imported['VisuMZ_2_BattleSystemETB'])return _0x582a2f(0x1ab);break;case'PTB':if(Imported[_0x582a2f(0x93a)])return _0x582a2f(0x214);break;}return $dataSystem['battleSystem'];},PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],'SystemSetWindowPadding',_0x57b413=>{const _0x19a490=_0x52da50;VisuMZ[_0x19a490(0x30e)](_0x57b413,_0x57b413);const _0x3acfa7=_0x57b413[_0x19a490(0x4ea)]||0x1;$gameSystem[_0x19a490(0x438)](_0x3acfa7);}),PluginManager[_0x52da50(0x19e)](pluginData[_0x52da50(0x215)],_0x52da50(0x9ff),_0x57cfc1=>{const _0x2e03b6=_0x52da50;VisuMZ['ConvertParams'](_0x57cfc1,_0x57cfc1);const _0xd3016=_0x57cfc1['id']||0x1,_0xbababc=_0x57cfc1[_0x2e03b6(0x31e)],_0x766ff9=_0x57cfc1[_0x2e03b6(0x38c)]||0x0;let _0x5c8d5d=$gameVariables[_0x2e03b6(0x455)](_0xd3016)||0x0;switch(_0xbababc){case'=':_0x5c8d5d=_0x766ff9;break;case'+':_0x5c8d5d+=_0x766ff9;break;case'-':_0x5c8d5d-=_0x766ff9;break;case'*':_0x5c8d5d*=_0x766ff9;break;case'/':_0x5c8d5d/=_0x766ff9;break;case'%':_0x5c8d5d%=_0x766ff9;break;}_0x5c8d5d=_0x5c8d5d||0x0,$gameVariables[_0x2e03b6(0x9eb)](_0xd3016,_0x5c8d5d);}),PluginManager[_0x52da50(0x19e)](pluginData['name'],_0x52da50(0x313),_0x5caa6c=>{const _0x42a3cf=_0x52da50;VisuMZ[_0x42a3cf(0x30e)](_0x5caa6c,_0x5caa6c);const _0xe7cc8=_0x5caa6c['id']()||0x1,_0x31efe1=_0x5caa6c[_0x42a3cf(0x31e)],_0x4cfee1=_0x5caa6c[_0x42a3cf(0x38c)]()||0x0;let _0x164105=$gameVariables[_0x42a3cf(0x455)](_0xe7cc8)||0x0;switch(_0x31efe1){case'=':_0x164105=_0x4cfee1;break;case'+':_0x164105+=_0x4cfee1;break;case'-':_0x164105-=_0x4cfee1;break;case'*':_0x164105*=_0x4cfee1;break;case'/':_0x164105/=_0x4cfee1;break;case'%':_0x164105%=_0x4cfee1;break;}_0x164105=_0x164105||0x0,$gameVariables[_0x42a3cf(0x9eb)](_0xe7cc8,_0x164105);}),VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x837)]=Scene_Boot[_0x52da50(0x48a)]['onDatabaseLoaded'],Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x8df)]=function(){const _0x4b958e=_0x52da50;VisuMZ[_0x4b958e(0x9bb)][_0x4b958e(0x837)][_0x4b958e(0x4cc)](this),this[_0x4b958e(0x86b)](),this[_0x4b958e(0x3cb)](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x4b958e(0x351)](),this[_0x4b958e(0x8f0)](),this[_0x4b958e(0x59b)](),VisuMZ['ParseAllNotetags']();},VisuMZ['CoreEngine'][_0x52da50(0x662)]={},Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x86b)]=function(){const _0x46b685=_0x52da50,_0x13c694=[_0x46b685(0x554),'MAXMP',_0x46b685(0x1af),'DEF',_0x46b685(0x525),_0x46b685(0x8b6),_0x46b685(0x682),_0x46b685(0x376)],_0x148212=[_0x46b685(0x771),_0x46b685(0x826),_0x46b685(0x5a9),_0x46b685(0x74c),_0x46b685(0x8a8),_0x46b685(0x720),_0x46b685(0x211),_0x46b685(0x8bf),_0x46b685(0x53f),'TRG'],_0x5e0d8f=[_0x46b685(0xa1e),_0x46b685(0x3bd),_0x46b685(0x85c),_0x46b685(0x2b6),_0x46b685(0x598),'TCR',_0x46b685(0x3f0),_0x46b685(0x764),_0x46b685(0x3a6),_0x46b685(0x388)],_0x3c3b6e=[_0x13c694,_0x148212,_0x5e0d8f],_0x2d0dca=['Plus',_0x46b685(0x4e8),_0x46b685(0x4a6),_0x46b685(0x6e5),_0x46b685(0x6b5),_0x46b685(0x306),_0x46b685(0xa15),'Flat',_0x46b685(0x725),_0x46b685(0x357)];for(const _0x4cb870 of _0x3c3b6e){let _0xe4037='';if(_0x4cb870===_0x13c694)_0xe4037=_0x46b685(0x3ec);if(_0x4cb870===_0x148212)_0xe4037='xparam';if(_0x4cb870===_0x5e0d8f)_0xe4037='sparam';for(const _0x21a2e5 of _0x2d0dca){let _0x2f87d3='%1%2'[_0x46b685(0x8de)](_0xe4037,_0x21a2e5);VisuMZ['CoreEngine']['RegExp'][_0x2f87d3]=[],VisuMZ['CoreEngine'][_0x46b685(0x662)][_0x2f87d3+'JS']=[];let _0x5ae259='<%1\x20%2:[\x20]';if([_0x46b685(0x2ed),_0x46b685(0x7b8)][_0x46b685(0x3fc)](_0x21a2e5))_0x5ae259+=_0x46b685(0x5a7);else{if(['Plus1',_0x46b685(0x725)][_0x46b685(0x3fc)](_0x21a2e5))_0x46b685(0x788)!==_0x46b685(0x1dc)?_0x5ae259+='([\x5c+\x5c-]\x5cd+)([%％])>':_0x5799f3[_0x46b685(0x9bb)][_0x46b685(0x92e)][_0x46b685(0x4cc)](this);else{if([_0x46b685(0x4a6),_0x46b685(0x357)]['includes'](_0x21a2e5)){if(_0x46b685(0x8a1)!=='itMPT'){if(_0x59b9c3)_0x2ae360[_0x46b685(0x649)](_0x546285);}else _0x5ae259+=_0x46b685(0x4eb);}else{if(_0x21a2e5===_0x46b685(0x6e5))_0x46b685(0x219)!==_0x46b685(0x271)?_0x5ae259+=_0x46b685(0x950):(_0x52ca16[_0x46b685(0x302)](),_0x2143be['_pictureCoordinatesWindow']=new _0x5f2f06(),_0x9357f5[_0x46b685(0x1d0)](_0x262f41[_0x46b685(0x7c5)]));else{if(_0x21a2e5===_0x46b685(0x306))_0x46b685(0x1a6)!==_0x46b685(0x194)?_0x5ae259+=_0x46b685(0x7ab):this['cursorDown'](_0x218e6a[_0x46b685(0x434)](_0x46b685(0x78e)));else{if(_0x21a2e5===_0x46b685(0xa15)){if(_0x46b685(0x76a)===_0x46b685(0x72f)){let _0x16865e=0x0;for(const _0x19ed02 of _0x2a9be4[_0x46b685(0x9bb)][_0x46b685(0x630)][_0x46b685(0x9cd)][_0x46b685(0x48f)]){const _0x3729ea=this['itemPadding'](),_0xffc478=this['paramY'](_0x16865e);this[_0x46b685(0x644)](_0x3729ea,_0xffc478,_0x19ed02),_0x16865e++;}}else _0x5ae259+='(\x5cd+\x5c.?\x5cd+)>';}}}}}}for(const _0x33722a of _0x4cb870){if(_0x46b685(0x6c2)!==_0x46b685(0x6b3)){let _0x69dfb7=_0x21a2e5['replace'](/[\d+]/g,'')[_0x46b685(0x5d6)]();const _0x58bb39=_0x5ae259[_0x46b685(0x8de)](_0x33722a,_0x69dfb7);VisuMZ['CoreEngine'][_0x46b685(0x662)][_0x2f87d3][_0x46b685(0x281)](new RegExp(_0x58bb39,'i'));const _0x3844dc='<JS\x20%1\x20%2:[\x20](.*)>'[_0x46b685(0x8de)](_0x33722a,_0x69dfb7);VisuMZ[_0x46b685(0x9bb)][_0x46b685(0x662)][_0x2f87d3+'JS'][_0x46b685(0x281)](new RegExp(_0x3844dc,'i'));}else _0x1a4f33[_0x46b685(0x281)](_0x23bb87);}}}},Scene_Boot['prototype'][_0x52da50(0x3cb)]=function(){const _0x566968=_0x52da50;if(VisuMZ[_0x566968(0x7c1)])return;},Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x3ca)]=function(){const _0x31a44c=_0x52da50,_0x379843=VisuMZ[_0x31a44c(0x9bb)]['Settings'];_0x379843[_0x31a44c(0x7cf)]['OpenConsole']&&VisuMZ[_0x31a44c(0x79f)](!![]);_0x379843[_0x31a44c(0x7cf)][_0x31a44c(0x589)]&&(Input['keyMapper'][0x23]=_0x31a44c(0x945),Input[_0x31a44c(0x730)][0x24]=_0x31a44c(0x862));if(_0x379843[_0x31a44c(0x30b)]){const _0x4bb903=_0x379843[_0x31a44c(0x30b)];_0x4bb903[_0x31a44c(0x54a)]=_0x4bb903['KeySHIFT']||_0x31a44c(0x640),_0x4bb903[_0x31a44c(0x92a)]=_0x4bb903[_0x31a44c(0x92a)]||'\x5c}❪TAB❫\x5c{';}_0x379843['KeyboardInput'][_0x31a44c(0x70d)]&&(Input[_0x31a44c(0x730)][0x57]='up',Input[_0x31a44c(0x730)][0x41]=_0x31a44c(0x5e2),Input[_0x31a44c(0x730)][0x53]=_0x31a44c(0x78e),Input[_0x31a44c(0x730)][0x44]=_0x31a44c(0x1c8),Input[_0x31a44c(0x730)][0x45]='pagedown'),_0x379843['KeyboardInput'][_0x31a44c(0x27f)]&&(Input['keyMapper'][0x52]=_0x31a44c(0x25c)),_0x379843['Param'][_0x31a44c(0x48f)]=_0x379843[_0x31a44c(0x9cd)][_0x31a44c(0x48f)][_0x31a44c(0x1d7)](_0x5c5738=>_0x5c5738[_0x31a44c(0x5d6)]()[_0x31a44c(0x748)]()),_0x379843[_0x31a44c(0x9cd)]['ExtDisplayedParams']=_0x379843['Param']['ExtDisplayedParams'][_0x31a44c(0x1d7)](_0x5e2010=>_0x5e2010[_0x31a44c(0x5d6)]()['trim']());},Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x351)]=function(){const _0x5db06d=_0x52da50;this[_0x5db06d(0x298)]();},Scene_Boot[_0x52da50(0x48a)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x20a91d=_0x52da50,_0x2a6385=VisuMZ[_0x20a91d(0x9bb)][_0x20a91d(0x630)][_0x20a91d(0x839)];for(const _0x3df271 of _0x2a6385){const _0x14fafe=_0x3df271[_0x20a91d(0x986)]['replace'](/[ ]/g,''),_0x12abe3=_0x3df271[_0x20a91d(0x1be)];VisuMZ[_0x20a91d(0x9bb)]['createJsQuickFunction'](_0x14fafe,_0x12abe3);}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x7a0)]=function(_0x3fe2be,_0x46029f){const _0x3663fa=_0x52da50;if(!!window[_0x3fe2be]){if($gameTemp[_0x3663fa(0x6c9)]())console['log'](_0x3663fa(0x7d0)[_0x3663fa(0x8de)](_0x3fe2be));}const _0x19f29f='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'['format'](_0x3fe2be,_0x46029f);window[_0x3fe2be]=new Function(_0x19f29f);},Scene_Boot[_0x52da50(0x48a)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x204497=_0x52da50,_0xcd1036=VisuMZ[_0x204497(0x9bb)][_0x204497(0x630)][_0x204497(0x4a7)];if(!_0xcd1036)return;for(const _0x1e2f1c of _0xcd1036){if(!_0x1e2f1c)continue;VisuMZ['CoreEngine']['createCustomParameter'](_0x1e2f1c);}},VisuMZ['CoreEngine'][_0x52da50(0x430)]={},VisuMZ['CoreEngine']['CustomParamIcons']={},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x560)]={},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x5fa)]={},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x303)]=function(_0x5a6190){const _0x1b948e=_0x52da50,_0x2ebf16=_0x5a6190[_0x1b948e(0x5c6)],_0x4c5ed2=_0x5a6190[_0x1b948e(0x67c)],_0x4f4bbe=_0x5a6190[_0x1b948e(0x8b9)],_0x4da3b2=_0x5a6190['Type'],_0x59e67a=new Function(_0x5a6190[_0x1b948e(0x946)]);VisuMZ['CoreEngine'][_0x1b948e(0x430)][_0x2ebf16[_0x1b948e(0x5d6)]()[_0x1b948e(0x748)]()]=_0x4c5ed2,VisuMZ[_0x1b948e(0x9bb)][_0x1b948e(0x82d)][_0x2ebf16[_0x1b948e(0x5d6)]()[_0x1b948e(0x748)]()]=_0x4f4bbe,VisuMZ['CoreEngine'][_0x1b948e(0x560)][_0x2ebf16[_0x1b948e(0x5d6)]()[_0x1b948e(0x748)]()]=_0x4da3b2,VisuMZ[_0x1b948e(0x9bb)][_0x1b948e(0x5fa)][_0x2ebf16[_0x1b948e(0x5d6)]()[_0x1b948e(0x748)]()]=_0x2ebf16,Object['defineProperty'](Game_BattlerBase[_0x1b948e(0x48a)],_0x2ebf16,{'get'(){const _0x3c94a3=_0x1b948e;if('QTYUY'!==_0x3c94a3(0x31a)){const _0x21a61a=_0x59e67a[_0x3c94a3(0x4cc)](this);return _0x4da3b2===_0x3c94a3(0x2e4)?Math['round'](_0x21a61a):_0x21a61a;}else _0x281300['CoreEngine'][_0x3c94a3(0x769)][_0x3c94a3(0x4cc)](this),_0x12a386[_0x3c94a3(0x6c8)](_0x3c94a3(0x516),this[_0x3c94a3(0x74b)][_0x3c94a3(0x4e6)](this));}});},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x5bf)]={},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x5ba)]={},Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x59b)]=function(){const _0xc78519=_0x52da50,_0x2a1eac=VisuMZ['CoreEngine'][_0xc78519(0x630)][_0xc78519(0x5bf)];for(const _0x130b7a of _0x2a1eac){const _0x24f2e4=(_0x130b7a['Name']||'')[_0xc78519(0x523)]()['trim'](),_0x79dbd=(_0x130b7a[_0xc78519(0x7cd)]||'')[_0xc78519(0x523)]()['trim']();VisuMZ['CoreEngine'][_0xc78519(0x5bf)][_0x24f2e4]=_0x130b7a,VisuMZ[_0xc78519(0x9bb)]['ControllerMatches'][_0x79dbd]=_0x24f2e4;}},VisuMZ[_0x52da50(0x7c1)]=function(){const _0x208022=_0x52da50;for(const _0x30cec2 of $dataActors){if(_0x30cec2)VisuMZ[_0x208022(0x3b5)](_0x30cec2);}for(const _0x37ef00 of $dataClasses){if(_0x208022(0x75d)===_0x208022(0x75d)){if(_0x37ef00)VisuMZ[_0x208022(0x83f)](_0x37ef00);}else this[_0x208022(0x75f)]()?(this['processCursorMoveModernControls'](),this[_0x208022(0x1f1)]()):_0x2e92b0['CoreEngine'][_0x208022(0x8e6)][_0x208022(0x4cc)](this);}for(const _0x16395c of $dataSkills){if(_0x16395c)VisuMZ[_0x208022(0x86e)](_0x16395c);}for(const _0x54593a of $dataItems){if(_0x54593a)VisuMZ[_0x208022(0x38b)](_0x54593a);}for(const _0x596834 of $dataWeapons){if(_0x596834)VisuMZ[_0x208022(0x867)](_0x596834);}for(const _0x527935 of $dataArmors){if(_0x527935)VisuMZ['ParseArmorNotetags'](_0x527935);}for(const _0x2b8d6f of $dataEnemies){if(_0x2b8d6f)VisuMZ[_0x208022(0x649)](_0x2b8d6f);}for(const _0x2907f7 of $dataStates){if(_0x208022(0x6c1)!=='tqTwL'){if(_0x2907f7)VisuMZ[_0x208022(0x722)](_0x2907f7);}else{const _0x251343=_0x208022(0x495);this[_0x208022(0x42d)]=this[_0x208022(0x42d)]||{};if(this[_0x208022(0x42d)][_0x251343])return this[_0x208022(0x42d)][_0x251343];const _0xc07b5d=_0xf34ce3[_0x208022(0x9bb)]['Settings'][_0x208022(0x338)][_0x208022(0x9ab)];return this[_0x208022(0x441)](_0x251343,_0xc07b5d);}}for(const _0x2f8fe3 of $dataTilesets){if(_0x2f8fe3)VisuMZ[_0x208022(0x234)](_0x2f8fe3);}},VisuMZ[_0x52da50(0x3b5)]=function(_0x2dd89d){},VisuMZ['ParseClassNotetags']=function(_0x44252c){},VisuMZ[_0x52da50(0x86e)]=function(_0x461c3d){},VisuMZ[_0x52da50(0x38b)]=function(_0x160168){},VisuMZ[_0x52da50(0x867)]=function(_0x2c5fad){},VisuMZ['ParseArmorNotetags']=function(_0x58669b){},VisuMZ[_0x52da50(0x649)]=function(_0x983ca0){},VisuMZ[_0x52da50(0x722)]=function(_0x2c9f8a){},VisuMZ[_0x52da50(0x234)]=function(_0x3ed346){},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x3b5)]=VisuMZ[_0x52da50(0x3b5)],VisuMZ[_0x52da50(0x3b5)]=function(_0x3392d4){const _0x2a8c21=_0x52da50;VisuMZ['CoreEngine'][_0x2a8c21(0x3b5)][_0x2a8c21(0x4cc)](this,_0x3392d4);const _0x5833a0=_0x3392d4[_0x2a8c21(0x61e)];if(_0x5833a0[_0x2a8c21(0x2bb)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x2a8c21(0x51e)!==_0x2a8c21(0x476)){_0x3392d4[_0x2a8c21(0x7ca)]=Number(RegExp['$1']);if(_0x3392d4[_0x2a8c21(0x7ca)]===0x0)_0x3392d4[_0x2a8c21(0x7ca)]=Number[_0x2a8c21(0x2d9)];}else{const _0xd4aa37=this[_0x2a8c21(0xa2a)]['bitmap'],_0x15be7b=this[_0x2a8c21(0x2b7)],_0x4dd7e4=this['height'],_0x516e8e=this[_0x2a8c21(0x8b2)],_0x3d6ff9=_0x442859[_0x2a8c21(0x1df)](),_0x4c8998=_0x54b018[_0x2a8c21(0x39d)]();_0xd4aa37[_0x2a8c21(0x2ef)](_0x15be7b,_0x4dd7e4),_0xd4aa37[_0x2a8c21(0x726)](0x0,0x0,_0x15be7b,_0x516e8e,_0x4c8998,_0x3d6ff9,!![]),_0xd4aa37[_0x2a8c21(0x9aa)](0x0,_0x516e8e,_0x15be7b,_0x4dd7e4-_0x516e8e*0x2,_0x3d6ff9),_0xd4aa37[_0x2a8c21(0x726)](0x0,_0x4dd7e4-_0x516e8e,_0x15be7b,_0x516e8e,_0x3d6ff9,_0x4c8998,!![]),this[_0x2a8c21(0xa2a)][_0x2a8c21(0x694)](0x0,0x0,_0x15be7b,_0x4dd7e4);}}if(_0x5833a0['match'](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x2a8c21(0x520)!==_0x2a8c21(0x520)){var _0x2e5b48=_0x297993(_0x4d5775['$1'])/0x64;_0x4f04b2+=_0x2e5b48;}else _0x3392d4[_0x2a8c21(0x790)]=Math[_0x2a8c21(0x8e5)](Number(RegExp['$1']),_0x3392d4[_0x2a8c21(0x7ca)]);}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x83f)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x52da50(0x83f)]=function(_0x12dfbf){const _0x2278d4=_0x52da50;VisuMZ[_0x2278d4(0x9bb)]['ParseClassNotetags'][_0x2278d4(0x4cc)](this,_0x12dfbf);if(_0x12dfbf[_0x2278d4(0x8af)])for(const _0x1b3466 of _0x12dfbf[_0x2278d4(0x8af)]){if(_0x1b3466[_0x2278d4(0x61e)][_0x2278d4(0x2bb)](/<LEARN AT LEVEL:[ ](\d+)>/i)){if(_0x2278d4(0x466)!=='gJyAJ')return this[_0x2278d4(0x231)]()[_0x2278d4(0x6ca)]*0.01;else _0x1b3466[_0x2278d4(0x80b)]=Math['max'](Number(RegExp['$1']),0x1);}}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x649)]=VisuMZ[_0x52da50(0x649)],VisuMZ[_0x52da50(0x649)]=function(_0x118131){const _0x4df171=_0x52da50;VisuMZ[_0x4df171(0x9bb)][_0x4df171(0x649)][_0x4df171(0x4cc)](this,_0x118131),_0x118131[_0x4df171(0x80b)]=0x1;const _0x164410=_0x118131[_0x4df171(0x61e)];if(_0x164410[_0x4df171(0x2bb)](/<LEVEL:[ ](\d+)>/i))_0x118131[_0x4df171(0x80b)]=Number(RegExp['$1']);if(_0x164410['match'](/<MAXHP:[ ](\d+)>/i))_0x118131[_0x4df171(0x999)][0x0]=Number(RegExp['$1']);if(_0x164410[_0x4df171(0x2bb)](/<MAXMP:[ ](\d+)>/i))_0x118131[_0x4df171(0x999)][0x1]=Number(RegExp['$1']);if(_0x164410[_0x4df171(0x2bb)](/<ATK:[ ](\d+)>/i))_0x118131[_0x4df171(0x999)][0x2]=Number(RegExp['$1']);if(_0x164410[_0x4df171(0x2bb)](/<DEF:[ ](\d+)>/i))_0x118131[_0x4df171(0x999)][0x3]=Number(RegExp['$1']);if(_0x164410[_0x4df171(0x2bb)](/<MAT:[ ](\d+)>/i))_0x118131['params'][0x4]=Number(RegExp['$1']);if(_0x164410[_0x4df171(0x2bb)](/<MDF:[ ](\d+)>/i))_0x118131['params'][0x5]=Number(RegExp['$1']);if(_0x164410['match'](/<AGI:[ ](\d+)>/i))_0x118131[_0x4df171(0x999)][0x6]=Number(RegExp['$1']);if(_0x164410[_0x4df171(0x2bb)](/<LUK:[ ](\d+)>/i))_0x118131[_0x4df171(0x999)][0x7]=Number(RegExp['$1']);if(_0x164410[_0x4df171(0x2bb)](/<EXP:[ ](\d+)>/i))_0x118131[_0x4df171(0x20c)]=Number(RegExp['$1']);if(_0x164410['match'](/<GOLD:[ ](\d+)>/i))_0x118131[_0x4df171(0x243)]=Number(RegExp['$1']);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x838)]=Graphics['_defaultStretchMode'],Graphics['_defaultStretchMode']=function(){const _0x3d23d0=_0x52da50;switch(VisuMZ[_0x3d23d0(0x9bb)][_0x3d23d0(0x630)][_0x3d23d0(0x7cf)]['AutoStretch']){case _0x3d23d0(0x510):return!![];case _0x3d23d0(0x273):return![];default:return VisuMZ['CoreEngine'][_0x3d23d0(0x838)][_0x3d23d0(0x4cc)](this);}},VisuMZ[_0x52da50(0x9bb)]['Graphics_printError']=Graphics[_0x52da50(0x8d0)],Graphics[_0x52da50(0x8d0)]=function(_0x34bc14,_0x298efe,_0x946382=null){const _0x106fe8=_0x52da50;VisuMZ['CoreEngine'][_0x106fe8(0x420)][_0x106fe8(0x4cc)](this,_0x34bc14,_0x298efe,_0x946382),VisuMZ[_0x106fe8(0x79f)](![]);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x5f5)]=Graphics[_0x52da50(0x941)],Graphics['_centerElement']=function(_0x47cbbf){const _0x3620f8=_0x52da50;VisuMZ[_0x3620f8(0x9bb)][_0x3620f8(0x5f5)][_0x3620f8(0x4cc)](this,_0x47cbbf),this[_0x3620f8(0xa23)](_0x47cbbf);},Graphics[_0x52da50(0xa23)]=function(_0x1d3e8f){const _0x4cf723=_0x52da50;VisuMZ[_0x4cf723(0x9bb)][_0x4cf723(0x630)][_0x4cf723(0x7cf)][_0x4cf723(0x404)]&&(_0x1d3e8f[_0x4cf723(0x7a1)][_0x4cf723(0x3fe)]=_0x4cf723(0x910));VisuMZ[_0x4cf723(0x9bb)][_0x4cf723(0x630)][_0x4cf723(0x7cf)][_0x4cf723(0x1b2)]&&(_0x1d3e8f[_0x4cf723(0x7a1)][_0x4cf723(0x51d)]='pixelated');const _0x148400=Math[_0x4cf723(0x31b)](0x0,Math[_0x4cf723(0x23f)](_0x1d3e8f[_0x4cf723(0x2b7)]*this['_realScale'])),_0x616e8e=Math[_0x4cf723(0x31b)](0x0,Math[_0x4cf723(0x23f)](_0x1d3e8f[_0x4cf723(0x394)]*this[_0x4cf723(0x34e)]));_0x1d3e8f[_0x4cf723(0x7a1)]['width']=_0x148400+'px',_0x1d3e8f[_0x4cf723(0x7a1)][_0x4cf723(0x394)]=_0x616e8e+'px';},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x96f)]=Bitmap[_0x52da50(0x48a)][_0x52da50(0x2a5)],Bitmap['prototype'][_0x52da50(0x2a5)]=function(_0x125e09,_0x3444d5){const _0xe2a5ce=_0x52da50;VisuMZ[_0xe2a5ce(0x9bb)][_0xe2a5ce(0x96f)][_0xe2a5ce(0x4cc)](this,_0x125e09,_0x3444d5),this[_0xe2a5ce(0x77d)]=!(VisuMZ['CoreEngine'][_0xe2a5ce(0x630)][_0xe2a5ce(0x7cf)][_0xe2a5ce(0x1b2)]??!![]);},Bitmap[_0x52da50(0x48a)][_0x52da50(0x3e9)]=function(){const _0x2d5bbc=_0x52da50;this[_0x2d5bbc(0x487)]=!![];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x559)]=Sprite[_0x52da50(0x48a)][_0x52da50(0x8fe)],Sprite[_0x52da50(0x48a)][_0x52da50(0x8fe)]=function(){const _0x2198de=_0x52da50;if(this[_0x2198de(0x384)])VisuMZ[_0x2198de(0x9bb)][_0x2198de(0x559)][_0x2198de(0x4cc)](this);this[_0x2198de(0x742)]();},Sprite[_0x52da50(0x48a)][_0x52da50(0x742)]=function(){const _0x23737e=_0x52da50;if(!this[_0x23737e(0x42c)])return;if(!this[_0x23737e(0x42c)][_0x23737e(0x487)])return;this[_0x23737e(0x42c)][_0x23737e(0x66f)]&&!this[_0x23737e(0x2f1)]['_baseTexture'][_0x23737e(0x2da)]&&(_0x23737e(0x88c)!==_0x23737e(0x88c)?(_0x1ee7b9[_0x23737e(0x9bb)]['Scene_Battle_createCancelButton']['call'](this),_0x3feb95[_0x23737e(0x974)]()&&this[_0x23737e(0x877)]()):this['bitmap'][_0x23737e(0x8fe)]());},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0xa17)]=Bitmap[_0x52da50(0x48a)]['resize'],Bitmap[_0x52da50(0x48a)]['resize']=function(_0x4853fd,_0x4ed08e){const _0x154527=_0x52da50;VisuMZ[_0x154527(0x9bb)][_0x154527(0xa17)][_0x154527(0x4cc)](this,_0x4853fd,_0x4ed08e),this[_0x154527(0x3e9)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x4cb)]=Bitmap['prototype'][_0x52da50(0x583)],Bitmap[_0x52da50(0x48a)][_0x52da50(0x583)]=function(_0x4fe96c,_0x51fc71,_0x3d1371,_0x5f8739,_0x402510,_0x4b519f,_0x52a881,_0x52be51,_0x34ef88){const _0x4a9ceb=_0x52da50;_0x51fc71=Math[_0x4a9ceb(0x442)](_0x51fc71),_0x3d1371=Math['round'](_0x3d1371),_0x5f8739=Math[_0x4a9ceb(0x442)](_0x5f8739),_0x402510=Math[_0x4a9ceb(0x442)](_0x402510),_0x4b519f=Math[_0x4a9ceb(0x442)](_0x4b519f),_0x52a881=Math[_0x4a9ceb(0x442)](_0x52a881),VisuMZ[_0x4a9ceb(0x9bb)][_0x4a9ceb(0x4cb)][_0x4a9ceb(0x4cc)](this,_0x4fe96c,_0x51fc71,_0x3d1371,_0x5f8739,_0x402510,_0x4b519f,_0x52a881,_0x52be51,_0x34ef88),this[_0x4a9ceb(0x3e9)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x5d7)]=Bitmap[_0x52da50(0x48a)][_0x52da50(0x1e6)],Bitmap['prototype'][_0x52da50(0x1e6)]=function(_0x538149,_0x554a08,_0x3e731e,_0x5cbfab){const _0x3b3ef3=_0x52da50;VisuMZ[_0x3b3ef3(0x9bb)][_0x3b3ef3(0x5d7)][_0x3b3ef3(0x4cc)](this,_0x538149,_0x554a08,_0x3e731e,_0x5cbfab),this['markCoreEngineModified']();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x7a7)]=Bitmap[_0x52da50(0x48a)]['fillRect'],Bitmap[_0x52da50(0x48a)][_0x52da50(0x9aa)]=function(_0x50dd93,_0x3f58c7,_0x5fa060,_0x38fba6,_0x2cddd9){const _0x33db23=_0x52da50;VisuMZ['CoreEngine'][_0x33db23(0x7a7)][_0x33db23(0x4cc)](this,_0x50dd93,_0x3f58c7,_0x5fa060,_0x38fba6,_0x2cddd9),this[_0x33db23(0x3e9)]();},VisuMZ['CoreEngine'][_0x52da50(0x292)]=Bitmap['prototype']['strokeRect'],Bitmap[_0x52da50(0x48a)][_0x52da50(0x847)]=function(_0x5a508e,_0x539cd7,_0x16ecaa,_0x2e8382,_0x4e90fa){const _0x5866ab=_0x52da50;VisuMZ[_0x5866ab(0x9bb)][_0x5866ab(0x292)]['call'](this,_0x5a508e,_0x539cd7,_0x16ecaa,_0x2e8382,_0x4e90fa),this['markCoreEngineModified']();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x852)]=Bitmap[_0x52da50(0x48a)][_0x52da50(0x726)],Bitmap[_0x52da50(0x48a)][_0x52da50(0x726)]=function(_0x5d877b,_0x542872,_0x2ac40a,_0x3b51ec,_0x4ab56d,_0x3d78b3,_0x31cad7){const _0x5199f6=_0x52da50;VisuMZ[_0x5199f6(0x9bb)]['Bitmap_gradientFillRect'][_0x5199f6(0x4cc)](this,_0x5d877b,_0x542872,_0x2ac40a,_0x3b51ec,_0x4ab56d,_0x3d78b3,_0x31cad7),this[_0x5199f6(0x3e9)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x841)]=Bitmap['prototype'][_0x52da50(0xa25)],Bitmap['prototype'][_0x52da50(0xa25)]=function(_0x346243,_0x1b6670,_0x11388e,_0x3415be){const _0x7cce5e=_0x52da50;_0x346243=Math[_0x7cce5e(0x442)](_0x346243),_0x1b6670=Math['round'](_0x1b6670),_0x11388e=Math['round'](_0x11388e),VisuMZ[_0x7cce5e(0x9bb)][_0x7cce5e(0x841)][_0x7cce5e(0x4cc)](this,_0x346243,_0x1b6670,_0x11388e,_0x3415be),this[_0x7cce5e(0x3e9)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x36a)]=Bitmap['prototype'][_0x52da50(0x545)],Bitmap[_0x52da50(0x48a)][_0x52da50(0x545)]=function(_0x3c262e){const _0x18a30f=_0x52da50;return Math[_0x18a30f(0x8ab)](VisuMZ[_0x18a30f(0x9bb)][_0x18a30f(0x36a)][_0x18a30f(0x4cc)](this,_0x3c262e));},VisuMZ['CoreEngine'][_0x52da50(0x45b)]=Bitmap[_0x52da50(0x48a)]['drawText'],Bitmap['prototype']['drawText']=function(_0x101b27,_0x5166fb,_0x419ed7,_0x5e80a1,_0x1b15c3,_0x22bee6){const _0x25622a=_0x52da50;_0x5166fb=Math[_0x25622a(0x442)](_0x5166fb),_0x419ed7=Math[_0x25622a(0x442)](_0x419ed7),_0x5e80a1=Math[_0x25622a(0x442)](_0x5e80a1),_0x1b15c3=Math[_0x25622a(0x442)](_0x1b15c3),VisuMZ[_0x25622a(0x9bb)]['Bitmap_drawText']['call'](this,_0x101b27,_0x5166fb,_0x419ed7,_0x5e80a1,_0x1b15c3,_0x22bee6),this[_0x25622a(0x3e9)]();},VisuMZ['CoreEngine']['Bitmap_drawTextOutline']=Bitmap[_0x52da50(0x48a)][_0x52da50(0x903)],Bitmap[_0x52da50(0x48a)][_0x52da50(0x903)]=function(_0x3aba4f,_0x1f0c18,_0x49d7ee,_0x4b3f0b){const _0x154080=_0x52da50;if(VisuMZ[_0x154080(0x9bb)][_0x154080(0x630)]['QoL'][_0x154080(0x578)]){if(_0x154080(0x41b)!=='hEhej')this['_drawTextShadow'](_0x3aba4f,_0x1f0c18,_0x49d7ee,_0x4b3f0b);else{const _0x205bd2=_0x154080(0x909);this[_0x154080(0x42d)]=this[_0x154080(0x42d)]||{};if(this[_0x154080(0x42d)][_0x205bd2])return this[_0x154080(0x42d)][_0x205bd2];const _0x5f56e4=_0x3fb9fe[_0x154080(0x9bb)][_0x154080(0x630)][_0x154080(0x338)][_0x154080(0x757)];return this[_0x154080(0x441)](_0x205bd2,_0x5f56e4);}}else VisuMZ[_0x154080(0x9bb)][_0x154080(0x6f8)][_0x154080(0x4cc)](this,_0x3aba4f,_0x1f0c18,_0x49d7ee,_0x4b3f0b);},Bitmap[_0x52da50(0x48a)][_0x52da50(0x4ff)]=function(_0x406068,_0x486812,_0x1a5eb7,_0x497971){const _0x1b0e00=_0x52da50,_0x287c1d=this[_0x1b0e00(0x5c5)];_0x287c1d[_0x1b0e00(0x8dc)]=this['outlineColor'],_0x287c1d[_0x1b0e00(0x44d)](_0x406068,_0x486812+0x2,_0x1a5eb7+0x2,_0x497971);},VisuMZ['CoreEngine']['Input_clear']=Input[_0x52da50(0x712)],Input[_0x52da50(0x712)]=function(){const _0x3b26b2=_0x52da50;VisuMZ['CoreEngine'][_0x3b26b2(0x657)][_0x3b26b2(0x4cc)](this),this[_0x3b26b2(0x33e)]=undefined,this[_0x3b26b2(0x761)]=undefined,this[_0x3b26b2(0x8c2)]=Input[_0x3b26b2(0x505)];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x635)]=Input[_0x52da50(0x6c5)],Input[_0x52da50(0x6c5)]=function(){const _0x39ef99=_0x52da50;VisuMZ[_0x39ef99(0x9bb)][_0x39ef99(0x635)][_0x39ef99(0x4cc)](this);if(this['_gamepadWait'])this[_0x39ef99(0x8c2)]--;},VisuMZ['CoreEngine'][_0x52da50(0x83b)]=Input[_0x52da50(0x5fb)],Input[_0x52da50(0x5fb)]=function(){const _0x34eb63=_0x52da50;if(this[_0x34eb63(0x8c2)])return;VisuMZ[_0x34eb63(0x9bb)][_0x34eb63(0x83b)]['call'](this);},VisuMZ['CoreEngine'][_0x52da50(0x769)]=Input[_0x52da50(0x934)],Input[_0x52da50(0x934)]=function(){const _0x3e234b=_0x52da50;VisuMZ['CoreEngine']['Input_setupEventHandlers'][_0x3e234b(0x4cc)](this),document[_0x3e234b(0x6c8)](_0x3e234b(0x516),this[_0x3e234b(0x74b)][_0x3e234b(0x4e6)](this));},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x457)]=Input[_0x52da50(0x33d)],Input['_onKeyDown']=function(_0x4e6f37){const _0xa45bb8=_0x52da50;this[_0xa45bb8(0x761)]=_0x4e6f37[_0xa45bb8(0x595)],VisuMZ[_0xa45bb8(0x9bb)][_0xa45bb8(0x457)][_0xa45bb8(0x4cc)](this,_0x4e6f37),this[_0xa45bb8(0x4d6)](null);},Input[_0x52da50(0x74b)]=function(_0x10b189){const _0x164642=_0x52da50;this[_0x164642(0x261)](_0x10b189);},Input[_0x52da50(0x261)]=function(_0x5f209a){const _0x2e5684=_0x52da50;this[_0x2e5684(0x761)]=_0x5f209a[_0x2e5684(0x595)];let _0x11c00a=String[_0x2e5684(0x1b0)](_0x5f209a['charCode']);if(this[_0x2e5684(0x33e)]===undefined){if(_0x2e5684(0x616)!==_0x2e5684(0xa1d))this[_0x2e5684(0x33e)]=_0x11c00a;else return _0x481879[_0x2e5684(0x9bb)][_0x2e5684(0x698)]();}else{if(_0x2e5684(0x2b3)===_0x2e5684(0x89a))return _0x6f333;else this[_0x2e5684(0x33e)]+=_0x11c00a;}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x46b)]=Input[_0x52da50(0x1fc)],Input[_0x52da50(0x1fc)]=function(_0x4614f4){const _0xffcc58=_0x52da50;if(_0x4614f4===0x8)return![];return VisuMZ[_0xffcc58(0x9bb)][_0xffcc58(0x46b)][_0xffcc58(0x4cc)](this,_0x4614f4);},Input[_0x52da50(0x327)]=function(_0x237691){const _0x39b373=_0x52da50;if(_0x237691[_0x39b373(0x2bb)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x237691['match'](/enter/i))return this[_0x39b373(0x761)]===0xd;if(_0x237691[_0x39b373(0x2bb)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x52da50(0x44c)]=function(){const _0xb17738=_0x52da50;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0xb17738(0x3c8)](this[_0xb17738(0x761)]);},Input[_0x52da50(0x8c1)]=function(){const _0x1487ad=_0x52da50;return[0x25,0x26,0x27,0x28][_0x1487ad(0x3c8)](this[_0x1487ad(0x761)]);},Input[_0x52da50(0x801)]=function(){const _0x528421=_0x52da50;if(navigator[_0x528421(0x1b4)]){const _0x8708cb=navigator[_0x528421(0x1b4)]();if(_0x8708cb){if(_0x528421(0x6ba)==='ALIFB')_0x4180d1=this[_0x528421(0x5dc)]();else for(const _0x15acac of _0x8708cb){if(_0x15acac&&_0x15acac[_0x528421(0x5f1)])return!![];}}}return![];},Input[_0x52da50(0x23e)]=function(){const _0x17c530=_0x52da50;if(navigator[_0x17c530(0x1b4)]){if(_0x17c530(0x898)===_0x17c530(0x3f9))this[_0x17c530(0x970)]=(_0x1b2bc1(_0x359504['$1'])||0x1)[_0x17c530(0x522)](0x1,0xa);else{const _0x2983c6=navigator['getGamepads']();if(_0x2983c6){if(_0x17c530(0x798)===_0x17c530(0x9e2)){const _0x551931=_0x2b342e[_0x17c530(0x269)]((_0x47d7c6-_0x2d3270)/_0xbb546e,_0x55db7d||_0x17c530(0x64a)),_0x56732c=_0xf09cf5[_0x17c530(0x269)]((_0x46b314-_0x5ed191+0x1)/_0x2b115a,_0x585d76||_0x17c530(0x64a)),_0x2c62bc=(_0x11fc5a-_0x2a4157*_0x551931)/(0x1-_0x551931);return _0x2c62bc+(_0x3758d3-_0x2c62bc)*_0x56732c;}else for(const _0x31719d of _0x2983c6){if(_0x31719d&&_0x31719d['connected']){if(_0x17c530(0xa03)!==_0x17c530(0x9ef)){if(this[_0x17c530(0x5b8)](_0x31719d))return!![];if(this[_0x17c530(0x5db)](_0x31719d))return!![];}else this[_0x17c530(0x2a5)](...arguments);}}}}}return![];},Input[_0x52da50(0x5b8)]=function(_0x35fc07){const _0x424ed7=_0x52da50,_0x5e1826=_0x35fc07[_0x424ed7(0x660)];for(let _0x2dad12=0x0;_0x2dad12<_0x5e1826[_0x424ed7(0x69a)];_0x2dad12++){if(_0x424ed7(0x284)===_0x424ed7(0x462))_0x1f5ffd+=_0x38ef8a;else{if(_0x5e1826[_0x2dad12][_0x424ed7(0x64e)])return!![];}}return![];},Input[_0x52da50(0x5db)]=function(_0x41dd1c){const _0x319b0d=_0x41dd1c['axes'],_0x34a3e8=0.5;if(_0x319b0d[0x0]<-_0x34a3e8)return!![];if(_0x319b0d[0x0]>_0x34a3e8)return!![];if(_0x319b0d[0x1]<-_0x34a3e8)return!![];if(_0x319b0d[0x1]>_0x34a3e8)return!![];return![];},Input[_0x52da50(0x6ae)]=function(){return this['_lastGamepad']||null;},Input[_0x52da50(0x4d6)]=function(_0x2db134){this['_lastGamepad']=_0x2db134;},VisuMZ['CoreEngine'][_0x52da50(0x9b1)]=Input['_updateGamepadState'],Input[_0x52da50(0x58d)]=function(_0x5cb537){const _0x12fe0c=_0x52da50;VisuMZ[_0x12fe0c(0x9bb)][_0x12fe0c(0x9b1)][_0x12fe0c(0x4cc)](this,_0x5cb537);if(this[_0x12fe0c(0x5b8)](_0x5cb537)||this['isGamepadAxisMoved'](_0x5cb537)){if(_0x12fe0c(0x282)!==_0x12fe0c(0x641))this[_0x12fe0c(0x4d6)](_0x5cb537);else{if(!_0x490222[_0x12fe0c(0x9bb)][_0x12fe0c(0x630)][_0x12fe0c(0x7cf)][_0x12fe0c(0x4d5)])return;if(this[_0x12fe0c(0x7c9)]===this[_0x12fe0c(0x752)]['x']&&this['_cacheScaleY']===this[_0x12fe0c(0x752)]['y'])return;this[_0x12fe0c(0x252)](),this[_0x12fe0c(0x7c9)]=this[_0x12fe0c(0x752)]['x'],this['_cacheScaleY']=this[_0x12fe0c(0x752)]['y'];}}},Input[_0x52da50(0x8ff)]=function(){const _0x5b48ea=_0x52da50;return this['_lastGamepad']?this[_0x5b48ea(0x850)]['id']:_0x5b48ea(0x9ba);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x3a2)]=Tilemap['prototype'][_0x52da50(0x54c)],Tilemap[_0x52da50(0x48a)]['_addShadow']=function(_0x3d86ae,_0x178c47,_0x4e9d4e,_0xc33027){const _0x4893ca=_0x52da50;if($gameMap&&$gameMap[_0x4893ca(0x782)]())return;VisuMZ[_0x4893ca(0x9bb)][_0x4893ca(0x3a2)][_0x4893ca(0x4cc)](this,_0x3d86ae,_0x178c47,_0x4e9d4e,_0xc33027);},Tilemap[_0x52da50(0x60c)]['prototype'][_0x52da50(0x190)]=function(){const _0x142898=_0x52da50;this[_0x142898(0x240)]();for(let _0x1cd729=0x0;_0x1cd729<Tilemap['Layer'][_0x142898(0x512)];_0x1cd729++){const _0xed8801=new PIXI[(_0x142898(0x627))]();_0xed8801['setSize'](0x800,0x800),VisuMZ['CoreEngine'][_0x142898(0x630)]['QoL'][_0x142898(0x1b2)]&&(_0x142898(0x587)===_0x142898(0x587)?_0xed8801[_0x142898(0x356)]=PIXI['SCALE_MODES'][_0x142898(0x2c0)]:(this[_0x142898(0x984)]['x']=this[_0x142898(0x453)]['x'],this[_0x142898(0x984)]['y']=this[_0x142898(0x453)]['y'])),this[_0x142898(0x9a8)][_0x142898(0x281)](_0xed8801);}},WindowLayer[_0x52da50(0x48a)][_0x52da50(0x470)]=function(){const _0x162a64=_0x52da50;if(SceneManager&&SceneManager[_0x162a64(0x1aa)]){if('AeiSZ'===_0x162a64(0x8e0)){var _0x1419bf=_0x1c5d7a(_0x5a8765['$1']);try{_0x19f6f6*=_0x486550(_0x1419bf);}catch(_0x5c22e7){if(_0x40c25d['isPlaytest']())_0x173023['log'](_0x5c22e7);}}else return SceneManager[_0x162a64(0x1aa)][_0x162a64(0x475)]();}else return!![];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x71a)]=WindowLayer[_0x52da50(0x48a)][_0x52da50(0x614)],WindowLayer['prototype'][_0x52da50(0x614)]=function render(_0x4912fd){const _0x804d3e=_0x52da50;this['isMaskingEnabled']()?VisuMZ[_0x804d3e(0x9bb)][_0x804d3e(0x71a)][_0x804d3e(0x4cc)](this,_0x4912fd):this[_0x804d3e(0x796)](_0x4912fd);},WindowLayer[_0x52da50(0x48a)][_0x52da50(0x796)]=function render(_0x2128cb){const _0x37c82b=_0x52da50;if(!this[_0x37c82b(0x425)])return;const _0x526852=new PIXI[(_0x37c82b(0x513))](),_0x3bcad5=_0x2128cb['gl'],_0xade806=this[_0x37c82b(0x9b2)][_0x37c82b(0x784)]();_0x2128cb[_0x37c82b(0x6f6)]['forceStencil'](),_0x526852[_0x37c82b(0x88e)]=this[_0x37c82b(0x88e)],_0x2128cb[_0x37c82b(0x193)][_0x37c82b(0x3d9)](),_0x3bcad5[_0x37c82b(0x502)](_0x3bcad5[_0x37c82b(0x808)]);while(_0xade806[_0x37c82b(0x69a)]>0x0){const _0x327d09=_0xade806['shift']();_0x327d09['_isWindow']&&_0x327d09[_0x37c82b(0x425)]&&_0x327d09[_0x37c82b(0x1e4)]>0x0&&(_0x3bcad5[_0x37c82b(0x872)](_0x3bcad5['EQUAL'],0x0,~0x0),_0x3bcad5[_0x37c82b(0x21a)](_0x3bcad5['KEEP'],_0x3bcad5['KEEP'],_0x3bcad5[_0x37c82b(0x4b4)]),_0x327d09[_0x37c82b(0x614)](_0x2128cb),_0x2128cb[_0x37c82b(0x193)][_0x37c82b(0x3d9)](),_0x526852[_0x37c82b(0x712)](),_0x3bcad5['stencilFunc'](_0x3bcad5[_0x37c82b(0x27d)],0x1,~0x0),_0x3bcad5[_0x37c82b(0x21a)](_0x3bcad5[_0x37c82b(0x8da)],_0x3bcad5[_0x37c82b(0x8da)],_0x3bcad5[_0x37c82b(0x8da)]),_0x3bcad5[_0x37c82b(0x41e)](_0x3bcad5['ZERO'],_0x3bcad5[_0x37c82b(0x781)]),_0x526852[_0x37c82b(0x614)](_0x2128cb),_0x2128cb[_0x37c82b(0x193)][_0x37c82b(0x3d9)](),_0x3bcad5[_0x37c82b(0x41e)](_0x3bcad5[_0x37c82b(0x781)],_0x3bcad5['ONE_MINUS_SRC_ALPHA']));}_0x3bcad5['disable'](_0x3bcad5['STENCIL_TEST']),_0x3bcad5[_0x37c82b(0x712)](_0x3bcad5[_0x37c82b(0x550)]),_0x3bcad5[_0x37c82b(0x2fa)](0x0),_0x2128cb[_0x37c82b(0x193)]['flush']();for(const _0x3b444b of this[_0x37c82b(0x9b2)]){!_0x3b444b[_0x37c82b(0x381)]&&_0x3b444b[_0x37c82b(0x425)]&&_0x3b444b['render'](_0x2128cb);}_0x2128cb[_0x37c82b(0x193)][_0x37c82b(0x3d9)]();},DataManager[_0x52da50(0x74e)]=function(_0x59d39b){const _0x19ce07=_0x52da50;return this['isItem'](_0x59d39b)&&_0x59d39b[_0x19ce07(0x676)]===0x2;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x446)]=DataManager[_0x52da50(0x842)],DataManager[_0x52da50(0x842)]=function(){const _0x832e5a=_0x52da50;VisuMZ['CoreEngine'][_0x832e5a(0x446)][_0x832e5a(0x4cc)](this),this[_0x832e5a(0x939)](),this[_0x832e5a(0xa0a)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x382082=_0x52da50;if($gameTemp[_0x382082(0x6c9)]()){if(_0x382082(0x693)===_0x382082(0x693)){const _0x23f999=VisuMZ[_0x382082(0x9bb)]['Settings'][_0x382082(0x7cf)]['NewGameCommonEvent'];if(_0x23f999>0x0)$gameTemp['reserveCommonEvent'](_0x23f999);}else return!![];}},DataManager['reserveNewGameCommonEvent']=function(){const _0x1a4701=_0x52da50,_0x2028e5=VisuMZ[_0x1a4701(0x9bb)][_0x1a4701(0x630)][_0x1a4701(0x7cf)][_0x1a4701(0x7f2)]||0x0;if(_0x2028e5>0x0)$gameTemp[_0x1a4701(0x4a1)](_0x2028e5);},DataManager['createTroopNote']=function(_0x78998f){const _0x365306=_0x52da50,_0x291c1f=$dataTroops[_0x78998f];if(!_0x291c1f)return'';let _0x1009ba='';_0x1009ba+=_0x291c1f[_0x365306(0x215)];for(const _0x1fe732 of _0x291c1f[_0x365306(0x72e)]){for(const _0x3acc49 of _0x1fe732[_0x365306(0x536)]){'YhFmz'===_0x365306(0x34d)?[0x6c,0x198][_0x365306(0x3fc)](_0x3acc49[_0x365306(0x2a4)])&&(_0x1009ba+='\x0a',_0x1009ba+=_0x3acc49[_0x365306(0x683)][0x0]):this[_0x365306(0x3f8)]();}}return _0x1009ba;};(VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x7cf)][_0x52da50(0x188)]??!![])&&($scene=null,VisuMZ[_0x52da50(0x9bb)]['Scene_Base_create']=Scene_Base[_0x52da50(0x48a)][_0x52da50(0x737)],Scene_Base[_0x52da50(0x48a)][_0x52da50(0x737)]=function(){const _0x4ef866=_0x52da50;VisuMZ['CoreEngine'][_0x4ef866(0x982)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x64f)]=Scene_Map['prototype'][_0x52da50(0x95a)],Scene_Map[_0x52da50(0x48a)][_0x52da50(0x95a)]=function(){const _0x379115=_0x52da50;VisuMZ['CoreEngine'][_0x379115(0x64f)]['call'](this),$spriteset=this[_0x379115(0x4b3)];},VisuMZ['CoreEngine'][_0x52da50(0x45a)]=Scene_Battle[_0x52da50(0x48a)]['createSpriteset'],Scene_Battle[_0x52da50(0x48a)][_0x52da50(0x95a)]=function(){const _0x394639=_0x52da50;VisuMZ[_0x394639(0x9bb)][_0x394639(0x45a)][_0x394639(0x4cc)](this),$spriteset=this[_0x394639(0x4b3)];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x778)]=Scene_Base[_0x52da50(0x48a)][_0x52da50(0x60e)],Scene_Base['prototype'][_0x52da50(0x60e)]=function(){const _0x4838af=_0x52da50;VisuMZ[_0x4838af(0x9bb)][_0x4838af(0x778)][_0x4838af(0x4cc)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x52da50(0x9bb)]['BattleManager_update']=BattleManager['update'],BattleManager[_0x52da50(0x6c5)]=function(_0x3fd638){const _0x360a57=_0x52da50;VisuMZ[_0x360a57(0x9bb)][_0x360a57(0x474)][_0x360a57(0x4cc)](this,_0x3fd638),$subject=this['_subject'],$targets=this[_0x360a57(0x9d5)],$target=this[_0x360a57(0x300)]||this[_0x360a57(0x9d5)][0x0];},$event=null,VisuMZ[_0x52da50(0x9bb)]['Game_Event_start']=Game_Event[_0x52da50(0x48a)][_0x52da50(0x8fa)],Game_Event[_0x52da50(0x48a)][_0x52da50(0x8fa)]=function(){const _0x1f5fc4=_0x52da50;VisuMZ[_0x1f5fc4(0x9bb)]['Game_Event_start'][_0x1f5fc4(0x4cc)](this),$event=this;},VisuMZ[_0x52da50(0x9bb)]['Scene_Map_update']=Scene_Map[_0x52da50(0x48a)]['update'],Scene_Map[_0x52da50(0x48a)]['update']=function(){const _0x3e010d=_0x52da50;VisuMZ['CoreEngine']['Scene_Map_update'][_0x3e010d(0x4cc)](this),$gameMap[_0x3e010d(0x603)]();},Game_Map[_0x52da50(0x48a)][_0x52da50(0x603)]=function(){const _0x131715=_0x52da50;!this[_0x131715(0x361)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x2104a4){const _0x1b1c25=_0x52da50;if($gameTemp)$gameTemp[_0x1b1c25(0x4a1)](_0x2104a4);},$onceParallel=function(_0x3ba825){const _0x2ad33e=_0x52da50;if(SceneManager['isSceneMap']())_0x2ad33e(0x323)===_0x2ad33e(0x795)?this[_0x2ad33e(0x669)](-0x1):$scene[_0x2ad33e(0x527)](_0x3ba825);else{if(SceneManager['isSceneBattle']()){if(Imported[_0x2ad33e(0x40e)])$scene['playOnceParallelInterpreter'](_0x3ba825);else{if($gameTemp&&$gameTemp['isPlaytest']()){if('oWdXq'!=='NnTrm')alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');else return 0x0;}}}else{if($gameTemp&&$gameTemp['isPlaytest']()){if(_0x2ad33e(0x711)!==_0x2ad33e(0x711))return!![];else alert(_0x2ad33e(0x217));}}}});;StorageManager[_0x52da50(0x499)]=function(_0xb3d288){return new Promise((_0x1853fd,_0x4b4eba)=>{const _0x4c7b4f=_0x3a86;try{const _0x3846ae=pako[_0x4c7b4f(0x64b)](_0xb3d288,{'to':'string','level':0x1});if(_0x3846ae['length']>=0xc350){}_0x1853fd(_0x3846ae);}catch(_0x310451){_0x4b4eba(_0x310451);}});},TextManager['stringKeyMap']=['','','','CANCEL','','',_0x52da50(0x4bd),'',_0x52da50(0x1c4),_0x52da50(0x3de),'','',_0x52da50(0x27b),'ENTER','ENTER_SPECIAL','',_0x52da50(0x2c7),_0x52da50(0x24c),'ALT','PAUSE','CAPSLOCK',_0x52da50(0x44a),_0x52da50(0x5ea),'JUNJA',_0x52da50(0x1cd),_0x52da50(0x347),'',_0x52da50(0x366),_0x52da50(0x25a),_0x52da50(0x2b5),'ACCEPT','MODECHANGE','SPACE',_0x52da50(0x183),'PGDN',_0x52da50(0x65a),_0x52da50(0x245),_0x52da50(0x56d),'UP','RIGHT',_0x52da50(0x36d),_0x52da50(0x346),_0x52da50(0x1f2),_0x52da50(0x65e),'PRINTSCREEN',_0x52da50(0x687),'DELETE','','0','1','2','3','4','5','6','7','8','9',_0x52da50(0x82b),'SEMICOLON',_0x52da50(0x4ca),'EQUALS',_0x52da50(0x62c),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x52da50(0x4d9),'','CONTEXT_MENU','',_0x52da50(0x29d),_0x52da50(0x1f7),'NUMPAD1',_0x52da50(0x335),_0x52da50(0x236),_0x52da50(0x25f),_0x52da50(0x5e7),'NUMPAD6','NUMPAD7',_0x52da50(0x83c),_0x52da50(0x3e3),'MULTIPLY',_0x52da50(0x62f),'SEPARATOR',_0x52da50(0x728),_0x52da50(0x55a),_0x52da50(0x464),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x52da50(0x460),_0x52da50(0x7b3),'F13',_0x52da50(0x49a),_0x52da50(0x6c7),'F16',_0x52da50(0x6a0),'F18',_0x52da50(0x7c8),_0x52da50(0x93e),'F21',_0x52da50(0x291),'F23',_0x52da50(0x286),'','','','','','','','','NUM_LOCK',_0x52da50(0x8d5),_0x52da50(0x95c),_0x52da50(0x91c),_0x52da50(0xa1f),_0x52da50(0x409),_0x52da50(0x50e),'','','','','','','','','','CIRCUMFLEX',_0x52da50(0x264),_0x52da50(0x9c4),_0x52da50(0x20e),'DOLLAR','PERCENT',_0x52da50(0x1b6),_0x52da50(0x8bd),_0x52da50(0x206),_0x52da50(0x654),_0x52da50(0x5b7),'PLUS','PIPE',_0x52da50(0x24b),_0x52da50(0x77b),'CLOSE_CURLY_BRACKET',_0x52da50(0x37a),'','','','',_0x52da50(0x9dd),'VOLUME_DOWN','VOLUME_UP','','','SEMICOLON','EQUALS',_0x52da50(0x7de),_0x52da50(0x759),_0x52da50(0x2cd),_0x52da50(0x459),_0x52da50(0x58a),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x52da50(0x61a),_0x52da50(0x47d),_0x52da50(0x7a9),_0x52da50(0x2de),'','META',_0x52da50(0x5d0),'',_0x52da50(0x4cf),_0x52da50(0x535),'',_0x52da50(0x4dd),'','','WIN_OEM_RESET','WIN_OEM_JUMP',_0x52da50(0x63d),_0x52da50(0xa0f),_0x52da50(0x3ea),_0x52da50(0x5e1),_0x52da50(0x4ed),_0x52da50(0x65d),_0x52da50(0x6aa),'WIN_OEM_COPY',_0x52da50(0x670),_0x52da50(0x54f),_0x52da50(0x564),_0x52da50(0x39a),'CRSEL',_0x52da50(0x75b),'EREOF',_0x52da50(0x244),_0x52da50(0x43d),'','PA1','WIN_OEM_CLEAR',''],TextManager[_0x52da50(0x4e4)]=VisuMZ['CoreEngine'][_0x52da50(0x630)]['ButtonAssist'][_0x52da50(0x1dd)],TextManager[_0x52da50(0x9c7)]=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x30b)][_0x52da50(0x6b0)],TextManager['buttonAssistSwitch']=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x30b)][_0x52da50(0x3ef)],VisuMZ[_0x52da50(0x9bb)]['TextManager_param']=TextManager[_0x52da50(0x3ec)],TextManager['param']=function(_0x1d5400){const _0x331113=_0x52da50;return typeof _0x1d5400===_0x331113(0x87b)?VisuMZ['CoreEngine'][_0x331113(0x733)]['call'](this,_0x1d5400):this['paramName'](_0x1d5400);},TextManager[_0x52da50(0x294)]=function(_0x2ddb3a){const _0x30b98f=_0x52da50;_0x2ddb3a=String(_0x2ddb3a||'')[_0x30b98f(0x5d6)]();const _0xbde3c9=VisuMZ[_0x30b98f(0x9bb)][_0x30b98f(0x630)]['Param'];if(_0x2ddb3a===_0x30b98f(0x554))return $dataSystem[_0x30b98f(0x1e2)][_0x30b98f(0x999)][0x0];if(_0x2ddb3a==='MAXMP')return $dataSystem['terms'][_0x30b98f(0x999)][0x1];if(_0x2ddb3a===_0x30b98f(0x1af))return $dataSystem[_0x30b98f(0x1e2)][_0x30b98f(0x999)][0x2];if(_0x2ddb3a===_0x30b98f(0x232))return $dataSystem[_0x30b98f(0x1e2)]['params'][0x3];if(_0x2ddb3a===_0x30b98f(0x525))return $dataSystem[_0x30b98f(0x1e2)]['params'][0x4];if(_0x2ddb3a===_0x30b98f(0x8b6))return $dataSystem[_0x30b98f(0x1e2)]['params'][0x5];if(_0x2ddb3a===_0x30b98f(0x682))return $dataSystem[_0x30b98f(0x1e2)][_0x30b98f(0x999)][0x6];if(_0x2ddb3a===_0x30b98f(0x376))return $dataSystem[_0x30b98f(0x1e2)]['params'][0x7];if(_0x2ddb3a===_0x30b98f(0x771))return _0xbde3c9[_0x30b98f(0x7bf)];if(_0x2ddb3a===_0x30b98f(0x826))return _0xbde3c9['XParamVocab1'];if(_0x2ddb3a===_0x30b98f(0x5a9))return _0xbde3c9[_0x30b98f(0x3ae)];if(_0x2ddb3a===_0x30b98f(0x74c))return _0xbde3c9[_0x30b98f(0x3cc)];if(_0x2ddb3a===_0x30b98f(0x8a8))return _0xbde3c9[_0x30b98f(0x59c)];if(_0x2ddb3a==='MRF')return _0xbde3c9[_0x30b98f(0x380)];if(_0x2ddb3a===_0x30b98f(0x211))return _0xbde3c9[_0x30b98f(0x80f)];if(_0x2ddb3a==='HRG')return _0xbde3c9[_0x30b98f(0x331)];if(_0x2ddb3a==='MRG')return _0xbde3c9[_0x30b98f(0x3ed)];if(_0x2ddb3a===_0x30b98f(0x305))return _0xbde3c9[_0x30b98f(0x435)];if(_0x2ddb3a===_0x30b98f(0xa1e))return _0xbde3c9['SParamVocab0'];if(_0x2ddb3a==='GRD')return _0xbde3c9[_0x30b98f(0x6b4)];if(_0x2ddb3a==='REC')return _0xbde3c9[_0x30b98f(0x321)];if(_0x2ddb3a==='PHA')return _0xbde3c9['SParamVocab3'];if(_0x2ddb3a===_0x30b98f(0x598))return _0xbde3c9[_0x30b98f(0x8fd)];if(_0x2ddb3a===_0x30b98f(0x6d9))return _0xbde3c9[_0x30b98f(0x64c)];if(_0x2ddb3a===_0x30b98f(0x3f0))return _0xbde3c9[_0x30b98f(0x6d4)];if(_0x2ddb3a===_0x30b98f(0x764))return _0xbde3c9[_0x30b98f(0x280)];if(_0x2ddb3a===_0x30b98f(0x3a6))return _0xbde3c9['SParamVocab8'];if(_0x2ddb3a===_0x30b98f(0x388))return _0xbde3c9[_0x30b98f(0x664)];if(VisuMZ[_0x30b98f(0x9bb)][_0x30b98f(0x430)][_0x2ddb3a])return'VBtEh'!=='VBtEh'?this[_0x30b98f(0x254)]&&this['_skillTypeWindow'][_0x30b98f(0x6f4)]:VisuMZ[_0x30b98f(0x9bb)][_0x30b98f(0x430)][_0x2ddb3a];return'';},TextManager['getInputButtonString']=function(_0x1850cd){const _0x100ec9=_0x52da50,_0x13d611=Input[_0x100ec9(0x8ff)]();return _0x13d611===_0x100ec9(0x9ba)?this[_0x100ec9(0x64d)](_0x1850cd):this[_0x100ec9(0x57b)](_0x13d611,_0x1850cd);},TextManager[_0x52da50(0x64d)]=function(_0x5de47f){const _0x21b2ad=_0x52da50;if(_0x5de47f===_0x21b2ad(0x36f))_0x5de47f=_0x21b2ad(0x6ec);if(_0x5de47f===_0x21b2ad(0x500))_0x5de47f=_0x21b2ad(0x6ec);let _0x3ae80b=[];for(let _0x18e27f in Input[_0x21b2ad(0x730)]){if(_0x21b2ad(0x81a)===_0x21b2ad(0x49d))return _0x59cb10['CoreEngine'][_0x21b2ad(0x630)]['MenuBg'][_0x55b613]||_0x506c88[_0x21b2ad(0x9bb)][_0x21b2ad(0x630)][_0x21b2ad(0x533)][_0x21b2ad(0x820)];else{_0x18e27f=Number(_0x18e27f);if(_0x18e27f>=0x60&&_0x18e27f<=0x69)continue;if([0x12,0x20][_0x21b2ad(0x3fc)](_0x18e27f))continue;_0x5de47f===Input[_0x21b2ad(0x730)][_0x18e27f]&&_0x3ae80b['push'](_0x18e27f);}}for(let _0x3074a7=0x0;_0x3074a7<_0x3ae80b[_0x21b2ad(0x69a)];_0x3074a7++){_0x3ae80b[_0x3074a7]=TextManager[_0x21b2ad(0x78f)][_0x3ae80b[_0x3074a7]];}return this[_0x21b2ad(0x37e)](_0x3ae80b);},TextManager[_0x52da50(0x37e)]=function(_0x2347f0){const _0x55eafb=_0x52da50,_0x5c3e72=VisuMZ['CoreEngine'][_0x55eafb(0x630)]['ButtonAssist'],_0x45e7e2=_0x5c3e72[_0x55eafb(0x3aa)],_0x4fc6f4=_0x2347f0['pop'](),_0x5ec1ad='Key%1'['format'](_0x4fc6f4);return _0x5c3e72[_0x5ec1ad]?_0x5c3e72[_0x5ec1ad]:_0x45e7e2[_0x55eafb(0x8de)](_0x4fc6f4);},TextManager[_0x52da50(0x7bd)]=function(_0x459a0d,_0x3e60ee){const _0x580296=_0x52da50,_0x9565e4=VisuMZ['CoreEngine']['Settings'][_0x580296(0x30b)],_0x3c5df6=_0x9565e4[_0x580296(0x278)],_0x315b81=this[_0x580296(0x905)](_0x459a0d),_0x538985=this[_0x580296(0x905)](_0x3e60ee);return _0x3c5df6[_0x580296(0x8de)](_0x315b81,_0x538985);},TextManager['getControllerInputButtonString']=function(_0x50778f,_0x11bec9){const _0xa704bd=_0x52da50,_0x80ea8e=_0x50778f[_0xa704bd(0x523)]()[_0xa704bd(0x748)](),_0x39e7bb=VisuMZ[_0xa704bd(0x9bb)]['ControllerButtons'][_0x80ea8e];if(!_0x39e7bb)return this[_0xa704bd(0x2af)](_0x50778f,_0x11bec9);return _0x39e7bb[_0x11bec9]||this[_0xa704bd(0x64d)](_0x50778f,_0x11bec9);},TextManager[_0x52da50(0x2af)]=function(_0x50575f,_0x172d51){const _0x300d86=_0x52da50,_0x17b220=_0x50575f[_0x300d86(0x523)]()['trim']();for(const _0x549d0f in VisuMZ[_0x300d86(0x9bb)][_0x300d86(0x5ba)]){if(_0x300d86(0x7da)!==_0x300d86(0x7da)){var _0x5411d7=_0x5de51c(_0x42d416['$1']);try{_0x153dd6+=_0x48b397(_0x5411d7);}catch(_0x36fd95){if(_0x5e55a5[_0x300d86(0x6c9)]())_0x555f83[_0x300d86(0x1db)](_0x36fd95);}}else{if(_0x17b220['includes'](_0x549d0f)){const _0x10e361=VisuMZ[_0x300d86(0x9bb)][_0x300d86(0x5ba)][_0x549d0f],_0x2713b5=VisuMZ['CoreEngine'][_0x300d86(0x5bf)][_0x10e361];return _0x2713b5[_0x172d51]||this[_0x300d86(0x64d)](_0x172d51);}}}return this[_0x300d86(0x64d)](_0x172d51);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x203)]=ColorManager[_0x52da50(0x41d)],ColorManager[_0x52da50(0x41d)]=function(){const _0x85029b=_0x52da50;VisuMZ[_0x85029b(0x9bb)][_0x85029b(0x203)][_0x85029b(0x4cc)](this),this[_0x85029b(0x42d)]=this['_colorCache']||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x42aa75,_0x4a3e44){const _0x443d8d=_0x52da50;return _0x4a3e44=String(_0x4a3e44),this[_0x443d8d(0x42d)]=this[_0x443d8d(0x42d)]||{},_0x4a3e44[_0x443d8d(0x2bb)](/#(.*)/i)?this['_colorCache'][_0x42aa75]='#%1'['format'](String(RegExp['$1'])):this[_0x443d8d(0x42d)][_0x42aa75]=this[_0x443d8d(0x534)](Number(_0x4a3e44)),this[_0x443d8d(0x42d)][_0x42aa75];},ColorManager[_0x52da50(0x8be)]=function(_0x439528){const _0x17490c=_0x52da50;return _0x439528=String(_0x439528),_0x439528[_0x17490c(0x2bb)](/#(.*)/i)?_0x17490c(0x63c)['format'](String(RegExp['$1'])):_0x17490c(0x62e)===_0x17490c(0x34a)?_0x4dd2b8(_0x5b1ace['$1']):this[_0x17490c(0x534)](Number(_0x439528));},ColorManager[_0x52da50(0x811)]=function(){this['_colorCache']={};},ColorManager['normalColor']=function(){const _0x5bb471=_0x52da50,_0x504e5d=_0x5bb471(0x909);this[_0x5bb471(0x42d)]=this[_0x5bb471(0x42d)]||{};if(this[_0x5bb471(0x42d)][_0x504e5d])return this['_colorCache'][_0x504e5d];const _0x1412ed=VisuMZ[_0x5bb471(0x9bb)][_0x5bb471(0x630)][_0x5bb471(0x338)][_0x5bb471(0x757)];return this['getColorDataFromPluginParameters'](_0x504e5d,_0x1412ed);},ColorManager[_0x52da50(0x971)]=function(){const _0x3e506a=_0x52da50,_0x410165=_0x3e506a(0x480);this[_0x3e506a(0x42d)]=this[_0x3e506a(0x42d)]||{};if(this[_0x3e506a(0x42d)][_0x410165])return this['_colorCache'][_0x410165];const _0x1b294b=VisuMZ[_0x3e506a(0x9bb)][_0x3e506a(0x630)]['Color'][_0x3e506a(0x936)];return this[_0x3e506a(0x441)](_0x410165,_0x1b294b);},ColorManager['crisisColor']=function(){const _0x47c66c=_0x52da50,_0x50319e=_0x47c66c(0x822);this['_colorCache']=this['_colorCache']||{};if(this[_0x47c66c(0x42d)][_0x50319e])return this[_0x47c66c(0x42d)][_0x50319e];const _0x64a6e0=VisuMZ[_0x47c66c(0x9bb)][_0x47c66c(0x630)][_0x47c66c(0x338)][_0x47c66c(0x6e7)];return this[_0x47c66c(0x441)](_0x50319e,_0x64a6e0);},ColorManager[_0x52da50(0x9a3)]=function(){const _0x527906=_0x52da50,_0x2f5bf7=_0x527906(0x229);this[_0x527906(0x42d)]=this[_0x527906(0x42d)]||{};if(this['_colorCache'][_0x2f5bf7])return this[_0x527906(0x42d)][_0x2f5bf7];const _0x3e22c1=VisuMZ[_0x527906(0x9bb)][_0x527906(0x630)]['Color'][_0x527906(0x310)];return this[_0x527906(0x441)](_0x2f5bf7,_0x3e22c1);},ColorManager[_0x52da50(0x7d6)]=function(){const _0x317e08=_0x52da50,_0x3b44fa='_stored_gaugeBackColor';this[_0x317e08(0x42d)]=this[_0x317e08(0x42d)]||{};if(this['_colorCache'][_0x3b44fa])return this['_colorCache'][_0x3b44fa];const _0x100208=VisuMZ[_0x317e08(0x9bb)][_0x317e08(0x630)][_0x317e08(0x338)]['ColorGaugeBack'];return this[_0x317e08(0x441)](_0x3b44fa,_0x100208);},ColorManager['hpGaugeColor1']=function(){const _0x26c0a0=_0x52da50,_0x3967f4=_0x26c0a0(0x824);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x3967f4])return this[_0x26c0a0(0x42d)][_0x3967f4];const _0x317900=VisuMZ[_0x26c0a0(0x9bb)]['Settings']['Color'][_0x26c0a0(0x51f)];return this[_0x26c0a0(0x441)](_0x3967f4,_0x317900);},ColorManager[_0x52da50(0x990)]=function(){const _0x16a4d8=_0x52da50,_0x1cd69e='_stored_hpGaugeColor2';this[_0x16a4d8(0x42d)]=this[_0x16a4d8(0x42d)]||{};if(this[_0x16a4d8(0x42d)][_0x1cd69e])return this[_0x16a4d8(0x42d)][_0x1cd69e];const _0x3d1b75=VisuMZ[_0x16a4d8(0x9bb)][_0x16a4d8(0x630)]['Color'][_0x16a4d8(0xa07)];return this['getColorDataFromPluginParameters'](_0x1cd69e,_0x3d1b75);},ColorManager[_0x52da50(0x4ae)]=function(){const _0x59b1fe=_0x52da50,_0x251312=_0x59b1fe(0x855);this[_0x59b1fe(0x42d)]=this[_0x59b1fe(0x42d)]||{};if(this['_colorCache'][_0x251312])return this[_0x59b1fe(0x42d)][_0x251312];const _0x145b59=VisuMZ[_0x59b1fe(0x9bb)]['Settings']['Color'][_0x59b1fe(0x69f)];return this[_0x59b1fe(0x441)](_0x251312,_0x145b59);},ColorManager['mpGaugeColor2']=function(){const _0x3e2716=_0x52da50,_0x597b17=_0x3e2716(0x91f);this[_0x3e2716(0x42d)]=this['_colorCache']||{};if(this[_0x3e2716(0x42d)][_0x597b17])return this[_0x3e2716(0x42d)][_0x597b17];const _0x14a486=VisuMZ['CoreEngine'][_0x3e2716(0x630)]['Color']['ColorMPGauge2'];return this['getColorDataFromPluginParameters'](_0x597b17,_0x14a486);},ColorManager[_0x52da50(0x9fa)]=function(){const _0xfc8a2f=_0x52da50,_0x3f71ad=_0xfc8a2f(0x8f2);this[_0xfc8a2f(0x42d)]=this['_colorCache']||{};if(this['_colorCache'][_0x3f71ad])return this[_0xfc8a2f(0x42d)][_0x3f71ad];const _0x4f707e=VisuMZ[_0xfc8a2f(0x9bb)][_0xfc8a2f(0x630)][_0xfc8a2f(0x338)][_0xfc8a2f(0x988)];return this[_0xfc8a2f(0x441)](_0x3f71ad,_0x4f707e);},ColorManager[_0x52da50(0x920)]=function(){const _0x341da1=_0x52da50,_0x8d9742=_0x341da1(0x491);this[_0x341da1(0x42d)]=this['_colorCache']||{};if(this[_0x341da1(0x42d)][_0x8d9742])return this[_0x341da1(0x42d)][_0x8d9742];const _0xa640=VisuMZ[_0x341da1(0x9bb)]['Settings'][_0x341da1(0x338)][_0x341da1(0x44f)];return this[_0x341da1(0x441)](_0x8d9742,_0xa640);},ColorManager['powerDownColor']=function(){const _0x301102=_0x52da50,_0x1d303c='_stored_powerDownColor';this[_0x301102(0x42d)]=this[_0x301102(0x42d)]||{};if(this[_0x301102(0x42d)][_0x1d303c])return this[_0x301102(0x42d)][_0x1d303c];const _0x4130e8=VisuMZ[_0x301102(0x9bb)]['Settings']['Color'][_0x301102(0x858)];return this[_0x301102(0x441)](_0x1d303c,_0x4130e8);},ColorManager[_0x52da50(0x35c)]=function(){const _0x4a531b=_0x52da50,_0x410d9b=_0x4a531b(0x793);this[_0x4a531b(0x42d)]=this[_0x4a531b(0x42d)]||{};if(this['_colorCache'][_0x410d9b])return this[_0x4a531b(0x42d)][_0x410d9b];const _0x1a1b26=VisuMZ[_0x4a531b(0x9bb)]['Settings'][_0x4a531b(0x338)][_0x4a531b(0x919)];return this[_0x4a531b(0x441)](_0x410d9b,_0x1a1b26);},ColorManager[_0x52da50(0x4d8)]=function(){const _0x3c2957=_0x52da50,_0x332db6=_0x3c2957(0x8ca);this['_colorCache']=this[_0x3c2957(0x42d)]||{};if(this[_0x3c2957(0x42d)][_0x332db6])return this[_0x3c2957(0x42d)][_0x332db6];const _0xdf6ad2=VisuMZ[_0x3c2957(0x9bb)][_0x3c2957(0x630)][_0x3c2957(0x338)][_0x3c2957(0x5f9)];return this[_0x3c2957(0x441)](_0x332db6,_0xdf6ad2);},ColorManager[_0x52da50(0x3a9)]=function(){const _0x34dca8=_0x52da50,_0x5932e7=_0x34dca8(0x9ad);this[_0x34dca8(0x42d)]=this[_0x34dca8(0x42d)]||{};if(this[_0x34dca8(0x42d)][_0x5932e7])return this[_0x34dca8(0x42d)][_0x5932e7];const _0x41f1cb=VisuMZ[_0x34dca8(0x9bb)][_0x34dca8(0x630)][_0x34dca8(0x338)][_0x34dca8(0x1bf)];return this['getColorDataFromPluginParameters'](_0x5932e7,_0x41f1cb);},ColorManager[_0x52da50(0x807)]=function(){const _0x3d0146=_0x52da50,_0xae3256=_0x3d0146(0x495);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0xae3256])return this[_0x3d0146(0x42d)][_0xae3256];const _0x334398=VisuMZ[_0x3d0146(0x9bb)][_0x3d0146(0x630)]['Color'][_0x3d0146(0x9ab)];return this[_0x3d0146(0x441)](_0xae3256,_0x334398);},ColorManager[_0x52da50(0x1a3)]=function(){const _0x4d998a=_0x52da50,_0x25770d='_stored_tpCostColor';this[_0x4d998a(0x42d)]=this[_0x4d998a(0x42d)]||{};if(this[_0x4d998a(0x42d)][_0x25770d])return this[_0x4d998a(0x42d)][_0x25770d];const _0x579681=VisuMZ[_0x4d998a(0x9bb)][_0x4d998a(0x630)]['Color']['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x25770d,_0x579681);},ColorManager[_0x52da50(0x529)]=function(){const _0x55c780=_0x52da50,_0x47c6d2='_stored_pendingColor';this[_0x55c780(0x42d)]=this[_0x55c780(0x42d)]||{};if(this['_colorCache'][_0x47c6d2])return this[_0x55c780(0x42d)][_0x47c6d2];const _0x14999d=VisuMZ[_0x55c780(0x9bb)]['Settings'][_0x55c780(0x338)][_0x55c780(0x2e2)];return this[_0x55c780(0x441)](_0x47c6d2,_0x14999d);},ColorManager[_0x52da50(0x63f)]=function(){const _0xfedfa1=_0x52da50,_0x36f2b4=_0xfedfa1(0x960);this[_0xfedfa1(0x42d)]=this[_0xfedfa1(0x42d)]||{};if(this[_0xfedfa1(0x42d)][_0x36f2b4])return this[_0xfedfa1(0x42d)][_0x36f2b4];const _0xf6d17a=VisuMZ[_0xfedfa1(0x9bb)][_0xfedfa1(0x630)][_0xfedfa1(0x338)][_0xfedfa1(0x585)];return this[_0xfedfa1(0x441)](_0x36f2b4,_0xf6d17a);},ColorManager[_0x52da50(0x7c3)]=function(){const _0x2e041e=_0x52da50,_0x4dc067=_0x2e041e(0x266);this[_0x2e041e(0x42d)]=this[_0x2e041e(0x42d)]||{};if(this[_0x2e041e(0x42d)][_0x4dc067])return this['_colorCache'][_0x4dc067];const _0x277140=VisuMZ[_0x2e041e(0x9bb)][_0x2e041e(0x630)][_0x2e041e(0x338)][_0x2e041e(0x6cb)];return this[_0x2e041e(0x441)](_0x4dc067,_0x277140);},ColorManager[_0x52da50(0x3b7)]=function(){const _0x18bee2=_0x52da50,_0x3bbc9f='_stored_maxLvGaugeColor1';this[_0x18bee2(0x42d)]=this[_0x18bee2(0x42d)]||{};if(this[_0x18bee2(0x42d)][_0x3bbc9f])return this[_0x18bee2(0x42d)][_0x3bbc9f];const _0x4e5123=VisuMZ[_0x18bee2(0x9bb)]['Settings']['Color'][_0x18bee2(0x828)];return this[_0x18bee2(0x441)](_0x3bbc9f,_0x4e5123);},ColorManager[_0x52da50(0x2ad)]=function(){const _0x241038=_0x52da50,_0x3294b6=_0x241038(0x2b1);this[_0x241038(0x42d)]=this[_0x241038(0x42d)]||{};if(this[_0x241038(0x42d)][_0x3294b6])return this[_0x241038(0x42d)][_0x3294b6];const _0x3c1120=VisuMZ[_0x241038(0x9bb)][_0x241038(0x630)][_0x241038(0x338)]['ColorMaxLvGauge2'];return this[_0x241038(0x441)](_0x3294b6,_0x3c1120);},ColorManager[_0x52da50(0x253)]=function(_0x23ff60){const _0x5a01eb=_0x52da50;return VisuMZ[_0x5a01eb(0x9bb)][_0x5a01eb(0x630)]['Color'][_0x5a01eb(0x3dc)][_0x5a01eb(0x4cc)](this,_0x23ff60);},ColorManager[_0x52da50(0x8f9)]=function(_0x3c24e4){const _0x135902=_0x52da50;return VisuMZ[_0x135902(0x9bb)]['Settings']['Color'][_0x135902(0xa19)][_0x135902(0x4cc)](this,_0x3c24e4);},ColorManager[_0x52da50(0x308)]=function(_0x13abe2){const _0x3a4ff6=_0x52da50;return VisuMZ['CoreEngine'][_0x3a4ff6(0x630)][_0x3a4ff6(0x338)]['ActorTPColor']['call'](this,_0x13abe2);},ColorManager[_0x52da50(0x817)]=function(_0x55d340){const _0x2f017a=_0x52da50;return VisuMZ[_0x2f017a(0x9bb)][_0x2f017a(0x630)]['Color']['ParamChange'][_0x2f017a(0x4cc)](this,_0x55d340);},ColorManager['damageColor']=function(_0x151945){const _0x1f0dac=_0x52da50;return VisuMZ[_0x1f0dac(0x9bb)]['Settings'][_0x1f0dac(0x338)][_0x1f0dac(0x548)]['call'](this,_0x151945);},ColorManager['outlineColor']=function(){const _0x9f18ed=_0x52da50;return VisuMZ[_0x9f18ed(0x9bb)][_0x9f18ed(0x630)][_0x9f18ed(0x338)]['OutlineColor'];},ColorManager[_0x52da50(0x611)]=function(){const _0x5b8afe=_0x52da50;return VisuMZ[_0x5b8afe(0x9bb)]['Settings']['Color']['OutlineColorDmg']||'rgba(0,\x200,\x200,\x200.7)';},ColorManager['outlineColorGauge']=function(){const _0x12b74d=_0x52da50;return VisuMZ['CoreEngine'][_0x12b74d(0x630)][_0x12b74d(0x338)]['OutlineColorGauge']||_0x12b74d(0x94f);},ColorManager[_0x52da50(0x1df)]=function(){const _0x1f0057=_0x52da50;return VisuMZ[_0x1f0057(0x9bb)][_0x1f0057(0x630)][_0x1f0057(0x338)][_0x1f0057(0x439)];},ColorManager[_0x52da50(0x39d)]=function(){const _0xfb9732=_0x52da50;return VisuMZ[_0xfb9732(0x9bb)][_0xfb9732(0x630)]['Color'][_0xfb9732(0x707)];},ColorManager[_0x52da50(0x463)]=function(){const _0xb96c88=_0x52da50;return VisuMZ[_0xb96c88(0x9bb)][_0xb96c88(0x630)][_0xb96c88(0x338)][_0xb96c88(0x4c1)];},ColorManager[_0x52da50(0x6cd)]=function(){const _0x8f2b99=_0x52da50;return VisuMZ['CoreEngine'][_0x8f2b99(0x630)][_0x8f2b99(0x338)]['ItemBackColor2'];},SceneManager[_0x52da50(0x7ee)]=[],SceneManager[_0x52da50(0x249)]=function(){const _0x2ae7f5=_0x52da50;return this['_scene']&&this[_0x2ae7f5(0x1aa)][_0x2ae7f5(0x2ba)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x45523c=_0x52da50;return this[_0x45523c(0x1aa)]&&this['_scene'][_0x45523c(0x2ba)]===Scene_Map;},SceneManager[_0x52da50(0x9e7)]=function(){const _0x5ee70e=_0x52da50;return this['_scene']&&this[_0x5ee70e(0x1aa)]instanceof Scene_Map;},VisuMZ[_0x52da50(0x9bb)]['SceneManager_initialize']=SceneManager['initialize'],SceneManager[_0x52da50(0x2a5)]=function(){const _0x4fe8d8=_0x52da50;VisuMZ[_0x4fe8d8(0x9bb)][_0x4fe8d8(0x754)][_0x4fe8d8(0x4cc)](this),this[_0x4fe8d8(0x859)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x566)]=SceneManager[_0x52da50(0x88d)],SceneManager[_0x52da50(0x88d)]=function(_0x4162f2){const _0x47c33d=_0x52da50;if($gameTemp)this[_0x47c33d(0x723)](_0x4162f2);VisuMZ['CoreEngine'][_0x47c33d(0x566)][_0x47c33d(0x4cc)](this,_0x4162f2);},SceneManager[_0x52da50(0x723)]=function(_0x200eb3){const _0x59ebb0=_0x52da50;if(!_0x200eb3[_0x59ebb0(0x557)]&&!_0x200eb3[_0x59ebb0(0x43b)]){if(_0x59ebb0(0x973)===_0x59ebb0(0x973))switch(_0x200eb3[_0x59ebb0(0x595)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x59ebb0(0x97c)]();break;case 0x76:if(Input[_0x59ebb0(0x71b)](_0x59ebb0(0x493))||Input[_0x59ebb0(0x71b)](_0x59ebb0(0x6d7)))return;this[_0x59ebb0(0x248)]();break;}else{const _0x512719=_0x38b5bd[_0x4d3fe1];if(!_0x512719)return;const _0x356145=new _0x40b40c();this['addOnceParallelInterpreter'](_0x356145),_0x356145[_0x59ebb0(0x848)](_0x5d54e9);}}},SceneManager[_0x52da50(0x97c)]=function(){const _0x92ba47=_0x52da50;if($gameTemp[_0x92ba47(0x6c9)]()&&VisuMZ[_0x92ba47(0x9bb)]['Settings'][_0x92ba47(0x7cf)][_0x92ba47(0x1ba)]){if(_0x92ba47(0x268)!==_0x92ba47(0x528)){if(ConfigManager[_0x92ba47(0x416)]!==0x0)ConfigManager[_0x92ba47(0x3be)]=0x0,ConfigManager['bgsVolume']=0x0,ConfigManager[_0x92ba47(0x9a7)]=0x0,ConfigManager['seVolume']=0x0;else{if(_0x92ba47(0x4a3)!=='wtlwE'){const _0x4dec39=this[_0x92ba47(0x46c)](_0x2fbe63),_0x3e49ea=new(_0x4dec39?_0x51e7ac:_0xe28f2a)(),_0xe37bd1=this[_0x92ba47(0x3db)](_0x189972),_0x1ed444=this['animationBaseDelay'](),_0x393ffe=_0x3745ef>_0x1ed444?this[_0x92ba47(0x2c5)]():null;this[_0x92ba47(0x732)](_0x15f7af[0x0])&&(_0x3b8eb8=!_0x19eba7),_0x3e49ea['targetObjects']=_0x143586,_0x3e49ea[_0x92ba47(0x626)](_0xe37bd1,_0x308a07,_0x2f02f1,_0x3b0e25,_0x393ffe),this['addAnimationSpriteToContainer'](_0x3e49ea),this[_0x92ba47(0x2fe)][_0x92ba47(0x281)](_0x3e49ea);}else ConfigManager[_0x92ba47(0x3be)]=0x64,ConfigManager[_0x92ba47(0x83e)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x92ba47(0x416)]=0x64;}ConfigManager['save']();if(this[_0x92ba47(0x1aa)][_0x92ba47(0x2ba)]===Scene_Options){if(_0x92ba47(0x428)==='nyzTF')_0x290cac[_0x92ba47(0x48a)][_0x92ba47(0xa1a)]['call'](this);else{if(this[_0x92ba47(0x1aa)][_0x92ba47(0x1f4)])this['_scene']['_optionsWindow'][_0x92ba47(0x666)]();if(this['_scene'][_0x92ba47(0x3e0)])this[_0x92ba47(0x1aa)][_0x92ba47(0x3e0)][_0x92ba47(0x666)]();}}}else return _0x3221dd[_0x92ba47(0x9bb)][_0x92ba47(0x184)][_0x92ba47(0x4cc)](this,_0x18cc1f,_0x100eb1);}},SceneManager[_0x52da50(0x248)]=function(){const _0x25c472=_0x52da50;$gameTemp[_0x25c472(0x6c9)]()&&VisuMZ[_0x25c472(0x9bb)][_0x25c472(0x630)]['QoL'][_0x25c472(0x79c)]&&(_0x25c472(0x4da)!==_0x25c472(0x2cf)?$gameTemp[_0x25c472(0x57c)]=!$gameTemp[_0x25c472(0x57c)]:this['makeCoreEngineCommandList']());},SceneManager['playTestCtrlT']=function(){const _0x365321=_0x52da50;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x365321(0x249)]())return;for(const _0x173e36 of $gameParty['members']()){if(!_0x173e36)continue;_0x173e36[_0x365321(0x4f5)](_0x173e36['maxTp']());}},SceneManager['initVisuMZCoreEngine']=function(){const _0x205a7e=_0x52da50;this[_0x205a7e(0x9b7)]=![],this[_0x205a7e(0x61f)]=!VisuMZ['CoreEngine']['Settings']['UI'][_0x205a7e(0x3e5)];},SceneManager[_0x52da50(0x5ab)]=function(_0x347474){const _0x28301f=_0x52da50;VisuMZ[_0x28301f(0x9bb)][_0x28301f(0x630)]['UI'][_0x28301f(0x235)]&&(this[_0x28301f(0x9b7)]=_0x347474);},SceneManager['isSideButtonLayout']=function(){const _0x11805b=_0x52da50;return this[_0x11805b(0x9b7)];},SceneManager[_0x52da50(0x8d2)]=function(){const _0x634667=_0x52da50;return this[_0x634667(0x61f)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x20da28=_0x52da50;return this[_0x20da28(0x8d2)]()||this[_0x20da28(0x974)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x209)]=SceneManager[_0x52da50(0x85d)],SceneManager[_0x52da50(0x85d)]=function(){const _0x13597a=_0x52da50;if(VisuMZ[_0x13597a(0x9bb)][_0x13597a(0x630)][_0x13597a(0x7cf)][_0x13597a(0x987)]){if(_0x13597a(0x605)===_0x13597a(0x40a))this[_0x13597a(0x4b5)][_0x13597a(0x56e)](_0x545146['layoutSettings'][_0x13597a(0x4ee)]);else return VisuMZ[_0x13597a(0x9bb)][_0x13597a(0x209)][_0x13597a(0x4cc)](this);}else return!![];},SceneManager[_0x52da50(0x1d3)]=function(_0x59784){const _0x5f01cc=_0x52da50;if(_0x59784 instanceof Error){if(_0x5f01cc(0x975)!==_0x5f01cc(0x4b2))this['catchNormalError'](_0x59784);else return _0x564897[_0x5f01cc(0x9bb)][_0x5f01cc(0x630)][_0x5f01cc(0x7cf)][_0x5f01cc(0x5a0)]&&_0x23ab84[_0x5f01cc(0x367)]()?_0x5f5225['eva']-0.05:_0xec9290[_0x5f01cc(0x1f5)];}else _0x59784 instanceof Array&&_0x59784[0x0]==='LoadError'?_0x5f01cc(0x5c2)===_0x5f01cc(0x5c2)?this[_0x5f01cc(0x89f)](_0x59784):this[_0x5f01cc(0x261)](_0x2413b6):'UgdcS'!==_0x5f01cc(0x415)?this[_0x5f01cc(0x800)](_0x59784):_0x5626a5[_0x5f01cc(0x9bb)][_0x5f01cc(0x7a5)][_0x5f01cc(0x4cc)](this,_0x55a98c);this['stop']();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x3e8)]=BattleManager['processEscape'],BattleManager[_0x52da50(0x2f4)]=function(){const _0x3d51df=_0x52da50;if(VisuMZ[_0x3d51df(0x9bb)][_0x3d51df(0x630)]['QoL'][_0x3d51df(0x73b)])_0x3d51df(0x5cf)==='mnSpn'?this[_0x3d51df(0x871)]():(_0x55c449[_0x3d51df(0x48a)][_0x3d51df(0x737)][_0x3d51df(0x4cc)](this),this[_0x3d51df(0x3eb)]());else{if('SOshM'===_0x3d51df(0x47e)){_0x2ec029[_0x3d51df(0x30e)](_0x169834,_0x215f57);const _0x5031ac=_0x3eb869['option']||0x1;_0x4bd599[_0x3d51df(0x438)](_0x5031ac);}else return VisuMZ['CoreEngine'][_0x3d51df(0x3e8)][_0x3d51df(0x4cc)](this);}},BattleManager[_0x52da50(0x871)]=function(){const _0x3e60d6=_0x52da50;return $gameParty[_0x3e60d6(0x9ed)](),SoundManager[_0x3e60d6(0x4c4)](),this[_0x3e60d6(0x84c)](),!![];},BattleManager[_0x52da50(0x3a4)]=function(){const _0x1c0077=_0x52da50;return $gameSystem[_0x1c0077(0x202)]()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x1c1b83=_0x52da50;return $gameSystem[_0x1c1b83(0x202)]()===0x1;},VisuMZ[_0x52da50(0x9bb)]['Game_Temp_initialize']=Game_Temp[_0x52da50(0x48a)][_0x52da50(0x2a5)],Game_Temp['prototype']['initialize']=function(){const _0x6bad7a=_0x52da50;VisuMZ[_0x6bad7a(0x9bb)]['Game_Temp_initialize'][_0x6bad7a(0x4cc)](this),this[_0x6bad7a(0x6a3)](),this[_0x6bad7a(0x38e)](),this[_0x6bad7a(0x998)]();},Game_Temp['prototype'][_0x52da50(0x6a3)]=function(){const _0x55ac4b=_0x52da50;VisuMZ[_0x55ac4b(0x9bb)][_0x55ac4b(0x630)][_0x55ac4b(0x7cf)]['ForceNoPlayTest']&&(this['_isPlaytest']=![]);},Game_Temp[_0x52da50(0x48a)][_0x52da50(0x419)]=function(_0x2b22b3){const _0x920cc4=_0x52da50;this[_0x920cc4(0x93c)]=_0x2b22b3;},Game_Temp[_0x52da50(0x48a)][_0x52da50(0x478)]=function(){const _0x56912d=_0x52da50;return this[_0x56912d(0x93c)];},Game_Temp[_0x52da50(0x48a)][_0x52da50(0x7b4)]=function(){const _0xeccc0a=_0x52da50;this[_0xeccc0a(0x325)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x52da50(0x48a)][_0x52da50(0x50a)]=function(_0x54523b){const _0x3e133f=_0x52da50;$gameMap&&$dataMap&&$dataMap[_0x3e133f(0x61e)]&&(_0x3e133f(0x2db)!==_0x3e133f(0x2db)?this['_colorCache']={}:this[_0x3e133f(0x518)]($dataMap[_0x3e133f(0x61e)]));const _0xe3f8c3=$dataTroops[_0x54523b];if(_0xe3f8c3){if(_0x3e133f(0x2cb)!==_0x3e133f(0x2cb)){if(this[_0x3e133f(0x2c6)]()===0x0)return;_0x58d471[_0x3e133f(0x712)](),this[_0x3e133f(0x666)](),_0x5ee2a8[_0x3e133f(0x230)](),this['select'](0x0);}else{let _0x30a41d=DataManager[_0x3e133f(0x60a)](_0xe3f8c3['id']);this[_0x3e133f(0x518)](_0x30a41d);}}},Game_Temp['prototype'][_0x52da50(0x518)]=function(_0x4002e6){const _0x172eb1=_0x52da50;if(!_0x4002e6)return;if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))_0x172eb1(0x21c)!==_0x172eb1(0x21c)?(_0x2bb58c[_0x172eb1(0x9bb)][_0x172eb1(0x7ed)][_0x172eb1(0x4cc)](this,_0x4bac7d,_0x2ae8d9,_0x276c73,_0x1fe9bf,_0x3eb78c,_0x2785aa,_0x182616,_0x4f3612),this[_0x172eb1(0x445)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2ec944]||{'x':0x0,'y':0x0})):this[_0x172eb1(0x325)]='FV';else{if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x172eb1(0x325)]='SV';else{if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x172eb1(0x67d)===_0x172eb1(0x91d))_0x1470d8['playBuzzer']();else{const _0x4413f5=String(RegExp['$1']);if(_0x4413f5['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x172eb1(0x325)]='FV';else _0x4413f5[_0x172eb1(0x2bb)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(_0x172eb1(0x289)!==_0x172eb1(0x289)?(this[_0x172eb1(0x4b3)][_0x172eb1(0x6c5)](),this[_0x172eb1(0x31d)][_0x172eb1(0x9bf)](),this[_0x172eb1(0x2f2)][_0x172eb1(0x425)]=![],_0x1e2292['snapForBackground']()):this[_0x172eb1(0x325)]='SV');}}}}if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:DTB)>/i)){if(_0x172eb1(0x9da)===_0x172eb1(0x9da))this[_0x172eb1(0x45c)]=0x0;else{var _0x5ceec7=_0x3538c3(_0x504a51['$1']);_0x560d8a+=_0x5ceec7;}}else{if(_0x4002e6['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if(_0x172eb1(0x9f6)!==_0x172eb1(0x9f6)){const _0x338a3c=_0x172eb1(0x822);this[_0x172eb1(0x42d)]=this[_0x172eb1(0x42d)]||{};if(this[_0x172eb1(0x42d)][_0x338a3c])return this[_0x172eb1(0x42d)][_0x338a3c];const _0xdc5a40=_0x3758c8[_0x172eb1(0x9bb)][_0x172eb1(0x630)][_0x172eb1(0x338)][_0x172eb1(0x6e7)];return this[_0x172eb1(0x441)](_0x338a3c,_0xdc5a40);}else this[_0x172eb1(0x45c)]=0x1;}else{if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:CTB)>/i))_0x172eb1(0x524)!==_0x172eb1(0x7ce)?Imported[_0x172eb1(0x1a1)]&&(this['_forcedBattleSys']='CTB'):this[_0x172eb1(0x29c)][_0x172eb1(0x56e)](_0x5c479b[_0x172eb1(0x610)]['ProfileBgType']);else{if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:STB)>/i)){if(_0x172eb1(0x3da)===_0x172eb1(0x3da))Imported[_0x172eb1(0x28c)]&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x98f));else return this[_0x172eb1(0x191)]()?this['checkSmartEventCollision'](_0x2f94fb,_0x59e87b):_0x26b748[_0x172eb1(0x9bb)][_0x172eb1(0x184)][_0x172eb1(0x4cc)](this,_0x5e6219,_0x531283);}else{if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x5ff));else{if(_0x4002e6['match'](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x1cc));else{if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:OTB)>/i)){if(_0x172eb1(0x9d7)==='fAsbI'){const _0x52dba2=0x90,_0x1c613e=0x60,_0x3a6f6f=0x18;this[_0x172eb1(0x85e)][_0x172eb1(0x42c)]=this[_0x172eb1(0x2f3)],this[_0x172eb1(0x85e)][_0x172eb1(0x34c)]['x']=0.5,this['_pauseSignSprite']['anchor']['y']=0x1,this['_pauseSignSprite'][_0x172eb1(0x6e8)](_0x2afa1f['round'](this['_width']/0x2),this[_0x172eb1(0x806)]),this[_0x172eb1(0x85e)]['setFrame'](_0x52dba2,_0x1c613e,_0x3a6f6f,_0x3a6f6f),this[_0x172eb1(0x85e)][_0x172eb1(0x94d)]=0xff;}else Imported[_0x172eb1(0x5af)]&&(this[_0x172eb1(0x45c)]='OTB');}else{if(_0x4002e6['match'](/<(?:ETB)>/i))Imported[_0x172eb1(0x5a2)]&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x1ab));else{if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:PTB)>/i))_0x172eb1(0x5c7)!==_0x172eb1(0x865)?Imported[_0x172eb1(0x93a)]&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x214)):this[_0x172eb1(0x33e)]=_0x4e889f;else{if(_0x4002e6[_0x172eb1(0x2bb)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x503467=String(RegExp['$1']);if(_0x503467[_0x172eb1(0x2bb)](/DTB/i))this[_0x172eb1(0x45c)]=0x0;else{if(_0x503467[_0x172eb1(0x2bb)](/(?:TPB|ATB)[ ]ACTIVE/i))_0x172eb1(0x27a)!==_0x172eb1(0x27a)?this[_0x172eb1(0x45c)]=0x2:this[_0x172eb1(0x45c)]=0x1;else{if(_0x503467['match'](/(?:TPB|ATB)[ ]WAIT/i)){if(_0x172eb1(0x3c2)===_0x172eb1(0x5ac))return _0x4694e3(_0x1bfcc2)[_0x172eb1(0x9b5)](_0x1eddbb,_0x572d31)+',';else this[_0x172eb1(0x45c)]=0x2;}else{if(_0x503467[_0x172eb1(0x2bb)](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x5b3));else{if(_0x503467[_0x172eb1(0x2bb)](/STB/i))Imported[_0x172eb1(0x28c)]&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x98f));else{if(_0x503467[_0x172eb1(0x2bb)](/BTB/i))_0x172eb1(0x43c)===_0x172eb1(0x43c)?Imported[_0x172eb1(0x4f0)]&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x5ff)):this[_0x172eb1(0x780)](_0x3ab202['CoreEngine'][_0x172eb1(0x630)][_0x172eb1(0x57d)][_0x172eb1(0x7a2)],_0x1b38aa['x'],_0x43671f['y'],_0x3188a0[_0x172eb1(0x2b7)],_0x172eb1(0x1c8));else{if(_0x503467['match'](/FTB/i)){if(_0x172eb1(0x352)===_0x172eb1(0x59a)){this['contents']['clear']();if(_0x42b1b2[_0x172eb1(0x84f)]()){const _0x11bd31=this['innerWidth'];this[_0x172eb1(0x57a)](0x0,0x0,_0x11bd31,this[_0x172eb1(0x75c)]());const _0x3e7d02=this[_0x172eb1(0x9ee)](_0x3704ad[_0x172eb1(0x84f)]())[_0x172eb1(0x2b7)];this['drawTextEx'](_0x10e61e['displayName'](),_0x1264f6['floor']((_0x11bd31-_0x3e7d02)/0x2),0x0);}}else Imported[_0x172eb1(0x494)]&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x1cc));}else{if(_0x503467[_0x172eb1(0x2bb)](/OTB/i))Imported[_0x172eb1(0x5af)]&&(_0x172eb1(0x197)!==_0x172eb1(0x197)?this[_0x172eb1(0x931)](_0x2af97a):this[_0x172eb1(0x45c)]=_0x172eb1(0x7a8));else{if(_0x503467[_0x172eb1(0x2bb)](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&('lacoH'!==_0x172eb1(0x783)?this['_forcedBattleSys']=_0x172eb1(0x1ab):(this['centerCameraCheckData']()[_0x172eb1(0x1b1)]=!![],this[_0x172eb1(0x6dc)]()[_0x172eb1(0x3ee)]=_0x5acdc2(_0xe09a0c['$1'])));else _0x503467[_0x172eb1(0x2bb)](/PTB/i)&&(Imported[_0x172eb1(0x93a)]&&(this[_0x172eb1(0x45c)]=_0x172eb1(0x214)));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x52da50(0x48a)][_0x52da50(0x38e)]=function(){const _0x11cd94=_0x52da50;this[_0x11cd94(0x485)]=[];},Game_Temp[_0x52da50(0x48a)]['requestFauxAnimation']=function(_0xeacb99,_0x1bef82,_0x2cf9ce,_0x459b9c){const _0xb84656=_0x52da50;if(!this[_0xb84656(0x6d3)]())return;_0x2cf9ce=_0x2cf9ce||![],_0x459b9c=_0x459b9c||![];if($dataAnimations[_0x1bef82]){const _0x3c1d2b={'targets':_0xeacb99,'animationId':_0x1bef82,'mirror':_0x2cf9ce,'mute':_0x459b9c};this['_fauxAnimationQueue'][_0xb84656(0x281)](_0x3c1d2b);for(const _0x251e9e of _0xeacb99){_0xb84656(0x959)===_0xb84656(0x238)?_0x35b5ed[_0xb84656(0x9bb)][_0xb84656(0x4bf)]['call'](this):_0x251e9e[_0xb84656(0x575)]&&_0x251e9e['startAnimation']();}}},Game_Temp[_0x52da50(0x48a)][_0x52da50(0x6d3)]=function(){return!![];},Game_Temp[_0x52da50(0x48a)][_0x52da50(0xa1c)]=function(){const _0x28aaeb=_0x52da50;return this['_fauxAnimationQueue'][_0x28aaeb(0x493)]();},Game_Temp[_0x52da50(0x48a)][_0x52da50(0x998)]=function(){const _0x2a5d45=_0x52da50;this[_0x2a5d45(0x964)]=[];},Game_Temp['prototype']['requestPointAnimation']=function(_0x51a0bc,_0x88585d,_0x1f9158,_0x7bb7a4,_0x5d7b19){const _0x46fa76=_0x52da50;if(!this['showPointAnimations']())return;_0x7bb7a4=_0x7bb7a4||![],_0x5d7b19=_0x5d7b19||![];if($dataAnimations[_0x1f9158]){if('gSquz'!==_0x46fa76(0x789)){const _0x1167e6={'x':_0x51a0bc,'y':_0x88585d,'animationId':_0x1f9158,'mirror':_0x7bb7a4,'mute':_0x5d7b19};this[_0x46fa76(0x964)][_0x46fa76(0x281)](_0x1167e6);}else{const _0x15b229=_0x4b3e4d[_0x46fa76(0x977)]()<=_0x50be16;_0x2b9bdf[_0x46fa76(0x9eb)](_0x39d108,_0x15b229);}}},Game_Temp[_0x52da50(0x48a)][_0x52da50(0x67a)]=function(){return!![];},Game_Temp[_0x52da50(0x48a)][_0x52da50(0x216)]=function(){const _0x55c03e=_0x52da50;return this[_0x55c03e(0x964)]['shift']();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x5f6)]=Game_System['prototype']['initialize'],Game_System[_0x52da50(0x48a)][_0x52da50(0x2a5)]=function(){const _0x46f42f=_0x52da50;VisuMZ['CoreEngine'][_0x46f42f(0x5f6)][_0x46f42f(0x4cc)](this),this['initCoreEngine']();},Game_System[_0x52da50(0x48a)][_0x52da50(0x29e)]=function(){const _0x653da5=_0x52da50;this[_0x653da5(0x90b)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0x653da5(0x454)](),'FontSize':$dataSystem[_0x653da5(0x514)][_0x653da5(0x830)],'Padding':0xc};},Game_System['prototype'][_0x52da50(0x6b7)]=function(){const _0x1c1ec1=_0x52da50;if($gameTemp[_0x1c1ec1(0x325)]==='SV')return!![];else{if($gameTemp[_0x1c1ec1(0x325)]==='FV'){if(_0x1c1ec1(0x615)===_0x1c1ec1(0x697))this[_0x1c1ec1(0x582)]['y']=_0xb0c61c[_0x1c1ec1(0x1f9)]-this['buttonAreaHeight']();else return![];}}if(this[_0x1c1ec1(0x90b)]===undefined)this[_0x1c1ec1(0x29e)]();if(this[_0x1c1ec1(0x90b)][_0x1c1ec1(0x8e7)]===undefined)this[_0x1c1ec1(0x29e)]();return this['_CoreEngineSettings']['SideView'];},Game_System[_0x52da50(0x48a)][_0x52da50(0x8e4)]=function(_0x3b73eb){const _0x5dd652=_0x52da50;if(this[_0x5dd652(0x90b)]===undefined)this['initCoreEngine']();if(this[_0x5dd652(0x90b)][_0x5dd652(0x8e7)]===undefined)this[_0x5dd652(0x29e)]();this[_0x5dd652(0x90b)][_0x5dd652(0x8e7)]=_0x3b73eb;},Game_System[_0x52da50(0x48a)][_0x52da50(0x692)]=function(){const _0xa9a422=_0x52da50;if(this[_0xa9a422(0x90b)]===undefined)this[_0xa9a422(0x29e)]();this['_CoreEngineSettings'][_0xa9a422(0x745)]=this[_0xa9a422(0x454)]();},Game_System[_0x52da50(0x48a)]['initialBattleSystem']=function(){const _0x196e7f=_0x52da50,_0x4df137=(VisuMZ[_0x196e7f(0x9bb)][_0x196e7f(0x630)][_0x196e7f(0x745)]||_0x196e7f(0x718))['toUpperCase']()[_0x196e7f(0x748)]();return VisuMZ['CoreEngine'][_0x196e7f(0x36e)](_0x4df137);},Game_System[_0x52da50(0x48a)]['getBattleSystem']=function(){const _0x2b4927=_0x52da50;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x2b4927(0x45c)];if(this[_0x2b4927(0x90b)]===undefined)this[_0x2b4927(0x29e)]();if(this[_0x2b4927(0x90b)][_0x2b4927(0x745)]===undefined)this[_0x2b4927(0x692)]();return this[_0x2b4927(0x90b)]['BattleSystem'];},Game_System[_0x52da50(0x48a)][_0x52da50(0x695)]=function(_0x1af8cd){const _0x482123=_0x52da50;if(this[_0x482123(0x90b)]===undefined)this[_0x482123(0x29e)]();if(this[_0x482123(0x90b)]['BattleSystem']===undefined)this['resetBattleSystem']();this['_CoreEngineSettings'][_0x482123(0x745)]=_0x1af8cd;},Game_System[_0x52da50(0x48a)]['mainFontSize']=function(){const _0x2d539d=_0x52da50;if(this[_0x2d539d(0x90b)]===undefined)this[_0x2d539d(0x29e)]();if(this[_0x2d539d(0x90b)][_0x2d539d(0x2d4)]===undefined)this[_0x2d539d(0x29e)]();return this[_0x2d539d(0x90b)][_0x2d539d(0x2d4)];},Game_System[_0x52da50(0x48a)][_0x52da50(0x1ee)]=function(_0x304ee7){const _0x4abca2=_0x52da50;if(this[_0x4abca2(0x90b)]===undefined)this[_0x4abca2(0x29e)]();if(this[_0x4abca2(0x90b)][_0x4abca2(0x48d)]===undefined)this[_0x4abca2(0x29e)]();this[_0x4abca2(0x90b)][_0x4abca2(0x2d4)]=_0x304ee7;},Game_System['prototype'][_0x52da50(0x8c0)]=function(){const _0x1dce1f=_0x52da50;if(this[_0x1dce1f(0x90b)]===undefined)this[_0x1dce1f(0x29e)]();if(this[_0x1dce1f(0x90b)][_0x1dce1f(0x57e)]===undefined)this[_0x1dce1f(0x29e)]();return this[_0x1dce1f(0x90b)][_0x1dce1f(0x57e)];},Game_System[_0x52da50(0x48a)][_0x52da50(0x438)]=function(_0x22fe0c){const _0x4563e4=_0x52da50;if(this['_CoreEngineSettings']===undefined)this[_0x4563e4(0x29e)]();if(this[_0x4563e4(0x90b)][_0x4563e4(0x48d)]===undefined)this['initCoreEngine']();this[_0x4563e4(0x90b)][_0x4563e4(0x57e)]=_0x22fe0c;},VisuMZ['CoreEngine']['Game_Screen_initialize']=Game_Screen[_0x52da50(0x48a)][_0x52da50(0x2a5)],Game_Screen['prototype'][_0x52da50(0x2a5)]=function(){const _0x4e2c7a=_0x52da50;VisuMZ['CoreEngine'][_0x4e2c7a(0x713)]['call'](this),this[_0x4e2c7a(0x5fc)]();},Game_Screen['prototype'][_0x52da50(0x5fc)]=function(){const _0x10e2e2=_0x52da50,_0x1625fd=VisuMZ['CoreEngine'][_0x10e2e2(0x630)][_0x10e2e2(0x767)];this[_0x10e2e2(0x78d)]=_0x1625fd?.[_0x10e2e2(0x88b)]||_0x10e2e2(0x977);},Game_Screen[_0x52da50(0x48a)][_0x52da50(0x31c)]=function(){const _0x3571b5=_0x52da50;if(this[_0x3571b5(0x78d)]===undefined)this[_0x3571b5(0x5fc)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x52da50(0x48a)][_0x52da50(0x2a2)]=function(_0x58d398){const _0x2aba46=_0x52da50;if(this['_coreEngineShakeStyle']===undefined)this[_0x2aba46(0x5fc)]();this[_0x2aba46(0x78d)]=_0x58d398[_0x2aba46(0x523)]()['trim']();},Game_Picture[_0x52da50(0x48a)][_0x52da50(0x63e)]=function(){const _0x515d87=_0x52da50;if($gameParty[_0x515d87(0xa27)]())return![];return this[_0x515d87(0x215)]()&&this['name']()[_0x515d87(0x2c1)](0x0)==='!';},VisuMZ['CoreEngine'][_0x52da50(0x424)]=Game_Picture[_0x52da50(0x48a)]['x'],Game_Picture[_0x52da50(0x48a)]['x']=function(){const _0x562d77=_0x52da50;if(this['isMapScrollLinked']())return this['xScrollLinkedOffset']();else{if('VXXZN'===_0x562d77(0x902))return VisuMZ[_0x562d77(0x9bb)][_0x562d77(0x424)]['call'](this);else{if(typeof _0x3cf219===_0x562d77(0x87b))return this[_0x562d77(0x3ec)](_0x3d5e54);_0x528fe8=_0x3e04de(_0x18a1a4||'')[_0x562d77(0x5d6)]();if(_0x762cd4===_0x562d77(0x554))return this['param'](0x0);if(_0x5c584a===_0x562d77(0x991))return this[_0x562d77(0x3ec)](0x1);if(_0xb23848===_0x562d77(0x1af))return this['param'](0x2);if(_0x531ab6===_0x562d77(0x232))return this[_0x562d77(0x3ec)](0x3);if(_0x331699==='MAT')return this[_0x562d77(0x3ec)](0x4);if(_0x3f9dbf===_0x562d77(0x8b6))return this['param'](0x5);if(_0x5b8480===_0x562d77(0x682))return this[_0x562d77(0x3ec)](0x6);if(_0x3239dc===_0x562d77(0x376))return this[_0x562d77(0x3ec)](0x7);if(_0x1073c8==='HIT')return _0x295be9?_0x49fac0(_0x496efe[_0x562d77(0x442)](this[_0x562d77(0x4a2)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x482c22===_0x562d77(0x826))return _0x1e5231?_0x518cda(_0x47cc16[_0x562d77(0x442)](this[_0x562d77(0x4a2)](0x1)*0x64))+'%':this[_0x562d77(0x4a2)](0x1);if(_0x36b7e4===_0x562d77(0x5a9))return _0x74653d?_0x6e5573(_0x3a28cf[_0x562d77(0x442)](this['xparam'](0x2)*0x64))+'%':this[_0x562d77(0x4a2)](0x2);if(_0x27780d===_0x562d77(0x74c))return _0x1a202a?_0x26172d(_0x1e4d28[_0x562d77(0x442)](this[_0x562d77(0x4a2)](0x3)*0x64))+'%':this[_0x562d77(0x4a2)](0x3);if(_0x4c6be5==='MEV')return _0x3bf0c9?_0x195263(_0x3bea1d[_0x562d77(0x442)](this[_0x562d77(0x4a2)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x3724de===_0x562d77(0x720))return _0x4b86c9?_0x3c34af(_0x378d75['round'](this[_0x562d77(0x4a2)](0x5)*0x64))+'%':this[_0x562d77(0x4a2)](0x5);if(_0x3e4bba===_0x562d77(0x211))return _0x1dc080?_0x270f16(_0x7f1b91[_0x562d77(0x442)](this[_0x562d77(0x4a2)](0x6)*0x64))+'%':this[_0x562d77(0x4a2)](0x6);if(_0x1a5191===_0x562d77(0x8bf))return _0x16af47?_0x1af17e(_0x2c6f77[_0x562d77(0x442)](this[_0x562d77(0x4a2)](0x7)*0x64))+'%':this[_0x562d77(0x4a2)](0x7);if(_0x4f5d06===_0x562d77(0x53f))return _0x475067?_0x153115(_0x3e9c85[_0x562d77(0x442)](this[_0x562d77(0x4a2)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x96e89d===_0x562d77(0x305))return _0x55b280?_0x34b6f9(_0x538ee5['round'](this[_0x562d77(0x4a2)](0x9)*0x64))+'%':this[_0x562d77(0x4a2)](0x9);if(_0xbe1b9c===_0x562d77(0xa1e))return _0x183a1f?_0x165180(_0x4e017f[_0x562d77(0x442)](this[_0x562d77(0x7ff)](0x0)*0x64))+'%':this[_0x562d77(0x7ff)](0x0);if(_0x182711===_0x562d77(0x3bd))return _0x5efc0c?_0x440c65(_0x2164f8[_0x562d77(0x442)](this[_0x562d77(0x7ff)](0x1)*0x64))+'%':this[_0x562d77(0x7ff)](0x1);if(_0x344c8d===_0x562d77(0x85c))return _0x18e4c9?_0x2c278e(_0x345348[_0x562d77(0x442)](this[_0x562d77(0x7ff)](0x2)*0x64))+'%':this[_0x562d77(0x7ff)](0x2);if(_0x338426===_0x562d77(0x2b6))return _0x5f73d?_0x21ed2c(_0x59bdab[_0x562d77(0x442)](this[_0x562d77(0x7ff)](0x3)*0x64))+'%':this[_0x562d77(0x7ff)](0x3);if(_0x2cd9db==='MCR')return _0x16b133?_0x7a1c26(_0x5c79c7[_0x562d77(0x442)](this[_0x562d77(0x7ff)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x13ea15===_0x562d77(0x6d9))return _0x147667?_0x424cf4(_0x1c55da[_0x562d77(0x442)](this[_0x562d77(0x7ff)](0x5)*0x64))+'%':this[_0x562d77(0x7ff)](0x5);if(_0x488d30===_0x562d77(0x3f0))return _0x4d8394?_0x3a824a(_0x2ccba7['round'](this[_0x562d77(0x7ff)](0x6)*0x64))+'%':this[_0x562d77(0x7ff)](0x6);if(_0x31bcf5===_0x562d77(0x764))return _0x5a1871?_0x16de58(_0x460b0d['round'](this[_0x562d77(0x7ff)](0x7)*0x64))+'%':this[_0x562d77(0x7ff)](0x7);if(_0x297fe5==='FDR')return _0x385d12?_0x4e46eb(_0xd2f87a[_0x562d77(0x442)](this['sparam'](0x8)*0x64))+'%':this[_0x562d77(0x7ff)](0x8);if(_0x32644f===_0x562d77(0x388))return _0x3a2628?_0x30d21d(_0x1c34bb['round'](this[_0x562d77(0x7ff)](0x9)*0x64))+'%':this[_0x562d77(0x7ff)](0x9);if(_0x25181f['CoreEngine'][_0x562d77(0x5fa)][_0x2a210e]){const _0x5b8da4=_0x42b8eb[_0x562d77(0x9bb)][_0x562d77(0x5fa)][_0x57bc7e],_0x5d7d3a=this[_0x5b8da4];return _0x312e82['CoreEngine'][_0x562d77(0x560)][_0x5ef276]===_0x562d77(0x2e4)?_0x5d7d3a:_0x2853fb?_0xd4e652(_0x5c4da5[_0x562d77(0x442)](_0x5d7d3a*0x64))+'%':_0x5d7d3a;}return'';}}},Game_Picture[_0x52da50(0x48a)][_0x52da50(0x9fc)]=function(){const _0x3a9a1d=_0x52da50,_0x5991b5=$gameMap['displayX']()*$gameMap['tileWidth']();return(this['_x']-_0x5991b5)*$gameScreen[_0x3a9a1d(0x8ee)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x93f)]=Game_Picture[_0x52da50(0x48a)]['y'],Game_Picture['prototype']['y']=function(){const _0xed15f5=_0x52da50;return this['isMapScrollLinked']()?this['yScrollLinkedOffset']():VisuMZ[_0xed15f5(0x9bb)][_0xed15f5(0x93f)][_0xed15f5(0x4cc)](this);},Game_Picture[_0x52da50(0x48a)][_0x52da50(0x4fe)]=function(){const _0x225b34=_0x52da50,_0x3e3ba9=$gameMap[_0x225b34(0x6a4)]()*$gameMap[_0x225b34(0x3bb)]();return(this['_y']-_0x3e3ba9)*$gameScreen[_0x225b34(0x8ee)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x779)]=Game_Picture['prototype'][_0x52da50(0x953)],Game_Picture[_0x52da50(0x48a)]['scaleX']=function(){const _0x17d446=_0x52da50;let _0xe85974=VisuMZ['CoreEngine'][_0x17d446(0x779)][_0x17d446(0x4cc)](this);return this[_0x17d446(0x63e)]()&&(_0xe85974*=$gameScreen[_0x17d446(0x8ee)]()),_0xe85974;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x54e)]=Game_Picture['prototype'][_0x52da50(0x989)],Game_Picture[_0x52da50(0x48a)][_0x52da50(0x989)]=function(){const _0x5b61f6=_0x52da50;let _0xacd670=VisuMZ[_0x5b61f6(0x9bb)][_0x5b61f6(0x54e)][_0x5b61f6(0x4cc)](this);return this[_0x5b61f6(0x63e)]()&&('kMmHG'==='kMmHG'?_0xacd670*=$gameScreen[_0x5b61f6(0x8ee)]():(_0x4efa7d=_0x243ed3[_0x5b61f6(0x442)](_0x44b7f1),_0x1cf805=_0x34550c['round'](_0x3ca9ee),_0x57f31a=_0x45f015[_0x5b61f6(0x442)](_0x2863ca),_0x19cbe1['CoreEngine'][_0x5b61f6(0x841)][_0x5b61f6(0x4cc)](this,_0x32966e,_0xeed0a0,_0x8cc9a0,_0x42e3bb),this['markCoreEngineModified']())),_0xacd670;},Game_Picture['prototype'][_0x52da50(0x9ce)]=function(_0x1f633e){const _0x532732=_0x52da50;this[_0x532732(0x6e0)]=_0x1f633e;},VisuMZ['CoreEngine'][_0x52da50(0x25e)]=Game_Picture[_0x52da50(0x48a)][_0x52da50(0x92b)],Game_Picture['prototype']['calcEasing']=function(_0x599134){const _0x22b141=_0x52da50;return this[_0x22b141(0x6e0)]=this[_0x22b141(0x6e0)]||0x0,[0x0,0x1,0x2,0x3][_0x22b141(0x3fc)](this[_0x22b141(0x6e0)])?VisuMZ[_0x22b141(0x9bb)][_0x22b141(0x25e)][_0x22b141(0x4cc)](this,_0x599134):VisuMZ[_0x22b141(0x269)](_0x599134,this['_coreEasingType']);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x2ec)]=Game_Action[_0x52da50(0x48a)][_0x52da50(0x7f0)],Game_Action[_0x52da50(0x48a)][_0x52da50(0x7f0)]=function(_0x8e698){const _0x13d828=_0x52da50;if(VisuMZ['CoreEngine'][_0x13d828(0x630)]['QoL'][_0x13d828(0x9a4)])return this[_0x13d828(0x804)](_0x8e698);else{if(_0x13d828(0x9d1)!=='xmBSB')return VisuMZ['CoreEngine']['Game_Action_itemHit'][_0x13d828(0x4cc)](this,_0x8e698);else _0x4ae901['CoreEngine']['Window_NameInput_processHandling'][_0x13d828(0x4cc)](this);}},Game_Action[_0x52da50(0x48a)][_0x52da50(0x804)]=function(_0x19cd21){const _0x2517d5=_0x52da50,_0x4649b4=this[_0x2517d5(0x706)](_0x19cd21),_0x4c48cc=this[_0x2517d5(0x95f)](_0x19cd21),_0x39ad7c=this[_0x2517d5(0x663)](_0x19cd21);return _0x4649b4*(_0x4c48cc-_0x39ad7c);},VisuMZ[_0x52da50(0x9bb)]['Game_Action_itemEva']=Game_Action[_0x52da50(0x48a)][_0x52da50(0x6eb)],Game_Action['prototype']['itemEva']=function(_0x476c33){const _0x3ca069=_0x52da50;return VisuMZ[_0x3ca069(0x9bb)]['Settings'][_0x3ca069(0x7cf)][_0x3ca069(0x9a4)]?0x0:VisuMZ[_0x3ca069(0x9bb)][_0x3ca069(0x558)][_0x3ca069(0x4cc)](this,_0x476c33);},Game_Action[_0x52da50(0x48a)][_0x52da50(0x706)]=function(_0x2c9913){const _0x16e164=_0x52da50;return this[_0x16e164(0x231)]()[_0x16e164(0x6ca)]*0.01;},Game_Action[_0x52da50(0x48a)][_0x52da50(0x95f)]=function(_0x14e69a){const _0x3af031=_0x52da50;if(VisuMZ[_0x3af031(0x9bb)]['Settings'][_0x3af031(0x7cf)][_0x3af031(0x5a0)]&&this[_0x3af031(0x28e)]())return 0x1;if(this['isPhysical']())return _0x3af031(0x90e)===_0x3af031(0x597)?(_0x46c0e2[_0x3af031(0x9ed)](),_0x1bc3ce[_0x3af031(0x4c4)](),this[_0x3af031(0x84c)](),!![]):VisuMZ[_0x3af031(0x9bb)][_0x3af031(0x630)][_0x3af031(0x7cf)][_0x3af031(0x5a0)]&&this[_0x3af031(0x317)]()[_0x3af031(0x9dc)]()?this[_0x3af031(0x317)]()['hit']+0.05:this[_0x3af031(0x317)]()[_0x3af031(0x5ed)];else{if(_0x3af031(0x667)==='KrGJS')return 0x1;else this[_0x3af031(0x4a0)]=new _0x4f6636(),this[_0x3af031(0x4a0)][_0x3af031(0x675)]=this[_0x3af031(0x952)][_0x3af031(0x4e6)](this),this['_image'][_0x3af031(0x90c)]=this[_0x3af031(0x51c)][_0x3af031(0x4e6)](this),this[_0x3af031(0x4f3)](),this[_0x3af031(0x195)]=_0x3af031(0x6c0),_0x2722e1[_0x3af031(0xa0b)]()?this[_0x3af031(0x5e6)]():(this[_0x3af031(0x4a0)][_0x3af031(0x868)]=this['_url'],![]&&this[_0x3af031(0x4a0)][_0x3af031(0x2b7)]>0x0&&(this['_image'][_0x3af031(0x675)]=null,this[_0x3af031(0x952)]()));}},Game_Action[_0x52da50(0x48a)]['targetEvaRate']=function(_0x9bfa6a){const _0x24a87e=_0x52da50;if(this['subject']()['isActor']()===_0x9bfa6a[_0x24a87e(0x9dc)]())return 0x0;if(this[_0x24a87e(0x23d)]()){if(_0x24a87e(0x4ad)!==_0x24a87e(0x4ad))_0x33e81b+=_0x24a87e(0x7d7)[_0x24a87e(0x8de)](_0x310393[_0x24a87e(0x683)][0x4]);else{if(VisuMZ[_0x24a87e(0x9bb)][_0x24a87e(0x630)][_0x24a87e(0x7cf)][_0x24a87e(0x5a0)]&&_0x9bfa6a[_0x24a87e(0x367)]())return _0x9bfa6a[_0x24a87e(0x1f5)]-0.05;else{if('rLVZX'!=='ThDiL')return _0x9bfa6a['eva'];else{if(_0x39034a['inBattle']())return;_0x482ca3[_0x24a87e(0x30e)](_0x2ee07a,_0x119af6);const _0x3f4b1f=_0x430ef0['IDs'];for(const _0x9866a3 of _0x3f4b1f){const _0x5ddcaf=_0x4a5d88[_0x24a87e(0x455)](_0x9866a3);_0x356f75[_0x24a87e(0x9eb)](_0x9866a3,!_0x5ddcaf);}}}}}else return this[_0x24a87e(0x82e)]()?_0x9bfa6a['mev']:0x0;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x5ef)]=Game_Action[_0x52da50(0x48a)]['updateLastTarget'],Game_Action[_0x52da50(0x48a)][_0x52da50(0x204)]=function(_0x10bc26){const _0xd61ae3=_0x52da50;VisuMZ[_0xd61ae3(0x9bb)][_0xd61ae3(0x5ef)][_0xd61ae3(0x4cc)](this,_0x10bc26);if(VisuMZ[_0xd61ae3(0x9bb)][_0xd61ae3(0x630)]['QoL'][_0xd61ae3(0x9a4)])return;const _0x31eb8e=_0x10bc26[_0xd61ae3(0x1ed)]();_0x31eb8e[_0xd61ae3(0x9b3)]&&(_0xd61ae3(0x8f6)!==_0xd61ae3(0x8f6)?this[_0xd61ae3(0x22d)]=![]:0x1-this[_0xd61ae3(0x6eb)](_0x10bc26)>this[_0xd61ae3(0x7f0)](_0x10bc26)&&(_0x31eb8e[_0xd61ae3(0x9b3)]=![],_0x31eb8e[_0xd61ae3(0x1fd)]=!![]));},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x60d)]=Game_BattlerBase[_0x52da50(0x48a)][_0x52da50(0x833)],Game_BattlerBase[_0x52da50(0x48a)][_0x52da50(0x833)]=function(){const _0x3ffea4=_0x52da50;this[_0x3ffea4(0x8dd)]={},VisuMZ[_0x3ffea4(0x9bb)][_0x3ffea4(0x60d)][_0x3ffea4(0x4cc)](this);},VisuMZ['CoreEngine'][_0x52da50(0x5d2)]=Game_BattlerBase['prototype'][_0x52da50(0x666)],Game_BattlerBase[_0x52da50(0x48a)]['refresh']=function(){const _0x3729a2=_0x52da50;this[_0x3729a2(0x8dd)]={},VisuMZ['CoreEngine']['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase[_0x52da50(0x48a)][_0x52da50(0x921)]=function(_0x4acab6){const _0x562b78=_0x52da50;return this[_0x562b78(0x8dd)]=this[_0x562b78(0x8dd)]||{},this['_cache'][_0x4acab6]!==undefined;},Game_BattlerBase['prototype']['paramPlus']=function(_0x3e53aa){const _0x1def2d=_0x52da50,_0xf9208e=(_0x4dfddb,_0x394968)=>{const _0x3f6672=_0x3a86;if(!_0x394968)return _0x4dfddb;if(_0x394968[_0x3f6672(0x61e)][_0x3f6672(0x2bb)](VisuMZ[_0x3f6672(0x9bb)]['RegExp'][_0x3f6672(0x39c)][_0x3e53aa])){if(_0x3f6672(0x309)!==_0x3f6672(0x701)){var _0x4ac64c=Number(RegExp['$1']);_0x4dfddb+=_0x4ac64c;}else this['_statusWindow'][_0x3f6672(0x56e)](_0x1a07dd[_0x3f6672(0x610)][_0x3f6672(0x1b8)]);}if(_0x394968[_0x3f6672(0x61e)][_0x3f6672(0x2bb)](VisuMZ[_0x3f6672(0x9bb)]['RegExp'][_0x3f6672(0x9a0)][_0x3e53aa])){var _0x3d893e=String(RegExp['$1']);try{_0x3f6672(0x7e6)!==_0x3f6672(0x337)?_0x4dfddb+=eval(_0x3d893e):(this[_0x3f6672(0x1e1)]=new _0x29e5a2['filters'][(_0x3f6672(0x787))](_0x4ea34d=!![]),this['_backgroundSprite']=new _0x16d159(),this[_0x3f6672(0x5a8)][_0x3f6672(0x42c)]=_0x150142[_0x3f6672(0x81c)](),this[_0x3f6672(0x5a8)][_0x3f6672(0x5fe)]=[this[_0x3f6672(0x1e1)]],this[_0x3f6672(0x4b1)][_0x3f6672(0x1d0)](this[_0x3f6672(0x5a8)]));}catch(_0x5d695a){if($gameTemp[_0x3f6672(0x6c9)]())console[_0x3f6672(0x1db)](_0x5d695a);}}return _0x4dfddb;};return this[_0x1def2d(0xa0e)]()[_0x1def2d(0x287)](_0xf9208e,this['_paramPlus'][_0x3e53aa]);},Game_BattlerBase[_0x52da50(0x48a)][_0x52da50(0x78c)]=function(_0x37e324){const _0x2113f1=_0x52da50;var _0x143b82=_0x2113f1(0x370)+(this[_0x2113f1(0x9dc)]()?'Actor':'Enemy')+_0x2113f1(0x63b)+_0x37e324;if(this['checkCacheKey'](_0x143b82))return this[_0x2113f1(0x8dd)][_0x143b82];this[_0x2113f1(0x8dd)][_0x143b82]=eval(VisuMZ[_0x2113f1(0x9bb)][_0x2113f1(0x630)][_0x2113f1(0x9cd)][_0x143b82]);const _0x5b6edc=(_0x1f74c4,_0x341504)=>{const _0x452949=_0x2113f1;if(!_0x341504)return _0x1f74c4;if(_0x341504[_0x452949(0x61e)][_0x452949(0x2bb)](VisuMZ[_0x452949(0x9bb)][_0x452949(0x662)]['paramMax'][_0x37e324])){var _0x1f699f=Number(RegExp['$1']);if(_0x1f699f===0x0)_0x1f699f=Number[_0x452949(0x2d9)];_0x1f74c4=Math[_0x452949(0x31b)](_0x1f74c4,_0x1f699f);}if(_0x341504['note'][_0x452949(0x2bb)](VisuMZ[_0x452949(0x9bb)][_0x452949(0x662)]['paramMaxJS'][_0x37e324])){var _0x339d46=String(RegExp['$1']);try{if(_0x452949(0x969)===_0x452949(0x969))_0x1f74c4=Math[_0x452949(0x31b)](_0x1f74c4,Number(eval(_0x339d46)));else{let _0x359d90=_0x5dfe63['CoreEngine']['Game_Picture_scaleX'][_0x452949(0x4cc)](this);return this[_0x452949(0x63e)]()&&(_0x359d90*=_0x13d850[_0x452949(0x8ee)]()),_0x359d90;}}catch(_0x3caa7f){if($gameTemp[_0x452949(0x6c9)]())console[_0x452949(0x1db)](_0x3caa7f);}}return _0x1f74c4;};if(this[_0x2113f1(0x8dd)][_0x143b82]===0x0)this[_0x2113f1(0x8dd)][_0x143b82]=Number[_0x2113f1(0x2d9)];return this[_0x2113f1(0x8dd)][_0x143b82]=this[_0x2113f1(0xa0e)]()[_0x2113f1(0x287)](_0x5b6edc,this['_cache'][_0x143b82]),this[_0x2113f1(0x8dd)][_0x143b82];},Game_BattlerBase['prototype'][_0x52da50(0x5f3)]=function(_0x56185f){const _0x3edfab=_0x52da50,_0x3d511e=this[_0x3edfab(0x2e3)](Game_BattlerBase[_0x3edfab(0x3ab)],_0x56185f),_0x52c804=(_0x49120e,_0x4361d0)=>{const _0x5b041e=_0x3edfab;if(!_0x4361d0)return _0x49120e;if(_0x4361d0[_0x5b041e(0x61e)][_0x5b041e(0x2bb)](VisuMZ[_0x5b041e(0x9bb)][_0x5b041e(0x662)][_0x5b041e(0x6ed)][_0x56185f])){if(_0x5b041e(0x6a5)!==_0x5b041e(0x6a5))_0x3c2511[_0x5b041e(0x642)](_0x2c6fe6,_0xc9028b);else{var _0x1b3b49=Number(RegExp['$1'])/0x64;_0x49120e*=_0x1b3b49;}}if(_0x4361d0[_0x5b041e(0x61e)][_0x5b041e(0x2bb)](VisuMZ[_0x5b041e(0x9bb)][_0x5b041e(0x662)][_0x5b041e(0x9a6)][_0x56185f])){if(_0x5b041e(0x8f8)===_0x5b041e(0x38a))return 0x0;else{var _0x1b3b49=Number(RegExp['$1']);_0x49120e*=_0x1b3b49;}}if(_0x4361d0[_0x5b041e(0x61e)]['match'](VisuMZ[_0x5b041e(0x9bb)][_0x5b041e(0x662)][_0x5b041e(0x2ab)][_0x56185f])){if('KfzZd'===_0x5b041e(0x540))return _0x215b45[_0x5b041e(0x9bb)][_0x5b041e(0x630)][_0x5b041e(0x338)]['DimColor2'];else{var _0x5a2283=String(RegExp['$1']);try{if(_0x5b041e(0x995)===_0x5b041e(0x241)){var _0x59fd5b=_0x3d8f92-1.5/2.75;return 7.5625*_0x59fd5b*_0x59fd5b+0.75;}else _0x49120e*=eval(_0x5a2283);}catch(_0x1b5c41){if($gameTemp[_0x5b041e(0x6c9)]())console[_0x5b041e(0x1db)](_0x1b5c41);}}}return _0x49120e;};return this['traitObjects']()[_0x3edfab(0x287)](_0x52c804,_0x3d511e);},Game_BattlerBase[_0x52da50(0x48a)]['paramFlatBonus']=function(_0x1708b6){const _0x2d1cb0=_0x52da50,_0x22cb02=(_0x986006,_0x3bc18d)=>{const _0x474cdc=_0x3a86;if(!_0x3bc18d)return _0x986006;if(_0x3bc18d[_0x474cdc(0x61e)][_0x474cdc(0x2bb)](VisuMZ[_0x474cdc(0x9bb)][_0x474cdc(0x662)]['paramFlat'][_0x1708b6])){if(_0x474cdc(0x709)!==_0x474cdc(0x709)){var _0x11ce0d=_0xc9a823(_0x5d9991['$1'])/0x64;_0x3eaf48+=_0x11ce0d;}else{var _0x2af8e9=Number(RegExp['$1']);_0x986006+=_0x2af8e9;}}if(_0x3bc18d[_0x474cdc(0x61e)][_0x474cdc(0x2bb)](VisuMZ[_0x474cdc(0x9bb)][_0x474cdc(0x662)][_0x474cdc(0x8d4)][_0x1708b6])){if('ImLvk'!==_0x474cdc(0x251))this[_0x474cdc(0x86d)]();else{var _0x1f072b=String(RegExp['$1']);try{_0x986006+=eval(_0x1f072b);}catch(_0x2c3a9a){if(_0x474cdc(0x192)!==_0x474cdc(0x192)){const _0x346250=_0x474cdc(0x601);this['_colorCache']=this[_0x474cdc(0x42d)]||{};if(this[_0x474cdc(0x42d)][_0x346250])return this[_0x474cdc(0x42d)][_0x346250];const _0x35229b=_0x176cb7[_0x474cdc(0x9bb)]['Settings'][_0x474cdc(0x338)]['ColorPowerDown'];return this[_0x474cdc(0x441)](_0x346250,_0x35229b);}else{if($gameTemp[_0x474cdc(0x6c9)]())console['log'](_0x2c3a9a);}}}}return _0x986006;};return this[_0x2d1cb0(0xa0e)]()[_0x2d1cb0(0x287)](_0x22cb02,0x0);},Game_BattlerBase[_0x52da50(0x48a)][_0x52da50(0x3ec)]=function(_0x43badf){const _0x4fae56=_0x52da50;let _0x563eeb=_0x4fae56(0x3ec)+_0x43badf+_0x4fae56(0x5cc);if(this[_0x4fae56(0x921)](_0x563eeb))return this[_0x4fae56(0x8dd)][_0x563eeb];return this[_0x4fae56(0x8dd)][_0x563eeb]=Math[_0x4fae56(0x442)](VisuMZ[_0x4fae56(0x9bb)][_0x4fae56(0x630)][_0x4fae56(0x9cd)][_0x4fae56(0x27c)]['call'](this,_0x43badf)),this[_0x4fae56(0x8dd)][_0x563eeb];},Game_BattlerBase[_0x52da50(0x48a)]['xparamPlus']=function(_0x582c40){const _0xffd401=_0x52da50,_0x4692bc=(_0x5c4c71,_0x49c1b2)=>{const _0x5b7e6d=_0x3a86;if(!_0x49c1b2)return _0x5c4c71;if(_0x49c1b2[_0x5b7e6d(0x61e)][_0x5b7e6d(0x2bb)](VisuMZ[_0x5b7e6d(0x9bb)][_0x5b7e6d(0x662)][_0x5b7e6d(0x574)][_0x582c40])){var _0x4f9070=Number(RegExp['$1'])/0x64;_0x5c4c71+=_0x4f9070;}if(_0x49c1b2['note'][_0x5b7e6d(0x2bb)](VisuMZ[_0x5b7e6d(0x9bb)][_0x5b7e6d(0x662)][_0x5b7e6d(0x73c)][_0x582c40])){var _0x4f9070=Number(RegExp['$1']);_0x5c4c71+=_0x4f9070;}if(_0x49c1b2[_0x5b7e6d(0x61e)][_0x5b7e6d(0x2bb)](VisuMZ[_0x5b7e6d(0x9bb)][_0x5b7e6d(0x662)][_0x5b7e6d(0x5b1)][_0x582c40])){var _0x52eba9=String(RegExp['$1']);try{_0x5c4c71+=eval(_0x52eba9);}catch(_0x5644dd){if($gameTemp[_0x5b7e6d(0x6c9)]())console[_0x5b7e6d(0x1db)](_0x5644dd);}}return _0x5c4c71;};return this[_0xffd401(0xa0e)]()['reduce'](_0x4692bc,0x0);},Game_BattlerBase[_0x52da50(0x48a)][_0x52da50(0x3d8)]=function(_0x5372b8){const _0xf0db7=_0x52da50,_0x6d1a3a=(_0x3a1412,_0x36a9c1)=>{const _0xa57caa=_0x3a86;if(!_0x36a9c1)return _0x3a1412;if(_0x36a9c1[_0xa57caa(0x61e)][_0xa57caa(0x2bb)](VisuMZ[_0xa57caa(0x9bb)]['RegExp']['xparamRate1'][_0x5372b8])){var _0x2bf69f=Number(RegExp['$1'])/0x64;_0x3a1412*=_0x2bf69f;}if(_0x36a9c1['note']['match'](VisuMZ['CoreEngine'][_0xa57caa(0x662)][_0xa57caa(0x81b)][_0x5372b8])){var _0x2bf69f=Number(RegExp['$1']);_0x3a1412*=_0x2bf69f;}if(_0x36a9c1[_0xa57caa(0x61e)][_0xa57caa(0x2bb)](VisuMZ[_0xa57caa(0x9bb)][_0xa57caa(0x662)][_0xa57caa(0x633)][_0x5372b8])){var _0x3bb1b1=String(RegExp['$1']);try{if(_0xa57caa(0x30c)==='hYzKi')_0x3a1412*=eval(_0x3bb1b1);else return _0x321b66[_0xa57caa(0x1f9)]-this[_0xa57caa(0x765)]();}catch(_0x35ef1b){if('HSnlS'!==_0xa57caa(0x650)){if($gameTemp[_0xa57caa(0x6c9)]())console[_0xa57caa(0x1db)](_0x35ef1b);}else this[_0xa57caa(0x2a5)](...arguments);}}return _0x3a1412;};return this[_0xf0db7(0xa0e)]()[_0xf0db7(0x287)](_0x6d1a3a,0x1);},Game_BattlerBase[_0x52da50(0x48a)]['xparamFlatBonus']=function(_0x4b8355){const _0x2fc176=_0x52da50,_0x530797=(_0x1f2ffc,_0x3d02fd)=>{const _0x1387d2=_0x3a86;if(!_0x3d02fd)return _0x1f2ffc;if(_0x3d02fd[_0x1387d2(0x61e)][_0x1387d2(0x2bb)](VisuMZ[_0x1387d2(0x9bb)][_0x1387d2(0x662)][_0x1387d2(0x4d1)][_0x4b8355])){if(_0x1387d2(0x3fb)===_0x1387d2(0x569))return 0x0;else{var _0x3f059a=Number(RegExp['$1'])/0x64;_0x1f2ffc+=_0x3f059a;}}if(_0x3d02fd[_0x1387d2(0x61e)][_0x1387d2(0x2bb)](VisuMZ['CoreEngine'][_0x1387d2(0x662)][_0x1387d2(0x320)][_0x4b8355])){var _0x3f059a=Number(RegExp['$1']);_0x1f2ffc+=_0x3f059a;}if(_0x3d02fd['note'][_0x1387d2(0x2bb)](VisuMZ[_0x1387d2(0x9bb)][_0x1387d2(0x662)][_0x1387d2(0x9a9)][_0x4b8355])){if(_0x1387d2(0x8f1)==='cmaoe'){var _0x1ffbec=String(RegExp['$1']);try{if('obqeb'===_0x1387d2(0x618))_0x1f2ffc+=eval(_0x1ffbec);else{const _0x5d18bf=new _0x43b4bd(_0x41ef94);this[_0x1387d2(0x1d0)](_0x5d18bf);}}catch(_0x31b399){if($gameTemp[_0x1387d2(0x6c9)]())console[_0x1387d2(0x1db)](_0x31b399);}}else return this[_0x1387d2(0x317)]()['hit'];}return _0x1f2ffc;};return this[_0x2fc176(0xa0e)]()[_0x2fc176(0x287)](_0x530797,0x0);},Game_BattlerBase[_0x52da50(0x48a)][_0x52da50(0x4a2)]=function(_0x1986a3){const _0x3550c1=_0x52da50;let _0x166f9f=_0x3550c1(0x4a2)+_0x1986a3+_0x3550c1(0x5cc);if(this[_0x3550c1(0x921)](_0x166f9f))return this[_0x3550c1(0x8dd)][_0x166f9f];return this[_0x3550c1(0x8dd)][_0x166f9f]=VisuMZ[_0x3550c1(0x9bb)][_0x3550c1(0x630)][_0x3550c1(0x9cd)][_0x3550c1(0x98d)][_0x3550c1(0x4cc)](this,_0x1986a3),this['_cache'][_0x166f9f];},Game_BattlerBase[_0x52da50(0x48a)][_0x52da50(0x33a)]=function(_0x215ccd){const _0x1b916c=_0x52da50,_0x5d7427=(_0xafc1bd,_0x54b746)=>{const _0x325339=_0x3a86;if('jcaec'===_0x325339(0x68e))this['setActorHomeRepositioned'](_0x144628);else{if(!_0x54b746)return _0xafc1bd;if(_0x54b746[_0x325339(0x61e)][_0x325339(0x2bb)](VisuMZ[_0x325339(0x9bb)][_0x325339(0x662)][_0x325339(0x32f)][_0x215ccd])){if(_0x325339(0x77f)!==_0x325339(0x77f))return _0x231293['CoreEngine'][_0x325339(0x630)][_0x325339(0x338)]['ActorTPColor'][_0x325339(0x4cc)](this,_0x4ca25c);else{var _0x5e165f=Number(RegExp['$1'])/0x64;_0xafc1bd+=_0x5e165f;}}if(_0x54b746['note'][_0x325339(0x2bb)](VisuMZ[_0x325339(0x9bb)][_0x325339(0x662)][_0x325339(0xa1b)][_0x215ccd])){if(_0x325339(0x511)==='rxJxB')return _0x3c9de4['prototype'][_0x325339(0x4d4)][_0x325339(0x4cc)](this);else{var _0x5e165f=Number(RegExp['$1']);_0xafc1bd+=_0x5e165f;}}if(_0x54b746[_0x325339(0x61e)][_0x325339(0x2bb)](VisuMZ['CoreEngine'][_0x325339(0x662)][_0x325339(0x1bb)][_0x215ccd])){if(_0x325339(0x2e0)===_0x325339(0x2e0)){var _0x124363=String(RegExp['$1']);try{_0xafc1bd+=eval(_0x124363);}catch(_0x47d140){if($gameTemp[_0x325339(0x6c9)]())console[_0x325339(0x1db)](_0x47d140);}}else return 0x0;}return _0xafc1bd;}};return this[_0x1b916c(0xa0e)]()[_0x1b916c(0x287)](_0x5d7427,0x0);},Game_BattlerBase[_0x52da50(0x48a)][_0x52da50(0x398)]=function(_0x21e1f0){const _0x356981=_0x52da50,_0x19f97a=(_0x285ec1,_0x46afeb)=>{const _0x229997=_0x3a86;if(!_0x46afeb)return _0x285ec1;if(_0x46afeb['note'][_0x229997(0x2bb)](VisuMZ[_0x229997(0x9bb)][_0x229997(0x662)][_0x229997(0x4f2)][_0x21e1f0])){if(_0x229997(0x8fb)!==_0x229997(0x8fb))return _0x2c67c6['layoutSettings'][_0x229997(0x5c0)][_0x229997(0x4cc)](this);else{var _0x356e8d=Number(RegExp['$1'])/0x64;_0x285ec1*=_0x356e8d;}}if(_0x46afeb[_0x229997(0x61e)][_0x229997(0x2bb)](VisuMZ[_0x229997(0x9bb)]['RegExp'][_0x229997(0x8ec)][_0x21e1f0])){if(_0x229997(0x6e2)==='Vqitl')return this[_0x229997(0x804)](_0x3bbc2a);else{var _0x356e8d=Number(RegExp['$1']);_0x285ec1*=_0x356e8d;}}if(_0x46afeb[_0x229997(0x61e)][_0x229997(0x2bb)](VisuMZ[_0x229997(0x9bb)][_0x229997(0x662)]['sparamRateJS'][_0x21e1f0])){var _0x46d711=String(RegExp['$1']);try{_0x229997(0x4c0)!==_0x229997(0x1d4)?_0x285ec1*=eval(_0x46d711):this[_0x229997(0x8a9)](_0xa4c96f(_0x4d9d31['$1']));}catch(_0x5a57b2){if(_0x229997(0x55d)!==_0x229997(0x631)){if($gameTemp[_0x229997(0x6c9)]())console[_0x229997(0x1db)](_0x5a57b2);}else for(let _0x4c9314=0x1;_0x4c9314<=0x64;_0x4c9314++){_0x335f8a[_0x229997(0x4cd)](_0x4c9314);}}}return _0x285ec1;};return this[_0x356981(0xa0e)]()[_0x356981(0x287)](_0x19f97a,0x1);},Game_BattlerBase['prototype'][_0x52da50(0x506)]=function(_0x32a87f){const _0x106a3c=(_0x824d1e,_0xc449eb)=>{const _0x3bdc67=_0x3a86;if(!_0xc449eb)return _0x824d1e;if(_0xc449eb['note'][_0x3bdc67(0x2bb)](VisuMZ[_0x3bdc67(0x9bb)]['RegExp'][_0x3bdc67(0x9d2)][_0x32a87f])){if(_0x3bdc67(0xa04)==='Uiuob')_0x59f364(_0x3bdc67(0x914)['format'](_0x172f76,_0x12667e)),_0x9f391a[_0x3bdc67(0x448)]();else{var _0x4af645=Number(RegExp['$1'])/0x64;_0x824d1e+=_0x4af645;}}if(_0xc449eb[_0x3bdc67(0x61e)]['match'](VisuMZ['CoreEngine'][_0x3bdc67(0x662)][_0x3bdc67(0x791)][_0x32a87f])){var _0x4af645=Number(RegExp['$1']);_0x824d1e+=_0x4af645;}if(_0xc449eb[_0x3bdc67(0x61e)][_0x3bdc67(0x2bb)](VisuMZ[_0x3bdc67(0x9bb)]['RegExp']['sparamFlatJS'][_0x32a87f])){var _0x39948e=String(RegExp['$1']);try{_0x3bdc67(0x18e)!=='JUoZd'?this[_0x3bdc67(0x96a)][_0x3bdc67(0x56e)](_0x6f347c[_0x3bdc67(0x610)]['ItemBgType']):_0x824d1e+=eval(_0x39948e);}catch(_0x18e5e7){if($gameTemp['isPlaytest']())console['log'](_0x18e5e7);}}return _0x824d1e;};return this['traitObjects']()['reduce'](_0x106a3c,0x0);},Game_BattlerBase[_0x52da50(0x48a)]['sparam']=function(_0x1dbaaf){const _0x1ad5bb=_0x52da50;let _0x1fad84=_0x1ad5bb(0x7ff)+_0x1dbaaf+'Total';if(this[_0x1ad5bb(0x921)](_0x1fad84))return this[_0x1ad5bb(0x8dd)][_0x1fad84];return this['_cache'][_0x1fad84]=VisuMZ[_0x1ad5bb(0x9bb)][_0x1ad5bb(0x630)][_0x1ad5bb(0x9cd)][_0x1ad5bb(0x705)][_0x1ad5bb(0x4cc)](this,_0x1dbaaf),this[_0x1ad5bb(0x8dd)][_0x1fad84];},Game_BattlerBase['prototype'][_0x52da50(0x290)]=function(_0x557ae7,_0x554e7f){const _0x30a3d8=_0x52da50;if(typeof paramId===_0x30a3d8(0x87b))return this[_0x30a3d8(0x3ec)](_0x557ae7);_0x557ae7=String(_0x557ae7||'')[_0x30a3d8(0x5d6)]();if(_0x557ae7===_0x30a3d8(0x554))return this[_0x30a3d8(0x3ec)](0x0);if(_0x557ae7===_0x30a3d8(0x991))return this[_0x30a3d8(0x3ec)](0x1);if(_0x557ae7==='ATK')return this[_0x30a3d8(0x3ec)](0x2);if(_0x557ae7==='DEF')return this['param'](0x3);if(_0x557ae7==='MAT')return this[_0x30a3d8(0x3ec)](0x4);if(_0x557ae7===_0x30a3d8(0x8b6))return this['param'](0x5);if(_0x557ae7===_0x30a3d8(0x682))return this[_0x30a3d8(0x3ec)](0x6);if(_0x557ae7==='LUK')return this[_0x30a3d8(0x3ec)](0x7);if(_0x557ae7===_0x30a3d8(0x771))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this['xparam'](0x0)*0x64))+'%':this[_0x30a3d8(0x4a2)](0x0);if(_0x557ae7===_0x30a3d8(0x826))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this['xparam'](0x1)*0x64))+'%':this[_0x30a3d8(0x4a2)](0x1);if(_0x557ae7===_0x30a3d8(0x5a9))return _0x554e7f?String(Math['round'](this[_0x30a3d8(0x4a2)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x557ae7==='CEV')return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x4a2)](0x3)*0x64))+'%':this[_0x30a3d8(0x4a2)](0x3);if(_0x557ae7===_0x30a3d8(0x8a8))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x4a2)](0x4)*0x64))+'%':this[_0x30a3d8(0x4a2)](0x4);if(_0x557ae7===_0x30a3d8(0x720))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x4a2)](0x5)*0x64))+'%':this[_0x30a3d8(0x4a2)](0x5);if(_0x557ae7===_0x30a3d8(0x211))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this['xparam'](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x557ae7==='HRG')return _0x554e7f?String(Math['round'](this['xparam'](0x7)*0x64))+'%':this[_0x30a3d8(0x4a2)](0x7);if(_0x557ae7==='MRG')return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x4a2)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x557ae7===_0x30a3d8(0x305))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this['xparam'](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x557ae7===_0x30a3d8(0xa1e))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x7ff)](0x0)*0x64))+'%':this[_0x30a3d8(0x7ff)](0x0);if(_0x557ae7===_0x30a3d8(0x3bd))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this['sparam'](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x557ae7===_0x30a3d8(0x85c))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x7ff)](0x2)*0x64))+'%':this[_0x30a3d8(0x7ff)](0x2);if(_0x557ae7==='PHA')return _0x554e7f?String(Math[_0x30a3d8(0x442)](this['sparam'](0x3)*0x64))+'%':this[_0x30a3d8(0x7ff)](0x3);if(_0x557ae7===_0x30a3d8(0x598))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x7ff)](0x4)*0x64))+'%':this[_0x30a3d8(0x7ff)](0x4);if(_0x557ae7===_0x30a3d8(0x6d9))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x7ff)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x557ae7==='PDR')return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x7ff)](0x6)*0x64))+'%':this[_0x30a3d8(0x7ff)](0x6);if(_0x557ae7===_0x30a3d8(0x764))return _0x554e7f?String(Math[_0x30a3d8(0x442)](this['sparam'](0x7)*0x64))+'%':this[_0x30a3d8(0x7ff)](0x7);if(_0x557ae7==='FDR')return _0x554e7f?String(Math['round'](this[_0x30a3d8(0x7ff)](0x8)*0x64))+'%':this[_0x30a3d8(0x7ff)](0x8);if(_0x557ae7==='EXR')return _0x554e7f?String(Math[_0x30a3d8(0x442)](this[_0x30a3d8(0x7ff)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x30a3d8(0x9bb)][_0x30a3d8(0x5fa)][_0x557ae7]){if(_0x30a3d8(0x802)==='hRNlj'){let _0x37b013=0x0;return _0x4a04b5[_0x30a3d8(0x927)]()?_0x37b013=this[_0x30a3d8(0x874)]():_0x37b013=_0x515063[_0x30a3d8(0x9bb)]['Scene_MenuBase_helpAreaTop'][_0x30a3d8(0x4cc)](this),_0x37b013;}else{const _0x3beb77=VisuMZ[_0x30a3d8(0x9bb)][_0x30a3d8(0x5fa)][_0x557ae7],_0xef32ea=this[_0x3beb77];if(VisuMZ[_0x30a3d8(0x9bb)][_0x30a3d8(0x560)][_0x557ae7]==='integer'){if('ISWMZ'!=='awmHp')return _0xef32ea;else this['_optionsWindow'][_0x30a3d8(0x56e)](_0x38e87b['layoutSettings'][_0x30a3d8(0x40c)]);}else return _0x554e7f?String(Math[_0x30a3d8(0x442)](_0xef32ea*0x64))+'%':_0xef32ea;}}return'';},Game_BattlerBase[_0x52da50(0x48a)]['isDying']=function(){const _0xc9a29d=_0x52da50;return this[_0xc9a29d(0x3df)]()&&this[_0xc9a29d(0x568)]<this[_0xc9a29d(0x758)]*VisuMZ[_0xc9a29d(0x9bb)][_0xc9a29d(0x630)][_0xc9a29d(0x9cd)][_0xc9a29d(0x7e4)];},Game_Battler[_0x52da50(0x48a)][_0x52da50(0x878)]=function(){const _0x4e428b=_0x52da50;SoundManager[_0x4e428b(0x9c1)](),this[_0x4e428b(0x876)]('evade');},VisuMZ['CoreEngine'][_0x52da50(0x263)]=Game_Actor[_0x52da50(0x48a)][_0x52da50(0x6a6)],Game_Actor[_0x52da50(0x48a)][_0x52da50(0x6a6)]=function(_0x37ed42){const _0x3b6784=_0x52da50;if(this[_0x3b6784(0x80b)]>0x63)return this[_0x3b6784(0x21b)](_0x37ed42);return VisuMZ[_0x3b6784(0x9bb)][_0x3b6784(0x263)][_0x3b6784(0x4cc)](this,_0x37ed42);},Game_Actor['prototype'][_0x52da50(0x21b)]=function(_0x404a44){const _0x915207=_0x52da50,_0x3146cc=this['currentClass']()[_0x915207(0x999)][_0x404a44][0x63],_0x37ea08=this[_0x915207(0x5e8)]()[_0x915207(0x999)][_0x404a44][0x62];return _0x3146cc+(_0x3146cc-_0x37ea08)*(this['level']-0x63);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x49f)]=Game_Actor[_0x52da50(0x48a)]['changeClass'],Game_Actor[_0x52da50(0x48a)]['changeClass']=function(_0x180ff5,_0x493146){const _0x19edc4=_0x52da50;$gameTemp[_0x19edc4(0x2f0)]=!![],VisuMZ[_0x19edc4(0x9bb)][_0x19edc4(0x49f)]['call'](this,_0x180ff5,_0x493146),$gameTemp[_0x19edc4(0x2f0)]=undefined;},VisuMZ['CoreEngine'][_0x52da50(0x760)]=Game_Actor[_0x52da50(0x48a)][_0x52da50(0x369)],Game_Actor[_0x52da50(0x48a)][_0x52da50(0x369)]=function(){const _0x5a401f=_0x52da50;VisuMZ[_0x5a401f(0x9bb)][_0x5a401f(0x760)][_0x5a401f(0x4cc)](this);if(!$gameTemp[_0x5a401f(0x2f0)])this[_0x5a401f(0x58c)]();},Game_Actor[_0x52da50(0x48a)][_0x52da50(0x58c)]=function(){const _0x29f527=_0x52da50;this[_0x29f527(0x8dd)]={};if(VisuMZ[_0x29f527(0x9bb)][_0x29f527(0x630)][_0x29f527(0x7cf)][_0x29f527(0x3a8)])this['_hp']=this[_0x29f527(0x758)];if(VisuMZ[_0x29f527(0x9bb)][_0x29f527(0x630)][_0x29f527(0x7cf)][_0x29f527(0x22b)])this['_mp']=this[_0x29f527(0x299)];},Game_Actor['prototype'][_0x52da50(0x6bb)]=function(){const _0x5ae21c=_0x52da50;if(this['isMaxLevel']())return 0x1;const _0x587581=this[_0x5ae21c(0x199)]()-this[_0x5ae21c(0x602)](),_0x43191d=this[_0x5ae21c(0x680)]()-this[_0x5ae21c(0x602)]();return(_0x43191d/_0x587581)[_0x5ae21c(0x522)](0x0,0x1);},Game_Actor['prototype'][_0x52da50(0xa0e)]=function(){const _0x11e5e2=_0x52da50,_0x42e90c=Game_Battler[_0x11e5e2(0x48a)][_0x11e5e2(0xa0e)][_0x11e5e2(0x4cc)](this);for(const _0x290f8b of this[_0x11e5e2(0x6a1)]()){_0x290f8b&&_0x42e90c[_0x11e5e2(0x281)](_0x290f8b);}return _0x42e90c[_0x11e5e2(0x281)](this['currentClass'](),this[_0x11e5e2(0x322)]()),_0x42e90c;},Object[_0x52da50(0x5df)](Game_Enemy[_0x52da50(0x48a)],_0x52da50(0x80b),{'get':function(){const _0xdccd20=_0x52da50;return this[_0xdccd20(0x7e1)]();},'configurable':!![]}),Game_Enemy[_0x52da50(0x48a)][_0x52da50(0x7e1)]=function(){const _0x423310=_0x52da50;return this[_0x423310(0x4f1)]()['level'];},Game_Enemy[_0x52da50(0x48a)][_0x52da50(0x389)]=function(){const _0x350e59=_0x52da50;!this[_0x350e59(0x72a)]&&(this[_0x350e59(0x33c)]+=Math[_0x350e59(0x442)]((Graphics[_0x350e59(0x394)]-0x270)/0x2),this['_screenY']-=Math[_0x350e59(0x23f)]((Graphics[_0x350e59(0x394)]-Graphics[_0x350e59(0x1f9)])/0x2),$gameSystem[_0x350e59(0x6b7)]()?_0x350e59(0x4c2)!=='YRGnU'?_0x57d80a[_0x350e59(0x9bb)][_0x350e59(0x770)][_0x350e59(0x4cc)](this):this['_screenX']-=Math['floor']((Graphics[_0x350e59(0x2b7)]-Graphics['boxWidth'])/0x2):'rcHjR'!==_0x350e59(0x8c4)?(this[_0x350e59(0x325)]=_0x3ac8e9,this[_0x350e59(0x45c)]=_0x275586):this[_0x350e59(0x2aa)]+=Math[_0x350e59(0x442)]((Graphics[_0x350e59(0x19b)]-0x330)/0x2)),this[_0x350e59(0x72a)]=!![];},Game_Party[_0x52da50(0x48a)]['maxGold']=function(){const _0x3ca580=_0x52da50;return VisuMZ[_0x3ca580(0x9bb)][_0x3ca580(0x630)]['Gold'][_0x3ca580(0x77e)];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x1bd)]=Game_Party['prototype'][_0x52da50(0x1c1)],Game_Party[_0x52da50(0x48a)]['consumeItem']=function(_0x46ca61){const _0x37e395=_0x52da50;if(VisuMZ['CoreEngine'][_0x37e395(0x630)][_0x37e395(0x7cf)]['KeyItemProtect']&&DataManager[_0x37e395(0x74e)](_0x46ca61))return;VisuMZ['CoreEngine'][_0x37e395(0x1bd)][_0x37e395(0x4cc)](this,_0x46ca61);},Game_Party[_0x52da50(0x48a)][_0x52da50(0x22e)]=function(){const _0x5cf88e=_0x52da50,_0x326d43=VisuMZ[_0x5cf88e(0x9bb)]['Settings'][_0x5cf88e(0x7cf)],_0x4c540c=_0x326d43[_0x5cf88e(0x985)]??0x63;let _0x1a621e=[];if(_0x326d43['BTestItems']??!![]){if(_0x5cf88e(0x5f4)===_0x5cf88e(0x5f4))_0x1a621e=_0x1a621e[_0x5cf88e(0x5ca)]($dataItems);else{var _0x3db735=_0x45510a(_0x5804bc['$1']);try{_0x4bc12f*=_0x3d2fc0(_0x3db735);}catch(_0x4aec54){if(_0x544214[_0x5cf88e(0x6c9)]())_0x1cf73b[_0x5cf88e(0x1db)](_0x4aec54);}}}(_0x326d43['BTestWeapons']??!![])&&(_0x1a621e=_0x1a621e['concat']($dataWeapons));(_0x326d43[_0x5cf88e(0x43a)]??!![])&&(_0x1a621e=_0x1a621e[_0x5cf88e(0x5ca)]($dataArmors));for(const _0x1e10c8 of _0x1a621e){if(!_0x1e10c8)continue;if(_0x1e10c8['name'][_0x5cf88e(0x748)]()<=0x0)continue;if(_0x1e10c8['name'][_0x5cf88e(0x2bb)](/-----/i))continue;this['gainItem'](_0x1e10c8,_0x4c540c);}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x572)]=Game_Troop['prototype']['setup'],Game_Troop['prototype'][_0x52da50(0x626)]=function(_0x45cdaf){const _0x15ebc1=_0x52da50;$gameTemp[_0x15ebc1(0x7b4)](),$gameTemp[_0x15ebc1(0x50a)](_0x45cdaf),VisuMZ[_0x15ebc1(0x9bb)]['Game_Troop_setup']['call'](this,_0x45cdaf);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x99e)]=Game_Map[_0x52da50(0x48a)]['setup'],Game_Map[_0x52da50(0x48a)][_0x52da50(0x626)]=function(_0x1f4f24){const _0x2e7f65=_0x52da50;VisuMZ['CoreEngine']['Game_Map_setup'][_0x2e7f65(0x4cc)](this,_0x1f4f24),this[_0x2e7f65(0x7c4)](),this[_0x2e7f65(0x69e)](_0x1f4f24);},Game_Map[_0x52da50(0x48a)]['setupCoreEngine']=function(){const _0x2986c1=_0x52da50;this[_0x2986c1(0x96b)]=VisuMZ[_0x2986c1(0x9bb)][_0x2986c1(0x630)]['QoL'][_0x2986c1(0x549)]||![];const _0x5552bc=VisuMZ[_0x2986c1(0x9bb)]['Settings'][_0x2986c1(0x613)],_0x326519=$dataMap?$dataMap[_0x2986c1(0x61e)]||'':'';if(_0x326519[_0x2986c1(0x2bb)](/<SHOW TILE SHADOWS>/i))this[_0x2986c1(0x96b)]=![];else _0x326519[_0x2986c1(0x2bb)](/<HIDE TILE SHADOWS>/i)&&(this['_hideTileShadows']=!![]);if(_0x326519['match'](/<SCROLL LOCK X>/i))this['centerCameraCheckData']()[_0x2986c1(0x1b1)]=!![],this[_0x2986c1(0x6dc)]()['displayX']=_0x5552bc[_0x2986c1(0x334)];else _0x326519[_0x2986c1(0x2bb)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x2986c1(0x6dc)]()[_0x2986c1(0x1b1)]=!![],this['centerCameraCheckData']()[_0x2986c1(0x3ee)]=Number(RegExp['$1']));if(_0x326519[_0x2986c1(0x2bb)](/<SCROLL LOCK Y>/i))this[_0x2986c1(0x6dc)]()[_0x2986c1(0x746)]=!![],this[_0x2986c1(0x6dc)]()[_0x2986c1(0x6a4)]=_0x5552bc['DisplayLockY'];else _0x326519[_0x2986c1(0x2bb)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x2986c1(0x6dc)]()['centerY']=!![],this[_0x2986c1(0x6dc)]()[_0x2986c1(0x6a4)]=Number(RegExp['$1']));},Game_Map['prototype']['areTileShadowsHidden']=function(){const _0x2ea33e=_0x52da50;if(this[_0x2ea33e(0x96b)]===undefined)this[_0x2ea33e(0x69e)]();return this['_hideTileShadows'];},Game_Map[_0x52da50(0x48a)][_0x52da50(0x7c4)]=function(){const _0xf70ed7=_0x52da50,_0x771326=VisuMZ[_0xf70ed7(0x9bb)][_0xf70ed7(0x630)][_0xf70ed7(0x613)];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x771326['AutoScrollLockX']){const _0x133d7a=Graphics[_0xf70ed7(0x2b7)]/this[_0xf70ed7(0x25b)]();_0x133d7a%0x1!==0x0&&Math[_0xf70ed7(0x8ab)](_0x133d7a)===this['width']()&&!this[_0xf70ed7(0x6e3)]()&&('nfgxW'===_0xf70ed7(0x956)?(this[_0xf70ed7(0x747)][_0xf70ed7(0x1b1)]=!![],this[_0xf70ed7(0x747)]['displayX']=_0x771326[_0xf70ed7(0x334)]||0x0):_0x1b2b1b+=_0xf70ed7(0x950));}if(_0x771326[_0xf70ed7(0x97a)]){const _0x33adc3=Graphics['height']/this[_0xf70ed7(0x3bb)]();_0x33adc3%0x1!==0x0&&Math['ceil'](_0x33adc3)===this[_0xf70ed7(0x394)]()&&!this[_0xf70ed7(0x1c6)]()&&(this['_centerCameraCheck'][_0xf70ed7(0x746)]=!![],this[_0xf70ed7(0x747)][_0xf70ed7(0x6a4)]=_0x771326[_0xf70ed7(0x6a2)]||0x0);}},Game_Map['prototype'][_0x52da50(0x6dc)]=function(){const _0x28dc64=_0x52da50;if(this['_centerCameraCheck']===undefined)this[_0x28dc64(0x7c4)]();return this[_0x28dc64(0x747)];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x886)]=Game_Map[_0x52da50(0x48a)][_0x52da50(0x44b)],Game_Map[_0x52da50(0x48a)][_0x52da50(0x44b)]=function(_0x168b21){const _0x3d87ab=_0x52da50;if(this[_0x3d87ab(0x6dc)]()[_0x3d87ab(0x746)]&&$gameScreen[_0x3d87ab(0x8ee)]()===0x1){this[_0x3d87ab(0x19a)]=this[_0x3d87ab(0x6dc)]()[_0x3d87ab(0x6a4)];return;}VisuMZ[_0x3d87ab(0x9bb)][_0x3d87ab(0x886)][_0x3d87ab(0x4cc)](this,_0x168b21);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x774)]=Game_Map[_0x52da50(0x48a)]['scrollLeft'],Game_Map['prototype']['scrollLeft']=function(_0x53f2fd){const _0x5b06ae=_0x52da50;if(this[_0x5b06ae(0x6dc)]()[_0x5b06ae(0x1b1)]&&$gameScreen[_0x5b06ae(0x8ee)]()===0x1){this['_displayX']=this[_0x5b06ae(0x6dc)]()[_0x5b06ae(0x3ee)];return;}VisuMZ[_0x5b06ae(0x9bb)][_0x5b06ae(0x774)][_0x5b06ae(0x4cc)](this,_0x53f2fd);},VisuMZ['CoreEngine'][_0x52da50(0x99c)]=Game_Map['prototype']['scrollRight'],Game_Map['prototype']['scrollRight']=function(_0x311470){const _0x5c3db6=_0x52da50;if(this[_0x5c3db6(0x6dc)]()[_0x5c3db6(0x1b1)]&&$gameScreen[_0x5c3db6(0x8ee)]()===0x1){this[_0x5c3db6(0x4e7)]=this['centerCameraCheckData']()[_0x5c3db6(0x3ee)];return;}VisuMZ[_0x5c3db6(0x9bb)][_0x5c3db6(0x99c)][_0x5c3db6(0x4cc)](this,_0x311470);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x4ce)]=Game_Map[_0x52da50(0x48a)][_0x52da50(0x691)],Game_Map['prototype'][_0x52da50(0x691)]=function(_0x2eaa6b){const _0x46d6ba=_0x52da50;if(this[_0x46d6ba(0x6dc)]()[_0x46d6ba(0x746)]&&$gameScreen[_0x46d6ba(0x8ee)]()===0x1){if(_0x46d6ba(0x237)===_0x46d6ba(0x237)){this[_0x46d6ba(0x19a)]=this[_0x46d6ba(0x6dc)]()['displayY'];return;}else return _0x32182a[_0x46d6ba(0x9bb)][_0x46d6ba(0x630)]['QoL']['AccuracyBoost']&&this[_0x46d6ba(0x317)]()[_0x46d6ba(0x9dc)]()?this[_0x46d6ba(0x317)]()['hit']+0.05:this[_0x46d6ba(0x317)]()[_0x46d6ba(0x5ed)];}VisuMZ['CoreEngine'][_0x46d6ba(0x4ce)]['call'](this,_0x2eaa6b);},VisuMZ['CoreEngine'][_0x52da50(0x350)]=Game_Character[_0x52da50(0x48a)]['processMoveCommand'],Game_Character[_0x52da50(0x48a)][_0x52da50(0x212)]=function(_0x2d1042){const _0x5c4112=_0x52da50;try{if(_0x5c4112(0x625)!==_0x5c4112(0x625)){this['_commonEventLayers']++;let _0x14f4d8=_0x5bee3a[_0x5c4112(0x9bb)][_0x5c4112(0x99a)](_0x457151[_0x5c4112(0x536)]);_0x14f4d8[_0x5c4112(0x69a)]>0x0&&(_0x532283+=_0x4fc8ec,_0xd9e44e+=_0x4b1ca6,_0xc7cc54+=_0x5c4112(0x82f)[_0x5c4112(0x8de)](_0x18445d['id'],_0x5ae7b6[_0x5c4112(0x215)]),_0x20ed40+=_0x97780e,_0x16c4db+=_0x14f4d8,_0x3ed0cd+=_0x3dcd23,_0x5a61f1+=_0x5c4112(0x79e)[_0x5c4112(0x8de)](_0x1e692c['id'],_0x515e5c[_0x5c4112(0x215)]),_0x18dd92+=_0x20b5ce),this[_0x5c4112(0x67f)]--;}else VisuMZ[_0x5c4112(0x9bb)][_0x5c4112(0x350)][_0x5c4112(0x4cc)](this,_0x2d1042);}catch(_0x201b23){if(_0x5c4112(0x9f7)===_0x5c4112(0x5e9))return _0x176a88['CoreEngine'][_0x5c4112(0x558)][_0x5c4112(0x4cc)](this,_0x6cd935);else{if($gameTemp[_0x5c4112(0x6c9)]())console[_0x5c4112(0x1db)](_0x201b23);}}},Game_Player['prototype'][_0x52da50(0x729)]=function(){const _0x7893d1=_0x52da50,_0x166358=$gameMap['encounterStep']();this[_0x7893d1(0x6af)]=Math['randomInt'](_0x166358)+Math[_0x7893d1(0x607)](_0x166358)+this['encounterStepsMinimum']();},Game_Player[_0x52da50(0x48a)][_0x52da50(0x71f)]=function(){const _0x52a4b3=_0x52da50;return $dataMap&&$dataMap[_0x52a4b3(0x61e)]&&$dataMap[_0x52a4b3(0x61e)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x52a4b3(0x9bb)]['Settings'][_0x52a4b3(0x7cf)][_0x52a4b3(0x53a)];},VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents']=Game_Event[_0x52da50(0x48a)][_0x52da50(0x5b9)],Game_Event[_0x52da50(0x48a)][_0x52da50(0x5b9)]=function(_0x381d20,_0x445f07){const _0x3919e4=_0x52da50;if(this[_0x3919e4(0x191)]()){if(_0x3919e4(0x181)!==_0x3919e4(0x624))return this[_0x3919e4(0x3c9)](_0x381d20,_0x445f07);else _0x47a58f[_0x3919e4(0x389)]();}else{if('jTxqQ'===_0x3919e4(0x40b))return VisuMZ[_0x3919e4(0x9bb)][_0x3919e4(0x184)][_0x3919e4(0x4cc)](this,_0x381d20,_0x445f07);else _0x2caeda='Skill-%1-%2'[_0x3919e4(0x8de)](_0x42f6e4,_0x2f5b0f);}},Game_Event[_0x52da50(0x48a)][_0x52da50(0x191)]=function(){const _0x525a4d=_0x52da50;return VisuMZ[_0x525a4d(0x9bb)][_0x525a4d(0x630)][_0x525a4d(0x7cf)][_0x525a4d(0x395)];},Game_Event[_0x52da50(0x48a)][_0x52da50(0x3c9)]=function(_0x293fd1,_0x105d72){const _0x140e1c=_0x52da50;if(!this[_0x140e1c(0x189)]())return![];else{if(_0x140e1c(0x9c5)!=='BTmNm')this[_0x140e1c(0x90b)]={'SideView':_0x2cd7f1[_0x140e1c(0x617)],'BattleSystem':this[_0x140e1c(0x454)](),'FontSize':_0x3691dd[_0x140e1c(0x514)][_0x140e1c(0x830)],'Padding':0xc};else{const _0x501a71=$gameMap[_0x140e1c(0x600)](_0x293fd1,_0x105d72)[_0x140e1c(0x2f9)](_0x2c2f94=>_0x2c2f94[_0x140e1c(0x189)]());return _0x501a71['length']>0x0;}}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x19f)]=Game_Interpreter[_0x52da50(0x48a)][_0x52da50(0x735)],Game_Interpreter[_0x52da50(0x48a)][_0x52da50(0x735)]=function(_0x15a315){const _0x1c04f9=_0x52da50,_0x45b4fc=this[_0x1c04f9(0x5a3)]();if(_0x45b4fc['match'](/\/\/[ ]SCRIPT[ ]CALL/i))return _0x1c04f9(0x81f)===_0x1c04f9(0x81f)?this[_0x1c04f9(0x928)](_0x45b4fc):0.5*_0x1e7d07*_0x4ef673*((_0x3701aa+0x1)*_0x133e77-_0x21de04);else{if('jkmBX'===_0x1c04f9(0x870))return VisuMZ[_0x1c04f9(0x9bb)][_0x1c04f9(0x19f)][_0x1c04f9(0x4cc)](this,_0x15a315);else _0x2c9e97[_0x1c04f9(0x93a)]&&(this[_0x1c04f9(0x45c)]=_0x1c04f9(0x214));}},Game_Interpreter[_0x52da50(0x48a)][_0x52da50(0x5a3)]=function(){const _0x44afd4=_0x52da50;let _0xb61e68='',_0x47e8be=this[_0x44afd4(0x437)]+0x1;while(this[_0x44afd4(0x954)][_0x47e8be]&&this[_0x44afd4(0x954)][_0x47e8be][_0x44afd4(0x2a4)]===0x195){_0xb61e68+=this[_0x44afd4(0x954)][_0x47e8be][_0x44afd4(0x683)][0x0]+'\x0a',_0x47e8be++;}return _0xb61e68;},Game_Interpreter['prototype']['runCombinedScrollingTextAsCode']=function(_0x46e9de){const _0x1f72e3=_0x52da50;try{if(_0x1f72e3(0x277)!==_0x1f72e3(0x277)){if(this['_CoreEngineSettings']===_0x151abd)this[_0x1f72e3(0x29e)]();if(this[_0x1f72e3(0x90b)][_0x1f72e3(0x8e7)]===_0x4416cd)this['initCoreEngine']();this[_0x1f72e3(0x90b)][_0x1f72e3(0x8e7)]=_0x221f12;}else eval(_0x46e9de);}catch(_0x3128ab){if($gameTemp[_0x1f72e3(0x6c9)]()){if('awIgZ'===_0x1f72e3(0x8a2))return _0x53a24a['layoutSettings'][_0x1f72e3(0x8a0)]['call'](this);else console['log'](_0x1f72e3(0x99f)),console[_0x1f72e3(0x1db)](_0x3128ab);}}return!![];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x74f)]=Game_Interpreter['prototype'][_0x52da50(0x8a4)],Game_Interpreter[_0x52da50(0x48a)][_0x52da50(0x8a4)]=function(_0x1a77f0){const _0x965973=_0x52da50;try{VisuMZ[_0x965973(0x9bb)]['Game_Interpreter_command111'][_0x965973(0x4cc)](this,_0x1a77f0);}catch(_0x5470f1){$gameTemp['isPlaytest']()&&('EkcHX'!==_0x965973(0x915)?(console[_0x965973(0x1db)](_0x965973(0x9c6)),console['log'](_0x5470f1)):_0x19b4ab['VisuMZ_2_BattleSystemFTB']&&(this['_forcedBattleSys']=_0x965973(0x1cc))),this['skipBranch']();}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command122']=Game_Interpreter[_0x52da50(0x48a)][_0x52da50(0x53d)],Game_Interpreter[_0x52da50(0x48a)]['command122']=function(_0x354e91){const _0x48acea=_0x52da50;try{if(_0x48acea(0x7d9)!==_0x48acea(0x24e))VisuMZ['CoreEngine'][_0x48acea(0x9bc)][_0x48acea(0x4cc)](this,_0x354e91);else{const _0x2d2045=_0xfd9caa[_0x48acea(0x450)](_0x39c38b)+0x1;let _0x17e3d9=_0x3e4139+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x4adad7=_0x4dc335[_0x48acea(0x9bb)][_0x48acea(0x99a)](_0x2987b8[_0x48acea(0x536)]);_0x4adad7[_0x48acea(0x69a)]>0x0&&(_0xb2431[_0x48acea(0x69a)]>0x0?_0x2b2a5c+=_0x5451cf+_0x48acea(0x840):_0x437b03+=_0x44e978+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x48acea(0x8de)](_0x5c5bbc,_0x34019c[_0x48acea(0x215)]||_0x48acea(0x246))+_0x2f6b43,_0x278d7e+=_0x17e3d9[_0x48acea(0x8de)](_0x2d2045,_0x4adad7));}}catch(_0x55178f){if($gameTemp[_0x48acea(0x6c9)]()){if(_0x48acea(0x285)===_0x48acea(0x285))console[_0x48acea(0x1db)](_0x48acea(0x26e)),console[_0x48acea(0x1db)](_0x55178f);else{if(_0x31f750[_0x48acea(0xa27)]())return;_0x255fa7[_0x48acea(0x30e)](_0x1b303e,_0x3a1b2d);const _0x4baff4=_0x5a0f5b['option'];if(_0x4baff4[_0x48acea(0x2bb)](/Front/i))_0x560dbb['setSideView'](![]);else _0x4baff4['match'](/Side/i)?_0x11f9aa[_0x48acea(0x8e4)](!![]):_0x262a61[_0x48acea(0x8e4)](!_0x16db20[_0x48acea(0x6b7)]());}}}return!![];},VisuMZ[_0x52da50(0x9bb)]['Game_Interpreter_command355']=Game_Interpreter[_0x52da50(0x48a)]['command355'],Game_Interpreter[_0x52da50(0x48a)]['command355']=function(){const _0x15b186=_0x52da50;try{VisuMZ[_0x15b186(0x9bb)][_0x15b186(0x36b)][_0x15b186(0x4cc)](this);}catch(_0xd65f2){if($gameTemp[_0x15b186(0x6c9)]()){if('nlPZV'==='nlPZV')console[_0x15b186(0x1db)]('Script\x20Call\x20Error'),console[_0x15b186(0x1db)](_0xd65f2);else{if(this[_0x15b186(0x2c6)]()===this[_0x15b186(0x383)]-0x1)return;_0x326d72['clear'](),this['refresh'](),_0x302765[_0x15b186(0x230)](),this[_0x15b186(0x669)](this[_0x15b186(0x383)]-0x1);}}}return!![];},VisuMZ[_0x52da50(0x9bb)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x52da50(0x48a)][_0x52da50(0x3b2)],Game_Interpreter[_0x52da50(0x48a)][_0x52da50(0x3b2)]=function(_0x392484){const _0x3faef4=_0x52da50;return $gameTemp[_0x3faef4(0x419)](this),VisuMZ[_0x3faef4(0x9bb)][_0x3faef4(0x3c7)]['call'](this,_0x392484);},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x401)]=function(){const _0x2e10fd=_0x52da50;return VisuMZ[_0x2e10fd(0x9bb)]['Settings']['UI'][_0x2e10fd(0x421)];},Scene_Base['prototype'][_0x52da50(0x78b)]=function(){const _0x121789=_0x52da50;return VisuMZ['CoreEngine'][_0x121789(0x630)]['UI'][_0x121789(0x56a)];},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x342)]=function(){const _0x2e192f=_0x52da50;return VisuMZ[_0x2e192f(0x9bb)][_0x2e192f(0x630)]['UI']['BottomButtons'];},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x54b)]=function(){const _0x3140c3=_0x52da50;return VisuMZ[_0x3140c3(0x9bb)]['Settings']['UI']['RightMenus'];},Scene_Base[_0x52da50(0x48a)]['mainCommandWidth']=function(){const _0x2386da=_0x52da50;return VisuMZ[_0x2386da(0x9bb)][_0x2386da(0x630)]['UI'][_0x2386da(0x7ae)];},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x9e6)]=function(){const _0x4a35f8=_0x52da50;return VisuMZ[_0x4a35f8(0x9bb)][_0x4a35f8(0x630)]['UI'][_0x4a35f8(0x18c)];},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x475)]=function(){const _0x1fb625=_0x52da50;return VisuMZ['CoreEngine'][_0x1fb625(0x630)][_0x1fb625(0x5bc)][_0x1fb625(0x413)];},VisuMZ['CoreEngine'][_0x52da50(0x4af)]=Scene_Base[_0x52da50(0x48a)]['createWindowLayer'],Scene_Base[_0x52da50(0x48a)][_0x52da50(0x834)]=function(){const _0x1e0ac2=_0x52da50;VisuMZ[_0x1e0ac2(0x9bb)][_0x1e0ac2(0x4af)][_0x1e0ac2(0x4cc)](this),this[_0x1e0ac2(0x63a)](),this[_0x1e0ac2(0x2f2)]['x']=Math[_0x1e0ac2(0x442)](this[_0x1e0ac2(0x2f2)]['x']),this['_windowLayer']['y']=Math[_0x1e0ac2(0x442)](this['_windowLayer']['y']);},Scene_Base['prototype'][_0x52da50(0x63a)]=function(){},Scene_Base[_0x52da50(0x48a)]['buttonAssistKey1']=function(){const _0x1cbc6b=_0x52da50;return TextManager[_0x1cbc6b(0x7bd)](_0x1cbc6b(0x182),_0x1cbc6b(0x979));},Scene_Base['prototype'][_0x52da50(0x805)]=function(){const _0x1ca3b8=_0x52da50;return TextManager['getInputButtonString'](_0x1ca3b8(0x6fe));},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x2cc)]=function(){const _0x45755c=_0x52da50;return TextManager[_0x45755c(0x905)](_0x45755c(0x493));},Scene_Base[_0x52da50(0x48a)]['buttonAssistKey4']=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x52da50(0x48a)]['buttonAssistKey5']=function(){const _0x3fd8f4=_0x52da50;return TextManager[_0x3fd8f4(0x905)](_0x3fd8f4(0x36f));},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x4d4)]=function(){const _0x530a7a=_0x52da50;if(this[_0x530a7a(0x329)]&&this[_0x530a7a(0x329)]['visible']){if('gyyNw'!==_0x530a7a(0x3a1))_0xab39e7*=_0x20df10[_0x530a7a(0x8ee)]();else return TextManager['buttonAssistSwitch'];}else return'';},Scene_Base['prototype'][_0x52da50(0x296)]=function(){return'';},Scene_Base[_0x52da50(0x48a)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x955)]=function(){const _0x469887=_0x52da50;return TextManager[_0x469887(0x4e4)];},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x436)]=function(){const _0x2d67f4=_0x52da50;return TextManager[_0x2d67f4(0x9c7)];},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x592)]=function(){return 0x0;},Scene_Base['prototype'][_0x52da50(0x8cc)]=function(){return 0x0;},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x6d1)]=function(){return 0x0;},Scene_Base[_0x52da50(0x48a)]['buttonAssistOffset4']=function(){return 0x0;},Scene_Base[_0x52da50(0x48a)][_0x52da50(0x7fa)]=function(){return 0x0;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x8d1)]=Scene_Boot['prototype'][_0x52da50(0x6c6)],Scene_Boot['prototype']['loadSystemImages']=function(){const _0x13ecb6=_0x52da50;VisuMZ[_0x13ecb6(0x9bb)][_0x13ecb6(0x8d1)][_0x13ecb6(0x4cc)](this),this[_0x13ecb6(0x591)]();},Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x591)]=function(){const _0x257b3a=_0x52da50,_0x3ca0cf=[_0x257b3a(0x2fc),'battlebacks1','battlebacks2',_0x257b3a(0x816),'enemies',_0x257b3a(0x688),_0x257b3a(0x1d1),_0x257b3a(0x54d),_0x257b3a(0x643),_0x257b3a(0x362),_0x257b3a(0x810),'tilesets',_0x257b3a(0x696),'titles2'];for(const _0x1597bf of _0x3ca0cf){const _0x371b4a=VisuMZ[_0x257b3a(0x9bb)][_0x257b3a(0x630)][_0x257b3a(0x8c3)][_0x1597bf],_0x2df422=_0x257b3a(0x2a0)[_0x257b3a(0x8de)](_0x1597bf);for(const _0x324f90 of _0x371b4a){ImageManager[_0x257b3a(0x642)](_0x2df422,_0x324f90);}}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x87c)]=Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x7f7)],Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x7f7)]=function(){const _0x5c9b8f=_0x52da50;if(Utils[_0x5c9b8f(0x339)]('test')&&VisuMZ['CoreEngine'][_0x5c9b8f(0x630)][_0x5c9b8f(0x7cf)][_0x5c9b8f(0x39b)]){if(_0x5c9b8f(0x28a)!=='WFuqN')this[_0x5c9b8f(0x66c)]();else{const _0x4ae460={'targets':_0x41e497,'animationId':_0x52d7dd,'mirror':_0x5f1875,'mute':_0x22304a};this[_0x5c9b8f(0x485)][_0x5c9b8f(0x281)](_0x4ae460);for(const _0x25a989 of _0x3c6c06){_0x25a989['startAnimation']&&_0x25a989['startAnimation']();}}}else{if(_0x5c9b8f(0x2f8)===_0x5c9b8f(0x2f8))VisuMZ[_0x5c9b8f(0x9bb)][_0x5c9b8f(0x87c)][_0x5c9b8f(0x4cc)](this);else{const _0x2338ea=this[_0x5c9b8f(0x481)]();let _0x53cee9=_0x4a8edd[_0x5c9b8f(0x599)];this['setAction'](_0x168a4d,_0x2338ea[0x0]);for(const _0x2d9c48 of _0x2338ea){const _0xcfb33e=_0x2d9c48['evaluate']();_0xcfb33e>_0x53cee9&&(_0x53cee9=_0xcfb33e,this[_0x5c9b8f(0x869)](_0x4e3de5,_0x2d9c48));}}}},Scene_Boot[_0x52da50(0x48a)]['startAutoNewGame']=function(){const _0x540245=_0x52da50;DataManager[_0x540245(0x842)](),SceneManager[_0x540245(0x79d)](Scene_Map);},Scene_Boot['prototype'][_0x52da50(0x88f)]=function(){const _0x4ef8e9=_0x52da50,_0x1203e5=$dataSystem[_0x4ef8e9(0x514)][_0x4ef8e9(0x2d6)],_0x28d80c=$dataSystem[_0x4ef8e9(0x514)][_0x4ef8e9(0x2eb)],_0x130e28=VisuMZ[_0x4ef8e9(0x9bb)][_0x4ef8e9(0x630)]['UI'][_0x4ef8e9(0x766)];Graphics[_0x4ef8e9(0x19b)]=_0x1203e5-_0x130e28*0x2,Graphics[_0x4ef8e9(0x1f9)]=_0x28d80c-_0x130e28*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x52da50(0x9bb)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x220)],Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x220)]=function(){const _0xbb4d0d=_0x52da50;this[_0xbb4d0d(0x576)]()?_0xbb4d0d(0x403)===_0xbb4d0d(0x899)?this[_0xbb4d0d(0x582)]['x']=_0x3d66f9[_0xbb4d0d(0x19b)]+0x4:this[_0xbb4d0d(0x407)]():_0xbb4d0d(0x50b)!=='zCHZY'?VisuMZ[_0xbb4d0d(0x9bb)][_0xbb4d0d(0x40d)][_0xbb4d0d(0x4cc)](this):(this[_0xbb4d0d(0x1e4)]-=this['openingSpeed'](),this[_0xbb4d0d(0x408)]()&&(this[_0xbb4d0d(0x22d)]=![]));},Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x576)]=function(){const _0x653680=_0x52da50;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0x653680(0x5f7)]===_0x653680(0x84d))return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x653680(0x328)]==='0.00')return![];return!![];},Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x407)]=function(){const _0x4306c6=_0x52da50,_0x3470fd=$dataSystem['gameTitle'],_0x9971c8=Scene_Title[_0x4306c6(0x5f7)]||'',_0x1ba24c=Scene_Title[_0x4306c6(0x328)]||'',_0x46b2e2=VisuMZ[_0x4306c6(0x9bb)][_0x4306c6(0x630)]['MenuLayout'][_0x4306c6(0x6bf)]['DocumentTitleFmt'],_0x2c5824=_0x46b2e2['format'](_0x3470fd,_0x9971c8,_0x1ba24c);document['title']=_0x2c5824;},Scene_Boot[_0x52da50(0x48a)][_0x52da50(0x95b)]=function(){const _0x522613=_0x52da50;if(VisuMZ[_0x522613(0x9bb)][_0x522613(0x630)]['UI']['SideButtons']){if(_0x522613(0x85b)===_0x522613(0x85b)){const _0xe4a08b=Graphics[_0x522613(0x2b7)]-Graphics[_0x522613(0x19b)]-VisuMZ[_0x522613(0x9bb)]['Settings']['UI'][_0x522613(0x766)]*0x2,_0x51d81c=Sprite_Button[_0x522613(0x48a)][_0x522613(0x6d2)][_0x522613(0x4cc)](this)*0x4;if(_0xe4a08b>=_0x51d81c)SceneManager[_0x522613(0x5ab)](!![]);}else return![];}},Scene_Title[_0x52da50(0x5f7)]=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x75a)]['Title'][_0x52da50(0x84d)],Scene_Title[_0x52da50(0x328)]=VisuMZ['CoreEngine']['Settings'][_0x52da50(0x75a)][_0x52da50(0x6bf)]['Version'],Scene_Title[_0x52da50(0x200)]=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)]['TitlePicButtons'],VisuMZ['CoreEngine'][_0x52da50(0x65f)]=Scene_Title[_0x52da50(0x48a)]['drawGameTitle'],Scene_Title['prototype'][_0x52da50(0x5c8)]=function(){const _0x2a0128=_0x52da50;VisuMZ[_0x2a0128(0x9bb)]['Settings'][_0x2a0128(0x75a)][_0x2a0128(0x6bf)][_0x2a0128(0x5c8)][_0x2a0128(0x4cc)](this);if(Scene_Title[_0x2a0128(0x5f7)]!==''&&Scene_Title[_0x2a0128(0x5f7)]!==_0x2a0128(0x84d))this[_0x2a0128(0x4c5)]();if(Scene_Title['version']!==''&&Scene_Title['version']!==_0x2a0128(0x8e3))this[_0x2a0128(0x6f2)]();},Scene_Title[_0x52da50(0x48a)][_0x52da50(0x4c5)]=function(){const _0x1a60a5=_0x52da50;VisuMZ[_0x1a60a5(0x9bb)]['Settings'][_0x1a60a5(0x75a)]['Title'][_0x1a60a5(0x4c5)][_0x1a60a5(0x4cc)](this);},Scene_Title['prototype'][_0x52da50(0x6f2)]=function(){const _0x5c8d09=_0x52da50;VisuMZ[_0x5c8d09(0x9bb)][_0x5c8d09(0x630)][_0x5c8d09(0x75a)][_0x5c8d09(0x6bf)][_0x5c8d09(0x6f2)]['call'](this);},Scene_Title[_0x52da50(0x48a)][_0x52da50(0x860)]=function(){const _0x1b599a=_0x52da50;this[_0x1b599a(0x4b7)]();const _0x17e704=$dataSystem[_0x1b599a(0x9f5)]['background'],_0x17a13a=this['commandWindowRect']();this[_0x1b599a(0x846)]=new Window_TitleCommand(_0x17a13a),this[_0x1b599a(0x846)][_0x1b599a(0x56e)](_0x17e704);const _0x49dc05=this[_0x1b599a(0x1c3)]();this['_commandWindow'][_0x1b599a(0x6e8)](_0x49dc05['x'],_0x49dc05['y'],_0x49dc05['width'],_0x49dc05['height']),this[_0x1b599a(0x846)][_0x1b599a(0x530)](),this['_commandWindow'][_0x1b599a(0x666)](),this['_commandWindow'][_0x1b599a(0x390)](),this[_0x1b599a(0x2ff)](this[_0x1b599a(0x846)]);},Scene_Title[_0x52da50(0x48a)][_0x52da50(0x7bc)]=function(){const _0x57641c=_0x52da50;if(this[_0x57641c(0x846)]){if(_0x57641c(0x813)!==_0x57641c(0x813)){const _0xf3a5ac='_stored_pendingColor';this[_0x57641c(0x42d)]=this[_0x57641c(0x42d)]||{};if(this[_0x57641c(0x42d)][_0xf3a5ac])return this['_colorCache'][_0xf3a5ac];const _0x3d0de8=_0x1379ec['CoreEngine']['Settings'][_0x57641c(0x338)]['ColorTPCost'];return this[_0x57641c(0x441)](_0xf3a5ac,_0x3d0de8);}else return this[_0x57641c(0x846)]['maxItems']();}else return VisuMZ[_0x57641c(0x9bb)]['Settings'][_0x57641c(0x684)][_0x57641c(0x69a)];},Scene_Title[_0x52da50(0x48a)][_0x52da50(0x1c3)]=function(){const _0x7005a1=_0x52da50;return VisuMZ[_0x7005a1(0x9bb)][_0x7005a1(0x630)][_0x7005a1(0x75a)][_0x7005a1(0x6bf)][_0x7005a1(0x1c2)][_0x7005a1(0x4cc)](this);},Scene_Title[_0x52da50(0x48a)]['createTitleButtons']=function(){const _0x480471=_0x52da50;for(const _0x4a548a of Scene_Title[_0x480471(0x200)]){const _0x3f5aca=new Sprite_TitlePictureButton(_0x4a548a);this[_0x480471(0x1d0)](_0x3f5aca);}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x4dc)]=Scene_Map[_0x52da50(0x48a)][_0x52da50(0x2a5)],Scene_Map[_0x52da50(0x48a)][_0x52da50(0x2a5)]=function(){const _0x2ac654=_0x52da50;VisuMZ[_0x2ac654(0x9bb)]['Scene_Map_initialize'][_0x2ac654(0x4cc)](this),$gameTemp[_0x2ac654(0x7b4)](),this[_0x2ac654(0x283)]();},VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply']=Scene_Map[_0x52da50(0x48a)][_0x52da50(0x7b5)],Scene_Map[_0x52da50(0x48a)][_0x52da50(0x7b5)]=function(){const _0x834032=_0x52da50;VisuMZ[_0x834032(0x9bb)][_0x834032(0x962)][_0x834032(0x4cc)](this),$gameTemp[_0x834032(0x57c)]&&!$gameMessage['isBusy']()&&(_0x834032(0x7ef)===_0x834032(0x7ef)?(this[_0x834032(0x5d4)](),SceneManager[_0x834032(0x750)]()):this[_0x834032(0x1ad)]());},Scene_Map['prototype'][_0x52da50(0x60e)]=function(){const _0x2ff209=_0x52da50;Scene_Message[_0x2ff209(0x48a)][_0x2ff209(0x60e)][_0x2ff209(0x4cc)](this);if(!SceneManager[_0x2ff209(0x265)](Scene_Battle)){if(_0x2ff209(0x382)!=='IGJGF')this[_0x2ff209(0x4b3)][_0x2ff209(0x6c5)](),this[_0x2ff209(0x31d)][_0x2ff209(0x9bf)](),this[_0x2ff209(0x2f2)][_0x2ff209(0x425)]=![],SceneManager[_0x2ff209(0x8f7)]();else return _0x13ae6f[_0x2ff209(0x9bb)][_0x2ff209(0x85a)][_0x2ff209(0x4cc)](this)[_0x2ff209(0x522)](0x0,0x1);}$gameScreen['clearZoom'](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x52da50(0x9bb)]['Scene_Map_createMenuButton']=Scene_Map[_0x52da50(0x48a)][_0x52da50(0x6d6)],Scene_Map[_0x52da50(0x48a)][_0x52da50(0x6d6)]=function(){const _0x106c44=_0x52da50;VisuMZ[_0x106c44(0x9bb)]['Scene_Map_createMenuButton'][_0x106c44(0x4cc)](this),SceneManager[_0x106c44(0x974)]()&&this[_0x106c44(0x444)]();},Scene_Map[_0x52da50(0x48a)][_0x52da50(0x444)]=function(){const _0x33db61=_0x52da50;this[_0x33db61(0x32b)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x5e3)]=Scene_Map[_0x52da50(0x48a)][_0x52da50(0x377)],Scene_Map[_0x52da50(0x48a)][_0x52da50(0x377)]=function(){const _0x3b5dae=_0x52da50;VisuMZ[_0x3b5dae(0x9bb)][_0x3b5dae(0x5e3)][_0x3b5dae(0x4cc)](this),this[_0x3b5dae(0x26b)]();},Scene_Map[_0x52da50(0x48a)]['updateDashToggle']=function(){const _0x4aa84d=_0x52da50;Input[_0x4aa84d(0x434)](_0x4aa84d(0x25c))&&(ConfigManager['alwaysDash']=!ConfigManager[_0x4aa84d(0x6ad)],ConfigManager['save']());},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x373)]=Scene_Map[_0x52da50(0x48a)]['updateMain'],Scene_Map[_0x52da50(0x48a)][_0x52da50(0x5d4)]=function(){const _0x38f2a8=_0x52da50;VisuMZ[_0x38f2a8(0x9bb)][_0x38f2a8(0x373)][_0x38f2a8(0x4cc)](this),this[_0x38f2a8(0x552)]();},Scene_Map['prototype'][_0x52da50(0x283)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x52da50(0x48a)][_0x52da50(0x552)]=function(){const _0x30b340=_0x52da50;if(!this[_0x30b340(0x4fd)])return;for(const _0x40a361 of this[_0x30b340(0x4fd)]){_0x40a361&&_0x40a361[_0x30b340(0x6c5)]();}},Scene_Map['prototype'][_0x52da50(0x527)]=function(_0x32cd9f){const _0x2c676e=_0x52da50,_0x2b3cdb=$dataCommonEvents[_0x32cd9f];if(!_0x2b3cdb)return;const _0xee9fbd=new Game_OnceParallelInterpreter();this[_0x2c676e(0x5c3)](_0xee9fbd),_0xee9fbd['setCommonEvent'](_0x32cd9f);},Scene_Map[_0x52da50(0x48a)][_0x52da50(0x5c3)]=function(_0x26ad9b){const _0x295ec8=_0x52da50;this['_onceParallelInterpreters']=this['_onceParallelInterpreters']||[],this[_0x295ec8(0x4fd)][_0x295ec8(0x281)](_0x26ad9b);},Scene_Map[_0x52da50(0x48a)][_0x52da50(0x912)]=function(_0x3bf0d3){const _0x13fed1=_0x52da50;this[_0x13fed1(0x4fd)]=this[_0x13fed1(0x4fd)]||[],this[_0x13fed1(0x4fd)]['remove'](_0x3bf0d3);};function Game_OnceParallelInterpreter(){const _0x169e84=_0x52da50;this[_0x169e84(0x2a5)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object[_0x52da50(0x737)](Game_Interpreter[_0x52da50(0x48a)]),Game_OnceParallelInterpreter[_0x52da50(0x48a)]['constructor']=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x52da50(0x48a)]['setCommonEvent']=function(_0x3c13f3){const _0x37db55=_0x52da50,_0x354cac=$dataCommonEvents[_0x3c13f3];if(_0x354cac)this[_0x37db55(0x626)](_0x354cac[_0x37db55(0x536)],0x0);else{if(_0x37db55(0x773)==='bGHeK')return _0x204fae&&_0x2f0ba8['_scene']?_0x2ef23e[_0x37db55(0x1aa)][_0x37db55(0x475)]():!![];else this[_0x37db55(0x60e)]();}},Game_OnceParallelInterpreter['prototype'][_0x52da50(0x60e)]=function(){const _0x503963=_0x52da50;if(!SceneManager['isSceneMap']())return;SceneManager[_0x503963(0x1aa)][_0x503963(0x912)](this),Game_Interpreter[_0x503963(0x48a)][_0x503963(0x60e)][_0x503963(0x4cc)](this);},VisuMZ[_0x52da50(0x9bb)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x584)],Scene_MenuBase[_0x52da50(0x48a)]['helpAreaTop']=function(){const _0x4d1c32=_0x52da50;let _0x434253=0x0;if(SceneManager[_0x4d1c32(0x927)]())_0x434253=this['helpAreaTopSideButtonLayout']();else{if(_0x4d1c32(0x48e)===_0x4d1c32(0x4be)){var _0x163021=_0x1b263b-2.25/2.75;return 7.5625*_0x163021*_0x163021+0.9375;}else _0x434253=VisuMZ[_0x4d1c32(0x9bb)][_0x4d1c32(0x2d2)][_0x4d1c32(0x4cc)](this);}return _0x434253;},Scene_MenuBase['prototype'][_0x52da50(0x874)]=function(){const _0x130609=_0x52da50;return this[_0x130609(0x78b)]()?this[_0x130609(0x2e5)]():0x0;},VisuMZ['CoreEngine'][_0x52da50(0x90a)]=Scene_MenuBase[_0x52da50(0x48a)]['mainAreaTop'],Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x2ea)]=function(){const _0x4da856=_0x52da50;return SceneManager[_0x4da856(0x927)]()?this[_0x4da856(0x374)]():VisuMZ['CoreEngine'][_0x4da856(0x90a)][_0x4da856(0x4cc)](this);},Scene_MenuBase[_0x52da50(0x48a)]['mainAreaTopSideButtonLayout']=function(){const _0x31bad9=_0x52da50;if(!this[_0x31bad9(0x78b)]())return this[_0x31bad9(0x75e)]();else{if(this['isMenuButtonAssistEnabled']()&&this[_0x31bad9(0x5f0)]()===_0x31bad9(0x19d))return'tIyCA'!==_0x31bad9(0x815)?7.5625*_0x948205*_0xf47d05:Window_ButtonAssist['prototype'][_0x31bad9(0x75c)]();else{if(_0x31bad9(0x80a)!=='cyCAn'){const _0x5341d3=_0x692143[_0x31bad9(0x9bb)][_0x31bad9(0x630)][_0x31bad9(0x767)];if(_0x5341d3&&_0x5341d3[_0x31bad9(0x908)])return _0x5341d3[_0x31bad9(0x908)][_0x31bad9(0x4cc)](this);const _0x5ef2af=_0x375eb6['_shakePower']*0.75,_0x43cefd=_0x528288[_0x31bad9(0x896)]*0.6,_0xf95e25=_0x3de471[_0x31bad9(0x2b0)];this['x']+=_0xb55077[_0x31bad9(0x442)](_0x50ad88[_0x31bad9(0x607)](_0x5ef2af)-_0xe986e1[_0x31bad9(0x607)](_0x43cefd))*(_0x24844f['min'](_0xf95e25,0x1e)*0.5),this['y']+=_0x4368b3[_0x31bad9(0x442)](_0x2aec91[_0x31bad9(0x607)](_0x5ef2af)-_0x477338[_0x31bad9(0x607)](_0x43cefd))*(_0x2a34bd[_0x31bad9(0x8e5)](_0xf95e25,0x1e)*0.5);}else return 0x0;}}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x76d)]=Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x355)],Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x355)]=function(){const _0x270de1=_0x52da50;let _0x5e77c4=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x5e77c4=this[_0x270de1(0x5dc)]():_0x270de1(0x336)===_0x270de1(0x6fb)?_0xb7f8d6['name']=_0x1a5964(_0x11e89b['$2'][_0x270de1(0x748)]()):_0x5e77c4=VisuMZ[_0x270de1(0x9bb)]['Scene_MenuBase_mainAreaHeight'][_0x270de1(0x4cc)](this),this[_0x270de1(0x7f3)]()&&this['getButtonAssistLocation']()!==_0x270de1(0x4f4)&&(_0x5e77c4-=Window_ButtonAssist[_0x270de1(0x48a)][_0x270de1(0x75c)]()),_0x5e77c4;},Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x5dc)]=function(){return Graphics['boxHeight']-this['helpAreaHeight']();},VisuMZ['CoreEngine'][_0x52da50(0x88a)]=Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0xa1a)],Scene_MenuBase['prototype'][_0x52da50(0xa1a)]=function(){const _0x23eb48=_0x52da50,_0x4549a2=VisuMZ[_0x23eb48(0x9bb)][_0x23eb48(0x630)]['MenuBg']['BlurStrength']??0x8;this[_0x23eb48(0x1e1)]=new PIXI['filters'][(_0x23eb48(0x787))](_0x4549a2),this[_0x23eb48(0x5a8)]=new Sprite(),this[_0x23eb48(0x5a8)][_0x23eb48(0x42c)]=SceneManager[_0x23eb48(0x81c)](),this[_0x23eb48(0x5a8)]['filters']=[this['_backgroundFilter']],this['addChild'](this['_backgroundSprite']),this[_0x23eb48(0x344)](0xc0),this[_0x23eb48(0x344)](this[_0x23eb48(0x9ae)]()),this[_0x23eb48(0x90d)]();},Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x9ae)]=function(){const _0x2c85b1=_0x52da50,_0x39af44=String(this['constructor'][_0x2c85b1(0x215)]),_0x1c60be=this[_0x2c85b1(0x8ad)](_0x39af44);return _0x1c60be?_0x2c85b1(0x3d5)!==_0x2c85b1(0x818)?_0x1c60be[_0x2c85b1(0x498)]:_0xdc9f0[_0x2c85b1(0x48a)][_0x2c85b1(0x75c)]():0xc0;},Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x90d)]=function(){const _0x2720a6=_0x52da50,_0x2da23f=String(this[_0x2720a6(0x2ba)][_0x2720a6(0x215)]),_0x118031=this[_0x2720a6(0x8ad)](_0x2da23f);if(_0x118031&&(_0x118031[_0x2720a6(0x375)]!==''||_0x118031[_0x2720a6(0x3e1)]!=='')){if(_0x2720a6(0x9b6)===_0x2720a6(0x8d3))return _0x1b77c0['layoutSettings'][_0x2720a6(0x33f)][_0x2720a6(0x4cc)](this);else this[_0x2720a6(0x2fb)]=new Sprite(ImageManager[_0x2720a6(0x965)](_0x118031[_0x2720a6(0x375)])),this[_0x2720a6(0x9e3)]=new Sprite(ImageManager['loadTitle2'](_0x118031[_0x2720a6(0x3e1)])),this[_0x2720a6(0x1d0)](this['_backSprite1']),this[_0x2720a6(0x1d0)](this[_0x2720a6(0x9e3)]),this[_0x2720a6(0x2fb)][_0x2720a6(0x42c)][_0x2720a6(0x18f)](this[_0x2720a6(0x9d0)]['bind'](this,this[_0x2720a6(0x2fb)])),this['_backSprite2'][_0x2720a6(0x42c)][_0x2720a6(0x18f)](this[_0x2720a6(0x9d0)][_0x2720a6(0x4e6)](this,this[_0x2720a6(0x9e3)]));}},Scene_MenuBase['prototype'][_0x52da50(0x8ad)]=function(_0x2fdd42){const _0x406842=_0x52da50;return VisuMZ[_0x406842(0x9bb)]['Settings'][_0x406842(0x533)][_0x2fdd42]||VisuMZ[_0x406842(0x9bb)][_0x406842(0x630)][_0x406842(0x533)]['Scene_Unlisted'];},Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x9d0)]=function(_0x1ca164){const _0x350954=_0x52da50;this[_0x350954(0xa08)](_0x1ca164),this[_0x350954(0x9fb)](_0x1ca164);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x895)]=Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x2df)],Scene_MenuBase[_0x52da50(0x48a)]['createCancelButton']=function(){const _0x4b89b5=_0x52da50;VisuMZ[_0x4b89b5(0x9bb)][_0x4b89b5(0x895)][_0x4b89b5(0x4cc)](this);if(SceneManager['isSideButtonLayout']()){if(_0x4b89b5(0x943)==='lkepG')this['moveCancelButtonSideButtonLayout']();else return _0x53b596[_0x4b89b5(0x498)];}},Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x933)]=function(){const _0x1c8633=_0x52da50;this['_cancelButton']['x']=Graphics[_0x1c8633(0x19b)]+0x4;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x86c)]=Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x9ec)],Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x9ec)]=function(){const _0x4d67ee=_0x52da50;VisuMZ[_0x4d67ee(0x9bb)][_0x4d67ee(0x86c)][_0x4d67ee(0x4cc)](this),SceneManager[_0x4d67ee(0x974)]()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x704)]=function(){const _0x4198c8=_0x52da50;this['_pageupButton']['x']=-0x1*(this[_0x4198c8(0x329)][_0x4198c8(0x2b7)]+this['_pagedownButton'][_0x4198c8(0x2b7)]+0x8),this[_0x4198c8(0x418)]['x']=-0x1*(this[_0x4198c8(0x418)][_0x4198c8(0x2b7)]+0x4);},Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x7f3)]=function(){const _0x3db643=_0x52da50;return VisuMZ['CoreEngine'][_0x3db643(0x630)]['ButtonAssist'][_0x3db643(0x3e7)];},Scene_MenuBase['prototype'][_0x52da50(0x5f0)]=function(){const _0x33d62b=_0x52da50;return SceneManager[_0x33d62b(0x974)]()||SceneManager['areButtonsHidden']()?VisuMZ['CoreEngine'][_0x33d62b(0x630)][_0x33d62b(0x30b)]['Location']:'Nljpt'===_0x33d62b(0x80c)?_0xbdbf68['layoutSettings'][_0x33d62b(0x33f)][_0x33d62b(0x4cc)](this):_0x33d62b(0x4f4);},Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x63a)]=function(){const _0xe49a62=_0x52da50;if(!this[_0xe49a62(0x7f3)]())return;const _0x4b6c7d=this[_0xe49a62(0x5ee)]();this[_0xe49a62(0x29a)]=new Window_ButtonAssist(_0x4b6c7d),this[_0xe49a62(0x2ff)](this[_0xe49a62(0x29a)]);},Scene_MenuBase[_0x52da50(0x48a)][_0x52da50(0x5ee)]=function(){const _0x1e6c82=_0x52da50;return this['getButtonAssistLocation']()===_0x1e6c82(0x4f4)?this['buttonAssistWindowButtonRect']():_0x1e6c82(0x59d)!==_0x1e6c82(0x3fa)?this[_0x1e6c82(0x7b0)]():this[_0x1e6c82(0x75e)]();},Scene_MenuBase['prototype']['buttonAssistWindowButtonRect']=function(){const _0x15ec7c=_0x52da50,_0x39c5ef=ConfigManager[_0x15ec7c(0x58b)]?(Sprite_Button[_0x15ec7c(0x48a)][_0x15ec7c(0x6d2)]()+0x6)*0x2:0x0,_0x47177d=this['buttonY'](),_0x591941=Graphics['boxWidth']-_0x39c5ef*0x2,_0x3a5379=this[_0x15ec7c(0x9e6)]();return new Rectangle(_0x39c5ef,_0x47177d,_0x591941,_0x3a5379);},Scene_MenuBase[_0x52da50(0x48a)]['buttonAssistWindowSideRect']=function(){const _0x2532c8=_0x52da50,_0x33e105=Graphics[_0x2532c8(0x19b)],_0x5e5c0d=Window_ButtonAssist['prototype'][_0x2532c8(0x75c)](),_0x3419a6=0x0;let _0x16e2f5=0x0;return this[_0x2532c8(0x5f0)]()===_0x2532c8(0x19d)?_0x2532c8(0x45e)!==_0x2532c8(0x92f)?_0x16e2f5=0x0:(this[_0x2532c8(0xa18)]()&&this['repositionEnemiesByResolution'](),_0x131a6c[_0x2532c8(0x9bb)]['Spriteset_Battle_createEnemies']['call'](this)):_0x16e2f5=Graphics[_0x2532c8(0x1f9)]-_0x5e5c0d,new Rectangle(_0x3419a6,_0x16e2f5,_0x33e105,_0x5e5c0d);},Scene_Menu[_0x52da50(0x610)]=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x75a)]['MainMenu'],VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x809)]=Scene_Menu[_0x52da50(0x48a)]['create'],Scene_Menu[_0x52da50(0x48a)][_0x52da50(0x737)]=function(){const _0x5e9c79=_0x52da50;VisuMZ[_0x5e9c79(0x9bb)][_0x5e9c79(0x809)][_0x5e9c79(0x4cc)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x52da50(0x48a)][_0x52da50(0x3eb)]=function(){const _0x5228e9=_0x52da50;if(this['_commandWindow']){if('xohTP'!==_0x5228e9(0x93d))this[_0x5228e9(0x846)][_0x5228e9(0x56e)](Scene_Menu[_0x5228e9(0x610)][_0x5228e9(0x98a)]);else{const _0xebe19a='AllMaps';this['_storedMapText']['remove'](_0x1b71d8)[_0x5228e9(0x6da)]('')[_0x5228e9(0x6da)](null);const _0x5f1cbb=this[_0x5228e9(0xa02)][_0x5228e9(0x30f)](_0x5228e9(0x840))['trim']();_0x471460[_0x5228e9(0x9bb)][_0x5228e9(0x623)](_0x5f1cbb,_0xebe19a,!![]),_0x761f77['_scene']['_active']=!![];}}this[_0x5228e9(0x5d9)]&&this[_0x5228e9(0x5d9)]['setBackgroundType'](Scene_Menu['layoutSettings'][_0x5228e9(0x7c6)]),this[_0x5228e9(0x91b)]&&this[_0x5228e9(0x91b)][_0x5228e9(0x56e)](Scene_Menu[_0x5228e9(0x610)]['StatusBgType']);},Scene_Menu[_0x52da50(0x48a)][_0x52da50(0x1c3)]=function(){const _0xdd8fc5=_0x52da50;return Scene_Menu[_0xdd8fc5(0x610)][_0xdd8fc5(0x1c2)]['call'](this);},Scene_Menu[_0x52da50(0x48a)][_0x52da50(0x8ac)]=function(){const _0x22a0c3=_0x52da50;return Scene_Menu[_0x22a0c3(0x610)][_0x22a0c3(0x5c0)]['call'](this);},Scene_Menu[_0x52da50(0x48a)][_0x52da50(0x96c)]=function(){const _0x47c0b0=_0x52da50;return Scene_Menu[_0x47c0b0(0x610)]['StatusRect'][_0x47c0b0(0x4cc)](this);},Scene_Item[_0x52da50(0x610)]=VisuMZ['CoreEngine'][_0x52da50(0x630)][_0x52da50(0x75a)][_0x52da50(0x465)],VisuMZ['CoreEngine'][_0x52da50(0x89b)]=Scene_Item[_0x52da50(0x48a)][_0x52da50(0x737)],Scene_Item['prototype'][_0x52da50(0x737)]=function(){const _0x4cd005=_0x52da50;VisuMZ[_0x4cd005(0x9bb)][_0x4cd005(0x89b)][_0x4cd005(0x4cc)](this),this[_0x4cd005(0x3eb)]();},Scene_Item['prototype'][_0x52da50(0x3eb)]=function(){const _0x366a69=_0x52da50;this[_0x366a69(0x458)]&&this[_0x366a69(0x458)][_0x366a69(0x56e)](Scene_Item['layoutSettings']['HelpBgType']);this[_0x366a69(0x260)]&&(_0x366a69(0x8d7)===_0x366a69(0x4ef)?(_0x5c0040[_0x366a69(0x891)]=_0x37400f,_0x2405f0[_0x366a69(0x5e0)](_0x5462d1)):this[_0x366a69(0x260)][_0x366a69(0x56e)](Scene_Item['layoutSettings']['CategoryBgType']));this['_itemWindow']&&this['_itemWindow'][_0x366a69(0x56e)](Scene_Item[_0x366a69(0x610)][_0x366a69(0x543)]);if(this[_0x366a69(0x4c7)]){if(_0x366a69(0x1d9)!==_0x366a69(0x224))this['_actorWindow']['setBackgroundType'](Scene_Item[_0x366a69(0x610)][_0x366a69(0x799)]);else{if(this['_hideTileShadows']===_0x427a0f)this[_0x366a69(0x69e)]();return this[_0x366a69(0x96b)];}}},Scene_Item[_0x52da50(0x48a)][_0x52da50(0x924)]=function(){const _0x23378e=_0x52da50;return Scene_Item[_0x23378e(0x610)][_0x23378e(0x6e6)][_0x23378e(0x4cc)](this);},Scene_Item['prototype'][_0x52da50(0x5d3)]=function(){const _0x556f9e=_0x52da50;return Scene_Item[_0x556f9e(0x610)][_0x556f9e(0x33f)][_0x556f9e(0x4cc)](this);},Scene_Item['prototype']['itemWindowRect']=function(){const _0x3abc77=_0x52da50;return Scene_Item[_0x3abc77(0x610)][_0x3abc77(0x256)][_0x3abc77(0x4cc)](this);},Scene_Item[_0x52da50(0x48a)]['actorWindowRect']=function(){const _0xb8813a=_0x52da50;return Scene_Item[_0xb8813a(0x610)][_0xb8813a(0x2f6)][_0xb8813a(0x4cc)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x75a)]['SkillMenu'],VisuMZ[_0x52da50(0x9bb)]['Scene_Skill_create']=Scene_Skill['prototype']['create'],Scene_Skill[_0x52da50(0x48a)][_0x52da50(0x737)]=function(){const _0xbabc37=_0x52da50;VisuMZ[_0xbabc37(0x9bb)][_0xbabc37(0x52b)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x52da50(0x48a)][_0x52da50(0x3eb)]=function(){const _0x610af8=_0x52da50;if(this['_helpWindow']){if('qHjMu'===_0x610af8(0x74a)){if(!!_0x1e14e7[_0x35f12a]){if(_0xb644c3['isPlaytest']())_0x28b643[_0x610af8(0x1db)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x610af8(0x8de)](_0x129763));}const _0x5db6c9='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x610af8(0x8de)](_0x83c86,_0x4ace35);_0x335768[_0xc727ba]=new _0xa16606(_0x5db6c9);}else this['_helpWindow'][_0x610af8(0x56e)](Scene_Skill[_0x610af8(0x610)][_0x610af8(0x333)]);}this['_skillTypeWindow']&&this[_0x610af8(0x254)]['setBackgroundType'](Scene_Skill[_0x610af8(0x610)][_0x610af8(0xa20)]);this[_0x610af8(0x91b)]&&(_0x610af8(0x708)===_0x610af8(0x467)?this[_0x610af8(0x4e5)]['setBackgroundType'](_0x4e3910[_0x610af8(0x610)][_0x610af8(0x73a)]):this[_0x610af8(0x91b)][_0x610af8(0x56e)](Scene_Skill[_0x610af8(0x610)][_0x610af8(0x1b8)]));this['_itemWindow']&&(_0x610af8(0x907)===_0x610af8(0x907)?this[_0x610af8(0x96a)][_0x610af8(0x56e)](Scene_Skill[_0x610af8(0x610)][_0x610af8(0x543)]):this[_0x610af8(0x937)](_0x610af8(0x293)));if(this[_0x610af8(0x4c7)]){if('kLhfk'!==_0x610af8(0x4ba))this[_0x610af8(0x4c7)][_0x610af8(0x56e)](Scene_Skill[_0x610af8(0x610)][_0x610af8(0x799)]);else return _0x3bba60[_0x610af8(0x9bb)][_0x610af8(0x630)]['Window'][_0x610af8(0x6b1)];}},Scene_Skill['prototype'][_0x52da50(0x924)]=function(){const _0x252905=_0x52da50;return Scene_Skill[_0x252905(0x610)][_0x252905(0x6e6)]['call'](this);},Scene_Skill[_0x52da50(0x48a)][_0x52da50(0x1e0)]=function(){const _0x341426=_0x52da50;return Scene_Skill['layoutSettings']['SkillTypeRect'][_0x341426(0x4cc)](this);},Scene_Skill[_0x52da50(0x48a)][_0x52da50(0x96c)]=function(){const _0x5e43e3=_0x52da50;return Scene_Skill[_0x5e43e3(0x610)][_0x5e43e3(0x9be)][_0x5e43e3(0x4cc)](this);},Scene_Skill['prototype']['itemWindowRect']=function(){const _0x320d3c=_0x52da50;return Scene_Skill['layoutSettings'][_0x320d3c(0x256)][_0x320d3c(0x4cc)](this);},Scene_Skill[_0x52da50(0x48a)][_0x52da50(0x213)]=function(){const _0x55629a=_0x52da50;return Scene_Skill['layoutSettings']['ActorRect'][_0x55629a(0x4cc)](this);},Scene_Equip[_0x52da50(0x610)]=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x75a)]['EquipMenu'],VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x3d7)]=Scene_Equip[_0x52da50(0x48a)][_0x52da50(0x737)],Scene_Equip['prototype'][_0x52da50(0x737)]=function(){const _0x28382d=_0x52da50;VisuMZ[_0x28382d(0x9bb)][_0x28382d(0x3d7)][_0x28382d(0x4cc)](this),this[_0x28382d(0x3eb)]();},Scene_Equip['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x3e1991=_0x52da50;this[_0x3e1991(0x458)]&&this[_0x3e1991(0x458)][_0x3e1991(0x56e)](Scene_Equip[_0x3e1991(0x610)]['HelpBgType']);if(this[_0x3e1991(0x91b)]){if(_0x3e1991(0x8ed)===_0x3e1991(0x849)){for(const _0x337cba of this[_0x3e1991(0x888)]){!_0x337cba[_0x3e1991(0x4de)]()&&this[_0x3e1991(0x1fa)](_0x337cba);}this[_0x3e1991(0x3d3)]();}else this[_0x3e1991(0x91b)][_0x3e1991(0x56e)](Scene_Equip['layoutSettings'][_0x3e1991(0x1b8)]);}this[_0x3e1991(0x846)]&&this[_0x3e1991(0x846)][_0x3e1991(0x56e)](Scene_Equip['layoutSettings'][_0x3e1991(0x98a)]),this[_0x3e1991(0x39f)]&&this[_0x3e1991(0x39f)][_0x3e1991(0x56e)](Scene_Equip[_0x3e1991(0x610)][_0x3e1991(0x90f)]),this[_0x3e1991(0x96a)]&&this[_0x3e1991(0x96a)]['setBackgroundType'](Scene_Equip['layoutSettings']['ItemBgType']);},Scene_Equip[_0x52da50(0x48a)][_0x52da50(0x924)]=function(){const _0x3eefda=_0x52da50;return Scene_Equip[_0x3eefda(0x610)][_0x3eefda(0x6e6)]['call'](this);},Scene_Equip[_0x52da50(0x48a)][_0x52da50(0x96c)]=function(){const _0x2572e0=_0x52da50;return Scene_Equip[_0x2572e0(0x610)]['StatusRect'][_0x2572e0(0x4cc)](this);},Scene_Equip[_0x52da50(0x48a)][_0x52da50(0x1c3)]=function(){const _0x451c62=_0x52da50;return Scene_Equip[_0x451c62(0x610)][_0x451c62(0x1c2)]['call'](this);},Scene_Equip['prototype'][_0x52da50(0x4e2)]=function(){const _0x2cf5a6=_0x52da50;return Scene_Equip[_0x2cf5a6(0x610)][_0x2cf5a6(0x634)]['call'](this);},Scene_Equip[_0x52da50(0x48a)][_0x52da50(0x28f)]=function(){const _0x70b2eb=_0x52da50;return Scene_Equip['layoutSettings'][_0x70b2eb(0x256)]['call'](this);},Scene_Status[_0x52da50(0x610)]=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x75a)][_0x52da50(0x835)],VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x297)]=Scene_Status[_0x52da50(0x48a)][_0x52da50(0x737)],Scene_Status['prototype'][_0x52da50(0x737)]=function(){const _0x39b1d1=_0x52da50;VisuMZ[_0x39b1d1(0x9bb)]['Scene_Status_create'][_0x39b1d1(0x4cc)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0x52da50(0x48a)][_0x52da50(0x3eb)]=function(){const _0x73a1ad=_0x52da50;this[_0x73a1ad(0x29c)]&&this[_0x73a1ad(0x29c)][_0x73a1ad(0x56e)](Scene_Status[_0x73a1ad(0x610)][_0x73a1ad(0x22c)]),this['_statusWindow']&&this['_statusWindow'][_0x73a1ad(0x56e)](Scene_Status['layoutSettings']['StatusBgType']),this[_0x73a1ad(0x942)]&&this[_0x73a1ad(0x942)][_0x73a1ad(0x56e)](Scene_Status[_0x73a1ad(0x610)][_0x73a1ad(0x517)]),this[_0x73a1ad(0x4b5)]&&this[_0x73a1ad(0x4b5)][_0x73a1ad(0x56e)](Scene_Status['layoutSettings'][_0x73a1ad(0x4ee)]);},Scene_Status[_0x52da50(0x48a)]['profileWindowRect']=function(){return Scene_Status['layoutSettings']['ProfileRect']['call'](this);},Scene_Status[_0x52da50(0x48a)][_0x52da50(0x96c)]=function(){const _0x334b1d=_0x52da50;return Scene_Status[_0x334b1d(0x610)][_0x334b1d(0x9be)]['call'](this);},Scene_Status[_0x52da50(0x48a)][_0x52da50(0x659)]=function(){const _0x21912c=_0x52da50;return Scene_Status['layoutSettings'][_0x21912c(0x8b5)][_0x21912c(0x4cc)](this);},Scene_Status[_0x52da50(0x48a)][_0x52da50(0x5fd)]=function(){const _0x4bd500=_0x52da50;return Scene_Status[_0x4bd500(0x610)][_0x4bd500(0x596)][_0x4bd500(0x4cc)](this);},Scene_Options[_0x52da50(0x610)]=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x75a)][_0x52da50(0x762)],VisuMZ['CoreEngine'][_0x52da50(0x6a9)]=Scene_Options[_0x52da50(0x48a)]['create'],Scene_Options[_0x52da50(0x48a)]['create']=function(){const _0x481cfe=_0x52da50;VisuMZ[_0x481cfe(0x9bb)][_0x481cfe(0x6a9)][_0x481cfe(0x4cc)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options['prototype'][_0x52da50(0x3eb)]=function(){const _0x344155=_0x52da50;this[_0x344155(0x1f4)]&&(_0x344155(0x5de)===_0x344155(0x4e9)?this[_0x344155(0x4fb)](_0x4b4ffa['isTriggered'](_0x344155(0x1c8))):this[_0x344155(0x1f4)][_0x344155(0x56e)](Scene_Options[_0x344155(0x610)][_0x344155(0x40c)]));},Scene_Options[_0x52da50(0x48a)][_0x52da50(0x37f)]=function(){const _0x375dff=_0x52da50;return Scene_Options[_0x375dff(0x610)][_0x375dff(0x7f9)][_0x375dff(0x4cc)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x75a)][_0x52da50(0x21e)],Scene_Save['prototype'][_0x52da50(0x737)]=function(){const _0x536f6e=_0x52da50;Scene_File[_0x536f6e(0x48a)]['create'][_0x536f6e(0x4cc)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x52da50(0x48a)][_0x52da50(0x3eb)]=function(){const _0x4cf6a9=_0x52da50;this['_helpWindow']&&this[_0x4cf6a9(0x458)]['setBackgroundType'](Scene_Save[_0x4cf6a9(0x610)][_0x4cf6a9(0x333)]),this['_listWindow']&&(_0x4cf6a9(0x620)!=='OdDAC'?this['_listWindow'][_0x4cf6a9(0x56e)](Scene_Save[_0x4cf6a9(0x610)][_0x4cf6a9(0x247)]):(this['_anchor']['x']=this['applyEasing'](this[_0x4cf6a9(0x984)]['x'],this[_0x4cf6a9(0x453)]['x']),this[_0x4cf6a9(0x984)]['y']=this[_0x4cf6a9(0x3a3)](this[_0x4cf6a9(0x984)]['y'],this[_0x4cf6a9(0x453)]['y'])));},Scene_Save[_0x52da50(0x48a)][_0x52da50(0x924)]=function(){const _0x136298=_0x52da50;return Scene_Save[_0x136298(0x610)][_0x136298(0x6e6)][_0x136298(0x4cc)](this);},Scene_Save[_0x52da50(0x48a)][_0x52da50(0x489)]=function(){const _0x27195f=_0x52da50;return Scene_Save[_0x27195f(0x610)][_0x27195f(0x8a0)][_0x27195f(0x4cc)](this);},Scene_Load[_0x52da50(0x610)]=VisuMZ[_0x52da50(0x9bb)]['Settings']['MenuLayout'][_0x52da50(0x6be)],Scene_Load[_0x52da50(0x48a)][_0x52da50(0x737)]=function(){const _0x15318e=_0x52da50;Scene_File['prototype'][_0x15318e(0x737)][_0x15318e(0x4cc)](this),this[_0x15318e(0x3eb)]();},Scene_Load[_0x52da50(0x48a)][_0x52da50(0x3eb)]=function(){const _0x1c2451=_0x52da50;this[_0x1c2451(0x458)]&&this[_0x1c2451(0x458)][_0x1c2451(0x56e)](Scene_Load[_0x1c2451(0x610)]['HelpBgType']),this[_0x1c2451(0x3e0)]&&(_0x1c2451(0x671)!=='ENkjV'?(_0xa1f4e5[_0x1c2451(0x9bb)][_0x1c2451(0x4af)][_0x1c2451(0x4cc)](this),this[_0x1c2451(0x63a)](),this[_0x1c2451(0x2f2)]['x']=_0xcd9760['round'](this[_0x1c2451(0x2f2)]['x']),this[_0x1c2451(0x2f2)]['y']=_0x5a5dd4[_0x1c2451(0x442)](this[_0x1c2451(0x2f2)]['y'])):this[_0x1c2451(0x3e0)][_0x1c2451(0x56e)](Scene_Load[_0x1c2451(0x610)][_0x1c2451(0x247)]));},Scene_Load[_0x52da50(0x48a)][_0x52da50(0x924)]=function(){const _0x2bbb0b=_0x52da50;return Scene_Load[_0x2bbb0b(0x610)][_0x2bbb0b(0x6e6)]['call'](this);},Scene_Load[_0x52da50(0x48a)]['listWindowRect']=function(){const _0x561220=_0x52da50;return Scene_Load[_0x561220(0x610)][_0x561220(0x8a0)][_0x561220(0x4cc)](this);},Scene_GameEnd[_0x52da50(0x610)]=VisuMZ[_0x52da50(0x9bb)]['Settings']['MenuLayout'][_0x52da50(0x9d3)],VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x622)]=Scene_GameEnd[_0x52da50(0x48a)][_0x52da50(0xa1a)],Scene_GameEnd[_0x52da50(0x48a)][_0x52da50(0xa1a)]=function(){const _0x127147=_0x52da50;Scene_MenuBase['prototype'][_0x127147(0xa1a)][_0x127147(0x4cc)](this);},Scene_GameEnd[_0x52da50(0x48a)]['createCommandWindow']=function(){const _0x49f203=_0x52da50,_0x253486=this[_0x49f203(0x1c3)]();this[_0x49f203(0x846)]=new Window_GameEnd(_0x253486),this[_0x49f203(0x846)][_0x49f203(0x6df)]('cancel',this[_0x49f203(0x821)]['bind'](this)),this['addWindow'](this[_0x49f203(0x846)]),this[_0x49f203(0x846)][_0x49f203(0x56e)](Scene_GameEnd[_0x49f203(0x610)]['CommandBgType']);},Scene_GameEnd[_0x52da50(0x48a)][_0x52da50(0x1c3)]=function(){const _0x171aff=_0x52da50;return Scene_GameEnd[_0x171aff(0x610)][_0x171aff(0x1c2)][_0x171aff(0x4cc)](this);},Scene_Shop[_0x52da50(0x610)]=VisuMZ[_0x52da50(0x9bb)]['Settings'][_0x52da50(0x75a)][_0x52da50(0x3c0)],VisuMZ['CoreEngine'][_0x52da50(0x3e6)]=Scene_Shop[_0x52da50(0x48a)][_0x52da50(0x737)],Scene_Shop[_0x52da50(0x48a)][_0x52da50(0x737)]=function(){const _0x2552b5=_0x52da50;VisuMZ[_0x2552b5(0x9bb)]['Scene_Shop_create']['call'](this),this[_0x2552b5(0x3eb)]();},Scene_Shop[_0x52da50(0x48a)][_0x52da50(0x3eb)]=function(){const _0x17007f=_0x52da50;this['_helpWindow']&&(_0x17007f(0x851)===_0x17007f(0x1ff)?(this['_scrollDuration']=0x1,this[_0x17007f(0x3bf)]()):this[_0x17007f(0x458)][_0x17007f(0x56e)](Scene_Shop['layoutSettings'][_0x17007f(0x333)]));this['_goldWindow']&&this[_0x17007f(0x5d9)]['setBackgroundType'](Scene_Shop[_0x17007f(0x610)][_0x17007f(0x7c6)]);this['_commandWindow']&&this['_commandWindow'][_0x17007f(0x56e)](Scene_Shop[_0x17007f(0x610)][_0x17007f(0x98a)]);this[_0x17007f(0x6f1)]&&this[_0x17007f(0x6f1)][_0x17007f(0x56e)](Scene_Shop[_0x17007f(0x610)][_0x17007f(0x590)]);if(this[_0x17007f(0x20f)]){if('FxFDZ'!==_0x17007f(0x655)){let _0x25e10f=0x0,_0x413854=_0x26e69f['height']-this['lineHeight'](),_0x32969f=_0x50e5e0['width'],_0x369f61=this[_0x17007f(0x75c)]();return new _0x569a2e(_0x25e10f,_0x413854,_0x32969f,_0x369f61);}else this[_0x17007f(0x20f)][_0x17007f(0x56e)](Scene_Shop[_0x17007f(0x610)]['NumberBgType']);}this[_0x17007f(0x91b)]&&this[_0x17007f(0x91b)][_0x17007f(0x56e)](Scene_Shop[_0x17007f(0x610)]['StatusBgType']),this[_0x17007f(0x4e5)]&&(_0x17007f(0x7a6)===_0x17007f(0x689)?this[_0x17007f(0x458)]['setBackgroundType'](_0x278fc1['layoutSettings'][_0x17007f(0x333)]):this['_buyWindow'][_0x17007f(0x56e)](Scene_Shop['layoutSettings'][_0x17007f(0x73a)])),this[_0x17007f(0x260)]&&this['_categoryWindow']['setBackgroundType'](Scene_Shop[_0x17007f(0x610)][_0x17007f(0x700)]),this[_0x17007f(0x819)]&&(_0x17007f(0x324)===_0x17007f(0x324)?this['_sellWindow'][_0x17007f(0x56e)](Scene_Shop[_0x17007f(0x610)][_0x17007f(0x829)]):_0x195b3d[_0x17007f(0x71b)](_0x17007f(0x493))&&this[_0x17007f(0x1e9)]()?this[_0x17007f(0x3f8)]():this[_0x17007f(0x34f)](_0x36d7cb['isTriggered'](_0x17007f(0x78e))));},Scene_Shop['prototype'][_0x52da50(0x924)]=function(){const _0x1e4d73=_0x52da50;return Scene_Shop[_0x1e4d73(0x610)][_0x1e4d73(0x6e6)][_0x1e4d73(0x4cc)](this);},Scene_Shop['prototype'][_0x52da50(0x8ac)]=function(){const _0x489315=_0x52da50;return Scene_Shop['layoutSettings'][_0x489315(0x5c0)]['call'](this);},Scene_Shop[_0x52da50(0x48a)]['commandWindowRect']=function(){const _0x1bb82e=_0x52da50;return Scene_Shop[_0x1bb82e(0x610)][_0x1bb82e(0x1c2)][_0x1bb82e(0x4cc)](this);},Scene_Shop[_0x52da50(0x48a)][_0x52da50(0x58e)]=function(){const _0x46c1c2=_0x52da50;return Scene_Shop[_0x46c1c2(0x610)][_0x46c1c2(0x26a)]['call'](this);},Scene_Shop[_0x52da50(0x48a)][_0x52da50(0x397)]=function(){const _0x273aa2=_0x52da50;return Scene_Shop[_0x273aa2(0x610)][_0x273aa2(0x503)]['call'](this);},Scene_Shop[_0x52da50(0x48a)][_0x52da50(0x96c)]=function(){const _0x42fc18=_0x52da50;return Scene_Shop[_0x42fc18(0x610)][_0x42fc18(0x9be)][_0x42fc18(0x4cc)](this);},Scene_Shop[_0x52da50(0x48a)]['buyWindowRect']=function(){const _0xf0b87=_0x52da50;return Scene_Shop[_0xf0b87(0x610)][_0xf0b87(0x917)][_0xf0b87(0x4cc)](this);},Scene_Shop['prototype'][_0x52da50(0x5d3)]=function(){const _0x446f9e=_0x52da50;return Scene_Shop[_0x446f9e(0x610)][_0x446f9e(0x33f)][_0x446f9e(0x4cc)](this);},Scene_Shop['prototype'][_0x52da50(0x7ea)]=function(){const _0x1f1d95=_0x52da50;return Scene_Shop[_0x1f1d95(0x610)][_0x1f1d95(0x1ec)][_0x1f1d95(0x4cc)](this);},Scene_Name[_0x52da50(0x610)]=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x75a)][_0x52da50(0x47f)],VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x7b7)]=Scene_Name[_0x52da50(0x48a)][_0x52da50(0x737)],Scene_Name[_0x52da50(0x48a)][_0x52da50(0x737)]=function(){const _0x437a3f=_0x52da50;VisuMZ[_0x437a3f(0x9bb)][_0x437a3f(0x7b7)]['call'](this),this[_0x437a3f(0x3eb)]();},Scene_Name['prototype'][_0x52da50(0x3eb)]=function(){const _0x18f111=_0x52da50;this[_0x18f111(0x83d)]&&this[_0x18f111(0x83d)][_0x18f111(0x56e)](Scene_Name[_0x18f111(0x610)][_0x18f111(0x608)]),this[_0x18f111(0x47a)]&&this[_0x18f111(0x47a)][_0x18f111(0x56e)](Scene_Name[_0x18f111(0x610)]['InputBgType']);},Scene_Name[_0x52da50(0x48a)][_0x52da50(0x765)]=function(){return 0x0;},Scene_Name[_0x52da50(0x48a)][_0x52da50(0x6ee)]=function(){const _0x56704c=_0x52da50;return Scene_Name['layoutSettings']['EditRect'][_0x56704c(0x4cc)](this);},Scene_Name[_0x52da50(0x48a)][_0x52da50(0x656)]=function(){const _0x254fe8=_0x52da50;return Scene_Name[_0x254fe8(0x610)][_0x254fe8(0x6e1)][_0x254fe8(0x4cc)](this);},Scene_Name[_0x52da50(0x48a)][_0x52da50(0x78a)]=function(){const _0x3664a3=_0x52da50;if(!this['_inputWindow'])return![];return VisuMZ[_0x3664a3(0x9bb)]['Settings'][_0x3664a3(0x46e)][_0x3664a3(0x78a)];},Scene_Name[_0x52da50(0x48a)][_0x52da50(0x8a7)]=function(){const _0x18fe22=_0x52da50;return this[_0x18fe22(0x78a)]()?TextManager[_0x18fe22(0x905)](_0x18fe22(0x6fe)):'lOHEW'!=='lOHEW'?!![]:Scene_MenuBase['prototype']['buttonAssistKey1']['call'](this);},Scene_Name[_0x52da50(0x48a)]['buttonAssistText1']=function(){const _0x79080b=_0x52da50;if(this[_0x79080b(0x78a)]()){const _0x6721c8=VisuMZ[_0x79080b(0x9bb)]['Settings'][_0x79080b(0x46e)];if(this[_0x79080b(0x47a)]['_mode']===_0x79080b(0x6b9))return _0x6721c8[_0x79080b(0x9ba)]||_0x79080b(0x9ba);else{if('TediQ'===_0x79080b(0x6f9))return _0x6721c8[_0x79080b(0x40f)]||_0x79080b(0x40f);else{const _0x349a6b=_0x5854e1(_0x3ce5c4['$1']);_0x349a6b!==_0x327ac4[_0x4fa7eb]['version']&&(_0x53a890(_0x79080b(0x914)[_0x79080b(0x8de)](_0x450ebc,_0x349a6b)),_0x6fd378[_0x79080b(0x448)]());}}}else return Scene_MenuBase[_0x79080b(0x48a)][_0x79080b(0x4d4)][_0x79080b(0x4cc)](this);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x32e)]=Scene_Name[_0x52da50(0x48a)][_0x52da50(0x80d)],Scene_Name[_0x52da50(0x48a)][_0x52da50(0x80d)]=function(){const _0x1fff44=_0x52da50;if(this[_0x1fff44(0x93b)]())_0x1fff44(0x3b3)==='LfxwF'?(_0x4a9d95[_0x1fff44(0x9bb)][_0x1fff44(0x895)][_0x1fff44(0x4cc)](this),_0x325c21[_0x1fff44(0x974)]()&&this[_0x1fff44(0x933)]()):this[_0x1fff44(0x86d)]();else{if('cxbFU'!==_0x1fff44(0x6d0)){if(_0x5cbf39)throw _0x463d68;else _0x278ff4&&_0x125bf0(_0x1fff44(0x673)['format'](_0x3a2040));}else VisuMZ[_0x1fff44(0x9bb)][_0x1fff44(0x32e)][_0x1fff44(0x4cc)](this);}},Scene_Name[_0x52da50(0x48a)]['doesNameContainBannedWords']=function(){const _0x3932e7=_0x52da50,_0x486195=VisuMZ[_0x3932e7(0x9bb)]['Settings'][_0x3932e7(0x46e)];if(!_0x486195)return![];const _0x49c173=_0x486195['BannedWords'];if(!_0x49c173)return![];const _0x3e39b4=this[_0x3932e7(0x83d)]['name']()[_0x3932e7(0x523)]();for(const _0x30ad35 of _0x49c173){if(_0x3932e7(0x5ce)===_0x3932e7(0x668))return this['isMapScrollLinked']()?this[_0x3932e7(0x4fe)]():_0x360d48[_0x3932e7(0x9bb)][_0x3932e7(0x93f)][_0x3932e7(0x4cc)](this);else{if(_0x3e39b4['includes'](_0x30ad35[_0x3932e7(0x523)]()))return!![];}}return![];},Scene_Name[_0x52da50(0x48a)][_0x52da50(0x86d)]=function(){const _0x34e364=_0x52da50;SoundManager[_0x34e364(0x379)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0xa06)]=Scene_Battle[_0x52da50(0x48a)][_0x52da50(0x6c5)],Scene_Battle['prototype'][_0x52da50(0x6c5)]=function(){const _0x520508=_0x52da50;VisuMZ['CoreEngine'][_0x520508(0xa06)]['call'](this);if($gameTemp[_0x520508(0x57c)])this[_0x520508(0x637)]();},Scene_Battle[_0x52da50(0x48a)][_0x52da50(0x637)]=function(){const _0x413256=_0x52da50;!BattleManager['isInputting']()&&!this[_0x413256(0x6a8)]&&!$gameMessage['isBusy']()&&(_0x413256(0x823)===_0x413256(0x823)?(this['_playtestF7Looping']=!![],this[_0x413256(0x6c5)](),SceneManager['updateEffekseer'](),this['_playtestF7Looping']=![]):(_0x2fd524[_0x413256(0x9bb)][_0x413256(0x8d1)][_0x413256(0x4cc)](this),this[_0x413256(0x591)]()));},VisuMZ[_0x52da50(0x9bb)]['Scene_Battle_createCancelButton']=Scene_Battle[_0x52da50(0x48a)]['createCancelButton'],Scene_Battle['prototype']['createCancelButton']=function(){const _0x27da49=_0x52da50;VisuMZ[_0x27da49(0x9bb)]['Scene_Battle_createCancelButton'][_0x27da49(0x4cc)](this),SceneManager[_0x27da49(0x974)]()&&this[_0x27da49(0x877)]();},Scene_Battle['prototype']['repositionCancelButtonSideButtonLayout']=function(){const _0x24b575=_0x52da50;this[_0x24b575(0x582)]['x']=Graphics[_0x24b575(0x19b)]+0x4,this['isBottomButtonMode']()?this[_0x24b575(0x582)]['y']=Graphics['boxHeight']-this['buttonAreaHeight']():_0x24b575(0x98c)!==_0x24b575(0x98c)?this[_0x24b575(0x576)]()?this['makeDocumentTitle']():_0x42bf80['CoreEngine']['Scene_Boot_updateDocumentTitle'][_0x24b575(0x4cc)](this):this[_0x24b575(0x582)]['y']=0x0;},VisuMZ[_0x52da50(0x9bb)]['Sprite_Button_initialize']=Sprite_Button[_0x52da50(0x48a)][_0x52da50(0x2a5)],Sprite_Button[_0x52da50(0x48a)][_0x52da50(0x2a5)]=function(_0x33d6f0){const _0x4de948=_0x52da50;VisuMZ[_0x4de948(0x9bb)][_0x4de948(0x89c)]['call'](this,_0x33d6f0),this[_0x4de948(0x2a3)]();},Sprite_Button[_0x52da50(0x48a)][_0x52da50(0x2a3)]=function(){const _0x33c49a=_0x52da50,_0x136705=VisuMZ['CoreEngine'][_0x33c49a(0x630)]['UI'];this[_0x33c49a(0x8e2)]=![];switch(this[_0x33c49a(0x968)]){case _0x33c49a(0x36f):this[_0x33c49a(0x8e2)]=!_0x136705[_0x33c49a(0x756)];break;case _0x33c49a(0x182):case'pagedown':this[_0x33c49a(0x8e2)]=!_0x136705['pagedownShowButton'];break;case _0x33c49a(0x78e):case'up':case _0x33c49a(0x3cd):case _0x33c49a(0x46f):case'ok':this['_isButtonHidden']=!_0x136705[_0x33c49a(0x526)];break;case _0x33c49a(0x500):this[_0x33c49a(0x8e2)]=!_0x136705['menuShowButton'];break;}},VisuMZ[_0x52da50(0x9bb)]['Sprite_Button_updateOpacity']=Sprite_Button[_0x52da50(0x48a)][_0x52da50(0x3ad)],Sprite_Button['prototype'][_0x52da50(0x3ad)]=function(){const _0x28d577=_0x52da50;SceneManager[_0x28d577(0x8d2)]()||this[_0x28d577(0x8e2)]?this[_0x28d577(0x84e)]():VisuMZ['CoreEngine'][_0x28d577(0x561)][_0x28d577(0x4cc)](this);},Sprite_Button[_0x52da50(0x48a)][_0x52da50(0x84e)]=function(){const _0x44665c=_0x52da50;this[_0x44665c(0x425)]=![],this[_0x44665c(0xa09)]=0x0,this['x']=Graphics[_0x44665c(0x2b7)]*0xa,this['y']=Graphics[_0x44665c(0x394)]*0xa;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x3fd)]=Sprite_Battler[_0x52da50(0x48a)]['startMove'],Sprite_Battler['prototype']['startMove']=function(_0x5c6036,_0x426692,_0x275215){const _0x1dd4fb=_0x52da50;(this[_0x1dd4fb(0x2dd)]!==_0x5c6036||this[_0x1dd4fb(0x77c)]!==_0x426692)&&(this['setMoveEasingType'](_0x1dd4fb(0x64a)),this[_0x1dd4fb(0x66a)]=_0x275215),VisuMZ[_0x1dd4fb(0x9bb)]['Sprite_Battler_startMove']['call'](this,_0x5c6036,_0x426692,_0x275215);},Sprite_Battler[_0x52da50(0x48a)][_0x52da50(0x2bc)]=function(_0x4b1cfc){const _0x40a3ab=_0x52da50;this[_0x40a3ab(0x3ce)]=_0x4b1cfc;},Sprite_Battler[_0x52da50(0x48a)]['updateMove']=function(){const _0x77ea5=_0x52da50;if(this[_0x77ea5(0x628)]<=0x0)return;const _0x265862=this[_0x77ea5(0x628)],_0x3f8f95=this[_0x77ea5(0x66a)],_0x324261=this[_0x77ea5(0x3ce)];this[_0x77ea5(0x1b9)]=this[_0x77ea5(0x3a3)](this['_offsetX'],this[_0x77ea5(0x2dd)],_0x265862,_0x3f8f95,_0x324261),this[_0x77ea5(0x4fa)]=this[_0x77ea5(0x3a3)](this['_offsetY'],this[_0x77ea5(0x77c)],_0x265862,_0x3f8f95,_0x324261),this[_0x77ea5(0x628)]--;if(this[_0x77ea5(0x628)]<=0x0)this[_0x77ea5(0x9cc)]();},Sprite_Battler[_0x52da50(0x48a)][_0x52da50(0x3a3)]=function(_0x23e804,_0x111bae,_0x588ca9,_0x236d66,_0x396d2b){const _0x14b618=_0x52da50,_0x45d695=VisuMZ[_0x14b618(0x269)]((_0x236d66-_0x588ca9)/_0x236d66,_0x396d2b||_0x14b618(0x64a)),_0x181fec=VisuMZ[_0x14b618(0x269)]((_0x236d66-_0x588ca9+0x1)/_0x236d66,_0x396d2b||_0x14b618(0x64a)),_0x3a7126=(_0x23e804-_0x111bae*_0x45d695)/(0x1-_0x45d695);return _0x3a7126+(_0x111bae-_0x3a7126)*_0x181fec;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x7a5)]=Sprite_Actor[_0x52da50(0x48a)][_0x52da50(0x8c9)],Sprite_Actor[_0x52da50(0x48a)][_0x52da50(0x8c9)]=function(_0x3b823f){const _0x4a2acc=_0x52da50;if(VisuMZ[_0x4a2acc(0x9bb)]['Settings']['UI'][_0x4a2acc(0x20d)])this[_0x4a2acc(0x8aa)](_0x3b823f);else{if(_0x4a2acc(0x9f8)!==_0x4a2acc(0x9f8))return _0x4be6b2[_0x4a2acc(0x322)]()[_0x4a2acc(0x6d5)](_0x4fc962);else VisuMZ[_0x4a2acc(0x9bb)]['Sprite_Actor_setActorHome'][_0x4a2acc(0x4cc)](this,_0x3b823f);}},Sprite_Actor[_0x52da50(0x48a)]['setActorHomeRepositioned']=function(_0x22b66a){const _0x22fd19=_0x52da50;let _0x3b0cf8=Math['round'](Graphics[_0x22fd19(0x2b7)]/0x2+0xc0);_0x3b0cf8-=Math[_0x22fd19(0x23f)]((Graphics[_0x22fd19(0x2b7)]-Graphics['boxWidth'])/0x2),_0x3b0cf8+=_0x22b66a*0x20;let _0x226d2c=Graphics[_0x22fd19(0x394)]-0xc8-$gameParty[_0x22fd19(0x1a4)]()*0x30;_0x226d2c-=Math[_0x22fd19(0x23f)]((Graphics[_0x22fd19(0x394)]-Graphics['boxHeight'])/0x2),_0x226d2c+=_0x22b66a*0x30,this[_0x22fd19(0x364)](_0x3b0cf8,_0x226d2c);},Sprite_Actor['prototype']['retreat']=function(){const _0x5ded55=_0x52da50;this[_0x5ded55(0x91e)](0x4b0,0x0,0x78);},Sprite_Animation[_0x52da50(0x48a)][_0x52da50(0x37c)]=function(_0x146603){const _0x1bca1e=_0x52da50;this[_0x1bca1e(0x7b6)]=_0x146603;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x889)]=Sprite_Animation[_0x52da50(0x48a)][_0x52da50(0x925)],Sprite_Animation[_0x52da50(0x48a)][_0x52da50(0x925)]=function(){const _0x4a5c1e=_0x52da50;if(this['_muteSound'])return;VisuMZ[_0x4a5c1e(0x9bb)][_0x4a5c1e(0x889)][_0x4a5c1e(0x4cc)](this);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x551)]=Sprite_Animation[_0x52da50(0x48a)][_0x52da50(0x1ae)],Sprite_Animation[_0x52da50(0x48a)]['setViewport']=function(_0x2781a2){const _0x301464=_0x52da50;if(this[_0x301464(0x8db)]()){if(_0x301464(0x948)===_0x301464(0x581))try{_0x17b5fe['CoreEngine']['Game_Character_processMoveCommand'][_0x301464(0x4cc)](this,_0x5e4a0a);}catch(_0x3deb42){if(_0x1d93f7['isPlaytest']())_0x53031f['log'](_0x3deb42);}else this[_0x301464(0x3c6)](_0x2781a2);}else VisuMZ[_0x301464(0x9bb)]['Sprite_Animation_setViewport'][_0x301464(0x4cc)](this,_0x2781a2);},Sprite_Animation[_0x52da50(0x48a)]['isAnimationOffsetXMirrored']=function(){const _0x7656c3=_0x52da50;if(!this[_0x7656c3(0x996)])return![];const _0x54edb1=this['_animation'][_0x7656c3(0x215)]||'';if(_0x54edb1[_0x7656c3(0x2bb)](/<MIRROR OFFSET X>/i))return!![];if(_0x54edb1['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x7656c3(0x9bb)]['Settings'][_0x7656c3(0x7cf)][_0x7656c3(0x2a7)];},Sprite_Animation['prototype']['setViewportCoreEngineFix']=function(_0x2bcc92){const _0x277425=_0x52da50,_0x38eb3b=this[_0x277425(0x636)],_0x20cfb5=this['_viewportSize'],_0x40488e=this[_0x277425(0x996)][_0x277425(0x749)]*(this['_mirror']?-0x1:0x1)-_0x38eb3b/0x2,_0x23683d=this[_0x277425(0x996)][_0x277425(0x4f7)]-_0x20cfb5/0x2,_0x287a82=this[_0x277425(0x1c0)](_0x2bcc92);_0x2bcc92['gl'][_0x277425(0x741)](_0x40488e+_0x287a82['x'],_0x23683d+_0x287a82['y'],_0x38eb3b,_0x20cfb5);},Sprite_Animation[_0x52da50(0x48a)][_0x52da50(0x332)]=function(_0x320bb8){const _0x43e966=_0x52da50;if(_0x320bb8[_0x43e966(0x1f6)]){}const _0x3e16cf=this[_0x43e966(0x996)][_0x43e966(0x215)];let _0x56a081=_0x320bb8[_0x43e966(0x394)]*_0x320bb8[_0x43e966(0x752)]['y'],_0x5a230c=0x0,_0x46b4a0=-_0x56a081/0x2;if(_0x3e16cf[_0x43e966(0x2bb)](/<(?:HEAD|HEADER|TOP)>/i))_0x46b4a0=-_0x56a081;if(_0x3e16cf[_0x43e966(0x2bb)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x46b4a0=0x0;if(this['_animation'][_0x43e966(0x7e9)])_0x46b4a0=0x0;if(_0x3e16cf[_0x43e966(0x2bb)](/<(?:LEFT)>/i))_0x5a230c=-_0x320bb8[_0x43e966(0x2b7)]/0x2;if(_0x3e16cf[_0x43e966(0x2bb)](/<(?:RIGHT)>/i))_0x5a230c=_0x320bb8[_0x43e966(0x2b7)]/0x2;_0x3e16cf[_0x43e966(0x2bb)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x5a230c=Number(RegExp['$1'])*_0x320bb8['width']);if(_0x3e16cf[_0x43e966(0x2bb)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if('wJuxJ'!==_0x43e966(0x890))return _0x15f285[_0x43e966(0x9bb)][_0x43e966(0x556)][_0x43e966(0x4cc)](this,_0x262047);else _0x46b4a0=(0x1-Number(RegExp['$1']))*-_0x56a081;}_0x3e16cf[_0x43e966(0x2bb)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x5a230c=Number(RegExp['$1'])*_0x320bb8['width'],_0x46b4a0=(0x1-Number(RegExp['$2']))*-_0x56a081);if(_0x3e16cf['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x5a230c+=Number(RegExp['$1']);if(_0x3e16cf[_0x43e966(0x2bb)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x46b4a0+=Number(RegExp['$1']);if(_0x3e16cf[_0x43e966(0x2bb)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('JiXou'!==_0x43e966(0x312)){if(!this[_0x43e966(0x387)])return _0x64d1ae;return _0xee9792['ApplyEasing'](_0x592593,this[_0x43e966(0x387)][_0x43e966(0x73f)]||_0x43e966(0x187));}else _0x5a230c+=Number(RegExp['$1']),_0x46b4a0+=Number(RegExp['$2']);}const _0x434014=new Point(_0x5a230c,_0x46b4a0);return _0x320bb8[_0x43e966(0x647)](),_0x320bb8['worldTransform']['apply'](_0x434014);},Sprite_AnimationMV[_0x52da50(0x48a)]['setupRate']=function(){const _0x49e3f6=_0x52da50;this['_rate']=VisuMZ[_0x49e3f6(0x9bb)][_0x49e3f6(0x630)][_0x49e3f6(0x7cf)][_0x49e3f6(0x632)]??0x4,this[_0x49e3f6(0x5c9)](),this[_0x49e3f6(0x970)]=this['_rate'][_0x49e3f6(0x522)](0x1,0xa);},Sprite_AnimationMV[_0x52da50(0x48a)][_0x52da50(0x5c9)]=function(){const _0x1c0fb0=_0x52da50;if(!this['_animation']);const _0x405c55=this['_animation'][_0x1c0fb0(0x215)]||'';if(_0x405c55['match'](/<RATE:[ ](\d+)>/i)){if(_0x1c0fb0(0x966)==='UZjHf')this[_0x1c0fb0(0x970)]=(Number(RegExp['$1'])||0x1)[_0x1c0fb0(0x522)](0x1,0xa);else{const _0x13cf09='_stored_gaugeBackColor';this[_0x1c0fb0(0x42d)]=this[_0x1c0fb0(0x42d)]||{};if(this[_0x1c0fb0(0x42d)][_0x13cf09])return this[_0x1c0fb0(0x42d)][_0x13cf09];const _0x2d29d8=_0x2767e3[_0x1c0fb0(0x9bb)][_0x1c0fb0(0x630)][_0x1c0fb0(0x338)][_0x1c0fb0(0x724)];return this['getColorDataFromPluginParameters'](_0x13cf09,_0x2d29d8);}}},Sprite_AnimationMV[_0x52da50(0x48a)][_0x52da50(0x37c)]=function(_0x447c75){const _0x3e552c=_0x52da50;this[_0x3e552c(0x7b6)]=_0x447c75;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x6e4)]=Sprite_AnimationMV[_0x52da50(0x48a)][_0x52da50(0x365)],Sprite_AnimationMV[_0x52da50(0x48a)][_0x52da50(0x365)]=function(_0x36f184){const _0x27f1fb=_0x52da50;if(this[_0x27f1fb(0x7b6)]){if(_0x27f1fb(0x186)===_0x27f1fb(0x9d4)){const _0x51786f=_0xfab40b[_0x27f1fb(0x9bb)][_0x27f1fb(0x630)][_0x27f1fb(0x8c3)][_0x14eafa],_0xe4107f=_0x27f1fb(0x2a0)['format'](_0xf3f27b);for(const _0x529ae7 of _0x51786f){_0xbc689f[_0x27f1fb(0x642)](_0xe4107f,_0x529ae7);}}else{_0x36f184=JsonEx['makeDeepCopy'](_0x36f184);if(_0x36f184['se']){if(_0x27f1fb(0x539)!=='JiaXZ')_0x36f184['se'][_0x27f1fb(0x9de)]=0x0;else return _0x142176[_0x27f1fb(0x9bb)][_0x27f1fb(0x630)][_0x27f1fb(0x338)]['ItemBackColor1'];}}}VisuMZ[_0x27f1fb(0x9bb)]['Sprite_AnimationMV_processTimingData'][_0x27f1fb(0x4cc)](this,_0x36f184);},VisuMZ[_0x52da50(0x9bb)]['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV['prototype'][_0x52da50(0x1ac)],Sprite_AnimationMV[_0x52da50(0x48a)][_0x52da50(0x1ac)]=function(){const _0xd736a5=_0x52da50;VisuMZ[_0xd736a5(0x9bb)][_0xd736a5(0x997)][_0xd736a5(0x4cc)](this);if(this[_0xd736a5(0x996)][_0xd736a5(0x83a)]===0x3){if(this['x']===0x0)this['x']=Math[_0xd736a5(0x442)](Graphics[_0xd736a5(0x2b7)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0xd736a5(0x394)]/0x2);}},Sprite_Damage[_0x52da50(0x48a)][_0x52da50(0x901)]=function(_0x9e61f5){const _0x39a947=_0x52da50;let _0x4c691c=Math[_0x39a947(0xa26)](_0x9e61f5)[_0x39a947(0x79b)]();this['useDigitGrouping']()&&(_0x4c691c=VisuMZ[_0x39a947(0x685)](_0x4c691c));const _0x2439e7=this[_0x39a947(0x830)](),_0x20a8aa=Math[_0x39a947(0x23f)](_0x2439e7*0.75);for(let _0x4a6f73=0x0;_0x4a6f73<_0x4c691c[_0x39a947(0x69a)];_0x4a6f73++){const _0x4e97ca=this[_0x39a947(0x2d8)](_0x20a8aa,_0x2439e7);_0x4e97ca[_0x39a947(0x42c)]['drawText'](_0x4c691c[_0x4a6f73],0x0,0x0,_0x20a8aa,_0x2439e7,_0x39a947(0x5b2)),_0x4e97ca['x']=(_0x4a6f73-(_0x4c691c[_0x39a947(0x69a)]-0x1)/0x2)*_0x20a8aa,_0x4e97ca['dy']=-_0x4a6f73;}},Sprite_Damage[_0x52da50(0x48a)][_0x52da50(0x5d8)]=function(){const _0x1be18c=_0x52da50;return VisuMZ[_0x1be18c(0x9bb)][_0x1be18c(0x630)][_0x1be18c(0x7cf)][_0x1be18c(0x76f)];},Sprite_Damage[_0x52da50(0x48a)][_0x52da50(0x4d3)]=function(){const _0x76eb3b=_0x52da50;return ColorManager[_0x76eb3b(0x611)]();},VisuMZ['CoreEngine'][_0x52da50(0x85a)]=Sprite_Gauge[_0x52da50(0x48a)][_0x52da50(0x593)],Sprite_Gauge['prototype'][_0x52da50(0x593)]=function(){const _0x431e1f=_0x52da50;return VisuMZ[_0x431e1f(0x9bb)][_0x431e1f(0x85a)][_0x431e1f(0x4cc)](this)[_0x431e1f(0x522)](0x0,0x1);},VisuMZ[_0x52da50(0x9bb)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x52da50(0x48a)]['currentValue'],Sprite_Gauge[_0x52da50(0x48a)][_0x52da50(0x65b)]=function(){const _0x1d4641=_0x52da50;let _0x2c1203=VisuMZ[_0x1d4641(0x9bb)][_0x1d4641(0x4d0)][_0x1d4641(0x4cc)](this);return _0x2c1203;},Sprite_Gauge['prototype']['drawValue']=function(){const _0x20ccfb=_0x52da50;let _0x24de51=this['currentValue']();this[_0x20ccfb(0x5d8)]()&&(_0x24de51=VisuMZ[_0x20ccfb(0x685)](_0x24de51));const _0x5b2b9f=this[_0x20ccfb(0x532)]()-0x1,_0x279dd7=this[_0x20ccfb(0xa0c)]?this[_0x20ccfb(0xa0c)]():this[_0x20ccfb(0x486)]();this[_0x20ccfb(0x96e)](),this[_0x20ccfb(0x42c)][_0x20ccfb(0x780)](_0x24de51,0x0,0x0,_0x5b2b9f,_0x279dd7,_0x20ccfb(0x1c8));},Sprite_Gauge['prototype']['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x52da50(0x48a)][_0x52da50(0x5d8)]=function(){const _0x1575a9=_0x52da50;return VisuMZ[_0x1575a9(0x9bb)][_0x1575a9(0x630)][_0x1575a9(0x7cf)]['DigitGroupingGaugeSprites'];},Sprite_Gauge['prototype'][_0x52da50(0x4d3)]=function(){const _0x5c6c63=_0x52da50;return ColorManager[_0x5c6c63(0x893)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0xa12)]=Sprite_Picture[_0x52da50(0x48a)][_0x52da50(0x642)],Sprite_Picture[_0x52da50(0x48a)][_0x52da50(0x642)]=function(){const _0x486311=_0x52da50;if(this['_pictureName']&&this[_0x486311(0x2e9)][_0x486311(0x2bb)](/VisuMZ CoreEngine PictureIcon (\d+)/i)){if(_0x486311(0x2fd)===_0x486311(0x2fd))this[_0x486311(0x8a9)](Number(RegExp['$1']));else{let _0x2d198a=_0x305433[_0x486311(0x9bb)][_0x486311(0x54e)][_0x486311(0x4cc)](this);return this[_0x486311(0x63e)]()&&(_0x2d198a*=_0x522834[_0x486311(0x8ee)]()),_0x2d198a;}}else VisuMZ['CoreEngine'][_0x486311(0xa12)][_0x486311(0x4cc)](this);},Sprite_Picture[_0x52da50(0x48a)][_0x52da50(0x8a9)]=function(_0x173320){const _0x22e742=_0x52da50,_0x579d91=ImageManager['iconWidth'],_0x16921b=ImageManager[_0x22e742(0x6b6)],_0x3669ce=this[_0x22e742(0x2e9)][_0x22e742(0x2bb)](/SMOOTH/i);this[_0x22e742(0x42c)]=new Bitmap(_0x579d91,_0x16921b);const _0x79fcf7=ImageManager['loadSystem']('IconSet'),_0x4e37a9=_0x173320%0x10*_0x579d91,_0x4ea23f=Math[_0x22e742(0x23f)](_0x173320/0x10)*_0x16921b;this[_0x22e742(0x42c)]['smooth']=_0x3669ce,this[_0x22e742(0x42c)][_0x22e742(0x583)](_0x79fcf7,_0x4e37a9,_0x4ea23f,_0x579d91,_0x16921b,0x0,0x0,_0x579d91,_0x16921b);};function Sprite_TitlePictureButton(){const _0x57613d=_0x52da50;this[_0x57613d(0x2a5)](...arguments);}Sprite_TitlePictureButton[_0x52da50(0x48a)]=Object[_0x52da50(0x737)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x52da50(0x48a)][_0x52da50(0x2ba)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x52da50(0x48a)]['initialize']=function(_0x313413){const _0x2c61c0=_0x52da50;Sprite_Clickable['prototype']['initialize']['call'](this),this[_0x2c61c0(0x3ba)]=_0x313413,this['_clickHandler']=null,this[_0x2c61c0(0x626)]();},Sprite_TitlePictureButton['prototype'][_0x52da50(0x626)]=function(){const _0x32003b=_0x52da50;this['x']=Graphics[_0x32003b(0x2b7)],this['y']=Graphics[_0x32003b(0x394)],this[_0x32003b(0x425)]=![],this[_0x32003b(0x91a)]();},Sprite_TitlePictureButton['prototype'][_0x52da50(0x91a)]=function(){const _0x18a228=_0x52da50;this['bitmap']=ImageManager[_0x18a228(0x2c3)](this['_data'][_0x18a228(0x55b)]),this['bitmap'][_0x18a228(0x18f)](this[_0x18a228(0x6b2)][_0x18a228(0x4e6)](this));},Sprite_TitlePictureButton[_0x52da50(0x48a)][_0x52da50(0x6b2)]=function(){const _0x1be531=_0x52da50;this[_0x1be531(0x3ba)][_0x1be531(0x72b)][_0x1be531(0x4cc)](this),this[_0x1be531(0x3ba)][_0x1be531(0x7f5)][_0x1be531(0x4cc)](this),this[_0x1be531(0x9e5)](this[_0x1be531(0x3ba)][_0x1be531(0x904)][_0x1be531(0x4e6)](this));},Sprite_TitlePictureButton[_0x52da50(0x48a)][_0x52da50(0x6c5)]=function(){const _0x2eb970=_0x52da50;Sprite_Clickable[_0x2eb970(0x48a)]['update'][_0x2eb970(0x4cc)](this),this[_0x2eb970(0x3ad)](),this[_0x2eb970(0x23c)]();},Sprite_TitlePictureButton[_0x52da50(0x48a)][_0x52da50(0x401)]=function(){const _0x31aceb=_0x52da50;return VisuMZ[_0x31aceb(0x9bb)][_0x31aceb(0x630)]['MenuLayout'][_0x31aceb(0x6bf)][_0x31aceb(0x274)];},Sprite_TitlePictureButton[_0x52da50(0x48a)][_0x52da50(0x3ad)]=function(){const _0x8c1afd=_0x52da50;this[_0x8c1afd(0x371)]||this[_0x8c1afd(0x50d)]?this['opacity']=0xff:(this[_0x8c1afd(0xa09)]+=this[_0x8c1afd(0x425)]?this[_0x8c1afd(0x401)]():-0x1*this['fadeSpeed'](),this[_0x8c1afd(0xa09)]=Math['min'](0xc0,this['opacity']));},Sprite_TitlePictureButton[_0x52da50(0x48a)][_0x52da50(0x9e5)]=function(_0x383bac){const _0x3dbfca=_0x52da50;this[_0x3dbfca(0x67b)]=_0x383bac;},Sprite_TitlePictureButton['prototype'][_0x52da50(0x648)]=function(){const _0x86736a=_0x52da50;this[_0x86736a(0x67b)]&&(_0x86736a(0x2ae)!==_0x86736a(0x2ae)?_0x503d86=_0x4f9b8e['CoreEngine'][_0x86736a(0x2d2)][_0x86736a(0x4cc)](this):this[_0x86736a(0x67b)]());},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x4b6)]=Spriteset_Base[_0x52da50(0x48a)]['initialize'],Spriteset_Base['prototype'][_0x52da50(0x2a5)]=function(){const _0x3384dd=_0x52da50;VisuMZ[_0x3384dd(0x9bb)][_0x3384dd(0x4b6)][_0x3384dd(0x4cc)](this),this[_0x3384dd(0x3b8)]();},Spriteset_Base['prototype']['initMembersCoreEngine']=function(){const _0x29ef77=_0x52da50;this['_fauxAnimationSprites']=[],this['_pointAnimationSprites']=[],this[_0x29ef77(0x7c9)]=this[_0x29ef77(0x752)]['x'],this[_0x29ef77(0x856)]=this[_0x29ef77(0x752)]['y'];},VisuMZ[_0x52da50(0x9bb)]['Spriteset_Base_destroy']=Spriteset_Base['prototype'][_0x52da50(0x8fe)],Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x8fe)]=function(_0x6f070c){const _0x25d5e2=_0x52da50;this[_0x25d5e2(0x250)](),this[_0x25d5e2(0x3f5)](),VisuMZ[_0x25d5e2(0x9bb)][_0x25d5e2(0x929)]['call'](this,_0x6f070c);},VisuMZ['CoreEngine']['Spriteset_Base_update']=Spriteset_Base['prototype'][_0x52da50(0x6c5)],Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x6c5)]=function(){const _0x3218f1=_0x52da50;VisuMZ[_0x3218f1(0x9bb)]['Spriteset_Base_update'][_0x3218f1(0x4cc)](this),this[_0x3218f1(0x4b8)](),this[_0x3218f1(0x94e)](),this[_0x3218f1(0x772)]();},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x4b8)]=function(){const _0x3285be=_0x52da50;if(!VisuMZ[_0x3285be(0x9bb)][_0x3285be(0x630)][_0x3285be(0x7cf)]['AntiZoomPictures'])return;if(this[_0x3285be(0x7c9)]===this[_0x3285be(0x752)]['x']&&this[_0x3285be(0x856)]===this[_0x3285be(0x752)]['y'])return;this[_0x3285be(0x252)](),this[_0x3285be(0x7c9)]=this[_0x3285be(0x752)]['x'],this[_0x3285be(0x856)]=this[_0x3285be(0x752)]['y'];},Spriteset_Base['prototype']['adjustPictureAntiZoom']=function(){const _0x39c41e=_0x52da50;if(SceneManager[_0x39c41e(0x5da)]()&&Spriteset_Map[_0x39c41e(0x9fd)])return;else{if(SceneManager[_0x39c41e(0x249)]()&&Spriteset_Battle[_0x39c41e(0x9fd)]){if(_0x39c41e(0x443)===_0x39c41e(0x443))return;else this['updateMain'](),_0x571b85[_0x39c41e(0x750)]();}}this[_0x39c41e(0x752)]['x']!==0x0&&(this[_0x39c41e(0x1a5)][_0x39c41e(0x752)]['x']=0x1/this['scale']['x'],this[_0x39c41e(0x1a5)]['x']=-(this['x']/this[_0x39c41e(0x752)]['x'])),this[_0x39c41e(0x752)]['y']!==0x0&&(this['_pictureContainer'][_0x39c41e(0x752)]['y']=0x1/this[_0x39c41e(0x752)]['y'],this[_0x39c41e(0x1a5)]['y']=-(this['y']/this['scale']['y']));},VisuMZ[_0x52da50(0x9bb)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x1ac)],Spriteset_Base[_0x52da50(0x48a)]['updatePosition']=function(){const _0x4ab7f1=_0x52da50;VisuMZ[_0x4ab7f1(0x9bb)][_0x4ab7f1(0x9c3)][_0x4ab7f1(0x4cc)](this),this[_0x4ab7f1(0x4ec)]();},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x4ec)]=function(){const _0x1580f8=_0x52da50;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x1580f8(0x442)]($gameScreen['shake']());const _0x155a77=$gameScreen[_0x1580f8(0x31c)]();switch($gameScreen[_0x1580f8(0x31c)]()){case'original':this['updatePositionCoreEngineShakeOriginal']();break;case _0x1580f8(0x658):this[_0x1580f8(0x48c)]();break;case _0x1580f8(0x49c):this[_0x1580f8(0x61b)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x2ee)]=function(){const _0x30759d=_0x52da50,_0x43e391=VisuMZ[_0x30759d(0x9bb)][_0x30759d(0x630)][_0x30759d(0x767)];if(_0x43e391&&_0x43e391[_0x30759d(0x894)])return _0x43e391[_0x30759d(0x894)]['call'](this);this['x']+=Math[_0x30759d(0x442)]($gameScreen[_0x30759d(0x501)]());},Spriteset_Base['prototype']['updatePositionCoreEngineShakeRand']=function(){const _0x5234b7=_0x52da50,_0x5de2bb=VisuMZ[_0x5234b7(0x9bb)][_0x5234b7(0x630)][_0x5234b7(0x767)];if(_0x5de2bb&&_0x5de2bb[_0x5234b7(0x908)])return _0x5de2bb['randomJS'][_0x5234b7(0x4cc)](this);const _0x5329c6=$gameScreen['_shakePower']*0.75,_0x150764=$gameScreen[_0x5234b7(0x896)]*0.6,_0x617f6f=$gameScreen[_0x5234b7(0x2b0)];this['x']+=Math[_0x5234b7(0x442)](Math[_0x5234b7(0x607)](_0x5329c6)-Math[_0x5234b7(0x607)](_0x150764))*(Math[_0x5234b7(0x8e5)](_0x617f6f,0x1e)*0.5),this['y']+=Math[_0x5234b7(0x442)](Math[_0x5234b7(0x607)](_0x5329c6)-Math[_0x5234b7(0x607)](_0x150764))*(Math[_0x5234b7(0x8e5)](_0x617f6f,0x1e)*0.5);},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x48c)]=function(){const _0x3e36c4=_0x52da50,_0x49000f=VisuMZ[_0x3e36c4(0x9bb)][_0x3e36c4(0x630)][_0x3e36c4(0x767)];if(_0x49000f&&_0x49000f[_0x3e36c4(0x544)])return _0x49000f[_0x3e36c4(0x544)]['call'](this);const _0x2422ce=$gameScreen[_0x3e36c4(0x7d5)]*0.75,_0x6b5e5f=$gameScreen[_0x3e36c4(0x896)]*0.6,_0x38d9fc=$gameScreen['_shakeDuration'];this['x']+=Math[_0x3e36c4(0x442)](Math[_0x3e36c4(0x607)](_0x2422ce)-Math[_0x3e36c4(0x607)](_0x6b5e5f))*(Math['min'](_0x38d9fc,0x1e)*0.5);},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x61b)]=function(){const _0x3e63a7=_0x52da50,_0x2b424d=VisuMZ['CoreEngine'][_0x3e63a7(0x630)][_0x3e63a7(0x767)];if(_0x2b424d&&_0x2b424d['vertJS']){if(_0x3e63a7(0xa21)==='PybRb')return _0x2b424d[_0x3e63a7(0x348)][_0x3e63a7(0x4cc)](this);else this['_forcedTroopView']='SV';}const _0x27978c=$gameScreen['_shakePower']*0.75,_0x414887=$gameScreen[_0x3e63a7(0x896)]*0.6,_0x432c1b=$gameScreen['_shakeDuration'];this['y']+=Math['round'](Math[_0x3e63a7(0x607)](_0x27978c)-Math[_0x3e63a7(0x607)](_0x414887))*(Math[_0x3e63a7(0x8e5)](_0x432c1b,0x1e)*0.5);},Spriteset_Base['prototype']['updateFauxAnimations']=function(){const _0x3a17db=_0x52da50;for(const _0x2b00ec of this[_0x3a17db(0x9c8)]){'NgFZL'!==_0x3a17db(0x531)?!_0x2b00ec[_0x3a17db(0x4de)]()&&this[_0x3a17db(0x931)](_0x2b00ec):(_0x31325a[_0x3a17db(0x9bb)][_0x3a17db(0x52b)][_0x3a17db(0x4cc)](this),this[_0x3a17db(0x3eb)]());}this['processFauxAnimationRequests']();},Spriteset_Base[_0x52da50(0x48a)]['processFauxAnimationRequests']=function(){const _0x126030=_0x52da50;for(;;){if(_0x126030(0xa29)!==_0x126030(0x6ab)){const _0x17c91e=$gameTemp['retrieveFauxAnimation']();if(_0x17c91e)this[_0x126030(0x3ff)](_0x17c91e);else{if('cywab'===_0x126030(0x8ae)){_0x500180[_0x126030(0x9bb)][_0x126030(0x5ef)]['call'](this,_0x232b04);if(_0x33f5b7[_0x126030(0x9bb)][_0x126030(0x630)][_0x126030(0x7cf)][_0x126030(0x9a4)])return;const _0x321d3a=_0x50fa17['result']();_0x321d3a[_0x126030(0x9b3)]&&(0x1-this[_0x126030(0x6eb)](_0x233f3d)>this['itemHit'](_0x3d8867)&&(_0x321d3a[_0x126030(0x9b3)]=![],_0x321d3a['evaded']=!![]));}else break;}}else{if(!_0x28576c[_0x126030(0x6c9)]())return;if(!_0x3a8c30[_0x126030(0x60b)]())return;_0x518944[_0x126030(0x30e)](_0x5c665e,_0x45e83f);const _0x5eda63=_0x409f4c[_0x126030(0x18d)]||0x1;_0x8100c4[_0x126030(0x2a9)]=_0x5eda63;}}},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x3ff)]=function(_0x42d152){const _0x238765=_0x52da50,_0x33a038=$dataAnimations[_0x42d152[_0x238765(0x69c)]],_0x2a553d=_0x42d152[_0x238765(0x3f2)],_0x596512=_0x42d152[_0x238765(0x854)],_0xa20876=_0x42d152[_0x238765(0x2c8)];let _0x472b74=this[_0x238765(0x1ce)]();const _0x3ac43a=this[_0x238765(0x8fc)]();if(this[_0x238765(0x41a)](_0x33a038))for(const _0x5841dc of _0x2a553d){this[_0x238765(0x73e)]([_0x5841dc],_0x33a038,_0x596512,_0x472b74,_0xa20876),_0x472b74+=_0x3ac43a;}else this[_0x238765(0x73e)](_0x2a553d,_0x33a038,_0x596512,_0x472b74,_0xa20876);},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x343)]=function(_0x3318c3,_0x55a41b,_0x3187a1,_0x20f655){const _0x416ce9=_0x52da50,_0x183649=this[_0x416ce9(0x46c)](_0x55a41b),_0x70c652=new(_0x183649?Sprite_AnimationMV:Sprite_Animation)(),_0x4163fb=this['makeTargetSprites'](_0x3318c3),_0x12108c=this['animationBaseDelay'](),_0x4c779d=_0x20f655>_0x12108c?this[_0x416ce9(0x2c5)]():null;this['animationShouldMirror'](_0x3318c3[0x0])&&('WEbbW'===_0x416ce9(0x3c1)?_0x3187a1=!_0x3187a1:this['_helpWindow'][_0x416ce9(0x56e)](_0x558f0d[_0x416ce9(0x610)][_0x416ce9(0x333)])),_0x70c652['targetObjects']=_0x3318c3,_0x70c652['setup'](_0x4163fb,_0x55a41b,_0x3187a1,_0x20f655,_0x4c779d),this[_0x416ce9(0x8a6)](_0x70c652),this[_0x416ce9(0x2fe)][_0x416ce9(0x281)](_0x70c652);},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x73e)]=function(_0x2558de,_0x22fbb4,_0xd7192,_0x4e318f,_0x19c282){const _0x2a5512=_0x52da50,_0x104f92=this[_0x2a5512(0x46c)](_0x22fbb4),_0x3c406d=new(_0x104f92?Sprite_AnimationMV:Sprite_Animation)(),_0xd1569b=this[_0x2a5512(0x3db)](_0x2558de);this[_0x2a5512(0x732)](_0x2558de[0x0])&&(_0xd7192=!_0xd7192);_0x3c406d[_0x2a5512(0x9b8)]=_0x2558de,_0x3c406d[_0x2a5512(0x626)](_0xd1569b,_0x22fbb4,_0xd7192,_0x4e318f),_0x3c406d['setMute'](_0x19c282),this[_0x2a5512(0x8a6)](_0x3c406d);if(this[_0x2a5512(0x2fe)])this[_0x2a5512(0x2fe)]['remove'](_0x3c406d);this['_fauxAnimationSprites'][_0x2a5512(0x281)](_0x3c406d);},Spriteset_Base['prototype'][_0x52da50(0x8a6)]=function(_0xdedd72){const _0x5e0c8c=_0x52da50;this[_0x5e0c8c(0x8f3)][_0x5e0c8c(0x1d0)](_0xdedd72);},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x4b0)]=function(_0x53dbcd){const _0x42df2b=_0x52da50;this[_0x42df2b(0x2fe)][_0x42df2b(0x6da)](_0x53dbcd),this[_0x42df2b(0x8b4)](_0x53dbcd);for(const _0x5e12f8 of _0x53dbcd[_0x42df2b(0x9b8)]){_0x5e12f8[_0x42df2b(0x5be)]&&_0x5e12f8['endAnimation']();}_0x53dbcd[_0x42df2b(0x8fe)]();},Spriteset_Base['prototype'][_0x52da50(0x931)]=function(_0x56d8ed){const _0x1c5536=_0x52da50;this[_0x1c5536(0x9c8)]['remove'](_0x56d8ed),this['removeAnimationFromContainer'](_0x56d8ed);for(const _0x57a829 of _0x56d8ed['targetObjects']){_0x1c5536(0x918)==='VDjWK'?_0x57a829[_0x1c5536(0x5be)]&&_0x57a829[_0x1c5536(0x5be)]():this[_0x1c5536(0x8f3)][_0x1c5536(0x8a5)](_0x3020dc);}_0x56d8ed[_0x1c5536(0x8fe)]();},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x8b4)]=function(_0x4a4d6b){const _0x234232=_0x52da50;this[_0x234232(0x8f3)][_0x234232(0x8a5)](_0x4a4d6b);},Spriteset_Base[_0x52da50(0x48a)]['removeAllFauxAnimations']=function(){const _0x5e937a=_0x52da50;for(const _0x25a150 of this[_0x5e937a(0x9c8)]){if(_0x5e937a(0x41c)!==_0x5e937a(0x461))this[_0x5e937a(0x931)](_0x25a150);else{this[_0x5e937a(0x19a)]=this[_0x5e937a(0x6dc)]()[_0x5e937a(0x6a4)];return;}}},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x42f)]=function(){const _0x276721=_0x52da50;return this[_0x276721(0x9c8)]['length']>0x0;},Spriteset_Base['prototype'][_0x52da50(0x772)]=function(){const _0x1d07d1=_0x52da50;for(const _0x45eb71 of this['_pointAnimationSprites']){if(!_0x45eb71['isPlaying']()){if('ahoLh'==='Fhimd'){_0x27f0cd[_0x1d07d1(0x30e)](_0x433144,_0x2d64a5);const _0x5b05b9=_0x11590e[_0x1d07d1(0x4ea)]||0x1;_0x20e6cb['setMainFontSize'](_0x5b05b9);}else this[_0x1d07d1(0x1fa)](_0x45eb71);}}this[_0x1d07d1(0x3d3)]();},Spriteset_Base[_0x52da50(0x48a)]['processPointAnimationRequests']=function(){const _0x153b7a=_0x52da50;for(;;){if(_0x153b7a(0x976)!==_0x153b7a(0x976))this[_0x153b7a(0x8dd)]={},_0x14ab59[_0x153b7a(0x9bb)][_0x153b7a(0x5d2)]['call'](this);else{const _0xb5c2d2=$gameTemp[_0x153b7a(0x216)]();if(_0xb5c2d2)'mAYiZ'!==_0x153b7a(0x743)?(this[_0x153b7a(0x7b6)]&&(_0x52aeac=_0x5a3efe[_0x153b7a(0x315)](_0x55f15f),_0x47d03d['se']&&(_0x2ee62f['se']['volume']=0x0)),_0x2e5b4a[_0x153b7a(0x9bb)][_0x153b7a(0x6e4)]['call'](this,_0x3d877f)):this[_0x153b7a(0x89e)](_0xb5c2d2);else{if(_0x153b7a(0x396)!=='RxYbj'){if(_0x15681f)_0x526ad5[_0x153b7a(0x4a1)](_0x91fc9b);}else break;}}}},Spriteset_Base['prototype']['createPointAnimation']=function(_0x1de278){const _0x4c0d55=_0x52da50,_0x1a465a=$dataAnimations[_0x1de278[_0x4c0d55(0x69c)]],_0x2801bc=this[_0x4c0d55(0x76c)](_0x1de278),_0x19c4bf=_0x1de278['mirror'],_0x48f3f2=_0x1de278[_0x4c0d55(0x2c8)];let _0x4aa659=this[_0x4c0d55(0x1ce)]();const _0x1ddef4=this[_0x4c0d55(0x8fc)]();if(this[_0x4c0d55(0x41a)](_0x1a465a)){if('RGsHC'!==_0x4c0d55(0x744)){let _0x4ec780=this[_0x4c0d55(0x2c6)]();const _0x3a5586=this[_0x4c0d55(0x51a)](),_0x1a084e=this[_0x4c0d55(0x1fe)]();if(this[_0x4c0d55(0x75f)]()&&(_0x4ec780<_0x3a5586||_0x438a19&&_0x1a084e===0x1)){_0x4ec780+=_0x1a084e;if(_0x4ec780>=_0x3a5586)_0x4ec780=_0x3a5586-0x1;this[_0x4c0d55(0x6ef)](_0x4ec780);}else!this[_0x4c0d55(0x75f)]()&&((_0x4ec780<_0x3a5586-_0x1a084e||_0x212908&&_0x1a084e===0x1)&&this[_0x4c0d55(0x6ef)]((_0x4ec780+_0x1a084e)%_0x3a5586));}else for(const _0x3f44f2 of _0x2801bc){if(_0x4c0d55(0x52e)!==_0x4c0d55(0x4e1))this['createPointAnimationSprite']([_0x3f44f2],_0x1a465a,_0x19c4bf,_0x4aa659,_0x48f3f2),_0x4aa659+=_0x1ddef4;else return _0xca3737[_0x4c0d55(0x894)][_0x4c0d55(0x4cc)](this);}}else this['createPointAnimationSprite'](_0x2801bc,_0x1a465a,_0x19c4bf,_0x4aa659,_0x48f3f2);},Spriteset_Base['prototype'][_0x52da50(0x76c)]=function(_0x3899a5){const _0x3dd763=_0x52da50,_0x29587e=new Sprite_Clickable(),_0xe32a=this['getPointAnimationLayer']();_0x29587e['x']=_0x3899a5['x']-_0xe32a['x'],_0x29587e['y']=_0x3899a5['y']-_0xe32a['y'],_0x29587e['z']=0x64;const _0x3fef4c=this[_0x3dd763(0x958)]();return _0x3fef4c[_0x3dd763(0x1d0)](_0x29587e),[_0x29587e];},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x958)]=function(){return this;},Spriteset_Map[_0x52da50(0x48a)][_0x52da50(0x958)]=function(){const _0x14d57f=_0x52da50;return this[_0x14d57f(0x4ac)]||this;},Spriteset_Battle[_0x52da50(0x48a)][_0x52da50(0x958)]=function(){const _0x1b57cc=_0x52da50;return this[_0x1b57cc(0x6ea)]||this;},Spriteset_Base['prototype'][_0x52da50(0x47c)]=function(_0x42703e,_0x177afc,_0x19df0b,_0x2b6d67,_0x1813d6){const _0x13f6da=_0x52da50,_0x4d642a=this[_0x13f6da(0x46c)](_0x177afc),_0x3e186d=new(_0x4d642a?Sprite_AnimationMV:Sprite_Animation)();_0x3e186d[_0x13f6da(0x9b8)]=_0x42703e,_0x3e186d['setup'](_0x42703e,_0x177afc,_0x19df0b,_0x2b6d67),_0x3e186d[_0x13f6da(0x37c)](_0x1813d6),this[_0x13f6da(0x8a6)](_0x3e186d),this[_0x13f6da(0x888)]['push'](_0x3e186d);},Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x1fa)]=function(_0x240a32){const _0x586f40=_0x52da50;this[_0x586f40(0x888)][_0x586f40(0x6da)](_0x240a32),this[_0x586f40(0x8f3)][_0x586f40(0x8a5)](_0x240a32);for(const _0xcbc0c6 of _0x240a32['targetObjects']){if('NrdSb'!=='EOqfI'){_0xcbc0c6[_0x586f40(0x5be)]&&_0xcbc0c6[_0x586f40(0x5be)]();const _0x11a5bc=this[_0x586f40(0x958)]();if(_0x11a5bc)_0x11a5bc[_0x586f40(0x8a5)](_0xcbc0c6);}else _0x1b7e38[_0x586f40(0x9bb)][_0x586f40(0x630)]['MenuLayout'][_0x586f40(0x6bf)]['drawGameVersion'][_0x586f40(0x4cc)](this);}_0x240a32['destroy']();},Spriteset_Base['prototype']['removeAllPointAnimations']=function(){const _0x17af02=_0x52da50;for(const _0x4b504d of this[_0x17af02(0x888)]){_0x17af02(0x68f)!==_0x17af02(0x68f)?_0x2b921a=_0x4deceb['boxHeight']-_0x55d8d5:this['removePointAnimation'](_0x4b504d);}},Spriteset_Base['prototype'][_0x52da50(0x940)]=function(){const _0x3f885f=_0x52da50;return this[_0x3f885f(0x888)][_0x3f885f(0x69a)]>0x0;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x3d0)]=Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x449)],Spriteset_Base[_0x52da50(0x48a)][_0x52da50(0x449)]=function(){const _0x442a17=_0x52da50;return VisuMZ['CoreEngine'][_0x442a17(0x3d0)][_0x442a17(0x4cc)](this)||this[_0x442a17(0x940)]();},Spriteset_Map[_0x52da50(0x9fd)]=VisuMZ[_0x52da50(0x9bb)]['Settings'][_0x52da50(0x7cf)]['DetachMapPictureContainer']||![],VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x703)]=Scene_Map[_0x52da50(0x48a)][_0x52da50(0x95a)],Scene_Map[_0x52da50(0x48a)][_0x52da50(0x95a)]=function(){const _0x2f554a=_0x52da50;VisuMZ['CoreEngine']['Scene_Map_createSpriteset_detach'][_0x2f554a(0x4cc)](this);if(!Spriteset_Map[_0x2f554a(0x9fd)])return;const _0x2fc8a0=this['_spriteset'];if(!_0x2fc8a0)return;this[_0x2f554a(0x1a5)]=_0x2fc8a0[_0x2f554a(0x1a5)];if(!this[_0x2f554a(0x1a5)])return;this['addChild'](this[_0x2f554a(0x1a5)]);},Spriteset_Battle[_0x52da50(0x9fd)]=VisuMZ[_0x52da50(0x9bb)]['Settings'][_0x52da50(0x7cf)][_0x52da50(0x776)]||![],VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x76e)]=Scene_Battle['prototype'][_0x52da50(0x95a)],Scene_Battle['prototype'][_0x52da50(0x95a)]=function(){const _0x15e004=_0x52da50;VisuMZ['CoreEngine'][_0x15e004(0x76e)][_0x15e004(0x4cc)](this);if(!Spriteset_Battle[_0x15e004(0x9fd)])return;const _0x384016=this[_0x15e004(0x4b3)];if(!_0x384016)return;this[_0x15e004(0x1a5)]=_0x384016['_pictureContainer'];if(!this[_0x15e004(0x1a5)])return;this[_0x15e004(0x1d0)](this['_pictureContainer']);},Spriteset_Battle[_0x52da50(0x48a)][_0x52da50(0xa1a)]=function(){const _0x5782d8=_0x52da50;this[_0x5782d8(0x1e1)]=new PIXI[(_0x5782d8(0x5fe))][(_0x5782d8(0x787))](clamp=!![]),this[_0x5782d8(0x5a8)]=new Sprite(),this[_0x5782d8(0x5a8)][_0x5782d8(0x42c)]=SceneManager[_0x5782d8(0x81c)](),this[_0x5782d8(0x5a8)][_0x5782d8(0x5fe)]=[this[_0x5782d8(0x1e1)]],this[_0x5782d8(0x4b1)][_0x5782d8(0x1d0)](this[_0x5782d8(0x5a8)]);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x3a7)]=Spriteset_Battle['prototype'][_0x52da50(0x863)],Spriteset_Battle[_0x52da50(0x48a)][_0x52da50(0x863)]=function(){const _0x170f0c=_0x52da50;this[_0x170f0c(0xa18)]()&&(_0x170f0c(0x97e)!==_0x170f0c(0x7e7)?this[_0x170f0c(0x980)]():this['switchModes'](_0x170f0c(0x293))),VisuMZ[_0x170f0c(0x9bb)][_0x170f0c(0x3a7)][_0x170f0c(0x4cc)](this);},Spriteset_Battle[_0x52da50(0x48a)][_0x52da50(0xa18)]=function(){const _0x3b9d3d=_0x52da50,_0x1db8fd=VisuMZ[_0x3b9d3d(0x9bb)][_0x3b9d3d(0x630)][_0x3b9d3d(0x613)];if(!_0x1db8fd)return![];if(Utils[_0x3b9d3d(0x892)]>='1.3.0'&&!_0x1db8fd['RepositionEnemies130'])return![];return _0x1db8fd[_0x3b9d3d(0x6fd)];},Spriteset_Battle['prototype'][_0x52da50(0x980)]=function(){const _0xd8473b=_0x52da50;for(member of $gameTroop[_0xd8473b(0x880)]()){if(_0xd8473b(0x5a5)==='bqeLM')member['moveRelativeToResolutionChange']();else{const _0xaf4e48=_0x22a2c1['CoreEngine'][_0xd8473b(0x630)]['ButtonAssist'],_0x2a9c62=_0xaf4e48[_0xd8473b(0x3aa)],_0x46b22a=_0x33e227[_0xd8473b(0x201)](),_0x5a4ebb=_0xd8473b(0x8bc)[_0xd8473b(0x8de)](_0x46b22a);return _0xaf4e48[_0x5a4ebb]?_0xaf4e48[_0x5a4ebb]:_0x2a9c62['format'](_0x46b22a);}}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x36c)]=Window_Base[_0x52da50(0x48a)]['initialize'],Window_Base[_0x52da50(0x48a)][_0x52da50(0x2a5)]=function(_0x141784){const _0xc223f8=_0x52da50;_0x141784['x']=Math[_0xc223f8(0x442)](_0x141784['x']),_0x141784['y']=Math['round'](_0x141784['y']),_0x141784[_0xc223f8(0x2b7)]=Math[_0xc223f8(0x442)](_0x141784[_0xc223f8(0x2b7)]),_0x141784[_0xc223f8(0x394)]=Math[_0xc223f8(0x442)](_0x141784[_0xc223f8(0x394)]),this[_0xc223f8(0x24a)](),VisuMZ['CoreEngine'][_0xc223f8(0x36c)][_0xc223f8(0x4cc)](this,_0x141784),this['initCoreEasing']();},Window_Base[_0x52da50(0x48a)][_0x52da50(0x24a)]=function(){const _0x3c617a=_0x52da50;this[_0x3c617a(0x786)]=VisuMZ[_0x3c617a(0x9bb)][_0x3c617a(0x630)]['QoL'][_0x3c617a(0x402)],this['_digitGroupingEx']=VisuMZ['CoreEngine'][_0x3c617a(0x630)]['QoL'][_0x3c617a(0x4ab)];},Window_Base[_0x52da50(0x48a)][_0x52da50(0x75c)]=function(){const _0x38d0fc=_0x52da50;return VisuMZ[_0x38d0fc(0x9bb)]['Settings']['Window']['LineHeight'];},Window_Base[_0x52da50(0x48a)][_0x52da50(0x679)]=function(){const _0x4a9d82=_0x52da50;return VisuMZ[_0x4a9d82(0x9bb)][_0x4a9d82(0x630)][_0x4a9d82(0x5bc)]['ItemPadding'];},Window_Base[_0x52da50(0x48a)][_0x52da50(0x573)]=function(){const _0x21dbd3=_0x52da50;$gameSystem[_0x21dbd3(0x27e)]?_0x21dbd3(0x8c5)!=='XaCQH'?this[_0x21dbd3(0x70f)]=$gameSystem[_0x21dbd3(0x27e)]():this['_statusWindow']['setBackgroundType'](_0x50cf7a[_0x21dbd3(0x610)][_0x21dbd3(0x1b8)]):'TFoWU'!==_0x21dbd3(0x8cb)?this['processKeyboardDigitChange']():this[_0x21dbd3(0x70f)]=VisuMZ[_0x21dbd3(0x9bb)][_0x21dbd3(0x630)]['Window'][_0x21dbd3(0x681)];},Window_Base['prototype'][_0x52da50(0x469)]=function(){const _0x5200aa=_0x52da50;return VisuMZ[_0x5200aa(0x9bb)][_0x5200aa(0x630)][_0x5200aa(0x5bc)]['TranslucentOpacity'];},Window_Base[_0x52da50(0x48a)]['openingSpeed']=function(){const _0x517ef8=_0x52da50;return VisuMZ[_0x517ef8(0x9bb)][_0x517ef8(0x630)][_0x517ef8(0x5bc)][_0x517ef8(0x411)];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x6ac)]=Window_Base[_0x52da50(0x48a)][_0x52da50(0x6c5)],Window_Base[_0x52da50(0x48a)]['update']=function(){const _0x24a362=_0x52da50;VisuMZ[_0x24a362(0x9bb)][_0x24a362(0x6ac)]['call'](this),this[_0x24a362(0x6ff)]();},Window_Base['prototype']['updateOpen']=function(){const _0x2b3394=_0x52da50;this[_0x2b3394(0x716)]&&(_0x2b3394(0x87d)==='lteLQ'?(this[_0x2b3394(0x6dc)]()[_0x2b3394(0x1b1)]=!![],this['centerCameraCheckData']()[_0x2b3394(0x3ee)]=_0x4eaf5a[_0x2b3394(0x334)]):(this[_0x2b3394(0x1e4)]+=this['openingSpeed'](),this[_0x2b3394(0x2b8)]()&&(_0x2b3394(0x228)!==_0x2b3394(0x7ba)?this[_0x2b3394(0x716)]=![]:this[_0x2b3394(0x91b)][_0x2b3394(0x56e)](_0x10660b[_0x2b3394(0x610)][_0x2b3394(0x1b8)]))));},Window_Base['prototype']['updateClose']=function(){const _0x25341a=_0x52da50;this[_0x25341a(0x22d)]&&(this['openness']-=this[_0x25341a(0x405)](),this[_0x25341a(0x408)]()&&(this[_0x25341a(0x22d)]=![]));},VisuMZ['CoreEngine'][_0x52da50(0x255)]=Window_Base[_0x52da50(0x48a)][_0x52da50(0x780)],Window_Base[_0x52da50(0x48a)][_0x52da50(0x780)]=function(_0x1bed2f,_0x1f9941,_0x37dc34,_0x463154,_0x2a9816){const _0x252d4b=_0x52da50;if(this[_0x252d4b(0x5d8)]())_0x1bed2f=VisuMZ['GroupDigits'](_0x1bed2f);VisuMZ[_0x252d4b(0x9bb)][_0x252d4b(0x255)]['call'](this,_0x1bed2f,_0x1f9941,_0x37dc34,_0x463154,_0x2a9816);},Window_Base[_0x52da50(0x48a)][_0x52da50(0x5d8)]=function(){const _0x549dba=_0x52da50;return this[_0x549dba(0x786)];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x621)]=Window_Base[_0x52da50(0x48a)][_0x52da50(0x21d)],Window_Base['prototype'][_0x52da50(0x21d)]=function(_0x42cb5f,_0x13785b,_0x558bef,_0x1afe9d){const _0x478d62=_0x52da50;var _0x1df63d=VisuMZ['CoreEngine'][_0x478d62(0x621)][_0x478d62(0x4cc)](this,_0x42cb5f,_0x13785b,_0x558bef,_0x1afe9d);if(this['useDigitGroupingEx']())_0x1df63d[_0x478d62(0x5bd)]=VisuMZ[_0x478d62(0x685)](_0x1df63d[_0x478d62(0x5bd)]);return _0x1df63d;},Window_Base[_0x52da50(0x48a)]['useDigitGroupingEx']=function(){const _0x331546=_0x52da50;return this[_0x331546(0x873)];},Window_Base[_0x52da50(0x48a)][_0x52da50(0x472)]=function(_0x389548){const _0x302e33=_0x52da50;this[_0x302e33(0x786)]=_0x389548;},Window_Base['prototype'][_0x52da50(0x1cf)]=function(_0x5cc584){const _0x1fab0e=_0x52da50;this[_0x1fab0e(0x873)]=_0x5cc584;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x504)]=Window_Base['prototype'][_0x52da50(0x645)],Window_Base['prototype'][_0x52da50(0x645)]=function(_0x24d02d,_0x55ab38,_0x402fdf){const _0x190e7f=_0x52da50;_0x55ab38=Math[_0x190e7f(0x442)](_0x55ab38),_0x402fdf=Math[_0x190e7f(0x442)](_0x402fdf),VisuMZ[_0x190e7f(0x9bb)][_0x190e7f(0x504)]['call'](this,_0x24d02d,_0x55ab38,_0x402fdf);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x1c7)]=Window_Base[_0x52da50(0x48a)]['drawFace'],Window_Base[_0x52da50(0x48a)][_0x52da50(0x87e)]=function(_0x29b822,_0x324068,_0x382598,_0x2fb328,_0x593a38,_0x18f909){const _0x560487=_0x52da50;_0x593a38=_0x593a38||ImageManager[_0x560487(0x9a2)],_0x18f909=_0x18f909||ImageManager[_0x560487(0x7cc)],_0x382598=Math['round'](_0x382598),_0x2fb328=Math['round'](_0x2fb328),_0x593a38=Math['round'](_0x593a38),_0x18f909=Math[_0x560487(0x442)](_0x18f909),VisuMZ[_0x560487(0x9bb)][_0x560487(0x1c7)]['call'](this,_0x29b822,_0x324068,_0x382598,_0x2fb328,_0x593a38,_0x18f909);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x385)]=Window_Base[_0x52da50(0x48a)][_0x52da50(0x1e5)],Window_Base[_0x52da50(0x48a)][_0x52da50(0x1e5)]=function(_0xcba8bf,_0x556ef1,_0x571666,_0x1cf903){const _0x489b0e=_0x52da50;_0x571666=Math[_0x489b0e(0x442)](_0x571666),_0x1cf903=Math['round'](_0x1cf903),VisuMZ[_0x489b0e(0x9bb)][_0x489b0e(0x385)][_0x489b0e(0x4cc)](this,_0xcba8bf,_0x556ef1,_0x571666,_0x1cf903);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x897)]=Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x378)],Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x378)]=function(_0x529194){const _0x5d308d=_0x52da50;let _0x2303a0=VisuMZ['CoreEngine'][_0x5d308d(0x897)]['call'](this,_0x529194);return _0x2303a0['x']=Math[_0x5d308d(0x442)](_0x2303a0['x']),_0x2303a0['y']=Math[_0x5d308d(0x442)](_0x2303a0['y']),_0x2303a0[_0x5d308d(0x2b7)]=Math[_0x5d308d(0x442)](_0x2303a0[_0x5d308d(0x2b7)]),_0x2303a0[_0x5d308d(0x394)]=Math[_0x5d308d(0x442)](_0x2303a0[_0x5d308d(0x394)]),_0x2303a0;},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x28b)]=Window_StatusBase['prototype'][_0x52da50(0x7ec)],Window_StatusBase[_0x52da50(0x48a)]['drawActorSimpleStatus']=function(_0xc8adf4,_0x373211,_0x442c3c){const _0x1910b0=_0x52da50;_0x373211=Math['round'](_0x373211),_0x442c3c=Math[_0x1910b0(0x442)](_0x442c3c),VisuMZ[_0x1910b0(0x9bb)][_0x1910b0(0x28b)]['call'](this,_0xc8adf4,_0x373211,_0x442c3c);},Window_Base[_0x52da50(0x48a)]['initCoreEasing']=function(){const _0x3e6af8=_0x52da50;this[_0x3e6af8(0x387)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x3e6af8(0x752)]['x'],'targetScaleY':this[_0x3e6af8(0x752)]['y'],'targetOpacity':this[_0x3e6af8(0xa09)],'targetBackOpacity':this[_0x3e6af8(0x70f)],'targetContentsOpacity':this[_0x3e6af8(0x69b)]};},Window_Base['prototype'][_0x52da50(0x6ff)]=function(){const _0x2b0b79=_0x52da50;if(!this[_0x2b0b79(0x387)])return;if(this['_coreEasing'][_0x2b0b79(0x836)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x2b0b79(0x387)][_0x2b0b79(0x638)]),this['y']=this[_0x2b0b79(0x68b)](this['y'],this[_0x2b0b79(0x387)][_0x2b0b79(0x9ac)]),this[_0x2b0b79(0x752)]['x']=this[_0x2b0b79(0x68b)](this[_0x2b0b79(0x752)]['x'],this[_0x2b0b79(0x387)][_0x2b0b79(0x777)]),this[_0x2b0b79(0x752)]['y']=this[_0x2b0b79(0x68b)](this[_0x2b0b79(0x752)]['y'],this[_0x2b0b79(0x387)]['targetScaleY']),this['opacity']=this[_0x2b0b79(0x68b)](this[_0x2b0b79(0xa09)],this[_0x2b0b79(0x387)][_0x2b0b79(0x94c)]),this[_0x2b0b79(0x70f)]=this[_0x2b0b79(0x68b)](this[_0x2b0b79(0x70f)],this[_0x2b0b79(0x387)]['targetBackOpacity']),this[_0x2b0b79(0x69b)]=this[_0x2b0b79(0x68b)](this[_0x2b0b79(0x69b)],this[_0x2b0b79(0x387)][_0x2b0b79(0x97b)]),this[_0x2b0b79(0x387)][_0x2b0b79(0x836)]--;},Window_Base[_0x52da50(0x48a)][_0x52da50(0x68b)]=function(_0x1f7a56,_0x2622b0){const _0x5a7a52=_0x52da50;if(!this[_0x5a7a52(0x387)])return _0x2622b0;const _0x420448=this[_0x5a7a52(0x387)][_0x5a7a52(0x836)],_0x2e39bc=this[_0x5a7a52(0x387)][_0x5a7a52(0x84b)],_0x2d0181=this[_0x5a7a52(0x68a)]((_0x2e39bc-_0x420448)/_0x2e39bc),_0x159847=this[_0x5a7a52(0x68a)]((_0x2e39bc-_0x420448+0x1)/_0x2e39bc),_0x2326d5=(_0x1f7a56-_0x2622b0*_0x2d0181)/(0x1-_0x2d0181);return _0x2326d5+(_0x2622b0-_0x2326d5)*_0x159847;},Window_Base[_0x52da50(0x48a)][_0x52da50(0x68a)]=function(_0x2a9870){const _0x16884a=_0x52da50;if(!this[_0x16884a(0x387)])return _0x2a9870;return VisuMZ[_0x16884a(0x269)](_0x2a9870,this['_coreEasing']['type']||_0x16884a(0x187));},Window_Base[_0x52da50(0x48a)][_0x52da50(0x272)]=function(_0x5ddb8b,_0x50fa55){const _0x279881=_0x52da50;if(!this[_0x279881(0x387)])return;this['x']=this[_0x279881(0x387)]['targetX'],this['y']=this['_coreEasing'][_0x279881(0x9ac)],this[_0x279881(0x752)]['x']=this['_coreEasing'][_0x279881(0x777)],this['scale']['y']=this[_0x279881(0x387)][_0x279881(0x699)],this[_0x279881(0xa09)]=this[_0x279881(0x387)][_0x279881(0x94c)],this[_0x279881(0x70f)]=this[_0x279881(0x387)][_0x279881(0x71e)],this[_0x279881(0x69b)]=this[_0x279881(0x387)][_0x279881(0x97b)],this[_0x279881(0x911)](_0x5ddb8b,_0x50fa55,this['x'],this['y'],this['scale']['x'],this['scale']['y'],this['opacity'],this['backOpacity'],this[_0x279881(0x69b)]);},Window_Base[_0x52da50(0x48a)][_0x52da50(0x911)]=function(_0x460fb3,_0x3e5b40,_0x14bd87,_0x48dd20,_0x23d36f,_0x22df3d,_0x4d17a9,_0x1b334d,_0xe8fa48){const _0x4dbf47=_0x52da50;this[_0x4dbf47(0x387)]={'duration':_0x460fb3,'wholeDuration':_0x460fb3,'type':_0x3e5b40,'targetX':_0x14bd87,'targetY':_0x48dd20,'targetScaleX':_0x23d36f,'targetScaleY':_0x22df3d,'targetOpacity':_0x4d17a9,'targetBackOpacity':_0x1b334d,'targetContentsOpacity':_0xe8fa48};},Window_Base[_0x52da50(0x48a)]['drawCurrencyValue']=function(_0x3816b3,_0xdf77e7,_0x2d3a22,_0x1865c4,_0x32caf6){const _0x27f73f=_0x52da50;this[_0x27f73f(0x2d3)](),this[_0x27f73f(0x9ca)][_0x27f73f(0x830)]=VisuMZ[_0x27f73f(0x9bb)]['Settings']['Gold'][_0x27f73f(0x715)];const _0x4ef7b3=VisuMZ[_0x27f73f(0x9bb)][_0x27f73f(0x630)]['Gold'][_0x27f73f(0x2a1)];if(_0x4ef7b3>0x0&&_0xdf77e7===TextManager['currencyUnit']){const _0x4a4f2f=_0x1865c4+(this[_0x27f73f(0x75c)]()-ImageManager[_0x27f73f(0x6b6)])/0x2;this[_0x27f73f(0x645)](_0x4ef7b3,_0x2d3a22+(_0x32caf6-ImageManager[_0x27f73f(0x565)]),_0x4a4f2f),_0x32caf6-=ImageManager[_0x27f73f(0x565)]+0x4;}else this[_0x27f73f(0x267)](ColorManager[_0x27f73f(0x971)]()),this[_0x27f73f(0x780)](_0xdf77e7,_0x2d3a22,_0x1865c4,_0x32caf6,_0x27f73f(0x1c8)),_0x32caf6-=this['textWidth'](_0xdf77e7)+0x6;this[_0x27f73f(0x3e2)]();const _0x5e6274=this[_0x27f73f(0x2e8)](this[_0x27f73f(0x786)]?VisuMZ[_0x27f73f(0x685)](_0x3816b3):_0x3816b3);if(_0x5e6274>_0x32caf6){if('pXYyN'===_0x27f73f(0xa14)){var _0x9f9c13=_0x4493f3(_0x2ddebf['$1']);try{_0x5d5a6e+=_0x5d9a34(_0x9f9c13);}catch(_0x201e99){if(_0x51fb4f[_0x27f73f(0x6c9)]())_0x38ea77['log'](_0x201e99);}}else this['drawText'](VisuMZ['CoreEngine'][_0x27f73f(0x630)][_0x27f73f(0x57d)][_0x27f73f(0x7a2)],_0x2d3a22,_0x1865c4,_0x32caf6,_0x27f73f(0x1c8));}else this[_0x27f73f(0x780)](_0x3816b3,_0x2d3a22,_0x1865c4,_0x32caf6,_0x27f73f(0x1c8));this[_0x27f73f(0x2d3)]();},Window_Base[_0x52da50(0x48a)][_0x52da50(0x577)]=function(_0x403459,_0x5938cf,_0x566ec9,_0x132dd7,_0x34b581){const _0x463c2f=_0x52da50,_0x528b33=ImageManager[_0x463c2f(0x38f)](_0x463c2f(0x37b)),_0x19fd5b=ImageManager[_0x463c2f(0x565)],_0x54a4bd=ImageManager[_0x463c2f(0x6b6)],_0x2e7134=_0x403459%0x10*_0x19fd5b,_0x39aa4a=Math[_0x463c2f(0x23f)](_0x403459/0x10)*_0x54a4bd,_0x2de410=_0x132dd7,_0x23a0ee=_0x132dd7;this[_0x463c2f(0x9ca)][_0x463c2f(0x922)][_0x463c2f(0x570)]=_0x34b581,this[_0x463c2f(0x9ca)][_0x463c2f(0x583)](_0x528b33,_0x2e7134,_0x39aa4a,_0x19fd5b,_0x54a4bd,_0x5938cf,_0x566ec9,_0x2de410,_0x23a0ee),this[_0x463c2f(0x9ca)][_0x463c2f(0x922)][_0x463c2f(0x570)]=!![];},Window_Base[_0x52da50(0x48a)][_0x52da50(0x8cd)]=function(_0x1e6122,_0x4cf767,_0x11f501,_0x203f61,_0x5c8e33,_0x3629ab){const _0x3d9b7e=_0x52da50,_0x22907e=Math[_0x3d9b7e(0x23f)]((_0x11f501-0x2)*_0x203f61),_0x497012=Sprite_Gauge[_0x3d9b7e(0x48a)][_0x3d9b7e(0x7b9)]['call'](this),_0x1949e3=_0x4cf767+this['lineHeight']()-_0x497012-0x2;this['contents']['fillRect'](_0x1e6122,_0x1949e3,_0x11f501,_0x497012,ColorManager['gaugeBackColor']()),this[_0x3d9b7e(0x9ca)][_0x3d9b7e(0x726)](_0x1e6122+0x1,_0x1949e3+0x1,_0x22907e,_0x497012-0x2,_0x5c8e33,_0x3629ab);},Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x34f)]=function(_0x9fadff){const _0x17d247=_0x52da50;let _0xdc588=this['index']();const _0x5b7d51=this[_0x17d247(0x51a)](),_0x3f024e=this[_0x17d247(0x1fe)]();if(this['isUseModernControls']()&&(_0xdc588<_0x5b7d51||_0x9fadff&&_0x3f024e===0x1)){_0xdc588+=_0x3f024e;if(_0xdc588>=_0x5b7d51)_0xdc588=_0x5b7d51-0x1;this[_0x17d247(0x6ef)](_0xdc588);}else{if(!this[_0x17d247(0x75f)]()){if(_0x17d247(0x731)===_0x17d247(0x731))(_0xdc588<_0x5b7d51-_0x3f024e||_0x9fadff&&_0x3f024e===0x1)&&this['smoothSelect']((_0xdc588+_0x3f024e)%_0x5b7d51);else return 0x0;}}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x95d)]=Window_Selectable['prototype']['cursorDown'],Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x34f)]=function(_0x1c794a){const _0x1a0d14=_0x52da50;this['isUseModernControls']()&&_0x1c794a&&this['maxCols']()===0x1&&this[_0x1a0d14(0x2c6)]()===this[_0x1a0d14(0x51a)]()-0x1?this[_0x1a0d14(0x6ef)](0x0):VisuMZ[_0x1a0d14(0x9bb)][_0x1a0d14(0x95d)]['call'](this,_0x1c794a);},Window_Selectable['prototype'][_0x52da50(0x1d8)]=function(_0x5f5a1c){const _0x3e8454=_0x52da50;let _0x560a41=Math[_0x3e8454(0x31b)](0x0,this[_0x3e8454(0x2c6)]());const _0x5c6ec3=this['maxItems'](),_0x4eb917=this[_0x3e8454(0x1fe)]();if(this[_0x3e8454(0x75f)]()&&_0x560a41>0x0||_0x5f5a1c&&_0x4eb917===0x1){_0x560a41-=_0x4eb917;if(_0x560a41<=0x0)_0x560a41=0x0;this['smoothSelect'](_0x560a41);}else!this[_0x3e8454(0x75f)]()&&(_0x3e8454(0x6b8)===_0x3e8454(0x7db)?(this[_0x3e8454(0x6dc)]()[_0x3e8454(0x746)]=!![],this[_0x3e8454(0x6dc)]()['displayY']=_0x13b6b1(_0x4702ed['$1'])):(_0x560a41>=_0x4eb917||_0x5f5a1c&&_0x4eb917===0x1)&&this['smoothSelect']((_0x560a41-_0x4eb917+_0x5c6ec3)%_0x5c6ec3));},VisuMZ[_0x52da50(0x9bb)]['Window_Selectable_cursorUp']=Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x1d8)],Window_Selectable['prototype'][_0x52da50(0x1d8)]=function(_0x315ed5){const _0x290d43=_0x52da50;if(this[_0x290d43(0x75f)]()&&_0x315ed5&&this[_0x290d43(0x1fe)]()===0x1&&this[_0x290d43(0x2c6)]()===0x0)this['smoothSelect'](this[_0x290d43(0x51a)]()-0x1);else{if(_0x290d43(0x257)==='JKqar')VisuMZ[_0x290d43(0x9bb)][_0x290d43(0x71d)][_0x290d43(0x4cc)](this,_0x315ed5);else{var _0x330558=_0xc8403d(_0x204e1c['$1']);_0x5e60c4+=_0x330558;}}},Window_Selectable[_0x52da50(0x48a)]['isUseModernControls']=function(){const _0x23a9aa=_0x52da50;return VisuMZ[_0x23a9aa(0x9bb)][_0x23a9aa(0x630)][_0x23a9aa(0x7cf)]['ModernControls'];},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x8e6)]=Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x6c3)],Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x6c3)]=function(){const _0x16c506=_0x52da50;this[_0x16c506(0x75f)]()?(this[_0x16c506(0x571)](),this[_0x16c506(0x1f1)]()):_0x16c506(0x9d6)!=='AYmKl'?(_0x5afa20[_0x16c506(0x393)](),_0x21c127['removeChild'](_0x283a20[_0x16c506(0x7c5)]),_0x242592[_0x16c506(0x7c5)]=_0x31d6f3):VisuMZ[_0x16c506(0x9bb)][_0x16c506(0x8e6)][_0x16c506(0x4cc)](this);},Window_Selectable['prototype'][_0x52da50(0x1e9)]=function(){return!![];},Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x571)]=function(){const _0x27ee94=_0x52da50;if(this[_0x27ee94(0x792)]()){const _0xe47ae9=this['index']();if(Input[_0x27ee94(0x3f3)](_0x27ee94(0x78e))){if('wDLEQ'!==_0x27ee94(0x62d)){if(this[_0x27ee94(0x4c6)]==='keyboard'&&!_0x32ff90[_0x27ee94(0x8c1)]())return;if(_0x53f574['isNumpadPressed']())return;_0x3cc535[_0x27ee94(0x9bb)][_0x27ee94(0x70c)][_0x27ee94(0x4cc)](this,_0x48a81c),this[_0x27ee94(0x937)]('default');}else{if(Input[_0x27ee94(0x71b)](_0x27ee94(0x493))&&this['allowShiftScrolling']())this[_0x27ee94(0x3f8)]();else{if(_0x27ee94(0x508)!==_0x27ee94(0x2b9))this[_0x27ee94(0x34f)](Input['isTriggered']('down'));else{const _0x10bfd2=_0x8d8412['displayY']()*_0x3084a3[_0x27ee94(0x3bb)]();return(this['_y']-_0x10bfd2)*_0x4eb305[_0x27ee94(0x8ee)]();}}}}Input[_0x27ee94(0x3f3)]('up')&&(Input['isPressed'](_0x27ee94(0x493))&&this[_0x27ee94(0x1e9)]()?this['cursorPageup']():this[_0x27ee94(0x1d8)](Input['isTriggered']('up')));Input['isRepeated']('right')&&this[_0x27ee94(0x4fb)](Input['isTriggered'](_0x27ee94(0x1c8)));if(Input[_0x27ee94(0x3f3)](_0x27ee94(0x5e2))){if(_0x27ee94(0x471)!==_0x27ee94(0x3e4))this['cursorLeft'](Input[_0x27ee94(0x434)](_0x27ee94(0x5e2)));else return _0x27ee94(0x7a8);}if(!this[_0x27ee94(0x9cf)](_0x27ee94(0x979))&&Input[_0x27ee94(0x3f3)]('pagedown')){if(_0x27ee94(0x4a9)!=='IAaIC')for(const _0xa8aaf6 in _0x23f874){const _0x4a5819=_0xe93a12[_0xa8aaf6];_0x4a5819[_0x27ee94(0x215)][_0x27ee94(0x2bb)](/(.*)\/(.*)/i)&&(_0x4a5819[_0x27ee94(0x215)]=_0x106945(_0x84d11b['$2']['trim']()));}else this['cursorPagedown']();}!this['isHandled'](_0x27ee94(0x182))&&Input['isRepeated']('pageup')&&this[_0x27ee94(0x1ca)](),this[_0x27ee94(0x2c6)]()!==_0xe47ae9&&(_0x27ee94(0x2bf)!==_0x27ee94(0x7f8)?this[_0x27ee94(0x423)]():!this[_0x27ee94(0x18b)]&&(this[_0x27ee94(0x18b)]=_0x2c1ea8['gl'][_0x27ee94(0x604)](_0x270258['gl'][_0x27ee94(0x5a6)])));}},Window_Selectable['prototype']['processCursorHomeEndTrigger']=function(){const _0x6998d0=_0x52da50;if(this[_0x6998d0(0x792)]()){if(_0x6998d0(0x7df)==='QqmmY'){const _0x11629d=this['index']();if(Input['isTriggered'](_0x6998d0(0x862))){if(_0x6998d0(0x9f3)==='ZmysM'){const _0x265e16=_0x203bb6[_0x6998d0(0x9bb)][_0x6998d0(0x630)]['ScreenShake'];if(_0x265e16&&_0x265e16[_0x6998d0(0x544)])return _0x265e16['horzJS'][_0x6998d0(0x4cc)](this);const _0x5c6433=_0x358d2c[_0x6998d0(0x7d5)]*0.75,_0x2146c3=_0x56ed2c[_0x6998d0(0x896)]*0.6,_0x380934=_0x48ff9b['_shakeDuration'];this['x']+=_0x3d9120[_0x6998d0(0x442)](_0x3bffbd[_0x6998d0(0x607)](_0x5c6433)-_0x164c9a['randomInt'](_0x2146c3))*(_0x21768b[_0x6998d0(0x8e5)](_0x380934,0x1e)*0.5);}else this[_0x6998d0(0x6ef)](Math[_0x6998d0(0x8e5)](this[_0x6998d0(0x2c6)](),0x0));}Input[_0x6998d0(0x434)](_0x6998d0(0x945))&&this[_0x6998d0(0x6ef)](Math['max'](this[_0x6998d0(0x2c6)](),this[_0x6998d0(0x51a)]()-0x1)),this[_0x6998d0(0x2c6)]()!==_0x11629d&&(_0x6998d0(0x653)==='HWhMV'?this['playCursorSound']():(_0x3c054b['CoreEngine']['Scene_Base_create']['call'](this),_0x2860c9=this));}else for(const _0x4152a9 of _0x437752){this['createFauxAnimationSprite']([_0x4152a9],_0x2dbdb1,_0x6859d2,_0x247009,_0x1e06b0),_0x1591a0+=_0x292a5d;}}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x770)]=Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x23c)],Window_Selectable['prototype'][_0x52da50(0x23c)]=function(){const _0x58b366=_0x52da50;this[_0x58b366(0x75f)]()?this['processTouchModernControls']():VisuMZ['CoreEngine']['Window_Selectable_processTouch']['call'](this);},Window_Selectable['prototype'][_0x52da50(0x9cb)]=function(){const _0x334390=_0x52da50;VisuMZ[_0x334390(0x9bb)]['Window_Selectable_processTouch']['call'](this);},Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x233)]=function(){const _0x59b3ed=_0x52da50;return VisuMZ['CoreEngine'][_0x59b3ed(0x630)][_0x59b3ed(0x5bc)][_0x59b3ed(0x319)];},Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x827)]=function(){const _0x5adc00=_0x52da50;return VisuMZ[_0x5adc00(0x9bb)][_0x5adc00(0x630)][_0x5adc00(0x5bc)][_0x5adc00(0x3a5)];},Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x981)]=function(){const _0x9e4faa=_0x52da50;return Window_Scrollable['prototype'][_0x9e4faa(0x981)][_0x9e4faa(0x4cc)](this)+VisuMZ['CoreEngine']['Settings'][_0x9e4faa(0x5bc)][_0x9e4faa(0x304)];;},VisuMZ['CoreEngine']['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x52da50(0x48a)][_0x52da50(0x363)],Window_Selectable[_0x52da50(0x48a)]['drawBackgroundRect']=function(_0x4c2496){const _0x14d449=_0x52da50,_0x5355da=VisuMZ['CoreEngine'][_0x14d449(0x630)][_0x14d449(0x5bc)];if(_0x5355da[_0x14d449(0x89d)]===![])return;if(_0x5355da['DrawItemBackgroundJS']){if('ocNQL'==='ITlUk'){if(_0x3b5d33[_0x14d449(0x3fc)](_0xf12f4a[_0x14d449(0x523)]()))return!![];}else _0x5355da['DrawItemBackgroundJS'][_0x14d449(0x4cc)](this,_0x4c2496);}else VisuMZ[_0x14d449(0x9bb)][_0x14d449(0x3d4)][_0x14d449(0x4cc)](this,_0x4c2496);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x8c6)]=Window_Gold['prototype'][_0x52da50(0x666)],Window_Gold[_0x52da50(0x48a)][_0x52da50(0x666)]=function(){const _0x58d5fe=_0x52da50;this[_0x58d5fe(0x4df)]()?_0x58d5fe(0x8ba)===_0x58d5fe(0x8ba)?this[_0x58d5fe(0x3b4)]():(_0x4cd257['CoreEngine'][_0x58d5fe(0x292)]['call'](this,_0x1c04aa,_0x3ee670,_0x144f05,_0x2e21dc,_0x2afea5),this[_0x58d5fe(0x3e9)]()):VisuMZ[_0x58d5fe(0x9bb)][_0x58d5fe(0x8c6)][_0x58d5fe(0x4cc)](this);},Window_Gold['prototype'][_0x52da50(0x4df)]=function(){const _0x4364d5=_0x52da50;if(TextManager[_0x4364d5(0x5c1)]!==this[_0x4364d5(0x5c1)]())return![];return VisuMZ['CoreEngine']['Settings'][_0x4364d5(0x57d)]['ItemStyle'];},Window_Gold[_0x52da50(0x48a)][_0x52da50(0x3b4)]=function(){const _0x179297=_0x52da50;this[_0x179297(0x2d3)](),this[_0x179297(0x9ca)][_0x179297(0x712)](),this[_0x179297(0x9ca)][_0x179297(0x830)]=VisuMZ[_0x179297(0x9bb)]['Settings'][_0x179297(0x57d)]['GoldFontSize'];const _0x4f6d75=VisuMZ[_0x179297(0x9bb)][_0x179297(0x630)][_0x179297(0x57d)][_0x179297(0x2a1)],_0x56b5dc=this[_0x179297(0x218)](0x0);if(_0x4f6d75>0x0){if(_0x179297(0x803)===_0x179297(0x9a5)){if(this[_0x179297(0x4c6)]===_0x179297(0x6b9)&&!_0x20565e[_0x179297(0x8c1)]())return;if(_0x596c01[_0x179297(0x44c)]())return;_0x2f52c9['CoreEngine']['Window_NameInput_cursorDown'][_0x179297(0x4cc)](this,_0xbe0a42),this[_0x179297(0x937)](_0x179297(0x293));}else{const _0x306f0c=_0x56b5dc['y']+(this[_0x179297(0x75c)]()-ImageManager[_0x179297(0x6b6)])/0x2;this[_0x179297(0x645)](_0x4f6d75,_0x56b5dc['x'],_0x306f0c);const _0x24735b=ImageManager[_0x179297(0x565)]+0x4;_0x56b5dc['x']+=_0x24735b,_0x56b5dc[_0x179297(0x2b7)]-=_0x24735b;}}this['changeTextColor'](ColorManager[_0x179297(0x971)]()),this[_0x179297(0x780)](this[_0x179297(0x5c1)](),_0x56b5dc['x'],_0x56b5dc['y'],_0x56b5dc['width'],_0x179297(0x5e2));const _0x3e23b8=this['textWidth'](this[_0x179297(0x5c1)]())+0x6;;_0x56b5dc['x']+=_0x3e23b8,_0x56b5dc['width']-=_0x3e23b8,this['resetTextColor']();const _0x403e82=this[_0x179297(0x455)](),_0x5be365=this[_0x179297(0x2e8)](this[_0x179297(0x786)]?VisuMZ[_0x179297(0x685)](this[_0x179297(0x455)]()):this[_0x179297(0x455)]());_0x5be365>_0x56b5dc['width']?this['drawText'](VisuMZ[_0x179297(0x9bb)]['Settings'][_0x179297(0x57d)][_0x179297(0x7a2)],_0x56b5dc['x'],_0x56b5dc['y'],_0x56b5dc[_0x179297(0x2b7)],_0x179297(0x1c8)):this[_0x179297(0x780)](this[_0x179297(0x455)](),_0x56b5dc['x'],_0x56b5dc['y'],_0x56b5dc['width'],_0x179297(0x1c8)),this[_0x179297(0x2d3)]();},Window_StatusBase['prototype'][_0x52da50(0x42b)]=function(_0x664f26,_0x54b767,_0x415db6,_0x25fdb4,_0x2f96c8){const _0x1ad129=_0x52da50;_0x25fdb4=String(_0x25fdb4||'')[_0x1ad129(0x5d6)]();if(VisuMZ[_0x1ad129(0x9bb)][_0x1ad129(0x630)][_0x1ad129(0x9cd)][_0x1ad129(0x28d)]){if(_0x1ad129(0x353)===_0x1ad129(0x196))return _0x440e37[_0x1ad129(0x1aa)][_0x1ad129(0x475)]();else{const _0x4ff187=VisuMZ[_0x1ad129(0x972)](_0x25fdb4);_0x2f96c8?(this[_0x1ad129(0x577)](_0x4ff187,_0x664f26,_0x54b767,this[_0x1ad129(0x5eb)]()),_0x415db6-=this[_0x1ad129(0x5eb)]()+0x2,_0x664f26+=this[_0x1ad129(0x5eb)]()+0x2):(this[_0x1ad129(0x645)](_0x4ff187,_0x664f26+0x2,_0x54b767+0x2),_0x415db6-=ImageManager[_0x1ad129(0x565)]+0x4,_0x664f26+=ImageManager[_0x1ad129(0x565)]+0x4);}}const _0x38f27d=TextManager[_0x1ad129(0x3ec)](_0x25fdb4);this[_0x1ad129(0x2d3)](),this['changeTextColor'](ColorManager[_0x1ad129(0x971)]()),_0x2f96c8?(this[_0x1ad129(0x9ca)]['fontSize']=this[_0x1ad129(0x2d0)](),this['contents']['drawText'](_0x38f27d,_0x664f26,_0x54b767,_0x415db6,this[_0x1ad129(0x5eb)](),_0x1ad129(0x5e2))):this[_0x1ad129(0x780)](_0x38f27d,_0x664f26,_0x54b767,_0x415db6),this['resetFontSettings']();},Window_StatusBase[_0x52da50(0x48a)][_0x52da50(0x2d0)]=function(){const _0x41205f=_0x52da50;return $gameSystem[_0x41205f(0x2f5)]()-0x8;},Window_StatusBase[_0x52da50(0x48a)][_0x52da50(0x5dd)]=function(_0x320d31,_0x50a48c,_0x15583b,_0x3354e6){const _0x5ddc38=_0x52da50;_0x3354e6=_0x3354e6||0xa8,this[_0x5ddc38(0x3e2)]();if(VisuMZ[_0x5ddc38(0x9bb)][_0x5ddc38(0x630)]['UI'][_0x5ddc38(0x41f)])this['drawTextEx'](_0x320d31[_0x5ddc38(0x5e8)]()[_0x5ddc38(0x215)],_0x50a48c,_0x15583b,_0x3354e6);else{const _0x3055f6=_0x320d31['currentClass']()['name'][_0x5ddc38(0x5d1)](/\\I\[(\d+)\]/gi,'');this[_0x5ddc38(0x780)](_0x3055f6,_0x50a48c,_0x15583b,_0x3354e6);}},Window_StatusBase[_0x52da50(0x48a)][_0x52da50(0x9e8)]=function(_0x114f8f,_0x4426bb,_0x46e568,_0x5a098c){const _0x225ec8=_0x52da50;_0x5a098c=_0x5a098c||0x10e,this[_0x225ec8(0x3e2)]();if(VisuMZ[_0x225ec8(0x9bb)][_0x225ec8(0x630)]['UI'][_0x225ec8(0x208)])this['drawTextEx'](_0x114f8f['nickname'](),_0x4426bb,_0x46e568,_0x5a098c);else{const _0x1c96c1=_0x114f8f[_0x225ec8(0x4aa)]()[_0x225ec8(0x5d1)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x114f8f[_0x225ec8(0x4aa)](),_0x4426bb,_0x46e568,_0x5a098c);}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x3c3)]=Window_StatusBase[_0x52da50(0x48a)][_0x52da50(0xa01)],Window_StatusBase[_0x52da50(0x48a)][_0x52da50(0xa01)]=function(_0x2a0740,_0x33500f,_0x47aa1d){const _0x4a308f=_0x52da50;if(VisuMZ[_0x4a308f(0x9bb)][_0x4a308f(0x630)][_0x4a308f(0x9cd)][_0x4a308f(0x429)]===![])return;if(this['isExpGaugeDrawn']())this['drawActorExpGauge'](_0x2a0740,_0x33500f,_0x47aa1d);VisuMZ[_0x4a308f(0x9bb)][_0x4a308f(0x3c3)][_0x4a308f(0x4cc)](this,_0x2a0740,_0x33500f,_0x47aa1d);},Window_StatusBase[_0x52da50(0x48a)][_0x52da50(0x1f8)]=function(){const _0x4eebf2=_0x52da50;return VisuMZ['CoreEngine'][_0x4eebf2(0x630)]['UI'][_0x4eebf2(0x86a)];},Window_StatusBase['prototype'][_0x52da50(0x30a)]=function(_0x31c64d,_0x20969e,_0x4ae493){const _0x3e4559=_0x52da50;if(!_0x31c64d)return;if(!_0x31c64d[_0x3e4559(0x9dc)]())return;const _0x13742c=0x80,_0x1858fc=_0x31c64d[_0x3e4559(0x6bb)]();let _0x1e2583=ColorManager[_0x3e4559(0x63f)](),_0x223ebe=ColorManager['expGaugeColor2']();_0x1858fc>=0x1&&(_0x3e4559(0x7c2)===_0x3e4559(0x7c2)?(_0x1e2583=ColorManager[_0x3e4559(0x3b7)](),_0x223ebe=ColorManager[_0x3e4559(0x2ad)]()):this['_cancelButton']['y']=0x0),this[_0x3e4559(0x8cd)](_0x20969e,_0x4ae493,_0x13742c,_0x1858fc,_0x1e2583,_0x223ebe);},Window_EquipStatus[_0x52da50(0x48a)]['drawAllParams']=function(){const _0x1138bd=_0x52da50;let _0x1320c6=0x0;for(const _0xf2bba5 of VisuMZ[_0x1138bd(0x9bb)][_0x1138bd(0x630)]['Param'][_0x1138bd(0x48f)]){const _0x49c272=this[_0x1138bd(0x679)](),_0x245851=this[_0x1138bd(0x5e5)](_0x1320c6);this[_0x1138bd(0x644)](_0x49c272,_0x245851,_0xf2bba5),_0x1320c6++;}},Window_EquipStatus[_0x52da50(0x48a)][_0x52da50(0x406)]=function(_0x1f2d1b,_0x43e0e6,_0xec8ecd){const _0x4ae496=_0x52da50,_0x436deb=this[_0x4ae496(0x258)]()-this[_0x4ae496(0x679)]()*0x2;this[_0x4ae496(0x42b)](_0x1f2d1b,_0x43e0e6,_0x436deb,_0xec8ecd,![]);},Window_EquipStatus[_0x52da50(0x48a)][_0x52da50(0x4e0)]=function(_0x446771,_0x487982,_0x1b9900){const _0x3b40ee=_0x52da50,_0x10aeb4=this['paramWidth']();this['resetTextColor'](),this[_0x3b40ee(0x780)](this[_0x3b40ee(0xa16)][_0x3b40ee(0x290)](_0x1b9900,!![]),_0x446771,_0x487982,_0x10aeb4,_0x3b40ee(0x1c8));},Window_EquipStatus['prototype'][_0x52da50(0x76b)]=function(_0x2e846b,_0x561808){const _0x559974=_0x52da50,_0x260ac1=this[_0x559974(0x1e8)]();this[_0x559974(0x267)](ColorManager['systemColor']());const _0x365906=VisuMZ[_0x559974(0x9bb)][_0x559974(0x630)]['UI'][_0x559974(0x1a2)];this[_0x559974(0x780)](_0x365906,_0x2e846b,_0x561808,_0x260ac1,_0x559974(0x5b2));},Window_EquipStatus['prototype']['drawNewParam']=function(_0x31c5b5,_0x47d79f,_0x395f89){const _0x2a6e83=_0x52da50,_0x498539=this['paramWidth'](),_0x173bcb=this['_tempActor']['paramValueByName'](_0x395f89),_0x3984b6=_0x173bcb-this[_0x2a6e83(0xa16)][_0x2a6e83(0x290)](_0x395f89);this[_0x2a6e83(0x267)](ColorManager[_0x2a6e83(0x817)](_0x3984b6)),this[_0x2a6e83(0x780)](this[_0x2a6e83(0x51b)][_0x2a6e83(0x290)](_0x395f89,!![]),_0x31c5b5,_0x47d79f,_0x498539,_0x2a6e83(0x1c8));},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x556)]=Window_EquipItem[_0x52da50(0x48a)]['isEnabled'],Window_EquipItem[_0x52da50(0x48a)]['isEnabled']=function(_0x2ed9c6){const _0x3db283=_0x52da50;return _0x2ed9c6&&this[_0x3db283(0xa16)]?this['_actor']['canEquip'](_0x2ed9c6):VisuMZ[_0x3db283(0x9bb)][_0x3db283(0x556)][_0x3db283(0x4cc)](this,_0x2ed9c6);},Window_StatusParams[_0x52da50(0x48a)][_0x52da50(0x51a)]=function(){const _0x155445=_0x52da50;return VisuMZ[_0x155445(0x9bb)]['Settings']['Param'][_0x155445(0x48f)][_0x155445(0x69a)];},Window_StatusParams[_0x52da50(0x48a)]['drawItem']=function(_0x1eff74){const _0x418f69=_0x52da50,_0x32beb8=this[_0x418f69(0x218)](_0x1eff74),_0x314fcb=VisuMZ[_0x418f69(0x9bb)][_0x418f69(0x630)][_0x418f69(0x9cd)]['DisplayedParams'][_0x1eff74],_0x1b87a6=TextManager[_0x418f69(0x3ec)](_0x314fcb),_0x34b527=this['_actor'][_0x418f69(0x290)](_0x314fcb,!![]);this[_0x418f69(0x42b)](_0x32beb8['x'],_0x32beb8['y'],0xa0,_0x314fcb,![]),this['resetTextColor'](),this['drawText'](_0x34b527,_0x32beb8['x']+0xa0,_0x32beb8['y'],0x3c,'right');};if(VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x46e)]['EnableNameInput']){VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)]['KeyboardInput']['QwertyLayout']&&(Window_NameInput[_0x52da50(0x3d1)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x52da50(0x661),'OK']);;VisuMZ[_0x52da50(0x9bb)]['Window_NameInput_initialize']=Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x2a5)],Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x2a5)]=function(_0x6992e){const _0x2b46f1=_0x52da50;this['_mode']=this['defaultInputMode'](),VisuMZ[_0x2b46f1(0x9bb)][_0x2b46f1(0x496)]['call'](this,_0x6992e);if(this[_0x2b46f1(0x4c6)]===_0x2b46f1(0x293))this['select'](0x0);else{if('lqhkd'!==_0x2b46f1(0x2d7))Input[_0x2b46f1(0x712)](),this[_0x2b46f1(0x433)]();else{_0x461712['seVolume']!==0x0?(_0x5e3297[_0x2b46f1(0x3be)]=0x0,_0x396725[_0x2b46f1(0x83e)]=0x0,_0x17c7af[_0x2b46f1(0x9a7)]=0x0,_0x1cb798['seVolume']=0x0):(_0x1ccb86[_0x2b46f1(0x3be)]=0x64,_0x20a24e[_0x2b46f1(0x83e)]=0x64,_0x1906ea[_0x2b46f1(0x9a7)]=0x64,_0x25df2c['seVolume']=0x64);_0x18e932[_0x2b46f1(0x307)]();if(this[_0x2b46f1(0x1aa)]['constructor']===_0x449af8){if(this['_scene'][_0x2b46f1(0x1f4)])this[_0x2b46f1(0x1aa)][_0x2b46f1(0x1f4)][_0x2b46f1(0x666)]();if(this['_scene'][_0x2b46f1(0x3e0)])this[_0x2b46f1(0x1aa)][_0x2b46f1(0x3e0)][_0x2b46f1(0x666)]();}}}},Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x7e2)]=function(){const _0x1c19eb=_0x52da50;if(Input[_0x1c19eb(0x801)]())return _0x1c19eb(0x293);return VisuMZ['CoreEngine'][_0x1c19eb(0x630)][_0x1c19eb(0x46e)][_0x1c19eb(0x738)]||_0x1c19eb(0x6b9);},VisuMZ['CoreEngine']['Window_NameInput_processHandling']=Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x9f4)],Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x9f4)]=function(){const _0x5882d5=_0x52da50;if(!this[_0x5882d5(0x2b8)]())return;if(!this['active'])return;if(this[_0x5882d5(0x4c6)]==='keyboard'&&Input[_0x5882d5(0x23e)]())this['switchModes'](_0x5882d5(0x293));else{if(Input[_0x5882d5(0x327)](_0x5882d5(0x468)))Input[_0x5882d5(0x712)](),this[_0x5882d5(0x295)]();else{if(Input[_0x5882d5(0x434)]('tab'))Input[_0x5882d5(0x712)](),this[_0x5882d5(0x4c6)]===_0x5882d5(0x6b9)?this[_0x5882d5(0x937)](_0x5882d5(0x293)):this['switchModes'](_0x5882d5(0x6b9));else{if(this[_0x5882d5(0x4c6)]==='keyboard')this['processKeyboardHandling']();else Input[_0x5882d5(0x327)](_0x5882d5(0x6ec))?(Input[_0x5882d5(0x712)](),this[_0x5882d5(0x937)]('keyboard')):VisuMZ[_0x5882d5(0x9bb)][_0x5882d5(0xa0d)][_0x5882d5(0x4cc)](this);}}}},VisuMZ['CoreEngine'][_0x52da50(0x4bf)]=Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x23c)],Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x23c)]=function(){const _0x5a6a97=_0x52da50;if(!this['isOpenAndActive']())return;if(this['_mode']==='keyboard'){if(TouchInput['isTriggered']()&&this[_0x5a6a97(0x99b)]())this[_0x5a6a97(0x937)](_0x5a6a97(0x293));else TouchInput['isCancelled']()&&(_0x5a6a97(0x70b)!==_0x5a6a97(0x96d)?this[_0x5a6a97(0x937)](_0x5a6a97(0x293)):_0x2597cd+=_0x3496fd+_0x5a6a97(0x840));}else VisuMZ[_0x5a6a97(0x9bb)][_0x5a6a97(0x4bf)][_0x5a6a97(0x4cc)](this);},Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x417)]=function(){const _0x7db09b=_0x52da50;if(Input[_0x7db09b(0x327)](_0x7db09b(0x825)))Input[_0x7db09b(0x712)](),this[_0x7db09b(0x226)]();else{if(Input['_inputString']!==undefined){let _0x35c927=Input[_0x7db09b(0x33e)],_0x1f18fa=_0x35c927[_0x7db09b(0x69a)];for(let _0x49f264=0x0;_0x49f264<_0x1f18fa;++_0x49f264){if(_0x7db09b(0x844)!==_0x7db09b(0x74d)){if(this[_0x7db09b(0x83d)][_0x7db09b(0x932)](_0x35c927[_0x49f264])){if(_0x7db09b(0x451)===_0x7db09b(0x451))SoundManager[_0x7db09b(0x372)]();else return this[_0x7db09b(0x534)](_0xccc9fd(_0x56e346));}else SoundManager[_0x7db09b(0x379)]();}else this[_0x7db09b(0x60e)]();}Input[_0x7db09b(0x712)]();}}},Window_NameInput['prototype'][_0x52da50(0x937)]=function(_0x31f4c8){const _0x11bfb8=_0x52da50;let _0x1da02f=this[_0x11bfb8(0x4c6)];this[_0x11bfb8(0x4c6)]=_0x31f4c8;if(_0x1da02f!==this['_mode']){this[_0x11bfb8(0x666)](),SoundManager[_0x11bfb8(0x372)]();if(this['_mode']==='default'){if('VaWeC'!==_0x11bfb8(0x678)){this[_0x11bfb8(0x2d3)](),this[_0x11bfb8(0x9ca)][_0x11bfb8(0x712)](),this[_0x11bfb8(0x9ca)][_0x11bfb8(0x830)]=_0x516b3d[_0x11bfb8(0x9bb)][_0x11bfb8(0x630)]['Gold'][_0x11bfb8(0x715)];const _0x2ff618=_0x282837['CoreEngine'][_0x11bfb8(0x630)][_0x11bfb8(0x57d)][_0x11bfb8(0x2a1)],_0x18a5a4=this[_0x11bfb8(0x218)](0x0);if(_0x2ff618>0x0){const _0x47e95a=_0x18a5a4['y']+(this[_0x11bfb8(0x75c)]()-_0x395d11[_0x11bfb8(0x6b6)])/0x2;this['drawIcon'](_0x2ff618,_0x18a5a4['x'],_0x47e95a);const _0x4cab28=_0x4c23e5['iconWidth']+0x4;_0x18a5a4['x']+=_0x4cab28,_0x18a5a4[_0x11bfb8(0x2b7)]-=_0x4cab28;}this[_0x11bfb8(0x267)](_0x302973[_0x11bfb8(0x971)]()),this[_0x11bfb8(0x780)](this[_0x11bfb8(0x5c1)](),_0x18a5a4['x'],_0x18a5a4['y'],_0x18a5a4[_0x11bfb8(0x2b7)],_0x11bfb8(0x5e2));const _0xcb253f=this[_0x11bfb8(0x2e8)](this[_0x11bfb8(0x5c1)]())+0x6;;_0x18a5a4['x']+=_0xcb253f,_0x18a5a4[_0x11bfb8(0x2b7)]-=_0xcb253f,this['resetTextColor']();const _0xde07ca=this['value'](),_0x2e13c7=this[_0x11bfb8(0x2e8)](this['_digitGrouping']?_0x25cd1b[_0x11bfb8(0x685)](this[_0x11bfb8(0x455)]()):this[_0x11bfb8(0x455)]());_0x2e13c7>_0x18a5a4[_0x11bfb8(0x2b7)]?this[_0x11bfb8(0x780)](_0x1930cc[_0x11bfb8(0x9bb)]['Settings'][_0x11bfb8(0x57d)][_0x11bfb8(0x7a2)],_0x18a5a4['x'],_0x18a5a4['y'],_0x18a5a4[_0x11bfb8(0x2b7)],_0x11bfb8(0x1c8)):this[_0x11bfb8(0x780)](this[_0x11bfb8(0x455)](),_0x18a5a4['x'],_0x18a5a4['y'],_0x18a5a4[_0x11bfb8(0x2b7)],_0x11bfb8(0x1c8)),this[_0x11bfb8(0x2d3)]();}else this[_0x11bfb8(0x669)](0x0);}else this['select'](-0x1);}},VisuMZ['CoreEngine']['Window_NameInput_cursorDown']=Window_NameInput['prototype'][_0x52da50(0x34f)],Window_NameInput['prototype'][_0x52da50(0x34f)]=function(_0x354778){const _0x365243=_0x52da50;if(this[_0x365243(0x4c6)]===_0x365243(0x6b9)&&!Input['isArrowPressed']())return;if(Input[_0x365243(0x44c)]())return;VisuMZ[_0x365243(0x9bb)][_0x365243(0x222)]['call'](this,_0x354778),this[_0x365243(0x937)]('default');},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x672)]=Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x1d8)],Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x1d8)]=function(_0x4d5d93){const _0x5dbf15=_0x52da50;if(this['_mode']===_0x5dbf15(0x6b9)&&!Input[_0x5dbf15(0x8c1)]())return;if(Input[_0x5dbf15(0x44c)]())return;VisuMZ[_0x5dbf15(0x9bb)][_0x5dbf15(0x672)][_0x5dbf15(0x4cc)](this,_0x4d5d93),this[_0x5dbf15(0x937)](_0x5dbf15(0x293));},VisuMZ[_0x52da50(0x9bb)]['Window_NameInput_cursorRight']=Window_NameInput['prototype']['cursorRight'],Window_NameInput[_0x52da50(0x48a)]['cursorRight']=function(_0xaa5a2d){const _0x15ab2d=_0x52da50;if(this[_0x15ab2d(0x4c6)]===_0x15ab2d(0x6b9)&&!Input[_0x15ab2d(0x8c1)]())return;if(Input[_0x15ab2d(0x44c)]())return;VisuMZ['CoreEngine'][_0x15ab2d(0x70c)][_0x15ab2d(0x4cc)](this,_0xaa5a2d),this[_0x15ab2d(0x937)](_0x15ab2d(0x293));},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x882)]=Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x34b)],Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x34b)]=function(_0x68ea3b){const _0x3d82e1=_0x52da50;if(this['_mode']==='keyboard'&&!Input[_0x3d82e1(0x8c1)]())return;if(Input[_0x3d82e1(0x44c)]())return;VisuMZ[_0x3d82e1(0x9bb)]['Window_NameInput_cursorLeft'][_0x3d82e1(0x4cc)](this,_0x68ea3b),this[_0x3d82e1(0x937)]('default');},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x7b2)]=Window_NameInput[_0x52da50(0x48a)]['cursorPagedown'],Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x3f8)]=function(){const _0x1f2a4b=_0x52da50;if(this[_0x1f2a4b(0x4c6)]===_0x1f2a4b(0x6b9))return;if(Input[_0x1f2a4b(0x44c)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown']['call'](this),this[_0x1f2a4b(0x937)](_0x1f2a4b(0x293));},VisuMZ[_0x52da50(0x9bb)]['Window_NameInput_cursorPageup']=Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x1ca)],Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x1ca)]=function(){const _0x599005=_0x52da50;if(this[_0x599005(0x4c6)]===_0x599005(0x6b9))return;if(Input[_0x599005(0x44c)]())return;VisuMZ[_0x599005(0x9bb)][_0x599005(0x2dc)][_0x599005(0x4cc)](this),this['switchModes'](_0x599005(0x293));},VisuMZ['CoreEngine']['Window_NameInput_refresh']=Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x666)],Window_NameInput[_0x52da50(0x48a)][_0x52da50(0x666)]=function(){const _0x5e0532=_0x52da50;if(this[_0x5e0532(0x4c6)]==='keyboard'){this[_0x5e0532(0x9ca)]['clear'](),this[_0x5e0532(0x9d8)][_0x5e0532(0x712)](),this['resetTextColor']();let _0x40712c=VisuMZ['CoreEngine']['Settings'][_0x5e0532(0x46e)][_0x5e0532(0x26c)][_0x5e0532(0x916)]('\x0a'),_0x3bff3b=_0x40712c[_0x5e0532(0x69a)],_0x33a412=(this[_0x5e0532(0x6bc)]-_0x3bff3b*this[_0x5e0532(0x75c)]())/0x2;for(let _0x40cbe7=0x0;_0x40cbe7<_0x3bff3b;++_0x40cbe7){let _0x4acccf=_0x40712c[_0x40cbe7],_0x44f3fd=this['textSizeEx'](_0x4acccf)[_0x5e0532(0x2b7)],_0xfcc607=Math[_0x5e0532(0x23f)]((this[_0x5e0532(0x9ca)]['width']-_0x44f3fd)/0x2);this[_0x5e0532(0x9e4)](_0x4acccf,_0xfcc607,_0x33a412),_0x33a412+=this['lineHeight']();}}else VisuMZ['CoreEngine']['Window_NameInput_refresh']['call'](this);};};VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x651)]=Window_ShopSell[_0x52da50(0x48a)][_0x52da50(0x9c9)],Window_ShopSell[_0x52da50(0x48a)][_0x52da50(0x9c9)]=function(_0x489bd6){const _0x145a36=_0x52da50;if(VisuMZ[_0x145a36(0x9bb)][_0x145a36(0x630)][_0x145a36(0x7cf)][_0x145a36(0x7fb)]&&DataManager['isKeyItem'](_0x489bd6)){if(_0x145a36(0x6bd)===_0x145a36(0x606)){var _0x375050=_0x11060e(_0x78f7d9['$1']);_0x1ba62b+=_0x375050;}else return![];}else return VisuMZ[_0x145a36(0x9bb)]['Window_ShopSell_isEnabled'][_0x145a36(0x4cc)](this,_0x489bd6);},Window_NumberInput[_0x52da50(0x48a)]['isUseModernControls']=function(){return![];};VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x46e)]['EnableNumberInput']&&(VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x2ca)]=Window_NumberInput[_0x52da50(0x48a)][_0x52da50(0x8fa)],Window_NumberInput['prototype']['start']=function(){const _0x5720d8=_0x52da50;VisuMZ['CoreEngine'][_0x5720d8(0x2ca)][_0x5720d8(0x4cc)](this),this[_0x5720d8(0x669)](this[_0x5720d8(0x383)]-0x1),Input[_0x5720d8(0x712)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x26f)]=Window_NumberInput[_0x52da50(0x48a)][_0x52da50(0x3b1)],Window_NumberInput[_0x52da50(0x48a)]['processDigitChange']=function(){const _0x206633=_0x52da50;if(!this[_0x206633(0x6db)]())return;if(Input[_0x206633(0x44c)]())this['processKeyboardDigitChange']();else{if(Input[_0x206633(0x327)]('backspace'))_0x206633(0x1d2)!==_0x206633(0x1d2)?this[_0x206633(0x45c)]=_0x206633(0x7a8):this['processKeyboardBackspace']();else{if(Input[_0x206633(0x761)]===0x2e)this['processKeyboardDelete']();else{if(Input[_0x206633(0x761)]===0x24)this[_0x206633(0x6dd)]();else Input['_inputSpecialKeyCode']===0x23?this[_0x206633(0x9bd)]():VisuMZ[_0x206633(0x9bb)][_0x206633(0x26f)][_0x206633(0x4cc)](this);}}}},Window_NumberInput[_0x52da50(0x48a)][_0x52da50(0x6c3)]=function(){const _0x5b2d8e=_0x52da50;if(!this[_0x5b2d8e(0x792)]())return;Input['isNumpadPressed']()?this[_0x5b2d8e(0x885)]():_0x5b2d8e(0x843)!=='NoEPy'?this['setup'](_0x42fe10[_0x5b2d8e(0x536)],0x0):Window_Selectable[_0x5b2d8e(0x48a)][_0x5b2d8e(0x6c3)][_0x5b2d8e(0x4cc)](this);},Window_NumberInput[_0x52da50(0x48a)][_0x52da50(0x1f1)]=function(){},Window_NumberInput[_0x52da50(0x48a)][_0x52da50(0x885)]=function(){const _0x317722=_0x52da50;if(String(this[_0x317722(0x279)])['length']>=this[_0x317722(0x383)])return;const _0x1e843a=Number(String(this[_0x317722(0x279)])+Input['_inputString']);if(isNaN(_0x1e843a))return;this[_0x317722(0x279)]=_0x1e843a;const _0x10ea48='9'['repeat'](this['_maxDigits']);this[_0x317722(0x279)]=this[_0x317722(0x279)]['clamp'](0x0,_0x10ea48),Input[_0x317722(0x712)](),this['refresh'](),SoundManager['playCursor'](),this['select'](this[_0x317722(0x383)]-0x1);},Window_NumberInput['prototype'][_0x52da50(0x5b4)]=function(){const _0xc3125=_0x52da50;this[_0xc3125(0x279)]=Number(String(this[_0xc3125(0x279)])[_0xc3125(0x5f8)](0x0,-0x1)),this['_number']=Math[_0xc3125(0x31b)](0x0,this[_0xc3125(0x279)]),Input[_0xc3125(0x712)](),this[_0xc3125(0x666)](),SoundManager[_0xc3125(0x230)](),this['select'](this['_maxDigits']-0x1);},Window_NumberInput[_0x52da50(0x48a)]['processKeyboardDelete']=function(){const _0x38a5d7=_0x52da50;this[_0x38a5d7(0x279)]=Number(String(this[_0x38a5d7(0x279)])['substring'](0x1)),this[_0x38a5d7(0x279)]=Math[_0x38a5d7(0x31b)](0x0,this[_0x38a5d7(0x279)]),Input[_0x38a5d7(0x712)](),this[_0x38a5d7(0x666)](),SoundManager['playCursor'](),this[_0x38a5d7(0x669)](this[_0x38a5d7(0x383)]-0x1);},Window_NumberInput['prototype'][_0x52da50(0x6dd)]=function(){const _0x257011=_0x52da50;if(this['index']()===0x0)return;Input[_0x257011(0x712)](),this['refresh'](),SoundManager['playCursor'](),this['select'](0x0);},Window_NumberInput[_0x52da50(0x48a)][_0x52da50(0x9bd)]=function(){const _0x19cb9a=_0x52da50;if(this[_0x19cb9a(0x2c6)]()===this['_maxDigits']-0x1)return;Input['clear'](),this[_0x19cb9a(0x666)](),SoundManager[_0x19cb9a(0x230)](),this['select'](this[_0x19cb9a(0x383)]-0x1);});;VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x354)]=Window_MapName['prototype'][_0x52da50(0x666)],Window_MapName[_0x52da50(0x48a)][_0x52da50(0x666)]=function(){const _0x51f2e4=_0x52da50;VisuMZ[_0x51f2e4(0x9bb)][_0x51f2e4(0x630)][_0x51f2e4(0x7cf)][_0x51f2e4(0x340)]?this[_0x51f2e4(0x497)]():VisuMZ[_0x51f2e4(0x9bb)]['Window_MapName_refresh'][_0x51f2e4(0x4cc)](this);},Window_MapName['prototype'][_0x52da50(0x497)]=function(){const _0x4ba02b=_0x52da50;this[_0x4ba02b(0x9ca)][_0x4ba02b(0x712)]();if($gameMap[_0x4ba02b(0x84f)]()){const _0x56fbee=this[_0x4ba02b(0x947)];this['drawBackground'](0x0,0x0,_0x56fbee,this[_0x4ba02b(0x75c)]());const _0x56e043=this['textSizeEx']($gameMap['displayName']())[_0x4ba02b(0x2b7)];this[_0x4ba02b(0x9e4)]($gameMap[_0x4ba02b(0x84f)](),Math[_0x4ba02b(0x23f)]((_0x56fbee-_0x56e043)/0x2),0x0);}},Window_TitleCommand[_0x52da50(0x994)]=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x684)],Window_TitleCommand[_0x52da50(0x48a)][_0x52da50(0x6cf)]=function(){const _0x5c92b8=_0x52da50;this[_0x5c92b8(0x1da)]();},Window_TitleCommand[_0x52da50(0x48a)][_0x52da50(0x1da)]=function(){const _0x55f02f=_0x52da50;for(const _0x23e520 of Window_TitleCommand[_0x55f02f(0x994)]){if(_0x23e520[_0x55f02f(0x875)]['call'](this)){if(_0x55f02f(0x7a3)!=='ZnAbu'){const _0x26c622=_0x23e520[_0x55f02f(0x55e)];let _0x44c720=_0x23e520[_0x55f02f(0x4bc)];if(['','Untitled'][_0x55f02f(0x3fc)](_0x44c720))_0x44c720=_0x23e520[_0x55f02f(0x7af)][_0x55f02f(0x4cc)](this);const _0x179241=_0x23e520[_0x55f02f(0x84a)][_0x55f02f(0x4cc)](this),_0x38ed77=_0x23e520[_0x55f02f(0x1cb)][_0x55f02f(0x4cc)](this);this[_0x55f02f(0x6c4)](_0x44c720,_0x26c622,_0x179241,_0x38ed77),this[_0x55f02f(0x6df)](_0x26c622,_0x23e520[_0x55f02f(0x904)][_0x55f02f(0x4e6)](this,_0x38ed77));}else return!![];}}},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x35e)]=Window_TitleCommand[_0x52da50(0x48a)][_0x52da50(0x390)],Window_TitleCommand[_0x52da50(0x48a)]['selectLast']=function(){const _0x3cc35e=_0x52da50;VisuMZ['CoreEngine'][_0x3cc35e(0x35e)]['call'](this);if(!Window_TitleCommand[_0x3cc35e(0x52a)])return;const _0x9d0fc7=this[_0x3cc35e(0x276)](Window_TitleCommand[_0x3cc35e(0x52a)]),_0x5fe8d2=Math['floor'](this['maxVisibleItems']()/0x2)-0x1;this[_0x3cc35e(0x6ef)](_0x9d0fc7);if(this[_0x3cc35e(0x8eb)]>0x1){if('vayUE'===_0x3cc35e(0x2e1)){_0xfc2920&&_0x572ef2&&_0x4c0a50['note']&&this[_0x3cc35e(0x518)](_0x3f0265[_0x3cc35e(0x61e)]);const _0x2c21c5=_0x5bfb16[_0x3b2735];if(_0x2c21c5){let _0x138bee=_0x114256[_0x3cc35e(0x60a)](_0x2c21c5['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x138bee);}}else this[_0x3cc35e(0x8eb)]=0x1,this[_0x3cc35e(0x3bf)]();}this[_0x3cc35e(0x961)](_0x9d0fc7-_0x5fe8d2);},Window_GameEnd['_commandList']=VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x630)][_0x52da50(0x75a)]['GameEnd'][_0x52da50(0x537)],Window_GameEnd['prototype'][_0x52da50(0x6cf)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x52da50(0x48a)][_0x52da50(0x1da)]=function(){const _0x2ae7f2=_0x52da50;for(const _0x4b19fb of Window_GameEnd[_0x2ae7f2(0x994)]){if(_0x4b19fb[_0x2ae7f2(0x875)][_0x2ae7f2(0x4cc)](this)){if(_0x2ae7f2(0x2b2)!==_0x2ae7f2(0x1fb)){const _0x32bdba=_0x4b19fb[_0x2ae7f2(0x55e)];let _0x2cd005=_0x4b19fb[_0x2ae7f2(0x4bc)];if(['',_0x2ae7f2(0x8b0)][_0x2ae7f2(0x3fc)](_0x2cd005))_0x2cd005=_0x4b19fb[_0x2ae7f2(0x7af)]['call'](this);const _0x4afa5c=_0x4b19fb[_0x2ae7f2(0x84a)][_0x2ae7f2(0x4cc)](this),_0xdda5f1=_0x4b19fb[_0x2ae7f2(0x1cb)][_0x2ae7f2(0x4cc)](this);this['addCommand'](_0x2cd005,_0x32bdba,_0x4afa5c,_0xdda5f1),this[_0x2ae7f2(0x6df)](_0x32bdba,_0x4b19fb[_0x2ae7f2(0x904)][_0x2ae7f2(0x4e6)](this,_0xdda5f1));}else _0x169f30=_0x2ae7f2(0x42e)[_0x2ae7f2(0x8de)](_0x4547dc,_0x4db8b4);}}};function Window_ButtonAssist(){const _0x5b35ff=_0x52da50;this[_0x5b35ff(0x2a5)](...arguments);}Window_ButtonAssist[_0x52da50(0x48a)]=Object[_0x52da50(0x737)](Window_Base[_0x52da50(0x48a)]),Window_ButtonAssist[_0x52da50(0x48a)]['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x52da50(0x48a)][_0x52da50(0x2a5)]=function(_0x1ea403){const _0x1b58a1=_0x52da50;this['_data']={},Window_Base[_0x1b58a1(0x48a)][_0x1b58a1(0x2a5)][_0x1b58a1(0x4cc)](this,_0x1ea403),this['setBackgroundType'](VisuMZ[_0x1b58a1(0x9bb)][_0x1b58a1(0x630)]['ButtonAssist']['BgType']||0x0),this[_0x1b58a1(0x666)]();},Window_ButtonAssist['prototype'][_0x52da50(0x8c8)]=function(){const _0x3ff1a1=_0x52da50;this[_0x3ff1a1(0x9ca)][_0x3ff1a1(0x830)]<=0x60&&(this[_0x3ff1a1(0x9ca)]['fontSize']+=0x6);},Window_ButtonAssist[_0x52da50(0x48a)][_0x52da50(0x8c7)]=function(){const _0xd59010=_0x52da50;this[_0xd59010(0x9ca)]['fontSize']>=0x18&&(this[_0xd59010(0x9ca)][_0xd59010(0x830)]-=0x6);},Window_ButtonAssist['prototype'][_0x52da50(0x6c5)]=function(){const _0x2c8897=_0x52da50;Window_Base[_0x2c8897(0x48a)][_0x2c8897(0x6c5)][_0x2c8897(0x4cc)](this),this[_0x2c8897(0x2e7)]();},Window_ButtonAssist[_0x52da50(0x48a)]['updatePadding']=function(){const _0x2cd147=_0x52da50;this[_0x2cd147(0x8b2)]=SceneManager['_scene']['getButtonAssistLocation']()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x52da50(0x48a)][_0x52da50(0x2e7)]=function(){const _0x42a8de=_0x52da50,_0x91551e=SceneManager['_scene'];for(let _0x10e49b=0x1;_0x10e49b<=0x5;_0x10e49b++){if(this[_0x42a8de(0x3ba)]['key%1'[_0x42a8de(0x8de)](_0x10e49b)]!==_0x91551e[_0x42a8de(0x594)[_0x42a8de(0x8de)](_0x10e49b)]())return this[_0x42a8de(0x666)]();if(this['_data'][_0x42a8de(0x881)[_0x42a8de(0x8de)](_0x10e49b)]!==_0x91551e[_0x42a8de(0x785)['format'](_0x10e49b)]()){if(_0x42a8de(0x775)!==_0x42a8de(0x775))this[_0x42a8de(0x931)](_0x553ebf);else return this['refresh']();}}},Window_ButtonAssist['prototype'][_0x52da50(0x666)]=function(){const _0x28065e=_0x52da50;this[_0x28065e(0x9ca)]['clear']();for(let _0x4cfe60=0x1;_0x4cfe60<=0x5;_0x4cfe60++){this['drawSegment'](_0x4cfe60);}},Window_ButtonAssist[_0x52da50(0x48a)][_0x52da50(0x47b)]=function(_0x170dc5){const _0x4be9cd=_0x52da50,_0x56b196=this[_0x4be9cd(0x947)]/0x5,_0x5b2e2c=SceneManager[_0x4be9cd(0x1aa)],_0x4acd94=_0x5b2e2c[_0x4be9cd(0x594)[_0x4be9cd(0x8de)](_0x170dc5)](),_0x20a0da=_0x5b2e2c[_0x4be9cd(0x785)[_0x4be9cd(0x8de)](_0x170dc5)]();this[_0x4be9cd(0x3ba)]['key%1'['format'](_0x170dc5)]=_0x4acd94,this[_0x4be9cd(0x3ba)]['text%1'[_0x4be9cd(0x8de)](_0x170dc5)]=_0x20a0da;if(_0x4acd94==='')return;if(_0x20a0da==='')return;const _0x46ba23=_0x5b2e2c[_0x4be9cd(0x4f9)[_0x4be9cd(0x8de)](_0x170dc5)](),_0x2798fb=this[_0x4be9cd(0x679)](),_0x460511=_0x56b196*(_0x170dc5-0x1)+_0x2798fb+_0x46ba23,_0x3f2d7c=VisuMZ[_0x4be9cd(0x9bb)][_0x4be9cd(0x630)]['ButtonAssist']['TextFmt'];this['drawTextEx'](_0x3f2d7c[_0x4be9cd(0x8de)](_0x4acd94,_0x20a0da),_0x460511,0x0,_0x56b196-_0x2798fb*0x2);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x923)]=Game_Interpreter[_0x52da50(0x48a)][_0x52da50(0x4a8)],Game_Interpreter[_0x52da50(0x48a)][_0x52da50(0x4a8)]=function(){const _0x3e88fb=_0x52da50;if($gameTemp[_0x3e88fb(0x2a9)]!==undefined)return VisuMZ[_0x3e88fb(0x9bb)]['UpdatePictureCoordinates']();return VisuMZ['CoreEngine'][_0x3e88fb(0x923)]['call'](this);},VisuMZ[_0x52da50(0x9bb)]['UpdatePictureCoordinates']=function(){const _0x2aa6cb=_0x52da50,_0x35c5fd=$gameTemp[_0x2aa6cb(0x2a9)]||0x0;(_0x35c5fd<0x0||_0x35c5fd>0x64||TouchInput[_0x2aa6cb(0x94b)]()||Input[_0x2aa6cb(0x434)]('cancel'))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x2aa6cb(0x712)](),TouchInput[_0x2aa6cb(0x712)]());const _0xe59f68=$gameScreen[_0x2aa6cb(0x2a8)](_0x35c5fd);return _0xe59f68&&(_0xe59f68['_x']=TouchInput['_x'],_0xe59f68['_y']=TouchInput['_y']),VisuMZ[_0x2aa6cb(0x9bb)][_0x2aa6cb(0x477)](),$gameTemp[_0x2aa6cb(0x2a9)]!==undefined;},VisuMZ[_0x52da50(0x9bb)]['updatePictureCoordinates']=function(){const _0x435267=_0x52da50,_0x5de0f8=SceneManager[_0x435267(0x1aa)];if(!_0x5de0f8)return;!_0x5de0f8[_0x435267(0x7c5)]&&(SoundManager[_0x435267(0x302)](),_0x5de0f8[_0x435267(0x7c5)]=new Window_PictureCoordinates(),_0x5de0f8[_0x435267(0x1d0)](_0x5de0f8[_0x435267(0x7c5)])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x435267(0x393)](),_0x5de0f8[_0x435267(0x8a5)](_0x5de0f8['_pictureCoordinatesWindow']),_0x5de0f8['_pictureCoordinatesWindow']=undefined);};function _0x3a86(_0x5d30bc,_0x48f3cc){const _0x377c6a=_0x377c();return _0x3a86=function(_0x3a8613,_0x336a50){_0x3a8613=_0x3a8613-0x181;let _0x30d709=_0x377c6a[_0x3a8613];return _0x30d709;},_0x3a86(_0x5d30bc,_0x48f3cc);}function Window_PictureCoordinates(){const _0x24149b=_0x52da50;this[_0x24149b(0x2a5)](...arguments);}function _0x377c(){const _0x4596b3=['36AHcbcg','repositionEnemiesByResolution','itemHeight','Scene_Base_create','attackSkillId','_anchor','BTestAddedQuantity','FunctionName','RequireFocus','ColorMPCost','scaleY','CommandBgType','_downArrowSprite','LBlek','XParameterFormula','kwKwW','STB','hpGaugeColor2','MAXMP','sEKes','%1:\x20Exit\x20','_commandList','hbSrD','_animation','Sprite_AnimationMV_updatePosition','createPointAnimationQueue','params','ExtractStrFromList','isTouchedInsideFrame','Game_Map_scrollRight','Weapon-%1-%2','Game_Map_setup','Show\x20Scrolling\x20Text\x20Script\x20Error','paramPlusJS','AllMaps','faceWidth','deathColor','ImprovedAccuracySystem','ztNEZ','paramRate2','meVolume','_internalTextures','xparamFlatJS','fillRect','ColorTPGauge2','targetY','_stored_tpGaugeColor1','getBackgroundOpacity','16jytCbs','responseText','Input_updateGamepadState','children','missed','sgmUJ','toLocaleString','zMCLq','_sideButtonLayout','targetObjects','INOUTBACK','Keyboard','CoreEngine','Game_Interpreter_command122','processKeyboardEnd','StatusRect','hide','Smooth','playMiss','SystemSetSideView','Spriteset_Base_updatePosition','DOUBLE_QUOTE','BTmNm','Conditional\x20Branch\x20Script\x20Error','buttonAssistCancel','_fauxAnimationSprites','isEnabled','contents','processTouchModernControls','onMoveEnd','Param','setEasingType','isHandled','adjustSprite','XyXNB','sparamFlat1','GameEnd','YEMIS','_targets','AYmKl','QbAfp','contentsBack','isForFriend','CUqyS','overrideMimeType','isActor','VOLUME_MUTE','volume','STR','1.4.4','skills','GhQaM','_backSprite2','drawTextEx','setClickHandler','buttonAreaHeight','isInstanceOfSceneMap','drawActorNickname','globalAlpha','mapId','setValue','createPageButtons','performEscape','textSizeEx','ZZYzV','nw.gui','Sprite_Picture_updateOrigin','vRmFX','Vimob','processHandling','titleCommandWindow','ILEaU','zybwb','kcAEe','bGzHe','mpCostColor','centerSprite','xScrollLinkedOffset','DETACH_PICTURE_CONTAINER','textBaseline','VariableEvalReference','OUTQUINT','drawActorLevel','_storedMapText','RgIyD','BIlAO','isEventTest','Scene_Battle_update','ColorHPGauge2','scaleSprite','opacity','reserveNewGameCommonEvent','hasEncryptedImages','textHeight','Window_NameInput_processHandling','traitObjects','WIN_OEM_PA2','App','1851039vUlOus','Sprite_Picture_loadBitmap','textAlign','xiqUE','Rate2','_actor','Bitmap_resize','coreEngineRepositionEnemies','ActorMPColor','createBackground','sparamPlus2','retrieveFauxAnimation','nTqWb','TGR','WIN_OEM_FJ_TOUROKU','SkillTypeBgType','PybRb','wtypeId','_centerElementCoreEngine','YHhJy','drawCircle','abs','inBattle','DZnoc','DbiyN','_dimmerSprite','jVAsr','pageup','PGUP','Game_Event_isCollidedWithEvents','baseId','FYBON','LINEAR','ShortcutScripts','isNormalPriority','glsTD','_originalViewport','ButtonHeight','PictureID','JUoZd','addLoadListener','_createInternalTextures','isSmartEventCollisionOn','BIzXY','batch','GEAPw','_loadingState','yFaVL','Sajou','IconSParam4','nextLevelExp','_displayY','boxWidth','_targetScaleY','top','registerCommand','Game_Interpreter_command105','LECTP','VisuMZ_2_BattleSystemCTB','ParamArrow','tpCostColor','maxBattleMembers','_pictureContainer','bSmGA','emtAX','EndingID','PreserveNumbers','_scene','ETB','updatePosition','setGuard','setViewport','ATK','fromCharCode','centerX','PixelateImageRendering','_timerSprite','getGamepads','ARRAYEVAL','AMPERSAND','battlebacks1','StatusBgType','_offsetX','F6key','sparamPlusJS','5026xRIfmY','Game_Party_consumeItem','CodeJS','ColorTPGauge1','targetPosition','consumeItem','CommandRect','commandWindowRect','BACKSPACE','ExportStrFromAllTroops','isLoopVertical','Window_Base_drawFace','right','SwitchRandomizeRange','cursorPageup','ExtJS','FTB','FINAL','animationBaseDelay','enableDigitGroupingEx','addChild','parallaxes','mIWWS','catchException','Errkh','SubfolderParse','updateOrigin','map','cursorUp','DEZrU','makeCoreEngineCommandList','log','BJlMP','OkText','_updateFilterArea','dimColor1','skillTypeWindowRect','_backgroundFilter','terms','SuhrW','openness','drawCharacter','clearRect','INQUINT','rightArrowWidth','allowShiftScrolling','createBuffer','qmIgm','SellRect','result','setMainFontSize','IconXParam0','VisuMZ_4_UniqueTileEffects','processCursorHomeEndTrigger','PRINT','show','_optionsWindow','eva','_mainSprite','NUMPAD0','isExpGaugeDrawn','boxHeight','removePointAnimation','xDlXu','_shouldPreventDefault','evaded','maxCols','GgYfN','pictureButtons','pop','getBattleSystem','ColorManager_loadWindowskin','updateLastTarget','autoRemovalTiming','OPEN_PAREN','Jsrmi','TextCodeNicknames','SceneManager_isGameActive','pitch','DebugConsoleLastControllerID','exp','RepositionActors','HASH','_numberWindow','windowRect','CNT','processMoveCommand','actorWindowRect','PTB','name','retrievePointAnimation','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','itemLineRect','KezrH','stencilOp','paramBaseAboveLevel99','JjruO','createTextState','SaveMenu','Armor-%1-%2','updateDocumentTitle','_backSprite','Window_NameInput_cursorDown','INSINE','RaQpZ','measureTextWidthNoRounding','onNameOk','ZlpOn','EKUEA','_stored_deathColor','%2%1%3','LevelUpFullMp','ProfileBgType','_closing','setupBattleTestItems','pow','playCursor','item','DEF','colSpacing','ParseTilesetNotetags','SideButtons','NUMPAD3','SHDzN','EHdNn','iZkXc','origin','stypeId','processTouch','isPhysical','isGamepadTriggered','floor','_destroyInternalTextures','hWPlZ','10mLniiD','gold','PLAY','HOME','Unnamed','ListBgType','playTestF7','isSceneBattle','initDigitGrouping','HYPHEN_MINUS','CTRL','qnkjz','pfjil','pXLWU','removeAllFauxAnimations','ImLvk','adjustPictureAntiZoom','hpColor','_skillTypeWindow','Window_Base_drawText','ItemRect','JKqar','paramX','vhgCP','CONVERT','tileWidth','dashToggle','PRESERVCONVERSION(%1)','Game_Picture_calcEasing','NUMPAD4','_categoryWindow','_registerKeyInput','Troop%1','Game_Actor_paramBase','EXCLAMATION','isNextScene','_stored_expGaugeColor2','changeTextColor','NMMKy','ApplyEasing','DummyRect','updateDashToggle','NameInputMessage','tilesets','Control\x20Variables\x20Script\x20Error','Window_NumberInput_processDigitChange','uTxii','qZrBN','anchorCoreEasing','normal','ButtonFadeSpeed','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','findSymbol','YXNar','MultiKeyFmt','_number','cjDpS','CLEAR','BasicParameterFormula','ALWAYS','windowOpacity','DashToggleR','SParamVocab7','push','OGSLh','clearOnceParallelInterpreters','ktzRv','IfwhC','F24','reduce','IconSParam9','iWpkI','QwWfi','Window_StatusBase_drawActorSimpleStatus','VisuMZ_2_BattleSystemSTB','DrawIcons','isItem','itemWindowRect','paramValueByName','F22','Bitmap_strokeRect','default','paramName','processBack','buttonAssistText2','Scene_Status_create','process_VisuMZ_CoreEngine_jsQuickFunctions','mmp','_buttonAssistWindow','INOUTQUART','_profileWindow','SLEEP','initCoreEngine','storeMapData','img/%1/','GoldIcon','setCoreEngineScreenShakeStyle','initButtonHidden','code','initialize','PositionY','AnimationMirrorOffset','picture','_pictureCoordinatesMode','_screenX','paramRateJS','swOUB','maxLvGaugeColor2','pRHUu','getControllerInputButtonMatch','_shakeDuration','_stored_maxLvGaugeColor2','UuYbZ','ztWif','IconXParam4','NONCONVERT','PHA','width','isOpen','CqJrZ','constructor','match','setMoveEasingType','11308eVAjCc','Power','rgNAh','NEAREST','charAt','openURL','loadPicture','OUTELASTIC','lastAnimationSprite','index','SHIFT','mute','Skill-%1-%2','Window_NumberInput_start','QPaqz','buttonAssistKey3','PERIOD','QeFvy','gtRMo','smallParamFontSize','Type','Scene_MenuBase_helpAreaTop','resetFontSettings','FontSize','numRepeats','uiAreaWidth','LExDb','createChildSprite','MAX_SAFE_INTEGER','destroyed','nRpld','Window_NameInput_cursorPageup','_targetOffsetX','QUOTE','createCancelButton','LWmPs','NOqJr','ColorTPCost','traitsPi','integer','mainAreaBottom','battlerHue','updateKeyText','textWidth','_pictureName','mainAreaTop','uiAreaHeight','Game_Action_itemHit','Plus','updatePositionCoreEngineShakeOriginal','resize','_changingClass','_bitmap','_windowLayer','_windowskin','processEscape','mainFontSize','ActorRect','description','VnHnn','filter','clearStencil','_backSprite1','animations','MyhQR','_animationSprites','addWindow','_target','_startLoading','playLoad','createCustomParameter','ItemHeight','TRG','Rate1','save','tpColor','hzlBs','drawActorExpGauge','ButtonAssist','hYzKi','%1〘Choice\x20%2〙\x20%3%1','ConvertParams','join','ColorDeath','zjgLd','JiXou','VariableJsBlock','showDevTools','makeDeepCopy','bgs','subject','IconXParam2','ColSpacing','FHnFv','max','getCoreEngineScreenShakeStyle','_mapNameWindow','operation','_battlerName','xparamFlat2','SParamVocab2','actor','YDEdE','xNoad','_forcedTroopView','easingType','isSpecialCode','version','_pageupButton','AudioChangeBgsPitch','_menuButton','266cRkrGs','ExtractStrFromTroop','Scene_Name_onInputOk','sparamPlus1','Mirror','XParamVocab7','targetSpritePosition','HelpBgType','DisplayLockX','NUMPAD2','ckyjF','SGGfg','Color','isOptionValid','sparamPlus','exec','_screenY','_onKeyDown','_inputString','CategoryRect','MapNameTextCode','measureText','isBottomButtonMode','createAnimationSprite','setBackgroundOpacity','StartID','SELECT','HANJA','vertJS','AnimationID','fFJiN','cursorLeft','anchor','YhFmz','_realScale','cursorDown','Game_Character_processMoveCommand','process_VisuMZ_CoreEngine_Functions','ptokD','rvnYu','Window_MapName_refresh','mainAreaHeight','scaleMode','Flat2','ALhTt','FHtwK','GET','makeAutoBattleActions','ctGaugeColor1','AllTroops','Window_TitleCommand_selectLast','Game_Picture_initBasic','CommonEventID','isEventRunning','sv_enemies','drawBackgroundRect','setHome','processTimingData','ESC','isEnemy','return\x200','levelUp','Bitmap_measureTextWidth','Game_Interpreter_command355','Window_Base_initialize','DOWN','CreateBattleSystemID','cancel','Basic','_pressed','playOk','Scene_Map_updateMain','mainAreaTopSideButtonLayout','BgFilename1','LUK','updateScene','itemRect','playBuzzer','TILDE','IconSet','setMute','_colorTone','makeInputButtonString','optionsWindowRect','XParamVocab5','_isWindow','MYrxv','_maxDigits','_texture','Window_Base_drawCharacter','Speed','_coreEasing','EXR','moveRelativeToResolutionChange','pKGap','ParseItemNotetags','operand','IconSParam0','createFauxAnimationQueue','loadSystem','selectLast','ONE_MINUS_SRC_ALPHA','_targetX','playCancel','height','SmartEventCollisionPriority','RxYbj','numberWindowRect','sparamRate','_showDevTools','ATTN','NewGameBoot','paramPlus','dimColor2','buttonAssistWindowButtonRect','_slotWindow','NGmpM','gyyNw','Tilemap_addShadow','applyEasing','isTpb','RowSpacing','FDR','Spriteset_Battle_createEnemies','LevelUpFullHp','tpGaugeColor1','KeyUnlisted','TRAIT_PARAM','ExportStrFromAllMaps','updateOpacity','XParamVocab2','object','deactivate','processDigitChange','command357','JYjCI','drawGoldItemStyle','ParseActorNotetags','ARRAYSTRUCT','maxLvGaugeColor1','initMembersCoreEngine','_blank','_data','tileHeight','requiredWtypeId1','GRD','bgmVolume','updateSmoothScroll','ShopMenu','WEbbW','IyAtA','Window_StatusBase_drawActorLevel','SceneManager_exit','RevertPreserveNumbers','setViewportCoreEngineFix','Game_Interpreter_PluginCommand','contains','checkSmartEventCollision','process_VisuMZ_CoreEngine_Settings','process_VisuMZ_CoreEngine_Notetags','XParamVocab3','down2','_moveEasingType','WeGkk','Spriteset_Base_isAnimationPlaying','LATIN1','ExtractStrFromMap','processPointAnimationRequests','Window_Selectable_drawBackgroundRect','RnmjO','updateAnchor','Scene_Equip_create','xparamRate','flush','iVuuB','makeTargetSprites','ActorHPColor','sqrt','TAB','isAlive','_listWindow','BgFilename2','resetTextColor','NUMPAD9','UBVNV','ShowButtons','Scene_Shop_create','Enable','BattleManager_processEscape','markCoreEngineModified','WIN_OEM_PA3','setCoreEngineUpdateWindowBg','param','XParamVocab8','displayX','SwitchActorText','PDR','NUM','targets','isRepeated','rxEYZ','removeAllPointAnimations','_opacity','XDKfy','cursorPagedown','lphYd','WCsUz','vVTON','includes','Sprite_Battler_startMove','font-smooth','createFauxAnimation','maxTurns','fadeSpeed','DigitGroupingStandardText','xWdFg','FontSmoothing','openingSpeed','drawParamName','makeDocumentTitle','isClosed','WIN_OEM_FJ_LOYA','xlAUg','jTxqQ','OptionsBgType','Scene_Boot_updateDocumentTitle','VisuMZ_1_BattleCore','Manual','ConvertNumberToString','OpenSpeed','_troopId','EnableMasking','skillTypes','VdMkx','seVolume','processKeyboardHandling','_pagedownButton','setLastPluginCommandInterpreter','isAnimationForEach','FPTTa','NjggK','loadWindowskin','blendFunc','TextCodeClassNames','Graphics_printError','FadeSpeed','ttXwA','playCursorSound','Game_Picture_x','visible','bgm','exportAllTroopStrings','oYuxO','ShowActorLevel','_currentBgm','drawParamText','bitmap','_colorCache','State-%1-%2','isFauxAnimationPlaying','CustomParamNames','sceneTerminationClearEffects','createDimmerSprite','deselect','isTriggered','XParamVocab9','buttonAssistText5','_index','setWindowPadding','DimColor1','BTestArmors','altKey','qjZSj','ZOOM','_targetScaleX','_upArrowSprite','send','getColorDataFromPluginParameters','round','SuaKv','moveMenuButtonSideButtonLayout','setAnchor','DataManager_setupNewGame','usableSkills','exit','isAnimationPlaying','KANA','scrollDown','isNumpadPressed','fillText','_scaleX','ColorPowerUp','indexOf','CWSmu','Actor-%1-%2','_targetAnchor','initialBattleSystem','value','OKNjW','Input_onKeyDown','_helpWindow','SLASH','Scene_Battle_createSpriteset','Bitmap_drawText','_forcedBattleSys','Scene_Map_update','HhlRd','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','F11','FmMGC','FUJeW','itemBackColor1','DIVIDE','ItemMenu','gJyAJ','DWcwx','backspace','translucentOpacity','drawTextTopAligned','Input_shouldPreventDefault','isMVAnimation','PictureEraseRange','KeyboardInput','up2','isMaskingEnabled','DWtax','enableDigitGrouping','_lastX','BattleManager_update','isWindowMaskingEnabled','IeAWC','updatePictureCoordinates','getLastPluginCommandInterpreter','IconParam5','_inputWindow','drawSegment','createPointAnimationSprite','BACK_SLASH','dkZjq','NameMenu','_stored_systemColor','makeActionList','RJbOv','canAttack','INBACK','_fauxAnimationQueue','bitmapHeight','_customModified','Pixelated','listWindowRect','prototype','setupFont','updatePositionCoreEngineShakeHorz','TimeProgress','uycuJ','DisplayedParams','useFontWidthFix','_stored_powerUpColor','waiting','shift','VisuMZ_2_BattleSystemFTB','_stored_tpGaugeColor2','Window_NameInput_initialize','refreshWithTextCodeSupport','SnapshotOpacity','jsonToZip','F14','kiZnV','vertical','ILNRp','nqVHA','Game_Actor_changeClass','_image','reserveCommonEvent','xparam','wtlwE','202035Pbwwsu','repeat','Plus2','CustomParam','updateWaitMode','IAaIC','nickname','DigitGroupingExText','_tilemap','TsFna','mpGaugeColor1','Scene_Base_createWindowLayer','removeAnimation','_baseSprite','ZDNXZ','_spriteset','KEEP','_statusEquipWindow','Spriteset_Base_initialize','createTitleButtons','updatePictureAntiZoom','hmhFm','IUoPC','\x20Origin:\x20%1','TextStr','HELP','MsasH','Window_NameInput_processTouch','oyDgG','ItemBackColor1','YRGnU','updateMotion','playEscape','drawGameSubtitle','_mode','_actorWindow','PictureEasingType','HARBy','LESS_THAN','Bitmap_blt','call','erasePicture','Game_Map_scrollUp','WIN_ICO_HELP','Sprite_Gauge_currentValue','xparamFlat1','_scaleY','valueOutlineColor','buttonAssistText1','AntiZoomPictures','setLastGamepadUsed','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','ctGaugeColor2','OS_KEY','fTLSB','_drawTextBody','Scene_Map_initialize','WIN_ICO_CLEAR','isPlaying','isItemStyle','drawCurrentParam','Fjheu','slotWindowRect','needsUpdate','buttonAssistOk','_buyWindow','bind','_displayX','Plus1','WMVpi','option','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','updatePositionCoreEngine','WIN_OEM_CUSEL','StatusEquipBgType','wnfQr','VisuMZ_2_BattleSystemBTB','enemy','sparamRate1','_destroyCanvas','button','gainSilentTp','ExportCurTroopText','offsetY','Opacity','buttonAssistOffset%1','_offsetY','cursorRight','IDs','_onceParallelInterpreters','yScrollLinkedOffset','_drawTextShadow','menu','shake','enable','NumberRect','Window_Base_drawIcon','keyRepeatWait','sparamFlatBonus','updateMove','kfAXW','AudioChangeBgmPitch','applyForcedGameTroopSettingsCoreEngine','SxFyR','sin','_hovered','WIN_OEM_FJ_ROYA','INQUAD','stretch','emkjt','MAX_GL_TEXTURES','Graphics','advanced','INOUTBOUNCE','keypress','StatusParamsBgType','parseForcedGameTroopSettingsCoreEngine','Epjhr','maxItems','_tempActor','_onError','image-rendering','JoyIl','ColorHPGauge1','fbCTj','DjdJb','clamp','toLowerCase','jpmTk','MAT','numberShowButton','playOnceParallelInterpreter','MJAfQ','pendingColor','_lastCommandSymbol','Scene_Skill_create','IconSParam2','ScaleX','HLPSc','EVAL','createContents','WpGuO','bitmapWidth','MenuBg','textColor','WIN_ICO_00','list','CommandList','YhUKe','nPfsP','EncounterRateMinimum','OpenURL','atbActive','command122','font','MRG','JZCYC','NewGameCommonEvent','addChildToBack','ItemBgType','horzJS','measureTextWidth','ToLKC','IconXParam7','DamageColor','NoTileShadows','KeySHIFT','isRightInputMode','_addShadow','pictures','Game_Picture_scaleY','WIN_OEM_ENLW','STENCIL_BUFFER_BIT','Sprite_Animation_setViewport','updateOnceParallelInterpreters','bZqqH','MAXHP','battlebacks2','Window_EquipItem_isEnabled','ctrlKey','Game_Action_itemEva','Sprite_destroy','DECIMAL','PictureFilename','1223400IbWoZb','gDUaW','Symbol','VisuMZ_1_OptionsCore','CustomParamType','Sprite_Button_updateOpacity','updateShadow','nCOis','WIN_OEM_BACKTAB','iconWidth','SceneManager_onKeyDown','GUsvN','_hp','HbVjY','BottomHelp','data/','cSdmx','LEFT','setBackgroundType','nPHJl','imageSmoothingEnabled','processCursorMoveModernControls','Game_Troop_setup','updateBackOpacity','xparamPlus1','startAnimation','isFullDocumentTitle','drawIconBySize','FontShadows','zhXwm','drawBackground','getControllerInputButtonString','_playTestFastMode','Gold','Padding','checkSubstitute','Mute','NZOxI','_cancelButton','blt','helpAreaTop','ColorExpGauge1','createKeyJS','kDOOX','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','ModernControls','BACK_QUOTE','touchUI','levelUpRecovery','_updateGamepadState','dummyWindowRect','writeText','DummyBgType','loadGameImagesCoreEngine','buttonAssistOffset1','gaugeRate','buttonAssistKey%1','keyCode','StatusEquipRect','uCOiU','MCR','MIN_SAFE_INTEGER','GrPWE','process_VisuMZ_CoreEngine_ControllerButtons','XParamVocab4','PpiJg','Scene_Battle_createSpritesetFix','requestPointAnimation','AccuracyBoost','win32','VisuMZ_2_BattleSystemETB','getCombinedScrollingText','status','bqeLM','VIEWPORT','([\x5c+\x5c-]\x5cd+)>','_backgroundSprite','CRI','activate','setSideButtonLayout','TTaxo','INOUTCUBIC','ExportCurMapText','VisuMZ_2_BattleSystemOTB','qSBlw','xparamPlusJS','center','CTB','processKeyboardBackspace','KtPZM','SwitchRandomizeOne','ASTERISK','isGamepadButtonPressed','isCollidedWithEvents','ControllerMatches','initBasic','Window','text','endAnimation','ControllerButtons','GoldRect','currencyUnit','HEJPz','addOnceParallelInterpreter','onXhrError','context','Abbreviation','DWXjg','drawGameTitle','setupCustomRateCoreEngine','concat','_balloonQueue','Total','INCIRC','CJHAc','mnSpn','ALTGR','replace','Game_BattlerBase_refresh','categoryWindowRect','updateMain','TPB\x20WAIT','toUpperCase','Bitmap_clearRect','useDigitGrouping','_goldWindow','isSceneMap','isGamepadAxisMoved','mainAreaHeightSideButtonLayout','drawActorClass','DDBZo','defineProperty','playBgm','WIN_OEM_WSCTRL','left','Scene_Map_updateScene','titles2','paramY','_startDecrypting','NUMPAD5','currentClass','DyZkk','EISU','gaugeLineHeight','MxwcQ','hit','buttonAssistWindowRect','Game_Action_updateLastTarget','getButtonAssistLocation','connected','jCYMo','paramRate','ajiII','Graphics_centerElement','Game_System_initialize','subtitle','slice','ColorCTGauge2','CustomParamAbb','_pollGamepads','initCoreEngineScreenShake','statusEquipWindowRect','filters','BTB','eventsXyNt','_stored_powerDownColor','currentLevelExp','updateCurrentEvent','getParameter','JKofr','YiRFH','randomInt','EditBgType','asin','createTroopNote','isNwjs','Renderer','Game_BattlerBase_initMembers','terminate','setTargetAnchor','layoutSettings','outlineColorDmg','Enemy-%1-%2','ScreenResolution','render','PqhEi','SaPRW','optSideView','obqeb','enemies','OPEN_BRACKET','updatePositionCoreEngineShakeVert','IconSParam5','string','note','_hideButtons','LqSbT','Window_Base_createTextState','Scene_GameEnd_createBackground','ExportString','kFSsZ','LELPT','setup','BaseTexture','_movementDuration','IconParam2','_duration','X:\x20%1','GREATER_THAN','wDLEQ','dZJlw','ADD','Settings','xIxEF','MvAnimationRate','xparamRateJS','SlotRect','Input_update','_viewportSize','updatePlayTestF7','targetX','and\x20add\x20it\x20onto\x20this\x20one.','createButtonAssistWindow','ParamMax','#%1','WIN_OEM_PA1','isMapScrollLinked','expGaugeColor1','\x5c}❪SHIFT❫\x5c{','CwTWx','loadBitmap','sv_actors','drawItem','drawIcon','PictureShowIcon','updateTransform','onClick','ParseEnemyNotetags','Linear','deflate','SParamVocab5','getKeyboardInputButtonString','pressed','Scene_Map_createSpriteset','oLxTP','Window_ShopSell_isEnabled','IFnqq','HWhMV','CLOSE_PAREN','FxFDZ','inputWindowRect','Input_clear','horizontal','statusParamsWindowRect','END','currentValue','GoldChange','WIN_OEM_ATTN','EXECUTE','Scene_Title_drawGameTitle','buttons','Page','RegExp','targetEvaRate','SParamVocab9','MapOnceParallel','refresh','KrGJS','mAROR','select','_movementWholeDuration','_origin','startAutoNewGame','zADRm','PVtYX','_baseTexture','WIN_OEM_AUTO','ENkjV','Window_NameInput_cursorUp','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','INQUART','onload','itypeId','atypeId','VaWeC','itemPadding','showPointAnimations','_clickHandler','ParamName','lGTzl','endAction','_commonEventLayers','currentExp','BackOpacity','AGI','parameters','TitleCommandList','GroupDigits','aSRIc','INSERT','faces','sdQzh','calcCoreEasing','applyCoreEasing','tRhxE','setAttack','eYiud','xWOmT','BattleManager_checkSubstitute','scrollUp','resetBattleSystem','PMiFT','setFrame','setBattleSystem','titles1','mOTHO','UpdatePictureCoordinates','targetScaleY','length','contentsOpacity','animationId','PositionX','setupCoreEngine','ColorMPGauge1','F17','equips','DisplayLockY','forceOutOfPlaytest','displayY','EjUJe','paramBase','PbFJg','_playtestF7Looping','Scene_Options_create','WIN_OEM_FINISH','LhoQq','Window_Base_update','alwaysDash','getLastGamepadUsed','_encounterCount','CancelText','LineHeight','onButtonImageLoad','EpnEs','SParamVocab1','Rate','iconHeight','isSideView','cwvly','keyboard','TdTbg','expRate','innerHeight','OzZTi','LoadMenu','Title','loading','eqxdP','wQeXd','processCursorMove','addCommand','update','loadSystemImages','F15','addEventListener','isPlaytest','successRate','ColorExpGauge2','iGQJd','itemBackColor2','INELASTIC','makeCommandList','cxbFU','buttonAssistOffset3','blockWidth','showFauxAnimations','SParamVocab6','canUse','createMenuButton','ctrl','_targetOpacity','TCR','remove','isOpenAndActive','centerCameraCheckData','processKeyboardHome','Scene_Map_createSpritesetFix','setHandler','_coreEasingType','InputRect','vxqil','isLoopHorizontal','Sprite_AnimationMV_processTimingData','Max','HelpRect','ColorCrisis','move','redraw','_battleField','itemEva','escape','paramRate1','editWindowRect','smoothSelect','showPicture','_dummyWindow','drawGameVersion','setSkill','active','kUtyO','framebuffer','IconParam0','Bitmap_drawTextOutline','TediQ','clipboard','zdvLi','events','RepositionEnemies','tab','updateCoreEasing','CategoryBgType','QhnuR','SystemLoadImages','Scene_Map_createSpriteset_detach','movePageButtonSideButtonLayout','SParameterFormula','itemSuccessRate','DimColor2','SPKOM','xbcwn','_width','sjbYj','Window_NameInput_cursorRight','WASD','onActorChange','backOpacity','focus','qhpUR','clear','Game_Screen_initialize','pointX','GoldFontSize','_opening','nah','DATABASE','IconIndex','WindowLayer_render','isPressed','VisuMZ_3_EventChainReact','Window_Selectable_cursorUp','targetBackOpacity','encounterStepsMinimum','MRF','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','ParseStateNotetags','onKeyDownKeysF6F7','ColorGaugeBack','Flat1','gradientFillRect','numActions','SUBTRACT','makeEncounterCount','_repositioned','OnLoadJS','_targetY','apply','pages','YNzBv','keyMapper','uXLZg','animationShouldMirror','TextManager_param','BlendMode','command105','get','create','DefaultMode','AHZxx','BuyBgType','EscapeAlways','xparamPlus2','guardSkillId','createFauxAnimationSprite','type','Chance','viewport','destroyCoreEngineMarkedBitmaps','mAYiZ','RGsHC','BattleSystem','centerY','_centerCameraCheck','trim','offsetX','SIrxR','_onKeyPress','CEV','zZVuX','isKeyItem','Game_Interpreter_command111','updateEffekseer','_currentBgs','scale','_margin','SceneManager_initialize','SwitchToggleRange','cancelShowButton','ColorNormal','mhp','MINUS','MenuLayout','EXSEL','lineHeight','AXlPd','helpAreaBottom','isUseModernControls','Game_Actor_levelUp','_inputSpecialKeyCode','OptionsMenu','IconParam4','MDR','helpAreaHeight','BoxMargin','ScreenShake','IconXParam9','Input_setupEventHandlers','cHOMh','drawRightArrow','createPointAnimationTargets','Scene_MenuBase_mainAreaHeight','Scene_Battle_createSpriteset_detach','DigitGroupingDamageSprites','Window_Selectable_processTouch','HIT','updatePointAnimations','OVsMc','Game_Map_scrollLeft','fhdhX','DetachBattlePictureContainer','targetScaleX','Scene_Base_terminate','Game_Picture_scaleX','pBgrF','OPEN_CURLY_BRACKET','_targetOffsetY','_smooth','GoldMax','ekVvB','drawText','ONE','areTileShadowsHidden','EnZoX','clone','buttonAssistText%1','_digitGrouping','BlurFilter','JjWPG','bPgZD','EnableNameInput','isBottomHelpMode','paramMax','_coreEngineShakeStyle','down','stringKeyMap','initialLevel','sparamFlat2','isCursorMovable','_stored_ctGaugeColor1','_refreshPauseSign','iVYFZ','renderNoMask','XQjXS','LSrpj','ActorBgType','LKwHy','toString','F7key','goto','〘Common\x20Event\x20%1:\x20%2〙\x20End','ShowDevTools','createJsQuickFunction','style','GoldOverlap','cPxbW','padZero','Sprite_Actor_setActorHome','dUoKx','Bitmap_fillRect','OTB','CLOSE_BRACKET','expParams','(\x5cd+)([%％])>','POvEY','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','CommandWidth','TextJS','buttonAssistWindowSideRect','QgUnA','Window_NameInput_cursorPagedown','F12','clearForcedGameTroopSettingsCoreEngine','updateMainMultiply','_muteSound','Scene_Name_create','Flat','gaugeHeight','UBnDx','OUTQUAD','commandWindowRows','getInputMultiButtonStrings','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','XParamVocab0','Scene_Base_terminateAnimationClearBugFix','ParseAllNotetags','mEOlb','expGaugeColor2','checkCoreEngineDisplayCenter','_pictureCoordinatesWindow','GoldBgType','%1/','F19','_cacheScaleX','maxLevel','child_process','faceHeight','Match','GqGyR','QoL','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','Map%1.json','DigitGroupingLocale','_logWindow','IconSParam3','_shakePower','gaugeBackColor','【%1】\x0a','JSON','gnaqy','ruZPC','IWNyD','lweNA','pictureId','COMMA','QqmmY','oCvIT','getLevel','defaultInputMode','_clientArea','CrisisRate','ExportAllTroopText','HjhWV','ThQSb','STRUCT','alignBottom','sellWindowRect','tvURy','drawActorSimpleStatus','Game_Picture_show','_storedStack','hUFOE','itemHit','IconXParam6','NewGameCommonEventAll','isMenuButtonAssistEnabled','IconParam3','PositionJS','yPLDz','startNormalGame','ntoKy','OptionsRect','buttonAssistOffset5','KeyItemProtect','toFixed','Duration','_animationQueue','sparam','catchUnknownError','isGamepadConnected','YZZkR','ReISc','itemHitImprovedAccuracy','buttonAssistKey2','_height','tpGaugeColor2','STENCIL_TEST','Scene_Menu_create','cyCAn','level','hdadW','onInputOk','ZERO','XParamVocab6','system','clearCachedKeys','parse','XGTaz','Game_Picture_move','tIyCA','characters','paramchangeTextColor','QvxiY','_sellWindow','Vsdel','xparamRate2','backgroundBitmap','FWHQi','refreshActor','TYTke','Scene_Unlisted','popScene','_stored_crisisColor','ahKGN','_stored_hpGaugeColor1','enter','EVA','rowSpacing','ColorMaxLvGauge1','SellBgType','IconXParam1','COLON','foMgz','CustomParamIcons','isMagical','〘Common\x20Event\x20%1:\x20%2〙\x20Start','fontSize','58YaTTaR','INOUTCIRC','initMembers','createWindowLayer','StatusMenu','duration','Scene_Boot_onDatabaseLoaded','Graphics_defaultStretchMode','jsQuickFunc','position','Input_pollGamepads','NUMPAD8','_editWindow','bgsVolume','ParseClassNotetags','\x0a\x0a\x0a\x0a\x0a','Bitmap_drawCircle','setupNewGame','NoEPy','VHDNB','_subject','_commandWindow','strokeRect','setCommonEvent','SeHXL','EnableJS','wholeDuration','onEscapeSuccess','Subtitle','hideButtonFromView','displayName','_lastGamepad','EiPQh','Bitmap_gradientFillRect','platform','mirror','_stored_mpGaugeColor1','_cacheScaleY','IconSParam7','ColorPowerDown','initVisuMZCoreEngine','Sprite_Gauge_gaugeRate','XmoZT','REC','isGameActive','_pauseSignSprite','cos','createCommandWindow','4CCwVeu','home','createEnemies','_currentMap','phSOZ','inbounce','ParseWeaponNotetags','src','setAction','LvExpGauge','process_VisuMZ_CoreEngine_RegExp','Scene_MenuBase_createPageButtons','onInputBannedWords','ParseSkillNotetags','AudioChangeBgmVolume','jkmBX','processAlwaysEscape','stencilFunc','_digitGroupingEx','helpAreaTopSideButtonLayout','ShowJS','requestMotion','repositionCancelButtonSideButtonLayout','performMiss','FontWidthFix','SystemSetFontSize','number','Scene_Boot_startNormalGame','FqYYc','drawFace','outbounce','members','text%1','Window_NameInput_cursorLeft','840138vQzsrD','setEnemyAction','processKeyboardDigitChange','Game_Map_scrollDown','allTiles','_pointAnimationSprites','Sprite_Animation_processSoundTimings','Scene_MenuBase_createBackground','DefaultStyle','ABKNW','onKeyDown','transform','adjustBoxSize','wJuxJ','pan','RPGMAKER_VERSION','outlineColorGauge','originalJS','Scene_MenuBase_createCancelButton','_shakeSpeed','Window_Selectable_itemRect','polXI','ZdhbG','bTmlc','Scene_Item_create','Sprite_Button_initialize','ShowItemBackground','createPointAnimation','catchLoadError','ListRect','itMPT','KSsfq','updateData','command111','removeChild','addAnimationSpriteToContainer','buttonAssistKey1','MEV','loadIconBitmap','setActorHomeRepositioned','ceil','goldWindowRect','getCustomBackgroundSettings','JpPaf','learnings','Untitled','pPdwi','padding','loadMapData','removeAnimationFromContainer','StatusParamsRect','MDF','IconSParam1','ARRAYNUM','Icon','eUXOZ','onLoad','Key%1','UNDERSCORE','getColor','HRG','windowPadding','isArrowPressed','_gamepadWait','ImgLoad','rcHjR','IaLjt','Window_Gold_refresh','makeFontSmaller','makeFontBigger','setActorHome','_stored_ctGaugeColor2','TFoWU','buttonAssistOffset2','drawGauge','_makeFontNameText','VNQkz','printError','Scene_Boot_loadSystemImages','areButtonsHidden','QRDbh','paramFlatJS','SCROLL_LOCK','playBgs','AylUx','INEXPO','_lastY','REPLACE','isAnimationOffsetXMirrored','fillStyle','_cache','format','onDatabaseLoaded','SORKH','NpmBK','_isButtonHidden','0.00','setSideView','min','Window_Selectable_processCursorMove','SideView','ZJbpY','ARRAYJSON','tilesetFlags','_scrollDuration','sparamRate2','xeIhH','zoomScale','Class-%1-%2','process_VisuMZ_CoreEngine_CustomParameters','cmaoe','_stored_mpCostColor','_effectsContainer','NhwWQ','ScaleY','jxDXL','snapForBackground','joPIJ','mpColor','start','QPQYS','animationNextDelay','SParamVocab4','destroy','getLastUsedGamepadType','Map%1','createDigits','VXXZN','_drawTextOutline','CallHandlerJS','getInputButtonString','_lastOrigin','xStXk','randomJS','_stored_normalColor','Scene_MenuBase_mainAreaTop','_CoreEngineSettings','onerror','createCustomBackgroundImages','xexJP','SlotBgType','none','setupCoreEasing','removeOnceParallelInterpreter','IbBqN','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','aICyJ','split','BuyRect','VDjWK','ColorCTGauge1','setupButtonImage','_statusWindow','WIN_OEM_FJ_MASSHOU','ZWbjR','startMove','_stored_mpGaugeColor2','powerUpColor','checkCacheKey','_context','Game_Interpreter_updateWaitMode','helpWindowRect','processSoundTimings','INOUTSINE','areButtonsOutsideMainUI','runCombinedScrollingTextAsCode','Spriteset_Base_destroy','KeyTAB','calcEasing','worldTransform','%1\x0a','Game_Action_setAttack','UbUXJ','KVUoU','removeFauxAnimation','add','moveCancelButtonSideButtonLayout','_setupEventHandlers','open','ColorSystem','switchModes','tRBpd','reservePlayTestNewGameCommonEvent','VisuMZ_2_BattleSystemPTB','doesNameContainBannedWords','_lastPluginCommandInterpreter','pJjOR','F20','Game_Picture_y','isPointAnimationPlaying','_centerElement','_statusParamsWindow','lkepG','alphabetic','end','ValueJS','innerWidth','KHFLW','_active','ARRAYFUNC','isCancelled','targetOpacity','alpha','updateFauxAnimations','rgba(0,\x200,\x200,\x201.0)','(\x5cd+)>','exportAllMapStrings','_onLoad','scaleX','_list','buttonAssistText4','nfgxW','Game_Picture_updateMove','getPointAnimationLayer','Tolfx','createSpriteset','determineSideButtonLayoutValid','WIN_OEM_FJ_JISHO','Window_Selectable_cursorDown','quit','subjectHitRate','_stored_expGaugeColor1','setTopRow','Scene_Map_updateMainMultiply','OUTEXPO','_pointAnimationQueue','loadTitle1','UZjHf','writeFile','_buttonType','zHQSR','_itemWindow','_hideTileShadows','statusWindowRect','aGqxS','setupValueFont','Bitmap_initialize','_rate','systemColor','GetParamIcon','bqVBt','isSideButtonLayout','vGjzo','HrhtK','random','VFsUT','pagedown','AutoScrollLockY','targetContentsOpacity','playTestF6','684FMQjOm','nSMib'];_0x377c=function(){return _0x4596b3;};return _0x377c();}Window_PictureCoordinates[_0x52da50(0x48a)]=Object[_0x52da50(0x737)](Window_Base[_0x52da50(0x48a)]),Window_PictureCoordinates[_0x52da50(0x48a)][_0x52da50(0x2ba)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x52da50(0x48a)][_0x52da50(0x2a5)]=function(){const _0x28204c=_0x52da50;this[_0x28204c(0x906)]='nah',this['_lastX']=_0x28204c(0x717),this[_0x28204c(0x8d9)]=_0x28204c(0x717);const _0x1626f1=this[_0x28204c(0x210)]();Window_Base[_0x28204c(0x48a)][_0x28204c(0x2a5)][_0x28204c(0x4cc)](this,_0x1626f1),this[_0x28204c(0x56e)](0x2);},Window_PictureCoordinates[_0x52da50(0x48a)][_0x52da50(0x210)]=function(){const _0x141a5f=_0x52da50;let _0x484f19=0x0,_0x362eb0=Graphics['height']-this[_0x141a5f(0x75c)](),_0x1b959b=Graphics['width'],_0x3795dc=this[_0x141a5f(0x75c)]();return new Rectangle(_0x484f19,_0x362eb0,_0x1b959b,_0x3795dc);},Window_PictureCoordinates[_0x52da50(0x48a)]['updatePadding']=function(){const _0x3bdedd=_0x52da50;this[_0x3bdedd(0x8b2)]=0x0;},Window_PictureCoordinates[_0x52da50(0x48a)]['update']=function(){const _0x55b35d=_0x52da50;Window_Base[_0x55b35d(0x48a)][_0x55b35d(0x6c5)][_0x55b35d(0x4cc)](this),this[_0x55b35d(0x8a3)]();},Window_PictureCoordinates[_0x52da50(0x48a)][_0x52da50(0x8a3)]=function(){const _0x551166=_0x52da50;if(!this[_0x551166(0x4e3)]())return;this[_0x551166(0x666)]();},Window_PictureCoordinates[_0x52da50(0x48a)][_0x52da50(0x4e3)]=function(){const _0x12a880=_0x52da50,_0x58e691=$gameTemp[_0x12a880(0x2a9)],_0x4ffc4c=$gameScreen[_0x12a880(0x2a8)](_0x58e691);if(_0x4ffc4c){if(_0x12a880(0x66e)===_0x12a880(0x49e)){if(this[_0x12a880(0x7b6)])return;_0x92440b[_0x12a880(0x9bb)][_0x12a880(0x889)][_0x12a880(0x4cc)](this);}else return this[_0x12a880(0x906)]!==_0x4ffc4c['_origin']||this[_0x12a880(0x473)]!==_0x4ffc4c['_x']||this[_0x12a880(0x8d9)]!==_0x4ffc4c['_y'];}else return![];},Window_PictureCoordinates[_0x52da50(0x48a)][_0x52da50(0x666)]=function(){const _0x3903b4=_0x52da50;this[_0x3903b4(0x9ca)][_0x3903b4(0x712)]();const _0x11dc5a=$gameTemp['_pictureCoordinatesMode'],_0x35e942=$gameScreen['picture'](_0x11dc5a);if(!_0x35e942)return;this[_0x3903b4(0x906)]=_0x35e942['_origin'],this[_0x3903b4(0x473)]=_0x35e942['_x'],this['_lastY']=_0x35e942['_y'];const _0x55a03c=ColorManager['itemBackColor1']();this['contents'][_0x3903b4(0x9aa)](0x0,0x0,this[_0x3903b4(0x947)],this[_0x3903b4(0x6bc)],_0x55a03c);const _0x4c1f28=_0x3903b4(0x4bb)['format'](_0x35e942[_0x3903b4(0x66b)]===0x0?'Upper\x20Left':'Center'),_0x22d937=_0x3903b4(0x62b)[_0x3903b4(0x8de)](_0x35e942['_x']),_0x8dc7dc='Y:\x20%1'[_0x3903b4(0x8de)](_0x35e942['_y']),_0x439998=_0x3903b4(0x993)[_0x3903b4(0x8de)](TextManager[_0x3903b4(0x905)]('cancel'));let _0x1ccf7f=Math[_0x3903b4(0x23f)](this[_0x3903b4(0x947)]/0x4);this['drawText'](_0x4c1f28,_0x1ccf7f*0x0,0x0,_0x1ccf7f),this['drawText'](_0x22d937,_0x1ccf7f*0x1,0x0,_0x1ccf7f,_0x3903b4(0x5b2)),this['drawText'](_0x8dc7dc,_0x1ccf7f*0x2,0x0,_0x1ccf7f,_0x3903b4(0x5b2));const _0x1698c9=this['textSizeEx'](_0x439998)[_0x3903b4(0x2b7)],_0xf00309=this[_0x3903b4(0x947)]-_0x1698c9;this['drawTextEx'](_0x439998,_0xf00309,0x0,_0x1698c9);},VisuMZ['ShowDevTools']=function(_0x3e2e7c){const _0x2cfa92=_0x52da50;if(Utils[_0x2cfa92(0x339)]('test')){var _0x1b45e4=require(_0x2cfa92(0x9f0))['Window'][_0x2cfa92(0x736)]();SceneManager[_0x2cfa92(0x314)]();if(_0x3e2e7c)setTimeout(_0x1b45e4[_0x2cfa92(0x710)]['bind'](_0x1b45e4),0x190);}},VisuMZ[_0x52da50(0x269)]=function(_0x135a74,_0x2991ea){const _0x426dd1=_0x52da50;_0x2991ea=_0x2991ea[_0x426dd1(0x5d6)]();var _0x3b72b8=1.70158,_0x45c57a=0.7;switch(_0x2991ea){case _0x426dd1(0x187):return _0x135a74;case _0x426dd1(0x223):return-0x1*Math[_0x426dd1(0x85f)](_0x135a74*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x426dd1(0x50c)](_0x135a74*(Math['PI']/0x2));case _0x426dd1(0x926):return-0.5*(Math[_0x426dd1(0x85f)](Math['PI']*_0x135a74)-0x1);case _0x426dd1(0x50f):return _0x135a74*_0x135a74;case _0x426dd1(0x7bb):return _0x135a74*(0x2-_0x135a74);case'INOUTQUAD':return _0x135a74<0.5?0x2*_0x135a74*_0x135a74:-0x1+(0x4-0x2*_0x135a74)*_0x135a74;case'INCUBIC':return _0x135a74*_0x135a74*_0x135a74;case'OUTCUBIC':var _0x3b6b69=_0x135a74-0x1;return _0x3b6b69*_0x3b6b69*_0x3b6b69+0x1;case _0x426dd1(0x5ad):return _0x135a74<0.5?0x4*_0x135a74*_0x135a74*_0x135a74:(_0x135a74-0x1)*(0x2*_0x135a74-0x2)*(0x2*_0x135a74-0x2)+0x1;case _0x426dd1(0x674):return _0x135a74*_0x135a74*_0x135a74*_0x135a74;case'OUTQUART':var _0x3b6b69=_0x135a74-0x1;return 0x1-_0x3b6b69*_0x3b6b69*_0x3b6b69*_0x3b6b69;case _0x426dd1(0x29b):var _0x3b6b69=_0x135a74-0x1;return _0x135a74<0.5?0x8*_0x135a74*_0x135a74*_0x135a74*_0x135a74:0x1-0x8*_0x3b6b69*_0x3b6b69*_0x3b6b69*_0x3b6b69;case _0x426dd1(0x1e7):return _0x135a74*_0x135a74*_0x135a74*_0x135a74*_0x135a74;case _0x426dd1(0xa00):var _0x3b6b69=_0x135a74-0x1;return 0x1+_0x3b6b69*_0x3b6b69*_0x3b6b69*_0x3b6b69*_0x3b6b69;case'INOUTQUINT':var _0x3b6b69=_0x135a74-0x1;return _0x135a74<0.5?0x10*_0x135a74*_0x135a74*_0x135a74*_0x135a74*_0x135a74:0x1+0x10*_0x3b6b69*_0x3b6b69*_0x3b6b69*_0x3b6b69*_0x3b6b69;case _0x426dd1(0x8d8):if(_0x135a74===0x0)return _0x426dd1(0x4c9)===_0x426dd1(0x4c9)?0x0:_0x42c777[_0x426dd1(0x48a)]['textWidth'][_0x426dd1(0x4cc)](this,_0x465717);return Math[_0x426dd1(0x22f)](0x2,0xa*(_0x135a74-0x1));case _0x426dd1(0x963):if(_0x135a74===0x1)return 0x1;return-Math[_0x426dd1(0x22f)](0x2,-0xa*_0x135a74)+0x1;case'INOUTEXPO':if(_0x135a74===0x0||_0x135a74===0x1)return _0x135a74;var _0x5b724a=_0x135a74*0x2,_0x590d52=_0x5b724a-0x1;if(_0x5b724a<0x1)return 0.5*Math[_0x426dd1(0x22f)](0x2,0xa*_0x590d52);return 0.5*(-Math[_0x426dd1(0x22f)](0x2,-0xa*_0x590d52)+0x2);case _0x426dd1(0x5cd):var _0x5b724a=_0x135a74/0x1;return-0x1*(Math[_0x426dd1(0x3dd)](0x1-_0x5b724a*_0x135a74)-0x1);case'OUTCIRC':var _0x3b6b69=_0x135a74-0x1;return Math[_0x426dd1(0x3dd)](0x1-_0x3b6b69*_0x3b6b69);case _0x426dd1(0x832):var _0x5b724a=_0x135a74*0x2,_0x590d52=_0x5b724a-0x2;if(_0x5b724a<0x1){if('qdwMZ'!==_0x426dd1(0x81d))return-0.5*(Math[_0x426dd1(0x3dd)](0x1-_0x5b724a*_0x5b724a)-0x1);else _0x309c84+=_0x515cd4+_0x426dd1(0x721)[_0x426dd1(0x8de)](_0x147926,_0x5798c8[_0x426dd1(0x215)]||'Unnamed')+_0x1d3066;}return 0.5*(Math[_0x426dd1(0x3dd)](0x1-_0x590d52*_0x590d52)+0x1);case _0x426dd1(0x484):return _0x135a74*_0x135a74*((_0x3b72b8+0x1)*_0x135a74-_0x3b72b8);case'OUTBACK':var _0x5b724a=_0x135a74/0x1-0x1;return _0x5b724a*_0x5b724a*((_0x3b72b8+0x1)*_0x5b724a+_0x3b72b8)+0x1;break;case _0x426dd1(0x9b9):var _0x5b724a=_0x135a74*0x2,_0x158e2c=_0x5b724a-0x2,_0x49fccd=_0x3b72b8*1.525;if(_0x5b724a<0x1)return _0x426dd1(0x4b9)===_0x426dd1(0x4b9)?0.5*_0x5b724a*_0x5b724a*((_0x49fccd+0x1)*_0x5b724a-_0x49fccd):_0x25da55[_0x426dd1(0x9bb)][_0x426dd1(0x651)][_0x426dd1(0x4cc)](this,_0x310d57);return 0.5*(_0x158e2c*_0x158e2c*((_0x49fccd+0x1)*_0x158e2c+_0x49fccd)+0x2);case _0x426dd1(0x6ce):if(_0x135a74===0x0||_0x135a74===0x1)return _0x135a74;var _0x5b724a=_0x135a74/0x1,_0x590d52=_0x5b724a-0x1,_0x2e0ffe=0x1-_0x45c57a,_0x49fccd=_0x2e0ffe/(0x2*Math['PI'])*Math[_0x426dd1(0x609)](0x1);return-(Math[_0x426dd1(0x22f)](0x2,0xa*_0x590d52)*Math[_0x426dd1(0x50c)]((_0x590d52-_0x49fccd)*(0x2*Math['PI'])/_0x2e0ffe));case _0x426dd1(0x2c4):var _0x2e0ffe=0x1-_0x45c57a,_0x5b724a=_0x135a74*0x2;if(_0x135a74===0x0||_0x135a74===0x1)return _0x135a74;var _0x49fccd=_0x2e0ffe/(0x2*Math['PI'])*Math[_0x426dd1(0x609)](0x1);return Math[_0x426dd1(0x22f)](0x2,-0xa*_0x5b724a)*Math['sin']((_0x5b724a-_0x49fccd)*(0x2*Math['PI'])/_0x2e0ffe)+0x1;case'INOUTELASTIC':var _0x2e0ffe=0x1-_0x45c57a;if(_0x135a74===0x0||_0x135a74===0x1)return _0x135a74;var _0x5b724a=_0x135a74*0x2,_0x590d52=_0x5b724a-0x1,_0x49fccd=_0x2e0ffe/(0x2*Math['PI'])*Math[_0x426dd1(0x609)](0x1);if(_0x5b724a<0x1){if('nCOis'!==_0x426dd1(0x563))var _0x3fd01d=_0x410225['ApplyEasing'](_0x12ad0b*0x2,_0x426dd1(0x866))*0.5;else return-0.5*(Math['pow'](0x2,0xa*_0x590d52)*Math[_0x426dd1(0x50c)]((_0x590d52-_0x49fccd)*(0x2*Math['PI'])/_0x2e0ffe));}return Math[_0x426dd1(0x22f)](0x2,-0xa*_0x590d52)*Math[_0x426dd1(0x50c)]((_0x590d52-_0x49fccd)*(0x2*Math['PI'])/_0x2e0ffe)*0.5+0x1;case'OUTBOUNCE':var _0x5b724a=_0x135a74/0x1;if(_0x5b724a<0x1/2.75){if(_0x426dd1(0x938)!==_0x426dd1(0x6cc))return 7.5625*_0x5b724a*_0x5b724a;else this[_0x426dd1(0x458)]&&this['_helpWindow'][_0x426dd1(0x56e)](_0xe24245[_0x426dd1(0x610)][_0x426dd1(0x333)]),this[_0x426dd1(0x3e0)]&&this['_listWindow'][_0x426dd1(0x56e)](_0x1c28f3[_0x426dd1(0x610)]['ListBgType']);}else{if(_0x5b724a<0x2/2.75){if(_0x426dd1(0x7e0)!==_0x426dd1(0x8e8)){var _0x158e2c=_0x5b724a-1.5/2.75;return 7.5625*_0x158e2c*_0x158e2c+0.75;}else this[_0x426dd1(0x33e)]+=_0x5a2866;}else{if(_0x5b724a<2.5/2.75){if(_0x426dd1(0x992)!==_0x426dd1(0x992))_0x20cc4f['setSideView'](!_0x28ecc8[_0x426dd1(0x6b7)]());else{var _0x158e2c=_0x5b724a-2.25/2.75;return 7.5625*_0x158e2c*_0x158e2c+0.9375;}}else{if(_0x426dd1(0x227)!==_0x426dd1(0x227))_0x39cced[_0x426dd1(0x9bb)][_0x426dd1(0x45d)][_0x426dd1(0x4cc)](this),_0x507e04[_0x426dd1(0x603)]();else{var _0x158e2c=_0x5b724a-2.625/2.75;return 7.5625*_0x158e2c*_0x158e2c+0.984375;}}}}case'INBOUNCE':var _0x1cb18=0x1-VisuMZ[_0x426dd1(0x269)](0x1-_0x135a74,_0x426dd1(0x87f));return _0x1cb18;case _0x426dd1(0x515):if(_0x135a74<0.5)var _0x1cb18=VisuMZ[_0x426dd1(0x269)](_0x135a74*0x2,_0x426dd1(0x866))*0.5;else{if(_0x426dd1(0x311)!=='XbnKX')var _0x1cb18=VisuMZ[_0x426dd1(0x269)](_0x135a74*0x2-0x1,_0x426dd1(0x87f))*0.5+0.5;else _0x308e17(_0x4891e6),_0x1f95f6[_0x426dd1(0x448)]();}return _0x1cb18;default:return _0x135a74;}},VisuMZ[_0x52da50(0x972)]=function(_0x240d3e){const _0x3c4cd4=_0x52da50;_0x240d3e=String(_0x240d3e)[_0x3c4cd4(0x5d6)]();const _0x42a370=VisuMZ[_0x3c4cd4(0x9bb)][_0x3c4cd4(0x630)][_0x3c4cd4(0x9cd)];if(_0x240d3e==='MAXHP')return _0x42a370[_0x3c4cd4(0x6f7)];if(_0x240d3e===_0x3c4cd4(0x991))return _0x42a370['IconParam1'];if(_0x240d3e===_0x3c4cd4(0x1af))return _0x42a370[_0x3c4cd4(0x629)];if(_0x240d3e===_0x3c4cd4(0x232))return _0x42a370[_0x3c4cd4(0x7f4)];if(_0x240d3e===_0x3c4cd4(0x525))return _0x42a370[_0x3c4cd4(0x763)];if(_0x240d3e===_0x3c4cd4(0x8b6))return _0x42a370[_0x3c4cd4(0x479)];if(_0x240d3e===_0x3c4cd4(0x682))return _0x42a370['IconParam6'];if(_0x240d3e===_0x3c4cd4(0x376))return _0x42a370['IconParam7'];if(_0x240d3e===_0x3c4cd4(0x771))return _0x42a370[_0x3c4cd4(0x1ef)];if(_0x240d3e===_0x3c4cd4(0x826))return _0x42a370[_0x3c4cd4(0x82a)];if(_0x240d3e===_0x3c4cd4(0x5a9))return _0x42a370[_0x3c4cd4(0x318)];if(_0x240d3e===_0x3c4cd4(0x74c))return _0x42a370['IconXParam3'];if(_0x240d3e===_0x3c4cd4(0x8a8))return _0x42a370[_0x3c4cd4(0x2b4)];if(_0x240d3e===_0x3c4cd4(0x720))return _0x42a370['IconXParam5'];if(_0x240d3e===_0x3c4cd4(0x211))return _0x42a370[_0x3c4cd4(0x7f1)];if(_0x240d3e===_0x3c4cd4(0x8bf))return _0x42a370[_0x3c4cd4(0x547)];if(_0x240d3e===_0x3c4cd4(0x53f))return _0x42a370['IconXParam8'];if(_0x240d3e===_0x3c4cd4(0x305))return _0x42a370[_0x3c4cd4(0x768)];if(_0x240d3e===_0x3c4cd4(0xa1e))return _0x42a370[_0x3c4cd4(0x38d)];if(_0x240d3e===_0x3c4cd4(0x3bd))return _0x42a370[_0x3c4cd4(0x8b7)];if(_0x240d3e===_0x3c4cd4(0x85c))return _0x42a370[_0x3c4cd4(0x52c)];if(_0x240d3e===_0x3c4cd4(0x2b6))return _0x42a370[_0x3c4cd4(0x7d4)];if(_0x240d3e===_0x3c4cd4(0x598))return _0x42a370[_0x3c4cd4(0x198)];if(_0x240d3e===_0x3c4cd4(0x6d9))return _0x42a370[_0x3c4cd4(0x61c)];if(_0x240d3e===_0x3c4cd4(0x3f0))return _0x42a370['IconSParam6'];if(_0x240d3e===_0x3c4cd4(0x764))return _0x42a370[_0x3c4cd4(0x857)];if(_0x240d3e===_0x3c4cd4(0x3a6))return _0x42a370['IconSParam8'];if(_0x240d3e==='EXR')return _0x42a370[_0x3c4cd4(0x288)];if(VisuMZ[_0x3c4cd4(0x9bb)]['CustomParamIcons'][_0x240d3e])return VisuMZ['CoreEngine']['CustomParamIcons'][_0x240d3e]||0x0;return 0x0;},VisuMZ[_0x52da50(0x410)]=function(_0x255e92,_0x55e7a7,_0xd53875){const _0x1bb934=_0x52da50;if(_0xd53875===undefined&&_0x255e92%0x1===0x0)return _0x255e92;if(_0xd53875!==undefined&&[_0x1bb934(0x554),_0x1bb934(0x991),_0x1bb934(0x1af),_0x1bb934(0x232),'MAT',_0x1bb934(0x8b6),'AGI',_0x1bb934(0x376)][_0x1bb934(0x3fc)](String(_0xd53875)[_0x1bb934(0x5d6)]()[_0x1bb934(0x748)]()))return _0x255e92;_0x55e7a7=_0x55e7a7||0x0;if(VisuMZ[_0x1bb934(0x9bb)]['CustomParamAbb'][_0xd53875])return VisuMZ['CoreEngine'][_0x1bb934(0x560)][_0xd53875]===_0x1bb934(0x2e4)?_0x255e92:String((_0x255e92*0x64)['toFixed'](_0x55e7a7))+'%';return String((_0x255e92*0x64)[_0x1bb934(0x7fc)](_0x55e7a7))+'%';},VisuMZ[_0x52da50(0x685)]=function(_0x26793c){const _0x52bd50=_0x52da50;_0x26793c=String(_0x26793c);if(!_0x26793c)return _0x26793c;if(typeof _0x26793c!==_0x52bd50(0x61d))return _0x26793c;const _0x375a2d=VisuMZ[_0x52bd50(0x9bb)][_0x52bd50(0x630)][_0x52bd50(0x7cf)][_0x52bd50(0x7d2)]||'en-US',_0x37e99d={'maximumFractionDigits':0x6};_0x26793c=_0x26793c['replace'](/\[(.*?)\]/g,(_0x14f6f5,_0x38f34e)=>{return VisuMZ['PreserveNumbers'](_0x38f34e,'[',']');}),_0x26793c=_0x26793c[_0x52bd50(0x5d1)](/<(.*?)>/g,(_0x3d4583,_0xdd185)=>{const _0x5e3da8=_0x52bd50;return VisuMZ[_0x5e3da8(0x1a9)](_0xdd185,'<','>');}),_0x26793c=_0x26793c['replace'](/\{\{(.*?)\}\}/g,(_0xe2e35e,_0x36c5c9)=>{return VisuMZ['PreserveNumbers'](_0x36c5c9,'','');}),_0x26793c=_0x26793c['replace'](/(\d+\.?\d*)/g,(_0x26f944,_0x3d1254)=>{const _0x15b2bd=_0x52bd50;let _0x4eb05e=_0x3d1254;if(_0x4eb05e[0x0]==='0')return _0x4eb05e;if(_0x4eb05e[_0x4eb05e[_0x15b2bd(0x69a)]-0x1]==='.'){if(_0x15b2bd(0x3cf)!=='WeGkk')_0x588eeb=_0x28fc24||_0x4c48af[_0x15b2bd(0x9a2)],_0xee7372=_0x515148||_0x43de36[_0x15b2bd(0x7cc)],_0x122567=_0x32864b['round'](_0x49fc59),_0x59c86e=_0x1d2e24['round'](_0x304ac4),_0x1e3054=_0x463088[_0x15b2bd(0x442)](_0x5750f8),_0x2d5165=_0x4640fe[_0x15b2bd(0x442)](_0x543aaa),_0x471818[_0x15b2bd(0x9bb)][_0x15b2bd(0x1c7)][_0x15b2bd(0x4cc)](this,_0x5d411f,_0x3193c9,_0x29411f,_0x29390f,_0x150be4,_0x520368);else return Number(_0x4eb05e)['toLocaleString'](_0x375a2d,_0x37e99d)+'.';}else{if(_0x4eb05e[_0x4eb05e[_0x15b2bd(0x69a)]-0x1]===',')return Number(_0x4eb05e)['toLocaleString'](_0x375a2d,_0x37e99d)+',';else{if('LECTP'===_0x15b2bd(0x1a0))return Number(_0x4eb05e)[_0x15b2bd(0x9b5)](_0x375a2d,_0x37e99d);else _0x1f9df3=!_0x38ac9c;}}});let _0x1744ba=0x3;while(_0x1744ba--){if(_0x52bd50(0x77a)===_0x52bd50(0xa24))return this[_0x52bd50(0x3df)]()&&this[_0x52bd50(0x568)]<this[_0x52bd50(0x758)]*_0x439776[_0x52bd50(0x9bb)]['Settings']['Param'][_0x52bd50(0x7e4)];else _0x26793c=VisuMZ[_0x52bd50(0x3c5)](_0x26793c);}return _0x26793c;},VisuMZ[_0x52da50(0x1a9)]=function(_0x557b27,_0x1c9c4c,_0x355413){const _0x39f895=_0x52da50;return _0x557b27=_0x557b27[_0x39f895(0x5d1)](/(\d)/gi,(_0x42358c,_0x24212f)=>_0x39f895(0x25d)['format'](Number(_0x24212f))),_0x39f895(0x22a)[_0x39f895(0x8de)](_0x557b27,_0x1c9c4c,_0x355413);},VisuMZ[_0x52da50(0x3c5)]=function(_0x465f64){const _0x164061=_0x52da50;return _0x465f64=_0x465f64[_0x164061(0x5d1)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x28abb3,_0xbe6cfe)=>Number(parseInt(_0xbe6cfe))),_0x465f64;},VisuMZ['openURL']=function(_0x4324d9){const _0x5f109d=_0x52da50;SoundManager[_0x5f109d(0x372)]();if(!Utils['isNwjs']()){if(_0x5f109d(0x359)!==_0x5f109d(0x359))this[_0x5f109d(0x964)]=[];else{const _0x4ab5a4=window[_0x5f109d(0x935)](_0x4324d9,_0x5f109d(0x3b9));}}else{const _0x3f4c59=process[_0x5f109d(0x853)]=='darwin'?_0x5f109d(0x935):process[_0x5f109d(0x853)]==_0x5f109d(0x5a1)?_0x5f109d(0x8fa):'xdg-open';require(_0x5f109d(0x7cb))[_0x5f109d(0x33b)](_0x3f4c59+'\x20'+_0x4324d9);}},VisuMZ[_0x52da50(0x586)]=function(_0x42dbc5,_0x227ef9){const _0x54712d=_0x52da50;if(!_0x42dbc5)return'';const _0x87f03d=_0x42dbc5[_0x54712d(0x185)]||_0x42dbc5['id'];let _0x4629d4='';_0x42dbc5[_0x54712d(0x790)]!==undefined&&_0x42dbc5[_0x54712d(0x4aa)]!==undefined&&(_0x4629d4=_0x54712d(0x452)[_0x54712d(0x8de)](_0x87f03d,_0x227ef9));_0x42dbc5[_0x54712d(0x7aa)]!==undefined&&_0x42dbc5[_0x54712d(0x8af)]!==undefined&&(_0x54712d(0x521)!==_0x54712d(0x5ec)?_0x4629d4=_0x54712d(0x8ef)[_0x54712d(0x8de)](_0x87f03d,_0x227ef9):this[_0x54712d(0x937)]('keyboard'));if(_0x42dbc5[_0x54712d(0x23b)]!==undefined&&_0x42dbc5[_0x54712d(0x3bc)]!==undefined){if(_0x54712d(0x1e3)!==_0x54712d(0x1e3))return _0x9eccf6[_0x54712d(0x9bb)]['Game_Action_itemHit'][_0x54712d(0x4cc)](this,_0x182619);else _0x4629d4=_0x54712d(0x2c9)[_0x54712d(0x8de)](_0x87f03d,_0x227ef9);}_0x42dbc5[_0x54712d(0x676)]!==undefined&&_0x42dbc5['consumable']!==undefined&&('axokQ'==='axokQ'?_0x4629d4='Item-%1-%2'[_0x54712d(0x8de)](_0x87f03d,_0x227ef9):(_0xbb62b0[_0x54712d(0x872)](_0x130fd5['EQUAL'],0x0,~0x0),_0x50ec27[_0x54712d(0x21a)](_0x3ff49e[_0x54712d(0x4b4)],_0x5527bc[_0x54712d(0x4b4)],_0x36e246[_0x54712d(0x4b4)]),_0x2c8e0e[_0x54712d(0x614)](_0x5e68e0),_0x5d3700[_0x54712d(0x193)][_0x54712d(0x3d9)](),_0x12d08c[_0x54712d(0x712)](),_0x147172[_0x54712d(0x872)](_0x30de05['ALWAYS'],0x1,~0x0),_0x1642a1[_0x54712d(0x21a)](_0xbc7ebf['REPLACE'],_0x5ebea0['REPLACE'],_0x437910['REPLACE']),_0x20a5ca[_0x54712d(0x41e)](_0x5e5ea8[_0x54712d(0x80e)],_0x44443d[_0x54712d(0x781)]),_0x290649['render'](_0xae8c06),_0x84b774[_0x54712d(0x193)][_0x54712d(0x3d9)](),_0x357d34[_0x54712d(0x41e)](_0x539ab9['ONE'],_0x546275[_0x54712d(0x391)])));_0x42dbc5[_0x54712d(0xa22)]!==undefined&&_0x42dbc5['etypeId']===0x1&&(_0x4629d4=_0x54712d(0x99d)[_0x54712d(0x8de)](_0x87f03d,_0x227ef9));_0x42dbc5[_0x54712d(0x677)]!==undefined&&_0x42dbc5['etypeId']>0x1&&(_0x4629d4=_0x54712d(0x21f)[_0x54712d(0x8de)](_0x87f03d,_0x227ef9));if(_0x42dbc5['dropItems']!==undefined&&_0x42dbc5[_0x54712d(0x2e6)]!==undefined){if('KRRoR'!=='KRRoR')return this['yScrollLinkedOffset']();else _0x4629d4=_0x54712d(0x612)[_0x54712d(0x8de)](_0x87f03d,_0x227ef9);}if(_0x42dbc5[_0x54712d(0x205)]!==undefined&&_0x42dbc5[_0x54712d(0x400)]!==undefined){if(_0x54712d(0x2ac)!=='swOUB')return this[_0x54712d(0x39e)]();else _0x4629d4=_0x54712d(0x42e)[_0x54712d(0x8de)](_0x87f03d,_0x227ef9);}return _0x4629d4;},Game_Picture['prototype']['anchor']=function(){const _0x435c02=_0x52da50;return this[_0x435c02(0x984)];},VisuMZ[_0x52da50(0x9bb)]['Game_Picture_initBasic']=Game_Picture[_0x52da50(0x48a)][_0x52da50(0x5bb)],Game_Picture['prototype'][_0x52da50(0x5bb)]=function(){const _0x5f34fe=_0x52da50;VisuMZ[_0x5f34fe(0x9bb)][_0x5f34fe(0x35f)]['call'](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x5f34fe(0x453)]={'x':0x0,'y':0x0};},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x957)]=Game_Picture['prototype'][_0x52da50(0x507)],Game_Picture[_0x52da50(0x48a)][_0x52da50(0x507)]=function(){const _0x5389eb=_0x52da50;this[_0x5389eb(0x3d6)]();const _0x358b00=this[_0x5389eb(0x62a)];VisuMZ[_0x5389eb(0x9bb)][_0x5389eb(0x957)][_0x5389eb(0x4cc)](this),_0x358b00>0x0&&this['_duration']<=0x0&&(this['_x']=this[_0x5389eb(0x392)],this['_y']=this[_0x5389eb(0x72c)],this[_0x5389eb(0x44e)]=this[_0x5389eb(0x43e)],this[_0x5389eb(0x4d2)]=this[_0x5389eb(0x19c)],this[_0x5389eb(0x3f6)]=this[_0x5389eb(0x6d8)],this[_0x5389eb(0x984)]&&(this[_0x5389eb(0x984)]['x']=this[_0x5389eb(0x453)]['x'],this[_0x5389eb(0x984)]['y']=this[_0x5389eb(0x453)]['y']));},VisuMZ[_0x52da50(0x9bb)]['Game_Picture_show']=Game_Picture[_0x52da50(0x48a)][_0x52da50(0x1f3)],Game_Picture[_0x52da50(0x48a)][_0x52da50(0x1f3)]=function(_0x25bf4c,_0x55d5b0,_0x1c054f,_0x36c5d8,_0x1014a9,_0x52be30,_0x12ccef,_0x413071){const _0x5b469c=_0x52da50;VisuMZ['CoreEngine'][_0x5b469c(0x7ed)][_0x5b469c(0x4cc)](this,_0x25bf4c,_0x55d5b0,_0x1c054f,_0x36c5d8,_0x1014a9,_0x52be30,_0x12ccef,_0x413071),this[_0x5b469c(0x445)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x55d5b0]||{'x':0x0,'y':0x0});},VisuMZ[_0x52da50(0x9bb)]['Game_Picture_move']=Game_Picture['prototype'][_0x52da50(0x6e8)],Game_Picture[_0x52da50(0x48a)][_0x52da50(0x6e8)]=function(_0x1ca8c1,_0x2fc170,_0x43e130,_0x52e496,_0x2a0a4d,_0x5b77fa,_0x4265e5,_0xb7675e,_0x495971){const _0x1a7474=_0x52da50;VisuMZ[_0x1a7474(0x9bb)][_0x1a7474(0x814)]['call'](this,_0x1ca8c1,_0x2fc170,_0x43e130,_0x52e496,_0x2a0a4d,_0x5b77fa,_0x4265e5,_0xb7675e,_0x495971),this[_0x1a7474(0x60f)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1ca8c1]||{'x':0x0,'y':0x0});},Game_Picture[_0x52da50(0x48a)]['updateAnchor']=function(){const _0x10851e=_0x52da50;this[_0x10851e(0x62a)]>0x0&&(_0x10851e(0x978)!==_0x10851e(0x538)?(this[_0x10851e(0x984)]['x']=this['applyEasing'](this[_0x10851e(0x984)]['x'],this[_0x10851e(0x453)]['x']),this[_0x10851e(0x984)]['y']=this['applyEasing'](this[_0x10851e(0x984)]['y'],this[_0x10851e(0x453)]['y'])):_0xe7ea96=_0xdb848f[_0x10851e(0x685)](_0x1c81e2));},Game_Picture[_0x52da50(0x48a)]['setAnchor']=function(_0x18b0a2){const _0x106a69=_0x52da50;this['_anchor']=_0x18b0a2,this[_0x106a69(0x453)]=JsonEx['makeDeepCopy'](this[_0x106a69(0x984)]);},Game_Picture[_0x52da50(0x48a)][_0x52da50(0x60f)]=function(_0xbc15be){const _0x48e0be=_0x52da50;this[_0x48e0be(0x453)]=_0xbc15be;},VisuMZ['CoreEngine'][_0x52da50(0x9f1)]=Sprite_Picture[_0x52da50(0x48a)][_0x52da50(0x1d6)],Sprite_Picture[_0x52da50(0x48a)][_0x52da50(0x1d6)]=function(){const _0x4ffcd8=_0x52da50,_0xa58781=this[_0x4ffcd8(0x2a8)]();if(!_0xa58781[_0x4ffcd8(0x34c)]()){if(_0x4ffcd8(0x358)!==_0x4ffcd8(0x358))return![];else VisuMZ[_0x4ffcd8(0x9bb)][_0x4ffcd8(0x9f1)][_0x4ffcd8(0x4cc)](this);}else this[_0x4ffcd8(0x34c)]['x']=_0xa58781[_0x4ffcd8(0x34c)]()['x'],this[_0x4ffcd8(0x34c)]['y']=_0xa58781[_0x4ffcd8(0x34c)]()['y'];},Game_Action[_0x52da50(0x48a)][_0x52da50(0x884)]=function(_0x2d6c5b){const _0x2f0c4b=_0x52da50;if(_0x2d6c5b){const _0x4f1ad=_0x2d6c5b['skillId'];if(_0x4f1ad===0x1&&this[_0x2f0c4b(0x317)]()[_0x2f0c4b(0x983)]()!==0x1){if(_0x2f0c4b(0x56f)!=='wGmVy')this[_0x2f0c4b(0x68d)]();else{if(this['_dimmerSprite']){const _0x24bd96=this[_0x2f0c4b(0xa2a)][_0x2f0c4b(0x42c)],_0x436e5a=this[_0x2f0c4b(0x2b7)],_0x270d09=this['height'],_0x4d97ab=this[_0x2f0c4b(0x8b2)],_0x22aad3=_0x465a03[_0x2f0c4b(0x1df)](),_0x273672=_0x56cfa8[_0x2f0c4b(0x39d)]();_0x24bd96[_0x2f0c4b(0x2ef)](_0x436e5a,_0x270d09),_0x24bd96[_0x2f0c4b(0x726)](0x0,0x0,_0x436e5a,_0x4d97ab,_0x273672,_0x22aad3,!![]),_0x24bd96['fillRect'](0x0,_0x4d97ab,_0x436e5a,_0x270d09-_0x4d97ab*0x2,_0x22aad3),_0x24bd96[_0x2f0c4b(0x726)](0x0,_0x270d09-_0x4d97ab,_0x436e5a,_0x4d97ab,_0x22aad3,_0x273672,!![]),this[_0x2f0c4b(0xa2a)][_0x2f0c4b(0x694)](0x0,0x0,_0x436e5a,_0x270d09);}}}else{if(_0x4f1ad===0x2&&this[_0x2f0c4b(0x317)]()[_0x2f0c4b(0x73d)]()!==0x2){if(_0x2f0c4b(0x3a0)===_0x2f0c4b(0x519)){_0x4c026f[_0x2f0c4b(0x30e)](_0x10dace,_0xb5ecb4);const _0x211289=_0x3c37b7[_0x2f0c4b(0x442)](_0x6616c1[_0x2f0c4b(0x20a)])['clamp'](0x32,0x96),_0x353a7b=_0x30a862[_0x2f0c4b(0x751)];_0x353a7b&&(_0x353a7b[_0x2f0c4b(0x20a)]=_0x211289,_0x19c39f['playBgs'](_0x353a7b));}else this[_0x2f0c4b(0x1ad)]();}else{if(_0x2f0c4b(0x24d)===_0x2f0c4b(0x6a7)){const _0x488338=_0x2961ed[_0x2f0c4b(0x55e)];let _0x19f73f=_0x548d3d['TextStr'];if(['',_0x2f0c4b(0x8b0)][_0x2f0c4b(0x3fc)](_0x19f73f))_0x19f73f=_0x4534a7[_0x2f0c4b(0x7af)][_0x2f0c4b(0x4cc)](this);const _0x1001ce=_0x24e4e2['EnableJS'][_0x2f0c4b(0x4cc)](this),_0x41fb85=_0x213e68[_0x2f0c4b(0x1cb)]['call'](this);this[_0x2f0c4b(0x6c4)](_0x19f73f,_0x488338,_0x1001ce,_0x41fb85),this[_0x2f0c4b(0x6df)](_0x488338,_0x4d607e[_0x2f0c4b(0x904)][_0x2f0c4b(0x4e6)](this,_0x41fb85));}else this[_0x2f0c4b(0x6f3)](_0x4f1ad);}}}else{if(_0x2f0c4b(0x553)!==_0x2f0c4b(0x553)){const _0x15d333=_0x274496[_0x2f0c4b(0x9bb)][_0x2f0c4b(0x630)][_0x2f0c4b(0x7cf)][_0x2f0c4b(0x541)];if(_0x15d333>0x0)_0x45f3a0[_0x2f0c4b(0x4a1)](_0x15d333);}else this[_0x2f0c4b(0x712)]();}},Game_Actor['prototype'][_0x52da50(0x447)]=function(){const _0x463b69=_0x52da50;return this[_0x463b69(0x9e1)]()['filter'](_0x538b4b=>this['canUse'](_0x538b4b)&&this[_0x463b69(0x414)]()[_0x463b69(0x3fc)](_0x538b4b[_0x463b69(0x23b)]));},Window_Base[_0x52da50(0x48a)][_0x52da50(0x432)]=function(){const _0x5e37f5=_0x52da50;this[_0x5e37f5(0xa2a)]=new Sprite(),this[_0x5e37f5(0xa2a)]['bitmap']=new Bitmap(0x0,0x0),this[_0x5e37f5(0xa2a)]['x']=0x0,this[_0x5e37f5(0x542)](this[_0x5e37f5(0xa2a)]);},Window_Base[_0x52da50(0x48a)]['refreshDimmerBitmap']=function(){const _0x3da6fd=_0x52da50;if(this[_0x3da6fd(0xa2a)]){const _0x172ec8=this[_0x3da6fd(0xa2a)][_0x3da6fd(0x42c)],_0x2927a5=this[_0x3da6fd(0x2b7)],_0x39ea26=this[_0x3da6fd(0x394)],_0x2ab557=this[_0x3da6fd(0x8b2)],_0x4048a4=ColorManager[_0x3da6fd(0x1df)](),_0xf7e03=ColorManager[_0x3da6fd(0x39d)]();_0x172ec8[_0x3da6fd(0x2ef)](_0x2927a5,_0x39ea26),_0x172ec8[_0x3da6fd(0x726)](0x0,0x0,_0x2927a5,_0x2ab557,_0xf7e03,_0x4048a4,!![]),_0x172ec8[_0x3da6fd(0x9aa)](0x0,_0x2ab557,_0x2927a5,_0x39ea26-_0x2ab557*0x2,_0x4048a4),_0x172ec8[_0x3da6fd(0x726)](0x0,_0x39ea26-_0x2ab557,_0x2927a5,_0x2ab557,_0x4048a4,_0xf7e03,!![]),this[_0x3da6fd(0xa2a)]['setFrame'](0x0,0x0,_0x2927a5,_0x39ea26);}},Game_Actor[_0x52da50(0x48a)][_0x52da50(0x35b)]=function(){const _0xa7df13=_0x52da50;for(let _0x48d0f4=0x0;_0x48d0f4<this[_0xa7df13(0x727)]();_0x48d0f4++){const _0x597fb7=this[_0xa7df13(0x481)]();let _0x23b05d=Number[_0xa7df13(0x599)];this[_0xa7df13(0x869)](_0x48d0f4,_0x597fb7[0x0]);for(const _0x202490 of _0x597fb7){const _0x3e9b7d=_0x202490['evaluate']();_0x3e9b7d>_0x23b05d&&(_0x23b05d=_0x3e9b7d,this[_0xa7df13(0x869)](_0x48d0f4,_0x202490));}}this['setActionState'](_0xa7df13(0x492));},Window_BattleItem[_0x52da50(0x48a)][_0x52da50(0x9c9)]=function(_0x373af6){const _0x2f66e5=_0x52da50;if(BattleManager[_0x2f66e5(0x322)]()){if('bGzHe'===_0x2f66e5(0x9f9))return BattleManager[_0x2f66e5(0x322)]()[_0x2f66e5(0x6d5)](_0x373af6);else{if(_0x277021)_0x996291[_0x2f66e5(0x86e)](_0x3aac54);}}else return Window_ItemList[_0x2f66e5(0x48a)][_0x2f66e5(0x9c9)][_0x2f66e5(0x4cc)](this,_0x373af6);},VisuMZ['CoreEngine'][_0x52da50(0x6de)]=Scene_Map[_0x52da50(0x48a)][_0x52da50(0x95a)],Scene_Map[_0x52da50(0x48a)]['createSpriteset']=function(){const _0x3db432=_0x52da50;VisuMZ[_0x3db432(0x9bb)]['Scene_Map_createSpritesetFix'][_0x3db432(0x4cc)](this);const _0x334cb0=this[_0x3db432(0x4b3)][_0x3db432(0x1b3)];if(_0x334cb0)this[_0x3db432(0x1d0)](_0x334cb0);},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x59e)]=Scene_Battle[_0x52da50(0x48a)][_0x52da50(0x95a)],Scene_Battle['prototype'][_0x52da50(0x95a)]=function(){const _0x59a1c8=_0x52da50;VisuMZ['CoreEngine'][_0x59a1c8(0x59e)]['call'](this);const _0x51987e=this[_0x59a1c8(0x4b3)]['_timerSprite'];if(_0x51987e)this['addChild'](_0x51987e);},Sprite_Actor['prototype']['update']=function(){const _0x11aca7=_0x52da50;Sprite_Battler[_0x11aca7(0x48a)][_0x11aca7(0x6c5)][_0x11aca7(0x4cc)](this),this[_0x11aca7(0x562)]();if(this['_actor'])this[_0x11aca7(0x4c3)]();else{if(this['_battlerName']!==''){if(_0x11aca7(0x82c)!==_0x11aca7(0x7b1))this[_0x11aca7(0x31f)]='';else{this[_0x11aca7(0x8dd)]={};if(_0x1b69a2[_0x11aca7(0x9bb)]['Settings'][_0x11aca7(0x7cf)][_0x11aca7(0x3a8)])this[_0x11aca7(0x568)]=this['mhp'];if(_0x493d46[_0x11aca7(0x9bb)][_0x11aca7(0x630)]['QoL'][_0x11aca7(0x22b)])this['_mp']=this[_0x11aca7(0x299)];}}}},Window[_0x52da50(0x48a)]['_refreshArrows']=function(){const _0x28cbbd=_0x52da50,_0x5d1e38=this[_0x28cbbd(0x70a)],_0x2768d6=this[_0x28cbbd(0x806)],_0xd64306=0x18,_0xf7ecff=_0xd64306/0x2,_0x5e828e=0x60+_0xd64306,_0xbb562d=0x0+_0xd64306;this[_0x28cbbd(0x98b)][_0x28cbbd(0x42c)]=this[_0x28cbbd(0x2f3)],this[_0x28cbbd(0x98b)]['anchor']['x']=0.5,this[_0x28cbbd(0x98b)][_0x28cbbd(0x34c)]['y']=0.5,this[_0x28cbbd(0x98b)][_0x28cbbd(0x694)](_0x5e828e+_0xf7ecff,_0xbb562d+_0xf7ecff+_0xd64306,_0xd64306,_0xf7ecff),this[_0x28cbbd(0x98b)][_0x28cbbd(0x6e8)](Math['round'](_0x5d1e38/0x2),Math[_0x28cbbd(0x442)](_0x2768d6-_0xf7ecff)),this[_0x28cbbd(0x43f)][_0x28cbbd(0x42c)]=this[_0x28cbbd(0x2f3)],this['_upArrowSprite'][_0x28cbbd(0x34c)]['x']=0.5,this[_0x28cbbd(0x43f)]['anchor']['y']=0.5,this[_0x28cbbd(0x43f)]['setFrame'](_0x5e828e+_0xf7ecff,_0xbb562d,_0xd64306,_0xf7ecff),this[_0x28cbbd(0x43f)][_0x28cbbd(0x6e8)](Math[_0x28cbbd(0x442)](_0x5d1e38/0x2),Math[_0x28cbbd(0x442)](_0xf7ecff));},Window[_0x52da50(0x48a)][_0x52da50(0x794)]=function(){const _0x1677f3=_0x52da50,_0x31b8b3=0x90,_0x3d7ac4=0x60,_0x293b2c=0x18;this[_0x1677f3(0x85e)]['bitmap']=this[_0x1677f3(0x2f3)],this[_0x1677f3(0x85e)][_0x1677f3(0x34c)]['x']=0.5,this[_0x1677f3(0x85e)][_0x1677f3(0x34c)]['y']=0x1,this[_0x1677f3(0x85e)][_0x1677f3(0x6e8)](Math['round'](this[_0x1677f3(0x70a)]/0x2),this['_height']),this[_0x1677f3(0x85e)][_0x1677f3(0x694)](_0x31b8b3,_0x3d7ac4,_0x293b2c,_0x293b2c),this['_pauseSignSprite']['alpha']=0xff;},Window[_0x52da50(0x48a)][_0x52da50(0x1de)]=function(){const _0x33fbf0=_0x52da50,_0x2e2a5a=this[_0x33fbf0(0x7e3)][_0x33fbf0(0x92c)][_0x33fbf0(0x72d)](new Point(0x0,0x0)),_0x1c989e=this[_0x33fbf0(0x7e3)]['filterArea'];_0x1c989e['x']=_0x2e2a5a['x']+this[_0x33fbf0(0x23a)]['x'],_0x1c989e['y']=_0x2e2a5a['y']+this[_0x33fbf0(0x23a)]['y'],_0x1c989e['width']=Math['ceil'](this[_0x33fbf0(0x947)]*this['scale']['x']),_0x1c989e[_0x33fbf0(0x394)]=Math[_0x33fbf0(0x8ab)](this[_0x33fbf0(0x6bc)]*this['scale']['y']);},Window[_0x52da50(0x48a)]['_refreshBack']=function(){const _0x43ceb0=_0x52da50,_0xabba6b=this[_0x43ceb0(0x753)],_0x5be920=Math['max'](0x0,this[_0x43ceb0(0x70a)]-_0xabba6b*0x2),_0x49f389=Math[_0x43ceb0(0x31b)](0x0,this[_0x43ceb0(0x806)]-_0xabba6b*0x2),_0x46c20c=this[_0x43ceb0(0x221)],_0x4dfc1e=_0x46c20c[_0x43ceb0(0x9b2)][0x0];_0x46c20c['bitmap']=this[_0x43ceb0(0x2f3)],_0x46c20c[_0x43ceb0(0x694)](0x0,0x0,0x60,0x60),_0x46c20c['move'](_0xabba6b,_0xabba6b),_0x46c20c[_0x43ceb0(0x752)]['x']=_0x5be920/0x60,_0x46c20c['scale']['y']=_0x49f389/0x60,_0x4dfc1e[_0x43ceb0(0x42c)]=this[_0x43ceb0(0x2f3)],_0x4dfc1e['setFrame'](0x0,0x60,0x60,0x60),_0x4dfc1e['move'](0x0,0x0,_0x5be920,_0x49f389),_0x4dfc1e[_0x43ceb0(0x752)]['x']=0x1/_0x46c20c[_0x43ceb0(0x752)]['x'],_0x4dfc1e[_0x43ceb0(0x752)]['y']=0x1/_0x46c20c['scale']['y'],_0x46c20c['setColorTone'](this[_0x43ceb0(0x37d)]);},Game_Temp['prototype']['sceneTerminationClearEffects']=function(){const _0x1417ae=_0x52da50;this[_0x1417ae(0x7fe)]=[],this[_0x1417ae(0x485)]=[],this['_pointAnimationQueue']=[],this[_0x1417ae(0x5cb)]=[];},VisuMZ['CoreEngine']['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x52da50(0x48a)]['terminate'],Scene_Base[_0x52da50(0x48a)][_0x52da50(0x60e)]=function(){const _0x70b335=_0x52da50;if($gameTemp)$gameTemp[_0x70b335(0x431)]();VisuMZ[_0x70b335(0x9bb)][_0x70b335(0x7c0)]['call'](this);},Bitmap['prototype'][_0x52da50(0x225)]=function(_0x395ed6){const _0x4fdd94=_0x52da50,_0x8f1a75=this[_0x4fdd94(0x5c5)];_0x8f1a75['save'](),_0x8f1a75['font']=this[_0x4fdd94(0x8ce)]();const _0x35b669=_0x8f1a75[_0x4fdd94(0x341)](_0x395ed6)['width'];return _0x8f1a75['restore'](),_0x35b669;},Window_Message[_0x52da50(0x48a)][_0x52da50(0x2e8)]=function(_0x2bbd27){const _0x2bc2f0=_0x52da50;return this[_0x2bc2f0(0x490)]()?this[_0x2bc2f0(0x9ca)][_0x2bc2f0(0x225)](_0x2bbd27):_0x2bc2f0(0x9f2)===_0x2bc2f0(0x652)?_0x484e7f[_0x2bc2f0(0x610)][_0x2bc2f0(0x8b5)][_0x2bc2f0(0x4cc)](this):Window_Base[_0x2bc2f0(0x48a)][_0x2bc2f0(0x2e8)][_0x2bc2f0(0x4cc)](this,_0x2bbd27);},Window_Message[_0x52da50(0x48a)][_0x52da50(0x490)]=function(){const _0x56c1b2=_0x52da50;return VisuMZ[_0x56c1b2(0x9bb)][_0x56c1b2(0x630)][_0x56c1b2(0x7cf)][_0x56c1b2(0x879)]??!![];},VisuMZ['CoreEngine']['Game_Action_numRepeats']=Game_Action[_0x52da50(0x48a)][_0x52da50(0x2d5)],Game_Action[_0x52da50(0x48a)][_0x52da50(0x2d5)]=function(){const _0x5d6815=_0x52da50;return this[_0x5d6815(0x231)]()?_0x5d6815(0x207)===_0x5d6815(0x207)?VisuMZ[_0x5d6815(0x9bb)]['Game_Action_numRepeats'][_0x5d6815(0x4cc)](this):_0x53a2ef[_0x5d6815(0x9bb)]['Settings'][_0x5d6815(0x57d)]['GoldMax']:0x0;},VisuMZ['CoreEngine'][_0x52da50(0x92e)]=Game_Action['prototype'][_0x52da50(0x68d)],Game_Action['prototype'][_0x52da50(0x68d)]=function(){const _0x28e9e5=_0x52da50;this[_0x28e9e5(0x317)]()&&this['subject']()[_0x28e9e5(0x483)]()?VisuMZ['CoreEngine'][_0x28e9e5(0x92e)][_0x28e9e5(0x4cc)](this):this[_0x28e9e5(0x712)]();},Sprite_Name['prototype'][_0x52da50(0x486)]=function(){return 0x24;},Sprite_Name[_0x52da50(0x48a)][_0x52da50(0x6e9)]=function(){const _0x221560=_0x52da50,_0x40fd70=this[_0x221560(0x215)](),_0x20fa1e=this[_0x221560(0x532)](),_0x41acdd=this['bitmapHeight']();this[_0x221560(0x48b)](),this[_0x221560(0x42c)][_0x221560(0x712)](),this['bitmap'][_0x221560(0x46a)](_0x40fd70,0x4,0x0,_0x20fa1e,_0x41acdd,'left');},Bitmap[_0x52da50(0x48a)][_0x52da50(0x46a)]=function(_0x2dab08,_0x4b823e,_0x5574bd,_0x4100c9,_0x5876c1,_0x168e6a){const _0x1f5524=_0x52da50,_0x4ed308=this[_0x1f5524(0x5c5)],_0x10fad0=_0x4ed308['globalAlpha'];_0x4100c9=_0x4100c9||0xffffffff;let _0x56a496=_0x4b823e,_0x28448a=Math[_0x1f5524(0x442)](_0x5574bd+0x18/0x2+this[_0x1f5524(0x830)]*0.35);if(_0x168e6a==='center'){if('lumEs'==='HmcBV')return this['useFontWidthFix']()?this[_0x1f5524(0x9ca)][_0x1f5524(0x225)](_0xadfde8):_0x5e9bdd[_0x1f5524(0x48a)][_0x1f5524(0x2e8)][_0x1f5524(0x4cc)](this,_0x4ac25d);else _0x56a496+=_0x4100c9/0x2;}_0x168e6a===_0x1f5524(0x1c8)&&(_0x1f5524(0x5f2)!==_0x1f5524(0x5f2)?_0x4e2c6a['VisuMZ_2_BattleSystemSTB']&&(this[_0x1f5524(0x45c)]=_0x1f5524(0x98f)):_0x56a496+=_0x4100c9),_0x4ed308[_0x1f5524(0x307)](),_0x4ed308[_0x1f5524(0x53e)]=this[_0x1f5524(0x8ce)](),_0x4ed308[_0x1f5524(0xa13)]=_0x168e6a,_0x4ed308[_0x1f5524(0x9fe)]=_0x1f5524(0x944),_0x4ed308[_0x1f5524(0x9e9)]=0x1,this[_0x1f5524(0x903)](_0x2dab08,_0x56a496,_0x28448a,_0x4100c9),_0x4ed308[_0x1f5524(0x9e9)]=_0x10fad0,this[_0x1f5524(0x4db)](_0x2dab08,_0x56a496,_0x28448a,_0x4100c9),_0x4ed308['restore'](),this[_0x1f5524(0x66f)][_0x1f5524(0x6c5)]();},VisuMZ[_0x52da50(0x9bb)][_0x52da50(0x690)]=BattleManager[_0x52da50(0x57f)],BattleManager[_0x52da50(0x57f)]=function(_0x518119){const _0x21c4b2=_0x52da50;if(this['_action'][_0x21c4b2(0x9d9)]())return![];return VisuMZ[_0x21c4b2(0x9bb)][_0x21c4b2(0x690)][_0x21c4b2(0x4cc)](this,_0x518119);},BattleManager[_0x52da50(0x67e)]=function(){const _0x515438=_0x52da50;if(this['_subject'])this[_0x515438(0x7d3)]['endAction'](this[_0x515438(0x845)]);this['_phase']='turn',this[_0x515438(0x845)]&&this[_0x515438(0x845)][_0x515438(0x727)]()===0x0&&(this['endBattlerActions'](this[_0x515438(0x845)]),this[_0x515438(0x845)]=null);},Bitmap[_0x52da50(0x48a)][_0x52da50(0x301)]=function(){const _0x1d1384=_0x52da50;this['_image']=new Image(),this[_0x1d1384(0x4a0)]['onload']=this[_0x1d1384(0x952)][_0x1d1384(0x4e6)](this),this[_0x1d1384(0x4a0)][_0x1d1384(0x90c)]=this[_0x1d1384(0x51c)][_0x1d1384(0x4e6)](this),this[_0x1d1384(0x4f3)](),this[_0x1d1384(0x195)]=_0x1d1384(0x6c0);if(Utils[_0x1d1384(0xa0b)]())_0x1d1384(0x1a7)!==_0x1d1384(0x8cf)?this[_0x1d1384(0x5e6)]():(_0x20f187['CoreEngine'][_0x1d1384(0x420)][_0x1d1384(0x4cc)](this,_0x58a033,_0x2d1157,_0x2a90cf),_0x253b3a[_0x1d1384(0x79f)](![]));else{if(_0x1d1384(0x9b4)!=='sgmUJ')return _0x42f780[_0x1d1384(0x610)][_0x1d1384(0x1ec)]['call'](this);else{this[_0x1d1384(0x4a0)]['src']=this['_url'];if(![]&&this[_0x1d1384(0x4a0)][_0x1d1384(0x2b7)]>0x0){if(_0x1d1384(0x686)!==_0x1d1384(0x8e1))this[_0x1d1384(0x4a0)]['onload']=null,this['_onLoad']();else return _0x2b4fdc[_0x1d1384(0x611)]();}}}},Scene_Skill[_0x52da50(0x48a)][_0x52da50(0x70e)]=function(){const _0x29de1b=_0x52da50;Scene_MenuBase[_0x29de1b(0x48a)][_0x29de1b(0x70e)][_0x29de1b(0x4cc)](this),this[_0x29de1b(0x81e)](),this[_0x29de1b(0x96a)][_0x29de1b(0x3b0)](),this['_itemWindow'][_0x29de1b(0x433)](),this[_0x29de1b(0x254)][_0x29de1b(0x5aa)]();},Scene_Skill[_0x52da50(0x48a)]['arePageButtonsEnabled']=function(){const _0x7a22e5=_0x52da50;return this[_0x7a22e5(0x254)]&&this['_skillTypeWindow'][_0x7a22e5(0x6f4)];},Game_Map[_0x52da50(0x48a)]['checkPassage']=function(_0x767753,_0x56e273,_0x5da124){const _0x214b9c=_0x52da50,_0x19af2f=this[_0x214b9c(0x8ea)](),_0x1ac2ac=this[_0x214b9c(0x887)](_0x767753,_0x56e273);for(const _0x57c925 of _0x1ac2ac){const _0x241ced=_0x19af2f[_0x57c925];if(_0x241ced===undefined||_0x241ced===null){if(_0x214b9c(0x79a)===_0x214b9c(0x6f5)){const _0x2b67a3=this[_0x214b9c(0x1c3)]();this['_commandWindow']=new _0x370a75(_0x2b67a3),this[_0x214b9c(0x846)]['setHandler']('cancel',this[_0x214b9c(0x821)][_0x214b9c(0x4e6)](this)),this[_0x214b9c(0x2ff)](this[_0x214b9c(0x846)]),this[_0x214b9c(0x846)][_0x214b9c(0x56e)](_0x2c3481[_0x214b9c(0x610)][_0x214b9c(0x98a)]);}else{if($gameTemp['isPlaytest']()&&!DataManager[_0x214b9c(0xa05)]()){let _0x5bee43='Current\x20tileset\x20has\x20incomplete\x20flag\x20data.'+'\x0a';_0x5bee43+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0x5bee43+=_0x214b9c(0x639),Imported[_0x214b9c(0x71c)]||Imported[_0x214b9c(0x1f0)]?(alert(_0x5bee43),SceneManager['exit']()):(console['log'](_0x5bee43),!$gameTemp['_showDevTools']&&(_0x214b9c(0x68c)!==_0x214b9c(0x7ac)?($gameTemp[_0x214b9c(0x399)]=!![],SceneManager[_0x214b9c(0x314)]()):this['_helpWindow'][_0x214b9c(0x56e)](_0x4f09e1['layoutSettings'][_0x214b9c(0x333)])));}}}if((_0x241ced&0x10)!==0x0)continue;if((_0x241ced&_0x5da124)===0x0)return!![];if((_0x241ced&_0x5da124)===_0x5da124){if(_0x214b9c(0x5b0)!==_0x214b9c(0x5b0)){this[_0x214b9c(0x2fe)]['remove'](_0x49f3bf),this[_0x214b9c(0x8b4)](_0x1a9f47);for(const _0x3e1a62 of _0x392a13[_0x214b9c(0x9b8)]){_0x3e1a62[_0x214b9c(0x5be)]&&_0x3e1a62[_0x214b9c(0x5be)]();}_0x1f4a35[_0x214b9c(0x8fe)]();}else return![];}}return![];},Sprite_Animation[_0x52da50(0x48a)]['saveViewport']=function(_0x1edac9){const _0x15b3da=_0x52da50;!this[_0x15b3da(0x18b)]&&(this[_0x15b3da(0x18b)]=_0x1edac9['gl'][_0x15b3da(0x604)](_0x1edac9['gl'][_0x15b3da(0x5a6)]));};