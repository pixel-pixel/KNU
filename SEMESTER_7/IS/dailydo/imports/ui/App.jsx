import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react'
import { Note } from './Note';

const saveNote = (text) => Meteor.call('notes.save', text)

export const App = () => {
  return (
    <div>
      <Note saveNote={saveNote} />
    </div>
  )
};
