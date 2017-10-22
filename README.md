# solder.js
> Node.js implementation for TechnicSolder

Refer to the [wiki](https://github.com/mcrocks999/solder.js/wiki) and [website](https://solder.js.org) for help.

Created by [Paul](https://github.com/mcrocks999) and with help from [Martin](https://github.com/FatalErrorCode).

Don't believe it works? [Check out the test modpack!](https://www.technicpack.net/modpack/solderjsmodpack.1113658)

Demo API Endpoint: [https://xyon.k.vu/api/](https://xyon.k.vu/api/)

What is Solder?
--------------

TechnicSolder is an API that sits between a modpack repository and the launcher. It allows you to easily manage multiple modpacks in one single location.

Using Solder also means your packs will download each mod individually. This means the launcher can check MD5's against each version of a mod and if it hasn't changed, use the cached version of the mod instead. What does this mean? Small incremental updates to your modpack doesn't mean redownloading the whole thing every time!

Why solder.js?
--------------

Because I said so and because it's fast. Really fast. Also this took a day to create, appreciate it.

How do I use solder.js?
-----------------------

- [Getting Started](https://github.com/mcrocks999/solder.js/wiki/Getting-Started)
- [Configuring solder.js and Technic](https://github.com/mcrocks999/solder.js/wiki/Linking-solder.js-with-Technic)
- [Adding mods and a modloader](https://github.com/mcrocks999/solder.js/wiki/Adding-mods-and-a-modloader)
- [Example web server proxy configs](https://github.com/mcrocks999/solder.js/wiki/Example-web-server-proxy-configs)
- [HELP! No modpacks appear to import!](https://github.com/mcrocks999/solder.js/wiki/HELP:-No-modpacks-appear-to-import!)