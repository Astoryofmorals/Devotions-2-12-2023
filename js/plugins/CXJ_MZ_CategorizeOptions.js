/******************************************************************************
 * CXJ_MZ_CategorizeOptions.js                                                *
 ******************************************************************************
 * By G.A.M. Kertopermono, a.k.a. GaryCXJk                                    *
 ******************************************************************************
 * License: MIT                                                               *
 ******************************************************************************
 * Copyright (c) 2020, G.A.M. Kertopermono                                    *
 *                                                                            *
 * Permission is hereby granted, free of charge, to any person obtaining a    *
 * copy of this software and associated documentation files (the "Software"), *
 * to deal in the Software without restriction, including without limitation  *
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,   *
 * and/or sell copies of the Software, and to permit persons to whom the      *
 * Software is furnished to do so, subject to the following conditions:       *
 *                                                                            *
 * The above copyright notice and this permission notice shall be included in *
 * all copies or substantial portions of the Software.                        *
 *                                                                            *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR *
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,   *
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL    *
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER *
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING    *
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER        *
 * DEALINGS IN THE SOFTWARE.                                                  *
 ******************************************************************************/

/*:
 * @target MZ
 * @plugindesc Categorizes the option menu.
 * @author G.A.M. Kertopermono
 *
 * @help
 * ============================================================================
 * = About                                                                    =
 * ============================================================================
 *
 * The options menu is pretty barebones, which isn't a bad thing, but it could
 * be a lot better, especially if you plan on adding a lot more extra
 * configuration options.
 *
 * This plugin actually makes the first step, by categorizing the options menu
 * and add some new features to this menu.
 *
 * ============================================================================
 * = Requirements                                                             =
 * ============================================================================
 *
 * This plugin requires the following plugins to work:
 *
 * * CXJ_MZ.CoreEssentials: ^1.3
 *
 * ============================================================================
 * = Placement                                                                =
 * ============================================================================
 *
 * Make sure to place this plugin below the plugins that this plugin requires,
 * but above plugins that rely on this plugin.
 *
 * ============================================================================
 * = Usage                                                                    =
 * ============================================================================
 *
 * This plugin is a complete overhaul of the Window_Options screen, and might
 * not be compatible with other plugins that alter this object. Nevertheless
 * attempts are made to keep compatibility as much as possible, which is why
 * the original Window_Options object is kept. The same goes for Scene_Options.
 * Instead, two new classes have been created, Window_OptionsExt and
 * Scene_OptionsExt, which are both accessible from CXJ_MZ.CategorizeOptions.
 *
 * --------------
 * For developers
 * --------------
 *
 * For plugin developers, there are various hooks.
 *
 * ---
 *
 * CXJ_MZ.CategorizeOptions.addOption(name, symbol, options = {})
 *
 * This is the main portion of the plugin. It allows you to add a new option
 * to the options menu.
 *
 * By default, there are three types, category, boolean and volume. The
 * category type allows you to create (sub)categories. The symbol defines the
 * category identifier, which you can use with the category property of the
 * options object.
 *
 * In any other case, the symbol functions as the property selector of the
 * ConfigManager. You can also select properties inside objects you've
 * stored in the ConfigManager, by using a dot, in case you ever need to
 * directly select a certain property.
 *
 * Arguments:
 *
 * {string|function} name         - The label. Can be a function that returns
 *                                  a string.
 * {string} symbol                - The symbol name.
 * {object} options               - Extra options.
 *     {boolean|function} enabled - Whether the option is enabled or not.
 *     {*} ext                    - Additional data.
 *     {string} type              - The option type. By default, category,
 *                                  boolean, volume, reset and cancel are
 *                                  enabled.
 *     {string} category          - The category it should be added to.
 *                                  Defaults to '' (the root menu).
 *     {number} index             - Where the option should be inserted.
 *     {string} insertBefore      - The symbol name of the requested option.
 *                                  If defined, it will override the index.
 *     {string} insertAfter       - The symbol name of the requested option.
 *                                  If defined, it will override the index.
 *
 * ---
 *
 * CXJ_MZ.CategorizeOptions.addItemCallbacks(type, callbacks)
 *
 * In order to allow developers to easily add new option types, callbacks
 * are implemented. It's also implemented in a way that you can actually
 * override individual callbacks, or add new ones. By default, the following
 * callbacks have been implemented:
 *
 * * render(index)
 * * renderBackground(index)
 * * ok(index)
 * * change(index, forward)
 * * getSize(index)
 * * getSpacing(index)
 * * getRect(index, rect)
 *
 * There are already callbacks created for category, boolean, volume, reset
 * and cancel, however, you can override these callbacks if necessary. In fact,
 * you can replace individual callbacks without having to redefine the ones you
 * want to keep. This is because internally, it deep merges the callback object.
 *
 * While there technically aren't methods to remove a callback, simply
 * setting a callback to null has the same effect.
 *
 * Arguments:
 *
 * {string} type         - The option type to add a callback for.
 * {object} callbacks    - The callbacks you want to store.
 *
 * ---
 *
 * CXJ_MZ.CategorizeOptions.getItemCallbacks(type, callbackType = null)
 *
 * This allows you to retrieve all callbacks of a certain type, or a
 * specific callback.
 *
 * Arguments:
 *
 * {string} type    - The option type to retrieve the callbacks for.
 * {*} callbackType - The type of callback to be retrieved. Leave
 *                    null to get every callback.
 *
 * Returns:
 *
 * An object containing all callbacks, the requested callback function if
 * callbackType is not null, or null if the type doesn't have a callback
 * or the callback function does not exist.
 *
 * ---
 *
 * CXJ_MZ.CategorizeOptions.markTypeAsIgnore(type, ignore = true)
 *
 * This allows you to mark an option type as ignore. This means that it
 * will be skipped by the Reset to Default.
 *
 * Arguments:
 *
 * {string} type    - The option type to mark.
 * {boolean} ignore - Whether to ignore the type or not.
 *
 * ============================================================================
 * = Changelog                                                                =
 * ============================================================================
 *
 * 1.1.1 (2020-12-05)
 * ------------------
 *
 * * Fixed: Window width wasn't calculated properly with values lower than 0.
 * * Fixed: Parameter options couldn't go lower than 0.
 * * Fixed: Window visibility failed if there was a scroll.
 *
 * 1.1 (2020-12-01)
 * ----------------
 *
 * * Added CXJ_MZ.CategorizeOptions.markTypeAsIgnore.
 *
 * 1.0.1 (2020-12-01)
 * ------------------
 *
 * * Added insertBefore property for addOption.
 * * Added afterOk for category options.
 * * Added ignore support for reset, preventing options from getting reset.
 *
 * 1.0 (2020-11-30)
 * ----------------
 *
 * * Initial release
 *
 * ============================================================================
 * = Compatibility                                                            =
 * ============================================================================
 *
 * This plugin overwrites default functionality. Make sure you check whether or
 * not the plugin is compatible with other plugins by checking which functions
 * they overwrite. Below is the list of methods it overwrites:
 *
 * * Window_Options (full replacement)
 * * Scene_Options (full replacement)
 * * Scene_Boot.prototype.initialize
 * * Scene_Title.prototype.commandOptions
 * * Scene_Menu.prototype.commandOptions
 * * AudioManager.updateBufferParameters
 *
 * ============================================================================
 * = License                                                                  =
 * ============================================================================
 *
 * Copyright (c) 2020, G.A.M. Kertopermono
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * ============================================================================
 *
 * @param emptyMenu
 * @text Empty menu
 * @desc Start off with an empty options menu.
 * @type boolean
 * @default false
 * @on Yes
 * @off No
 *
 * @param touchUI
 * @text Touch UI
 * @desc Whether touch UI should be enabled by default or not.
 * @type select
 * @default null
 * @option Default
 * @value null
 * @option Yes
 * @value true
 * @option No
 * @value false
 *
 * @param hideTouchUI
 * @text Hide Touch UI option
 * @desc Whether or not to hide the touch UI option. Only applicable if Empty menu is turned off.
 * @type boolean
 * @default false
 * @on Yes
 * @off No
 *
 * @param windowWidth
 * @text Window width
 * @desc The width of the options window. Set 0 or lower to set the width based on the game screen size.
 * @type number
 * @default 400
 * @min -9999999
 *
 * @param maxWindowHeight
 * @text Max. window height
 * @desc The window height the window can grow to. Set 0 or lower to set the height based on the game screen size.
 * @type number
 * @default 0
 * @min -9999999
 *
 * @param resetToDefaultSpacing
 * @text Reset to Default spacing
 * @desc The extra empty space above the Reset to Default button.
 * @type number
 * @default 16
 * @min 0
 *
 * @param booleanWrap
 * @text Wrap boolean options
 * @desc Boolean options always switch regardless of the direction pressed.
 * @type boolean
 * @default false
 * @on Yes
 * @off No
 *
 * @param booleanDisplay
 * @text Boolean display
 * @desc How the boolean options should be displayed.
 * @type select
 * @default toggle
 * @option Toggle
 * @value toggle
 * @option Side-by-side
 * @value sbs
 *
 * @param volumeDisplay
 * @text Volume display
 * @desc How the volume options should be displayed.
 * @type select
 * @default numeric
 * @option Numeric
 * @value numeric
 * @option Slider
 * @value slider
 * @option Slider (below text)
 * @value sliderBelow
 * @option Slider (background)
 * @value sliderBG
 *
 * @param volumeStepSize
 * @text Volume step size
 * @type select
 * @default 20
 * @option 1
 * @value 1
 * @option 2
 * @value 2
 * @option 4
 * @value 4
 * @option 5
 * @value 5
 * @option 10
 * @value 10
 * @option 20
 * @value 20
 * @option 25
 * @value 25
 *
 * @param volumeSlider
 * @text Volume slider
 *
 * @param volumeSlider.width
 * @text Slider width
 * @type number
 * @parent volumeSlider
 * @default 120
 * @min -9999999
 *
 * @param volumeSlider.height
 * @text Slider height
 * @type number
 * @parent volumeSlider
 * @default 24
 *
 * @param volumeSlider.outlineColor
 * @text Outline color
 * @type struct<Color>
 * @parent volumeSlider
 * @default {"red":"0","green":"0","blue":"0","opacity":"1","systemColor":"-1"}
 *
 * @param volumeSlider.backgroundColor
 * @text Background color
 * @type struct<Color>
 * @parent volumeSlider
 * @default {"red":"0","green":"0","blue":"0","opacity":"1","systemColor":"19"}
 *
 * @param volumeSlider.fillColor1
 * @text Fill color 1
 * @type struct<Color>
 * @parent volumeSlider
 * @default {"red":"0","green":"0","blue":"0","opacity":"1","systemColor":"12"}
 *
 * @param volumeSlider.fillColor2
 * @text Fill color 2
 * @type struct<Color>
 * @parent volumeSlider
 * @default {"red":"0","green":"0","blue":"0","opacity":"1","systemColor":"4"}
 *
 * @param text
 * @text Text
 *
 * @param text.categoryGameplay
 * @text Category: Gameplay
 * @type string
 * @default Gameplay
 * @parent text
 *
 * @param text.categoryAudio
 * @text Category: Audio
 * @type string
 * @default Audio
 * @parent text
 *
 * @param text.optionOn
 * @text Option: ON
 * @type string
 * @default ON
 * @parent text
 *
 * @param text.optionOff
 * @text Option: OFF
 * @type string
 * @default OFF
 * @parent text
 *
 * @param text.audioMasterVolume
 * @text Audio: Master Volume
 * @type string
 * @default Master Volume
 * @parent text
 *
 * @param text.resetToDefault
 * @text General: Reset to Default
 * @type string
 * @default Reset to Default
 * @parent text
 *
 * @param text.back
 * @text General: Back
 * @type string
 * @default Back
 * @parent text
 *
 */
