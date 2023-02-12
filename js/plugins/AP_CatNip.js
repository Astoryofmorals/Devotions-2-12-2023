//=============================================================================
// Alistair Plugins - Cat Nip
// AP_ManaShield.js
//=============================================================================
var Imported = Imported || {};
Imported.AP_CatNip = true;
//=============================================================================
 /*:
 * @plugindesc v1.0 Allows you to recreate the Cat Nip Mechanic used in FF X-2
 * @author Alistair Plugins
 *
 * @param Cat Nip Damage
 * @desc This is the default damage value that will be used when Cat Nip triggers. Default: 9999
 * @default 9999
 *
 * @param Critical HP
 * @desc HP will be considered critical once they reach this percentage of MaxHP. 1 = 100%; 0.5 = 50%; 0.1 = 10%; ... Default: 0.25
 * @default 0.25
 *
 * @help
 * ============================================================================
 * Alistair Plugins - Cat Nip
 * ============================================================================
 * 
 * Here is the remake of my Cat Nip script. 
 * Cat Nip is an accessory in Final Fantasy X-2 that raises the wearer's damage
 * to a very high value when their HP reach a critical value. Alternatively the
 * damage increase can be percental as well.
 *
 * Place this below all of Yanfly's Battle Scripts or it WON'T work.
 * ============================================================================
 * Notetags
 * ============================================================================
 * These only work for: Enemies, Weapons, Armours, States
 * 
 * <catnip:x>
 * Once Cat Nip is active, each attack will deal x damage. Use a negative value
 * for healing.
 * Example: <catnip:1000>. Each attack will deal 1000 damage once the battler's
 * HP reach a critical level.
 *
 * <catnip_percental:x>
 * Once Cat Nip is active, each attack will deal x% additional damage.
 * Example: <catnip_percental:100>. 
 * 100 damage will deal +100% damage = 200 damage.
 *
 * <catnip_HP_critical:x>
 * Alters the Critical HP level by x. Using +x will raise the level which 
 * triggers critical HP.
 * Using -x will lower it. x will be added to the default value that's defined
 * in the plugin settings.
 *
 * Example: <catnip_HP_critical:10> and default critical level = 0.25.
 * The final critical level would be 0.25 + (10 / 100) = 0.35 = 35% of HP.
 *
 * Example: <catnip_HP_critical:-10> and default critical level = 0.25.
 * The final critical level would be 0.25 + (-10 / 100) = 0.15 = 15% of HP.
 *
 * <catnip_bypass_fix>
 * Use this notetag if you want to bypass the fixed addition and only want to
 * have the percental value added to the damage.
 *
 *
 * Please note: This is the exact way these notetags have to be written down.
 * No white spaces!
 * ============================================================================
 * Update History
 * ============================================================================
 * V1.0
 * - First version
 */
//=============================================================================

(function() {

var parameters = PluginManager.parameters('AP_CatNip');
var CatNipDamage = Number(parameters['Cat Nip Damage']);
var CriticalHP = Number(parameters['Critical HP']);

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
	}; 
	// End of Imported
	// Extra Damage
	var a = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
	if (Imported.AP_EquipmentExtraDamage) {
	value = this.makeExtraDamage(value, a, b, s, v);
	};
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
	// Cat Nip 
	value = this.makeCatNip(value, a, b, s, v);
    return Math.round(value);
};

Game_Action.prototype.makeCatNip = function(value, a, b, s, v) {
var value = value;
var a = a;
var b = b;
var s = s;
var v = v;
var Use = a.catNip("use", a, b, s, v);
var CatNipDmg = a.catNip("dmg", a, b, s, v);
var CritHP = a.catNip("hp", a, b, s, v);
var CatNipPercental = a.catNip("percent", a, b, s, v);
var Bypass = a.catNip("bypass", a, b, s, v);
if (Use) {
if (a.hpRate() <= CritHP) {
	if (!Bypass) {
	value = CatNipDmg;
	}; 
	value = value + (value * CatNipPercental / 100);
	};
};
return value;
};

// New function Game_BattlerBase.prototype.manaShield(arg)
// arg determines which Mana Shield property will be returned.
// arg accepts strings.
Game_BattlerBase.prototype.catNip = function(arg, a, b, s, v) {
var a = a;
var b = b;
var s = s;
var v = v;
var arg = arg;
var CatNipDmg = CatNipDamage;
var CritHP = CriticalHP;
var CatNipPercental = 0;
var Bypass = false;
var Use = false;

if (this.isActor()) {
var equip = this.equips()
for (var i = 0; i < equip.length; i++) {
var item = equip[i]
if (item && item.meta.catnip !== undefined) {
CatNipDmg = eval(item.meta.catnip);
Use = true;
};
if (item && item.meta.catnip_percental !== undefined) {
CatNipPercental += eval(item.meta.catnip_percental);
Use = true;
};
if (item && item.meta.catnip_HP_critical !== undefined) {
CritHP += Number((eval(item.meta.catnip_HP_critical) / 100));
};
if (item && item.meta.catnip_bypass_fix !== undefined) {
Bypass = item.meta.catnip_bypass_fix;
};
};
};

var state = this.states()
for (var i = 0; i < state.length; i++) {
var item = state[i]
if (item && item.meta.catnip !== undefined) {
CatNipDmg = eval(item.meta.catnip);
Use = true;
};
if (item && item.meta.catnip_percental !== undefined) {
CatNipPercental += eval(item.meta.catnip_percental);
Use = true;
};
if (item && item.meta.catnip_HP_critical !== undefined) {
CritHP += Number((eval(item.meta.catnip_HP_critical) / 100));
};
if (item && item.meta.catnip_bypass_fix !== undefined) {
Bypass = item.meta.catnip_bypass_fix;
};
};

if (this.isEnemy()) {
var ene = this.enemy();
if (ene.meta.catnip !== undefined) {
CatNipDmg = eval(this.enemy().meta.catnip);
Use = true;
};
if (ene.meta.catnip_percental !== undefined) {
CatNipPercental += eval(ene.meta.catnip_percental);
Use = true;
};
if (ene.meta.catnip_HP_critical !== undefined) {
CritHP += Number((eval(ene.meta.catnip_HP_critical) / 100));
};
if (ene.meta.catnip_bypass_fix !== undefined) {
Bypass = ene.meta.catnip_bypass_fix;
};
};

// Cap Notetags
CritHP = Math.min(100, CritHP);
CritHP = Math.max(0, CritHP);

switch (arg) {
// Mana Shield Propertys
case "dmg": return CatNipDmg;
case "hp": return CritHP;
case "percent" : return CatNipPercental;
case "bypass": return Bypass;
case "use": return Use;
// Default
default: return 0
};
};

})();
//=============================================================================
// End of Plugin
//=============================================================================
