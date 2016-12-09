function Duck() {
    // Dynamically add functions to this object
    this.quack = function () { alert('Quaaaaaack!'); };
    this.feathers = function () { alert('The duck has white and gray feathers.'); };
}

function Person() {
    // Dynamically add functions to this object
    this.quack = function () { alert('The person imitates a duck.'); };
    this.feathers = function () { alert('The person takes a feather from the ground and shows it.'); };
    this.name = function () { alert('John Smith'); };
}

function inTheForest(object) {
    // Check that the .quack() function exists
    if (object.quack && typeof (object.quack) == 'function')
        object.quack();
    // Check that the .feathers() function exists
    if (object.feathers && typeof (object.feathers) == 'function')
        object.feathers();
}

function game() {
    var donald = new Duck();
    var john = new Person();
    inTheForest(donald);
    inTheForest(john);
}

// Execute upon page load
game();