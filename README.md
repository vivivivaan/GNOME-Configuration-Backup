# Ubuntu (24.04-LTS/24.10) Gnome, Tweaks-tool and system-wide configurations backup

# Info
* Extensions are stored in ```~/.local/share/gnome-shell/extensions```.
* All GNOME extensions and configurations and GNOME-wide system and GNOME-tweaks tool configurations are stored inside **`~/.local/share/gnome-shell/extensions/'Aaaa Extensions Configurations Backup'`**.

# Restore - Step by step
- Install **Extension Manager** from **Flathub** with `flatpak install flathub com.mattjakeman.ExtensionManager`.
- Clone and copy all the contents into `~/.local/share/gnome-shell/extensions/`.
- Navigate to **`~/.local/share/gnome-shell/extensions/'Aaaa Extensions Configurations Backup'`** and run `dconf load /org/gnome/shell/extensions/ < gnome-shell-extensions-backup.dconf`.
- Restart the session or the system.

# Restore in one go.
- Restore all Gnome-wide settings, including **Gnome-tweaks** configurations using `dconf load -f / < complete_gnome_saved_settings.dconf` from **`~/.local/share/gnome-shell/extensions/'Aaaa Extensions Configurations Backup'`** 

# Backup
- To backup only gnome-shell extentions, navigate to `~/.local/share/gnome-shell/extensions/'Aaaa Extensions Configurations Backup'` and run `dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf`.
- To back up everything, run `dconf dump / > complete_gnome_saved_settings.dconf`.

# Alternative Backup using SaveDesktop flatpak app
- Alternatively, you can backup everything using the **SaveDesktop** flatpak app that can be installed using `flatpak install flathub io.github.vikdevelop.SaveDesktop`. 

# If you use WSL, you can use [Gist](https://gist.github.com/vivivivaan/22ea8ff06d2b3325cb34cb799a281e17)

Open to contributions on a new branch 🤝🥂
