setTimeout(function () {
   var shareBetButtons = document.querySelectorAll(
              '[class*="ShareBetButton"]'
            );

            shareBetButtons.forEach(function (button) {
              var firstChild = button.firstElementChild;

              if (firstChild) {
                var textSpan = firstChild.querySelector(
                  "[data-testid='text-span']"
                );

                if (textSpan) {
                  return;
                }
                
                var firstSpan = firstChild.firstElementChild;
                firstSpan.style.width = "16px";
                firstSpan.style.height = "16px";
                var textNode = document.createTextNode("Share bet");
                var spacer = document.createElement("span");
                spacer.setAttribute("data-testid", "text-span");
                spacer.style.marginLeft = "8px";
                spacer.appendChild(textNode);
                firstChild.appendChild(spacer);

                firstChild.style.fontWeight = "600";
                firstChild.style.fontSize = "13px";
                firstChild.style.color = "#292621";
                firstChild.style.width = "107px";
                firstChild.style.height = "32px";
                firstChild.style.borderRadius = "16px";
                firstChild.style.backgroundColor = "#F3FA19";
                firstChild.style.color = "#292621";
                firstChild.style.display = "flex";
                firstChild.style.alignItems = "center";
                firstChild.style.justifyContent = "center";
                firstChild.style.marginBottom = "8px";
              }
            });
  }, 200)
