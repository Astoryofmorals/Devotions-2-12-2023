//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.48;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.48] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x17a6d5=_0x5820;(function(_0x2b2aa2,_0x1fe748){const _0x175fbb=_0x5820,_0x195aea=_0x2b2aa2();while(!![]){try{const _0x4de9fa=parseInt(_0x175fbb(0x598))/0x1*(parseInt(_0x175fbb(0x3de))/0x2)+-parseInt(_0x175fbb(0x21f))/0x3+-parseInt(_0x175fbb(0x21c))/0x4*(parseInt(_0x175fbb(0x371))/0x5)+parseInt(_0x175fbb(0x168))/0x6+parseInt(_0x175fbb(0x55f))/0x7*(parseInt(_0x175fbb(0x1f3))/0x8)+parseInt(_0x175fbb(0x5c8))/0x9*(parseInt(_0x175fbb(0x47e))/0xa)+parseInt(_0x175fbb(0x613))/0xb*(-parseInt(_0x175fbb(0x224))/0xc);if(_0x4de9fa===_0x1fe748)break;else _0x195aea['push'](_0x195aea['shift']());}catch(_0x2c5648){_0x195aea['push'](_0x195aea['shift']());}}}(_0x2b85,0x53f34));var label=_0x17a6d5(0x480),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x47ab53){const _0x360274=_0x17a6d5;return _0x47ab53[_0x360274(0x583)]&&_0x47ab53[_0x360274(0x326)][_0x360274(0x64c)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x17a6d5(0x429)]||{},VisuMZ['ConvertParams']=function(_0x301de9,_0x6a1a9f){const _0x37a280=_0x17a6d5;for(const _0x1e9f65 in _0x6a1a9f){if(_0x1e9f65[_0x37a280(0x5d0)](/(.*):(.*)/i)){const _0x497f1f=String(RegExp['$1']),_0x112a50=String(RegExp['$2'])[_0x37a280(0x43c)]()[_0x37a280(0x520)]();let _0x4927c3,_0x3531a5,_0x25e2eb;switch(_0x112a50){case _0x37a280(0x5e8):_0x4927c3=_0x6a1a9f[_0x1e9f65]!==''?Number(_0x6a1a9f[_0x1e9f65]):0x0;break;case _0x37a280(0x18a):_0x3531a5=_0x6a1a9f[_0x1e9f65]!==''?JSON[_0x37a280(0x2f3)](_0x6a1a9f[_0x1e9f65]):[],_0x4927c3=_0x3531a5[_0x37a280(0x44b)](_0x2070ca=>Number(_0x2070ca));break;case'EVAL':_0x4927c3=_0x6a1a9f[_0x1e9f65]!==''?eval(_0x6a1a9f[_0x1e9f65]):null;break;case _0x37a280(0x5f7):_0x3531a5=_0x6a1a9f[_0x1e9f65]!==''?JSON[_0x37a280(0x2f3)](_0x6a1a9f[_0x1e9f65]):[],_0x4927c3=_0x3531a5[_0x37a280(0x44b)](_0x2a92df=>eval(_0x2a92df));break;case _0x37a280(0x418):_0x4927c3=_0x6a1a9f[_0x1e9f65]!==''?JSON[_0x37a280(0x2f3)](_0x6a1a9f[_0x1e9f65]):'';break;case _0x37a280(0x439):_0x3531a5=_0x6a1a9f[_0x1e9f65]!==''?JSON[_0x37a280(0x2f3)](_0x6a1a9f[_0x1e9f65]):[],_0x4927c3=_0x3531a5['map'](_0x3018f8=>JSON[_0x37a280(0x2f3)](_0x3018f8));break;case _0x37a280(0x217):_0x4927c3=_0x6a1a9f[_0x1e9f65]!==''?new Function(JSON[_0x37a280(0x2f3)](_0x6a1a9f[_0x1e9f65])):new Function('return\x200');break;case'ARRAYFUNC':_0x3531a5=_0x6a1a9f[_0x1e9f65]!==''?JSON[_0x37a280(0x2f3)](_0x6a1a9f[_0x1e9f65]):[],_0x4927c3=_0x3531a5[_0x37a280(0x44b)](_0x5b55ee=>new Function(JSON[_0x37a280(0x2f3)](_0x5b55ee)));break;case _0x37a280(0x3ec):_0x4927c3=_0x6a1a9f[_0x1e9f65]!==''?String(_0x6a1a9f[_0x1e9f65]):'';break;case _0x37a280(0x279):_0x3531a5=_0x6a1a9f[_0x1e9f65]!==''?JSON[_0x37a280(0x2f3)](_0x6a1a9f[_0x1e9f65]):[],_0x4927c3=_0x3531a5[_0x37a280(0x44b)](_0x5ab6a9=>String(_0x5ab6a9));break;case _0x37a280(0x381):_0x25e2eb=_0x6a1a9f[_0x1e9f65]!==''?JSON[_0x37a280(0x2f3)](_0x6a1a9f[_0x1e9f65]):{},_0x301de9[_0x497f1f]={},VisuMZ[_0x37a280(0x5d7)](_0x301de9[_0x497f1f],_0x25e2eb);continue;case _0x37a280(0x4a5):_0x3531a5=_0x6a1a9f[_0x1e9f65]!==''?JSON[_0x37a280(0x2f3)](_0x6a1a9f[_0x1e9f65]):[],_0x4927c3=_0x3531a5[_0x37a280(0x44b)](_0x28ea85=>VisuMZ[_0x37a280(0x5d7)]({},JSON[_0x37a280(0x2f3)](_0x28ea85)));break;default:continue;}_0x301de9[_0x497f1f]=_0x4927c3;}}return _0x301de9;},(_0x4e8e76=>{const _0x1a91ea=_0x17a6d5,_0x43a225=_0x4e8e76[_0x1a91ea(0x303)];for(const _0x319b95 of dependencies){if(!Imported[_0x319b95]){alert(_0x1a91ea(0x620)[_0x1a91ea(0x333)](_0x43a225,_0x319b95)),SceneManager['exit']();break;}}const _0x4cd0d8=_0x4e8e76[_0x1a91ea(0x326)];if(_0x4cd0d8[_0x1a91ea(0x5d0)](/\[Version[ ](.*?)\]/i)){const _0xe7d773=Number(RegExp['$1']);_0xe7d773!==VisuMZ[label][_0x1a91ea(0x45c)]&&(alert(_0x1a91ea(0x58e)[_0x1a91ea(0x333)](_0x43a225,_0xe7d773)),SceneManager['exit']());}if(_0x4cd0d8['match'](/\[Tier[ ](\d+)\]/i)){const _0x560adc=Number(RegExp['$1']);if(_0x560adc<tier)_0x1a91ea(0x48a)===_0x1a91ea(0x48a)?(alert(_0x1a91ea(0x5b5)[_0x1a91ea(0x333)](_0x43a225,_0x560adc,tier)),SceneManager[_0x1a91ea(0x3aa)]()):(this[_0x1a91ea(0x255)]['x']=0x1/_0x18c949[_0x1a91ea(0x5ad)](),this[_0x1a91ea(0x255)]['y']=0x1/_0x552aa7[_0x1a91ea(0x5ad)](),this['_screenZoomScale']=_0x43b9ff[_0x1a91ea(0x5ad)]());else{if('dLXDS'===_0x1a91ea(0x5e3)){for(let _0x1a8db6=0x1;_0x1a8db6<_0x1ddd8b[_0x1a91ea(0x395)][_0x1a91ea(0x304)];_0x1a8db6++){if(_0x1e9e37[_0x1a91ea(0x395)][_0x1a8db6][_0x1a91ea(0x5d0)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x3e8874['AdvancedSwitches'][_0x1a91ea(0x16c)](_0x1a8db6);if(_0x293e94[_0x1a91ea(0x395)][_0x1a8db6][_0x1a91ea(0x5d0)](/<SELF>/i))_0x31cb29[_0x1a91ea(0x560)][_0x1a91ea(0x16c)](_0x1a8db6);if(_0x1de392[_0x1a91ea(0x395)][_0x1a8db6][_0x1a91ea(0x5d0)](/<MAP>/i))_0x1dcce1[_0x1a91ea(0x447)][_0x1a91ea(0x16c)](_0x1a8db6);}for(let _0x28568b=0x1;_0x28568b<_0x7bc77e['variables'][_0x1a91ea(0x304)];_0x28568b++){if(_0x375db1[_0x1a91ea(0x40f)][_0x28568b]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x59b2ec[_0x1a91ea(0x60a)][_0x1a91ea(0x16c)](_0x28568b);if(_0x374c68[_0x1a91ea(0x40f)][_0x28568b]['match'](/<SELF>/i))_0x45af70[_0x1a91ea(0x3fd)][_0x1a91ea(0x16c)](_0x28568b);if(_0x196e90['variables'][_0x28568b][_0x1a91ea(0x5d0)](/<MAP>/i))_0x17aa82[_0x1a91ea(0x53b)][_0x1a91ea(0x16c)](_0x28568b);}}else tier=Math[_0x1a91ea(0x533)](_0x560adc,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x1a91ea(0x429)],_0x4e8e76[_0x1a91ea(0x16e)]);})(pluginData),VisuMZ[_0x17a6d5(0x63d)]=function(_0x4df11c,_0x4c1815,_0x3fc248){switch(_0x3fc248){case'=':return _0x4c1815;break;case'+':return _0x4df11c+_0x4c1815;break;case'-':return _0x4df11c-_0x4c1815;break;case'*':return _0x4df11c*_0x4c1815;break;case'/':return _0x4df11c/_0x4c1815;break;case'%':return _0x4df11c%_0x4c1815;break;}return _0x4df11c;},PluginManager[_0x17a6d5(0x4aa)](pluginData['name'],_0x17a6d5(0x1e3),_0x39f455=>{const _0x48f2cd=_0x17a6d5;VisuMZ[_0x48f2cd(0x5d7)](_0x39f455,_0x39f455);switch(_0x39f455[_0x48f2cd(0x69b)]){case _0x48f2cd(0x1c1):$gameSystem[_0x48f2cd(0x5a8)](!![]);break;case _0x48f2cd(0x526):$gameSystem[_0x48f2cd(0x5a8)](![]);break;case _0x48f2cd(0x2b6):$gameSystem['setAllowEventAutoMovement'](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x3f1),_0x4026c7=>{const _0x4efcc2=_0x17a6d5;VisuMZ[_0x4efcc2(0x5d7)](_0x4026c7,_0x4026c7);const _0x5a1934=$gameTemp[_0x4efcc2(0x25f)](),_0x48f485={'mapId':_0x4026c7[_0x4efcc2(0x1db)],'eventId':_0x4026c7[_0x4efcc2(0x5aa)]||_0x5a1934['eventId'](),'pageId':_0x4026c7[_0x4efcc2(0x38f)]};if(_0x48f485['mapId']<=0x0)_0x48f485[_0x4efcc2(0x461)]=$gameMap?$gameMap['mapId']():0x1;$gameTemp['getLastPluginCommandInterpreter']()[_0x4efcc2(0x41b)](_0x48f485);}),PluginManager['registerCommand'](pluginData[_0x17a6d5(0x303)],'DashEnableToggle',_0x474777=>{const _0x29a9c0=_0x17a6d5;VisuMZ[_0x29a9c0(0x5d7)](_0x474777,_0x474777);switch(_0x474777[_0x29a9c0(0x69b)]){case _0x29a9c0(0x5c0):$gameSystem[_0x29a9c0(0x4c8)](!![]);break;case _0x29a9c0(0x1c7):$gameSystem['setDashingEnabled'](![]);break;case _0x29a9c0(0x2b6):$gameSystem[_0x29a9c0(0x4c8)](!$gameSystem[_0x29a9c0(0x356)]());break;}}),PluginManager['registerCommand'](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x213),_0x3208c6=>{const _0x5d95e6=_0x17a6d5;VisuMZ[_0x5d95e6(0x5d7)](_0x3208c6,_0x3208c6);const _0x647f64=$gameTemp['getLastPluginCommandInterpreter']();_0x3208c6[_0x5d95e6(0x1db)]=_0x3208c6[_0x5d95e6(0x1db)]||$gameMap[_0x5d95e6(0x461)](),$gameSystem[_0x5d95e6(0x3ff)](_0x3208c6[_0x5d95e6(0x1db)],_0x3208c6['EventId']||_0x647f64[_0x5d95e6(0x1ab)](),_0x3208c6['IconIndex'],_0x3208c6['IconBufferX'],_0x3208c6[_0x5d95e6(0x18b)],_0x3208c6[_0x5d95e6(0x544)]);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x2ae),_0x1e862f=>{const _0x401b2b=_0x17a6d5;VisuMZ[_0x401b2b(0x5d7)](_0x1e862f,_0x1e862f);const _0x53afc1=$gameTemp[_0x401b2b(0x25f)]();_0x1e862f[_0x401b2b(0x1db)]=_0x1e862f[_0x401b2b(0x1db)]||$gameMap[_0x401b2b(0x461)](),$gameSystem[_0x401b2b(0x24b)](_0x1e862f['MapId'],_0x1e862f[_0x401b2b(0x5aa)]||_0x53afc1[_0x401b2b(0x1ab)]());}),PluginManager['registerCommand'](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x5dd),_0x5ced11=>{const _0x401252=_0x17a6d5;if($gameMap){if('UNyDp'==='UNyDp')for(const _0x2e3322 of $gameMap[_0x401252(0x687)]()){_0x2e3322[_0x401252(0x662)](),_0x2e3322['updateEventLabelText']();}else return this[_0x401252(0x4b6)](_0x59f4f4(_0x246868['$1']));}if(SceneManager[_0x401252(0x1d1)]()){if('VnRjr'===_0x401252(0x186)){const _0x3457b6=SceneManager['_scene'][_0x401252(0x3e0)];if(_0x3457b6)_0x3457b6[_0x401252(0x3ed)]();}else this[_0x401252(0x4bf)](_0xda0bc0);}}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],'EventLabelVisible',_0x213be7=>{const _0x2ca21c=_0x17a6d5;VisuMZ[_0x2ca21c(0x5d7)](_0x213be7,_0x213be7);switch(_0x213be7[_0x2ca21c(0x4ba)]){case _0x2ca21c(0x64f):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x2ca21c(0x33e):$gameSystem[_0x2ca21c(0x5db)](![]);break;case _0x2ca21c(0x2b6):$gameSystem[_0x2ca21c(0x5db)](!$gameSystem[_0x2ca21c(0x63f)]());break;}}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x5af),_0x4bea66=>{const _0x1b6d32=_0x17a6d5;VisuMZ[_0x1b6d32(0x5d7)](_0x4bea66,_0x4bea66);const _0x178d38=$gameTemp[_0x1b6d32(0x25f)]();if(!$gameMap)return;const _0x23febd=$gameMap[_0x1b6d32(0x49f)](_0x4bea66[_0x1b6d32(0x5aa)]||_0x178d38['eventId']());if(_0x23febd)_0x23febd[_0x1b6d32(0x675)]();}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],'EventLocationCreate',_0x3d5f18=>{const _0x29f570=_0x17a6d5;VisuMZ[_0x29f570(0x5d7)](_0x3d5f18,_0x3d5f18);const _0x53d64e=$gameTemp[_0x29f570(0x25f)](),_0x1cef17=_0x3d5f18[_0x29f570(0x1db)]||$gameMap[_0x29f570(0x461)](),_0xbcef34=_0x3d5f18['EventId']||_0x53d64e[_0x29f570(0x1ab)](),_0x13b08c=_0x3d5f18[_0x29f570(0x5b3)]||0x0,_0x5b42a6=_0x3d5f18[_0x29f570(0x4b9)]||0x0,_0x142e15=_0x3d5f18[_0x29f570(0x555)]||0x2,_0x11f69a=((_0x3d5f18[_0x29f570(0x38f)]||0x1)-0x1)['clamp'](0x0,0x13),_0x4b9e6a=_0x3d5f18[_0x29f570(0x2c7)]||0x0;$gameSystem[_0x29f570(0x1a1)](_0x1cef17,_0xbcef34,_0x13b08c,_0x5b42a6,_0x142e15,_0x11f69a,_0x4b9e6a);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],'EventLocationDelete',_0x2068c4=>{const _0x158087=_0x17a6d5;VisuMZ[_0x158087(0x5d7)](_0x2068c4,_0x2068c4);const _0x856439=$gameTemp[_0x158087(0x25f)](),_0x4ef9c7=_0x2068c4['MapId']||$gameMap[_0x158087(0x461)](),_0x31a7b9=_0x2068c4[_0x158087(0x5aa)]||_0x856439[_0x158087(0x1ab)]();$gameSystem[_0x158087(0x56a)](_0x4ef9c7,_0x31a7b9);}),PluginManager[_0x17a6d5(0x4aa)](pluginData['name'],_0x17a6d5(0x268),_0x5ca467=>{const _0x3c4c48=_0x17a6d5;VisuMZ['ConvertParams'](_0x5ca467,_0x5ca467);const _0x5ca1f0=_0x5ca467[_0x3c4c48(0x52f)];$gameTimer[_0x3c4c48(0x286)](_0x5ca1f0);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],'EventTimerExpireClear',_0x5ac29b=>{$gameTimer['setCommonEvent'](0x0);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],'EventTimerFramesGain',_0x2487a8=>{const _0xed7e74=_0x17a6d5;if(!$gameTimer[_0xed7e74(0x293)]())return;VisuMZ[_0xed7e74(0x5d7)](_0x2487a8,_0x2487a8);let _0x14f4dd=0x0;_0x14f4dd+=_0x2487a8[_0xed7e74(0x673)],_0x14f4dd+=_0x2487a8[_0xed7e74(0x175)]*0x3c,_0x14f4dd+=_0x2487a8[_0xed7e74(0x23f)]*0x3c*0x3c,_0x14f4dd+=_0x2487a8[_0xed7e74(0x685)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x14f4dd);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x572),_0x447985=>{const _0xd009f9=_0x17a6d5;if(!$gameTimer[_0xd009f9(0x293)]())return;VisuMZ['ConvertParams'](_0x447985,_0x447985);let _0x145855=0x0;_0x145855+=_0x447985[_0xd009f9(0x673)],_0x145855+=_0x447985[_0xd009f9(0x175)]*0x3c,_0x145855+=_0x447985['Minutes']*0x3c*0x3c,_0x145855+=_0x447985[_0xd009f9(0x685)]*0x3c*0x3c*0x3c,$gameTimer[_0xd009f9(0x4b1)](_0x145855);}),PluginManager[_0x17a6d5(0x4aa)](pluginData['name'],_0x17a6d5(0x680),_0xf20c1d=>{const _0x5ce8f9=_0x17a6d5;if(!$gameTimer['isWorking']())return;$gameTimer[_0x5ce8f9(0x2d8)]();}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x41a),_0x26eaeb=>{const _0x4f4412=_0x17a6d5;if(!$gameTimer[_0x4f4412(0x293)]())return;$gameTimer[_0x4f4412(0x28b)]();}),PluginManager['registerCommand'](pluginData['name'],_0x17a6d5(0x3d6),_0x10d550=>{const _0x2bd9a4=_0x17a6d5;VisuMZ[_0x2bd9a4(0x5d7)](_0x10d550,_0x10d550);const _0x25568c=_0x10d550[_0x2bd9a4(0x3bd)]||0x0;$gameTimer['changeSpeed'](_0x25568c);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],'FollowerSetGlobalChase',_0x1e264a=>{const _0x4c8a8f=_0x17a6d5;VisuMZ[_0x4c8a8f(0x5d7)](_0x1e264a,_0x1e264a);const _0x25ba61=!_0x1e264a['Chase'];$gameSystem[_0x4c8a8f(0x2bb)](_0x25ba61);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x4fd),_0x281629=>{const _0x1ca746=_0x17a6d5;VisuMZ[_0x1ca746(0x5d7)](_0x281629,_0x281629);const _0xb61a69=(_0x281629['FollowerID']||0x0)-0x1,_0x27720c=!_0x281629[_0x1ca746(0x2e2)],_0x1bc9f2=$gamePlayer[_0x1ca746(0x476)]()['follower'](_0xb61a69);if(_0x1bc9f2)_0x1bc9f2[_0x1ca746(0x20d)](_0x27720c);}),PluginManager[_0x17a6d5(0x4aa)](pluginData['name'],_0x17a6d5(0x218),_0x1cf529=>{const _0x5c5c67=_0x17a6d5;VisuMZ[_0x5c5c67(0x5d7)](_0x1cf529,_0x1cf529);const _0x419095=_0x1cf529[_0x5c5c67(0x34e)];$gameSystem[_0x5c5c67(0x39b)](_0x419095);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x642),_0x11770a=>{const _0x1e9c12=_0x17a6d5;VisuMZ[_0x1e9c12(0x5d7)](_0x11770a,_0x11770a),$gameSystem[_0x1e9c12(0x39b)](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0x35b643 of $gamePlayer[_0x1e9c12(0x476)]()[_0x1e9c12(0x493)]){if(_0x35b643)_0x35b643[_0x1e9c12(0x20d)](![]);}}),PluginManager['registerCommand'](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x5ae),_0x87ab6b=>{const _0x707d00=_0x17a6d5;VisuMZ['ConvertParams'](_0x87ab6b,_0x87ab6b);const _0x19bd90=$gameTemp[_0x707d00(0x25f)]();_0x87ab6b[_0x707d00(0x1db)]=_0x87ab6b['MapId']||$gameMap['mapId']();const _0x39d5c4=[_0x87ab6b[_0x707d00(0x1db)],_0x87ab6b[_0x707d00(0x5aa)]||_0x19bd90[_0x707d00(0x1ab)](),_0x87ab6b[_0x707d00(0x57a)]],_0xae38c9=_0x87ab6b['TargetSwitchId'],_0x5f0625=$gameSelfSwitches[_0x707d00(0x347)](_0x39d5c4)||![];$gameSwitches[_0x707d00(0x17c)](_0xae38c9,_0x5f0625);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x21a),_0x2c890f=>{const _0x4bbb62=_0x17a6d5;VisuMZ[_0x4bbb62(0x5d7)](_0x2c890f,_0x2c890f);const _0x27f80d=$gameTemp[_0x4bbb62(0x25f)]();_0x2c890f[_0x4bbb62(0x1db)]=_0x2c890f['MapId']||$gameMap[_0x4bbb62(0x461)]();const _0x46d7de=[_0x2c890f[_0x4bbb62(0x1db)],_0x2c890f[_0x4bbb62(0x5aa)]||_0x27f80d['eventId'](),_0x4bbb62(0x36e)[_0x4bbb62(0x333)](_0x2c890f[_0x4bbb62(0x364)])],_0x5cc3a7=_0x2c890f[_0x4bbb62(0x337)],_0x191d68=$gameSelfSwitches[_0x4bbb62(0x347)](_0x46d7de)||![];$gameSwitches['setValue'](_0x5cc3a7,_0x191d68);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x256),_0x4f5b73=>{const _0x5d176e=_0x17a6d5;VisuMZ[_0x5d176e(0x5d7)](_0x4f5b73,_0x4f5b73);const _0x54bef3=$gameTemp[_0x5d176e(0x25f)]();_0x4f5b73['MapId']=_0x4f5b73[_0x5d176e(0x1db)]||$gameMap['mapId']();const _0x5e3b8b=[_0x4f5b73[_0x5d176e(0x1db)],_0x4f5b73[_0x5d176e(0x5aa)]||_0x54bef3[_0x5d176e(0x1ab)](),_0x5d176e(0x24f)[_0x5d176e(0x333)](_0x4f5b73[_0x5d176e(0x18d)])],_0x26e50b=_0x4f5b73['TargetVariableId'],_0x36f674=$gameSelfSwitches[_0x5d176e(0x347)](_0x5e3b8b)||![];$gameVariables[_0x5d176e(0x17c)](_0x26e50b,_0x36f674);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x202),_0xeee32=>{const _0x36840c=_0x17a6d5;VisuMZ[_0x36840c(0x5d7)](_0xeee32,_0xeee32);if(!$gameMap)return;const _0x4128c0=$gameTemp[_0x36840c(0x25f)](),_0x1463be=_0xeee32[_0x36840c(0x5a4)];_0xeee32[_0x36840c(0x3fc)]=_0xeee32[_0x36840c(0x3fc)]||$gameMap[_0x36840c(0x461)](),_0xeee32['Step2MapId']=_0xeee32['Step2MapId']||$gameMap[_0x36840c(0x461)](),_0xeee32[_0x36840c(0x4d0)]=_0xeee32['TemplateName'][_0x36840c(0x43c)]()[_0x36840c(0x520)]();if(!_0x1463be&&_0xeee32['Step1MapId']!==$gameMap[_0x36840c(0x461)]())return;if($gameMap[_0x36840c(0x461)]()===_0xeee32[_0x36840c(0x3fc)]){const _0x3f0250=$gameMap['event'](_0xeee32['Step1EventId']||_0x4128c0[_0x36840c(0x1ab)]());if(!_0x3f0250)return;_0xeee32[_0x36840c(0x4d0)]!==_0x36840c(0x500)?_0x36840c(0x5ca)!==_0x36840c(0x545)?_0x3f0250['morphIntoTemplate'](_0xeee32[_0x36840c(0x4d0)]):_0xadc555['EventsMoveCore'][_0x36840c(0x492)][_0x36840c(0x496)](this,_0x473fb6,_0x58e5bb):_0x36840c(0x46c)==='mLAOC'?this[_0x36840c(0x297)]():_0x3f0250[_0x36840c(0x5a7)](_0xeee32[_0x36840c(0x43f)],_0xeee32[_0x36840c(0x338)]||_0x4128c0[_0x36840c(0x1ab)]());}_0x1463be&&$gameSystem['savePreservedMorphEventDataKey'](_0xeee32['Step1MapId'],_0xeee32[_0x36840c(0x57b)],_0xeee32['TemplateName'],_0xeee32[_0x36840c(0x43f)],_0xeee32['Step2EventId']);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x29f),_0x322d3c=>{const _0x204a23=_0x17a6d5;VisuMZ[_0x204a23(0x5d7)](_0x322d3c,_0x322d3c);if(!$gameMap)return;const _0x5e7882=$gameTemp[_0x204a23(0x25f)]();_0x322d3c[_0x204a23(0x1db)]=_0x322d3c[_0x204a23(0x1db)]||$gameMap[_0x204a23(0x461)]();if($gameMap['mapId']()===_0x322d3c[_0x204a23(0x1db)]){const _0x3856d8=$gameMap[_0x204a23(0x49f)](_0x322d3c[_0x204a23(0x5aa)]||_0x5e7882[_0x204a23(0x1ab)]());_0x3856d8['removeMorph']();}_0x322d3c[_0x204a23(0x4f1)]&&(_0x204a23(0x2d7)==='VILto'?this[_0x204a23(0x2ff)]=!![]:$gameSystem[_0x204a23(0x16b)](_0x322d3c[_0x204a23(0x1db)],_0x322d3c[_0x204a23(0x5aa)]||_0x5e7882['eventId']()));}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],'PlayerIconChange',_0x27332b=>{const _0x4400b2=_0x17a6d5;VisuMZ[_0x4400b2(0x5d7)](_0x27332b,_0x27332b),$gameSystem[_0x4400b2(0x21d)]($gamePlayer,_0x27332b[_0x4400b2(0x4d9)],_0x27332b[_0x4400b2(0x456)],_0x27332b['IconBufferY'],_0x27332b['IconBlendMode']);}),PluginManager[_0x17a6d5(0x4aa)](pluginData['name'],_0x17a6d5(0x1bf),_0xb7089=>{const _0x4eab87=_0x17a6d5;VisuMZ[_0x4eab87(0x5d7)](_0xb7089,_0xb7089),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x638),_0xd82796=>{const _0x2c8d79=_0x17a6d5;VisuMZ[_0x2c8d79(0x5d7)](_0xd82796,_0xd82796),$gameSystem['setPlayerControlDisable'](!_0xd82796[_0x2c8d79(0x5c0)]);}),PluginManager['registerCommand'](pluginData[_0x17a6d5(0x303)],'PlayerMovementDiagonal',_0x256367=>{const _0xc5fb04=_0x17a6d5;VisuMZ[_0xc5fb04(0x5d7)](_0x256367,_0x256367),$gameSystem[_0xc5fb04(0x664)](_0x256367['Setting']);}),PluginManager['registerCommand'](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x4cb),_0x5c3019=>{const _0x20f33b=_0x17a6d5;VisuMZ['ConvertParams'](_0x5c3019,_0x5c3019);const _0x373357=_0x5c3019[_0x20f33b(0x1db)]||$gameMap['mapId']();$gameSelfSwitches[_0x20f33b(0x2cf)](_0x373357);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x696),_0x3c44af=>{const _0x1c6eee=_0x17a6d5;VisuMZ['ConvertParams'](_0x3c44af,_0x3c44af);const _0x241630=$gameTemp[_0x1c6eee(0x25f)]();_0x3c44af[_0x1c6eee(0x1db)]=_0x3c44af[_0x1c6eee(0x1db)]||$gameMap['mapId']();const _0x3179e2=[_0x3c44af['MapId'],_0x3c44af[_0x1c6eee(0x5aa)]||_0x241630['eventId'](),_0x3c44af[_0x1c6eee(0x57a)]];switch(_0x3c44af['Value']){case'ON':$gameSelfSwitches[_0x1c6eee(0x17c)](_0x3179e2,!![]);break;case'OFF':$gameSelfSwitches[_0x1c6eee(0x17c)](_0x3179e2,![]);break;case _0x1c6eee(0x2b6):$gameSelfSwitches['setValue'](_0x3179e2,!$gameSelfSwitches[_0x1c6eee(0x347)](_0x3179e2));break;}}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x36f),_0x3a519e=>{const _0x153193=_0x17a6d5;VisuMZ[_0x153193(0x5d7)](_0x3a519e,_0x3a519e);const _0x969b4b=$gameTemp['getLastPluginCommandInterpreter']();_0x3a519e[_0x153193(0x1db)]=_0x3a519e[_0x153193(0x1db)]||$gameMap['mapId']();const _0x5b26c2=[_0x3a519e[_0x153193(0x1db)],_0x3a519e[_0x153193(0x5aa)]||_0x969b4b[_0x153193(0x1ab)](),'Self\x20Switch\x20%1'['format'](_0x3a519e[_0x153193(0x364)])];switch(_0x3a519e[_0x153193(0x69b)]){case'ON':$gameSelfSwitches[_0x153193(0x17c)](_0x5b26c2,!![]);break;case _0x153193(0x228):$gameSelfSwitches[_0x153193(0x17c)](_0x5b26c2,![]);break;case _0x153193(0x2b6):$gameSelfSwitches[_0x153193(0x17c)](_0x5b26c2,!$gameSelfSwitches['value'](_0x5b26c2));break;}}),PluginManager[_0x17a6d5(0x4aa)](pluginData['name'],_0x17a6d5(0x2f4),_0x820053=>{const _0x420ab9=_0x17a6d5;VisuMZ['ConvertParams'](_0x820053,_0x820053);const _0x2a9bc6=$gameTemp[_0x420ab9(0x25f)]();_0x820053[_0x420ab9(0x1db)]=_0x820053[_0x420ab9(0x1db)]||$gameMap[_0x420ab9(0x461)]();const _0x303122=[_0x820053[_0x420ab9(0x1db)],_0x820053[_0x420ab9(0x5aa)]||_0x2a9bc6[_0x420ab9(0x1ab)](),_0x420ab9(0x24f)[_0x420ab9(0x333)](_0x820053[_0x420ab9(0x18d)])],_0x18340f=VisuMZ[_0x420ab9(0x63d)]($gameSelfSwitches['value'](_0x303122),_0x820053[_0x420ab9(0x69b)],_0x820053[_0x420ab9(0x67b)]);$gameSelfSwitches[_0x420ab9(0x17c)](_0x303122,_0x18340f);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x558),_0x574c4c=>{const _0x120fbb=_0x17a6d5;VisuMZ['ConvertParams'](_0x574c4c,_0x574c4c);const _0x52280e=$gameTemp[_0x120fbb(0x25f)](),_0x59434a={'template':_0x574c4c['TemplateName'],'mapId':_0x574c4c['MapId']||$gameMap[_0x120fbb(0x461)](),'eventId':_0x574c4c[_0x120fbb(0x5aa)]||_0x52280e[_0x120fbb(0x1ab)](),'x':_0x574c4c['PosX'],'y':_0x574c4c['PosY'],'spawnPreserved':_0x574c4c[_0x120fbb(0x65c)],'spawnEventId':$gameMap['_spawnedEvents'][_0x120fbb(0x304)]+0x3e8},_0x17f00b=_0x574c4c[_0x120fbb(0x69e)]||0x0;if(!VisuMZ[_0x120fbb(0x585)][_0x59434a[_0x120fbb(0x461)]]&&_0x59434a['mapId']!==$gameMap[_0x120fbb(0x461)]()){let _0x32cdba=_0x120fbb(0x462)[_0x120fbb(0x333)](_0x59434a[_0x120fbb(0x461)]);_0x32cdba+=_0x120fbb(0x32d),_0x32cdba+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x32cdba+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x32cdba+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x120fbb(0x333)](_0x59434a[_0x120fbb(0x461)]),alert(_0x32cdba);return;}const _0x44f558=$gameMap[_0x120fbb(0x4d4)](_0x59434a,_0x574c4c['Collision'],_0x574c4c[_0x120fbb(0x2f9)]);_0x17f00b&&$gameSwitches[_0x120fbb(0x17c)](_0x17f00b,!!_0x44f558);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x26a),_0x82a2f2=>{const _0x531a05=_0x17a6d5;VisuMZ[_0x531a05(0x5d7)](_0x82a2f2,_0x82a2f2);const _0x190024=$gameTemp[_0x531a05(0x25f)](),_0x183fa5={'template':_0x82a2f2['TemplateName'],'mapId':_0x82a2f2['MapId']||$gameMap['mapId'](),'eventId':_0x82a2f2['EventId']||_0x190024[_0x531a05(0x1ab)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x82a2f2[_0x531a05(0x65c)],'spawnEventId':$gameMap[_0x531a05(0x237)]['length']+0x3e8},_0x3b5268=_0x82a2f2['SuccessSwitchId']||0x0;if(!VisuMZ[_0x531a05(0x585)][_0x183fa5[_0x531a05(0x461)]]&&_0x183fa5[_0x531a05(0x461)]!==$gameMap[_0x531a05(0x461)]()){let _0x552aac='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'['format'](_0x183fa5['mapId']);_0x552aac+=_0x531a05(0x32d),_0x552aac+=_0x531a05(0x516),_0x552aac+=_0x531a05(0x1ec),_0x552aac+=_0x531a05(0x3c1)[_0x531a05(0x333)](_0x183fa5[_0x531a05(0x461)]),alert(_0x552aac);return;}const _0x211a4f=$gameMap[_0x531a05(0x4cc)](_0x183fa5,_0x82a2f2[_0x531a05(0x1c2)],_0x82a2f2[_0x531a05(0x660)],_0x82a2f2[_0x531a05(0x2f9)]);_0x3b5268&&$gameSwitches['setValue'](_0x3b5268,!!_0x211a4f);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x43b),_0x34a719=>{const _0x24c7d7=_0x17a6d5;VisuMZ[_0x24c7d7(0x5d7)](_0x34a719,_0x34a719);const _0xa804d9=$gameTemp[_0x24c7d7(0x25f)](),_0x29323f={'template':_0x34a719[_0x24c7d7(0x4d0)],'mapId':_0x34a719[_0x24c7d7(0x1db)]||$gameMap['mapId'](),'eventId':_0x34a719['EventId']||_0xa804d9['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x34a719[_0x24c7d7(0x65c)],'spawnEventId':$gameMap[_0x24c7d7(0x237)][_0x24c7d7(0x304)]+0x3e8},_0x573691=_0x34a719[_0x24c7d7(0x69e)]||0x0;if(!VisuMZ[_0x24c7d7(0x585)][_0x29323f['mapId']]&&_0x29323f[_0x24c7d7(0x461)]!==$gameMap['mapId']()){let _0x5f13a9=_0x24c7d7(0x462)[_0x24c7d7(0x333)](_0x29323f[_0x24c7d7(0x461)]);_0x5f13a9+=_0x24c7d7(0x32d),_0x5f13a9+=_0x24c7d7(0x516),_0x5f13a9+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x5f13a9+=_0x24c7d7(0x3c1)[_0x24c7d7(0x333)](_0x29323f['mapId']),alert(_0x5f13a9);return;}const _0x243808=$gameMap['prepareSpawnedEventAtTerrainTag'](_0x29323f,_0x34a719[_0x24c7d7(0x3ba)],_0x34a719['Collision'],_0x34a719[_0x24c7d7(0x2f9)]);if(_0x573691){if(_0x24c7d7(0x35b)!=='nwwzJ')return _0x38822c[_0x24c7d7(0x49f)](this['_eventId'])&&_0x2b62b9[_0x24c7d7(0x480)][_0x24c7d7(0x1bb)][_0x24c7d7(0x571)](_0x1399c7[_0x24c7d7(0x401)],this[_0x24c7d7(0x25a)]);else $gameSwitches['setValue'](_0x573691,!!_0x243808);}}),PluginManager['registerCommand'](pluginData['name'],'SpawnEventDespawnEventID',_0x87e3b=>{const _0x18a628=_0x17a6d5;VisuMZ[_0x18a628(0x5d7)](_0x87e3b,_0x87e3b);const _0x460fa6=$gameTemp[_0x18a628(0x25f)]();$gameMap[_0x18a628(0x517)](_0x87e3b[_0x18a628(0x45b)]||_0x460fa6[_0x18a628(0x1ab)]());}),PluginManager[_0x17a6d5(0x4aa)](pluginData['name'],'SpawnEventDespawnAtXY',_0xdf54ee=>{const _0x25c98a=_0x17a6d5;VisuMZ[_0x25c98a(0x5d7)](_0xdf54ee,_0xdf54ee);const _0x2aaa18=_0xdf54ee[_0x25c98a(0x5b3)],_0x2236b3=_0xdf54ee[_0x25c98a(0x4b9)];$gameMap[_0x25c98a(0x4ab)](_0x2aaa18,_0x2236b3);}),PluginManager['registerCommand'](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x52a),_0x5ccf73=>{const _0x571329=_0x17a6d5;VisuMZ['ConvertParams'](_0x5ccf73,_0x5ccf73),$gameMap[_0x571329(0x369)](_0x5ccf73[_0x571329(0x1c2)]);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],'SpawnEventDespawnTerrainTags',_0x503d78=>{const _0x8ee115=_0x17a6d5;VisuMZ['ConvertParams'](_0x503d78,_0x503d78),$gameMap[_0x8ee115(0x671)](_0x503d78['TerrainTags']);}),PluginManager[_0x17a6d5(0x4aa)](pluginData[_0x17a6d5(0x303)],_0x17a6d5(0x1eb),_0x2d8118=>{const _0x4f7bbf=_0x17a6d5;VisuMZ[_0x4f7bbf(0x5d7)](_0x2d8118,_0x2d8118),$gameMap[_0x4f7bbf(0x183)]();}),VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x2c6)]=Scene_Boot[_0x17a6d5(0x2f0)]['onDatabaseLoaded'],Scene_Boot[_0x17a6d5(0x2f0)][_0x17a6d5(0x362)]=function(){const _0x5b3c2a=_0x17a6d5;VisuMZ[_0x5b3c2a(0x480)][_0x5b3c2a(0x2c6)]['call'](this),this[_0x5b3c2a(0x3ae)](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ[_0x5b3c2a(0x480)][_0x5b3c2a(0x1bb)])VisuMZ[_0x5b3c2a(0x480)][_0x5b3c2a(0x1bb)]['initialize']();},VisuMZ[_0x17a6d5(0x585)]=[],VisuMZ['EventTemplates']={},Scene_Boot[_0x17a6d5(0x2f0)][_0x17a6d5(0x3ae)]=function(){const _0x313c0e=_0x17a6d5;if(DataManager[_0x313c0e(0x30c)]()||DataManager['isEventTest']())return;const _0x213a26=VisuMZ[_0x313c0e(0x480)]['Settings'][_0x313c0e(0x391)],_0x278f98=_0x213a26[_0x313c0e(0x26c)]['slice'](0x0);for(const _0x221b5f of _0x213a26[_0x313c0e(0x507)]){if(_0x313c0e(0x54f)==='YEGNB'){const _0x4ad56e=this[_0x313c0e(0x506)](_0x209879,_0x178768,!![]);if(_0x4ad56e)this[_0x313c0e(0x482)](_0x4ad56e);}else{_0x221b5f[_0x313c0e(0x53a)]=_0x221b5f['Name'][_0x313c0e(0x43c)]()[_0x313c0e(0x520)](),VisuMZ[_0x313c0e(0x31b)][_0x221b5f[_0x313c0e(0x53a)]]=_0x221b5f;if(!_0x278f98[_0x313c0e(0x64c)](_0x221b5f[_0x313c0e(0x4fe)]))_0x278f98['push'](_0x221b5f['MapID']);}}for(const _0x534078 of _0x278f98){if(VisuMZ['PreloadedMaps'][_0x534078])continue;const _0x3af3a4='Map%1.json'[_0x313c0e(0x333)](_0x534078[_0x313c0e(0x5de)](0x3)),_0x4ac099=_0x313c0e(0x1f7)[_0x313c0e(0x333)](_0x534078);DataManager['loadDataFile'](_0x4ac099,_0x3af3a4),setTimeout(this[_0x313c0e(0x610)]['bind'](this,_0x534078,_0x4ac099),0x64);}},Scene_Boot[_0x17a6d5(0x2f0)][_0x17a6d5(0x610)]=function(_0x4711e7,_0x34cf25){const _0x367393=_0x17a6d5;window[_0x34cf25]?(VisuMZ[_0x367393(0x585)][_0x4711e7]=window[_0x34cf25],window[_0x34cf25]=undefined):'thjrw'!==_0x367393(0x233)?_0x221b1f=[-_0x53a3f4[_0x367393(0x4b8)],0x0,_0x1a2144[_0x367393(0x4b8)]][this['_character'][_0x367393(0x2ad)]()]:setTimeout(this[_0x367393(0x610)]['bind'](this,_0x4711e7,_0x34cf25),0x64);},VisuMZ[_0x17a6d5(0x603)]=[],VisuMZ['SelfSwitches']=[],VisuMZ[_0x17a6d5(0x447)]=[],VisuMZ[_0x17a6d5(0x60a)]=[],VisuMZ[_0x17a6d5(0x3fd)]=[],VisuMZ[_0x17a6d5(0x53b)]=[],Scene_Boot[_0x17a6d5(0x2f0)][_0x17a6d5(0x62c)]=function(){const _0x21d403=_0x17a6d5;for(let _0x4ec5ae=0x1;_0x4ec5ae<$dataSystem[_0x21d403(0x395)][_0x21d403(0x304)];_0x4ec5ae++){if($dataSystem[_0x21d403(0x395)][_0x4ec5ae]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x21d403(0x603)]['push'](_0x4ec5ae);if($dataSystem[_0x21d403(0x395)][_0x4ec5ae][_0x21d403(0x5d0)](/<SELF>/i))VisuMZ[_0x21d403(0x560)][_0x21d403(0x16c)](_0x4ec5ae);if($dataSystem[_0x21d403(0x395)][_0x4ec5ae][_0x21d403(0x5d0)](/<MAP>/i))VisuMZ[_0x21d403(0x447)][_0x21d403(0x16c)](_0x4ec5ae);}for(let _0x27c466=0x1;_0x27c466<$dataSystem[_0x21d403(0x40f)][_0x21d403(0x304)];_0x27c466++){if($dataSystem[_0x21d403(0x40f)][_0x27c466][_0x21d403(0x5d0)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables'][_0x21d403(0x16c)](_0x27c466);if($dataSystem['variables'][_0x27c466][_0x21d403(0x5d0)](/<SELF>/i))VisuMZ[_0x21d403(0x3fd)][_0x21d403(0x16c)](_0x27c466);if($dataSystem[_0x21d403(0x40f)][_0x27c466][_0x21d403(0x5d0)](/<MAP>/i))VisuMZ[_0x21d403(0x53b)][_0x21d403(0x16c)](_0x27c466);}},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1bb)]={},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1bb)][_0x17a6d5(0x467)]=function(){const _0x1a143f=_0x17a6d5;this[_0x1a143f(0x3b9)]=new Game_CPCInterpreter(),this['determineCommonEventsWithCPC']();},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1bb)][_0x17a6d5(0x670)]=function(){const _0xc93565=_0x17a6d5;this['_commonEvents']=[];for(const _0xb96e67 of $dataCommonEvents){if(!_0xb96e67)continue;VisuMZ[_0xc93565(0x480)]['CustomPageConditions'][_0xc93565(0x219)](_0xb96e67);if(_0xb96e67[_0xc93565(0x401)][_0xc93565(0x304)]>0x0)this[_0xc93565(0x63c)][_0xc93565(0x16c)](_0xb96e67['id']);}},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1bb)][_0x17a6d5(0x571)]=function(_0xe22b92,_0x5143ba,_0x4efdbd){const _0x126354=_0x17a6d5;this[_0x126354(0x3b9)][_0x126354(0x220)](_0xe22b92,_0x5143ba);if(_0x4efdbd)_0x126354(0x321)!=='wQuyr'?(this[_0x126354(0x54d)]=this[_0x126354(0x54d)]||0x0,this['_frames']+=_0x3bceb1,this[_0x126354(0x449)]=!![],this[_0x126354(0x54d)]=_0x4c111e[_0x126354(0x533)](0x1,this['_frames'])):this[_0x126354(0x3b9)][_0x126354(0x282)](_0x4efdbd);else{if(_0x126354(0x3bc)===_0x126354(0x3bc))this[_0x126354(0x3b9)][_0x126354(0x407)]();else{if(_0x2cf99f)_0x5273fa[_0x126354(0x17d)]=![];this[_0x126354(0x482)](_0x311045),this[_0x126354(0x47c)]-=0x1;}}return this[_0x126354(0x3b9)]['_cpc'];},VisuMZ['EventsMoveCore'][_0x17a6d5(0x1bb)][_0x17a6d5(0x219)]=function(_0x2269bb){const _0x37ef71=_0x17a6d5;let _0x29a39c=![];_0x2269bb[_0x37ef71(0x401)]=[];for(const _0x1032f0 of _0x2269bb[_0x37ef71(0x1e2)]){if(_0x37ef71(0x412)!==_0x37ef71(0x27c)){if([0x6c,0x198][_0x37ef71(0x64c)](_0x1032f0[_0x37ef71(0x17f)])){const _0x367495=_0x1032f0[_0x37ef71(0x16e)][0x0];if(_0x367495[_0x37ef71(0x5d0)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x29a39c=!![];else{if(_0x367495[_0x37ef71(0x5d0)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x37ef71(0x541)===_0x37ef71(0x541))_0x29a39c=![];else{const _0x49e931=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x37ef71(0x50c)]()];return _0x33e098[_0x37ef71(0x400)](this['x'],_0x49e931);}}}}_0x29a39c&&(_0x37ef71(0x3fa)==='uuDky'?this[_0x37ef71(0x375)][_0x37ef71(0x5a0)]=_0x220e4d(_0x1eb901['$1']):_0x2269bb[_0x37ef71(0x401)]['push'](_0x1032f0));}else _0x3010a5[_0x37ef71(0x662)](),_0x51d0a6['updateEventLabelText']();}},getSelfSwitchValue=function(_0x6710b,_0x274c63,_0x13e314){const _0x55f691=_0x17a6d5;let _0x11d679=[_0x6710b,_0x274c63,_0x55f691(0x36e)[_0x55f691(0x333)](_0x13e314)];if(typeof _0x13e314===_0x55f691(0x618)){if(_0x55f691(0x261)===_0x55f691(0x654)){_0x4460a5=_0x18a560(_0x4071de['$1']),_0x45cf58=_0x456952(_0x9103c4['$2']);if(_0x554d92===0x0)_0x2f8a1c=_0x1784c0[_0x55f691(0x461)]();}else _0x11d679=[_0x6710b,_0x274c63,_0x13e314[_0x55f691(0x43c)]()[_0x55f691(0x520)]()];}return $gameSelfSwitches['value'](_0x11d679);},getMapSwitchValue=function(_0x2d0f37,_0x4d54f3){const _0x9449e7=_0x17a6d5;let _0x3cb3cc=[0x0,0x0,_0x9449e7(0x552)[_0x9449e7(0x333)](_0x2d0f37,_0x4d54f3)];return $gameSelfSwitches['value'](_0x3cb3cc);},getMapVariableValue=function(_0x5c8eed,_0x3df75d){const _0x1b37a2=_0x17a6d5;let _0x44b1ab=[0x0,0x0,_0x1b37a2(0x32f)[_0x1b37a2(0x333)](_0x5c8eed,_0x3df75d)];return $gameSelfSwitches['value'](_0x44b1ab);},getSelfVariableValue=function(_0x22e393,_0x3616a,_0x57a5d4){const _0x20e99b=_0x17a6d5,_0x52f7ed=[_0x22e393,_0x3616a,_0x20e99b(0x24f)[_0x20e99b(0x333)](_0x57a5d4)];return $gameSelfSwitches[_0x20e99b(0x347)](_0x52f7ed);},setSelfSwitchValue=function(_0x225ec4,_0x1fc459,_0x58c268,_0x2aa4c1){const _0x30fc39=_0x17a6d5;let _0x3bc380=[_0x225ec4,_0x1fc459,'Self\x20Switch\x20%1'['format'](_0x58c268)];typeof _0x58c268==='string'&&(_0x3bc380=[_0x225ec4,_0x1fc459,_0x58c268[_0x30fc39(0x43c)]()[_0x30fc39(0x520)]()]),$gameSelfSwitches[_0x30fc39(0x17c)](_0x3bc380,_0x2aa4c1);},setSelfVariableValue=function(_0x5a7d92,_0x4a76f7,_0x4254a4,_0x43e0cc){const _0x3a6ecc=_0x17a6d5,_0x28eb68=[_0x5a7d92,_0x4a76f7,_0x3a6ecc(0x24f)[_0x3a6ecc(0x333)](_0x4254a4)];$gameSelfSwitches[_0x3a6ecc(0x17c)](_0x28eb68,_0x43e0cc);},setMapSwitchValue=function(_0x235714,_0x2c3362,_0x1865bd){const _0x22fec6=_0x17a6d5;let _0x5b7dcd=[0x0,0x0,_0x22fec6(0x552)[_0x22fec6(0x333)](_0x235714,_0x2c3362)];$gameSelfSwitches[_0x22fec6(0x17c)](_0x5b7dcd,_0x1865bd);},setMapVariableValue=function(_0x1806b2,_0x342254,_0x2ba5dc){const _0x44a5ec=_0x17a6d5;let _0x5eccb5=[0x0,0x0,_0x44a5ec(0x32f)[_0x44a5ec(0x333)](_0x1806b2,_0x342254)];$gameSelfSwitches[_0x44a5ec(0x17c)](_0x5eccb5,_0x2ba5dc);},DataManager[_0x17a6d5(0x5f3)]=function(_0x185d48){const _0xa03836=_0x17a6d5;if(SceneManager[_0xa03836(0x669)][_0xa03836(0x39f)]===Scene_Debug)return![];return VisuMZ[_0xa03836(0x603)][_0xa03836(0x64c)](_0x185d48);},DataManager['isAdvancedVariable']=function(_0x57c77d){const _0x2463b7=_0x17a6d5;if(SceneManager['_scene'][_0x2463b7(0x39f)]===Scene_Debug)return![];return VisuMZ[_0x2463b7(0x60a)][_0x2463b7(0x64c)](_0x57c77d);},DataManager[_0x17a6d5(0x4f5)]=function(_0x261a32){const _0x560b76=_0x17a6d5;if(SceneManager[_0x560b76(0x669)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x560b76(0x560)]['includes'](_0x261a32);},DataManager[_0x17a6d5(0x1b4)]=function(_0x39f5e1){const _0x74e448=_0x17a6d5;if(SceneManager[_0x74e448(0x669)][_0x74e448(0x39f)]===Scene_Debug)return![];return VisuMZ['SelfVariables'][_0x74e448(0x64c)](_0x39f5e1);},DataManager[_0x17a6d5(0x5ff)]=function(_0x1a93e6){const _0xb670c4=_0x17a6d5;if(BattleManager[_0xb670c4(0x30c)]())return![];return VisuMZ[_0xb670c4(0x447)][_0xb670c4(0x64c)](_0x1a93e6);},DataManager[_0x17a6d5(0x26f)]=function(_0x36a359){const _0x3f8e1c=_0x17a6d5;if(BattleManager[_0x3f8e1c(0x30c)]())return![];return VisuMZ['MapVariables'][_0x3f8e1c(0x64c)](_0x36a359);},SceneManager[_0x17a6d5(0x1d1)]=function(){const _0x5e4563=_0x17a6d5;return this[_0x5e4563(0x669)]&&this[_0x5e4563(0x669)][_0x5e4563(0x39f)]===Scene_Map;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1a3)]=Game_Temp['prototype'][_0x17a6d5(0x3a6)],Game_Temp['prototype'][_0x17a6d5(0x3a6)]=function(_0x3f301f,_0x133274){const _0xe4720f=_0x17a6d5;if(this['isEventClickTriggered'](_0x3f301f,_0x133274))return;VisuMZ['EventsMoveCore'][_0xe4720f(0x1a3)]['call'](this,_0x3f301f,_0x133274);},Game_Temp[_0x17a6d5(0x2f0)][_0x17a6d5(0x641)]=function(_0x25db55,_0x213d38){const _0x249abc=_0x17a6d5,_0x29949b=$gameMap[_0x249abc(0x2d2)](_0x25db55,_0x213d38);for(const _0xacc018 of _0x29949b){if(_0xacc018&&_0xacc018['hasClickTrigger']())return _0xacc018[_0x249abc(0x376)](),!![];}return TouchInput[_0x249abc(0x27f)]()&&_0x29949b[_0x249abc(0x304)]>0x0&&TouchInput[_0x249abc(0x634)](),![];},Game_Temp[_0x17a6d5(0x2f0)]['setLastPluginCommandInterpreter']=function(_0xd5d832){const _0x23aa2c=_0x17a6d5;this[_0x23aa2c(0x53c)]=_0xd5d832;},Game_Temp[_0x17a6d5(0x2f0)][_0x17a6d5(0x25f)]=function(){const _0x8d01d9=_0x17a6d5;return this[_0x8d01d9(0x53c)];},Game_Temp[_0x17a6d5(0x2f0)][_0x17a6d5(0x301)]=function(_0x386d3e){const _0x4b9d13=_0x17a6d5;this[_0x4b9d13(0x276)]=_0x386d3e;},Game_Temp[_0x17a6d5(0x2f0)]['clearSelfTarget']=function(){const _0x4ed7c7=_0x17a6d5;this[_0x4ed7c7(0x276)]=undefined;},Game_Temp[_0x17a6d5(0x2f0)][_0x17a6d5(0x3c5)]=function(){const _0x39f50c=_0x17a6d5;return this[_0x39f50c(0x276)];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1f5)]=Game_System[_0x17a6d5(0x2f0)]['initialize'],Game_System[_0x17a6d5(0x2f0)]['initialize']=function(){const _0x498da7=_0x17a6d5;VisuMZ[_0x498da7(0x480)][_0x498da7(0x1f5)][_0x498da7(0x496)](this),this[_0x498da7(0x4a0)](),this['initFollowerController']();},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x4a0)]=function(){const _0xe785c2=_0x17a6d5;this[_0xe785c2(0x357)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0xe785c2(0x442)]=[],this['_PreservedEventMorphData']={},this[_0xe785c2(0x608)]={},this['_DisablePlayerControl']=![],this['_PlayerDiagonalSetting']=_0xe785c2(0x615);},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x356)]=function(){const _0x588e82=_0x17a6d5;if(this[_0x588e82(0x357)]===undefined)this['initEventsMoveCore']();if(this[_0x588e82(0x357)][_0x588e82(0x2c9)]===undefined)this[_0x588e82(0x4a0)]();return this[_0x588e82(0x357)][_0x588e82(0x2c9)];},Game_System['prototype'][_0x17a6d5(0x4c8)]=function(_0x2a80f1){const _0xb9dac0=_0x17a6d5;if(this[_0xb9dac0(0x357)]===undefined)this[_0xb9dac0(0x4a0)]();if(this[_0xb9dac0(0x357)]['DashingEnable']===undefined)this[_0xb9dac0(0x4a0)]();this['_EventsMoveCoreSettings'][_0xb9dac0(0x2c9)]=_0x2a80f1;},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x58a)]=function(){const _0x2e33e9=_0x17a6d5;if(this['_EventsMoveCoreSettings']===undefined)this[_0x2e33e9(0x4a0)]();if(this['_EventsMoveCoreSettings'][_0x2e33e9(0x308)]===undefined)this['initEventsMoveCore']();return this[_0x2e33e9(0x357)][_0x2e33e9(0x308)];},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x5a8)]=function(_0x4ed2cf){const _0x10008e=_0x17a6d5;if(this[_0x10008e(0x357)]===undefined)this[_0x10008e(0x4a0)]();if(this[_0x10008e(0x357)][_0x10008e(0x308)]===undefined)this[_0x10008e(0x4a0)]();this[_0x10008e(0x357)][_0x10008e(0x308)]=_0x4ed2cf;},Game_System[_0x17a6d5(0x2f0)]['eventLabelsVisible']=function(){const _0x237104=_0x17a6d5;if(this[_0x237104(0x357)]===undefined)this[_0x237104(0x4a0)]();if(this[_0x237104(0x357)]['VisibleEventLabels']===undefined)this[_0x237104(0x4a0)]();return this['_EventsMoveCoreSettings'][_0x237104(0x4fc)];},Game_System['prototype'][_0x17a6d5(0x5db)]=function(_0x27c7b3){const _0x4975ea=_0x17a6d5;if(this[_0x4975ea(0x357)]===undefined)this[_0x4975ea(0x4a0)]();if(this[_0x4975ea(0x357)][_0x4975ea(0x4fc)]===undefined)this[_0x4975ea(0x4a0)]();this['_EventsMoveCoreSettings']['VisibleEventLabels']=_0x27c7b3;},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x444)]=function(){const _0x2b955a=_0x17a6d5;return this[_0x2b955a(0x210)]===undefined&&(this[_0x2b955a(0x210)]=![]),this[_0x2b955a(0x210)];},Game_System[_0x17a6d5(0x2f0)]['setPlayerControlDisable']=function(_0x988c52){this['_DisablePlayerControl']=_0x988c52;},Game_System['prototype']['getPlayerDiagonalSetting']=function(){const _0x376fc6=_0x17a6d5;return this[_0x376fc6(0x65f)];},Game_System[_0x17a6d5(0x2f0)]['setPlayerDiagonalSetting']=function(_0x1da284){const _0x29c36a=_0x17a6d5;this[_0x29c36a(0x65f)]=String(_0x1da284)[_0x29c36a(0x5ed)]()['trim']();},Game_System[_0x17a6d5(0x2f0)]['getEventIconData']=function(_0x2eed4a){const _0x3086a9=_0x17a6d5;if(this[_0x3086a9(0x29a)]===undefined)this[_0x3086a9(0x4a0)]();if(!_0x2eed4a)return null;if(_0x2eed4a===$gamePlayer)return this[_0x3086a9(0x29a)]['Player'];else{if(_0x3086a9(0x45e)===_0x3086a9(0x4e6))_0x3b6c18[_0x3086a9(0x2f0)]['update'][_0x3086a9(0x496)](this),this['updateText'](),this['updateScale'](),this[_0x3086a9(0x2dd)](),this['updateOpacity']();else{const _0x4b0255=VisuMZ['EventsMoveCore']['Settings'],_0x5177d1=_0x3086a9(0x275)[_0x3086a9(0x333)](_0x2eed4a[_0x3086a9(0x45a)],_0x2eed4a['_eventId']);return this['_EventIcons'][_0x5177d1]=this[_0x3086a9(0x29a)][_0x5177d1]||{'iconIndex':0x0,'bufferX':_0x4b0255[_0x3086a9(0x3b0)]['BufferX'],'bufferY':_0x4b0255[_0x3086a9(0x3b0)][_0x3086a9(0x3f9)],'blendMode':_0x4b0255[_0x3086a9(0x3b0)][_0x3086a9(0x211)]},this[_0x3086a9(0x29a)][_0x5177d1];}}},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x21d)]=function(_0x23cd6b,_0x19b0ef,_0x1ad791,_0x4dc87a,_0x26ff2c){const _0x45745a=_0x17a6d5;if(this[_0x45745a(0x29a)]===undefined)this['initEventsMoveCore']();const _0xa60db2=_0x23cd6b===$gamePlayer?_0x45745a(0x5b6):_0x45745a(0x275)[_0x45745a(0x333)](_0x23cd6b[_0x45745a(0x45a)],_0x23cd6b['_eventId']);this['_EventIcons'][_0xa60db2]={'iconIndex':_0x19b0ef,'bufferX':_0x1ad791,'bufferY':_0x4dc87a,'blendMode':_0x26ff2c};},Game_System['prototype'][_0x17a6d5(0x3ff)]=function(_0x52fa47,_0x33a891,_0x5178b9,_0x593644,_0x586f05,_0x58ee83){const _0x3b6fba=_0x17a6d5;if(this[_0x3b6fba(0x29a)]===undefined)this[_0x3b6fba(0x4a0)]();const _0x3d0073='Map%1-Event%2'['format'](_0x52fa47,_0x33a891);this[_0x3b6fba(0x29a)][_0x3d0073]={'iconIndex':_0x5178b9,'bufferX':_0x593644,'bufferY':_0x586f05,'blendMode':_0x58ee83};},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x1dc)]=function(_0x6a1ca3){const _0x4b70f2=_0x17a6d5;if(this[_0x4b70f2(0x29a)]===undefined)this[_0x4b70f2(0x4a0)]();if(!_0x6a1ca3)return null;if(_0x6a1ca3===$gamePlayer){if(_0x4b70f2(0x5fd)===_0x4b70f2(0x5fd))delete this[_0x4b70f2(0x29a)][_0x4b70f2(0x5b6)];else{const _0x30af2f=_0x374f96[_0x52a903[_0x4b70f2(0x50a)](_0x2c9753[_0x4b70f2(0x304)])];return _0x2b7ca0['x']=_0x30af2f[0x0],_0x4a3b60['y']=_0x30af2f[0x1],this['createSpawnedEventWithData'](_0x2a0829),!![];}}else this[_0x4b70f2(0x24b)](_0x6a1ca3[_0x4b70f2(0x45a)],_0x6a1ca3['_eventId']);},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x24b)]=function(_0x30ee00,_0x555b9d){const _0x1c92d6=_0x17a6d5;if(this['_EventIcons']===undefined)this[_0x1c92d6(0x4a0)]();const _0x41a9e0=_0x1c92d6(0x275)[_0x1c92d6(0x333)](_0x30ee00,_0x555b9d);delete this[_0x1c92d6(0x29a)][_0x41a9e0];},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x5c2)]=function(_0x1202e9){const _0x34f659=_0x17a6d5;if(this['_SavedEventLocations']===undefined)this[_0x34f659(0x4a0)]();if(!_0x1202e9)return null;const _0x386b7e=_0x34f659(0x275)[_0x34f659(0x333)](_0x1202e9[_0x34f659(0x45a)],_0x1202e9[_0x34f659(0x25a)]);return this[_0x34f659(0x608)][_0x386b7e];},Game_System[_0x17a6d5(0x2f0)]['saveEventLocation']=function(_0x46df7b){const _0x25d38e=_0x17a6d5;if(this[_0x25d38e(0x608)]===undefined)this[_0x25d38e(0x4a0)]();if(!_0x46df7b)return;const _0x69afde='Map%1-Event%2'[_0x25d38e(0x333)](_0x46df7b['_mapId'],_0x46df7b[_0x25d38e(0x25a)]);this[_0x25d38e(0x608)][_0x69afde]={'direction':_0x46df7b['direction'](),'x':Math[_0x25d38e(0x582)](_0x46df7b['x']),'y':Math[_0x25d38e(0x582)](_0x46df7b['y']),'pageIndex':_0x46df7b[_0x25d38e(0x23d)],'moveRouteIndex':_0x46df7b[_0x25d38e(0x47c)]};},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x325)]=function(_0x2bb015){const _0x388b32=_0x17a6d5;if(this[_0x388b32(0x608)]===undefined)this['initEventsMoveCore']();if(!_0x2bb015)return;this['deleteSavedEventLocationKey'](_0x2bb015[_0x388b32(0x45a)],_0x2bb015[_0x388b32(0x25a)]);},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x56a)]=function(_0x411b57,_0x92afe7){const _0x57ea6f=_0x17a6d5;if(this['_SavedEventLocations']===undefined)this[_0x57ea6f(0x4a0)]();const _0x4fa838=_0x57ea6f(0x275)[_0x57ea6f(0x333)](_0x411b57,_0x92afe7);delete this[_0x57ea6f(0x608)][_0x4fa838];},Game_System[_0x17a6d5(0x2f0)]['createSaveEventLocationData']=function(_0x1eede0,_0x50f005,_0x3bf67d,_0x1c8d37,_0x3444b1,_0x13398c,_0x40da8b){const _0x2c8002=_0x17a6d5;if(this['_SavedEventLocations']===undefined)this[_0x2c8002(0x4a0)]();const _0x541563='Map%1-Event%2'['format'](_0x1eede0,_0x50f005);this[_0x2c8002(0x608)][_0x541563]={'direction':_0x3444b1,'x':Math['round'](_0x3bf67d),'y':Math[_0x2c8002(0x582)](_0x1c8d37),'pageIndex':_0x13398c,'moveRouteIndex':_0x40da8b};},Game_System[_0x17a6d5(0x2f0)]['getPreservedMorphEventData']=function(_0x57d3a0){const _0x7e43b4=_0x17a6d5;if(this['_PreservedEventMorphData']===undefined)this[_0x7e43b4(0x4a0)]();if(!_0x57d3a0)return;const _0x821936=_0x7e43b4(0x275)['format'](_0x57d3a0[_0x7e43b4(0x45a)],_0x57d3a0[_0x7e43b4(0x25a)]);return this['_PreservedEventMorphData'][_0x821936];},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x619)]=function(_0xec63fc,_0x2579ba,_0x5407af,_0x41d15c,_0x288cc6){const _0x3ffea7=_0x17a6d5;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();const _0x1bcb60=_0x3ffea7(0x275)['format'](_0xec63fc,_0x2579ba);this[_0x3ffea7(0x2e1)][_0x1bcb60]={'template':_0x5407af,'mapId':_0x41d15c,'eventId':_0x288cc6};},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x16b)]=function(_0x9595ba,_0x324beb){const _0x1903f6=_0x17a6d5;if(this[_0x1903f6(0x2e1)]===undefined)this[_0x1903f6(0x4a0)]();const _0x34b61b=_0x1903f6(0x275)[_0x1903f6(0x333)](_0x9595ba,_0x324beb);delete this['_PreservedEventMorphData'][_0x34b61b];},Game_System['prototype'][_0x17a6d5(0x4c7)]=function(_0x4ed790){const _0x3a67a4=_0x17a6d5;if(this[_0x3a67a4(0x442)]===undefined)this[_0x3a67a4(0x4a0)]();return this[_0x3a67a4(0x442)][_0x4ed790]=this[_0x3a67a4(0x442)][_0x4ed790]||[],this[_0x3a67a4(0x442)][_0x4ed790];},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x19f)]=function(_0x25ba6c){const _0x10e3ae=_0x17a6d5,_0x373816=this[_0x10e3ae(0x4c7)](_0x25ba6c);for(const _0x4d232d of _0x373816){if(!_0x4d232d)continue;if(_0x4d232d[_0x10e3ae(0x51a)])continue;const _0x340700=_0x373816[_0x10e3ae(0x408)](_0x4d232d);_0x373816[_0x340700]=null;}},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x681)]=function(){const _0x32895b=_0x17a6d5;this[_0x32895b(0x622)]=0x0,this[_0x32895b(0x190)]=![];},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x4a2)]=function(){const _0x3afdcb=_0x17a6d5;if(this[_0x3afdcb(0x622)]===undefined)this[_0x3afdcb(0x681)]();return this[_0x3afdcb(0x622)];},Game_System['prototype'][_0x17a6d5(0x39b)]=function(_0xe8ca99){const _0x348bed=_0x17a6d5;if(this[_0x348bed(0x622)]===undefined)this[_0x348bed(0x681)]();this[_0x348bed(0x622)]=_0xe8ca99;;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x31e)]=Game_Interpreter[_0x17a6d5(0x2f0)][_0x17a6d5(0x57d)],Game_Interpreter[_0x17a6d5(0x2f0)][_0x17a6d5(0x57d)]=function(_0x215a6d){const _0x5c4c6f=_0x17a6d5;if(!$gameParty[_0x5c4c6f(0x19c)]()&&_0x215a6d<0x0){let _0x31a17a=$gameSystem['getControlledFollowerID']();if(_0x31a17a>0x0)return _0x5c4c6f(0x43e)!=='Lungw'?$gamePlayer['followers']()[_0x5c4c6f(0x27d)](_0x31a17a-0x1):this['setDirection'](0x3);}return VisuMZ[_0x5c4c6f(0x480)][_0x5c4c6f(0x31e)][_0x5c4c6f(0x496)](this,_0x215a6d);},Game_System[_0x17a6d5(0x2f0)]['isStopFollowerChasing']=function(){const _0x29b4a9=_0x17a6d5;if(this['_followerChaseOff']===undefined)this[_0x29b4a9(0x681)]();return this[_0x29b4a9(0x190)];},Game_System[_0x17a6d5(0x2f0)][_0x17a6d5(0x2bb)]=function(_0x3996be){const _0x4a6172=_0x17a6d5;if(this['_followerChaseOff']===undefined)this[_0x4a6172(0x681)]();this[_0x4a6172(0x190)]=_0x3996be;;},VisuMZ['EventsMoveCore'][_0x17a6d5(0x614)]=Game_Followers[_0x17a6d5(0x2f0)]['jumpAll'],Game_Followers[_0x17a6d5(0x2f0)][_0x17a6d5(0x4f6)]=function(){const _0x32a46a=_0x17a6d5;if($gameSystem[_0x32a46a(0x177)]())return;VisuMZ[_0x32a46a(0x480)][_0x32a46a(0x614)]['call'](this);},VisuMZ[_0x17a6d5(0x480)]['Game_Timer_initialize']=Game_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x467)],Game_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x467)]=function(){const _0x1517af=_0x17a6d5;VisuMZ[_0x1517af(0x480)][_0x1517af(0x5d8)][_0x1517af(0x496)](this),this[_0x1517af(0x4a0)]();},Game_Timer['prototype'][_0x17a6d5(0x4a0)]=function(){const _0x4d65b3=_0x17a6d5;this['_paused']=![],this[_0x4d65b3(0x49d)]=-0x1,this['_expireCommonEvent']=0x0;},Game_Timer['prototype']['update']=function(_0x521072){const _0x3fb7f5=_0x17a6d5;if(!_0x521072)return;if(!this['_working'])return;if(this[_0x3fb7f5(0x432)])return;if(this[_0x3fb7f5(0x54d)]<=0x0)return;if(this[_0x3fb7f5(0x49d)]===undefined)this['initEventsMoveCore']();this[_0x3fb7f5(0x54d)]+=this[_0x3fb7f5(0x49d)],this[_0x3fb7f5(0x54d)]<=0x0&&this['onExpire']();},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x174)]=Game_Timer[_0x17a6d5(0x2f0)]['start'],Game_Timer['prototype'][_0x17a6d5(0x3c7)]=function(_0x15f068){const _0x3b0d8e=_0x17a6d5;VisuMZ[_0x3b0d8e(0x480)][_0x3b0d8e(0x174)][_0x3b0d8e(0x496)](this,_0x15f068);if(this[_0x3b0d8e(0x432)]===undefined)this['initEventsMoveCore']();this[_0x3b0d8e(0x432)]=![];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x592)]=Game_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x503)],Game_Timer[_0x17a6d5(0x2f0)]['stop']=function(){const _0x1875fa=_0x17a6d5;VisuMZ['EventsMoveCore'][_0x1875fa(0x592)][_0x1875fa(0x496)](this);if(this[_0x1875fa(0x432)]===undefined)this['initEventsMoveCore']();this[_0x1875fa(0x432)]=![];},Game_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x2d8)]=function(){const _0x1ab73c=_0x17a6d5;if(this[_0x1ab73c(0x54d)]<=0x0)return;this[_0x1ab73c(0x432)]=!![],this['_working']=!![];},Game_Timer['prototype']['resume']=function(){const _0xd0e921=_0x17a6d5;if(this[_0xd0e921(0x54d)]<=0x0)return;this[_0xd0e921(0x432)]=![],this['_working']=!![];},Game_Timer['prototype']['gainFrames']=function(_0x2ac5f2){const _0x2638b3=_0x17a6d5;this[_0x2638b3(0x54d)]=this[_0x2638b3(0x54d)]||0x0,this[_0x2638b3(0x54d)]+=_0x2ac5f2,this[_0x2638b3(0x449)]=!![],this['_frames']=Math[_0x2638b3(0x533)](0x1,this[_0x2638b3(0x54d)]);},Game_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x4b1)]=function(_0x22123a){const _0x571beb=_0x17a6d5;this[_0x571beb(0x54d)]=this[_0x571beb(0x54d)]||0x0,this[_0x571beb(0x54d)]=_0x22123a,this['_working']=!![],this[_0x571beb(0x54d)]=Math['max'](0x1,this[_0x571beb(0x54d)]);},Game_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x62d)]=function(_0x14bc53){const _0x2eacb3=_0x17a6d5;this['_speed']=_0x14bc53,this['_working']=!![],_0x14bc53>0x0&&(this[_0x2eacb3(0x54d)]=Math[_0x2eacb3(0x533)](this[_0x2eacb3(0x54d)],0x1));},Game_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x286)]=function(_0x370558){const _0x2f795a=_0x17a6d5;if(this[_0x2f795a(0x58d)]===undefined)this[_0x2f795a(0x4a0)]();this['_expireCommonEvent']=_0x370558;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x343)]=Game_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x47d)],Game_Timer['prototype'][_0x17a6d5(0x47d)]=function(){const _0x4a49c8=_0x17a6d5;if(this[_0x4a49c8(0x58d)]===undefined)this['initEventsMoveCore']();this['_expireCommonEvent']?$gameTemp['reserveCommonEvent'](this[_0x4a49c8(0x58d)]):_0x4a49c8(0x48e)==='VdtWC'?VisuMZ['EventsMoveCore'][_0x4a49c8(0x343)]['call'](this):(_0x204177[_0x4a49c8(0x5d7)](_0x132f67,_0x48d5a6),_0x3f4a2b['deleteIconsOnEventsData'](_0x1d258e));},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x5f8)]=Game_Message[_0x17a6d5(0x2f0)]['add'],Game_Message['prototype'][_0x17a6d5(0x567)]=function(_0x3a1f78){const _0x3637be=_0x17a6d5;VisuMZ[_0x3637be(0x480)][_0x3637be(0x5f8)][_0x3637be(0x496)](this,_0x3a1f78),this[_0x3637be(0x20f)]=$gameTemp[_0x3637be(0x3c5)]();},Game_Message[_0x17a6d5(0x2f0)][_0x17a6d5(0x361)]=function(){const _0x1ead85=_0x17a6d5;$gameTemp[_0x1ead85(0x301)](this[_0x1ead85(0x20f)]);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x448)]=Game_Switches[_0x17a6d5(0x2f0)][_0x17a6d5(0x347)],Game_Switches['prototype']['value']=function(_0xd4884f){const _0x5bdc27=_0x17a6d5;if(DataManager[_0x5bdc27(0x5f3)](_0xd4884f)){if(_0x5bdc27(0x632)===_0x5bdc27(0x632))return!!this[_0x5bdc27(0x336)](_0xd4884f);else this['opacity']-=this[_0x5bdc27(0x244)]();}else{if(DataManager[_0x5bdc27(0x4f5)](_0xd4884f)){if('vPkDy'===_0x5bdc27(0x469))return!!this['selfValue'](_0xd4884f);else _0x5e7eba['EventsMoveCore'][_0x5bdc27(0x1ac)][_0x5bdc27(0x496)](this),this[_0x5bdc27(0x538)]();}else{if(DataManager['isMapSwitch'](_0xd4884f))return!!this['mapValue'](_0xd4884f);else{if(_0x5bdc27(0x423)!==_0x5bdc27(0x62f))return VisuMZ['EventsMoveCore'][_0x5bdc27(0x448)][_0x5bdc27(0x496)](this,_0xd4884f);else{for(const _0x1f630c of this[_0x5bdc27(0x237)]){if(_0x1f630c)return _0x1f630c;}return null;}}}}},Game_Switches[_0x17a6d5(0x2bd)]={},Game_Switches[_0x17a6d5(0x2f0)][_0x17a6d5(0x336)]=function(_0x5dd3f3){const _0x40a7eb=_0x17a6d5;if(!Game_Switches[_0x40a7eb(0x2bd)][_0x5dd3f3]){$dataSystem['switches'][_0x5dd3f3][_0x40a7eb(0x5d0)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x2bce81='return\x20%1'[_0x40a7eb(0x333)](String(RegExp['$1']));Game_Switches['advancedFunc'][_0x5dd3f3]=new Function(_0x40a7eb(0x296),_0x2bce81);}const _0x503114=$gameTemp[_0x40a7eb(0x3c5)]()||this;return Game_Switches['advancedFunc'][_0x5dd3f3][_0x40a7eb(0x496)](_0x503114,_0x5dd3f3);},Game_Switches['prototype'][_0x17a6d5(0x377)]=function(_0x35416f){const _0x594a59=_0x17a6d5,_0x4b00b1=$gameTemp[_0x594a59(0x3c5)]()||this;if(_0x4b00b1['constructor']!==Game_Event){if(_0x594a59(0x172)==='lewhI')this['_stepPattern']='';else return VisuMZ[_0x594a59(0x480)][_0x594a59(0x448)]['call'](this,_0x35416f);}else{if(_0x594a59(0x388)!==_0x594a59(0x388))_0x454ba4[_0x594a59(0x480)][_0x594a59(0x1a5)][_0x594a59(0x496)](this),this[_0x594a59(0x59d)]();else{const _0x97dce6=[_0x4b00b1[_0x594a59(0x45a)],_0x4b00b1['_eventId'],'Self\x20Switch\x20%1'[_0x594a59(0x333)](_0x35416f)];return $gameSelfSwitches['value'](_0x97dce6);}}},Game_Switches[_0x17a6d5(0x2f0)][_0x17a6d5(0x56e)]=function(_0x3860d3){const _0x322bf=_0x17a6d5,_0x1e684d=$gameMap?$gameMap['mapId']():0x0,_0x35962e=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x322bf(0x333)](_0x1e684d,_0x3860d3)];return $gameSelfSwitches[_0x322bf(0x347)](_0x35962e);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x492)]=Game_Switches[_0x17a6d5(0x2f0)]['setValue'],Game_Switches[_0x17a6d5(0x2f0)][_0x17a6d5(0x17c)]=function(_0x5b3aeb,_0x2eab10){const _0x339cf1=_0x17a6d5;if(DataManager[_0x339cf1(0x4f5)](_0x5b3aeb))this[_0x339cf1(0x4ea)](_0x5b3aeb,_0x2eab10);else{if(DataManager['isMapSwitch'](_0x5b3aeb)){if(_0x339cf1(0x5e9)==='NJDfC')this[_0x339cf1(0x468)](_0x5b3aeb,_0x2eab10);else return this[_0x339cf1(0x5e0)]()[_0x339cf1(0x3c0)]()[_0x339cf1(0x5d0)](/\[VS8\]/i);}else VisuMZ[_0x339cf1(0x480)][_0x339cf1(0x492)][_0x339cf1(0x496)](this,_0x5b3aeb,_0x2eab10);}},Game_Switches['prototype'][_0x17a6d5(0x4ea)]=function(_0x44ec42,_0x4e5a65){const _0x381377=_0x17a6d5,_0x4f3900=$gameTemp[_0x381377(0x3c5)]()||this;if(_0x4f3900[_0x381377(0x39f)]!==Game_Event)VisuMZ[_0x381377(0x480)][_0x381377(0x492)][_0x381377(0x496)](this,_0x44ec42,_0x4e5a65);else{const _0x2ab6e2=[_0x4f3900[_0x381377(0x45a)],_0x4f3900[_0x381377(0x25a)],_0x381377(0x36e)[_0x381377(0x333)](_0x44ec42)];$gameSelfSwitches[_0x381377(0x17c)](_0x2ab6e2,_0x4e5a65);}},Game_Switches[_0x17a6d5(0x2f0)]['setMapValue']=function(_0x46f0ae,_0x36e016){const _0x4d07ee=_0x17a6d5,_0x85380c=$gameMap?$gameMap[_0x4d07ee(0x461)]():0x0,_0x57a2d1=[0x0,0x0,_0x4d07ee(0x552)[_0x4d07ee(0x333)](_0x85380c,_0x46f0ae)];return $gameSelfSwitches[_0x4d07ee(0x17c)](_0x57a2d1,_0x36e016);},VisuMZ['EventsMoveCore'][_0x17a6d5(0x411)]=Game_Variables[_0x17a6d5(0x2f0)]['value'],Game_Variables['prototype'][_0x17a6d5(0x347)]=function(_0x46e232){const _0x56e03a=_0x17a6d5;if(DataManager[_0x56e03a(0x2b9)](_0x46e232))return this['advancedValue'](_0x46e232);else{if(DataManager[_0x56e03a(0x1b4)](_0x46e232)){if('kKCGl'===_0x56e03a(0x329))this[_0x56e03a(0x644)](_0x1c5d0b,!![]);else return this[_0x56e03a(0x377)](_0x46e232);}else{if(DataManager[_0x56e03a(0x26f)](_0x46e232)){if(_0x56e03a(0x2f5)===_0x56e03a(0x289)){const _0x4ae35f=_0x3bb6c3[_0x56e03a(0x1d5)]();if(_0x4ae35f===_0x56e03a(0x648))return!![];if(_0x4ae35f==='disable')return![];if(this[_0x56e03a(0x165)]===_0x236acc)this[_0x56e03a(0x245)]();return this[_0x56e03a(0x165)];}else return this['mapValue'](_0x46e232);}else return VisuMZ[_0x56e03a(0x480)][_0x56e03a(0x411)]['call'](this,_0x46e232);}}},Game_Variables[_0x17a6d5(0x2bd)]={},Game_Variables[_0x17a6d5(0x2f0)]['advancedValue']=function(_0xe21454){const _0x1d359c=_0x17a6d5;if(!Game_Variables['advancedFunc'][_0xe21454]){if(_0x1d359c(0x61e)==='xjflV')this[_0x1d359c(0x517)](_0x2d9984[_0x1d359c(0x25a)]);else{$dataSystem[_0x1d359c(0x40f)][_0xe21454]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1a2b77=_0x1d359c(0x50f)['format'](String(RegExp['$1']));Game_Variables[_0x1d359c(0x2bd)][_0xe21454]=new Function('variableId',_0x1a2b77);}}const _0x293c36=$gameTemp[_0x1d359c(0x3c5)]()||this;return Game_Variables[_0x1d359c(0x2bd)][_0xe21454][_0x1d359c(0x496)](_0x293c36,_0xe21454);},Game_Variables[_0x17a6d5(0x2f0)]['selfValue']=function(_0x14da68){const _0x55491c=_0x17a6d5,_0x3554bb=$gameTemp['getSelfTarget']()||this;if(_0x3554bb['constructor']!==Game_Event){if(_0x55491c(0x2f8)===_0x55491c(0x2f8))return VisuMZ[_0x55491c(0x480)][_0x55491c(0x411)][_0x55491c(0x496)](this,_0x14da68);else this[_0x55491c(0x4d7)](_0x433460);}else{const _0x11d8c7=[_0x3554bb['_mapId'],_0x3554bb[_0x55491c(0x25a)],_0x55491c(0x24f)['format'](_0x14da68)];return $gameSelfSwitches['value'](_0x11d8c7);}},Game_Variables[_0x17a6d5(0x2f0)][_0x17a6d5(0x56e)]=function(_0x3c08d6){const _0x3da415=_0x17a6d5,_0x57b9e3=$gameMap?$gameMap[_0x3da415(0x461)]():0x0,_0x643477=[0x0,0x0,_0x3da415(0x32f)[_0x3da415(0x333)](_0x57b9e3,_0x3c08d6)];return $gameSelfSwitches[_0x3da415(0x347)](_0x643477)||0x0;},VisuMZ['EventsMoveCore'][_0x17a6d5(0x1d8)]=Game_Variables[_0x17a6d5(0x2f0)][_0x17a6d5(0x17c)],Game_Variables[_0x17a6d5(0x2f0)][_0x17a6d5(0x17c)]=function(_0x22613a,_0x93bc09){const _0x2c4a7b=_0x17a6d5;if(DataManager[_0x2c4a7b(0x1b4)](_0x22613a)){if('hHuZv'!==_0x2c4a7b(0x310))this[_0x2c4a7b(0x4ea)](_0x22613a,_0x93bc09);else{if(_0x3826ad)this[_0x2c4a7b(0x163)](_0x37fbf1['x'],_0x475ce8['y']);}}else DataManager[_0x2c4a7b(0x26f)](_0x22613a)?this[_0x2c4a7b(0x468)](_0x22613a,_0x93bc09):VisuMZ[_0x2c4a7b(0x480)][_0x2c4a7b(0x1d8)]['call'](this,_0x22613a,_0x93bc09);},Game_Variables['prototype'][_0x17a6d5(0x4ea)]=function(_0x1da42b,_0x318e1a){const _0x15fb51=_0x17a6d5,_0x44aa02=$gameTemp[_0x15fb51(0x3c5)]()||this;if(_0x44aa02[_0x15fb51(0x39f)]!==Game_Event){if(_0x15fb51(0x61d)===_0x15fb51(0x2db))for(const _0x527c79 of _0x3f2709){if(_0x527c79['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x107e9e=_0x206add(_0x279733['$1'])[_0x15fb51(0x5ed)]()[_0x15fb51(0x520)](),_0x26f41b=_0x2f0781(_0xc398e3['$2']);this[_0x15fb51(0x288)][_0x107e9e]=_0x26f41b;}}else VisuMZ[_0x15fb51(0x480)][_0x15fb51(0x1d8)][_0x15fb51(0x496)](this,_0x1da42b,_0x318e1a);}else{if(_0x15fb51(0x2b3)!==_0x15fb51(0x2b3))return this[_0x15fb51(0x4d1)];else{const _0x33f017=[_0x44aa02['_mapId'],_0x44aa02[_0x15fb51(0x25a)],_0x15fb51(0x24f)[_0x15fb51(0x333)](_0x1da42b)];$gameSelfSwitches['setValue'](_0x33f017,_0x318e1a);}}},Game_Variables['prototype']['setMapValue']=function(_0x47ba3e,_0x4be181){const _0x354eea=_0x17a6d5,_0x20b168=$gameMap?$gameMap['mapId']():0x0,_0x5dfad9=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x354eea(0x333)](_0x20b168,_0x47ba3e)];$gameSelfSwitches[_0x354eea(0x17c)](_0x5dfad9,_0x4be181);},VisuMZ[_0x17a6d5(0x480)]['Game_SelfSwitches_value']=Game_SelfSwitches[_0x17a6d5(0x2f0)][_0x17a6d5(0x347)],Game_SelfSwitches[_0x17a6d5(0x2f0)][_0x17a6d5(0x347)]=function(_0x2fa168){const _0x379473=_0x17a6d5;if(_0x2fa168[0x2][_0x379473(0x5d0)](/(?:SELF|MAP)/i))return this[_0x379473(0x377)](_0x2fa168);else{if(_0x379473(0x636)!=='OBMyd'){return VisuMZ[_0x379473(0x480)]['Game_SelfSwitches_value'][_0x379473(0x496)](this,_0x2fa168);;}else{const _0x346229=_0xff20f2[_0x379473(0x406)]();return _0x515fdb['floor'](this['scrolledY']()*_0x346229+_0x346229);}}},Game_SelfSwitches['prototype'][_0x17a6d5(0x377)]=function(_0x1f8200){const _0x5554f2=_0x17a6d5;return _0x1f8200[0x2][_0x5554f2(0x5d0)](/VAR/i)?this[_0x5554f2(0x493)][_0x1f8200]||0x0:!!this[_0x5554f2(0x493)][_0x1f8200];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x5cd)]=Game_SelfSwitches[_0x17a6d5(0x2f0)]['setValue'],Game_SelfSwitches[_0x17a6d5(0x2f0)][_0x17a6d5(0x17c)]=function(_0x263c1f,_0x318143){const _0x2964d8=_0x17a6d5;if(_0x263c1f[0x2][_0x2964d8(0x5d0)](/(?:SELF|MAP)/i))this[_0x2964d8(0x4ea)](_0x263c1f,_0x318143);else{if(_0x2964d8(0x179)!=='hpIiF')return this[_0x2964d8(0x55e)](_0x598970(_0x54ab1c['$1']),_0x342fd0(_0x4b0cc1['$2']));else VisuMZ[_0x2964d8(0x480)]['Game_SelfSwitches_setValue'][_0x2964d8(0x496)](this,_0x263c1f,_0x318143);}},Game_SelfSwitches[_0x17a6d5(0x2f0)]['setSelfValue']=function(_0x2fb6cb,_0x28159f){const _0x5cb495=_0x17a6d5;this[_0x5cb495(0x493)][_0x2fb6cb]=_0x2fb6cb[0x2]['match'](/VAR/i)?_0x28159f:!!_0x28159f,this[_0x5cb495(0x3a9)]();},VisuMZ['EventsMoveCore'][_0x17a6d5(0x31c)]=Scene_Map[_0x17a6d5(0x2f0)]['createDisplayObjects'],Scene_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x55b)]=function(){const _0x36312a=_0x17a6d5;$gameMap[_0x36312a(0x170)](),VisuMZ[_0x36312a(0x480)]['Scene_Map_createDisplayObjects'][_0x36312a(0x496)](this);},Game_Map['prototype']['resetExitSelfSwitches']=function(){const _0x47f845=_0x17a6d5;this[_0x47f845(0x59c)]=this['mapId'](),this[_0x47f845(0x414)]=undefined;const _0x25ebc8=this[_0x47f845(0x687)]();for(const _0x3b1842 of _0x25ebc8){if(_0x47f845(0x537)==='egKYe'){if(_0x3b1842)$gameSelfSwitches['resetSelfSwitchesForEvent'](_0x3b1842);}else{const _0x27bc4c=_0x40aef9[_0x47f845(0x3c5)]()||this;if(_0x27bc4c[_0x47f845(0x39f)]!==_0x1efbce)_0x53f5a5['EventsMoveCore']['Game_Variables_setValue'][_0x47f845(0x496)](this,_0x15561c,_0x3d15da);else{const _0x48d88c=[_0x27bc4c[_0x47f845(0x45a)],_0x27bc4c[_0x47f845(0x25a)],_0x47f845(0x24f)[_0x47f845(0x333)](_0x33c50c)];_0x1f40d1[_0x47f845(0x17c)](_0x48d88c,_0x571bad);}}}},Game_SelfSwitches['prototype'][_0x17a6d5(0x4e5)]=function(_0x192975){const _0x2cccb7=_0x17a6d5;if(!_0x192975)return;if(!_0x192975[_0x2cccb7(0x49f)]())return;const _0x2c4235=_0x192975['event']()[_0x2cccb7(0x489)]||'';if(_0x2c4235[_0x2cccb7(0x5d0)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x5b8abd='%1,%2,'[_0x2cccb7(0x333)]($gameMap['_mapId'],_0x192975[_0x2cccb7(0x25a)]),_0x26fe04=Object[_0x2cccb7(0x470)](this['_data'])['filter'](_0x2451f6=>_0x2451f6[_0x2cccb7(0x49b)](_0x5b8abd));while(_0x26fe04[_0x2cccb7(0x304)]>0x0){const _0x31dbda=_0x26fe04['shift']();delete this['_data'][_0x31dbda];}}},Game_SelfSwitches['prototype'][_0x17a6d5(0x2cf)]=function(_0x5b7eb7){const _0x49a144=_0x17a6d5,_0x33c873=_0x49a144(0x5fb)[_0x49a144(0x333)]($gameMap[_0x49a144(0x45a)]),_0x21da8b=Object[_0x49a144(0x470)](this['_data'])[_0x49a144(0x1a0)](_0xd46cb1=>_0xd46cb1[_0x49a144(0x49b)](_0x33c873));while(_0x21da8b['length']>0x0){const _0x6c3c33=_0x21da8b['shift']();delete this[_0x49a144(0x493)][_0x6c3c33];}_0x5b7eb7===$gameMap[_0x49a144(0x461)]()&&$gameMap[_0x49a144(0x252)]();},VisuMZ[_0x17a6d5(0x480)]['Game_Enemy_meetsSwitchCondition']=Game_Enemy['prototype'][_0x17a6d5(0x3e7)],Game_Enemy[_0x17a6d5(0x2f0)][_0x17a6d5(0x3e7)]=function(_0x5293c2){const _0x11adce=_0x17a6d5;$gameTemp[_0x11adce(0x301)](this);const _0x44977e=VisuMZ[_0x11adce(0x480)]['Game_Enemy_meetsSwitchCondition'][_0x11adce(0x496)](this,_0x5293c2);return $gameTemp[_0x11adce(0x5b0)](),_0x44977e;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x458)]=Game_Troop[_0x17a6d5(0x2f0)][_0x17a6d5(0x397)],Game_Troop['prototype'][_0x17a6d5(0x397)]=function(_0x53bd43){const _0x505126=_0x17a6d5;$gameTemp[_0x505126(0x301)](this);const _0x135c0e=VisuMZ['EventsMoveCore'][_0x505126(0x458)][_0x505126(0x496)](this,_0x53bd43);return $gameTemp['clearSelfTarget'](),_0x135c0e;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x682)]=Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x220)],Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x220)]=function(_0x1c668f){const _0xc3fedf=_0x17a6d5;this[_0xc3fedf(0x19f)](_0x1c668f),this['clearEventCache'](),VisuMZ[_0xc3fedf(0x480)][_0xc3fedf(0x682)][_0xc3fedf(0x496)](this,_0x1c668f),this[_0xc3fedf(0x494)](),this[_0xc3fedf(0x245)](),this[_0xc3fedf(0x32b)](),this[_0xc3fedf(0x295)](),this['setupSpawnedEvents'](),this['setupPlayerVisibilityOverrides'](),this[_0xc3fedf(0x44d)](),this[_0xc3fedf(0x494)]();},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x581)]=Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x3e4)],Game_Map['prototype'][_0x17a6d5(0x3e4)]=function(){const _0x25a654=_0x17a6d5;VisuMZ['EventsMoveCore']['Game_Map_setupEvents'][_0x25a654(0x496)](this),this[_0x25a654(0x65d)]();},Game_Map[_0x17a6d5(0x398)]=0xc8,Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x4b5)]=function(){const _0x4cd3d8=_0x17a6d5,_0x54459f=Game_Map[_0x4cd3d8(0x398)];this[_0x4cd3d8(0x593)]=this[_0x4cd3d8(0x687)]()[_0x4cd3d8(0x304)]>_0x54459f;if(this['_eventOverload']&&$gameTemp[_0x4cd3d8(0x3a8)]()){}},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x674)]=function(){const _0x37638c=_0x17a6d5;return this[_0x37638c(0x593)];},Game_Map[_0x17a6d5(0x2f0)]['clearEventCache']=function(){const _0x248aba=_0x17a6d5;this[_0x248aba(0x414)]=undefined;},Game_Map[_0x17a6d5(0x2f0)]['setupDiagonalSupport']=function(){const _0x592532=_0x17a6d5;this['_diagonalSupport']=VisuMZ[_0x592532(0x480)][_0x592532(0x429)][_0x592532(0x554)][_0x592532(0x2d1)];const _0x284e0e=$dataMap['note']||'';if(_0x284e0e[_0x592532(0x5d0)](/<DIAGONAL MOVEMENT: ON>/i)){if('LjMXU'!=='NZbMG')this[_0x592532(0x165)]=!![];else{_0x42bbc2[_0x592532(0x5d7)](_0x100f30,_0x480958);const _0x2d5943=_0x471025[_0x592532(0x3bd)]||0x0;_0x518f2c[_0x592532(0x62d)](_0x2d5943);}}else{if(_0x284e0e['match'](/<DIAGONAL MOVEMENT: OFF>/i)){if(_0x592532(0x5e6)!==_0x592532(0x647))this[_0x592532(0x165)]=![];else{if(this[_0x592532(0x442)]===_0x2ca131)this[_0x592532(0x4a0)]();return this[_0x592532(0x442)][_0x1690a7]=this[_0x592532(0x442)][_0x245aea]||[],this['_MapSpawnedEventData'][_0x28c061];}}}},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x320)]=function(){const _0x112dc4=_0x17a6d5,_0x41b07e=$gameSystem[_0x112dc4(0x1d5)]();if(_0x41b07e===_0x112dc4(0x648))return!![];if(_0x41b07e===_0x112dc4(0x446))return![];if(this['_diagonalSupport']===undefined)this[_0x112dc4(0x245)]();return this['_diagonalSupport'];},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x400)]=function(_0x42cc5f,_0x5375e3){const _0x917fde=_0x17a6d5;if([0x1,0x4,0x7][_0x917fde(0x64c)](_0x5375e3))_0x42cc5f-=0x1;if([0x3,0x6,0x9][_0x917fde(0x64c)](_0x5375e3))_0x42cc5f+=0x1;return this[_0x917fde(0x49c)](_0x42cc5f);},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x5f0)]=function(_0x545c33,_0x5432ca){const _0x4b9040=_0x17a6d5;if([0x1,0x2,0x3][_0x4b9040(0x64c)](_0x5432ca))_0x545c33+=0x1;if([0x7,0x8,0x9][_0x4b9040(0x64c)](_0x5432ca))_0x545c33-=0x1;return this[_0x4b9040(0x565)](_0x545c33);},Game_Map[_0x17a6d5(0x2f0)]['absDistance']=function(_0x13da21,_0x329521,_0x32add9,_0x12ed3e){const _0x1854c4=_0x17a6d5;return Math[_0x1854c4(0x533)](Math[_0x1854c4(0x595)](this[_0x1854c4(0x55d)](_0x13da21,_0x32add9)),Math[_0x1854c4(0x595)](this[_0x1854c4(0x221)](_0x329521,_0x12ed3e)));},Game_Map[_0x17a6d5(0x2f0)]['setupRegionRestrictions']=function(){const _0x30bf69=_0x17a6d5,_0x531ee3=VisuMZ['EventsMoveCore'][_0x30bf69(0x429)][_0x30bf69(0x1c2)],_0x114af9={},_0x552027=['Allow',_0x30bf69(0x269),_0x30bf69(0x4e2)],_0x4f5f0d=[_0x30bf69(0x3c9),_0x30bf69(0x580),_0x30bf69(0x5b6),_0x30bf69(0x612),'Vehicle','Boat',_0x30bf69(0x284),'Airship'];for(const _0x40a080 of _0x552027){for(const _0xbba15 of _0x4f5f0d){if(_0x30bf69(0x3a3)!==_0x30bf69(0x3df)){const _0x1c4afe=_0x30bf69(0x4f7)['format'](_0xbba15,_0x40a080);if(_0x531ee3[_0x1c4afe]){if('fpSNy'===_0x30bf69(0x535))_0x114af9[_0x1c4afe]=_0x531ee3[_0x1c4afe][_0x30bf69(0x497)](0x0);else return![];}}else{if(!_0x446a87[_0x30bf69(0x19c)]()&&_0x5dceec<0x0){let _0x1a032d=_0x57b57a[_0x30bf69(0x4a2)]();if(_0x1a032d>0x0)return _0x1362b3['followers']()['follower'](_0x1a032d-0x1);}return _0x1d0a62['EventsMoveCore'][_0x30bf69(0x31e)]['call'](this,_0x4b3feb);}}}const _0x3eb264=$dataMap[_0x30bf69(0x489)]||'',_0x154741=_0x3eb264[_0x30bf69(0x5d0)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x154741)for(const _0x4191c7 of _0x154741){_0x4191c7[_0x30bf69(0x5d0)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x275f56=String(RegExp['$1'])[_0x30bf69(0x5ed)]()[_0x30bf69(0x520)](),_0x3f3d70=String(RegExp['$2'])[_0x30bf69(0x5ed)]()[_0x30bf69(0x520)]();const _0x4d9269=JSON['parse']('['+RegExp['$3'][_0x30bf69(0x5d0)](/\d+/g)+']');_0x275f56=_0x275f56['charAt'](0x0)[_0x30bf69(0x43c)]()+_0x275f56[_0x30bf69(0x497)](0x1),_0x3f3d70=_0x3f3d70[_0x30bf69(0x548)](0x0)['toUpperCase']()+_0x3f3d70[_0x30bf69(0x497)](0x1);const _0x455dff='%1%2'[_0x30bf69(0x333)](_0x275f56,_0x3f3d70);if(_0x114af9[_0x455dff])_0x114af9[_0x455dff]=_0x114af9[_0x455dff][_0x30bf69(0x2d0)](_0x4d9269);}this[_0x30bf69(0x3e3)]=_0x114af9;},Game_Map['prototype']['isRegionAllowPass']=function(_0x310ad7,_0x5da647,_0x1f9fa1,_0x18bfa7){const _0x284305=_0x17a6d5,_0x3ec19e=this[_0x284305(0x400)](_0x310ad7,_0x1f9fa1),_0x2e7d89=this['roundYWithDirection'](_0x5da647,_0x1f9fa1),_0x5351b7=this[_0x284305(0x4cf)](_0x3ec19e,_0x2e7d89),_0x245efb=this[_0x284305(0x3e3)];if(_0x245efb[_0x284305(0x2c4)]['includes'](_0x5351b7))return!![];else{if(_0x18bfa7===_0x284305(0x527)){if(_0x284305(0x5cf)===_0x284305(0x2b4))_0x202a25['mapId']=_0x3765cb[_0x284305(0x4fe)],_0x5069d9[_0x284305(0x1ab)]=_0x533767[_0x284305(0x45b)];else return _0x245efb[_0x284305(0x62b)][_0x284305(0x64c)](_0x5351b7)||_0x245efb[_0x284305(0x2d3)]['includes'](_0x5351b7);}else{if(_0x18bfa7===_0x284305(0x49f))return _0x245efb[_0x284305(0x1b9)]['includes'](_0x5351b7)||_0x245efb[_0x284305(0x2d3)]['includes'](_0x5351b7);else{if(_0x245efb['VehicleAllow']['includes'](_0x5351b7))return!![];else{const _0x4ebd62=_0x284305(0x53d)['format'](_0x18bfa7[_0x284305(0x548)](0x0)['toUpperCase']()+_0x18bfa7[_0x284305(0x497)](0x1));if(_0x245efb[_0x4ebd62])return _0x245efb[_0x4ebd62][_0x284305(0x64c)](_0x5351b7);}}}}return![];},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x166)]=function(_0x10f563,_0x10484d,_0x12fb0f,_0x25f726){const _0x37e73f=_0x17a6d5,_0x58b30a=this[_0x37e73f(0x400)](_0x10f563,_0x12fb0f),_0x19aba7=this[_0x37e73f(0x5f0)](_0x10484d,_0x12fb0f),_0x27eaf8=this['regionId'](_0x58b30a,_0x19aba7),_0x2aa9f2=this[_0x37e73f(0x3e3)];if(_0x2aa9f2['AllForbid'][_0x37e73f(0x64c)](_0x27eaf8))return!![];else{if(_0x25f726===_0x37e73f(0x527))return _0x2aa9f2[_0x37e73f(0x257)][_0x37e73f(0x64c)](_0x27eaf8)||_0x2aa9f2[_0x37e73f(0x2b8)]['includes'](_0x27eaf8);else{if(_0x25f726===_0x37e73f(0x49f)){if(_0x37e73f(0x56c)!=='UZtdU'){if(this[_0x37e73f(0x608)]===_0x13338c)this[_0x37e73f(0x4a0)]();const _0x1f4299='Map%1-Event%2'[_0x37e73f(0x333)](_0x1c8d1c,_0x4822a3);delete this[_0x37e73f(0x608)][_0x1f4299];}else return _0x2aa9f2[_0x37e73f(0x65e)][_0x37e73f(0x64c)](_0x27eaf8)||_0x2aa9f2[_0x37e73f(0x2b8)]['includes'](_0x27eaf8);}else{if(_0x2aa9f2[_0x37e73f(0x1f0)][_0x37e73f(0x64c)](_0x27eaf8))return _0x37e73f(0x327)!=='xhdTe'?!![]:!![];else{const _0x3a5ca8='%1Forbid'[_0x37e73f(0x333)](_0x25f726[_0x37e73f(0x548)](0x0)[_0x37e73f(0x43c)]()+_0x25f726[_0x37e73f(0x497)](0x1));if(_0x2aa9f2[_0x3a5ca8])return _0x2aa9f2[_0x3a5ca8]['includes'](_0x27eaf8);}}}}return![];},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x460)]=function(_0x4aada7,_0x74e2d3,_0x265b01,_0x1a5df9){const _0x2fd02a=_0x17a6d5;_0x265b01=_0x1a5df9===_0x2fd02a(0x5fa)?0x5:_0x265b01;const _0x563c20=this[_0x2fd02a(0x400)](_0x4aada7,_0x265b01),_0x47d652=this[_0x2fd02a(0x5f0)](_0x74e2d3,_0x265b01),_0x33053f=this['regionId'](_0x563c20,_0x47d652),_0x679d23=this[_0x2fd02a(0x3e3)];if(_0x679d23[_0x2fd02a(0x324)][_0x2fd02a(0x64c)](_0x33053f))return!![];else{const _0x43e4f5=_0x2fd02a(0x34c)[_0x2fd02a(0x333)](_0x1a5df9[_0x2fd02a(0x548)](0x0)['toUpperCase']()+_0x1a5df9['slice'](0x1));if(_0x679d23[_0x43e4f5])return _0x679d23[_0x43e4f5]['includes'](_0x33053f);}return![];},VisuMZ['EventsMoveCore'][_0x17a6d5(0x47b)]=Game_Map['prototype'][_0x17a6d5(0x662)],Game_Map[_0x17a6d5(0x2f0)]['refresh']=function(){const _0x4f5f6b=_0x17a6d5;VisuMZ[_0x4f5f6b(0x480)][_0x4f5f6b(0x47b)][_0x4f5f6b(0x496)](this),this[_0x4f5f6b(0x454)]();},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x454)]=function(){const _0x8067a6=_0x17a6d5;this[_0x8067a6(0x2bc)]=![];if(this[_0x8067a6(0x687)]()[_0x8067a6(0x4e1)](_0x223a44=>_0x223a44[_0x8067a6(0x22c)]())){if(_0x8067a6(0x4a3)!=='rVWgC'){const _0x4b5bc3=_0x1aebfa[_0x8067a6(0x49f)](_0x15514f(_0x39da87['$1']));return this[_0x8067a6(0x1e0)](_0x4b5bc3);}else{this[_0x8067a6(0x2bc)]=!![];return;}}if(this['events']()[_0x8067a6(0x4e1)](_0x96b196=>_0x96b196[_0x8067a6(0x50b)]())){this[_0x8067a6(0x2bc)]=!![];return;}if(this[_0x8067a6(0x63c)]['some'](_0x2441c2=>_0x2441c2[_0x8067a6(0x22c)]())){if('hnYLF'!=='hnYLF')this[_0x8067a6(0x498)]['x']=0.5,this['anchor']['y']=0x1;else{this[_0x8067a6(0x2bc)]=!![];return;}}if(this['_commonEvents'][_0x8067a6(0x4e1)](_0x3c7e6b=>_0x3c7e6b[_0x8067a6(0x50b)]())){if('WMkHF'!==_0x8067a6(0x635)){this[_0x8067a6(0x2bc)]=!![];return;}else this['_eventIcon'][_0x8067a6(0x5cc)]=_0x59ca97(_0x587970['$1']);}},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x366)]=Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x566)],Game_Map[_0x17a6d5(0x2f0)]['update']=function(_0x5e384d){const _0x2a62d5=_0x17a6d5;this[_0x2a62d5(0x242)](),VisuMZ[_0x2a62d5(0x480)][_0x2a62d5(0x366)][_0x2a62d5(0x496)](this,_0x5e384d);},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x242)]=function(){const _0x3da869=_0x17a6d5;if(!this['_needsPeriodicRefresh'])return;this[_0x3da869(0x1b2)]=this[_0x3da869(0x1b2)]||0x3c,this[_0x3da869(0x1b2)]--,this[_0x3da869(0x1b2)]<=0x0&&(this[_0x3da869(0x252)](),this[_0x3da869(0x1b2)]=0x3c);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x588)]=Game_Map['prototype']['isDashDisabled'],Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x22a)]=function(){const _0x21fdeb=_0x17a6d5;if(!$gameSystem[_0x21fdeb(0x356)]())return!![];return VisuMZ['EventsMoveCore'][_0x21fdeb(0x588)]['call'](this);},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x295)]=function(){const _0x3019cd=_0x17a6d5;this['_saveEventLocations']=![];const _0x3b8176=$dataMap[_0x3019cd(0x489)]||'';if(_0x3b8176[_0x3019cd(0x5d0)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x3019cd(0x4a1)===_0x3019cd(0x355)){if(this[_0x3019cd(0x2d2)](_0x209c6f,_0x422f2a)[_0x3019cd(0x304)]>0x0)return!![];if(_0x49ccfa['x']===_0x50e122&&_0x5b63f9['y']===_0x1be419)return!![];if(this[_0x3019cd(0x20a)]()[_0x3019cd(0x2cd)](_0x599c1a,_0x397d13))return!![];if(this[_0x3019cd(0x3f6)]()['posNt'](_0x309b74,_0x29ebd6))return!![];return![];}else this['_saveEventLocations']=!![];}},Game_Map['prototype'][_0x17a6d5(0x1cf)]=function(){const _0x5a8d02=_0x17a6d5;if(this[_0x5a8d02(0x235)]===undefined)this[_0x5a8d02(0x295)]();return this[_0x5a8d02(0x235)];},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x19f)]=function(_0x29553c){const _0x190561=_0x17a6d5;_0x29553c!==this[_0x190561(0x461)]()&&$gamePlayer&&(_0x190561(0x26e)!==_0x190561(0x26e)?(_0x441e2a[_0x190561(0x5d7)](_0x48c040,_0x5069ac),_0x310b59['despawnRegions'](_0x12826e[_0x190561(0x1c2)])):$gameSystem['removeTemporaryMapSpawnedEvents'](this['mapId']()));},Game_Map[_0x17a6d5(0x2f0)]['setupSpawnedEvents']=function(){const _0x1644d0=_0x17a6d5;this['_spawnedEvents']=$gameSystem['getMapSpawnedEventData'](this[_0x1644d0(0x461)]()),this['_needsRefresh']=!![];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x435)]=Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x687)],Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x687)]=function(){const _0xc40d91=_0x17a6d5;if(this[_0xc40d91(0x414)])return this['_eventCache'];const _0x1921a5=VisuMZ['EventsMoveCore'][_0xc40d91(0x435)][_0xc40d91(0x496)](this),_0x28c0b6=_0x1921a5[_0xc40d91(0x2d0)](this[_0xc40d91(0x237)]||[]);return this[_0xc40d91(0x414)]=_0x28c0b6['filter'](_0x29ffd4=>!!_0x29ffd4),this[_0xc40d91(0x414)];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x56d)]=Game_Map[_0x17a6d5(0x2f0)]['event'],Game_Map['prototype'][_0x17a6d5(0x49f)]=function(_0x12156c){const _0xdf8dca=_0x17a6d5;return _0x12156c>=0x3e8?(_0x12156c-=0x3e8,this['_spawnedEvents'][_0x12156c]):VisuMZ[_0xdf8dca(0x480)][_0xdf8dca(0x56d)]['call'](this,_0x12156c);},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x263)]=function(_0x52018e){const _0x1c2e2a=_0x17a6d5,_0x479ad6=this[_0x1c2e2a(0x49f)](_0x52018e);if(_0x479ad6)_0x479ad6[_0x1c2e2a(0x18c)]();},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x450)]=function(){const _0x57ff23=_0x17a6d5,_0x38d83f={'template':_0x57ff23(0x238),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x57ff23(0x237)][_0x57ff23(0x304)]+0x3e8};this[_0x57ff23(0x578)](_0x38d83f);},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x3a0)]=function(_0x533bff,_0x27b783){const _0x42e875=_0x17a6d5;if(this['eventsXy'](_0x533bff,_0x27b783)[_0x42e875(0x304)]>0x0)return!![];if($gamePlayer['x']===_0x533bff&&$gamePlayer['y']===_0x27b783)return!![];if(this['boat']()[_0x42e875(0x2cd)](_0x533bff,_0x27b783))return!![];if(this['ship']()[_0x42e875(0x2cd)](_0x533bff,_0x27b783))return!![];return![];},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x240)]=function(_0x18ec74,_0x54033a,_0x4dcd0c){const _0x359d35=_0x17a6d5;$gameTemp['_spawnData']=_0x18ec74;const _0x4714af=new Game_Event(_0x18ec74[_0x359d35(0x461)],_0x18ec74[_0x359d35(0x1ab)]);$gameTemp[_0x359d35(0x5f6)]=undefined,_0x4714af[_0x359d35(0x662)]();let _0x3fbc30=_0x54033a-_0x4714af[_0x359d35(0x288)][_0x359d35(0x189)],_0x42528e=_0x54033a+_0x4714af[_0x359d35(0x288)][_0x359d35(0x17a)],_0xb893a6=_0x4dcd0c-_0x4714af[_0x359d35(0x288)]['up'],_0x57f410=_0x4dcd0c+_0x4714af[_0x359d35(0x288)][_0x359d35(0x246)];for(let _0x2116fe=_0x3fbc30;_0x2116fe<=_0x42528e;_0x2116fe++){for(let _0xd78df8=_0xb893a6;_0xd78df8<=_0x57f410;_0xd78df8++){if(this[_0x359d35(0x3a0)](_0x2116fe,_0xd78df8))return![];}}return!![];},Game_Map['prototype'][_0x17a6d5(0x578)]=function(_0x336372){const _0x782ca2=_0x17a6d5;$gameTemp[_0x782ca2(0x5f6)]=_0x336372;const _0x290e4a=new Game_Event(_0x336372[_0x782ca2(0x461)],_0x336372[_0x782ca2(0x1ab)]);$gameTemp['_spawnData']=undefined,this[_0x782ca2(0x237)][_0x782ca2(0x16c)](_0x290e4a),_0x290e4a[_0x782ca2(0x5c9)](_0x336372),this[_0x782ca2(0x494)]();},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x4d4)]=function(_0x1e7568,_0x55c2e6,_0x1df150){const _0x5ef5df=_0x17a6d5,_0xcbe2b4=_0x1e7568['template']['toUpperCase']()[_0x5ef5df(0x520)]();if(_0xcbe2b4!==_0x5ef5df(0x500)){const _0x153b54=VisuMZ[_0x5ef5df(0x31b)][_0xcbe2b4];_0x153b54&&(_0x1e7568[_0x5ef5df(0x461)]=_0x153b54[_0x5ef5df(0x4fe)],_0x1e7568[_0x5ef5df(0x1ab)]=_0x153b54[_0x5ef5df(0x45b)]);}const _0x49da99=_0x1e7568['x'],_0x525b43=_0x1e7568['y'];if(!this[_0x5ef5df(0x3f3)](_0x49da99,_0x525b43))return![];if(_0x55c2e6){if(this[_0x5ef5df(0x3a0)](_0x49da99,_0x525b43))return![];if(!this[_0x5ef5df(0x240)](_0x1e7568,_0x49da99,_0x525b43))return![];}if(_0x1df150){if(!this[_0x5ef5df(0x5fe)](_0x49da99,_0x525b43))return![];}return this[_0x5ef5df(0x578)](_0x1e7568),!![];},Game_Map[_0x17a6d5(0x2f0)]['prepareSpawnedEventAtRegion']=function(_0x4c1d13,_0x33fae7,_0x5d13eb,_0x59968d){const _0x521ce4=_0x17a6d5,_0x160436=_0x4c1d13[_0x521ce4(0x659)][_0x521ce4(0x43c)]()[_0x521ce4(0x520)]();if(_0x160436!==_0x521ce4(0x500)){const _0x212698=VisuMZ[_0x521ce4(0x31b)][_0x160436];_0x212698&&(_0x521ce4(0x264)!=='acnci'?(_0x4c1d13[_0x521ce4(0x461)]=_0x212698['MapID'],_0x4c1d13[_0x521ce4(0x1ab)]=_0x212698[_0x521ce4(0x45b)]):_0x3734f7(this[_0x521ce4(0x610)][_0x521ce4(0x1a8)](this,_0x2d20fb,_0x5e84ff),0x64));}const _0x2faa75=[],_0xd057f4=this[_0x521ce4(0x4c3)](),_0x515e75=this[_0x521ce4(0x3c8)]();for(let _0x16a5d2=0x0;_0x16a5d2<_0xd057f4;_0x16a5d2++){if(_0x521ce4(0x48f)===_0x521ce4(0x265))this[_0x521ce4(0x57e)]=this[_0x521ce4(0x196)][_0x521ce4(0x20c)](),this[_0x521ce4(0x662)]();else for(let _0x3118f4=0x0;_0x3118f4<_0x515e75;_0x3118f4++){if(!_0x33fae7[_0x521ce4(0x64c)](this[_0x521ce4(0x4cf)](_0x16a5d2,_0x3118f4)))continue;if(!this[_0x521ce4(0x3f3)](_0x16a5d2,_0x3118f4))continue;if(_0x5d13eb){if(this[_0x521ce4(0x3a0)](_0x16a5d2,_0x3118f4))continue;if(!this[_0x521ce4(0x240)](_0x4c1d13,_0x16a5d2,_0x3118f4))continue;}if(_0x59968d){if(!this[_0x521ce4(0x5fe)](_0x16a5d2,_0x3118f4))continue;}_0x2faa75[_0x521ce4(0x16c)]([_0x16a5d2,_0x3118f4]);}}if(_0x2faa75[_0x521ce4(0x304)]>0x0){const _0x4a6219=_0x2faa75[Math[_0x521ce4(0x50a)](_0x2faa75[_0x521ce4(0x304)])];return _0x4c1d13['x']=_0x4a6219[0x0],_0x4c1d13['y']=_0x4a6219[0x1],this[_0x521ce4(0x578)](_0x4c1d13),!![];}return![];},Game_Map[_0x17a6d5(0x2f0)]['prepareSpawnedEventAtTerrainTag']=function(_0xbe6e85,_0x5f2a48,_0x2c43ea,_0x64f2af){const _0x55629e=_0x17a6d5,_0x45b1f5=_0xbe6e85[_0x55629e(0x659)][_0x55629e(0x43c)]()[_0x55629e(0x520)]();if(_0x45b1f5!=='UNTITLED'){if(_0x55629e(0x47a)===_0x55629e(0x5a1)){if([0x2,0x4,0x6,0x8][_0x55629e(0x64c)](_0x4e6fe7))return 0x4;if([0x1,0x3,0x7,0x9][_0x55629e(0x64c)](_0x599105))return 0x5;}else{const _0x447cc8=VisuMZ[_0x55629e(0x31b)][_0x45b1f5];_0x447cc8&&(_0xbe6e85['mapId']=_0x447cc8[_0x55629e(0x4fe)],_0xbe6e85['eventId']=_0x447cc8[_0x55629e(0x45b)]);}}const _0x14ed5e=[],_0x413496=this[_0x55629e(0x4c3)](),_0x17bfd5=this['height']();for(let _0x41e5c7=0x0;_0x41e5c7<_0x413496;_0x41e5c7++){for(let _0x51d26e=0x0;_0x51d26e<_0x17bfd5;_0x51d26e++){if(!_0x5f2a48[_0x55629e(0x64c)](this[_0x55629e(0x22b)](_0x41e5c7,_0x51d26e)))continue;if(!this['isValid'](_0x41e5c7,_0x51d26e))continue;if(_0x2c43ea){if('DnJdq'===_0x55629e(0x627)){if(this['checkExistingEntitiesAt'](_0x41e5c7,_0x51d26e))continue;if(!this[_0x55629e(0x240)](_0xbe6e85,_0x41e5c7,_0x51d26e))continue;}else this[_0x55629e(0x693)][_0x55629e(0x232)]=_0x520b67(_0x45d0ff['$1']),this[_0x55629e(0x693)][_0x55629e(0x3b7)]=_0x23245f(_0x569f45['$2']);}if(_0x64f2af){if(!this[_0x55629e(0x5fe)](_0x41e5c7,_0x51d26e))continue;}_0x14ed5e[_0x55629e(0x16c)]([_0x41e5c7,_0x51d26e]);}}if(_0x14ed5e[_0x55629e(0x304)]>0x0){const _0x4edf48=_0x14ed5e[Math[_0x55629e(0x50a)](_0x14ed5e['length'])];return _0xbe6e85['x']=_0x4edf48[0x0],_0xbe6e85['y']=_0x4edf48[0x1],this[_0x55629e(0x578)](_0xbe6e85),!![];}return![];},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x5fe)]=function(_0x50b934,_0x206fc){const _0x3a012e=_0x17a6d5;if(this[_0x3a012e(0x271)](_0x50b934,_0x206fc,0x2))return!![];if(this[_0x3a012e(0x271)](_0x50b934,_0x206fc,0x4))return!![];if(this['isPassable'](_0x50b934,_0x206fc,0x6))return!![];if(this[_0x3a012e(0x271)](_0x50b934,_0x206fc,0x8))return!![];return![];},Game_Map[_0x17a6d5(0x2f0)]['despawnEventId']=function(_0x407fa8){const _0x3b7353=_0x17a6d5;if(_0x407fa8<0x3e8)return;if(!this[_0x3b7353(0x237)])return;const _0x595ca1=this['event'](_0x407fa8);_0x595ca1[_0x3b7353(0x21b)](-0x1,-0x1),_0x595ca1['erase'](),this[_0x3b7353(0x237)][_0x407fa8-0x3e8]=null,this[_0x3b7353(0x494)]();},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x250)]=function(){const _0x32331b=_0x17a6d5;for(const _0x207134 of this[_0x32331b(0x237)]){if(_0x32331b(0x345)!==_0x32331b(0x650)){if(_0x207134)return _0x207134;}else{const _0x5be4a3=this[_0x32331b(0x604)]();if(!_0x5be4a3)return![];return _0x5be4a3['iconIndex']>0x0;}}return null;},Game_Map[_0x17a6d5(0x2f0)]['firstSpawnedEventID']=function(){const _0x52fe41=_0x17a6d5,_0x5d4bb8=this[_0x52fe41(0x250)]();return _0x5d4bb8?_0x5d4bb8[_0x52fe41(0x25a)]:0x0;},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x262)]=function(){const _0x56af1f=_0x17a6d5,_0xda7b53=this[_0x56af1f(0x237)][_0x56af1f(0x497)](0x0)['reverse']();for(const _0x5b1997 of _0xda7b53){if(_0x5b1997)return _0x5b1997;}return null;},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x59a)]=function(){const _0x180349=_0x17a6d5,_0x53f3f5=this['lastSpawnedEvent']();return _0x53f3f5?_0x53f3f5[_0x180349(0x25a)]:0x0;},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x4ab)]=function(_0x11b6df,_0x4afd3b){const _0x5d3bdf=_0x17a6d5,_0x27ddad=this['eventsXy'](_0x11b6df,_0x4afd3b);for(const _0x4594c0 of _0x27ddad){if(!_0x4594c0)continue;if(_0x4594c0[_0x5d3bdf(0x651)]())this[_0x5d3bdf(0x517)](_0x4594c0['_eventId']);}},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x369)]=function(_0x592e36){const _0x428aad=_0x17a6d5;for(const _0x3653f of this[_0x428aad(0x237)]){if('pWDaF'===_0x428aad(0x457)){if(!_0x3653f)continue;_0x592e36[_0x428aad(0x64c)](_0x3653f[_0x428aad(0x4cf)]())&&this[_0x428aad(0x517)](_0x3653f[_0x428aad(0x25a)]);}else _0x1ddc14[_0x428aad(0x480)][_0x428aad(0x4af)][_0x428aad(0x496)](this),this['updateEventsAndMovementCore']();}},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x671)]=function(_0x1d0e67){const _0x186098=_0x17a6d5;for(const _0x4d6ada of this[_0x186098(0x237)]){if(_0x186098(0x2fb)!==_0x186098(0x2fb)){if(_0xb61376)return _0x3ab9b3;}else{if(!_0x4d6ada)continue;_0x1d0e67[_0x186098(0x64c)](_0x4d6ada[_0x186098(0x22b)]())&&this[_0x186098(0x517)](_0x4d6ada[_0x186098(0x25a)]);}}},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x183)]=function(){const _0x2a6451=_0x17a6d5;for(const _0x12f566 of this[_0x2a6451(0x237)]){if(!_0x12f566)continue;this[_0x2a6451(0x517)](_0x12f566[_0x2a6451(0x25a)]);}},VisuMZ['EventsMoveCore'][_0x17a6d5(0x363)]=Game_Map['prototype'][_0x17a6d5(0x5ef)],Game_Map[_0x17a6d5(0x2f0)]['unlockEvent']=function(_0x3c3051){const _0x488404=_0x17a6d5;VisuMZ[_0x488404(0x480)][_0x488404(0x363)][_0x488404(0x496)](this,_0x3c3051);if(_0x3c3051>=0x3e8){if('aHaQE'===_0x488404(0x3b3)){const _0x189109=_0x340561[_0x488404(0x24d)](this[_0x488404(0x1e9)]());if(_0x189109)return _0x189109[_0x488404(0x1e6)]();}else{const _0x306e19=this[_0x488404(0x49f)](_0x3c3051);if(_0x306e19)_0x306e19['unlock']();}}},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x676)]=function(){const _0x341df4=_0x17a6d5;this[_0x341df4(0x473)]=![],this[_0x341df4(0x3a2)]=![];if(!$dataMap)return;const _0x81f739=$dataMap[_0x341df4(0x489)]||'';if(_0x81f739['match'](/<HIDE PLAYER>/i))this['_forceShowPlayer']=![],this[_0x341df4(0x3a2)]=!![];else _0x81f739[_0x341df4(0x5d0)](/<SHOW PLAYER>/i)&&(this[_0x341df4(0x473)]=!![],this['_forceHidePlayer']=![]);},Game_Map['prototype'][_0x17a6d5(0x331)]=function(){const _0x4686a9=_0x17a6d5;return this[_0x4686a9(0x473)]===undefined&&this[_0x4686a9(0x676)](),this[_0x4686a9(0x473)];},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x24a)]=function(){const _0x1058ec=_0x17a6d5;if(this['_forceHidePlayer']===undefined){if('SuJqY'!==_0x1058ec(0x22f))this[_0x1058ec(0x676)]();else return[0x1,0x3,0x5,0x7,0x9][_0x1058ec(0x64c)](_0x2df768);}return this['_forceHidePlayer'];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x5a3)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x358)],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x358)]=function(){const _0x3a63dd=_0x17a6d5;if(this===$gamePlayer){if($gameMap['isPlayerForceShown']())return![];if($gameMap[_0x3a63dd(0x24a)]())return!![];}return VisuMZ[_0x3a63dd(0x480)][_0x3a63dd(0x5a3)][_0x3a63dd(0x496)](this);},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x44d)]=function(){const _0x220d05=_0x17a6d5;this['_forceShowFollower']=![],this[_0x220d05(0x19b)]=![];if(!$dataMap)return;const _0x486504=$dataMap[_0x220d05(0x489)]||'';if(_0x486504['match'](/<HIDE FOLLOWERS>/i))this['_forceShowFollower']=![],this[_0x220d05(0x19b)]=!![];else{if(_0x486504[_0x220d05(0x5d0)](/<SHOW FOLLOWERS>/i)){if(_0x220d05(0x36c)==='NwbWL')this[_0x220d05(0x5bd)]=!![],this[_0x220d05(0x19b)]=![];else{let _0x297ef3=_0x220d05(0x462)['format'](_0x58975e['mapId']);_0x297ef3+=_0x220d05(0x32d),_0x297ef3+=_0x220d05(0x516),_0x297ef3+=_0x220d05(0x1ec),_0x297ef3+=_0x220d05(0x3c1)[_0x220d05(0x333)](_0x2ff075[_0x220d05(0x461)]),_0x5abbf5(_0x297ef3);return;}}}},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x2e3)]=function(){const _0x1c7b42=_0x17a6d5;return this[_0x1c7b42(0x5bd)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x1c7b42(0x5bd)];},Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x2d4)]=function(){const _0x344955=_0x17a6d5;return this['_forceHideFollower']===undefined&&this[_0x344955(0x44d)](),this[_0x344955(0x19b)];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x3db)]=Game_Followers[_0x17a6d5(0x2f0)][_0x17a6d5(0x577)],Game_Followers[_0x17a6d5(0x2f0)][_0x17a6d5(0x577)]=function(){const _0x34d767=_0x17a6d5;if($gameMap[_0x34d767(0x2e3)]())return!![];if($gameMap[_0x34d767(0x2d4)]())return![];return VisuMZ[_0x34d767(0x480)]['Game_Followers_isVisible'][_0x34d767(0x496)](this);},Game_CommonEvent[_0x17a6d5(0x2f0)][_0x17a6d5(0x22c)]=function(){const _0x53557c=_0x17a6d5,_0x4bf411=this[_0x53557c(0x49f)]();return this[_0x53557c(0x1e7)]()&&_0x4bf411[_0x53557c(0x483)]>=0x1&&DataManager['isAdvancedSwitch'](_0x4bf411[_0x53557c(0x296)]);},Game_CommonEvent[_0x17a6d5(0x2f0)][_0x17a6d5(0x50b)]=function(){const _0x516993=_0x17a6d5;return VisuMZ['EventsMoveCore'][_0x516993(0x1bb)]['_commonEvents'][_0x516993(0x64c)](this[_0x516993(0x475)]);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x502)]=Game_CommonEvent[_0x17a6d5(0x2f0)][_0x17a6d5(0x1e7)],Game_CommonEvent[_0x17a6d5(0x2f0)][_0x17a6d5(0x1e7)]=function(){const _0x1cab45=_0x17a6d5;if(VisuMZ[_0x1cab45(0x480)][_0x1cab45(0x502)][_0x1cab45(0x496)](this))return!![];else{if('rBtmx'===_0x1cab45(0x1d4)){const _0x59e275=this[_0x1cab45(0x49f)]();return VisuMZ['EventsMoveCore'][_0x1cab45(0x1bb)][_0x1cab45(0x571)](this[_0x1cab45(0x49f)]()[_0x1cab45(0x401)],this[_0x1cab45(0x475)],_0x59e275);}else return 0x2;}},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x531)]=Game_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x50d)],Game_Map[_0x17a6d5(0x2f0)]['parallelCommonEvents']=function(){const _0x2ead5b=_0x17a6d5,_0x49e7bc=VisuMZ['EventsMoveCore'][_0x2ead5b(0x531)]['call'](this),_0x22a7ad=VisuMZ[_0x2ead5b(0x480)]['CustomPageConditions']['_commonEvents'][_0x2ead5b(0x44b)](_0x338042=>$dataCommonEvents[_0x338042]);return _0x49e7bc[_0x2ead5b(0x2d0)](_0x22a7ad)[_0x2ead5b(0x1a0)]((_0x343808,_0x45f7e8,_0xe5fa9c)=>_0xe5fa9c[_0x2ead5b(0x408)](_0x343808)===_0x45f7e8);},Game_CharacterBase[_0x17a6d5(0x596)]=VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x429)][_0x17a6d5(0x554)][_0x17a6d5(0x44c)]??![],VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1a5)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x31a)],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x31a)]=function(){const _0x249974=_0x17a6d5;VisuMZ[_0x249974(0x480)]['Game_CharacterBase_initMembers'][_0x249974(0x496)](this),this['initEventsMoveCoreSettings']();},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x59d)]=function(){const _0x3ae6ed=_0x17a6d5;this['_patternLocked']=![],this['clearPose'](),this['clearDashing'](),this[_0x3ae6ed(0x3af)](),this[_0x3ae6ed(0x33b)]();},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x3f0)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x248)],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x248)]=function(){const _0x541b59=_0x17a6d5;let _0x58de3e=VisuMZ[_0x541b59(0x480)][_0x541b59(0x3f0)]['call'](this);return _0x58de3e=this[_0x541b59(0x649)](_0x58de3e),_0x58de3e;},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x649)]=function(_0x2b0373){return _0x2b0373;},Game_CharacterBase[_0x17a6d5(0x2f0)]['isSpriteVS8dir']=function(){const _0xf857ef=_0x17a6d5;if(this[_0xf857ef(0x39f)]===Game_Player&&this['isInVehicle']()){if(_0xf857ef(0x20e)===_0xf857ef(0x609))_0x1b74ad[_0xf857ef(0x480)]['Game_System_initialize']['call'](this),this[_0xf857ef(0x4a0)](),this[_0xf857ef(0x681)]();else return this['vehicle']()[_0xf857ef(0x3c0)]()['match'](/\[VS8\]/i);}else{if(Imported['VisuMZ_2_DragonbonesUnion']&&this[_0xf857ef(0x34f)]()){if(_0xf857ef(0x51e)!==_0xf857ef(0x51e))_0xbd23a3[_0xf857ef(0x480)][_0xf857ef(0x47b)][_0xf857ef(0x496)](this),this[_0xf857ef(0x454)]();else return!![];}else return this[_0xf857ef(0x3c0)]()[_0xf857ef(0x5d0)](/\[VS8\]/i);}},VisuMZ['EventsMoveCore'][_0x17a6d5(0x540)]=Game_CharacterBase['prototype']['direction'],Game_CharacterBase['prototype']['direction']=function(){const _0x3cedd9=_0x17a6d5;if(!$dataMap)return this[_0x3cedd9(0x691)]||0x2;if(this[_0x3cedd9(0x2cb)]()&&!this[_0x3cedd9(0x346)]()&&this[_0x3cedd9(0x455)]())return _0x3cedd9(0x623)!=='tjdff'?this['directionOnLadderSpriteVS8dir']():(this[_0x3cedd9(0x4d1)]=![],![]);else{if(this[_0x3cedd9(0x2cb)]()&&!this[_0x3cedd9(0x346)]())return 0x8;else{if(this[_0x3cedd9(0x5a5)]()&&this[_0x3cedd9(0x455)]())return this[_0x3cedd9(0x683)]();else{if(_0x3cedd9(0x67f)!==_0x3cedd9(0x453))return VisuMZ[_0x3cedd9(0x480)][_0x3cedd9(0x540)]['call'](this);else{this['_poseDuration']--;if(this['_poseDuration']<=0x0&&this['_pose']!=='ZZZ')this[_0x3cedd9(0x452)]();}}}}},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x51c)]=Game_CharacterBase[_0x17a6d5(0x2f0)]['setDirection'],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x4d7)]=function(_0x1a70ab){const _0x471e34=_0x17a6d5;if(!this[_0x471e34(0x455)]())_0x1a70ab=this[_0x471e34(0x18e)](_0x1a70ab);VisuMZ[_0x471e34(0x480)][_0x471e34(0x51c)][_0x471e34(0x496)](this,_0x1a70ab),this[_0x471e34(0x4ac)]();},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x18e)]=function(_0x23ca2d){const _0xe83a7f=_0x17a6d5;if(_0x23ca2d===0x1)return this[_0xe83a7f(0x344)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x23ca2d===0x3)return this[_0xe83a7f(0x344)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x23ca2d===0x7)return this[_0xe83a7f(0x344)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x23ca2d===0x9)return this[_0xe83a7f(0x344)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x23ca2d;},Game_CharacterBase['prototype']['isDiagonalDirection']=function(_0x2ff3e3){const _0x2184b3=_0x17a6d5;return[0x1,0x3,0x5,0x7,0x9][_0x2184b3(0x64c)](_0x2ff3e3);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x273)]=function(){const _0x171d49=_0x17a6d5;return this[_0x171d49(0x197)]||0x0;},VisuMZ['EventsMoveCore']['Game_CharacterBase_moveStraight']=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x1d9)],Game_CharacterBase['prototype'][_0x17a6d5(0x1d9)]=function(_0x552fd5){const _0x5c314f=_0x17a6d5;this[_0x5c314f(0x197)]=_0x552fd5,VisuMZ[_0x5c314f(0x480)][_0x5c314f(0x54b)][_0x5c314f(0x496)](this,_0x552fd5);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x482)]=function(_0xecae46){const _0x2050ce=_0x17a6d5;if(!this['isDiagonalDirection'](_0xecae46))return this[_0x2050ce(0x1d9)](_0xecae46);let _0x3d0348=0x0,_0x59d9a0=0x0;switch(_0xecae46){case 0x1:_0x3d0348=0x4,_0x59d9a0=0x2;break;case 0x3:_0x3d0348=0x6,_0x59d9a0=0x2;break;case 0x7:_0x3d0348=0x4,_0x59d9a0=0x8;break;case 0x9:_0x3d0348=0x6,_0x59d9a0=0x8;break;}if(VisuMZ[_0x2050ce(0x480)][_0x2050ce(0x429)][_0x2050ce(0x554)][_0x2050ce(0x208)]){if(_0x2050ce(0x404)===_0x2050ce(0x192))for(const _0x5e32ce of _0x25d219){const _0x32695d='%1%2'[_0x2050ce(0x333)](_0x5e32ce,_0x34d7b9);_0x2ac91b[_0x32695d]&&(_0x5bba56[_0x32695d]=_0x4bda68[_0x32695d][_0x2050ce(0x497)](0x0));}else{if(!this[_0x2050ce(0x344)](this['_x'],this['_y'],_0x3d0348))return this['moveStraight'](_0x59d9a0);if(!this[_0x2050ce(0x344)](this['_x'],this['_y'],_0x59d9a0))return this[_0x2050ce(0x1d9)](_0x3d0348);if(!this[_0x2050ce(0x193)](this['_x'],this['_y'],_0x3d0348,_0x59d9a0)){if(_0x2050ce(0x657)!==_0x2050ce(0x16d)){let _0x2e647b=VisuMZ['EventsMoveCore']['Settings'][_0x2050ce(0x554)][_0x2050ce(0x504)]?_0x3d0348:_0x59d9a0;return this['moveStraight'](_0x2e647b);}else{if(!_0x2539f1[_0x2050ce(0x356)]())return!![];return _0x33cedd[_0x2050ce(0x480)][_0x2050ce(0x588)]['call'](this);}}}}this[_0x2050ce(0x197)]=_0xecae46,this['moveDiagonally'](_0x3d0348,_0x59d9a0);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x63b)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x1e6)],Game_CharacterBase['prototype'][_0x17a6d5(0x1e6)]=function(){const _0x4c66b5=_0x17a6d5;let _0x498314=this[_0x4c66b5(0x62e)];if(this[_0x4c66b5(0x5ce)]()){if(_0x4c66b5(0x216)!==_0x4c66b5(0x216))return this[_0x4c66b5(0x2ef)](_0x4047ab['$1'],_0x257bbf['$2']);else _0x498314+=this[_0x4c66b5(0x600)]();}return this[_0x4c66b5(0x385)](_0x498314);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x600)]=function(){const _0x47d6b1=_0x17a6d5,_0x4dd400=VisuMZ['EventsMoveCore'][_0x47d6b1(0x429)][_0x47d6b1(0x554)];if(_0x4dd400[_0x47d6b1(0x5df)]!==undefined){if(_0x47d6b1(0x440)!==_0x47d6b1(0x694))return _0x4dd400['DashModifier'];else _0x22fe46[_0x47d6b1(0x480)]['Game_Switches_setValue'][_0x47d6b1(0x496)](this,_0x49f595,_0x3a7798);}else return VisuMZ[_0x47d6b1(0x480)]['Game_CharacterBase_realMoveSpeed'][_0x47d6b1(0x496)](this)-this[_0x47d6b1(0x62e)];},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x385)]=function(_0x388d83){const _0x1c9878=_0x17a6d5,_0x9a8ff6=VisuMZ[_0x1c9878(0x480)][_0x1c9878(0x429)][_0x1c9878(0x554)];if(!_0x9a8ff6['SlowerSpeed'])return _0x388d83;return[0x1,0x3,0x7,0x9][_0x1c9878(0x64c)](this[_0x1c9878(0x197)])&&(_0x1c9878(0x277)==='IGhBf'?_0x388d83*=_0x9a8ff6['DiagonalSpeedMultiplier']||0.01:this[_0x1c9878(0x688)]()),_0x388d83;},VisuMZ['EventsMoveCore'][_0x17a6d5(0x562)]=Game_CharacterBase['prototype'][_0x17a6d5(0x5ce)],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x5ce)]=function(){const _0x39df4e=_0x17a6d5;if(!Game_CharacterBase['ALLOW_LADDER_DASH']&&this['isOnLadder']())return![];if(this[_0x39df4e(0x2ff)])return!![];return VisuMZ[_0x39df4e(0x480)][_0x39df4e(0x562)][_0x39df4e(0x496)](this);},Game_CharacterBase[_0x17a6d5(0x2f0)]['isDashingAndMoving']=function(){const _0x24ce7b=_0x17a6d5;return this[_0x24ce7b(0x5ce)]()&&this['_stopCount']===0x0;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x4ff)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x2ad)],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x2ad)]=function(){const _0x574875=_0x17a6d5;return this[_0x574875(0x5a5)]()?this[_0x574875(0x549)]():VisuMZ['EventsMoveCore'][_0x574875(0x4ff)][_0x574875(0x496)](this);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x243)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x4c0)],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x4c0)]=function(){const _0x4c4cbe=_0x17a6d5;VisuMZ[_0x4c4cbe(0x480)][_0x4c4cbe(0x243)]['call'](this),this['clearPose']();},VisuMZ[_0x17a6d5(0x480)]['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x319)],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x319)]=function(){const _0x3d7c39=_0x17a6d5;if(this[_0x3d7c39(0x455)]())return this[_0x3d7c39(0x25b)]();return VisuMZ[_0x3d7c39(0x480)][_0x3d7c39(0x629)][_0x3d7c39(0x496)](this);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x25b)]=function(){const _0x51b502=_0x17a6d5,_0x41a038=this[_0x51b502(0x50c)]();if(this[_0x51b502(0x346)]()){if([0x2,0x4,0x6,0x8][_0x51b502(0x64c)](_0x41a038))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x41a038))return 0x5;}else{if(this['isOnLadder']())return 0x6;else{if(this[_0x51b502(0x5a5)]())return this[_0x51b502(0x2dc)]();else{if(this[_0x51b502(0x433)]){if([0x2,0x4,0x6,0x8][_0x51b502(0x64c)](_0x41a038))return 0x4;if([0x1,0x3,0x7,0x9][_0x51b502(0x64c)](_0x41a038))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x51b502(0x434)]()){if([0x2,0x4,0x6,0x8][_0x51b502(0x64c)](_0x41a038))return 0x4;if([0x1,0x3,0x7,0x9][_0x51b502(0x64c)](_0x41a038))return 0x5;}else{if(this[_0x51b502(0x57f)]()){if([0x2,0x4,0x6,0x8][_0x51b502(0x64c)](_0x41a038))return 0x2;if([0x1,0x3,0x7,0x9][_0x51b502(0x64c)](_0x41a038))return 0x3;}else{if('OGQcN'!==_0x51b502(0x30d)){if(_0x3142e2[_0x51b502(0x669)][_0x51b502(0x39f)]===_0x28973f)return![];return _0x3a7805[_0x51b502(0x60a)]['includes'](_0x10b739);}else{if([0x2,0x4,0x6,0x8][_0x51b502(0x64c)](_0x41a038))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x41a038))return 0x1;}}}}}}}},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x434)]=function(){const _0x467e44=_0x17a6d5;return VisuMZ['EventsMoveCore'][_0x467e44(0x429)][_0x467e44(0x553)][_0x467e44(0x584)];},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x5d6)]=function(){const _0x259600=_0x17a6d5;return this[_0x259600(0x2cb)]()&&this['terrainTag']()===VisuMZ['EventsMoveCore'][_0x259600(0x429)][_0x259600(0x298)][_0x259600(0x51d)];},Game_CharacterBase[_0x17a6d5(0x2f0)]['directionOnLadderSpriteVS8dir']=function(){const _0x561a2a=_0x17a6d5;return this[_0x561a2a(0x5d6)]()?0x4:0x2;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x30f)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x566)],Game_CharacterBase[_0x17a6d5(0x2f0)]['update']=function(){const _0x44a7c8=_0x17a6d5;VisuMZ[_0x44a7c8(0x480)][_0x44a7c8(0x30f)][_0x44a7c8(0x496)](this),this[_0x44a7c8(0x1ce)]();},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x1ce)]=function(){const _0x46f220=_0x17a6d5;this[_0x46f220(0x4ad)]=this[_0x46f220(0x4ad)]||0x0;if(this[_0x46f220(0x4ad)]>0x0){if('mykiE'!==_0x46f220(0x69f))_0x53bb32[_0x46f220(0x480)]['Sprite_Balloon_updatePosition']['call'](this),this['updateVS8BalloonOffsets']();else{this[_0x46f220(0x4ad)]--;if(this[_0x46f220(0x4ad)]<=0x0&&this[_0x46f220(0x441)]!==_0x46f220(0x312))this[_0x46f220(0x452)]();}}},VisuMZ['EventsMoveCore'][_0x17a6d5(0x201)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x2a8)],Game_CharacterBase[_0x17a6d5(0x2f0)]['moveDiagonally']=function(_0x134c11,_0x1321d5){const _0x2229a3=_0x17a6d5;VisuMZ[_0x2229a3(0x480)][_0x2229a3(0x201)][_0x2229a3(0x496)](this,_0x134c11,_0x1321d5);if(this[_0x2229a3(0x455)]())this[_0x2229a3(0x1ca)](_0x134c11,_0x1321d5);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x1ca)]=function(_0x316b64,_0xe856ca){const _0x3b8863=_0x17a6d5;if(_0x316b64===0x4&&_0xe856ca===0x2)this[_0x3b8863(0x4d7)](0x1);if(_0x316b64===0x6&&_0xe856ca===0x2)this[_0x3b8863(0x4d7)](0x3);if(_0x316b64===0x4&&_0xe856ca===0x8)this[_0x3b8863(0x4d7)](0x7);if(_0x316b64===0x6&&_0xe856ca===0x8)this['setDirection'](0x9);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x29b)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x4ed)],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x4ed)]=function(){const _0x31f66=_0x17a6d5;if(this['isPosing']()&&this[_0x31f66(0x367)]()===_0x31f66(0x312))return!![];return VisuMZ[_0x31f66(0x480)][_0x31f66(0x29b)][_0x31f66(0x496)](this);},Game_CharacterBase[_0x17a6d5(0x2f0)]['setPose']=function(_0x2c7a98,_0x3c675f){const _0x4243dc=_0x17a6d5;if(_0x2c7a98[_0x4243dc(0x5d0)](/Z/i))_0x2c7a98=_0x4243dc(0x312);if(_0x2c7a98[_0x4243dc(0x5d0)](/SLEEP/i))_0x2c7a98=_0x4243dc(0x312);if(this[_0x4243dc(0x455)]()){if(_0x4243dc(0x3be)===_0x4243dc(0x3be))this[_0x4243dc(0x441)]=_0x2c7a98[_0x4243dc(0x43c)]()[_0x4243dc(0x520)](),this[_0x4243dc(0x4ad)]=_0x3c675f||Infinity;else return!!this['mapValue'](_0x37dc51);}},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x367)]=function(){const _0x2a6f27=_0x17a6d5;return this[_0x2a6f27(0x455)]()?(this[_0x2a6f27(0x441)]||'')[_0x2a6f27(0x43c)]()[_0x2a6f27(0x520)]():''[_0x2a6f27(0x43c)]()['trim']();},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x490)]=function(_0x500a98,_0x2e5a08){const _0xb6f509=_0x17a6d5;if(this[_0xb6f509(0x455)]()){const _0x3e3e5=['',_0xb6f509(0x4db),_0xb6f509(0x64a),'MUSIC\x20NOTE',_0xb6f509(0x5d2),'ANGER',_0xb6f509(0x5b9),_0xb6f509(0x658),_0xb6f509(0x4ec),_0xb6f509(0x23b),_0xb6f509(0x312),'','','','',''][_0x500a98];this['setPose'](_0x3e3e5,_0x2e5a08);}},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x452)]=function(){const _0x579b9d=_0x17a6d5;this[_0x579b9d(0x441)]='',this[_0x579b9d(0x4ad)]=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){const _0x32dc6d=_0x17a6d5;return this[_0x32dc6d(0x455)]()&&!!this[_0x32dc6d(0x441)];},Game_CharacterBase[_0x17a6d5(0x2f0)]['getPosingCharacterIndex']=function(){const _0x314a18=_0x17a6d5,_0x30dbfa=this[_0x314a18(0x441)]['toUpperCase']();switch(this[_0x314a18(0x441)][_0x314a18(0x43c)]()['trim']()){case _0x314a18(0x173):case _0x314a18(0x4fb):case'VICTORY':case _0x314a18(0x67d):case _0x314a18(0x2a1):case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x17a6d5(0x683)]=function(){const _0x48a6cf=_0x17a6d5;switch(this[_0x48a6cf(0x441)][_0x48a6cf(0x43c)]()){case'EXCLAMATION':case'QUESTION':case _0x48a6cf(0x17e):case'!':case'?':return 0x2;break;case _0x48a6cf(0x5d2):case _0x48a6cf(0x514):case'SWEAT':return 0x4;break;case _0x48a6cf(0x173):case _0x48a6cf(0x4fb):case _0x48a6cf(0x643):case _0x48a6cf(0x658):case _0x48a6cf(0x4ec):case _0x48a6cf(0x23b):return 0x6;break;case'HURT':case _0x48a6cf(0x2a1):case _0x48a6cf(0x46d):case _0x48a6cf(0x312):case _0x48a6cf(0x481):return 0x8;break;default:return VisuMZ[_0x48a6cf(0x480)]['Game_CharacterBase_setDirection'][_0x48a6cf(0x496)](this);break;}},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x549)]=function(){const _0x4b6832=_0x17a6d5;switch(this[_0x4b6832(0x441)]['toUpperCase']()){case'ITEM':case _0x4b6832(0x67d):case'EXCLAMATION':case'!':case _0x4b6832(0x5d2):case _0x4b6832(0x658):return 0x0;break;case _0x4b6832(0x4fb):case _0x4b6832(0x2a1):case _0x4b6832(0x64a):case'?':case _0x4b6832(0x514):case _0x4b6832(0x4ec):return 0x1;break;case _0x4b6832(0x643):case _0x4b6832(0x46d):case _0x4b6832(0x17e):case _0x4b6832(0x5b9):case _0x4b6832(0x23b):return 0x2;break;default:return VisuMZ[_0x4b6832(0x480)][_0x4b6832(0x4ff)][_0x4b6832(0x496)](this);break;}},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x4ce)]=function(){const _0x38ce36=_0x17a6d5;this[_0x38ce36(0x433)]=!![];},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x2a6)]=function(){const _0x2606f0=_0x17a6d5;this[_0x2606f0(0x433)]=![];},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x534)]=function(){const _0x17a589=_0x17a6d5;this[_0x17a589(0x2ff)]=!![];},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x368)]=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x3d4)]=function(){const _0x559855=_0x17a6d5;if(this[_0x559855(0x302)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x559855(0x3cb)]==='')return![];if(this[_0x559855(0x39f)]===Game_Vehicle)return![];if(this[_0x559855(0x358)]())return![];return!![];},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x3cc)]=function(){const _0x134897=_0x17a6d5;if(this[_0x134897(0x2cb)]())return!![];if(this[_0x134897(0x39f)]===Game_Player&&this[_0x134897(0x2a2)]())return!![];return![];},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x3d8)]=function(){const _0x60206=_0x17a6d5;return VisuMZ[_0x60206(0x480)][_0x60206(0x429)][_0x60206(0x554)]['DefaultShadow'];},Game_CharacterBase['prototype']['shadowX']=function(){const _0x46d571=_0x17a6d5;return this[_0x46d571(0x436)]();},Game_CharacterBase[_0x17a6d5(0x2f0)]['shadowY']=function(){const _0x54d4ba=_0x17a6d5,_0x282114=$gameMap[_0x54d4ba(0x406)]();return Math['floor'](this[_0x54d4ba(0x348)]()*_0x282114+_0x282114);},Game_CharacterBase[_0x17a6d5(0x4d8)]=0x64,Game_CharacterBase['prototype'][_0x17a6d5(0x4f9)]=function(_0x2c50df,_0xff57f5){const _0x4db951=_0x17a6d5;if(TouchInput['isPressed']())return![];if(!$gameMap[_0x4db951(0x320)]())return![];if($gameMap['eventsXyNt'](_0x2c50df,_0xff57f5)[_0x4db951(0x304)]>0x0)return![];if(!$gameMap[_0x4db951(0x5fe)](_0x2c50df,_0xff57f5))return![];const _0x525939=$gameMap[_0x4db951(0x48d)][_0x4db951(0x304)];if(_0x525939>=Game_CharacterBase[_0x4db951(0x4d8)])return![];return!![];},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x1c4)]=function(_0x308659,_0x271408){const _0x3a96b2=_0x17a6d5;let _0x16ea0c=this['findDirectionTo'](_0x308659,_0x271408);if(!this[_0x3a96b2(0x4f9)](_0x308659,_0x271408))return _0x16ea0c;if(this[_0x3a96b2(0x59e)](_0x308659,_0x271408))return _0x16ea0c;const _0x4ace49=_0x16ea0c;if(_0x16ea0c===0x2){if(_0x3a96b2(0x3d7)!==_0x3a96b2(0x1b7)){if(_0x308659>this['x']&&this[_0x3a96b2(0x344)](this['x'],this['y'],0x6))_0x16ea0c=0x3;if(_0x308659<this['x']&&this[_0x3a96b2(0x344)](this['x'],this['y'],0x4))_0x16ea0c=0x1;}else{const _0x281fd0=this[_0x3a96b2(0x506)](_0x526882,_0x6fdb6e,![]);if(_0x281fd0)this[_0x3a96b2(0x4d7)](_0x281fd0);}}else{if(_0x16ea0c===0x4){if(_0x271408>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x16ea0c=0x1;if(_0x271408<this['y']&&this[_0x3a96b2(0x344)](this['x'],this['y'],0x6))_0x16ea0c=0x7;}else{if(_0x16ea0c===0x6){if(_0x271408>this['y']&&this[_0x3a96b2(0x344)](this['x'],this['y'],0x4))_0x16ea0c=0x3;if(_0x271408<this['y']&&this[_0x3a96b2(0x344)](this['x'],this['y'],0x6))_0x16ea0c=0x9;}else{if(_0x16ea0c===0x8){if(_0x308659>this['x']&&this[_0x3a96b2(0x344)](this['x'],this['y'],0x6))_0x16ea0c=0x9;if(_0x308659<this['x']&&this['canPass'](this['x'],this['y'],0x4))_0x16ea0c=0x7;}}}}const _0xa849f7=$gameMap[_0x3a96b2(0x400)](this['x'],_0x16ea0c),_0x1b2fc1=$gameMap['roundYWithDirection'](this['y'],_0x16ea0c);if(this[_0x3a96b2(0x59e)](_0xa849f7,_0x1b2fc1))_0x16ea0c=_0x4ace49;return _0x16ea0c;},VisuMZ[_0x17a6d5(0x480)]['Game_CharacterBase_canPass']=Game_CharacterBase[_0x17a6d5(0x2f0)]['canPass'],Game_CharacterBase[_0x17a6d5(0x2f0)]['canPass']=function(_0x19e664,_0x7182f5,_0x16a109){const _0x238001=_0x17a6d5;return this[_0x238001(0x5b2)]===_0x238001(0x5fa)?this[_0x238001(0x5e0)]()[_0x238001(0x64e)](_0x19e664,_0x7182f5,_0x16a109):VisuMZ[_0x238001(0x480)][_0x238001(0x556)][_0x238001(0x496)](this,_0x19e664,_0x7182f5,_0x16a109);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x3af)]=function(){const _0x4b6ea1=_0x17a6d5;this[_0x4b6ea1(0x209)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x2b0)]=Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x436)],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x436)]=function(){const _0x409813=_0x17a6d5;return VisuMZ['EventsMoveCore'][_0x409813(0x2b0)][_0x409813(0x496)](this)+(this[_0x409813(0x209)]||0x0);},VisuMZ[_0x17a6d5(0x480)]['Game_CharacterBase_screenY']=Game_CharacterBase[_0x17a6d5(0x2f0)]['screenY'],Game_CharacterBase['prototype']['screenY']=function(){const _0x724361=_0x17a6d5;return VisuMZ[_0x724361(0x480)]['Game_CharacterBase_screenY'][_0x724361(0x496)](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase[_0x17a6d5(0x64b)]=VisuMZ[_0x17a6d5(0x480)]['Settings']['Movement'][_0x17a6d5(0x32a)]??-0x6,Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x513)]=function(){const _0x59d197=_0x17a6d5;return this[_0x59d197(0x4b0)]()?0x0:-Game_CharacterBase['DEFAULT_SHIFT_Y'];},Game_CharacterBase['prototype'][_0x17a6d5(0x33b)]=function(){const _0x122362=_0x17a6d5;this[_0x122362(0x417)]='';},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x2ed)]=Game_CharacterBase[_0x17a6d5(0x2f0)]['updatePattern'],Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x5a2)]=function(){const _0x42b06d=_0x17a6d5;if(this[_0x42b06d(0x628)])return;if(this[_0x42b06d(0x39e)]())return;VisuMZ['EventsMoveCore'][_0x42b06d(0x2ed)][_0x42b06d(0x496)](this);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x39e)]=function(){const _0x4db4ee=_0x17a6d5;if(!this[_0x4db4ee(0x4ed)]()&&this[_0x4db4ee(0x1d2)]>0x0)return![];switch(String(this[_0x4db4ee(0x417)])[_0x4db4ee(0x43c)]()[_0x4db4ee(0x520)]()){case'LEFT\x20TO\x20RIGHT':this[_0x4db4ee(0x5f2)]+=0x1;if(this['_pattern']>0x2)this[_0x4db4ee(0x20b)](0x0);break;case _0x4db4ee(0x205):this[_0x4db4ee(0x5f2)]-=0x1;if(this[_0x4db4ee(0x5f2)]<0x0)this[_0x4db4ee(0x20b)](0x2);break;case _0x4db4ee(0x3f2):case _0x4db4ee(0x4be):this['turnRight90']();break;case _0x4db4ee(0x36d):case _0x4db4ee(0x4e4):case'SPIN\x20ANTICLOCKWISE':case _0x4db4ee(0x5d4):this[_0x4db4ee(0x65b)]();break;default:return![];}return!![];},Game_CharacterBase['prototype']['getEventIconData']=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x626)]=function(){const _0x33e2dc=_0x17a6d5,_0x2d91ce=this[_0x33e2dc(0x604)]();if(!_0x2d91ce)return![];return _0x2d91ce[_0x33e2dc(0x3a4)]>0x0;},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x477)]=function(){const _0x354314=_0x17a6d5,_0x55776c=this['direction']();return $gameMap[_0x354314(0x400)](this['x'],_0x55776c);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x34b)]=function(){const _0x4396db=_0x17a6d5,_0x56d303=this[_0x4396db(0x50c)]();return $gameMap['roundYWithDirection'](this['y'],_0x56d303);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x42c)]=function(){const _0x48df5a=_0x17a6d5,_0x1a5a64=this[_0x48df5a(0x5fc)](this[_0x48df5a(0x50c)]());return $gameMap['roundXWithDirection'](this['x'],_0x1a5a64);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x4d3)]=function(){const _0x45813e=_0x17a6d5,_0x3e30f3=this[_0x45813e(0x5fc)](this[_0x45813e(0x50c)]());return $gameMap[_0x45813e(0x5f0)](this['y'],_0x3e30f3);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x4eb)]=function(){const _0x3c9b63=_0x17a6d5,_0x3a8d1c=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x3c9b63(0x50c)]()];return $gameMap[_0x3c9b63(0x400)](this['x'],_0x3a8d1c);},Game_CharacterBase['prototype'][_0x17a6d5(0x24c)]=function(){const _0x5a7aee=_0x17a6d5,_0x4b0cec=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap[_0x5a7aee(0x5f0)](this['y'],_0x4b0cec);},Game_CharacterBase[_0x17a6d5(0x2f0)]['cwX']=function(){const _0x227c25=_0x17a6d5,_0x250fcf=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x227c25(0x50c)]()];return $gameMap[_0x227c25(0x400)](this['x'],_0x250fcf);},Game_CharacterBase[_0x17a6d5(0x2f0)]['cwY']=function(){const _0x569ae0=_0x17a6d5,_0x2258d7=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x569ae0(0x50c)]()];return $gameMap[_0x569ae0(0x5f0)](this['y'],_0x2258d7);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x181)]=Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x666)],Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x666)]=function(_0x2a111b){const _0x2f86a9=_0x17a6d5;route=JsonEx[_0x2f86a9(0x547)](_0x2a111b),VisuMZ[_0x2f86a9(0x480)][_0x2f86a9(0x181)][_0x2f86a9(0x496)](this,route);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x3fb)]=Game_Character[_0x17a6d5(0x2f0)]['forceMoveRoute'],Game_Character['prototype'][_0x17a6d5(0x2b7)]=function(_0x590311){const _0x3613cb=_0x17a6d5;route=JsonEx[_0x3613cb(0x547)](_0x590311),VisuMZ[_0x3613cb(0x480)]['Game_Character_forceMoveRoute']['call'](this,route);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x2b5)]=Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x471)],Game_Character[_0x17a6d5(0x2f0)]['processMoveCommand']=function(_0x1a7c88){const _0x3e73d8=_0x17a6d5,_0x215d9b=Game_Character,_0x1e0800=_0x1a7c88['parameters'];if(_0x1a7c88['code']===_0x215d9b[_0x3e73d8(0x428)]){if(_0x3e73d8(0x1b0)!=='TSCey'){let _0x366c28=_0x1a7c88[_0x3e73d8(0x16e)][0x0];_0x366c28=this['convertVariableValuesInScriptCall'](_0x366c28),_0x366c28=this['convertSelfVariableValuesInScriptCall'](_0x366c28),this[_0x3e73d8(0x65a)](_0x1a7c88,_0x366c28);}else{const _0x2bd2d6=this[_0x3e73d8(0x3bf)][_0x3e73d8(0x461)],_0xfcc9b1=this['_eventMorphData'][_0x3e73d8(0x1ab)];return _0xa24a7d[_0x3e73d8(0x4d2)](_0x2bd2d6,_0xfcc9b1);}}else VisuMZ[_0x3e73d8(0x480)][_0x3e73d8(0x2b5)][_0x3e73d8(0x496)](this,_0x1a7c88);},Game_Character[_0x17a6d5(0x2f0)]['convertVariableValuesInScriptCall']=function(_0x46a4dc){const _0xa81bbc=_0x17a6d5,_0x1baf8f=/\$gameVariables\.value\((\d+)\)/gi,_0x5dc856=/\\V\[(\d+)\]/gi;while(_0x46a4dc[_0xa81bbc(0x5d0)](_0x1baf8f)){'gjxuW'!=='ZFFsf'?_0x46a4dc=_0x46a4dc[_0xa81bbc(0x384)](_0x1baf8f,(_0x1674b4,_0x59805c)=>$gameVariables[_0xa81bbc(0x347)](parseInt(_0x59805c))):this['_target'][_0xa81bbc(0x200)]['isSpriteVS8dir']()&&(this['x']+=_0x3ca08b[_0xa81bbc(0x480)][_0xa81bbc(0x429)][_0xa81bbc(0x553)]['BalloonOffsetX'],this['y']+=_0x15cab1[_0xa81bbc(0x480)][_0xa81bbc(0x429)][_0xa81bbc(0x553)][_0xa81bbc(0x67a)]);}while(_0x46a4dc[_0xa81bbc(0x5d0)](_0x5dc856)){_0x46a4dc=_0x46a4dc[_0xa81bbc(0x384)](_0x5dc856,(_0x5cd405,_0x73b61c)=>$gameVariables[_0xa81bbc(0x347)](parseInt(_0x73b61c)));}return _0x46a4dc;},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x2ee)]=function(_0x46caea){const _0x57004c=_0x17a6d5,_0x36600f=/\\SELFVAR\[(\d+)\]/gi;while(_0x46caea['match'](_0x36600f)){_0x57004c(0x206)!==_0x57004c(0x206)?_0xca2fd8['clear']():_0x46caea=_0x46caea['replace'](_0x36600f,(_0x1fc06d,_0x22bdc0)=>getSelfVariableValue(this[_0x57004c(0x45a)],this['_eventId'],parseInt(_0x22bdc0)));}return _0x46caea;},Game_Character[_0x17a6d5(0x2f0)]['processMoveCommandEventsMoveCore']=function(_0x44bba1,_0x30bc07){const _0x441503=_0x17a6d5;if(_0x30bc07[_0x441503(0x5d0)](/ANIMATION:[ ](\d+)/i))return this['processMoveRouteAnimation'](Number(RegExp['$1']));if(_0x30bc07[_0x441503(0x5d0)](/BALLOON:[ ](.*)/i)){if(_0x441503(0x4e9)!==_0x441503(0x55c))return this[_0x441503(0x512)](String(RegExp['$1']));else{if(this[_0x441503(0x628)])return;if(this[_0x441503(0x39e)]())return;_0x57be56[_0x441503(0x480)][_0x441503(0x2ed)][_0x441503(0x496)](this);}}if(_0x30bc07[_0x441503(0x5d0)](/FADE IN:[ ](\d+)/i))return this[_0x441503(0x251)](Number(RegExp['$1']));if(_0x30bc07['match'](/FADE OUT:[ ](\d+)/i))return this[_0x441503(0x4da)](Number(RegExp['$1']));if(_0x30bc07[_0x441503(0x5d0)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x441503(0x351)!==_0x441503(0x351)){const _0x254e0c=this[_0x441503(0x402)](_0x4e6901,_0x2e2e96,![]);if(_0x254e0c)this[_0x441503(0x4d7)](_0x254e0c);}else return this['forceCarrying']();}if(_0x30bc07[_0x441503(0x5d0)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)){if(_0x441503(0x46a)===_0x441503(0x46a))return this[_0x441503(0x2a6)]();else{this['_saveEventLocations']=![];const _0x89b1d4=_0x28d15b[_0x441503(0x489)]||'';_0x89b1d4[_0x441503(0x5d0)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x441503(0x235)]=!![]);}}if(_0x30bc07['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i)){if(_0x441503(0x5da)!==_0x441503(0x5da))this[_0x441503(0x27e)](_0x3a266a);else return this[_0x441503(0x534)]();}if(_0x30bc07[_0x441503(0x5d0)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i)){if(_0x441503(0x207)===_0x441503(0x207))return this['clearDashing']();else{if(_0x6a03bd<0x3e8)return;if(!this[_0x441503(0x237)])return;const _0x3f3257=this[_0x441503(0x49f)](_0x380c76);_0x3f3257['locate'](-0x1,-0x1),_0x3f3257[_0x441503(0x18c)](),this['_spawnedEvents'][_0x43e50b-0x3e8]=null,this[_0x441503(0x494)]();}}if(_0x30bc07[_0x441503(0x5d0)](/HUG:[ ]LEFT/i))return this['processMoveRouteHugWall']('left');if(_0x30bc07[_0x441503(0x5d0)](/HUG:[ ]RIGHT/i))return this['processMoveRouteHugWall'](_0x441503(0x17a));if(_0x30bc07[_0x441503(0x5d0)](/INDEX:[ ](\d+)/i))return this[_0x441503(0x599)](Number(RegExp['$1']));if(_0x30bc07[_0x441503(0x5d0)](/INDEX:[ ]([\+\-]\d+)/i)){if('LIUiu'==='nXdlx'){if(!this[_0x441503(0x375)][_0x441503(0x4f8)])return![];return _0x38bc4e[_0x441503(0x2f0)]['isShadowVisible'][_0x441503(0x496)](this);}else{const _0x58359d=this['_characterIndex']+Number(RegExp['$1']);return this[_0x441503(0x599)](_0x58359d);}}if(_0x30bc07[_0x441503(0x5d0)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x441503(0x258)](Number(RegExp['$1']));if(_0x30bc07[_0x441503(0x5d0)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x441503(0x699)!==_0x441503(0x1ff))return this[_0x441503(0x163)](Number(RegExp['$1']),Number(RegExp['$2']));else this[_0x441503(0x35f)][_0x441503(0x3b7)]=_0x1b9ef8(_0x3baf5b['$1']);}if(_0x30bc07[_0x441503(0x5d0)](/JUMP TO EVENT:[ ](\d+)/i)){if(_0x441503(0x5bf)!==_0x441503(0x5bf))return this['moveAwayFromCharacter'](_0x3769fe);else{const _0x1b9bd6=$gameMap[_0x441503(0x49f)](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x1b9bd6);}}if(_0x30bc07[_0x441503(0x5d0)](/JUMP TO PLAYER/i))return this[_0x441503(0x40a)]($gamePlayer);if(_0x30bc07[_0x441503(0x5d0)](/JUMP TO HOME/i)&&this[_0x441503(0x1ab)]){const _0xfbceb4=this[_0x441503(0x30b)],_0x5cda31=this['_randomHomeY'];return this[_0x441503(0x163)](_0xfbceb4,_0x5cda31);}if(_0x30bc07[_0x441503(0x5d0)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if('lCBCd'===_0x441503(0x247)){const _0x1bd2eb=String(RegExp['$1']),_0x545c4a=this[_0x441503(0x353)](_0x30bc07);return this[_0x441503(0x37a)](_0x1bd2eb,_0x545c4a);}else{if(!_0x4ec16a[_0x441503(0x480)][_0x441503(0x429)]['Movement'][_0x441503(0x589)])return;this['rotation']=0x0;if(this['isAllowCharacterTilt']()){const _0x5e937f=_0x34f279[_0x441503(0x480)]['Settings']['Movement'],_0x2214ea=this[_0x441503(0x200)][_0x441503(0x50c)]();let _0x3050b5=0x0;if([0x1,0x4,0x7][_0x441503(0x64c)](_0x2214ea))_0x3050b5=_0x5e937f[_0x441503(0x169)];if([0x3,0x6,0x9][_0x441503(0x64c)](_0x2214ea))_0x3050b5=_0x5e937f[_0x441503(0x415)];[0x2,0x8]['includes'](_0x2214ea)&&(_0x3050b5=[-_0x5e937f[_0x441503(0x4b8)],0x0,_0x5e937f[_0x441503(0x4b8)]][this[_0x441503(0x200)]['pattern']()]);if(this['_reflection'])_0x3050b5*=-0x1;this[_0x441503(0x474)]=_0x3050b5;}}}if(_0x30bc07['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x441503(0x272)===_0x441503(0x272)){const _0x24165f=Number(RegExp['$1']),_0x430b88=Number(RegExp['$2']),_0x1429f3=this[_0x441503(0x353)](_0x30bc07);return this[_0x441503(0x229)](_0x24165f,_0x430b88,_0x1429f3);}else return _0x63fa60>0x0?0x8:0x2;}if(_0x30bc07['match'](/MOVE TO EVENT:[ ](\d+)/i)){const _0x51d299=$gameMap[_0x441503(0x49f)](Number(RegExp['$1'])),_0x5f41ae=this['checkCollisionKeywords'](_0x30bc07);return this[_0x441503(0x3ca)](_0x51d299,_0x5f41ae);}if(_0x30bc07[_0x441503(0x5d0)](/MOVE TO PLAYER/i)){const _0x2b664d=this[_0x441503(0x353)](_0x30bc07);return this['processMoveRouteMoveToCharacter']($gamePlayer,_0x2b664d);}if(_0x30bc07['match'](/MOVE TO HOME/i)&&this[_0x441503(0x1ab)]){if(_0x441503(0x225)===_0x441503(0x42f))this[_0x441503(0x628)]=![],this[_0x441503(0x452)](),this[_0x441503(0x368)](),this[_0x441503(0x3af)](),this[_0x441503(0x33b)]();else{const _0x151a8e=this[_0x441503(0x30b)],_0x3719c7=this['_randomHomeY'],_0x5ef51e=this['checkCollisionKeywords'](_0x30bc07);return this['processMoveRouteMoveTo'](_0x151a8e,_0x3719c7,_0x5ef51e);}}if(_0x30bc07[_0x441503(0x5d0)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x441503(0x60f)](0x1,Number(RegExp['$1']));if(_0x30bc07[_0x441503(0x5d0)](/MOVE DOWN:[ ](\d+)/i))return this[_0x441503(0x60f)](0x2,Number(RegExp['$1']));if(_0x30bc07[_0x441503(0x5d0)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x441503(0x60f)](0x3,Number(RegExp['$1']));if(_0x30bc07[_0x441503(0x5d0)](/MOVE LEFT:[ ](\d+)/i)){if('SKVgu'!=='SKVgu'){_0xd90928[_0x441503(0x480)][_0x441503(0x201)][_0x441503(0x496)](this,_0x1e8448,_0x5eeabc);if(this['isSpriteVS8dir']())this[_0x441503(0x1ca)](_0x5c0001,_0x267d15);}else return this[_0x441503(0x60f)](0x4,Number(RegExp['$1']));}if(_0x30bc07['match'](/MOVE RIGHT:[ ](\d+)/i))return this[_0x441503(0x60f)](0x6,Number(RegExp['$1']));if(_0x30bc07['match'](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x30bc07[_0x441503(0x5d0)](/MOVE UP:[ ](\d+)/i))return this[_0x441503(0x60f)](0x8,Number(RegExp['$1']));if(_0x30bc07[_0x441503(0x5d0)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x441503(0x60f)](0x9,Number(RegExp['$1']));if(_0x30bc07['match'](/OPACITY:[ ](\d+)([%％])/i)){const _0xcb71e8=Math[_0x441503(0x582)](Number(RegExp['$1'])/0x64*0xff);return this[_0x441503(0x2de)](_0xcb71e8[_0x441503(0x1fa)](0x0,0xff));}if(_0x30bc07[_0x441503(0x5d0)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x2e57ea=this[_0x441503(0x431)]+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x441503(0x2de)](_0x2e57ea[_0x441503(0x1fa)](0x0,0xff));}if(_0x30bc07[_0x441503(0x5d0)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x2788a8=this[_0x441503(0x431)]+Number(RegExp['$1']);return this[_0x441503(0x2de)](_0x2788a8[_0x441503(0x1fa)](0x0,0xff));}if(_0x30bc07[_0x441503(0x5d0)](/PATTERN LOCK:[ ](\d+)/i)){if(_0x441503(0x424)!==_0x441503(0x575))return this[_0x441503(0x4b6)](Number(RegExp['$1']));else{if(_0x5d2e1e[_0x441503(0x5ab)])this['setMoveSpeed'](_0x97d6e1['AirshipSpeed']);}}if(_0x30bc07[_0x441503(0x5d0)](/PATTERN UNLOCK/i))return this[_0x441503(0x628)]=![];if(_0x30bc07['match'](/POSE:[ ](.*)/i)){if(_0x441503(0x212)!=='nmJGN'){const _0x1274b2=String(RegExp['$1'])[_0x441503(0x43c)]()['trim']();return this[_0x441503(0x587)](_0x1274b2);}else return _0x31959b[_0x441503(0x604)](this)?_0x21f500[_0x441503(0x2f0)][_0x441503(0x604)]['call'](this):{'iconIndex':0x0,'bufferX':_0x33a567[_0x441503(0x3b0)][_0x441503(0x1fb)],'bufferY':_0x2b52a3[_0x441503(0x3b0)]['BufferY'],'blendMode':_0x2dcffb[_0x441503(0x3b0)][_0x441503(0x211)]};}if(_0x30bc07['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x1ad6b1=Number(RegExp['$1']),_0x4f2e3e=Number(RegExp['$2']);return this[_0x441503(0x1bd)](_0x1ad6b1,_0x4f2e3e);}if(_0x30bc07[_0x441503(0x5d0)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x13d6aa=$gameMap[_0x441503(0x49f)](Number(RegExp['$1']));return this[_0x441503(0x28f)](_0x13d6aa);}if(_0x30bc07['match'](/STEP TOWARD PLAYER/i)){if(_0x441503(0x1f6)!==_0x441503(0x1f6)){_0x203ca6[_0x441503(0x5d7)](_0x2d9904,_0x5d4173);const _0x5ceb58=_0x56d53c[_0x441503(0x34e)];_0x3da7f5['setControlledFollowerID'](_0x5ceb58);}else return this[_0x441503(0x28f)]($gamePlayer);}if(_0x30bc07[_0x441503(0x5d0)](/STEP TOWARD HOME/i)&&this[_0x441503(0x1ab)]){if(_0x441503(0x5ec)!=='PsPdH'){const _0x22c8ad=this['_randomHomeX'],_0x489a54=this[_0x441503(0x291)];return this['processMoveRouteStepTo'](_0x22c8ad,_0x489a54);}else _0x2a8241=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];}if(_0x30bc07[_0x441503(0x5d0)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return _0x441503(0x380)!==_0x441503(0x380)?_0x373c7c['setFrame'](0x0,0x0,0x0,0x0):this[_0x441503(0x485)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x30bc07[_0x441503(0x5d0)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x131b05=$gameMap[_0x441503(0x49f)](Number(RegExp['$1']));return this[_0x441503(0x51f)](_0x131b05);}if(_0x30bc07[_0x441503(0x5d0)](/STEP AWAY FROM PLAYER/i)){if(_0x441503(0x309)!==_0x441503(0x309)){if(_0x36a39c[_0x441503(0x669)]['constructor']===_0x3e3e31)return![];return _0x4b825e[_0x441503(0x603)][_0x441503(0x64c)](_0x46a295);}else return this[_0x441503(0x51f)]($gamePlayer);}if(_0x30bc07[_0x441503(0x5d0)](/STEP AWAY FROM HOME/i)&&this[_0x441503(0x1ab)]){const _0x300923=this[_0x441503(0x30b)],_0x2d1b51=this['_randomHomeY'];return this[_0x441503(0x485)](_0x300923,_0x2d1b51);}if(_0x30bc07['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x441503(0x28d)!==_0x441503(0x28d)){const _0x4d581e=_0x48ae74[_0x441503(0x69d)],_0x11afe7=_0x3c06d6[_0x441503(0x4c6)],_0x14cd26=_0x242d93%0x10*_0x4d581e,_0x1c6463=_0x20c18c[_0x441503(0x2ab)](_0x28f510/0x10)*_0x11afe7;_0x2353de[_0x441503(0x6a1)](_0x14cd26,_0x1c6463,_0x4d581e,_0x11afe7),this['visible']=!![];}else return this[_0x441503(0x55e)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x30bc07[_0x441503(0x5d0)](/TURN TO EVENT:[ ](\d+)/i)){if('AdnZR'!==_0x441503(0x2ca)){const _0x21b67d=$gameMap[_0x441503(0x49f)](Number(RegExp['$1']));return this[_0x441503(0x2e9)](_0x21b67d);}else{if(this[_0x441503(0x4dd)])return;if(_0x358c07[_0x441503(0x177)]())return;_0x1fc368[_0x441503(0x480)][_0x441503(0x591)][_0x441503(0x496)](this,_0x2090e6),this[_0x441503(0x3e6)]=!![];}}if(_0x30bc07[_0x441503(0x5d0)](/TURN TO PLAYER/i)){if(_0x441503(0x29c)!==_0x441503(0x525))return this['turnTowardCharacter']($gamePlayer);else{_0x5bc40c[_0x441503(0x5d7)](_0x279e70,_0x45e6d2);const _0xde8d9a=_0x4083b1[_0x441503(0x25f)]();_0x4aabf3['MapId']=_0x5bf6a0[_0x441503(0x1db)]||_0x20b803[_0x441503(0x461)](),_0x1538b8[_0x441503(0x24b)](_0x4b6216[_0x441503(0x1db)],_0x532060['EventId']||_0xde8d9a[_0x441503(0x1ab)]());}}if(_0x30bc07[_0x441503(0x5d0)](/TURN TO HOME/i)&&this[_0x441503(0x1ab)]){const _0x4b92f6=this[_0x441503(0x30b)],_0x5a238a=this[_0x441503(0x291)];return this[_0x441503(0x55a)](_0x4b92f6,_0x5a238a);}if(_0x30bc07[_0x441503(0x5d0)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x441503(0x17b)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x30bc07['match'](/TURN AWAY FROM EVENT:[ ](\d+)/i)){if('EUVnJ'!==_0x441503(0x4c9)){const _0x20bc48=$gameMap[_0x441503(0x49f)](Number(RegExp['$1']));return this[_0x441503(0x3f5)](_0x20bc48);}else _0x1d617e[_0x441503(0x5d7)](_0x29fc48,_0x1f31aa),_0x18f20b['setPlayerControlDisable'](!_0x45bdf1[_0x441503(0x5c0)]);}if(_0x30bc07[_0x441503(0x5d0)](/TURN AWAY FROM PLAYER/i)){if('pbbQT'===_0x441503(0x35c))_0x29dfe8!==this['mapId']()&&_0x29165e&&_0x853574[_0x441503(0x19f)](this[_0x441503(0x461)]());else return this['turnAwayFromCharacter']($gamePlayer);}if(_0x30bc07['match'](/TURN AWAY FROM HOME/i)&&this['eventId']){if(_0x441503(0x56f)!==_0x441503(0x1e1)){const _0x244a11=this[_0x441503(0x30b)],_0x2eeb06=this[_0x441503(0x291)];return this[_0x441503(0x17b)](_0x244a11,_0x2eeb06);}else return _0x280e5d[_0x441503(0x1b9)][_0x441503(0x64c)](_0xb6c845)||_0x2d5e49[_0x441503(0x2d3)][_0x441503(0x64c)](_0x406f0d);}if(_0x30bc07[_0x441503(0x5d0)](/TURN LOWER LEFT/i))return this[_0x441503(0x4d7)](0x1);if(_0x30bc07[_0x441503(0x5d0)](/TURN LOWER RIGHT/i))return this[_0x441503(0x4d7)](0x3);if(_0x30bc07['match'](/TURN UPPER LEFT/i)){if(_0x441503(0x26b)===_0x441503(0x26b))return this['setDirection'](0x7);else{const _0x29a0c5=this[_0x441503(0x49f)](_0x440685);if(_0x29a0c5)_0x29a0c5[_0x441503(0x18c)]();}}if(_0x30bc07['match'](/TURN UPPER RIGHT/i)){if(_0x441503(0x2a0)!=='nRqdd'){const _0x186637=_0x1bfae3[_0x441503(0x582)](_0x131d44(_0x34ed95['$1'])/0x64*0xff);return this[_0x441503(0x2de)](_0x186637[_0x441503(0x1fa)](0x0,0xff));}else return this['setDirection'](0x9);}if(_0x30bc07[_0x441503(0x5d0)](/Self Switch[ ](.*):[ ](.*)/i))return _0x441503(0x35e)!==_0x441503(0x510)?this[_0x441503(0x2ef)](RegExp['$1'],RegExp['$2']):_0x3d367e[_0x441503(0x583)]&&_0x53ca1f[_0x441503(0x326)][_0x441503(0x64c)]('['+_0x42404d+']');if(_0x30bc07[_0x441503(0x5d0)](/Self Variable[ ](.*):[ ](.*)/i))return _0x441503(0x2fc)===_0x441503(0x4a8)?this[_0x441503(0x60f)](0x2,_0x563ee5(_0x5678b7['$1'])):this['processMoveRouteSelfVariable'](RegExp['$1'],RegExp['$2']);if(_0x30bc07[_0x441503(0x5d0)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x30bc07['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){if('bkeFP'===_0x441503(0x222)){const _0x5d3327=$gameMap[_0x441503(0x49f)](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x5d3327);}else{const _0x4679d9=this[_0x441503(0x501)];_0x4679d9['x']=this[_0x441503(0x200)][_0x441503(0x5ac)](),_0x4679d9['y']=this[_0x441503(0x200)][_0x441503(0x315)](),_0x4679d9[_0x441503(0x16a)]=this['_character'][_0x441503(0x5f5)]();}}if(_0x30bc07['match'](/TELEPORT TO PLAYER/i))return this[_0x441503(0x1e0)]($gamePlayer);if(_0x30bc07['match'](/TELEPORT TO HOME/i)&&this[_0x441503(0x1ab)]){const _0xe11ec4=this[_0x441503(0x30b)],_0x4230e4=this[_0x441503(0x291)];return this[_0x441503(0x606)](_0xe11ec4,_0x4230e4);}try{if(_0x441503(0x488)===_0x441503(0x488))VisuMZ[_0x441503(0x480)][_0x441503(0x2b5)][_0x441503(0x496)](this,_0x44bba1);else return _0x529ed6[_0x441503(0x376)](),!![];}catch(_0x441e78){if('yaeTA'!==_0x441503(0x46b)){if($gameTemp[_0x441503(0x3a8)]())console[_0x441503(0x559)](_0x441e78);}else _0x28f99b=this[_0x441503(0x1c4)](_0x4bd5ae,_0x21ff58);}},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x2c0)]=function(_0x46c720){const _0x9c9dab=_0x17a6d5;$gameTemp[_0x9c9dab(0x425)]([this],_0x46c720);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x512)]=function(_0x3e234c){const _0x4f1785=_0x17a6d5;let _0x3d23c4=0x0;switch(_0x3e234c[_0x4f1785(0x43c)]()['trim']()){case'!':case _0x4f1785(0x4db):_0x3d23c4=0x1;break;case'?':case _0x4f1785(0x64a):_0x3d23c4=0x2;break;case _0x4f1785(0x564):case _0x4f1785(0x300):case _0x4f1785(0x17e):case'MUSIC-NOTE':case _0x4f1785(0x509):_0x3d23c4=0x3;break;case'HEART':case _0x4f1785(0x416):_0x3d23c4=0x4;break;case _0x4f1785(0x514):_0x3d23c4=0x5;break;case _0x4f1785(0x5b9):_0x3d23c4=0x6;break;case'COBWEB':case _0x4f1785(0x1ed):case _0x4f1785(0x35d):_0x3d23c4=0x7;break;case _0x4f1785(0x4ec):case _0x4f1785(0x5c4):_0x3d23c4=0x8;break;case _0x4f1785(0x16f):case _0x4f1785(0x305):case'LIGHT\x20BULB':case _0x4f1785(0x307):case _0x4f1785(0x180):_0x3d23c4=0x9;break;case'Z':case'ZZ':case _0x4f1785(0x312):case _0x4f1785(0x481):_0x3d23c4=0xa;break;case'USER-DEFINED\x201':_0x3d23c4=0xb;break;case _0x4f1785(0x231):_0x3d23c4=0xc;break;case _0x4f1785(0x4ef):_0x3d23c4=0xd;break;case _0x4f1785(0x523):_0x3d23c4=0xe;break;case _0x4f1785(0x40d):_0x3d23c4=0xf;break;}$gameTemp[_0x4f1785(0x2fe)](this,_0x3d23c4);},Game_Character['prototype']['processMoveRouteFadeIn']=function(_0xc12932){const _0x5e81f4=_0x17a6d5;_0xc12932+=this[_0x5e81f4(0x431)],this[_0x5e81f4(0x2de)](_0xc12932[_0x5e81f4(0x1fa)](0x0,0xff));if(this[_0x5e81f4(0x431)]<0xff)this[_0x5e81f4(0x47c)]--;},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x4da)]=function(_0x1f0666){const _0x93a963=_0x17a6d5;_0x1f0666=this[_0x93a963(0x431)]-_0x1f0666,this['setOpacity'](_0x1f0666[_0x93a963(0x1fa)](0x0,0xff));if(this[_0x93a963(0x431)]>0x0)this[_0x93a963(0x47c)]--;},Game_Character['prototype']['processMoveRouteHugWall']=function(_0x4caed0){const _0x514b9a=_0x17a6d5,_0x5bfaad=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x206b64=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x1ba327=this[_0x514b9a(0x50c)](),_0x3ee095=(_0x4caed0===_0x514b9a(0x189)?_0x5bfaad:_0x206b64)[_0x1ba327],_0x28f7b2=(_0x4caed0===_0x514b9a(0x189)?_0x206b64:_0x5bfaad)[_0x1ba327];if(this['canPass'](this['x'],this['y'],_0x3ee095)){if('HqgMx'!==_0x514b9a(0x68b))this['updateTilt'](),this[_0x514b9a(0x668)](),this[_0x514b9a(0x41f)](),this[_0x514b9a(0x528)](),this[_0x514b9a(0x49a)](),this[_0x514b9a(0x1a2)]();else{if(_0x4caed0===_0x514b9a(0x189)){if(_0x514b9a(0x2a7)!==_0x514b9a(0x2a7)){if(this[_0x514b9a(0x5a5)]()&&this[_0x514b9a(0x367)]()===_0x514b9a(0x312))return!![];return _0x485311[_0x514b9a(0x480)][_0x514b9a(0x29b)][_0x514b9a(0x496)](this);}else this[_0x514b9a(0x65b)]();}else this[_0x514b9a(0x688)]();}}else!this[_0x514b9a(0x344)](this['x'],this['y'],this['direction']())&&(_0x514b9a(0x576)===_0x514b9a(0x576)?this[_0x514b9a(0x344)](this['x'],this['y'],_0x28f7b2)?_0x4caed0===_0x514b9a(0x189)?this[_0x514b9a(0x688)]():this[_0x514b9a(0x65b)]():this[_0x514b9a(0x37c)]():(this['_spriteOffsetX']=0x0,this[_0x514b9a(0x2ce)]=0x0));this[_0x514b9a(0x344)](this['x'],this['y'],this[_0x514b9a(0x50c)]())&&this['moveForward']();},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x599)]=function(_0x18b47d){const _0x2a9db5=_0x17a6d5;if(ImageManager[_0x2a9db5(0x2f2)](this[_0x2a9db5(0x3cb)]))return;_0x18b47d=_0x18b47d[_0x2a9db5(0x1fa)](0x0,0x7),this['setImage'](this[_0x2a9db5(0x3cb)],_0x18b47d);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x258)]=function(_0x37ed31){const _0x441243=_0x17a6d5;switch(this[_0x441243(0x50c)]()){case 0x1:this[_0x441243(0x519)](-_0x37ed31,_0x37ed31);break;case 0x2:this[_0x441243(0x519)](0x0,_0x37ed31);break;case 0x3:this[_0x441243(0x519)](_0x37ed31,_0x37ed31);break;case 0x4:this[_0x441243(0x519)](-_0x37ed31,0x0);break;case 0x6:this[_0x441243(0x519)](_0x37ed31,0x0);break;case 0x7:this[_0x441243(0x519)](-_0x37ed31,-_0x37ed31);break;case 0x8:this['jump'](0x0,-_0x37ed31);break;case 0x9:this[_0x441243(0x519)](_0x37ed31,-_0x37ed31);break;}},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x163)]=function(_0x52f462,_0x5d815f){const _0x2ac90f=_0x17a6d5,_0x173ebf=Math['round'](_0x52f462-this['x']),_0x378c43=Math[_0x2ac90f(0x582)](_0x5d815f-this['y']);this[_0x2ac90f(0x519)](_0x173ebf,_0x378c43);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x40a)]=function(_0x459369){const _0x223950=_0x17a6d5;if(_0x459369)this[_0x223950(0x163)](_0x459369['x'],_0x459369['y']);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x1bd)]=function(_0x505360,_0x8efdf7,_0x2e2cdc){const _0x37f579=_0x17a6d5;let _0x356b40=0x0;if(_0x2e2cdc)$gameTemp['_moveAllowPlayerCollision']=!![];$gameMap[_0x37f579(0x320)]()?_0x356b40=this['findDiagonalDirectionTo'](_0x505360,_0x8efdf7):_0x356b40=this[_0x37f579(0x4cd)](_0x505360,_0x8efdf7);if(_0x2e2cdc)$gameTemp[_0x37f579(0x17d)]=![];this[_0x37f579(0x482)](_0x356b40),this[_0x37f579(0x234)](!![]);},Game_Character['prototype'][_0x17a6d5(0x28f)]=function(_0x1744a2){const _0x2ea4b0=_0x17a6d5;if(_0x1744a2)this[_0x2ea4b0(0x1bd)](_0x1744a2['x'],_0x1744a2['y']);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x1ba)]=function(_0x328081,_0x10dbc4){const _0x3f0e1c=_0x17a6d5,_0x475d0f=this[_0x3f0e1c(0x287)](_0x328081),_0x423943=this[_0x3f0e1c(0x39a)](_0x10dbc4);},Game_Character['prototype'][_0x17a6d5(0x353)]=function(_0x3ad801){const _0xc2cce3=_0x17a6d5;if(_0x3ad801[_0xc2cce3(0x5d0)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x3ad801['match'](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x3bb)]=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x278)],Game_Event['prototype'][_0x17a6d5(0x278)]=function(_0x1d75f6,_0x5e8877){const _0x1ffd8b=_0x17a6d5;if($gameTemp['_moveAllowPlayerCollision'])return![];return VisuMZ[_0x1ffd8b(0x480)][_0x1ffd8b(0x3bb)][_0x1ffd8b(0x496)](this,_0x1d75f6,_0x5e8877);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x37a)]=function(_0x2a3a64,_0x3a0011){const _0x323af5=_0x17a6d5,_0x25bb79=['','LOWER\x20LEFT',_0x323af5(0x5c6),'LOWER\x20RIGHT',_0x323af5(0x54c),'',_0x323af5(0x236),_0x323af5(0x690),'UP',_0x323af5(0x5c1)],_0x2d240c=_0x25bb79[_0x323af5(0x408)](_0x2a3a64[_0x323af5(0x43c)]()[_0x323af5(0x520)]());if(_0x2d240c<=0x0)return;if(_0x3a0011)$gameTemp['_moveAllowPlayerCollision']=!![];if(this['canPass'](this['x'],this['y'],_0x2d240c)){if(_0x3a0011)$gameTemp[_0x323af5(0x17d)]=![];this[_0x323af5(0x482)](_0x2d240c),this[_0x323af5(0x47c)]-=0x1;}if(_0x3a0011)$gameTemp[_0x323af5(0x17d)]=![];},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x229)]=function(_0x4a5f3f,_0x60180e,_0x28bb8a){const _0x2ec834=_0x17a6d5;this[_0x2ec834(0x1bd)](_0x4a5f3f,_0x60180e,_0x28bb8a);if(this['x']!==_0x4a5f3f||this['y']!==_0x60180e)this[_0x2ec834(0x47c)]--;},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x3ca)]=function(_0x1154a2,_0x2e211c){const _0x5ef45e=_0x17a6d5;if(_0x1154a2&&!_0x1154a2['_erased']){if(_0x5ef45e(0x569)!==_0x5ef45e(0x569))_0x2aec67('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5ef45e(0x333)](_0x37e5d0,_0x3cba21,_0x3e54ed)),_0x9c3d89[_0x5ef45e(0x3aa)]();else{this[_0x5ef45e(0x229)](_0x1154a2['x'],_0x1154a2['y'],_0x2e211c);if(_0x1154a2[_0x5ef45e(0x392)]()&&this[_0x5ef45e(0x392)]()){if(_0x5ef45e(0x53e)!==_0x5ef45e(0x53e)){if(this['canPass'](this['x'],this['y'],_0x22593f))_0xbfc60b[_0x5ef45e(0x16c)](_0x535b84);}else{const _0x3a52bd=$gameMap[_0x5ef45e(0x4bd)](this['x'],this['y'],_0x1154a2['x'],_0x1154a2['y']);if(_0x3a52bd<=0x1)this[_0x5ef45e(0x47c)]++;}}}}},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x60f)]=function(_0x4bc6dc,_0xbd5a7d){const _0x261ccb=_0x17a6d5;_0xbd5a7d=_0xbd5a7d||0x0;const _0x5b7647={'code':0x1,'indent':null,'parameters':[]};_0x5b7647['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x4bc6dc],this[_0x261ccb(0x5d9)][_0x261ccb(0x1e2)][this[_0x261ccb(0x47c)]][_0x261ccb(0x16e)][0x0]='';while(_0xbd5a7d--){this[_0x261ccb(0x5d9)]['list'][_0x261ccb(0x438)](this[_0x261ccb(0x47c)]+0x1,0x0,_0x5b7647);}},Game_Character[_0x17a6d5(0x2f0)]['processMoveRoutePatternLock']=function(_0x32ece3){const _0x2a86ac=_0x17a6d5;this[_0x2a86ac(0x628)]=!![],this[_0x2a86ac(0x20b)](_0x32ece3);},Game_Character['prototype'][_0x17a6d5(0x2ef)]=function(_0x421dca,_0x3b1a5){const _0x39c469=_0x17a6d5;if(this===$gamePlayer)return;const _0x109825=[this[_0x39c469(0x45a)],this['_eventId'],'A'];if(_0x421dca['match'](/\b[ABCD]\b/i)){if(_0x39c469(0x283)==='HERpx')_0x109825[0x2]=String(_0x421dca)['charAt'](0x0)[_0x39c469(0x43c)]()[_0x39c469(0x520)]();else{if(_0x46a282[_0x39c469(0x40f)][_0x3f93ac][_0x39c469(0x5d0)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x322541[_0x39c469(0x60a)][_0x39c469(0x16c)](_0x25461d);if(_0x2fd075[_0x39c469(0x40f)][_0x610aa0]['match'](/<SELF>/i))_0x2424da['SelfVariables'][_0x39c469(0x16c)](_0x3b0689);if(_0x11b170['variables'][_0x35754d][_0x39c469(0x5d0)](/<MAP>/i))_0x171902[_0x39c469(0x53b)][_0x39c469(0x16c)](_0x44fe95);}}else{if(_0x39c469(0x299)===_0x39c469(0x655)){const _0x1a2936=[_0x285ec4,_0x461bc3,_0x39c469(0x24f)['format'](_0x4f067e)];_0x3b5344['setValue'](_0x1a2936,_0x4fd0cc);}else _0x109825[0x2]=_0x39c469(0x36e)[_0x39c469(0x333)](_0x421dca);}switch(_0x3b1a5[_0x39c469(0x43c)]()[_0x39c469(0x520)]()){case'ON':case'TRUE':$gameSelfSwitches[_0x39c469(0x17c)](_0x109825,!![]);break;case _0x39c469(0x228):case _0x39c469(0x39d):$gameSelfSwitches[_0x39c469(0x17c)](_0x109825,![]);break;case'TOGGLE':$gameSelfSwitches['setValue'](_0x109825,!$gameSelfSwitches[_0x39c469(0x347)](_0x109825));break;}},Game_Character[_0x17a6d5(0x2f0)]['processMoveRouteSelfVariable']=function(_0x3daa99,_0x1409ea){const _0x4ca372=_0x17a6d5;if(this===$gamePlayer)return;const _0x1d06d0=[this[_0x4ca372(0x45a)],this[_0x4ca372(0x25a)],_0x4ca372(0x24f)[_0x4ca372(0x333)](_0x3daa99)];$gameSelfSwitches[_0x4ca372(0x17c)](_0x1d06d0,Number(_0x1409ea));},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x606)]=function(_0x1c406c,_0x3c9e17){const _0x4ab498=_0x17a6d5;this[_0x4ab498(0x21b)](_0x1c406c,_0x3c9e17);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x1e0)]=function(_0x4b4bda){if(_0x4b4bda)this['processMoveRouteTeleportTo'](_0x4b4bda['x'],_0x4b4bda['y']);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x688)]=function(){const _0x190327=_0x17a6d5;switch(this['direction']()){case 0x1:this[_0x190327(0x4d7)](0x7);break;case 0x2:this[_0x190327(0x4d7)](0x4);break;case 0x3:this[_0x190327(0x4d7)](0x1);break;case 0x4:this[_0x190327(0x4d7)](0x8);break;case 0x6:this['setDirection'](0x2);break;case 0x7:this[_0x190327(0x4d7)](0x9);break;case 0x8:this[_0x190327(0x4d7)](0x6);break;case 0x9:this[_0x190327(0x4d7)](0x3);break;}},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x65b)]=function(){const _0x198f6e=_0x17a6d5;switch(this[_0x198f6e(0x50c)]()){case 0x1:this[_0x198f6e(0x4d7)](0x3);break;case 0x2:this[_0x198f6e(0x4d7)](0x6);break;case 0x3:this[_0x198f6e(0x4d7)](0x9);break;case 0x4:this[_0x198f6e(0x4d7)](0x2);break;case 0x6:this['setDirection'](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this[_0x198f6e(0x4d7)](0x4);break;case 0x9:this[_0x198f6e(0x4d7)](0x7);break;}},Game_Character[_0x17a6d5(0x2f0)]['getDirectionToPoint']=function(_0x53ca97,_0x2fcf58,_0x2e0b11){const _0x553c75=_0x17a6d5,_0xa24ded=this[_0x553c75(0x287)](_0x53ca97),_0x4cbfa7=this[_0x553c75(0x39a)](_0x2fcf58);if($gameMap[_0x553c75(0x320)]()){if(_0x553c75(0x5ba)==='lOJbk'){if(_0x2e0b11||this['isSpriteVS8dir']()){if(_0x553c75(0x332)===_0x553c75(0x332)){if(_0xa24ded>0x0&&_0x4cbfa7<0x0)return 0x1;if(_0xa24ded<0x0&&_0x4cbfa7<0x0)return 0x3;if(_0xa24ded>0x0&&_0x4cbfa7>0x0)return 0x7;if(_0xa24ded<0x0&&_0x4cbfa7>0x0)return 0x9;}else _0x9ef0d4[_0x553c75(0x480)][_0x553c75(0x5cd)][_0x553c75(0x496)](this,_0x449a16,_0xe1165a);}}else return this[_0x553c75(0x3cb)]&&this['_characterName'][_0x553c75(0x5d0)](/\[VS8\]/i);}if(Math[_0x553c75(0x595)](_0xa24ded)>Math[_0x553c75(0x595)](_0x4cbfa7))return _0xa24ded>0x0?0x4:0x6;else{if(_0x4cbfa7!==0x0)return _0x4cbfa7>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype'][_0x17a6d5(0x506)]=function(_0x97538a,_0x116722,_0xd7a910){const _0x103026=_0x17a6d5,_0x58fc66=this['deltaXFrom'](_0x97538a),_0x167a66=this[_0x103026(0x39a)](_0x116722);if($gameMap[_0x103026(0x320)]()){if(_0xd7a910||this[_0x103026(0x455)]()){if(_0x103026(0x661)===_0x103026(0x661)){if(_0x58fc66>0x0&&_0x167a66<0x0)return 0x9;if(_0x58fc66<0x0&&_0x167a66<0x0)return 0x7;if(_0x58fc66>0x0&&_0x167a66>0x0)return 0x3;if(_0x58fc66<0x0&&_0x167a66>0x0)return 0x1;}else this[_0x103026(0x3b9)]['execute']();}}if(Math[_0x103026(0x595)](_0x58fc66)>Math[_0x103026(0x595)](_0x167a66))return _0x58fc66>0x0?0x6:0x4;else{if(_0x167a66!==0x0)return _0x167a66>0x0?0x2:0x8;}return 0x0;},Game_Character['prototype'][_0x17a6d5(0x55e)]=function(_0x1ed177,_0x3a0a93){const _0x32f8a5=_0x17a6d5,_0x3a1278=this[_0x32f8a5(0x402)](_0x1ed177,_0x3a0a93,!![]);if(_0x3a1278)this['executeMoveDir8'](_0x3a1278);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x485)]=function(_0x39ccf3,_0x4bb6f0){const _0xb0ecaa=_0x17a6d5,_0x220ac3=this[_0xb0ecaa(0x506)](_0x39ccf3,_0x4bb6f0,!![]);if(_0x220ac3)this[_0xb0ecaa(0x482)](_0x220ac3);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x55a)]=function(_0x422451,_0x335c09){const _0x3b1d59=_0x17a6d5,_0x4b68cf=this[_0x3b1d59(0x402)](_0x422451,_0x335c09,![]);if(_0x4b68cf)this[_0x3b1d59(0x4d7)](_0x4b68cf);},Game_Character['prototype'][_0x17a6d5(0x17b)]=function(_0x1aa3a8,_0x5b9c14){const _0x2226a1=_0x17a6d5,_0x310759=this['getDirectionFromPoint'](_0x1aa3a8,_0x5b9c14,![]);if(_0x310759)this[_0x2226a1(0x4d7)](_0x310759);},Game_Character['prototype']['moveTowardCharacter']=function(_0xa7036d){if(_0xa7036d)this['moveTowardPoint'](_0xa7036d['x'],_0xa7036d['y']);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x51f)]=function(_0x1c6f22){const _0x13c010=_0x17a6d5;if(_0x1c6f22)this[_0x13c010(0x485)](_0x1c6f22['x'],_0x1c6f22['y']);},Game_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x2e9)]=function(_0x493594){const _0x4568f=_0x17a6d5;if(_0x493594)this[_0x4568f(0x55a)](_0x493594['x'],_0x493594['y']);},Game_Character['prototype'][_0x17a6d5(0x3f5)]=function(_0x17eb38){const _0x2b4361=_0x17a6d5;if(_0x17eb38)this[_0x2b4361(0x17b)](_0x17eb38['x'],_0x17eb38['y']);},VisuMZ['EventsMoveCore'][_0x17a6d5(0x399)]=Game_Player['prototype'][_0x17a6d5(0x5ce)],Game_Player['prototype'][_0x17a6d5(0x5ce)]=function(){const _0x322692=_0x17a6d5;if(!Game_CharacterBase['ALLOW_LADDER_DASH']&&this['isOnLadder']())return![];if(this['_forceDashing'])return!![];return VisuMZ[_0x322692(0x480)][_0x322692(0x399)][_0x322692(0x496)](this);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x37e)]=Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x667)],Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x667)]=function(){const _0x2a3760=_0x17a6d5;return $gameMap[_0x2a3760(0x320)]()?this[_0x2a3760(0x4c1)]():VisuMZ[_0x2a3760(0x480)][_0x2a3760(0x37e)][_0x2a3760(0x496)](this);},Game_Player['prototype'][_0x17a6d5(0x4c1)]=function(){const _0x31456d=_0x17a6d5;return Input[_0x31456d(0x640)];},Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x335)]=function(){const _0x530cc5=_0x17a6d5;if($gameSystem[_0x530cc5(0x444)]())return 0x0;if(!this['isMoving']()&&this['canMove']()){if('nSHGE'!==_0x530cc5(0x4b7)){_0xdb681a[_0x530cc5(0x5d7)](_0x39fb2b,_0x164c43);const _0x498ec5=_0xcfda8f[_0x530cc5(0x25f)]();_0x22bfea[_0x530cc5(0x517)](_0x19ad0c[_0x530cc5(0x45b)]||_0x498ec5[_0x530cc5(0x1ab)]());}else{let _0x4a37ab=this[_0x530cc5(0x667)]();if(_0x4a37ab>0x0)'ZvsyH'===_0x530cc5(0x317)?this['moveForward']():$gameTemp['clearDestination']();else{if($gameTemp['isDestinationValid']()){const _0x334b92=$gameTemp[_0x530cc5(0x1f9)](),_0x35bca7=$gameTemp[_0x530cc5(0x328)]();this[_0x530cc5(0x4f9)](_0x334b92,_0x35bca7)?_0x530cc5(0x3ab)!==_0x530cc5(0x3ab)?(this['_frames']=this['_frames']||0x0,this[_0x530cc5(0x54d)]=_0xda6bd,this[_0x530cc5(0x449)]=!![],this['_frames']=_0x36b484[_0x530cc5(0x533)](0x1,this['_frames'])):_0x4a37ab=this['findDiagonalDirectionTo'](_0x334b92,_0x35bca7):_0x530cc5(0x5e5)!==_0x530cc5(0x5e5)?this[_0x530cc5(0x5bb)]():_0x4a37ab=this['findDirectionTo'](_0x334b92,_0x35bca7);}}if(_0x4a37ab>0x0){this['_inputTime']=this[_0x530cc5(0x161)]||0x0;if(this[_0x530cc5(0x3cf)]()){if(_0x530cc5(0x5d3)!==_0x530cc5(0x203))this['setDirection'](_0x4a37ab);else{if(_0x47153a[_0x530cc5(0x669)][_0x530cc5(0x39f)]===_0x51de8b)return![];return _0x381902[_0x530cc5(0x3fd)][_0x530cc5(0x64c)](_0x3ac36e);}}else{if(_0x530cc5(0x2e0)===_0x530cc5(0x2e0))this[_0x530cc5(0x4bf)](_0x4a37ab);else{if(_0x2e296e[_0x530cc5(0x2e3)]())return!![];if(_0x4b8a42[_0x530cc5(0x2d4)]())return![];return _0x152b4d[_0x530cc5(0x480)]['Game_Followers_isVisible'][_0x530cc5(0x496)](this);}}this[_0x530cc5(0x161)]++;}else this[_0x530cc5(0x161)]=0x0;}}},Game_Player['prototype'][_0x17a6d5(0x3cf)]=function(){const _0x33cad8=_0x17a6d5,_0x315ae2=VisuMZ['EventsMoveCore'][_0x33cad8(0x429)][_0x33cad8(0x554)];if(!_0x315ae2[_0x33cad8(0x427)])return![];if($gameTemp[_0x33cad8(0x285)]())return![];if(this[_0x33cad8(0x5ce)]()||this[_0x33cad8(0x266)]()||this[_0x33cad8(0x2cb)]())return![];return this[_0x33cad8(0x161)]<_0x315ae2[_0x33cad8(0x530)];},VisuMZ[_0x17a6d5(0x480)]['Game_Player_executeMove']=Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x4bf)],Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x4bf)]=function(_0x1ce096){const _0xf56abf=_0x17a6d5;$gameMap[_0xf56abf(0x320)]()?this[_0xf56abf(0x482)](_0x1ce096):VisuMZ[_0xf56abf(0x480)]['Game_Player_executeMove'][_0xf56abf(0x496)](this,_0x1ce096);},VisuMZ[_0x17a6d5(0x480)]['Game_Player_isMapPassable']=Game_Player['prototype']['isMapPassable'],Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x459)]=function(_0x547693,_0x29dca4,_0xa75879){const _0x4b40b3=_0x17a6d5;if($gameMap[_0x4b40b3(0x68a)](_0x547693,_0x29dca4,_0xa75879,_0x4b40b3(0x527))){if(_0x4b40b3(0x40e)!==_0x4b40b3(0x290)){if(this['isInVehicle']()&&this[_0x4b40b3(0x5e0)]())return this[_0x4b40b3(0x5e0)]()[_0x4b40b3(0x459)](_0x547693,_0x29dca4,_0xa75879);else{if(_0x4b40b3(0x405)!==_0x4b40b3(0x405))this[_0x4b40b3(0x375)][_0x4b40b3(0x4f8)]=![];else return!![];}}else{const _0x5425e8=/\\SELFVAR\[(\d+)\]/gi;while(_0x5477bd[_0x4b40b3(0x5d0)](_0x5425e8)){_0xa5cced=_0x10d1b4[_0x4b40b3(0x384)](_0x5425e8,(_0x78e15b,_0x457802)=>_0xc762bb(this[_0x4b40b3(0x45a)],this[_0x4b40b3(0x25a)],_0xf5c113(_0x457802)));}return _0x3a0e96;}}if($gameMap[_0x4b40b3(0x166)](_0x547693,_0x29dca4,_0xa75879,_0x4b40b3(0x527)))return![];return VisuMZ['EventsMoveCore'][_0x4b40b3(0x2fa)][_0x4b40b3(0x496)](this,_0x547693,_0x29dca4,_0xa75879);},VisuMZ[_0x17a6d5(0x480)]['Game_Player_checkEventTriggerHere']=Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x171)],Game_Player['prototype'][_0x17a6d5(0x171)]=function(_0x5df38d){const _0x209871=_0x17a6d5;VisuMZ[_0x209871(0x480)]['Game_Player_checkEventTriggerHere']['call'](this,_0x5df38d);if(this[_0x209871(0x52c)]()){if('SlswK'!=='SlswK')return!![];else{this[_0x209871(0x67e)](_0x5df38d);if(_0x5df38d[_0x209871(0x64c)](0x0)&&this[_0x209871(0x41c)]()===_0x209871(0x557))this[_0x209871(0x68e)](this['x'],this['y']);else(_0x5df38d[_0x209871(0x64c)](0x1)||_0x5df38d[_0x209871(0x64c)](0x2))&&this['startMapCommonEventOnTouch']();}}},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x3dd)]=Game_Player[_0x17a6d5(0x2f0)]['checkEventTriggerThere'],Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x5ee)]=function(_0x40d178){const _0x30b918=_0x17a6d5;VisuMZ[_0x30b918(0x480)][_0x30b918(0x3dd)][_0x30b918(0x496)](this,_0x40d178);if(this['canStartLocalEvents']()&&_0x40d178['includes'](0x0)&&this[_0x30b918(0x41c)]()==='front'){const _0x59edd3=this[_0x30b918(0x50c)](),_0x4baaa3=$gameMap[_0x30b918(0x400)](this['x'],_0x59edd3),_0x2b9688=$gameMap['roundYWithDirection'](this['y'],_0x59edd3);this['startMapCommonEventOnOK'](_0x4baaa3,_0x2b9688);}},Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x67e)]=function(_0x48acf5){const _0x3e0466=_0x17a6d5;if($gameMap['isEventRunning']())return;if($gameMap[_0x3e0466(0x184)]())return;const _0x4031bd=$gameMap[_0x3e0466(0x687)]();for(const _0x2fa975 of _0x4031bd){if(_0x3e0466(0x58c)===_0x3e0466(0x478))_0x1f75b1['y']+=0x1;else{if(!_0x2fa975)continue;if(!_0x2fa975[_0x3e0466(0x19d)](_0x48acf5))continue;if(this['meetActivationRegionConditions'](_0x2fa975))return _0x2fa975[_0x3e0466(0x3c7)]();if(this['meetActivationProximityConditions'](_0x2fa975))return _0x2fa975[_0x3e0466(0x3c7)]();}}},Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x2da)]=function(_0x4aed8e){const _0x1c1775=_0x17a6d5;if($gameMap[_0x1c1775(0x31d)]())return![];if($gameMap['isAnyEventStarting']())return![];return _0x4aed8e[_0x1c1775(0x1a9)]()[_0x1c1775(0x64c)](this[_0x1c1775(0x4cf)]());},Game_Player[_0x17a6d5(0x2f0)]['meetActivationProximityConditions']=function(_0x21535f){const _0x360a5b=_0x17a6d5;if($gameMap[_0x360a5b(0x31d)]())return![];if($gameMap[_0x360a5b(0x184)]())return![];if([_0x360a5b(0x3cd),_0x360a5b(0x292)][_0x360a5b(0x64c)](_0x21535f['activationProximityType']()))return![];const _0x90e0f4=_0x21535f[_0x360a5b(0x26d)](),_0x14d53f=_0x21535f[_0x360a5b(0x42b)]();switch(_0x90e0f4){case _0x360a5b(0x314):const _0xf01dc=$gameMap[_0x360a5b(0x4bd)](this['x'],this['y'],_0x21535f['x'],_0x21535f['y']);return _0x21535f['activationProximityDistance']()>=_0xf01dc;break;case'square':return _0x14d53f>=Math[_0x360a5b(0x595)](_0x21535f[_0x360a5b(0x287)](this['x']))&&_0x14d53f>=Math[_0x360a5b(0x595)](_0x21535f['deltaYFrom'](this['y']));break;case'row':return _0x14d53f>=Math['abs'](_0x21535f[_0x360a5b(0x39a)](this['y']));break;case'column':return _0x14d53f>=Math['abs'](_0x21535f[_0x360a5b(0x287)](this['x']));break;case _0x360a5b(0x615):return![];break;}},Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x68e)]=function(_0x2bb4a3,_0x2933cb){const _0x4adc9c=_0x17a6d5;if($gameMap[_0x4adc9c(0x31d)]())return;if($gameMap[_0x4adc9c(0x184)]())return;let _0x59026a=VisuMZ[_0x4adc9c(0x480)][_0x4adc9c(0x429)][_0x4adc9c(0x57c)],_0x3a8754=$gameMap[_0x4adc9c(0x4cf)](_0x2bb4a3,_0x2933cb);const _0x18e486=_0x4adc9c(0x66b)[_0x4adc9c(0x333)](_0x3a8754);_0x59026a[_0x18e486]&&$gameTemp[_0x4adc9c(0x195)](_0x59026a[_0x18e486]);},Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x41c)]=function(){const _0x2e5c67=_0x17a6d5;return VisuMZ[_0x2e5c67(0x480)][_0x2e5c67(0x429)][_0x2e5c67(0x1cb)];},Game_Player[_0x17a6d5(0x2f0)][_0x17a6d5(0x297)]=function(){const _0x1e1268=_0x17a6d5;if($gameMap['isEventRunning']())return;if($gameMap[_0x1e1268(0x184)]())return;let _0x20deab=VisuMZ[_0x1e1268(0x480)][_0x1e1268(0x429)]['RegionTouch'];const _0x79b8e7=_0x1e1268(0x66b)[_0x1e1268(0x333)](this[_0x1e1268(0x4cf)]());if(_0x20deab[_0x79b8e7]){if(_0x1e1268(0x23e)===_0x1e1268(0x61f)){const _0x4cfa3b=this[_0x1e1268(0x49f)]();return this[_0x1e1268(0x1e7)]()&&_0x4cfa3b[_0x1e1268(0x483)]>=0x1&&_0x5218d1[_0x1e1268(0x5f3)](_0x4cfa3b['switchId']);}else $gameTemp[_0x1e1268(0x195)](_0x20deab[_0x79b8e7]);}},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x3c6)]=Game_Player['prototype'][_0x17a6d5(0x4c0)],Game_Player[_0x17a6d5(0x2f0)]['increaseSteps']=function(){const _0x4c5d02=_0x17a6d5;VisuMZ[_0x4c5d02(0x480)][_0x4c5d02(0x3c6)]['call'](this),VisuMZ[_0x4c5d02(0x465)](0x0);},Game_Player['prototype'][_0x17a6d5(0x4ac)]=function(){VisuMZ['FaceSynchAllSynchTargets'](0x0);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x58b)]=Game_Follower[_0x17a6d5(0x2f0)][_0x17a6d5(0x467)],Game_Follower[_0x17a6d5(0x2f0)][_0x17a6d5(0x467)]=function(_0x49d231){const _0x1274c8=_0x17a6d5;VisuMZ[_0x1274c8(0x480)][_0x1274c8(0x58b)][_0x1274c8(0x496)](this,_0x49d231),this[_0x1274c8(0x4dd)]=![];},Game_Follower[_0x17a6d5(0x2f0)][_0x17a6d5(0x5ce)]=function(){const _0x2ccddd=_0x17a6d5;if(this['_chaseOff'])return Game_Character[_0x2ccddd(0x2f0)][_0x2ccddd(0x5ce)][_0x2ccddd(0x496)](this);return $gamePlayer[_0x2ccddd(0x5ce)]();},Game_Follower['prototype'][_0x17a6d5(0x57f)]=function(){const _0x372468=_0x17a6d5;if(this[_0x372468(0x4dd)])return Game_Character['prototype'][_0x372468(0x57f)][_0x372468(0x496)](this);return $gamePlayer[_0x372468(0x57f)]()&&this['_actuallyMoving'];},Game_Follower['prototype'][_0x17a6d5(0x1e6)]=function(){const _0x343380=_0x17a6d5;return $gamePlayer[_0x343380(0x1e6)]();},Game_Follower[_0x17a6d5(0x2f0)][_0x17a6d5(0x60b)]=function(){const _0x5d7edc=_0x17a6d5;Game_Character['prototype'][_0x5d7edc(0x60b)][_0x5d7edc(0x496)](this);if(this[_0x5d7edc(0x1d2)]>0x0){if(_0x5d7edc(0x663)==='tkmZq')this['_actuallyMoving']=![];else return this[_0x5d7edc(0x29a)]['Player'];}},Game_Follower[_0x17a6d5(0x2f0)][_0x17a6d5(0x20d)]=function(_0x2f796c){const _0x53646d=_0x17a6d5;this[_0x53646d(0x4dd)]=_0x2f796c;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x591)]=Game_Follower[_0x17a6d5(0x2f0)][_0x17a6d5(0x49e)],Game_Follower[_0x17a6d5(0x2f0)][_0x17a6d5(0x49e)]=function(_0x4dab67){const _0x45aba8=_0x17a6d5;if(this[_0x45aba8(0x4dd)])return;if($gameSystem[_0x45aba8(0x177)]())return;VisuMZ[_0x45aba8(0x480)]['Game_Follower_chaseCharacter'][_0x45aba8(0x496)](this,_0x4dab67),this[_0x45aba8(0x3e6)]=!![];},VisuMZ['EventsMoveCore'][_0x17a6d5(0x3d5)]=Game_Vehicle[_0x17a6d5(0x2f0)]['isMapPassable'],Game_Vehicle[_0x17a6d5(0x2f0)][_0x17a6d5(0x459)]=function(_0x29342a,_0x865729,_0x35e0a9){const _0x1112ee=_0x17a6d5;if($gameMap[_0x1112ee(0x68a)](_0x29342a,_0x865729,_0x35e0a9,this['_type']))return!![];if($gameMap[_0x1112ee(0x166)](_0x29342a,_0x865729,_0x35e0a9,this[_0x1112ee(0x1c0)]))return![];return VisuMZ['EventsMoveCore']['Game_Vehicle_isMapPassable'][_0x1112ee(0x496)](this,_0x29342a,_0x865729,_0x35e0a9);},Game_Vehicle[_0x17a6d5(0x2f0)]['isAirshipPassable']=function(_0x487a7e,_0x4d653e,_0x97e444){const _0x5b1887=_0x17a6d5;if($gameMap['isRegionAllowPass'](_0x487a7e,_0x4d653e,_0x97e444,this[_0x5b1887(0x1c0)]))return!![];if($gameMap['isRegionForbidPass'](_0x487a7e,_0x4d653e,_0x97e444,this[_0x5b1887(0x1c0)]))return![];return VisuMZ[_0x5b1887(0x480)][_0x5b1887(0x556)][_0x5b1887(0x496)]($gamePlayer,_0x487a7e,_0x4d653e,_0x97e444);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x32c)]=Game_Vehicle['prototype'][_0x17a6d5(0x323)],Game_Vehicle[_0x17a6d5(0x2f0)][_0x17a6d5(0x323)]=function(_0x242afd,_0x5140b3,_0x3ca1a5){const _0x349e88=_0x17a6d5;if($gameMap[_0x349e88(0x460)](_0x242afd,_0x5140b3,_0x3ca1a5,this[_0x349e88(0x1c0)]))return!![];const _0xcd6cdd=this['_type'][_0x349e88(0x548)](0x0)[_0x349e88(0x43c)]()+this[_0x349e88(0x1c0)][_0x349e88(0x497)](0x1),_0x53fb1c=_0x349e88(0x52b)['format'](_0xcd6cdd);if(VisuMZ[_0x349e88(0x480)][_0x349e88(0x429)]['Region'][_0x53fb1c]){if('WLWpy'!==_0x349e88(0x23c))return![];else{let _0x599d4f=_0x3ac01c(_0x1f045a['$1'])[_0x349e88(0x520)]();this[_0x349e88(0x693)][_0x349e88(0x5b8)]=_0x599d4f,this['_labelWindow']['originalText']=_0x599d4f;}}else return VisuMZ['EventsMoveCore'][_0x349e88(0x32c)]['call'](this,_0x242afd,_0x5140b3,_0x3ca1a5);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x677)]=Game_Vehicle[_0x17a6d5(0x2f0)]['initMoveSpeed'],Game_Vehicle[_0x17a6d5(0x2f0)]['initMoveSpeed']=function(){const _0x3d8433=_0x17a6d5;VisuMZ[_0x3d8433(0x480)][_0x3d8433(0x677)][_0x3d8433(0x496)](this);const _0x5d83b1=VisuMZ['EventsMoveCore'][_0x3d8433(0x429)]['Movement'];if(this[_0x3d8433(0x410)]()){if(_0x3d8433(0x253)!==_0x3d8433(0x253)){_0x110957[_0x3d8433(0x480)][_0x3d8433(0x174)][_0x3d8433(0x496)](this,_0x1377ee);if(this[_0x3d8433(0x432)]===_0x405a78)this[_0x3d8433(0x4a0)]();this['_paused']=![];}else{if(_0x5d83b1[_0x3d8433(0x230)])this[_0x3d8433(0x546)](_0x5d83b1[_0x3d8433(0x230)]);}}else{if(this[_0x3d8433(0x5e4)]()){if(_0x3d8433(0x260)!==_0x3d8433(0x260))_0x5b09e0['_shadowSprite'][_0x3d8433(0x383)]=this['shadowFilename'](),_0x519e1c['_shadowSprite'][_0x3d8433(0x437)]=_0x54002b[_0x3d8433(0x3e9)](_0x3d9507[_0x3d8433(0x359)][_0x3d8433(0x383)]);else{if(_0x5d83b1['ShipSpeed'])this[_0x3d8433(0x546)](_0x5d83b1[_0x3d8433(0x1c8)]);}}else{if(this[_0x3d8433(0x2f1)]()){if(_0x5d83b1[_0x3d8433(0x5ab)])this[_0x3d8433(0x546)](_0x5d83b1[_0x3d8433(0x5ab)]);}}}},VisuMZ['EventsMoveCore'][_0x17a6d5(0x68d)]=Game_Event[_0x17a6d5(0x2f0)]['initialize'],Game_Event[_0x17a6d5(0x2f0)]['initialize']=function(_0x4d65fc,_0xe92dcc){const _0x46b3ac=_0x17a6d5;VisuMZ[_0x46b3ac(0x480)][_0x46b3ac(0x68d)][_0x46b3ac(0x496)](this,_0x4d65fc,_0xe92dcc),this[_0x46b3ac(0x1b6)](),this['setupMorphEvent'](),this[_0x46b3ac(0x579)]();},Game_Map[_0x17a6d5(0x2f0)]['referEvent']=function(_0x4fde9d,_0xa983c5){const _0x1f87a7=_0x17a6d5;if(_0x4fde9d===$gameMap[_0x1f87a7(0x461)]()){if(_0x1f87a7(0x274)!==_0x1f87a7(0x274)){if(!_0x487465['advancedFunc'][_0x1cd516]){_0x4d62f2[_0x1f87a7(0x40f)][_0x18757b][_0x1f87a7(0x5d0)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x18f456='return\x20%1'['format'](_0x4c7a8a(_0x1e9750['$1']));_0x45cb6b[_0x1f87a7(0x2bd)][_0x3f62f3]=new _0x559536('variableId',_0x18f456);}const _0x567a3f=_0x48edb1[_0x1f87a7(0x3c5)]()||this;return _0x36be15[_0x1f87a7(0x2bd)][_0x27f35e][_0x1f87a7(0x496)](_0x567a3f,_0x5f5455);}else return $dataMap[_0x1f87a7(0x687)][_0xa983c5];}else return VisuMZ[_0x1f87a7(0x585)][_0x4fde9d][_0x1f87a7(0x687)][_0xa983c5];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x2d6)]=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x49f)],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x49f)]=function(){const _0x579233=_0x17a6d5;if(this[_0x579233(0x3bf)]!==undefined){const _0x37dd3d=this['_eventMorphData'][_0x579233(0x461)],_0xf2039b=this['_eventMorphData']['eventId'];return $gameMap['referEvent'](_0x37dd3d,_0xf2039b);}if(this['_eventCopyData']!==undefined){if(_0x579233(0x2be)!==_0x579233(0x2be))return _0xf9ad59['dir8'];else{const _0x5c122a=this[_0x579233(0x43d)][_0x579233(0x461)],_0x447e79=this[_0x579233(0x43d)][_0x579233(0x1ab)];return $gameMap['referEvent'](_0x5c122a,_0x447e79);}}if(this[_0x579233(0x617)]!==undefined){if(_0x579233(0x2a9)!==_0x579233(0x194)){const _0x26cf3e=this[_0x579233(0x617)][_0x579233(0x461)],_0x332f5d=this[_0x579233(0x617)][_0x579233(0x1ab)];return $gameMap['referEvent'](_0x26cf3e,_0x332f5d);}else{const _0x1d60bb=_0x1d1c64[_0x579233(0x480)][_0x579233(0x429)];this['_activationProximity']={'type':'none','distance':0x0,'regionList':[]},this[_0x579233(0x62a)]=![],this[_0x579233(0x372)](),this[_0x579233(0x350)]=![],this[_0x579233(0x30e)]=![],this[_0x579233(0x288)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x579233(0x4b3)]=_0x23ccb1[_0x579233(0x604)](this),this['_labelWindow']={'originalText':'','text':'','visibleRange':_0x1d60bb[_0x579233(0x36a)][_0x579233(0x4d6)],'offsetX':_0x1d60bb[_0x579233(0x36a)][_0x579233(0x1cd)],'offsetY':_0x1d60bb[_0x579233(0x36a)][_0x579233(0x349)]},this[_0x579233(0x601)]=![],this[_0x579233(0x1aa)]=[],this[_0x579233(0x672)]={'target':-0x1,'type':'random','delay':0x1,'opacityDelta':0x0},this['_randomMoveWeight']=_0x1d60bb[_0x579233(0x554)][_0x579233(0x639)]??0x0,this['_saveEventLocation']=![],this['_shadowGraphic']={'visible':!![],'filename':_0x1d60bb['Movement'][_0x579233(0x403)]},this[_0x579233(0x3af)](),this['clearStepPattern']();}}if($gameTemp[_0x579233(0x5f6)]!==undefined){const _0x20a4a6=$gameTemp[_0x579233(0x5f6)][_0x579233(0x461)],_0x5cff12=$gameTemp[_0x579233(0x5f6)][_0x579233(0x1ab)];return $gameMap[_0x579233(0x4d2)](_0x20a4a6,_0x5cff12);}return VisuMZ[_0x579233(0x480)][_0x579233(0x2d6)][_0x579233(0x496)](this);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x330)]=function(_0x5abd78,_0x31cbc5){const _0x2631bb=_0x17a6d5;if(_0x5abd78===0x0||_0x31cbc5===0x0)return![];if(_0x5abd78===$gameMap[_0x2631bb(0x461)]())return!![];if(!VisuMZ[_0x2631bb(0x585)][_0x5abd78]&&_0x5abd78!==$gameMap[_0x2631bb(0x461)]())return $gameTemp['isPlaytest']()&&console[_0x2631bb(0x559)](_0x2631bb(0x396)[_0x2631bb(0x333)](_0x5abd78)),![];return!![];},VisuMZ['EventsMoveCore']['Game_Event_start']=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3c7)],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3c7)]=function(){const _0xba4fc=_0x17a6d5;VisuMZ[_0xba4fc(0x480)][_0xba4fc(0x5a6)][_0xba4fc(0x496)](this),Imported[_0xba4fc(0x39c)]&&Input[_0xba4fc(0x341)](VisuMZ['MessageCore'][_0xba4fc(0x429)]['General'][_0xba4fc(0x5a9)])&&(_0xba4fc(0x42d)!==_0xba4fc(0x42d)?this[_0xba4fc(0x3e6)]=![]:Input[_0xba4fc(0x634)]());},Game_Event['prototype'][_0x17a6d5(0x1b6)]=function(){const _0x56eb47=_0x17a6d5,_0x5c992d=this[_0x56eb47(0x49f)]()[_0x56eb47(0x489)];if(_0x5c992d==='')return;if(DataManager[_0x56eb47(0x30c)]()||DataManager['isEventTest']())return;const _0x14bfbc=VisuMZ[_0x56eb47(0x480)][_0x56eb47(0x429)][_0x56eb47(0x391)];let _0x330f79=null,_0x433e13=0x0,_0x4675dd=0x0;if(_0x5c992d[_0x56eb47(0x5d0)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x433e13=Number(RegExp['$1']),_0x4675dd=Number(RegExp['$2']);if(_0x433e13===0x0)_0x433e13=$gameMap['mapId']();}else{if(_0x5c992d[_0x56eb47(0x5d0)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if('TdYpb'==='TdYpb'){_0x433e13=Number(RegExp['$1']),_0x4675dd=Number(RegExp['$2']);if(_0x433e13===0x0)_0x433e13=$gameMap[_0x56eb47(0x461)]();}else _0x1d791d=![];}else{if(_0x5c992d[_0x56eb47(0x5d0)](/<COPY EVENT:[ ](.*?)>/i)){const _0x2419ec=String(RegExp['$1'])[_0x56eb47(0x43c)]()[_0x56eb47(0x520)]();_0x330f79=VisuMZ[_0x56eb47(0x31b)][_0x2419ec];if(!_0x330f79)return;_0x433e13=_0x330f79['MapID'],_0x4675dd=_0x330f79[_0x56eb47(0x45b)];}}}if(!this[_0x56eb47(0x330)](_0x433e13,_0x4675dd))return;_0x14bfbc[_0x56eb47(0x1e8)]['call'](this,_0x433e13,_0x4675dd,this);if(_0x330f79)_0x330f79[_0x56eb47(0x1e8)][_0x56eb47(0x496)](this,_0x433e13,_0x4675dd,this);this[_0x56eb47(0x43d)]={'mapId':_0x433e13,'eventId':_0x4675dd},this[_0x56eb47(0x23d)]=-0x2,this[_0x56eb47(0x662)](),_0x14bfbc['PostCopyJS']['call'](this,_0x433e13,_0x4675dd,this);if(_0x330f79)_0x330f79['PostCopyJS'][_0x56eb47(0x496)](this,_0x433e13,_0x4675dd,this);$gameMap[_0x56eb47(0x494)]();},Game_Event['prototype'][_0x17a6d5(0x1c9)]=function(){const _0x508ce4=_0x17a6d5,_0x3dd656=$gameSystem[_0x508ce4(0x697)](this);if(!_0x3dd656)return;const _0x5a3e5c=_0x3dd656[_0x508ce4(0x659)][_0x508ce4(0x43c)]()[_0x508ce4(0x520)]();_0x5a3e5c!==_0x508ce4(0x500)?this[_0x508ce4(0x644)](_0x5a3e5c,!![]):this[_0x508ce4(0x5a7)](_0x3dd656['mapId'],_0x3dd656[_0x508ce4(0x1ab)],!![]);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x5a7)]=function(_0x3e6ef4,_0x51df33,_0x555084){const _0x932c91=_0x17a6d5;if(!this[_0x932c91(0x330)](_0x3e6ef4,_0x51df33))return;const _0x175f2d=VisuMZ[_0x932c91(0x480)][_0x932c91(0x429)][_0x932c91(0x391)];if(!_0x555084)_0x175f2d[_0x932c91(0x678)][_0x932c91(0x496)](this,_0x3e6ef4,_0x51df33,this);this['_eventMorphData']={'mapId':_0x3e6ef4,'eventId':_0x51df33},this[_0x932c91(0x23d)]=-0x2,this[_0x932c91(0x662)]();if(!_0x555084)_0x175f2d[_0x932c91(0x420)][_0x932c91(0x496)](this,_0x3e6ef4,_0x51df33,this);$gameMap[_0x932c91(0x494)]();},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x644)]=function(_0x140104,_0x1dc979){const _0x337130=_0x17a6d5;_0x140104=_0x140104[_0x337130(0x43c)]()[_0x337130(0x520)]();const _0x4f9640=VisuMZ[_0x337130(0x31b)][_0x140104];if(!_0x4f9640)return;const _0x36bb25=_0x4f9640[_0x337130(0x4fe)],_0x2c1f31=_0x4f9640[_0x337130(0x45b)];if(!this['checkValidEventerMap'](_0x36bb25,_0x2c1f31))return;if(!_0x1dc979)_0x4f9640['PreMorphJS'][_0x337130(0x496)](this,_0x36bb25,_0x2c1f31,this);this[_0x337130(0x5a7)](_0x36bb25,_0x2c1f31,_0x1dc979);if(!_0x1dc979)_0x4f9640[_0x337130(0x420)][_0x337130(0x496)](this,_0x36bb25,_0x2c1f31,this);if($gameMap)$gameMap['clearEventCache']();},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3ef)]=function(){const _0x28bc72=_0x17a6d5;this[_0x28bc72(0x3bf)]=undefined,this[_0x28bc72(0x23d)]=-0x2,this[_0x28bc72(0x662)]();},Game_Event['prototype']['setupSpawn']=function(_0x2e7074){const _0x2ceffe=_0x17a6d5,_0x4fa9be=VisuMZ[_0x2ceffe(0x480)][_0x2ceffe(0x429)]['Template'],_0x4ac6e6=_0x2e7074[_0x2ceffe(0x659)][_0x2ceffe(0x43c)]()[_0x2ceffe(0x520)](),_0xdbdeea=!['','UNTITLED'][_0x2ceffe(0x64c)](_0x4ac6e6);let _0x6e8bdc=0x0,_0x158771=0x0;if(_0xdbdeea){const _0x42bee3=VisuMZ['EventTemplates'][_0x4ac6e6];if(!_0x42bee3)return;_0x6e8bdc=_0x42bee3['MapID'],_0x158771=_0x42bee3['EventID'];}else _0x6e8bdc=_0x2e7074[_0x2ceffe(0x461)],_0x158771=_0x2e7074[_0x2ceffe(0x1ab)];if(!this[_0x2ceffe(0x330)](_0x6e8bdc,_0x158771))return;if(_0xdbdeea){if(_0x2ceffe(0x267)===_0x2ceffe(0x267)){const _0x191ac9=VisuMZ['EventTemplates'][_0x4ac6e6];_0x191ac9[_0x2ceffe(0x254)][_0x2ceffe(0x496)](this,_0x6e8bdc,_0x158771,this);}else this[_0x2ceffe(0x54d)]=_0x297737[_0x2ceffe(0x533)](this[_0x2ceffe(0x54d)],0x1);}_0x4fa9be[_0x2ceffe(0x254)]['call'](this,_0x6e8bdc,_0x158771,this),this[_0x2ceffe(0x617)]=_0x2e7074,this[_0x2ceffe(0x23d)]=-0x2,this[_0x2ceffe(0x45a)]=$gameMap['mapId'](),this[_0x2ceffe(0x25a)]=_0x2e7074[_0x2ceffe(0x28e)],this[_0x2ceffe(0x51a)]=_0x2e7074[_0x2ceffe(0x1ad)],this['locate'](_0x2e7074['x'],_0x2e7074['y']),this[_0x2ceffe(0x4d7)](_0x2e7074[_0x2ceffe(0x50c)]),this[_0x2ceffe(0x662)]();if(_0xdbdeea){const _0x573af2=VisuMZ[_0x2ceffe(0x31b)][_0x4ac6e6];if(!_0x573af2)return;_0x573af2['PostSpawnJS']['call'](this,_0x6e8bdc,_0x158771,this);}_0x4fa9be[_0x2ceffe(0x68c)][_0x2ceffe(0x496)](this,_0x6e8bdc,_0x158771,this);const _0x4c1967=SceneManager[_0x2ceffe(0x669)];if(_0x4c1967&&_0x4c1967[_0x2ceffe(0x3e0)])_0x4c1967[_0x2ceffe(0x3e0)][_0x2ceffe(0x3e8)](this);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x651)]=function(){return!!this['_eventSpawnData'];},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3c7)]=function(){const _0x43e04e=_0x17a6d5;if(!this['list']())return;const _0x4a0f9a=this[_0x43e04e(0x1e2)]()['filter'](_0x4b154d=>_0x4b154d[_0x43e04e(0x17f)]!==0x6c&&_0x4b154d[_0x43e04e(0x17f)]!==0x198);_0x4a0f9a[_0x43e04e(0x304)]>0x1&&(this[_0x43e04e(0x198)]=!![],this[_0x43e04e(0x19d)]([0x0,0x1,0x2])&&this[_0x43e04e(0x5bb)]());},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x370)]=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x4d5)],Game_Event['prototype']['clearPageSettings']=function(){const _0x44382b=_0x17a6d5;VisuMZ[_0x44382b(0x480)][_0x44382b(0x370)][_0x44382b(0x496)](this),this[_0x44382b(0x178)](),this[_0x44382b(0x2e7)]();},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x3e2)]=Game_Event['prototype'][_0x17a6d5(0x58f)],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x58f)]=function(){const _0xa19cba=_0x17a6d5;this[_0xa19cba(0x38a)]=!![],VisuMZ[_0xa19cba(0x480)][_0xa19cba(0x3e2)][_0xa19cba(0x496)](this),this[_0xa19cba(0x1d3)](),this[_0xa19cba(0x2e7)](),this[_0xa19cba(0x38a)]=![];},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x1d3)]=function(){const _0x45d55b=_0x17a6d5;if(!this[_0x45d55b(0x49f)]())return;this[_0x45d55b(0x178)](),this[_0x45d55b(0x421)](),this[_0x45d55b(0x499)](),this[_0x45d55b(0x2df)]();},Game_Event['prototype']['setupEventsMoveCoreNotetags']=function(){const _0x7589c2=_0x17a6d5,_0x1c636a=this[_0x7589c2(0x49f)]()[_0x7589c2(0x489)];if(_0x1c636a==='')return;this[_0x7589c2(0x322)](_0x1c636a);},Game_Event[_0x17a6d5(0x2f0)]['setupEventsMoveCoreCommentTags']=function(){const _0x2362a1=_0x17a6d5;if(!this[_0x2362a1(0x1d0)]())return;const _0x220d6a=this[_0x2362a1(0x1e2)]();let _0x562611='';for(const _0x2785bd of _0x220d6a){if(_0x2362a1(0x5eb)!==_0x2362a1(0x204)){if([0x6c,0x198][_0x2362a1(0x64c)](_0x2785bd['code'])){if(_0x562611!=='')_0x562611+='\x0a';_0x562611+=_0x2785bd[_0x2362a1(0x16e)][0x0];}}else this[_0x2362a1(0x3bf)]=_0x4c55ef,this[_0x2362a1(0x23d)]=-0x2,this[_0x2362a1(0x662)]();}this[_0x2362a1(0x322)](_0x562611);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x178)]=function(){const _0x2cde0d=_0x17a6d5,_0x5546b0=VisuMZ[_0x2cde0d(0x480)][_0x2cde0d(0x429)];this[_0x2cde0d(0x611)]={'type':_0x2cde0d(0x3cd),'distance':0x0,'regionList':[]},this[_0x2cde0d(0x62a)]=![],this[_0x2cde0d(0x372)](),this[_0x2cde0d(0x350)]=![],this[_0x2cde0d(0x30e)]=![],this[_0x2cde0d(0x288)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x2cde0d(0x4b3)]=$gameSystem['getEventIconData'](this),this['_labelWindow']={'originalText':'','text':'','visibleRange':_0x5546b0[_0x2cde0d(0x36a)][_0x2cde0d(0x4d6)],'offsetX':_0x5546b0['Label'][_0x2cde0d(0x1cd)],'offsetY':_0x5546b0['Label'][_0x2cde0d(0x349)]},this[_0x2cde0d(0x601)]=![],this['_moveOnlyRegions']=[],this[_0x2cde0d(0x672)]={'target':-0x1,'type':'random','delay':0x1,'opacityDelta':0x0},this['_randomMoveWeight']=_0x5546b0[_0x2cde0d(0x554)][_0x2cde0d(0x639)]??0x0,this[_0x2cde0d(0x4e8)]=![],this[_0x2cde0d(0x375)]={'visible':!![],'filename':_0x5546b0['Movement'][_0x2cde0d(0x403)]},this['clearSpriteOffsets'](),this[_0x2cde0d(0x33b)]();},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x322)]=function(_0x1c586a){const _0x18bf8e=_0x17a6d5;if(_0x1c586a['match'](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x18bf8e(0x665)===_0x18bf8e(0x5e1)){if(!_0x3973f7['advancedFunc'][_0x4e9384]){_0x38fc53['switches'][_0x1274d7][_0x18bf8e(0x5d0)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x13a367='return\x20%1'['format'](_0x24ab10(_0x151b46['$1']));_0x13b1b1[_0x18bf8e(0x2bd)][_0x574fe6]=new _0x1e9bf8(_0x18bf8e(0x296),_0x13a367);}const _0x5a6439=_0x5353aa[_0x18bf8e(0x3c5)]()||this;return _0xc9ebf5[_0x18bf8e(0x2bd)][_0xb3bdb0][_0x18bf8e(0x496)](_0x5a6439,_0x27e14a);}else this[_0x18bf8e(0x611)][_0x18bf8e(0x646)]=JSON[_0x18bf8e(0x2f3)]('['+RegExp['$1'][_0x18bf8e(0x5d0)](/\d+/g)+']'),this[_0x18bf8e(0x611)][_0x18bf8e(0x3f4)]=_0x18bf8e(0x292);}else _0x1c586a[_0x18bf8e(0x5d0)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x18bf8e(0x520)](),this['_activationProximity'][_0x18bf8e(0x3f4)]=type,this[_0x18bf8e(0x611)][_0x18bf8e(0x4bd)]=Number(RegExp['$2']));_0x1c586a['match'](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)&&(this[_0x18bf8e(0x35f)][_0x18bf8e(0x5a0)]=String(RegExp['$1']));if(_0x1c586a['match'](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){if('aYjFI'!==_0x18bf8e(0x27b)){const _0x377600=String(RegExp['$1'])[_0x18bf8e(0x43c)]()[_0x18bf8e(0x520)](),_0x17f338=[_0x18bf8e(0x4e3),_0x18bf8e(0x605),_0x18bf8e(0x1cc),_0x18bf8e(0x66d)];this[_0x18bf8e(0x35f)][_0x18bf8e(0x16a)]=_0x17f338[_0x18bf8e(0x408)](_0x377600)['clamp'](0x0,0x3);}else{_0x1f671e[_0x18bf8e(0x5d7)](_0x265004,_0x4b7ed1);const _0x36eb07=_0x6422f2[_0x18bf8e(0x25f)](),_0x4ab70e={'template':_0x56774d[_0x18bf8e(0x4d0)],'mapId':_0x248551[_0x18bf8e(0x1db)]||_0x4a1bd3[_0x18bf8e(0x461)](),'eventId':_0x10825d[_0x18bf8e(0x5aa)]||_0x36eb07[_0x18bf8e(0x1ab)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x2773fe[_0x18bf8e(0x65c)],'spawnEventId':_0x2e9242[_0x18bf8e(0x237)]['length']+0x3e8},_0x4fecfc=_0x252100[_0x18bf8e(0x69e)]||0x0;if(!_0x2f0799[_0x18bf8e(0x585)][_0x4ab70e[_0x18bf8e(0x461)]]&&_0x4ab70e['mapId']!==_0x294e89[_0x18bf8e(0x461)]()){let _0x462f78='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x18bf8e(0x333)](_0x4ab70e[_0x18bf8e(0x461)]);_0x462f78+=_0x18bf8e(0x32d),_0x462f78+=_0x18bf8e(0x516),_0x462f78+=_0x18bf8e(0x1ec),_0x462f78+=_0x18bf8e(0x3c1)[_0x18bf8e(0x333)](_0x4ab70e[_0x18bf8e(0x461)]),_0x4193ac(_0x462f78);return;}const _0x5a8a87=_0x575cba[_0x18bf8e(0x4cc)](_0x4ab70e,_0x30c79d[_0x18bf8e(0x1c2)],_0x137be9[_0x18bf8e(0x660)],_0x6f8f60[_0x18bf8e(0x2f9)]);_0x4fecfc&&_0x941912['setValue'](_0x4fecfc,!!_0x5a8a87);}}_0x1c586a[_0x18bf8e(0x5d0)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x18bf8e(0x35f)][_0x18bf8e(0x652)]=Number(RegExp['$1']));_0x1c586a['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x18bf8e(0x35f)][_0x18bf8e(0x232)]=Number(RegExp['$1']));_0x1c586a['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x18bf8e(0x35f)][_0x18bf8e(0x3b7)]=Number(RegExp['$1']));_0x1c586a['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_attachPicture'][_0x18bf8e(0x232)]=Number(RegExp['$1']),this[_0x18bf8e(0x35f)]['offsetY']=Number(RegExp['$2']));_0x1c586a[_0x18bf8e(0x5d0)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x18bf8e(0x35f)][_0x18bf8e(0x255)]=Number(RegExp['$1'])*0.01);_0x1c586a[_0x18bf8e(0x5d0)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x18bf8e(0x62a)]=!![]);_0x1c586a[_0x18bf8e(0x5d0)](/<CLICK TRIGGER>/i)&&(_0x18bf8e(0x4dc)!==_0x18bf8e(0x4dc)?(this[_0x18bf8e(0x49d)]=_0x226928,this[_0x18bf8e(0x449)]=!![],_0x137510>0x0&&(this[_0x18bf8e(0x54d)]=_0x2b4557[_0x18bf8e(0x533)](this[_0x18bf8e(0x54d)],0x1))):this['_clickTrigger']=!![]);if(_0x1c586a[_0x18bf8e(0x5d0)](/<CUSTOM Z:[ ](.*?)>/i)){if('FpUXZ'!==_0x18bf8e(0x28a)){if(_0x243ac6)_0x265c85[_0x18bf8e(0x4e5)](_0x1841e8);}else this[_0x18bf8e(0x30e)]=Number(RegExp['$1'])||0x0;}const _0xe2f4ad=_0x1c586a['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0xe2f4ad)for(const _0x2c3472 of _0xe2f4ad){if(_0x18bf8e(0x6a0)===_0x18bf8e(0x6a0)){if(_0x2c3472[_0x18bf8e(0x5d0)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if(_0x18bf8e(0x31f)!==_0x18bf8e(0x31f)){const _0x3f9c7d=_0x123d0a[_0x18bf8e(0x480)][_0x18bf8e(0x429)]['Movement'],_0x348d39=this['_character'][_0x18bf8e(0x50c)]();let _0x2dfebf=0x0;if([0x1,0x4,0x7][_0x18bf8e(0x64c)](_0x348d39))_0x2dfebf=_0x3f9c7d[_0x18bf8e(0x169)];if([0x3,0x6,0x9][_0x18bf8e(0x64c)](_0x348d39))_0x2dfebf=_0x3f9c7d[_0x18bf8e(0x415)];[0x2,0x8][_0x18bf8e(0x64c)](_0x348d39)&&(_0x2dfebf=[-_0x3f9c7d['TiltVert'],0x0,_0x3f9c7d[_0x18bf8e(0x4b8)]][this[_0x18bf8e(0x200)][_0x18bf8e(0x2ad)]()]);if(this[_0x18bf8e(0x624)])_0x2dfebf*=-0x1;this[_0x18bf8e(0x474)]=_0x2dfebf;}else{const _0x565304=String(RegExp['$1'])[_0x18bf8e(0x5ed)]()['trim'](),_0x2ed981=Number(RegExp['$2']);this[_0x18bf8e(0x288)][_0x565304]=_0x2ed981;}}}else _0x18199a[_0x18bf8e(0x2f0)][_0x18bf8e(0x60b)][_0x18bf8e(0x496)](this),this['_stopCount']>0x0&&(this[_0x18bf8e(0x3e6)]=![]);}if(_0x1c586a['match'](/<ICON:[ ](\d+)>/i)){if(_0x18bf8e(0x5f1)!=='tiNrH')this[_0x18bf8e(0x4b3)][_0x18bf8e(0x3a4)]=Number(RegExp['$1']);else{if(_0x98a4a0>this['x']&&this['canPass'](this['x'],this['y'],0x6))_0x48f20e=0x3;if(_0x244641<this['x']&&this[_0x18bf8e(0x344)](this['x'],this['y'],0x4))_0xd55deb=0x1;}}if(_0x1c586a['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x18bf8e(0x692)!==_0x18bf8e(0x692)){const _0x1e290e=_0x1f0f53[_0x18bf8e(0x637)](_0x750460[_0x18bf8e(0x5a0)]);_0x1e290e['addLoadListener'](this[_0x18bf8e(0x4e7)]['bind'](this,_0x1e290e));}else this[_0x18bf8e(0x4b3)][_0x18bf8e(0x5cc)]=Number(RegExp['$1']);}_0x1c586a[_0x18bf8e(0x5d0)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(_0x18bf8e(0x53f)!==_0x18bf8e(0x5b1)?this[_0x18bf8e(0x4b3)][_0x18bf8e(0x1c3)]=Number(RegExp['$1']):_0x1a57da[0x2]=_0x18bf8e(0x36e)[_0x18bf8e(0x333)](_0x4ce1d2));_0x1c586a['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x18bf8e(0x29d)!=='ITxZe'?(_0x29c3cc[_0x18bf8e(0x480)][_0x18bf8e(0x550)][_0x18bf8e(0x496)](this),this[_0x18bf8e(0x437)][_0x18bf8e(0x1a6)](this[_0x18bf8e(0x3d3)][_0x18bf8e(0x1a8)](this))):(this['_eventIcon'][_0x18bf8e(0x5cc)]=Number(RegExp['$1']),this[_0x18bf8e(0x4b3)][_0x18bf8e(0x1c3)]=Number(RegExp['$2'])));if(_0x1c586a[_0x18bf8e(0x5d0)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x15615d=String(RegExp['$1'])[_0x18bf8e(0x43c)]()[_0x18bf8e(0x520)](),_0x158d25=['NORMAL',_0x18bf8e(0x605),_0x18bf8e(0x1cc),_0x18bf8e(0x66d)];this[_0x18bf8e(0x4b3)]['blendMode']=_0x158d25['indexOf'](_0x15615d)[_0x18bf8e(0x1fa)](0x0,0x3);}if(_0x1c586a[_0x18bf8e(0x5d0)](/<LABEL:[ ](.*?)>/i)){let _0x521fca=String(RegExp['$1'])[_0x18bf8e(0x520)]();this[_0x18bf8e(0x693)][_0x18bf8e(0x5b8)]=_0x521fca,this[_0x18bf8e(0x693)]['originalText']=_0x521fca;}if(_0x1c586a[_0x18bf8e(0x5d0)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x3f609f=String(RegExp['$1'])[_0x18bf8e(0x520)]();this[_0x18bf8e(0x693)][_0x18bf8e(0x5b8)]=_0x3f609f,this['_labelWindow'][_0x18bf8e(0x373)]=_0x3f609f;}_0x1c586a['match'](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x18bf8e(0x232)]=Number(RegExp['$1']));_0x1c586a[_0x18bf8e(0x5d0)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow']['offsetY']=Number(RegExp['$1']));_0x1c586a[_0x18bf8e(0x5d0)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x18bf8e(0x3eb)===_0x18bf8e(0x625)?(this['_shadowSprite']['scale']['x']=_0xaccfdc[_0x18bf8e(0x64d)](0x1,this[_0x18bf8e(0x359)][_0x18bf8e(0x255)]['x']+0.1),this['_shadowSprite'][_0x18bf8e(0x255)]['y']=_0x15b2be['min'](0x1,this[_0x18bf8e(0x359)][_0x18bf8e(0x255)]['y']+0.1)):(this[_0x18bf8e(0x693)][_0x18bf8e(0x232)]=Number(RegExp['$1']),this['_labelWindow'][_0x18bf8e(0x3b7)]=Number(RegExp['$2'])));this[_0x18bf8e(0x1c5)]();_0x1c586a[_0x18bf8e(0x5d0)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x18bf8e(0x693)][_0x18bf8e(0x508)]=Number(RegExp['$1']));_0x1c586a['match'](/<MIRROR SPRITE>/i)&&(this['_mirrorSprite']=!![]);if(_0x1c586a[_0x18bf8e(0x5d0)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x6531fe=JSON[_0x18bf8e(0x2f3)]('['+RegExp['$1'][_0x18bf8e(0x5d0)](/\d+/g)+']');this[_0x18bf8e(0x1aa)]=this['_moveOnlyRegions'][_0x18bf8e(0x2d0)](_0x6531fe),this[_0x18bf8e(0x1aa)]['remove'](0x0);}if(_0x1c586a[_0x18bf8e(0x5d0)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x360ae9=String(RegExp['$1']);if(_0x360ae9[_0x18bf8e(0x5d0)](/PLAYER/i))this[_0x18bf8e(0x672)][_0x18bf8e(0x38c)]=0x0;else _0x360ae9[_0x18bf8e(0x5d0)](/EVENT[ ](\d+)/i)&&(this[_0x18bf8e(0x672)]['target']=Number(RegExp['$1']));}if(_0x1c586a[_0x18bf8e(0x5d0)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if(_0x18bf8e(0x241)===_0x18bf8e(0x3b1))return this['attachPictureSettings']()[_0x18bf8e(0x3b7)]??0x0;else this[_0x18bf8e(0x672)][_0x18bf8e(0x3f4)]=String(RegExp['$1'])[_0x18bf8e(0x5ed)]()[_0x18bf8e(0x520)]();}if(_0x1c586a[_0x18bf8e(0x5d0)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)){if(_0x18bf8e(0x1b3)!=='WIekn')return this[_0x18bf8e(0x60f)](0x6,_0xde9231(_0x29e4a6['$1']));else this['_moveSynch'][_0x18bf8e(0x4ae)]=Number(RegExp['$1']);}_0x1c586a[_0x18bf8e(0x5d0)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(_0x18bf8e(0x4a4)==='HWsSY'?this['_moveSynch'][_0x18bf8e(0x167)]=Number(RegExp['$1']):(this['_eventIconSprite']=new _0x4960ac(),this[_0x18bf8e(0x22e)][_0x18bf8e(0x437)]=_0x3b34d4['loadSystem'](_0x18bf8e(0x37b)),this[_0x18bf8e(0x22e)][_0x18bf8e(0x437)][_0x18bf8e(0x486)]=![],this[_0x18bf8e(0x22e)]['setFrame'](0x0,0x0,0x0,0x0),this[_0x18bf8e(0x22e)][_0x18bf8e(0x498)]['x']=0.5,this[_0x18bf8e(0x22e)][_0x18bf8e(0x498)]['y']=0x1,this[_0x18bf8e(0x2bf)](this[_0x18bf8e(0x22e)])));if(_0x1c586a[_0x18bf8e(0x5d0)](/<TRUE RANDOM MOVE>/i))this[_0x18bf8e(0x5cb)]=0x0;else _0x1c586a[_0x18bf8e(0x5d0)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x18bf8e(0x5cb)]=Number(RegExp['$1'])||0x0);_0x1c586a[_0x18bf8e(0x5d0)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x18bf8e(0x4e8)]=!![]);_0x1c586a[_0x18bf8e(0x5d0)](/<HIDE SHADOW>/i)&&(this[_0x18bf8e(0x375)][_0x18bf8e(0x4f8)]=![]);_0x1c586a[_0x18bf8e(0x5d0)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this['_shadowGraphic'][_0x18bf8e(0x5a0)]=String(RegExp['$1']));_0x1c586a[_0x18bf8e(0x5d0)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x18bf8e(0x209)]=Number(RegExp['$1']));if(_0x1c586a['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x18bf8e(0x66e)===_0x18bf8e(0x66e))this[_0x18bf8e(0x2ce)]=Number(RegExp['$1']);else{this[_0x18bf8e(0x2bc)]=!![];return;}}_0x1c586a[_0x18bf8e(0x5d0)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x18bf8e(0x1f2)!==_0x18bf8e(0x1f2)?(_0xf4add6['x']=_0x12924a?_0x662f95[_0x18bf8e(0x5cc)]:0x0,_0x20c86a['y']=_0x18fc02?-this[_0x18bf8e(0x3c8)]+_0x3beda0[_0x18bf8e(0x1c3)]:0x0):(this[_0x18bf8e(0x209)]=Number(RegExp['$1']),this[_0x18bf8e(0x2ce)]=Number(RegExp['$2'])));if(_0x1c586a[_0x18bf8e(0x5d0)](/<STEP PATTERN:[ ](.*)>/i)){if(_0x18bf8e(0x466)===_0x18bf8e(0x466))this[_0x18bf8e(0x417)]=String(RegExp['$1'])['toUpperCase']()['trim']();else{const _0x1a2efc=this[_0x18bf8e(0x200)][_0x18bf8e(0x50c)]();let _0x192bc2=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this['_character'][_0x18bf8e(0x601)]&&(_0x192bc2=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x192bc2[_0x1a2efc]-0x2)/0x2;}}},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x1c5)]=function(){const _0x527165=_0x17a6d5;$gameTemp['registerSelfTarget'](this),this[_0x527165(0x693)]['text']=this[_0x527165(0x693)][_0x527165(0x373)];for(;;){if(_0x527165(0x342)!==_0x527165(0x342))this['_activationProximityAutoTriggerBypass']=!![],_0x9e5b9c[_0x527165(0x480)][_0x527165(0x3e2)][_0x527165(0x496)](this),this['setupEventsMoveCoreEffects'](),this[_0x527165(0x2e7)](),this['_activationProximityAutoTriggerBypass']=![];else{if(this[_0x527165(0x693)]['text'][_0x527165(0x5d0)](/\\V\[(\d+)\]/gi))this[_0x527165(0x693)][_0x527165(0x5b8)]=this[_0x527165(0x693)][_0x527165(0x373)]['replace'](/\\V\[(\d+)\]/gi,(_0x220458,_0x4a7711)=>$gameVariables[_0x527165(0x347)](parseInt(_0x4a7711)));else break;}}$gameTemp[_0x527165(0x5b0)]();},Game_Event[_0x17a6d5(0x2f0)]['updateEventsMoveCoreTagChanges']=function(){const _0x434eb1=_0x17a6d5;this[_0x434eb1(0x3d9)]();},Game_Event['prototype'][_0x17a6d5(0x51b)]=function(){const _0x515710=_0x17a6d5;if(this[_0x515710(0x62a)])return!![];return Game_Character[_0x515710(0x2f0)][_0x515710(0x51b)]['call'](this);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1d6)]=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x607)],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x607)]=function(){const _0x23c381=_0x17a6d5;if(this[_0x23c381(0x574)]())return;VisuMZ['EventsMoveCore'][_0x23c381(0x1d6)][_0x23c381(0x496)](this);if(this[_0x23c381(0x266)]()){if(_0x23c381(0x374)!=='CUikK'){_0x586dfe[_0x23c381(0x5d7)](_0x1860ff,_0x4cbdbb);const _0x50dee5=_0x58fe87['getLastPluginCommandInterpreter'](),_0xf6a631={'template':_0x5a34bf['TemplateName'],'mapId':_0x5a75f6[_0x23c381(0x1db)]||_0x22d33b[_0x23c381(0x461)](),'eventId':_0x1d62fe[_0x23c381(0x5aa)]||_0x50dee5['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0xbbbb92[_0x23c381(0x65c)],'spawnEventId':_0x15e11f[_0x23c381(0x237)][_0x23c381(0x304)]+0x3e8},_0x9e28e8=_0x560538['SuccessSwitchId']||0x0;if(!_0x3c97b7[_0x23c381(0x585)][_0xf6a631[_0x23c381(0x461)]]&&_0xf6a631['mapId']!==_0x378819[_0x23c381(0x461)]()){let _0x2fa7c2=_0x23c381(0x462)[_0x23c381(0x333)](_0xf6a631[_0x23c381(0x461)]);_0x2fa7c2+=_0x23c381(0x32d),_0x2fa7c2+=_0x23c381(0x516),_0x2fa7c2+=_0x23c381(0x1ec),_0x2fa7c2+=_0x23c381(0x3c1)[_0x23c381(0x333)](_0xf6a631[_0x23c381(0x461)]),_0x1ded7d(_0x2fa7c2);return;}const _0x7deb8a=_0x32baa3[_0x23c381(0x38e)](_0xf6a631,_0x590c5c[_0x23c381(0x3ba)],_0x390069[_0x23c381(0x660)],_0x3dfb84[_0x23c381(0x2f9)]);_0x9e28e8&&_0x3ff63c[_0x23c381(0x17c)](_0x9e28e8,!!_0x7deb8a);}else VisuMZ[_0x23c381(0x465)](this[_0x23c381(0x25a)]);}},Game_Event['prototype'][_0x17a6d5(0x574)]=function(){const _0x25a75e=_0x17a6d5,_0xe0d113=VisuMZ[_0x25a75e(0x480)][_0x25a75e(0x429)]['Movement'];if($gameMap['isEventRunning']()&&_0xe0d113[_0x25a75e(0x3a7)])return!![];if($gameMessage[_0x25a75e(0x1f4)]()&&_0xe0d113[_0x25a75e(0x387)])return!![];if(!$gameSystem[_0x25a75e(0x58a)]())return!![];if(this[_0x25a75e(0x1e9)]()>=0x0)return!![];if(!SceneManager[_0x25a75e(0x669)][_0x25a75e(0x689)])return!![];return![];},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3d9)]=function(){const _0x10a903=_0x17a6d5,_0x49663f=SceneManager[_0x10a903(0x669)]['_spriteset'];if(_0x49663f){if(_0x10a903(0x66a)===_0x10a903(0x616)){const _0x1d7359=_0x4d52fb(_0x808aed['$1']),_0x433a4d=_0x45bd10(_0x5372ed['$2']);return this[_0x10a903(0x1bd)](_0x1d7359,_0x433a4d);}else{const _0x2e3597=_0x49663f['findTargetSprite'](this);_0x2e3597&&_0x2e3597[_0x10a903(0x359)]&&_0x2e3597[_0x10a903(0x359)][_0x10a903(0x383)]!==this[_0x10a903(0x3d8)]()&&(_0x2e3597[_0x10a903(0x359)][_0x10a903(0x383)]=this[_0x10a903(0x3d8)](),_0x2e3597[_0x10a903(0x359)][_0x10a903(0x437)]=ImageManager['loadSystem'](_0x2e3597[_0x10a903(0x359)]['_filename']));}}},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3d8)]=function(){const _0x391eca=_0x17a6d5;return this[_0x391eca(0x375)][_0x391eca(0x5a0)];},Game_Event[_0x17a6d5(0x2f0)]['isShadowVisible']=function(){const _0x4aa40f=_0x17a6d5;if(!this[_0x4aa40f(0x375)][_0x4aa40f(0x4f8)])return![];return Game_CharacterBase[_0x4aa40f(0x2f0)][_0x4aa40f(0x3d4)]['call'](this);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x20c)]=function(){const _0x13c67c=_0x17a6d5;return this[_0x13c67c(0x693)][_0x13c67c(0x5b8)];},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x1d7)]=function(){const _0x23f095=_0x17a6d5;return this['_labelWindow'][_0x23f095(0x508)];},Game_Event['prototype'][_0x17a6d5(0x459)]=function(_0xc8824c,_0x5dc7e1,_0x50da16){const _0x2bedbe=_0x17a6d5;if(this[_0x2bedbe(0x1bc)]())return this['isMoveOnlyRegionPassable'](_0xc8824c,_0x5dc7e1,_0x50da16);if($gameMap[_0x2bedbe(0x68a)](_0xc8824c,_0x5dc7e1,_0x50da16,_0x2bedbe(0x49f)))return!![];if($gameMap['isRegionForbidPass'](_0xc8824c,_0x5dc7e1,_0x50da16,_0x2bedbe(0x49f)))return![];return Game_Character[_0x2bedbe(0x2f0)][_0x2bedbe(0x459)]['call'](this,_0xc8824c,_0x5dc7e1,_0x50da16);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x1bc)]=function(){const _0x415b35=_0x17a6d5;if(this[_0x415b35(0x1aa)]===undefined)this[_0x415b35(0x178)]();return this[_0x415b35(0x1aa)][_0x415b35(0x304)]>0x0;},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x633)]=function(_0x33707e,_0x164223,_0x2f3ca3){const _0x4a5ce0=_0x17a6d5,_0x2b4505=$gameMap[_0x4a5ce0(0x400)](_0x33707e,_0x2f3ca3),_0x456e58=$gameMap[_0x4a5ce0(0x5f0)](_0x164223,_0x2f3ca3),_0x1863b1=$gameMap[_0x4a5ce0(0x4cf)](_0x2b4505,_0x456e58);return this['_moveOnlyRegions'][_0x4a5ce0(0x64c)](_0x1863b1);},VisuMZ['EventsMoveCore']['Game_Event_findProperPageIndex']=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3ad)],Game_Event['prototype'][_0x17a6d5(0x3ad)]=function(){const _0x36de03=_0x17a6d5;if(this[_0x36de03(0x49f)]()&&!$gameTemp[_0x36de03(0x3a8)]()){if(this[_0x36de03(0x49f)]()[_0x36de03(0x489)][_0x36de03(0x5d0)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x36de03(0x334)]=![],this[_0x36de03(0x67c)]=![],this[_0x36de03(0x49f)]()?VisuMZ[_0x36de03(0x480)][_0x36de03(0x378)][_0x36de03(0x496)](this):-0x1;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x3b8)]=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x397)],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x397)]=function(_0x5125c9){const _0x4b07e7=_0x17a6d5;this['checkAdvancedSwitchVariablePresent'](_0x5125c9),$gameTemp[_0x4b07e7(0x301)](this);const _0x2dd699=VisuMZ[_0x4b07e7(0x480)][_0x4b07e7(0x3b8)][_0x4b07e7(0x496)](this,_0x5125c9);return $gameTemp[_0x4b07e7(0x5b0)](),_0x2dd699;},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x22c)]=function(){const _0x2a9d24=_0x17a6d5;return this[_0x2a9d24(0x334)];},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x69c)]=function(_0x16a940){const _0x40ee1e=_0x17a6d5,_0x35ee3e=_0x16a940[_0x40ee1e(0x59f)];if(_0x35ee3e[_0x40ee1e(0x3a1)]&&DataManager['isAdvancedSwitch'](_0x35ee3e[_0x40ee1e(0x4ca)])){if(_0x40ee1e(0x521)!=='OWKKw')this[_0x40ee1e(0x334)]=!![];else return this[_0x40ee1e(0x3c0)]()[_0x40ee1e(0x5d0)](/\[VS8\]/i);}else{if(_0x35ee3e['switch2Valid']&&DataManager[_0x40ee1e(0x5f3)](_0x35ee3e[_0x40ee1e(0x686)]))this[_0x40ee1e(0x334)]=!![];else _0x35ee3e[_0x40ee1e(0x63e)]&&DataManager[_0x40ee1e(0x2b9)](_0x35ee3e[_0x40ee1e(0x2ac)])&&(this[_0x40ee1e(0x334)]=!![]);}},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x33c)]=function(){const _0x1d7883=_0x17a6d5;if(this[_0x1d7883(0x3ee)])return![];return this[_0x1d7883(0x350)];},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x376)]=function(){const _0x340e38=_0x17a6d5;$gameTemp[_0x340e38(0x27a)](),this[_0x340e38(0x3c7)]();},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x25c)]=function(_0x384b46,_0x3d3a2e){const _0x32c77e=_0x17a6d5;return this[_0x32c77e(0x288)]?_0x32c77e(0x3c4)==='xVBcO'?!!this[_0x32c77e(0x377)](_0x2ff1db):this[_0x32c77e(0x3da)](_0x384b46,_0x3d3a2e):'WyRij'!==_0x32c77e(0x515)?this[_0x32c77e(0x215)](_0x32c77e(0x17a)):Game_Character[_0x32c77e(0x2f0)][_0x32c77e(0x25c)][_0x32c77e(0x496)](this,_0x384b46,_0x3d3a2e);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3da)]=function(_0x191c38,_0x5091b8){const _0x398c08=_0x17a6d5;var _0x4cb97c=this['x']-this['_addedHitbox'][_0x398c08(0x189)],_0x1f7cd1=this['x']+this['_addedHitbox'][_0x398c08(0x17a)],_0x6a8827=this['y']-this[_0x398c08(0x288)]['up'],_0x2764a2=this['y']+this[_0x398c08(0x288)][_0x398c08(0x246)];return _0x4cb97c<=_0x191c38&&_0x191c38<=_0x1f7cd1&&_0x6a8827<=_0x5091b8&&_0x5091b8<=_0x2764a2;},Game_Event['prototype'][_0x17a6d5(0x344)]=function(_0x1f729b,_0x5ba86,_0xd27ba2){const _0x1f6852=_0x17a6d5;for(let _0x87a983=-this[_0x1f6852(0x288)][_0x1f6852(0x189)];_0x87a983<=this[_0x1f6852(0x288)][_0x1f6852(0x17a)];_0x87a983++){if('pVIWL'==='wUkNT'){if(this[_0x1f6852(0x608)]===_0x2b34b2)this['initEventsMoveCore']();if(!_0x4a139a)return;const _0x31309a=_0x1f6852(0x275)[_0x1f6852(0x333)](_0x279967[_0x1f6852(0x45a)],_0x4d3922[_0x1f6852(0x25a)]);this[_0x1f6852(0x608)][_0x31309a]={'direction':_0x6e0b71[_0x1f6852(0x50c)](),'x':_0x404e30['round'](_0x556061['x']),'y':_0x53112d['round'](_0x1214a3['y']),'pageIndex':_0x4c9228['_pageIndex'],'moveRouteIndex':_0x185dcb[_0x1f6852(0x47c)]};}else for(let _0x20797e=-this[_0x1f6852(0x288)]['up'];_0x20797e<=this[_0x1f6852(0x288)][_0x1f6852(0x246)];_0x20797e++){if(!Game_Character[_0x1f6852(0x2f0)][_0x1f6852(0x344)][_0x1f6852(0x496)](this,_0x1f729b+_0x87a983,_0x5ba86+_0x20797e,_0xd27ba2))return![];}}return!![];},Game_Event['prototype'][_0x17a6d5(0x59e)]=function(_0x5890a1,_0x42a35a){const _0x4ccf6e=_0x17a6d5;if(Imported[_0x4ccf6e(0x4bb)]&&this[_0x4ccf6e(0x38b)]())return this[_0x4ccf6e(0x2c3)](_0x5890a1,_0x42a35a);else{const _0xf576f0=$gameMap['eventsXyNt'](_0x5890a1,_0x42a35a)['filter'](_0x24cfe3=>_0x24cfe3!==this);return _0xf576f0[_0x4ccf6e(0x304)]>0x0;}},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x2c3)]=function(_0x2ee99e,_0x49c6c5){const _0x4a833d=_0x17a6d5;if(!this[_0x4a833d(0x392)]())return![];else{if('HBZPx'===_0x4a833d(0x1dd)){const _0x4a9cbc=$gameMap[_0x4a833d(0x1be)](_0x2ee99e,_0x49c6c5)[_0x4a833d(0x1a0)](_0x1e992d=>_0x1e992d!==this&&_0x1e992d[_0x4a833d(0x392)]());return _0x4a9cbc[_0x4a833d(0x304)]>0x0;}else{_0xdd3361[_0x4a833d(0x5d7)](_0xeeffc,_0x271a1a);const _0x168b3a=_0x43b3a3['MapId']||_0x52c002[_0x4a833d(0x461)]();_0x160c87['resetSelfSwitchesForMap'](_0x168b3a);}}},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x26d)]=function(){const _0xe3d800=_0x17a6d5;return this[_0xe3d800(0x611)][_0xe3d800(0x3f4)]||'none';},Game_Event['prototype'][_0x17a6d5(0x42b)]=function(){const _0xfa3f94=_0x17a6d5;return this[_0xfa3f94(0x611)][_0xfa3f94(0x4bd)]||0x0;},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x1a9)]=function(){const _0x38f79b=_0x17a6d5;return this[_0x38f79b(0x611)][_0x38f79b(0x646)]||[];},Game_Event['prototype']['increaseSteps']=function(){const _0x3184ec=_0x17a6d5;Game_Character[_0x3184ec(0x2f0)][_0x3184ec(0x4c0)]['call'](this);if([_0x3184ec(0x3cd),_0x3184ec(0x292)]['includes'](this[_0x3184ec(0x26d)]()))return;$gamePlayer[_0x3184ec(0x67e)]([0x2]);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x34d)]=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x568)],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x568)]=function(){const _0x7cc2d0=_0x17a6d5;if(this[_0x7cc2d0(0x191)]!==0x3)return;if(this[_0x7cc2d0(0x38a)])return;if(!this[_0x7cc2d0(0x491)](![]))return;if(!this['checkActivationProximity'](![]))return;VisuMZ[_0x7cc2d0(0x480)]['Game_Event_checkEventTriggerAuto'][_0x7cc2d0(0x496)](this);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1e5)]=Game_Event[_0x17a6d5(0x2f0)]['updateParallel'],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x2e5)]=function(){const _0x274413=_0x17a6d5;if(!this['_interpreter'])return;if(!this[_0x274413(0x491)](!![]))return;if(!this[_0x274413(0x66c)](!![]))return;VisuMZ['EventsMoveCore'][_0x274413(0x1e5)][_0x274413(0x496)](this);},Game_Event[_0x17a6d5(0x2f0)]['checkRegionEventTrigger']=function(_0x3e6583){const _0x3e248f=_0x17a6d5;if(!_0x3e6583&&$gameMap['isEventRunning']())return![];if(!_0x3e6583&&$gameMap[_0x3e248f(0x184)]())return![];if(this[_0x3e248f(0x1a9)]()<=0x0)return!![];return $gamePlayer['meetActivationRegionConditions'](this);},Game_Event[_0x17a6d5(0x2f0)]['checkActivationProximity']=function(_0x493350){const _0xb2b3c3=_0x17a6d5;if(!_0x493350&&$gameMap[_0xb2b3c3(0x31d)]())return![];if(!_0x493350&&$gameMap['isAnyEventStarting']())return![];if([_0xb2b3c3(0x3cd),_0xb2b3c3(0x292)]['includes'](this[_0xb2b3c3(0x26d)]()))return!![];return $gamePlayer[_0xb2b3c3(0x695)](this);},VisuMZ[_0x17a6d5(0x465)]=function(_0x58589a){const _0x3d6ad4=_0x17a6d5;for(const _0x407eba of $gameMap['events']()){if(!_0x407eba)continue;_0x407eba[_0x3d6ad4(0x1e9)]()===_0x58589a&&_0x407eba[_0x3d6ad4(0x2e8)]();}},VisuMZ[_0x17a6d5(0x24d)]=function(_0x4fbd9c){const _0xd0e157=_0x17a6d5;if(_0x4fbd9c===0x0)return $gamePlayer;return $gameMap[_0xd0e157(0x49f)](_0x4fbd9c);},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x4ac)]=function(){},Game_Event[_0x17a6d5(0x2f0)]['updateMoveSynchDirection']=function(){const _0x3965d8=_0x17a6d5;VisuMZ['FaceSynchAllSynchTargets'](this[_0x3965d8(0x25a)]);},VisuMZ['FaceSynchAllSynchTargets']=function(_0x4252dc){const _0x33430c=_0x17a6d5;for(const _0x31b5ca of $gameMap[_0x33430c(0x687)]()){if('rcBly'!=='ogKnp'){if(!_0x31b5ca)continue;if(_0x31b5ca[_0x33430c(0x1e9)]()===_0x4252dc){if('hrYnX'!=='tYimt')_0x31b5ca[_0x33430c(0x487)]();else return _0xdd19e2[_0x33430c(0x3a8)]()&&_0x4b6300[_0x33430c(0x559)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.'['format'](_0x153fed)),![];}}else return _0x5948d4[_0x33430c(0x1e6)]();}},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x1e9)]=function(){const _0x3ec912=_0x17a6d5;return this[_0x3ec912(0x672)][_0x3ec912(0x38c)];},Game_Event['prototype'][_0x17a6d5(0x2ec)]=function(){const _0x368cf8=_0x17a6d5;return this[_0x368cf8(0x672)][_0x368cf8(0x3f4)];},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x1e6)]=function(){const _0x3e1547=_0x17a6d5;if(this[_0x3e1547(0x1e9)]()>=0x0){const _0x23b017=VisuMZ['GetMoveSynchTarget'](this[_0x3e1547(0x1e9)]());if(_0x23b017)return _0x23b017['realMoveSpeed']();}return Game_Character[_0x3e1547(0x2f0)][_0x3e1547(0x1e6)]['call'](this);},Game_Event['prototype'][_0x17a6d5(0x2e8)]=function(){const _0x465314=_0x17a6d5;this[_0x465314(0x672)][_0x465314(0x25e)]=this[_0x465314(0x672)][_0x465314(0x25e)]||0x0,this['_moveSynch'][_0x465314(0x25e)]--;if(this[_0x465314(0x672)]['timer']>0x0)return;this[_0x465314(0x672)][_0x465314(0x25e)]=this[_0x465314(0x672)][_0x465314(0x4ae)],this[_0x465314(0x698)]();},Game_Event[_0x17a6d5(0x2f0)]['adjustMoveSynchOpacityDelta']=function(_0x10d609){const _0x39dda8=_0x17a6d5;if(this['moveSynchTarget']()>=0x0){const _0x2722dd=VisuMZ['GetMoveSynchTarget'](this[_0x39dda8(0x1e9)]());if(_0x2722dd){if(_0x39dda8(0x38d)==='tXaZG'){const _0x2b0862=$gameMap[_0x39dda8(0x4bd)](this['_realX'],this['_realY'],_0x2722dd[_0x39dda8(0x445)],_0x2722dd['_realY'])-0x1,_0x3fcc23=Math[_0x39dda8(0x64d)]($gameMap[_0x39dda8(0x280)](),$gameMap[_0x39dda8(0x406)]()),_0x25ba23=this[_0x39dda8(0x672)][_0x39dda8(0x167)]||0x0;_0x10d609-=Math[_0x39dda8(0x533)](0x0,_0x2b0862)*_0x3fcc23*_0x25ba23;}else{let _0x1fa416=this[_0x39dda8(0x200)][_0x39dda8(0x50c)]();if(this[_0x39dda8(0x200)]['_mirrorSprite']){if(_0x1fa416===0x4)_0x1fa416=0x6;else _0x1fa416===0x6&&(_0x1fa416=0x4);}return(_0x1fa416-0x2)/0x2;}}}return _0x10d609;},Game_Event['prototype'][_0x17a6d5(0x698)]=function(){const _0x417a5c=_0x17a6d5;switch(this['moveSynchType']()){case _0x417a5c(0x164):this[_0x417a5c(0x18f)]();break;case'approach':this[_0x417a5c(0x2e6)]();break;case _0x417a5c(0x484):this[_0x417a5c(0x463)]();break;case _0x417a5c(0x1ee):this[_0x417a5c(0x6a2)]();break;case'mimic':case _0x417a5c(0x505):this[_0x417a5c(0x430)]();break;case _0x417a5c(0x602):case _0x417a5c(0x249):this['processMoveSynchReverseMimic']();break;case _0x417a5c(0x34a):case'horizontal\x20mirror':case _0x417a5c(0x539):case _0x417a5c(0x5ea):this[_0x417a5c(0x645)]();break;case _0x417a5c(0x162):case'vertical\x20mirror':case _0x417a5c(0x2d5):case'vert\x20mirror':this[_0x417a5c(0x33d)]();break;default:this[_0x417a5c(0x18f)]();break;}this['update']();},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x18f)]=function(){const _0x4b3c58=_0x17a6d5,_0x3fd3d0=[0x2,0x4,0x6,0x8];$gameMap[_0x4b3c58(0x320)]()&&_0x3fd3d0[_0x4b3c58(0x16c)](0x1,0x3,0x7,0x9);const _0x19ca38=[];for(const _0x2364a6 of _0x3fd3d0){if(_0x4b3c58(0x495)===_0x4b3c58(0x1ef))return this[_0x4b3c58(0x606)](_0x30ebf4(_0x5eb07c['$1']),_0x44eb53(_0x4b841a['$2']));else{if(this['canPass'](this['x'],this['y'],_0x2364a6))_0x19ca38[_0x4b3c58(0x16c)](_0x2364a6);}}if(_0x19ca38[_0x4b3c58(0x304)]>0x0){const _0x1c2bcc=_0x19ca38[Math['randomInt'](_0x19ca38['length'])];this[_0x4b3c58(0x482)](_0x1c2bcc);}},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x2e6)]=function(){const _0x31e5ac=_0x17a6d5,_0x4c5f76=VisuMZ[_0x31e5ac(0x24d)](this['moveSynchTarget']());this[_0x31e5ac(0x524)](_0x4c5f76);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x463)]=function(){const _0x4bed18=_0x17a6d5,_0x336399=VisuMZ[_0x4bed18(0x24d)](this[_0x4bed18(0x1e9)]());this['moveAwayFromCharacter'](_0x336399);},Game_Event['prototype']['processMoveSynchCustom']=function(){const _0x3c802f=_0x17a6d5;this[_0x3c802f(0x1f8)]();},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x430)]=function(){const _0x5847ca=_0x17a6d5,_0x491341=VisuMZ[_0x5847ca(0x24d)](this['moveSynchTarget']());this[_0x5847ca(0x482)](_0x491341['lastMovedDirection']());},Game_Event[_0x17a6d5(0x2f0)]['processMoveSynchReverseMimic']=function(){const _0x3fa138=_0x17a6d5,_0x28a017=VisuMZ[_0x3fa138(0x24d)](this['moveSynchTarget']());this['executeMoveDir8'](this[_0x3fa138(0x5fc)](_0x28a017['lastMovedDirection']()));},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x645)]=function(){const _0x1f97b5=_0x17a6d5,_0x21477b=VisuMZ[_0x1f97b5(0x24d)](this[_0x1f97b5(0x1e9)]()),_0x87bec6=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x21477b[_0x1f97b5(0x273)]()];this[_0x1f97b5(0x482)](_0x87bec6);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x33d)]=function(){const _0x4abd96=_0x17a6d5,_0x2d6df2=VisuMZ[_0x4abd96(0x24d)](this['moveSynchTarget']()),_0x1e828a=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x2d6df2[_0x4abd96(0x273)]()];this[_0x4abd96(0x482)](_0x1e828a);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x487)]=function(){const _0x201549=_0x17a6d5,_0x45d82c=VisuMZ['GetMoveSynchTarget'](this[_0x201549(0x1e9)]()),_0x22d970=_0x45d82c[_0x201549(0x50c)]();switch(this[_0x201549(0x2ec)]()){case _0x201549(0x3f7):case'copy':this[_0x201549(0x4d7)](_0x22d970);break;case _0x201549(0x602):case'reverse\x20copy':this[_0x201549(0x4d7)](this[_0x201549(0x5fc)](_0x22d970));break;case _0x201549(0x34a):case _0x201549(0x63a):case _0x201549(0x539):case _0x201549(0x5ea):this[_0x201549(0x4d7)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x22d970]);break;case _0x201549(0x162):case'vertical\x20mirror':case _0x201549(0x2d5):case _0x201549(0x3c3):this[_0x201549(0x4d7)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x22d970]);break;default:return;}this[_0x201549(0x566)]();},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x579)]=function(){const _0x2897bc=_0x17a6d5,_0x43961f=$gameSystem[_0x2897bc(0x5c2)](this);if(!_0x43961f)return;this[_0x2897bc(0x69a)](_0x43961f['x'],_0x43961f['y']),this[_0x2897bc(0x182)](),this[_0x2897bc(0x4d7)](_0x43961f[_0x2897bc(0x50c)]),this['_pageIndex']===_0x43961f[_0x2897bc(0x306)]&&(this[_0x2897bc(0x47c)]=_0x43961f[_0x2897bc(0x563)]);},VisuMZ[_0x17a6d5(0x480)]['Game_Event_update']=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x566)],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x566)]=function(){const _0x412586=_0x17a6d5;VisuMZ[_0x412586(0x480)][_0x412586(0x311)][_0x412586(0x496)](this),this[_0x412586(0x4c4)]();},Game_Event['prototype']['updateMove']=function(){const _0x5ead8d=_0x17a6d5;Game_Character['prototype'][_0x5ead8d(0x1ea)][_0x5ead8d(0x496)](this),this[_0x5ead8d(0x2e7)]();},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x1fe)]=function(){if($gameMap['isSaveEventLocations']())return!![];return this['_saveEventLocation'];},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x2e7)]=function(){const _0x3cf6f9=_0x17a6d5;if(!this[_0x3cf6f9(0x1fe)]())return;this[_0x3cf6f9(0x675)]();},Game_Event['prototype'][_0x17a6d5(0x675)]=function(){this['_requestSaveEventLocation']=!![];},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x4c4)]=function(){const _0x40fac4=_0x17a6d5;this[_0x40fac4(0x472)]&&this[_0x40fac4(0x294)]();},Game_Event[_0x17a6d5(0x2f0)]['processSaveEventLocation']=function(){const _0x528dec=_0x17a6d5;this[_0x528dec(0x472)]=![],$gameSystem[_0x528dec(0x675)](this);},Game_Event[_0x17a6d5(0x2f0)]['deleteEventLocation']=function(){const _0x2a529b=_0x17a6d5;$gameSystem[_0x2a529b(0x325)](this);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x604)]=function(){const _0x1bc638=_0x17a6d5;return $gameSystem[_0x1bc638(0x604)](this)?Game_Character[_0x1bc638(0x2f0)][_0x1bc638(0x604)][_0x1bc638(0x496)](this):{'iconIndex':0x0,'bufferX':settings[_0x1bc638(0x3b0)][_0x1bc638(0x1fb)],'bufferY':settings[_0x1bc638(0x3b0)]['BufferY'],'blendMode':settings['Icon'][_0x1bc638(0x211)]};},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x50b)]=function(){const _0x5560b5=_0x17a6d5;return this[_0x5560b5(0x67c)];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x281)]=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x397)],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x397)]=function(_0x16bdfb){const _0x5461d1=_0x17a6d5,_0x3d1b56=VisuMZ[_0x5461d1(0x480)][_0x5461d1(0x281)][_0x5461d1(0x496)](this,_0x16bdfb);if(!_0x3d1b56)return![];return this[_0x5461d1(0x3b4)](_0x16bdfb);},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3b4)]=function(_0x41fd00){const _0x1ceb68=_0x17a6d5;VisuMZ['EventsMoveCore'][_0x1ceb68(0x1bb)]['loadCPC'](_0x41fd00),this[_0x1ceb68(0x67c)]=_0x41fd00[_0x1ceb68(0x401)]['length']>0x0;_0x41fd00[_0x1ceb68(0x401)]===undefined&&VisuMZ[_0x1ceb68(0x480)]['CustomPageConditions'][_0x1ceb68(0x219)](_0x41fd00);if(_0x41fd00[_0x1ceb68(0x401)]['length']>0x0)return'onokC'===_0x1ceb68(0x21e)?$gameMap[_0x1ceb68(0x49f)](this['_eventId'])&&VisuMZ[_0x1ceb68(0x480)][_0x1ceb68(0x1bb)][_0x1ceb68(0x571)](_0x41fd00['CPC'],this[_0x1ceb68(0x25a)]):this[_0x1ceb68(0x56e)](_0x271d54);return!![];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x32e)]=Game_Troop[_0x17a6d5(0x2f0)][_0x17a6d5(0x397)],Game_Troop['prototype'][_0x17a6d5(0x397)]=function(_0x26c988){const _0xb8b3f8=_0x17a6d5;var _0x4abaf2=VisuMZ[_0xb8b3f8(0x480)]['Game_Troop_meetsConditionsCPC'][_0xb8b3f8(0x496)](this,_0x26c988);return _0x4abaf2&&this[_0xb8b3f8(0x25d)](_0x26c988);},Game_Troop[_0x17a6d5(0x2f0)][_0x17a6d5(0x25d)]=function(_0xe1d2e4){const _0x304c3b=_0x17a6d5;_0xe1d2e4[_0x304c3b(0x401)]===undefined&&VisuMZ[_0x304c3b(0x480)][_0x304c3b(0x1bb)][_0x304c3b(0x219)](_0xe1d2e4);if(_0xe1d2e4[_0x304c3b(0x401)]['length']>0x0)return VisuMZ['EventsMoveCore'][_0x304c3b(0x1bb)][_0x304c3b(0x571)](_0xe1d2e4[_0x304c3b(0x401)],0x0);return!![];},VisuMZ['EventsMoveCore'][_0x17a6d5(0x54e)]=Game_Event['prototype']['locate'],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x21b)]=function(_0x78db4c,_0x19f9fc){const _0x42b621=_0x17a6d5;VisuMZ[_0x42b621(0x480)][_0x42b621(0x54e)][_0x42b621(0x496)](this,_0x78db4c,_0x19f9fc),this['_randomHomeX']=_0x78db4c,this[_0x42b621(0x291)]=_0x19f9fc,this[_0x42b621(0x2e7)]();},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x2ea)]=Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3c2)],Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x3c2)]=function(){const _0x11e7f0=_0x17a6d5,_0x83236f=$gameMap['distance'](this['x'],this['y'],this[_0x11e7f0(0x30b)],this[_0x11e7f0(0x291)]),_0x1b0942=_0x83236f*(this[_0x11e7f0(0x5cb)]||0x0);Math['random']()>=_0x1b0942?VisuMZ[_0x11e7f0(0x480)][_0x11e7f0(0x2ea)][_0x11e7f0(0x496)](this):_0x11e7f0(0x1df)!==_0x11e7f0(0x2aa)?this[_0x11e7f0(0x532)]():_0x2b8e02=_0x5b77c5[_0x11e7f0(0x384)](_0x22a10d,(_0x290a33,_0x433987)=>_0x4e5f08[_0x11e7f0(0x347)](_0x3eee0c(_0x433987)));},Game_Event[_0x17a6d5(0x2f0)][_0x17a6d5(0x532)]=function(){const _0x263a15=_0x17a6d5,_0x303d4c=this[_0x263a15(0x287)](this[_0x263a15(0x30b)]),_0x474aa9=this['deltaYFrom'](this[_0x263a15(0x291)]);if(Math['abs'](_0x303d4c)>Math[_0x263a15(0x595)](_0x474aa9)){if(_0x263a15(0x259)==='aSnXR'){this[_0x263a15(0x1d9)](_0x303d4c>0x0?0x4:0x6);if(!this[_0x263a15(0x5f9)]()&&_0x474aa9!==0x0){if(_0x263a15(0x393)===_0x263a15(0x1a7)){const _0x280681=_0x190dfd?_0x2c29c4[_0x263a15(0x461)]():0x0,_0x4ec3c0=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x263a15(0x333)](_0x280681,_0x52e15b)];return _0x1840d9['setValue'](_0x4ec3c0,_0x1eea4c);}else this[_0x263a15(0x1d9)](_0x474aa9>0x0?0x8:0x2);}}else{if(!_0x4d4a48[_0x263a15(0x293)]())return;_0x1f64d1[_0x263a15(0x2d8)]();}}else _0x474aa9!==0x0&&(this['moveStraight'](_0x474aa9>0x0?0x8:0x2),!this[_0x263a15(0x5f9)]()&&_0x303d4c!==0x0&&this[_0x263a15(0x1d9)](_0x303d4c>0x0?0x4:0x6));},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x372)]=function(){this['_attachPicture']={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x17a6d5(0x2f0)]['attachPictureSettings']=function(){const _0x216d81=_0x17a6d5;if(this[_0x216d81(0x35f)]===undefined)this[_0x216d81(0x372)]();return this[_0x216d81(0x35f)];},Game_CharacterBase['prototype'][_0x17a6d5(0x223)]=function(){return this['attachPictureSettings']()['filename']??'';},Game_CharacterBase[_0x17a6d5(0x2f0)]['attachPictureBlendMode']=function(){const _0x3bc4f6=_0x17a6d5;return this['attachPictureSettings']()[_0x3bc4f6(0x16a)]??0x0;},Game_CharacterBase['prototype'][_0x17a6d5(0x386)]=function(){const _0xbb3f85=_0x17a6d5;return this[_0xbb3f85(0x270)]()[_0xbb3f85(0x652)]??0x0;},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x5ac)]=function(){const _0x2014a7=_0x17a6d5;return this[_0x2014a7(0x270)]()[_0x2014a7(0x232)]??0x0;},Game_CharacterBase[_0x17a6d5(0x2f0)][_0x17a6d5(0x315)]=function(){const _0x456557=_0x17a6d5;return this[_0x456557(0x270)]()[_0x456557(0x3b7)]??0x0;},Game_CharacterBase[_0x17a6d5(0x2f0)]['attachPictureScale']=function(){const _0x38c568=_0x17a6d5;return this[_0x38c568(0x270)]()['scale']??0x1;},VisuMZ[_0x17a6d5(0x480)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x17a6d5(0x2f0)][_0x17a6d5(0x419)],Game_Interpreter['prototype'][_0x17a6d5(0x419)]=function(){const _0x484a30=_0x17a6d5;if(this[_0x484a30(0x653)]==='CallEvent'){if(window[this[_0x484a30(0x394)]])this[_0x484a30(0x653)]='',this[_0x484a30(0x5e7)]();else return!![];}else return VisuMZ[_0x484a30(0x480)]['Game_Interpreter_updateWaitMode'][_0x484a30(0x496)](this);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x23a)]=Game_Interpreter[_0x17a6d5(0x2f0)]['executeCommand'],Game_Interpreter['prototype']['executeCommand']=function(){const _0x4e4541=_0x17a6d5,_0x261984=$gameMap&&this[_0x4e4541(0x25a)]?$gameMap[_0x4e4541(0x49f)](this[_0x4e4541(0x25a)]):null;$gameTemp[_0x4e4541(0x301)](_0x261984);const _0x134c52=VisuMZ['EventsMoveCore'][_0x4e4541(0x23a)][_0x4e4541(0x496)](this);return $gameTemp[_0x4e4541(0x5b0)](),_0x134c52;},VisuMZ['EventsMoveCore'][_0x17a6d5(0x656)]=Game_Interpreter[_0x17a6d5(0x2f0)][_0x17a6d5(0x2ba)],Game_Interpreter['prototype'][_0x17a6d5(0x2ba)]=function(_0x4c0a2a){const _0x2ee828=_0x17a6d5;return $gameTemp[_0x2ee828(0x360)](this),VisuMZ[_0x2ee828(0x480)]['Game_Interpreter_PluginCommand']['call'](this,_0x4c0a2a);},Game_Interpreter['prototype']['pluginCommandCallEvent']=function(_0x49b731){const _0x26b99e=_0x17a6d5;this['_callEventData']=_0x49b731;const _0xb6661d=_0x26b99e(0x390)[_0x26b99e(0x333)](_0x49b731['mapId']['padZero'](0x3));this[_0x26b99e(0x394)]=_0x26b99e(0x451)+Graphics[_0x26b99e(0x389)]+'_'+this[_0x26b99e(0x1ab)](),DataManager[_0x26b99e(0x3a5)](this[_0x26b99e(0x394)],_0xb6661d),window[this[_0x26b99e(0x394)]]?this[_0x26b99e(0x5e7)]():this['setWaitMode'](_0x26b99e(0x3f1));},Game_Interpreter[_0x17a6d5(0x2f0)][_0x17a6d5(0x5e7)]=function(){const _0x435420=_0x17a6d5,_0x400677=this[_0x435420(0x543)],_0x1229dd=window[this[_0x435420(0x394)]],_0xb6c50c=_0x1229dd['events'][_0x400677[_0x435420(0x1ab)]];if(_0xb6c50c&&_0xb6c50c[_0x435420(0x4f2)][_0x400677['pageId']-0x1]){const _0x5501ea=_0xb6c50c[_0x435420(0x4f2)][_0x400677[_0x435420(0x3dc)]-0x1]['list'];this['setupChild'](_0x5501ea,this[_0x435420(0x1ab)]());}window[this[_0x435420(0x394)]]=undefined,this[_0x435420(0x394)]=undefined,this[_0x435420(0x543)]=undefined;};function Game_CPCInterpreter(){const _0x44a3d8=_0x17a6d5;this[_0x44a3d8(0x467)][_0x44a3d8(0x66f)](this,arguments);};function _0x5820(_0x4c053e,_0x480d0d){const _0x2b8589=_0x2b85();return _0x5820=function(_0x582017,_0x49f1eb){_0x582017=_0x582017-0x160;let _0x5c2e58=_0x2b8589[_0x582017];return _0x5c2e58;},_0x5820(_0x4c053e,_0x480d0d);}Game_CPCInterpreter[_0x17a6d5(0x2f0)]=Object['create'](Game_Interpreter[_0x17a6d5(0x2f0)]),Game_CPCInterpreter[_0x17a6d5(0x2f0)][_0x17a6d5(0x39f)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x17a6d5(0x2f0)][_0x17a6d5(0x634)]=function(){const _0xe985c9=_0x17a6d5;Game_Interpreter[_0xe985c9(0x2f0)][_0xe985c9(0x634)][_0xe985c9(0x496)](this),this['_cpc']=![];},Game_CPCInterpreter['prototype'][_0x17a6d5(0x407)]=function(){const _0x936dfe=_0x17a6d5;while(this[_0x936dfe(0x522)]()){if(_0x936dfe(0x2a4)==='MMLyz')return _0x2b2382[_0x936dfe(0x65e)][_0x936dfe(0x64c)](_0x4a5095)||_0x3e95c9[_0x936dfe(0x2b8)][_0x936dfe(0x64c)](_0x576c4e);else this[_0x936dfe(0x409)]();}},Game_CPCInterpreter['prototype'][_0x17a6d5(0x282)]=function(_0x13eef2){const _0x4c7e24=_0x17a6d5;while(this[_0x4c7e24(0x522)]()){if(_0x4c7e24(0x3d2)!=='xevHe')return _0x2641a5[_0x4c7e24(0x480)]['Settings']['Movement']['DefaultShadow'];else this['executeCommandCommonEvent'](_0x13eef2);}},Game_CPCInterpreter[_0x17a6d5(0x2f0)]['executeCommandCommonEvent']=function(_0x1cef15){const _0x4860fe=_0x17a6d5,_0x246a80=_0x1cef15;$gameTemp[_0x4860fe(0x301)](_0x246a80);const _0x5f3097=VisuMZ['EventsMoveCore']['Game_Interpreter_executeCommand'][_0x4860fe(0x496)](this);return $gameTemp['clearSelfTarget'](),_0x5f3097;},Game_CPCInterpreter[_0x17a6d5(0x2f0)]['command108']=function(_0x405abe){const _0x72ff72=_0x17a6d5;return Game_Interpreter[_0x72ff72(0x2f0)]['command108'][_0x72ff72(0x496)](this,_0x405abe),this[_0x72ff72(0x68f)]['some'](_0x1a73fa=>_0x1a73fa['match'](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x72ff72(0x3ea)]=!![]),!![];},VisuMZ['EventsMoveCore']['Scene_Map_startEncounterEffect']=Scene_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x2b1)],Scene_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x2b1)]=function(){const _0x3999dd=_0x17a6d5;VisuMZ[_0x3999dd(0x480)]['Scene_Map_startEncounterEffect']['call'](this),this['_spriteset'][_0x3999dd(0x1b8)]();},VisuMZ[_0x17a6d5(0x480)]['Scene_Load_onLoadSuccess']=Scene_Load[_0x17a6d5(0x2f0)][_0x17a6d5(0x52e)],Scene_Load[_0x17a6d5(0x2f0)][_0x17a6d5(0x52e)]=function(){const _0x2d6d51=_0x17a6d5;if($gameMap)$gameMap['clearEventCache']();VisuMZ[_0x2d6d51(0x480)]['Scene_Load_onLoadSuccess'][_0x2d6d51(0x496)](this);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x19e)]=Sprite_Character[_0x17a6d5(0x2f0)]['initMembers'],Sprite_Character[_0x17a6d5(0x2f0)]['initMembers']=function(){const _0x2c00b6=_0x17a6d5;VisuMZ['EventsMoveCore'][_0x2c00b6(0x19e)]['call'](this),this[_0x2c00b6(0x4c2)](),this[_0x2c00b6(0x3ac)](),this[_0x2c00b6(0x1c6)]();},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x4c2)]=function(){this['_shadowOpacity']=0xff;},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x3ac)]=function(){const _0x419147=_0x17a6d5;this[_0x419147(0x501)]=new Sprite(),this[_0x419147(0x501)][_0x419147(0x498)]['x']=0.5,this[_0x419147(0x501)]['anchor']['y']=0x1,this[_0x419147(0x2bf)](this[_0x419147(0x501)]),this[_0x419147(0x1a2)]();},Sprite_Character['prototype']['createIconSprite']=function(){const _0x5d0bf5=_0x17a6d5;this[_0x5d0bf5(0x22e)]=new Sprite(),this['_eventIconSprite'][_0x5d0bf5(0x437)]=ImageManager[_0x5d0bf5(0x3e9)](_0x5d0bf5(0x37b)),this[_0x5d0bf5(0x22e)][_0x5d0bf5(0x437)][_0x5d0bf5(0x486)]=![],this[_0x5d0bf5(0x22e)][_0x5d0bf5(0x6a1)](0x0,0x0,0x0,0x0),this[_0x5d0bf5(0x22e)][_0x5d0bf5(0x498)]['x']=0.5,this['_eventIconSprite'][_0x5d0bf5(0x498)]['y']=0x1,this['addChild'](this[_0x5d0bf5(0x22e)]);},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x455)]=function(){const _0x57895b=_0x17a6d5;return this[_0x57895b(0x3cb)]&&this['_characterName']['match'](/\[VS8\]/i);},Sprite_Character[_0x17a6d5(0x2f0)]['isAutoBufferIcon']=function(){const _0xe5917f=_0x17a6d5;return this[_0xe5917f(0x455)]()&&VisuMZ[_0xe5917f(0x480)]['Settings']['VS8'][_0xe5917f(0x46e)];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x4af)]=Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x566)],Sprite_Character['prototype']['update']=function(){const _0x30b767=_0x17a6d5;VisuMZ[_0x30b767(0x480)][_0x30b767(0x4af)][_0x30b767(0x496)](this),this[_0x30b767(0x464)]();},Sprite_Character[_0x17a6d5(0x2f0)]['updateVisibility']=function(){const _0x28ad51=_0x17a6d5;Sprite[_0x28ad51(0x2f0)][_0x28ad51(0x3b2)][_0x28ad51(0x496)](this),this['isEventsMoveCoreInvisible']()&&(this[_0x28ad51(0x4f8)]=![]);},Sprite_Character[_0x17a6d5(0x2f0)]['isEventsMoveCoreInvisible']=function(){const _0x16f3ea=_0x17a6d5;if(this[_0x16f3ea(0x339)]()>0x0)return![];if(this[_0x16f3ea(0x200)]){if(_0x16f3ea(0x42e)===_0x16f3ea(0x3b5))return this[_0x16f3ea(0x163)](_0x22457d(_0x85c6d6['$1']),_0x143159(_0x44db5e['$2']));else{if(this[_0x16f3ea(0x200)][_0x16f3ea(0x223)]()!=='')return![];}}return this['isEmptyCharacter']()||this['_character']&&this[_0x16f3ea(0x200)][_0x16f3ea(0x358)]();},Sprite_Character['prototype'][_0x17a6d5(0x464)]=function(){const _0x53bc43=_0x17a6d5;this[_0x53bc43(0x43a)](),this[_0x53bc43(0x668)](),this[_0x53bc43(0x41f)](),this['updateEventCustomZ'](),this['updateEventMirrorSprite'](),this[_0x53bc43(0x1a2)]();},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x54a)]=Sprite_Character['prototype'][_0x17a6d5(0x597)],Sprite_Character[_0x17a6d5(0x2f0)]['setTileBitmap']=function(){const _0x1c8526=_0x17a6d5;VisuMZ[_0x1c8526(0x480)]['Sprite_Character_setTileBitmap'][_0x1c8526(0x496)](this),this[_0x1c8526(0x437)]['addLoadListener'](this['updateBitmapSmoothing'][_0x1c8526(0x1a8)](this));},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x550)]=Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x5c7)],Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x5c7)]=function(){const _0x2bfceb=_0x17a6d5;VisuMZ[_0x2bfceb(0x480)][_0x2bfceb(0x550)][_0x2bfceb(0x496)](this),this['bitmap'][_0x2bfceb(0x1a6)](this[_0x2bfceb(0x3d3)][_0x2bfceb(0x1a8)](this));},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x3d3)]=function(){const _0xee6a78=_0x17a6d5;if(!this[_0xee6a78(0x437)])return;this[_0xee6a78(0x437)][_0xee6a78(0x486)]=!!VisuMZ['EventsMoveCore'][_0xee6a78(0x429)][_0xee6a78(0x554)]['BitmapSmoothing'];},VisuMZ['EventsMoveCore']['Sprite_Character_characterPatternY']=Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x1da)],Sprite_Character['prototype']['characterPatternY']=function(){const _0x1bc255=_0x17a6d5;if(this[_0x1bc255(0x455)]())return _0x1bc255(0x316)===_0x1bc255(0x59b)?![]:this[_0x1bc255(0x4de)]();else{if(_0x1bc255(0x3fe)===_0x1bc255(0x24e))this[_0x1bc255(0x3ea)]=!![];else return this[_0x1bc255(0x5bc)]();}},Sprite_Character['prototype'][_0x17a6d5(0x4de)]=function(){const _0xc43f30=_0x17a6d5,_0x13bdcd=this[_0xc43f30(0x200)]['direction']();let _0x193b70=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this['_character']['_mirrorSprite']&&(_0xc43f30(0x365)===_0xc43f30(0x4a7)?this[_0xc43f30(0x24b)](_0x1e32bb['_mapId'],_0x5ecdca[_0xc43f30(0x25a)]):_0x193b70=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x193b70[_0x13bdcd]-0x2)/0x2;},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x5bc)]=function(){const _0x3366ee=_0x17a6d5;let _0x1bfbb7=this[_0x3366ee(0x200)][_0x3366ee(0x50c)]();if(this['_character']['_mirrorSprite']){if(_0x3366ee(0x2f7)===_0x3366ee(0x542)){if(this['_lastAttachPictureFilename']!==_0x495e43[_0x3366ee(0x5a0)])return!![];if(this[_0x3366ee(0x2c2)]!==_0x5d3c7b[_0x3366ee(0x652)])return!![];if(this['_lastAttachPictureScale']!==_0x7fcfbc[_0x3366ee(0x255)])return!![];}else{if(_0x1bfbb7===0x4)_0x1bfbb7=0x6;else{if(_0x1bfbb7===0x6){if('WGyxT'===_0x3366ee(0x2d9)){const _0x2ff19e=this[_0x3366ee(0x250)]();return _0x2ff19e?_0x2ff19e[_0x3366ee(0x25a)]:0x0;}else _0x1bfbb7=0x4;}}}}return(_0x1bfbb7-0x2)/0x2;},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x43a)]=function(){const _0x5647d0=_0x17a6d5;if(!VisuMZ[_0x5647d0(0x480)]['Settings'][_0x5647d0(0x554)]['EnableDashTilt'])return;this['rotation']=0x0;if(this[_0x5647d0(0x5dc)]()){const _0x439111=VisuMZ['EventsMoveCore']['Settings'][_0x5647d0(0x554)],_0x56283f=this[_0x5647d0(0x200)][_0x5647d0(0x50c)]();let _0x331cff=0x0;if([0x1,0x4,0x7]['includes'](_0x56283f))_0x331cff=_0x439111['TiltLeft'];if([0x3,0x6,0x9][_0x5647d0(0x64c)](_0x56283f))_0x331cff=_0x439111[_0x5647d0(0x415)];[0x2,0x8]['includes'](_0x56283f)&&(_0x331cff=[-_0x439111[_0x5647d0(0x4b8)],0x0,_0x439111[_0x5647d0(0x4b8)]][this[_0x5647d0(0x200)][_0x5647d0(0x2ad)]()]);if(this[_0x5647d0(0x624)])_0x331cff*=-0x1;this[_0x5647d0(0x474)]=_0x331cff;}},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x5dc)]=function(){const _0x10f416=_0x17a6d5;if(this[_0x10f416(0x354)])return![];return this[_0x10f416(0x200)][_0x10f416(0x57f)]()&&!this['_character'][_0x10f416(0x2cb)]()&&!this[_0x10f416(0x200)]['isPosing']()&&this[_0x10f416(0x339)]()===0x0;},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x668)]=function(){const _0x340733=_0x17a6d5;if(!this[_0x340733(0x359)])return;this[_0x340733(0x359)]['x']=this[_0x340733(0x200)][_0x340733(0x28c)](),this[_0x340733(0x359)]['y']=this[_0x340733(0x200)][_0x340733(0x630)](),this['_shadowSprite'][_0x340733(0x248)]=this[_0x340733(0x248)],this['_shadowSprite'][_0x340733(0x4f8)]=this[_0x340733(0x200)]['isShadowVisible'](),this[_0x340733(0x359)]['_hidden']=this[_0x340733(0x30a)],!this[_0x340733(0x200)]['isShadowShrink']()?(this[_0x340733(0x359)]['scale']['x']=Math[_0x340733(0x64d)](0x1,this['_shadowSprite'][_0x340733(0x255)]['x']+0.1),this[_0x340733(0x359)][_0x340733(0x255)]['y']=Math[_0x340733(0x64d)](0x1,this['_shadowSprite'][_0x340733(0x255)]['y']+0.1)):(this[_0x340733(0x359)][_0x340733(0x255)]['x']=Math[_0x340733(0x533)](0x0,this[_0x340733(0x359)][_0x340733(0x255)]['x']-0.1),this['_shadowSprite'][_0x340733(0x255)]['y']=Math['max'](0x0,this['_shadowSprite'][_0x340733(0x255)]['y']-0.1));},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x41f)]=function(){const _0x908937=_0x17a6d5;if(!this[_0x908937(0x22e)])return;const _0x1a0e14=this[_0x908937(0x22e)],_0x50312b=this[_0x908937(0x339)]();if(_0x50312b<=0x0){if(_0x908937(0x60d)===_0x908937(0x2b2)){if(_0x4850cf>0x0&&_0x55cc7e<0x0)return 0x1;if(_0x2fc1f1<0x0&&_0x57679d<0x0)return 0x3;if(_0x34f0c0>0x0&&_0x56f97b>0x0)return 0x7;if(_0x5b5795<0x0&&_0x545407>0x0)return 0x9;}else return _0x1a0e14[_0x908937(0x6a1)](0x0,0x0,0x0,0x0);}else{if(_0x908937(0x5d5)===_0x908937(0x5d5)){const _0x1f8004=ImageManager[_0x908937(0x69d)],_0x405d59=ImageManager[_0x908937(0x4c6)],_0x18db71=_0x50312b%0x10*_0x1f8004,_0x382f97=Math[_0x908937(0x2ab)](_0x50312b/0x10)*_0x405d59;_0x1a0e14[_0x908937(0x6a1)](_0x18db71,_0x382f97,_0x1f8004,_0x405d59),this[_0x908937(0x4f8)]=!![];}else{if(!this[_0x908937(0x49f)]())return;this[_0x908937(0x178)](),this['setupEventsMoveCoreNotetags'](),this[_0x908937(0x499)](),this[_0x908937(0x2df)]();}}const _0x27d71f=this['_character'][_0x908937(0x604)]();if(this[_0x908937(0x518)]()){if('hKtmu'===_0x908937(0x33f))this[_0x908937(0x27e)](_0x1a0e14);else{this[_0x908937(0x59c)]=this[_0x908937(0x461)](),this[_0x908937(0x414)]=_0x208782;const _0x560bde=this[_0x908937(0x687)]();for(const _0x2613d8 of _0x560bde){if(_0x2613d8)_0x3bb1f7['resetSelfSwitchesForEvent'](_0x2613d8);}}}else _0x1a0e14['x']=_0x27d71f?_0x27d71f[_0x908937(0x5cc)]:0x0,_0x1a0e14['y']=_0x27d71f?-this[_0x908937(0x3c8)]+_0x27d71f[_0x908937(0x1c3)]:0x0;_0x1a0e14[_0x908937(0x16a)]=_0x27d71f?_0x27d71f['blendMode']:0x0,this[_0x908937(0x3ce)](_0x1a0e14),this[_0x908937(0x2bf)](_0x1a0e14),_0x1a0e14['rotation']=-this[_0x908937(0x474)];},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x528)]=function(){const _0x40c8bc=_0x17a6d5;if(!this[_0x40c8bc(0x200)])return;if(this[_0x40c8bc(0x200)]['_customZ']===undefined)return;if(this[_0x40c8bc(0x200)][_0x40c8bc(0x30e)]===![])return;this['z']=this[_0x40c8bc(0x200)][_0x40c8bc(0x30e)],this['z']<0x0?this[_0x40c8bc(0x359)]['z']=this['z']-0x1:this[_0x40c8bc(0x359)]['z']=0x0;},Sprite_Character[_0x17a6d5(0x2f0)]['updateEventMirrorSprite']=function(){const _0x5794e6=_0x17a6d5;if(!this[_0x5794e6(0x200)])return;let _0x5b91e5=!!this[_0x5794e6(0x200)][_0x5794e6(0x601)];this[_0x5794e6(0x255)]['x']=Math[_0x5794e6(0x595)](this[_0x5794e6(0x255)]['x'])*(_0x5b91e5?-0x1:0x1);},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x27e)]=function(_0x50236a){const _0x4ebaf9=_0x17a6d5;_0x50236a['x']=0x0,_0x50236a['y']=-this[_0x4ebaf9(0x3c8)]+this[_0x4ebaf9(0x3c8)]*0x2/0x5,this[_0x4ebaf9(0x200)]['pattern']()!==0x1&&(_0x50236a['y']+=0x1);},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x339)]=function(){const _0x1c38e6=_0x17a6d5;if(!this[_0x1c38e6(0x200)])return 0x0;if(this[_0x1c38e6(0x200)][_0x1c38e6(0x3ee)])return 0x0;const _0x1bf568=this[_0x1c38e6(0x200)]['getEventIconData']();return _0x1bf568?_0x1bf568[_0x1c38e6(0x3a4)]||0x0:0x0;},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x1a2)]=function(){const _0x9f4e2d=_0x17a6d5;if(!this['_attachPictureSprite'])return;if(!this['_character'])return;this['setupAttachPictureBitmap'](),this[_0x9f4e2d(0x60c)]();},Sprite_Character[_0x17a6d5(0x2f0)]['setupAttachPictureBitmap']=function(){const _0x4b4dcc=_0x17a6d5;if(!this[_0x4b4dcc(0x1af)]())return;const _0x95a75d=this[_0x4b4dcc(0x200)][_0x4b4dcc(0x270)]();this[_0x4b4dcc(0x529)]=_0x95a75d[_0x4b4dcc(0x5a0)],this[_0x4b4dcc(0x2c2)]=_0x95a75d[_0x4b4dcc(0x652)],this[_0x4b4dcc(0x340)]=_0x95a75d[_0x4b4dcc(0x255)];if(_0x95a75d['filename']!==''){const _0x13492b=ImageManager[_0x4b4dcc(0x637)](_0x95a75d[_0x4b4dcc(0x5a0)]);_0x13492b[_0x4b4dcc(0x1a6)](this[_0x4b4dcc(0x4e7)]['bind'](this,_0x13492b));}else{if('NUmEV'===_0x4b4dcc(0x4f0))this[_0x4b4dcc(0x501)][_0x4b4dcc(0x437)]=new Bitmap(0x1,0x1);else{this[_0x4b4dcc(0x672)][_0x4b4dcc(0x25e)]=this[_0x4b4dcc(0x672)][_0x4b4dcc(0x25e)]||0x0,this[_0x4b4dcc(0x672)][_0x4b4dcc(0x25e)]--;if(this[_0x4b4dcc(0x672)][_0x4b4dcc(0x25e)]>0x0)return;this[_0x4b4dcc(0x672)][_0x4b4dcc(0x25e)]=this[_0x4b4dcc(0x672)][_0x4b4dcc(0x4ae)],this[_0x4b4dcc(0x698)]();}}},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x60c)]=function(){const _0x183cb3=_0x17a6d5,_0x4ebe1f=this['_attachPictureSprite'];_0x4ebe1f['x']=this[_0x183cb3(0x200)][_0x183cb3(0x5ac)](),_0x4ebe1f['y']=this[_0x183cb3(0x200)][_0x183cb3(0x315)](),_0x4ebe1f[_0x183cb3(0x16a)]=this[_0x183cb3(0x200)][_0x183cb3(0x5f5)]();},Sprite_Character['prototype'][_0x17a6d5(0x1af)]=function(){const _0x4afc27=_0x17a6d5,_0x4c6361=this[_0x4afc27(0x200)][_0x4afc27(0x270)]();if(_0x4c6361){if(this[_0x4afc27(0x529)]!==_0x4c6361[_0x4afc27(0x5a0)])return!![];if(this[_0x4afc27(0x2c2)]!==_0x4c6361[_0x4afc27(0x652)])return!![];if(this[_0x4afc27(0x340)]!==_0x4c6361[_0x4afc27(0x255)])return!![];}return![];},Sprite_Character[_0x17a6d5(0x2f0)]['onLoadAttachPicture']=function(_0x2e7ddf){const _0xdb73b=_0x17a6d5,_0x32566a=this[_0xdb73b(0x501)];_0x32566a[_0xdb73b(0x437)]=_0x2e7ddf;const _0x3176db=this[_0xdb73b(0x200)]['attachPictureSettings'](),_0x197083=_0x3176db[_0xdb73b(0x652)],_0x4b137f=_0x3176db[_0xdb73b(0x255)];let _0x5f346c=0x1;if(_0x197083>0x0){if(_0xdb73b(0x3b6)!==_0xdb73b(0x3b6))this[_0xdb73b(0x482)](_0x481555);else{let _0x352478=this[_0xdb73b(0x3f8)]()||0x1,_0xcb3111=this[_0xdb73b(0x318)]()||0x1;const _0x379af0=Math[_0xdb73b(0x533)](0x1,_0x352478,_0xcb3111);_0x5f346c=_0x197083/_0x379af0;}}_0x5f346c*=_0x4b137f,_0x5f346c!==0x1&&(this['_attachPictureSprite'][_0xdb73b(0x437)]['smooth']=!![]),_0x32566a['scale']['x']=_0x5f346c,_0x32566a[_0xdb73b(0x255)]['y']=_0x5f346c,this[_0xdb73b(0x4f8)]=!![],this[_0xdb73b(0x60c)]();},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x3f8)]=function(){const _0x60fd3d=_0x17a6d5,_0x1a9f25=this[_0x60fd3d(0x501)];if(!_0x1a9f25)return 0x0;return _0x1a9f25[_0x60fd3d(0x437)][_0x60fd3d(0x4c3)];},Sprite_Character[_0x17a6d5(0x2f0)][_0x17a6d5(0x318)]=function(){const _0x70af50=_0x17a6d5,_0x518031=this[_0x70af50(0x501)];if(!_0x518031)return 0x0;return _0x518031[_0x70af50(0x437)][_0x70af50(0x3c8)];},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x46f)]=Sprite_Balloon[_0x17a6d5(0x2f0)]['setup'],Sprite_Balloon[_0x17a6d5(0x2f0)][_0x17a6d5(0x220)]=function(_0x5f0cc0,_0xc1f1be){const _0x3942b5=_0x17a6d5;VisuMZ[_0x3942b5(0x480)][_0x3942b5(0x46f)][_0x3942b5(0x496)](this,_0x5f0cc0,_0xc1f1be);if(VisuMZ['EventsMoveCore'][_0x3942b5(0x429)][_0x3942b5(0x553)]['AutoBalloon']){if(_0x3942b5(0x5d1)!==_0x3942b5(0x2eb))this[_0x3942b5(0x214)][_0x3942b5(0x200)][_0x3942b5(0x490)](_0xc1f1be,this['_duration']);else{const _0x3171ef=_0x268470[_0x3942b5(0x49f)](_0x14af8b[_0x3942b5(0x57b)]||_0x4b1fa1['eventId']());if(!_0x3171ef)return;_0xb15a23[_0x3942b5(0x4d0)]!==_0x3942b5(0x500)?_0x3171ef[_0x3942b5(0x644)](_0x50e767[_0x3942b5(0x4d0)]):_0x3171ef[_0x3942b5(0x5a7)](_0x22cdb1[_0x3942b5(0x43f)],_0x121f33[_0x3942b5(0x338)]||_0x358c64[_0x3942b5(0x1ab)]());}}},VisuMZ['EventsMoveCore'][_0x17a6d5(0x61a)]=Sprite_Balloon[_0x17a6d5(0x2f0)][_0x17a6d5(0x2dd)],Sprite_Balloon[_0x17a6d5(0x2f0)][_0x17a6d5(0x2dd)]=function(){const _0x5232a7=_0x17a6d5;VisuMZ[_0x5232a7(0x480)][_0x5232a7(0x61a)][_0x5232a7(0x496)](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon['prototype']['updateVS8BalloonOffsets']=function(){const _0x2dbdf4=_0x17a6d5;if(this['_target'][_0x2dbdf4(0x200)][_0x2dbdf4(0x455)]()){if(_0x2dbdf4(0x47f)==='rAYbp'){if(_0x13b4af)this[_0x2dbdf4(0x1bd)](_0x5f286c['x'],_0x41ef95['y']);}else this['x']+=VisuMZ[_0x2dbdf4(0x480)][_0x2dbdf4(0x429)][_0x2dbdf4(0x553)]['BalloonOffsetX'],this['y']+=VisuMZ[_0x2dbdf4(0x480)]['Settings'][_0x2dbdf4(0x553)]['BalloonOffsetY'];}},Sprite_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x160)]=function(){const _0x2df4a5=_0x17a6d5;this[_0x2df4a5(0x437)]=new Bitmap(Math['round'](Graphics[_0x2df4a5(0x4ee)]/0x2),0x30),this['bitmap'][_0x2df4a5(0x5c5)]=this[_0x2df4a5(0x5c5)](),this[_0x2df4a5(0x437)][_0x2df4a5(0x52d)]=this[_0x2df4a5(0x52d)](),this[_0x2df4a5(0x437)]['outlineColor']=ColorManager[_0x2df4a5(0x479)]();},Sprite_Timer[_0x17a6d5(0x2f0)][_0x17a6d5(0x226)]=function(){const _0x1bc33c=_0x17a6d5,_0x5cbcc9=Math[_0x1bc33c(0x2ab)](this['_seconds']/0x3c/0x3c),_0x24ffa0=Math[_0x1bc33c(0x2ab)](this['_seconds']/0x3c)%0x3c,_0x4b7bf7=this[_0x1bc33c(0x2fd)]%0x3c;let _0x45ba73=_0x24ffa0['padZero'](0x2)+':'+_0x4b7bf7[_0x1bc33c(0x5de)](0x2);if(_0x5cbcc9>0x0)_0x45ba73=_0x1bc33c(0x5be)['format'](_0x5cbcc9,_0x45ba73);return _0x45ba73;};function Sprite_EventLabel(){const _0x8aafaa=_0x17a6d5;this[_0x8aafaa(0x467)](...arguments);}Sprite_EventLabel['prototype']=Object['create'](Sprite[_0x17a6d5(0x2f0)]),Sprite_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x39f)]=Sprite_EventLabel,Sprite_EventLabel['prototype']['initialize']=function(_0x3d4828){const _0x2ee5ef=_0x17a6d5;this[_0x2ee5ef(0x196)]=_0x3d4828,Sprite['prototype'][_0x2ee5ef(0x467)][_0x2ee5ef(0x496)](this),this['initMembers'](),this[_0x2ee5ef(0x590)]();},Sprite_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x31a)]=function(){const _0x272e34=_0x17a6d5;this[_0x272e34(0x498)]['x']=0.5,this['anchor']['y']=0x1;},Sprite_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x590)]=function(){const _0x56b283=_0x17a6d5,_0x8fef66=new Rectangle(0x0,0x0,0x1,0x1);this[_0x56b283(0x35a)]=new Window_Base(_0x8fef66),this[_0x56b283(0x35a)][_0x56b283(0x36b)]=0x0,this[_0x56b283(0x248)]=this[_0x56b283(0x42a)]()?0xff:0x0;},Sprite_EventLabel[_0x17a6d5(0x2f0)]['update']=function(){const _0x504fd0=_0x17a6d5;Sprite[_0x504fd0(0x2f0)][_0x504fd0(0x566)]['call'](this),this['updateText'](),this[_0x504fd0(0x1a4)](),this[_0x504fd0(0x2dd)](),this[_0x504fd0(0x1f1)]();},Sprite_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x2a3)]=function(){const _0x148002=_0x17a6d5;if(this[_0x148002(0x196)][_0x148002(0x20c)]()!==this['_text']){if(_0x148002(0x37d)!==_0x148002(0x37d)){const _0x49c0e7=this['event']()[_0x148002(0x489)];if(_0x49c0e7==='')return;if(_0x2338fe[_0x148002(0x30c)]()||_0x482f7e[_0x148002(0x379)]())return;const _0x46fa03=_0x59d491[_0x148002(0x480)][_0x148002(0x429)][_0x148002(0x391)];let _0xb1052b=null,_0x5cb48b=0x0,_0x5bf70c=0x0;if(_0x49c0e7[_0x148002(0x5d0)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x5cb48b=_0x338ce4(_0x1139c1['$1']),_0x5bf70c=_0x334b58(_0x525ec5['$2']);if(_0x5cb48b===0x0)_0x5cb48b=_0x4139c8[_0x148002(0x461)]();}else{if(_0x49c0e7[_0x148002(0x5d0)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x5cb48b=_0xc5845e(_0x4fcb9f['$1']),_0x5bf70c=_0x1b3f0c(_0x21299f['$2']);if(_0x5cb48b===0x0)_0x5cb48b=_0x360ce2[_0x148002(0x461)]();}else{if(_0x49c0e7[_0x148002(0x5d0)](/<COPY EVENT:[ ](.*?)>/i)){const _0x1a12f6=_0x1e1032(_0x581509['$1'])[_0x148002(0x43c)]()[_0x148002(0x520)]();_0xb1052b=_0x3d1a9f['EventTemplates'][_0x1a12f6];if(!_0xb1052b)return;_0x5cb48b=_0xb1052b['MapID'],_0x5bf70c=_0xb1052b['EventID'];}}}if(!this['checkValidEventerMap'](_0x5cb48b,_0x5bf70c))return;_0x46fa03[_0x148002(0x1e8)]['call'](this,_0x5cb48b,_0x5bf70c,this);if(_0xb1052b)_0xb1052b[_0x148002(0x1e8)][_0x148002(0x496)](this,_0x5cb48b,_0x5bf70c,this);this[_0x148002(0x43d)]={'mapId':_0x5cb48b,'eventId':_0x5bf70c},this['_pageIndex']=-0x2,this[_0x148002(0x662)](),_0x46fa03[_0x148002(0x4fa)]['call'](this,_0x5cb48b,_0x5bf70c,this);if(_0xb1052b)_0xb1052b['PostCopyJS'][_0x148002(0x496)](this,_0x5cb48b,_0x5bf70c,this);_0x4b81e5[_0x148002(0x494)]();}else this[_0x148002(0x57e)]=this[_0x148002(0x196)][_0x148002(0x20c)](),this[_0x148002(0x662)]();}},Sprite_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x662)]=function(){const _0x36198d=_0x17a6d5;if(!this[_0x36198d(0x35a)])return;this[_0x36198d(0x382)](),this[_0x36198d(0x352)]();},Sprite_EventLabel['prototype'][_0x17a6d5(0x382)]=function(){const _0x13a2bf=_0x17a6d5,_0xf89e20=this[_0x13a2bf(0x35a)][_0x13a2bf(0x1b5)](this[_0x13a2bf(0x57e)]),_0x4bb06b=this[_0x13a2bf(0x35a)]['itemPadding'](),_0x1d2c87=_0xf89e20[_0x13a2bf(0x4c3)]+_0x4bb06b*0x2,_0x2d75d8=_0xf89e20[_0x13a2bf(0x3c8)];this[_0x13a2bf(0x35a)]['move'](0x0,0x0,_0x1d2c87,_0x2d75d8),this[_0x13a2bf(0x35a)][_0x13a2bf(0x50e)](),this[_0x13a2bf(0x437)]=this[_0x13a2bf(0x35a)]['contents'];},Sprite_EventLabel[_0x17a6d5(0x2f0)]['drawText']=function(){const _0xfc324b=_0x17a6d5,_0x39ecb5=this[_0xfc324b(0x35a)][_0xfc324b(0x4b4)]();this[_0xfc324b(0x35a)][_0xfc324b(0x187)](this[_0xfc324b(0x57e)],_0x39ecb5,0x0);},Sprite_EventLabel['prototype']['updateScale']=function(){const _0x428217=_0x17a6d5,_0x4fd7ac=VisuMZ[_0x428217(0x480)][_0x428217(0x429)][_0x428217(0x36a)][_0x428217(0x5e2)],_0x4657ba=$gameSystem[_0x428217(0x44a)]()||0x1;this['scale']['x']=this[_0x428217(0x255)]['y']=_0x4fd7ac/_0x4657ba;},Sprite_EventLabel[_0x17a6d5(0x2f0)]['updatePosition']=function(){const _0x3931c0=_0x17a6d5;if(!SceneManager['_scene'])return;if(!SceneManager[_0x3931c0(0x669)][_0x3931c0(0x3e0)])return;const _0x36dbbc=SceneManager[_0x3931c0(0x669)][_0x3931c0(0x3e0)][_0x3931c0(0x56b)](this['_event']);if(!_0x36dbbc)return;this['x']=this[_0x3931c0(0x196)][_0x3931c0(0x436)](),this['x']+=this[_0x3931c0(0x196)][_0x3931c0(0x693)][_0x3931c0(0x232)],this['y']=this[_0x3931c0(0x196)][_0x3931c0(0x4f3)]()-_0x36dbbc[_0x3931c0(0x3c8)],this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this[_0x3931c0(0x196)][_0x3931c0(0x693)][_0x3931c0(0x3b7)];},Sprite_EventLabel['prototype']['updateOpacity']=function(){const _0x514a51=_0x17a6d5;if(this[_0x514a51(0x42a)]()){if(_0x514a51(0x4a9)===_0x514a51(0x4a9))this['opacity']+=this['opacitySpeed']();else{if(this[_0x514a51(0x622)]===_0x5f957b)this[_0x514a51(0x681)]();return this['_followerControlID'];}}else SceneManager[_0x514a51(0x669)][_0x514a51(0x2a5)]>0x0?this['opacity']=0x0:_0x514a51(0x4a6)!=='dXhFW'?this[_0x514a51(0x248)]-=this[_0x514a51(0x244)]():(_0x3372ca[_0x514a51(0x480)][_0x514a51(0x54a)]['call'](this),this[_0x514a51(0x437)][_0x514a51(0x1a6)](this['updateBitmapSmoothing']['bind'](this)));},Sprite_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x42a)]=function(){const _0x150037=_0x17a6d5;if(!$gameSystem['eventLabelsVisible']())return![];if(this['_event']?.['_erased'])return![];if(this[_0x150037(0x196)]&&this['_event'][_0x150037(0x23d)]<0x0)return![];if(SceneManager['_scene'][_0x150037(0x2a5)]>0x0)return![];const _0x1e3bc3=$gamePlayer['x'],_0x1b507d=$gamePlayer['y'],_0x14ba0c=this['_event']['x'],_0x4b65fa=this[_0x150037(0x196)]['y'];if(this[_0x150037(0x44f)]===_0x1e3bc3&&this[_0x150037(0x33a)]===_0x1b507d&&this['_visibleEventX']===_0x14ba0c&&this[_0x150037(0x2e4)]===_0x4b65fa)return this[_0x150037(0x4d1)];this['_visiblePlayerX']=$gamePlayer['x'],this[_0x150037(0x33a)]=$gamePlayer['y'],this[_0x150037(0x684)]=this[_0x150037(0x196)]['x'],this[_0x150037(0x2e4)]=this[_0x150037(0x196)]['y'];if($gameMap[_0x150037(0x41d)](_0x1e3bc3,_0x1b507d,_0x14ba0c,_0x4b65fa)>this['_event'][_0x150037(0x1d7)]())return this[_0x150037(0x4d1)]=![],![];return this[_0x150037(0x4d1)]=!![],!![];},Sprite_EventLabel[_0x17a6d5(0x2f0)]['opacitySpeed']=function(){const _0x736419=_0x17a6d5;return VisuMZ[_0x736419(0x480)][_0x736419(0x429)]['Label']['OpacitySpeed'];},VisuMZ['EventsMoveCore']['Spriteset_Map_createLowerLayer']=Spriteset_Map[_0x17a6d5(0x2f0)]['createLowerLayer'],Spriteset_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x45f)]=function(){const _0x5f1c6e=_0x17a6d5;VisuMZ[_0x5f1c6e(0x480)][_0x5f1c6e(0x5f4)]['call'](this),this[_0x5f1c6e(0x443)]();},VisuMZ['EventsMoveCore'][_0x17a6d5(0x1ac)]=Spriteset_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x2f6)],Spriteset_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x2f6)]=function(){const _0x4d8db4=_0x17a6d5;VisuMZ[_0x4d8db4(0x480)][_0x4d8db4(0x1ac)]['call'](this),this[_0x4d8db4(0x538)]();},Spriteset_Map[_0x17a6d5(0x2f0)]['createShadows']=function(){const _0x1f9169=_0x17a6d5;if(!VisuMZ['EventsMoveCore'][_0x1f9169(0x429)][_0x1f9169(0x554)]['ShowShadows'])return;for(const _0x5757bb of this['_characterSprites']){if(_0x1f9169(0x48c)!=='VrCfU')this[_0x1f9169(0x586)](_0x5757bb);else return this[_0x1f9169(0x28f)](_0x595ee1);}},Spriteset_Map[_0x17a6d5(0x2f0)]['createCharacterShadow']=function(_0x160306){const _0x4dc922=_0x17a6d5;_0x160306['_shadowSprite']=new Sprite(),_0x160306[_0x4dc922(0x359)][_0x4dc922(0x383)]=_0x160306[_0x4dc922(0x200)]['shadowFilename'](),_0x160306[_0x4dc922(0x359)][_0x4dc922(0x437)]=ImageManager['loadSystem'](_0x160306['_shadowSprite'][_0x4dc922(0x383)]),_0x160306['_shadowSprite']['anchor']['x']=0.5,_0x160306[_0x4dc922(0x359)][_0x4dc922(0x498)]['y']=0x1,_0x160306[_0x4dc922(0x359)]['z']=0x0,this[_0x4dc922(0x2af)][_0x4dc922(0x2bf)](_0x160306[_0x4dc922(0x359)]);},Spriteset_Map['prototype'][_0x17a6d5(0x1b8)]=function(){const _0x2dd41f=_0x17a6d5;if(!VisuMZ['EventsMoveCore'][_0x2dd41f(0x429)][_0x2dd41f(0x554)]['ShowShadows'])return;for(const _0xae7aa2 of this[_0x2dd41f(0x536)]){if(_0x2dd41f(0x22d)!==_0x2dd41f(0x4b2))this['_tilemap'][_0x2dd41f(0x3ce)](_0xae7aa2['_shadowSprite']);else{if(_0x428002)this[_0x2dd41f(0x485)](_0x53d794['x'],_0x19372c['y']);}}},Spriteset_Map[_0x17a6d5(0x2f0)]['createLabelWindows']=function(){const _0x10ee5d=_0x17a6d5;this[_0x10ee5d(0x185)]=[];for(const _0x232284 of $gameMap['events']()){_0x10ee5d(0x5c3)!==_0x10ee5d(0x5c3)?(_0x5c5509['EventsMoveCore'][_0x10ee5d(0x58b)][_0x10ee5d(0x496)](this,_0x1d3b2f),this[_0x10ee5d(0x4dd)]=![]):this[_0x10ee5d(0x2c5)](_0x232284);}},Spriteset_Map['prototype'][_0x17a6d5(0x2c5)]=function(_0x2de09f){const _0x296b4b=_0x17a6d5;if(!this[_0x296b4b(0x48b)](_0x2de09f))return;let _0x36b7dc;const _0x3fc22a=VisuMZ['EventsMoveCore']['Settings']['Label'][_0x296b4b(0x4bc)]??!![];_0x36b7dc=_0x3fc22a?new Sprite_EventLabel(_0x2de09f):new Window_EventLabel(_0x2de09f),_0x36b7dc['z']=0x8,_0x36b7dc[_0x296b4b(0x511)]=Sprite[_0x296b4b(0x5b7)]++,this[_0x296b4b(0x2af)]['addChild'](_0x36b7dc),this['_labelWindows'][_0x296b4b(0x16c)](_0x36b7dc);},Spriteset_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x48b)]=function(_0x64d20e){const _0x1d1f99=_0x17a6d5,_0x8cddf8=_0x64d20e[_0x1d1f99(0x49f)]();if(_0x8cddf8['note']['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x8cddf8[_0x1d1f99(0x489)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x1e6376 of _0x8cddf8['pages']){if(_0x1d1f99(0x631)==='MLION'){let _0x1c5d4b='';for(const _0x6a1047 of _0x1e6376[_0x1d1f99(0x1e2)]){[0x6c,0x198][_0x1d1f99(0x64c)](_0x6a1047[_0x1d1f99(0x17f)])&&(_0x1d1f99(0x37f)!==_0x1d1f99(0x61c)?_0x1c5d4b+=_0x6a1047['parameters'][0x0]:this['createCharacterShadow'](_0x2b11f3));}if(_0x1c5d4b[_0x1d1f99(0x5d0)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x1c5d4b['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x1d1f99(0x40b)!==_0x1d1f99(0x1de))return!![];else this[_0x1d1f99(0x501)][_0x1d1f99(0x437)][_0x1d1f99(0x486)]=!![];}}else{const _0x2f42a1=_0x33540b[_0x1d1f99(0x398)];this['_eventOverload']=this[_0x1d1f99(0x687)]()[_0x1d1f99(0x304)]>_0x2f42a1;if(this[_0x1d1f99(0x593)]&&_0x36a7b0['isPlaytest']()){}}}return![];},Spriteset_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x3e8)]=function(_0x13b19c){const _0x2b01c5=_0x17a6d5;this[_0x2b01c5(0x536)]=this['_characterSprites']||[];const _0x5de905=new Sprite_Character(_0x13b19c);this[_0x2b01c5(0x536)][_0x2b01c5(0x16c)](_0x5de905),this[_0x2b01c5(0x2af)][_0x2b01c5(0x2bf)](_0x5de905),this['createCharacterShadow'](_0x5de905),this[_0x2b01c5(0x2c5)](_0x13b19c),_0x5de905[_0x2b01c5(0x566)]();},Spriteset_Map[_0x17a6d5(0x2f0)][_0x17a6d5(0x3ed)]=function(){const _0x306344=_0x17a6d5;if(!this['_labelWindows'])return;for(const _0x43f32f of this[_0x306344(0x185)]){if('VnxGR'!=='VnxGR'){const _0x502091=_0x53ba49['event'](_0x84a90f[_0x306344(0x5aa)]||_0x278914[_0x306344(0x1ab)]());_0x502091[_0x306344(0x3ef)]();}else _0x43f32f&&(_0x43f32f[_0x306344(0x44f)]=undefined,_0x43f32f['refresh']());}},VisuMZ[_0x17a6d5(0x480)]['Game_Message_setNumberInput']=Game_Message['prototype'][_0x17a6d5(0x3d0)],Game_Message[_0x17a6d5(0x2f0)][_0x17a6d5(0x3d0)]=function(_0x5ce777,_0x5485f3){const _0x3d678b=_0x17a6d5;this[_0x3d678b(0x176)]=$gameTemp[_0x3d678b(0x3c5)](),VisuMZ['EventsMoveCore']['Game_Message_setNumberInput'][_0x3d678b(0x496)](this,_0x5ce777,_0x5485f3);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x5b4)]=Window_NumberInput[_0x17a6d5(0x2f0)][_0x17a6d5(0x3c7)],Window_NumberInput['prototype'][_0x17a6d5(0x3c7)]=function(){const _0x40cfb1=_0x17a6d5;$gameTemp[_0x40cfb1(0x301)]($gameMessage[_0x40cfb1(0x176)]),VisuMZ['EventsMoveCore'][_0x40cfb1(0x5b4)][_0x40cfb1(0x496)](this),$gameTemp[_0x40cfb1(0x5b0)]();},VisuMZ[_0x17a6d5(0x480)]['Window_NumberInput_processOk']=Window_NumberInput['prototype'][_0x17a6d5(0x1e4)],Window_NumberInput[_0x17a6d5(0x2f0)][_0x17a6d5(0x1e4)]=function(){const _0x350537=_0x17a6d5;$gameTemp['registerSelfTarget']($gameMessage[_0x350537(0x176)]),VisuMZ['EventsMoveCore'][_0x350537(0x239)][_0x350537(0x496)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x350537(0x176)]=undefined;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x1ae)]=Game_Message[_0x17a6d5(0x2f0)][_0x17a6d5(0x61b)],Game_Message['prototype'][_0x17a6d5(0x61b)]=function(_0x7fc517,_0x5232dd){const _0x303c14=_0x17a6d5;this['_selfTargetItemChoice']=$gameTemp[_0x303c14(0x3c5)](),VisuMZ[_0x303c14(0x480)][_0x303c14(0x1ae)]['call'](this,_0x7fc517,_0x5232dd);},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x45d)]=Window_EventItem[_0x17a6d5(0x2f0)][_0x17a6d5(0x570)],Window_EventItem[_0x17a6d5(0x2f0)][_0x17a6d5(0x570)]=function(){const _0x40e07b=_0x17a6d5;$gameTemp[_0x40e07b(0x301)]($gameMessage[_0x40e07b(0x3d1)]),VisuMZ[_0x40e07b(0x480)][_0x40e07b(0x45d)]['call'](this),$gameTemp[_0x40e07b(0x5b0)](),$gameMessage[_0x40e07b(0x3d1)]=undefined;},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x621)]=Window_EventItem[_0x17a6d5(0x2f0)][_0x17a6d5(0x188)],Window_EventItem[_0x17a6d5(0x2f0)][_0x17a6d5(0x188)]=function(){const _0x14c25a=_0x17a6d5;$gameTemp[_0x14c25a(0x301)]($gameMessage[_0x14c25a(0x3d1)]),VisuMZ[_0x14c25a(0x480)][_0x14c25a(0x621)]['call'](this),$gameTemp[_0x14c25a(0x5b0)](),$gameMessage[_0x14c25a(0x3d1)]=undefined;},VisuMZ[_0x17a6d5(0x480)]['Window_Message_startMessage']=Window_Message[_0x17a6d5(0x2f0)][_0x17a6d5(0x227)],Window_Message[_0x17a6d5(0x2f0)][_0x17a6d5(0x227)]=function(){const _0x24b4e5=_0x17a6d5;$gameMessage[_0x24b4e5(0x361)](),VisuMZ['EventsMoveCore'][_0x24b4e5(0x422)]['call'](this),$gameTemp[_0x24b4e5(0x5b0)]();},VisuMZ[_0x17a6d5(0x480)][_0x17a6d5(0x2cc)]=Window_ScrollText[_0x17a6d5(0x2f0)]['startMessage'],Window_ScrollText[_0x17a6d5(0x2f0)][_0x17a6d5(0x227)]=function(){const _0x43b6f2=_0x17a6d5;$gameMessage['registerSelfEvent'](),VisuMZ['EventsMoveCore']['Window_ScrollText_startMessage'][_0x43b6f2(0x496)](this),$gameTemp[_0x43b6f2(0x5b0)]();};function Window_EventLabel(){this['initialize'](...arguments);}function _0x2b85(){const _0x687780=['hasStepAnime','boxWidth','USER-DEFINED\x203','NUmEV','RemovePreserve','pages','screenY','_cacheSystemVisible','isSelfSwitch','jumpAll','%1%2','visible','getDiagonalDestination','PostCopyJS','HMPH','VisibleEventLabels','FollowerSetTargetChase','MapID','Game_CharacterBase_pattern','UNTITLED','_attachPictureSprite','Game_CommonEvent_isActive','stop','FavorHorz','copy','getDirectionFromPoint','List','visibleRange','MUSICNOTE','randomInt','hasCPCs','direction','parallelCommonEvents','createContents','return\x20%1','grTYP','spriteId','processMoveRouteBalloon','shiftY','ANGER','WyRij','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','despawnEventId','isAutoBufferIcon','jump','_spawnPreserved','isNearTheScreen','Game_CharacterBase_setDirection','Rope','KhJQK','moveAwayFromCharacter','trim','IMmAT','isRunning','USER-DEFINED\x204','moveTowardCharacter','YbkwO','Stop','player','updateEventCustomZ','_lastAttachPictureFilename','SpawnEventDespawnRegions','%1DockRegionOnly','canStartLocalEvents','fontSize','onLoadSuccess','CommonEventID','TurnInPlaceDelay','Game_Map_parallelCommonEvents','moveBackToRandomHome','max','forceDashing','fpSNy','_characterSprites','egKYe','createShadows','mirror\x20horz','Name','MapVariables','_lastPluginCommandInterpreter','%1Allow','rtsIm','acnXZ','Game_CharacterBase_direction','IACDH','JONvD','_callEventData','IconBlendMode','CewWK','setMoveSpeed','makeDeepCopy','charAt','getPosingCharacterPattern','Sprite_Character_setTileBitmap','Game_CharacterBase_moveStraight','LEFT','_frames','Game_Event_locate','tmpgu','Sprite_Character_setCharacterBitmap','innerWidth','Map\x20%1\x20Switch\x20%2','VS8','Movement','Direction','Game_CharacterBase_canPass','standing','SpawnEventAtXY','log','turnTowardPoint','createDisplayObjects','blhpy','deltaX','moveTowardPoint','3302243JBpzgb','SelfSwitches','OpacitySpeed','Game_CharacterBase_isDashing','moveRouteIndex','MUSIC','roundY','update','add','checkEventTriggerAuto','iniGl','deleteSavedEventLocationKey','findTargetSprite','UZtdU','Game_Map_event','mapValue','mnxPt','onOk','metCPC','EventTimerFramesSet','cPncx','isPreventSelfMovement','iPOVB','xJFmR','isVisible','createSpawnedEventWithData','restoreSavedEventPosition','Letter','Step1EventId','RegionOk','character','_text','isDashingAndMoving','Walk','Game_Map_setupEvents','round','status','CarryPose','PreloadedMaps','createCharacterShadow','setPose','Game_Map_isDashDisabled','EnableDashTilt','isAllowEventAutoMovement','Game_Follower_initialize','dWAZK','_expireCommonEvent','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setupPageSettings','createProxyWindow','Game_Follower_chaseCharacter','Game_Timer_stop','_eventOverload','_screenZoomScale','abs','ALLOW_LADDER_DASH','setTileBitmap','3046sGxmtr','processMoveRouteSetIndex','lastSpawnedEventID','LENEQ','_lastMapId','initEventsMoveCoreSettings','isCollidedWithEvents','conditions','filename','kinwb','updatePattern','Game_CharacterBase_isTransparent','Step2Preserve','isPosing','Game_Event_start','morphInto','setAllowEventAutoMovement','FastForwardKey','EventId','AirshipSpeed','attachPictureOffsetX','zoomScale','SwitchGetSelfSwitchABCD','EventLocationSave','clearSelfTarget','vjPKj','_vehicleType','PosX','Window_NumberInput_start','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Player','_counter','text','SWEAT','lOJbk','lock','characterPatternYBasic','_forceShowFollower','%1:%2','lOndV','Enable','UPPER\x20RIGHT','getSavedEventLocation','rLXax','...','fontFace','DOWN','setCharacterBitmap','7974fMXcMe','setupSpawn','tToRi','_randomMoveWeight','bufferX','Game_SelfSwitches_setValue','isDashing','ldPYF','match','nFtdK','HEART','hUZzm','SPIN\x20ACW','URWEY','isOnRope','ConvertParams','Game_Timer_initialize','_moveRoute','cmvQe','setEventLabelsVisible','isAllowCharacterTilt','EventLabelRefresh','padZero','DashModifier','vehicle','FDzii','FontSize','IDMJH','isShip','ffeXD','DUfGp','startCallEvent','NUM','NJDfC','horz\x20mirror','TSKIs','mbtJR','toLowerCase','checkEventTriggerThere','unlockEvent','roundYWithDirection','OLaPG','_pattern','isAdvancedSwitch','Spriteset_Map_createLowerLayer','attachPictureBlendMode','_spawnData','ARRAYEVAL','Game_Message_add','isMovementSucceeded','airship','%1,','reverseDir','AOPYx','isPassableByAnyDirection','isMapSwitch','dashSpeedModifier','_mirrorSprite','reverse\x20mimic','AdvancedSwitches','getEventIconData','ADDITIVE','processMoveRouteTeleportTo','updateSelfMovement','_SavedEventLocations','BsJDB','AdvancedVariables','updateStop','updateAttachPictureBitmap','XJzQZ','windowPadding','processMoveRouteMoveRepeat','VisuMZ_Setup_Preload_Map','_activationProximity','Event','27247zIESeW','Game_Followers_jumpAll','default','fcTGp','_eventSpawnData','string','savePreservedMorphEventDataKey','Sprite_Balloon_updatePosition','setItemChoice','clkaq','KVtFo','LbBav','bJVRx','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Window_EventItem_onCancel','_followerControlID','dLhGD','_reflection','YeaeF','hasEventIcon','DnJdq','_patternLocked','Game_CharacterBase_characterIndex','_alwaysUpdateMove','PlayerAllow','process_VisuMZ_EventsMoveCore_Switches_Variables','changeSpeed','_moveSpeed','ykHWN','shadowY','MLION','mUEfN','isMoveOnlyRegionPassable','clear','YNZAR','AOYvH','loadPicture','PlayerMovementChange','RandomMoveWeight','horizontal\x20mirror','Game_CharacterBase_realMoveSpeed','_commonEvents','OperateValues','variableValid','eventLabelsVisible','dir8','isEventClickTriggered','FollowerReset','VICTORY','morphIntoTemplate','processMoveSynchMirrorHorz','regionList','UwXNx','enable','adjustMoveSynchOpacityDelta','QUESTION','DEFAULT_SHIFT_Y','includes','min','isAirshipPassable','Visible','oHBHw','isSpawnedEvent','maxSize','_waitMode','pJzss','bLsdG','Game_Interpreter_PluginCommand','fDnSA','COBWEB','template','processMoveCommandEventsMoveCore','turnLeft90','Preserve','refreshIfNeeded','EventForbid','_PlayerDiagonalSetting','Collision','PXetX','refresh','tkmZq','setPlayerDiagonalSetting','sRGlb','setMoveRoute','getInputDirection','updateShadow','_scene','TUWkT','Region%1','checkActivationProximity','SCREEN','ehxOP','apply','determineCommonEventsWithCPC','despawnTerrainTags','_moveSynch','Frames','isEventOverloaded','saveEventLocation','setupPlayerVisibilityOverrides','Game_Vehicle_initMoveSpeed','PreMorphJS','lineHeight','BalloonOffsetY','Operation','_CPCs','HURT','checkEventTriggerEventsMoveCore','ykTqL','EventTimerPause','initFollowerController','Game_Map_setup','getPosingCharacterDirection','_visibleEventX','Hours','switch2Id','events','turnRight90','_active','isRegionAllowPass','HqgMx','PostSpawnJS','Game_Event_initialize','startMapCommonEventOnOK','_comments','UPPER\x20LEFT','_direction','dazWs','_labelWindow','UFxJs','meetActivationProximityConditions','SelfSwitchABCD','getPreservedMorphEventData','processMoveSynch','CkHtb','setPosition','Value','checkAdvancedSwitchVariablePresent','iconWidth','SuccessSwitchId','mykiE','FEsZK','setFrame','processMoveSynchCustom','createBitmap','_inputTime','mirror\x20vertical','processMoveRouteJumpTo','random','_diagonalSupport','isRegionForbidPass','opacityDelta','567924FNeWWf','TiltLeft','blendMode','deletePreservedMorphEventDataKey','push','AHedm','parameters','LIGHT','resetExitSelfSwitches','checkEventTriggerHere','pmElB','ITEM','Game_Timer_start','Seconds','_selfTargetNumberInput','isStopFollowerChasing','initEventsMoveCoreEffects','hpIiF','right','turnAwayFromPoint','setValue','_moveAllowPlayerCollision','MUSIC\x20NOTE','code','LIGHTBULB','Game_Character_setMoveRoute','refreshBushDepth','despawnEverything','isAnyEventStarting','_labelWindows','VnRjr','drawTextEx','onCancel','left','ARRAYNUM','IconBufferY','erase','VariableId','correctFacingDirection','processMoveSynchRandom','_followerChaseOff','_trigger','ZLirb','canPassDiagonally','Lswir','reserveCommonEvent','_event','_lastMovedDirection','_starting','_eventScreenX','needsUpdate','_forceHideFollower','inBattle','isTriggerIn','Sprite_Character_initMembers','removeTemporaryMapSpawnedEvents','filter','createSaveEventLocationData','updateAttachPictureSprite','Game_Temp_setDestination','updateScale','Game_CharacterBase_initMembers','addLoadListener','fDMtA','bind','activationRegionList','_moveOnlyRegions','eventId','Spriteset_Map_createShadow','spawnPreserved','Game_Message_setItemChoice','needsAttachPictureUpdate','CEZPY','_eventPageIndex','_periodicRefreshTimer','WIekn','isSelfVariable','textSizeEx','setupCopyEvent','jIltH','hideShadows','EventAllow','processMoveRouteStepFrom','CustomPageConditions','hasMoveOnlyRegions','processMoveRouteStepTo','eventsXyNt','PlayerIconDelete','_type','Allow','Region','bufferY','findDiagonalDirectionTo','updateEventLabelText','createIconSprite','Disable','ShipSpeed','setupMorphEvent','setDiagonalDirection','RegionOkTarget','MULTIPLY','OffsetX','updatePose','isSaveEventLocations','page','isSceneMap','_stopCount','setupEventsMoveCoreEffects','rBtmx','getPlayerDiagonalSetting','Game_Event_updateSelfMovement','labelWindowRange','Game_Variables_setValue','moveStraight','characterPatternY','MapId','deleteIconsOnEventsData','HBZPx','NLHFl','LtadA','processMoveRouteTeleportToCharacter','jMydY','list','AutoMoveEvents','processOk','Game_Event_updateParallel','realMoveSpeed','isActive','PreCopyJS','moveSynchTarget','updateMove','SpawnEventDespawnEverything','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','ANNOYED','custom','RrziY','VehicleForbid','updateOpacity','GPljU','8nIyelf','isBusy','Game_System_initialize','IpSMn','$preloadedMap_%1','updateRoutineMove','destinationX','clamp','BufferX','drawing','_eventLabelOffsetX','isSaveEventLocation','DsTOw','_character','Game_CharacterBase_moveDiagonally','MorphEventTo','vTdGd','UGuqn','RIGHT\x20TO\x20LEFT','QczSK','COESj','StrictCollision','_spriteOffsetX','boat','setPattern','labelWindowText','setChaseOff','UnlMl','_selfEvent','_DisablePlayerControl','BlendMode','CgItb','EventIconChange','_target','processMoveRouteHugWall','UtyHO','FUNC','FollowerSetControl','loadCPC','SwitchGetSelfSwitchID','locate','4CnRvYT','setEventIconData','onokC','496668KnGlfr','setup','deltaY','bkeFP','attachPictureFilename','804VUlmWD','zATzk','timerText','startMessage','OFF','processMoveRouteMoveTo','isDashDisabled','terrainTag','hasAdvancedSwitchVariable','UKgSp','_eventIconSprite','rwQlg','BoatSpeed','USER-DEFINED\x202','offsetX','thjrw','setMovementSuccess','_saveEventLocations','RIGHT','_spawnedEvents','Button','Window_NumberInput_processOk','Game_Interpreter_executeCommand','LIGHT\x20BULB','SoUqN','_pageIndex','ISQPC','Minutes','isSpawnHitboxCollisionOk','vUkVp','updatePeriodicRefresh','Game_CharacterBase_increaseSteps','opacitySpeed','setupDiagonalSupport','down','lCBCd','opacity','reverse\x20copy','isPlayerForceHidden','deleteIconsOnEventsDataKey','ccwY','GetMoveSynchTarget','HOXnP','Self\x20Variable\x20%1','firstSpawnedEvent','processMoveRouteFadeIn','requestRefresh','vMkyx','PreSpawnJS','scale','VariableGetSelfVariableID','PlayerForbid','processMoveRouteJumpForward','aSnXR','_eventId','characterIndexVS8','pos','CPCsMet','timer','getLastPluginCommandInterpreter','tMoKV','BvZAc','lastSpawnedEvent','eraseEvent','AgmaQ','YWMBw','isMoving','QdBnC','EventTimerExpireEvent','Forbid','SpawnEventAtRegion','ZQNsm','PreloadMaps','activationProximityType','zGEoU','isMapVariable','attachPictureSettings','isPassable','XOnZh','lastMovedDirection','mQazZ','Map%1-Event%2','_selfTarget','IGhBf','isCollidedWithPlayerCharacters','ARRAYSTR','clearDestination','olMgG','pJgjT','follower','autoEventIconBuffer','isLongPressed','tileWidth','Game_Event_meetsConditionsCPC','executeCommonEvent','HERpx','Ship','isDestinationValid','setCommonEvent','deltaXFrom','_addedHitbox','xHWxI','FpUXZ','resume','shadowX','OMhVT','spawnEventId','processMoveRouteStepToCharacter','GPADA','_randomHomeY','region','isWorking','processSaveEventLocation','setupSaveEventLocations','switchId','startMapCommonEventOnTouch','TerrainTag','PknMg','_EventIcons','Game_CharacterBase_hasStepAnime','jTFgh','ITxZe','contentsOpacity','MorphEventRemove','nRqdd','KNEEL','isInVehicle','updateText','tjAwi','_encounterEffectDuration','clearCarrying','HNAHi','moveDiagonally','bFReX','vGeKQ','floor','variableId','pattern','EventIconDelete','_tilemap','Game_CharacterBase_screenX','startEncounterEffect','sSQoW','aIzsg','krjtQ','Game_Character_processMoveCommand','Toggle','forceMoveRoute','WalkForbid','isAdvancedVariable','command357','setStopFollowerChasing','_needsPeriodicRefresh','advancedFunc','DaCIo','addChild','processMoveRouteAnimation','blt','_lastAttachPictureMaxSize','checkSmartEventCollision','AllAllow','createLabelWindowForTarget','Scene_Boot_onDatabaseLoaded','MoveRouteIndex','lyNRP','DashingEnable','JELFL','isOnLadder','Window_ScrollText_startMessage','posNt','_spriteOffsetY','resetSelfSwitchesForMap','concat','EnableDir8','eventsXy','WalkAllow','areFollowersForceHidden','mirror\x20vert','Game_Event_event','kXjMg','pause','wnUyi','meetActivationRegionConditions','aIMjF','getPosingCharacterIndex','updatePosition','setOpacity','updateEventsMoveCoreTagChanges','cGeJX','_PreservedEventMorphData','Chase','areFollowersForceShown','_visibleEventY','updateParallel','processMoveSynchApproach','autosaveEventLocation','updateMoveSynch','turnTowardCharacter','Game_Event_moveTypeRandom','EleIW','moveSynchType','Game_CharacterBase_updatePattern','convertSelfVariableValuesInScriptCall','processMoveRouteSelfSwitch','prototype','isAirship','isBigCharacter','parse','SelfVariableID','ZbBPc','createShadow','VyLpQ','SJJIQ','Passability','Game_Player_isMapPassable','figEU','fQTll','_seconds','requestBalloon','_forceDashing','NOTE','registerSelfTarget','isTile','name','length','BULB','pageIndex','LIGHT-BULB','EventAutoMovement','ZAxqE','_hidden','_randomHomeX','isBattleTest','OGQcN','_customZ','Game_CharacterBase_update','sDifO','Game_Event_update','ZZZ','_eventErased','radius','attachPictureOffsetY','tSZMQ','Zznsc','getAttachPictureBitmapHeight','characterIndex','initMembers','EventTemplates','Scene_Map_createDisplayObjects','isEventRunning','Game_Interpreter_character','wrxUC','isSupportDiagonalMovement','wQuyr','checkEventsMoveCoreStringTags','isLandOk','VehicleDock','deleteSavedEventLocation','description','xhdTe','destinationY','ddrsR','ShiftY','setupRegionRestrictions','Game_Vehicle_isLandOk','of\x20Preloaded\x20Maps.\x0a\x0a','Game_Troop_meetsConditionsCPC','Map\x20%1\x20Variable\x20%2','checkValidEventerMap','isPlayerForceShown','DevFp','format','_advancedSwitchVariable','moveByInput','advancedValue','TargetSwitchId','Step2EventId','getEventIconIndex','_visiblePlayerY','clearStepPattern','hasClickTrigger','processMoveSynchMirrorVert','Hidden','hKtmu','_lastAttachPictureScale','isPressed','kzvPI','Game_Timer_onExpire','canPass','JcAOa','isJumping','value','scrolledY','OffsetY','mirror\x20horizontal','frontY','%1Dock','Game_Event_checkEventTriggerAuto','FollowerID','hasDragonbones','_clickTrigger','pcZXi','drawText','checkCollisionKeywords','_dragonbones','jxHtc','isDashingEnabled','_EventsMoveCoreSettings','isTransparent','_shadowSprite','_proxyWindow','nwwzJ','CNTQI','FRUSTRATION','stOwZ','_attachPicture','setLastPluginCommandInterpreter','registerSelfEvent','onDatabaseLoaded','Game_Map_unlockEvent','SwitchId','MXyEO','Game_Map_update','getPose','clearDashing','despawnRegions','Label','padding','NwbWL','SPIN\x20COUNTERCLOCKWISE','Self\x20Switch\x20%1','SelfSwitchID','Game_Event_clearPageSettings','2567210nVbWZb','clearAttachPictureSettings','originalText','CUikK','_shadowGraphic','onClickTrigger','selfValue','Game_Event_findProperPageIndex','isEventTest','processMoveRouteMoveUntilStop','IconSet','turn180','hpOZt','Game_Player_getInputDirection','GdYXG','GcLGG','STRUCT','resizeWindow','_filename','replace','adjustDir8MovementSpeed','attachPictureMaxSize','StopAutoMoveMessages','Okaux','frameCount','_activationProximityAutoTriggerBypass','isSmartEventCollisionOn','target','tXaZG','prepareSpawnedEventAtTerrainTag','PageId','Map%1.json','Template','isNormalPriority','oTSKG','_callEventMap','switches','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','meetsConditions','_eventOverloadThreshold','Game_Player_isDashing','deltaYFrom','setControlledFollowerID','VisuMZ_1_MessageCore','FALSE','updatePatternEventsMoveCore','constructor','checkExistingEntitiesAt','switch1Valid','_forceHidePlayer','LeEwo','iconIndex','loadDataFile','setDestination','StopAutoMoveEvents','isPlaytest','onChange','exit','kgOLf','createAttachPictureSprite','findProperPageIndex','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','clearSpriteOffsets','Icon','rObti','updateVisibility','WhRTM','meetsCPC','ycShE','zXfAL','offsetY','Game_Event_meetsConditions','_interpreter','TerrainTags','Game_Event_isCollidedWithPlayerCharacters','oTpWp','Speed','WHiMY','_eventMorphData','characterName','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','moveTypeRandom','vert\x20mirror','Vgtvm','getSelfTarget','Game_Player_increaseSteps','start','height','All','processMoveRouteMoveToCharacter','_characterName','isShadowShrink','none','removeChild','isTurnInPlace','setNumberInput','_selfTargetItemChoice','xevHe','updateBitmapSmoothing','isShadowVisible','Game_Vehicle_isMapPassable','EventTimerSpeed','GcKTL','shadowFilename','updateShadowChanges','posEventsMoveCore','Game_Followers_isVisible','pageId','Game_Player_checkEventTriggerThere','290uMaUjW','cSDey','_spriteset','defaultFontSize','Game_Event_setupPageSettings','_regionRules','setupEvents','contents','_actuallyMoving','meetsSwitchCondition','createSpawnedEvent','loadSystem','_cpc','SVeDo','STR','refreshEventLabels','_erased','removeMorph','Game_CharacterBase_opacity','CallEvent','SPIN\x20CLOCKWISE','isValid','type','turnAwayFromCharacter','ship','mimic','getAttachPictureBitmapWidth','BufferY','ezmkq','Game_Character_forceMoveRoute','Step1MapId','SelfVariables','AvzMk','setEventIconDataKey','roundXWithDirection','CPC','getDirectionToPoint','DefaultShadow','nrmlA','gdTGT','tileHeight','execute','indexOf','executeCommand','processMoveRouteJumpToCharacter','xoXGl','resetFontSettings','USER-DEFINED\x205','GlYHx','variables','isBoat','Game_Variables_value','JYOzt','drawIcon','_eventCache','TiltRight','LOVE','_stepPattern','JSON','updateWaitMode','EventTimerResume','pluginCommandCallEvent','startMapCommonEventOnOKTarget','absDistance','IconSize','updateEventIconSprite','PostMorphJS','setupEventsMoveCoreNotetags','Window_Message_startMessage','FIFBV','BLsIn','requestAnimation','_eventLabelOffsetY','EnableTurnInPlace','ROUTE_SCRIPT','Settings','isLabelVisible','activationProximityDistance','backX','dxFkn','CxXQU','axqIO','processMoveSynchMimic','_opacity','_paused','_forceCarrying','useCarryPoseForIcons','Game_Map_events','screenX','bitmap','splice','ARRAYJSON','updateTilt','SpawnEventAtTerrainTag','toUpperCase','_eventCopyData','xHUil','Step2MapId','pZXlh','_pose','_MapSpawnedEventData','createLabelWindows','isPlayerControlDisabled','_realX','disable','MapSwitches','Game_Switches_value','_working','mainFontSize','map','DashOnLadder','setupFollowerVisibilityOverrides','create','_visiblePlayerX','setupSpawnTest','$callEventMap','clearPose','GlneZ','checkNeedForPeriodicRefresh','isSpriteVS8dir','IconBufferX','pWDaF','Game_Troop_meetsConditions','isMapPassable','_mapId','EventID','version','Window_EventItem_onOk','qAXGa','createLowerLayer','isRegionDockable','mapId','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','processMoveSynchAway','updateEventsAndMovementCore','MoveAllSynchTargets','BtWIt','initialize','setMapValue','vPkDy','QHxgT','uxesr','wxEyL','COLLAPSE','AutoBuffer','Sprite_Balloon_setup','keys','processMoveCommand','_requestSaveEventLocation','_forceShowPlayer','rotation','_commonEventId','followers','frontX','TgpKw','outlineColor','DjGIP','Game_Map_refresh','_moveRouteIndex','onExpire','2040eiYtvp','CcsZK','EventsMoveCore','SLEEP','executeMoveDir8','trigger','away','moveAwayFromPoint','smooth','processMoveSynchDirection','BCDDY','note','aaFPz','isTargetEventValidForLabelWindow','NjExT','_events','VdtWC','WpQlq','setBalloonPose','checkRegionEventTrigger','Game_Switches_setValue','_data','clearEventCache','Tigrv','call','slice','anchor','setupEventsMoveCoreCommentTags','updateEventMirrorSprite','startsWith','roundX','_speed','chaseCharacter','event','initEventsMoveCore','nuFeZ','getControlledFollowerID','rVWgC','HWsSY','ARRAYSTRUCT','hOdUL','afQKM','qzxRJ','HifEG','registerCommand','despawnAtXY','updateMoveSynchDirection','_poseDuration','delay','Sprite_Character_update','isObjectCharacter','setFrames','kmCQO','_eventIcon','itemPadding','determineEventOverload','processMoveRoutePatternLock','nSHGE','TiltVert','PosY','Visibility','VisuMZ_0_CoreEngine','SpriteBased','distance','SPIN\x20CW','executeMove','increaseSteps','getInputDir8','initMembersEventsMoveCore','width','updateSaveEventLocation','LineHeight','iconHeight','getMapSpawnedEventData','setDashingEnabled','zJrez','switch1Id','SelfDataResetAll','prepareSpawnedEventAtRegion','findDirectionTo','forceCarrying','regionId','TemplateName','_cacheVisibility','referEvent','backY','prepareSpawnedEventAtXY','clearPageSettings','VisibleRange','setDirection','DIAGONAL_PATHFINDING_EVENT_LIMIT','IconIndex','processMoveRouteFadeOut','EXCLAMATION','aYphc','_chaseOff','characterPatternYVS8','iconSize','split','some','Dock','NORMAL','SPIN\x20CCW','resetSelfSwitchesForEvent','pfjGK','onLoadAttachPicture','_saveEventLocation','GoQwW','setSelfValue','ccwX','SILENCE'];_0x2b85=function(){return _0x687780;};return _0x2b85();}Window_EventLabel[_0x17a6d5(0x2f0)]=Object[_0x17a6d5(0x44e)](Window_Base[_0x17a6d5(0x2f0)]),Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x39f)]=Window_EventLabel,Window_EventLabel['prototype'][_0x17a6d5(0x467)]=function(_0x434d8e){const _0x530946=_0x17a6d5;this[_0x530946(0x196)]=_0x434d8e;const _0x43cc6b=new Rectangle(0x0,0x0,Graphics['boxWidth']/0x4,this['fittingHeight'](0x1));this['initMembers'](),Window_Base['prototype'][_0x530946(0x467)][_0x530946(0x496)](this,_0x43cc6b),this[_0x530946(0x29e)]=0x0,this['setBackgroundType'](0x2),this[_0x530946(0x57e)]='';},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x31a)]=function(){const _0x45973a=_0x17a6d5;this[_0x45973a(0x313)]=![],this['_screenZoomScale']=$gameScreen[_0x45973a(0x5ad)](),this[_0x45973a(0x199)]=this[_0x45973a(0x196)][_0x45973a(0x436)](),this['_eventScreenY']=this[_0x45973a(0x196)][_0x45973a(0x4f3)](),this[_0x45973a(0x1fd)]=this[_0x45973a(0x196)]['_labelWindow'][_0x45973a(0x232)],this[_0x45973a(0x426)]=this[_0x45973a(0x196)][_0x45973a(0x693)][_0x45973a(0x3b7)],this['_eventPageIndex']=this[_0x45973a(0x196)][_0x45973a(0x23d)],this[_0x45973a(0x4d1)]=this['isLabelVisible'](),this[_0x45973a(0x4f4)]=$gameSystem[_0x45973a(0x63f)](),this[_0x45973a(0x44f)]=$gamePlayer['x'],this[_0x45973a(0x33a)]=$gamePlayer['y'],this[_0x45973a(0x684)]=this[_0x45973a(0x196)]['x'],this[_0x45973a(0x2e4)]=this['_event']['y'];},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x566)]=function(){const _0x3983f0=_0x17a6d5;Window_Base[_0x3983f0(0x2f0)]['update'][_0x3983f0(0x496)](this);if(!this[_0x3983f0(0x19a)]())return;this[_0x3983f0(0x2a3)](),this[_0x3983f0(0x1a4)](),this[_0x3983f0(0x2dd)](),this[_0x3983f0(0x1f1)]();},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x19a)]=function(){const _0x32059f=_0x17a6d5;if(!this[_0x32059f(0x196)])return![];if(!this[_0x32059f(0x196)][_0x32059f(0x693)])return![];if(this['_eventPageIndex']!==this[_0x32059f(0x196)]['_pageIndex'])return!![];if(this[_0x32059f(0x196)]['_erased']&&!this[_0x32059f(0x313)])return!![];if(this['_event'][_0x32059f(0x693)]['text']==='')return![];if(this[_0x32059f(0x594)]!==$gameScreen[_0x32059f(0x5ad)]())return!![];if(this[_0x32059f(0x199)]!==this[_0x32059f(0x196)][_0x32059f(0x436)]())return!![];if(this['_eventScreenY']!==this[_0x32059f(0x196)][_0x32059f(0x4f3)]())return!![];if(this[_0x32059f(0x1fd)]!==this[_0x32059f(0x196)][_0x32059f(0x693)]['offsetX'])return!![];if(this[_0x32059f(0x426)]!==this[_0x32059f(0x196)][_0x32059f(0x693)][_0x32059f(0x3b7)])return!![];if(this[_0x32059f(0x44f)]!==$gamePlayer['x'])return!![];if(this[_0x32059f(0x33a)]!==$gamePlayer['y'])return!![];if(this[_0x32059f(0x684)]!==this[_0x32059f(0x196)]['x'])return!![];if(this[_0x32059f(0x2e4)]!==this[_0x32059f(0x196)]['y'])return!![];if(this[_0x32059f(0x4f4)]!==$gameSystem[_0x32059f(0x63f)]())return!![];if(this[_0x32059f(0x4d1)]&&this[_0x32059f(0x29e)]<0xff)return!![];if(!this[_0x32059f(0x4d1)]&&this[_0x32059f(0x29e)]>0x0)return!![];if(SceneManager[_0x32059f(0x669)][_0x32059f(0x2a5)]>0x0)return!![];return![];},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x2a3)]=function(){const _0x5b93b7=_0x17a6d5;this[_0x5b93b7(0x196)]['labelWindowText']()!==this[_0x5b93b7(0x57e)]&&(this[_0x5b93b7(0x57e)]=this[_0x5b93b7(0x196)][_0x5b93b7(0x20c)](),this[_0x5b93b7(0x662)]());},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x1a4)]=function(){const _0xfc5a=_0x17a6d5;this[_0xfc5a(0x255)]['x']=0x1/$gameScreen['zoomScale'](),this['scale']['y']=0x1/$gameScreen[_0xfc5a(0x5ad)](),this[_0xfc5a(0x594)]=$gameScreen[_0xfc5a(0x5ad)]();},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x2dd)]=function(){const _0x6407e6=_0x17a6d5;if(!SceneManager[_0x6407e6(0x669)])return;if(!SceneManager[_0x6407e6(0x669)][_0x6407e6(0x3e0)])return;const _0x4d659a=SceneManager[_0x6407e6(0x669)]['_spriteset']['findTargetSprite'](this[_0x6407e6(0x196)]);if(!_0x4d659a)return;this['x']=Math[_0x6407e6(0x582)](this[_0x6407e6(0x196)]['screenX']()-Math[_0x6407e6(0x2ab)](this[_0x6407e6(0x4c3)]*this[_0x6407e6(0x255)]['x']/0x2)),this['x']+=this['_event']['_labelWindow']['offsetX'],this['y']=this[_0x6407e6(0x196)][_0x6407e6(0x4f3)]()-_0x4d659a[_0x6407e6(0x3c8)],this['y']+=Math[_0x6407e6(0x582)]($gameSystem['windowPadding']()*0.5),this['y']-=Math[_0x6407e6(0x582)](this[_0x6407e6(0x3c8)]*this[_0x6407e6(0x255)]['y']),this['y']+=this['_event'][_0x6407e6(0x693)][_0x6407e6(0x3b7)],this['_eventErased']=this[_0x6407e6(0x196)][_0x6407e6(0x3ee)],this['_eventScreenX']=this[_0x6407e6(0x196)][_0x6407e6(0x436)](),this['_eventScreenY']=this[_0x6407e6(0x196)]['screenY'](),this[_0x6407e6(0x1fd)]=this[_0x6407e6(0x196)][_0x6407e6(0x693)][_0x6407e6(0x232)],this[_0x6407e6(0x426)]=this[_0x6407e6(0x196)][_0x6407e6(0x693)][_0x6407e6(0x3b7)],this[_0x6407e6(0x1b1)]=this[_0x6407e6(0x196)][_0x6407e6(0x23d)],this[_0x6407e6(0x313)]&&(this[_0x6407e6(0x29e)]=0x0);},Window_EventLabel[_0x17a6d5(0x2f0)]['updateOpacity']=function(){const _0x22e38b=_0x17a6d5;if(this[_0x22e38b(0x42a)]()){if(_0x22e38b(0x573)!==_0x22e38b(0x573))return _0x30684f[_0x22e38b(0x480)][_0x22e38b(0x540)][_0x22e38b(0x496)](this);else this[_0x22e38b(0x29e)]+=this[_0x22e38b(0x244)]();}else SceneManager[_0x22e38b(0x669)]['_encounterEffectDuration']>0x0?this[_0x22e38b(0x29e)]=0x0:this['contentsOpacity']-=this[_0x22e38b(0x244)]();},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x42a)]=function(){const _0x2f1c9b=_0x17a6d5;if(!$gameSystem['eventLabelsVisible']())return![];if(this['_event']?.['_erased'])return![];if(SceneManager[_0x2f1c9b(0x669)][_0x2f1c9b(0x2a5)]>0x0)return![];const _0x154eef=$gamePlayer['x'],_0x5842cc=$gamePlayer['y'],_0x17f27d=this[_0x2f1c9b(0x196)]['x'],_0x41d73f=this[_0x2f1c9b(0x196)]['y'];if(this[_0x2f1c9b(0x44f)]===_0x154eef&&this[_0x2f1c9b(0x33a)]===_0x5842cc&&this[_0x2f1c9b(0x684)]===_0x17f27d&&this[_0x2f1c9b(0x2e4)]===_0x41d73f)return this[_0x2f1c9b(0x4d1)];this[_0x2f1c9b(0x44f)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x2f1c9b(0x684)]=this[_0x2f1c9b(0x196)]['x'],this[_0x2f1c9b(0x2e4)]=this[_0x2f1c9b(0x196)]['y'];if($gameMap[_0x2f1c9b(0x41d)](_0x154eef,_0x5842cc,_0x17f27d,_0x41d73f)>this[_0x2f1c9b(0x196)][_0x2f1c9b(0x1d7)]()){if(_0x2f1c9b(0x2c8)!=='SaIrz')return this['_cacheVisibility']=![],![];else{this['_forceShowFollower']=![],this[_0x2f1c9b(0x19b)]=![];if(!_0xd4b326)return;const _0x225b37=_0x12784e['note']||'';if(_0x225b37[_0x2f1c9b(0x5d0)](/<HIDE FOLLOWERS>/i))this[_0x2f1c9b(0x5bd)]=![],this[_0x2f1c9b(0x19b)]=!![];else _0x225b37[_0x2f1c9b(0x5d0)](/<SHOW FOLLOWERS>/i)&&(this['_forceShowFollower']=!![],this[_0x2f1c9b(0x19b)]=![]);}}return this['_cacheVisibility']=!![],!![];},Window_EventLabel[_0x17a6d5(0x2f0)]['opacitySpeed']=function(){const _0x6c3a68=_0x17a6d5;return VisuMZ[_0x6c3a68(0x480)]['Settings'][_0x6c3a68(0x36a)][_0x6c3a68(0x561)];},Window_EventLabel['prototype'][_0x17a6d5(0x382)]=function(){const _0xa31308=_0x17a6d5,_0x1ad8aa=this[_0xa31308(0x1b5)](this[_0xa31308(0x57e)]);this[_0xa31308(0x4c3)]=_0x1ad8aa[_0xa31308(0x4c3)]+($gameSystem[_0xa31308(0x60e)]()+this[_0xa31308(0x4b4)]())*0x2,this['height']=Math[_0xa31308(0x533)](this[_0xa31308(0x679)](),_0x1ad8aa[_0xa31308(0x3c8)])+$gameSystem[_0xa31308(0x60e)]()*0x2,this[_0xa31308(0x50e)]();},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x679)]=function(){const _0x20f52a=_0x17a6d5;return VisuMZ['EventsMoveCore'][_0x20f52a(0x429)]['Label'][_0x20f52a(0x4c5)];},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x40c)]=function(){const _0x1bfab2=_0x17a6d5;Window_Base[_0x1bfab2(0x2f0)]['resetFontSettings'][_0x1bfab2(0x496)](this),this['contents'][_0x1bfab2(0x52d)]=this[_0x1bfab2(0x3e1)]();},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x3e1)]=function(){const _0x8d2f4b=_0x17a6d5;return VisuMZ[_0x8d2f4b(0x480)]['Settings'][_0x8d2f4b(0x36a)][_0x8d2f4b(0x5e2)];},Window_EventLabel['prototype'][_0x17a6d5(0x662)]=function(){const _0x5497fb=_0x17a6d5;this['resizeWindow'](),this[_0x5497fb(0x3e5)][_0x5497fb(0x634)]();const _0x475072=this['_text'][_0x5497fb(0x4e0)](/[\r\n]+/);let _0x5709e8=0x0;for(const _0x2d9030 of _0x475072){const _0x4dd876=this[_0x5497fb(0x1b5)](_0x2d9030),_0x5a6154=Math[_0x5497fb(0x2ab)]((this[_0x5497fb(0x551)]-_0x4dd876[_0x5497fb(0x4c3)])/0x2);this[_0x5497fb(0x187)](_0x2d9030,_0x5a6154,_0x5709e8),_0x5709e8+=_0x4dd876[_0x5497fb(0x3c8)];}},Window_EventLabel[_0x17a6d5(0x2f0)]['processDrawIcon']=function(_0xea6a0d,_0x3c9065){const _0x295311=_0x17a6d5;_0x3c9065[_0x295311(0x1fc)]&&this[_0x295311(0x413)](_0xea6a0d,_0x3c9065['x']+0x2,_0x3c9065['y']),_0x3c9065['x']+=Math['min'](this[_0x295311(0x4df)](),ImageManager[_0x295311(0x69d)])+0x4;},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x413)]=function(_0x4a0fee,_0x38561f,_0x16d68a){const _0x5dc89a=_0x17a6d5,_0xa4b078=ImageManager[_0x5dc89a(0x3e9)](_0x5dc89a(0x37b)),_0x15e6c2=ImageManager[_0x5dc89a(0x69d)],_0x251c96=ImageManager['iconHeight'],_0x59f48c=_0x4a0fee%0x10*_0x15e6c2,_0xad641=Math['floor'](_0x4a0fee/0x10)*_0x251c96,_0x400ee8=Math[_0x5dc89a(0x64d)](this[_0x5dc89a(0x4df)]()),_0x1c35a8=Math[_0x5dc89a(0x64d)](this[_0x5dc89a(0x4df)]());this[_0x5dc89a(0x3e5)][_0x5dc89a(0x2c1)](_0xa4b078,_0x59f48c,_0xad641,_0x15e6c2,_0x251c96,_0x38561f,_0x16d68a,_0x400ee8,_0x1c35a8);},Window_EventLabel[_0x17a6d5(0x2f0)][_0x17a6d5(0x4df)]=function(){const _0x1baf7a=_0x17a6d5;return VisuMZ['EventsMoveCore'][_0x1baf7a(0x429)][_0x1baf7a(0x36a)][_0x1baf7a(0x41e)];};