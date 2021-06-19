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
```

<br />

## Method

```js
createSimpleSlider(userID, channel, embedsArray, emojiArray, time);
```

- userID (String) : the id of the user you want to have access to interact with buttons, eg: `message.author.id`
- channel (String) : the channel where you want the message to be sent, eg: `message.channel`
- embedsArray (Array) : all your embeds (need to be in order of the pages you want !). eg: `[embed1, embed2]`
- emojiArray (Array) : all emojis that need to be in the buttons, by default those are : `["◀️", "▶️"]`
- time (Number) : the time you want your buttons to be interractable (in milliseconds !), by default it's set to `60000` so `60 seconds`

---

```js
createAdvancedSlider(
  userID,
  channel,
  embedsArray,
  emojiArray,
  msgDelete,
  backMainEmbed,
  time
);
```

- userID (String) : the id of the user you want to have access to interact with buttons, eg: `message.author.id`
- channel (String) : the channel where you want the message to be sent, eg: `message.channel`
- embedsArray (Array) : all your embeds (need to be in order of the pages you want !). eg: `[embed1, embed2]`
- msgDelete (Boolean) : add a X button that delete the embed when clicked.
- backMainEmbed (Boolean) : add a ↩ button that edit the embed to the first in the array (main embed).
- emojiArray (Array) : all emojis that need to be in the buttons, by default those are : `["◀️", "▶️", "❌", "↩"]`
- time (Number) : the time you want your buttons to be interractable (in milliseconds !), by default it's set to `60000` so `60 seconds`

## Example

```js
const {
  createSimpleSlider,
  createAdvancedSlider,
} = require("discord-epagination");

createSimpleSlider(
  message.author.id,
  message.channel,
  [embed0, embed1, embed2, embed3],
  ["◀️", "▶️"],
  30000
);

createAdvancedSlider(
  message.author.id,
  message.channel,
  [embed0, embed1, embed2, embed3],
  true,
  true,
  ["◀️", "▶️", "❌", "↩"],
  30000
);
```

> Here, after 30 seconds, buttons will be disabled

**Here are the buttons :**
https://cdn.discordapp.com/attachments/853218630912180234/855464442660519986/unknown.png

> The X button delete's the message
