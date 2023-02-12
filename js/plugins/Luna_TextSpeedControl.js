//=============================================================================
// Luna_TextSpeedControl.js
//=============================================================================
//=============================================================================
// Build Date: 2020-09-17 19:57:09
//=============================================================================
//=============================================================================
// Made with LunaTea -- Haxe
//=============================================================================

//=============================================================================
//  Contact Information
//=============================================================================
/*
*
*
*/

// Generated by Haxe 4.1.3
/*:
@author LunaTechs - Kino
@plugindesc An extension to the core Message Window functionality
to support Visual Novels <LunaTxtSpeedCntrl>.

@param Text Speed 
@desc The speed at which characters will be rendered
@default 2

@param Allow Show Fast During Wait
@desc Allows the player to skip to the end of text with the new default speed.
@default true

@target MV MZ

@help
Version: 1.00
Version Log:
Now you can change the text speed at will using escape characters
inside the window.
Example: \\TS[30] updates the text speed to super slow 30.
Note: The [30] will appear in the editor, but not in game.

Instructions:
You set your text speed in the plugin menu.
This is the speed that the characters will be drawn at.

Contact me via forums username: Kino.
Hope this plugin helps and enjoy!

MIT License

Copyright (c) 2020 LunaTechsDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE
*/
(function ($hx_exports, $global) { "use strict"
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""))
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0
		}
		this.r.m = this.r.exec(s)
		this.r.s = s
		return this.r.m != null;
	}
}
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index)
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static now() {
		return Date.now();
	}
}
class LunaTextSpeedControl {
	static main() {
		let _g = []
		let _g1 = 0
		let _g2 = $plugins
		while(_g1 < _g2.length) {
			let v = _g2[_g1]
			++_g1
			if(new EReg("<LunaTxtSpeedCntrl>","ig").match(v.description)) {
				_g.push(v)
			}
		}
		let parameters = _g[0].parameters
		let string = parameters["Text Speed"]
		let radix = 10
		if(radix == null) {
			radix = 10
		}
		LunaTextSpeedControl.textSpeed = parseInt(string,radix)
		LunaTextSpeedControl.allowSkip = parameters["Allow Show Fast During Wait"].trim() == "true"
		
//=============================================================================
// Window_Message
//=============================================================================
      
		let _winMsgInit = Window_Message.prototype.initialize
		Window_Message.prototype.initialize = function(rect) {
			_winMsgInit.call(this,rect)
			this.originalTextSpeed = LunaTextSpeedControl.textSpeed
			this.activeTextSpeed = LunaTextSpeedControl.textSpeed
		}
		Window_Message.prototype.updateTextSpeed = function(value) {
			return this.activeTextSpeed = value;
		}
		let _winMsgProcessEscapeCharacter = Window_Message.prototype.processEscapeCharacter
		Window_Message.prototype.processEscapeCharacter = function(code,textState) {
			let winMsg = this
			if(code == "TS") {
				winMsg.updateTextSpeed(winMsg.obtainEscapeParam(textState) | 0)
			} else {
				_winMsgProcessEscapeCharacter.call(winMsg,code,textState)
			}
		}
		let _winProcessCharacter = Window_Message.prototype.processCharacter
		Window_Message.prototype.processCharacter = function(textState) {
			let winMsg = this
			_winProcessCharacter.call(winMsg,textState)
			let char = textState.text.charAt(textState.index)
			if(winMsg._lineShowFast == false && winMsg._showFast == false && HxOverrides.cca(char,0) >= 32) {
				winMsg.startWait(winMsg.activeTextSpeed)
			}
		}
		let _updateWait = Window_Message.prototype.updateWait
		Window_Message.prototype.updateWait = function() {
			if(this.isTriggered() && LunaTextSpeedControl.allowSkip) {
				this._waitCount = 0
				this._showFast = true
			}
			return _updateWait.call(this);
		}
		let _winMsgTerminateMessage = Window_Message.prototype.terminateMessage
		Window_Message.prototype.terminateMessage = function() {
			this.activeTextSpeed = this.originalTextSpeed
			_winMsgTerminateMessage.call(this)
		}
	}
}
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0
		this.array = array
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
class _$LTGlobals_$ {
}
class utils_Fn {
	static proto(obj) {
		return obj.prototype;
	}
	static updateProto(obj,fn) {
		return (fn)(obj.prototype);
	}
	static updateEntity(obj,fn) {
		return (fn)(obj);
	}
}
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance)
}
LunaTextSpeedControl.textSpeed = 2
LunaTextSpeedControl.allowSkip = true
LunaTextSpeedControl.main()
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, {})