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
                var translation = `Mangoes are my <span class="highlight">favourite</span> fruit`

                var result = translate.americanToBritish(text);

                assert.equal(result, translation)

                done();
            });

            test('I ate yogurt for breakfast', (done) => {
                var text = "I ate yogurt for breakfast";
                var translation = `I ate <span class="highlight">yoghurt</span> for breakfast`

                var result = translate.americanToBritish(text);

                assert.equal(result, translation)

                done();
            });

        })

        suite('american only func', () => {

            test("We had a party at my friend's condo", (done) => {
                var text = "We had a party at my friend's condo";
                var translation = `We had a party at my friend's <span class="highlight">flat</span>`

                var result = translate.americanOnly(text);

                assert.equal(result, translation)

                done();
            });

            test("Can you toss this in the trashcan for me?", (done) => {
                var text = "Can you toss this in the trashcan for me?";
                var translation = `Can you toss this in the <span class="highlight">bin</span> for me?`

                var result = translate.americanOnly(text);

                assert.equal(result, translation)

                done();
            });


            test("The parking lot was full", (done) => {
                var text = "The parking lot was full";
                var translation = `The <span class="highlight">car park</span> was full`

                var result = translate.americanOnly(text);

                assert.equal(result, translation)

                done();
            });

            test("Like a high tech Rube Goldberg machine", (done) => {
                var text = "Like a high tech Rube Goldberg machine";
                var translation = `Like a high tech <span class="highlight">Heath Robinson device</span>`

                var result = translate.americanOnly(text);

                assert.equal(result, translation)

                done();
            });

            test("To play hooky means to skip class or work", (done) => {
                var text = "To play hooky means to skip class or work";
                var translation = `To <span class="highlight">bunk off</span> means to skip class or work`

                var result = translate.americanOnly(text);

                assert.equal(result, translation)

                done();
            });

        })

        suite('american to british titles func', () => {

            test("No Mr. Bond, I expect you to die", (done) => {
                var text = "No Mr. Bond, I expect you to die";
                var translation = `No <span class="highlight">Mr</span> Bond, I expect you to die`

                var result = translate.titles(text);

                assert.equal(result, translation)

                done();
            });

            test("Dr. Grosh will see you now", (done) => {
                var text = "Dr. Grosh will see you now";
                var translation = `<span class="highlight">Dr</span> Grosh will see you now`

                var result = translate.titles(text);

                assert.equal(result, translation)

                done();
            });

        })

        suite('american to british time', () => {

            test("Lunch is at 12:15 today", (done) => {
                var text = "Lunch is at 12:15 today";
                var translation = `Lunch is at 12<span class="highlight">.</span>15 today`

                var result = translate.time(text);

                assert.equal(result, translation)

                done();
            });

        })

    })

    suite("Translate British to American", () => {

        suite("British only Func", () => {

            test("We watched the footie match for a while", (done) => {
                var text = "We watched the footie match for a while";
                var translation = `We watched the <span class="highlight">soccer</span> match for a while`

                var result = translate.britishOnly(text);

                assert.equal(result, translation)

                done();
            });

            test("Paracetamol takes up to an hour to work", (done) => {
                var text = "Paracetamol takes up to an hour to work";
                var translation = `<span class="highlight">Tylenol</span> takes up to an hour to work`

                var result = translate.britishOnly(text);

                assert.equal(result, translation)

                done();
            });

            test("I spent the bank holiday at the funfair", (done) => {
                var text = "I spent the bank holiday at the funfair";
                var translation = `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>`

                var result = translate.britishOnly(text);

                assert.equal(result, translation)

                done();
            });

            test("I had a bicky then went to the chippy", (done) => {
                var text = "I had a bicky then went to the chippy";
                var translation = `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>`

                var result = translate.britishOnly(text);

                assert.equal(result, translation)

                done();
            });

            test("I've just got bits and bobs in my bum bag", (done) => {
                var text = "I've just got bits and bobs in my bum bag";
                var translation = `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>`

                var result = translate.britishOnly(text);

                assert.equal(result, translation)

                done();
            });

            test("The car boot sale at Boxted Airfield was called off", (done) => {
                var text = "The car boot sale at Boxted Airfield was called off";
                var translation = `The <span class="highlight">swap meet</span> at Boxted Airfield was called off`

                var result = translate.britishOnly(text);

                assert.equal(result, translation)

                done();
            });

        })

        suite("British to American Func", () => {

            test("First, caramelise the onions", (done) => {
                var text = "First, caramelise the onions";
                var translation = `First, <span class="highlight">caramelize</span> the onions`

                var result = translate.americanToBritish(text);

                assert.equal(result, translation)

                done();
            });

        })

        suite("British to American titles", () => {

            test("Have you met Mrs Kalyani?", (done) => {
                var text = "Have you met Mrs Kalyani?";
                var translation = `Have you met <span class="highlight">Mrs.</span> Kalyani?`

                var result = translate.titles(text);

                assert.equal(result, translation)

                done();
            });

            test("Prof Joyner of King's College, London", (done) => {
                var text = "Prof Joyner of King's College, London";
                var translation = `<span class="highlight">Prof.</span> Joyner of King's College, London`

                var result = translate.titles(text);

                assert.equal(result, translation)

                done();
            });

        })

        suite("British to American time", () => {

            test("Tea time is usually around 4 or 4.30", (done) => {
                var text = "Tea time is usually around 4 or 4.30";
                var translation = `Tea time is usually around 4 or 4<span class="highlight">:</span>30`

                var result = translate.time(text);

                assert.equal(result, translation)

                done();
            });

        })

        suite("British to american highlight", () => {

            test("We watched the footie match for a while", (done) => {

            })

            test("Paracetamol takes up to an hour to work", (done) => {
                
            })

        })

        suite("American to british highlight", () => {

            test("Mangoes are my favorite fruit", (done) => {

            })

            test("I ate yogurt for breakfast", (done) => {
                
            })

        })

    })

});