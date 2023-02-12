/*:
 * @plugindesc Implements a Skill System where you learn skills from your equipment.
 * @author Fomar0153
 *
 * @param Display Multipliers
 * @type boolean
 * @desc Display a weapon's learn speed?
 * @default true
 *
 * @help
 * Recquires Fomar_AP_System or equivelent.
 * Notetag skills with <ap: x> to set the amount of AP required to learn the skill.
 * Notetag weapons with <ap: x:y> with x being the skill id and y being the learn
 * speed (usually a 1).
 * For multiple skills on a weapon use <ap: x:y;xy> with ; seperating the skills
 * and their learn speeds.
 * If you want the skills to be usable before mastering them then you need to add
 * them via traits on the weapons.
 *
 */

(function() {

  var Fomar = Fomar || {};
  Fomar.EquipmentSkills = {};

  Fomar.EquipmentSkills.display_mult = (PluginManager.parameters('Fomar_Equipment_Skill_System')['Display Multipliers'] == "true");

  Fomar.EquipmentSkills.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function() {
    Fomar.EquipmentSkills.Game_Actor_initMembers.call(this);
    this._ap = [];
  };

  Fomar.EquipmentSkills.Game_Actor_gainAP = Game_Actor.prototype.gainAP;
  Game_Actor.prototype.gainAP = function(ap) {
    Fomar.EquipmentSkills.Game_Actor_gainAP.call(this, ap);
    for (var j = 0; j < this.equipSlots().length; j++) {
      if (this.equips()[j] != null && this.equips()[j].meta['skills'] != null) {
        var skills = this.equips()[j].meta['skills'].split(";");
        for (var i = 0; i < skills.length; i++) {
          var skill_id = parseInt(skills[i].split(":")[0]);
          if (!this.isLearnedSkill(skill_id)) {
            var mult = parseInt(skills[i].split(":")[1]);
            var max = parseInt($dataSkills[skill_id].meta['ap'] || 0);
            this._ap[skill_id] = Math.min((this._ap[skill_id] || 0) + ap * mult, max);
            if (this._ap[skill_id] == max) {
              this.learnSkill(skill_id);
              $gameMessage.add(this.name() + " masters " + $dataSkills[skill_id].name + "!");
            }
          }
        }
      }
    }
  };

  Fomar.EquipmentSkills.Window_EquipStatus_initialize = Window_EquipStatus.prototype.initialize;
  Window_EquipStatus.prototype.initialize = function(x, y, w, h) {
    this._w = w;
    this._h = h;
    this._slotId = -1;
    Fomar.EquipmentSkills.Window_EquipStatus_initialize.call(this, x, y);
  };

  // overwrites
  Window_EquipStatus.prototype.windowWidth = function() {
    return this._w;
  };

  // overwrites
  Window_EquipStatus.prototype.windowHeight = function() {
    return this._h;
  };

  Window_EquipStatus.prototype.setSlotId = function(slotId) {
    if (this._slotId !== slotId) {
      this._slotId = slotId;
      this.refresh();
    }
  };

  Fomar.EquipmentSkills.Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
  Window_EquipStatus.prototype.refresh = function() {
    Fomar.EquipmentSkills.Window_EquipStatus_refresh.call(this);
    if (this._actor) {
      if (this._slotId < 0) {
        return;
      }
      if (this._tempActor) {
        var e = this._tempActor.equips()[this._slotId];
      } else {
        var e = this._actor.equips()[this._slotId];
      }
      if (e != null) {
        var line_number = 8;
        this.drawItemName(e, 0, this.lineHeight() * line_number);
        line_number += 1;
        if (e.meta['skills'] == null) {
          return;
        }
        var skills = e.meta['skills'].split(";");
        var w = this.contentsWidth();
        for (var i = 0; i < skills.length; i++) {
          var skill_id = parseInt(skills[i].split(":")[0]);
          var mult = parseInt(skills[i].split(":")[1]);
          this.drawItemName($dataSkills[skill_id], 0, this.lineHeight() * line_number);
          if (Fomar.EquipmentSkills.display_mult) {
            this.drawText("x" + mult, 0, this.lineHeight() * line_number, w, 'right');
          }
          var max = parseInt($dataSkills[skill_id].meta['ap'] || 0);
          var color1 = this.hpGaugeColor1();
          var color2 = this.hpGaugeColor2();
          this.drawGauge(0, this.lineHeight() * (line_number + 1) - 2, w, ((this._actor._ap[skill_id] || 0) / max), color1, color2);
          this.drawCurrentAndMax((this._actor._ap[skill_id] || 0), max, 0, this.lineHeight() * (line_number + 1), w, this.normalColor(), this.normalColor());
          line_number += 2;
        }
      }
    }
  };

  Window_EquipItem.prototype.maxCols = function() {
    return 1;
  };

  Fomar.EquipmentSkills.Window_EquipSlot_update = Window_EquipSlot.prototype.update;
  Window_EquipSlot.prototype.update = function() {
    Fomar.EquipmentSkills.Window_EquipSlot_update.call(this);
    if (this._statusWindow) {
      this._statusWindow.setSlotId(this.index());
    }
  };

  // overwrites
  Scene_Equip.prototype.createStatusWindow = function() {
    width = 312 + (SceneManager._boxWidth - 816) / 2;
    height = SceneManager._boxHeight - this._helpWindow.height;
    this._statusWindow = new Window_EquipStatus(0, this._helpWindow.height, width, height);
    this.addWindow(this._statusWindow);
  };

  // overwrites
  Scene_Equip.prototype.createSlotWindow = function() {
    var wx = this._statusWindow.width;
    var wy = this._commandWindow.y + this._commandWindow.height;
    var ww = Graphics.boxWidth - this._statusWindow.width;
    var wh = this._statusWindow.fittingHeight(7) - this._commandWindow.height;
    this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler('ok', this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel', this.onSlotCancel.bind(this));
    this.addWindow(this._slotWindow);
  };

  // overwrites
  Scene_Equip.prototype.createItemWindow = function() {
    var wx = this._statusWindow.x + this._statusWindow.width;
    var wy = this._slotWindow.y + this._slotWindow.height;
    var ww = Graphics.boxWidth - this._statusWindow.width;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setStatusWindow(this._statusWindow);
    this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._slotWindow.setItemWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
  };

})();
