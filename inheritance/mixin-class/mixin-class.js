// Class Person
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function() {
    return this.name;
};

// Class Author
function Author(name, books) {
    // Call the superclass's constructor in the scope of this
    Person.call(this, name);

    this.books = books;
}

// Create a Student.prototype object that inherits from Person.prototype.
// Note: A common error here is to use "new Person()" to create the Student.prototype. That's incorrect for several reasons, not least that we don't have anything to give Person for the "firstName" argument. The correct place to call Person is above, where we call it from Student.
Author.prototype = Object.create(Person.prototype);

// Set the constructor attribute to Author
Author.prototype.constructor = Author;

Author.prototype.getBooks = function() {
    return this.books;
}

var author = []; 
author[0] = new Author('Dustin Diaz', ['JavaScript Design Patterns']); 
author[1] = new Author('Ross Harmes', ['JavaScript Design Patterns']); 
console.log(author[1].getName()); 
console.log(author[1].getBooks());



// you create a class that contains your general-purpose methods, and then use it to augment other classes.
// These classes with the general-purpose methods are called mixin classes. They are usually not instantiated or called directly. They exist only to pass on their methods to other classes.

var Mixin = function() {

}

Mixin.prototype = {
    serialize: function() {
        var output = [];
        for (key in this) {
            output.push(key + ': ' + this[key]);
        }
        return output.join(', ');
    }
}

// This sort of method could potentially be useful in many different types of classes, but it doesn't make sense to have each of these classes inherit from Mixin.
// Similarly, duplicating the code in each class doesn't make much sense either.
// The best approach is use the augment function to add this method to each class that needs it:
// We can improve on this slightly. Let's say you have a mixin class containing several methods but only want to copy one or two of them over to another class. This new version looks for optional arguments, and if they exist, only copies methods with names matching those arguments:
// Augment function, improved
function augment(receivingClass, givingClass) {
    // Only give certain methods.
    if (arguments[2]) {
        for (var i = 2, len = arguments.length; i < len; i++) {
            if (!receivingClass.prototype[arguments[i]]) {
                receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
            }
        }
    } else {
        // Give all methods.
        for (methodName in givingClass.prototype) {
            if (!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    }
}
// You can now write augment(Author, Mixin, 'serialize'); to only augment Author with the single serialize method. More method names can be added if you want to augment with more than one method.
augment(Author, Mixin, 'serialize');

var author = new Author('Ross Harmes', ['JavaScript Design Patterns']);
var serializedString = author.serialize();

