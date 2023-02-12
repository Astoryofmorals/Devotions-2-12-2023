#===============================================================================
# AE - Alistair Engine
#===============================================================================
# Code Snippet: Devotion
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
# <devotion: x% y%>
# Reduces incoming damage TO (not by!) x% and makes the original caster
# of the state take y% of that reduced damage. The battler afflicted with
# the state won't take any damage at all.
#
# Example Notetag:
# <react effect: devotion: 30% 100%>
# Incoming damage will be reduced to 30% and the original caster of the state
# will receive 100% of what's left of the damage.
#===SCRIPT=CALLS================================================================
#
# | NONE
#
#===============================================================================


#  You should copy everything that's below this line! Don't copy my header, it will just unneccesarily bloat
#  your script!

   when /DEVOTION:[ ](\d+)%[ ](\d+)%/i
      return unless @result.hp_damage > 0
      @origin_damage = (@result.hp_damage * $1.to_i / 100) * $2.to_i / 100
      @result.hp_damage = 0
      state_origin.hp -= @origin_damage
      if $imported["YEA-BattleEngine"] && @origin_damage > 0
      text = sprintf(YEA::BATTLE::POPUP_SETTINGS[:hp_dmg], @origin_damage.group)
      state_origin.create_popup(text, "HP_DMG")
      end # if