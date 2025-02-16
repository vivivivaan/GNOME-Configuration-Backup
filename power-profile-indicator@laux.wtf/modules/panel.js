import Gio from 'gi://Gio';
import GObject from 'gi://GObject';
import * as quickSettings from 'resource:///org/gnome/shell/ui/quickSettings.js';
import * as Log from './log.js';
import * as Resources from './resources.js';
import * as Extension from '../extension.js';
const PROFILE_ICONS = {
    "performance": "power-profile-performance-symbolic",
    "balanced": "power-profile-balanced-symbolic",
    "power-saver": "power-profile-power-saver-symbolic"
};
export const powerProfileIndicator = GObject.registerClass(class powerProfileIndicator extends quickSettings.SystemIndicator {
    constructor() {
        super(...arguments);
        this.powerProfilesProxy = null;
        this.powerProfilesSignalProxy = null;
        this.connected = false;
        this._state = "balanced";
        this.profiles = [];
    }
    _init() {
        super._init();
        this.createProxy();
    }
    async createProxy() {
        this._indicator = this._addIndicator();
        this._indicator.icon_name = "power-profile-balanced-symbolic";
        this._indicator.visible = true;
        let xmlProfiles = Resources.File.DBus("power-profiles-daemon-0.20-org.freedesktop.UPower.PowerProfiles");
        this.powerProfilesProxy = await new Gio.DBusProxy.makeProxyWrapper(xmlProfiles)(Gio.DBus.system, "org.freedesktop.UPower.PowerProfiles", "/org/freedesktop/UPower/PowerProfiles", (proxy, e) => {
            try {
                this.connected = true;
                if (this.updateProfile())
                    Extension.powerProfileIndicatorExtensionInstance.populate();
            }
            catch (error) {
                Log.raw('could not get ActiveProfile', error);
            }
        });
        let xmlSignals = Resources.File.DBus("power-profiles-daemon-0.20-org.freedesktop.DBus.Properties");
        this.powerProfilesSignalProxy = await new Gio.DBusProxy.makeProxyWrapper(xmlSignals)(Gio.DBus.system, "org.freedesktop.UPower.PowerProfiles", "/org/freedesktop/UPower/PowerProfiles", (proxy, e) => {
            try {
                proxy.connectSignal("PropertiesChanged", (name = "", variant, profile) => {
                    this.updateProfile();
                });
            }
            catch (error) {
                Log.raw('error creating signal', error);
            }
        });
    }
    updateProfile() {
        if (this.connected)
            try {
                this._state = this.powerProfilesProxy.ActiveProfile;
                if (typeof this._state !== 'string')
                    return false;
                this._indicator.icon_name = PROFILE_ICONS[this._state];
                return true;
            }
            catch (error) {
                Log.raw("updateProfile", error);
            }
        return false;
    }
    stop() {
        this.connected = false;
        this.powerProfilesProxy = null;
        this.powerProfilesSignalProxy = null;
    }
});
//# sourceMappingURL=panel.js.map