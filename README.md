# BB-8 Notifications

[BB-8](http://www.sphero.com/starwars) wasn't built to just sit on your desk.
It wants to tell you stuff. Let it.

## Prerequisites

- A [Sphero BB-8](http://www.sphero.com/starwars) (though not tested, it may
  work with other Sphero products).

- Only tested on Mac OS, though may work on other systems. Instructions assume
  you use [Homebrew](http://brew.sh/) and [Zsh](http://www.zsh.org/) - need to
  be adapted for other setups.

## Install

```zsh
brew install node                                 # Install Node.js
git clone git@github.com:jschementi/bb8.git       # Clone this repo
cd bb8 && npm install                             # Install dependencies
node index.js                                     # Run notification server
source notify.zsh                                 # Enable notifications for
                                                  # command exit codes (add to
                                                  # .zshrc to always enable).
```

## Usage

When running a command that exits successfully (exit code = 0), BB-8 will glow
green.

Otherwise (exit code != 0), BB-8 will glow red.
