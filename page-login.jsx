// Login — acceso a la plataforma interna (ERP) de Stamp.
// Panel de ingreso sobrio: sin discurso de marca, solo lo necesario para entrar.
// Vistas: login · recuperar contraseña · enlace enviado · acceso verificado.

// ------------------------------ iconos ------------------------------
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>);
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>);
}
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>);
}
function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-2.9 3.6M6.3 7.4A16 16 0 0 0 2.5 12S6 18.5 12 18.5a9.4 9.4 0 0 0 3.7-.7" />
      <path d="M10 10a3 3 0 0 0 4.2 4.2" />
      <path d="m3.5 3.5 17 17" />
    </svg>);
}
function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5" />
      <path d="M12 16h.01" />
    </svg>);
}
function CapsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 4 7 7h-4v4H9v-4H5l7-7Z" />
      <path d="M9 19h6" />
    </svg>);
}
function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11a8 8 0 0 0-13.7-5.2L3 9" />
      <path d="M4 13a8 8 0 0 0 13.7 5.2L21 15" />
      <path d="M3 4v5h5M21 20v-5h-5" />
    </svg>);
}
function SpinnerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.6" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>);
}
function TickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 12.5 5 5 11-11" />
    </svg>);
}
function SentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>);
}

// ------------------------------ utilidades ------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Verificación anti-bot — reCAPTCHA v2 de Google ("No soy un robot").
//
// Pega aquí la clave del sitio que da Google (es pública, va en el HTML).
// La clave secreta NUNCA va en el frontend: se usa en el servidor.
//
// IMPORTANTE: el widget por sí solo no protege nada. El token que emite tiene
// que validarse en el backend contra
//   https://www.google.com/recaptcha/api/siteverify
// y rechazar el login si la validación falla. Sin ese paso, un atacante llama
// al endpoint de autenticación directamente y se salta el captcha entero.
// Ver docs/seguridad-login.md.
const RECAPTCHA_SITE_KEY = "6LdSrWMtAAAAACVIwqYrze9vBECpVEAx0TK1iCzs";
const RECAPTCHA_SRC = "https://www.google.com/recaptcha/api.js?render=explicit&hl=es";
const CAPTCHA_REMOTO = !!RECAPTCHA_SITE_KEY;

// La API de reCAPTCHA avisa que está lista por un callback global, no por el
// evento load del script: grecaptcha.render puede no existir todavía cuando el
// script termina de bajar.
let recaptchaReady = null;
function loadRecaptcha() {
  if (recaptchaReady) return recaptchaReady;
  recaptchaReady = new Promise((resolve, reject) => {
    if (window.grecaptcha && window.grecaptcha.render) { resolve(); return; }
    window.__stampRecaptchaReady = resolve;
    const script = document.createElement("script");
    script.src = RECAPTCHA_SRC + "&onload=__stampRecaptchaReady";
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("reCAPTCHA no disponible"));
    document.head.appendChild(script);
  });
  return recaptchaReady;
}

// Reto local de respaldo: solo se usa mientras no haya site key configurada,
// para poder desarrollar la pantalla. NO es protección real — cualquier script
// lo resuelve leyendo los dos números. No dejar así en producción.
function newChallenge() {
  const a = 1 + Math.floor(Math.random() * 8);
  const b = 1 + Math.floor(Math.random() * 8);
  return { a, b, answer: a + b };
}

// ------------------------------ campos ------------------------------
function Field({ id, label, icon, error, hint, action, children }) {
  return (
    <div className={"auth-field" + (error ? " is-error" : "")}>
      <div className={"auth-label" + (action ? " auth-label--row" : "")}>
        <label htmlFor={id}>{label}</label>
        {action}
      </div>
      <div className="auth-input">
        <span className="auth-input-ico">{icon}</span>
        {children}
      </div>
      {hint && !error && <span className="auth-hint"><CapsIcon />{hint}</span>}
      {error && <span className="auth-error" id={`${id}-error`}><AlertIcon />{error}</span>}
    </div>);
}

function Captcha({ challenge, value, onChange, onRefresh, error, inputRef }) {
  return (
    <div className={"auth-field" + (error ? " is-error" : "")}>
      <label className="auth-label" htmlFor="captcha">Verificación</label>
      <div className="auth-captcha">
        <span className="auth-captcha-q" aria-hidden="true">
          {challenge.a} + {challenge.b} =
        </span>
        <div className="auth-input">
          <input
            id="captcha"
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Resultado"
            aria-label={`¿Cuánto es ${challenge.a} más ${challenge.b}?`}
            aria-invalid={!!error}
            aria-describedby={error ? "captcha-error" : undefined}
            value={value}
            onChange={(e) => onChange(e.target.value)} />
        </div>
        <button type="button" className="auth-captcha-new" onClick={onRefresh} aria-label="Generar otra verificación">
          <RefreshIcon />
        </button>
      </div>
      {error && <span className="auth-error" id="captcha-error"><AlertIcon />{error}</span>}
    </div>);
}

