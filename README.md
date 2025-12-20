# Gnome, Tweaks-tool and system-wide configurations backup

* Extensions are stored in ```~/.local/share/gnome-shell/extensions```.
* Make **ptyxis** transparent with `dconf read /org/gnome/Ptyxis/default-profile-uuid` and `dconf write /org/gnome/Ptyxis/Profiles/3aae5a177777aa966b1fd63467153e2d/opacity 0.95`.

# Restore

- Replace the ***existing username*** with the ***current username*** in the **`complete_gnome_saved_settings.dconf`** file.
- Install **Extension Manager** with `flatpak install flathub com.mattjakeman.ExtensionManager`.
- Install the extensions in `gnome_extensions_list.txt`.
- Run `dconf load /org/gnome/shell/extensions/ < gnome-shell-extensions-backup.dconf` to apply the extension configurations. 
- Restart the session/system to see the effects.
- (optional) Restore all Gnome-wide settings, including **Gnome-tweaks** configurations using `dconf load -f / < complete_gnome_saved_settings.dconf`.
- Additionally, backup and restore all the GNOME settings and other configurations using SaveDesktop (`flatpak install flathub io.github.vikdevelop.SaveDesktop`) flatpak app besides the Backup method below.

# Backup

| Item | Command |
| :------------ | ------: |
| Extensions configuration | `dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf` |
| System-wide configuration | `dconf dump / > complete_gnome_saved_settings.dconf` |
| Extensions List | `gnome-extensions list -d > gnome_extensions_list.txt` |
| Packages List | `apt-mark showmanual > packages_list.txt` | 
| OpenType and TrueType fonts | `ls /usr/share/fonts/opentype /usr/share/fonts/truetype > fonts_list.txt` |
| Themes List | `ls ~/.local/share/themes/ /usr/share/themes/ ~/.local/share/icons /usr/share/icons/ > themes_list.txt` |

# Chromium browsers config

- Enable flags in `chrome://flags`, `brave://flags` and `edge://flags`.
- Copy browser files from `/usr/share/applications/` to `~/.local/share/applications/`.
- For each of the copied files, jump to the line that begins with `Exec=` and ends with `%U` and append as shown below. Append the same to the line that begins with `Exec=` and ends with `--inprivate` or `--incognito`.
- Alternatively, create `chrome-flags.conf`, `brave-flags.conf`, `edge-flags.conf` files in `~/.config` and add the configs.
- Restart the system or session.

| Browser | copy *.desktop file | `*://flags` |
|:---|---|---:|
| Google Chrome | `sudo cp /usr/share/applications/google-chrome.desktop ~/.local/share/applications/` | `#fluent-overlay-scrollbars` `#fluent-scrollbars` `#smooth-scrolling` `#ozone-platform-hint` `#wayland-ui-scaling` `#root-scrollbar-follows-browser-theme` `#link-preview` `#wayland-linux-drm-syncobj` `#allow-legacy-mv2-extensions` `#tabstrip-combo-button` |
| Brave | `sudo cp /usr/share/applications/brave-browser.desktop ~/.local/share/applications/` | `#fluent-overlay-scrollbars` `#fluent-scrollbars` `#ozone-platform-hint` `#wayland-ui-scaling` `#root-scrollbar-follows-browser-theme` `#link-preview` `#middle-button-autoscroll` `#wayland-linux-drm-syncobj` |
| Microsoft Edge | `sudo cp /usr/share/applications/microsoft-edge.desktop ~/.local/share/applications/` | Only enable flags in the `.desktop` file |
| Vivaldi  | `sudo cp /usr/share/applications/vivaldi-stable.desktop ~/.local/share/applications/` | `#fluent-overlay-scrollbars` `#fluent-scrollbars` `#root-scrollbar-follows-browser-theme` |

| Browser | Code to append |
|:---|---:|
| Google Chrome | `--enable-features=MiddleClickAutoscroll,TouchpadOverscrollHistoryNavigation --disable-features=GlobalShortcutsPortal` |
| Brave Browser | `--enable-features=TouchpadOverscrollHistoryNavigation --disable-features=GlobalShortcutsPortal` |
| Microsoft Edge | `--enable-features=MiddleClickAutoscroll,TouchpadOverscrollHistoryNavigation,UseOzonePlatform,WaylandWindowDecorations --ozone-platform=wayland --disable-features=GlobalShortcutsPortal` |
| Vivaldi | `--enable-features=MiddleClickAutoscroll,TouchpadOverscrollHistoryNavigation,UseOzonePlatform,WaylandWindowDecorations --ozone-platform=wayland --enable-wayland-ime --enable-pinch --enable-gesture-navigation --disable-features=GlobalShortcutsPortal` |

# GRUB theme background glitches
For GRUB configuration, install the GRUB theme but comment out the `GRUB_BACKGROUND` flag to avoid any background.

# Enable fingerprint authentication besides login
`sudo pam-auth-update` and enable **Fingerprint Authentication**.

# Theming flatpak apps

- Grant filesystem access to all Flatpak apps with `flatpak override --user --filesystem=xdg-config/gtk-3.0 --filesystem=xdg-config/gtk-4.0 --filesystem=xdg-data/themes --filesystem=xdg-data/icons --filesystem=xdg-data/fonts`.
- This is usually enough - `sudo flatpak override --filesystem=/usr/share/themes`, `sudo flatpak override --filesystem=~/.local/share/themes` and `sudo flatpak override --filesystem=xdg-config/gtk-3.0 && sudo flatpak override --filesystem=xdg-config/gtk-4.0`.

