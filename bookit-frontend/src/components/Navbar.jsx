function Navbar({ search, setSearch, onSearch }) {
  return (
    <nav className="w-full bg-white px-8 py-3 flex items-center shadow-sm">
      <div className="w-48 flex items-center">
        <img src="https://i.imgur.com/9Pg8Ouv.png" alt="Highway Delite Logo" className="h-8 mr-2" />
        <span className="font-bold text-xs">highway<br/>delite</span>
      </div>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search experiences"
          className="w-80 rounded bg-neutral-100 px-4 py-2 outline-none text-sm border border-neutral-200 focus:border-yellow-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && onSearch) onSearch(); }}
        />
      </div>
      <div className="w-48 flex justify-end">
        <button
          className="bg-yellow-400 hover:bg-yellow-300 transition text-black rounded px-4 py-2 text-sm font-medium"
          onClick={onSearch}
        >Search</button>
      </div>
    </nav>
  );
}

export default Navbar;
