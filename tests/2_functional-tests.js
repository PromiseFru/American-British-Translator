const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
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
});