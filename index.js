import Theme from '@structures/theme';

import Settings from './components/Settings';
import style from './style.css';

export default class ThemeSettings extends Theme {
   start() {
      /*
       * Do virtually anything you want in this function, but make sure to call super.start
       * with your style for the style to apply to the DOM.
       *
       * For this example, we will only replacing a certain string, which will be the string
       * belonging to the background url variable in :root inside our style.css file
       *
       * Remember, you have the power of JavaScript, you can create virtually anything here
       * You can patch components such as the status to change their colors, etc.
       * Switches to change their inner color, and other things you can think of.
       *
       * You can also fetch classes from webpack and generate a theme on the go.
       * The posibilities are endless, the rest is on you.
       */

      this.result = style;

      this.applyPreset();
      this.applyBackground();

      super.start(this.result);
   }

   applyBackground() {
      const enabled = this.settings.get('background', true);

      if (!enabled) {
         return this.result = this.result.replace('REPLACE_BG_URL', 'none');
      };

      const bg = this.settings.get('bg-url', 'https://media.wtf/12931870');
      this.result = this.result.replace('REPLACE_BG_URL', `url(${bg})`);
   }

   applyPreset() {
      const preset = this.settings.get('preset', 'Red Text');

      /*
       * For this example, presets are dynamically fetched from the presets folder.
       * The content is then appended to the result. If your presets aren't :root
       * variables, you may replace the whole result with the preset content.
       * This way, only the CSS in the selected preset will load.
       */
      try {
         const contents = require(`./presets/${preset}`);
         this.result += contents;
      } catch (e) {
         this.logger.error('Failed to find preset, not using any.', e);
      }
   }

   getSettingsPanel() {
      return Settings;
   }
}