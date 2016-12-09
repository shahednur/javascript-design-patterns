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

var Book = (function() { 
    // They have a distinct advantage over these other methods in that they are only stored in memory once. Since they are declared outside of the constructor, they do not have access to any of the private attributes, and as such, are not privileged; private methods can call private static methods, but not the other way around. A rule of thumb for deciding whether a private method should be static is to see whether it needs to access any of the instance data. If it does not need access, making the method static is more efficient (in terms of memory use) because only a copy is ever created.

    // Private static attributes. 
    var numOfBooks = 0; 

    // Private static method. 
    function checkIsbn(isbn) {
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
    } 
    // Return the constructor. 
    return function(newIsbn, newTitle, newAuthor) { 
        // implements Publication
        // Private attributes. 
        var isbn, title, author; 

        // Privileged methods. 
        this.getIsbn = function() { 
            return isbn; 
        }; 
        this.setIsbn = function(newIsbn) { 
            if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.'); 
            isbn = newIsbn; 
        }; 

        this.getTitle = function() { 
            return title; 
        }; 
        this.setTitle = function(newTitle) { 
            title = newTitle || 'No title specified'; 
        }; 
        
        this.getAuthor = function() { 
            return author; 
        }; 
        this.setAuthor = function(newAuthor) { 
            author = newAuthor || 'No author specified'; 
        }; 
        // Constructor code. 
        numOfBooks++; // Keep track of how many Books have been instantiated with the private static attribute. 
        if(numOfBooks > 50) throw new Error('Book: Only 50 instances of Book can be ' + 'created.'); 
        
        this.setIsbn(newIsbn); 
        this.setTitle(newTitle); 
        this.setAuthor(newAuthor); 
    } 
})(); 

// Public static method.
// Public static members are much easier to create. They are simply created directly off of the constructor, as with the previous method convertToTitleCase . This means you are essentially using the constructor as a namespace. 
Book.convertToTitleCase = function(inputString) {
    // ...
}; 

// Public, non-privileged methods. 
Book.prototype = { 
    display: function() { 
    // ... 
    } 
};