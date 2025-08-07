(() => {
    window.vipDepositPopup = {
        openModal: function () {
        if (document.querySelector('[data-id="modulor-bottom-sheet"]')) {
            return;
        }

        const suffix = getStyleSuffix();
        if (!suffix) {
            return;
        }

        var key = 'exp2277_closed';
        var TS_KEY = 'exp2277_ts';

          function setTS(ts) {
           localStorage.setItem(TS_KEY, String(ts));
         }

        injectCloseButtonStyles();

        const el = document.createElement("div");
        el.setAttribute("data-id", "modulor-bottom-sheet");
        el.setAttribute("data-test-id", "custom-popup-withraw");
        el.setAttribute("data-component-name", "modulor-bottom-sheet");
        el.className = `modulor_bottom-sheet__bottom-sheet-wrapper__${suffix}`;

        el.innerHTML = `
            <div class="modulor_bottom-sheet__bottom-sheet__${suffix} modulor_bottom-sheet__expanded__${suffix} modulor_bottom-sheet__open__${suffix}" style="max-height: 812px;">
            <div class="modulor_bottom-sheet__container__${suffix}" style="max-height: 812px;">
                <span class="modulor_bottom-sheet__swiper__${suffix}" data-testid="modulor-bottom-sheet-swiper"></span>
                <div data-testid="modulor-bottom-sheet-header" class="modulor_bottom-sheet__header__${suffix} modulor_bottom-sheet__with-image__${suffix} modulor_bottom-sheet__hero__${suffix}" style="background-image: url(content/uploads/Frame_1948761616_629824ff05.png);">
                <div>
                    <div data-testid="modulor-navigation-bar" data-id="modulor-navigation-bar" data-component-name="modulor-navigation-bar" class="modulor_navigation-bar__transparent__${suffix}">
                    <div data-component-name="modulor-navigation-bar-layout" class="modulor_navigation-bar__layout__${suffix}" style="grid-template-columns: minmax(min-content, 1fr) auto minmax(min-content, 1fr);">
                        <div class="modulor_navigation-bar__left__${suffix}" data-testid="modulor-navigation-bar-left-container" data-component-name="modulor-navigation-bar-left-container"></div>
                        <div class="modulor_navigation-bar__center__${suffix}" data-testid="modulor-navigation-bar-center-container" data-component-name="modulor-navigation-bar-center-container">
                        <h1 data-testid="modulor-typography" data-id="modulor-typography" data-component-name="modulor-typography" class="modulor_typography__tag__${suffix} title-2-semibold modulor_navigation-bar__title__${suffix}"></h1>
                        <span data-testid="modulor-typography" data-id="modulor-typography" data-component-name="modulor-typography" class="modulor_typography__tag__${suffix} caption-1-regular modulor_navigation-bar__description__${suffix}"></span>
                        </div>
                        <div class="modulor_navigation-bar__right__${suffix}" data-testid="modulor-navigation-bar-right-container" data-component-name="modulor-navigation-bar-right-container">
                        <button data-testid="modulor-icon" data-component-name="modulor-icon" data-id="modulor-icon" type="button" id="modal-close-btn" class="modulor_icon__container__${suffix} modulor_icon__clickable__${suffix}" style="width: 24px; height: 24px;">
                            <span class="modulor_icon__icon__${suffix}" data-testid="modulor-icon-close" data-test-id="custom-modulor-icon-close" style="font-size: xx-large;cursor: pointer;">×</span>
                            <span class="modulor_icon__counter__${suffix}"></span>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="modulor_bottom-sheet__content__${suffix}" data-testid="modulor-bottom-sheet-content" style="padding-bottom: 88px;max-height: 698px;">
                <span data-testid="modulor-bottom-sheet-title" data-id="modulor-bottom-sheet-title" data-component-name="modulor-typography" class="modulor_typography__tag__${suffix} large-title-semibold modulor_bottom-sheet__title__${suffix}">Boost it +15% 💥via Crypto!</span>
                <span data-testid="modulor-bottom-sheet-description" data-id="modulor-bottom-sheet-description" data-component-name="modulor-typography" class="modulor_typography__tag__${suffix} body-regular modulor_bottom-sheet__description__${suffix}">Deposit more than ₹5K? Do it with crypto 🪙 to get +15% to your Live Casino transfer!
☄️ Max Bonus = ₹60K ☄️</span>
                </div>
            </div>
            <div data-testid="modulor-bottom-sheet-buttons" class="modulor_bottom-sheet__button-docked__${suffix} modulor_bottom-sheet__vertical__${suffix}">
                <button type="button"
            id="vip_bonus_accept"
            data-id="wihraf_vustom_link"
            data-testid="modulor-button-button"
            class="modulor_button__button__${suffix} modulor_button__primary__${suffix} modulor_button__regular__${suffix}">
    <div class="modulor_button__animation-wrap__${suffix}">
        <span class="modulor_button__text-wrap__${suffix}">
        <span data-testid="modulor-button-label-text"
                data-id="modulor-button-label-text"
                data-component-name="modulor-typography"
                class="modulor_typography__tag__${suffix} body-semibold">Go Crypto</span>
        </span>
    </div>
    </button>
            </div>
            </div>
            <div class="modulor_bottom-sheet__shadow__${suffix}" data-testid="modulor-bottom-sheet-shadow" data-test-id="custom-modulor-bottom-sheet-shadow"></div>
        `;

        document.body.appendChild(el);

        el.querySelector("#modal-close-btn")?.addEventListener("click", () => {

             var prev = localStorage.getItem(key);
             var closedCount = prev ? parseInt(prev, 10) : 0;
             closedCount += 1;
             localStorage.setItem(key, closedCount);
             setTS( Date.now())

            window.analytics.push({
                schema: 'iglu:com.growe/gtm_custom_event/jsonschema/1-0-0',
                data: {
                event_category: "temporary_event",
                event_action: "custom_vip_bonus_close",
                }
            })
            el.remove();
        });

    el.querySelector("#vip_bonus_accept")?.addEventListener("click", () => {
        if (window._smartico && typeof window._smartico.action === "function") {

        window._smartico.action("custom_marketing_vip_action");

        window.analytics.push({
            schema: 'iglu:com.growe/gtm_custom_event/jsonschema/1-0-0',
            data: {
                event_category: "temporary_event",
                event_action: "custom_vip_bonus_accept",
                }
            })
              localStorage.setItem(key, 0);
              setTS( Date.now())

        setTimeout(() => {
            el.remove();
        }, 500);
        }
    });

    window.analytics.push({
                schema: 'iglu:com.growe/gtm_custom_event/jsonschema/1-0-0',
                data: {
                event_category: "temporary_event",
                event_action: "custom_vip_bonus_view",
                }
            })

        }
    };

    function injectCloseButtonStyles() {
        const style = document.createElement("style");
        style.innerHTML = `
        #modal-close-btn {
            background: none;
            border: none;
            font-size: 30px;
            color: white;
            cursor: pointer;
        }

        @media (min-width: 1000px) {
            #modal-close-btn {
            color: black;
            z-index: 100;
            }
        }
        `;
        document.head.appendChild(style);
    }


        function getStyleSuffix() {
            try {
                if (typeof window.__modulor_css_versions__ !== "undefined") {
                const version = Object.keys(window.__modulor_css_versions__)[0];
                if (version) return version.replaceAll(".", "_");
                }
                
                 const el = document.querySelector('span[class^="modulor_icon__icon__"]');
                 const match = el?.className.match(/[0-9][0-9-]*_[0-9_]*[0-9]/);
                 if (match) return match[0];
            } catch (err) {
                return null;
            }
            }
    })();
