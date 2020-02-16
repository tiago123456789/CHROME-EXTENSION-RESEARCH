function extractSelectedText() {
    try {
        if (window.ActiveXObject) {
            var c = document.selection.createRange();
            return c.htmlText;
        }

        var nNd = document.createElement("span");
        var w = getSelection().getRangeAt(0);
        w.surroundContents(nNd);
        return nNd.innerHTML;
    } catch (e) {
        if (window.ActiveXObject) {
            return document.selection.createRange();
        } else {
            return getSelection();
        }
    }
}

function isText(value) {
    const regex = /^<([a-z0-9])+/;
    return !regex.test(value);
}

function openNewTab(url) {
    const a = document.createElement("a");
    a.href = url;
    a.target = '_blank';
    a.click();
}

document.querySelector("body")
    .addEventListener("mousedown", function (event) {
        const isClickedRightButton = event.which == 3;
        if (!isClickedRightButton) {
            return false;
        }

        const selectedValue = extractSelectedText();
        if (isText(selectedValue)) {
            openNewTab(`http://google.com/search?q=${selectedValue}`);
        }
});