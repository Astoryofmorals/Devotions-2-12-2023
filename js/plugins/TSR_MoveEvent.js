//========================================================================================
//=== TSR_MoveEvent === A Plugin by The Northern Frog ====================================
//========================================================================================

var TSR = TSR || {};
TSR.moveEvent = TSR.moveEvent || {};
TSR.moveEvent.version = 1.41;

var Imported = Imported || {};
Imported.TSR_MoveEvent = true;

//========================================================================================

/*:
 * @target MZ
 * @plugindesc v1.4.1 This plugin allow to push, pull, pick-up and throw events. 
 * 
 * @author TSR, The Northern Frog, 2021      
 * @help 
 * =========================================================================================
 * == About this Plugin ====================================================================
 * =========================================================================================
 * Use the following comment tags to turn the event page into a movable event.
 * 
 * Event Comment Tags:
 * ===================
 * 
 *            <MOVABLE EVENT>
 *                  Event page having this comment tag can be pushed and 
 *                  pulled by the player. 
 * 
 *                  <MOVABLE EVENT: X>
 *                      You can add a switch (X) argument to the comment
 *                      tag. If so, the event will only be movable when
 *                      the game switch X is ON. While the switch is OFF,
 *                      the player will react as if he can push/pull the
 *                      event, but it won't budge unless the switch is
 *                      turned ON.
 * 
 * 
 *            <MOVABLE MYSTERY: X>
 *                  Event page having this comment tag can be pushed and 
 *                  pulled by the player. In addition, these events will  
 *                  play the 'Mystery Sound' (set in parameters), and turn 
 *                  ON the switch specified by X. 
 * 
 *                  This will happen only the first time the event is moved.
 *                  Those events will be considered as regular movable events
 *                  afterwards.
 * 
 * 
 *            <PICKUP EVENT>
 *                  Event page having this comment tags can be picked up and
 *                  thrown by the player. You can use images from tiles sheets
 *                  or character sheets; in both case the event will be fixed
 *                  on the specified image, no matter the direction. The step
 *                  animation can be toggle ON when using a character sheet.
 *
 *              <PICKUP EVENT: X>
 *                  You can add a self switch X argument to the comment tag.
 *                  The event will turn ON the self switch specified by X 
 *                  when it reach the ground after being dropped or thrown. 
 *  
 *
 *            <PICKUP CHARACTER>
 *                  This comment tag have the same effect than the previous
 *                  one. But event having this comment tag must be assigned 
 *                  an image from a character sheet because they will turn
 *                  around according to the player direction when picked up.
 * 
 *                  Example:
 *                      The event is turned down and player comes from down
 *                      side (playing is looking up) and pick up the event.
 *                      The event and player are facing each other, so that
 *                      will remain when player change direction. Hence, if
 *                      player turn left, the event will turn right.
 *                  
 * 
 *            <MOVE EVENT OFFSET: X>
 *                  Use this tag if you need to adjust the distance the
 *                  player has to walk to get closer to the movable event.
 *                  Without the tag, the distance will be defined by the 
 *                  'move event offset' parameter. 
 * 
 *                  This commment tag can also be used on pickup events to
 *                  set the distance between the player and the event it is
 *                  holding.
 * 
 * 
 * Map Note Tag:
 * =============
 * 
 *      By default the thrown events respect the same passability as the player.
 *      You can throw events over some unpassable tiles by using the following
 *      tag in a map notebox.
 * 
 *            <THROW REGION: x, x, x>
 *                  Use this map notetag to mark some region Id as passable
 *                  for throwing event through those regions.
 * 
 * 
 *      Some tiles, like rooftop tiles, aren't accessible by the player, but
 *      are considerated as passable. To prevent throwing event on those tiles.
 *      use the map notetag bellow:
 * 
 *            <PREVENT THROW REGION: x, x, x>
 *                  Use this map notetag to mark some region Id as impassable
 *                  for throwing event through those regions.
 * 
 * 
 *      If you're not using the default tile passability and need to restrict
 *      the movement of movable events on some tiles, use the following map
 *      notetag. 
 * 
 *             <PREVENT MOVE REGION: x, x, x>
 *                  Use this map notetag to mark some region Id as impassable
 *                  for movable event through those regions.
 * 
 * 
 * HOW TO USE:
 * ===========
 * 
 * 
 * 
 *          TO PUSH: Hold the ARROW KEY in the direction toward the movable
 *                   event until it back off one tile.
 * 
 *          TO PULL: Hold the MOVE KEY when standing next to a movable event
 *                   and facing it, and wait until it move one tile.
 * 
 *              *The MOVE KEY is the OK button by default. But it can be
 *               changed to another key in the parameters (see bellow).
 * 
 *             **There's a small delay when pushing or pulling. Keep holding
 *               the key and you'll see the player starting to 'run' against 
 *               the movable event. Then you'll hear the 'Effort Sound' (set
 *               in parameters) and see the 'Effort Balloon' (also set in
 *               parameters). After a few more frames, the event will move
 *               and the player will move along with it.
 * 
 *            ***When pushing and pulling, the player will walk shortly to
 *               get closer to the movable event. The default distance is
 *               set in parameters. There's also an event comment tag to 
 *               assign specific distance to some events. 
 * 
 *           ****The pushing and pulling event will move at the speed set in
 *               the event tab. Player will move at same speed when pushing
 *               or pulling the event.
 * 
 * 
 *         TO PICKUP: Stand in front of a pickable event and hold the MOVE
 *                    KEY to pick it up. Keep holding the key because
 *                    releasing it will drop the event. You can move and
 *                    dash while holding an event. 
 * 
 *          TO THROW: Release the MOVE KEY to drop the event the player is
 *                    holding. The event will be dropped on the tile in front
 *                    of the player. If you drop it while holding an ARROW
 *                    KEY, the event will be thrown one tile away in front
 *                    of the player. And if you drop while holding both the
 *                    DASH BUTTON and an ARROW KEY, the event will be thrown
 *                    2 tiles away in front of the player.
 * 
 * 
 *     MOVE KEY
 *     ========
 *     To change the MOVE KEY, write the new key name in the corresponding
 *     parameter. Since 'escape'(open menu) and 'shift'(dash) can't be used,
 *     that leaves the following key names:
 * 
 *     tab 
 *     control (control, alt)
 *     pageup 
 *     pagedown
 * 
 *     You can also use alphabetic keys if your game is meant for keyboard
 *     control. Just type the key in the parameter, but keep in mind that
 *     using z, x, q or w won't do anything because these are already used
 *     by default.
 * 
 * 
 * 
 * CHARACTER IMAGES
 * ================
 * 
 *      The plugin allow to change the character images while moving events.
 *      To do so, set the sprite sheet name without extension, followed by
 *      the character index, separated by a comma, in the relevant parameter.
 * 
 *      The images that can be changed are as follow:
 * 
 *          -Push image:   will change the character image while the player is
 *                         pushing an event.
 *          -Pull image:   will change the character image while the player is
 *                         pulling an event.
 *          -Pickup image: will change the character image while the player is
 *                         holding an event.
 *          -throw image:  will change the character image while the player is
 *                         throwing an event.
 * 
 *              Example: hero_pushPose, 3
 * 
 *                    *entering the above in the Pushing Character Image
 *                     parameter will change the player image to the index
 *                     3 of the sprite sheet 'hero_pushPose', stored in the
 *                     /img/characters folder of your game. Image will revert
 *                     back to original player image once the pushing process
 *                     is over.
 *
 *      Move Frame Rate
 *      ===============
 *      By default, the character update their motion pattern each 12 frames.
 *      The default plugin update when pushing/pulling is 4, which give the
 *      look of the player 'running' against the movable event before it 
 *      start to move. 
 * 
 *      If you're using a push or pull custom image, that rate of 4 frames
 *      might not be optimal. Hence, the plugin provide a parameter to adjust
 *      that value to your liking.
 * 
 * 
 * SCRIPT CALLS:
 * =============
 * 
 *      In order to manage your movable events interaction on the map, you can 
 *      use a few script calls to check events position on the map.
 * 
 *       
 *      PUSH / PULL events
 *      ==================
 * 
 *      Use the following default call to check an event position at any time:
 * 
 *               $gameMap.event(eventId).pos(x, y) 
 * 
 *      It will return true or false wheter the event is at position x, y on
 *      the map. This can be checked in a parallel process event or in an
 *      autonomous movement script command.
 * 
 * 
 * 
 *      PICK & THROW events
 *      ===================
 *  
 *      These events can be a bit trickier to manage for game mechanics 
 *      purposes. The plugin provide additionnal script calls to check 
 *      these events positions.
 * 
 *               $gamePlayer.isHolding(eventId);
 * 
 *      This call will return true if the map event specified by eventId is 
 *      hold (carried) by the player.
 * 
 * 
 *               $gamePlayer.hasBroughtEvent(eventId, x, y, d)
 * 
 *      This call will return true if the map event specified by eventId is 
 *      hold by the player on tile x, y and turned in direction d.
 * 
 * 
 *               $gamePlayer.hasGaveEvent(eventId, targetEventId)
 * 
 *      This call will return true if the map event specified by eventId is 
 *      hold by the player on the tile in front of the map event specified
 *      by targetEventId The player must be facing the target event.
 * 
 * 
 *              $gamePlayer.hasThrownEvent(eventId, x, y)
 * 
 *      This one will returm true if the player has actually thrown or
 *      drop the map event specified by evenId on that exact tile at 
 *      position x, y.
 *     
 * 
 * 
 * =======================================================================================
 * == Term of Usage ======================================================================
 * =======================================================================================
 * 
 * Use in any independant RPG Maker MZ or MV projects, including commercials.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itch.io account: 
 * https://the-northern-frog.itch.io/
 * 
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 08/12/2020 completed plugin, v1.0.0
 * 07/03/2021 add parameters and instructions, v1.0.1
 * 08/03/2021 add script calls and some code fixes, v1.0.2
 * 09/03/2021 made some changes on script calls, v1.0.4
 * 10/03/2021 made some changes on throw/drop mechanics, v1.0.5
 * 12/03/2021 add move event speed and push/pull smooth transition, v1.0.7
 * 14/03/2021 fix 'mystery music effect', v1.0.8
 * 16/03/2021 fix some inconsistancies with character images, v1.0.9
 * 18/03/2021 add more comment tag for pickup event, v1.1.0
 * 19/03/2021 add switch option for movable event tag, v1.1.1
 * 24/03/2021 add a map notetag to prevent throwing on regionId, v1.1.2
 * 12/05/2021 add new event comment tag and fix compatibility issue, v1.1.4
 * 13/05/2021 some changes in the push/pull process, v1.1.5
 * 16/05/2021 add the <prevent throw region> map notetag, v1.1.6
 * 04/06/2021 add the option to change player image while moving events v1.2.6
 * 28/07/2021 add the <prevent move region> map notetag, v1.2.7
 * 01/09/2021 add the option to change the pull and pickup key v1.3.7
 * 23/09/2021 small fix for move/pickup key input v1.3.8
 * 28/10/2021 small fix and revamp of the key mapping v1.4
 * 03/05/2022 fix a bug with vehicules speed  v1.4.1
 *
 * =======================================================================================
 * == END ================================================================================                                             
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 * 
 * @param Move Key
 * @desc The name of the key for pulling and picking up
 * Default: ok (See plugin instruction)
 * @default ok
 * 
 * @param Move Event Offset
 * @type Number
 * @min 0
 * @desc The move offset when pushing and pulling events.
 * Default: 12
 * @default 12
 * 
 * @param Pickup Event Offset
 * @type Number
 * @min 0
 * @desc The offset when player hold a pickup event.
 * Default: 24
 * @default 24
 * 
 * @param Effort Balloon Id
 * @type Number
 * @min 1
 * @max 15
 * @desc The effort Balloon Icon Id when pushing/pulling.
 * Default: 11
 * @default 11
 * 
 * @param Move Frame Rate
 * @type Number
 * @min 1
 * @desc The frame rate of the character update when pushing/pulling.
 * Default: 4
 * @default 4
 * 
 * 
 * @param ---Sounds
 * 
 * @param Effort Sound
 * @parent ---Sounds
 * @desc The effort Sound when pushing/pulling
 * Default: Cry2, 60, 150, 0
 * @default Cry2, 60, 150, 0
 * 
 * @param Push Sound
 * @parent ---Sounds
 * @desc The sound when pushing/pulling an event
 * Default: Push, 100, 100, 0
 * @default Push, 100, 100, 0
 * 
 * @param Mystery Music Effect
 * @parent ---Sounds
 * @desc The music effect when pushing/pulling a 'Mystery' event
 * Default: Mystery, 100, 100, 0
 * @default Mystery, 100, 100, 0
 * 
 * @param Pickup Sound
 * @parent ---Sounds
 * @desc The sound when picking up an event
 * Default: Equip1, 60, 150, 0
 * @default Equip1, 60, 150, 0
 * 
 * @param Throw Sound
 * @parent ---Sounds
 * @desc The sound when throwing an event
 * Default: Jump1, 80, 80, 0
 * @default Jump1, 80, 80, 0
 * 
 * @param Drop Sound
 * @parent ---Sounds
 * @desc The sound when the event is drop (touch the ground)
 * Default: Blow1, 60, 150, 0
 * @default Blow1, 60, 150, 0
 * 
 * 
 * @param ---Motion images
 * 
 * @param Pushing Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default: 
 * @default
 * 
 * @param Pulling Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default: 
 * @default
 * 
 * @param Pickup Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default: 
 * @default
 * 
 * @param Throw Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default: 
 * @default
 * 
 */

