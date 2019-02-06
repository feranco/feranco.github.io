---
layout: post
title: Emacs Configuration
categories:
  - Tools
tags:
  - Emacs
last_modified_at: 2019-01-25T09:55:59-05:00
---

## Emacs Server and Client

In case of complex configurations, the startup time required by Emacs grows considerably. A
way to get rid of this is to use a server-client approach, loading an Emacs
server daemon during the operating system startup and then using an emacs client
to connect to it. On Linux systems, the standard method of automatically running
the Emacs daemon at startup is *systemmd*. First of all we need to create the
directory where to store the Emacs daemon service file with the following
command: *mkdir -p ~/.config/systemd/user*. Then we place in this directory the
following service file:

[Unit]
Description=Emacs: the extensible, self-documenting text editor
Documentation=man:emacs(1) info:Emacs

[Service]
Type=forking
ExecStart=/usr/local/bin/emacs --daemon
ExecStop=/usr/local/bin/emacsclient --eval "(progn (setq kill-emacs-hook nil) (kill-emacs))"
Restart=on-failure
Environment=DISPLAY=:%i
# Provide access to SSH
Environment=SSH_AUTH_SOCK=/run/user/1000/keyring/ssh

# Remove the limit in startup timeout, since emacs
# cloning and building all packages can take time
TimeoutStartSec=0

[Install]
WantedBy=default.target



This mean to
use systemd to automatically load
