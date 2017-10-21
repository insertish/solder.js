# solder.js
> Node.js implementation for TechnicSolder

Created by [Paul](https://github.com/mcrocks999) and with help from [Martin](https://github.com/FatalErrorCode).

Don't believe it works? [Check out the test modpack!](https://www.technicpack.net/modpack/solderjsmodpack.1113658)

What is Solder?
--------------

TechnicSolder is an API that sits between a modpack repository and the launcher. It allows you to easily manage multiple modpacks in one single location. It's the same API we use to distribute our modpacks!

Using Solder also means your packs will download each mod individually. This means the launcher can check MD5's against each version of a mod and if it hasn't changed, use the cached version of the mod instead. What does this mean? Small incremental updates to your modpack doesn't mean redownloading the whole thing every time!

Why solder.js?
--------------

Because I said so and because it's fast. Really fast. Also this took a day to create, appreciate it.

How do I use solder.js?
--------------

> Quick start:

```bash
git clone https://github.com/mcrocks999/solder.js.git
cd solder.js
npm i
node ./app.js
```

To configure solder.js, edit `/solderjs/config.js`. And if you plan on helping and testing solder.js, make a copy of the config file and save it as `/solderjs/dev-config.js`, this file will be excluded from commits.

How do I create modpacks and add mods?
--------------

Before continuing, change any settings in config.js and run at least once.

1. Create a folder structure like so:

![Sample folder structure](https://i.imgur.com/7LY3pv2.png)

2. Create the following files:

> `/modpacks/{name}/modpack.json`

```json
{
	"name": "mynewmodpack",
	"display_name": "This is my new modpack!",
	"url": "",
	"recommended": "1.0",
	"latest": "1.0"
}
```

> `/modpacks/{name}/builds/{build}.json`

```json
{
    "minecraft": "1.8.9",
    "forge": null,
    "mods": [
        {
            "name": "{modname}",
            "version": "{modver}"
        }
    ]
}
```

> `/mods/{modname}/mod.json`

```json
{
	"name": "examplemod",
	"pretty_name": "Example Mod",
	"author": "example",
	"description": "This is my example mod.",
	"link": "https://xyon.k.vu/"
}
```

3. Add your mods

Examples:

> `mods/opencomputers/versions/1.8.9-1.6.2.12.zip`

```
|-- mods
| |- opencomputers-1.8.9-1.6.2.12.jar
```

> `mods/minecraftforge/versions/1.8.9-11.15.1.2318.zip`

```
|-- bin
| |- modpack.jar
```

4. Add any extra resources

> Keep in mind that icons, logos and backgrounds are still managed through TechnicPack, the resources on the API endpoint are there to be used for other things.

5. Configure Solder and Technic

Go to Solder Configuration on [TechnicPack](https://technicpack.net).

Copy the API Key and paste it in `solderjs/config.js` and copy the web address specified in `solderjs/config.js` and paste it as the Solder URL.

Now press Link Solder.

6. Add a modpack

Go to create a modpack

Press here:

![Create Modpack + Solder](https://i.imgur.com/0jtVbgq.png)

Now, you may notice that there are **no** modpacks that you can import. To fix this, press F12 / CTRL + SHIFT + I or the key to open the dev menu on your browser. Now select the select a modpack dropdown and edit as html. Now in between the select tags add this code, where solderjstestm is your modpack name:

![hacking technic site xdxdxdxd](https://i.imgur.com/TBpQgat.png)

Now add any information and import! [Your modpack should look like this.](https://www.technicpack.net/modpack/solderjsmodpack.1113658)