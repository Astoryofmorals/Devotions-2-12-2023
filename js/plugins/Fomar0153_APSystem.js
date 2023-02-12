//=============================================================================
// RPG Maker MZ - AP System
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds AP to enemies allowing for secondary progression systems.
 * @author Fomar0153
 *
 * @param AP Name
 * @type string
 * @desc Enter what you would like to refer to AP as in game e.g. AP, JP.
 * @default AP
 *
 * @param Default AP
 * @type integer
 * @desc Enter a number that will be the default AP acquired from defeating an enemy.
 * @default 1
 *
 *
 * @help Fomar0153_APSystem.js
 *
 * This plugin provides the basis for secondary progression systems.
 * Notetag enemies: <ap: x>
 *
 */

var Fomar = Fomar || {};
Fomar.APSystem = {};

Fomar.APSystem.parameters = PluginManager.parameters('Fomar0153_APSystem');

Fomar.APSystem.vocabAP = Fomar.APSystem.parameters["AP Name"] || "AP";
Fomar.APSystem.defaultAP = parseInt(Fomar.APSystem.parameters["Default AP"]);

(() => {

  Game_Actor.prototype.gainAP = function() {
    // over write this in your plugin
  };

  Fomar.APSystem.BattleManager_makeRewards = BattleManager.makeRewards;
  BattleManager.makeRewards = function() {
    Fomar.APSystem.BattleManager_makeRewards.call(this);
    this._rewards.ap = $gameTroop.apTotal();
  };


  Fomar.APSystem.BattleManager_displayExp = BattleManager.displayExp;
  BattleManager.displayExp = function() {
    Fomar.APSystem.BattleManager_displayExp.call(this);
    this.displayAp();
  };

  BattleManager.displayAp = function() {
    const ap = this._rewards.ap;
    if (ap > 0) {
      const text = TextManager.obtainExp.format(ap, Fomar.APSystem.vocabAP);
      $gameMessage.add("\\." + text);
    }
  };

  Fomar.APSystem.BattleManager_gainExp = BattleManager.gainExp;
  BattleManager.gainExp = function() {
    Fomar.APSystem.BattleManager_gainExp.call(this);
    this.gainAp();
  };

  BattleManager.gainAp = function() {
    var ap = this._rewards.ap;
    $gameParty.allMembers().forEach(function(actor) {
      actor.gainAP(ap);
    });
  };

  Game_Troop.prototype.apTotal = function() {
    return this.deadMembers().reduce((r, enemy) => r + enemy.ap(), 0);
  };

  Game_Enemy.prototype.ap = function() {
    console.log(this.enemy().meta);
    return parseInt(this.enemy().meta["ap"]) || Fomar.APSystem.defaultAP;
  };

})();
