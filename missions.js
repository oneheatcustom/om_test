  (function () {
  var style = document.createElement("style");
  style.textContent = 
    '.smartico-mission-widget-headline {' +
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
    '.smartico-mission-slider {' +
     ' position: relative;' +
     ' width: 100%;' +
     ' padding-left: 8px;' +
     ' padding-right: 8px;' +
     ' @media (min-width: 768px) {' +
       ' padding: 0;' +
      '}' +
    '}' +
    '.smartico-missions-widget-container {' +
     ' display: flex;' +
     ' flex-direction: row;' +
     ' gap: 10px;' +
     ' height: 164px;' +
     ' overflow-x: auto;' +
     ' scroll-behavior: smooth;' +
    '}' +
    '.smartico-missions-widget-container::-webkit-scrollbar {' +
      'display: none;' +
    '}' +
    '.smartico-mission-widget-card {' +
      'flex: 0 0 auto;' +
      'position: relative;' +
      'display: flex;' +
      'flex-direction: column;' +
      'justify-content: center;' +
      'border-radius: 10px;' +
      'padding: 34px 20px 14px;' +
      'width: 164px;' +
      'height: 164px;' +
      'font-family: sans-serif;' +
      'text-align: center;' +
      'background-image: url(https://static4.smr.vc/70b3eeceb47052a0273eff-Missions_var2_sport.png);' +
      'color: white;' +
      'cursor: pointer;' +
      'background-size: contain;' +
      'background-repeat: no-repeat;' +
    '}' +
    '.smartico-mission-widget-title {' +
      'font-size: 16px;' +
      'height: 27px;' +
      'letter-spacing: 0.2px;' +
      'font-weight: bold;' +
      'margin: 0 0 8px;' +
      'text-align: left;' +
    '}' +
    '.smartico-mission-widget-img {' +
     ' width: 60px;' +
      'height: 60px;' +
     ' margin: 0 auto;' +
     ' background-size: contain;' +
     ' background-repeat: no-repeat;' +
    '}' +
    '.smartico-mission-widget-reward {' +
      'position: absolute;' +
      'top: 7.2px;' +
      'left: 8px;' +
      'background: #51F0FF;' +
      'width: 105px;' +
      'height: 16px;' +
      'color: #1E1E1E;' +
      'font-size: 8px;' +
      'text-align: center;' +
      'font-weight: bold;' +
      'padding: 3px 0;' +
      'margin: 0;' +
      'clip-path: polygon(0px 0%, 93% 0%, 100% 100%, 0% 100%, 0% 10px);' +
   ' }' +
    '.smartico-mission-progress-wrapper {' +
      'display: flex;' +
      'align-items: center;' +
      'gap: 6px;' +
      'margin-top: 6px;' +
    '}' +
    '.smartico-mission-progressline {' +
      'height: 6px;' +
      'background-color: #0D3443;' +
      'border-radius: 9px;' +
      'overflow: hidden;' +
      'flex-grow: 1;' +
    '}' +
    '.smartico-mission-progress--indicator {' +
      'height: 100%;' +
      'background-color: #51F0FF;' +
      'border-radius: 9px;' +
      'transition: width 0.3s ease;' +
    '}' +
    '.smartico-mission-progress--text {' +
      'font-size: 8px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.2px;' +
      'color: #fff;' +
    '}' +
    '.smartico-mission-widget-timer {' +
      'position: absolute;' +
      'text-align: right;' +
      'font-size: 7px;' +
      'color: #FFF;' +
      'top: 10px;' +
      'right: 8px;' +
   '}' +
   ' .smartico-mission-slider-arrow {' +
     ' position: absolute;' +
     ' top: 50%;' +
      'transform: translateY(-50%);' +
     ' background: transparent;' +
     ' border: none;' +
     ' border-radius: 50%;' +
     ' width: 8.9px;' +
     ' height: 14.91px;' +
     ' cursor: pointer;' +
     ' z-index: 2;' +
    '}' +
    '.smartico-mission-slider-arrow.left {' +
     ' background-image: url(https://static4.smr.vc/5820dfe9acadd8db7f8da9-arrow-left.png);' +
      'background-size: contain;' +
      'background-repeat: no-repeat;' +
      'background-position: center;' +
      'left: 15px;' +
      '@media (min-width: 768px) {' +
        'left: 5px;' +
      '}' +
    '}' +
    '.smartico-mission-slider-arrow.right {' +
     ' background-image: url(https://static4.smr.vc/591f4016bb35dcb4db3dd7-arrow-right.png);' +
     'background-size: contain;' +
     'background-repeat: no-repeat;' +
      'background-position: center;' +
      'right: 15px;' +
      ' @media (min-width: 768px) {' +
        'right: 5px;' +
      '}' +
    '}'
  ;
  document.head.appendChild(style);

  function createMissionWidget(mission) {
    var card = document.createElement("div");
    card.className = "smartico-mission-widget-card";
    card.onclick = function () {
      if (window._smartico && window._smartico.dp) {
        window._smartico.dp("dp:gf_missions&id=" + mission.id + "&hide_main=true");
      }
    };

    if (mission.active_till_ts) {
      card.appendChild(createTimer(mission.active_till_ts));
    }

    var reward = document.createElement("div");
    reward.className = "smartico-mission-widget-reward";
    reward.textContent = mission.reward + " reward";

    if (mission.reward.length === 18) {
      reward.style.fontSize = "9px";
      reward.style.padding = "2px 8px";
    } else if (mission.reward.length > 17) {
      reward.style.fontSize = "6px";
      reward.style.padding = "1px 8px";
    }

    var title = document.createElement("h2");
    title.className = "smartico-mission-widget-title";
    title.textContent = mission.name;

    if (mission.name.length > 15) {
      title.style.fontSize = "14px";
    }

    var image = document.createElement("div");
    image.className = "smartico-mission-widget-img";
    image.style.backgroundImage = "url(" + mission.image + ")";

    card.appendChild(reward);
    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(createProgress(mission));

    return card;
  }

  function createProgress(mission) {
    var wrapper = document.createElement("div");
    wrapper.className = "smartico-mission-progress-wrapper";

    var barWrapper = document.createElement("div");
    barWrapper.className = "smartico-mission-progressline";

    var indicator = document.createElement("div");
    indicator.className = "smartico-mission-progress--indicator";

    var percent = 0;
    var text = "";

    if (typeof mission.progress === "number" && mission.progress > 0) {
      percent = Math.min(mission.progress, 100);
      text = Math.round(percent) + "%";
    } else if (mission.tasks.length) {
      var task = mission.tasks[0];
      var actual = (task.execution_count_actual !== undefined && task.execution_count_actual !== null)
  ? task.execution_count_actual
  : 0;

      var expected = task.execution_count_expected || 1;
      percent = Math.min((actual / expected) * 100, 100);
      text = actual + "/" + expected + " actions";
    } else {
      text = "0%";
    }

    indicator.style.width = percent + "%";
    barWrapper.appendChild(indicator);
    wrapper.appendChild(barWrapper);

    var label = document.createElement("div");
    label.textContent = text;
    label.className = "smartico-mission-progress--text";
    wrapper.appendChild(label);

    return wrapper;
  }

  function createTimer(endTimestamp) {
    var timer = document.createElement("div");
    timer.className = "smartico-mission-widget-timer";

    function tick () {
      var diff = endTimestamp - Date.now();
      if (diff <= 0) {
        timer.textContent = "Expired";
        return;
      }
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      timer.textContent = h + " : " + m + " : " + s + "s";
      setTimeout(tick, 1000);
    };

    tick();
    return timer;
  }

  function scrollSlider(dir) {
    var container = document.querySelector(".smartico-missions-widget-container");
    if (!container) return;
    var res = dir === "left" ? -180 : 180;
    container.scrollBy({ left: res, behavior: "smooth" });
  };

  function renderMissions(missions) {
    var target = document.querySelector('[data-id="0842be16-ad77-4e4e-a5d4-aa9cd461ec14"]');
    if (!target) {
      console.warn("❗Element with data-id not found");
      return;
    }

    var headline = document.createElement("h2");
    headline.textContent = "Missions";
    headline.className = "smartico-mission-widget-headline";

    var wrapper = document.createElement("div");
    wrapper.className = "smartico-mission-slider";

    var btnLeft = document.createElement("button");
    btnLeft.className = "smartico-mission-slider-arrow left";
    btnLeft.onclick = function() { scrollSlider("left")};

    var btnRight = document.createElement("button");
    btnRight.className = "smartico-mission-slider-arrow right";
    btnRight.onclick = function() { scrollSlider("right")};

    var container = document.createElement("div");
    container.className = "smartico-missions-widget-container";

    for (var i = 0; i < missions.length; i++) {
      container.appendChild(createMissionWidget(missions[i]));
    }

    wrapper.appendChild(container);
    wrapper.appendChild(btnLeft);
    wrapper.appendChild(btnRight);

    target.parentNode.insertBefore(wrapper, target.nextSibling);
    target.parentNode.insertBefore(headline, target.nextSibling);
  }

    function initMissions() {
      if (!window._smartico || !window._smartico.api || !window._smartico.api.getMissions) {
        console.warn("Smartico missions API not found");
        return;
      }
      var result = window._smartico.api.getMissions();
      if (typeof result.then === "function") {
        result.then(function(missions) {
          var visible = [];
          for (var i = 0; i < missions.length; i++) {
            var m = missions[i];
            if ([1, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14].indexOf(m.availability_status) === -1) {
              visible.push(m);
            }
          }
          
          visible.sort(function(a, b) {
            return (a.position || 0) - (b.position || 0);
          });
          
          renderMissions(visible);
        });
      } else {
        console.warn("Missions result is not a Promise");
      }
    }
  
    initMissions();
})();
