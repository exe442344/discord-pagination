const { MessageButton, MessageActionRow } = require("discord-buttons");

async function createSlider(
  userID,
  channel,
  embeds,
  emoji = ["◀️", "▶️", "❌"],
  time = 60000
) {
  const button_back = new MessageButton().setStyle("grey").setID("back");

  const button_next = new MessageButton().setStyle("grey").setID("next");

  const button_x = new MessageButton().setStyle("grey").setID("x");

  const button_back_disabled = new MessageButton()
    .setStyle("grey")
    .setID("back_disabled")
    .setDisabled();

  const button_next_disabled = new MessageButton()
    .setStyle("grey")
    .setID("next_disabled")
    .setDisabled();

  if (emoji[0] && emoji[1]) {
    button_back.setEmoji(emoji[0]);
    button_next.setEmoji(emoji[1]);
    button_x.setEmoji(emoji[2]);
    button_back_disabled.setEmoji(emoji[0]);
    button_next_disabled.setEmoji(emoji[1]);
  } else {
    button_back.setLabel("<");
    button_next.setLabel(">");
    button_x.setLabel("x");
    button_back_disabled.setLabel("<");
    button_next_disabled.setLabel(">");
  }

  const buttonsActive = new MessageActionRow().addComponents([
    button_back,
    button_x,
    button_next,
  ]);

  const buttonsDisabled = new MessageActionRow().addComponents([
    button_back_disabled,
    button_next_disabled,
  ]);

  channel.send({ embed: embeds[0], components: buttonsActive }).then((msg) => {
    const collector = msg.createButtonCollector((button) => userID === userID, {
      time: time,
    });

    let currentPage = 0;

    collector.on("collect", (button) => {
      button.defer();

      if (button.clicker.user.id == userID) {
        if (button.id == "back") {
          if (currentPage !== 0) {
            --currentPage;
            msg.edit({ embed: embeds[currentPage], components: buttonsActive });
          } else {
            currentPage = embeds.length - 1;
            msg.edit({ embed: embeds[currentPage], components: buttonsActive });
          }
        } else if (button.id == "next") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            msg.edit({ embed: embeds[currentPage], components: buttonsActive });
          } else {
            currentPage = 0;
            msg.edit({ embed: embeds[currentPage], components: buttonsActive });
          }
        } else if (button.id == "x") {
          msg.delete();
        }
      }
    });
    collector.on("end", (collected) => {
      console.log("discord-epagination => Ended Collector");
    });
    collector.on("error", (e) => console.log(e));
  });
}

module.exports = createSlider;
