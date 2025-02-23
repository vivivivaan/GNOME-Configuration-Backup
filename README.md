# Ubuntu-24.04.1-LTS Gnome (46) Extensions/Config-BackUp.

Extensions are stored in ```~/.local/share/gnome-shell/extensions```.

# 

To install the extensions, first install **Extension Manager** from **Flathub** using `flatpak install flathub com.mattjakeman.ExtensionManager`. Clone and copy all the contents into `~/.local/share/gnome-shell/extensions/`. To apply the configurations, navigate to **Aaaa Extensions Configurations Backup** folder and run `dconf load /org/gnome/shell/extensions/ < gnome-shell-extensions-backup.dconf`. Restart the session or the system. To backup, stay in the same folder and run `dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf`.😺

#

[Gist](https://gist.github.com/itsmetheearthianbuoy/c97c5678ea81b2334dd8de6829ef6f96) for WSL2, bash and other linux related configurations.

#

I will keep updating the list if I install (or find) any new extensions. Your contributions are very much welcomed. 💙🤝
