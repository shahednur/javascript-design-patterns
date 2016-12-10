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