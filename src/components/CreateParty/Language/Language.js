import React from 'react';

export default function Language() {
  return (
    <>
      <label htmlFor="language">(Primary) Language:</label>
      <select
        id="language"
        name="language"
        aria-invalid="true"
        aria-describedby="error-msg"
      >
        <option>Catalan</option>
        <option>Chinese Simplified & Traditional</option>
        <option>Czech</option>
        <option>Dansk (Danish)</option>
        <option>Deutsch (German)</option>
        <option>English (US)</option>
        <option>English (UK)</option>
        <option>Espanol (Spanish)</option>
        <option>Euskara (Basque)</option>
        <option>Francais (French)</option>
        <option>Greek</option>
        <option>Hebrew</option>
        <option>Italian</option>
        <option>Japanese</option>
        <option>Latvian</option>
        <option>Magyar (Hungarian)</option>
        <option>Nederlands (Dutch)</option>
        <option>Norwegian (Norsk)</option>
        <option>Polish</option>
        <option>Portuguese (Brasilian)</option>
        <option>Russian</option>
        <option>Slovak</option>
        <option>Suomi (Finnish)</option>
        <option>Swedish</option>
        <option>Turkish</option>
      </select>
    </>
  );
}
