# Usage

wpp command will initialize by creating a wpkg.json file in the root of whichever folder you're located in

You can add / remove plugins from your wordpress install, as long as you hae WP CLI installed, using simple `wpp install` or `wpp remove` commands.

You can also upload the wpkg.json file within your git project, and run wpp on *any* location, to ensure you'll have the same versions of plugins running
across your full environment. This is to stop development, staging and prodution from varying in versions, over time. This will also limit how many plugins you have installed, as it will be easy to remove none-used plugins from the wpkg file, and that way around, keep your wp installation much more lean.

TODO: Make this a npmjs.com module
TODO: Make this actually work..