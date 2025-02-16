export var powerProfileIndicatorExtensionInstance;
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Log from './modules/log.js';
import * as Panel from './modules/panel.js';
import * as Resources from './modules/resources.js';
export default class PowerProfileIndicatorExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this.PowerProfileIndicatorInstance = null;
        this.systemMenu = null;
        Resources.File.extensionPath = this.path;
        powerProfileIndicatorExtensionInstance = this;
    }
    enable() {
        this.systemMenu = Main.panel.statusArea.quickSettings;
        if (!this.systemMenu) {
            Log.raw("init", "system menu is not defined");
            return false;
        }
        if (this.systemMenu._powerProfiles) {
            this.PowerProfileIndicatorInstance = new Panel.powerProfileIndicator();
        }
    }
    disable() {
        if (this.PowerProfileIndicatorInstance) {
            this.PowerProfileIndicatorInstance.stop();
            if (this.PowerProfileIndicatorInstance._indicator)
                this.PowerProfileIndicatorInstance._indicator.destroy();
            this.PowerProfileIndicatorInstance._indicator = null;
            this.PowerProfileIndicatorInstance.destroy();
            this.PowerProfileIndicatorInstance = null;
        }
    }
    populate() {
        if (this.PowerProfileIndicatorInstance !== null) {
            if (this.systemMenu._system)
                this.systemMenu._indicators.remove_child(this.systemMenu._system);
            this.systemMenu._indicators.add_child(this.PowerProfileIndicatorInstance);
            if (this.systemMenu._system)
                this.systemMenu._indicators.add_child(this.systemMenu._system);
        }
    }
}
//# sourceMappingURL=extension.js.map