# discord-epagination is a clone of [discord-slider](https://www.npmjs.com/package/discord-slider) but with more things in in it.

## Installation

```sh
npm i discord-epagination
// and you will need discord-buttons
npm i discord-buttons
```

## Setup

### Put this in your master file. eg: `main.js`

```js
// Creates the bot Client
const Discord = require("discord.js");
const client = new Discord.Client();
// Import these 2 packages into your client
require("discord-buttons")(client); // !!! must be below your Discord.Client()
require("discord-slider")(client); // !!! must be below your Discord.Client()
```

<br />

## Method

```js
<Message>.channel.createSlider(messageAuthorID, embedsArray, emojiArray, time)
```

- messageAuthorID : your way to get the id of the message author, eg: `message.author.id`
- embedsArray : all your embeds (need to be in order of the pages you want !). eg: `[embed1, embed2]`
- emojiArray : all emojis that need to be in the buttons, by default those are : `["◀️", "▶️", "❌"]`
- time : the time you want your buttons to be interractable (in milliseconds !), by default it's set to `60000` so `60 seconds`

## Example

```js
message.channel.createSlider(
  message.author.id,
  [embed0, embed1, embed2, embed3],
  ["<<", ">>", "x"],
  30000
);
```

> Here, after 30 seconds, buttons will be disabled

**Here are the enabled buttons :**
https://cdn.discordapp.com/attachments/853218630912180234/855464442660519986/unknown.png

**And here are the disabled buttons :**
https://cdn.discordapp.com/attachments/853218630912180234/855465290124754954/unknown.png