(() => {
const _0x4fe5d1=_0x5162;(function(_0x16e9b4,_0x1f5841){const _0x2fd802=_0x5162,_0x3ed2bf=_0x16e9b4();while(!![]){try{const _0x551fc4=parseInt(_0x2fd802(0x165))/0x1*(parseInt(_0x2fd802(0x264))/0x2)+-parseInt(_0x2fd802(0x22e))/0x3+parseInt(_0x2fd802(0x27f))/0x4+-parseInt(_0x2fd802(0x18a))/0x5*(parseInt(_0x2fd802(0x191))/0x6)+-parseInt(_0x2fd802(0x232))/0x7*(-parseInt(_0x2fd802(0x1b2))/0x8)+parseInt(_0x2fd802(0x19c))/0x9*(-parseInt(_0x2fd802(0x25c))/0xa)+parseInt(_0x2fd802(0x186))/0xb*(parseInt(_0x2fd802(0x1a5))/0xc);if(_0x551fc4===_0x1f5841)break;else _0x3ed2bf['push'](_0x3ed2bf['shift']());}catch(_0x15ff60){_0x3ed2bf['push'](_0x3ed2bf['shift']());}}}(_0x50d5,0x86b94),TSR[_0x4fe5d1(0x213)]=PluginManager[_0x4fe5d1(0x1f7)](_0x4fe5d1(0x22a)),TSR['moveEvent']['_moveKey']=String(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x17b)]),TSR[_0x4fe5d1(0x1da)]['_moveOffset']=Number(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x204)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x21d)]=Number(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x181)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x25b)]=Number(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x1db)]),TSR['moveEvent']['_moveRate']=Number(TSR[_0x4fe5d1(0x213)]['Move\x20Frame\x20Rate']),TSR[_0x4fe5d1(0x1da)]['_effortSound']=String(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x194)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1c9)]=String(TSR['Parameters'][_0x4fe5d1(0x24d)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1a9)]=String(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x1c2)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x239)]=String(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x163)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x15f)]=String(TSR['Parameters']['Throw\x20Sound']),TSR['moveEvent'][_0x4fe5d1(0x161)]=String(TSR['Parameters'][_0x4fe5d1(0x152)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x189)]=String(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x1b6)]),TSR[_0x4fe5d1(0x1da)]['_pullImage']=String(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x1fc)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x234)]=String(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x180)]),TSR[_0x4fe5d1(0x1da)]['_throwImage']=String(TSR[_0x4fe5d1(0x213)][_0x4fe5d1(0x23c)]),TSR['moveEvent'][_0x4fe5d1(0x1e8)]=function(_0x2c2926){const _0x4e2e67=_0x4fe5d1;array=_0x2c2926[_0x4e2e67(0x284)](',');if(array[_0x4e2e67(0x192)]<0x4)return null;const _0x217afb=array[0x0],_0x416d01=parseInt(array[0x1]),_0x4052c0=parseInt(array[0x2]),_0x2dbbef=parseInt(array[0x3]);return{'name':_0x217afb,'volume':_0x416d01,'pitch':_0x4052c0,'pan':_0x2dbbef};},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1f6)]=function(_0x166908){const _0x5372c3=_0x4fe5d1;array=_0x166908[_0x5372c3(0x284)](',');if(array['length']<0x2)return null;const _0x177193=array[0x0],_0x34068a=parseInt(array[0x1]);return[_0x177193,_0x34068a];},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1f5)]=TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1f6)](TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x189)]),TSR['moveEvent']['_pullSheet']=TSR['moveEvent']['makeSheetInfo'](TSR[_0x4fe5d1(0x1da)]['_pullImage']),TSR['moveEvent'][_0x4fe5d1(0x220)]=TSR['moveEvent'][_0x4fe5d1(0x1f6)](TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x234)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x27c)]=TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1f6)](TSR['moveEvent'][_0x4fe5d1(0x263)]),TSR['moveEvent'][_0x4fe5d1(0x203)]=TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1e8)](TSR['moveEvent'][_0x4fe5d1(0x203)]),TSR['moveEvent']['_pushSound']=TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1e8)](TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1c9)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1a9)]=TSR['moveEvent'][_0x4fe5d1(0x1e8)](TSR['moveEvent'][_0x4fe5d1(0x1a9)]),TSR['moveEvent']['_pickupSound']=TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1e8)](TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x239)]),TSR[_0x4fe5d1(0x1da)]['_throwSound']=TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1e8)](TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x15f)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x161)]=TSR['moveEvent']['makeSoundObj'](TSR['moveEvent'][_0x4fe5d1(0x161)]),TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x275)]={'a':0x41,'b':0x42,'c':0x43,'d':0x44,'e':0x45,'f':0x46,'g':0x47,'h':0x48,'i':0x49,'j':0x4a,'k':0x4b,'l':0x4c,'m':0x4d,'n':0x4e,'o':0x4f,'p':0x50,'r':0x52,'s':0x53,'t':0x54,'u':0x55,'v':0x56,'y':0x59});function _0x5162(_0x555826,_0x232248){const _0x50d52b=_0x50d5();return _0x5162=function(_0x516264,_0x1702bf){_0x516264=_0x516264-0x146;let _0x59481e=_0x50d52b[_0x516264];return _0x59481e;},_0x5162(_0x555826,_0x232248);}if(TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1f0)]!=='ok'){const newKey=TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x275)][TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1f0)]];Input['keyMapper'][newKey]=TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1f0)];}function _0x50d5(){const _0x32878c=['_moveSpeed','_cacheCharIndex','55HLGQpg','_isMovableChar','events','_pushImage','673675tiuKvv','requestBalloon','_pattern','pullDist','isCollidedWithPickableEvent','_cacheEnableJump','isPressed','36LNiSNW','length','playThrow','Effort\x20Sound','_Game_Player_update','isCollidedWithMovableEvent','_pushEventCount','setThrough','isPickable','_Scene_Map_stop','_isMovable','54fFKDRY','pickupOffset','thrownAt','unsetPause','list','isPushing','setMovingEventPreventMove','_characterName','playEffort','4455420fBZerx','_moveOffset','setPickup','_Spriteset_Map_createLowerLayer','_mysterySound','setPattern','getInputDirection','pushMoved','_jumpEnable','setDirection','requireThrowShadow','mapCoordinates','push','1129264hHXqTE','_isBrought','_moveRouteIndex','straighten','Pushing\x20Character\x20Image','moveSpeed','updateThrow','isPreventThrowRegion','setBackDist','normalSpeed','_lastY','eventId','isBreakable','setPriorityType','_throwSpriteSet','updatePull','Mystery\x20Music\x20Effect','_directionFix','loadBitmap','updateThrowShadowSprites','_requireThrowShadow','constructor','throwDestination','_pushSound','isCollidedWithCharacters','pickableEvent','setupThrowShadow','maxPattern','setFrame','_pullCount','locate','_moveRate','_cacheDirFix','isMovementSucceeded','moveEventStraight','_Game_System_initialize','_normalSpeed','isPickup','setup','pullMoved','moveEvent','Effort\x20Balloon\x20Id','_throwDestination','updatePattern','stop','note','setPushMoved','movableEventCanPass','removeChild','reverseDir','bitmap','isThrow','mapId','_Game_Player_initMembers','makeSoundObj','_character','hasPickup','sqrt','_throwPattern','isEventRunning','isMovable','roundYWithDirection','_moveKey','event','isMoving','updatePickup','resetCacheImage','_pushSheet','makeSheetInfo','parameters','canPush','pickupEvent','pushDist','setPause','Pulling\x20Character\x20Image','_patternCount','isTriggered','_moveEventOffset','Shadow1','_pushDist','roundXWithDirection','_effortSound','Move\x20Event\x20Offset','initMembers','createThrowShadow','isPlayer','eventsXyNt','isPassable','match','_hasThrew','isPlaying','setDirInfo','createLowerLayer','toString','cacheSpeed','some','checkMystery','Parameters','_pushCount','playPush','_cacheCharName','setThrowDestination','_balloonQueue','_scene','_Sprite_Character_updatePosition','resetPushing','_backDist','_pickupOffset','_isPickupChar','isPreventMoveRegion','_pickupSheet','loadSystem','moveOffset','setRequireThrowShadow','_GamePlayer_canMove','playMe','_dashing','_pullDist','_isPushing','screenY','TSR_MoveEvent','_duration','movableEvent','_dirInfo','1199862IkcRPM','_Sprite_Character_initMembers','scale','anchor','7ZdBZMo','mapJump','_pickupImage','_threwMidAir','throwPickup','call','startThrowShadow','_pickupSound','forceMove','executePush','Throw\x20Character\x20Image','isThrowRegion','playMystery','xWithDirection','_jumpOffset','_throwShadowContainer','_charSprite','_mysteryEvents','isHolding','_cacheSpeed','setMoveSpeed','canMove','_moveJump','screenZ','_isPickup','_eventId','setPosition','Push\x20Sound','update','resetPulling','hasStepAnime','createThrowShadowContainer','makeEffort','_Game_CharacterBase_updatePattern','updatePickupEvent','characterIndex','_tilemap','_pushMoved','canPass','calcDirection','playDrop','_effortBallonId','1014510dJahjQ','_lastX','_movableSwitch','_isPickable','isMovingEvent','endPickup','updatePush','_throwImage','2KgpiPx','value','enableMenu','resetSpeed','create','name','isRepeated','_pushEvent','updateShadowPosition','isCollidedWithEvents','tileWidth','isNormalPriority','prototype','_pullEvent','regionId','updatePushEvent','checkCacheImage','_alphaKeyList','_pickupEvent','height','_dist','vehicle','isInVehicle','canPull','_throwSheet','_spriteset','executePull','1395120AirQjM','setMoveOffset','_throwCount','addChild','updatePosition','split','_Game_Event_isCollidedWithEvents','screenX','setPushDist','isPulling','throwPass','setPullSpeed','setPullDist','_movingEventPreventMove','_hasPickup','canMoveEvent','setThrow','_jumpPeak','Drop\x20Sound','_jumpCount','setPullMoved','width','setMovableEvent','setValue','isThrowCliff','pullSpeed','_realY','indexOf','setMovementSuccess','direction','executePickup','_throwSound','resetPattern','_dropSound','_isBreakable','Pickup\x20Sound','initialize','22535GWBfsW','page','playSe','setupPage','_pullEventCount','contains','TSR_MapJump','setNormalSpeed','disableMenu','_realX','_pullSpeed','_Sprite_Character_update','backDist','slice','movingEventPreventMove','_pullSheet','_isPulling','isCliff','_characterIndex','_throw','isHoldingOk','evalDist','Move\x20Key','moveStraight','_pullMoved','dirInfo','_direction','Pickup\x20Character\x20Image','Pickup\x20Event\x20Offset','_Game_Event_setupPage','setDirectionFix'];_0x50d5=function(){return _0x32878c;};return _0x50d5();}DataManager[_0x4fe5d1(0x23d)]=function(_0x47d4de){const _0x431274=_0x4fe5d1;if(!$dataMap)return![];const _0x376f0f=/<(?:THROW REGION|THREW REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x200c95=$dataMap[_0x431274(0x1df)][_0x431274(0x20f)]()[_0x431274(0x284)](/[\r\n]+/);for(const _0x419b0d of _0x200c95){if(_0x419b0d['match'](_0x376f0f)){const _0x18a122=_0x419b0d[_0x431274(0x172)](_0x419b0d[_0x431274(0x15b)](':')+0x1)[_0x431274(0x284)](',');for(const _0x9ed175 in _0x18a122){if(parseInt(_0x18a122[_0x9ed175])===_0x47d4de)return!![];}}}return![];},DataManager['isPreventThrowRegion']=function(_0x31dfe8){const _0x3e8420=_0x4fe5d1;if(!$dataMap)return![];const _0x4c4c32=/<(?:PREVENT THROW REGION|PREVENT THREW REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x49af3e=$dataMap[_0x3e8420(0x1df)][_0x3e8420(0x20f)]()['split'](/[\r\n]+/);for(const _0x1f9721 of _0x49af3e){if(_0x1f9721[_0x3e8420(0x20a)](_0x4c4c32)){const _0x3616db=_0x1f9721[_0x3e8420(0x172)](_0x1f9721['indexOf'](':')+0x1)['split'](',');for(const _0x34c89d in _0x3616db){if(parseInt(_0x3616db[_0x34c89d])===_0x31dfe8)return!![];}}}return![];},DataManager[_0x4fe5d1(0x21f)]=function(_0x16918a){const _0x966e44=_0x4fe5d1;if(!$dataMap)return![];const _0x4e3290=/<(?:PREVENT MOVE REGION|PREVENT MOVE REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x280210=$dataMap[_0x966e44(0x1df)][_0x966e44(0x20f)]()[_0x966e44(0x284)](/[\r\n]+/);for(const _0x4a7019 of _0x280210){if(_0x4a7019[_0x966e44(0x20a)](_0x4e3290)){const _0x23e12e=_0x4a7019[_0x966e44(0x172)](_0x4a7019[_0x966e44(0x15b)](':')+0x1)[_0x966e44(0x284)](',');for(const _0x184742 in _0x23e12e){if(parseInt(_0x23e12e[_0x184742])===_0x16918a)return!![];}}}return![];},SoundManager[_0x4fe5d1(0x1a4)]=function(){const _0x468604=_0x4fe5d1,_0x51eb43=TSR[_0x468604(0x1da)]['_effortSound'];_0x51eb43&&AudioManager[_0x468604(0x167)](_0x51eb43);},SoundManager[_0x4fe5d1(0x215)]=function(){const _0x1982df=_0x4fe5d1,_0x887bf0=TSR[_0x1982df(0x1da)]['_pushSound'];_0x887bf0&&AudioManager[_0x1982df(0x167)](_0x887bf0);},SoundManager[_0x4fe5d1(0x23e)]=function(){const _0x5b9250=_0x4fe5d1,_0x38706b=TSR[_0x5b9250(0x1da)][_0x5b9250(0x1a9)];_0x38706b&&AudioManager[_0x5b9250(0x225)](_0x38706b);},SoundManager['playPickup']=function(){const _0x8ed404=_0x4fe5d1,_0x5dc99c=TSR[_0x8ed404(0x1da)][_0x8ed404(0x239)];_0x5dc99c&&AudioManager['playSe'](_0x5dc99c);},SoundManager[_0x4fe5d1(0x193)]=function(){const _0x3cb21d=TSR['moveEvent']['_throwSound'];_0x3cb21d&&AudioManager['playSe'](_0x3cb21d);},SoundManager['playDrop']=function(){const _0x118f59=_0x4fe5d1,_0x30b0e1=TSR[_0x118f59(0x1da)][_0x118f59(0x161)];_0x30b0e1&&AudioManager[_0x118f59(0x167)](_0x30b0e1);},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x19a)]=Scene_Map[_0x4fe5d1(0x270)][_0x4fe5d1(0x1de)],Scene_Map[_0x4fe5d1(0x270)][_0x4fe5d1(0x1de)]=function(){const _0x4f4d01=_0x4fe5d1;TSR[_0x4f4d01(0x1da)][_0x4f4d01(0x19a)][_0x4f4d01(0x237)](this),$gamePlayer[_0x4f4d01(0x21b)](),$gamePlayer[_0x4f4d01(0x24f)](),$gamePlayer['endMapPickup'](),$gamePlayer['setBackDist'](![]),$gamePlayer[_0x4f4d01(0x1a2)](![]);},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1d5)]=Game_System[_0x4fe5d1(0x270)][_0x4fe5d1(0x164)],Game_System['prototype']['initialize']=function(){const _0x27ceb3=_0x4fe5d1;TSR[_0x27ceb3(0x1da)][_0x27ceb3(0x1d5)][_0x27ceb3(0x237)](this),this[_0x27ceb3(0x243)]={};},TSR['moveEvent'][_0x4fe5d1(0x253)]=Game_CharacterBase[_0x4fe5d1(0x270)]['updatePattern'],Game_CharacterBase[_0x4fe5d1(0x270)][_0x4fe5d1(0x1dd)]=function(){const _0x358ade=_0x4fe5d1;if(this[_0x358ade(0x18d)]()||this[_0x358ade(0x1fa)]()||this[_0x358ade(0x171)]()||this[_0x358ade(0x1ec)])this[_0x358ade(0x18c)]=(this[_0x358ade(0x18c)]+0x1)%this[_0x358ade(0x1cd)]();else!this['_throwPattern']&&TSR[_0x358ade(0x1da)][_0x358ade(0x253)][_0x358ade(0x237)](this);},Game_CharacterBase[_0x4fe5d1(0x270)][_0x4fe5d1(0x19e)]=function(_0x5b4097,_0x527ad6){const _0x4fcc98=_0x4fe5d1;this['_x']+=_0x5b4097,this['_y']+=_0x527ad6;const _0x50d271=Math['round'](Math[_0x4fcc98(0x1eb)](_0x5b4097*_0x5b4097+_0x527ad6*_0x527ad6));this[_0x4fcc98(0x151)]=0xa+_0x50d271-this[_0x4fcc98(0x184)],this[_0x4fcc98(0x153)]=this[_0x4fcc98(0x151)]*0x2;},Game_CharacterBase[_0x4fe5d1(0x270)][_0x4fe5d1(0x1d4)]=function(_0x2679a3){const _0x2ac6d5=_0x4fe5d1;this[_0x2ac6d5(0x15c)](this[_0x2ac6d5(0x258)](this['_x'],this['_y'],_0x2679a3));if(this[_0x2ac6d5(0x1d3)]()){this['_x']=$gameMap['roundXWithDirection'](this['_x'],_0x2679a3),this['_y']=$gameMap[_0x2ac6d5(0x1ef)](this['_y'],_0x2679a3),this['_realX']=$gameMap[_0x2ac6d5(0x23f)](this['_x'],this['reverseDir'](_0x2679a3)),this[_0x2ac6d5(0x15a)]=$gameMap['yWithDirection'](this['_y'],this['reverseDir'](_0x2679a3));if(this[_0x2ac6d5(0x187)])this['increaseSteps']();}},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x244)]=function(_0x5eca93){const _0x149f0a=_0x4fe5d1,_0x4bb05c=$gameMap['event'](_0x5eca93);return this[_0x149f0a(0x276)]===_0x4bb05c&&this[_0x149f0a(0x1ea)]();},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x1f9)]=function(){const _0x35e2c8=_0x4fe5d1;return this[_0x35e2c8(0x276)];},Game_Character['prototype']['hasPickup']=function(){const _0x4f499b=_0x4fe5d1;return this[_0x4f499b(0x14e)];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x1be)]=function(){const _0x2b6482=_0x4fe5d1;return this[_0x2b6482(0x162)];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x1a7)]=function(_0x187ea1){const _0x294f80=_0x4fe5d1;this[_0x294f80(0x24a)]=_0x187ea1;},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x1d7)]=function(){return this['_isPickup'];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x150)]=function(_0x1a4b08){this['_throw']=_0x1a4b08;},Game_Character['prototype'][_0x4fe5d1(0x1e5)]=function(){const _0x51cbd6=_0x4fe5d1;return this[_0x51cbd6(0x178)];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x217)]=function(_0x24101c,_0x4875e8,_0x2ebe1d,_0x5341ed,_0x1037be){const _0x17590a=_0x4fe5d1;if(_0x24101c===_0x2ebe1d&&_0x4875e8===_0x5341ed){const _0x3ea19a=0xa-_0x1037be,_0x4daa16=_0x1037be===0x4||_0x1037be===0x6?0x2:0x4,_0x438754=0xa-_0x4daa16,_0x2fee6d=[_0x3ea19a,_0x4daa16,_0x438754];for(const _0x5a3668 of _0x2fee6d){if($gamePlayer['throwPass'](_0x2ebe1d,_0x5341ed,_0x5a3668)){_0x24101c=$gameMap[_0x17590a(0x202)](_0x2ebe1d,_0x5a3668),_0x4875e8=$gameMap[_0x17590a(0x1ef)](_0x5341ed,_0x5a3668);break;}}}this[_0x17590a(0x1dc)]=[_0x24101c,_0x4875e8];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x1c8)]=function(){const _0xaecde4=_0x4fe5d1;return this[_0xaecde4(0x1dc)];},Game_Character['prototype'][_0x4fe5d1(0x1af)]=function(){const _0x1e61ba=_0x4fe5d1;return this[_0x1e61ba(0x1c6)];},Game_Character['prototype'][_0x4fe5d1(0x223)]=function(_0x5d85a5){this['_requireThrowShadow']=_0x5d85a5;},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x158)]=function(){const _0x14ef3a=_0x4fe5d1;if(Imported[_0x14ef3a(0x16b)])return this[_0x14ef3a(0x176)](this[_0x14ef3a(0x16e)],this[_0x14ef3a(0x15a)]);return![];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x260)]=function(){const _0x15db75=_0x4fe5d1;return this[_0x15db75(0x228)]||this[_0x15db75(0x175)];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x1a1)]=function(){return![];},Game_Character['prototype'][_0x4fe5d1(0x148)]=function(_0x3d1d51){const _0x3cc07e=_0x4fe5d1;this[_0x3cc07e(0x201)]=_0x3d1d51;},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x1fa)]=function(){return this['_pushDist'];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x14c)]=function(_0x4f144c){const _0x3709f6=_0x4fe5d1;this[_0x3709f6(0x227)]=_0x4f144c;},Game_Character[_0x4fe5d1(0x270)]['pullDist']=function(){const _0x2d1519=_0x4fe5d1;return this[_0x2d1519(0x227)];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x1ba)]=function(_0x2b82d6){const _0x5b4eab=_0x4fe5d1;this[_0x5b4eab(0x21c)]=_0x2b82d6;},Game_Character['prototype'][_0x4fe5d1(0x171)]=function(){const _0x46df28=_0x4fe5d1;return this[_0x46df28(0x21c)];},Game_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x207)]=function(){return this===$gamePlayer;},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x1e7)]=Game_Player[_0x4fe5d1(0x270)]['initMembers'],Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x205)]=function(){const _0x5c24f3=_0x4fe5d1;TSR[_0x5c24f3(0x1da)][_0x5c24f3(0x1e7)][_0x5c24f3(0x237)](this),this[_0x5c24f3(0x1d6)]=0x4;},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x195)]=Game_Player['prototype'][_0x4fe5d1(0x24e)],Game_Player[_0x4fe5d1(0x270)]['update']=function(_0x1fa299){const _0x36d404=_0x4fe5d1;TSR[_0x36d404(0x1da)]['_Game_Player_update'][_0x36d404(0x237)](this,_0x1fa299),_0x1fa299&&(this[_0x36d404(0x1da)](),this[_0x36d404(0x254)](),this[_0x36d404(0x273)]());},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x224)]=Game_Player['prototype'][_0x4fe5d1(0x247)],Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x247)]=function(){const _0x526f42=_0x4fe5d1;return this['isPushing']()||this[_0x526f42(0x271)]||this[_0x526f42(0x173)]()?![]:TSR['moveEvent'][_0x526f42(0x224)][_0x526f42(0x237)](this);},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x1a2)]=function(_0x525c3a){this['_movingEventPreventMove']=_0x525c3a;},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x173)]=function(){const _0x4f5df3=_0x4fe5d1;return this[_0x4f5df3(0x14d)];},Game_Player['prototype'][_0x4fe5d1(0x1da)]=function(){const _0x27cba1=_0x4fe5d1,_0x1b7bce=this['_direction'],_0x4b0bff=$gameMap[_0x27cba1(0x202)](this['x'],_0x1b7bce),_0x462940=$gameMap['roundYWithDirection'](this['y'],_0x1b7bce),_0x22543a=$gameMap[_0x27cba1(0x202)](_0x4b0bff,_0x1b7bce),_0x3636f9=$gameMap['roundYWithDirection'](_0x462940,_0x1b7bce);this[_0x27cba1(0x196)](_0x4b0bff,_0x462940)&&(this[_0x27cba1(0x1c1)](_0x4b0bff,_0x462940,_0x1b7bce),this[_0x27cba1(0x262)](_0x4b0bff,_0x462940,_0x22543a,_0x3636f9,_0x1b7bce)),this[_0x27cba1(0x1f3)](this['x'],this['y'],_0x4b0bff,_0x462940,_0x1b7bce);},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x273)]=function(){const _0x210e62=_0x4fe5d1;if(this[_0x210e62(0x26b)]&&this[_0x210e62(0x1fa)]()&&this[_0x210e62(0x1ac)]())this[_0x210e62(0x26b)][_0x210e62(0x16e)]===this[_0x210e62(0x26b)]['dx']&&this[_0x210e62(0x26b)][_0x210e62(0x15a)]===this['_pushEvent']['dy']&&this['resetPushing']();else this[_0x210e62(0x271)]&&this[_0x210e62(0x18d)]()&&this[_0x210e62(0x1d9)]()&&(this['_pullEvent'][_0x210e62(0x16e)]===this[_0x210e62(0x271)]['dx']&&this[_0x210e62(0x271)][_0x210e62(0x15a)]===this[_0x210e62(0x271)]['dy']&&this[_0x210e62(0x24f)]());if(!this['_pullEvent'])this[_0x210e62(0x19f)]();},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x262)]=function(_0x50f435,_0x262e1c,_0x1c30ec,_0x2ff383,_0x3234ec){const _0x162396=_0x4fe5d1;if(!this[_0x162396(0x179)]()){if(_0x3234ec===this[_0x162396(0x1ab)]()&&this[_0x162396(0x14f)]()){if(!this[_0x162396(0x260)]()){this['_pushEvent']=this[_0x162396(0x22c)](_0x50f435,_0x262e1c),this[_0x162396(0x214)]=0x0,this['_pushEventCount']=0x0,this[_0x162396(0x228)]=!![],this[_0x162396(0x226)]=![];const _0x32fafb=this[_0x162396(0x26b)][_0x162396(0x1ff)]||TSR[_0x162396(0x1da)][_0x162396(0x1a6)];this[_0x162396(0x280)](_0x32fafb);const _0xf96d96=_0x3234ec===0x4||_0x3234ec===0x6?this[_0x162396(0x147)]():this[_0x162396(0x229)](),_0x205a37=_0x3234ec===0x2||_0x3234ec===0x6?_0x32fafb:-_0x32fafb;this[_0x162396(0x148)](_0xf96d96+_0x205a37),TSR[_0x162396(0x1da)][_0x162396(0x1f5)]&&(this[_0x162396(0x274)](),this[_0x162396(0x1a3)]=TSR[_0x162396(0x1da)][_0x162396(0x1f5)][0x0],this[_0x162396(0x177)]=TSR[_0x162396(0x1da)]['_pushSheet'][0x1]);}else{if(this[_0x162396(0x1a1)]()){const _0x54a2c3=TSR['moveEvent'][_0x162396(0x1d1)];this['_pushEventCount']++;if(this[_0x162396(0x197)]%_0x54a2c3===0x0)this['updatePattern']();if(this[_0x162396(0x197)]%0x4===0x0)this['executePush'](_0x1c30ec,_0x2ff383,_0x3234ec);}else this[_0x162396(0x21b)]();}}else this[_0x162396(0x21b)]();}},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x23b)]=function(_0x3e4c5c,_0x3a2d4c,_0x41a8fd){const _0x22ee69=_0x4fe5d1,_0x2861cf=this[_0x22ee69(0x26b)];if(this[_0x22ee69(0x17f)]!==this[_0x22ee69(0x1ab)]()&&this['pushMoved']())this[_0x22ee69(0x21b)]();else{if(this[_0x22ee69(0x214)]<0x18){if(this[_0x22ee69(0x214)]===0xc)this[_0x22ee69(0x252)]();this['_pushCount']++;}else{if(!this[_0x22ee69(0x1ac)]()&&_0x2861cf[_0x22ee69(0x1e1)](_0x3e4c5c,_0x3a2d4c,_0x41a8fd)&&this[_0x22ee69(0x1f8)]()){this[_0x22ee69(0x1e0)](!![]),SoundManager[_0x22ee69(0x215)](),this[_0x22ee69(0x26b)]['dx']=$gameMap['roundXWithDirection'](this[_0x22ee69(0x26b)]['x'],_0x41a8fd),this[_0x22ee69(0x26b)]['dy']=$gameMap['roundYWithDirection'](this[_0x22ee69(0x26b)]['y'],_0x41a8fd),this[_0x22ee69(0x26b)]['sx']=this[_0x22ee69(0x26b)]['x'],this[_0x22ee69(0x26b)]['sy']=this[_0x22ee69(0x26b)]['y'],this[_0x22ee69(0x16c)](this[_0x22ee69(0x184)]);const _0x27ec67=this[_0x22ee69(0x26b)][_0x22ee69(0x1b7)]();this[_0x22ee69(0x246)](this['isDashButtonPressed']()?_0x27ec67-0x1:_0x27ec67),_0x2861cf['forceMove'](_0x41a8fd),this[_0x22ee69(0x212)](_0x2861cf),this[_0x22ee69(0x214)]=0x0,this[_0x22ee69(0x228)]=![],this[_0x22ee69(0x160)]();}else this[_0x22ee69(0x21b)]();}}},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x1f8)]=function(){const _0x14d1f5=_0x4fe5d1,_0x376305=this[_0x14d1f5(0x26b)][_0x14d1f5(0x25e)];return!_0x376305||$gameSwitches['value'](_0x376305);},Game_Player['prototype'][_0x4fe5d1(0x1a1)]=function(){return this['_isPushing'];},Game_Player['prototype'][_0x4fe5d1(0x280)]=function(_0x4f0dad){const _0x82565f=_0x4fe5d1;this[_0x82565f(0x1a6)]=_0x4f0dad;},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x222)]=function(){return this['_moveOffset'];},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x16c)]=function(_0x23107c){const _0x16a841=_0x4fe5d1;this[_0x16a841(0x1d6)]=_0x23107c;},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x1bb)]=function(){const _0x106dd3=_0x4fe5d1;return this[_0x106dd3(0x1d6)];},Game_Player[_0x4fe5d1(0x270)]['setPushMoved']=function(_0x22a394){const _0x8514fe=_0x4fe5d1;this[_0x8514fe(0x257)]=_0x22a394;},Game_Player['prototype'][_0x4fe5d1(0x1ac)]=function(){const _0x1e0b76=_0x4fe5d1;return this[_0x1e0b76(0x257)];},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x21b)]=function(){const _0x1a8d71=_0x4fe5d1;this['_pushCount']=0x0,this['_isPushing']=![],this[_0x1a8d71(0x26b)]=null,this[_0x1a8d71(0x148)](![]),this[_0x1a8d71(0x1ba)](!![]),this[_0x1a8d71(0x1e0)](![]),this[_0x1a8d71(0x267)](),this[_0x1a8d71(0x1f4)]();},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x1c1)]=function(_0x120269,_0x13fa8f,_0x4f0358){const _0x598f2d=_0x4fe5d1;if(!this[_0x598f2d(0x1ab)]()){if(this[_0x598f2d(0x179)]()&&this[_0x598f2d(0x14f)]()){if(!this[_0x598f2d(0x260)]()){this['_pullEvent']=this[_0x598f2d(0x22c)](_0x120269,_0x13fa8f),this[_0x598f2d(0x1cf)]=0x0,this[_0x598f2d(0x169)]=0x0,this[_0x598f2d(0x175)]=!![],this[_0x598f2d(0x226)]=![];const _0x540e1e=this['_pullEvent'][_0x598f2d(0x1ff)]||TSR[_0x598f2d(0x1da)][_0x598f2d(0x1a6)];this['setMoveOffset'](_0x540e1e);const _0x560d2e=_0x4f0358===0x4||_0x4f0358===0x6?this['screenX']():this[_0x598f2d(0x229)](),_0x14cbd8=_0x4f0358===0x2||_0x4f0358===0x6?_0x540e1e:-_0x540e1e;this[_0x598f2d(0x14c)](_0x560d2e+_0x14cbd8),this[_0x598f2d(0x1fb)](),TSR['moveEvent'][_0x598f2d(0x174)]&&(this[_0x598f2d(0x274)](),this[_0x598f2d(0x1a3)]=TSR[_0x598f2d(0x1da)][_0x598f2d(0x174)][0x0],this['_characterIndex']=TSR['moveEvent'][_0x598f2d(0x174)][0x1]);}else{if(this[_0x598f2d(0x149)]()){const _0x44ba75=TSR[_0x598f2d(0x1da)][_0x598f2d(0x1d1)];this[_0x598f2d(0x169)]++;if(this['_pullEventCount']%_0x44ba75===0x0)this[_0x598f2d(0x1dd)]();if(this[_0x598f2d(0x169)]%0x4===0x0)this[_0x598f2d(0x27e)](this[_0x598f2d(0x17f)]);}else this[_0x598f2d(0x24f)]();}}else this['resetPulling']();}},Game_Player['prototype'][_0x4fe5d1(0x27e)]=function(_0x3bbdde){const _0x199cee=_0x4fe5d1,_0x3dd575=this[_0x199cee(0x271)],_0x4643e1=this[_0x199cee(0x1e3)](_0x3bbdde);if(this[_0x199cee(0x1cf)]<0x14){if(this['_pullCount']===0xa)this['makeEffort']();this[_0x199cee(0x1cf)]++;}else!this[_0x199cee(0x1d9)]()&&this[_0x199cee(0x258)](this['x'],this['y'],_0x4643e1)&&_0x3dd575['movableEventCanPass'](this['x'],this['y'],_0x4643e1,!![])&&this[_0x199cee(0x27b)]()?(this[_0x199cee(0x154)](!![]),SoundManager[_0x199cee(0x215)](),this['_pullEvent']['dx']=$gameMap[_0x199cee(0x202)](this[_0x199cee(0x271)]['x'],_0x4643e1),this[_0x199cee(0x271)]['dy']=$gameMap[_0x199cee(0x1ef)](this[_0x199cee(0x271)]['y'],_0x4643e1),this[_0x199cee(0x271)]['sx']=_0x3dd575['x'],this[_0x199cee(0x271)]['sy']=_0x3dd575['y'],this['setNormalSpeed'](this[_0x199cee(0x184)]),this['setPullSpeed'](this[_0x199cee(0x271)][_0x199cee(0x1b7)]()),this[_0x199cee(0x17c)](_0x4643e1),_0x3dd575[_0x199cee(0x23a)](_0x4643e1),this[_0x199cee(0x212)](_0x3dd575),this[_0x199cee(0x1cf)]=0x0,this[_0x199cee(0x175)]=![],this[_0x199cee(0x160)]()):this['resetPulling']();},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x27b)]=function(){const _0x69e591=_0x4fe5d1,_0x2c36c8=this[_0x69e591(0x271)][_0x69e591(0x25e)];return!_0x2c36c8||$gameSwitches[_0x69e591(0x265)](_0x2c36c8);},Game_Player['prototype']['isPulling']=function(){const _0x6f29=_0x4fe5d1;return this[_0x6f29(0x175)];},Game_Player['prototype'][_0x4fe5d1(0x154)]=function(_0x4ee095){const _0x49d65a=_0x4fe5d1;this[_0x49d65a(0x17d)]=_0x4ee095;},Game_Player[_0x4fe5d1(0x270)]['pullMoved']=function(){return this['_pullMoved'];},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x14b)]=function(_0x3780e8){const _0x52ae9f=_0x4fe5d1;this[_0x52ae9f(0x16f)]=_0x3780e8;},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x210)]=function(){const _0x36ee6f=_0x4fe5d1;return this[_0x36ee6f(0x245)];},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x159)]=function(){const _0x539dd4=_0x4fe5d1;return this[_0x539dd4(0x16f)];},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x24f)]=function(){const _0x53d874=_0x4fe5d1;this[_0x53d874(0x1cf)]=0x0,this['_isPulling']=![],this[_0x53d874(0x271)]=null,this['setPullDist'](![]),this[_0x53d874(0x1ba)](!![]),this[_0x53d874(0x154)](![]),this[_0x53d874(0x267)](),this[_0x53d874(0x1f4)]();},Game_Player['prototype'][_0x4fe5d1(0x179)]=function(){const _0x398ad1=_0x4fe5d1;return Input[_0x398ad1(0x190)](TSR[_0x398ad1(0x1da)]['_moveKey'])||Input[_0x398ad1(0x1fe)](TSR['moveEvent'][_0x398ad1(0x1f0)])||Input[_0x398ad1(0x26a)](TSR[_0x398ad1(0x1da)]['_moveKey']);},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x1f3)]=function(_0x44bc01,_0x390575,_0x803a3b,_0x2d3258,_0x41053b){const _0x4b9b8e=_0x4fe5d1;if(!$gameMap[_0x4b9b8e(0x1ed)]()&&!this['hasThrew']()){if(this[_0x4b9b8e(0x18e)](_0x44bc01,_0x390575,_0x803a3b,_0x2d3258)&&!this[_0x4b9b8e(0x1f2)]()&&this[_0x4b9b8e(0x179)]()){if(!this['hasPickup']())this[_0x4b9b8e(0x261)](),this[_0x4b9b8e(0x276)]=this['pickableEvent'](_0x44bc01,_0x390575,_0x803a3b,_0x2d3258),this[_0x4b9b8e(0x276)][_0x4b9b8e(0x25d)]=this['_pickupEvent']['x'],this['_pickupEvent'][_0x4b9b8e(0x1bc)]=this[_0x4b9b8e(0x276)]['y'],this[_0x4b9b8e(0x276)][_0x4b9b8e(0x20d)](_0x41053b,this['_pickupEvent']['direction']()),this[_0x4b9b8e(0x276)][_0x4b9b8e(0x1b4)]=0x0,this['_pickupEvent']['_routeUndone']=![],this[_0x4b9b8e(0x14e)]=!![],this['_pickupEvent'][_0x4b9b8e(0x198)](!![]),this[_0x4b9b8e(0x17c)](_0x41053b),$gameSystem[_0x4b9b8e(0x16d)](),SoundManager['playPickup'](),TSR[_0x4b9b8e(0x1da)][_0x4b9b8e(0x220)]&&(this[_0x4b9b8e(0x274)](),this[_0x4b9b8e(0x1a3)]=TSR[_0x4b9b8e(0x1da)]['_pickupSheet'][0x0],this[_0x4b9b8e(0x177)]=TSR[_0x4b9b8e(0x1da)][_0x4b9b8e(0x220)][0x1]);else this['hasPickup']()?this[_0x4b9b8e(0x15e)]():this['throwPickup']();}else this[_0x4b9b8e(0x179)]()&&this['hasPickup']()?this[_0x4b9b8e(0x15e)]():this[_0x4b9b8e(0x236)]();}},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x15e)]=function(){const _0x49f392=_0x4fe5d1,_0x2d08c1=this[_0x49f392(0x276)];_0x2d08c1&&(_0x2d08c1[_0x49f392(0x1a7)](!![]),_0x2d08c1[_0x49f392(0x198)](!![]));},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x254)]=function(){const _0x3f90b1=_0x4fe5d1;if(this[_0x3f90b1(0x1ea)]()){const _0x21599a=this[_0x3f90b1(0x276)],_0x505bef=this[_0x3f90b1(0x15d)](),_0x5215e3=this[_0x3f90b1(0x16e)],_0x5fd34d=this['_realY'],_0x190bba=this[_0x3f90b1(0x19d)](),_0x44fe23=_0x190bba/$gameMap[_0x3f90b1(0x26e)](),_0x134142=_0x505bef===0x4?_0x5215e3-_0x44fe23:_0x505bef===0x6?_0x5215e3+_0x44fe23:_0x5215e3,_0xc2b495=_0x505bef===0x2?_0x5fd34d+_0x44fe23:_0x505bef===0x8?_0x5fd34d-_0x44fe23:_0x5fd34d,_0x4005d4=_0x505bef===0x4||_0x505bef===0x6?-0.25:-0.15;if(_0x21599a[_0x3f90b1(0x21e)]){const _0x5b5844=this[_0x3f90b1(0x259)](_0x505bef,_0x21599a[_0x3f90b1(0x17e)]());_0x21599a[_0x3f90b1(0x1ae)](_0x5b5844);if(!_0x21599a[_0x3f90b1(0x250)]())_0x21599a[_0x3f90b1(0x1b5)]();}_0x21599a[_0x3f90b1(0x24c)](_0x134142,_0xc2b495+_0x4005d4),!_0x21599a[_0x3f90b1(0x1a3)]&&!_0x21599a['_tileId']&&(this[_0x3f90b1(0x14e)]=![],this[_0x3f90b1(0x276)]=null);}else this['hasThrew']()&&this[_0x3f90b1(0x1b8)]();},Game_Player[_0x4fe5d1(0x270)]['calcDirection']=function(_0x144e3d,_0x368bc2){if(_0x368bc2[0x0]===_0x368bc2[0x1])return _0x144e3d;else{if(_0x368bc2[0x0]===0xa-_0x368bc2[0x1])return 0xa-_0x144e3d;else{if(_0x144e3d===_0x368bc2[0x0])return _0x368bc2[0x1];else return _0x144e3d===0xa-_0x368bc2[0x0]?0xa-_0x368bc2[0x1]:_0x144e3d===0xa-_0x368bc2[0x1]?_0x368bc2[0x0]:0xa-_0x368bc2[0x0];}}},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x19d)]=function(){const _0x4fba26=_0x4fe5d1;return this[_0x4fba26(0x276)][_0x4fba26(0x1ff)]||TSR[_0x4fba26(0x1da)][_0x4fba26(0x21d)];},Game_Player[_0x4fe5d1(0x270)]['throwPickup']=function(){const _0x2494df=_0x4fe5d1;if(this[_0x2494df(0x276)]){const _0x21eb52=this[_0x2494df(0x15d)](),_0x5031c0=this['x'],_0x3c75c8=this['y'];let _0x3dabed=this['evalDist'](_0x5031c0,_0x3c75c8,_0x21eb52),_0x586533=_0x21eb52===0x4?_0x5031c0-_0x3dabed:_0x21eb52===0x6?_0x5031c0+_0x3dabed:_0x5031c0,_0x41b7ee=_0x21eb52===0x2?_0x3c75c8+_0x3dabed:_0x21eb52===0x8?_0x3c75c8-_0x3dabed:_0x3c75c8,_0x14d702=$gameMap[_0x2494df(0x202)](_0x586533,0xa-_0x21eb52),_0x487c95=$gameMap[_0x2494df(0x1ef)](_0x41b7ee,0xa-_0x21eb52);while(!this[_0x2494df(0x14a)](_0x14d702,_0x487c95,_0x21eb52)){_0x3dabed--,_0x586533=_0x21eb52===0x4?_0x5031c0-_0x3dabed:_0x21eb52===0x6?_0x5031c0+_0x3dabed:_0x5031c0,_0x41b7ee=_0x21eb52===0x2?_0x3c75c8+_0x3dabed:_0x21eb52===0x8?_0x3c75c8-_0x3dabed:_0x3c75c8,_0x14d702=$gameMap[_0x2494df(0x202)](_0x586533,0xa-_0x21eb52),_0x487c95=$gameMap[_0x2494df(0x1ef)](_0x41b7ee,0xa-_0x21eb52);if(_0x3dabed===0x0)break;}this[_0x2494df(0x276)][_0x2494df(0x278)]=_0x3dabed,this['_pickupEvent']['setThrowDestination'](_0x586533,_0x41b7ee,_0x5031c0,_0x3c75c8,_0x21eb52),this[_0x2494df(0x276)][_0x2494df(0x1bf)](0x2),this[_0x2494df(0x14e)]=![],this[_0x2494df(0x276)][_0x2494df(0x1a7)](![]),this[_0x2494df(0x20b)]=!![],this[_0x2494df(0x276)][_0x2494df(0x150)](!![]);}},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x17a)]=function(_0xa703d7,_0x3240a5,_0x177426){const _0x32880a=_0x4fe5d1;let _0x14f1e0=0x0;const _0x42bb5a=this['isDashing']()&&this[_0x32880a(0x1f2)]()?0x3:this[_0x32880a(0x1ab)]()?0x2:0x1;for(;;){const _0xa87b47=_0x177426===0x4?_0xa703d7-_0x14f1e0:_0x177426===0x6?_0xa703d7+_0x14f1e0:_0xa703d7,_0x18e852=_0x177426===0x2?_0x3240a5+_0x14f1e0:_0x177426===0x8?_0x3240a5-_0x14f1e0:_0x3240a5,_0x7072af=$gameMap[_0x32880a(0x272)](_0xa87b47,_0x18e852);if(DataManager[_0x32880a(0x1b9)](_0x7072af))return _0x14f1e0;else{if(_0x14f1e0<_0x42bb5a)_0x14f1e0++;else return _0x14f1e0;}}},Game_Player['prototype'][_0x4fe5d1(0x1b8)]=function(){const _0xf1ad3e=_0x4fe5d1,_0x1703c6=this[_0xf1ad3e(0x276)],_0x1d2306=_0x1703c6['throwDestination']();if(_0x1703c6['isThrowCliff']()||_0x1703c6[_0xf1ad3e(0x1b3)])this[_0xf1ad3e(0x261)](_0x1d2306);else{if((_0x1703c6[_0xf1ad3e(0x16e)]!==_0x1d2306[0x0]||_0x1703c6[_0xf1ad3e(0x15a)]!==_0x1d2306[0x1])&&!this[_0xf1ad3e(0x235)]){const _0x123004=-(_0x1703c6['x']-_0x1d2306[0x0]),_0x3f47e9=-(_0x1703c6['y']-_0x1d2306[0x1]);_0x1703c6[_0xf1ad3e(0x19e)](_0x123004,_0x3f47e9),this[_0xf1ad3e(0x235)]=!![],_0x1703c6[_0xf1ad3e(0x223)](!![]),SoundManager[_0xf1ad3e(0x193)](),TSR[_0xf1ad3e(0x1da)][_0xf1ad3e(0x27c)]&&(this[_0xf1ad3e(0x274)](),this[_0xf1ad3e(0x1a3)]=TSR[_0xf1ad3e(0x1da)][_0xf1ad3e(0x27c)][0x0],this[_0xf1ad3e(0x177)]=TSR['moveEvent'][_0xf1ad3e(0x27c)][0x1],this[_0xf1ad3e(0x1aa)](0x0),this['_throwCount']=0x0,this['_throwPattern']=!![]);}else{if(this[_0xf1ad3e(0x235)]){this[_0xf1ad3e(0x281)]++;if(this['_throwCount']===0xc||this[_0xf1ad3e(0x281)]===0x18)this[_0xf1ad3e(0x1dd)]();if(_0x1703c6[_0xf1ad3e(0x16e)]===_0x1d2306[0x0]&&_0x1703c6[_0xf1ad3e(0x15a)]===_0x1d2306[0x1])this['_threwMidAir']=![];}else SoundManager[_0xf1ad3e(0x25a)](),this['endPickup'](_0x1d2306);}}},Game_Player[_0x4fe5d1(0x270)]['hasThrew']=function(){return this['_hasThrew'];},Game_Player[_0x4fe5d1(0x270)]['endPickup']=function(_0x1b155e){const _0x13348b=_0x4fe5d1;this['resetCacheImage']();if(this['_pickupEvent']){this[_0x13348b(0x276)][_0x13348b(0x1d0)](_0x1b155e[0x0],_0x1b155e[0x1]),this[_0x13348b(0x20b)]=![],this[_0x13348b(0x235)]=![],this[_0x13348b(0x276)]['setThrough'](![]),this[_0x13348b(0x276)]['_pattern']=this['_pickupEvent']['_originalPattern'],this[_0x13348b(0x276)][_0x13348b(0x1bf)](0x1);if(this[_0x13348b(0x276)][_0x13348b(0x1be)]()){const _0x108169=$gameMap[_0x13348b(0x1e6)](),_0x512698=this[_0x13348b(0x276)][_0x13348b(0x1bd)](),_0x13963c=this[_0x13348b(0x276)][_0x13348b(0x1be)]();$gameSelfSwitches[_0x13348b(0x157)]([_0x108169,_0x512698,_0x13963c],!![]);}}$gameSystem[_0x13348b(0x266)](),this[_0x13348b(0x276)]=null,this[_0x13348b(0x1ec)]=![];},Game_Player['prototype']['endMapPickup']=function(){const _0x413b92=_0x4fe5d1;this[_0x413b92(0x1f4)](),this[_0x413b92(0x276)]&&this['_pickupEvent'][_0x413b92(0x1d0)](this[_0x413b92(0x276)][_0x413b92(0x25d)],this[_0x413b92(0x276)][_0x413b92(0x1bc)]),this[_0x413b92(0x14e)]=![],this[_0x413b92(0x276)]=null,$gameSystem[_0x413b92(0x266)]();},Game_Player['prototype'][_0x4fe5d1(0x274)]=function(){const _0x31651b=_0x4fe5d1;!this['_cacheCharName']&&(this['_cacheCharName']=this['characterName'](),this[_0x31651b(0x185)]=this[_0x31651b(0x255)]());},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x1f4)]=function(){const _0x54f991=_0x4fe5d1;this[_0x54f991(0x216)]&&(this['_characterName']=this[_0x54f991(0x216)],this['_characterIndex']=this[_0x54f991(0x185)],this['_cacheCharName']=![],this['_cacheCharIndex']=![]);},Game_Player['prototype'][_0x4fe5d1(0x196)]=function(_0x2753da,_0x1bf8a1){const _0x15994e=_0x4fe5d1,_0x180343=$gameMap['eventsXyNt'](_0x2753da,_0x1bf8a1);if(this[_0x15994e(0x1f2)]())return![];return _0x180343[_0x15994e(0x211)](_0x3937eb=>_0x3937eb[_0x15994e(0x1ee)]());},Game_Player['prototype'][_0x4fe5d1(0x18e)]=function(_0x5efaf1,_0x323a8f,_0x56ef02,_0x393b9a){const _0x112257=_0x4fe5d1,_0x16e70c=$gameMap[_0x112257(0x208)](_0x5efaf1,_0x323a8f),_0x5f09a3=$gameMap[_0x112257(0x208)](_0x56ef02,_0x393b9a);return _0x16e70c[_0x112257(0x211)](_0x2b3b70=>_0x2b3b70[_0x112257(0x199)]())||_0x5f09a3['some'](_0x550345=>_0x550345[_0x112257(0x199)]());},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x22c)]=function(_0x56b316,_0x22f4e5){const _0x35f263=_0x4fe5d1,_0x171e16=$gameMap[_0x35f263(0x208)](_0x56b316,_0x22f4e5);for(const _0x38ad18 of _0x171e16){if(_0x38ad18[_0x35f263(0x1ee)]())return _0x38ad18;}},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x1cb)]=function(_0x3c914d,_0x3cf45d,_0x5ca2ab,_0x191a39){const _0x24c93b=_0x4fe5d1,_0x579745=$gameMap[_0x24c93b(0x208)](_0x3c914d,_0x3cf45d),_0x400e8c=$gameMap[_0x24c93b(0x208)](_0x5ca2ab,_0x191a39);for(const _0x5d9a29 of _0x579745){if(_0x5d9a29[_0x24c93b(0x199)]())return _0x5d9a29;}for(const _0xfcce48 of _0x400e8c){if(_0xfcce48[_0x24c93b(0x199)]())return _0xfcce48;}},Game_Player['prototype'][_0x4fe5d1(0x14f)]=function(){return!this['_pickupEvent'];},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x1fb)]=function(){const _0x179294=_0x4fe5d1;!this[_0x179294(0x1c3)]&&(this['_cacheDirFix']=!![],this[_0x179294(0x183)](!![])),Imported['TSR_MapJump']&&TSR[_0x179294(0x233)][_0x179294(0x1ad)]&&(this[_0x179294(0x18f)]=!![],TSR[_0x179294(0x233)]['_jumpEnable']=![]);},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x19f)]=function(){const _0x3a0d97=_0x4fe5d1;this['_cacheDirFix']&&(this[_0x3a0d97(0x1d2)]=![],this[_0x3a0d97(0x183)](![])),this[_0x3a0d97(0x18f)]&&(this[_0x3a0d97(0x18f)]=![],TSR[_0x3a0d97(0x233)][_0x3a0d97(0x1ad)]=!![]);},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x252)]=function(){const _0x282758=_0x4fe5d1;SoundManager[_0x282758(0x1a4)](),$gameTemp[_0x282758(0x218)]?$gameTemp[_0x282758(0x18b)](this,TSR[_0x282758(0x1da)][_0x282758(0x25b)]):this[_0x282758(0x18b)](TSR[_0x282758(0x1da)][_0x282758(0x25b)]);},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x267)]=function(){const _0x328544=_0x4fe5d1,_0x116ad0=this[_0x328544(0x27a)]()?this[_0x328544(0x279)]()[_0x328544(0x1b7)]():this['normalSpeed']();this[_0x328544(0x246)](_0x116ad0);},Game_Player[_0x4fe5d1(0x270)][_0x4fe5d1(0x212)]=function(_0x357971){const _0x94aec0=_0x4fe5d1,_0x23ef8b=$dataMap[_0x94aec0(0x188)][_0x357971[_0x94aec0(0x24b)]][_0x94aec0(0x269)],_0x425a68=$gameSystem[_0x94aec0(0x243)][_0x23ef8b];_0x425a68&&_0x425a68[0x0]&&(SoundManager[_0x94aec0(0x23e)](),$gameSwitches[_0x94aec0(0x157)](_0x425a68[0x1],!![]),_0x425a68[0x0]=![]);},Game_Player['prototype'][_0x4fe5d1(0x14a)]=function(_0x1a0eae,_0x2a1699,_0x34f25e){const _0xe8bd9c=_0x4fe5d1,_0x58b865=$gameMap[_0xe8bd9c(0x202)](_0x1a0eae,_0x34f25e),_0x3c17f0=$gameMap['roundYWithDirection'](_0x2a1699,_0x34f25e),_0x18168f=$gameMap[_0xe8bd9c(0x272)](_0x58b865,_0x3c17f0),_0x676247=DataManager[_0xe8bd9c(0x23d)](_0x18168f);if(DataManager[_0xe8bd9c(0x1b9)](_0x18168f))return![];return this[_0xe8bd9c(0x258)](_0x1a0eae,_0x2a1699,_0x34f25e)||_0x676247;},Game_Player['prototype']['hasBroughtEvent']=function(_0x13cf14,_0x58d08b,_0x963935,_0x4f41e5){const _0x48cc85=_0x4fe5d1,_0x404b46=$gameMap[_0x48cc85(0x1f1)](_0x13cf14),_0x259861=_0x4f41e5||this[_0x48cc85(0x15d)]();if(this['x']===_0x58d08b&&this['y']===_0x963935&&_0x259861===this[_0x48cc85(0x15d)]()&&this[_0x48cc85(0x244)](_0x404b46[_0x48cc85(0x24b)]))return _0x404b46[_0x48cc85(0x1b3)]=!![],!![];return![];},Game_Player[_0x4fe5d1(0x270)]['hasGaveEvent']=function(_0x31844f,_0x524520){const _0xffe9fa=_0x4fe5d1,_0x412253=$gameMap[_0xffe9fa(0x1f1)](_0x31844f),_0x4ff8c5=$gameMap['event'](_0x524520),_0x1a4aa1=_0x4ff8c5['x'],_0x4af8d7=_0x4ff8c5['y'],_0x1460a8=_0x4ff8c5[_0xffe9fa(0x15d)](),_0x2d183f=_0x1460a8===0x4?_0x1a4aa1-0x1:_0x1460a8===0x6?_0x1a4aa1+0x1:_0x1a4aa1,_0x2cad01=_0x1460a8===0x2?_0x4af8d7+0x1:_0x1460a8===0x8?_0x4af8d7-0x1:_0x4af8d7,_0x5cc8c5=this['direction']();if(_0x412253['pos'](_0x2d183f,_0x2cad01)&&_0x5cc8c5===0xa-_0x1460a8&&this[_0xffe9fa(0x244)](_0x412253[_0xffe9fa(0x24b)]))return _0x412253[_0xffe9fa(0x1b3)]=!![],!![];return![];},Game_Player[_0x4fe5d1(0x270)]['hasThrownEvent']=function(_0xb0666f,_0x4cba4e,_0x368f50){const _0x373843=_0x4fe5d1,_0x52c077=$gameMap['event'](_0xb0666f);return _0x52c077[_0x373843(0x16e)]===_0x4cba4e&&_0x52c077[_0x373843(0x15a)]===_0x368f50&&!this[_0x373843(0x244)](_0xb0666f);},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x182)]=Game_Event[_0x4fe5d1(0x270)][_0x4fe5d1(0x168)],Game_Event[_0x4fe5d1(0x270)]['setupPage']=function(){const _0x2cf61c=_0x4fe5d1;TSR[_0x2cf61c(0x1da)]['_Game_Event_setupPage'][_0x2cf61c(0x237)](this),this[_0x2cf61c(0x156)]();},Game_Event[_0x4fe5d1(0x270)][_0x4fe5d1(0x156)]=function(){const _0x3f9f12=_0x4fe5d1;if(!this[_0x3f9f12(0x166)]())return;const _0x39bfa0=/<(?:MOVABLE EVENT|MOVABLE)>/i,_0xb8d685=/<(?:MOVABLE MYSTERY|PUSH MYSTERY):[ ](\d+)>/i,_0x46a100=/<(?:PICKABLE EVENT|PICKUP EVENT)>/i,_0x510402=/<(?:MOVE EVENT OFFSET|MOVE OFFSET):[ ](\d+)>/i,_0x953e1a=/<(?:PICKABLE CHARACTER|PICKUP CHARACTER)>/i,_0x21f710=/<(?:PICKABLE EVENT|PICKUP EVENT):[ ](.)>/i,_0x22e958=/<(?:MOVABLE EVENT|MOVABLE):[ ](\d+)>/i,_0x316295=/<(?:MOVABLE CHARACTER|MOVABLE CHAR)>/i,_0x59701d=this[_0x3f9f12(0x1a0)](),_0x3cfb3f=_0x59701d[_0x3f9f12(0x192)];this['_isMovable']=![],this[_0x3f9f12(0x25f)]=![],this[_0x3f9f12(0x21e)]=![],this[_0x3f9f12(0x162)]=![],this[_0x3f9f12(0x25e)]=![],this[_0x3f9f12(0x187)]=![],this[_0x3f9f12(0x1ff)]=0x0;for(let _0x565c9f=0x0;_0x565c9f<_0x3cfb3f;++_0x565c9f){let _0x528176=_0x59701d[_0x565c9f];if([0x6c,0x198][_0x3f9f12(0x16a)](_0x528176['code'])){if(_0x528176[_0x3f9f12(0x1f7)][0x0][_0x3f9f12(0x20a)](_0x39bfa0))this[_0x3f9f12(0x19b)]=!![];else{if(_0x528176[_0x3f9f12(0x1f7)][0x0][_0x3f9f12(0x20a)](_0xb8d685)){this['_isMovable']=!![];const _0x303787=$dataMap['events'][this[_0x3f9f12(0x24b)]]['name'],_0x3832d3=parseInt(RegExp['$1']);!$gameSystem[_0x3f9f12(0x243)][_0x303787]&&($gameSystem[_0x3f9f12(0x243)][_0x303787]=[!![],_0x3832d3]);}else{if(_0x528176['parameters'][0x0][_0x3f9f12(0x20a)](_0x46a100))this['_isPickable']=!![];else{if(_0x528176['parameters'][0x0][_0x3f9f12(0x20a)](_0x510402))this['_moveEventOffset']=parseInt(RegExp['$1']);else{if(_0x528176[_0x3f9f12(0x1f7)][0x0][_0x3f9f12(0x20a)](_0x953e1a))this['_isPickable']=!![],this['_isPickupChar']=!![];else{if(_0x528176[_0x3f9f12(0x1f7)][0x0]['match'](_0x21f710)){const _0x3adfb8=_0x528176[_0x3f9f12(0x1f7)][0x0],_0x391fea=_0x3adfb8[_0x3f9f12(0x172)](_0x3adfb8['indexOf'](':')+0x1,_0x3adfb8[_0x3f9f12(0x15b)]('>'))['trim']();this[_0x3f9f12(0x25f)]=!![],this[_0x3f9f12(0x162)]=_0x391fea['toUpperCase']();}else{if(_0x528176[_0x3f9f12(0x1f7)][0x0][_0x3f9f12(0x20a)](_0x22e958))this['_isMovable']=!![],this[_0x3f9f12(0x25e)]=parseInt(RegExp['$1']);else _0x528176['parameters'][0x0]['match'](_0x316295)&&(this[_0x3f9f12(0x19b)]=!![],this[_0x3f9f12(0x187)]=!![]);}}}}}}}}},Game_Event[_0x4fe5d1(0x270)][_0x4fe5d1(0x1ee)]=function(){const _0x250c76=_0x4fe5d1;return this[_0x250c76(0x19b)];},Game_Event[_0x4fe5d1(0x270)][_0x4fe5d1(0x199)]=function(){const _0x9ede55=_0x4fe5d1;return this[_0x9ede55(0x25f)];},Game_Event['prototype'][_0x4fe5d1(0x20d)]=function(_0x3c6a13,_0x28f78e){const _0x43f845=_0x4fe5d1;this[_0x43f845(0x22d)]=[_0x3c6a13,_0x28f78e];},Game_Event[_0x4fe5d1(0x270)]['dirInfo']=function(){return this['_dirInfo'];},Game_Event[_0x4fe5d1(0x270)][_0x4fe5d1(0x1e1)]=function(_0x2f86eb,_0x46904d,_0x429ba7,_0x11cede){const _0xd594eb=_0x4fe5d1;if(DataManager[_0xd594eb(0x21f)]($gameMap['regionId'](_0x2f86eb,_0x46904d)))return![];if(!$gameMap[_0xd594eb(0x209)](_0x2f86eb,_0x46904d,_0x429ba7))return![];if(this[_0xd594eb(0x1ca)](_0x2f86eb,_0x46904d)&&!_0x11cede)return![];return!![];},Game_Event[_0x4fe5d1(0x270)][_0x4fe5d1(0x272)]=function(){const _0x3d090d=_0x4fe5d1;if(this[_0x3d090d(0x1d7)]())return null;return $gameMap[_0x3d090d(0x272)](this['_x'],this['_y']);},Game_Event['prototype'][_0x4fe5d1(0x23a)]=function(_0x3c71fe){const _0x2ed43f=_0x4fe5d1;this['setThrough'](!![]),this[_0x2ed43f(0x1d4)](_0x3c71fe);if(this['_isMovableChar'])this[_0x2ed43f(0x17f)]=_0x3c71fe;this[_0x2ed43f(0x198)](![]);},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x146)]=Game_Event[_0x4fe5d1(0x270)][_0x4fe5d1(0x26d)],Game_Event['prototype']['isCollidedWithEvents']=function(_0x562a06,_0x893a60){const _0x253926=_0x4fe5d1,_0x2d5531=$gameMap[_0x253926(0x208)](_0x562a06,_0x893a60),_0x1f7892=_0x2d5531[_0x253926(0x211)](_0x13faa7=>!_0x13faa7[_0x253926(0x26f)]());return(this[_0x253926(0x1ee)]()||this[_0x253926(0x199)]())&&_0x1f7892?![]:TSR[_0x253926(0x1da)][_0x253926(0x146)][_0x253926(0x237)](this,_0x562a06,_0x893a60);},TSR['moveEvent']['_Spriteset_Map_createLowerLayer']=Spriteset_Map[_0x4fe5d1(0x270)][_0x4fe5d1(0x20e)],Spriteset_Map['prototype']['createLowerLayer']=function(){const _0x4a2609=_0x4fe5d1;TSR[_0x4a2609(0x1da)][_0x4a2609(0x1a8)][_0x4a2609(0x237)](this),this[_0x4a2609(0x251)]();},Spriteset_Map[_0x4fe5d1(0x270)][_0x4fe5d1(0x251)]=function(){const _0x12b8f8=_0x4fe5d1;this[_0x12b8f8(0x241)]=new Sprite(),this[_0x12b8f8(0x241)][_0x12b8f8(0x1ce)](0x0,0x0,this['width'],this[_0x12b8f8(0x277)]),this[_0x12b8f8(0x241)]['z']=0x2,this[_0x12b8f8(0x256)][_0x12b8f8(0x282)](this['_throwShadowContainer']);},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x22f)]=Sprite_Character[_0x4fe5d1(0x270)]['initMembers'],Sprite_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x205)]=function(){const _0x213167=_0x4fe5d1;TSR[_0x213167(0x1da)]['_Sprite_Character_initMembers']['call'](this),this[_0x213167(0x1c0)]=[],this[_0x213167(0x1fd)]=0x0;},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x170)]=Sprite_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x24e)],Sprite_Character[_0x4fe5d1(0x270)]['update']=function(){const _0x376b0d=_0x4fe5d1;TSR[_0x376b0d(0x1da)][_0x376b0d(0x170)][_0x376b0d(0x237)](this),this[_0x376b0d(0x1c5)]();},TSR[_0x4fe5d1(0x1da)][_0x4fe5d1(0x21a)]=Sprite_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x283)],Sprite_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x283)]=function(){const _0xfb93e6=_0x4fe5d1;if(this[_0xfb93e6(0x1e9)][_0xfb93e6(0x207)]()){const _0x501661=this[_0xfb93e6(0x1e9)][_0xfb93e6(0x15d)](),_0x4ba95f=_0x501661===0x4||_0x501661===0x6?'x':'y',_0xebe21a=_0x4ba95f==='x'?'y':'x',_0x5edfa8=_0xebe21a==='x'?this['_character']['screenX']():this[_0xfb93e6(0x1e9)][_0xfb93e6(0x229)](),_0x6ce751=_0x501661===0x2||_0x501661===0x6;let _0x5c2153=![];if(this[_0xfb93e6(0x1e9)]['pushDist']())this[_0x4ba95f]=this['mapCoordinates'](_0x6ce751,_0x4ba95f,this[_0xfb93e6(0x1e9)][_0xfb93e6(0x1fa)]()),this[_0xebe21a]=_0x5edfa8,this['z']=this[_0xfb93e6(0x1e9)][_0xfb93e6(0x249)]();else{if(this[_0xfb93e6(0x1e9)][_0xfb93e6(0x18d)]())this['_character'][_0xfb93e6(0x1d9)]()&&(this['_character'][_0xfb93e6(0x246)](this[_0xfb93e6(0x1e9)][_0xfb93e6(0x159)]()),_0x5c2153=!![]),this[_0x4ba95f]=this[_0xfb93e6(0x1b0)](_0x6ce751,_0x4ba95f,this[_0xfb93e6(0x1e9)][_0xfb93e6(0x18d)](),![],_0x5c2153),this[_0xebe21a]=_0x5edfa8,this['z']=this['_character'][_0xfb93e6(0x249)]();else this[_0xfb93e6(0x1e9)]['backDist']()?(this[_0x4ba95f]=this[_0xfb93e6(0x1b0)](!_0x6ce751,_0x4ba95f,this[_0xfb93e6(0x1e9)][_0xfb93e6(0x171)](),!![]),this[_0xebe21a]=_0x5edfa8,this['z']=this[_0xfb93e6(0x1e9)][_0xfb93e6(0x249)]()):TSR[_0xfb93e6(0x1da)][_0xfb93e6(0x21a)][_0xfb93e6(0x237)](this);}}else TSR['moveEvent'][_0xfb93e6(0x21a)][_0xfb93e6(0x237)](this);},Sprite_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x1b0)]=function(_0x287746,_0x3e4a49,_0x3ad077,_0x4cb0a7,_0xecc20c){const _0x29b4ee=_0x4fe5d1;this[_0x29b4ee(0x1fd)]++;const _0x26fd18=this[_0x29b4ee(0x1e9)],_0x2e6f46=_0x3e4a49==='x'?_0x26fd18[_0x29b4ee(0x147)]():_0x26fd18['screenY'](),_0x5a8bfb=_0x4cb0a7||_0xecc20c?_0x2e6f46:_0x3ad077,_0x270325=_0x4cb0a7?0x0:_0x26fd18[_0x29b4ee(0x222)]();if(_0x287746){if(this[_0x3e4a49]<_0x5a8bfb)return _0x26fd18[_0x29b4ee(0x1a2)](!![]),this[_0x3e4a49]+0x1;else{_0x26fd18[_0x29b4ee(0x1a2)](![]);if(_0x4cb0a7)_0x26fd18[_0x29b4ee(0x1ba)](![]);return _0x2e6f46+_0x270325;}}else{if(this[_0x3e4a49]>_0x5a8bfb)return _0x26fd18['setMovingEventPreventMove'](!![]),this[_0x3e4a49]-0x1;else{_0x26fd18[_0x29b4ee(0x1a2)](![]);if(_0x4cb0a7)_0x26fd18[_0x29b4ee(0x1ba)](![]);return _0x2e6f46-_0x270325;}}},Sprite_Character['prototype'][_0x4fe5d1(0x1cc)]=function(){const _0x5835bb=_0x4fe5d1;this[_0x5835bb(0x1e9)]['requireThrowShadow']()&&(this[_0x5835bb(0x1e9)][_0x5835bb(0x223)](![]),this['startThrowShadow']());},Sprite_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x238)]=function(){const _0xe1479e=_0x4fe5d1,_0x4197ae=this[_0xe1479e(0x206)]();this[_0xe1479e(0x1c0)][_0xe1479e(0x1b1)](_0x4197ae);},Sprite_Character[_0x4fe5d1(0x270)][_0x4fe5d1(0x206)]=function(){const _0x4ef4a9=_0x4fe5d1;let _0x481aff=new Sprite_ThrowShadow();return _0x481aff['x']=this['x'],_0x481aff['y']=this['y']-0x10,_0x481aff[_0x4ef4a9(0x230)]['x']=0.8,_0x481aff['scale']['y']=0.8,_0x481aff[_0x4ef4a9(0x1d8)](this,this[_0x4ef4a9(0x1e9)]),SceneManager[_0x4ef4a9(0x219)][_0x4ef4a9(0x27d)][_0x4ef4a9(0x241)]['addChild'](_0x481aff),_0x481aff;},Sprite_Character[_0x4fe5d1(0x270)]['updateThrowShadowSprites']=function(){const _0x1f049b=_0x4fe5d1;this['setupThrowShadow'](),this['_throwSpriteSet'][_0x1f049b(0x192)]>0x0&&(!this[_0x1f049b(0x1c0)][0x0][_0x1f049b(0x20c)]()&&(SceneManager[_0x1f049b(0x219)][_0x1f049b(0x27d)][_0x1f049b(0x241)][_0x1f049b(0x1e2)](this['_throwSpriteSet'][0x0]),this[_0x1f049b(0x1c0)]['shift']()));};function Sprite_ThrowShadow(){const _0x3b8de9=_0x4fe5d1;this[_0x3b8de9(0x164)]['apply'](this,arguments);}Sprite_ThrowShadow['prototype']=Object[_0x4fe5d1(0x268)](Sprite['prototype']),Sprite_ThrowShadow[_0x4fe5d1(0x270)][_0x4fe5d1(0x1c7)]=Sprite_ThrowShadow,Sprite_ThrowShadow[_0x4fe5d1(0x270)][_0x4fe5d1(0x164)]=function(){const _0x13d04a=_0x4fe5d1;Sprite[_0x13d04a(0x270)]['initialize'][_0x13d04a(0x237)](this),this[_0x13d04a(0x205)](),this[_0x13d04a(0x1c4)]();},Sprite_ThrowShadow['prototype'][_0x4fe5d1(0x205)]=function(){const _0x267e6c=_0x4fe5d1;this['anchor']['x']=0.5,this[_0x267e6c(0x231)]['y']=0.5,this['_duration']=0x0;},Sprite_ThrowShadow[_0x4fe5d1(0x270)][_0x4fe5d1(0x1c4)]=function(){const _0x399c26=_0x4fe5d1;this[_0x399c26(0x1e4)]=ImageManager[_0x399c26(0x221)](_0x399c26(0x200)),this[_0x399c26(0x1ce)](0x0,0x0,this[_0x399c26(0x1e4)][_0x399c26(0x155)],this[_0x399c26(0x1e4)][_0x399c26(0x277)]);},Sprite_ThrowShadow['prototype']['setup']=function(_0x141d1c,_0x405cbc){const _0x1a0bd0=_0x4fe5d1;this[_0x1a0bd0(0x242)]=_0x141d1c,this[_0x1a0bd0(0x248)]=!![],this[_0x1a0bd0(0x17f)]=_0x405cbc[_0x1a0bd0(0x17f)],this[_0x1a0bd0(0x22b)]=_0x405cbc[_0x1a0bd0(0x278)]*0x9,this['_jumpOffset']=0x0;},Sprite_ThrowShadow[_0x4fe5d1(0x270)]['update']=function(){const _0x311243=_0x4fe5d1;this[_0x311243(0x22b)]--,this[_0x311243(0x26c)]();},Sprite_ThrowShadow[_0x4fe5d1(0x270)]['updateShadowPosition']=function(){const _0x50870d=_0x4fe5d1,_0x3ec189=$gamePlayer['_direction'];if(this[_0x50870d(0x248)]){if(_0x3ec189===0x4)this['x']=this[_0x50870d(0x242)]['x']-0x4;else _0x3ec189===0x6?this['x']=this[_0x50870d(0x242)]['x']+0x2:(this[_0x50870d(0x240)]+=-0x1,this['y']=this['_charSprite']['y']+this[_0x50870d(0x240)]);}},Sprite_ThrowShadow[_0x4fe5d1(0x270)][_0x4fe5d1(0x20c)]=function(){const _0x4c2013=_0x4fe5d1;return this[_0x4c2013(0x22b)]>0x0;};
})();

//== END ========================================================================
//===============================================================================
