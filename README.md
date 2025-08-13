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

# Chromium browsers config

- Enable flags in `chrome://flags`, `brave://flags` and `edge://flags`.
- Copy browser files from `/usr/share/applications/` to `~/.local/share/applications/`.
- For each of the copied files, jump to the line that begins with `Exec=` and ends with `%U` and append as shown below. Append the same to the line that begins with `Exec=` and ends with `--inprivate` or `--incognito`.
- Alternatively, create `chrome-flags.conf`, `brave-flags.conf`, `edge-flags.conf` files in `~/.config` and add the flags to the ***-flags.conf** files.
- Restart the system or session.

| Browser | copy *.desktop file | `*://flags` |
|:---|---|---:|
| Google Chrome | `sudo cp /usr/share/applications/google-chrome.desktop ~/.local/share/applications/` | `#fluent-overlay-scrollbars` `#fluent-scrollbars` `#ozone-platform-hint` `#wayland-ui-scaling` `#root-scrollbar-follows-browser-theme` `#link-preview` |
| Brave | `sudo cp /usr/share/applications/brave-browser.desktop ~/.local/share/applications/` | `#fluent-overlay-scrollbars` `#fluent-scrollbars` `#ozone-platform-hint` `#wayland-ui-scaling` `#root-scrollbar-follows-browser-theme` `#linork-preview` `#middle-button-autoscroll` |
| Microsoft Edge | `sudo cp /usr/share/applications/microsoft-edge.desktop ~/.local/share/applications/` | Only enable flags in the `.desktop` file |

| Browser | Code to append |
|:---|---:|
| Google Chrome | `--enable-features=MiddleClickAutoscroll,TouchpadOverscrollHistoryNavigation --disable-features=GlobalShortcutsPortal` |
| Brave Browser | `--enable-features=TouchpadOverscrollHistoryNavigation --disable-features=GlobalShortcutsPortal` |
| Microsoft Edge | `--enable-features=MiddleClickAutoscroll,TouchpadOverscrollHistoryNavigation,UseOzonePlatform,WaylandWindowDecorations --ozone-platform=wayland --disable-features=GlobalShortcutsPortal` |

For GRUB configuration, install the GRUB theme but comment out the `GRUB_BACKGROUND` flag to avoid any graphical glitches.

# Theming flatpak apps
- To apply the GTK theme to flatpak apps, use `sudo flatpak override --filesystem=xdg-data/themes` (By default, that location translates to $HOME/.local/share/themes) or `sudo flatpak override --filesystem=$HOME/.themes`.
- Lastly, to apply config, use `sudo flatpak override --filesystem=xdg-config/gtk-3.0 && sudo flatpak override --filesystem=xdg-config/gtk-4.0`.

# Important search terms for NVIDIA driver and Linux Kernel packages
`linux-generic`, `linux-headers-generic`, `linux-image-generic`, `linux-objects or linux-objects-nvidia`, `linux-modules`, `linux-header`, `linux-signatures or linux-signatures-nvidia`

## Common dependencies after a fresh install
`gcc g++ git tldr curl btop btm build-essential apt-transport-https wget ca-certificates zip unzip tree locate gnupg2 gpg binfmt-support clang clangd llvm`

# Python Dependencies
`liblzma-dev lzma-dev liblz-dev zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev libbz2-dev`

# Ubuntu bash aliases
```bash
# Package Management aliases.
alias udg="sudo apt-get update && sudo apt-get upgrade && sudo apt-get dist-upgrade"
alias ud="sudo apt-get update"
alias ug="sudo apt-get upgrade"
alias dg="sudo apt-get dist-upgrade"
alias cache="sudo apt-get clean"
alias get="sudo apt-get install"
alias yget="sudo apt-get install -y"
alias sget="sudo apt-get install --install-suggests"
alias syget="sudo apt-get install --install-suggests -y"
alias del="sudo apt-get remove"
alias fdel="sudo apt-get remove --purge --autoremove"
alias arem="sudo apt-get autoremove"
alias search="apt-cache search"
alias di="sudo dpkg -i"
alias bi="sudo apt-get --fix-broken install"
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
alias hib="sudo systemctl hibernate"
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
