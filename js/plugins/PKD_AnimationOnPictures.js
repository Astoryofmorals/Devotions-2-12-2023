//=============================================================================
// PKD_AnimationOnPictures.js (ver.1.0)
//=============================================================================
// [Update History]
// v1.0 (13.03.2021) - release

/*:
 * @plugindesc v1.0 - Play animations on any Picture in game
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/animations-on-pictures/
 * 
 * @help
 * [Description]
 * Plugin allows you play Effekseer animations from Database on
 * any Picture in game
 * 
 * -------------------------
 * [Usage]
 * Plugin have plugin commands.
 * 
 * Script calls:
 * playAnimationOnPicture(PICTURE_NUMBER, ANIMATION_NUMBER)
 * 
 * Example: playAnimationOnPicture(33, 2);
 * 
 * 
 * ------------------------
 * [Terms of Use]
 * See at plugin web page
 * 
 * [Help]
 * https://kdworkshop.net/discord-server/
 * 
 * [Support Author]
 * https://www.patreon.com/KageDesu
 * 
 *
 *  @command PlayAnimation
    @text Play Animation
    @desc Play animation on picture

    @arg pictureId
    @text Picture
    @type number
    @min 1
    @max 100
    @default 1

    @arg animationId
    @text Animation
    @type animation
    @default 1 
*/


(function(){
    
    PluginManager.registerCommand("PKD_AnimationOnPictures", 'PlayAnimation', args => {
            try {
                let pictureNumber = parseInt(args.pictureId);
                let animationId = parseInt(args.animationId);
                playAnimationOnPicture(pictureNumber, animationId);
            } catch (e) {
                console.warn(e);
            }
        });

    window.playAnimationOnPicture = (pictureNumber, animationId) => {
        let picture = $gameScreen.picture(pictureNumber);
        if(picture) $gameTemp.requestAnimation([picture], animationId, false);
    };

    //@[ALIAS]
    var _alias_Spriteset_Map_findTargetSprite = Spriteset_Map.prototype.findTargetSprite;
    Spriteset_Map.prototype.findTargetSprite = function (target) {
        if(target instanceof Game_Picture) {
            return this._pictureContainer.children.find( (spr) => spr.picture() == target);
        } else
            return _alias_Spriteset_Map_findTargetSprite.call(this, ...arguments);
        
    };

    //@[ALIAS]
    var _alias_Sprite_Animation_targetSpritePosition = Sprite_Animation.prototype.targetSpritePosition;
    Sprite_Animation.prototype.targetSpritePosition = function (sprite) {
        if (sprite instanceof Sprite_Picture) {
            var x = sprite.x + sprite.width / 2;
            var y = sprite.y;
            if(this._animation.alignBottom) {
                y += sprite.height;
            } else
                y += sprite.height / 2;
            return {x, y};
        } else
            return _alias_Sprite_Animation_targetSpritePosition.call(this, sprite);
    };

    //@[ALIAS]
    var _alias_Spriteset_Base_createAnimationSprite = Spriteset_Base.prototype.createAnimationSprite;
    Spriteset_Base.prototype.createAnimationSprite = function (targets, animation, mirror, delay) {
        _alias_Spriteset_Base_createAnimationSprite.call(this, targets, animation, mirror, delay);
        if(targets && targets[0] instanceof Game_Picture) {
            let last = this._effectsContainer.children[this._effectsContainer.children.length - 1];
            last.__removeFromUpperLayer = true;
            this._effectsContainer.removeChild(last);
            this._effectsPicturesContainer.addChild(last);
        }
    };

    //@[ALIAS]
    var _alias_Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
    Spriteset_Base.prototype.createPictures = function () {
        _alias_Spriteset_Base_createPictures.call(this);
        this._effectsPicturesContainer = new Sprite();
        this.addChild(this._effectsPicturesContainer);
    };

    //@[ALIAS]
    var _alias_Spriteset_Base_removeAnimation = Spriteset_Base.prototype.removeAnimation;
    Spriteset_Base.prototype.removeAnimation = function (sprite) {
        if(sprite.__removeFromUpperLayer === true) {
            this._effectsPicturesContainer.removeChild(sprite);
        }
        _alias_Spriteset_Base_removeAnimation.call(this, sprite);
    };

})();