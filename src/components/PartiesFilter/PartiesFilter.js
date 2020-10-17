import React from 'react';

export default function PartiesFilter(props) {
  return (
    <div className="PartiesFilter">
      <label htmlFor="parties_filter">Filter Parties: </label>
      <select id="parties_filter" name="parties_filter">
        <option>View All</option>
        <option>Incomplete Parties</option>
        <option>Completed Parties</option>
      </select>
      <label htmlFor="filter_language">Language: </label>
      <select id="filter_language" name="filter_language">
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
      <label htmlFor="filter_edition">D&amp;D Edition: </label>
      <select id="filter_edition" name="filter_edition">
        <option>5th Edition</option>
        <option>4th Edition</option>
        <option>3rd Edition</option>
        <option>2nd Edition</option>
        <option>1st Edition</option>
      </select>
    </div>
  );
}
