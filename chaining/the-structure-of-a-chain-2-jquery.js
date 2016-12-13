(function() {
    // Use a private class
    function _$(els) {
        this.elements = [];
        for (var i = 0, len = els.length; i < len; ++i) {
            var element = els[i];
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }
            this.elements.push(element);
        }
    }

    // Since all objects inherit from their prototype, you can take advantage of the reference to the instance object being returned and run each of the methods attached to the prototype as a chain.
    _$.prototype = {
        each: function(fn) {
            for (var i = 0, len = this.elements.length; i < len; ++i) {
                fn.call(this, this.elements[i]);
            }
            return this;
        },
        setStyle: function(prop, val) {
            this.each(function(el) {
               el.style[prop] = val; 
            });
            return this;
        },
        show: function() {
            var that = this;
            this.each(function(el) {
                that.setStyle('display', 'block');
            });
            return this;
        },
        addEvent: function(type, fn) {
            var add = function(el) {
                if (window.addEventListener) {
                    el.addEventListener(type, fn, false);
                } else if (window.attachEvent) {
                    el.attachEvent('on'+type, fn);
                }
            };
            this.each(function(el) {
                add(el);
            });
            return this;
        }
    };

    window.$ = function() {
        return new _$(arguments);
    };
})();

// If you examine the last line in each method of the class, you'll notice that they all end in return this . This passes on the object to the next method in the chain. With a chainable interface, the possibilities are limitless. You can now start writing code like this: 
$(window).addEvent('load', function() { 
    $('test-1', 'test-2')
    .show()
    .setStyle('color', 'red')
    .addEvent('click', function(e) { 
        $(this).setStyle('color', 'green'); 
    }); 
}); 
// This will attach an event to the window object's load event. Upon firing, the elements with the IDs of test-1 and test-2 will instantly be shown, and the text within them will be set to the color red. They will then have click event listeners attached to them, which on firing will set the text color to green. That's quite a bit packed into such a small amount of application code. 
// For those familiar with the jQuery JavaScript library, this interface is very similar. The anchor of the chain is the window object or an HTML element, and every operation is attached to that anchor. In the previous example, there are two chains: one that attaches the load event to the window object, and one that sets styles and attaches events to the elements with the IDs test-1 and test-2 . Almost any set of existing utilities can be adapted to chaining using this style. We cover this more in the next section.