/*~struct~Color:
 * @param red
 * @text Red
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 *
 * @param green
 * @text Green
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 *
 * @param blue
 * @text Blue
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 *
 * @param opacity
 * @text Opacity
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 *
 * @param systemColor
 * @text System color
 * @desc If set to a positive integer, use the window system color instead.
 * @type number
 * @default -1
 * @min -1
 * @max 31
 */

(() => {
  window.CXJ_MZ = window.CXJ_MZ || {};
  const {
    CXJ_MZ
  } = window;
  CXJ_MZ.CategorizeOptions = CXJ_MZ.CategorizeOptions || {};
  CXJ_MZ.CategorizeOptions.version = '1.1.1';

  if (!CXJ_MZ.CoreEssentials) {
    throw new Error('CoreEssentials has not been initialized. Make sure you load CoreEssentials before this plugin.');
  }

  if (!CXJ_MZ.CoreEssentials.isVersion('CXJ_MZ.CoreEssentials', '1.3.1')) {
    throw new Error('The correct version of CoreEssentials has not been loaded (required version: 1.3.1).');
  }

  const {
    CoreEssentials,
    CategorizeOptions,
  } = CXJ_MZ;

  const pluginName = 'CXJ_MZ_CategorizeOptions';

  /* ------------------------------------------------------------------------
   * - Default parameters                                                   -
   * ------------------------------------------------------------------------
   */

  // The Color struct is defined here to make it easier to reuse during
  // parameter conversion.
  const colorStruct = {
    red: 'number',
    green: 'number',
    blue: 'number',
    opacity: 'number',
    systemColor: 'number',
  };

  const parameters = CoreEssentials.getParameters(pluginName, {
    emptyMenu: false,
    touchUI: null,
    hideTouchUI: false,
    windowWidth: 400,
    maxWindowHeight: 0,
    resetToDefaultSpacing: 16,
    booleanWrap: false,
    booleanDisplay: 'toggle',
    volumeDisplay: 'numeric',
    volumeStepSize: 20,
    'volumeSlider.width': 120,
    'volumeSlider.height': 120,
    'volumeSlider.outlineColor': {
      red: 0,
      green: 0,
      blue: 0,
      opacity: 1,
      systemColor: -1,
    },
    'volumeSlider.backgroundColor': {
      red: 0,
      green: 0,
      blue: 0,
      opacity: 1,
      systemColor: 19,
    },
    'volumeSlider.fillColor1': {
      red: 0,
      green: 0,
      blue: 0,
      opacity: 1,
      systemColor: 12,
    },
    'volumeSlider.fillColor2': {
      red: 0,
      green: 0,
      blue: 0,
      opacity: 1,
      systemColor: 4,
    },
    'text.categoryGameplay': 'Gameplay',
    'text.categoryAudio': 'Audio',
    'text.optionOn': 'ON',
    'text.optionOff': 'OFF',
    'text.audioMasterVolume': 'Master Volume',
    'text.resetToDefault': 'Reset to Default',
    'text.back': 'Back',
  }, {
    emptyMenu: 'boolean',
    touchUI: 'literal',
    hideTouchUI: 'boolean',
    windowWidth: 'number',
    maxWindowHeight: 'number',
    resetToDefaultSpacing: 'number',
    booleanWrap: 'boolean',
    booleanDisplay: 'text',
    volumeDisplay: 'text',
    volumeStepSize: 'number',
    'volumeSlider.width': 'number',
    'volumeSlider.height': 'number',
    'volumeSlider.outlineColor': ['object', colorStruct],
    'volumeSlider.backgroundColor1': ['object', colorStruct],
    'volumeSlider.backgroundColor2': ['object', colorStruct],
    'volumeSlider.fillColor1': ['object', colorStruct],
    'volumeSlider.fillColor2': ['object', colorStruct],
    'text.categoryGameplay': 'text',
    'text.categoryAudio': 'text',
    'text.optionOn': 'text',
    'text.optionOff': 'text',
    'text.audioMasterVolume': 'text',
    'text.resetToDefault': 'text',
    'text.back': 'Back',
  });

  /* ------------------------------------------------------------------------
   * - Private variables                                                    -
   * ------------------------------------------------------------------------
   */

  const categoryOptions = {};
  const typeCallbacks = {};
  const typeIgnore = {};

  // These will only be used if the LocalizationHelper plugin is loaded.
  const paramTextRemap = {
    optionOn: 'options.general.on',
    optionOff: 'options.general.off',
    resetToDefault: 'options.general.resetToDefault',
    categoryGameplay: 'options.category.gameplay',
    categoryAudio: 'options.category.audio',
    audioMasterVolume: 'options.audio.masterVolume',
    back: 'general.back',
  };

  let hasLocalizationHelper = null;

  /* --------------------------------------------------------------------------
   * - Private functions                                                      -
   * -                                                                        -
   * - These are helper functions that aren't meant to be used outside the    -
   * - plugin.                                                                -
   * --------------------------------------------------------------------------
   */

  /**
   * Retrieves a string from the TextManager.
   * @param {string} symbol - The symbol of the option.
   * @returns {string} The requested text string.
   */
  fromTextManager = (symbol) => TextManager[symbol];

  /**
   * Retrieves a localized string from the parameters.
   */
  getLocalizedText = (key) => {
    if (hasLocalizationHelper === null) {
      hasLocalizationHelper = CXJ_MZ.CoreEssentials.isVersion('CXJ_MZ.LocalizationHelper', '1.0');
    }
    if (hasLocalizationHelper) {
      return CXJ_MZ.LocalizationHelper.line(paramTextRemap[key] || key);
    }
    return '';
  };

  /**
   * Retrieves a string from the parameters.
   * @param {string} key => The string key.
   * @returns {string} The requested text string.
   */
  getText = (key) => getLocalizedText(key) || parameters[`text.${key}`] || '';

  /**
   * Converts the given color values to a valid color.
   * @param {object} color - A color object, as defined in the parameter struct.
   * @returns {string} A valid color string.
   */
  colorToRgba = (color) => (
    color.systemColor > -1
    ? ColorManager.textColor(color.systemColor)
    : `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.opacity})`
  );

  /* --------------------------------------------------------------------------
   * - Plugin methods                                                         -
   * --------------------------------------------------------------------------
   */

  /**
   *
   * @param {string|function} name - The label. Can be a function that returns
   * a string.
   * @param {string} symbol - The symbol name.
   * @param {object} options - Extra options.
   */
  CategorizeOptions.addOption = (name, symbol, options = {}) => {
    // Let's destructure the options parameter.
    const {
      enabled = true,
      ext = null,
      type = '',
      category = '',
      index = null,
      insertBefore = null,
      insertAfter = null,
      spacing = 0,
      visible = null,
      ...extraData
    } = options;

    // Now create the data variable.
    const data = {
      name,
      symbol,
      enabled,
      ext,
      type,
      spacing,
      visible,
      ...extraData,
    };

    // Ensure that the category array exists.
    categoryOptions[category] = categoryOptions[category] || [];

    let idx = index;

    if (insertBefore || insertAfter) {
      categoryOptions[category].every((item, oIdx) => {
        if (insertBefore && item.symbol === insertBefore) {
          idx = oIdx;
          return false;
        } else if (insertAfter && item.symbol === insertAfter) {
          idx = oIdx + 1;
          return false;
        }
        return true;
      });
    }

    // Now, depending on what the value of index is, insert the data
    // somewhere in the array.
    if (idx === null || Number.isNaN(+idx) || idx > categoryOptions[category].length) {
      categoryOptions[category].push(data);
    } else if (idx === 0) {
      categoryOptions[category].unshift(data);
    } else {
      categoryOptions[category].splice(idx, 0, data);
    }
  };

  /**
   * Add callbacks for certain option types.
   * @param {string} type - The option type to add a callback for.
   * @param {object} callbacks - The callbacks you want to store.
   */
  CategorizeOptions.addItemCallbacks = (type, callbacks) => {
    typeCallbacks[type] = {
      ...(typeCallbacks[type] || {}),
      ...callbacks,
    };
  }

  /**
   * Retrieves the stored callbacks.
   * @param {string} type - The option type to retrieve the callbacks for.
   * @param {*} callbackType - The type of callback to be retrieved. Leave
   * null to get every callback.
   * @returns {object|function} An object containing all callbacks, the
   * requested callback function if callbackType is not null, or null if
   * the type doesn't have a callback or the callback function does not
   * exist.
   */
  CategorizeOptions.getItemCallbacks = (type, callbackType = null) => {
    // If the option type does not exist at all, return null.
    if (!typeCallbacks[type]) {
      return null;
    }
    const callbacks = typeCallbacks[type];

    // If there's no callback type requested, return the entire object.
    if (!callbackType) {
      return callbacks;
    }

    // If an array is supplied, select all requested callback types.
    if (Array.isArray(callbackType)) {
      const retCallbacks = {};

      callbackType.forEach((cbType) => {
        if (callbacks[cbType]) {
          retCallbacks[cbType] = callbacks[cbType];
        }
      });

      return retCallbacks;
    }

    return callbacks[callbackType] || null;
  }

  CategorizeOptions.markTypeAsIgnore = (type, ignore = true) => {
    typeIgnore[type] = ignore;
  }

  // To make it easier to create the options, destructure the CategorizeOptions
  // object.
  const {
    addOption,
    addItemCallbacks,
    getItemCallbacks,
    markTypeAsIgnore,
  } = CategorizeOptions;

  if (!parameters.emptyMenu) {
    // Bind functions for common strings.
    const textResetToDefault = getText.bind(null, 'resetToDefault');
    const textBack = getText.bind(null, 'back');

    // Add root categories.
    addOption(getText.bind(null, 'categoryGameplay'), 'gameplay', { type: 'category' });
    addOption(getText.bind(null, 'categoryAudio'),    'audio',    { type: 'category' });
    addOption(textResetToDefault,                     'reset',    { type: 'reset' });
    addOption(textBack,                               'cancel',   { type: 'cancel' });

    // Add for category Gameplay.
    addOption(fromTextManager,    'alwaysDash',      { type: 'boolean', category: 'gameplay' });
    addOption(fromTextManager,    'commandRemember', { type: 'boolean', category: 'gameplay' });
    addOption(fromTextManager,    'touchUI',         { type: 'boolean', category: 'gameplay', visible: () => !parameters.hideTouchUI || ConfigManager.touchUI });
    addOption(textResetToDefault, 'reset',           { type: 'reset', category: 'gameplay' });
    addOption(textBack,           'cancel',          { type: 'cancel', category: 'gameplay' });

    // Add for category Audio.
    addOption(getText.bind(null, 'audioMasterVolume'), 'masterVolume', { type: 'volume', category: 'audio' });
    addOption(fromTextManager,                         'bgmVolume',    { type: 'volume', category: 'audio' });
    addOption(fromTextManager,                         'bgsVolume',    { type: 'volume', category: 'audio' });
    addOption(fromTextManager,                         'meVolume',     { type: 'volume', category: 'audio' });
    addOption(fromTextManager,                         'seVolume',     { type: 'volume', category: 'audio' });
    addOption(textResetToDefault,                      'reset',        { type: 'reset', category: 'audio' });
    addOption(textBack,                                'cancel',       { type: 'cancel', category: 'audio' });
  }

  /**
   * A simple renderer. Mainly for options that have no value attached.
   * @param {number} index - The option index.
   */
  addItemCallbacks.renderSimple = function(index) {
    // We want to simplify rendering this item.
    const rect = this.itemLineRect(index);
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, 'left', index);
  };

  // Option type: Category
  addItemCallbacks('category', {
    render: addItemCallbacks.renderSimple,
    ok: function(index) {
      const itemData = this.itemData(index);
      const symbol = this.commandSymbol(index);
      this.setCategory(symbol);
      if (itemData.afterOk) {
        itemData.afterOk.call(this, index);
      }
      this.playOkSound();
    },
    // We want to disable the changing action, since it's not relevant.
    change: () => {},
  });

  addItemCallbacks('boolean', {
    render: function(index) {
      const title = this.commandName(index);
      const rect = this.itemLineRect(index);
      const display = parameters.booleanDisplay;
      let statusWidth = this.statusWidth();
      const optionOn = getText('optionOn');
      const optionOff = getText('optionOff');
      /*
      If the display type is side-by-side, calculate the width based on
      the string length of both options. We'll add four times the item
      padding, twice for each item, since we want to pad on both sides.
      */
      if (display === 'sbs') {
        statusWidth = 4 * this.itemPadding()
          + this.contents.measureTextWidth(optionOn)
          + this.contents.measureTextWidth(optionOff);
      }
      const titleWidth = rect.width - statusWidth;
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));
      this.drawText(title, rect.x, rect.y, titleWidth, "left", index);
      // Let's draw the strings side by side.
      if (display === 'sbs') {
        // First, get the value. This value gets used to determine which option gets grayed out.
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);

        // Next get the individual width of both strings.
        const offWidth = this.contents.measureTextWidth(optionOff);
        const onWidth = this.contents.measureTextWidth(optionOn);

        // First, draw the Off option.
        this.changePaintOpacity(!value);
        this.drawText(optionOff, rect.x + titleWidth + this.itemPadding() * 2, rect.y, offWidth, "right", index);

        // Next, draw the On option.
        this.changePaintOpacity(value);
        this.drawText(optionOn, rect.x + titleWidth + this.itemPadding() * 4 + offWidth, rect.y, onWidth, "right", index);
      } else {
        // The original method of drawing.
        const status = this.statusText(index);
        this.drawText(status, rect.x + titleWidth, rect.y, statusWidth, "right", index);
      }
    },
    change: function(index, forward) {
      const symbol = this.commandSymbol(index);
      let value = forward;
      // If boolean wrap is enabled, the direction keys act as if you're
      // selecting the option (it doesn't matter which side you press).
      if (parameters.booleanWrap) {
        value = !this.getConfigValue(symbol);
      }
      this.changeValue(symbol, value);
    }
  });

  addItemCallbacks('volume', {
    render: function(index) {
      const title = this.commandName(index);
      const rect = this.itemLineRect(index);
      const symbol = this.commandSymbol(index);
      const value = this.getConfigValue(symbol);
      const display = parameters.volumeDisplay;
      let sliderWidth = parameters['volumeSlider.width'];
      if (sliderWidth <= 0) {
        sliderWidth = rect + sliderWidth;
      }
      const sliderHeight = parameters['volumeSlider.height'];
      let statusWidth = this.statusWidth();
      if (display === 'slider') {
        statusWidth = 2 * this.itemPadding() + sliderWidth;
      } else if (display === 'sliderBelow' || display === 'sliderBG') {
        statusWidth = 0;
      }
      const titleWidth = rect.width - statusWidth;
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));
      this.drawText(title, rect.x, rect.y, titleWidth, "left", display === 'sliderBelow' ? null : index);
      if (display !== 'sliderBG') {
        if (display.startsWith('slider')) {
          // Get the colors.
          const sliderOutline = colorToRgba(parameters['volumeSlider.outlineColor']);
          const sliderBg = colorToRgba(parameters['volumeSlider.backgroundColor']);
          const sliderFill1 = colorToRgba(parameters['volumeSlider.fillColor1']);
          const sliderFill2 = colorToRgba(parameters['volumeSlider.fillColor2']);

          // Now calculate how full the bar should be.
          const volumeFill = Math.round((value / 100) * sliderWidth);

          // Now calculate the exact coordinates where the top left of the bar should be.
          let sliderX = rect.x + titleWidth + 2 * this.itemPadding();
          let sliderY = rect.y + (rect.height - sliderHeight) / 2;

          if (display === 'sliderBelow') {
            sliderX = rect.x + rect.width - sliderWidth;
            sliderY = rect.y + this.itemHeight();
          }

          // If the value is higher than 0, draw the filled bar.
          if (value > 0) {
            this.contents.gradientFillRect(sliderX, sliderY, volumeFill, sliderHeight, sliderFill1, sliderFill2);
          }

          // If the value is lower than 100, draw the remainder.
          if (value < 100) {
            this.contents.fillRect(sliderX + volumeFill, sliderY, sliderWidth - volumeFill, sliderHeight, sliderBg);
          }

          // Finally, draw the outline.
          this.contents.strokeRect(sliderX, sliderY, sliderWidth, sliderHeight, sliderOutline);
        } else {
          const status = this.statusText(index);
          this.drawText(status, rect.x + titleWidth, rect.y, statusWidth, "right", index);
        }
      }
    },
    renderBackground(index) {
      if (parameters.volumeDisplay !== 'sliderBG') {
        this.drawItemBackground(index, false);
      } else {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        const rect = this.itemRect(index);
        const volumeFill = Math.round((value / 100) * rect.width);
        const c1 = ColorManager.itemBackColor1();
        const c2 = ColorManager.itemBackColor2();
        const sliderFill1 = colorToRgba(parameters['volumeSlider.fillColor1']);
        const sliderFill2 = colorToRgba(parameters['volumeSlider.fillColor2']);
        const {
          x,
          y,
          width: w,
          height: h,
        } = rect;
        if (value > 0) {
          this.contentsBack.gradientFillRect(x, y, volumeFill, h, sliderFill1, sliderFill2, true);
        }
        if (value < 100) {
          this.contentsBack.gradientFillRect(x + volumeFill, y, w - volumeFill, h, c1, c2, true);
        }
        this.contentsBack.strokeRect(x, y, w, h, c1);
      }
    },
    getSize() {
      if (parameters.volumeDisplay === 'sliderBelow') {
        const textHeight = this.itemHeight();
        const sliderHeight = parameters['volumeSlider.height'];
        return textHeight + sliderHeight + 8;
      }
      return this.lineHeight();
    },
  });

  addItemCallbacks('reset', {
    render: addItemCallbacks.renderSimple,
    ok: function() {
      const { defaults } = ConfigManager;
      const categoryData = this.getCategoryData();

      while (categoryData.length) {
        const data = categoryData.shift();

        const {
          type,
          symbol,
          ignore = false,
        } = data;

        if (type === 'category') {
          categoryData.push(...this.getCategoryData(symbol));
        } else if (!ignore || typeIgnore[type]) {
          const defaultValue = CoreEssentials.findObject(symbol, defaults);
          this.setConfigValue(symbol, defaultValue);
        }
      }
      this.refreshCategory();
      this.playOkSound();
    },
    // We want to disable the changing action, since it's not relevant.
    change: () => {},
    getSpacing: () => parameters.resetToDefaultSpacing,
  });

  markTypeAsIgnore('reset');

  // Option type: Cancel
  addItemCallbacks('cancel', {
    render: addItemCallbacks.renderSimple,
    ok: function() {
      this.processCancel();
    },
    // We want to disable the changing action, since it's not relevant.
    change: () => {},
  });

  markTypeAsIgnore('cancel');

  (() => {
    // Let's first redefine ConfigManager.touchUI (if set in parameters).
    if (parameters.touchUI !== null) {
      ConfigManager.touchUI = parameters.touchUI;
    }

    //-----------------------------------------------------------------------------
    // Window_OptionsExt
    //
    // The window for changing various settings on the options screen.

    class Window_OptionsExt extends Window_Options {
      /**
       * Gets run when the window gets initialized.
       * @param {string} category - The category.
       * @param {string} parent - The parent category.
       */
      initialize(category = '', parent = null) {
        this._category = category;
        this._listData = this.getVisibleCategoryData();
        this._parent = parent ? [ (Array.isArray(parent) ? parent : [ parent, 0]) ] : [];
        const rect = this.getWindowRect();
        super.initialize(rect);
      }

      /**
       * Gets the window rectangle based on the current category.
       */
      getWindowRect() {
        let windowHeight = $gameSystem.windowPadding() * 2;
        this._listData.forEach((_option, index) => {
          windowHeight+= this.itemHeight(index) + this.itemSpacing(index);
        });
        let maxWindowHeight = (parameters.maxWindowHeight || 0);
        if (maxWindowHeight <= 0) {
          maxWindowHeight = Graphics.boxHeight + maxWindowHeight;
        }
        windowHeight = Math.min(maxWindowHeight, windowHeight);

        const windowWidth = parameters.windowWidth > 0 ? parameters.windowWidth : Graphics.boxWidth + parameters.windowWidth;
        const windowX = (Graphics.boxWidth - windowWidth) / 2;
        const windowY = (Graphics.boxHeight - windowHeight) / 2;
        return new Rectangle(windowX, windowY, windowWidth, windowHeight);
      }

      /**
       * Adds items from the selected category.
       * @param {string} category - The category to add items from.
       */
      addCategory(category = null) {
        // Get every option of the current category.
        const categoryData = this.getVisibleCategoryData(category);

        // Iterate through each option.
        categoryData.forEach((data) => {
          // Destructure the option data.
          const {
            name,
            symbol,
            enabled,
            ext,
          } = data;

          // If name is a function, run the function, otherwise, use name as label.
          const label = typeof name === 'function' ? name(symbol) : name;

          this.addCommand(label, symbol, enabled, ext, null);
        });
      }

      /**
       * Checks whether the current category window has a parent.
       */
      hasParentCategory() {
        return !!this._parent.length;
      }

      /**
       * Gets the current category.
       */
      getCategory() {
        return this._category;
      }

      /**
       * Gets the data of the current category.
       * @param {string} category - The category you want to retrieve the data for.
       * @param {boolean} getRaw - Whether or not you want to get the raw data.
       */
      getCategoryData(category = null, getRaw = false) {
        // If no category has been set, use the current category.
        const currentCategory = category !== null ? category : this._category;

        // Get every option of the current category.
        const categoryData = categoryOptions[currentCategory];

        if (getRaw) {
          return categoryData;
        }
        return CoreEssentials.copyArray(categoryData);
      }

      /**
       * Gets the visible data of the current category.
       * @param {string} category - The category you want to retrieve the data for.
       */
      getVisibleCategoryData(category = null) {
        return this.getCategoryData(category).filter((data) => {
          if (data.visible === null) {
            return true;
          }
          if (typeof data.visible === 'function') {
            return data.visible();
          }
          return !!data.visible;
        });
      }

      /**
       * Sets the window to go up one category.
       */
      popCategory() {
        const parent = this._parent.pop();
        this._category = parent[0];
        this.refreshCategory();
        this.forceSelect(parent[1]);
      }

      /**
       * Switches to a different category.
       * @param {string} category - The category you want to switch to.
       */
      setCategory(category) {
        this._parent.push([this._category, this.index()]);
        this._category = category;
        this.refreshCategory();
        this.forceSelect(0);
      }

      /**
       * Refreshes the category data.
       */
      refreshCategory() {
        this._listData = this.getVisibleCategoryData();
        const rect = this.getWindowRect();
        this.move(rect.x, rect.y, rect.width, rect.height);
        this.createContents();
        this.refresh();
      }

      /**
       * Gets the overall height of the current category.
       */
      overallHeight() {
        // First store the maximum amount of columns.
        const maxCols = this.maxCols();

        // Next, create an array representing the columns.
        const cols = [];

        // Now, for each item height we'll add it to the corresponding column.
        for (let idx = 0; idx < this._listData.length; idx++) {
          cols[idx % maxCols] = (cols[idx % maxCols] || 0) + this.itemHeight(idx) + this.itemSpacing(idx);
        }

        // Finally, return the largest number in the array.
        return Math.max(...cols);
      }

      /**
       * Creates the command list.
       */
      makeCommandList() {
        this.addCategory();
      }

      /**
       * @deprecated 1.0 - All is handled through makeCommandList.
       */
      addGeneralOptions() {
        this.addCategory('gameplay');
      }

      /**
       * @deprecated 1.0 - All is handled through makeCommandList.
       */
      addVolumeOptions() {
        this.addCategory('audio');
      };

      /**
       * Checks the command type.
       * @param {number} index - The index.
       * @return The command type.
       */
      commandType(index) {
        return this._listData[index].type;
      }

      /**
       * Retrieves the callbacks of the requested option.
       * @param {number} index - The index.
       * @param {*} callbackType - The callback type.
       */
      commandCallbacks(index, callbackType = null) {
        const type = this.commandType(index);
        return getItemCallbacks(type, callbackType);
      }

      /**
       * Gets the rectangle of the current item.
       * @param {number} index - The index.
       */
      itemRect(index) {
        // Retrieve the getRect callback.
        const getRect = this.commandCallbacks(index, 'getRect');

        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight(index);
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols;
        const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();

        // We'll iterate through every item before the currently requested one,
        // to calculate the y-coordinate.

        // First, set the initial y-coordinate. This would be the y-coordinate
        // if this item was the first item.
        let y = rowSpacing / 2 - this.scrollBaseY() + this.itemSpacing(index);

        // Now, for each item prior to this one, let's calculate the height and
        // add it to the y-coordinate.
        for (let idx = 0; idx < index; idx++) {
          // If there is more than one column, we'll have to ignore those items
          // that aren't in the same column as the current one.
          if (idx % maxCols === col) {
            y+= this.itemHeight(idx) + this.itemSpacing(idx);
          }
        }
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;

        const rect = new Rectangle(x, y, width, height);

        // If getRect has been defined, run the callback, otherwise, just return
        // the Rectangle object.
        if (getRect) {
          return getRect.call(this, index, rect);
        }
        return rect;
      }

      itemLineRect(index) {
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight(index)) / 2;
        rect.y += padding;
        rect.height -= padding * 2;
        return rect;
      }

      /**
       * Retrieves the line height.
       * @param {number} index - The option index.
       */
      lineHeight(index = null) {
        // If an index is set, try to retrieve the current option's size.
        if (index !== null) {
          const getSize = this.commandCallbacks(index, 'getSize');

          if (getSize) {
            return getSize.call(this, index);
          }
        }
        return super.lineHeight();
      }

      itemHeight(index = null) {
        if (index === null) {
          return super.itemHeight();
        }
        return this.lineHeight(index) + 8;
      }

      itemSpacing(index) {
        if (this._listData[index] && this._listData[index].spacing) {
          return this._listData[index].spacing;
        }
        const getSpacing = this.commandCallbacks(index, 'getSpacing');

        if (getSpacing) {
          return getSpacing.call(this, index);
        }

        return 0;
      }

      itemData(index) {
        /*
        We'll destructure the data, this way we can exclude parameters
        that don't need to be returned. They're also being aliased to
        avoid some possible issues with eslint.
        */
        const {
          name: _name,
          symbol: _symbol,
          enabled: _enabled,
          ext: _ext,
          ...data
        } = this._listData[index];
        return data;
      }

      ensureCursorVisible = function(smooth, index = null) {
        const idx = index || this._index;
        if (this._cursorAll) {
          this.scrollTo(0, 0);
        } else if (this.innerHeight > 0 && this.row() >= 0) {
          const scrollY = this.scrollY();
          const rect = this.itemRect(idx);
          const itemTop = rect.y;
          const itemBottom = itemTop + this.itemHeight(idx);
          const scrollMin = itemBottom - this.innerHeight;
          if (scrollY > itemTop) {
              if (smooth) {
                this.smoothScrollTo(0, itemTop);
              } else {
                this.scrollTo(0, itemTop);
              }
          } else if (scrollY < scrollMin) {
            if (smooth) {
              this.smoothScrollTo(0, scrollMin);
            } else {
              this.scrollTo(0, scrollMin);
            }
          }
        }
      };
    
      drawItem(index) {
        const renderCallback = this.commandCallbacks(index, 'render');

        if (renderCallback) {
          renderCallback.call(this, index);
        } else {
          super.drawItem(index);
        }
      }

      drawItemBackground(index, runCallback = true) {
        const renderBG = this.commandCallbacks(index, 'renderBackground');

        if (renderBG && runCallback) {
          renderBG.call(this, index);
        } else {
          super.drawItemBackground(index);
        }
      }

      drawText(text, x, y, maxWidth, align, index = null, lineHeight = null) {
        this.contents.drawText(text, x, y, maxWidth, lineHeight === null ? this.lineHeight(index) : lineHeight, align);
      }

      processOk() {
        const index = this.index();

        const okCallback = this.commandCallbacks(index, 'ok');

        if (okCallback) {
          okCallback.call(this, index);
        } else {
          super.processOk();
        }
      }

      cursorRight() {
        if (!this.cursorItemChange(true)) {
          super.cursorRight();
        }
      }

      cursorLeft() {
        if (!this.cursorItemChange(false)) {
          super.cursorLeft();
        }
      }

      cursorItemChange(forward) {
        const index = this.index();

        const changeCallback = this.commandCallbacks(index, 'change');

        if (changeCallback) {
          changeCallback.call(this, index, forward);
          return true;
        }
        return false;
      }

      /**
       * Retrieves the proper text string for boolean values.
       * @param {boolean} value - Whether the option is on or off.
       */
      booleanStatusText(value) {
        return getText(value ? 'optionOn' : 'optionOff');
      }

      /**
       * Defines the step size for volume.
       * @returns The step size for volume configuration.
       */
      volumeOffset() {
        return parameters.volumeStepSize || 20;
      }

      /**
       * Retrieves a config value.
       * @param {string} symbol - The name of the config setting.
       */
      getConfigValue(symbol) {
        return CoreEssentials.findObject(symbol, ConfigManager);
      }

      /**
       * Sets a config value.
       * @param {string} symbol - The name of the config setting.
       * @param {*} value - The value that needs to be stored.
       */
      setConfigValue(symbol, value) {
        // We'll set ConfigManager as the root object. This so that we can also
        // target nested objects later if needed.
        let rootObject = ConfigManager;

        // We'll also set the property name to the symbol.
        let prop = symbol;

        // If symbol contains a dot, we can assume it's a nested object that
        // needs to be targeted.
        if (symbol.includes('.')) {
          // Split the symbol to an array, then pop the last element. This last
          // element will be the new prop.
          const symbolSegs = symbol.split('.');
          prop = symbolSegs.pop();

          // Using the remaining segments, find the proper object. This will be the
          // rootObject.
          rootObject = CoreEssentials.findObject(symbolSegs.join('.'), ConfigManager);
        }

        // Finally, set the value to the object's property.
        rootObject[prop] = value;
      };
    }

    CategorizeOptions.Window_OptionsExt = Window_OptionsExt;

    //-----------------------------------------------------------------------------
    // Scene_OptionsExt
    //
    // The scene class of the options screen.

    class Scene_OptionsExt extends Scene_Options {
      createOptionsWindow() {
        // Window_OptionsExt is being used instead of the regular Window_Options.
        this._optionsWindow = new Window_OptionsExt();
        this._optionsWindow.setHandler("cancel", this.onCancel.bind(this));
        this.addWindow(this._optionsWindow);
      }

      onCancel() {
        // This fix makes sure that the options window only closes if it's on
        // the root category. Otherwise, go one category up.
        if (this._optionsWindow.hasParentCategory()) {
          this._optionsWindow.popCategory();
          this._optionsWindow.activate();
        } else {
          this.popScene();
        }
      }
    }

    CategorizeOptions.Scene_OptionsExt = Scene_OptionsExt;

    /* --------------------------------------------------------------------
     * - Scene_Boot.prototype.initialize (Override)                       -
     * --------------------------------------------------------------------
     */

    CoreEssentials.registerFunctionExtension('Scene_Boot.prototype.initialize', function() {
      ConfigManager.defaults = ConfigManager.makeData();
    });

    /* --------------------------------------------------------------------
     * - Scene_Title.prototype.commandOptions (Override)                  -
     * --------------------------------------------------------------------
     */

    Scene_Title.prototype.commandOptions = function() {
      this._commandWindow.close();
      SceneManager.push(Scene_OptionsExt);
    };

    /* --------------------------------------------------------------------
     * - Scene_Menu.prototype.commandOptions (Override)                   -
     * --------------------------------------------------------------------
     */

    Scene_Menu.prototype.commandOptions = function() {
      SceneManager.push(Scene_OptionsExt);
    };

    // This manages the general volume.
    AudioManager._masterVolume = 100;

    /* --------------------------------------------------------------------
     * - AudioManager.masterVolume (New)                                  -
     * --------------------------------------------------------------------
     */
    Object.defineProperty(AudioManager, "masterVolume", {
      get: function() {
          return this._masterVolume;
      },
      set: function(value) {
          this._masterVolume = value;
          this.updateBgmParameters(this._currentBgm);
          this.updateBgsParameters(this._currentBgs);
          this.updateMeParameters(this._currentMe);
      },
      configurable: true
    });

    /* --------------------------------------------------------------------
     * - AudioManager.updateBufferParameters (Override)                   -
     * --------------------------------------------------------------------
     */

    CoreEssentials.registerFunctionExtension('AudioManager.updateBufferParameters', function(buffer, _configVolume, audio) {
      if (buffer && audio) {
        buffer.volume*= (this._masterVolume / 100);
      }
    });

    /* --------------------------------------------------------------------
     * - ConfigManager.masterVolume (New)                                 -
     * --------------------------------------------------------------------
     */
    CoreEssentials.addConfig('masterVolume', 'volume', {
      get: function() {
          return AudioManager.masterVolume;
      },
      set: function(value) {
        AudioManager.masterVolume = value;
      },
    });
  })();
})();
