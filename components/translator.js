const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    convert(text, dic) {
        if (dic[text]) {
            return dic[text];
        }
        return false
    }

    highlighter(text) {
        return `<span class="highlight">${text}</span>`
    }

    americanToBritish(text) {
        var oldWords = text.split(' ');
        var newWords

        oldWords.forEach((ele, i) => {
            var AO = this.convert(ele, americanOnly)
            var ATBS = this.convert(ele, americanToBritishSpelling)
            var ATBT = this.convert(ele, americanToBritishTitles)

            if (AO) oldWords.splice(i, 1, this.highlighter(AO))
            if (ATBS) oldWords.splice(i, 1, this.highlighter(ATBS))
            if (ATBT) oldWords.splice(i, 1, this.highlighter(ATBT))
        })

        newWords = oldWords.join(' ');

        return newWords
    }
}

var input = "this bangs is a test acclimate accessorize"

console.log(new Translator().americanToBritish(input));

module.exports = Translator;