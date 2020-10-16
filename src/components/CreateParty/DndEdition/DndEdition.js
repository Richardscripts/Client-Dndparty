import React from 'react';

export default function DndEdtion() {
  return (
    <>
      <label htmlFor="dnd_edition">Dungeons &amp; Dragons Edition:</label>
      <select
        id="dnd_edition"
        name="dnd_edition"
        aria-invalid="true"
        aria-describedby="error-msg"
      >
        <option>5th Edition</option>
        <option>4th Edition</option>
        <option>3rd Edition</option>
        <option>2nd Edition</option>
        <option>1st Edition</option>
      </select>
    </>
  );
}
