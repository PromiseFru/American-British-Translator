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
            var AsearchText = text.match(Aregex);

            if (AsearchText) {
                text = text.replace(Aregex, `<span class="highlight">${britishSpellings[i]}</span>`);
            }

        }

        return text;
    }

    britishToAmerican(text) {
        // get all american and british spellings and put in array
        var americanSpellings = Object.keys(americanToBritishSpelling);
        var britishSpellings = Object.values(americanToBritishSpelling);

        // search text for any matching words or sentences in dic
        for (var i = 0; i < americanSpellings.length; i++) {
            var Bregex = new RegExp(`\\b${britishSpellings[i]}\\b`, "gi")
            var BsearchText = text.match(Bregex);

            if (BsearchText) {
                text = text.replace(Bregex, `<span class="highlight">${americanSpellings[i]}</span>`);
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
                text = text.replace(regex, `<span class="highlight">${britishSpellings[i]}</span>`);
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
                text = text.replace(regex, `<span class="highlight">${americanSpellings[i]}</span>`);
            }

        }

        return text;
    }

    americanToBritishTitles(text) {
        var americanSpellings = Object.keys(americanToBritishTitles);
        var britishSpellings = Object.values(americanToBritishTitles);

        // search text for any matching words or sentences in dic
        for (var i = 0; i < britishSpellings.length; i++) {
            var Aregex = new RegExp(`\\b${britishSpellings[i]}\\.`, "gi")
            var AsearchText = text.match(Aregex);

            if (AsearchText) {
                var firstLetter = britishSpellings[i].charAt(0).toUpperCase()
                var bodyLetters = britishSpellings[i].substr(1)
                text = text.replace(Aregex, `<span class="highlight">${firstLetter}${bodyLetters}</span>`);
            }

        }

        return text;
    }

    britishToAmericanTitles(text) {
        var americanSpellings = Object.keys(americanToBritishTitles);
        var britishSpellings = Object.values(americanToBritishTitles);

        // search text for any matching words or sentences in dic
        for (var i = 0; i < britishSpellings.length; i++) {
            var Bregex = new RegExp(`\\b${britishSpellings[i]}\\s`, "gi")
            var BsearchText = text.match(Bregex);

            if (BsearchText) {
                var firstLetter = americanSpellings[i].charAt(0).toUpperCase()
                var bodyLetters = americanSpellings[i].substr(1)
                text = text.replace(Bregex, `<span class="highlight">${firstLetter}${bodyLetters}</span> `);
            }

        }

        return text;
    }

    americanToBritishTime(text) {
        var Aregex = /\b\d+\:\d+\b/g
        var AsearchText = text.match(Aregex);

        if (AsearchText) {
            var splitText = text.split(/\b\d+\:\d+\b/g);
            var change = AsearchText[0].replace(/\b\:\b/g, `.`)
            splitText.splice(1, 0, `<span class="highlight">${change}</span>`);
            text = splitText.join("")
        }

        return text
    }

    britishToAmericanTime(text) {
        var Bregex = /\b\d+\.\d+\b/g
        var BsearchText = text.match(Bregex);

        if (BsearchText) {
            var splitText = text.split(/\b\d+\.\d+\b/g);
            var change = AsearchText[0].replace(/\b\:\b/g, `:`)
            splitText.splice(1, 0, `<span class="highlight">${change}</span>`);
            text = splitText.join("")
        }

        return text
    }

    americanTranslation(text) {
        var ATB = this.americanToBritish(text);
        var AO = this.americanOnly(text);
        var ATBT = this.americanToBritishTitles(text);
        var AT = this.americanToBritishTime(text);

        if (ATB != text) {
            return ATB;
        }
        if (AO != text) {
            return AO;
        }
        if (ATBT != text) {
            return ATBT;
        }
        if (AT != text) {
            return AT;
        }

        return {
            error: "Everything looks good to me!"
        }
    }

    britishTranslation(text) {
        var BTA = this.britishToAmerican(text);
        var BO = this.britishOnly(text);
        var BTAT = this.britishToAmericanTitles(text);
        var BT = this.britishToAmericanTime(text);

        if (BTA != text) {
            return BTA;
        }
        if (BO != text) {
            return BO;
        }
        if (BTAT != text) {
            return BTAT;
        }
        if (BT != text) {
            return BT;
        }

        return {
            error: "Everything looks good to me!"
        }
    }

}

// var input = "Lunch is at 12:15 today.";
// console.log(new Translator().americanToBritishTime(input))

module.exports = Translator;