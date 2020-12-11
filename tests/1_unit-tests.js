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

        suite('American to British Func', () => {

            test('Mangoes are my favorite fruit', (done) => {
                var text = "Mangoes are my favorite fruit";
                var translation = "Mangoes are my favourite fruit"

                var result = translate.americanToBritish(text);

                assert.equal(result, translation)

                done();
            });

            test('I ate yogurt for breakfast', (done) => {
                var text = "I ate yogurt for breakfast";
                var translation = "I ate yoghurt for breakfast"

                var result = translate.americanToBritish(text);

                assert.equal(result, translation)

                done();
            });

        })

        suite('american only func', () => {

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


            test("The parking lot was full", (done) => {
                var text = "The parking lot was full";
                var translation = "The car park was full"

                //done();
            });

            test("Like a high tech Rube Goldberg machine", (done) => {
                var text = "Like a high tech Rube Goldberg machine";
                var translation = "Like a high tech Heath Robinson device"

                //done();
            });

            test("To play hooky means to skip class or work", (done) => {
                var text = "To play hooky means to skip class or work";
                var translation = "To bunk off means to skip class or work"

                //done();
            });

        })

        suite('american to british titles func', () => {

            test("No Mr. Bond, I expect you to die", (done) => {
                var text = "No Mr. Bond, I expect you to die";
                var translation = "No Mr Bond, I expect you to die"

                //done();
            });

            test("Dr. Grosh will see you now", (done) => {
                var text = "Dr. Grosh will see you now";
                var translation = "Dr Grosh will see you now"

                //done();
            });

        })

        suite('american to british time', () => {

            test("Lunch is at 12:15 today", (done) => {
                var text = "Lunch is at 12:15 today";
                var translation = "Lunch is at 12.15 today"

                //done();
            });

        })

    })

});