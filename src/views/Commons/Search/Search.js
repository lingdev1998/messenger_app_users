import React, { useState } from 'react'

const Search = props => {
  const [keySearch, setKeySearch] = useState('');

  const handleSearch = () => {
    props.handleSearch(keySearch);
  };

  const setKeyWord = (value) => {
    setKeySearch(value);
  }
  return (
    <div className="input-group mb-3">
      <input
        value={keySearch}
        onChange={e => setKeyWord(e.target.value)}
        type="search" className="form-control add_task_todo"
        placeholder="Search here..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }} />
      <div className="input-group-append">
        <button className="btn btn-primary btn-icon btn-msg-send" type="button" onClick={() => handleSearch()}><i className="fa fa-search" /></button>
      </div>
    </div>
  );
}

export default Search;
