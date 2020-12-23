const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite('All functional test', () => {
        test('Translation with text and locale fields: POST request to /api/translate', (done) => {
            let text = 'Mangoes are my favorite fruit.'
            let locale = 'american-to-british'
            let translation = 'Mangoes are my <span class="highlight">favourite</span> fruit.'

            chai.request(server)
                .post('/api/translate')
                .send({
                    text: text,
                    locale: locale
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.translation, translation)
                })

            done();
        })

        test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
            let text = 'Mangoes are my favorite fruit.'
            let locale = ''
            let error = 'Invalid value for locale field'

            chai.request(server)
                .post('/api/translate')
                .send({
                    text: text,
                    locale: locale
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, error)
                })

            done();
        })

        test('Translation with missing text field: POST request to /api/translate', (done) => {
            let text = 'Mangoes are my favorite fruit.'
            let locale = 'american-to-british'
            let error = 'Required field(s) missing'

            chai.request(server)
                .post('/api/translate')
                .send({
                    locale: locale
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, error)
                })

            done();
        })

        test('Translation with missing locale field: POST request to /api/translate', (done) => {
            let text = 'Mangoes are my favorite fruit.'
            let locale = 'american-to-british'
            let error = 'Required field(s) missing'

            chai.request(server)
                .post('/api/translate')
                .send({
                    text: text
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, error)
                })

            done();
        })

        test('Translation with empty text: POST request to /api/translate', (done) => {
            let text = ''
            let locale = 'american-to-british'
            let error = 'No text to translate'

            chai.request(server)
                .post('/api/translate')
                .send({
                    text: text,
                    locale: locale
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, error)
                })

            done();
        })

        test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
            let text = 'Mangoes are my favorite fruit.'
            let locale = 'british-to-american'
            let translation = 'Everything looks good to me!'

            chai.request(server)
                .post('/api/translate')
                .send({
                    text: text,
                    locale: locale
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.translation, translation)
                })

            done();
        })
    })
});