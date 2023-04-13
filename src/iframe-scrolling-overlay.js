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
    const iframeOverlay = document.createElement('div'),
        leftCurtain = document.createElement('div'),
        rightCurtain = document.createElement('div'),
        iframeContainer = iframe.parentNode;

    iframeOverlay.className = 'io-iframe-scrolling-overlay';
    leftCurtain.className = 'curtain-left closed';
    rightCurtain.className = 'curtain-right closed';

    iframeContainer.append(iframeOverlay);
    iframeOverlay.append(leftCurtain, rightCurtain);

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
 * @param iframe
 */
function initContainer(iframe) {
    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'io-iframe-scrolling-overlay-container';
    iframe.parentNode.insertBefore(iframeContainer, iframe);
    iframeContainer.append(iframe);
}

/**
 *
 * @param sources
 * @param options
 */
export function initIframeOverlays(sources, options = {}) {
    if (sources === null || sources.length === 0) return;
    let iframes = document.getElementsByTagName('iframe');

    Array.from(iframes).forEach(function (element) {
        initContainer(element);
        defaultOptions = Object.assign(defaultOptions, options);

        element.addEventListener('load', function () {
            const source = element.getAttribute('src');
            sources.forEach(function (value) {
                if (source.includes(value)) {
                    initOverlay(element);
                }
            });
        });
    });
}
