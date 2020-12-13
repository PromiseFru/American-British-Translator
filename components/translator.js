const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    americanToBritish(text) {
        // get all american and british spellings and put in array
        var americanSpellings = Object.keys(americanToBritishSpelling);
        var britishSpellings = Object.values(americanToBritishSpelling);

        // search text for any matching words or sentences in dic
        for (var i = 0; i < americanSpellings.length; i++) {
            var regex = new RegExp(`\\b${americanSpellings[i]}\\b`, "gi")
            var searchText = text.match(regex);

            if (searchText) {
                text = text.replace(regex, britishSpellings[i]);
            }

        }

        return text;
    }

    americanOnly(text) {
        var americanSpellings = Object.keys(americanOnly);
        var britishSpellings = Object.values(americanOnly);

        // search text for any matching words or sentences in dic
        for (var i = 0; i < americanSpellings.length; i++) {
            var regex = new RegExp(`\\b${americanSpellings[i]}\\b`, "gi")
            var searchText = text.match(regex);

            if (searchText) {
                text = text.replace(regex, britishSpellings[i]);
            }

        }

        return text;
    }

    britishOnly(text) {
        var britishSpellings = Object.keys(britishOnly);
        var americanSpellings = Object.values(britishOnly);

        // search text for any matching words or sentences in dic
        for (var i = 0; i < britishSpellings.length; i++) {
            var regex = new RegExp(`(?<!-)(\\b${britishSpellings[i]}\\b)`, "gi")
            var searchText = text.match(regex);

            if (searchText) {
                text = text.replace(regex, americanSpellings[i]);
            }

        }

        return text;
    }

    titles(text) {
        var americanSpellings = Object.keys(americanToBritishTitles);
        var britishSpellings = Object.values(americanToBritishTitles);

        // search text for any matching words or sentences in dic
        for (var i = 0; i < americanSpellings.length; i++) {
            var regex = new RegExp(`\\b${americanSpellings[i]}\.\\b`, "gi")
            var searchText = text.match(regex);

            if (searchText) {
                var firstLetter = britishSpellings[i].charAt(0).toUpperCase()
                var bodyLetters = britishSpellings[i].substr(1)
                text = text.replace(regex, firstLetter + bodyLetters + " ");
            }

        }

        return text;
    }

    time(text) {
        var regex = /\b\d+\:\d+\b/g
        var searchText = text.match(regex);

        if (searchText) {
            var splitText = text.split(/\b\d+\:\d+\b/g);
            var change = searchText[0].replace(/\b\:\b/g, ".")
            splitText.splice(1, 0, change);
            text = splitText.join("")
        }

        return text
    }

}

var input = "I had a bicky then went to the chippy"

console.log(new Translator().britishOnly(input))

module.exports = Translator;