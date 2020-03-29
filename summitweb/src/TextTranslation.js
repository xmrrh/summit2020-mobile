import React from "react";

import Amplify from "@aws-amplify/core";

import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Post, PostStatus } from "./models";
import Predictions, {
  AmazonAIPredictionsProvider
} from "@aws-amplify/predictions";

Amplify.addPluggable(new AmazonAIPredictionsProvider());

const TextTranslation = props => {
  const { id, body } = props;

  function translate() {
    Predictions.convert({
      translateText: {
        source: {
          text: body
          // language : "es" // defaults configured on aws-exports.js
          // supported languages https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
        }
        // targetLanguage: "en"
      }
    })
      .then(result => {
        var str = JSON.stringify(result, null, 2);
        var obj = JSON.parse(str);

        update(id, obj.text);
      })
      .catch(err => console.log(JSON.stringify(err, null, 2)));
  }

  return (
    <div className="Text">
      <div>
        <button onClick={translate}>Translate</button>
      </div>
    </div>
  );
};

async function update(id, body) {
  try {
    const original = await DataStore.query(Post, id);

    await DataStore.save(
      Post.copyOf(original, updated => {
        updated.body = body;
        updated.status =
          updated.status === PostStatus.ACTIVE
            ? PostStatus.INACTIVE
            : PostStatus.ACTIVE;
      })
    );
    await DataStore.query(Post, Predicates.ALL);
  } catch (e) {
    console.log(e);
  }
}

export default TextTranslation;
