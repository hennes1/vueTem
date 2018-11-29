function pageFit(doc, win, maxwidth, minwidth, font) {
    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            let clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= minwidth && clientWidth <= maxwidth) {
                docEl.style.fontSize = font * (clientWidth / maxwidth) + 'px';
            } else if (clientWidth > maxwidth) {
                docEl.style.fontSize = font + 'px';
            } else if (clientWidth < minwidth) {
                docEl.style.fontSize = font * (minwidth / maxwidth) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}

pageFit(document, window, 540, 320, 30);