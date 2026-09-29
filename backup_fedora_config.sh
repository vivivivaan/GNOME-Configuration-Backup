#!/bin/bash

# Folder where backups will be stored
BACKUP_DIR="./Config-files"

# Check if the directory does NOT exist
if [ ! -d "$BACKUP_DIR" ]; then
    echo "🗃️ Directory $BACKUP_DIR not found. Creating it now..."
    mkdir -p "$BACKUP_DIR"
else
    echo "🙌 Directory $BACKUP_DIR already exists. Skipping creation..."
    echo "🧹 Removing existing files inside the folder..."
    rm -f "$BACKUP_DIR"/*
fi

# Remove leftover configurations
echo "🧹 Checking for stale GNOME extension configurations..."

# Get installed extension UUIDs
mapfile -t installed_extensions < <(gnome-extensions list)

# Get dconf extension directories
mapfile -t dconf_extensions < <(dconf list /org/gnome/shell/extensions/)

for ext in "${dconf_extensions[@]}"; do
    # Remove trailing slash
    ext="${ext%/}"

    # Check whether this dconf directory belongs to an installed extension
    if printf '%s\n' "${installed_extensions[@]}" | grep -Fxq "$ext"; then
        echo "  ✓ Keeping: $ext"
    else
        echo "  🗑️  Removing stale config: $ext"
        dconf reset -f "/org/gnome/shell/extensions/$ext/"
    fi
done

# Extension Configurations Backup
echo "🚀 Starting Fedora configuration backup..."

# Extensions configuration
dconf dump /org/gnome/shell/extensions/ > "$BACKUP_DIR/gnome-shell-extensions-backup.dconf"

# System-wide configuration
dconf dump / > "$BACKUP_DIR/complete_gnome_saved_settings.dconf"

# Extensions List
gnome-extensions list -d > "$BACKUP_DIR/gnome_extensions_list.txt"

# # Packages List
# dnf list --installed > "$BACKUP_DIR/packages_list.txt"

# Flatpak apps list
flatpak list --columns=application --app > "$BACKUP_DIR/flatpak_apps.txt"

# OpenType and TrueType fonts
ls /usr/local/share/fonts/opentype /usr/local/share/fonts/truetype /usr/share/fonts/ > "$BACKUP_DIR/fonts_list.txt" 2>/dev/null

# Themes List
ls ~/.local/share/themes/ \
   /usr/local/share/themes/ \
   ~/.local/share/icons \
   /usr/local/share/icons/ \
   /usr/share/icons/ > "$BACKUP_DIR/themes_list.txt" 2>/dev/null

# Grub Config
sudo cat /etc/default/grub > "$BACKUP_DIR/grub-defaults.backup"

echo "Backup completed. Files saved in $BACKUP_DIR.📁"

git add .

unset commit_message

while [ -z "$commit_message" ]; do
    read -p "📋 Enter your commit message (cannot be empty): " commit_message
    
    # Optional: Trim whitespace so a message of just " " is rejected
    commit_message=$(echo "$commit_message" | xargs)
    
    if [ -z "$commit_message" ]; then
        echo "⚠️  You must provide a message to continue."
    fi
done

git commit -m "$commit_message"

git push