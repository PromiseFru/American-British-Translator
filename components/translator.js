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

    americanOnly(text){
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

}

var input = "Can you toss this in the trashcan for me?"

console.log(new Translator().americanOnly(input))

module.exports = Translator;