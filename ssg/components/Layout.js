import Header from './Header';

export default function Layout({ children, searchQuery, onSearchChange, cartCount }) {
  return (
    <div className="layout">
      <Header searchQuery={searchQuery} onSearchChange={onSearchChange} cartCount={cartCount} />
      <main className="main-content">{children}</main>
      <footer className="footer"><p>© 2024 ProductVault — SSG Version</p></footer>
    </div>
  );
}
