let defaultOptions = {
    blur: true,
    dark: true,
}

/**
 *
 * @param leftCurtain
 * @param rightCurtain
 * @param iframe
 */
function openCurtainsSlightly(leftCurtain, rightCurtain, iframe) {
    leftCurtain.classList.remove('closed');
    rightCurtain.classList.remove('closed');

    leftCurtain.classList.add('slightly-opened');
    rightCurtain.classList.add('slightly-opened');

    if (defaultOptions.blur) {
        iframe.classList.remove('blur');
    }

    return iframe;
}

/**
 *
 * @param leftCurtain
 * @param rightCurtain
 * @param overlay
 * @param iframe
 */
function openCurtains(leftCurtain, rightCurtain, overlay, iframe) {
    leftCurtain.classList.remove('slightly-opened');
    rightCurtain.classList.remove('slightly-opened');

    leftCurtain.classList.add('opened');
    rightCurtain.classList.add('opened');

    if (defaultOptions.blur) {
        iframe.classList.remove('blur');
    }

    overlay.classList.add('not-clickable');

    return iframe;
}

/**
 *
 * @param leftCurtain
 * @param rightCurtain
 * @param overlay
 * @param iframe
 */
function closeCurtains(leftCurtain, rightCurtain, overlay, iframe) {
    leftCurtain.classList.remove('slightly-opened', 'opened');
    rightCurtain.classList.remove('slightly-opened', 'opened');
    overlay.classList.remove('not-clickable');

    leftCurtain.classList.add('closed');
    rightCurtain.classList.add('closed');

    if (defaultOptions.blur) {
        iframe.classList.add('blur');
    }

    return iframe;
}

/**
 *
 * @param leftCurtain
 * @param rightCurtain
 * @param iframe
 */
function checkOptions(leftCurtain, rightCurtain, iframe) {
    if (defaultOptions.blur) {
        iframe.classList.add('blur');
    }
    if (defaultOptions.dark) {
        leftCurtain.classList.add('dark');
        rightCurtain.classList.add('dark');
    }

    return iframe;
}

/**
 *
 * @param iframe
 */
function initOverlay(iframe) {
    const iframeContainer = document.createElement('div'),
        iframeOverlay = document.createElement('div'),
        leftCurtain = document.createElement('div'),
        rightCurtain = document.createElement('div');

    iframeContainer.className = 'io-iframe-scrolling-overlay-container';
    iframeOverlay.className = 'io-iframe-scrolling-overlay';
    leftCurtain.className = 'curtain-left closed';
    rightCurtain.className = 'curtain-right closed';

    iframe.parentNode.insertBefore(iframeContainer, iframe);
    iframeOverlay.append(leftCurtain, rightCurtain);
    iframeContainer.append(iframe, iframeOverlay);

    checkOptions(leftCurtain, rightCurtain, iframe);

    iframeContainer.addEventListener('mouseenter', function () {
        openCurtainsSlightly(leftCurtain, rightCurtain, iframe);
    });
    iframeContainer.addEventListener('mouseleave', function () {
        closeCurtains(leftCurtain, rightCurtain, iframeOverlay, iframe)
    });
    iframeOverlay.addEventListener('click', function () {
        openCurtains(leftCurtain, rightCurtain, iframeOverlay, iframe)
    });
}

/**
 *
 * @param sources
 * @param options
 */
function initIframeOverlays(sources, options = {}) {
    if (sources === null || sources.length === 0) return;

    defaultOptions = Object.assign(defaultOptions, options);

    let iframes = document.getElementsByTagName('iframe');

    Array.from(iframes).forEach(function (element) {
        sources.forEach(function (value) {
            const source = element.getAttribute('src');

            if (source.indexOf(value) !== -1) {
                initOverlay(element);
            }
        });
    });
}

module.exports = initIframeOverlays;
