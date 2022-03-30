import { TextInput, Switch, Select } from '@components/settings';
import { React } from '@webpack/common';
import path from 'path';
import fs from 'fs';

export default class extends React.Component {
   render() {
      const settings = this.props.settings;

      return (<>
         <Switch
            title='Background'
            onChange={v => settings.set('background', v)}
            description='Whether to use a background for the theme.'
            checked={settings.get('background', true)}
         />
         {settings.get('background', true) && <TextInput
            title='Background Image URL'
            onChange={v => settings.set('bg-url', v)}
            description='The background to use accross the app.'
            value={settings.get('bg-url', 'https://media.wtf/12931870')}
         />}
         <Select
            title='Preset'
            options={this.getPresets()}
            onChange={v => settings.set('preset', v.value)}
            value={settings.get('preset', 'Red Text')}
            description='Pick your preferred preset out of a provided list.'
         />
      </>);
   }

   /*
    * Dynamically provide options for presets by fetching
    * the contents of the presets folder.
    */

   getPresets() {
      const presets = fs.readdirSync(path.resolve(__dirname, 'presets'));
      const items = [];

      for (let i = 0; i < presets.length; i++) {
         const segments = presets[i].split('.');
         if (segments.length != 1) segments.splice(segments.length - 1, 1);

         const res = segments.join('.');
         items.push({ value: res, label: res });
      }

      return items;
   }
};