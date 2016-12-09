// The second technique is a little stricter. All classes explicitly declare which interfaces they implement, and these declarations can be checked by objects wanting to interact with these classes. The interfaces themselves are still just comments, but you can now check an attribute to see what interfaces a class says it implements:

/* 
interface Composit {
    function add(child);
    function remove(child);
    function getChild(index);
} 

interface FormItem {
    function save();
}
*/

var CompositeForm = function (id, method, action) {
    this.implementsInterfaces = ['Composite', 'FormItem'];
    // ...
};

// Implement the Composite interface.
CompositeForm.prototype.add = function(child) {
    // ...
};
CompositeForm.prototype.remove = function(child) {
    // ...
};
CompositeForm.prototype.getChild = function(index) {
    // ...
};

// Implement the FormItem interface.
CompositeForm.prototype.save = function() {
    // ...
};

// The implements function, which checks to see if an object declares that it implements the required interfaces.
function implements(object) {
    for (var i = 1; i < arguments.length; i++) { 
        // Looping through all arguments after the first one. 
        var interfaceName = arguments[i]; 
        var interfaceFound = false; 
        for (var j = 0; j < object.implementsInterfaces.length; j++) { 
            // TODO: == or ===
            if (object.implementsInterfaces[j] == interfaceName) { 
                interfaceFound = true; 
                break; 
            } 
        } 
        if (!interfaceFound) {
            // An interface was not found.
            return false; 
        }
    }
    // All interfaces were found.
    return true; 
}

function addForm(formInstance) {
    if (!implements(formInstance, 'Composite', 'FormItem')) {
        throw new Error('Object does not implement a required interface.');
    }
    // ...
}

// There are several benefits to this approach. You are documenting what interfaces a class implements. You will see errors if a class does not declare that it supports a required interface. You can enforce that other programmers declare these interfaces through the use of these errors.
// The main drawback to this approach is that you are not ensuring that the class really does implement this interface. You only know if it says it implements it. It is very easy to create a class that declares it implements an interface and then forget to add a required method. All checks will pass, but the method will not be there, potentially causing problems in your code. It is also added work to explicitly declare the interfaces a class supports.