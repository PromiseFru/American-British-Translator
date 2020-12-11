const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
var translate

suite('Unit Tests', () => {

    suiteSetup('setup', (done) => {
        translate = new Translator()
        done();
    })

    suite('Translate American to British', () => {

        test('Mangoes are my favorite fruit', (done) => {
            var text = "Mangoes are my favorite fruit";
            var translation = "Mangoes are my favourite fruit"

            //done();
        });

        test('I ate yogurt for breakfast', (done) => {
            var text = "I ate yogurt for breakfast";
            var translation = "I ate yoghurt for breakfast"

            //done();
        });

        test("We had a party at my friend's condo", (done) => {
            var text = "We had a party at my friend's condo";
            var translation = "We had a party at my friend's flat"

            //done();
        });

        test("Can you toss this in the trashcan for me?", (done) => {
            var text = "Can you toss this in the trashcan for me?";
            var translation = "Can you toss this in the bin for me?"

            //done();
        });
    })

});