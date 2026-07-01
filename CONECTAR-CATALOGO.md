# Conectar la web al catálogo del ERP

El **ERP es el backend** del catálogo. Esta web **solo lee** lo público
(productos y categorías activos). **Nunca** ve costos, historial ni notas internas,
y **no muestra precios** (se cotizan por WhatsApp).

## Cómo se activa

Toda la configuración vive en **`config.jsx`**. Rellena **una** de las dos opciones
y sube el cambio — no hay que tocar nada más.

### Opción 1 — API del ERP (recomendada)

Una sola llamada, sin llaves. La web pide el catálogo al ERP y este decide qué sale.

```js
// config.jsx
window.STAMP_CONFIG = {
  erpApi: "https://erp.stamp.com.pe",   // <-- tu ERP
  supabaseUrl: "",
  supabaseAnonKey: "",
};
```

La web llama a `GET {erpApi}/api/public/catalog`, que devuelve
`{ categories, products }` (solo activos y solo datos públicos).

### Opción 2 — Supabase directo

Lectura directa de las vistas públicas. Requiere las dos llaves públicas y haber
corrido la migración `db/migrations/supabase-migration-v89.sql` en el ERP (crea
las vistas `web_catalog_products` y `web_catalog_categories`).

```js
// config.jsx
window.STAMP_CONFIG = {
  erpApi: "",
  supabaseUrl: "https://<tu-proyecto>.supabase.co",
  supabaseAnonKey: "<anon key>",   // pública por diseño, solo lectura
};
```

> La `anon key` es pública por diseño; solo puede leer esas dos vistas.
> No expone costos, historial ni notas internas.

### Sin configurar

Si `config.jsx` queda vacío, la web usa el catálogo de **demo** de `data.jsx`
(fallback). Así el sitio nunca se ve roto mientras se termina de conectar.

> Nota: este sitio es estático (no Next.js). En vez de variables `NEXT_PUBLIC_*`
> en un `.env`, la config va en `config.jsx`:
> `NEXT_PUBLIC_ERP_API → erpApi`, `NEXT_PUBLIC_SUPABASE_URL → supabaseUrl`,
> `NEXT_PUBLIC_SUPABASE_ANON_KEY → supabaseAnonKey`.

## Qué lee la web

**Categorías** (`web_catalog_categories`): `id`, `name`, `description`,
`image_url`, `slug`, `sort_order`.

**Productos** (`web_catalog_products`): `id`, `category_id`, `name`, `description`,
`specs` (jsonb), `image_url`, `min_units`, `created_at`.

Las `specs` son grupos flexibles:

```jsonc
[
  { "label": "Material",       "type": "list",   "values": ["Tocuyo 100% algodón"] },
  { "label": "Colores base",   "type": "swatch", "values": [{ "name": "Natural", "hex": "#e9e2d0" }] }
]
```

- `type: "list"`  → lista de textos.
- `type: "swatch"`→ colores `{ name, hex }` (se dibuja la muestra con el `hex`).

## Detalles de la implementación

- **`config.jsx`** — configuración (las dos llaves / la URL del ERP).
- **`catalog-source.jsx`** — descarga y **mapea** la forma del ERP a la que ya
  usaban las páginas; expone el hook `useCatalog()` y el componente `CatalogImg`
  (muestra la foto real si hay `image_url`, o el placeholder si no).
- **`page-catalogo.jsx` / `page-producto.jsx`** — consumen `useCatalog()` con
  estados de carga, error y vacío.
- Solo aparece lo que esté **activo** en el ERP (interruptor "Visible en el catálogo").
- Los productos del ERP no traen `slug`: se genera desde el nombre para las URLs
  (`producto.html?slug=...`), con sufijo estable si dos nombres coinciden.
