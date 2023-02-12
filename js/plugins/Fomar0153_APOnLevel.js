//=============================================================================
// RPG Maker MZ - AP On Level
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Implements a system providing AP on level up.
 * @author Fomar0153
 *
 * @param AP Name
 * @type string
 * @desc Enter what you would like to refer to AP as in game e.g. AP, JP.
 * @default AP
 *
 * @param AP On Level
 * @type string
 * @desc Enter a formula for how much AP you'd like to gain per level.
 * @default 5 * this._level
 *
 *
 * @help Fomar0153_APOnLevel.js
 *
 * This plugin provides the basis for secondary progression systems.
 * If using in conjuction with my original AP System, place this one below
 * the original, the name for AP in this plugin will also override the name
 * in the original.
 *
 */

var Fomar = Fomar || {};
Fomar.APSystem = Fomar.APSystem || {};

Fomar.APSystem.parametersLevelUp = PluginManager.parameters('Fomar0153_APOnLevel');

Fomar.APSystem.vocabAP = Fomar.APSystem.parametersLevelUp["AP Name"] || "AP";
Fomar.APSystem.onLevel = Fomar.APSystem.parametersLevelUp["AP On Level"];

(() => {

  Game_Actor.prototype.gainAP = function() {
    // over write this in your plugin
  };

  Fomar.APSystem.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
  Game_Actor.prototype.levelUp = function() {
    Fomar.APSystem.Game_Actor_levelUp.call(this);
    this.gainAP(parseInt(eval(Fomar.APSystem.onLevel)));
  };

  Fomar.APSystem.Game_Actor_changeExp = Game_Actor.prototype.changeExp;
  Game_Actor.prototype.changeExp = function(exp, show) {
    const preLevel = this._level;
    Fomar.APSystem.Game_Actor_changeExp.call(this, exp, show);
    if (show && this._level > preLevel) {
      $gameMessage.add("\\." + TextManager.obtainExp.format(eval(Fomar.APSystem.onLevel), Fomar.APSystem.vocabAP));
    }
  };

})();
