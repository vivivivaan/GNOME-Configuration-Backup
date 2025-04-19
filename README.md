# Ubuntu (25.10) Gnome, Tweaks-tool and system-wide configurations backup

* Extensions are stored in ```~/.local/share/gnome-shell/extensions```.

# Restore
- Install **Extension Manager** with `flatpak install flathub com.mattjakeman.ExtensionManager`.
- Install the extensions listed in `gnome_extensions_list.txt`.
- Run `dconf load /org/gnome/shell/extensions/ < gnome-shell-extensions-backup.dconf` to set the extensions configurations. 
- Restart the session/system to see the effects.
- (optional) Restore all Gnome-wide settings, including **Gnome-tweaks** configurations using `dconf load -f / < complete_gnome_saved_settings.dconf`.

# Backup
- To backup only gnome-shell extentions, run `dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf` and for all system-wide configurations, run `dconf dump / > complete_gnome_saved_settings.dconf`.

# WSL2
- [Gist](https://gist.github.com/vivivivaan/22ea8ff06d2b3325cb34cb799a281e17)
