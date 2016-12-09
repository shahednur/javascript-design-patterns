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



// Patterns that rely on the interface
// The factory pattern : The specific objects that are created by a factory can change depending on the situation. In order to ensure that the objects created can be used interchangeably, interfaces are used. This means that a factory is guaranteed to produce an object that will implement the needed methods.
// The composite pattern : You really can't use this pattern without an interface. The most important idea behind the composite is that groups of objects can be treated the same as the constituent objects. This is accomplished by implementing the same interface. Without some form of duck typing or type checking, the composite loses much of its power.
// The decorator pattern : A decorator works by transparently wrapping another object. This is accomplished by implementing the exact same interface as the other object; from the outside, the decorator and the object it wraps look identical. We use the Interface class to ensure that any decorator objects created implement the needed methods.
// The command pattern : All command objects within your code will implement the same methods (which are usually named execute , run , or undo ). By using interfaces, you can create classes that can execute these commands without needing to know anything about them, other than the fact that they implement the correct interface. This allows you to create extremely modular and loosely coupled user interfaces and APIs.