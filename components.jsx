// Shared chrome — Nav (multi-page aware) + Footer + brand bits

const { useEffect, useRef, useState, useMemo, useCallback } = React;

function StampLogo({ style }) {
  return (
    <svg style={style} viewBox="0 0 210 58.476" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 179.71 11.377 C 182.805 11.377 185.475 12.183 187.721 13.793 C 190.01 15.361 191.791 17.501 193.062 20.213 C 194.334 22.882 194.97 25.848 194.97 29.111 C 194.97 32.416 194.334 35.403 193.062 38.073 C 191.791 40.743 190.01 42.883 187.721 44.493 C 185.475 46.061 182.805 46.844 179.71 46.844 C 177.93 46.844 176.277 46.526 174.751 45.891 C 173.225 45.255 171.784 44.302 170.427 43.031 L 170.427 58.476 L 159.556 58.476 L 159.556 12.013 L 169.537 12.013 L 169.537 15.89 C 170.936 14.407 172.483 13.284 174.179 12.522 C 175.874 11.759 177.718 11.377 179.71 11.377 Z M 177.103 21.166 C 176.001 21.166 174.942 21.462 173.924 22.055 C 172.907 22.649 172.081 23.539 171.445 24.725 C 170.851 25.869 170.555 27.353 170.555 29.175 C 170.555 30.997 170.873 32.501 171.509 33.687 C 172.144 34.831 172.95 35.679 173.924 36.23 C 174.942 36.78 176.001 37.056 177.103 37.056 C 178.756 37.056 180.261 36.42 181.618 35.149 C 182.974 33.836 183.652 31.823 183.652 29.111 C 183.652 26.441 182.974 24.45 181.618 23.136 C 180.261 21.823 178.756 21.166 177.103 21.166 Z" fill="currentColor" fillRule="evenodd" />
      <path d="M 19.583 0 C 23.228 0 26.45 0.657 29.247 1.97 C 32.087 3.284 34.354 5.148 36.05 7.564 C 37.788 9.937 38.762 12.776 38.974 16.081 L 26.831 16.081 C 26.746 14.683 26.386 13.475 25.75 12.458 C 25.114 11.441 24.287 10.657 23.27 10.106 C 22.253 9.555 21.066 9.28 19.71 9.28 C 18.523 9.28 17.506 9.471 16.658 9.852 C 15.81 10.233 15.153 10.763 14.687 11.441 C 14.221 12.077 13.988 12.818 13.988 13.665 C 13.988 14.343 14.179 14.937 14.56 15.445 C 14.984 15.911 15.535 16.314 16.213 16.653 C 16.891 16.95 17.633 17.183 18.438 17.352 L 27.276 19.068 C 31.345 19.873 34.439 21.293 36.559 23.327 C 38.678 25.319 39.738 27.967 39.738 31.272 C 39.738 34.408 38.933 37.141 37.322 39.472 C 35.754 41.802 33.528 43.624 30.646 44.938 C 27.764 46.209 24.33 46.844 20.345 46.844 C 16.404 46.844 12.949 46.188 9.982 44.874 C 7.058 43.518 4.726 41.611 2.988 39.153 C 1.293 36.696 0.297 33.793 0 30.446 L 12.144 30.446 C 12.229 32.607 12.949 34.323 14.305 35.594 C 15.704 36.865 17.633 37.501 20.091 37.501 C 21.49 37.501 22.698 37.331 23.715 36.993 C 24.732 36.654 25.517 36.145 26.068 35.467 C 26.662 34.789 26.958 33.984 26.958 33.052 C 26.958 32.077 26.513 31.251 25.623 30.573 C 24.775 29.852 23.673 29.365 22.317 29.111 L 13.988 27.522 C 12.165 27.183 10.512 26.653 9.028 25.933 C 7.545 25.213 6.252 24.322 5.15 23.263 C 4.091 22.161 3.264 20.89 2.671 19.45 C 2.119 17.967 1.844 16.314 1.844 14.492 C 1.844 11.653 2.607 9.152 4.133 6.991 C 5.659 4.788 7.757 3.072 10.427 1.843 C 13.098 0.615 16.15 0 19.583 0 Z" fill="currentColor" fillRule="nonzero" />
      <path d="M 57.906 12.013 L 67.253 12.013 L 67.253 21.484 L 57.906 21.484 L 57.906 31.908 C 57.906 33.56 58.266 34.789 58.987 35.594 C 59.707 36.357 60.81 36.738 62.293 36.738 C 63.183 36.738 64.031 36.632 64.836 36.42 C 65.684 36.208 66.405 35.912 66.998 35.531 L 66.998 45.001 C 65.812 45.679 64.603 46.145 63.374 46.4 C 62.145 46.696 60.767 46.844 59.242 46.844 C 56.698 46.844 54.515 46.357 52.692 45.383 C 50.87 44.408 49.471 42.989 48.496 41.124 C 47.521 39.26 47.034 37.035 47.034 34.45 L 47.034 21.484 L 40.676 21.484 L 40.676 12.013 L 47.034 12.013 L 47.034 1.97 L 57.906 1.97 L 57.906 12.013 Z" fill="currentColor" fillRule="nonzero" />
      <path d="M 85.335 11.377 C 90.04 11.377 93.707 12.585 96.335 15.001 C 98.962 17.416 100.277 20.785 100.277 25.107 L 100.277 46.209 L 91.503 46.209 L 91.503 42.904 C 90.316 44.259 88.938 45.255 87.37 45.891 C 85.801 46.526 83.915 46.844 81.711 46.844 C 78.151 46.844 75.268 45.87 73.064 43.921 C 70.903 41.929 69.822 39.323 69.821 36.103 C 69.821 32.755 71.136 30.213 73.764 28.475 C 76.392 26.696 80.143 25.806 85.017 25.806 C 85.95 25.806 86.84 25.848 87.687 25.933 C 88.535 25.975 89.32 26.06 90.04 26.187 L 90.04 24.534 C 90.04 23.051 89.616 21.907 88.769 21.102 C 87.963 20.297 86.797 19.895 85.272 19.895 C 83.788 19.895 82.601 20.297 81.711 21.102 C 80.863 21.907 80.333 23.051 80.121 24.534 L 70.33 24.534 C 70.542 21.865 71.305 19.555 72.619 17.606 C 73.933 15.615 75.671 14.089 77.832 13.03 C 80.036 11.928 82.537 11.377 85.335 11.377 Z M 85.717 32.225 C 83.894 32.225 82.495 32.522 81.52 33.115 C 80.545 33.708 80.058 34.598 80.058 35.785 C 80.058 36.886 80.418 37.756 81.139 38.391 C 81.902 39.027 82.94 39.344 84.254 39.344 C 86.077 39.344 87.497 38.941 88.514 38.136 C 89.531 37.331 90.04 36.23 90.04 34.832 L 90.04 32.67 C 89.235 32.501 88.493 32.395 87.815 32.353 C 87.136 32.268 86.437 32.225 85.717 32.225 Z" fill="currentColor" fillRule="evenodd" />
      <path d="M 144.373 11.377 C 147.764 11.377 150.541 12.479 152.703 14.682 C 154.864 16.886 155.945 20.064 155.945 24.217 L 155.945 46.209 L 145.073 46.209 L 145.073 27.586 C 145.073 25.594 144.67 24.026 143.865 22.882 C 143.102 21.738 141.936 21.166 140.368 21.166 C 139.478 21.166 138.651 21.399 137.888 21.865 C 137.125 22.289 136.511 22.988 136.045 23.963 C 135.579 24.895 135.345 26.124 135.345 27.649 L 135.345 46.209 L 124.473 46.209 L 124.473 27.586 C 124.473 25.594 124.07 24.026 123.265 22.882 C 122.502 21.738 121.336 21.166 119.768 21.166 C 118.836 21.166 117.988 21.399 117.225 21.865 C 116.462 22.289 115.848 22.988 115.381 23.963 C 114.958 24.895 114.746 26.124 114.746 27.649 L 114.746 46.209 L 103.873 46.209 L 103.873 12.013 L 113.855 12.013 L 113.855 16.208 C 115.169 14.683 116.589 13.496 118.115 12.648 C 119.641 11.801 121.506 11.377 123.71 11.377 C 125.872 11.377 127.779 11.823 129.432 12.712 C 131.128 13.602 132.442 14.916 133.374 16.653 C 134.858 15.001 136.426 13.708 138.079 12.776 C 139.775 11.844 141.873 11.377 144.373 11.377 Z" fill="currentColor" fillRule="nonzero" />
      <path d="M 202.182 4.642 C 203.234 4.642 204 4.82 204.487 5.175 C 204.982 5.523 205.222 6.08 205.222 6.845 C 205.222 7.37 205.098 7.804 204.843 8.144 C 204.588 8.476 204.209 8.731 203.691 8.885 C 203.977 8.955 204.224 9.102 204.448 9.326 C 204.672 9.55 204.897 9.891 205.121 10.354 L 206.242 12.611 L 204.054 12.611 L 203.08 10.632 C 202.886 10.238 202.685 9.96 202.484 9.821 C 202.283 9.674 202.012 9.596 201.68 9.596 L 201.1 9.596 L 201.1 12.611 L 199.043 12.611 L 199.043 4.642 L 202.182 4.642 Z M 201.1 8.182 L 201.966 8.182 C 202.391 8.182 202.701 8.097 202.886 7.935 C 203.072 7.78 203.172 7.517 203.172 7.147 C 203.172 6.783 203.072 6.528 202.886 6.366 C 202.701 6.211 202.391 6.133 201.966 6.133 L 201.1 6.133 L 201.1 8.182 Z" fill="currentColor" fillRule="evenodd" />
      <path d="M 202.384 1.186 C 206.59 1.187 210 4.596 210 8.801 C 210 13.005 206.59 16.414 202.384 16.415 C 198.177 16.414 194.767 13.005 194.767 8.801 C 194.767 4.596 198.177 1.187 202.384 1.186 Z M 202.384 2.733 C 199.032 2.733 196.314 5.449 196.314 8.801 C 196.314 12.152 199.032 14.869 202.384 14.869 C 205.736 14.869 208.453 12.152 208.454 8.801 C 208.453 5.449 205.736 2.733 202.384 2.733 Z" fill="currentColor" fillRule="evenodd" />
    </svg>);

}

function ArrowIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>);

}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6.5l2.8 2.8L10.5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="star" fill="currentColor">
      <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
    </svg>);

}

function Placeholder({ label, style }) {
  return (
    <div className="ph" style={style}>
      <span className="ph-lbl">{label}</span>
    </div>);

}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, as: As = "div", className = "", style, delay = 0 }) {
  const ref = useReveal();
  const cls = `reveal ${className}`.trim();
  return (
    <As ref={ref} className={cls} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </As>);

}

// ============================== Nav (multi-page) ==============================
const NAV_LINKS = [
{ href: "index.html", label: "Inicio" },
{ href: "catalogo.html", label: "Productos" },
{ href: "servicios.html", label: "Servicios" },
{ href: "proceso.html", label: "Proceso" },
{ href: "portafolio.html", label: "Portafolio" }];


function Nav() {
  const path = (typeof window !== "undefined" ? window.location.pathname : "").split("/").pop() || "index.html";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <a href="index.html" aria-label="STAMP" className="nav-logo">
        <StampLogo style={{ height: 42 }} />
      </a>
      <div className="nav-links">
        {NAV_LINKS.map((l) =>
        <a key={l.href} href={l.href} className={path === l.href ? "is-active" : ""}>
            {l.label}
          </a>
        )}
      </div>
      <a href="#conversemos" className="btn btn-primary" onClick={(e) => {
        const t = document.getElementById("conversemos");
        if (t) {
          e.preventDefault();
          const y = t.getBoundingClientRect().top + window.scrollY - 16;
          window.scrollTo({ top: y, behavior: "smooth" });
          history.replaceState(null, "", "#conversemos");
        }
      }}>
        Conversemos
        <span className="btn-arrow"><ArrowIcon /></span>
      </a>
    </nav>);

}

