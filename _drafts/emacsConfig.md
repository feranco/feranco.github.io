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
code-completion. Combined with [emacs-ycmd] (https://github.com/abingham/emacs-ycmd) client, Ycmd provides a
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

In order to use the emacs-ycmd in all supported mode the following statements
have been added to the emacs configuration:

```bash
(setq ycmd-startup-timeout 10)
(defvar my:ycmd-server-command '("/usr/bin/python3" "/home/feranco/Desktop/Git/ycmd/ycmd"))
(defvar my:ycmd-extra-conf-whitelist '("~/.ycm_extra_conf.py"))
(defvar my:ycmd-global-config "~/.ycm_extra_conf.py")
```

The first line set the timeout for the first request sent by the emacs-ycmd
client to 10 seconds, so to be sure that the ycmd server has already
started. This setting could not be strictly necessary on all machines, but
anyway it won't hurt. The second line specifies the command used to run the
server. The command has two arguments: the python3 executable and the path to
the ycmd directory (a subfolder of the one cloned from the Git repository). It
is really important to take into account that no filename expansion is done for
the arguments, so for example the following arguments won't work:
"~/Desktop/Git/ycmd/ycmd". The remaining two lines allow to use a global ycmd
configuration

[Gist](https://gist.github.com/nilsdeppe/449f1bd4920b7f50b6f05d8f7fda4f6f)that very aggressively finds compilation flags for header filesThe script must be placed at ~/.ycm_extra_conf.py for the Emacs configuration to find and use it.

If you've got project-specific ycmd configurations (almost certainly called
.ycm_extra_conf.py), and if you want them automatically loaded by ycmd as needed
(which you probably do), then you can whitelist them by adding entries to
ycmd-extra-conf-whitelist. For example, this will allow automatic loading of all
.ycm_extra_conf.py files anywhere under ~/my_projects

Another thing to be aware of is that getting YCMD, or more specifically libclang, to play nicely with precompiled headers took some work. See this issue on the YCMD GitHub for details. The short story is that if you use precompiled headers you might have to build YCMD using your system libclang by passing --system-libclang to the build script.


~/.emacs.d/plugins/bazel-mode.el
cd ycmd/





 sudo apt install build-essential cmake python3-dev
python3 install.py --clang-completer

##CTAGS Universal tags
 ctags --version

 git clone https://github.com/universal-ctags/ctags and follow the instructions
 in autotools.rst
   $ ./autogen.sh
    $ ./configure --prefix=/where/you/want # defaults to /usr/local
    $ make
    $ make install # may require extra privileges depending on where to install


Run over a project (-R is to walk the project recursively, and -e is to use Emacs-compatible syntax):

$ ctags -eR

Alternatively if you like to only include files with certain extensions, you can use -a (append, creates a file if doesn't exist) option with find utility, like:
$ find -name "*.cpp" -print -or -name "*.h" -print -or -name "*.hxx" -print -or
-name "*.cxx" -print | xargs ctags -ea
