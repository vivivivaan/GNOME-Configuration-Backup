# Ubuntu (25.04) Gnome, Tweaks-tool and system-wide configurations backup

* Extensions are stored in ```~/.local/share/gnome-shell/extensions```.

# Restore

- Install **Extension Manager** with `flatpak install flathub com.mattjakeman.ExtensionManager`.
- Install the extensions listed in `gnome_extensions_list.txt`.
- Run `dconf load /org/gnome/shell/extensions/ < gnome-shell-extensions-backup.dconf` to set the extensions configurations. 
- Restart the session/system to see the effects.
- (optional) Restore all Gnome-wide settings, including **Gnome-tweaks** configurations using `dconf load -f / < complete_gnome_saved_settings.dconf`.
- Additionally, you can backup and restore all the GNOME settings and other configurations using SaveDesktop (`flatpak install flathub io.github.vikdevelop.SaveDesktop`) flatpak app besides the Backup method below.

# Backup

| Item | Command |
| :------------ | ------: |
| Extensions configuration | `dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf` |
| Extensions List | `gnome-extensions list -d > gnome_extensions_list.txt` |
| System-wide configuration | `dconf dump / > complete_gnome_saved_settings.dconf` |
| Packages List | `dnf list --installed > package_list_all.txt` | 
| OpenType and TrueType fonts | `ls /usr/share/fonts/ > fonts_open_true_list.txt` |
| Themes List | `ls ~/.local/share/themes/ /usr/share/themes/ ~/.local/share/icons /usr/share/icons/ > themes_sys_usr_list.txt` |

<!-- - Only gnome-shell extentions config, run `dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf`.
- Complete system-wide configurations: `dconf dump / > complete_gnome_saved_settings.dconf`.
- List of all packages: 

`dconf dump /org/gnome/shell/extensions/ > gnome-shell-extensions-backup.dconf && dconf dump / > complete_gnome_saved_settings.dconf && dpkg --get-selections >  package_list_all.txt && ls /usr/share/fonts/truetype/ /usr/share/fonts/opentype/ > fonts_open_true_list.txt  && gnome-extensions list -d > gnome_extensions_list.txt && ls ~/.themes/ /usr/share/themes/ ~/.icons/ /usr/share/icons/ > themes_sys_usr_list.txt` -->

# Chromium browsers config

- Enable flags in `chrome://flags`, `brave://flags` and `edge://flags`.
- Copy browser files from `/usr/share/applications/` to `~/.local/share/applications/`.
- For each of the copied files, jump to the line that begins with `Exec=` and ends with `%U` and append as shown below. Append the same to the line that begins with `Exec=` and ends with `--inprivate` or `--incognito`.
- Alternatively, create `chrome-flags.conf`, `brave-flags.conf`, `edge-flags.conf` files in `~/.config` and add the flags to respective flag files.
- Restart the system or session.

| Browser | copy *.desktop file | `*://flags` |
|:---|---|---:|
| Google Chrome | `sudo cp /usr/share/applications/google-chrome.desktop ~/.local/share/applications/` | `#fluent-overlay-scrollbars` `#fluent-scrollbars` `#smooth-scrolling` `#ozone-platform-hint` `#wayland-ui-scaling` `#root-scrollbar-follows-browser-theme` `#link-preview` `#wayland-linux-drm-syncobj` `#allow-legacy-mv2-extensions` `#tabstrip-combo-button` |
| Brave | `sudo cp /usr/share/applications/brave-browser.desktop ~/.local/share/applications/` | `#fluent-overlay-scrollbars` `#fluent-scrollbars` `#ozone-platform-hint` `#wayland-ui-scaling` `#root-scrollbar-follows-browser-theme` `#link-preview` `#middle-button-autoscroll` `#wayland-linux-drm-syncobj` |
| Microsoft Edge | `sudo cp /usr/share/applications/microsoft-edge.desktop ~/.local/share/applications/` | Only enable flags in the `.desktop` file |

