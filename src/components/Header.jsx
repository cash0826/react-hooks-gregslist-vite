import Search from "./Search";

function Header( { onSearch, searchTerm }) {
  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search onSearch={onSearch} searchTerm={searchTerm}/>
    </header>
  );
}

export default Header;
