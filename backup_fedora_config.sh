#!/bin/bash

# Folder where backups will be stored
BACKUP_DIR="./Config-files"

# Check if the directory does NOT exist
if [ ! -d "$BACKUP_DIR" ]; then
    echo "Directory $BACKUP_DIR not found. Creating it now..."
    mkdir -p "$BACKUP_DIR"
else
    echo "Directory $BACKUP_DIR already exists. Skipping creation."
    echo "Removing existing files inside the folder..."
    rm -f "$BACKUP_DIR"/*
fi

echo "🚀 Starting Fedora configuration backup..."

# Extensions configuration
dconf dump /org/gnome/shell/extensions/ > "$BACKUP_DIR/gnome-shell-extensions-backup.dconf"

# System-wide configuration
dconf dump / > "$BACKUP_DIR/complete_gnome_saved_settings.dconf"

# Extensions List
gnome-extensions list -d > "$BACKUP_DIR/gnome_extensions_list.txt"

# # Packages List
# dnf list --installed > "$BACKUP_DIR/packages_list.txt"

# OpenType and TrueType fonts
ls /usr/local/share/fonts/opentype /usr/local/share/fonts/truetype /usr/share/fonts/ > "$BACKUP_DIR/fonts_list.txt" 2>/dev/null

# Themes List
ls ~/.local/share/themes/ \
   /usr/local/share/themes/ \
   ~/.local/share/icons \
   /usr/local/share/icons/ \
   /usr/share/icons/ > "$BACKUP_DIR/themes_list.txt" 2>/dev/null

# Grub Config
cp /etc/default/grub "$BACKUP_DIR/grub-defaults.backup"

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