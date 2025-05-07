    (function () {
  var fontLink = document.createElement("link");
  fontLink.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@800&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);

  var style = document.createElement("style");
  style.textContent = 
    '.smartico-miniGame-slider-headline {' +
      'font-size: 18px;' +
      'color: #292621;' +
      'margin: 0;' +
      'text-align: left;' +
      'width: 100%;' +
      'padding-left: 8px;' +
      '@media (min-width: 768px) {' +
        'padding: 0;' +
      '}' +
    '}' +
    '.smartico-miniGame-slider-wrapp {' +
     ' position: relative;' +
     ' width: 100%;' +
     ' padding-left: 8px;' +
      'padding-right: 8px;' +
      '@media (min-width: 768px) {' +
       ' padding: 0;' +
      '}' +
    '}' +
    '.smartico-slider-miniGame-widget {' +
      'display: flex;' +
      'flex-direction: row;' +
      'gap: 10px;' +
      'height: 164px;' +
      'overflow-x: auto;' +
      'scroll-behavior: smooth;' +
    '}' +
    '.smartico-slider-miniGame-widget::-webkit-scrollbar {' +
      'display: none;' +
    '}' +
    '.smartico-miniGame-slider-arrow {' +
      'position: absolute;' +
      'top: 50%;' +
      'transform: translateY(-50%);' +
      'background: transparent;' +
      'border: none;' +
      'border-radius: 50%;' +
      'width: 8.9px;' +
      'height: 14.91px;' +
      'cursor: pointer;' +
      'z-index: 2;' +
    '}' +
    '.smartico-miniGame-slider-arrow.left {'+
      'background-image: url(https://static4.smr.vc/5820dfe9acadd8db7f8da9-arrow-left.png);'+
      'background-size: contain;'+
      'background-repeat: no-repeat;'+
      'background-position: center;'+
      'left: 15px;'+
      '@media (min-width: 768px) {'+
        'left: 5px;'+
      '}'+
    '}'+
    '.smartico-miniGame-slider-arrow.right {'+
      'background-image: url(https://static4.smr.vc/591f4016bb35dcb4db3dd7-arrow-right.png);'+
      'background-size: contain;'+
      'background-repeat: no-repeat;'+
      'background-position: center;'+
      'right: 15px;'+
       '@media (min-width: 768px) {'+
        'right: 5px;'+
      '}'+
    '}'+
    '.smartico-miniGame-widget-wrapp {'+
      'flex: 0 0 auto;'+
      'display: flex;'+
      'flex-direction: column;'+
      'align-items: center;'+
      'justify-content: center;'+
      'border-radius: 10px;'+
      'padding: 20px 4px 14px;'+
      'margin: 0;'+
      'width: 164px;'+
      'height: 164px;'+
      'font-family: sans-serif;'+
      'text-align: center;'+
      'background-image: url(https://static4.smr.vc/ea39850851b276b0177d25-mysterybox.png);'+
      'background-size: contain;'+
      'background-repeat: no-repeat;'+
      'background-position: center;'+
      'box-sizing: border-box;'+
      'cursor: pointer;'+
    '}'+
    '.smartico-miniGame-widget-title {'+
      'color: #fff;'+
      'font-size: 15px;'+
      'min-height: 31px;'+
      'letter-spacing: 0.2px;'+
      'font-weight: bold;'+
      'margin: 0 0 4px;'+
    '}'+
    '.smartico-miniGame-widget-pic {'+
      'width: 70px;'+
      'height: 70px;'+
      'margin: 0 auto;'+
    '}'+
    '.smartico-miniGame-widget-coinButton {'+
      'display: flex;'+
     ' align-items: center;'+
     ' width: 78px;'+
      'padding: 1px 16px;'+
     ' margin: 8px auto 0;'+
     ' border-radius: 17.5px;'+
      'border-bottom: 2px solid #BEBCBA;'+
     ' border: none;'+
     ' cursor: pointer;'+
     ' background-color: #fff;'+
      'font-family: "Orbitron", sans-serif;'+
      'color: #02233F;'+
     ' font-size: 14px;'+
      'font-weight: 800;'+
    '}'+
    '.smartico-miniGame-widget-coinButton:hover {'+
      'opacity: .8;'+
    '}'+
    '.smartico-miniGame-widget-coinButton img {'+
      'margin-right: 6px;'+
    '}';
  document.head.appendChild(style);

  function canBuy(game, userPoints) {
    if (game.next_available_spin_ts && game.next_available_spin_ts > Date.now()) return false;
    if (game.buyin_cost_points > userPoints) return false;
    // if (game.no_attempts_message || game.over_limit_message) return false;
    return true;
  };

  function createGameWidget(game, userPoints) {
    var card = document.createElement("div");
    card.className = "smartico-miniGame-widget-wrapp";
    card.addEventListener("click", function() {
      if (window._smartico && window._smartico.dp) {
        window._smartico.dp("dp:gf_saw&id=" + game.id + "&standalone=true");
      }
    });

    var title = document.createElement("h2");
    title.className = "smartico-miniGame-widget-title";
    title.textContent = game.name;

    if (game.name.length > 15) {
      title.style.fontSize = "14px";
    }

    var image = document.createElement("div");
    image.className = "smartico-miniGame-widget-pic";
    image.style.backgroundImage = "url(" + game.thumbnail + ")";
    image.style.backgroundSize = "88%";
    image.style.backgroundRepeat = "no-repeat";
    image.style.backgroundPosition = "center";

    var button = document.createElement("div");
    button.className = "smartico-miniGame-widget-coinButton";

    var icon = document.createElement("img");
    icon.src = "https://libs.smartico.ai/gf/images/v3_growe_india/png/star.png";
    icon.alt = "icon";
    icon.style.width = "24px";
    icon.style.height = "24px";

    var priceText = document.createElement("span");
    priceText.textContent = game.buyin_cost_points;

    button.appendChild(icon);
    button.appendChild(priceText);
    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(button);

    return card;
  };

  function scrollSlider(dir) {
    var container = document.querySelector(".smartico-slider-miniGame-widget");
    if (!container) return;
    var res = dir === "left" ? -180 : 180;
    container.scrollBy({ left: res, behavior: "smooth" });
  };

  function renderGames(games, userPoints) {
    var target = document.querySelector('[data-id="8ffa2577-00d7-4ecb-be47-41317fe00519"]');
    if (!target) return console.warn("❗Element with data-id not found");

    var headline = document.createElement("h2");
    headline.textContent = "Mini games";
    headline.className = "smartico-miniGame-slider-headline";

    var wrapper = document.createElement("div");
    wrapper.className = "smartico-miniGame-slider-wrapp";

    var btnLeft = document.createElement("button");
    btnLeft.className = "smartico-miniGame-slider-arrow left";
    btnLeft.onclick = function() { scrollSlider("left"); };

    var btnRight = document.createElement("button");
    btnRight.className = "smartico-miniGame-slider-arrow right";
    btnRight.onclick = function() { scrollSlider("right"); };

    var container = document.createElement("div");
    container.className = "smartico-slider-miniGame-widget";
    
    for (var i = 0; i < games.length; i++) {
      var widget = createGameWidget(games[i], userPoints);
      container.appendChild(widget);
    }

    wrapper.appendChild(btnLeft);
    wrapper.appendChild(btnRight);
    wrapper.appendChild(container);

    target.parentNode.insertBefore(wrapper, target.nextSibling);
    target.parentNode.insertBefore(headline, target.nextSibling);
  };

function initMiniGames() {
    if (!window._smartico.api) {
      console.warn("Smartico API not found");
      return;
    }
  
    Promise.all([
      window._smartico.api.getMiniGames(),
      window._smartico.api.getUserProfile()
    ])
      .then(function (results) {
        var games = results[0];
        var user = results[1];
  
        if (!games || !games.length) {
          console.warn("No mini games available");
          return;
        }
  
        if (!user) {
          console.warn("User profile not found");
          return;
        }
  
        var userPoints = user.ach_points_balance || 0;
        renderGames(games, userPoints);
      })
      .catch(function (err) {
        console.error("Error loading data:", err);
      });
  }
  
  
  window.myMiniGames = {
    init: initMiniGames
  };
  
  initMiniGames();
})();
