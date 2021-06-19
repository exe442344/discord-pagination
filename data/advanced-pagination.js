const { MessageButton, MessageActionRow } = require("discord-buttons");

async function createAdvancedSlider(
  userID,
  channel,
  embeds,
  deleteMsg = false,
  backMain = false,
  emoji = ["◀️", "▶️", "❌", "↩"],
  time = 60000
) {
  const button_back = new MessageButton().setStyle("grey").setID("back");

  const button_next = new MessageButton().setStyle("grey").setID("next");

  const button_x = new MessageButton().setStyle("grey").setID("x");

  const button_backmain = new MessageButton()
    .setStyle("grey")
    .setID("backmain");

  const button_back_disabled = new MessageButton()
    .setStyle("grey")
    .setID("back_disabled")
    .setDisabled();

  const button_next_disabled = new MessageButton()
    .setStyle("grey")
    .setID("next_disabled")
    .setDisabled();

  const button_backmain_disabled = new MessageButton()
    .setStyle("grey")
    .setID("backmain_disabled")
    .setDisabled();
  const button_x_disabled = new MessageButton()
    .setStyle("grey")
    .setID("x_disabled")
    .setDisabled();

  button_back.setEmoji(emoji[0]);
  button_next.setEmoji(emoji[1]);
  button_x.setEmoji(emoji[2]);
  button_backmain.setEmoji(emoji[3]);

  button_back_disabled.setEmoji(emoji[0]);
  button_next_disabled.setEmoji(emoji[1]);
  button_backmain_disabled.setEmoji(emoji[3]);
  button_x_disabled.setEmoji(emoji[2]);

  //   const buttonsActive = new MessageActionRow().addComponents([
  //     button_back,
  //     button_x,
  //     button_next,
  //   ]);

  //   const buttonsDisabled = new MessageActionRow().addComponents([
  //     button_back_disabled,
  //     button_next_disabled,
  //   ]);

  if (deleteMsg && backMain) {
    const buttonsActive = new MessageActionRow().addComponents([
      button_back,
      button_next,
      button_x,
      button_backmain,
    ]);

    const buttonsDisabled = new MessageActionRow().addComponents([
      button_back_disabled,
      button_next_disabled,
      button_x_disabled,
      button_backmain_disabled,
    ]);

    channel
      .send({ embed: embeds[0], components: buttonsActive })
      .then((msg) => {
        const collector = msg.createButtonCollector(
          (button) => userID === userID,
          {
            time: time,
          }
        );

        let currentPage = 0;

        collector.on("collect", (button) => {
          if (button.clicker.user.id == userID) {
            if (button.id == "back") {
              button.defer(true);
              if (currentPage !== 0) {
                --currentPage;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              } else {
                currentPage = embeds.length - 1;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              }
            } else if (button.id == "next") {
              button.defer(true);
              if (currentPage < embeds.length - 1) {
                currentPage++;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              } else {
                currentPage = 0;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              }
            } else if (button.id == "x") {
              button.defer(true);
              msg.delete();
            } else if (button.id == "backmain") {
              button.defer(true);
              msg.edit({ embed: embeds[0], components: buttonsActive });
            }
          }
        });
        collector.on("end", (collected) => {
          if (msg) {
            msg.edit({
              embed: embeds[currentPage],
              components: buttonsDisabled,
            });
          }
          console.log("discord-epagination => Ended Collector");
        });
        collector.on("error", (e) => console.log(e));
      });
  } else if (deleteMsg && !backMain) {
    const buttonsActive = new MessageActionRow().addComponents([
      button_back,
      button_next,
      button_x,
    ]);

    const buttonsDisabled = new MessageActionRow().addComponents([
      button_back_disabled,
      button_next_disabled,
      button_x_disabled,
    ]);

    channel
      .send({ embed: embeds[0], components: buttonsActive })
      .then((msg) => {
        const collector = msg.createButtonCollector(
          (button) => userID === userID,
          {
            time: time,
          }
        );

        let currentPage = 0;

        collector.on("collect", (button) => {
          button.defer();

          if (button.clicker.user.id == userID) {
            if (button.id == "back") {
              button.defer(true);
              if (currentPage !== 0) {
                --currentPage;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              } else {
                currentPage = embeds.length - 1;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              }
            } else if (button.id == "next") {
              button.defer(true);
              if (currentPage < embeds.length - 1) {
                currentPage++;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              } else {
                currentPage = 0;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              }
            } else if (button.id == "x") {
              button.defer(true);
              msg.delete();
            }
          }
        });
        collector.on("end", (collected) => {
          if (msg) {
            msg.edit({
              embed: embeds[currentPage],
              components: buttonsDisabled,
            });
          }
          console.log("discord-epagination => Ended Collector");
        });
        collector.on("error", (e) => console.log(e));
      });
  } else if (!deleteMsg && backMain) {
    const buttonsActive = new MessageActionRow().addComponents([
      button_back,
      button_next,
      button_backmain,
    ]);

    const buttonsDisabled = new MessageActionRow().addComponents([
      button_back_disabled,
      button_next_disabled,
      button_backmain_disabled,
    ]);
    channel
      .send({ embed: embeds[0], components: buttonsActive })
      .then((msg) => {
        const collector = msg.createButtonCollector(
          (button) => userID === userID,
          {
            time: time,
          }
        );

        let currentPage = 0;

        collector.on("collect", (button) => {
          button.defer();

          if (button.clicker.user.id == userID) {
            if (button.id == "back") {
              button.defer(true);
              if (currentPage !== 0) {
                --currentPage;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              } else {
                currentPage = embeds.length - 1;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              }
            } else if (button.id == "next") {
              button.defer(true);
              if (currentPage < embeds.length - 1) {
                currentPage++;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              } else {
                currentPage = 0;
                msg.edit({
                  embed: embeds[currentPage],
                  components: buttonsActive,
                });
              }
            } else if (button.id == "backmain") {
              button.defer(true);
              msg.edit({ embed: embeds[0], components: buttonsActive });
            }
          }
        });
        collector.on("end", (collected) => {
          if (msg) {
            msg.edit({
              embed: embeds[currentPage],
              components: buttonsDisabled,
            });
          }
          console.log("discord-epagination => Ended Collector");
        });
        collector.on("error", (e) => console.log(e));
      });
  }
}

module.exports = createAdvancedSlider;
