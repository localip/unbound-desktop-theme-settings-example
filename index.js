import Theme from '@structures/theme';

import Settings from './components/Settings';
import Style from './style.css';

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

      const background = this.settings.get('bgUrl', 'https://media.wtf/12931870');
      const style = Style.replace('REPLACE_BG_URL', background);

      super.start(style);
   }

   getSettingsPanel() {
      return Settings;
   }
}