function extend(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);

// Set the constructor attribute to subClass
subClass.prototype.constructor = subClass;
}