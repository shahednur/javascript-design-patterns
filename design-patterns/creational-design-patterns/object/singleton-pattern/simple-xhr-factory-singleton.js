var SimpleXhrFactory = (function () {
    // The three branches
    var standard = {
        createXhrObject: function () {
            return new XMLHttpRequest();
        }
    };
    var activeXNew = {
        createXhrObject: function () {
            return new ActiveXObject('Msxml2.XMLHTTP');
        }
    };
    var activeXOld = {
        createXhrObject: function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    };

    // To assign the branch, try each method; return whatever doesn't fail
    var testObject;
    try {
        testObject = standard.createXhrObject();
        // Return this if no error was throw
        return standard;
    } catch (ex) {
        try {
            testObject = activeXNew.createXhrObject();
            // Return this if no error was throw
            return activeXNew;
        } catch (ex) {
            try {
                testObject = activeXOld.createXhrObject();
                // Return this if no error was throw
                return activeXOld;
            } catch (ex) {
                throw new Error('No XHR object found in this environment.');
            }
        }
    }
})();

var objXHR = SimpleXhrFactory.createXhrObject();