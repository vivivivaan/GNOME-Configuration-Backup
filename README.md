# Ubuntu (25.04) Gnome, Tweaks-tool and system-wide configurations backup

* Extensions are stored in ```~/.local/share/gnome-shell/extensions```.

# Restore
- Install **Extension Manager** with `flatpak install flathub com.mattjakeman.ExtensionManager`.
- Install the extensions listed in `gnome_extensions_list.txt`.
- Run `dconf load /org/gnome/shell/extensions/ < gnome-shell-extensions-backup.dconf` to set the extensions configurations. 
- Restart the session/system to see the effects.
- (optional) Restore all Gnome-wide settings, including **Gnome-tweaks** configurations using `dconf load -f / < complete_gnome_saved_settings.dconf`.
- Additionally, you can backup and restore all the GNOME settings and other configurations using `flatpak install flathub io.github.vikdevelop.SaveDesktop` flatpak app.

# Backup
- To backup only gnome-shell extentions, run `dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf` and for all system-wide configurations, run `dconf dump / > complete_gnome_saved_settings.dconf`.

