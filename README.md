# Ubuntu-24.04.1-LTS Gnome (46) Extensions/Config-BackUp.

Extensions are stored in ```~/.local/share/gnome-shell/extensions```.

# 

To install the extensions, first install **Extension Manager** from **Flathub** using `flatpak install flathub com.mattjakeman.ExtensionManager`. Clone and copy all the contents into `~/.local/share/gnome-shell/extensions/`. To apply the configurations, navigate to **Aaaa Extensions Configurations Backup** folder and run `dconf load /org/gnome/shell/extensions/ < gnome-shell-extensions-backup.dconf`. Restart the session or the system. To backup, stay in the same folder and run `dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf`. Back all Gnome-wide and Gnome-tweaks tool configurations using `dconf dump / > saved_settings.dconf`. Restore all Gnome-wide settings including **Gnome-tweaks** configurations using `dconf load -f / < complete_gnome_saved_settings.dconf`. Both gnome extensions configurations and Gnome-wide system and Gnome-tweaks tool configurations are all stored inside **Aaaa Extensions Configurations Backup**.😺 Alternatively, you can replace all of this process using **SaveDesktop** app on flathub that can be installed using `flatpak install flathub io.github.vikdevelop.SaveDesktop`. 

#

[Gist](https://gist.github.com/prithvirajkshatriya/c97c5678ea81b2334dd8de6829ef6f96) for WSL2, bash and other linux related configurations.

#

I will keep updating the list if I install (or find) any new extensions. Your contributions are very much welcomed. 💙🤝
