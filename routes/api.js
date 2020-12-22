'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let text = req.body.text
      let locale = req.body.locale

      if (!text && !locale) {
        return res.json({
          error: 'Required field(s) missing'
        })
      }

      if (!text) {
        return res.json({
          error: 'No text to translate'
        })
      }

      if (locale == 'american-to-british') {
        let translation = translator.americanTranslation(text);

        if (translation.error) {
          return res.json({
            translation: translation.error
          })
        }

        return res.json({
          text: text,
          translation: translation
        })
      } else
      if (locale == 'british-to-american') {
        let translation = translator.britishTranslation(text);

        if (translation.error) {
          return res.json({
            translation: translation.error
          })
        }

        return res.json({
          text: text,
          translation: translation
        })
      } else {
        return res.json({
          error: 'Invalid value for locale field'
        })
      }

    });
};