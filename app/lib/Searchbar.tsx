import '../ui/App.css';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearchClick: () => void;
  onReset: () => void;
}

const SearchBar = ({
  value,
  onChange,
  onSearchClick,
  onReset,
}: SearchBarProps) => (
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
          onReset();
        }}
      >
        Reset
      </button>
    )}
  </div>
);

export default SearchBar;