// Widget de reCAPTCHA. Si el script no carga (red caída, bloqueador, o alguien
// intentando esquivarlo) no hay token y el formulario no deja enviar: se falla
// cerrado a propósito, en vez de degradar a una verificación más débil.
function RecaptchaField({ onToken, resetKey, error }) {
  const boxRef = React.useRef(null);
  const widgetRef = React.useRef(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    loadRecaptcha().
    then(() => {
      if (cancelled || !boxRef.current || widgetRef.current !== null) return;
      widgetRef.current = window.grecaptcha.render(boxRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => { onToken(""); setFailed(true); }
      });
    }).
    catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, []);

  // Tras un intento fallido se pide un reto nuevo: el token de reCAPTCHA es de
  // un solo uso.
  React.useEffect(() => {
    if (resetKey && widgetRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetRef.current);
      onToken("");
    }
  }, [resetKey]);

  return (
    <div className={"auth-field" + (error ? " is-error" : "")}>
      <span className="auth-label">Verificación</span>
      <div className="auth-recaptcha" ref={boxRef} />
      {failed &&
        <span className="auth-error"><AlertIcon />No se pudo cargar la verificación. Recarga la página.</span>}
      {error && !failed && <span className="auth-error"><AlertIcon />{error}</span>}
    </div>);
}

