var SingletonTester = (function() {
    // options: an object containing configuration options for the singleton
    // e.g var options = { name: 'test', pointX: 5 };
    function Singleton(options) {
        // Set options to the options supplied
        // or an empty object if none are provided
        options = options || {};

        // set some properties for out singleton
        this.name = 'SingletonTester';
        this.pointX = options.pointX || 6;
        this.pointY = options.pointY || 10;
    }

    // instance holder
    var instance;

    // an emulation of static variables and methods
    var _static = {
        name: 'SingletonTester',

        // Method for getting an instance. It returns a singleton instance of a singleton object
        getInstance: function(options) {
            if (instance === undefined) {
                instance = new Singleton(options);
            }

            return instance;
        }
    };

    return _static;
})();

var singletonTestA = SingletonTester.getInstance({
    pointX: 5
});
var singletonTestB = SingletonTester.getInstance({
    pointX: 5
});

console.log(singletonTestA.pointX);
console.log(singletonTestB.pointX);