//=============================================================================
// Alistair Plugins - TP Cost Rate
// AP_TPCostRate.js
//=============================================================================
//=============================================================================
 /*:
 * @plugindesc v1.1 Allows altering the TP Cost Rate of Actors, Classes, Enemies, Weapons, Armours and States.
 * @author Alistair Plugins
 *
 * @param Default Actor TP Rate
 * @desc The default TP Rate every Actor begins with. (1 = 100%, 2 = 200%, 0.5 = 50%, ... )
 * @default 1
 *
 * @param Default Enemy TP Rate
 * @desc The default TP Rate every Enemy begins with. (1 = 100%, 2 = 200%, 0.5 = 50%, ... )
 * @default 1
 * @help
 * ============================================================================
 * Alistair Plugins - TP Cost Rate
 * ============================================================================
 * 
 * Am I the only one who dislikes that we still can't set a value in the editor
 * to determine the cost rate of TP? I mean, it's possible for MP by default.
 * Whatever. Here comes a plugin to the rescue.
 * With this Plugin you can allow pieces of equipment to reduce the TP Cost Rate.
 * You can alter the TP Cost Rate of heroes and classes by using the notetag
 * found further below.
 *
 * Place this Plugin below YEP_SkillCore or it won't work.
 * ============================================================================
 * Notetags
 * ============================================================================
 * These only work for: Actors, Classes, Enemies, Weapons, Armors, States
 * 
 * <tcr:x>
 * Will change the entity's TP Cost Rate to x%. Default is 100%.
 * Please note: If you have several of these affecting one actor, you should know
 *              that each value will be multiplied with consecutive values.
 *              Basically this means: Twice tcr:50 won't result in 0% Rate
 *              but in 25% Rate.
 * Please note: This is the exact way this notetag has to be written down.
 * No white spaces!
 * ============================================================================
 * Update History
 * ============================================================================
 * V1.1
 * - States now accept the Notetag as well
 *
 * V1.0
 * - First version
 */
//=============================================================================

(function() {

var parameters = PluginManager.parameters('AP_TPCostRate');
var actorDefaultRate = Number(parameters['Default Actor TP Rate'] || 1);
var enemyDefaultRate = Number(parameters['Default Enemy TP Rate'] || 1);

// YEP_SkillCore Function Overwritten
Game_BattlerBase.prototype.skillTpCost = function(skill) {
  var cost = skill.tpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
	cost += this.maxTp() * skill.tpCostPer;
  eval(skill.tpCostEval);
  cost *= this.tpCostRate();
  return Math.max(0, Math.floor(cost));
};

// New function Game_Enemy.prototype.tpCostRate() 
Game_Enemy.prototype.tpCostRate = function() {
var n = enemyDefaultRate;
if (this.enemy().meta.tcr !== undefined) {
n *= (this.enemy().meta.tcr / 100)
}
return n
}

// New function Game_Actor.prototype.tpCostRate()
Game_Actor.prototype.tpCostRate = function() {
var n = actorDefaultRate
if (this.actor().meta.tcr !== undefined) {
n *= (this.actor().meta.tcr / 100)
}
if (this.currentClass().meta.tcr !== undefined) {
n *= (this.currentClass().meta.tcr / 100)
}
var state = this.states()
for (var i = 0; i < state.length; i++) {
var item = state[i]
if (item && item.meta.tcr !== undefined) {
n *= (item.meta.tcr / 100)
}
}
var equip = this.equips()
for (var i = 0; i < equip.length; i++) {
var item = equip[i]
if (item && item.name && item.meta.tcr !== undefined) {
n *= (item.meta.tcr / 100)
}
}
return n
}

})();
//=============================================================================
// End of Plugin
//=============================================================================
