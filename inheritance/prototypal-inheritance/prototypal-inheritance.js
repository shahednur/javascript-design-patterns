// Person Prototype Object 
var Person = {
    name: 'default name',
    getName: function() {
        return this.name;
    }
};

var reader = clone(Person);
console.log(reader.getName());
reader.name = 'John Smith';
console.log(reader.getName());

// Author Prototype Object
var Author = clone(Person);
// Default value
Author.books = [];
Author.getBooks = function() {
    return this.books;
}