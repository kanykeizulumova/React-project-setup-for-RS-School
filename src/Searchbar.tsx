import React from 'react';
import './App.css';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearchClick: () => void;
  onHandleClick: () => void;
}

class SearchBar extends React.Component<SearchBarProps> {
  render() {
    const { value, onChange, onSearchClick, onHandleClick } = this.props;
    return (
      <div className="search-bar">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearchClick();
            }
          }}
          placeholder="Type name..."
        />
        <button type="button" onClick={onSearchClick}>
          Search
        </button>

        {value !== '' && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              onHandleClick();
            }}
          >
            Reset
          </button>
        )}
      </div>
    );
  }
}

export default SearchBar;
