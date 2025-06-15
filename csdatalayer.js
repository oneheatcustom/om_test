(function (xhr) {
    var XHR = XMLHttpRequest.prototype;
    var open = XHR.open;
    var send = XHR.send;
    var setRequestHeader = XHR.setRequestHeader;

    XHR.open = function (method, url) {
        this._method = method;
        this._url = url;
        this._requestHeaders = {};
        this._startTime = (new Date()).toISOString();
        return open.apply(this, arguments);
    };

    XHR.setRequestHeader = function (header, value) {
        this._requestHeaders[header] = value;
        return setRequestHeader.apply(this, arguments);
    };

    XHR.send = function (postData) {
        this.addEventListener('load', function () {
            const url = this._url ? this._url.toLowerCase() : this._url;
            if (!url) return;
            if (!url.endsWith('/psp')) return;

            document.dispatchEvent(new CustomEvent('clickstreamDebugInj', {
                detail: {
                    body: postData,
                    url: url,
                },
            }));
        });
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);

function base64StringToJson(payload) {
    if (!payload) return null;
    try {
        return JSON.parse(atob(payload));
    } catch (e) {
        console.error('Failed to decode b64 string', payload, e);
    }
    return null;
}

function clickstreamTypeLog(typeOrSchema = '') {
    console.group(`%cClickstream event: %c${typeOrSchema}`, 'color: #0066FF', 'font-weight: bold');
}

function clickstreamDebug(payload) {
    if (!payload) return;
    try {
        const payloadSchema = payload.schema;

        if (payloadSchema === 'iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4') {
            (payload.data || []).forEach((event) => {
                const payloadDecoded = base64StringToJson(event.ue_px) || {};
                const ue = payloadDecoded.data || {};
                const cx = base64StringToJson(event.cx);

                switch (event.e) {
                    case 'ue': {
                        const match = /iglu:(.+)\/(.+)\/(.+)\/(.+)/g.exec(ue.schema || '');
                        if (match) {
                            const eventName = match[2] + '_' + match[4];
                            const eventNameClean = match[2]; //
                            clickstreamTypeLog(`${match[2]}/${match[4]}`);
                            console.info('Schema: %c' + ue.schema, 'font-weight: bold');
                            console.info('Payload %o', ue.data);
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({ event: eventNameClean, ue.data});

                        } else {
                            clickstreamTypeLog();
                        }
                        break;
                    }
                    case 'pv': {
                        clickstreamTypeLog('page_view');
                        console.info('URL: %s', event.url);
                        break;
                    }
                    default:
                        clickstreamTypeLog();
                        break;
                }

                console.info('Contexts', cx?.data || []);
                console.groupCollapsed('%cDetails', 'color: gray');
                console.info('%cEvent id:      ', 'font-weight: bold', event.eid);
                console.info('%cDomain user id:', 'font-weight: bold', event.duid);
                console.info('%cSession id:    ', 'font-weight: bold', event.sid);
                console.info('%cApplication id:', 'font-weight: bold', event.aid);
                console.groupEnd();

                console.groupCollapsed('%cOriginal event', 'color: gray');
                console.info(event);
                console.groupEnd();

                console.groupEnd();
            });
        }
    } catch (e) {
        console.error('Failed to log clickstream event', e, payload);
    }
}

function init() {
    window.addEventListener('message', (event) => {
        const data = event.data;
        if (data.type !== 'clickstreamDebug') return;
        clickstreamDebug(data.payload);
    });

    // injectScript();

    document.addEventListener('clickstreamDebugInj', (event) => {
        try {
            if (!event.detail) return;
            if (!event.detail.body) return;
            const data = JSON.parse(event.detail.body);
            clickstreamDebug(data);
        } catch (e) {
            console.error('Failed to deserialize clickstream event', e);
        }
    });
}

init();
