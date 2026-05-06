#!/bin/bash

# Folder where backups will be stored
BACKUP_DIR="./Config-files"

# Create the folder if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Remove existing files inside the folder
rm -f "$BACKUP_DIR"/*

echo "Starting backup..."

# Extensions configuration
dconf dump /org/gnome/shell/extensions/ > "$BACKUP_DIR/gnome-shell-extensions-backup.dconf"

# System-wide configuration
dconf dump / > "$BACKUP_DIR/complete_gnome_saved_settings.dconf"

# Extensions List
gnome-extensions list -d > "$BACKUP_DIR/gnome_extensions_list.txt"

# Packages List
apt-mark showmanual > "$BACKUP_DIR/packages_list.txt"

# OpenType and TrueType fonts
ls /usr/local/share/fonts/opentype /usr/local/share/fonts/truetype > "$BACKUP_DIR/fonts_list.txt" 2>/dev/null

# Themes List
ls ~/.local/share/themes/ \
   /usr/local/share/themes/ \
   ~/.local/share/icons \
   /usr/local/share/icons/ > "$BACKUP_DIR/themes_list.txt" 2>/dev/null

# Grub Config
sudo cp /etc/default/grub "$BACKUP_DIR/grub-defaults.backup"

echo "Backup completed. Files saved in $BACKUP_DIR"

git add .

unset commit_message

while [ -z "$commit_message" ]; do
    read -p "Enter your commit message (cannot be empty): " commit_message
    
    # Optional: Trim whitespace so a message of just " " is rejected
    commit_message=$(echo "$commit_message" | xargs)
    
    if [ -z "$commit_message" ]; then
        echo "⚠️  You must provide a message to continue."
    fi
done

git commit -m "$commit_message"

git push