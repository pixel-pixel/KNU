import React, { useState } from "react"

export const Note = ({ saveNote  }) => {
  const [text, setText] = useState('')

  const onChange = (e) => setText(e.target.value)


  return (
    <div>
      <input 
        type="text"
        value={text}
        onChange={onChange}
      />

      <button 
        onClick={() => saveNote(text)}
      >
        Save
      </button>
    </div>
  )
}