// ============================== Footer ==============================
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row footer-row-main">
        <div className="footer-brand">
          <StampLogo style={{ height: 34, color: "#FAFAFA" }} />
          <span className="footer-sep" aria-hidden="true"></span>
          <span className="footer-tag">MERCHANDISING Y REGALOS CORPORATIVOS</span>
        </div>
        <div className="footer-nav">
          <a href="catalogo.html">Productos</a>
          <a href="servicios.html">Servicios</a>
          <a href="proceso.html">Proceso</a>
          <a href="portafolio.html">Portafolio</a>
        </div>
      </div>

      <div className="footer-row footer-row-info">
        <div className="footer-info-col">
          <div className="footer-k">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" ><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            Correo
          </div>
          <a className="footer-v" href="mailto:hola@stamp.com.pe" target="_blank" rel="noopener noreferrer">hola@stamp.com.pe</a>
        </div>
        <div className="footer-info-col">
          <div className="footer-k">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" ><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
            Teléfono
          </div>
          <a className="footer-v" href="tel:+51981423207" target="_blank" rel="noopener noreferrer">+51 981 423 207</a>
        </div>
        <div className="footer-info-col">
          <div className="footer-k">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            Dirección
          </div>
          <div className="footer-v">Calle Manuel Gonzales Olaechea 450<br/>San Isidro, Lima — Perú</div>
        </div>
        <div className="footer-info-col">
          <div className="footer-k">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            Horario
          </div>
          <div className="footer-v">Lun–Vie · 9:30–18:30<br/>Sábado · 10:00–14:00</div>
        </div>
      </div>

      <div className="footer-row footer-row-bottom">
        <span className="footer-copy">
          © 2026 Stamp SAC. Todos los derechos reservados.
        </span>
        <div className="footer-social">
          <a href="#" className="footer-social-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>Instagram</span>
          </a>
          <a href="#" className="footer-social-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.5 0h4.37v1.92h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v7.45H17.4v-6.6c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V22H7.72V8z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a href="#" className="footer-social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88V14.9H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v6.98C18.34 21.13 22 16.99 22 12z" />
            </svg>
            <span>Facebook</span>
          </a>
          <a href="#" className="footer-social-btn" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.05.85.13V9.4a6.34 6.34 0 0 0-1-.07A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.97a8.16 8.16 0 0 0 4.77 1.52V7.1a4.85 4.85 0 0 1-1.84-.41z" />
            </svg>
            <span>TikTok</span>
          </a>
        </div>
      </div>
    </footer>);}

// Common page wrapper — nav + main + footer
function PageShell({ children }) {
  return (
    <div className="app">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>);

}

Object.assign(window, {
  StampLogo, ArrowIcon, PlusIcon, CheckIcon, Star, Placeholder,
  Reveal, useReveal,
  Nav, Footer, PageShell
});