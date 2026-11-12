export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-copyright">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
