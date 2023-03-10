/*
 * ==============================================================================
 * ** Victor Engine MV - Equip Set
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2016.04.14 > First release.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Equip Set'] = '1.00';

var VictorEngine = VictorEngine || {};
VictorEngine.EquipSet = VictorEngine.EquipSet || {};

(function() {

	VictorEngine.EquipSet.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.EquipSet.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Equip Set', 'VE - Basic Module', '1.12');
	};

	VictorEngine.EquipSet.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.EquipSet.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 * ------------------------------------------------------------------------------
 * @plugindesc v1.00 - Using sets of equipment grant extra benefits.
 * @author Victor Sant
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------
 * Actors and Classes Notetags:
 * ------------------------------------------------------------------------------
 *
 * <equip set>
 *  set: item X, item Y
 *  X parts: Y
 * </equip set>
 *  Thist tag setups the equipment set.
 *  The setup have two basic parts: the set items and the states that
 *
 * ---------------
 *
 *  - Set
 *  List of equips, states and equip types that grants extra benefits when used
 *  together. You can setup weapons, armors, armor types and weapon types.
 *    armor x  : armor Id X.
 *    weapon x : weapon Id X.
 *    atype x  : armors with type Id X.
 *    wtype x  : weapons with type Id X.
 *
 *  You can use a shorter form for the setup instead of using the complete text.
??*  Use the following shorter form to replace the long forms:
 *    a  : armor
 *    w  : weapon
 *    at : atype
 *    wt : wtype
 *     EX.: weapon 5 can be replaced with w5
 *          atype 3 can be replaced with at3
 *
 *  Don't add repeated values, since the plugin will just match the same equip 
 *  more than once.
 *
 * ---------------
 *  
 *  - Parts
 *  Number of parts that needs to be equiped to have extra benefits of the set.
 *  The benefit is represented by a passive state. You can setup the set to give
 *  different states based on the number of equiped parts of it.
 *    Ex.: 2 Parts: 10
 *         4 Parts: 12
 *
 * ------------------------------------------------------------------------------
 * Additional Information:
 * ------------------------------------------------------------------------------
 * 
 *  - Equip Set
 *  The equip set notetag must be  added to the actor and/or class. Actors
 *  without the tag will not receive the bonus state for assembling the parts of
 *  the set.
 *  You can use the plugin 'VE - Notes Text File' to make the notetag setup
 *  easier.
 * 
 * ------------------------------------------------------------------------------
 * Example Notetags:
 * ------------------------------------------------------------------------------
 *
 * <equip set>
 *  set: weapon 1, armor 1, armor 2, armor 3
 *  4 parts: 5
 * </equip set>
 *  Adds the state 5 when the weapon 1 and the armors 1, 2 and 3 are equiped.
 *
 * ---------------
 *
 * <equip set>
 *  set: w1, a1, a2, a3
 *  4 parts: 5
 * </equip set>
 *  Adds the state 5 when the weapon 1 and the armors 1, 2 and 3 are equiped.
 *  (using short form)
 *
 * ---------------
 *
 * <equip set>
 *  set: wt2, at3
 *  2 parts: 12
 * </equip set>
 *  Adds the state 12 when equipig an weapon with type Id 2 and an armor with
 *  type Id 3.
 *
 * ---------------
 *
 * <equip set>
 *  set: a10, a15, a20, a25
 *  2 parts: 10
 *  4 parts: 11
 * </equip set>
 *  Adds the state 10 when equiping 2 items among the armors 10, 15, 20 and 25.
 *  Adds the state 11 when equiping the armors 10, 15, 20 and 25.
 *  (all states with meeting criteria are added)
 *
 * ------------------------------------------------------------------------------
 */