| Browser | Code to append |
|:---|---:|
| Google Chrome | `--enable-features=MiddleClickAutoscroll,TouchpadOverscrollHistoryNavigation --disable-features=GlobalShortcutsPortal` |
| Brave Browser | `--enable-features=TouchpadOverscrollHistoryNavigation --disable-features=GlobalShortcutsPortal` |
| Microsoft Edge | `--enable-features=MiddleClickAutoscroll,TouchpadOverscrollHistoryNavigation,UseOzonePlatform,WaylandWindowDecorations --ozone-platform=wayland --disable-features=GlobalShortcutsPortal` |

# GRUB theme background glitches
For GRUB configuration, install the GRUB theme but comment out the `GRUB_BACKGROUND` flag to avoid any background.

# Enable fingerprint authentication besides login
`sudo pam-auth-update` and enable **Fingerprint Authentication**.

# Theming flatpak apps

Grant filesystem access to all Flatpak apps with `flatpak override --user --filesystem=xdg-config/gtk-3.0 --filesystem=xdg-config/gtk-4.0 --filesystem=xdg-data/themes --filesystem=xdg-data/icons --filesystem=xdg-data/fonts`.

| UI Element | Command |
|:---|---:|
| Themes | `flatpak override --user --env=GTK_THEME=your-theme-name` |
| Icons | ` flatpak override --user --env=ICON_THEME=your-icon-theme` |
| Cursor | `flatpak override --user --env=CURSOR_THEME=your-cursor-theme` |
| Fonts | `flatpak override --user --filesystem=xdg-data/fonts:ro --filesystem=xdg-config/fontconfig:ro` | 

# Important search terms for NVIDIA driver and Linux Kernel packages
`linux-generic`, `linux-headers-generic`, `linux-image-generic`, `linux-objects or linux-objects-nvidia`, `linux-modules`, `linux-header`, `linux-signatures or linux-signatures-nvidia`

## Common dependencies after a fresh install
`gcc g++ git tldr curl btop btm build-essential wget ca-certificates zip unzip tree locate gnupg2 gpg binfmt-support clang clangd llvm`

# Python Dependencies
`liblzma-dev liblz-dev zlib1g-dev libncurses-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev libbz2-dev`

# Bash aliases (~/.bashrc.d/aliases.sh)

```bash
# Package Management aliases.
alias ud="sudo dnf check-update"
alias ug="sudo dnf upgrade"
alias dg="sudo dnf distro-sync"
alias cache="sudo dnf clean all"
alias get="sudo dnf install"
alias yget="sudo dnf install -y"
alias del="sudo dnf remove"
alias arem="sudo dnf autoremove"
alias search="dnf search"
alias bi="sudo dnf check"
alias alt="sudo alternatives --config"
alias lssrc="ls /etc/yum.repos.d"
alias cdsrc="cd /etc/yum.repos.d"
alias srcs="sudo nano /etc/yum.repos.d/fedora-updates.repo"
alias csrc="sudo cat /etc/yum.repos.d/fedora-updates.repo"

# Systemctl aliases.
alias ver="cat /etc/os-release"
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
alias barc="nano ~/.bashrc.d/aliases"
alias carc="cat ~/.bashrc.d/aliases"
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
alias ugrub="sudo grub2-mkconfig -o /boot/grub2/grub.cfg"  # Use for BIOS systems
alias cgrub="cat /etc/default/grub"
alias lgrub="sudo grubby --info=ALL" # List all kernel entries managed by BLS

# Customizations
alias sysfont="cd /usr/share/fonts/"
alias usrfont="cd ~/.local/share/fonts/"
alias systhm="cd /usr/share/themes/"
alias usrthm="cd ~/.local/share/themes/"
alias sysico="cd /usr/share/icons/"
alias usrico="cd ~/.local/share/icons/"
alias syscur="cd /usr/share/icons/"
alias usrcur="cd ~/.local/share/icons/"
```
