# Seguridad del login

Notas para quien conecte la pantalla de ingreso (`login.html`) con el backend
del ERP.

## Lo primero: qué protege un captcha y qué no

Un captcha vive en el navegador. Solo estorba a un bot que rellena **el
formulario**. No hace nada contra alguien que llama al endpoint de
autenticación directamente con `curl`, que es exactamente lo que hace un
atacante real.

| Amenaza | Lo resuelve |
|---|---|
| Bots que abusan del formulario | Captcha **validado en el servidor** |
| Fuerza bruta / credenciales filtradas | Rate limiting + bloqueo de cuenta + MFA |
| DDoS (saturar el servicio) | WAF / CDN delante del origen (Cloudflare, etc.) |

**El captcha no mitiga un DDoS.** Un ataque de denegación de servicio no pasa
por el formulario: satura la red o el servidor. Eso se corta antes de llegar a
la aplicación, poniendo el dominio detrás de un WAF/CDN con protección DDoS y
limitando peticiones por IP.

## reCAPTCHA

La pantalla usa reCAPTCHA v2 de Google (la casilla "No soy un robot").
Para activarlo:

1. Entrar a <https://www.google.com/recaptcha/admin>, crear un sitio de tipo
   **reCAPTCHA v2 → casilla "No soy un robot"** y registrar los dominios
   (`stamp.com.pe` y `localhost` para pruebas).
2. Copiar la **clave del sitio** a `RECAPTCHA_SITE_KEY`, al inicio de
   `page-login.jsx`. Es pública y va en el frontend sin problema.
3. Guardar la **clave secreta** en el servidor (variable de entorno).
   Nunca en el repositorio ni en el HTML.

Mientras `RECAPTCHA_SITE_KEY` esté vacía, la pantalla cae a un reto aritmético
local que sirve solo para desarrollar la interfaz. **No es protección**: se
resuelve leyendo los dos números. No debe llegar así a producción.

Si el script de reCAPTCHA no carga, el formulario no deja enviar. Es
intencional: fallar cerrado evita que baste con bloquear el script para
esquivar la verificación. Conviene tenerlo en cuenta, porque Google está
bloqueado en algunas redes corporativas y en algunos países: ahí el login
queda inaccesible.

### Validación en el servidor (obligatoria)

El formulario manda el token en `g-recaptcha-response`. Sin este paso el
widget es decorativo:

```
POST https://www.google.com/recaptcha/api/siteverify
  secret   = <clave secreta>
  response = <token recibido del formulario>
  remoteip = <IP del cliente>
```

Rechazar el login si `success` es `false`. Cada token es de un solo uso y
caduca a los ~2 minutos; si se reintenta, el frontend debe pedir uno nuevo con
`resetChallenge()`.

### Privacidad

reCAPTCHA envía datos de navegación de los usuarios a Google, lo que tiene
implicaciones de privacidad y de consentimiento de cookies. Si eso llega a ser
un problema, Cloudflare Turnstile es equivalente en integración (token +
siteverify) y no rastrea.

## Lo que hay que añadir en el backend

El captcha es una capa. Para un ERP hacen falta también:

- **Rate limiting** por IP y por cuenta (p. ej. 5 intentos / 15 min), aplicado
  en el endpoint, no en el navegador.
- **Bloqueo temporal** de la cuenta tras varios fallos, con aviso por correo.
- **MFA** (TOTP) al menos para perfiles con permisos amplios.
- **Respuesta genérica** en el login: "correo o contraseña incorrectos", sin
  distinguir cuál de los dos falló, para no confirmar qué correos existen.
- **Cookies de sesión** `HttpOnly`, `Secure` y `SameSite=Lax`. El check
  "mantener sesión iniciada" alarga la caducidad; no guardar tokens en
  `localStorage`.
- **HTTPS obligatorio** con HSTS.
- **Registro de intentos** (fecha, IP, resultado) para poder auditar.

## Recuperación de contraseña

La vista de recuperación ya responde siempre lo mismo exista o no la cuenta,
para no filtrar qué correos están registrados. El backend debe mantener ese
comportamiento:

- Responder igual (y en un tiempo parecido) haya o no cuenta.
- Enlace de un solo uso, con caducidad de 30 minutos — es lo que dice la
  pantalla al usuario.
- Invalidar el enlace al usarlo y cerrar las demás sesiones al cambiar la
  contraseña.
- Limitar los envíos por correo e IP.
