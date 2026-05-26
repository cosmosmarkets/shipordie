import { copy } from "@/lib/copy";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="site-footer__nav" aria-label="Legal">
        <a href="#">{copy.footer.terms}</a>
        <a href="#">{copy.footer.privacy}</a>
      </nav>
      <p>{copy.footer.copyright}</p>
    </footer>
  );
}
