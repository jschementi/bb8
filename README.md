# BB-8 Notifications

[BB-8](http://www.sphero.com/starwars) wasn't built to just sit on your desk.
It wants to tell you stuff. Let it.

![BB-8 notifying you if your shell commands succeed or not](https://github.com/jschementi/bb8/raw/master/media/bb8.gif) ![BB-8 shaking on error](https://github.com/jschementi/bb8/raw/master/media/bb8shake.gif)

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

When running a command that exits successfully (`exit code == 0`), BB-8 will glow
green.

Otherwise (`exit code != 0`), BB-8 will glow red.

## Inspiration

The
[Das Keyboard 5Q](https://www.kickstarter.com/projects/1229573443/das-keyboard-5q-the-cloud-connected-keyboard/)
got me thinking about using lights and color to provide custom notifications.
I've always wanted a "build broken" orb for my desk, but never got around to
doing it. When my kids asked to play with BB-8, I thought it would be just too
perfect if I could just hack BB-8 to be my own custom status light, since it
normally sits on my desk doing nothing. Once I found the
[Sphero SDK](http://sdk.sphero.com/), I first felt stupid for owning this thing
for 8 months and not hacking it yet. Shame is a powerful motivator, so here we
are.

> I didn't back the Das Keyboard 5Q because I prefer compact keyboards (without
> a numpad), so can't wait to see if Das Keyboard makes a compact version.

## Next Steps

Shell integration was just the low-hanging-fruit to start with. Having BB-8
glow red/green based on process exit codes handles a bunch of situations I
wanted, like build and test failures, but zero=green non-zero=red is a very
narrow style of notification.

Ultimately, it'd be nice to have a local service that recieves arbitrary events
from your system or the internet, and responds to them in customizable ways.

For example:

- Pulse red when I have a meeting
- Shake head "yes" when I finish a todo.txt task

## Contribute

[Pull Requests](https://github.com/jschementi/bb8/pulls) welcome!
