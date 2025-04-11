//    Power Profile Indicator
//    GNOME Shell extension
//    @fthx 2025


import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import GObject from 'gi://GObject';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {SystemIndicator} from 'resource:///org/gnome/shell/ui/quickSettings.js';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';


const PowerProfileIndicator = GObject.registerClass(
class PowerProfileIndicator extends SystemIndicator {
    _init(settings) {
        super._init();

        this._settings = settings;
        this._settings.connectObject('changed', this._setIcon.bind(this), this);

        this._indicator = this._addIndicator();

        this._timeout = GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            this._powerProfileToggle = Main.panel.statusArea.quickSettings?._powerProfiles?.quickSettingsItems[0];
            this._setIcon();

            this._powerProfileToggle?.connectObject('notify::icon-name', this._setIcon.bind(this), this);
            this.connectObject('scroll-event', (actor, event) => this._onScrollEvent(event), this);
            this.connectObject('destroy', this._destroy.bind(this), this);

            this._timeout = null;
            return GLib.SOURCE_REMOVE;
        });
    }

    _setIcon() {
        this._indicator.icon_name = this._powerProfileToggle?.icon_name;

        if (this._activeProfile)
            this._indicator.remove_style_class_name(this._activeProfile);
        this._activeProfile = this._powerProfileToggle?._proxy?.ActiveProfile;
        if (this._settings.get_boolean('colored-icon') && this._activeProfile)
            this._indicator.add_style_class_name(this._activeProfile);
    }

    _setPowerMode(profile) {
        if (this._powerProfileToggle?._proxy)
            this._powerProfileToggle._proxy.ActiveProfile = profile;
    }

    _onScrollEvent(event) {
        let availableProfiles = this._powerProfileToggle?._proxy?.Profiles.map(p => p.Profile.unpack()).reverse();
        let activeProfileIndex = availableProfiles.indexOf(this._activeProfile);
        let newProfile = this._activeProfile;

        switch (event.get_scroll_direction()) {
            case Clutter.ScrollDirection.UP:
                newProfile = availableProfiles[Math.max(activeProfileIndex - 1, 0)];
                this._setPowerMode(newProfile);
                break;
            case Clutter.ScrollDirection.DOWN:
                newProfile = availableProfiles[Math.min(activeProfileIndex + 1, availableProfiles.length - 1)];
                this._setPowerMode(newProfile);
                break;
        }

        return Clutter.EVENT_STOP;
    }

    _destroy() {
        this._settings.disconnectObject(this);
        this._settings = null;

        if (this._timeout) {
            GLib.Source.remove(this._timeout);
            this._timeout = null;
        }

        this._powerProfileToggle?.disconnectObject(this);
        this._powerProfileToggle = null;

        this._indicator.destroy();
        this._indicator = null;

        super.destroy();
    }
});

export default class PowerProfileIndicatorExtension extends Extension {
    constructor(metadata) {
        super(metadata);
    }

    enable() {
        this._indicator = new PowerProfileIndicator(this.getSettings());
        Main.panel.statusArea.quickSettings.addExternalIndicator(this._indicator);
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
    }
}
