// the dollar function, which usually returns an HTML element or a collection of HTML elements as shown here:
function $() {
    var elements = [];

    for (var i = 0, len = arguments.length; i < len; ++i) {
        var element = arguments[i];
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length === 1) {
            return element;
        }
        elements.push(element);
    }

    return elements;
}