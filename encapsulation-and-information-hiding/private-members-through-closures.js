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


var Book = function(newIsbn, newTitle, newAuthor) {
    // implements Publication

    // Private attributes.
    var isbn, title, author;

    // Private method.
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

    // Privileged methods.
    this.getIsbn = function() {
        return isbn;
    };
    this.setIsbn = function(newIsbn) {
        if (!checkIsbn(newIsbn)) {
            throw new Error('Book: Invalid ISBN.');
        }
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
    this.setIsbn(newIsbn);
    this.setTitle(newTitle);
    this.setAuthor(newAuthor);
};

// Public, non-privileged methods.
Book.prototype = {
    display: function() {
        console.log('Display book detail...');
    }
};

var objNewBook = new Book('032157351X');
console.log(objNewBook);

// So how is this different from the other patterns we've covered so far? In the other Book examples, we always created and referred to the attributes using the this keyword. In this example, we declared these variables using var . That means they will only exist within the Book constructor. We also declare the checkIsbn function in the same way, making it a private method.
// Any method that needs to access these variables and functions need only be declared within Book . These are called privileged methods because they are public but have access to private attributes and methods. The this keyword is used in front of these privileged functions to make them publicly accessible. Because these methods are defined within the Book constructor's scope, they can access the private attributes. They are not referred to using this because they aren't public. All of the accessor and mutator methods have been changed to refer to the attributes directly, without this .
// Any public method that does not need direct access to private attributes can be declared normally in the Book.prototype . An example of one of these methods is display ; it doesn't need direct access to any of the private attributes because it can just call getIsbn or getTitle . It's a good idea to make a method privileged only if it needs direct access to the private members. Having too many privileged methods can cause memory problems because new copies of all privileged methods are created for each instance.
// 
// This pattern solves all of the problems with the other patterns, but it introduces a few drawbacks of its own. In the fully exposed object pattern, all methods are created off of the prototype, which means there is only one copy of each in memory, no matter how many instances you create. In this pattern, you create a new copy of every private and privileged method each time a new object is instantiated. This has the potential to use more memory than the other patterns, so it should only be used when you require true private members. This pattern is also hard to subclass. The new inherited class will not have access to any of the superclass's private attributes or methods. It is said that "inheritance breaks encapsulation" because in most languages, the subclass has access to all of the private attributes and methods of the superclass. In JavaScript, this is not the case. If you are creating a class that might be subclassed later, it is best to stick to one of the fully