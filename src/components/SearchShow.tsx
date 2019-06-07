import React, { useState } from "react";

type FormElem = React.FormEvent<HTMLFormElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const SearchShow = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChange = (e: ChangeEvent): void => {
    setSearchInput(e.target.value)
  };

  const handleSubmit = (e: FormElem): void => {
      e.preventDefault()
    console.log(searchInput);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search tv shows.."
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchShow;
