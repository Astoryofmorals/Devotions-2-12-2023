//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.37;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.37] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

function _0x4cbc(_0x4bbc7e,_0x4d8051){const _0x4a18e0=_0x4a18();return _0x4cbc=function(_0x4cbc2a,_0xaec46a){_0x4cbc2a=_0x4cbc2a-0x144;let _0x3d491b=_0x4a18e0[_0x4cbc2a];return _0x3d491b;},_0x4cbc(_0x4bbc7e,_0x4d8051);}const _0x30c775=_0x4cbc;(function(_0x5524f3,_0x5a2321){const _0x3aa9d6=_0x4cbc,_0x568272=_0x5524f3();while(!![]){try{const _0x4de661=-parseInt(_0x3aa9d6(0x1c7))/0x1*(-parseInt(_0x3aa9d6(0x28b))/0x2)+-parseInt(_0x3aa9d6(0x19c))/0x3*(-parseInt(_0x3aa9d6(0x1c5))/0x4)+parseInt(_0x3aa9d6(0x31d))/0x5+-parseInt(_0x3aa9d6(0x1b5))/0x6*(-parseInt(_0x3aa9d6(0x2aa))/0x7)+parseInt(_0x3aa9d6(0x194))/0x8+parseInt(_0x3aa9d6(0x2b2))/0x9+-parseInt(_0x3aa9d6(0x1d4))/0xa*(parseInt(_0x3aa9d6(0x42a))/0xb);if(_0x4de661===_0x5a2321)break;else _0x568272['push'](_0x568272['shift']());}catch(_0x240a9c){_0x568272['push'](_0x568272['shift']());}}}(_0x4a18,0xbf777));var label=_0x30c775(0x293),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x30c775(0x329)](function(_0xe02fbc){const _0x1708fa=_0x30c775;return _0xe02fbc[_0x1708fa(0x33c)]&&_0xe02fbc[_0x1708fa(0x2ba)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x30c775(0x2ef)]=VisuMZ[label][_0x30c775(0x2ef)]||{},VisuMZ[_0x30c775(0x3ac)]=function(_0xbabf51,_0x5ea1eb){const _0x3a9ef5=_0x30c775;for(const _0xd3d141 in _0x5ea1eb){if(_0xd3d141[_0x3a9ef5(0x298)](/(.*):(.*)/i)){const _0xa6cac5=String(RegExp['$1']),_0x53ed3d=String(RegExp['$2'])[_0x3a9ef5(0x455)]()[_0x3a9ef5(0x46b)]();let _0x445dce,_0xbad337,_0x266d3a;switch(_0x53ed3d){case _0x3a9ef5(0x3cf):_0x445dce=_0x5ea1eb[_0xd3d141]!==''?Number(_0x5ea1eb[_0xd3d141]):0x0;break;case _0x3a9ef5(0x2fd):_0xbad337=_0x5ea1eb[_0xd3d141]!==''?JSON[_0x3a9ef5(0x306)](_0x5ea1eb[_0xd3d141]):[],_0x445dce=_0xbad337[_0x3a9ef5(0x17e)](_0x1a6d2f=>Number(_0x1a6d2f));break;case _0x3a9ef5(0x3da):_0x445dce=_0x5ea1eb[_0xd3d141]!==''?eval(_0x5ea1eb[_0xd3d141]):null;break;case _0x3a9ef5(0x3b2):_0xbad337=_0x5ea1eb[_0xd3d141]!==''?JSON[_0x3a9ef5(0x306)](_0x5ea1eb[_0xd3d141]):[],_0x445dce=_0xbad337[_0x3a9ef5(0x17e)](_0x2f5b8b=>eval(_0x2f5b8b));break;case _0x3a9ef5(0x323):_0x445dce=_0x5ea1eb[_0xd3d141]!==''?JSON['parse'](_0x5ea1eb[_0xd3d141]):'';break;case'ARRAYJSON':_0xbad337=_0x5ea1eb[_0xd3d141]!==''?JSON['parse'](_0x5ea1eb[_0xd3d141]):[],_0x445dce=_0xbad337[_0x3a9ef5(0x17e)](_0x10ed04=>JSON['parse'](_0x10ed04));break;case _0x3a9ef5(0x3e5):_0x445dce=_0x5ea1eb[_0xd3d141]!==''?new Function(JSON['parse'](_0x5ea1eb[_0xd3d141])):new Function(_0x3a9ef5(0x199));break;case'ARRAYFUNC':_0xbad337=_0x5ea1eb[_0xd3d141]!==''?JSON[_0x3a9ef5(0x306)](_0x5ea1eb[_0xd3d141]):[],_0x445dce=_0xbad337[_0x3a9ef5(0x17e)](_0x26d127=>new Function(JSON[_0x3a9ef5(0x306)](_0x26d127)));break;case _0x3a9ef5(0x25c):_0x445dce=_0x5ea1eb[_0xd3d141]!==''?String(_0x5ea1eb[_0xd3d141]):'';break;case _0x3a9ef5(0x3ef):_0xbad337=_0x5ea1eb[_0xd3d141]!==''?JSON[_0x3a9ef5(0x306)](_0x5ea1eb[_0xd3d141]):[],_0x445dce=_0xbad337[_0x3a9ef5(0x17e)](_0x6765fc=>String(_0x6765fc));break;case _0x3a9ef5(0x35b):_0x266d3a=_0x5ea1eb[_0xd3d141]!==''?JSON[_0x3a9ef5(0x306)](_0x5ea1eb[_0xd3d141]):{},_0xbabf51[_0xa6cac5]={},VisuMZ[_0x3a9ef5(0x3ac)](_0xbabf51[_0xa6cac5],_0x266d3a);continue;case _0x3a9ef5(0x402):_0xbad337=_0x5ea1eb[_0xd3d141]!==''?JSON['parse'](_0x5ea1eb[_0xd3d141]):[],_0x445dce=_0xbad337[_0x3a9ef5(0x17e)](_0x540757=>VisuMZ[_0x3a9ef5(0x3ac)]({},JSON[_0x3a9ef5(0x306)](_0x540757)));break;default:continue;}_0xbabf51[_0xa6cac5]=_0x445dce;}}return _0xbabf51;},(_0x3d5807=>{const _0x49817f=_0x30c775,_0x478fc5=_0x3d5807['name'];for(const _0x5e5d3c of dependencies){if(_0x49817f(0x1d8)!==_0x49817f(0x1d8))_0x1e02f0[_0x49817f(0x293)][_0x49817f(0x2ef)][_0x49817f(0x3aa)][_0x49817f(0x47d)][_0x49817f(0x2a8)](this,_0x51f7a0);else{if(!Imported[_0x5e5d3c]){alert(_0x49817f(0x41e)[_0x49817f(0x1dd)](_0x478fc5,_0x5e5d3c)),SceneManager[_0x49817f(0x334)]();break;}}}const _0xaa7eaa=_0x3d5807['description'];if(_0xaa7eaa[_0x49817f(0x298)](/\[Version[ ](.*?)\]/i)){const _0x5938e=Number(RegExp['$1']);if(_0x5938e!==VisuMZ[label][_0x49817f(0x347)]){if(_0x49817f(0x38a)!==_0x49817f(0x38a)){if(!_0x269d96[_0x49817f(0x177)](_0x2cacac))return!![];}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x478fc5,_0x5938e)),SceneManager[_0x49817f(0x334)]();}}if(_0xaa7eaa[_0x49817f(0x298)](/\[Tier[ ](\d+)\]/i)){const _0x43ccda=Number(RegExp['$1']);if(_0x43ccda<tier)alert(_0x49817f(0x18b)[_0x49817f(0x1dd)](_0x478fc5,_0x43ccda,tier)),SceneManager[_0x49817f(0x334)]();else{if('wqzWA'==='wqzWA')tier=Math[_0x49817f(0x156)](_0x43ccda,tier);else{if(!_0x2a998e[_0x49817f(0x441)](_0x4682fe))return!![];}}}VisuMZ[_0x49817f(0x3ac)](VisuMZ[label][_0x49817f(0x2ef)],_0x3d5807['parameters']);})(pluginData),VisuMZ[_0x30c775(0x293)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x30c775(0x150)][_0x30c775(0x370)],Scene_Boot['prototype'][_0x30c775(0x370)]=function(){const _0x26afb9=_0x30c775;VisuMZ[_0x26afb9(0x293)][_0x26afb9(0x380)][_0x26afb9(0x2a8)](this),this[_0x26afb9(0x297)](),VisuMZ[_0x26afb9(0x293)][_0x26afb9(0x459)]();},Scene_Boot[_0x30c775(0x150)][_0x30c775(0x297)]=function(){const _0x1e259e=_0x30c775;if(VisuMZ['ParseAllNotetags'])return;this[_0x1e259e(0x2d3)](),this[_0x1e259e(0x219)]();},Scene_Boot[_0x30c775(0x150)][_0x30c775(0x2d3)]=function(){const _0x3c255a=_0x30c775;for(const _0x420bd8 of $dataSkills){if(!_0x420bd8)continue;VisuMZ[_0x3c255a(0x293)][_0x3c255a(0x307)](_0x420bd8),VisuMZ[_0x3c255a(0x293)][_0x3c255a(0x1af)](_0x420bd8);}},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x1e6bb8=_0x30c775;for(const _0x2e549d of $dataStates){if(!_0x2e549d)continue;VisuMZ[_0x1e6bb8(0x293)][_0x1e6bb8(0x3fa)](_0x2e549d),VisuMZ['SkillsStatesCore'][_0x1e6bb8(0x260)](_0x2e549d),VisuMZ[_0x1e6bb8(0x293)][_0x1e6bb8(0x17f)](_0x2e549d),VisuMZ['SkillsStatesCore'][_0x1e6bb8(0x1a3)](_0x2e549d);}},VisuMZ['SkillsStatesCore'][_0x30c775(0x31b)]=VisuMZ[_0x30c775(0x31b)],VisuMZ['ParseSkillNotetags']=function(_0x582168){const _0xd2782c=_0x30c775;VisuMZ[_0xd2782c(0x293)][_0xd2782c(0x31b)][_0xd2782c(0x2a8)](this,_0x582168),VisuMZ['SkillsStatesCore'][_0xd2782c(0x307)](_0x582168),VisuMZ[_0xd2782c(0x293)]['Parse_Notetags_Skill_JS'](_0x582168);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x393)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x30c775(0x393)]=function(_0x284ea3){const _0x1c0940=_0x30c775;VisuMZ[_0x1c0940(0x293)][_0x1c0940(0x393)]['call'](this,_0x284ea3),VisuMZ[_0x1c0940(0x293)][_0x1c0940(0x3fa)](_0x284ea3),VisuMZ[_0x1c0940(0x293)][_0x1c0940(0x260)](_0x284ea3),VisuMZ['SkillsStatesCore'][_0x1c0940(0x17f)](_0x284ea3),VisuMZ[_0x1c0940(0x293)][_0x1c0940(0x1a3)](_0x284ea3);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x307)]=function(_0xe65e7a){const _0x37e0c1=_0x30c775,_0x8140b6=_0xe65e7a[_0x37e0c1(0x283)];_0x8140b6['match'](/<MP COST:[ ](\d+)>/i)&&(_0xe65e7a[_0x37e0c1(0x399)]=Number(RegExp['$1']));if(_0x8140b6['match'](/<TP COST:[ ](\d+)>/i)){if(_0x37e0c1(0x24b)!==_0x37e0c1(0x186))_0xe65e7a[_0x37e0c1(0x172)]=Number(RegExp['$1']);else{const _0x7e1b57=_0x11b952(_0x3da5d1['$1']);_0x7e1b57<_0x3915f0?(_0xdd0708(_0x37e0c1(0x18b)[_0x37e0c1(0x1dd)](_0x160655,_0x7e1b57,_0x23b9fb)),_0x58889d[_0x37e0c1(0x334)]()):_0x323d82=_0x34e7eb['max'](_0x7e1b57,_0x2edbe0);}}},VisuMZ[_0x30c775(0x293)][_0x30c775(0x146)]={},VisuMZ['SkillsStatesCore'][_0x30c775(0x3e3)]={},VisuMZ[_0x30c775(0x293)]['Parse_Notetags_Skill_JS']=function(_0x30feff){const _0x2b29ef=_0x30c775,_0x98f868=_0x30feff[_0x2b29ef(0x283)];if(_0x98f868['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x579878=String(RegExp['$1']),_0x1380ca=_0x2b29ef(0x222)[_0x2b29ef(0x1dd)](_0x579878);VisuMZ[_0x2b29ef(0x293)][_0x2b29ef(0x146)][_0x30feff['id']]=new Function(_0x2b29ef(0x178),_0x1380ca);}if(_0x98f868[_0x2b29ef(0x298)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x2b29ef(0x2ac)!=='EjCuf'){if(!_0x18d53f[_0x2b29ef(0x441)](_0x431732))return![];}else{const _0x3332a8=String(RegExp['$1']),_0x5cc7a3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2b29ef(0x1dd)](_0x3332a8);VisuMZ[_0x2b29ef(0x293)][_0x2b29ef(0x3e3)][_0x30feff['id']]=new Function('skill',_0x5cc7a3);}}},VisuMZ[_0x30c775(0x293)][_0x30c775(0x3fa)]=function(_0x211d0e){const _0x4b59a1=_0x30c775;_0x211d0e['categories']=[_0x4b59a1(0x23a),_0x4b59a1(0x3a5)];const _0x16e8d2=_0x211d0e[_0x4b59a1(0x283)],_0x4f626f=_0x16e8d2[_0x4b59a1(0x298)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x4f626f){if('RTQXm'!==_0x4b59a1(0x451))return this[_0x4b59a1(0x1ce)]();else for(const _0x52aedc of _0x4f626f){if(_0x4b59a1(0x198)!==_0x4b59a1(0x183)){_0x52aedc[_0x4b59a1(0x298)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0xcee8e6=String(RegExp['$1'])['toUpperCase']()[_0x4b59a1(0x46b)]()['split'](',');for(const _0x5c9e9f of _0xcee8e6){_0x4b59a1(0x24a)===_0x4b59a1(0x34a)?this['_statusWindow'][_0x4b59a1(0x216)](this[_0x4b59a1(0x3e7)](0x0)):_0x211d0e['categories'][_0x4b59a1(0x25f)](_0x5c9e9f[_0x4b59a1(0x46b)]());}}else{const _0x1a0f45=_0x592b68['SkillsStatesCore']['Settings']['Gauge'];return _0x1a0f45['ValueFontMainType']===_0x4b59a1(0x38e)?_0x22bfb5[_0x4b59a1(0x2f5)]()-0x6:_0xe24d7e[_0x4b59a1(0x2f5)]()-0x2;}}}if(_0x16e8d2[_0x4b59a1(0x298)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x4b59a1(0x2d9)===_0x4b59a1(0x3ed))this[_0x4b59a1(0x45a)]='';else{const _0x17c2af=RegExp['$1'][_0x4b59a1(0x231)](/[\r\n]+/);for(const _0x472258 of _0x17c2af){_0x211d0e['categories'][_0x4b59a1(0x25f)](_0x472258[_0x4b59a1(0x455)]()[_0x4b59a1(0x46b)]());}}}if(_0x16e8d2[_0x4b59a1(0x298)](/<POSITIVE STATE>/i)){if(_0x4b59a1(0x1a5)!=='rAvmu')_0x211d0e['categories'][_0x4b59a1(0x25f)]('POSITIVE');else return _0x4d6bb7[_0x179924['id']][_0x4b59a1(0x2a8)](this,_0xebc5dc);}if(_0x16e8d2[_0x4b59a1(0x298)](/<NEGATIVE STATE>/i)){if('CfoHX'==='rQIvD'){if(_0x2cf994[_0x4b59a1(0x441)](_0x29b51f))return!![];}else _0x211d0e['categories']['push']('NEGATIVE');}},VisuMZ[_0x30c775(0x293)][_0x30c775(0x32f)]={},VisuMZ[_0x30c775(0x293)][_0x30c775(0x260)]=function(_0x14ec52){const _0x56d529=_0x30c775,_0x281d05=_0x14ec52['note'];if(_0x281d05[_0x56d529(0x298)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x1bb2fe=String(RegExp['$1']),_0x27c997=_0x56d529(0x17a)['format'](_0x1bb2fe);VisuMZ[_0x56d529(0x293)]['statePassiveConditionJS'][_0x14ec52['id']]=new Function(_0x56d529(0x3bb),_0x27c997);}},VisuMZ[_0x30c775(0x293)]['stateHpSlipDamageJS']={},VisuMZ[_0x30c775(0x293)]['stateHpSlipHealJS']={},VisuMZ[_0x30c775(0x293)][_0x30c775(0x45d)]={},VisuMZ[_0x30c775(0x293)][_0x30c775(0x227)]={},VisuMZ['SkillsStatesCore'][_0x30c775(0x1a4)]={},VisuMZ[_0x30c775(0x293)][_0x30c775(0x30a)]={},VisuMZ[_0x30c775(0x293)]['Parse_Notetags_State_SlipEffectJS']=function(_0x59a90a){const _0x5da71b=_0x30c775,_0xc9c167=_0x59a90a[_0x5da71b(0x283)],_0x2cd21e=_0x5da71b(0x1b6);if(_0xc9c167[_0x5da71b(0x298)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){if(_0x5da71b(0x450)!==_0x5da71b(0x450)){if(!_0x18a71d[_0x5da71b(0x441)](_0x2f3036))return![];}else{const _0x332979=String(RegExp['$1']),_0x462430=_0x2cd21e[_0x5da71b(0x1dd)](_0x332979,_0x5da71b(0x300),-0x1,_0x5da71b(0x476));VisuMZ['SkillsStatesCore']['stateHpSlipDamageJS'][_0x59a90a['id']]=new Function(_0x5da71b(0x2cf),_0x462430);}}else{if(_0xc9c167['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x45ee58=String(RegExp['$1']),_0x19b105=_0x2cd21e[_0x5da71b(0x1dd)](_0x45ee58,_0x5da71b(0x1bb),0x1,_0x5da71b(0x476));VisuMZ['SkillsStatesCore'][_0x5da71b(0x40d)][_0x59a90a['id']]=new Function(_0x5da71b(0x2cf),_0x19b105);}}if(_0xc9c167[_0x5da71b(0x298)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x2af56d=String(RegExp['$1']),_0x39b747=_0x2cd21e[_0x5da71b(0x1dd)](_0x2af56d,_0x5da71b(0x300),-0x1,'slipMp');VisuMZ['SkillsStatesCore'][_0x5da71b(0x45d)][_0x59a90a['id']]=new Function('stateId',_0x39b747);}else{if(_0xc9c167[_0x5da71b(0x298)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x221c22=String(RegExp['$1']),_0x518b97=_0x2cd21e['format'](_0x221c22,_0x5da71b(0x1bb),0x1,'slipMp');VisuMZ[_0x5da71b(0x293)][_0x5da71b(0x227)][_0x59a90a['id']]=new Function('stateId',_0x518b97);}}if(_0xc9c167[_0x5da71b(0x298)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x318334=String(RegExp['$1']),_0x4f6952=_0x2cd21e[_0x5da71b(0x1dd)](_0x318334,_0x5da71b(0x300),-0x1,_0x5da71b(0x23c));VisuMZ[_0x5da71b(0x293)][_0x5da71b(0x1a4)][_0x59a90a['id']]=new Function(_0x5da71b(0x2cf),_0x4f6952);}else{if(_0xc9c167['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x38f1a2=String(RegExp['$1']),_0x20de76=_0x2cd21e[_0x5da71b(0x1dd)](_0x38f1a2,_0x5da71b(0x1bb),0x1,'slipTp');VisuMZ[_0x5da71b(0x293)]['stateTpSlipHealJS'][_0x59a90a['id']]=new Function('stateId',_0x20de76);}}},VisuMZ['SkillsStatesCore'][_0x30c775(0x406)]={},VisuMZ[_0x30c775(0x293)][_0x30c775(0x444)]={},VisuMZ['SkillsStatesCore'][_0x30c775(0x401)]={},VisuMZ[_0x30c775(0x293)][_0x30c775(0x1a3)]=function(_0x89c28e){const _0x366d5a=_0x30c775,_0x51250f=_0x89c28e[_0x366d5a(0x283)],_0xfe1449=_0x366d5a(0x214);if(_0x51250f[_0x366d5a(0x298)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x441641=String(RegExp['$1']),_0x83296f=_0xfe1449['format'](_0x441641);VisuMZ['SkillsStatesCore'][_0x366d5a(0x406)][_0x89c28e['id']]=new Function(_0x366d5a(0x2cf),_0x83296f);}if(_0x51250f['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x400495=String(RegExp['$1']),_0x5bd848=_0xfe1449['format'](_0x400495);VisuMZ[_0x366d5a(0x293)][_0x366d5a(0x444)][_0x89c28e['id']]=new Function(_0x366d5a(0x2cf),_0x5bd848);}if(_0x51250f['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x5df31b=String(RegExp['$1']),_0xbb709a=_0xfe1449[_0x366d5a(0x1dd)](_0x5df31b);VisuMZ[_0x366d5a(0x293)][_0x366d5a(0x401)][_0x89c28e['id']]=new Function(_0x366d5a(0x2cf),_0xbb709a);}},VisuMZ['SkillsStatesCore'][_0x30c775(0x459)]=function(){const _0x48a459=_0x30c775;if(!VisuMZ['SkillsStatesCore']['Settings'][_0x48a459(0x371)][_0x48a459(0x2e5)])return;for(const _0x1dd7ca of $dataStates){if(_0x48a459(0x23e)===_0x48a459(0x3d6)){if(typeof _0xbf1bcd!=='number')_0x4ed522=_0x48efbf['id'];const _0x36e2e9=this['stateData'](_0x59afca);return _0x36e2e9[_0x2e026f];}else{if(!_0x1dd7ca)continue;_0x1dd7ca[_0x48a459(0x3b7)]===0x4&&_0x1dd7ca[_0x48a459(0x302)]===0x1&&(_0x1dd7ca[_0x48a459(0x302)]=0x2);}}},DataManager[_0x30c775(0x413)]=function(_0x277866){const _0x1373eb=_0x30c775;_0x277866=_0x277866['toUpperCase']()[_0x1373eb(0x46b)](),this['_classIDs']=this[_0x1373eb(0x375)]||{};if(this[_0x1373eb(0x375)][_0x277866])return this[_0x1373eb(0x375)][_0x277866];for(const _0x3c8cc6 of $dataClasses){if(!_0x3c8cc6)continue;let _0x549081=_0x3c8cc6[_0x1373eb(0x456)];_0x549081=_0x549081['replace'](/\x1I\[(\d+)\]/gi,''),_0x549081=_0x549081['replace'](/\\I\[(\d+)\]/gi,''),this[_0x1373eb(0x375)][_0x549081[_0x1373eb(0x455)]()['trim']()]=_0x3c8cc6['id'];}return this[_0x1373eb(0x375)][_0x277866]||0x0;},DataManager[_0x30c775(0x425)]=function(_0x28caee){const _0x29e530=_0x30c775;this[_0x29e530(0x36d)]=this[_0x29e530(0x36d)]||{};if(this[_0x29e530(0x36d)][_0x28caee['id']])return this[_0x29e530(0x36d)][_0x28caee['id']];this['_stypeIDs'][_0x28caee['id']]=[_0x28caee[_0x29e530(0x379)]];if(_0x28caee['note'][_0x29e530(0x298)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20c5cf=JSON[_0x29e530(0x306)]('['+RegExp['$1'][_0x29e530(0x298)](/\d+/g)+']');this[_0x29e530(0x36d)][_0x28caee['id']]=this[_0x29e530(0x36d)][_0x28caee['id']]['concat'](_0x20c5cf);}else{if(_0x28caee[_0x29e530(0x283)][_0x29e530(0x298)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x1ee805=RegExp['$1']['split'](',');for(const _0x269810 of _0x1ee805){if(_0x29e530(0x1d6)===_0x29e530(0x1d6)){const _0x50691d=DataManager[_0x29e530(0x47e)](_0x269810);if(_0x50691d)this[_0x29e530(0x36d)][_0x28caee['id']][_0x29e530(0x25f)](_0x50691d);}else return _0x173c71[_0x29e530(0x293)]['Settings'][_0x29e530(0x1f6)][_0x29e530(0x440)][_0x29e530(0x2a8)](this,_0x5e0035);}}}return this[_0x29e530(0x36d)][_0x28caee['id']];},DataManager[_0x30c775(0x47e)]=function(_0x234fdd){const _0x1ed074=_0x30c775;_0x234fdd=_0x234fdd[_0x1ed074(0x455)]()['trim'](),this[_0x1ed074(0x36d)]=this[_0x1ed074(0x36d)]||{};if(this[_0x1ed074(0x36d)][_0x234fdd])return this['_stypeIDs'][_0x234fdd];for(let _0x4f7fa0=0x1;_0x4f7fa0<0x64;_0x4f7fa0++){if(!$dataSystem[_0x1ed074(0x3c2)][_0x4f7fa0])continue;let _0x38c00b=$dataSystem['skillTypes'][_0x4f7fa0][_0x1ed074(0x455)]()['trim']();_0x38c00b=_0x38c00b[_0x1ed074(0x1ef)](/\x1I\[(\d+)\]/gi,''),_0x38c00b=_0x38c00b[_0x1ed074(0x1ef)](/\\I\[(\d+)\]/gi,''),this[_0x1ed074(0x36d)][_0x38c00b]=_0x4f7fa0;}return this[_0x1ed074(0x36d)][_0x234fdd]||0x0;},DataManager[_0x30c775(0x1e4)]=function(_0x2fbed5){const _0x25d439=_0x30c775;_0x2fbed5=_0x2fbed5[_0x25d439(0x455)]()[_0x25d439(0x46b)](),this['_skillIDs']=this[_0x25d439(0x36c)]||{};if(this[_0x25d439(0x36c)][_0x2fbed5])return this['_skillIDs'][_0x2fbed5];for(const _0x10617e of $dataSkills){if(_0x25d439(0x3d0)!==_0x25d439(0x3d0)){if(!_0x3252f1[_0x25d439(0x441)](_0x5dd898))return![];}else{if(!_0x10617e)continue;this[_0x25d439(0x36c)][_0x10617e['name'][_0x25d439(0x455)]()[_0x25d439(0x46b)]()]=_0x10617e['id'];}}return this[_0x25d439(0x36c)][_0x2fbed5]||0x0;},DataManager['getStateIdWithName']=function(_0xf629f6){const _0x140f62=_0x30c775;_0xf629f6=_0xf629f6[_0x140f62(0x455)]()[_0x140f62(0x46b)](),this[_0x140f62(0x24e)]=this[_0x140f62(0x24e)]||{};if(this[_0x140f62(0x24e)][_0xf629f6])return this['_stateIDs'][_0xf629f6];for(const _0x41dade of $dataStates){if(_0x140f62(0x2be)!=='aEwep'){const _0x3d7612=this[_0x140f62(0x2ae)](),_0x3a3ef8=this[_0x140f62(0x284)]['height'],_0xd9e3f=this['isRightInputMode']()?0x0:_0x145ae3[_0x140f62(0x47c)]-this[_0x140f62(0x2ae)](),_0x157393=this['_itemWindow']['y'];return new _0x1f945f(_0xd9e3f,_0x157393,_0x3d7612,_0x3a3ef8);}else{if(!_0x41dade)continue;this[_0x140f62(0x24e)][_0x41dade[_0x140f62(0x456)][_0x140f62(0x455)]()['trim']()]=_0x41dade['id'];}}return this['_stateIDs'][_0xf629f6]||0x0;},DataManager[_0x30c775(0x2d1)]=function(_0xf688d1){const _0xb640d0=_0x30c775;this[_0xb640d0(0x296)]=this[_0xb640d0(0x296)]||{};if(this['_stateMaxTurns'][_0xf688d1])return this[_0xb640d0(0x296)][_0xf688d1];return $dataStates[_0xf688d1][_0xb640d0(0x283)][_0xb640d0(0x298)](/<MAX TURNS:[ ](\d+)>/i)?this['_stateMaxTurns'][_0xf688d1]=Number(RegExp['$1']):this['_stateMaxTurns'][_0xf688d1]=VisuMZ[_0xb640d0(0x293)]['Settings'][_0xb640d0(0x371)][_0xb640d0(0x38d)],this[_0xb640d0(0x296)][_0xf688d1];},ColorManager[_0x30c775(0x163)]=function(_0xd86667,_0x399027){const _0x4fbf50=_0x30c775;_0x399027=String(_0x399027),this[_0x4fbf50(0x36e)]=this[_0x4fbf50(0x36e)]||{};if(_0x399027[_0x4fbf50(0x298)](/#(.*)/i)){if(_0x4fbf50(0x3a6)!=='XJnRF'){if(!_0x3ccca4['hasSkill'](_0x2ab696))return![];}else this[_0x4fbf50(0x36e)][_0xd86667]=_0x4fbf50(0x33f)[_0x4fbf50(0x1dd)](String(RegExp['$1']));}else this[_0x4fbf50(0x36e)][_0xd86667]=this[_0x4fbf50(0x278)](Number(_0x399027));return this[_0x4fbf50(0x36e)][_0xd86667];},ColorManager[_0x30c775(0x1ad)]=function(_0xe03093){const _0x54573f=_0x30c775;_0xe03093=String(_0xe03093);if(_0xe03093[_0x54573f(0x298)](/#(.*)/i))return _0x54573f(0x33f)[_0x54573f(0x1dd)](String(RegExp['$1']));else{if(_0x54573f(0x475)===_0x54573f(0x238)){const _0x1534b6=_0x1807f0[_0x5e7f6f];if(_0x1534b6&&_0x1534b6[_0x54573f(0x208)][_0x54573f(0x2a1)]>0x0)for(const _0x9f5d3e of _0x1534b6[_0x54573f(0x208)]){if(this['isStateCategoryResisted'](_0x9f5d3e))return!![];}return _0x5430fd[_0x54573f(0x293)][_0x54573f(0x30f)]['call'](this,_0xb8d568);}else return this['textColor'](Number(_0xe03093));}},ColorManager[_0x30c775(0x449)]=function(_0x25dcf6){const _0x353498=_0x30c775;if(typeof _0x25dcf6===_0x353498(0x38e))_0x25dcf6=$dataStates[_0x25dcf6];const _0x4663e3=_0x353498(0x2d8)[_0x353498(0x1dd)](_0x25dcf6['id']);this[_0x353498(0x36e)]=this['_colorCache']||{};if(this[_0x353498(0x36e)][_0x4663e3])return this['_colorCache'][_0x4663e3];const _0x18fd53=this['retrieveStateColor'](_0x25dcf6);return this[_0x353498(0x163)](_0x4663e3,_0x18fd53);},ColorManager['retrieveStateColor']=function(_0x1126be){const _0x14a28c=_0x30c775,_0x1ed69f=_0x1126be[_0x14a28c(0x283)];if(_0x1ed69f[_0x14a28c(0x298)](/<TURN COLOR:[ ](.*)>/i)){if(_0x14a28c(0x45c)===_0x14a28c(0x45c))return String(RegExp['$1']);else{const _0x2f01be=_0x14a28c(0x352);this[_0x14a28c(0x36e)]=this[_0x14a28c(0x36e)]||{};if(this[_0x14a28c(0x36e)][_0x2f01be])return this['_colorCache'][_0x2f01be];const _0x22f563=_0x5db384[_0x14a28c(0x293)]['Settings'][_0x14a28c(0x3aa)][_0x14a28c(0x38b)];return this['getColorDataFromPluginParameters'](_0x2f01be,_0x22f563);}}else{if(_0x1ed69f[_0x14a28c(0x298)](/<POSITIVE STATE>/i)){if(_0x14a28c(0x33a)===_0x14a28c(0x218)){const _0x39a55b=this['_actor']!==_0x4796f9;_0x512eb5[_0x14a28c(0x293)][_0x14a28c(0x3d5)][_0x14a28c(0x2a8)](this,_0x3af273),_0x39a55b&&(this[_0x14a28c(0x274)]&&this[_0x14a28c(0x274)][_0x14a28c(0x25e)]===_0x576f4a&&this[_0x14a28c(0x274)][_0x14a28c(0x216)](this[_0x14a28c(0x3e7)](0x0)));}else return VisuMZ[_0x14a28c(0x293)][_0x14a28c(0x2ef)][_0x14a28c(0x371)][_0x14a28c(0x388)];}else return _0x1ed69f['match'](/<NEGATIVE STATE>/i)?_0x14a28c(0x3bf)==='MYNqE'?VisuMZ['SkillsStatesCore'][_0x14a28c(0x2ef)]['States'][_0x14a28c(0x32d)]:this[_0x14a28c(0x2ff)]&&this[_0x14a28c(0x2dd)]?this[_0x14a28c(0x2ca)]():_0x32bc80[_0x14a28c(0x293)]['Sprite_Gauge_currentValue'][_0x14a28c(0x2a8)](this):VisuMZ[_0x14a28c(0x293)][_0x14a28c(0x2ef)]['States']['ColorNeutral'];}},ColorManager[_0x30c775(0x46f)]=function(){const _0x35c7df=_0x30c775,_0xd93568='_stored_buffColor';this[_0x35c7df(0x36e)]=this[_0x35c7df(0x36e)]||{};if(this['_colorCache'][_0xd93568])return this[_0x35c7df(0x36e)][_0xd93568];const _0x29fc74=VisuMZ[_0x35c7df(0x293)][_0x35c7df(0x2ef)]['Buffs'][_0x35c7df(0x38b)];return this[_0x35c7df(0x163)](_0xd93568,_0x29fc74);},ColorManager[_0x30c775(0x46e)]=function(){const _0x2d2658=_0x30c775,_0x49c993='_stored_debuffColor';this[_0x2d2658(0x36e)]=this['_colorCache']||{};if(this[_0x2d2658(0x36e)][_0x49c993])return this['_colorCache'][_0x49c993];const _0x514c1b=VisuMZ['SkillsStatesCore'][_0x2d2658(0x2ef)]['Buffs']['ColorDebuff'];return this['getColorDataFromPluginParameters'](_0x49c993,_0x514c1b);},SceneManager[_0x30c775(0x316)]=function(){const _0x2d0fb9=_0x30c775;return this['_scene']&&this[_0x2d0fb9(0x15c)][_0x2d0fb9(0x25e)]===Scene_Battle;},VisuMZ[_0x30c775(0x293)]['BattleManager_endAction']=BattleManager[_0x30c775(0x363)],BattleManager['endAction']=function(){const _0x42f458=_0x30c775;this[_0x42f458(0x365)](),VisuMZ[_0x42f458(0x293)]['BattleManager_endAction'][_0x42f458(0x2a8)](this);},BattleManager[_0x30c775(0x365)]=function(){const _0x76789b=_0x30c775,_0x5333cd=VisuMZ[_0x76789b(0x293)][_0x76789b(0x2ef)][_0x76789b(0x371)];if(!_0x5333cd)return;if(_0x5333cd[_0x76789b(0x2e5)]===![])return;if(!this[_0x76789b(0x168)])return;this[_0x76789b(0x168)][_0x76789b(0x365)]();},Game_Battler[_0x30c775(0x150)][_0x30c775(0x365)]=function(){const _0x4dfb1e=_0x30c775;if(BattleManager['_phase']!=='action')return;if(this[_0x4dfb1e(0x191)]===Graphics[_0x4dfb1e(0x269)])return;this[_0x4dfb1e(0x191)]=Graphics[_0x4dfb1e(0x269)];for(const _0x5955b2 of this[_0x4dfb1e(0x200)]){if('pGxQG'==='yJiXI'){if(!_0x133d76['isLearnedSkill'](_0x33fc9d))return![];}else{const _0x585a49=$dataStates[_0x5955b2];if(!_0x585a49)continue;if(_0x585a49[_0x4dfb1e(0x302)]!==0x1)continue;if(this['_stateTurns'][_0x5955b2]>0x0){if(_0x4dfb1e(0x275)===_0x4dfb1e(0x275))this[_0x4dfb1e(0x1b4)][_0x5955b2]--;else{if(!_0x55912f[_0x4dfb1e(0x293)]['Settings'][_0x4dfb1e(0x371)][_0x4dfb1e(0x3eb)])return;const _0x3d9a1e=_0x1be6c8[_0x4dfb1e(0x320)],_0x5e6147=_0x187ff9['iconHeight']/0x2,_0x2dd3bb=_0x380819[_0x4dfb1e(0x164)]();this[_0x4dfb1e(0x258)](_0x2dd3bb),this[_0x4dfb1e(0x2f2)](_0x4dfb1e(0x351)),this[_0x4dfb1e(0x434)][_0x4dfb1e(0x3d1)]=!![],this[_0x4dfb1e(0x434)][_0x4dfb1e(0x3b5)]=_0x5de50d[_0x4dfb1e(0x293)][_0x4dfb1e(0x2ef)]['States'][_0x4dfb1e(0x289)],_0x323622+=_0x451a8a['SkillsStatesCore'][_0x4dfb1e(0x2ef)]['States']['DataOffsetX'],_0x35fd04+=_0x33dd35[_0x4dfb1e(0x293)][_0x4dfb1e(0x2ef)]['States'][_0x4dfb1e(0x242)];const _0x3ff668=_0x5b8496(_0x363757['getStateDisplay'](_0x184ca9['id']));this[_0x4dfb1e(0x417)](_0x3ff668,_0x288def,_0x195603,_0x3d9a1e,'center'),this['contents'][_0x4dfb1e(0x3d1)]=![],this[_0x4dfb1e(0x1ab)]();}}}}this['removeStatesAuto'](0x1);},Game_BattlerBase[_0x30c775(0x150)]['updateStateTurns']=function(){const _0x37e02a=_0x30c775,_0x540055=VisuMZ['SkillsStatesCore'][_0x37e02a(0x2ef)]['States'];for(const _0x54ec75 of this[_0x37e02a(0x200)]){const _0x844016=$dataStates[_0x54ec75];if(_0x540055&&_0x540055[_0x37e02a(0x2e5)]!==![]){if(_0x37e02a(0x253)===_0x37e02a(0x253)){if(_0x844016&&_0x844016['autoRemovalTiming']===0x1)continue;}else return _0x1ea6dc[_0x37e02a(0x293)]['Scene_Skill_skillTypeWindowRect'][_0x37e02a(0x2a8)](this);}this['_stateTurns'][_0x54ec75]>0x0&&this[_0x37e02a(0x1b4)][_0x54ec75]--;}},VisuMZ[_0x30c775(0x293)][_0x30c775(0x3be)]=Game_Switches[_0x30c775(0x150)]['onChange'],Game_Switches[_0x30c775(0x150)]['onChange']=function(){const _0x16934a=_0x30c775;VisuMZ[_0x16934a(0x293)][_0x16934a(0x3be)][_0x16934a(0x2a8)](this);const _0x18fd90=VisuMZ[_0x16934a(0x293)]['Settings'][_0x16934a(0x32a)][_0x16934a(0x188)]??!![];if(!_0x18fd90)return;if(SceneManager[_0x16934a(0x316)]()){if(_0x16934a(0x14a)===_0x16934a(0x14a))for(const _0x166dcc of BattleManager[_0x16934a(0x2e3)]()){if(_0x166dcc)_0x166dcc[_0x16934a(0x1bc)]();}else{const _0x574648=this[_0x16934a(0x20d)](_0x79d8f1);if(_0x574648==='iconText')this[_0x16934a(0x367)](_0x235890);else _0x574648===_0x16934a(0x291)?this[_0x16934a(0x2f0)](_0x656a1a):_0x3bbb58[_0x16934a(0x150)][_0x16934a(0x447)][_0x16934a(0x2a8)](this,_0x1a1115);}}},VisuMZ[_0x30c775(0x293)][_0x30c775(0x478)]=Game_Variables[_0x30c775(0x150)][_0x30c775(0x261)],Game_Variables[_0x30c775(0x150)][_0x30c775(0x261)]=function(){const _0x129150=_0x30c775;VisuMZ[_0x129150(0x293)][_0x129150(0x478)]['call'](this);const _0x52848=VisuMZ[_0x129150(0x293)][_0x129150(0x2ef)][_0x129150(0x32a)][_0x129150(0x47b)]??!![];if(!_0x52848)return;if(SceneManager[_0x129150(0x316)]())for(const _0xcc2054 of BattleManager[_0x129150(0x2e3)]()){if(_0xcc2054)_0xcc2054[_0x129150(0x1bc)]();}},VisuMZ[_0x30c775(0x293)][_0x30c775(0x230)]=Game_Action[_0x30c775(0x150)][_0x30c775(0x30c)],Game_Action['prototype']['applyItemUserEffect']=function(_0x44b54a){const _0x1d78f1=_0x30c775;VisuMZ[_0x1d78f1(0x293)][_0x1d78f1(0x230)][_0x1d78f1(0x2a8)](this,_0x44b54a),this[_0x1d78f1(0x378)](_0x44b54a);},Game_Action[_0x30c775(0x150)][_0x30c775(0x378)]=function(_0x37af95){const _0x42f7e6=_0x30c775;this[_0x42f7e6(0x2c0)](_0x37af95),this[_0x42f7e6(0x287)](_0x37af95),this[_0x42f7e6(0x3af)](_0x37af95),this[_0x42f7e6(0x276)](_0x37af95);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x3ce)]=Game_Action[_0x30c775(0x150)][_0x30c775(0x3d7)],Game_Action[_0x30c775(0x150)][_0x30c775(0x3d7)]=function(_0x5b9215){const _0x3c2640=_0x30c775;if(this[_0x3c2640(0x415)](_0x5b9215)){if(_0x3c2640(0x2ed)!==_0x3c2640(0x2ed)){if(this[_0x3c2640(0x2c9)]||this[_0x3c2640(0x21c)])return;try{_0x58d611[_0x3c2640(0x293)][_0x3c2640(0x2ef)][_0x3c2640(0x371)][_0x3c2640(0x2a5)][_0x3c2640(0x2a8)](this,_0x12aa90);}catch(_0x1d315a){if(_0x3c4aa8['isPlaytest']())_0x55cb9a[_0x3c2640(0x19e)](_0x1d315a);}}else return!![];}return VisuMZ[_0x3c2640(0x293)][_0x3c2640(0x3ce)][_0x3c2640(0x2a8)](this,_0x5b9215);},Game_Action[_0x30c775(0x150)][_0x30c775(0x415)]=function(_0x2ef08c){const _0x17f080=_0x30c775;if(!this[_0x17f080(0x3c6)]())return;const _0x13100a=this[_0x17f080(0x3c6)]()[_0x17f080(0x283)];if(_0x13100a[_0x17f080(0x298)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if('BtCRj'===_0x17f080(0x16c))_0x1f7e3d+=this[_0x17f080(0x144)](_0x1dd094),this['setStateTurns'](_0x479eeb,_0x396113);else{const _0x2c4f4e=String(RegExp['$1']);if(_0x2ef08c[_0x17f080(0x2e1)](_0x2c4f4e))return!![];}}if(_0x13100a['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if(_0x17f080(0x311)===_0x17f080(0x311)){const _0x26881c=Number(RegExp['$1']);if(_0x2ef08c['isStateAffected'](_0x26881c))return!![];}else{const _0x458c86=_0x58117f[_0x17f080(0x306)]('['+_0x24d995['$1'][_0x17f080(0x298)](/\d+/g)+']');for(const _0x5e964a of _0x458c86){if(!_0x2c0465[_0x17f080(0x441)](_0x5e964a))return!![];}return![];}}else{if(_0x13100a[_0x17f080(0x298)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x40b121=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x2ef08c[_0x17f080(0x27a)](_0x40b121))return!![];}}return![];},Game_Action['prototype'][_0x30c775(0x2c0)]=function(_0x30bd16){const _0x3cbf00=_0x30c775;if(_0x30bd16[_0x3cbf00(0x1a8)]()[_0x3cbf00(0x2a1)]<=0x0)return;const _0x5a28a6=this['item']()[_0x3cbf00(0x283)];{if(_0x3cbf00(0x3cd)===_0x3cbf00(0x3cd)){const _0x4b3ab1=_0x5a28a6[_0x3cbf00(0x298)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x4b3ab1)for(const _0x535542 of _0x4b3ab1){_0x535542[_0x3cbf00(0x298)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0xaeb24a=String(RegExp['$1']);_0x30bd16[_0x3cbf00(0x35e)](_0xaeb24a);}}else return _0xd62db0(_0x36f88a['$1']);}{const _0x4e3205=_0x5a28a6[_0x3cbf00(0x298)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x4e3205)for(const _0x105cf0 of _0x4e3205){_0x105cf0['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x4d9e50=String(RegExp['$1']),_0x1133bf=Number(RegExp['$2']);_0x30bd16['removeStatesByCategory'](_0x4d9e50,_0x1133bf);}}},Game_Action['prototype']['applyStateTurnManipulationEffects']=function(_0x181740){const _0x31e4f8=_0x30c775,_0x2c917d=this[_0x31e4f8(0x3c6)]()[_0x31e4f8(0x283)],_0xe3dae8=_0x2c917d['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0xe3dae8)for(const _0x308979 of _0xe3dae8){if(_0x31e4f8(0x3d4)!==_0x31e4f8(0x3d4))return _0x5e03cf[_0x31e4f8(0x29a)]();else{let _0x5d2366=0x0,_0x4e70b6=0x0;if(_0x308979['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x5d2366=Number(RegExp['$1']),_0x4e70b6=Number(RegExp['$2']);else _0x308979['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x5d2366=DataManager[_0x31e4f8(0x16a)](RegExp['$1']),_0x4e70b6=Number(RegExp['$2']));_0x181740['setStateTurns'](_0x5d2366,_0x4e70b6),this[_0x31e4f8(0x345)](_0x181740);}}const _0x56fd98=_0x2c917d[_0x31e4f8(0x298)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x56fd98)for(const _0x5c77e1 of _0x56fd98){let _0x5a571b=0x0,_0x391cea=0x0;if(_0x5c77e1[_0x31e4f8(0x298)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x5a571b=Number(RegExp['$1']),_0x391cea=Number(RegExp['$2']);else _0x5c77e1[_0x31e4f8(0x298)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x5a571b=DataManager[_0x31e4f8(0x16a)](RegExp['$1']),_0x391cea=Number(RegExp['$2']));_0x181740['addStateTurns'](_0x5a571b,_0x391cea),this['makeSuccess'](_0x181740);}},Game_Action['prototype']['applyBuffTurnManipulationEffects']=function(_0x5289f7){const _0x5646fc=_0x30c775,_0xd8822a=[_0x5646fc(0x480),_0x5646fc(0x2f9),_0x5646fc(0x1ff),_0x5646fc(0x372),_0x5646fc(0x149),_0x5646fc(0x3c3),_0x5646fc(0x204),_0x5646fc(0x44b)],_0x2a1729=this['item']()[_0x5646fc(0x283)],_0x5ab2d7=_0x2a1729[_0x5646fc(0x298)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x5ab2d7)for(const _0x31ca27 of _0x5ab2d7){_0x31ca27[_0x5646fc(0x298)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x558ce0=_0xd8822a[_0x5646fc(0x21f)](String(RegExp['$1'])[_0x5646fc(0x455)]()),_0x3a3874=Number(RegExp['$2']);if(_0x558ce0>=0x0){if(_0x5646fc(0x285)!==_0x5646fc(0x285)){if(this[_0x5646fc(0x2c9)]||this[_0x5646fc(0x21c)])return;const _0x422c79=_0x455165[_0x5646fc(0x293)][_0x5646fc(0x444)];if(_0x422c79[_0x32e6bc])_0x422c79[_0x1472c1][_0x5646fc(0x2a8)](this,_0x4df8c1);}else _0x5289f7[_0x5646fc(0x462)](_0x558ce0,_0x3a3874),this[_0x5646fc(0x345)](_0x5289f7);}}const _0xeefb3e=_0x2a1729['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0xeefb3e){if(_0x5646fc(0x1cd)!==_0x5646fc(0x1cd))return _0x3e3f38[_0x5646fc(0x2f5)]()-0x6;else for(const _0x5d6674 of _0x5ab2d7){_0x5d6674['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0xb7fa5b=_0xd8822a[_0x5646fc(0x21f)](String(RegExp['$1'])[_0x5646fc(0x455)]()),_0x43917c=Number(RegExp['$2']);_0xb7fa5b>=0x0&&('COgvm'!==_0x5646fc(0x41d)?this[_0x5646fc(0x421)](_0x4b47ad,_0x36bdd2['x'],_0x297e49['y'],_0x653463):(_0x5289f7[_0x5646fc(0x339)](_0xb7fa5b,_0x43917c),this[_0x5646fc(0x345)](_0x5289f7)));}}},Game_Action[_0x30c775(0x150)][_0x30c775(0x276)]=function(_0x31a3d2){const _0x2d9156=_0x30c775,_0x358b65=[_0x2d9156(0x480),_0x2d9156(0x2f9),_0x2d9156(0x1ff),'DEF',_0x2d9156(0x149),_0x2d9156(0x3c3),_0x2d9156(0x204),_0x2d9156(0x44b)],_0x41733d=this[_0x2d9156(0x3c6)]()[_0x2d9156(0x283)],_0x5544f5=_0x41733d[_0x2d9156(0x298)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x5544f5)for(const _0x3c8b4b of _0x5544f5){if(_0x2d9156(0x263)!==_0x2d9156(0x44c)){_0x3c8b4b[_0x2d9156(0x298)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x53b230=_0x358b65[_0x2d9156(0x21f)](String(RegExp['$1'])[_0x2d9156(0x455)]()),_0x55ba3f=Number(RegExp['$2']);_0x53b230>=0x0&&(_0x31a3d2[_0x2d9156(0x28c)](_0x53b230,_0x55ba3f),this[_0x2d9156(0x345)](_0x31a3d2));}else{const _0x18346f=this[_0x2d9156(0x202)]['hpDamage']||0x0;this[_0x2d9156(0x3c4)](_0x28b278),this[_0x2d9156(0x202)][_0x2d9156(0x14e)]+=_0x18346f;}}const _0x3b2c98=_0x41733d[_0x2d9156(0x298)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3b2c98)for(const _0x4cab99 of _0x5544f5){_0x4cab99[_0x2d9156(0x298)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x2b830e=_0x358b65[_0x2d9156(0x21f)](String(RegExp['$1'])[_0x2d9156(0x455)]()),_0x559dd0=Number(RegExp['$2']);_0x2b830e>=0x0&&(_0x31a3d2[_0x2d9156(0x3a7)](_0x2b830e,_0x559dd0),this[_0x2d9156(0x345)](_0x31a3d2));}},VisuMZ['SkillsStatesCore'][_0x30c775(0x17d)]=Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x1d0)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x1d0)]=function(){const _0x392f56=_0x30c775;this['_cache']={},this[_0x392f56(0x1ec)](),VisuMZ[_0x392f56(0x293)][_0x392f56(0x17d)][_0x392f56(0x2a8)](this);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x1ec)]=function(){const _0x395e85=_0x30c775;this[_0x395e85(0x45a)]='',this[_0x395e85(0x452)]={},this['_stateDisplay']={},this[_0x395e85(0x2a7)]={};},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x3b4)]=function(_0x3961f4){const _0x386b2=_0x30c775;return this['_cache']=this['_cache']||{},this[_0x386b2(0x254)][_0x3961f4]!==undefined;},VisuMZ[_0x30c775(0x293)][_0x30c775(0x3f2)]=Game_BattlerBase[_0x30c775(0x150)]['refresh'],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x1bc)]=function(){const _0x254c74=_0x30c775;this[_0x254c74(0x254)]={},VisuMZ['SkillsStatesCore'][_0x254c74(0x3f2)][_0x254c74(0x2a8)](this);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x224)]=Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x209)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x209)]=function(_0x316284){const _0x560105=_0x30c775;let _0x16b5d2=this[_0x560105(0x27a)](_0x316284);VisuMZ[_0x560105(0x293)][_0x560105(0x224)]['call'](this,_0x316284);if(_0x16b5d2&&!this[_0x560105(0x27a)](_0x316284))this[_0x560105(0x1e5)](_0x316284);},Game_BattlerBase['prototype']['onRemoveState']=function(_0x36c243){const _0x5e9b68=_0x30c775;this[_0x5e9b68(0x40c)](_0x36c243),this[_0x5e9b68(0x2c8)](_0x36c243),this['clearStateOrigin'](_0x36c243);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x32c)]=Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x16e)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x16e)]=function(_0x45712f){const _0x2c391d=_0x30c775,_0x3ddf62=$dataStates[_0x45712f],_0x3783c7=this[_0x2c391d(0x1e6)](_0x45712f),_0x2db365=this['getStateReapplyRulings'](_0x3ddf62)[_0x2c391d(0x29d)]()[_0x2c391d(0x46b)]();switch(_0x2db365){case _0x2c391d(0x23b):if(_0x3783c7<=0x0)VisuMZ[_0x2c391d(0x293)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x45712f);break;case _0x2c391d(0x3d3):VisuMZ[_0x2c391d(0x293)]['Game_BattlerBase_resetStateCounts'][_0x2c391d(0x2a8)](this,_0x45712f);break;case'greater':VisuMZ[_0x2c391d(0x293)][_0x2c391d(0x32c)][_0x2c391d(0x2a8)](this,_0x45712f),this[_0x2c391d(0x1b4)][_0x45712f]=Math[_0x2c391d(0x156)](this['_stateTurns'][_0x45712f],_0x3783c7);break;case _0x2c391d(0x16f):VisuMZ['SkillsStatesCore'][_0x2c391d(0x32c)][_0x2c391d(0x2a8)](this,_0x45712f),this['_stateTurns'][_0x45712f]+=_0x3783c7;break;default:VisuMZ[_0x2c391d(0x293)]['Game_BattlerBase_resetStateCounts'][_0x2c391d(0x2a8)](this,_0x45712f);break;}},Game_BattlerBase['prototype'][_0x30c775(0x213)]=function(_0x37ca5d){const _0x37fd8e=_0x30c775,_0x5b1fcf=_0x37ca5d[_0x37fd8e(0x283)];return _0x5b1fcf[_0x37fd8e(0x298)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):_0x37fd8e(0x473)===_0x37fd8e(0x473)?VisuMZ['SkillsStatesCore'][_0x37fd8e(0x2ef)][_0x37fd8e(0x371)][_0x37fd8e(0x22d)]:this[_0x37fd8e(0x161)]()?this[_0x37fd8e(0x37a)]():_0x766aaa['SkillsStatesCore'][_0x37fd8e(0x182)]['call'](this);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x355)]=Game_BattlerBase['prototype']['overwriteBuffTurns'],Game_BattlerBase['prototype'][_0x30c775(0x479)]=function(_0x2a94db,_0x1904a5){const _0x18fff5=_0x30c775,_0x128547=VisuMZ[_0x18fff5(0x293)][_0x18fff5(0x2ef)][_0x18fff5(0x3aa)][_0x18fff5(0x22d)],_0x5d1491=this[_0x18fff5(0x144)](_0x2a94db);switch(_0x128547){case _0x18fff5(0x23b):if(_0x5d1491<=0x0)this['_buffTurns'][_0x2a94db]=_0x1904a5;break;case _0x18fff5(0x3d3):this[_0x18fff5(0x217)][_0x2a94db]=_0x1904a5;break;case _0x18fff5(0x3e0):this[_0x18fff5(0x217)][_0x2a94db]=Math[_0x18fff5(0x156)](_0x5d1491,_0x1904a5);break;case'add':this[_0x18fff5(0x217)][_0x2a94db]+=_0x1904a5;break;default:VisuMZ[_0x18fff5(0x293)][_0x18fff5(0x355)][_0x18fff5(0x2a8)](this,_0x2a94db,_0x1904a5);break;}const _0x51fac4=VisuMZ[_0x18fff5(0x293)]['Settings'][_0x18fff5(0x3aa)]['MaxTurns'];this['_buffTurns'][_0x2a94db]=this['_buffTurns'][_0x2a94db][_0x18fff5(0x2c4)](0x0,_0x51fac4);},Game_BattlerBase['prototype'][_0x30c775(0x226)]=function(){const _0x11c26a=_0x30c775;if(this[_0x11c26a(0x254)][_0x11c26a(0x32e)]!==undefined)return this['_cache'][_0x11c26a(0x32e)];this[_0x11c26a(0x254)]['groupDefeat']=![];const _0x3a8c91=this[_0x11c26a(0x1a8)]();for(const _0x2b252c of _0x3a8c91){if(!_0x2b252c)continue;if(_0x2b252c[_0x11c26a(0x283)][_0x11c26a(0x298)](/<GROUP DEFEAT>/i)){this[_0x11c26a(0x254)][_0x11c26a(0x32e)]=!![];break;}}return this[_0x11c26a(0x254)][_0x11c26a(0x32e)];},VisuMZ[_0x30c775(0x293)]['Game_Unit_deadMembers']=Game_Unit['prototype'][_0x30c775(0x1c2)],Game_Unit[_0x30c775(0x150)]['deadMembers']=function(){const _0x1cc436=_0x30c775;let _0x4ae109=VisuMZ['SkillsStatesCore'][_0x1cc436(0x416)]['call'](this);return BattleManager['_endingBattle']&&(_0x4ae109=_0x4ae109[_0x1cc436(0x420)](this[_0x1cc436(0x171)]()['filter'](_0x9ed1e2=>_0x9ed1e2['isGroupDefeatStateAffected']()))),_0x4ae109;},VisuMZ[_0x30c775(0x293)]['Game_BattlerBase_clearStates']=Game_BattlerBase['prototype']['clearStates'],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x2a4)]=function(){const _0x50b067=_0x30c775;if(this[_0x50b067(0x21e)]()!==''){if('TPwrN'!==_0x50b067(0x3fc))this[_0x50b067(0x2cc)]();else return _0x1507c8;}else VisuMZ[_0x50b067(0x293)][_0x50b067(0x2c3)][_0x50b067(0x2a8)](this),this[_0x50b067(0x1ec)]();},Game_Actor['prototype'][_0x30c775(0x2a4)]=function(){const _0x476943=_0x30c775;this['_stateSteps']=this['_stateSteps']||{},Game_Battler[_0x476943(0x150)][_0x476943(0x2a4)]['call'](this);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x2cc)]=function(){const _0x40a915=_0x30c775,_0x54fa3b=this[_0x40a915(0x1a8)]();for(const _0x1cfcb7 of _0x54fa3b){if(_0x1cfcb7&&this['canClearState'](_0x1cfcb7))this['eraseState'](_0x1cfcb7['id']);}this[_0x40a915(0x254)]={};},Game_BattlerBase[_0x30c775(0x150)]['canClearState']=function(_0x45ff68){const _0x3232a8=_0x30c775,_0x112845=this[_0x3232a8(0x21e)]();if(_0x112845!==''){const _0x372334=_0x45ff68[_0x3232a8(0x283)];if(_0x112845===_0x3232a8(0x148)&&_0x372334[_0x3232a8(0x298)](/<NO DEATH CLEAR>/i))return![];if(_0x112845===_0x3232a8(0x35c)&&_0x372334[_0x3232a8(0x298)](/<NO RECOVER ALL CLEAR>/i))return![];}return this['isStateAffected'](_0x45ff68['id']);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x21e)]=function(){return this['_stateRetainType'];},Game_BattlerBase[_0x30c775(0x150)]['setStateRetainType']=function(_0x242392){const _0x4b3a39=_0x30c775;this[_0x4b3a39(0x45a)]=_0x242392;},Game_BattlerBase['prototype']['clearStateRetainType']=function(){this['_stateRetainType']='';},VisuMZ[_0x30c775(0x293)][_0x30c775(0x3d2)]=Game_BattlerBase['prototype'][_0x30c775(0x3ca)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x3ca)]=function(){const _0x49202e=_0x30c775;this['setStateRetainType'](_0x49202e(0x148)),VisuMZ[_0x49202e(0x293)][_0x49202e(0x3d2)][_0x49202e(0x2a8)](this),this[_0x49202e(0x195)]();},VisuMZ[_0x30c775(0x293)][_0x30c775(0x1eb)]=Game_BattlerBase[_0x30c775(0x150)]['recoverAll'],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x32b)]=function(){const _0x1e5534=_0x30c775;this['setStateRetainType'](_0x1e5534(0x35c)),VisuMZ[_0x1e5534(0x293)][_0x1e5534(0x1eb)][_0x1e5534(0x2a8)](this),this[_0x1e5534(0x195)]();},Game_BattlerBase[_0x30c775(0x150)]['canPaySkillCost']=function(_0x386b2b){const _0x36d361=_0x30c775;for(settings of VisuMZ['SkillsStatesCore'][_0x36d361(0x2ef)][_0x36d361(0x1ac)]){const _0x48c782=settings[_0x36d361(0x277)][_0x36d361(0x2a8)](this,_0x386b2b);if(!settings[_0x36d361(0x3fb)][_0x36d361(0x2a8)](this,_0x386b2b,_0x48c782))return![];}return!![];},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x3ec)]=function(_0x30af72){const _0x3c9119=_0x30c775;for(settings of VisuMZ['SkillsStatesCore'][_0x3c9119(0x2ef)]['Costs']){if(_0x3c9119(0x212)===_0x3c9119(0x24d)){const _0x1aa73a=this['createAllSkillCostText'](_0x13a849,_0x502e90),_0x1823d9=this[_0x3c9119(0x2ea)](_0x1aa73a,_0x2acb88,_0x4599cb,_0x2cd957),_0x275022=_0x55b6d3+_0x58db1d-_0x1823d9['width'];this[_0x3c9119(0x421)](_0x1aa73a,_0x275022,_0x44af48,_0x19ed3f),this[_0x3c9119(0x1ab)]();}else{const _0x4dd610=settings['CalcJS'][_0x3c9119(0x2a8)](this,_0x30af72);settings['PayJS'][_0x3c9119(0x2a8)](this,_0x30af72,_0x4dd610);}}},VisuMZ['SkillsStatesCore'][_0x30c775(0x43c)]=Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x196)],Game_BattlerBase[_0x30c775(0x150)]['meetsSkillConditions']=function(_0xa07bf0){const _0x2ca383=_0x30c775;if(!_0xa07bf0)return![];if(!VisuMZ[_0x2ca383(0x293)][_0x2ca383(0x43c)][_0x2ca383(0x2a8)](this,_0xa07bf0))return![];if(!this['checkSkillConditionsNotetags'](_0xa07bf0))return![];if(!this[_0x2ca383(0x29e)](_0xa07bf0))return![];if(!this[_0x2ca383(0x1cc)](_0xa07bf0))return![];return!![];},Game_BattlerBase['prototype']['checkSkillConditionsNotetags']=function(_0x360e42){const _0x21cab0=_0x30c775;if(!this[_0x21cab0(0x34d)](_0x360e42))return![];return!![];},Game_BattlerBase['prototype'][_0x30c775(0x34d)]=function(_0x47d2e7){const _0x3b65c6=_0x30c775,_0xe2dd77=_0x47d2e7['note'];if(_0xe2dd77['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4b43cf=JSON['parse']('['+RegExp['$1'][_0x3b65c6(0x298)](/\d+/g)+']');for(const _0x4e3625 of _0x4b43cf){if(!$gameSwitches[_0x3b65c6(0x441)](_0x4e3625))return![];}return!![];}if(_0xe2dd77[_0x3b65c6(0x298)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x113c56=JSON[_0x3b65c6(0x306)]('['+RegExp['$1'][_0x3b65c6(0x298)](/\d+/g)+']');for(const _0x4275de of _0x113c56){if('TBWaR'==='TBWaR'){if(!$gameSwitches[_0x3b65c6(0x441)](_0x4275de))return![];}else{const _0x29bc36=this['commandName'](_0x26cb6c);if(_0x29bc36['match'](/\\I\[(\d+)\]/i)){const _0xfaf90d=this[_0x3b65c6(0x3ee)](_0x431a08),_0x407b51=this[_0x3b65c6(0x2ea)](_0x29bc36)[_0x3b65c6(0x1da)];return _0x407b51<=_0xfaf90d['width']?_0x3b65c6(0x203):_0x3b65c6(0x291);}}}return!![];}if(_0xe2dd77['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3b65c6(0x18f)==='SCKJZ')return _0x22dd8b['uiInputPosition'];else{const _0x3d8393=JSON[_0x3b65c6(0x306)]('['+RegExp['$1'][_0x3b65c6(0x298)](/\d+/g)+']');for(const _0x1dd9f of _0x3d8393){if('yFlKZ'===_0x3b65c6(0x19b)){if(typeof _0x4b7819!==_0x3b65c6(0x38e))_0xe1ca0b=_0x55ea98['id'];this[_0x3b65c6(0x452)]=this[_0x3b65c6(0x452)]||{},this['_stateData'][_0x441def]={};}else{if($gameSwitches[_0x3b65c6(0x441)](_0x1dd9f))return!![];}}return![];}}if(_0xe2dd77[_0x3b65c6(0x298)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3b65c6(0x1fe)!=='bjpys')return _0x3ed693[_0x3b65c6(0x22a)]();else{const _0x328f37=JSON[_0x3b65c6(0x306)]('['+RegExp['$1'][_0x3b65c6(0x298)](/\d+/g)+']');for(const _0x1fe5ab of _0x328f37){if(!$gameSwitches[_0x3b65c6(0x441)](_0x1fe5ab))return!![];}return![];}}if(_0xe2dd77[_0x3b65c6(0x298)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3b65c6(0x26c)!==_0x3b65c6(0x26c)){const _0x22330b=_0x42946d[_0x3b65c6(0x306)]('['+_0xb81dbe['$1'][_0x3b65c6(0x298)](/\d+/g)+']');for(const _0x450b41 of _0x22330b){if(!_0x47fa5d[_0x3b65c6(0x441)](_0x450b41))return!![];}return![];}else{const _0x1a65ab=JSON[_0x3b65c6(0x306)]('['+RegExp['$1'][_0x3b65c6(0x298)](/\d+/g)+']');for(const _0xc2bd02 of _0x1a65ab){if('kEmKJ'!=='voMQB'){if(!$gameSwitches['value'](_0xc2bd02))return!![];}else return _0x410a02[_0x3b65c6(0x293)][_0x3b65c6(0x2ef)][_0x3b65c6(0x1f6)][_0x3b65c6(0x1f0)];}return![];}}if(_0xe2dd77[_0x3b65c6(0x298)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x10574a=JSON[_0x3b65c6(0x306)]('['+RegExp['$1'][_0x3b65c6(0x298)](/\d+/g)+']');for(const _0x1b82ba of _0x10574a){if(_0x3b65c6(0x249)!==_0x3b65c6(0x249))return _0x54bc6a['SkillsStatesCore']['Settings']['Skills'][_0x3b65c6(0x190)];else{if($gameSwitches[_0x3b65c6(0x441)](_0x1b82ba))return![];}}return!![];}return!![];},Game_BattlerBase[_0x30c775(0x150)]['meetsSkillConditionsEnableJS']=function(_0x52a791){const _0x5b8a5f=_0x30c775,_0xa617b0=_0x52a791[_0x5b8a5f(0x283)],_0x4f71b5=VisuMZ[_0x5b8a5f(0x293)][_0x5b8a5f(0x146)];if(_0x4f71b5[_0x52a791['id']]){if(_0x5b8a5f(0x3e4)==='ditgS')_0x4d7a9c['categories'][_0x5b8a5f(0x25f)]('POSITIVE');else return _0x4f71b5[_0x52a791['id']][_0x5b8a5f(0x2a8)](this,_0x52a791);}else{if(_0x5b8a5f(0x165)===_0x5b8a5f(0x165))return!![];else{if(!_0xf8416b['hasSkill'](_0xbc67e3))return!![];}}},Game_BattlerBase[_0x30c775(0x150)]['meetsSkillConditionsGlobalJS']=function(_0x19c6f6){const _0x23c016=_0x30c775;return VisuMZ[_0x23c016(0x293)][_0x23c016(0x2ef)][_0x23c016(0x1f6)][_0x23c016(0x440)][_0x23c016(0x2a8)](this,_0x19c6f6);},VisuMZ[_0x30c775(0x293)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x292)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x292)]=function(_0x52deb1){const _0x923444=_0x30c775;for(settings of VisuMZ[_0x923444(0x293)]['Settings'][_0x923444(0x1ac)]){if(settings['Name'][_0x923444(0x455)]()==='MP'){if('URUsZ'==='URUsZ')return settings[_0x923444(0x277)][_0x923444(0x2a8)](this,_0x52deb1);else this[_0x923444(0x3f6)](_0x537429);}}return VisuMZ[_0x923444(0x293)][_0x923444(0x471)]['call'](this,_0x52deb1);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x1e9)]=Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x30e)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x30e)]=function(_0x1f70c2){const _0x34f9e2=_0x30c775;for(settings of VisuMZ[_0x34f9e2(0x293)]['Settings'][_0x34f9e2(0x1ac)]){if(_0x34f9e2(0x411)==='DuoLS'){const _0x5b6362=_0x295a4b['SkillsStatesCore'][_0x34f9e2(0x2ef)][_0x34f9e2(0x24c)];return _0x5b6362['LabelFontMainType']===_0x34f9e2(0x38e)?_0x32a511['numberFontFace']():_0x4f533e[_0x34f9e2(0x1a7)]();}else{if(settings[_0x34f9e2(0x2eb)][_0x34f9e2(0x455)]()==='TP'){if('drrBR'===_0x34f9e2(0x34f)){if(_0x25ed48[_0x34f9e2(0x2eb)][_0x34f9e2(0x455)]()==='MP')return _0x2ea5ec['CalcJS'][_0x34f9e2(0x2a8)](this,_0x579568);}else return settings[_0x34f9e2(0x277)][_0x34f9e2(0x2a8)](this,_0x1f70c2);}}}return VisuMZ['SkillsStatesCore'][_0x34f9e2(0x1e9)]['call'](this,_0x1f70c2);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x2f3)]=function(_0xdf5fca){const _0xfaf38c=_0x30c775;if(typeof _0xdf5fca===_0xfaf38c(0x38e))_0xdf5fca=$dataStates[_0xdf5fca];return this[_0xfaf38c(0x1a8)]()[_0xfaf38c(0x33e)](_0xdf5fca);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x175)]=Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x1a8)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x1a8)]=function(){const _0x579069=_0x30c775;let _0x3f5c6b=VisuMZ['SkillsStatesCore'][_0x579069(0x175)][_0x579069(0x2a8)](this);if($gameTemp[_0x579069(0x1de)])return _0x3f5c6b;return $gameTemp['_checkingPassiveStates']=!![],this[_0x579069(0x247)](_0x3f5c6b),$gameTemp[_0x579069(0x1de)]=undefined,_0x3f5c6b;},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x247)]=function(_0x5647a4){const _0x376f59=_0x30c775,_0x67dd02=this['passiveStates']();for(state of _0x67dd02){if(!state)continue;if(!this[_0x376f59(0x43d)](state)&&_0x5647a4[_0x376f59(0x33e)](state))continue;_0x5647a4[_0x376f59(0x25f)](state);}_0x67dd02['length']>0x0&&_0x5647a4['sort']((_0x35f5b7,_0x421885)=>{const _0x1d10be=_0x376f59;if(_0x1d10be(0x41f)!=='jSugN'){const _0xaf81d=_0x35f5b7['priority'],_0x19a143=_0x421885[_0x1d10be(0x2c5)];if(_0xaf81d!==_0x19a143){if(_0x1d10be(0x189)!==_0x1d10be(0x189)){if(!this['checkSkillConditionsSwitchNotetags'](_0x3a0249))return![];return!![];}else return _0x19a143-_0xaf81d;}return _0x35f5b7-_0x421885;}else{const _0x31449b=_0x55b522[_0x1d10be(0x293)]['Scene_Skill_itemWindowRect'][_0x1d10be(0x2a8)](this);return this[_0x1d10be(0x34c)]()&&this[_0x1d10be(0x321)]()&&(_0x31449b[_0x1d10be(0x1da)]-=this['shopStatusWidth']()),_0x31449b;}});},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x43d)]=function(_0x291a01){const _0x2d6666=_0x30c775;return _0x291a01[_0x2d6666(0x283)][_0x2d6666(0x298)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x453)]=Game_BattlerBase['prototype'][_0x30c775(0x268)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x268)]=function(_0x58e8fb){const _0xd34754=_0x30c775;this[_0xd34754(0x39e)]=!![];let _0x32d61b=VisuMZ['SkillsStatesCore'][_0xd34754(0x453)]['call'](this,_0x58e8fb);return this[_0xd34754(0x39e)]=undefined,_0x32d61b;},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x30d)]=function(){const _0x4ad46e=_0x30c775;let _0xb001d3=[];this[_0x4ad46e(0x397)]=this[_0x4ad46e(0x397)]||{};for(;;){if(_0x4ad46e(0x381)===_0x4ad46e(0x3a8)){if(_0x27f7b3['_subject'])return _0x26871a[_0x4ad46e(0x168)];else{if(_0x34d1fc['_currentActor'])return _0x2c2a88[_0x4ad46e(0x205)];}}else{_0xb001d3=[];let _0x5db43e=!![];for(const _0xea1512 of this[_0x4ad46e(0x254)]['passiveStates']){const _0x21e553=$dataStates[_0xea1512];if(!_0x21e553)continue;let _0x571839=this[_0x4ad46e(0x2a2)](_0x21e553);this[_0x4ad46e(0x397)][_0xea1512]!==_0x571839&&(_0x5db43e=![],this[_0x4ad46e(0x397)][_0xea1512]=_0x571839);if(!_0x571839)continue;_0xb001d3[_0x4ad46e(0x25f)](_0x21e553);}if(_0x5db43e)break;else{if(!this[_0x4ad46e(0x39e)])this['refresh']();this['createPassiveStatesCache']();}}}return _0xb001d3;},Game_BattlerBase[_0x30c775(0x150)]['meetsPassiveStateConditions']=function(_0x11adea){const _0xf01b6d=_0x30c775;if(!this[_0xf01b6d(0x2ee)](_0x11adea))return![];if(!this[_0xf01b6d(0x383)](_0x11adea))return![];if(!this['meetsPassiveStateConditionJS'](_0x11adea))return![];if(!this[_0xf01b6d(0x1ee)](_0x11adea))return![];return!![];},Game_BattlerBase['prototype'][_0x30c775(0x2ee)]=function(_0xc4e760){return!![];},Game_Actor[_0x30c775(0x150)][_0x30c775(0x2ee)]=function(_0x4dfe46){const _0x312b23=_0x30c775,_0x2da951=_0x4dfe46[_0x312b23(0x283)];if(_0x2da951[_0x312b23(0x298)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x4083ef=String(RegExp['$1'])[_0x312b23(0x231)](',')['map'](_0x8df551=>_0x8df551['trim']()),_0xbd0066=VisuMZ[_0x312b23(0x293)][_0x312b23(0x44f)](_0x4083ef);return _0xbd0066[_0x312b23(0x33e)](this[_0x312b23(0x313)]());}if(_0x2da951[_0x312b23(0x298)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x3c21db=String(RegExp['$1'])[_0x312b23(0x231)](',')[_0x312b23(0x17e)](_0x3532b9=>_0x3532b9[_0x312b23(0x46b)]()),_0x1c61f5=VisuMZ[_0x312b23(0x293)][_0x312b23(0x44f)](_0x3c21db);let _0x19698a=[this['currentClass']()];return Imported[_0x312b23(0x33b)]&&this[_0x312b23(0x342)]&&(_0x19698a=this[_0x312b23(0x342)]()),_0x1c61f5['filter'](_0x1e8d1a=>_0x19698a[_0x312b23(0x33e)](_0x1e8d1a))['length']>0x0;}return Game_BattlerBase[_0x312b23(0x150)][_0x312b23(0x2ee)]['call'](this,_0x4dfe46);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x44f)]=function(_0x2b0eb8){const _0x4a46ee=_0x30c775,_0x5af042=[];for(let _0x135c3a of _0x2b0eb8){_0x135c3a=(String(_0x135c3a)||'')[_0x4a46ee(0x46b)]();const _0x4e5d82=/^\d+$/[_0x4a46ee(0x3de)](_0x135c3a);_0x4e5d82?_0x5af042[_0x4a46ee(0x25f)](Number(_0x135c3a)):_0x4a46ee(0x374)!=='IVyac'?this[_0x4a46ee(0x45a)]=_0x18c84c:_0x5af042[_0x4a46ee(0x25f)](DataManager[_0x4a46ee(0x413)](_0x135c3a));}return _0x5af042[_0x4a46ee(0x17e)](_0x36b373=>$dataClasses[Number(_0x36b373)])[_0x4a46ee(0x3b8)](null);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x383)]=function(_0xdc59b9){const _0x2f490d=_0x30c775,_0x14021b=_0xdc59b9[_0x2f490d(0x283)];if(_0x14021b[_0x2f490d(0x298)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2f490d(0x257)===_0x2f490d(0x170))for(const _0x7b25ed of _0x12c9c9){_0x7b25ed[_0x2f490d(0x298)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x56e1e6=_0x3555ed(_0x19dc52['$1']),_0x358dd7=_0x4d8c95(_0x46d926['$2']);_0x3f295f[_0x2f490d(0x256)](_0x56e1e6,_0x358dd7);}else{const _0x5ce88b=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x27f859 of _0x5ce88b){if(_0x2f490d(0x1e7)!=='LiEBu')return this['currentValueSkillsStatesCore']();else{if(!$gameSwitches[_0x2f490d(0x441)](_0x27f859))return![];}}return!![];}}if(_0x14021b[_0x2f490d(0x298)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x188999=JSON[_0x2f490d(0x306)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x58d4b9 of _0x188999){if(!$gameSwitches[_0x2f490d(0x441)](_0x58d4b9))return![];}return!![];}if(_0x14021b[_0x2f490d(0x298)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xea3e5=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2a0f8c of _0xea3e5){if($gameSwitches[_0x2f490d(0x441)](_0x2a0f8c))return!![];}return![];}if(_0x14021b[_0x2f490d(0x298)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f8280=JSON[_0x2f490d(0x306)]('['+RegExp['$1'][_0x2f490d(0x298)](/\d+/g)+']');for(const _0x30f7cc of _0x2f8280){if(_0x2f490d(0x169)===_0x2f490d(0x169)){if(!$gameSwitches[_0x2f490d(0x441)](_0x30f7cc))return!![];}else _0x166b43[_0x2f490d(0x339)](_0x2b2279,_0x2fde3e),this[_0x2f490d(0x345)](_0x3d433f);}return![];}if(_0x14021b['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2f490d(0x1a1)!==_0x2f490d(0x1a1)){const _0xc13c=_0x3af45c(_0x555ecf['$1']),_0x75f2d8=_0x2f490d(0x468)[_0x2f490d(0x1dd)](_0xc13c);_0x4a35ae[_0x2f490d(0x293)][_0x2f490d(0x3e3)][_0x266a43['id']]=new _0x2b581c(_0x2f490d(0x178),_0x75f2d8);}else{const _0x518116=JSON[_0x2f490d(0x306)]('['+RegExp['$1'][_0x2f490d(0x298)](/\d+/g)+']');for(const _0x1bebb3 of _0x518116){if(!$gameSwitches['value'](_0x1bebb3))return!![];}return![];}}if(_0x14021b[_0x2f490d(0x298)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('hBFsH'===_0x2f490d(0x2d7)){const _0x2f7208=JSON[_0x2f490d(0x306)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x19c05d of _0x2f7208){if($gameSwitches[_0x2f490d(0x441)](_0x19c05d))return![];}return!![];}else{const _0x389e90=this['makeCommandName'](_0xbe5fcb);this[_0x2f490d(0x228)](_0x389e90,_0x2f490d(0x178),!![],_0xaefef9);}}return!![];},Game_BattlerBase['prototype'][_0x30c775(0x37f)]=function(_0x8928be){const _0x5ad78c=_0x30c775,_0x12f2e6=VisuMZ[_0x5ad78c(0x293)][_0x5ad78c(0x32f)];if(_0x12f2e6[_0x8928be['id']]&&!_0x12f2e6[_0x8928be['id']][_0x5ad78c(0x2a8)](this,_0x8928be))return![];return!![];},Game_BattlerBase['prototype']['meetsPassiveStateGlobalConditionJS']=function(_0x232e0a){const _0x3eceab=_0x30c775;return VisuMZ[_0x3eceab(0x293)][_0x3eceab(0x2ef)][_0x3eceab(0x32a)][_0x3eceab(0x1c6)][_0x3eceab(0x2a8)](this,_0x232e0a);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x2dc)]=function(){const _0x97dc3f=_0x30c775;if(this[_0x97dc3f(0x3b4)](_0x97dc3f(0x2dc)))return this[_0x97dc3f(0x30d)]();if(this[_0x97dc3f(0x1dc)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x97dc3f(0x2a6)](),this['_checkingVisuMzPassiveStateObjects']=undefined,this[_0x97dc3f(0x30d)]();},Game_BattlerBase['prototype'][_0x30c775(0x2a6)]=function(){const _0x279b28=_0x30c775;this['_checkingVisuMzPassiveStateObjects']=!![],this['_cache']['passiveStates']=[],this[_0x279b28(0x1bd)](),this[_0x279b28(0x14c)](),this[_0x279b28(0x20a)](),this[_0x279b28(0x1dc)]=undefined;},Game_BattlerBase['prototype']['addPassiveStatesFromOtherPlugins']=function(){const _0x491917=_0x30c775;if(Imported[_0x491917(0x331)])this['addPassiveStatesTraitSets']();},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x40a)]=function(){return[];},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x14c)]=function(){const _0x53cab=_0x30c775,_0x44326f=this[_0x53cab(0x40a)]();for(const _0x2a6d70 of _0x44326f){if(_0x53cab(0x466)!==_0x53cab(0x466)){const _0x2e410c=_0x364387(_0x3fe92f['$1']),_0x2f93ba=_0x4df6f7[_0x53cab(0x1dd)](_0x2e410c,_0x53cab(0x300),-0x1,_0x53cab(0x2f6));_0xc56297[_0x53cab(0x293)][_0x53cab(0x45d)][_0xff9734['id']]=new _0x120595(_0x53cab(0x2cf),_0x2f93ba);}else{if(!_0x2a6d70)continue;const _0x4261b0=_0x2a6d70[_0x53cab(0x283)][_0x53cab(0x298)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x4261b0){if(_0x53cab(0x240)!=='YBiZd'){const _0xa19628=_0x117805[_0x197320];if(!_0xa19628)return;const _0x1435ef=_0xa19628[_0x53cab(0x283)]||'',_0x6f0df1=_0x1435ef['match'](/<REMOVE OTHER (.*) STATES>/gi);if(_0x6f0df1){const _0x1d89aa=[_0xa19628];for(const _0x189fcc of _0x6f0df1){_0x189fcc[_0x53cab(0x298)](/<REMOVE OTHER (.*) STATES>/i);const _0xa5f209=_0x5c0419(_0xea8dcd['$1']);this['removeStatesByCategoryAll'](_0xa5f209,_0x1d89aa);}}}else for(const _0x375a70 of _0x4261b0){if(_0x53cab(0x241)!==_0x53cab(0x241))_0x417ca0[_0x53cab(0x293)]['ParseSkillNotetags'][_0x53cab(0x2a8)](this,_0x502110),_0x28e613['SkillsStatesCore'][_0x53cab(0x307)](_0x4ce51c),_0x1513d1[_0x53cab(0x293)]['Parse_Notetags_Skill_JS'](_0x257f46);else{_0x375a70[_0x53cab(0x298)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x4c63b7=RegExp['$1'];if(_0x4c63b7[_0x53cab(0x298)](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x53cab(0x427)!==_0x53cab(0x467)){const _0x30a007=JSON[_0x53cab(0x306)]('['+RegExp['$1'][_0x53cab(0x298)](/\d+/g)+']');this[_0x53cab(0x254)][_0x53cab(0x2dc)]=this[_0x53cab(0x254)][_0x53cab(0x2dc)]['concat'](_0x30a007);}else{if(_0x2408c6[_0x53cab(0x2eb)][_0x53cab(0x455)]()==='TP')return _0x1f397e['CalcJS'][_0x53cab(0x2a8)](this,_0x308ac6);}}else{if('sVJLL'!=='RAeMk'){const _0x506d8c=_0x4c63b7[_0x53cab(0x231)](',');for(const _0x504848 of _0x506d8c){if(_0x53cab(0x463)!==_0x53cab(0x463)){const _0x834395=_0x5d0737[_0x53cab(0x306)]('['+_0x76c378['$1']['match'](/\d+/g)+']');for(const _0x1f20aa of _0x834395){if(!_0x4111ea[_0x53cab(0x177)](_0x1f20aa))return!![];}return![];}else{const _0x1aebbb=DataManager['getStateIdWithName'](_0x504848);if(_0x1aebbb)this[_0x53cab(0x254)][_0x53cab(0x2dc)][_0x53cab(0x25f)](_0x1aebbb);}}}else this['clearStatesWithStateRetain']();}}}}}}},Game_BattlerBase[_0x30c775(0x150)]['addPassiveStatesByPluginParameters']=function(){const _0xbc2ec0=_0x30c775,_0x46360a=VisuMZ[_0xbc2ec0(0x293)][_0xbc2ec0(0x2ef)][_0xbc2ec0(0x32a)][_0xbc2ec0(0x22c)];this[_0xbc2ec0(0x254)][_0xbc2ec0(0x2dc)]=this['_cache']['passiveStates']['concat'](_0x46360a);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x1e6)]=function(_0xa5adfb){const _0x122f11=_0x30c775;if(typeof _0xa5adfb!=='number')_0xa5adfb=_0xa5adfb['id'];return this[_0x122f11(0x1b4)][_0xa5adfb]||0x0;},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x1df)]=function(_0x798a09,_0x21f000){const _0x48becd=_0x30c775;if(typeof _0x798a09!==_0x48becd(0x38e))_0x798a09=_0x798a09['id'];if(this['isStateAffected'](_0x798a09)){if(_0x48becd(0x299)!==_0x48becd(0x299))return _0x4cafc7['SkillsStatesCore'][_0x48becd(0x2ef)][_0x48becd(0x1f6)][_0x48becd(0x433)]??_0x3e05ee[_0x48becd(0x150)][_0x48becd(0x14b)]['call'](this);else{const _0x35f337=DataManager[_0x48becd(0x2d1)](_0x798a09);this['_stateTurns'][_0x798a09]=_0x21f000[_0x48becd(0x2c4)](0x0,_0x35f337);if(this[_0x48becd(0x1b4)][_0x798a09]<=0x0)this[_0x48becd(0x20b)](_0x798a09);}}},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x3b6)]=function(_0x5d7676,_0x5cb326){const _0x5e5de7=_0x30c775;if(typeof _0x5d7676!==_0x5e5de7(0x38e))_0x5d7676=_0x5d7676['id'];this[_0x5e5de7(0x27a)](_0x5d7676)&&(_0x5cb326+=this[_0x5e5de7(0x1e6)](_0x5d7676),this[_0x5e5de7(0x1df)](_0x5d7676,_0x5cb326));},VisuMZ[_0x30c775(0x293)][_0x30c775(0x304)]=Game_BattlerBase['prototype'][_0x30c775(0x470)],Game_BattlerBase[_0x30c775(0x150)]['eraseBuff']=function(_0x319040){const _0x1d8bfa=_0x30c775,_0x408e57=this[_0x1d8bfa(0x2a3)][_0x319040];VisuMZ[_0x1d8bfa(0x293)][_0x1d8bfa(0x304)][_0x1d8bfa(0x2a8)](this,_0x319040);if(_0x408e57>0x0)this['onEraseBuff'](_0x319040);if(_0x408e57<0x0)this[_0x1d8bfa(0x319)](_0x319040);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x2b8)]=Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x2bd)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x2bd)]=function(_0x2c07c2){const _0x23f89c=_0x30c775;VisuMZ[_0x23f89c(0x293)]['Game_BattlerBase_increaseBuff']['call'](this,_0x2c07c2);if(!this[_0x23f89c(0x44e)](_0x2c07c2))this[_0x23f89c(0x470)](_0x2c07c2);},VisuMZ[_0x30c775(0x293)]['Game_BattlerBase_decreaseBuff']=Game_BattlerBase['prototype'][_0x30c775(0x282)],Game_BattlerBase[_0x30c775(0x150)]['decreaseBuff']=function(_0x5e8e2e){const _0xcfd4c4=_0x30c775;VisuMZ[_0xcfd4c4(0x293)][_0xcfd4c4(0x1f7)]['call'](this,_0x5e8e2e);if(!this[_0xcfd4c4(0x44e)](_0x5e8e2e))this[_0xcfd4c4(0x470)](_0x5e8e2e);},Game_BattlerBase['prototype'][_0x30c775(0x3b1)]=function(_0x96bc84){},Game_BattlerBase[_0x30c775(0x150)]['onEraseDebuff']=function(_0x53dd47){},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x38f)]=function(_0x36bd33){const _0x201983=_0x30c775;return this[_0x201983(0x2a3)][_0x36bd33]===VisuMZ[_0x201983(0x293)][_0x201983(0x2ef)][_0x201983(0x3aa)][_0x201983(0x27d)];},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x303)]=function(_0x45ff0a){const _0x4b677e=_0x30c775;return this[_0x4b677e(0x2a3)][_0x45ff0a]===-VisuMZ[_0x4b677e(0x293)][_0x4b677e(0x2ef)][_0x4b677e(0x3aa)][_0x4b677e(0x25a)];},VisuMZ[_0x30c775(0x293)][_0x30c775(0x368)]=Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x2d4)],Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x2d4)]=function(_0x2a2c7b,_0x215964){const _0x13fad9=_0x30c775;return _0x2a2c7b=_0x2a2c7b[_0x13fad9(0x2c4)](-0x2,0x2),VisuMZ[_0x13fad9(0x293)]['Game_BattlerBase_buffIconIndex'][_0x13fad9(0x2a8)](this,_0x2a2c7b,_0x215964);},Game_BattlerBase[_0x30c775(0x150)]['paramBuffRate']=function(_0x28e388){const _0x3a5a81=_0x30c775,_0x39ec7e=this['_buffs'][_0x28e388];return VisuMZ['SkillsStatesCore']['Settings']['Buffs']['MultiplierJS'][_0x3a5a81(0x2a8)](this,_0x28e388,_0x39ec7e);},Game_BattlerBase['prototype'][_0x30c775(0x144)]=function(_0x4c401f){const _0x570336=_0x30c775;return this[_0x570336(0x217)][_0x4c401f]||0x0;},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x23f)]=function(_0x5c9c6c){return this['buffTurns'](_0x5c9c6c);},Game_BattlerBase[_0x30c775(0x150)]['setBuffTurns']=function(_0x23be7e,_0x48a980){const _0x20a21f=_0x30c775;if(this['isBuffAffected'](_0x23be7e)){const _0x87bbaa=VisuMZ['SkillsStatesCore'][_0x20a21f(0x2ef)][_0x20a21f(0x3aa)][_0x20a21f(0x38d)];this[_0x20a21f(0x217)][_0x23be7e]=_0x48a980['clamp'](0x0,_0x87bbaa);}},Game_BattlerBase[_0x30c775(0x150)]['addBuffTurns']=function(_0x295c35,_0x3cd76c){const _0x103e9e=_0x30c775;this[_0x103e9e(0x185)](_0x295c35)&&(_0x3cd76c+=this['buffTurns'](stateId),this[_0x103e9e(0x1df)](_0x295c35,_0x3cd76c));},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x28c)]=function(_0x359cf9,_0x5ab279){const _0x5508bd=_0x30c775;if(this[_0x5508bd(0x2c6)](_0x359cf9)){const _0x4af12f=VisuMZ[_0x5508bd(0x293)]['Settings'][_0x5508bd(0x3aa)][_0x5508bd(0x38d)];this[_0x5508bd(0x217)][_0x359cf9]=_0x5ab279[_0x5508bd(0x2c4)](0x0,_0x4af12f);}},Game_BattlerBase[_0x30c775(0x150)]['addDebuffTurns']=function(_0x5c7163,_0x589f3c){const _0x237949=_0x30c775;if(this['isDebuffAffected'](_0x5c7163)){if(_0x237949(0x29c)!==_0x237949(0x27e))_0x589f3c+=this[_0x237949(0x144)](stateId),this[_0x237949(0x1df)](_0x5c7163,_0x589f3c);else return![];}},Game_BattlerBase['prototype']['stateData']=function(_0x58c5f7){const _0x15f5b1=_0x30c775;if(typeof _0x58c5f7!==_0x15f5b1(0x38e))_0x58c5f7=_0x58c5f7['id'];return this[_0x15f5b1(0x452)]=this[_0x15f5b1(0x452)]||{},this[_0x15f5b1(0x452)][_0x58c5f7]=this[_0x15f5b1(0x452)][_0x58c5f7]||{},this[_0x15f5b1(0x452)][_0x58c5f7];},Game_BattlerBase['prototype']['getStateData']=function(_0x3e900c,_0x4f433d){const _0x73cd18=_0x30c775;if(typeof _0x3e900c!==_0x73cd18(0x38e))_0x3e900c=_0x3e900c['id'];const _0x31a29b=this[_0x73cd18(0x2e8)](_0x3e900c);return _0x31a29b[_0x4f433d];},Game_BattlerBase['prototype']['setStateData']=function(_0x2df49c,_0x1274c5,_0x3d11bf){const _0x1f1029=_0x30c775;if(typeof _0x2df49c!==_0x1f1029(0x38e))_0x2df49c=_0x2df49c['id'];const _0x441f65=this[_0x1f1029(0x2e8)](_0x2df49c);_0x441f65[_0x1274c5]=_0x3d11bf;},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x40c)]=function(_0x13f335){const _0x2cc4cc=_0x30c775;if(typeof _0x13f335!==_0x2cc4cc(0x38e))_0x13f335=_0x13f335['id'];this['_stateData']=this[_0x2cc4cc(0x452)]||{},this[_0x2cc4cc(0x452)][_0x13f335]={};},Game_BattlerBase['prototype']['getStateDisplay']=function(_0x38c643){const _0x589bd7=_0x30c775;if(typeof _0x38c643!==_0x589bd7(0x38e))_0x38c643=_0x38c643['id'];return this['_stateDisplay']=this[_0x589bd7(0x174)]||{},this[_0x589bd7(0x174)][_0x38c643]===undefined&&(this[_0x589bd7(0x174)][_0x38c643]=''),this[_0x589bd7(0x174)][_0x38c643];},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x412)]=function(_0x6bf1b7,_0x387a7b){const _0x3cbafa=_0x30c775;if(typeof _0x6bf1b7!==_0x3cbafa(0x38e))_0x6bf1b7=_0x6bf1b7['id'];this[_0x3cbafa(0x174)]=this[_0x3cbafa(0x174)]||{},this[_0x3cbafa(0x174)][_0x6bf1b7]=_0x387a7b;},Game_BattlerBase['prototype'][_0x30c775(0x2c8)]=function(_0x48c2be){const _0x865a43=_0x30c775;if(typeof _0x48c2be!==_0x865a43(0x38e))_0x48c2be=_0x48c2be['id'];this[_0x865a43(0x174)]=this[_0x865a43(0x174)]||{},this[_0x865a43(0x174)][_0x48c2be]='';},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x2e6)]=function(_0x7eb582){const _0x38ccde=_0x30c775;if(typeof _0x7eb582!==_0x38ccde(0x38e))_0x7eb582=_0x7eb582['id'];this[_0x38ccde(0x2a7)]=this[_0x38ccde(0x2a7)]||{},this['_stateOrigin'][_0x7eb582]=this[_0x38ccde(0x2a7)][_0x7eb582]||_0x38ccde(0x437);const _0x4e789e=this[_0x38ccde(0x2a7)][_0x7eb582];return this[_0x38ccde(0x1b8)](_0x4e789e);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x346)]=function(_0x430dd1,_0x3168b8){const _0x23ffe5=_0x30c775;this[_0x23ffe5(0x2a7)]=this['_stateOrigin']||{};const _0x56f200=_0x3168b8?this[_0x23ffe5(0x358)](_0x3168b8):this[_0x23ffe5(0x1c4)]();this[_0x23ffe5(0x2a7)][_0x430dd1]=_0x56f200;},Game_BattlerBase['prototype'][_0x30c775(0x1a9)]=function(_0xfafbc1){const _0x5cfd4d=_0x30c775;this[_0x5cfd4d(0x2a7)]=this[_0x5cfd4d(0x2a7)]||{},delete this[_0x5cfd4d(0x2a7)][_0xfafbc1];},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x1c4)]=function(){const _0x359b83=_0x30c775,_0x193149=this[_0x359b83(0x350)]();return this[_0x359b83(0x358)](_0x193149);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x350)]=function(){const _0x42e335=_0x30c775;if($gameParty[_0x42e335(0x458)]()){if(BattleManager[_0x42e335(0x168)])return BattleManager[_0x42e335(0x168)];else{if(BattleManager[_0x42e335(0x205)])return BattleManager['_currentActor'];}}else{const _0x49b6c0=SceneManager[_0x42e335(0x15c)];if(![Scene_Map,Scene_Item][_0x42e335(0x33e)](_0x49b6c0[_0x42e335(0x25e)]))return _0x42e335(0x338)!==_0x42e335(0x338)?this[_0x42e335(0x157)](_0x3830a3)>0x0:$gameParty[_0x42e335(0x2e7)]();}return this;},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x358)]=function(_0x134c20){const _0x5a1455=_0x30c775;if(!_0x134c20)return _0x5a1455(0x437);if(_0x134c20[_0x5a1455(0x35f)]()){if(_0x5a1455(0x385)===_0x5a1455(0x385))return'<actor-%1>'[_0x5a1455(0x1dd)](_0x134c20['actorId']());else{const _0x184b86=_0xb3b37b['parse']('['+_0x3f2aad['$1'][_0x5a1455(0x298)](/\d+/g)+']');for(const _0x262f35 of _0x184b86){if(_0x15b5fc[_0x5a1455(0x441)](_0x262f35))return!![];}return![];}}else{const _0x41f632='<enemy-%1>'[_0x5a1455(0x1dd)](_0x134c20[_0x5a1455(0x159)]()),_0x1c8993=_0x5a1455(0x1f5)['format'](_0x134c20[_0x5a1455(0x389)]()),_0x59f16d=_0x5a1455(0x220)[_0x5a1455(0x1dd)]($gameTroop[_0x5a1455(0x2f8)]());return'%1\x20%2\x20%3'['format'](_0x41f632,_0x1c8993,_0x59f16d);}return _0x5a1455(0x437);},Game_BattlerBase['prototype'][_0x30c775(0x1b8)]=function(_0x479bb4){const _0x28af71=_0x30c775;if(_0x479bb4===_0x28af71(0x437)){if(_0x28af71(0x2df)!==_0x28af71(0x2df)){if(!_0xc10c92)return'user';if(_0x1b2580['isActor']())return _0x28af71(0x280)[_0x28af71(0x1dd)](_0x5b8c09['actorId']());else{const _0x288493=_0x28af71(0x305)['format'](_0x419ea4[_0x28af71(0x159)]()),_0x2b70b5='<member-%1>'['format'](_0x3b45e2[_0x28af71(0x389)]()),_0x10f027=_0x28af71(0x220)[_0x28af71(0x1dd)](_0x44366c[_0x28af71(0x2f8)]());return'%1\x20%2\x20%3'[_0x28af71(0x1dd)](_0x288493,_0x2b70b5,_0x10f027);}return _0x28af71(0x437);}else return this;}else{if(_0x479bb4['match'](/<actor-(\d+)>/i)){if(_0x28af71(0x3c7)!==_0x28af71(0x3c7)){const _0x3e7be5=_0x464603[_0x9040e8];if(_0x3e7be5)_0x37c3be[_0x28af71(0x25f)](_0x3e7be5);}else return $gameActors['actor'](Number(RegExp['$1']));}else{if(_0x28af71(0x1f2)!==_0x28af71(0x1f2)){const _0x289612=this[_0x28af71(0x3c2)](),_0xf7fa26=_0xc26354['getSkillTypes'](_0x27e617),_0x8da2c=_0x289612[_0x28af71(0x329)](_0x27b8bc=>_0xf7fa26[_0x28af71(0x33e)](_0x27b8bc));return _0x8da2c[_0x28af71(0x2a1)]>0x0;}else{if($gameParty['inBattle']()&&_0x479bb4[_0x28af71(0x298)](/<troop-(\d+)>/i)){if(_0x28af71(0x446)!==_0x28af71(0x446))this[_0x28af71(0x343)]('recover\x20all'),_0x37d9a7[_0x28af71(0x293)][_0x28af71(0x1eb)][_0x28af71(0x2a8)](this),this[_0x28af71(0x195)]();else{const _0x1dfd2e=Number(RegExp['$1']);if(_0x1dfd2e===$gameTroop[_0x28af71(0x2f8)]()){if(_0x28af71(0x360)===_0x28af71(0x360)){if(_0x479bb4[_0x28af71(0x298)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}else{if(typeof _0x5d71bf!==_0x28af71(0x38e))_0x469156=_0x2f8f71['id'];return this['_stateDisplay']=this[_0x28af71(0x174)]||{},this[_0x28af71(0x174)][_0x4bf662]===_0x313166&&(this[_0x28af71(0x174)][_0x27b013]=''),this[_0x28af71(0x174)][_0x339f9e];}}}}if(_0x479bb4[_0x28af71(0x298)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}}return this;},VisuMZ[_0x30c775(0x293)][_0x30c775(0x20c)]=Game_Battler[_0x30c775(0x150)]['addState'],Game_Battler['prototype'][_0x30c775(0x40b)]=function(_0x35e50c){const _0x3068d0=_0x30c775,_0x1abd75=this[_0x3068d0(0x356)](_0x35e50c);VisuMZ[_0x3068d0(0x293)][_0x3068d0(0x20c)][_0x3068d0(0x2a8)](this,_0x35e50c);if(_0x1abd75&&this[_0x3068d0(0x2f3)]($dataStates[_0x35e50c])){if(_0x3068d0(0x2e9)==='Qiejj'){this['onAddState'](_0x35e50c);;}else{this[_0x3068d0(0x1ab)]();const _0x9bbe0b=_0x42f27f[_0x5e9371];if(_0x9bbe0b)!_0x1c1217[_0x3068d0(0x33e)](_0x9bbe0b)&&this[_0x3068d0(0x29f)](_0x5b932e,_0x9bbe0b,_0x5a3716,_0x25a345),this[_0x3068d0(0x35a)](_0x954480,_0x9bbe0b,_0x4d9ab4,_0x10978f),_0x37394a['push'](_0x9bbe0b);else{const _0x1c5ff4=_0x31b063[_0x50f139-_0x540dee['length']];this['drawActorBuffTurns'](_0x4c00df,_0x1c5ff4,_0x1f42a8,_0x46a6bb),this['drawActorBuffRates'](_0x297d83,_0x1c5ff4,_0x43943a,_0x89df07);}_0x1ed3f3+=_0x488bb6;}}},VisuMZ['SkillsStatesCore'][_0x30c775(0x349)]=Game_Battler[_0x30c775(0x150)][_0x30c775(0x356)],Game_Battler[_0x30c775(0x150)]['isStateAddable']=function(_0x3de80b){const _0x281750=_0x30c775,_0x20b2b8=$dataStates[_0x3de80b];if(_0x20b2b8&&_0x20b2b8[_0x281750(0x283)]['match'](/<NO DEATH CLEAR>/i))return!this[_0x281750(0x429)](_0x3de80b)&&!this['isStateRestrict'](_0x3de80b)&&!this[_0x281750(0x202)]['isStateRemoved'](_0x3de80b);return VisuMZ['SkillsStatesCore'][_0x281750(0x349)][_0x281750(0x2a8)](this,_0x3de80b);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x408)]=function(_0x47f5c5){const _0x23e695=_0x30c775;this[_0x23e695(0x346)](_0x47f5c5),this[_0x23e695(0x15f)](_0x47f5c5),this[_0x23e695(0x2c2)](_0x47f5c5),this[_0x23e695(0x1f1)](_0x47f5c5),this[_0x23e695(0x41b)](_0x47f5c5);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x1e5)]=function(_0x4f5934){const _0x530ce7=_0x30c775;this[_0x530ce7(0x3ba)](_0x4f5934),this[_0x530ce7(0x180)](_0x4f5934),Game_BattlerBase[_0x530ce7(0x150)][_0x530ce7(0x1e5)][_0x530ce7(0x2a8)](this,_0x4f5934);},Game_Battler['prototype'][_0x30c775(0x469)]=function(_0x56f90c){const _0x3f76e0=_0x30c775;for(const _0x1e439a of this[_0x3f76e0(0x1a8)]()){'ckklH'!==_0x3f76e0(0x407)?(_0x3ad4ff[_0x3f76e0(0x293)][_0x3f76e0(0x322)][_0x3f76e0(0x2a8)](this,_0x438921),this[_0x3f76e0(0x341)](_0x5b96a4)):this['isStateExpired'](_0x1e439a['id'])&&_0x1e439a[_0x3f76e0(0x302)]===_0x56f90c&&(this[_0x3f76e0(0x20b)](_0x1e439a['id']),this['onExpireState'](_0x1e439a['id']),this[_0x3f76e0(0x301)](_0x1e439a['id']));}},Game_Battler[_0x30c775(0x150)][_0x30c775(0x24f)]=function(_0xe86e2a){this['onExpireStateCustomJS'](_0xe86e2a);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x1f1)]=function(_0x5d4985){const _0x39e72e=_0x30c775;if(this[_0x39e72e(0x2c9)]||this['_tempBattler'])return;const _0x11b303=VisuMZ['SkillsStatesCore']['stateAddJS'];if(_0x11b303[_0x5d4985])_0x11b303[_0x5d4985][_0x39e72e(0x2a8)](this,_0x5d4985);},Game_Battler['prototype'][_0x30c775(0x3ba)]=function(_0x1e7c72){const _0xd5e84=_0x30c775;if(this[_0xd5e84(0x2c9)]||this[_0xd5e84(0x21c)])return;const _0x43ccbc=VisuMZ[_0xd5e84(0x293)][_0xd5e84(0x444)];if(_0x43ccbc[_0x1e7c72])_0x43ccbc[_0x1e7c72][_0xd5e84(0x2a8)](this,_0x1e7c72);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x145)]=function(_0x2f0f53){const _0x976e17=_0x30c775;if(this[_0x976e17(0x2c9)]||this[_0x976e17(0x21c)])return;const _0x29bf9c=VisuMZ[_0x976e17(0x293)]['stateExpireJS'];if(_0x29bf9c[_0x2f0f53])_0x29bf9c[_0x2f0f53]['call'](this,_0x2f0f53);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x41b)]=function(_0x15206a){const _0x24dc9d=_0x30c775;if(this[_0x24dc9d(0x2c9)]||this['_tempBattler'])return;try{if(_0x24dc9d(0x223)===_0x24dc9d(0x26d)){if(_0x32e4a5['value'](_0x356a6c))return![];}else VisuMZ['SkillsStatesCore']['Settings']['States'][_0x24dc9d(0x2d2)]['call'](this,_0x15206a);}catch(_0x1d10cf){if($gameTemp[_0x24dc9d(0x326)]())console[_0x24dc9d(0x19e)](_0x1d10cf);}},Game_Battler[_0x30c775(0x150)]['onEraseStateGlobalJS']=function(_0x3a56cb){const _0x40db9d=_0x30c775;if(this[_0x40db9d(0x2c9)]||this[_0x40db9d(0x21c)])return;try{VisuMZ[_0x40db9d(0x293)]['Settings'][_0x40db9d(0x371)][_0x40db9d(0x2a5)][_0x40db9d(0x2a8)](this,_0x3a56cb);}catch(_0x44b281){if(_0x40db9d(0x325)!==_0x40db9d(0x325)){const _0x18d3db=_0x5100c5[_0x40db9d(0x277)]['call'](this,_0x1e1056);if(!_0x14e566[_0x40db9d(0x3fb)][_0x40db9d(0x2a8)](this,_0x24bfc0,_0x18d3db))return![];}else{if($gameTemp[_0x40db9d(0x326)]())console[_0x40db9d(0x19e)](_0x44b281);}}},Game_Battler[_0x30c775(0x150)][_0x30c775(0x301)]=function(_0x4719da){const _0x6e75b2=_0x30c775;if(this[_0x6e75b2(0x2c9)]||this[_0x6e75b2(0x21c)])return;try{if('Vpmgg'!==_0x6e75b2(0x409)){const _0x37726c=_0x1aac0c(_0x2b6818['$1']),_0x23a528=_0x46e550[_0x6e75b2(0x1dd)](_0x37726c,'damage',-0x1,_0x6e75b2(0x476));_0x415981[_0x6e75b2(0x293)]['stateHpSlipDamageJS'][_0x5e452b['id']]=new _0x39c99f(_0x6e75b2(0x2cf),_0x23a528);}else VisuMZ[_0x6e75b2(0x293)][_0x6e75b2(0x2ef)][_0x6e75b2(0x371)][_0x6e75b2(0x2b9)][_0x6e75b2(0x2a8)](this,_0x4719da);}catch(_0x4e7356){if($gameTemp['isPlaytest']())console['log'](_0x4e7356);}},Game_Battler[_0x30c775(0x150)][_0x30c775(0x328)]=function(_0x33d174){const _0x367227=_0x30c775;return _0x33d174=_0x33d174[_0x367227(0x455)]()[_0x367227(0x46b)](),this[_0x367227(0x1a8)]()[_0x367227(0x329)](_0xea32c2=>_0xea32c2['categories'][_0x367227(0x33e)](_0x33d174));},Game_Battler[_0x30c775(0x150)]['removeStatesByCategory']=function(_0x102306,_0x5dd83e){const _0x42d300=_0x30c775;_0x102306=_0x102306[_0x42d300(0x455)]()[_0x42d300(0x46b)](),_0x5dd83e=_0x5dd83e||0x0;const _0x4a7b5e=this['statesByCategory'](_0x102306),_0x6835aa=[];for(const _0x520579 of _0x4a7b5e){if(!_0x520579)continue;if(_0x5dd83e<=0x0)break;_0x6835aa[_0x42d300(0x25f)](_0x520579['id']),this[_0x42d300(0x202)][_0x42d300(0x3f8)]=!![],_0x5dd83e--;}while(_0x6835aa[_0x42d300(0x2a1)]>0x0){this['removeState'](_0x6835aa[_0x42d300(0x20e)]());}},Game_Battler[_0x30c775(0x150)][_0x30c775(0x35e)]=function(_0x3fcab9,_0x20364d){const _0x384c7f=_0x30c775;_0x3fcab9=_0x3fcab9[_0x384c7f(0x455)]()[_0x384c7f(0x46b)](),_0x20364d=_0x20364d||[];const _0x446025=this[_0x384c7f(0x328)](_0x3fcab9),_0x134bf3=[];for(const _0x4b4954 of _0x446025){if(_0x384c7f(0x1ae)!==_0x384c7f(0x3ab)){if(!_0x4b4954)continue;if(_0x20364d[_0x384c7f(0x33e)](_0x4b4954))continue;_0x134bf3['push'](_0x4b4954['id']),this[_0x384c7f(0x202)][_0x384c7f(0x3f8)]=!![];}else return this[_0x384c7f(0x173)]()['match'](/LOWER/i);}while(_0x134bf3['length']>0x0){if(_0x384c7f(0x3b9)===_0x384c7f(0x3b9))this['removeState'](_0x134bf3[_0x384c7f(0x20e)]());else return this[_0x384c7f(0x3fe)]=this[_0x384c7f(0x3fe)]||_0x1aca55[_0x384c7f(0x269)],this['_currentTroopUniqueID'];}},Game_Battler[_0x30c775(0x150)]['isStateCategoryAffected']=function(_0xca9ae9){const _0x2504da=_0x30c775;return this[_0x2504da(0x25d)](_0xca9ae9)>0x0;},Game_Battler[_0x30c775(0x150)][_0x30c775(0x426)]=function(_0x40e7bf){const _0x5c29f5=_0x30c775;return this[_0x5c29f5(0x157)](_0x40e7bf)>0x0;},Game_Battler[_0x30c775(0x150)][_0x30c775(0x25d)]=function(_0x313f0f){const _0x4356a7=_0x30c775,_0x5459a4=this[_0x4356a7(0x328)](_0x313f0f)[_0x4356a7(0x329)](_0x353e31=>this[_0x4356a7(0x27a)](_0x353e31['id']));return _0x5459a4['length'];},Game_Battler['prototype'][_0x30c775(0x157)]=function(_0x931cc0){const _0x429d29=_0x30c775,_0x11bd79=this['statesByCategory'](_0x931cc0);return _0x11bd79[_0x429d29(0x2a1)];},VisuMZ[_0x30c775(0x293)][_0x30c775(0x30f)]=Game_BattlerBase[_0x30c775(0x150)]['isStateResist'],Game_BattlerBase[_0x30c775(0x150)]['isStateResist']=function(_0x20a826){const _0x48e8b4=_0x30c775,_0x2ceab2=$dataStates[_0x20a826];if(_0x2ceab2&&_0x2ceab2['categories'][_0x48e8b4(0x2a1)]>0x0){if(_0x48e8b4(0x1e1)===_0x48e8b4(0x436))return!this[_0x48e8b4(0x429)](_0x432d25)&&!this[_0x48e8b4(0x3dd)](_0x51492c)&&!this['_result'][_0x48e8b4(0x443)](_0x1b6ffb);else for(const _0x2b92e3 of _0x2ceab2[_0x48e8b4(0x208)]){if(this[_0x48e8b4(0x3e6)](_0x2b92e3))return!![];}}return VisuMZ['SkillsStatesCore'][_0x48e8b4(0x30f)][_0x48e8b4(0x2a8)](this,_0x20a826);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x3e6)]=function(_0x3f21d2){const _0x1425e5=_0x30c775;let _0x4730b9=_0x1425e5(0x403);if(this[_0x1425e5(0x3b4)](_0x4730b9))return this[_0x1425e5(0x254)][_0x4730b9][_0x1425e5(0x33e)](_0x3f21d2);return this[_0x1425e5(0x254)][_0x4730b9]=this[_0x1425e5(0x211)](),this[_0x1425e5(0x254)][_0x4730b9][_0x1425e5(0x33e)](_0x3f21d2);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x211)]=function(){const _0x4ec953=_0x30c775,_0x28f569=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x6692e0=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x4ca955=[];for(const _0x165433 of this['traitObjects']()){if(!_0x165433)continue;const _0xd1b4d2=_0x165433[_0x4ec953(0x283)],_0x5ac9cf=_0xd1b4d2[_0x4ec953(0x298)](_0x28f569);if(_0x5ac9cf)for(const _0xd06b3e of _0x5ac9cf){_0xd06b3e[_0x4ec953(0x298)](_0x28f569);const _0x3862a0=String(RegExp['$1'])['split'](',')[_0x4ec953(0x17e)](_0x46659c=>String(_0x46659c)[_0x4ec953(0x455)]()[_0x4ec953(0x46b)]());_0x4ca955=_0x4ca955[_0x4ec953(0x420)](_0x3862a0);}if(_0xd1b4d2[_0x4ec953(0x298)](_0x6692e0)){if(_0x4ec953(0x376)===_0x4ec953(0x376)){const _0x131053=String(RegExp['$1'])[_0x4ec953(0x231)](/[\r\n]+/)['map'](_0x537947=>String(_0x537947)[_0x4ec953(0x455)]()[_0x4ec953(0x46b)]());_0x4ca955=_0x4ca955[_0x4ec953(0x420)](_0x131053);}else return this[_0x4ec953(0x173)]()['match'](/RIGHT/i);}}return _0x4ca955;},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x15f)]=function(_0x5415f1){const _0x16e230=_0x30c775,_0x1493df=$dataStates[_0x5415f1];if(!_0x1493df)return;const _0x5d693b=_0x1493df[_0x16e230(0x283)]||'',_0x65edf9=_0x5d693b[_0x16e230(0x298)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x65edf9){const _0x5414a6=[_0x1493df];for(const _0xe58d39 of _0x65edf9){if(_0x16e230(0x3a2)!==_0x16e230(0x457)){_0xe58d39[_0x16e230(0x298)](/<REMOVE OTHER (.*) STATES>/i);const _0x2613e3=String(RegExp['$1']);this[_0x16e230(0x35e)](_0x2613e3,_0x5414a6);}else return _0x37be23[_0x16e230(0x293)][_0x16e230(0x2ef)][_0x16e230(0x24c)]['LabelOutlineWidth']||0x0;}}},VisuMZ['SkillsStatesCore']['Game_Battler_addBuff']=Game_Battler['prototype'][_0x30c775(0x19f)],Game_Battler[_0x30c775(0x150)][_0x30c775(0x19f)]=function(_0x51df76,_0x37b2ea){const _0xac6157=_0x30c775;VisuMZ['SkillsStatesCore'][_0xac6157(0x423)][_0xac6157(0x2a8)](this,_0x51df76,_0x37b2ea);if(this[_0xac6157(0x185)](_0x51df76)){if('zsbZQ'!==_0xac6157(0x422))this[_0xac6157(0x36a)](_0x51df76,_0x37b2ea);else for(const _0x2d4ea0 of _0x24411a){_0x2d4ea0['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x2a6f67=_0x1dbe75['indexOf'](_0x38314b(_0x4b953c['$1'])['toUpperCase']()),_0x251ee6=_0x3eddb3(_0x513ee3['$2']);_0x2a6f67>=0x0&&(_0x5cf65c[_0xac6157(0x339)](_0x2a6f67,_0x251ee6),this[_0xac6157(0x345)](_0x5d9ae5));}}},Game_Battler['prototype'][_0x30c775(0x2c7)]=function(_0x247532){},VisuMZ[_0x30c775(0x293)][_0x30c775(0x252)]=Game_Battler['prototype'][_0x30c775(0x2a0)],Game_Battler[_0x30c775(0x150)][_0x30c775(0x2a0)]=function(_0x1b2e7e,_0x50fa45){const _0x1d54eb=_0x30c775;VisuMZ[_0x1d54eb(0x293)][_0x1d54eb(0x252)][_0x1d54eb(0x2a8)](this,_0x1b2e7e,_0x50fa45);if(this[_0x1d54eb(0x2c6)](_0x1b2e7e)){if(_0x1d54eb(0x153)!=='sFzVW'){if(!_0x2dd44a[_0x1d54eb(0x3dc)](_0xac25e6))return![];}else this[_0x1d54eb(0x2fe)](_0x1b2e7e,_0x50fa45);}},Game_Battler[_0x30c775(0x150)][_0x30c775(0x246)]=function(){const _0xed0def=_0x30c775;for(let _0x3b2454=0x0;_0x3b2454<this['buffLength']();_0x3b2454++){if(this['isBuffExpired'](_0x3b2454)){if(_0xed0def(0x310)===_0xed0def(0x357)){_0x479a12[_0xed0def(0x298)](/<REMOVE OTHER (.*) STATES>/i);const _0x32b176=_0x1965a9(_0x5b1804['$1']);this[_0xed0def(0x35e)](_0x32b176,_0x2aaf65);}else{const _0x57a2f8=this[_0xed0def(0x2a3)][_0x3b2454];this[_0xed0def(0x424)](_0x3b2454);if(_0x57a2f8>0x0)this['onExpireBuff'](_0x3b2454);if(_0x57a2f8<0x0)this[_0xed0def(0x233)](_0x3b2454);}}}},Game_Battler['prototype'][_0x30c775(0x36a)]=function(_0x2cea55,_0x352926){this['onAddBuffGlobalJS'](_0x2cea55,_0x352926);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x2fe)]=function(_0x282b34,_0x131d07){const _0xf4d9ce=_0x30c775;this[_0xf4d9ce(0x2c1)](_0x282b34,_0x131d07);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x3b1)]=function(_0x2bb35e){const _0x367fa0=_0x30c775;Game_BattlerBase['prototype'][_0x367fa0(0x3b1)][_0x367fa0(0x2a8)](this,_0x2bb35e),this[_0x367fa0(0x243)](_0x2bb35e);},Game_Battler['prototype'][_0x30c775(0x319)]=function(_0x3d55f3){const _0x516e31=_0x30c775;Game_BattlerBase[_0x516e31(0x150)][_0x516e31(0x319)]['call'](this,_0x3d55f3),this[_0x516e31(0x18a)](_0x3d55f3);},Game_Battler[_0x30c775(0x150)]['onExpireBuff']=function(_0x19e641){this['onExpireBuffGlobalJS'](_0x19e641);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x233)]=function(_0x29cf96){this['onExpireDebuffGlobalJS'](_0x29cf96);},Game_Battler['prototype'][_0x30c775(0x410)]=function(_0x1ea670,_0x6bcd86){const _0x53fb84=_0x30c775;VisuMZ[_0x53fb84(0x293)]['Settings'][_0x53fb84(0x3aa)][_0x53fb84(0x1e8)]['call'](this,_0x1ea670,_0x6bcd86);},Game_Battler['prototype'][_0x30c775(0x2c1)]=function(_0x4e9200,_0x16cd77){const _0x518eb4=_0x30c775;VisuMZ[_0x518eb4(0x293)][_0x518eb4(0x2ef)][_0x518eb4(0x3aa)][_0x518eb4(0x386)][_0x518eb4(0x2a8)](this,_0x4e9200,_0x16cd77);},Game_BattlerBase['prototype'][_0x30c775(0x243)]=function(_0x2520a2){const _0x55e984=_0x30c775;VisuMZ[_0x55e984(0x293)][_0x55e984(0x2ef)][_0x55e984(0x3aa)][_0x55e984(0x47d)]['call'](this,_0x2520a2);},Game_BattlerBase[_0x30c775(0x150)][_0x30c775(0x18a)]=function(_0x11502a){const _0x51530d=_0x30c775;VisuMZ[_0x51530d(0x293)][_0x51530d(0x2ef)][_0x51530d(0x3aa)][_0x51530d(0x17b)][_0x51530d(0x2a8)](this,_0x11502a);},Game_Battler[_0x30c775(0x150)]['onExpireBuffGlobalJS']=function(_0x1a2f3f){const _0x1bfbb3=_0x30c775;VisuMZ[_0x1bfbb3(0x293)]['Settings'][_0x1bfbb3(0x3aa)][_0x1bfbb3(0x18e)][_0x1bfbb3(0x2a8)](this,_0x1a2f3f);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x2e4)]=function(_0x3aa86f){const _0x58257c=_0x30c775;VisuMZ[_0x58257c(0x293)][_0x58257c(0x2ef)][_0x58257c(0x3aa)][_0x58257c(0x36b)]['call'](this,_0x3aa86f);},Game_Battler[_0x30c775(0x150)][_0x30c775(0x2c2)]=function(_0x1c4373){const _0x526719=_0x30c775,_0x21f640=VisuMZ[_0x526719(0x293)],_0x5ae959=['stateHpSlipDamageJS',_0x526719(0x40d),_0x526719(0x45d),_0x526719(0x227),_0x526719(0x1a4),_0x526719(0x30a)];for(const _0x2b10f4 of _0x5ae959){_0x526719(0x1ba)!==_0x526719(0x2ec)?_0x21f640[_0x2b10f4][_0x1c4373]&&_0x21f640[_0x2b10f4][_0x1c4373][_0x526719(0x2a8)](this,_0x1c4373):_0x2d7767['SkillsStatesCore'][_0x526719(0x2ef)][_0x526719(0x3aa)]['onExpireBuffJS'][_0x526719(0x2a8)](this,_0x143a93);}},VisuMZ[_0x30c775(0x293)][_0x30c775(0x2de)]=Game_Battler[_0x30c775(0x150)][_0x30c775(0x1aa)],Game_Battler['prototype']['regenerateAll']=function(){const _0x38d2f0=_0x30c775;this[_0x38d2f0(0x3bd)](),VisuMZ[_0x38d2f0(0x293)][_0x38d2f0(0x2de)][_0x38d2f0(0x2a8)](this),this[_0x38d2f0(0x39a)](),this[_0x38d2f0(0x335)]();},Game_Battler[_0x30c775(0x150)]['setPassiveStateSlipDamageJS']=function(){const _0x1730de=_0x30c775;for(const _0x91aaa1 of this[_0x1730de(0x2dc)]()){if('xYOXw'===_0x1730de(0x26e))return this[_0x1730de(0x217)][_0x153365]||0x0;else{if(!_0x91aaa1)continue;this[_0x1730de(0x2c2)](_0x91aaa1['id']);}}},Game_Battler[_0x30c775(0x150)][_0x30c775(0x3bd)]=function(){const _0x1693bc=_0x30c775;for(const _0x118082 of this[_0x1693bc(0x1a8)]()){if(_0x1693bc(0x1b2)===_0x1693bc(0x1b2)){if(!_0x118082)continue;_0x118082[_0x1693bc(0x283)][_0x1693bc(0x298)](/<JS SLIP REFRESH>/i)&&this[_0x1693bc(0x2c2)](_0x118082['id']);}else this['isBuffAffected'](_0x290f6b)&&(_0x55ef9f+=this['buffTurns'](_0x36b79a),this['setStateTurns'](_0x2f5bda,_0x3f68b7));}},Game_Battler['prototype'][_0x30c775(0x335)]=function(){const _0x4f57b4=_0x30c775;if(!this['isAlive']())return;const _0x5e9453=this[_0x4f57b4(0x1a8)]();for(const _0x1025a8 of _0x5e9453){if(_0x4f57b4(0x317)!==_0x4f57b4(0x317)){const _0x53c754=_0x3dc6b9[_0x4f57b4(0x306)]('['+_0x347cd2['$1'][_0x4f57b4(0x298)](/\d+/g)+']');for(const _0x43a00e of _0x53c754){if(!_0x4a2810['hasSkill'](_0x43a00e))return![];}return!![];}else{if(!_0x1025a8)continue;this[_0x4f57b4(0x2f1)](_0x1025a8);}}},Game_Battler[_0x30c775(0x150)]['onRegenerateCustomStateDamageOverTime']=function(_0x46e281){const _0x3b2861=_0x30c775,_0x41731b=this[_0x3b2861(0x1be)](_0x46e281['id'],_0x3b2861(0x476))||0x0,_0x114b60=-this[_0x3b2861(0x2fb)](),_0x3df6ba=Math[_0x3b2861(0x156)](_0x41731b,_0x114b60);if(_0x3df6ba!==0x0){const _0x42a07f=this['_result'][_0x3b2861(0x14e)]||0x0;this[_0x3b2861(0x3c4)](_0x3df6ba),this[_0x3b2861(0x202)]['hpDamage']+=_0x42a07f;}const _0x1fa3c9=this[_0x3b2861(0x1be)](_0x46e281['id'],_0x3b2861(0x2f6))||0x0;if(_0x1fa3c9!==0x0){const _0x3f0b46=this['_result'][_0x3b2861(0x2b7)]||0x0;this[_0x3b2861(0x22e)](_0x1fa3c9),this[_0x3b2861(0x202)][_0x3b2861(0x2b7)]+=_0x3f0b46;}const _0xfb2692=this[_0x3b2861(0x1be)](_0x46e281['id'],_0x3b2861(0x23c))||0x0;_0xfb2692!==0x0&&this[_0x3b2861(0x373)](_0xfb2692);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x1f4)]=Game_Actor[_0x30c775(0x150)][_0x30c775(0x3c2)],Game_Actor[_0x30c775(0x150)][_0x30c775(0x3c2)]=function(){const _0x5b788b=_0x30c775,_0x410a0c=VisuMZ[_0x5b788b(0x293)]['Game_Actor_skillTypes'][_0x5b788b(0x2a8)](this),_0x528be6=VisuMZ[_0x5b788b(0x293)][_0x5b788b(0x2ef)]['Skills'];let _0x203580=_0x528be6[_0x5b788b(0x312)];if($gameParty[_0x5b788b(0x458)]()){if(_0x5b788b(0x1cf)!=='NaKFP')_0x203580=_0x203580[_0x5b788b(0x420)](_0x528be6[_0x5b788b(0x250)]);else return _0x2c9ea0;}return _0x410a0c[_0x5b788b(0x329)](_0x52feb2=>!_0x203580[_0x5b788b(0x33e)](_0x52feb2));},Game_Actor[_0x30c775(0x150)][_0x30c775(0x22b)]=function(){const _0x9e0215=_0x30c775;return this[_0x9e0215(0x46d)]()['filter'](_0x9a8aee=>this[_0x9e0215(0x337)](_0x9a8aee));},Game_Actor[_0x30c775(0x150)][_0x30c775(0x337)]=function(_0x350a06){const _0x58b102=_0x30c775;if(!this['canUse'](_0x350a06))return![];if(!_0x350a06)return![];if(!this[_0x58b102(0x43e)](_0x350a06))return![];if(this['isSkillHidden'](_0x350a06))return![];return!![];},Game_Actor[_0x30c775(0x150)][_0x30c775(0x43e)]=function(_0x57efc3){const _0x534389=_0x30c775,_0xd7fb85=this[_0x534389(0x3c2)](),_0xde1680=DataManager[_0x534389(0x425)](_0x57efc3),_0x170e60=_0xd7fb85['filter'](_0x8905ca=>_0xde1680[_0x534389(0x33e)](_0x8905ca));return _0x170e60[_0x534389(0x2a1)]>0x0;},Game_Actor[_0x30c775(0x150)][_0x30c775(0x1ed)]=function(_0xc5f484){const _0x847f88=_0x30c775;if(!VisuMZ[_0x847f88(0x293)][_0x847f88(0x21d)](this,_0xc5f484))return!![];if(!VisuMZ[_0x847f88(0x293)][_0x847f88(0x31e)](this,_0xc5f484))return!![];if(!VisuMZ[_0x847f88(0x293)][_0x847f88(0x42c)](this,_0xc5f484))return!![];return![];},Game_Actor[_0x30c775(0x150)][_0x30c775(0x40a)]=function(){const _0x4f8e98=_0x30c775;let _0x28000f=[this[_0x4f8e98(0x272)](),this[_0x4f8e98(0x313)]()];_0x28000f=_0x28000f['concat'](this[_0x4f8e98(0x34e)]()['filter'](_0x2e1141=>_0x2e1141));for(const _0x3fd721 of this[_0x4f8e98(0x474)]){if(_0x4f8e98(0x3f1)!==_0x4f8e98(0x3f9)){const _0x27a315=$dataSkills[_0x3fd721];if(_0x27a315)_0x28000f[_0x4f8e98(0x25f)](_0x27a315);}else _0x30cead[_0x4f8e98(0x293)][_0x4f8e98(0x394)][_0x4f8e98(0x2a8)](this,_0x318815),this[_0x4f8e98(0x254)]={},this[_0x4f8e98(0x2dc)]();}return _0x28000f;},Game_Actor[_0x30c775(0x150)]['addPassiveStatesByPluginParameters']=function(){const _0x23e74f=_0x30c775;Game_Battler[_0x23e74f(0x150)][_0x23e74f(0x20a)][_0x23e74f(0x2a8)](this);const _0x292e58=VisuMZ['SkillsStatesCore']['Settings'][_0x23e74f(0x32a)][_0x23e74f(0x344)];this[_0x23e74f(0x254)]['passiveStates']=this[_0x23e74f(0x254)]['passiveStates'][_0x23e74f(0x420)](_0x292e58);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x396)]=Game_Actor[_0x30c775(0x150)]['learnSkill'],Game_Actor[_0x30c775(0x150)][_0x30c775(0x2da)]=function(_0xda4831){const _0x20c7b5=_0x30c775;VisuMZ[_0x20c7b5(0x293)][_0x20c7b5(0x396)][_0x20c7b5(0x2a8)](this,_0xda4831),this[_0x20c7b5(0x254)]={},this[_0x20c7b5(0x2dc)]();},VisuMZ['SkillsStatesCore']['Game_Actor_forgetSkill']=Game_Actor[_0x30c775(0x150)][_0x30c775(0x31f)],Game_Actor[_0x30c775(0x150)][_0x30c775(0x31f)]=function(_0x403f4c){const _0xee2b1a=_0x30c775;VisuMZ[_0xee2b1a(0x293)][_0xee2b1a(0x394)][_0xee2b1a(0x2a8)](this,_0x403f4c),this[_0xee2b1a(0x254)]={},this[_0xee2b1a(0x2dc)]();},Game_Actor[_0x30c775(0x150)][_0x30c775(0x431)]=function(){const _0x421e99=_0x30c775;return VisuMZ[_0x421e99(0x293)]['Settings'][_0x421e99(0x371)]['TurnEndOnMap']??0x14;},Game_Enemy[_0x30c775(0x150)][_0x30c775(0x40a)]=function(){const _0x237e6b=_0x30c775;let _0x1d2fc5=[this[_0x237e6b(0x336)]()];return _0x1d2fc5[_0x237e6b(0x420)](this[_0x237e6b(0x46d)]());},Game_Enemy['prototype'][_0x30c775(0x20a)]=function(){const _0x2291b9=_0x30c775;Game_Battler[_0x2291b9(0x150)][_0x2291b9(0x20a)]['call'](this);const _0x125463=VisuMZ[_0x2291b9(0x293)][_0x2291b9(0x2ef)][_0x2291b9(0x32a)]['Enemy'];this[_0x2291b9(0x254)][_0x2291b9(0x2dc)]=this[_0x2291b9(0x254)][_0x2291b9(0x2dc)][_0x2291b9(0x420)](_0x125463);},Game_Enemy[_0x30c775(0x150)][_0x30c775(0x46d)]=function(){const _0x1a2eda=_0x30c775,_0x322b18=[];for(const _0x232d68 of this[_0x1a2eda(0x336)]()[_0x1a2eda(0x2ad)]){const _0x494aa7=$dataSkills[_0x232d68[_0x1a2eda(0x481)]];if(_0x494aa7&&!_0x322b18[_0x1a2eda(0x33e)](_0x494aa7))_0x322b18[_0x1a2eda(0x25f)](_0x494aa7);}return _0x322b18;},Game_Enemy[_0x30c775(0x150)][_0x30c775(0x1b7)]=function(_0x3c6d5f){const _0x4c0a7c=_0x30c775;return this[_0x4c0a7c(0x2f3)]($dataStates[_0x3c6d5f]);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x1b1)]=Game_Unit[_0x30c775(0x150)][_0x30c775(0x362)],Game_Unit[_0x30c775(0x150)][_0x30c775(0x362)]=function(){const _0x1e0464=_0x30c775;if(this[_0x1e0464(0x37c)]())return!![];return VisuMZ[_0x1e0464(0x293)][_0x1e0464(0x1b1)]['call'](this);},Game_Unit[_0x30c775(0x150)][_0x30c775(0x37c)]=function(){const _0x33a7cb=_0x30c775,_0x53a8fe=this[_0x33a7cb(0x1ea)]();for(const _0xd40580 of _0x53a8fe){if(_0x33a7cb(0x273)!==_0x33a7cb(0x1e0)){if(!_0xd40580[_0x33a7cb(0x226)]())return![];}else{if(!_0xb06ec3[_0x33a7cb(0x293)][_0x33a7cb(0x21d)](this,_0x5017ec))return!![];if(!_0xcd68da[_0x33a7cb(0x293)][_0x33a7cb(0x31e)](this,_0x5c0271))return!![];if(!_0x38c468[_0x33a7cb(0x293)][_0x33a7cb(0x42c)](this,_0x407887))return!![];return![];}}return!![];},VisuMZ[_0x30c775(0x293)][_0x30c775(0x435)]=Game_Troop[_0x30c775(0x150)][_0x30c775(0x46a)],Game_Troop[_0x30c775(0x150)][_0x30c775(0x46a)]=function(_0x49ff03){const _0x3f167f=_0x30c775;VisuMZ[_0x3f167f(0x293)]['Game_Troop_setup'][_0x3f167f(0x2a8)](this,_0x49ff03),this[_0x3f167f(0x2bc)]();},Game_Troop[_0x30c775(0x150)][_0x30c775(0x2bc)]=function(){const _0x1c0de7=_0x30c775;this['_currentTroopUniqueID']=Graphics[_0x1c0de7(0x269)];},Game_Troop['prototype'][_0x30c775(0x2f8)]=function(){const _0x541e11=_0x30c775;return this['_currentTroopUniqueID']=this[_0x541e11(0x3fe)]||Graphics[_0x541e11(0x269)],this[_0x541e11(0x3fe)];},Scene_Skill['prototype']['isBottomHelpMode']=function(){const _0x4aed07=_0x30c775;if(ConfigManager[_0x4aed07(0x41a)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x4aed07(0x384)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x4aed07(0x173)]()['match'](/LOWER/i);else{if('nUbMG'!=='kfqyt')Scene_ItemBase['prototype'][_0x4aed07(0x3a1)][_0x4aed07(0x2a8)](this);else{if(!_0x50a418[_0x4aed07(0x441)](_0x30fb5e))return!![];}}}},Scene_Skill[_0x30c775(0x150)][_0x30c775(0x3a1)]=function(){const _0x3dbe49=_0x30c775;if(ConfigManager[_0x3dbe49(0x41a)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x3dbe49(0x3b0)];else return this[_0x3dbe49(0x161)]()?this[_0x3dbe49(0x173)]()[_0x3dbe49(0x298)](/RIGHT/i):Scene_ItemBase[_0x3dbe49(0x150)][_0x3dbe49(0x3a1)]['call'](this);},Scene_Skill[_0x30c775(0x150)][_0x30c775(0x173)]=function(){const _0x166ef8=_0x30c775;return VisuMZ[_0x166ef8(0x293)][_0x166ef8(0x2ef)][_0x166ef8(0x1f6)][_0x166ef8(0x2b6)];},Scene_Skill[_0x30c775(0x150)]['isUseModernControls']=function(){const _0x19e5b6=_0x30c775;return this['_categoryWindow']&&this[_0x19e5b6(0x271)][_0x19e5b6(0x43f)]();},Scene_Skill[_0x30c775(0x150)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x169ea8=_0x30c775;return VisuMZ[_0x169ea8(0x293)][_0x169ea8(0x2ef)][_0x169ea8(0x1f6)][_0x169ea8(0x42f)];},VisuMZ[_0x30c775(0x293)][_0x30c775(0x3a9)]=Scene_Skill[_0x30c775(0x150)][_0x30c775(0x22f)],Scene_Skill['prototype'][_0x30c775(0x22f)]=function(){const _0x292874=_0x30c775;if(this[_0x292874(0x161)]())return this[_0x292874(0x395)]();else{if('hRHPf'!==_0x292874(0x45b)){const _0x552004=_0x31fb4d['getStateIdWithName'](_0x36e5c8['$1']);if(_0x5d6d14[_0x292874(0x27a)](_0x552004))return!![];}else return VisuMZ['SkillsStatesCore'][_0x292874(0x3a9)]['call'](this);}},Scene_Skill[_0x30c775(0x150)][_0x30c775(0x395)]=function(){const _0x145063=_0x30c775,_0x48d1dd=0x0,_0x7f2f49=this[_0x145063(0x369)](),_0x44d106=Graphics[_0x145063(0x47c)],_0x141ea2=this['helpAreaHeight']();return new Rectangle(_0x48d1dd,_0x7f2f49,_0x44d106,_0x141ea2);},VisuMZ['SkillsStatesCore'][_0x30c775(0x333)]=Scene_Skill[_0x30c775(0x150)]['skillTypeWindowRect'],Scene_Skill['prototype']['skillTypeWindowRect']=function(){const _0x35b836=_0x30c775;return this[_0x35b836(0x161)]()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0x35b836(0x293)][_0x35b836(0x333)][_0x35b836(0x2a8)](this);},Scene_Skill[_0x30c775(0x150)][_0x30c775(0x14b)]=function(){const _0x211b10=_0x30c775;return VisuMZ[_0x211b10(0x293)]['Settings']['Skills'][_0x211b10(0x433)]??Scene_MenuBase[_0x211b10(0x150)][_0x211b10(0x14b)][_0x211b10(0x2a8)](this);},Scene_Skill[_0x30c775(0x150)][_0x30c775(0x3f5)]=function(){const _0x361c2b=_0x30c775,_0x5863a8=this[_0x361c2b(0x14b)](),_0x54cc57=this[_0x361c2b(0x14d)](0x3,!![]),_0x37c5fe=this['isRightInputMode']()?Graphics[_0x361c2b(0x47c)]-_0x5863a8:0x0,_0x1e2f41=this['mainAreaTop']();return new Rectangle(_0x37c5fe,_0x1e2f41,_0x5863a8,_0x54cc57);},VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect']=Scene_Skill[_0x30c775(0x150)]['statusWindowRect'],Scene_Skill[_0x30c775(0x150)][_0x30c775(0x251)]=function(){const _0x1cde95=_0x30c775;return this[_0x1cde95(0x161)]()?this['statusWindowRectSkillsStatesCore']():VisuMZ[_0x1cde95(0x293)][_0x1cde95(0x182)][_0x1cde95(0x2a8)](this);},Scene_Skill[_0x30c775(0x150)]['statusWindowRectSkillsStatesCore']=function(){const _0x480bcf=_0x30c775,_0x575215=Graphics[_0x480bcf(0x47c)]-this[_0x480bcf(0x14b)](),_0x2c806d=this[_0x480bcf(0x428)][_0x480bcf(0x3a0)],_0xcbf81=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x575215,_0x4c5f5f=this[_0x480bcf(0x229)]();return new Rectangle(_0xcbf81,_0x4c5f5f,_0x575215,_0x2c806d);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x19d)]=Scene_Skill[_0x30c775(0x150)]['createItemWindow'],Scene_Skill[_0x30c775(0x150)]['createItemWindow']=function(){const _0x1e3ab7=_0x30c775;VisuMZ[_0x1e3ab7(0x293)]['Scene_Skill_createItemWindow'][_0x1e3ab7(0x2a8)](this),this[_0x1e3ab7(0x34c)]()&&('ubMQT'===_0x1e3ab7(0x31a)?(this[_0x1e3ab7(0x3bd)](),_0x403e5b[_0x1e3ab7(0x293)][_0x1e3ab7(0x2de)][_0x1e3ab7(0x2a8)](this),this[_0x1e3ab7(0x39a)](),this[_0x1e3ab7(0x335)]()):this[_0x1e3ab7(0x41c)]());},VisuMZ['SkillsStatesCore']['Scene_Skill_itemWindowRect']=Scene_Skill[_0x30c775(0x150)][_0x30c775(0x477)],Scene_Skill['prototype']['itemWindowRect']=function(){const _0x5caee1=_0x30c775;if(this[_0x5caee1(0x161)]())return _0x5caee1(0x21a)==='Thfhz'?this[_0x5caee1(0x245)]():this['_stateRetainType'];else{const _0x447b0e=VisuMZ[_0x5caee1(0x293)][_0x5caee1(0x1d5)][_0x5caee1(0x2a8)](this);return this['allowCreateShopStatusWindow']()&&this[_0x5caee1(0x321)]()&&(_0x5caee1(0x460)==='OTpFQ'?(this[_0x5caee1(0x3ba)](_0x2b857c),this[_0x5caee1(0x180)](_0x24bd8f),_0x50f88d[_0x5caee1(0x150)][_0x5caee1(0x1e5)][_0x5caee1(0x2a8)](this,_0x1a1c05)):_0x447b0e['width']-=this[_0x5caee1(0x2ae)]()),_0x447b0e;}},Scene_Skill[_0x30c775(0x150)]['itemWindowRectSkillsStatesCore']=function(){const _0x1a3fea=_0x30c775,_0x370b2f=Graphics[_0x1a3fea(0x47c)]-this['shopStatusWidth'](),_0x306e6e=this[_0x1a3fea(0x16b)]()-this[_0x1a3fea(0x274)][_0x1a3fea(0x3a0)],_0x2d57db=this['isRightInputMode']()?Graphics['boxWidth']-_0x370b2f:0x0,_0xa9700e=this[_0x1a3fea(0x274)]['y']+this['_statusWindow'][_0x1a3fea(0x3a0)];return new Rectangle(_0x2d57db,_0xa9700e,_0x370b2f,_0x306e6e);},Scene_Skill[_0x30c775(0x150)][_0x30c775(0x34c)]=function(){const _0x57017a=_0x30c775;if(!Imported[_0x57017a(0x221)])return![];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return!![];else{if('JSHEz'!==_0x57017a(0x454))return VisuMZ['SkillsStatesCore'][_0x57017a(0x2ef)]['Skills']['ShowShopStatus'];else this[_0x57017a(0x2c1)](_0x4703df,_0x43e299);}}},Scene_Skill['prototype'][_0x30c775(0x321)]=function(){const _0x4a81e6=_0x30c775;return VisuMZ[_0x4a81e6(0x293)][_0x4a81e6(0x2ef)][_0x4a81e6(0x1f6)][_0x4a81e6(0x391)];},Scene_Skill['prototype'][_0x30c775(0x41c)]=function(){const _0xe28fa=_0x30c775,_0x55515a=this[_0xe28fa(0x465)]();this[_0xe28fa(0x162)]=new Window_ShopStatus(_0x55515a),this['addWindow'](this['_shopStatusWindow']),this[_0xe28fa(0x284)][_0xe28fa(0x377)](this[_0xe28fa(0x162)]);const _0x37a1a1=VisuMZ[_0xe28fa(0x293)][_0xe28fa(0x2ef)][_0xe28fa(0x1f6)][_0xe28fa(0x37e)];this[_0xe28fa(0x162)][_0xe28fa(0x2b3)](_0x37a1a1||0x0);},Scene_Skill[_0x30c775(0x150)]['shopStatusWindowRect']=function(){const _0x3f7057=_0x30c775;if(this[_0x3f7057(0x161)]()){if('FsvtJ'!=='FsvtJ'){_0x2b280a[_0x3f7057(0x293)][_0x3f7057(0x3be)]['call'](this);const _0x369875=_0x3ad448[_0x3f7057(0x293)]['Settings'][_0x3f7057(0x32a)][_0x3f7057(0x188)]??!![];if(!_0x369875)return;if(_0x13811a[_0x3f7057(0x316)]())for(const _0x175769 of _0x4ccb1c[_0x3f7057(0x2e3)]()){if(_0x175769)_0x175769[_0x3f7057(0x1bc)]();}}else return this[_0x3f7057(0x225)]();}else{if(_0x3f7057(0x232)!==_0x3f7057(0x232))_0x5a15ba[_0x3f7057(0x293)][_0x3f7057(0x2ef)][_0x3f7057(0x371)][_0x3f7057(0x2b9)][_0x3f7057(0x2a8)](this,_0x5c79a7);else return VisuMZ[_0x3f7057(0x293)][_0x3f7057(0x2ef)][_0x3f7057(0x1f6)][_0x3f7057(0x2fc)][_0x3f7057(0x2a8)](this);}},Scene_Skill['prototype'][_0x30c775(0x225)]=function(){const _0x55d7b8=_0x30c775,_0x2f6990=this['shopStatusWidth'](),_0x146462=this[_0x55d7b8(0x284)]['height'],_0x599e65=this[_0x55d7b8(0x3a1)]()?0x0:Graphics[_0x55d7b8(0x47c)]-this[_0x55d7b8(0x2ae)](),_0x3bd232=this[_0x55d7b8(0x284)]['y'];return new Rectangle(_0x599e65,_0x3bd232,_0x2f6990,_0x146462);},Scene_Skill[_0x30c775(0x150)]['shopStatusWidth']=function(){const _0x1d29da=_0x30c775;return Imported['VisuMZ_1_ItemsEquipsCore']?Scene_Shop[_0x1d29da(0x150)]['statusWidth']():0x0;},Scene_Skill[_0x30c775(0x150)][_0x30c775(0x3f4)]=function(){const _0x16ce04=_0x30c775;return this[_0x16ce04(0x428)]&&this[_0x16ce04(0x428)][_0x16ce04(0x286)]?TextManager[_0x16ce04(0x442)]:'';},VisuMZ['SkillsStatesCore'][_0x30c775(0x418)]=Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x1d0)],Sprite_Gauge['prototype'][_0x30c775(0x1d0)]=function(){const _0x71ef14=_0x30c775;VisuMZ['SkillsStatesCore'][_0x71ef14(0x418)][_0x71ef14(0x2a8)](this),this[_0x71ef14(0x2dd)]=null;},VisuMZ['SkillsStatesCore'][_0x30c775(0x2ab)]=Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x46a)],Sprite_Gauge['prototype'][_0x30c775(0x46a)]=function(_0x7aac94,_0x26dc22){const _0x5a34a1=_0x30c775;this[_0x5a34a1(0x151)](_0x7aac94,_0x26dc22),_0x26dc22=_0x26dc22[_0x5a34a1(0x29d)](),VisuMZ[_0x5a34a1(0x293)][_0x5a34a1(0x2ab)][_0x5a34a1(0x2a8)](this,_0x7aac94,_0x26dc22);},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x151)]=function(_0x2778cb,_0x3fa685){const _0x30e915=_0x30c775,_0x51ddbf=VisuMZ[_0x30e915(0x293)][_0x30e915(0x2ef)][_0x30e915(0x1ac)][_0x30e915(0x329)](_0x182000=>_0x182000[_0x30e915(0x2eb)][_0x30e915(0x455)]()===_0x3fa685[_0x30e915(0x455)]());_0x51ddbf[_0x30e915(0x2a1)]>=0x1?this['_costSettings']=_0x51ddbf[0x0]:this[_0x30e915(0x2dd)]=null;},VisuMZ[_0x30c775(0x293)][_0x30c775(0x2f7)]=Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x445)],Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x445)]=function(){const _0x325635=_0x30c775;return this[_0x325635(0x2ff)]&&this[_0x325635(0x2dd)]?this[_0x325635(0x2ca)]():VisuMZ['SkillsStatesCore'][_0x325635(0x2f7)][_0x325635(0x2a8)](this);},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x2ca)]=function(){const _0x55ec61=_0x30c775;return this[_0x55ec61(0x2dd)][_0x55ec61(0x461)]['call'](this[_0x55ec61(0x2ff)]);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x266)]=Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x38c)],Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x38c)]=function(){const _0x2712dc=_0x30c775;if(this['_battler']&&this[_0x2712dc(0x2dd)]){if('sNkaY'!==_0x2712dc(0x294))return this[_0x2712dc(0x1ce)]();else{const _0x11e370=_0x5de2ec[_0x2712dc(0x283)];return _0x11e370[_0x2712dc(0x298)](/<REAPPLY RULES:[ ](.*)>/i)?_0x52360c(_0x25ae46['$1']):_0x50ee5d[_0x2712dc(0x293)][_0x2712dc(0x2ef)][_0x2712dc(0x371)][_0x2712dc(0x22d)];}}else return VisuMZ['SkillsStatesCore'][_0x2712dc(0x266)][_0x2712dc(0x2a8)](this);},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x1ce)]=function(){const _0x173ea2=_0x30c775;return this[_0x173ea2(0x2dd)][_0x173ea2(0x464)][_0x173ea2(0x2a8)](this['_battler']);},VisuMZ['SkillsStatesCore'][_0x30c775(0x166)]=Sprite_Gauge['prototype'][_0x30c775(0x3c8)],Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x3c8)]=function(){const _0x24a5f3=_0x30c775,_0x2fe563=VisuMZ[_0x24a5f3(0x293)]['Sprite_Gauge_gaugeRate'][_0x24a5f3(0x2a8)](this);return _0x2fe563[_0x24a5f3(0x2c4)](0x0,0x1);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x1fb)]=Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x248)],Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x248)]=function(){const _0x193b9c=_0x30c775;this[_0x193b9c(0x2ff)]&&this['_costSettings']?(this[_0x193b9c(0x1f8)][_0x193b9c(0x404)](),this[_0x193b9c(0x2d6)]()):_0x193b9c(0x3fd)!==_0x193b9c(0x3fd)?_0x1a0b2f[_0x193b9c(0x293)]['Settings']['Buffs']['onExpireDebuffJS'][_0x193b9c(0x2a8)](this,_0x10a030):VisuMZ[_0x193b9c(0x293)]['Sprite_Gauge_redraw'][_0x193b9c(0x2a8)](this);},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x281)]=function(){const _0x3a5ea3=_0x30c775;let _0x1d47b1=this[_0x3a5ea3(0x445)]();return Imported['VisuMZ_0_CoreEngine']&&this[_0x3a5ea3(0x42b)]()&&(_0x1d47b1=VisuMZ['GroupDigits'](_0x1d47b1)),_0x1d47b1;},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x2d6)]=function(){const _0x5dfd97=_0x30c775;this['bitmap'][_0x5dfd97(0x404)](),this[_0x5dfd97(0x2dd)][_0x5dfd97(0x39b)][_0x5dfd97(0x2a8)](this);},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x147)]=function(_0x34f4e9,_0x4e7a35,_0x486690,_0x52ca5d,_0x33ceb7,_0x24a784){const _0x27a6fb=_0x30c775,_0x26606d=this[_0x27a6fb(0x3c8)](),_0x123bbc=Math['floor']((_0x33ceb7-0x2)*_0x26606d),_0x3f1e89=_0x24a784-0x2,_0x5ddcb9=this[_0x27a6fb(0x332)]();this['bitmap']['fillRect'](_0x486690,_0x52ca5d,_0x33ceb7,_0x24a784,_0x5ddcb9),this[_0x27a6fb(0x1f8)][_0x27a6fb(0x3cc)](_0x486690+0x1,_0x52ca5d+0x1,_0x123bbc,_0x3f1e89,_0x34f4e9,_0x4e7a35);},Sprite_Gauge[_0x30c775(0x150)]['labelFontFace']=function(){const _0x5e72df=_0x30c775,_0x51ea50=VisuMZ[_0x5e72df(0x293)][_0x5e72df(0x2ef)][_0x5e72df(0x24c)];return _0x51ea50[_0x5e72df(0x359)]===_0x5e72df(0x38e)?_0x5e72df(0x2cd)===_0x5e72df(0x215)?this['_skillTypeWindow']&&this[_0x5e72df(0x428)][_0x5e72df(0x286)]?_0x3b72c9[_0x5e72df(0x442)]:'':$gameSystem[_0x5e72df(0x22a)]():$gameSystem[_0x5e72df(0x1a7)]();},Sprite_Gauge['prototype'][_0x30c775(0x155)]=function(){const _0x44621c=_0x30c775,_0x24fb9e=VisuMZ[_0x44621c(0x293)][_0x44621c(0x2ef)]['Gauge'];if(_0x24fb9e['LabelFontMainType']===_0x44621c(0x38e)){if(_0x44621c(0x181)==='ZoNBc'){const _0x1366a0=_0x3465fd['parse']('['+_0x222e2f['$1'][_0x44621c(0x298)](/\d+/g)+']');for(const _0x401c46 of _0x1366a0){if(!_0x134661[_0x44621c(0x3dc)](_0x401c46))return!![];}return![];}else return $gameSystem[_0x44621c(0x2f5)]()-0x6;}else{if(_0x44621c(0x2cb)!==_0x44621c(0x2cb)){const _0x325366=this['itemLineRect'](this[_0x44621c(0x389)]());let _0x21b485=this[_0x44621c(0x207)](this['index']());_0x21b485=_0x21b485['replace'](/\\I\[(\d+)\]/gi,''),_0x13064e['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x21b485,_0x325366),this[_0x44621c(0x3a3)](_0x21b485,_0x325366),this[_0x44621c(0x167)](_0x21b485,_0x325366);}else return $gameSystem[_0x44621c(0x2f5)]()-0x2;}},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x1e2)]=function(){const _0x58f072=_0x30c775,_0x100dff=VisuMZ[_0x58f072(0x293)][_0x58f072(0x2ef)][_0x58f072(0x24c)];if(_0x100dff['ValueFontMainType']==='number')return $gameSystem['numberFontFace']();else{if(_0x58f072(0x2d0)!==_0x58f072(0x2d0)){let _0x57318e=_0xb72d94[_0x58f072(0x293)][_0x58f072(0x416)][_0x58f072(0x2a8)](this);return _0x316250['_endingBattle']&&(_0x57318e=_0x57318e[_0x58f072(0x420)](this[_0x58f072(0x171)]()[_0x58f072(0x329)](_0x1ac407=>_0x1ac407[_0x58f072(0x226)]()))),_0x57318e;}else return $gameSystem[_0x58f072(0x1a7)]();}},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x1f3)]=function(){const _0x50a33a=_0x30c775,_0x3fc80e=VisuMZ['SkillsStatesCore'][_0x50a33a(0x2ef)][_0x50a33a(0x24c)];return _0x3fc80e[_0x50a33a(0x15a)]==='number'?$gameSystem[_0x50a33a(0x2f5)]()-0x6:$gameSystem['mainFontSize']()-0x2;},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x330)]=function(){const _0x28a6ca=_0x30c775,_0x50efb7=VisuMZ['SkillsStatesCore'][_0x28a6ca(0x2ef)][_0x28a6ca(0x24c)];if(_0x50efb7[_0x28a6ca(0x14f)]){if(_0x50efb7[_0x28a6ca(0x193)]===0x1)return'IJQLJ'!==_0x28a6ca(0x1ca)?_0x4c47eb(_0x4cafbf['$1']):this[_0x28a6ca(0x1c3)]();else{if(_0x50efb7[_0x28a6ca(0x193)]===0x2)return this[_0x28a6ca(0x39f)]();}}const _0x3ce219=_0x50efb7[_0x28a6ca(0x2b5)];return ColorManager[_0x28a6ca(0x1ad)](_0x3ce219);},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x2fa)]=function(){const _0x469eb4=_0x30c775,_0x48b8c6=VisuMZ[_0x469eb4(0x293)][_0x469eb4(0x2ef)][_0x469eb4(0x24c)];if(this[_0x469eb4(0x30b)]()<=0x0){if('MclNn'==='eSqoD')this[_0x469eb4(0x2dd)]=_0x3cd44b[0x0];else return _0x469eb4(0x26a);}else{if(_0x48b8c6[_0x469eb4(0x264)]){if(_0x469eb4(0x390)!==_0x469eb4(0x35d))return _0x469eb4(0x351);else{const _0x4a3c19=_0x1e6824[_0x469eb4(0x283)];if(_0x4a3c19[_0x469eb4(0x298)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x161602=_0x26005f(_0x43423b['$1']),_0x2b0d2e=_0x469eb4(0x222)[_0x469eb4(0x1dd)](_0x161602);_0x3c2363[_0x469eb4(0x293)]['skillEnableJS'][_0x1a1066['id']]=new _0x566b5e(_0x469eb4(0x178),_0x2b0d2e);}if(_0x4a3c19['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x19d6e1=_0x16e5d6(_0x5236fd['$1']),_0x278a58=_0x469eb4(0x468)[_0x469eb4(0x1dd)](_0x19d6e1);_0x146b30[_0x469eb4(0x293)][_0x469eb4(0x3e3)][_0x4eeb0c['id']]=new _0x224e6c('skill',_0x278a58);}}}else return _0x469eb4(0x239)!==_0x469eb4(0x239)?_0x469eb4(0x26a):ColorManager[_0x469eb4(0x29a)]();}},Sprite_Gauge[_0x30c775(0x150)]['labelOutlineWidth']=function(){const _0x2c42f3=_0x30c775;return VisuMZ[_0x2c42f3(0x293)][_0x2c42f3(0x2ef)][_0x2c42f3(0x24c)][_0x2c42f3(0x288)]||0x0;},Sprite_Gauge[_0x30c775(0x150)]['valueOutlineColor']=function(){const _0x5e07c9=_0x30c775,_0x51aae7=VisuMZ['SkillsStatesCore'][_0x5e07c9(0x2ef)][_0x5e07c9(0x24c)];if(this[_0x5e07c9(0x1fc)]()<=0x0){if(_0x5e07c9(0x1d3)===_0x5e07c9(0x1d3))return _0x5e07c9(0x26a);else this[_0x5e07c9(0x434)][_0x5e07c9(0x354)]=_0x575470[_0x5e07c9(0x1a7)](),this[_0x5e07c9(0x434)][_0x5e07c9(0x3b5)]=_0x2f61da[_0x5e07c9(0x2f5)](),this['resetTextColor']();}else return _0x51aae7[_0x5e07c9(0x42e)]?_0x5e07c9(0x29b)===_0x5e07c9(0x29b)?_0x5e07c9(0x351):_0xd60204[_0x5e07c9(0x2f5)]()-0x2:ColorManager['outlineColor']();},Sprite_Gauge[_0x30c775(0x150)][_0x30c775(0x1fc)]=function(){const _0x5a398a=_0x30c775;return VisuMZ[_0x5a398a(0x293)][_0x5a398a(0x2ef)][_0x5a398a(0x24c)]['ValueOutlineWidth']||0x0;},VisuMZ[_0x30c775(0x293)][_0x30c775(0x2bf)]=Sprite_StateIcon[_0x30c775(0x150)][_0x30c775(0x40f)],Sprite_StateIcon[_0x30c775(0x150)][_0x30c775(0x40f)]=function(){const _0x5962bb=_0x30c775;VisuMZ[_0x5962bb(0x293)][_0x5962bb(0x2bf)]['call'](this),this['createTurnDisplaySprite']();},Sprite_StateIcon['prototype'][_0x30c775(0x1db)]=function(){const _0x4aabc5=_0x30c775,_0x29af3a=Window_Base[_0x4aabc5(0x150)]['lineHeight']();this['_turnDisplaySprite']=new Sprite(),this[_0x4aabc5(0x28f)][_0x4aabc5(0x1f8)]=new Bitmap(ImageManager[_0x4aabc5(0x320)],_0x29af3a),this['_turnDisplaySprite'][_0x4aabc5(0x398)]['x']=this[_0x4aabc5(0x398)]['x'],this[_0x4aabc5(0x28f)][_0x4aabc5(0x398)]['y']=this[_0x4aabc5(0x398)]['y'],this['addChild'](this['_turnDisplaySprite']),this['contents']=this[_0x4aabc5(0x28f)][_0x4aabc5(0x1f8)];},VisuMZ[_0x30c775(0x293)][_0x30c775(0x2b0)]=Sprite_StateIcon['prototype'][_0x30c775(0x197)],Sprite_StateIcon['prototype']['updateFrame']=function(){const _0x5c0eb5=_0x30c775;VisuMZ['SkillsStatesCore'][_0x5c0eb5(0x2b0)][_0x5c0eb5(0x2a8)](this),this[_0x5c0eb5(0x1c9)]();},Sprite_StateIcon[_0x30c775(0x150)]['drawText']=function(_0x147480,_0x1167a7,_0x4ca603,_0x1e3b63,_0xc0ea6f){const _0x36acdf=_0x30c775;this[_0x36acdf(0x434)][_0x36acdf(0x417)](_0x147480,_0x1167a7,_0x4ca603,_0x1e3b63,this[_0x36acdf(0x434)][_0x36acdf(0x3a0)],_0xc0ea6f);},Sprite_StateIcon['prototype'][_0x30c775(0x1c9)]=function(){const _0x42ed54=_0x30c775;this[_0x42ed54(0x1ab)](),this[_0x42ed54(0x434)][_0x42ed54(0x404)]();const _0x351816=this[_0x42ed54(0x2ff)];if(!_0x351816)return;const _0x9e9fbe=_0x351816[_0x42ed54(0x1a8)]()[_0x42ed54(0x329)](_0x1039ce=>_0x1039ce[_0x42ed54(0x45f)]>0x0),_0x7b8696=[...Array(0x8)['keys']()][_0x42ed54(0x329)](_0x1d61f1=>_0x351816[_0x42ed54(0x1c8)](_0x1d61f1)!==0x0),_0x4ae816=this[_0x42ed54(0x26b)],_0x31fb89=_0x9e9fbe[_0x4ae816];if(_0x31fb89)Window_Base['prototype'][_0x42ed54(0x29f)][_0x42ed54(0x2a8)](this,_0x351816,_0x31fb89,0x0,0x0),Window_Base[_0x42ed54(0x150)]['drawActorStateData'][_0x42ed54(0x2a8)](this,_0x351816,_0x31fb89,0x0,0x0);else{const _0xe15388=_0x7b8696[_0x4ae816-_0x9e9fbe[_0x42ed54(0x2a1)]];if(_0xe15388===undefined)return;Window_Base[_0x42ed54(0x150)]['drawActorBuffTurns'][_0x42ed54(0x2a8)](this,_0x351816,_0xe15388,0x0,0x0),Window_Base[_0x42ed54(0x150)][_0x42ed54(0x1bf)]['call'](this,_0x351816,_0xe15388,0x0,0x0);}},Sprite_StateIcon[_0x30c775(0x150)][_0x30c775(0x1ab)]=function(){const _0x1868c3=_0x30c775;this['contents'][_0x1868c3(0x354)]=$gameSystem[_0x1868c3(0x1a7)](),this[_0x1868c3(0x434)]['fontSize']=$gameSystem['mainFontSize'](),this[_0x1868c3(0x315)]();},Sprite_StateIcon[_0x30c775(0x150)]['resetTextColor']=function(){const _0x2a84ce=_0x30c775;this[_0x2a84ce(0x258)](ColorManager['normalColor']()),this[_0x2a84ce(0x2f2)](ColorManager[_0x2a84ce(0x29a)]());},Sprite_StateIcon[_0x30c775(0x150)][_0x30c775(0x258)]=function(_0x492f84){const _0x5d58f5=_0x30c775;this[_0x5d58f5(0x434)][_0x5d58f5(0x278)]=_0x492f84;},Sprite_StateIcon['prototype'][_0x30c775(0x2f2)]=function(_0x473d0b){const _0x1bb33b=_0x30c775;this[_0x1bb33b(0x434)]['outlineColor']=_0x473d0b;},Sprite_StateIcon[_0x30c775(0x150)]['hide']=function(){const _0x450350=_0x30c775;this[_0x450350(0x184)]=!![],this[_0x450350(0x37d)]();},Window_Base[_0x30c775(0x150)][_0x30c775(0x324)]=function(_0x5a278b,_0x33ffec,_0x2d77c8,_0x41051b,_0x5d8e1f){const _0x450ae6=_0x30c775,_0x426232=this[_0x450ae6(0x20f)](_0x5a278b,_0x33ffec),_0x5b758b=this[_0x450ae6(0x2ea)](_0x426232,_0x2d77c8,_0x41051b,_0x5d8e1f),_0x43edca=_0x2d77c8+_0x5d8e1f-_0x5b758b[_0x450ae6(0x1da)];this[_0x450ae6(0x421)](_0x426232,_0x43edca,_0x41051b,_0x5d8e1f),this[_0x450ae6(0x1ab)]();},Window_Base['prototype']['createAllSkillCostText']=function(_0x1d3f87,_0x5502a7){const _0x5365af=_0x30c775;let _0x512856='';for(settings of VisuMZ[_0x5365af(0x293)][_0x5365af(0x2ef)][_0x5365af(0x1ac)]){if(!this['isSkillCostShown'](_0x1d3f87,_0x5502a7,settings))continue;if(_0x512856[_0x5365af(0x2a1)]>0x0)_0x512856+=this[_0x5365af(0x236)]();_0x512856+=this['createSkillCostText'](_0x1d3f87,_0x5502a7,settings);}_0x512856=this[_0x5365af(0x39c)](_0x1d3f87,_0x5502a7,_0x512856);if(_0x5502a7[_0x5365af(0x283)][_0x5365af(0x298)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x5365af(0x1d9)!==_0x5365af(0x3ad)){if(_0x512856['length']>0x0)_0x512856+=this[_0x5365af(0x236)]();_0x512856+=String(RegExp['$1']);}else{const _0x16fed1=_0x368b32[_0x5365af(0x306)]('['+_0x12247e['$1']['match'](/\d+/g)+']');for(const _0x114c3f of _0x16fed1){if(_0xf212b6[_0x5365af(0x441)](_0x114c3f))return![];}return!![];}}return _0x512856;},Window_Base[_0x30c775(0x150)][_0x30c775(0x39c)]=function(_0x28b5fa,_0x4d1a98,_0x2b34bd){return _0x2b34bd;},Window_Base[_0x30c775(0x150)][_0x30c775(0x2d5)]=function(_0x5127cd,_0x224f54,_0x445e3a){const _0x5e3622=_0x30c775,_0x556924=_0x445e3a[_0x5e3622(0x277)]['call'](_0x5127cd,_0x224f54);return _0x445e3a[_0x5e3622(0x154)]['call'](_0x5127cd,_0x224f54,_0x556924,_0x445e3a);},Window_Base[_0x30c775(0x150)][_0x30c775(0x40e)]=function(_0x5bf3c9,_0x3bea2e,_0x236b70){const _0x54ac03=_0x30c775,_0x4476df=_0x236b70[_0x54ac03(0x277)][_0x54ac03(0x2a8)](_0x5bf3c9,_0x3bea2e);return _0x236b70[_0x54ac03(0x192)][_0x54ac03(0x2a8)](_0x5bf3c9,_0x3bea2e,_0x4476df,_0x236b70);},Window_Base['prototype'][_0x30c775(0x236)]=function(){return'\x20';},Window_Base[_0x30c775(0x150)]['drawActorIcons']=function(_0xb8451d,_0x123c00,_0x3c908d,_0x4f56df){const _0x20cb7e=_0x30c775;if(!_0xb8451d)return;VisuMZ[_0x20cb7e(0x293)][_0x20cb7e(0x2bb)]['call'](this,_0xb8451d,_0x123c00,_0x3c908d,_0x4f56df),this[_0x20cb7e(0x3db)](_0xb8451d,_0x123c00,_0x3c908d,_0x4f56df);},Window_Base['prototype'][_0x30c775(0x3db)]=function(_0x48ba64,_0x4b1687,_0x3661d0,_0x129771){const _0x4e12c7=_0x30c775;_0x129771=_0x129771||0x90;const _0x109ebe=ImageManager['iconWidth'],_0x36498f=_0x48ba64[_0x4e12c7(0x265)]()[_0x4e12c7(0x44a)](0x0,Math[_0x4e12c7(0x28a)](_0x129771/_0x109ebe)),_0x160dac=_0x48ba64[_0x4e12c7(0x1a8)]()['filter'](_0x1afab7=>_0x1afab7[_0x4e12c7(0x45f)]>0x0),_0x1a65e1=[...Array(0x8)[_0x4e12c7(0x1cb)]()]['filter'](_0x77d94=>_0x48ba64[_0x4e12c7(0x1c8)](_0x77d94)!==0x0),_0x2d57b9=[];let _0xddc2bc=_0x4b1687;for(let _0x33012e=0x0;_0x33012e<_0x36498f[_0x4e12c7(0x2a1)];_0x33012e++){this[_0x4e12c7(0x1ab)]();const _0x43f40e=_0x160dac[_0x33012e];if(_0x43f40e)!_0x2d57b9['includes'](_0x43f40e)&&this[_0x4e12c7(0x29f)](_0x48ba64,_0x43f40e,_0xddc2bc,_0x3661d0),this['drawActorStateData'](_0x48ba64,_0x43f40e,_0xddc2bc,_0x3661d0),_0x2d57b9[_0x4e12c7(0x25f)](_0x43f40e);else{if(_0x4e12c7(0x1b9)===_0x4e12c7(0x1a6)){const _0x39c108=_0x565bc8(_0x1ca84a['$1']),_0x385fab=_0x523a41[_0x4e12c7(0x1dd)](_0x39c108);_0x27b3b4['SkillsStatesCore'][_0x4e12c7(0x444)][_0x1eb41a['id']]=new _0x3759a9(_0x4e12c7(0x2cf),_0x385fab);}else{const _0x498463=_0x1a65e1[_0x33012e-_0x160dac[_0x4e12c7(0x2a1)]];this[_0x4e12c7(0x1e3)](_0x48ba64,_0x498463,_0xddc2bc,_0x3661d0),this[_0x4e12c7(0x1bf)](_0x48ba64,_0x498463,_0xddc2bc,_0x3661d0);}}_0xddc2bc+=_0x109ebe;}},Window_Base[_0x30c775(0x150)][_0x30c775(0x29f)]=function(_0x466615,_0x5376e6,_0x9adb53,_0x30618f){const _0x33f391=_0x30c775;if(!VisuMZ[_0x33f391(0x293)][_0x33f391(0x2ef)][_0x33f391(0x371)][_0x33f391(0x1b3)])return;if(!_0x466615[_0x33f391(0x27a)](_0x5376e6['id']))return;if(_0x5376e6[_0x33f391(0x302)]===0x0)return;if(_0x5376e6[_0x33f391(0x283)][_0x33f391(0x298)](/<HIDE STATE TURNS>/i))return;const _0x2dcdea=_0x466615[_0x33f391(0x1e6)](_0x5376e6['id']),_0x505518=ImageManager[_0x33f391(0x320)],_0x36a755=ColorManager[_0x33f391(0x449)](_0x5376e6);this[_0x33f391(0x258)](_0x36a755),this['changeOutlineColor'](_0x33f391(0x351)),this['contents'][_0x33f391(0x3d1)]=!![],this['contents']['fontSize']=VisuMZ[_0x33f391(0x293)][_0x33f391(0x2ef)][_0x33f391(0x371)][_0x33f391(0x314)],_0x9adb53+=VisuMZ[_0x33f391(0x293)]['Settings'][_0x33f391(0x371)][_0x33f391(0x1fa)],_0x30618f+=VisuMZ[_0x33f391(0x293)][_0x33f391(0x2ef)]['States'][_0x33f391(0x1d1)],this[_0x33f391(0x417)](_0x2dcdea,_0x9adb53,_0x30618f,_0x505518,_0x33f391(0x39d)),this[_0x33f391(0x434)][_0x33f391(0x3d1)]=![],this[_0x33f391(0x1ab)]();},Window_Base['prototype'][_0x30c775(0x35a)]=function(_0x9e30ef,_0x129956,_0x161061,_0x558089){const _0x3dd185=_0x30c775;if(!VisuMZ[_0x3dd185(0x293)]['Settings'][_0x3dd185(0x371)]['ShowData'])return;const _0x2ccb9f=ImageManager[_0x3dd185(0x320)],_0x248b61=ImageManager['iconHeight']/0x2,_0x4b00b3=ColorManager[_0x3dd185(0x164)]();this[_0x3dd185(0x258)](_0x4b00b3),this[_0x3dd185(0x2f2)]('rgba(0,\x200,\x200,\x201)'),this['contents'][_0x3dd185(0x3d1)]=!![],this[_0x3dd185(0x434)]['fontSize']=VisuMZ['SkillsStatesCore']['Settings'][_0x3dd185(0x371)]['DataFontSize'],_0x161061+=VisuMZ[_0x3dd185(0x293)][_0x3dd185(0x2ef)][_0x3dd185(0x371)][_0x3dd185(0x176)],_0x558089+=VisuMZ['SkillsStatesCore'][_0x3dd185(0x2ef)][_0x3dd185(0x371)]['DataOffsetY'];const _0x5913dc=String(_0x9e30ef[_0x3dd185(0x414)](_0x129956['id']));this[_0x3dd185(0x417)](_0x5913dc,_0x161061,_0x558089,_0x2ccb9f,_0x3dd185(0x17c)),this['contents'][_0x3dd185(0x3d1)]=![],this['resetFontSettings']();},Window_Base[_0x30c775(0x150)][_0x30c775(0x1e3)]=function(_0x159357,_0x1b0336,_0x793e44,_0x36bdd9){const _0x4e56cc=_0x30c775;if(!VisuMZ[_0x4e56cc(0x293)][_0x4e56cc(0x2ef)]['Buffs'][_0x4e56cc(0x1b3)])return;const _0x5b9673=_0x159357[_0x4e56cc(0x1c8)](_0x1b0336);if(_0x5b9673===0x0)return;const _0x4f98f7=_0x159357['buffTurns'](_0x1b0336),_0x54c89d=ImageManager[_0x4e56cc(0x320)],_0x2e61af=_0x5b9673>0x0?ColorManager[_0x4e56cc(0x46f)]():ColorManager['debuffColor']();this[_0x4e56cc(0x258)](_0x2e61af),this[_0x4e56cc(0x2f2)](_0x4e56cc(0x351)),this[_0x4e56cc(0x434)][_0x4e56cc(0x3d1)]=!![],this['contents'][_0x4e56cc(0x3b5)]=VisuMZ[_0x4e56cc(0x293)][_0x4e56cc(0x2ef)][_0x4e56cc(0x3aa)][_0x4e56cc(0x314)],_0x793e44+=VisuMZ[_0x4e56cc(0x293)][_0x4e56cc(0x2ef)][_0x4e56cc(0x3aa)][_0x4e56cc(0x1fa)],_0x36bdd9+=VisuMZ[_0x4e56cc(0x293)][_0x4e56cc(0x2ef)][_0x4e56cc(0x3aa)][_0x4e56cc(0x1d1)],this['drawText'](_0x4f98f7,_0x793e44,_0x36bdd9,_0x54c89d,'right'),this[_0x4e56cc(0x434)]['fontBold']=![],this[_0x4e56cc(0x1ab)]();},Window_Base[_0x30c775(0x150)][_0x30c775(0x1bf)]=function(_0x754f4c,_0x25d320,_0x334df6,_0x10d1d6){const _0x52f66a=_0x30c775;if(!VisuMZ['SkillsStatesCore'][_0x52f66a(0x2ef)][_0x52f66a(0x3aa)]['ShowData'])return;const _0x2084c1=_0x754f4c[_0x52f66a(0x1a2)](_0x25d320),_0x20e17e=_0x754f4c[_0x52f66a(0x1c8)](_0x25d320),_0x31e141=ImageManager[_0x52f66a(0x320)],_0x17eef4=ImageManager[_0x52f66a(0x270)]/0x2,_0x26f55c=_0x20e17e>0x0?ColorManager['buffColor']():ColorManager['debuffColor']();this['changeTextColor'](_0x26f55c),this[_0x52f66a(0x2f2)]('rgba(0,\x200,\x200,\x201)'),this['contents']['fontBold']=!![],this[_0x52f66a(0x434)][_0x52f66a(0x3b5)]=VisuMZ[_0x52f66a(0x293)]['Settings'][_0x52f66a(0x3aa)]['DataFontSize'],_0x334df6+=VisuMZ[_0x52f66a(0x293)][_0x52f66a(0x2ef)]['Buffs']['DataOffsetX'],_0x10d1d6+=VisuMZ[_0x52f66a(0x293)][_0x52f66a(0x2ef)][_0x52f66a(0x3aa)]['DataOffsetY'];const _0x419fb6=_0x52f66a(0x37b)[_0x52f66a(0x1dd)](Math[_0x52f66a(0x3bc)](_0x2084c1*0x64));this[_0x52f66a(0x417)](_0x419fb6,_0x334df6,_0x10d1d6,_0x31e141,'center'),this[_0x52f66a(0x434)]['fontBold']=![],this[_0x52f66a(0x1ab)]();},VisuMZ[_0x30c775(0x293)][_0x30c775(0x16d)]=Window_StatusBase[_0x30c775(0x150)]['placeGauge'],Window_StatusBase['prototype'][_0x30c775(0x3df)]=function(_0x173ace,_0x2dce6f,_0x3086ec,_0x393996){const _0x6674fc=_0x30c775;if(_0x173ace[_0x6674fc(0x35f)]())_0x2dce6f=this['convertGaugeTypeSkillsStatesCore'](_0x173ace,_0x2dce6f);this[_0x6674fc(0x2f4)](_0x173ace,_0x2dce6f,_0x3086ec,_0x393996);},Window_StatusBase['prototype']['placeExactGauge']=function(_0xf6ce98,_0x9e4be3,_0x11a680,_0x4f82d8){const _0x3712f0=_0x30c775;if([_0x3712f0(0x210),_0x3712f0(0x15b)]['includes'](_0x9e4be3['toLowerCase']()))return;VisuMZ[_0x3712f0(0x293)][_0x3712f0(0x16d)]['call'](this,_0xf6ce98,_0x9e4be3,_0x11a680,_0x4f82d8);},Window_StatusBase[_0x30c775(0x150)][_0x30c775(0x366)]=function(_0x34c85b,_0x4fff1b){const _0x54fe73=_0x30c775,_0x5616b1=_0x34c85b[_0x54fe73(0x313)]()['note'];if(_0x4fff1b==='hp'&&_0x5616b1[_0x54fe73(0x298)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x4fff1b==='mp'&&_0x5616b1[_0x54fe73(0x298)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x4fff1b==='tp'&&_0x5616b1[_0x54fe73(0x298)](/<REPLACE TP GAUGE:[ ](.*)>/i)){if('socMF'===_0x54fe73(0x27c))return String(RegExp['$1']);else{if(_0x107e1f[_0x54fe73(0x177)](_0x4c2a2a))return!![];}}else{if(_0x54fe73(0x439)!=='CQjQc'){let _0xab9b84=_0x367414[_0x54fe73(0x3c2)][_0x2d1bfc];if(_0xab9b84[_0x54fe73(0x298)](/\\I\[(\d+)\]/i))return _0xab9b84;if(this[_0x54fe73(0x318)]()===_0x54fe73(0x18d))return _0xab9b84;const _0x5b91aa=_0xe13662[_0x54fe73(0x293)][_0x54fe73(0x2ef)][_0x54fe73(0x1f6)],_0x3c1614=_0x6f4902[_0x54fe73(0x1c1)]['includes'](_0x4ae0f3),_0x23cdee=_0x3c1614?_0x5b91aa['IconStypeMagic']:_0x5b91aa[_0x54fe73(0x43a)];return'\x5cI[%1]%2'[_0x54fe73(0x1dd)](_0x23cdee,_0xab9b84);}else return _0x4fff1b;}}}},VisuMZ[_0x30c775(0x293)][_0x30c775(0x2bb)]=Window_StatusBase['prototype'][_0x30c775(0x3cb)],Window_StatusBase[_0x30c775(0x150)]['drawActorIcons']=function(_0x81ead4,_0x4f436e,_0x51d9c1,_0x885fd4){const _0x239ad9=_0x30c775;if(!_0x81ead4)return;Window_Base[_0x239ad9(0x150)][_0x239ad9(0x3cb)][_0x239ad9(0x2a8)](this,_0x81ead4,_0x4f436e,_0x51d9c1,_0x885fd4);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x322)]=Window_SkillType[_0x30c775(0x150)]['initialize'],Window_SkillType[_0x30c775(0x150)][_0x30c775(0x19a)]=function(_0x4c8843){const _0x3336de=_0x30c775;VisuMZ[_0x3336de(0x293)][_0x3336de(0x322)]['call'](this,_0x4c8843),this[_0x3336de(0x341)](_0x4c8843);},Window_SkillType['prototype']['createCommandNameWindow']=function(_0x4279e6){const _0x55f696=_0x30c775,_0x381a4d=new Rectangle(0x0,0x0,_0x4279e6['width'],_0x4279e6[_0x55f696(0x3a0)]);this['_commandNameWindow']=new Window_Base(_0x381a4d),this['_commandNameWindow']['opacity']=0x0,this['addChild'](this[_0x55f696(0x309)]),this[_0x55f696(0x3e9)]();},Window_SkillType[_0x30c775(0x150)]['callUpdateHelp']=function(){const _0x4672fb=_0x30c775;Window_Command['prototype'][_0x4672fb(0x36f)][_0x4672fb(0x2a8)](this);if(this['_commandNameWindow'])this['updateCommandNameWindow']();},Window_SkillType[_0x30c775(0x150)][_0x30c775(0x3e9)]=function(){const _0x5668d9=_0x30c775,_0x2768d1=this[_0x5668d9(0x309)];_0x2768d1[_0x5668d9(0x434)][_0x5668d9(0x404)]();const _0x3c2c37=this[_0x5668d9(0x20d)](this['index']());if(_0x3c2c37===_0x5668d9(0x291)&&this[_0x5668d9(0x47f)]()>0x0){const _0x5be61f=this[_0x5668d9(0x3ee)](this[_0x5668d9(0x389)]());let _0x11b5af=this[_0x5668d9(0x207)](this[_0x5668d9(0x389)]());_0x11b5af=_0x11b5af['replace'](/\\I\[(\d+)\]/gi,''),_0x2768d1['resetFontSettings'](),this[_0x5668d9(0x472)](_0x11b5af,_0x5be61f),this['commandNameWindowDrawText'](_0x11b5af,_0x5be61f),this[_0x5668d9(0x167)](_0x11b5af,_0x5be61f);}},Window_SkillType[_0x30c775(0x150)]['commandNameWindowDrawBackground']=function(_0x50acfb,_0x2a0552){},Window_SkillType[_0x30c775(0x150)][_0x30c775(0x3a3)]=function(_0x240b93,_0x26c1c5){const _0x191316=_0x30c775,_0x31500d=this[_0x191316(0x309)];_0x31500d[_0x191316(0x417)](_0x240b93,0x0,_0x26c1c5['y'],_0x31500d[_0x191316(0x3b3)],_0x191316(0x17c));},Window_SkillType['prototype'][_0x30c775(0x167)]=function(_0x37d202,_0x337086){const _0x4c4c75=_0x30c775,_0x2b4444=this['_commandNameWindow'],_0x549dd8=$gameSystem[_0x4c4c75(0x1f9)](),_0x4bbab8=_0x337086['x']+Math['floor'](_0x337086[_0x4c4c75(0x1da)]/0x2)+_0x549dd8;_0x2b4444['x']=_0x2b4444[_0x4c4c75(0x1da)]/-0x2+_0x4bbab8,_0x2b4444['y']=Math[_0x4c4c75(0x28a)](_0x337086['height']/0x2);},Window_SkillType['prototype'][_0x30c775(0x43f)]=function(){const _0x3fa45e=_0x30c775;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x3fa45e(0x150)][_0x3fa45e(0x43f)][_0x3fa45e(0x2a8)](this);},Window_SkillType['prototype'][_0x30c775(0x34b)]=function(){const _0x3463bb=_0x30c775;if(!this['_actor'])return;const _0x55ed08=this[_0x3463bb(0x1fd)]['skillTypes']();for(const _0x10a9e2 of _0x55ed08){if(_0x3463bb(0x235)!==_0x3463bb(0x235)){if(!this[_0x3463bb(0x39e)])this[_0x3463bb(0x1bc)]();this['createPassiveStatesCache']();}else{const _0x859383=this[_0x3463bb(0x438)](_0x10a9e2);this['addCommand'](_0x859383,_0x3463bb(0x178),!![],_0x10a9e2);}}},Window_SkillType[_0x30c775(0x150)]['makeCommandName']=function(_0x4d8f00){const _0x9dcd17=_0x30c775;let _0x33000e=$dataSystem['skillTypes'][_0x4d8f00];if(_0x33000e[_0x9dcd17(0x298)](/\\I\[(\d+)\]/i))return _0x33000e;if(this[_0x9dcd17(0x318)]()===_0x9dcd17(0x18d))return _0x33000e;const _0x2ba3a9=VisuMZ[_0x9dcd17(0x293)][_0x9dcd17(0x2ef)][_0x9dcd17(0x1f6)],_0x57bb6a=$dataSystem[_0x9dcd17(0x1c1)][_0x9dcd17(0x33e)](_0x4d8f00),_0x3ca22d=_0x57bb6a?_0x2ba3a9['IconStypeMagic']:_0x2ba3a9[_0x9dcd17(0x43a)];return _0x9dcd17(0x45e)[_0x9dcd17(0x1dd)](_0x3ca22d,_0x33000e);},Window_SkillType['prototype'][_0x30c775(0x42d)]=function(){const _0x26b39a=_0x30c775;return VisuMZ[_0x26b39a(0x293)][_0x26b39a(0x2ef)][_0x26b39a(0x1f6)][_0x26b39a(0x3c9)];},Window_SkillType[_0x30c775(0x150)][_0x30c775(0x447)]=function(_0x2d6e7e){const _0x50975d=_0x30c775,_0x278b76=this[_0x50975d(0x20d)](_0x2d6e7e);if(_0x278b76===_0x50975d(0x203)){if(_0x50975d(0x2a9)!=='CawUW')this[_0x50975d(0x367)](_0x2d6e7e);else{const _0x370931=this[_0x50975d(0x465)]();this[_0x50975d(0x162)]=new _0x3c566f(_0x370931),this[_0x50975d(0x295)](this['_shopStatusWindow']),this[_0x50975d(0x284)][_0x50975d(0x377)](this[_0x50975d(0x162)]);const _0x20b4fa=_0x3b48f1['SkillsStatesCore'][_0x50975d(0x2ef)][_0x50975d(0x1f6)][_0x50975d(0x37e)];this[_0x50975d(0x162)][_0x50975d(0x2b3)](_0x20b4fa||0x0);}}else _0x278b76==='icon'?_0x50975d(0x308)!==_0x50975d(0x308)?this[_0x50975d(0x36e)][_0x4edb77]=this[_0x50975d(0x278)](_0x96c5e6(_0x277d4e)):this[_0x50975d(0x2f0)](_0x2d6e7e):Window_Command[_0x50975d(0x150)][_0x50975d(0x447)][_0x50975d(0x2a8)](this,_0x2d6e7e);},Window_SkillType['prototype'][_0x30c775(0x318)]=function(){const _0x24e926=_0x30c775;return VisuMZ['SkillsStatesCore']['Settings'][_0x24e926(0x1f6)][_0x24e926(0x190)];},Window_SkillType['prototype'][_0x30c775(0x20d)]=function(_0x4ff7be){const _0xb56ef1=_0x30c775;if(_0x4ff7be<0x0)return _0xb56ef1(0x18d);const _0x4db9d5=this['commandStyle']();if(_0x4db9d5!=='auto'){if(_0xb56ef1(0x47a)===_0xb56ef1(0x47a))return _0x4db9d5;else{const _0x42daf6=[];for(let _0x34a21c of _0xb86162){_0x34a21c=(_0x4c4bf5(_0x34a21c)||'')[_0xb56ef1(0x46b)]();const _0xcd804a=/^\d+$/['test'](_0x34a21c);_0xcd804a?_0x42daf6[_0xb56ef1(0x25f)](_0x4de81e(_0x34a21c)):_0x42daf6['push'](_0x55ef6e[_0xb56ef1(0x413)](_0x34a21c));}return _0x42daf6[_0xb56ef1(0x17e)](_0x200c90=>_0x1886c8[_0x59f69c(_0x200c90)])[_0xb56ef1(0x3b8)](null);}}else{if(this[_0xb56ef1(0x47f)]()>0x0){const _0xe99103=this['commandName'](_0x4ff7be);if(_0xe99103['match'](/\\I\[(\d+)\]/i)){const _0x143c81=this[_0xb56ef1(0x3ee)](_0x4ff7be),_0x25dc0d=this[_0xb56ef1(0x2ea)](_0xe99103)[_0xb56ef1(0x1da)];if(_0x25dc0d<=_0x143c81[_0xb56ef1(0x1da)])return'iconText';else{if(_0xb56ef1(0x44d)!==_0xb56ef1(0x237))return'icon';else{if(!_0x220c04[_0xb56ef1(0x441)](_0x5a7807))return!![];}}}}}return _0xb56ef1(0x18d);},Window_SkillType['prototype'][_0x30c775(0x367)]=function(_0x37df08){const _0x45e005=_0x30c775,_0x590926=this['itemLineRect'](_0x37df08),_0x365520=this['commandName'](_0x37df08),_0x332bff=this[_0x45e005(0x2ea)](_0x365520)[_0x45e005(0x1da)];this['changePaintOpacity'](this['isCommandEnabled'](_0x37df08));const _0x13e0df=this[_0x45e005(0x42d)]();if(_0x13e0df===_0x45e005(0x39d))this[_0x45e005(0x421)](_0x365520,_0x590926['x']+_0x590926[_0x45e005(0x1da)]-_0x332bff,_0x590926['y'],_0x332bff);else{if(_0x13e0df===_0x45e005(0x17c)){if(_0x45e005(0x28d)==='CyTjq'){const _0x1825e5=_0x590926['x']+Math[_0x45e005(0x28a)]((_0x590926[_0x45e005(0x1da)]-_0x332bff)/0x2);this[_0x45e005(0x421)](_0x365520,_0x1825e5,_0x590926['y'],_0x332bff);}else return _0x4bf4a9[_0x45e005(0x33c)]&&_0x3ae2c2[_0x45e005(0x2ba)][_0x45e005(0x33e)]('['+_0x2c406f+']');}else{if(_0x45e005(0x2e0)==='UoTzI'){this['_stateOrigin']=this[_0x45e005(0x2a7)]||{};const _0x305f54=_0xb9b5b9?this[_0x45e005(0x358)](_0x2b60fe):this[_0x45e005(0x1c4)]();this['_stateOrigin'][_0x3dc771]=_0x305f54;}else this['drawTextEx'](_0x365520,_0x590926['x'],_0x590926['y'],_0x332bff);}}},Window_SkillType[_0x30c775(0x150)][_0x30c775(0x2f0)]=function(_0x355d3f){const _0x206c4b=_0x30c775;this[_0x206c4b(0x207)](_0x355d3f)[_0x206c4b(0x298)](/\\I\[(\d+)\]/i);const _0x54488c=Number(RegExp['$1'])||0x0,_0x37623b=this[_0x206c4b(0x3ee)](_0x355d3f),_0x404e28=_0x37623b['x']+Math[_0x206c4b(0x28a)]((_0x37623b[_0x206c4b(0x1da)]-ImageManager[_0x206c4b(0x320)])/0x2),_0xb8db6c=_0x37623b['y']+(_0x37623b['height']-ImageManager[_0x206c4b(0x270)])/0x2;this[_0x206c4b(0x3ea)](_0x54488c,_0x404e28,_0xb8db6c);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x18c)]=Window_SkillStatus[_0x30c775(0x150)]['refresh'],Window_SkillStatus[_0x30c775(0x150)][_0x30c775(0x1bc)]=function(){const _0x46c7f2=_0x30c775;VisuMZ[_0x46c7f2(0x293)]['Window_SkillStatus_refresh'][_0x46c7f2(0x2a8)](this);if(this[_0x46c7f2(0x1fd)])this[_0x46c7f2(0x2e2)]();},Window_SkillStatus[_0x30c775(0x150)][_0x30c775(0x2e2)]=function(){const _0x3a09a6=_0x30c775;if(!Imported[_0x3a09a6(0x3e8)])return;if(!Imported[_0x3a09a6(0x15e)])return;const _0x4ed0ac=this[_0x3a09a6(0x27f)]();let _0x8230b2=this[_0x3a09a6(0x2db)]()/0x2+0xb4+0xb4+0xb4,_0x36f795=this[_0x3a09a6(0x3b3)]-_0x8230b2-0x2;if(_0x36f795>=0x12c){const _0x1ad7b8=VisuMZ[_0x3a09a6(0x21b)][_0x3a09a6(0x2ef)][_0x3a09a6(0x206)][_0x3a09a6(0x3c5)],_0x3616d4=Math[_0x3a09a6(0x28a)](_0x36f795/0x2)-0x18;let _0x99434f=_0x8230b2,_0x55e77c=Math[_0x3a09a6(0x28a)]((this[_0x3a09a6(0x3c1)]-Math[_0x3a09a6(0x262)](_0x1ad7b8['length']/0x2)*_0x4ed0ac)/0x2),_0x242c02=0x0;for(const _0x16738b of _0x1ad7b8){this[_0x3a09a6(0x25b)](_0x99434f,_0x55e77c,_0x3616d4,_0x16738b),_0x242c02++,_0x242c02%0x2===0x0?(_0x99434f=_0x8230b2,_0x55e77c+=_0x4ed0ac):_0x3a09a6(0x327)===_0x3a09a6(0x3ff)?(this[_0x3a09a6(0x365)](),_0xfeecfc[_0x3a09a6(0x293)][_0x3a09a6(0x3f0)][_0x3a09a6(0x2a8)](this)):_0x99434f+=_0x3616d4+0x18;}}this[_0x3a09a6(0x1ab)]();},Window_SkillStatus[_0x30c775(0x150)][_0x30c775(0x25b)]=function(_0xc9b69d,_0x14f8c1,_0xcb7913,_0x27512e){const _0x57181c=_0x30c775,_0x1834a3=this[_0x57181c(0x27f)]();this[_0x57181c(0x1ab)](),this[_0x57181c(0x2ce)](_0xc9b69d,_0x14f8c1,_0xcb7913,_0x27512e,!![]),this[_0x57181c(0x315)](),this[_0x57181c(0x434)]['fontSize']-=0x8;const _0x14ba21=this[_0x57181c(0x1fd)][_0x57181c(0x3c0)](_0x27512e,!![]);this[_0x57181c(0x434)]['drawText'](_0x14ba21,_0xc9b69d,_0x14f8c1,_0xcb7913,_0x1834a3,_0x57181c(0x39d));},VisuMZ[_0x30c775(0x293)]['Window_SkillList_includes']=Window_SkillList[_0x30c775(0x150)][_0x30c775(0x33e)],Window_SkillList[_0x30c775(0x150)]['includes']=function(_0x5ad81c){return this['includesSkillsStatesCore'](_0x5ad81c);},VisuMZ[_0x30c775(0x293)][_0x30c775(0x152)]=Window_SkillList['prototype'][_0x30c775(0x1c0)],Window_SkillList[_0x30c775(0x150)][_0x30c775(0x1c0)]=function(){const _0x4d054a=_0x30c775;if(SceneManager[_0x4d054a(0x15c)][_0x4d054a(0x25e)]===Scene_Battle)return VisuMZ[_0x4d054a(0x293)]['Window_SkillList_maxCols'][_0x4d054a(0x2a8)](this);else{if(_0x4d054a(0x3a4)!==_0x4d054a(0x179))return VisuMZ[_0x4d054a(0x293)][_0x4d054a(0x2ef)][_0x4d054a(0x1f6)][_0x4d054a(0x1f0)];else{const _0x7de048=_0x3dfa60[_0x4d054a(0x306)]('['+_0x37efa7['$1'][_0x4d054a(0x298)](/\d+/g)+']');for(const _0x390014 of _0x7de048){if(_0x1661c8['hasSkill'](_0x390014))return!![];}return![];}}},VisuMZ[_0x30c775(0x293)][_0x30c775(0x3d5)]=Window_SkillList['prototype'][_0x30c775(0x15d)],Window_SkillList[_0x30c775(0x150)][_0x30c775(0x15d)]=function(_0x732762){const _0x382823=_0x30c775,_0x14fce7=this[_0x382823(0x1fd)]!==_0x732762;VisuMZ[_0x382823(0x293)][_0x382823(0x3d5)][_0x382823(0x2a8)](this,_0x732762);if(_0x14fce7){if('IrLrd'!==_0x382823(0x3e2))this[_0x382823(0x274)]&&this['_statusWindow'][_0x382823(0x25e)]===Window_ShopStatus&&this[_0x382823(0x274)][_0x382823(0x216)](this[_0x382823(0x3e7)](0x0));else{_0x2de973['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x384262=_0x34e38c(_0x515cdc['$1']);_0x5d9cb8[_0x382823(0x35e)](_0x384262);}}},Window_SkillList[_0x30c775(0x150)][_0x30c775(0x382)]=function(_0x457a67){const _0x1c1f63=_0x30c775;if(this['_stypeId']===_0x457a67)return;this[_0x1c1f63(0x353)]=_0x457a67,this[_0x1c1f63(0x1bc)](),this[_0x1c1f63(0x2b4)](0x0,0x0);if(this[_0x1c1f63(0x274)]&&this['_statusWindow'][_0x1c1f63(0x25e)]===Window_ShopStatus){if(_0x1c1f63(0x387)===_0x1c1f63(0x3ae)){for(_0x28ee92 of _0x239f1e[_0x1c1f63(0x293)]['Settings'][_0x1c1f63(0x1ac)]){if(_0x3fc5c8[_0x1c1f63(0x2eb)]['toUpperCase']()==='MP')return _0x36438f['CalcJS'][_0x1c1f63(0x2a8)](this,_0x20bb61);}return _0x491897[_0x1c1f63(0x293)]['Game_BattlerBase_skillMpCost'][_0x1c1f63(0x2a8)](this,_0x1efa82);}else this[_0x1c1f63(0x274)][_0x1c1f63(0x216)](this[_0x1c1f63(0x3e7)](0x0));}},Window_SkillList[_0x30c775(0x150)]['includesSkillsStatesCore']=function(_0x446e23){const _0x50f944=_0x30c775;if(!_0x446e23)return VisuMZ[_0x50f944(0x293)][_0x50f944(0x290)]['call'](this,_0x446e23);if(!this[_0x50f944(0x201)](_0x446e23))return![];if(!this[_0x50f944(0x361)](_0x446e23))return![];if(!this[_0x50f944(0x158)](_0x446e23))return![];return!![];},Window_SkillList['prototype']['checkSkillTypeMatch']=function(_0x3365e9){const _0xb7872d=_0x30c775;return DataManager['getSkillTypes'](_0x3365e9)[_0xb7872d(0x33e)](this['_stypeId']);},Window_SkillList[_0x30c775(0x150)][_0x30c775(0x361)]=function(_0x4b19d3){const _0x48fe8e=_0x30c775;if(!VisuMZ[_0x48fe8e(0x293)][_0x48fe8e(0x21d)](this['_actor'],_0x4b19d3))return![];if(!VisuMZ['SkillsStatesCore'][_0x48fe8e(0x31e)](this[_0x48fe8e(0x1fd)],_0x4b19d3))return![];if(!VisuMZ[_0x48fe8e(0x293)][_0x48fe8e(0x42c)](this[_0x48fe8e(0x1fd)],_0x4b19d3))return![];return!![];},VisuMZ[_0x30c775(0x293)][_0x30c775(0x21d)]=function(_0x1cb945,_0x29e83e){const _0x42b54e=_0x30c775,_0x2b8e59=_0x29e83e[_0x42b54e(0x283)];if(_0x2b8e59[_0x42b54e(0x298)](/<HIDE IN BATTLE>/i)&&$gameParty['inBattle']())return![];else return _0x2b8e59['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x42b54e(0x458)]()?![]:!![];},VisuMZ[_0x30c775(0x293)]['CheckVisibleSwitchNotetags']=function(_0x1a285e,_0x1e8857){const _0x87a285=_0x30c775,_0x2d7df2=_0x1e8857[_0x87a285(0x283)];if(_0x2d7df2[_0x87a285(0x298)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('YsHtp'===_0x87a285(0x1d2)){const _0xe92b2f=JSON[_0x87a285(0x306)]('['+RegExp['$1'][_0x87a285(0x298)](/\d+/g)+']');for(const _0x3ee4a8 of _0xe92b2f){if(!$gameSwitches[_0x87a285(0x441)](_0x3ee4a8))return![];}return!![];}else this[_0x87a285(0x434)][_0x87a285(0x417)](_0x46021c,_0x60976c,_0x17a0b7,_0x3da9e4,this[_0x87a285(0x434)][_0x87a285(0x3a0)],_0x4843a3);}if(_0x2d7df2[_0x87a285(0x298)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4f71e9=JSON[_0x87a285(0x306)]('['+RegExp['$1'][_0x87a285(0x298)](/\d+/g)+']');for(const _0x36af25 of _0x4f71e9){if(!$gameSwitches[_0x87a285(0x441)](_0x36af25))return![];}return!![];}if(_0x2d7df2[_0x87a285(0x298)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x56bf92=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5a3876 of _0x56bf92){if('AOxym'===_0x87a285(0x26f)){const _0x29c3d5=_0x23e564[_0x87a285(0x306)]('['+_0x699d17['$1'][_0x87a285(0x298)](/\d+/g)+']');for(const _0x4dec53 of _0x29c3d5){if(_0x2cfb42[_0x87a285(0x177)](_0x4dec53))return![];}return!![];}else{if($gameSwitches[_0x87a285(0x441)](_0x5a3876))return!![];}}return![];}if(_0x2d7df2[_0x87a285(0x298)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x23699e=JSON['parse']('['+RegExp['$1'][_0x87a285(0x298)](/\d+/g)+']');for(const _0x48ddba of _0x23699e){if(!$gameSwitches[_0x87a285(0x441)](_0x48ddba))return!![];}return![];}if(_0x2d7df2['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6b5d2a=JSON[_0x87a285(0x306)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xe1c6b1 of _0x6b5d2a){if(!$gameSwitches[_0x87a285(0x441)](_0xe1c6b1))return!![];}return![];}if(_0x2d7df2[_0x87a285(0x298)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x15ef98=JSON[_0x87a285(0x306)]('['+RegExp['$1'][_0x87a285(0x298)](/\d+/g)+']');for(const _0x3fa7ae of _0x15ef98){if($gameSwitches[_0x87a285(0x441)](_0x3fa7ae))return![];}return!![];}return!![];},VisuMZ[_0x30c775(0x293)][_0x30c775(0x42c)]=function(_0x38a0b1,_0xe46364){const _0x3b1de3=_0x30c775,_0x2f2f19=_0xe46364['note'];if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3b1de3(0x160)===_0x3b1de3(0x160)){const _0x4afd3d=JSON[_0x3b1de3(0x306)]('['+RegExp['$1'][_0x3b1de3(0x298)](/\d+/g)+']');for(const _0x1dbea5 of _0x4afd3d){if(_0x3b1de3(0x46c)===_0x3b1de3(0x364))_0x76647d[_0x3b1de3(0x293)][_0x3b1de3(0x2ef)][_0x3b1de3(0x3aa)][_0x3b1de3(0x386)]['call'](this,_0x4755db,_0x13bade);else{if(!_0x38a0b1[_0x3b1de3(0x177)](_0x1dbea5))return![];}}return!![];}else{const _0x562380=_0x347702[_0x3b1de3(0x298)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x562380)for(const _0x10956e of _0x562380){_0x10956e['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x5c5d8b=_0x4f0218(_0x1e3229['$1']),_0x270510=_0x225502(_0x2cd244['$2']);_0x5d5e86['removeStatesByCategory'](_0x5c5d8b,_0x270510);}}}else{if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x3b1de3(0x259)===_0x3b1de3(0x1a0)){if(!_0x36580e)return;_0x2b4bcc[_0x3b1de3(0x293)][_0x3b1de3(0x2bb)]['call'](this,_0x279e80,_0x5631d8,_0x457646,_0x3a0dc0),this[_0x3b1de3(0x3db)](_0x3ec3b5,_0x147535,_0x2dadb9,_0x47a985);}else{const _0x3a48d1=RegExp['$1'][_0x3b1de3(0x231)](',');for(const _0x3577bb of _0x3a48d1){const _0x210df3=DataManager['getSkillIdWithName'](_0x3577bb);if(!_0x210df3)continue;if(!_0x38a0b1[_0x3b1de3(0x177)](_0x210df3))return![];}return!![];}}}if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4501f7=JSON[_0x3b1de3(0x306)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x27822f of _0x4501f7){if('ufijc'!==_0x3b1de3(0x3f7)){if(!_0x38a0b1[_0x3b1de3(0x177)](_0x27822f))return![];}else return this[_0x3b1de3(0x245)]();}return!![];}else{if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x433f57=RegExp['$1'][_0x3b1de3(0x231)](',');for(const _0x232285 of _0x433f57){const _0xf4283a=DataManager['getSkillIdWithName'](_0x232285);if(!_0xf4283a)continue;if(!_0x38a0b1['isLearnedSkill'](_0xf4283a))return![];}return!![];}}if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b82bd=JSON[_0x3b1de3(0x306)]('['+RegExp['$1'][_0x3b1de3(0x298)](/\d+/g)+']');for(const _0x422f2b of _0x5b82bd){if(_0x3b1de3(0x400)!==_0x3b1de3(0x2b1)){if(_0x38a0b1['isLearnedSkill'](_0x422f2b))return!![];}else return _0x4a9974[_0x3b1de3(0x293)][_0x3b1de3(0x2ef)][_0x3b1de3(0x371)][_0x3b1de3(0x234)]??0x14;}return![];}else{if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x35eea8=RegExp['$1'][_0x3b1de3(0x231)](',');for(const _0x3e9e90 of _0x35eea8){const _0x391bf1=DataManager[_0x3b1de3(0x1e4)](_0x3e9e90);if(!_0x391bf1)continue;if(_0x38a0b1['isLearnedSkill'](_0x391bf1))return!![];}return![];}}if(_0x2f2f19[_0x3b1de3(0x298)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3b1de3(0x255)==='AqzJj')this['removeState'](_0x102059[_0x3b1de3(0x20e)]());else{const _0x59a489=JSON[_0x3b1de3(0x306)]('['+RegExp['$1'][_0x3b1de3(0x298)](/\d+/g)+']');for(const _0x5bc691 of _0x59a489){if(!_0x38a0b1[_0x3b1de3(0x177)](_0x5bc691))return!![];}return![];}}else{if(_0x2f2f19[_0x3b1de3(0x298)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x3b1de3(0x348)===_0x3b1de3(0x348)){const _0x2d1576=RegExp['$1'][_0x3b1de3(0x231)](',');for(const _0x2e753c of _0x2d1576){const _0x48157b=DataManager[_0x3b1de3(0x1e4)](_0x2e753c);if(!_0x48157b)continue;if(!_0x38a0b1[_0x3b1de3(0x177)](_0x48157b))return!![];}return![];}else _0x1d1fdc[_0x3b1de3(0x208)][_0x3b1de3(0x25f)](_0x10189f[_0x3b1de3(0x46b)]());}}if(_0x2f2f19[_0x3b1de3(0x298)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12c4c0=JSON[_0x3b1de3(0x306)]('['+RegExp['$1'][_0x3b1de3(0x298)](/\d+/g)+']');for(const _0x6b54c8 of _0x12c4c0){if(_0x3b1de3(0x31c)!==_0x3b1de3(0x31c))return this;else{if(!_0x38a0b1[_0x3b1de3(0x177)](_0x6b54c8))return!![];}}return![];}else{if(_0x2f2f19['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x11b54c=RegExp['$1'][_0x3b1de3(0x231)](',');for(const _0x30e5fb of _0x11b54c){const _0x557f29=DataManager[_0x3b1de3(0x1e4)](_0x30e5fb);if(!_0x557f29)continue;if(!_0x38a0b1[_0x3b1de3(0x177)](_0x557f29))return!![];}return![];}}if(_0x2f2f19[_0x3b1de3(0x298)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3b1de3(0x432)===_0x3b1de3(0x432)){const _0x58354b=JSON[_0x3b1de3(0x306)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x38e465 of _0x58354b){if(_0x38a0b1[_0x3b1de3(0x177)](_0x38e465))return![];}return!![];}else this['_statusWindow']&&this['_statusWindow'][_0x3b1de3(0x25e)]===_0x3281a6&&this['_statusWindow'][_0x3b1de3(0x216)](this[_0x3b1de3(0x3e7)](0x0));}else{if(_0x2f2f19['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x3b1de3(0x267)!==_0x3b1de3(0x43b)){const _0x6c892e=RegExp['$1'][_0x3b1de3(0x231)](',');for(const _0x1fbe1f of _0x6c892e){const _0x579fbe=DataManager[_0x3b1de3(0x1e4)](_0x1fbe1f);if(!_0x579fbe)continue;if(_0x38a0b1[_0x3b1de3(0x177)](_0x579fbe))return![];}return!![];}else _0x300254['SkillsStatesCore'][_0x3b1de3(0x393)][_0x3b1de3(0x2a8)](this,_0x280f95),_0x31e239[_0x3b1de3(0x293)][_0x3b1de3(0x3fa)](_0x2c388f),_0x304108['SkillsStatesCore'][_0x3b1de3(0x260)](_0x278c18),_0x2dcc8b['SkillsStatesCore'][_0x3b1de3(0x17f)](_0x88f1db),_0x52c9c1['SkillsStatesCore']['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x89fd9c);}}if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x65697f=JSON[_0x3b1de3(0x306)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3e4ce3 of _0x65697f){if('IYgtm'!==_0x3b1de3(0x430)){if(!_0x38a0b1[_0x3b1de3(0x3dc)](_0x3e4ce3))return![];}else{const _0x1bd76a=_0x45e204['SkillsStatesCore']['statePassiveConditionJS'];if(_0x1bd76a[_0x15e1ae['id']]&&!_0x1bd76a[_0x8bf6bd['id']][_0x3b1de3(0x2a8)](this,_0x21612d))return![];return!![];}}return!![];}else{if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x3b1de3(0x3f3)===_0x3b1de3(0x3f3)){const _0x567c8e=RegExp['$1']['split'](',');for(const _0x13eff8 of _0x567c8e){const _0x383f5f=DataManager[_0x3b1de3(0x1e4)](_0x13eff8);if(!_0x383f5f)continue;if(!_0x38a0b1[_0x3b1de3(0x3dc)](_0x383f5f))return![];}return!![];}else return _0x2ad7c5[_0x3b1de3(0x171)]()[_0x561eb0(_0x3f0a9a['$1'])];}}if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3b1de3(0x3e1)!==_0x3b1de3(0x3e1)){const _0x32734f=this[_0x3b1de3(0x1ea)]();for(const _0x185e44 of _0x32734f){if(!_0x185e44[_0x3b1de3(0x226)]())return![];}return!![];}else{const _0x32314f=JSON[_0x3b1de3(0x306)]('['+RegExp['$1'][_0x3b1de3(0x298)](/\d+/g)+']');for(const _0x498df8 of _0x32314f){if(!_0x38a0b1[_0x3b1de3(0x3dc)](_0x498df8))return![];}return!![];}}else{if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x274e4a=RegExp['$1'][_0x3b1de3(0x231)](',');for(const _0x33a126 of _0x274e4a){const _0x4514a2=DataManager[_0x3b1de3(0x1e4)](_0x33a126);if(!_0x4514a2)continue;if(!_0x38a0b1[_0x3b1de3(0x3dc)](_0x4514a2))return![];}return!![];}}if(_0x2f2f19['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c585b=JSON[_0x3b1de3(0x306)]('['+RegExp['$1'][_0x3b1de3(0x298)](/\d+/g)+']');for(const _0x431583 of _0x3c585b){if(_0x38a0b1['hasSkill'](_0x431583))return!![];}return![];}else{if(_0x2f2f19[_0x3b1de3(0x298)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x35e9f2=RegExp['$1'][_0x3b1de3(0x231)](',');for(const _0x32004c of _0x35e9f2){if('kblkb'!==_0x3b1de3(0x2af)){if(typeof _0x2aa446!==_0x3b1de3(0x38e))_0x10efd0=_0x5d7487['id'];const _0x330696=this[_0x3b1de3(0x2e8)](_0x94933d);_0x330696[_0xf995f4]=_0x26b890;}else{const _0x23905d=DataManager['getSkillIdWithName'](_0x32004c);if(!_0x23905d)continue;if(_0x38a0b1['hasSkill'](_0x23905d))return!![];}}return![];}}if(_0x2f2f19[_0x3b1de3(0x298)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3b1de3(0x33d)!==_0x3b1de3(0x279)){const _0x3fbac8=JSON['parse']('['+RegExp['$1'][_0x3b1de3(0x298)](/\d+/g)+']');for(const _0x5d13bf of _0x3fbac8){if(!_0x38a0b1[_0x3b1de3(0x3dc)](_0x5d13bf))return!![];}return![];}else{const _0x39517c=_0x4ad733['SkillsStatesCore']['Settings'][_0x3b1de3(0x24c)];return _0x39517c[_0x3b1de3(0x15a)]===_0x3b1de3(0x38e)?_0x3bedb1['numberFontFace']():_0xdac5c5[_0x3b1de3(0x1a7)]();}}else{if(_0x2f2f19['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4a782c=RegExp['$1']['split'](',');for(const _0x11d846 of _0x4a782c){if(_0x3b1de3(0x3d9)!==_0x3b1de3(0x3d9)){const _0x11daaa=_0x7acca7['priority'],_0x351cfe=_0x28ed65[_0x3b1de3(0x2c5)];if(_0x11daaa!==_0x351cfe)return _0x351cfe-_0x11daaa;return _0x1baf2d-_0x147dfd;}else{const _0x4047bd=DataManager[_0x3b1de3(0x1e4)](_0x11d846);if(!_0x4047bd)continue;if(!_0x38a0b1[_0x3b1de3(0x3dc)](_0x4047bd))return!![];}}return![];}}if(_0x2f2f19[_0x3b1de3(0x298)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('sgsOX'!==_0x3b1de3(0x28e)){if(!_0x2f8043[_0x3b1de3(0x441)](_0x1b8a5b))return![];}else{const _0x312278=JSON[_0x3b1de3(0x306)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x6650b8 of _0x312278){if(_0x3b1de3(0x27b)===_0x3b1de3(0x187))this[_0x3b1de3(0x145)](_0x333548);else{if(!_0x38a0b1[_0x3b1de3(0x3dc)](_0x6650b8))return!![];}}return![];}}else{if(_0x2f2f19[_0x3b1de3(0x298)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2de911=RegExp['$1']['split'](',');for(const _0x1edfbf of _0x2de911){const _0x332755=DataManager[_0x3b1de3(0x1e4)](_0x1edfbf);if(!_0x332755)continue;if(!_0x38a0b1[_0x3b1de3(0x3dc)](_0x332755))return!![];}return![];}}if(_0x2f2f19[_0x3b1de3(0x298)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ad99f=JSON[_0x3b1de3(0x306)]('['+RegExp['$1'][_0x3b1de3(0x298)](/\d+/g)+']');for(const _0x4eb586 of _0x3ad99f){if(_0x38a0b1[_0x3b1de3(0x3dc)](_0x4eb586))return![];}return!![];}else{if(_0x2f2f19[_0x3b1de3(0x298)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x3b1de3(0x244)!==_0x3b1de3(0x23d)){const _0xe78f2c=RegExp['$1'][_0x3b1de3(0x231)](',');for(const _0x171c2a of _0xe78f2c){if('KfvYv'===_0x3b1de3(0x405))_0x24556b+=this[_0x3b1de3(0x1e6)](_0x16fe4f),this[_0x3b1de3(0x1df)](_0x46f236,_0xba6b8e);else{const _0x2d9238=DataManager[_0x3b1de3(0x1e4)](_0x171c2a);if(!_0x2d9238)continue;if(_0x38a0b1[_0x3b1de3(0x3dc)](_0x2d9238))return![];}}return!![];}else _0x35f453['prototype'][_0x3b1de3(0x3b1)]['call'](this,_0x3cd38d),this[_0x3b1de3(0x243)](_0xad5d89);}}return!![];},Window_SkillList['prototype']['checkShowHideJS']=function(_0x1b78c6){const _0x432ff2=_0x30c775,_0xf02130=_0x1b78c6['note'],_0x577dc6=VisuMZ[_0x432ff2(0x293)]['skillVisibleJS'];return _0x577dc6[_0x1b78c6['id']]?_0x577dc6[_0x1b78c6['id']]['call'](this,_0x1b78c6):!![];},VisuMZ[_0x30c775(0x293)][_0x30c775(0x340)]=Window_SkillList['prototype']['drawItem'],Window_SkillList[_0x30c775(0x150)][_0x30c775(0x447)]=function(_0x553dbc){const _0x33f2d6=_0x30c775,_0x490857=this['itemAt'](_0x553dbc),_0x3101c8=_0x490857?_0x490857[_0x33f2d6(0x456)]:'';if(_0x490857)this[_0x33f2d6(0x448)](_0x490857);VisuMZ[_0x33f2d6(0x293)][_0x33f2d6(0x340)][_0x33f2d6(0x2a8)](this,_0x553dbc);if(_0x490857)_0x490857[_0x33f2d6(0x456)]=_0x3101c8;},Window_SkillList[_0x30c775(0x150)][_0x30c775(0x448)]=function(_0x43aa6b){const _0x265bfc=_0x30c775;if(_0x43aa6b&&_0x43aa6b[_0x265bfc(0x283)][_0x265bfc(0x298)](/<LIST NAME:[ ](.*)>/i)){if(_0x265bfc(0x419)!==_0x265bfc(0x419)){const _0xdad50=_0x1fbe8a['x']+_0x489e9f[_0x265bfc(0x28a)]((_0x59727f[_0x265bfc(0x1da)]-_0x29f6c7)/0x2);this[_0x265bfc(0x421)](_0x53d826,_0xdad50,_0xefd766['y'],_0x2ea5e7);}else{_0x43aa6b[_0x265bfc(0x456)]=String(RegExp['$1'])['trim']();for(;;){if(_0x265bfc(0x392)===_0x265bfc(0x1d7))this[_0x265bfc(0x25b)](_0x2b281b,_0x3243d0,_0x5134cf,_0x1eeb73),_0xbd01++,_0x3cd00c%0x2===0x0?(_0x1440f3=_0x4ac016,_0x3941a8+=_0x2104bb):_0x5b062c+=_0x12c687+0x18;else{if(_0x43aa6b[_0x265bfc(0x456)][_0x265bfc(0x298)](/\\V\[(\d+)\]/gi)){if(_0x265bfc(0x1b0)===_0x265bfc(0x1b0))_0x43aa6b[_0x265bfc(0x456)]=_0x43aa6b[_0x265bfc(0x456)][_0x265bfc(0x1ef)](/\\V\[(\d+)\]/gi,(_0x536f89,_0x540295)=>$gameVariables[_0x265bfc(0x441)](parseInt(_0x540295)));else{const _0xef8b2b=this[_0x265bfc(0x350)]();return this['convertTargetToStateOriginKey'](_0xef8b2b);}}else break;}}}}},Window_SkillList['prototype'][_0x30c775(0x324)]=function(_0x339b50,_0x10b1bd,_0x1e831d,_0x50e74d){const _0xdf8ce=_0x30c775;Window_Base['prototype'][_0xdf8ce(0x324)][_0xdf8ce(0x2a8)](this,this[_0xdf8ce(0x1fd)],_0x339b50,_0x10b1bd,_0x1e831d,_0x50e74d);},Window_SkillList['prototype'][_0x30c775(0x377)]=function(_0x1980c5){const _0xaed3ad=_0x30c775;this[_0xaed3ad(0x274)]=_0x1980c5,this[_0xaed3ad(0x36f)]();},VisuMZ[_0x30c775(0x293)]['Window_SkillList_updateHelp']=Window_SkillList['prototype'][_0x30c775(0x3d8)],Window_SkillList[_0x30c775(0x150)][_0x30c775(0x3d8)]=function(){const _0x3c74d1=_0x30c775;VisuMZ[_0x3c74d1(0x293)]['Window_SkillList_updateHelp'][_0x3c74d1(0x2a8)](this),this['_statusWindow']&&this[_0x3c74d1(0x274)][_0x3c74d1(0x25e)]===Window_ShopStatus&&this[_0x3c74d1(0x274)][_0x3c74d1(0x216)](this['item']());};function _0x4a18(){const _0x3cabd5=['onAddStateJS','process_VisuMZ_SkillsStatesCore_Skill_Notetags','buffIconIndex','isSkillCostShown','redrawSkillsStatesCore','hBFsH','_stored_state-%1-color','NpAVI','learnSkill','colSpacing','passiveStates','_costSettings','Game_Battler_regenerateAll','GYZYh','AwEHB','isStateCategoryAffected','drawExtendedSkillsStatesCoreStatus','allBattleMembers','onExpireDebuffGlobalJS','ActionEndUpdate','getStateOrigin','menuActor','stateData','Qiejj','textSizeEx','Name','AYXwR','vtORP','meetsPassiveStateConditionClasses','Settings','drawItemStyleIcon','onRegenerateCustomStateDamageOverTime','changeOutlineColor','hasState','placeExactGauge','mainFontSize','slipMp','Sprite_Gauge_currentValue','getCurrentTroopUniqueID','MAXMP','labelOutlineColor','maxSlipDamage','SkillMenuStatusRect','ARRAYNUM','onAddDebuff','_battler','damage','onExpireStateGlobalJS','autoRemovalTiming','isMaxDebuffAffected','Game_BattlerBase_eraseBuff','<enemy-%1>','parse','Parse_Notetags_Skill_Cost','RDmwm','_commandNameWindow','stateTpSlipHealJS','labelOutlineWidth','applyItemUserEffect','convertPassiveStates','skillTpCost','Game_BattlerBase_isStateResist','zlHed','JVXam','HiddenSkillTypes','currentClass','TurnFontSize','resetTextColor','isSceneBattle','UTJHu','commandStyle','onEraseDebuff','nVbhS','ParseSkillNotetags','tsKEj','5821260NAkDNK','CheckVisibleSwitchNotetags','forgetSkill','iconWidth','adjustItemWidthByShopStatus','Window_SkillType_initialize','JSON','drawSkillCost','JzdgC','isPlaytest','Eoqud','statesByCategory','filter','PassiveStates','recoverAll','Game_BattlerBase_resetStateCounts','ColorNegative','groupDefeat','statePassiveConditionJS','labelColor','VisuMZ_1_ElementStatusCore','gaugeBackColor','Scene_Skill_skillTypeWindowRect','exit','regenerateAllSkillsStatesCore','enemy','isSkillUsableForAutoBattle','NPYns','addBuffTurns','WZGJr','VisuMZ_2_ClassChangeSystem','status','ltQCD','includes','#%1','Window_SkillList_drawItem','createCommandNameWindow','multiclasses','setStateRetainType','Actor','makeSuccess','setStateOrigin','version','VkfSt','Game_Battler_isStateAddable','Xsblm','makeCommandList','allowCreateShopStatusWindow','checkSkillConditionsSwitchNotetags','equips','kSiVW','getCurrentStateActiveUser','rgba(0,\x200,\x200,\x201)','_stored_buffColor','_stypeId','fontFace','Game_BattlerBase_overwriteBuffTurns','isStateAddable','HsJql','convertTargetToStateOriginKey','LabelFontMainType','drawActorStateData','STRUCT','recover\x20all','LuzOZ','removeStatesByCategoryAll','isActor','Kwhdg','checkShowHideNotetags','isAllDead','endAction','UFInR','updateStatesActionEnd','convertGaugeTypeSkillsStatesCore','drawItemStyleIconText','Game_BattlerBase_buffIconIndex','helpAreaTop','onAddBuff','onExpireDebuffJS','_skillIDs','_stypeIDs','_colorCache','callUpdateHelp','onDatabaseLoaded','States','DEF','gainSilentTp','IVyac','_classIDs','OEFZE','setStatusWindow','applySkillsStatesCoreEffects','stypeId','statusWindowRectSkillsStatesCore','%1%','isPartyAllAffectedByGroupDefeatStates','updateVisibility','SkillSceneStatusBgType','meetsPassiveStateConditionJS','Scene_Boot_onDatabaseLoaded','FsUOs','setStypeId','meetsPassiveStateConditionSwitches','uiHelpPosition','wKapC','onAddDebuffJS','mCKNv','ColorPositive','index','rhjvh','ColorBuff','currentMaxValue','MaxTurns','number','isMaxBuffAffected','rxnzw','SkillSceneAdjustSkillList','ftnHj','ParseStateNotetags','Game_Actor_forgetSkill','helpWindowRectSkillsStatesCore','Game_Actor_learnSkill','_passiveStateResults','anchor','mpCost','setPassiveStateSlipDamageJS','GaugeDrawJS','makeAdditionalSkillCostText','right','_checkingTraitsSetSkillsStatesCore','gaugeColor2','height','isRightInputMode','pslPy','commandNameWindowDrawText','HhVWC','ANY','XJnRF','addDebuffTurns','Emafh','Scene_Skill_helpWindowRect','Buffs','LZCsO','ConvertParams','iDVME','QsMmq','applyBuffTurnManipulationEffects','uiInputPosition','onEraseBuff','ARRAYEVAL','innerWidth','checkCacheKey','fontSize','addStateTurns','restriction','remove','mmYNK','onEraseStateCustomJS','state','round','recalculateSlipDamageJS','Game_Switches_onChange','MYNqE','paramValueByName','innerHeight','skillTypes','MDF','gainHp','DisplayedParams','item','EkbJD','gaugeRate','CmdTextAlign','die','drawActorIcons','gradientFillRect','GfXvm','Game_Action_testApply','NUM','RglNV','fontBold','Game_BattlerBase_die','reset','AslfP','Window_SkillList_setActor','tADsm','testApply','updateHelp','JtOgi','EVAL','drawActorIconsAllTurnCounters','hasSkill','isStateRestrict','test','placeGauge','greater','KMTrH','EAamo','skillVisibleJS','NfclS','FUNC','isStateCategoryResisted','itemAt','VisuMZ_0_CoreEngine','updateCommandNameWindow','drawIcon','ShowData','paySkillCost','Dybpe','itemLineRect','ARRAYSTR','BattleManager_endAction','NsWne','Game_BattlerBase_refresh','hoBBj','buttonAssistText1','skillTypeWindowRectSkillsStatesCore','onExpireBuffGlobalJS','zUfJH','success','vQwNm','Parse_Notetags_State_Category','CanPayJS','rKqkq','qMpra','_currentTroopUniqueID','CBaOQ','VPRvY','stateExpireJS','ARRAYSTRUCT','stateCategoriesResisted','clear','SoVNH','stateAddJS','ckklH','onAddState','Vpmgg','passiveStateObjects','addState','clearStateData','stateHpSlipHealJS','createSkillCostText','loadBitmap','onAddBuffGlobalJS','tsNXE','setStateDisplay','getClassIdWithName','getStateDisplay','testSkillStatesCoreNotetags','Game_Unit_deadMembers','drawText','Sprite_Gauge_initMembers','vcbye','uiMenuStyle','onAddStateGlobalJS','createShopStatusWindow','COgvm','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','afTDm','concat','drawTextEx','qVvUh','Game_Battler_addBuff','removeBuff','getSkillTypes','hasStateCategory','QuCOe','_skillTypeWindow','isStateResist','278619PKckDM','useDigitGrouping','CheckVisibleSkillNotetags','itemTextAlign','ValueOutlineSolid','EnableLayout','eMzgg','stepsForTurn','uaCKb','CmdWidth','contents','Game_Troop_setup','mHmEF','user','makeCommandName','CQjQc','IconStypeNorm','mpUEy','Game_BattlerBase_meetsSkillConditions','isPassiveStateStackable','isSkillTypeMatchForUse','isUseModernControls','SkillConditionJS','value','buttonAssistSwitch','isStateRemoved','stateEraseJS','currentValue','njral','drawItem','alterSkillName','stateColor','slice','LUK','MJkSI','QhuzU','isBuffOrDebuffAffected','ParseClassIDs','STtjA','RTQXm','_stateData','Game_BattlerBase_traitsSet','bGmSf','toUpperCase','name','MavOF','inBattle','CheckIncompatibleStates','_stateRetainType','hRHPf','WUSvh','stateMpSlipDamageJS','\x5cI[%1]%2','iconIndex','RWbLW','GaugeCurrentJS','setBuffTurns','lyXRi','GaugeMaxJS','shopStatusWindowRect','CIMFV','yYYod','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','removeStatesAuto','setup','trim','qXhsO','skills','debuffColor','buffColor','eraseBuff','Game_BattlerBase_skillMpCost','commandNameWindowDrawBackground','IGSVM','_skills','RYrcl','slipHp','itemWindowRect','Game_Variables_onChange','overwriteBuffTurns','kmbMU','RefreshCacheVar','boxWidth','onEraseBuffJS','getStypeIdWithName','maxItems','MAXHP','skillId','buffTurns','onExpireStateCustomJS','skillEnableJS','drawFullGauge','death','MAT','vjdBs','mainCommandWidth','addPassiveStatesByNotetag','calcWindowHeight','hpDamage','MatchLabelColor','prototype','setupSkillsStatesCore','Window_SkillList_maxCols','sFzVW','ShowJS','labelFontSize','max','totalStateCategory','checkShowHideJS','enemyId','ValueFontMainType','untitled','_scene','setActor','VisuMZ_1_MainMenuCore','removeOtherStatesOfSameCategory','LZpvI','isUseSkillsStatesCoreUpdatedLayout','_shopStatusWindow','getColorDataFromPluginParameters','normalColor','jiQat','Sprite_Gauge_gaugeRate','commandNameWindowCenter','_subject','SeMRf','getStateIdWithName','mainAreaHeight','SBykp','Window_StatusBase_placeGauge','resetStateCounts','add','fbpxz','members','tpCost','updatedLayoutStyle','_stateDisplay','Game_BattlerBase_states','DataOffsetX','isLearnedSkill','skill','CZPVA','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onEraseDebuffJS','center','Game_BattlerBase_initMembers','map','Parse_Notetags_State_SlipEffectJS','onEraseStateGlobalJS','qtkEz','Scene_Skill_statusWindowRect','QZzEy','_hidden','isBuffAffected','UqfDS','qWmuk','RefreshCacheSwitch','tzZTa','onEraseDebuffGlobalJS','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Window_SkillStatus_refresh','text','onExpireBuffJS','sMFBD','CmdStyle','_lastStatesActionEndFrameCount','TextJS','MatchLabelGaugeColor','6210880VcmhjT','clearStateRetainType','meetsSkillConditions','updateFrame','lvGSm','return\x200','initialize','HIJXn','6xWseMA','Scene_Skill_createItemWindow','log','addBuff','BTDXF','SxasT','paramBuffRate','Parse_Notetags_State_ApplyRemoveLeaveJS','stateTpSlipDamageJS','DJnuc','VydcT','mainFontFace','states','clearStateOrigin','regenerateAll','resetFontSettings','Costs','getColor','LzcBq','Parse_Notetags_Skill_JS','OexlN','Game_Unit_isAllDead','YxxXO','ShowTurns','_stateTurns','6059892WHhpYV','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','meetsStateCondition','getStateOriginByKey','TPpna','mRzKp','heal','refresh','addPassiveStatesFromOtherPlugins','getStateData','drawActorBuffRates','maxCols','magicSkills','deadMembers','gaugeColor1','getCurrentStateOriginKey','2655372NopWcF','PassiveConditionJS','84469PjIEpq','buff','updateTurnDisplaySprite','IJQLJ','keys','meetsSkillConditionsGlobalJS','bZKMS','currentMaxValueSkillsStatesCore','sUofc','initMembers','TurnOffsetY','YsHtp','CtKXK','1940rpjipp','Scene_Skill_itemWindowRect','ioEMF','agvhz','bWOTF','NEZfN','width','createTurnDisplaySprite','_checkingVisuMzPassiveStateObjects','format','_checkingPassiveStates','setStateTurns','yiJva','QYivQ','valueFontFace','drawActorBuffTurns','getSkillIdWithName','onRemoveState','stateTurns','LiEBu','onAddBuffJS','Game_BattlerBase_skillTpCost','aliveMembers','Game_BattlerBase_recoverAll','initMembersSkillsStatesCore','isSkillHidden','meetsPassiveStateGlobalConditionJS','replace','ListWindowCols','onAddStateCustomJS','Egdmb','valueFontSize','Game_Actor_skillTypes','<member-%1>','Skills','Game_BattlerBase_decreaseBuff','bitmap','windowPadding','TurnOffsetX','Sprite_Gauge_redraw','valueOutlineWidth','_actor','bjpys','ATK','_states','checkSkillTypeMatch','_result','iconText','AGI','_currentActor','Param','commandName','categories','eraseState','addPassiveStatesByPluginParameters','removeState','Game_Battler_addState','commandStyleCheck','shift','createAllSkillCostText','none','makeResistedStateCategories','WVOyD','getStateReapplyRulings','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','IFijq','setItem','_buffTurns','CXahr','process_VisuMZ_SkillsStatesCore_State_Notetags','Thfhz','CoreEngine','_tempBattler','CheckVisibleBattleNotetags','getStateRetainType','indexOf','<troop-%1>','VisuMZ_1_ItemsEquipsCore','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','uQYJv','Game_BattlerBase_eraseState','shopStatusWindowRectSkillsStatesCore','isGroupDefeatStateAffected','stateMpSlipHealJS','addCommand','mainAreaTop','numberFontFace','usableSkills','Global','ReapplyRules','gainMp','helpWindowRect','Game_Action_applyItemUserEffect','split','jUOof','onExpireDebuff','TurnEndOnMap','eZsiA','skillCostSeparator','hSiWY','pBsdn','HYvSi','ALL','ignore','slipTp','HENrU','FXlTw','debuffTurns','YBiZd','NXlwD','DataOffsetY','onEraseBuffGlobalJS','UMvLA','itemWindowRectSkillsStatesCore','removeBuffsAuto','addPassiveStates','redraw','MOQTN','xmlUS','DTuVx','Gauge','WcZLM','_stateIDs','onExpireState','BattleHiddenSkillTypes','statusWindowRect','Game_Battler_addDebuff','sAtIp','_cache','gldaD','removeStatesByCategory','IeNBN','changeTextColor','FRGyl','StackDebuffMax','drawExtendedParameter','STR','totalStateCategoryAffected','constructor','push','Parse_Notetags_State_PassiveJS','onChange','ceil','UNaXw','LabelOutlineSolid','allIcons','Sprite_Gauge_currentMaxValue','oVKic','traitsSet','frameCount','rgba(0,\x200,\x200,\x200)','_animationIndex','JimMf','LjYyf','rgRed','OcIrz','iconHeight','_categoryWindow','actor','jnuiB','_statusWindow','CYtZT','applyDebuffTurnManipulationEffects','CalcJS','textColor','WjJIh','isStateAffected','AeCGy','socMF','StackBuffMax','KHZXt','gaugeLineHeight','<actor-%1>','currentDisplayedValue','decreaseBuff','note','_itemWindow','buHFr','active','applyStateTurnManipulationEffects','LabelOutlineWidth','DataFontSize','floor','18JkOlUF','setDebuffTurns','CyTjq','sgsOX','_turnDisplaySprite','Window_SkillList_includes','icon','skillMpCost','SkillsStatesCore','ACeHk','addWindow','_stateMaxTurns','process_VisuMZ_SkillsStatesCore_Notetags','match','SjjPs','outlineColor','mPJwR','OEoYc','toLowerCase','meetsSkillConditionsEnableJS','drawActorStateTurns','addDebuff','length','meetsPassiveStateConditions','_buffs','clearStates','onEraseStateJS','createPassiveStatesCache','_stateOrigin','call','sgOdV','7VzlHvv','Sprite_Gauge_setup','EjCuf','actions','shopStatusWidth','kblkb','Sprite_StateIcon_updateFrame','EudvF','5936148SafrrY','setBackgroundType','scrollTo','PresetLabelGaugeColor','LayoutStyle','mpDamage','Game_BattlerBase_increaseBuff','onExpireStateJS','description','Window_StatusBase_drawActorIcons','makeCurrentTroopUniqueID','increaseBuff','aEwep','Sprite_StateIcon_loadBitmap','applyStateCategoryRemovalEffects','onAddDebuffGlobalJS','onAddStateMakeCustomSlipValues','Game_BattlerBase_clearStates','clamp','priority','isDebuffAffected','isBuffPrevented','clearStateDisplay','_tempActor','currentValueSkillsStatesCore','apgCc','clearStatesWithStateRetain','Izmod','drawParamText','stateId','cnkcq','stateMaximumTurns'];_0x4a18=function(){return _0x3cabd5;};return _0x4a18();}