//=============================================================================
// Alistair Plugins - Equipment extra Damage
// AP_EquipmentExtraDamage.js
//=============================================================================
var Imported = Imported || {};
Imported.AP_EquipmentExtraDamage = true;
//=============================================================================
 /*:
 * @plugindesc v1.01 Allows Equipment and States to deal additional damage
 * @author Alistair Plugins
 *
 * @param Damage Cap MAX
 * @desc This is the biggest value that could possibly be added to the damage. Default: 9999
 * @default 9999
 *
 * @param Damage Cap MIN
 * @desc This is the smallest value that could possibly be added to the damage. Default: 0
 * @default 0
 *
 * @param Healing Cap MAX
 * @desc This is the "biggest" value that could possibly be added to the healing. Default: -9999
 * @default -9999
 *
 * @param Healing Cap MIN
 * @desc This is the "smallest" value that could possibly be added to the healing. Default: 0
 * @default 0
 *
 * @help
 * ============================================================================
 * Alistair Plugins - Equipment extra Damage
 * ============================================================================
 * 
 * This plugin enables you to have equipment and states that raise your
 * damage by a fixed amount or by a formula. For example, I use an accessory
 * called Fan of the Goddess which adds 50% ATK + 50% MAT to any damage the
 * wearer deals to an enemy.
 *
 * Place this below all of Yanfly's Battle Scripts or it WON'T work.
 * ============================================================================
 * Notetags
 * ============================================================================
 * These only work for: Weapons, Armours, States, Enemies
 *
 * <extra_damage:x>
 * Will add x damage to your attacks. x can either be a fixed number or a
 * formula. In the formula you can use a (the user), b (the target), s (switches)
 * and v (variables). Remember that x can be negative as well, resulting 
 * in healing.
 *
 * <extra_healing:x>
 * Will add x to your healing skills. x can either be a fixed number or a
 * formula. In the formula you can use a (the user), b (the target), s (switches)
 * and v (variables). Remember that you need a negative value for x or otherwise
 * it will turn to damage!
 *
 * Please note: This is the exact way these notetags have to be written down.
 * No white spaces!
 * ============================================================================
 * Update History
 * ============================================================================
 * V1.01
 * - Healing and Damage now have seperate Notetags
 *
 * V1.0
 * - First version
 */
//=============================================================================

(function() {

var parameters = PluginManager.parameters('AP_EquipmentExtraDamage');
var DmgCapMax = Number(parameters['Damage Cap MAX']);
var DmgCapMin = Number(parameters['Damage Cap MIN']);
var HealCapMax = Number(parameters['Healing Cap MAX']);
var HealCapMin = Number(parameters['Healing Cap MIN']);

// Default Function Overwritten
Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
	// Begin of Imported
	if (Imported.YEP_DamageCore) {
	var a = this.subject();
    var b = target;
	var user = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var baseDamage = this.evalDamageFormula(target);
    var value = baseDamage;
	eval(Yanfly.DMG.DamageFlow);
	//
	} else {
	//
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
	}; // End of Imported
	// Extra Damage
	var a = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
	value = this.makeExtraDamage(value, a, b, s, v);
	// Zombie State
	var user = this.subject();
	if (Imported.AP_ZombieVampiricState) {
	value = this.makeZombieState(value, target);
	};
	// AP_ManaShield
	if (Imported.AP_ManaShield) {
	value = this.makeManaShield(value, target, critical);
	};
	// Vampiric State
	if (Imported.AP_ZombieVampiricState) {
	this.makeVampiricState(value, target, user);
	};
    return Math.round(value);
};

Game_Action.prototype.makeExtraDamage = function(value, a, b, s, v) {
var collected_Damage = this.subject().extraDamage("dmg", a, b, s, v);
var collected_Healing = this.subject().extraDamage("heal", a, b, s, v);
if (value > 0) {
value += collected_Damage;
} else if (value < 0) {
value += collected_Healing;
}; // End if
return value;
}; // End function

Game_BattlerBase.prototype.extraDamage = function(arg, a, b, s, v) {
var arg = arg;
var collected_Damage = 0;
var collected_Healing = 0;
if (this.isActor()) {
var equip = this.equips();
for (var i = 0; i < equip.length; i++) {
var item = equip[i];
if (item && item.meta.extra_damage !== undefined) {
collected_Damage += eval(item.meta.extra_damage);
}; // End if
if (item && item.meta.extra_healing !== undefined) {
collected_Healing += eval(item.meta.extra_healing);
}; // End if
}; // End for
}; // End if

var state = this.states();
for (var i = 0; i < state.length; i++) {
var item = state[i];
if (item && item.meta.extra_damage !== undefined) {
collected_Damage += eval(item.meta.extra_damage);
}; // End if
if (item && item.meta.extra_healing !== undefined) {
collected_Healing += eval(item.meta.extra_healing);
}; // End if
}; // End for

if (this.isEnemy()) {
if (this.enemy().meta.extra_damage !== undefined) {
collected_Damage += eval(this.enemy().meta.extra_damage);
}; // End if
if (this.enemy().meta.extra_healing !== undefined) {
collected_Healing += eval(this.enemy().meta.extra_healing);
}; // End if
}; // End if

var collected_Damage = Math.max(DmgCapMin, collected_Damage);
var collected_Damage = Math.min(DmgCapMax, collected_Damage);
var collected_Healing = Math.max(HealCapMax, collected_Healing);
var collected_Healing = Math.min(HealCapMin, collected_Healing);

switch (arg) {
case "dmg":
return Math.round(collected_Damage);
case "heal":
return Math.round(collected_Healing);
}; // End switch

}; // End function

})();
//=============================================================================
// End of Plugin
//=============================================================================