| UI Element | Command |
|:---|---:|
| Themes | `flatpak override --user --env=GTK_THEME=your-theme-name` (Reset with `flatpak override --user --unset-env=GTK_THEME`) |
| Icons | ` flatpak override --user --env=ICON_THEME=your-icon-theme` (Reset with `flatpak override --user --unset-env=ICON_THEME`) |
| Cursor | `flatpak override --user --env=CURSOR_THEME=your-cursor-theme` (Reset with `flatpak override --user --unset-env=CURSOR_THEME`) |
| Fonts | `flatpak override --user --filesystem=xdg-data/fonts:ro --filesystem=xdg-config/fontconfig:ro` (Reset with `flatpak override --user --reset --filesystem=xdg-data/fonts:ro --filesystem=xdg-config/fontconfig:ro`) | 
| Reset all flatpak overrides | `flatpak override --user --reset` and `flatpak override --user --reset --filesystem=xdg-config/gtk-3.0 --filesystem=xdg-config/gtk-4.0 --filesystem=xdg-data/themes --filesystem=xdg-data/icons --filesystem=xdg-data/fonts`. |

If the above reset don't work fully, run these to reset all relevant UI settings: 

```bash
gsettings reset org.gnome.desktop.interface gtk-theme
gsettings reset org.gnome.desktop.interface icon-theme
gsettings reset org.gnome.desktop.interface cursor-theme
gsettings reset org.gnome.desktop.interface color-scheme
gsettings reset org.gnome.shell.extensions.user-theme name
gsettings set org.gnome.desktop.interface gtk-theme 'Adwaita'
gsettings set org.gnome.shell.extensions.user-theme name 'Adwaita'
gsettings set org.gnome.desktop.interface gtk-theme 'Default-pure'
gsettings set org.gnome.shell.extensions.user-theme name 'Default-pure'
```

# Important search terms for NVIDIA driver and Linux Kernel packages
`linux-generic`, `linux-headers-generic`, `linux-image-generic`, `linux-objects or linux-objects-nvidia`, `linux-modules`, `linux-header`, `linux-signatures or linux-signatures-nvidia`

## Common dependencies after a fresh install
`gcc g++ git tldr curl btop btm build-essential wget ca-certificates zip unzip tree locate gnupg2 gpg binfmt-support clang clangd llvm`

# Python Dependencies
`liblzma-dev liblz-dev zlib1g-dev libncurses-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev libbz2-dev`

# Bash aliases (~/.bashrc.d/aliases.sh or ~/.bash_aliases)

```bash
# Package Management Aliases.
# Package Management aliases.
alias udg="sudo apt update && sudo apt upgrade && sudo apt dist-upgrade"
alias ud="sudo apt update"
alias ug="sudo apt upgrade"
alias dg="sudo apt dist-upgrade"
alias cache="sudo apt clean"
alias get="sudo apt install"
alias yget="sudo apt install -y"
alias sget="sudo apt install --install-suggests"
alias syget="sudo apt install --install-suggests -y"
alias del="sudo apt remove"
alias fdel="sudo apt remove --purge --autoremove"
alias arem="sudo apt autoremove"
alias search="apt-cache search"
alias di="sudo dpkg -i"
alias bi="sudo apt --fix-broken install"
alias alt="sudo update-alternatives --config "
alias lssrc="ls /etc/apt/sources.list.d"
alias cdsrc="cd /etc/apt/sources.list.d"
alias srcs="sudo nano /etc/apt/sources.list.d/ubuntu.sources"
alias csrc="sudo cat /etc/apt/sources.list.d/ubuntu.sources"

# Systemctl aliases.
alias ver="cat /etc/debian_version"
alias off="sudo systemctl poweroff"
alias boot="sudo systemctl reboot"
alias sus="sudo systemctl suspend"
alias sstop="sudo systemctl stop"
alias srun="sudo systemctl start"
alias sstat="sudo systemctl status"
alias srest="sudo systemctl restart"
alias son="sudo systemctl enable"
alias soff="sudo systemctl disable"

# Python aliases.
alias python3=python
alias pip3=pip

# Bash Config Aliases.
alias brc="nano ~/.bashrc"
alias barc="nano ~/.bash_aliases"
alias carc="cat ~/.bash_aliases"
alias pro="nano ~/.profile"
# Make Hist file values in brc to -1 for unlimited history.
alias past="nano ~/.bash_history"
alias q="exit"

# Misc aliases.
alias kver="uname -a"
alias sv="sudo visudo"
alias pd="passwd"
alias spd="sudo passwd"
alias shf="ls -ld .?*"
alias size1="du -h -s"
alias size2="du -h -s .*"

# Basic Aliases
alias cls="clear"
alias wi="whereis"
alias wh="which"
alias shell="exec $SHELL -l"
alias rem="sudo rm -rf"
alias sun="sudo nano"

# GRUB
alias ngrub="sudo nano /etc/default/grub"
alias ugrub="sudo update-grub"
alias cgrub="cat /etc/default/grub"

# Customisations
alias cdf="cd /usr/share/fonts"
alias cdft="cd /usr/share/fonts/truetype/"
alias lsft="ls /usr/share/fonts/truetype/"
alias cdfo="cd /usr/share/fonts/opentype/"
alias lsfo="ls /usr/share/fonts/opentype/"
alias fcache="sudo fc-cache -f -r -s"
alias cdthm="cd /usr/share/themes"
alias cdico="cd /usr/share/icons"
alias lsthm="ls /usr/share/themes"
alias lsico="ls /usr/share/icons"
```
