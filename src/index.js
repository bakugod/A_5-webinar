const name = $(".about-section__name");
const shareButton = $('button[data-role="share"]');
const container = $("div.cards");

function shareLink() {
  const textArea = $(`<textarea>${window.location.href}</textarea>`);

  textArea.css("position", () => "fixed");
  textArea.appendTo(document.body);
  textArea.focus();
  textArea.select();

  document.execCommand("copy");
  textArea.remove();
}

shareButton.click(shareLink);

const userName = "bakugod"; //Your Login on github

$.getJSON(`https://api.github.com/users/${userName}`, function(data) {
  name.text(data.login);
});

$.getJSON(
  `https://api.github.com/users/${userName}/repos?sort=updated`,
  function(data) {
    const template = info => {
      const card = $(`
        <article class="card col-3 mb-5 ml-4 mr-4">
            <div class="card__content">
                <span>${info.name}</span>
                <span>${info.description}</span>
                <span><b>Last update: </b>${moment(info.updated_at).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}</span>
            </div>
        </article>`);

      card.appendTo(container);
    };

    for (let i = 0; i < 6; i++) {
      template(data[i]);
    }
  }
);
