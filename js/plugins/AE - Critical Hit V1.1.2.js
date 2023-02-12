$imported = {} if $imported.nil?
$imported["AE-CriticalHit"] = true
#===============================================================================
# AE - Alistair Engine
#===============================================================================
# Critical Hit
# Version: 1.1.2
# Changelog:
# 1.0 - First version
# 1.1 - States can now raise a battler's critical damage.
# 1.1.1 - Bugfixes
# 1.1.2 - Compatible with YEA - Autobattle
#===============================================================================
# Instructions:
# Place this script below most of your other scripts.
#
# Use the given Notetags in your Skills' noteboxes.
#
#===NOTETAGS===================================================================
#---> For Skills <---
#
# <critical: +x%> or <critical: -x%>
# <crit: +x%>     or <crit: -x%>
# Will raise/lower the skill's critical hit chance by x%.
#
# <critical_damage: +x%> or <critical_damage: -x%>
# <crit_dmg: +x%>        or <crit_dmg: -x%>
# Will raise/lower the skill's critical damage by x%.
#
#---> For States <---
#
# <critical_damage: +x%> or <critical_damage: -x%>
# <crit_dmg: +x%>        or <crit_dmg: -x%>
# Will raise/lower the affected battler's critical damage by x%.
#
#===SCRIPT CALLS================================================================
#
# | NONE
#
#===TERMS OF USE================================================================
# Please make sure to read my Terms of Use if you plan to use this script
# in a public project of yours, be it commercial or not.
#
# https://www.dropbox.com/s/0e9d1eo62lgxbip/Terms%20of%20Use.txt?dl=0
#
#===============================================================================
module AE
  module CH
    
    CRITICAL_DAMAGE = "3"
    # Critical damage will be multiplied with this number. I guess I don't
    # have to remind you not to go overboard with this. The default
    # value RPG Maker VX Ace uses is 3.
    
    # Please note that the value above will run through an eval to
    # enable advanced calculation of critical damage. Therefore, whatever
    # you put after 'CRITICAL_DAMAGE =' needs to be enclosed with "".
    
    # If you don't know much about evals and formulas, I advise you to
    # put in a number, just like it is by default.
    
  end # CH
end # AE
#===============================================================================
# Editting anything past this point may result in a crash. So only go on if you
# know what you are doing.
#===============================================================================
class RPG::State
  
  attr_accessor :critical_damage
  
  def critical_damage
    @critical_damage = 0
    if @note =~ /<(?:critical_damage|CRIT_DMG):[ ]([\+\-]\d+)[%]>/i
      @critical_damage += ($1.to_i * 0.01)
    else
      @critical_damage = 0
    end # if
    @critical_damage
  end # def
  
end # class
#===============================================================================
class RPG::Skill
  
  attr_accessor :critical_mod
  attr_accessor :critical_damage
  
  def critical_mod
    @critical_mod = 0
    if @note =~ /<(?:critical|CRIT):[ ]([\+\-]\d+)[%]>/i
      @critical_mod = $1.to_i * 0.01
    end # if
    @critical_mod
  end # def
  
  def critical_damage
    @critical_damage = 0
    if @note =~ /<(?:critical_damage|CRIT_DMG):[ ]([\+\-]\d+)[%]>/i
      @critical_damage += ($1.to_i * 0.01)
    else
      @critical_damage = 0
    end # if
    @critical_damage
  end # def
  
end # class
#===============================================================================
class Game_BattlerBase
  
  def state_crit
    n = 0
    for state in states
      next if state.nil?
      n += state.critical_damage
    end # for
    return n
  end # def
  
end # class
#===============================================================================
class Game_Battler < Game_BattlerBase
  
  def item_cri(user, item)
    item.damage.critical ? ((user.cri + item.critical_mod) * (1 - cev)) : 0
  end # def
  
  def apply_critical(damage)
    damage * eval(AE::CH::CRITICAL_DAMAGE)
  end # def
  
end # class
#===============================================================================
class RPG::Enemy
  
  def state_crit
    return Game_Enemy.new($target_index, $target_id_ae).state_crit
  end # def
  
end # class
#===============================================================================
class Game_ActionResult
  
  def state_crit(kind, id)
    case kind
    when 1 # Actor
      return $game_actors[id].state_crit rescue 0
    when 2 # Enemy
      return $data_enemies[id].state_crit rescue 0
    end # case
  end # def
  
  alias make_damage_ae make_damage
  def make_damage(value, item)
    target_ae = SceneManager.scene.subject
    $target_id_ae = 0
    target_kind = 1
    $target_index = 1
    if target_ae.is_a?(Game_Actor); $target_id_ae = target_ae.id; target_kind = 1; end
    if target_ae.is_a?(Game_Enemy); $target_id_ae = target_ae.enemy_id; target_kind = 2; $target_index = target_ae.index; end
#~     target = SceneManager.scene.is_a?(Scene_Battle) ? SceneManager.scene.subject : $game_party.menu_actor
    crit_dmg_mod = [state_crit(target_kind, $target_id_ae) + item.critical_damage, 1].max unless item.is_a?(RPG::Item)
    value *= crit_dmg_mod if @critical
    value = value.round
#~    value = (value * self.damage_ratio.to_f / 100).to_i
    make_damage_ae(value, item)
  end # def
  
end # class
#===============================================================================
# End of Script@
#===============================================================================