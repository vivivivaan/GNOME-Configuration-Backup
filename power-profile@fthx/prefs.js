import Gio from 'gi://Gio';
import Adw from 'gi://Adw';

import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';


export default class PowerProfilePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window._settings = this.getSettings();

        const page = new Adw.PreferencesPage({
            title: 'Power Profile Indicator extension',
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);


        const group = new Adw.PreferencesGroup();
        page.add(group);

        const coloredIcon = new Adw.SwitchRow({
            title: 'Colored icon',
        });
        group.add(coloredIcon);
        window._settings.bind('colored-icon', coloredIcon, 'active', Gio.SettingsBindFlags.DEFAULT);
    }
}
