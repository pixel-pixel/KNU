import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { NotesCollection } from '../db/NotesCollection'
import Morphy from 'phpmorphy';

import steamer from 'ukrstemmer'

const morphy = new Morphy('ua', {
  storage: Morphy.STORAGE_MEM,
  predict_by_suffix: true,
  predict_by_db: true,
  graminfo_as_text: true,
  use_ancodes_cache: false,
  resolve_ancodes: Morphy.RESOLVE_ANCODES_AS_TEXT,
});

Meteor.methods({
  'notes.save'(text) {
    check(text, String)

    morfyTree(text)

    NotesCollection.insert({
      text,
      createdAt: new Date,
      userId: 123,
    })
  },
})

function morfyTree(text) {
  const sentenses = text.split('.').filter(Boolean)
  const words = sentenses.map(s => s.split(' ').filter(Boolean))
  const cleanedWords = words.map(wa => wa.map(w => w.replace(',', '').replace('"', '').replace("'", '')))
  console.log({ cleanedWords });

  const res = cleanedWords.map(array => array.map(word => steamer(word)).filter(Boolean))

  console.log(JSON.stringify(res, null, 2));
}
