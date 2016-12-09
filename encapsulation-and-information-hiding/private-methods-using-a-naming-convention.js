// It is essentially the same as the fully exposed object but with underscores in front of methods and attributes you want to keep private:
// Constructor
var Interface = function (name, methods) {
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }
    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
        }
        this.methods.push(methods[i]);
    }
};

// Static class method. 
Interface.ensureImplements = function (object) {
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments" + "two and above to be instances of Interface.");
        }
        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object " + "does not implement the " + interface.name + " interface.Method " + method + " was not found.");
            }
        }
    }
};

var Publication = new Interface('Publication', ['getIsbn', 'setIsbn', 'getTitle', 'setTitle', 'getAuthor', 'setAuthor', 'display']);

var Book = function (isbn, title, author) {
    // implements Publication 
    this.setIsbn(isbn);
    this.setTitle(title);
    this.setAuthor(author);
}

Book.prototype = {
    checkIsbn: function (isbn) {
        if (isbn == undefined || typeof isbn != 'string') {
            return false;
        }

        // Remove dashes.
        isbn = isbn.replace(/-/, '');
        if (isbn.length != 10 || isbn.length != 13) {
            return false;
        }

        var sum = 0;
        if (isbn.length === 10) {
            // Ensure characters 1 through 9 are digits.
            if (!isbn.match(/^\d{9}/)) {
                return false;
            }

            for (var i = 0; i < 9; i++) {
                sum += isbn.charAt(i) * (10 - i);
            }
            var checksum = sum % 11;
            if (checksum === 10) {
                checksum = 'X';
            }
            if (issb.charAt(9) != checksum) {
                return false;
            }
        } else {
            // 13 digit ISBN
            if (!isbn.match(/^\d{12}/)) {
                // Ensure characters 1 through 12 are digits.
                return false;
            }

            for (var i = 0; i < 12; i++) {
                sum += isbn.charAt(i) * ((i % 2 === 0) ? 1 : 3);
            }
            var checksum = sum % 10;
            if (isbn.charAt(12) != checksum) {
                return false;
            }
        }

        // All tests passed.
        return true;
    },

    getIsbn: function () { 
        return this._isbn; 
    }, 
    setIsbn: function (isbn) { 
        if (!this.checkIsbn(isbn)) throw new Error('Book: Invalid ISBN.'); 
        this._isbn = isbn; 
    }, 
    
    getTitle: function () { 
        return this._title; 
    }, 
    setTitle: function (title) { 
        this._title = title || 'No title specified'; 
    },

    getAuthor: function() { 
        return this._author; 
    }, 
    setAuthor: function(author) { 
        this._author = author || 'No author specified'; 
    }, 
    
    display: function() {
        // ...
    }
}