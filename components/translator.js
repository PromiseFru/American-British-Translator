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
                text = text.replace(Aregex, `<span class="highlight">${britishSpellings[i]}</span>`);
            }
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
                text = text.replace(Aregex, `<span class="highlight">${firstLetter}${bodyLetters}</span>`);
            }
            if (BsearchText) {
                var firstLetter = americanSpellings[i].charAt(0).toUpperCase()
                var bodyLetters = americanSpellings[i].substr(1)
                text = text.replace(Bregex, `<span class="highlight">${firstLetter}${bodyLetters}</span> `);
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
            var change = AsearchText[0].replace(/\b\:\b/g, `<span class="highlight">.</span>`)
            splitText.splice(1, 0, change);
            text = splitText.join("")
        }

        if (BsearchText) {
            var splitText = text.split(/\b\d+\.\d+\b/g);
            var change = BsearchText[0].replace(/\b\.\b/g, `<span class="highlight">:</span>`)
            splitText.splice(1, 0, change);
            text = splitText.join("")
        }

        return text
    }

    translate(text) {
        var ATB = this.americanToBritish(text);
        var AO = this.americanOnly(text);
        var BO = this.britishOnly(text);
        var Ts = this.titles(text);
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
        if (Ts != text) {
            return Ts;
        }
        if (T != text) {
            return T;
        }

        return {
            error: "Everything looks good to me!"
        }
    }

}

var input = "Lunch is at 12:15 today"

console.log(new Translator().translate(input))

module.exports = Translator;