import GLib from 'gi://GLib';
import * as Log from './log.js';
export class File {
    static DBus(name) {
        let file = `${File.extensionPath}/resources/dbus/${name}.xml`;
        try {
            let [_ok, bytes] = GLib.file_get_contents(file);
            if (!_ok)
                Log.raw(`Couldn't read contents of "${file}"`);
            return _ok ? imports.byteArray.toString(bytes) : null;
        }
        catch (e) {
            Log.raw(`Failed to load "${file}"`, e);
        }
    }
}
//# sourceMappingURL=resources.js.map