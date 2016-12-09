var Book = function (isbn, title, author) {
    if (!this.checkIsbn(isbn)) {
        throw new Error('Book: Invalid ISBN.');
    }

    this.isbn = isbn;
    this.title = title || 'No title specified';
    this.author = author || 'No author specified';
}

Book.prototype = {
    checkIsbn: function(isbn) {
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
    },

    display: function () {
        // ...
        // The display method depends entirely on having an accurate ISBN. Without this, you can't fetch the image or provide a link to buy the book. Because of this, an error is thrown in the constructor if an ISBN is not given.
    }
}