// ------------------------------ página ------------------------------
function LoginPage() {
  const [view, setView] = React.useState("login"); // login | recover | sent | success
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [captcha, setCaptcha] = React.useState("");
  const [challenge, setChallenge] = React.useState(newChallenge);
  const [showPw, setShowPw] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [formError, setFormError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [capsOn, setCapsOn] = React.useState(false);
  const [sentTo, setSentTo] = React.useState("");
  const [token, setToken] = React.useState("");
  const [resetKey, setResetKey] = React.useState(0);

  const emailRef = React.useRef(null);
  const pwRef = React.useRef(null);
  const capRef = React.useRef(null);

  React.useEffect(() => {
    if ((view === "login" || view === "recover") && emailRef.current) emailRef.current.focus();
  }, [view]);

  function resetChallenge() {
    if (CAPTCHA_REMOTO) {
      setToken("");
      setResetKey((k) => k + 1);
      return;
    }
    setChallenge(newChallenge());
    setCaptcha("");
  }

  function goTo(next) {
    setErrors({});
    setFormError("");
    resetChallenge();
    setView(next);
  }

  function validate({ withPassword }) {
    const e = {};
    const mail = email.trim();
    if (!mail) e.email = "Ingresa tu correo corporativo.";
    else if (!EMAIL_RE.test(mail)) e.email = "El correo no tiene un formato válido.";
    if (withPassword && !password) e.password = "Ingresa tu contraseña.";
    if (CAPTCHA_REMOTO) {
      if (!token) e.captcha = "Completa la verificación.";
    } else if (!captcha.trim()) {
      e.captcha = "Resuelve la verificación.";
    } else if (Number(captcha.trim()) !== challenge.answer) {
      e.captcha = "El resultado no es correcto.";
    }
    return e;
  }

  function focusFirstError(e) {
    if (e.email && emailRef.current) emailRef.current.focus();
    else if (e.password && pwRef.current) pwRef.current.focus();
    else if (e.captcha && capRef.current) capRef.current.focus();
  }

  function onLogin(ev) {
    ev.preventDefault();
    setFormError("");
    const e = validate({ withPassword: true });
    setErrors(e);
    if (Object.keys(e).length) {
      if (e.captcha) resetChallenge();
      focusFirstError(e);
      return;
    }
    setLoading(true);
    // TODO: reemplazar por la llamada real al endpoint de autenticación.
    // Enviar el token como "g-recaptcha-response" junto a las credenciales; el
    // servidor lo valida con siteverify antes de comprobar la contraseña.
    // Si la respuesta es un fallo, llamar a resetChallenge(): el token ya se
    // consumió y reCAPTCHA no acepta el mismo dos veces.
    window.setTimeout(() => {
      setLoading(false);
      setView("success");
    }, 900);
  }

  function onRecover(ev) {
    ev.preventDefault();
    setFormError("");
    const e = validate({ withPassword: false });
    setErrors(e);
    if (Object.keys(e).length) {
      if (e.captcha) resetChallenge();
      focusFirstError(e);
      return;
    }
    setLoading(true);
    // TODO: reemplazar por la llamada real al endpoint de recuperación.
    // La respuesta debe ser siempre la misma, exista o no la cuenta.
    window.setTimeout(() => {
      setLoading(false);
      setSentTo(email.trim());
      setView("sent");
    }, 900);
  }

  function detectCaps(ev) {
    if (typeof ev.getModifierState === "function") setCapsOn(ev.getModifierState("CapsLock"));
  }

  const emailField = (
    <Field id="email" label="Correo corporativo" icon={<MailIcon />} error={errors.email}>
      <input
        id="email"
        ref={emailRef}
        type="email"
        inputMode="email"
        autoComplete="username"
        spellCheck="false"
        placeholder="tunombre@stamp.com.pe"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined} />
    </Field>);

  const captchaField = CAPTCHA_REMOTO
    ? <RecaptchaField onToken={setToken} resetKey={resetKey} error={errors.captcha} />
    : <Captcha
        challenge={challenge}
        value={captcha}
        onChange={setCaptcha}
        onRefresh={resetChallenge}
        error={errors.captcha}
        inputRef={capRef} />;

  return (
    <div className="auth">
      <div className="auth-shell">
        <a href="index.html" className="auth-logo" aria-label="Ir a stamp.com.pe">
          <StampLogo style={{ height: 30 }} />
        </a>

        <div className="auth-card">
          {/* ---------------- login ---------------- */}
          {view === "login" &&
            <>
              <header className="auth-head">
                <h1 className="auth-title">Inicia sesión</h1>
                <p className="auth-sub">Accede con tu cuenta corporativa.</p>
              </header>

              {formError &&
                <div className="auth-banner" role="alert"><AlertIcon /><span>{formError}</span></div>}

              <form className="auth-fields" onSubmit={onLogin} noValidate>
                {emailField}

                <Field
                  id="password"
                  label="Contraseña"
                  icon={<LockIcon />}
                  error={errors.password}
                  hint={capsOn ? "Bloq Mayús está activado." : ""}
                  action={
                    <button type="button" className="auth-link" onClick={() => goTo("recover")}>
                      ¿Olvidaste tu contraseña?
                    </button>}>
                  <input
                    id="password"
                    ref={pwRef}
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={detectCaps}
                    onKeyUp={detectCaps}
                    onBlur={() => setCapsOn(false)}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined} />
                  <button
                    type="button"
                    className="auth-pw-toggle"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
                    aria-pressed={showPw}>
                    {showPw ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </Field>

                {captchaField}

                <label className="auth-check">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  <span className="auth-check-box"><TickIcon /></span>
                  Mantener sesión iniciada
                </label>

                <button type="submit" className="btn btn-primary btn-block auth-submit" disabled={loading}>
                  {loading
                    ? <><SpinnerIcon className="auth-spin" />Verificando…</>
                    : <>Iniciar sesión<span className="btn-arrow"><ArrowIcon /></span></>}
                </button>
              </form>
            </>}

          {/* ---------------- recuperar contraseña ---------------- */}
          {view === "recover" &&
            <>
              <header className="auth-head">
                <h1 className="auth-title">Recuperar contraseña</h1>
                <p className="auth-sub">
                  Ingresa tu correo corporativo y te enviaremos un enlace para restablecerla.
                </p>
              </header>

              <form className="auth-fields" onSubmit={onRecover} noValidate>
                {emailField}
                {captchaField}

                <button type="submit" className="btn btn-primary btn-block auth-submit" disabled={loading}>
                  {loading
                    ? <><SpinnerIcon className="auth-spin" />Enviando…</>
                    : <>Enviar enlace<span className="btn-arrow"><ArrowIcon /></span></>}
                </button>
              </form>

              <button type="button" className="auth-back" onClick={() => goTo("login")}>
                <span className="auth-back-ico" aria-hidden="true"><ArrowIcon /></span>
                Volver a iniciar sesión
              </button>
            </>}

          {/* ---------------- enlace enviado ---------------- */}
          {view === "sent" &&
            <div role="status" aria-live="polite">
              <span className="auth-mark"><SentIcon /></span>
              <header className="auth-head">
                <h1 className="auth-title">Revisa tu correo</h1>
                <p className="auth-sub">
                  Si <b>{sentTo}</b> corresponde a una cuenta de Stamp, en unos minutos
                  recibirás un enlace para restablecer tu contraseña. El enlace vence en 30 minutos.
                </p>
              </header>
              <p className="auth-note">
                ¿No llega? Revisa la carpeta de spam o escribe a{" "}
                <a href="mailto:soporte@stamp.com.pe">soporte@stamp.com.pe</a>.
              </p>
              <button type="button" className="auth-back" onClick={() => goTo("login")}>
                <span className="auth-back-ico" aria-hidden="true"><ArrowIcon /></span>
                Volver a iniciar sesión
              </button>
            </div>}

          {/* ---------------- acceso verificado ---------------- */}
          {view === "success" &&
            <div role="status" aria-live="polite">
              <span className="auth-mark"><TickIcon /></span>
              <header className="auth-head">
                <h1 className="auth-title">Acceso verificado</h1>
                <p className="auth-sub">Te estamos redirigiendo a tu panel…</p>
              </header>
              <a href="index.html" className="btn btn-primary btn-block auth-submit">
                Ir al panel
                <span className="btn-arrow"><ArrowIcon /></span>
              </a>
            </div>}
        </div>

        <p className="auth-foot">
          © 2026 Stamp SAC · <a href="mailto:soporte@stamp.com.pe">soporte@stamp.com.pe</a>
        </p>
      </div>
    </div>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<LoginPage />);
