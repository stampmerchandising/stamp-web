// ============================================================================
// catalog-source.jsx — Fuente de datos del catálogo
// ----------------------------------------------------------------------------
// Lee categorías y productos desde (en orden de preferencia):
//   1) la API pública del ERP   -> GET {erpApi}/api/public/catalog
//   2) o directo de Supabase    -> vistas web_catalog_* (PostgREST)
//   3) o, si no hay config, los datos locales de data.jsx (demo/fallback)
//
// Mapea la forma del ERP a la forma que ya consumen page-catalogo/page-producto:
//   categoría web: { id, label, desc, image }
//   producto web:  { id, slug, name, fam, moq, lead, desc, image, images, specs }
//   spec web:      { label, value }            (value: string | string[])
//                  { label, type:"colors", value: [{name, hex}] }   (swatches)
// ============================================================================

const CATALOG_CFG = (typeof window !== "undefined" && window.STAMP_CONFIG) || {};

// ------------------------------- utilidades --------------------------------

function slugify(str) {
  const base = String(str || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base || "item";
}

// ¿Es una URL/dato de imagen real (vs. un texto placeholder tipo "FOTO · ...")?
function isImageSrc(s) {
  if (typeof s !== "string") return false;
  return /^(https?:|data:|\/|\.\/|assets\/|uploads\/)/.test(s) ||
    /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i.test(s);
}

// ---------------------------- mapeo ERP -> web -----------------------------

function mapCategories(rows) {
  return (rows || [])
    .map((c) => ({
      id: c.slug || c.id, // slug bonito para URLs; uuid si no hay slug
      _uuid: c.id,
      label: c.name || "",
      desc: c.description || "",
      image: c.image_url || "",
      sort: c.sort_order != null ? c.sort_order : 9999,
    }))
    .sort((a, b) => a.sort - b.sort);
}

// Un grupo de specs del ERP: { label, type:"list"|"swatch", values }
function mapSpec(group) {
  if (!group || !group.label) return null;
  if (group.type === "swatch") {
    return {
      label: group.label,
      type: "colors",
      value: (group.values || []).map((v) =>
        typeof v === "string" ? { name: v } : { name: v.name, hex: v.hex }
      ),
    };
  }
  // "list" (o cualquier otro): arreglo de textos
  return {
    label: group.label,
    value: (group.values || []).map((v) => (typeof v === "string" ? v : v && v.name)),
  };
}

function mapProducts(rows, categorias) {
  const uuidToId = {};
  categorias.forEach((c) => { uuidToId[c._uuid] = c.id; });

  // Los productos del ERP no traen slug: lo generamos desde el nombre.
  // Si dos productos comparten nombre, se les añade un sufijo estable con el id.
  const nameCount = {};
  (rows || []).forEach((p) => {
    const s = slugify(p.name);
    nameCount[s] = (nameCount[s] || 0) + 1;
  });

  return (rows || []).map((p) => {
    let slug = slugify(p.name);
    if (nameCount[slug] > 1) slug = slug + "-" + String(p.id || "").slice(0, 8);
    return {
      id: p.id,
      slug,
      name: p.name || "",
      fam: uuidToId[p.category_id] || p.category_id,
      moq: p.min_units != null ? p.min_units : null,
      lead: p.description || "",
      desc: p.description || "",
      image: p.image_url || "",
      images: p.image_url ? [p.image_url] : [],
      specs: (p.specs || []).map(mapSpec).filter(Boolean),
      created_at: p.created_at || null,
    };
  });
}

// ------------------------------- fetchers ----------------------------------

async function fetchErpCatalog(erpApi) {
  const base = String(erpApi).replace(/\/+$/, "");
  const res = await fetch(base + "/api/public/catalog", { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("ERP respondió " + res.status);
  const data = await res.json();
  return { categories: data.categories || [], products: data.products || [] };
}

async function fetchSupabaseCatalog(url, anon) {
  const base = String(url).replace(/\/+$/, "") + "/rest/v1";
  const headers = { apikey: anon, Authorization: "Bearer " + anon };
  const [catRes, prodRes] = await Promise.all([
    fetch(base + "/web_catalog_categories?select=*&order=sort_order", { headers }),
    fetch(base + "/web_catalog_products?select=*&order=name", { headers }),
  ]);
  if (!catRes.ok) throw new Error("Supabase categorías " + catRes.status);
  if (!prodRes.ok) throw new Error("Supabase productos " + prodRes.status);
  return { categories: await catRes.json(), products: await prodRes.json() };
}

// --------------------------------- loader ----------------------------------

async function loadCatalog() {
  const cfg = CATALOG_CFG;

  if (cfg.erpApi) {
    const raw = await fetchErpCatalog(cfg.erpApi);
    const categorias = mapCategories(raw.categories);
    return { source: "erp", categorias, productos: mapProducts(raw.products, categorias) };
  }

  if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
    const raw = await fetchSupabaseCatalog(cfg.supabaseUrl, cfg.supabaseAnonKey);
    const categorias = mapCategories(raw.categories);
    return { source: "supabase", categorias, productos: mapProducts(raw.products, categorias) };
  }

  // Fallback: datos locales (demo) — mantiene la web funcionando sin config.
  return {
    source: "fallback",
    categorias: (typeof CATEGORIAS !== "undefined" ? CATEGORIAS : []).filter((c) => c.id !== "all"),
    productos: typeof PRODUCTOS !== "undefined" ? PRODUCTOS : [],
  };
}

// ---------------------------- hook + helpers -------------------------------

function useCatalog() {
  const [state, setState] = React.useState({
    loading: true, error: null, source: null, categorias: [], productos: [],
  });

  React.useEffect(() => {
    let alive = true;
    loadCatalog()
      .then((r) => { if (alive) setState({ loading: false, error: null, ...r }); })
      .catch((e) => {
        console.error("[catálogo] No se pudo cargar:", e);
        if (alive) setState({ loading: false, error: e, source: null, categorias: [], productos: [] });
      });
    return () => { alive = false; };
  }, []);

  return state;
}

function findProductBySlug(list, slug) {
  if (!slug) return null;
  return (list || []).find((p) => p.slug === slug || p.id === slug) || null;
}

function catLabelFrom(cats, famId) {
  const c = (cats || []).find((x) => x.id === famId);
  return c ? c.label : "";
}

// Imagen real cuando hay URL/dataURL; si no, cae al Placeholder existente.
function CatalogImg({ src, label }) {
  if (isImageSrc(src)) {
    return <img className="catalog-photo" src={src} alt={label || ""} loading="lazy" />;
  }
  return <Placeholder label={label} />;
}
