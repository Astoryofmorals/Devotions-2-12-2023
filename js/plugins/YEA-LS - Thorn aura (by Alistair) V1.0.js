#===============================================================================
# AE - Alistair Engine
#===============================================================================
# Code Snippet: Thorn Aura
# Version: 1.0
#
# Changelog:
# 1.0 - First Version
#===============================================================================
# Instructions:
# Place the code snippet into YEA - Lunatic States above the part where it says
# "Stop editing past this point". That's somewhere around line 188 by default.
#
#===NOTETAGS===================================================================
#---> States <---
#
# <thorn x>
# This will return x damage to the attacker.
#
# <thorn_percent x%>
# This will return x% of the damage dealt back to the attacker.
#
# Recommended effect: <shock effect>
#===SCRIPT=CALLS================================================================
#
# | NONE
#
#===============================================================================


#  You should copy everything that's below this line! Don't copy my header, it will just unneccesarily bloat
#  your script!

    when /THORN_PERCENT[ ](\d+)[%]/i
      return if @result.hp_damage < 0
      subject = SceneManager.scene.subject
      thorn = (@result.hp_damage * ($1.to_i * 0.01)).round
      if subject.actor?
        target = subject
      end # if
      if subject.enemy?
        target = $game_troop.members[subject.index]
      end # if
      target.perform_damage_effect
      text = sprintf(YEA::BATTLE::POPUP_SETTINGS[:hp_dmg], thorn.group)
      target.create_popup(text, "HP_DMG")
      target.hp -= thorn
      target.create_popup(state.name, "WEAK_ELE")
      target.perform_collapse_effect if target.hp <= 0

    when /THORN[ ](\d+)/i
      return if @result.hp_damage < 0
      subject = SceneManager.scene.subject
      thorn = $1.to_i
      if subject.actor?
        target = subject
      end # if
      if subject.enemy?
        target = $game_troop.members[subject.index]
      end # if
      target.perform_damage_effect
      text = sprintf(YEA::BATTLE::POPUP_SETTINGS[:hp_dmg], thorn.group)
      target.create_popup(text, "HP_DMG")
      target.hp -= thorn
      target.create_popup(state.name, "WEAK_ELE")
      target.perform_collapse_effect if target.hp <= 0