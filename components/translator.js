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
            var Aregex = new RegExp(`\\b${americanSpellings[i]}\\b`, "gi")
            var Bregex = new RegExp(`\\b${britishSpellings[i]}\\b`, "gi")
            var AsearchText = text.match(Aregex);
            var BsearchText = text.match(Bregex);

            if (AsearchText) {
                text = text.replace(Aregex, britishSpellings[i]);
            }
            if (BsearchText) {
                text = text.replace(Bregex, americanSpellings[i]);
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
        for (var i = 0; i < britishSpellings.length; i++) {
            var Aregex = new RegExp(`\\b${britishSpellings[i]}\\.`, "gi")
            var Bregex = new RegExp(`\\b${britishSpellings[i]}\\s`, "gi")
            var AsearchText = text.match(Aregex);
            var BsearchText = text.match(Bregex);

            if (AsearchText) {
                var firstLetter = britishSpellings[i].charAt(0).toUpperCase()
                var bodyLetters = britishSpellings[i].substr(1)
                text = text.replace(Aregex, firstLetter + bodyLetters);
            }
            if (BsearchText) {
                var firstLetter = americanSpellings[i].charAt(0).toUpperCase()
                var bodyLetters = americanSpellings[i].substr(1)
                text = text.replace(Bregex, firstLetter + bodyLetters + " ");
            }

        }

        return text;
    }

    time(text) {
        var Aregex = /\b\d+\:\d+\b/g
        var AsearchText = text.match(Aregex);
        var Bregex = /\b\d+\.\d+\b/g
        var BsearchText = text.match(Bregex);

        if (AsearchText) {
            var splitText = text.split(/\b\d+\:\d+\b/g);
            var change = AsearchText[0].replace(/\b\:\b/g, ".")
            splitText.splice(1, 0, change);
            text = splitText.join("")
        }

        if (BsearchText) {
            var splitText = text.split(/\b\d+\.\d+\b/g);
            var change = BsearchText[0].replace(/\b\.\b/g, ":")
            splitText.splice(1, 0, change);
            text = splitText.join("")
        }

        return text
    }

    translate(text) {
        var ATB = this.americanToBritish(text);
        var AO = this.americanOnly(text);
        var BO = this.britishOnly(text);
        var ATBT = this.americanToBritishTitles(text);
        var BTAT = this.britishToAmericanTitles(text);
        var T = this.time(text);

        if (ATB != text) {
            return ATB;
        }
        if (AO != text) {
            return AO;
        }
        if (BO != text) {
            return BO;
        }
        if (ATBT != text) {
            return ATBT;
        }
        if (BTAT != text) {
            return BTAT;
        }
        if (T != text) {
            return T;
        }

        return {
            error: "Everything looks good to me!"
        }
    }

}

var input = "Dr Grosh will see you now"

console.log(new Translator().titles(input))

module.exports = Translator;