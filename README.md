# Ubuntu-24.04.1-LTS Gnome (46) Extensions/Config-BackUp.

# Info
* Backs up commonly used GNOME Shell extensions.
* Saves essential GNOME settings (appearance, keyboard, mouse, etc.).
* Offers a straightforward method for restoring your personalised desktop environment.

Extensions are stored in ```~/.local/share/gnome-shell/extensions```.

# Backup
- To backup, stay in the same folder and run `dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf`.
- To back up all Gnome-wide and Gnome-tweaks tool configurations, run `dconf dump / > complete_gnome_saved_settings.dconf`.

# Alternative Backup using SaveDesktop flatpak app
- Alternatively, you can backup everything using the **SaveDesktop** flatpak app that can be installed using `flatpak install flathub io.github.vikdevelop.SaveDesktop`. 

# Restore - Step by step
- First install **Extension Manager** from **Flathub**, run `flatpak install flathub com.mattjakeman.ExtensionManager`.
- Clone and copy all the contents into `~/.local/share/gnome-shell/extensions/`.
- Apply the configurations, navigate to **Aaaa Extensions Configurations Backup** folder, run `dconf load /org/gnome/shell/extensions/ < gnome-shell-extensions-backup.dconf`.
- Restart the session or the system.

# Restore in one go.
- Restore all Gnome-wide settings, including **Gnome-tweaks** configurations, using `dconf load -f / < complete_gnome_saved_settings.dconf`. All GNOME extensions configurations and GNOME-wide system and GNOME-tweaks tool configurations are stored inside **Aaaa Extensions Configurations Backup**.


### If you use WSL, you can use [Gist](https://gist.github.com/prithvirajkshatriya/c97c5678ea81b2334dd8de6829ef6f96)

Open to contributions on a new branch 🤝🥂
