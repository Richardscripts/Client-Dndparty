import React from 'react';

export default function PartiesFilter(props) {
  return (
    <div className="PartiesFilter">
      <label htmlFor="parties_filter">Filter Parties: </label>
      <select id="parties_filter" name="parties_filter">
        <option>View All</option>
        <option>D&D Edition</option>
        <option>Language</option>
        <option>Online or In-person</option>
        <option>Completed Parties</option>
      </select>
    </div>
  );
}