(function() {
	
	//=============================================================================
	// Parameters
	//=============================================================================
	
	if (Imported['VE - Basic Module']) {
		var parameters = VictorEngine.getPluginParameters();
		VictorEngine.Parameters = VictorEngine.Parameters || {};
		VictorEngine.Parameters.EquipSet = {};
		VictorEngine.Parameters.EquipSet.PluginParameter = Number(parameters["Plugin Parameter"]) || 0;
		VictorEngine.Parameters.EquipSet.PluginParameter = String(parameters["Plugin Parameter"]).trim();
		VictorEngine.Parameters.EquipSet.PluginParameter = eval(parameters["Plugin Parameter"]);
	}
		
	//=============================================================================
	// VictorEngine
	//=============================================================================
	
	VictorEngine.EquipSet.loadNotetagsValues = VictorEngine.loadNotetagsValues;
	VictorEngine.loadNotetagsValues = function(data, index) {
		VictorEngine.EquipSet.loadNotetagsValues.call(this, data, index);
		var list = ['actor', 'class'];
		if (this.objectSelection(index, list)) VictorEngine.EquipSet.loadNotes(data);
	};
	
	VictorEngine.EquipSet.loadNotes = function(data) {
		data.equipSet = data.equipSet || [];
		this.processNotes(data);
	};
	
	VictorEngine.EquipSet.processNotes = function(data) {
		var match;
		var regex = VictorEngine.getNotesValues('equip set')
		while ((match = regex.exec(data.note)) !== null) { this.processValues(data, match) };
	};
	
	VictorEngine.EquipSet.processValues = function(data, match) {
		var result  = {};
		this.processSet(result, match[1]);
		this.processParts(result, match[1]);
		data.equipSet.push(result);
	};
	
	VictorEngine.EquipSet.processSet = function(data, match) {
		data.set = [];
		var value;
		var regex = new RegExp('set[ ]*:[ ]*((?:\\w+[ ]*\\d+[ ]*,?[ ]*)+)', 'gi');
		while ((value = regex.exec(match)) !== null) { this.processEquip(data, value) }
	};
	
	VictorEngine.EquipSet.processParts = function(data, match) {
		data.parts = [];
		var value;
		var regex = new RegExp('(\\d+)[ ]*parts[ ]*:[ ]*(\\d+)', 'gi');
		while ((value = regex.exec(match)) !== null) {
			var result = {};
			result.number = Number(value[1]);
			result.state  = Number(value[2]);
			data.parts.push(result)
		}
	};
	
	VictorEngine.EquipSet.processEquip = function(data, match) {
		var value;
		var regex = new RegExp('(armor|weapon|atype|wtype|a|w|at|wt)[ ]*(\\d+)', 'gi');
		while ((value = regex.exec(match[1])) !== null) { 
			var result  = {};
			result.type = this.processType(value[1]);
			result.id   = Number(value[2]);
			data.set.push(result)
		}
	};
	
	VictorEngine.EquipSet.processType = function(value) {
		switch (value.toLowerCase()) {
		case 'armor':
			return 'a';
		case 'weapon':
			return 'w'
		case 'atype':
			return 'at';
		case 'wtype':
			return 'wt'
		default:
			return value.toLowerCase();
		}
	};
	
	//=============================================================================
	// Game_Actor
	//=============================================================================
	
  	VictorEngine.EquipSet.initMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function() {
		this._equipSetStates = [];
		VictorEngine.EquipSet.initMembers.call(this);
	};
	
  	VictorEngine.EquipSet.refresh = Game_Actor.prototype.refresh;
	Game_Actor.prototype.refresh = function() {
		this.refreshequipSets();
		VictorEngine.EquipSet.refresh.call(this);
	};
	
	Game_Actor.prototype.refreshequipSets = function() {
		this.removeEquipSetStates();
		this.setupEquipSetStates();
	};
	
	Game_Actor.prototype.removeEquipSetStates = function() {
		this._equipSetStates.forEach(function(stateId) {
			this.eraseState(stateId)
		}, this);
		this._equipSetStates = [];
	};
	
	Game_Actor.prototype.setupEquipSetStates = function() {
		var sets = [].concat(this.actor().equipSet, this.currentClass().equipSet);
		sets.forEach(function(equipSet) { 
			this.addEquipSetStates(equipSet);
		}, this);
	};
	
	Game_Actor.prototype.addEquipSetStates = function(equipSet) {
		var parts = 0;
		equipSet.set.forEach(function(set) {
			if (this.hasSetPart(set)) parts++;
		}, this);
		equipSet.parts.forEach(function(part) {
			if (parts >= part.number) this.addEquipSetNewState(part.state);
		}, this);
	};
	
	Game_Actor.prototype.hasSetPart = function(set) {
		if (set.type === 'a' && this.equips().contains($dataArmors[set.id]))  return true;
		if (set.type === 'w' && this.equips().contains($dataWeapons[set.id])) return true;
		return this.equips().some(function(item) {
			if (item && set.type === 'at' && DataManager.isArmor(item)  && item.atypeId === set.id) return true;
			if (item && set.type === 'wt' && DataManager.isWeapon(item) && item.wtypeId === set.id) return true;
			return false;
		}, this);
	};

	Game_Actor.prototype.addEquipSetNewState = function(stateId) {
		if (this.isAlive()) {
			if (!this.isStateAffected(stateId)) {
				if (!this._equipSetStates.contains(stateId)) this._equipSetStates.push(stateId);
				if (stateId === this.deathStateId()) this.die();
				var restricted = this.isRestricted();
				this._states.push(stateId);
				this.sortStates();
			};
		}
	};
	
})();