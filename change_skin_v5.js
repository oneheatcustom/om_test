	(function (d, r, b, h, s) {
		h = d.getElementsByTagName('head')[0];
		s = d.createElement('script');
		s.onload = b;
		s.src = r;
		h.appendChild(s);
	})
	(document, 'https://libs.smartico.ai/smartico.js', () => {
		_smartico.init("b9c2f276-be35-4b8c-873a-3237486db424-4", { brand_key: "16b5e781" });
                console.log("smartikoinit");
		_smartico.on('props_change', (props) => {
			    if (props.ach_level_current === 15) {
                _smartico.setSkin('v3_growe_india_15');
                }
		});
	});
