import React from 'react';

export default function OnlineOrNot() {
  return (
    <>
      <label htmlFor="online_or_not">Online or In-Person:</label>
      <select
        id="online_or_not"
        name="online_or_not"
        aria-invalid="true"
        aria-describedby="error-msg"
      >
        <option>Online</option>
        <option>In-Person</option>
        <option>Either \ Both</option>
      </select>
    </>
  );
}
