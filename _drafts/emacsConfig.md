---
layout: post
title: Configure

Emacs as an IDE
categories:
  - Tools
tags:
  - Emacs
last_modified_at: 2019-01-25T09:55:59-05:00
---

There are many posts explaining how to configure and use Emacs as an IDE. Among
them, my favourite is the one proposed by [Nils
Deppe](https://nilsdeppe.com/posts/emacs-c++-ide2). I used his work as base for
my configuration, making small changes for adapting it to my needs. In this post
I would like to share this configuration, explaining in details

## Emacs Server and Client

In case of complex configurations, the startup time required by Emacs grows considerably. A
way to get rid of this is to use a server-client approach, loading an Emacs
server daemon during the operating system startup and then using an emacs client
to connect to it. On Linux systems, the standard method of automatically running
the Emacs daemon at startup is *systemmd*. The procedure is summarized in the
following steps:
* create the directory where to store the Emacs daemon service file with the
 command: *mkdir -p ~/.config/systemd/user*
* place in this directory the following service file:

```bash
[Unit]
Description=Emacs: the extensible, self-documenting text editor
Documentation=man:emacs(1) info:Emacs

[Service]
Type=forking
# ExecStart and ExecStop specify the emacs server and the emacs client paths
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
```
* give to the service file the execution permission with the command *chmod -x ~/.config/systemd/user/emacsd.service*

When the above procedure has been completed, it is possible to enable, disable,
start, restart, stop or check the status of the Emacs daemon with the following commands:

```bash
systemctl --user enable emacsd.service
systemctl --user disable emacsd.service
systemctl --user start emacsd.service
systemctl --user restart emacsd.service
systemctl --user stop emacsd.service
systemctl --user status emacsd.service
```

Once the service has been enabled and started, it is possible to check that the
Emacs server is running using the command *ps aux | grep emacs*. The last step
is connecting an Emacs client to the server using the command *emacsclient -c*.
The command *sudo netstat -xaupen | grep emacs* should show that the Emacs
server and the Emacs client are connected:

```bash
unix  2      [ ACC ]     STREAM     LISTENING     24138    1795/emacs          /tmp/emacs1000/server
unix  3      [ ]         STREAM     CONNECTED     32411    3349/emacsclient
```
## Ripgrep

Ripgrep is a line-oriented search tool that recursively searches your current
directory for a regex pattern, taking into account any rule defined in the
.gitignore file. Ripgrep is built on top of Rust's regex engine and is
considerably faster then any other popular search engine. If the ripgrep
executable is installed, my Emacs configuration define it as the default grep
command used to search in the counsel-etag database. To install ripgrep on
debian-based operating systems,
download the .deb binary file with th ìe command *curl -LO
https://github.com/BurntSushi/ripgrep/releases/download/0.10.0/ripgrep_0.10.0_amd64.deb*
and then install it using dpkg: *sudo dpkg -i ripgrep_0.10.0_amd64.deb*.

## You Complete Me Daemon (Ycmd)

[Ycmd]( https://github.com/Valloric/ycmd ) is a server that provides APIs for
code-completion. Combined with  [emacs-ycmd] (https://github.com/abingham/emacs-ycmd) client, Ycmd provides a
code-completion framework which is fast and accurate. To install Ycmd, the
following steps are required:
* install the minimal dependencies with *sudo apt install build-essential cmake python3-dev*
* install the ycmd command with *sudo apt-get install ycmd*
* clone the ycmd repository with *git clone https://github.com/Valloric/ycmd*
* enter the ycmd folder and update the submodules with *git submodule update
  --init --recursive*
* enable the language specifice code-completion engines with *python3 build.py
--option*, where option is clang-completer for c/c++, java-completer for java
and so on (run python3 build.py --help to check all the supported engines).


~/.emacs.d/plugins/bazel-mode.el
cd ycmd/





 sudo apt install build-essential cmake python3-dev
python3 install.py --clang-completer

##CTAGS Universal tags
 ctags --version

Run over a project (-R is to walk the project recursively, and -e is to use Emacs-compatible syntax):

$ ctags -eR

Alternatively if you like to only include files with certain extensions, you can use -a (append, creates a file if doesn't exist) option with find utility, like:
$ find -name "*.cpp" -print -or -name "*.h" -print -or -name "*.hxx" -print -or -name "*.cxx" -print | xargs ctags -ea
