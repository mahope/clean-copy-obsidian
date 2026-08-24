#!/usr/bin/env node
/**
 * Lemon Squeezy Setup Script
 * Run when LS_API_KEY is available (from Bitwarden).
 * Creates products, prices, and checkout links for all compliance products.
 *
 * Usage:
 *   LS_API_KEY=sk_... node lemon-setup.js [--dry-run]
 *   LS_API_KEY=sk_... node lemon-setup.js --product nis2-ebook (single product)
 *
 * Products defined below. Each gets: product → variant → price → checkout link.
 */

const API_BASE = 'https://api.lemonsqueezy.com/v1';

// ── Product definitions ──────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'nis2-ebook',
    name: 'NIS2 Compliance for Small Web Agencies',
    slug: 'nis2-compliance-for-small-web-agencies',
    description: 'A practical guide to EU cybersecurity rules for studios under 50 people. 40+ pages. Covers incident reporting, contract clauses, vendor assessment.',
    price_cents: 999,       // $9.99
    type: 'ebook',
    file: 'ebook/nis2-for-agencies.epub',
  },
  {
    id: 'eaa-wordpress-ebook',
    name: 'EAA Compliance Checklist for WordPress Sites',
    slug: 'eaa-compliance-checklist-wordpress',
    description: 'Make your WordPress sites meet the European Accessibility Act. 25+ pages with prioritized audit checklist and fix guide.',
    price_cents: 999,       // $9.99
    type: 'ebook',
    file: 'ebook/eaa-checklist.epub',
  },
  {
    id: 'gdpr-ebook',
    name: 'GDPR Compliance for Small Web Agencies',
    slug: 'gdpr-compliance-for-small-web-agencies',
    description: 'Client data protection without a legal department. 40+ pages. DPA templates, incident plan, 14-day action plan.',
    price_cents: 999,       // $9.99
    type: 'ebook',
    file: 'ebook/gdpr-for-agencies.epub',
  },
  {
    id: 'eaa-shopify-ebook',
    name: 'EAA Compliance Checklist for Shopify Stores',
    slug: 'eaa-compliance-checklist-shopify',
    description: 'Make your Shopify store accessible under the European Accessibility Act. Covers themes, apps, product pages, checkout.',
    price_cents: 999,       // $9.99
    type: 'ebook',
    file: 'ebook/eaa-shopify.epub',
  },
  {
    id: 'cookie-consent-ebook',
    name: 'The Cookie Consent & Tracking Guide',
    slug: 'cookie-consent-tracking-guide',
    description: 'Set up compliant analytics, marketing tags and consent banners. Covers Google Consent Mode, cookie audits, and documentation.',
    price_cents: 999,       // $9.99
    type: 'ebook',
    file: 'ebook/cookie-consent-guide.epub',
  },
  {
    id: 'compliance-bundle',
    name: 'ComplianceDocs Bundle',
    slug: 'compliancedocs-bundle',
    description: 'Four ready-to-use compliance templates: DPA, EAA statement, NIS2 contract clauses, vendor assessment checklist. Fill-in-the-blank format.',
    price_cents: 2999,      // $29.99
    type: 'template-bundle',
    files: [
      'products/dpa-template.md',
      'products/eaa-statement-template.md',
      'products/nis2-contract-clauses.md',
      'products/vendor-assessment-checklist.md',
    ],
  },
  {
    id: 'eaa-scanner-pro',
    name: 'EAA Compliance Scanner Pro',
    slug: 'eaa-scanner-pro',
    description: 'Desktop scanner app with 16 WCAG 2.1 AA rules, offline use, PDF reports. Professional scanning for web agencies.',
    price_cents: 2900,      // $29/yr
    type: 'software',
    url: 'https://hermes-passiv.pages.dev/downloads/mahope-eaa-scanner-desktop-1.0.0.zip',
  },
  {
    id: 'clean-copy-pro',
    name: 'Clean Copy Pro',
    slug: 'clean-copy-pro',
    description: 'Pro upgrade for the Clean Copy converter (web + browser extension): batch conversion, custom cleanup rules, a year of major updates. One license, 5 devices.',
    price_cents: 1900,      // $19/yr
    type: 'software-license',
    license: true,          // triggers license-key issuance instructions in output
  },
];

// ── API helpers ───────────────────────────────────────────────────
async function lsApi(method, path, body) {
  const url = `${API_BASE}${path}`;
  const opts = {
    method,
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${process.env.LS_API_KEY || ''}`,
    },
  };
  if (body) opts.body = JSON.stringify(body);
  
  const res = await fetch(url, opts);
  const data = await res.json();
  if (!res.ok) {
    const errMsg = data?.errors?.[0]?.detail || data?.error || JSON.stringify(data);
    throw new Error(`LS API ${method} ${path}: ${res.status} — ${errMsg}`);
  }
  return data;
}

async function getStoreId() {
  const data = await lsApi('GET', '/stores');
  const stores = data?.data || [];
  if (stores.length === 0) throw new Error('No stores found on this account. Create one in the Lemon Squeezy dashboard first.');
  // Use the first store
  return stores[0].id;
}

async function ensureProduct(storeId, product) {
  // Check if product already exists by name
  const existing = await lsApi('GET', '/products');
  const match = (existing?.data || []).find(p => 
    p.attributes.name === product.name
  );
  if (match) {
    console.log(`  → Product already exists: ${match.id} (${product.name})`);
    return match.id;
  }

  const body = {
    data: {
      type: 'products',
      attributes: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        status: 'published',
      },
      relationships: {
        store: {
          data: { type: 'stores', id: storeId },
        },
      },
    },
  };

  const result = await lsApi('POST', '/products', body);
  const id = result.data.id;
  console.log(`  ✓ Created product: ${id} (${product.name})`);
  return id;
}

async function ensureVariant(productId, product) {
  // Create a standard variant (Lemon Squeezy requires at least one variant per product)
  const existing = await lsApi('GET', '/variants');
  const match = (existing?.data || []).find(v => 
    v.attributes.name === 'Standard' && v.relationships?.product?.data?.id === productId
  );
  if (match) {
    console.log(`  → Variant already exists: ${match.id}`);
    return match.id;
  }

  const body = {
    data: {
      type: 'variants',
      attributes: {
        name: 'Standard',
        slug: 'standard',
        description: product.type === 'software' ? 'Annual license — includes updates' : 'Instant download',
        sort: 0,
        status: 'published',
      },
      relationships: {
        product: {
          data: { type: 'products', id: productId },
        },
      },
    },
  };

  const result = await lsApi('POST', '/variants', body);
  const id = result.data.id;
  console.log(`  ✓ Created variant: ${id}`);
  return id;
}

async function ensurePrice(variantId, product) {
  const existing = await lsApi('GET', '/prices');
  const match = (existing?.data || []).find(p => 
    p.relationships?.variant?.data?.id === variantId
  );
  if (match) {
    console.log(`  → Price already exists: ${match.id} ($${(match.attributes.unit_price / 100).toFixed(2)})`);
    return match.id;
  }

  const body = {
    data: {
      type: 'prices',
      attributes: {
        unit_price: product.price_cents,
        currency: 'USD',
        suggested_price: product.price_cents,
        tax_inclusive: true,
      },
      relationships: {
        variant: {
          data: { type: 'variants', id: variantId },
        },
      },
    },
  };

  const result = await lsApi('POST', '/prices', body);
  const id = result.data.id;
  console.log(`  ✓ Created price: ${id} ($${(product.price_cents / 100).toFixed(2)})`);
  return id;
}

async function createCheckoutLink(storeId, variantId, product) {
  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_options: {
          button_color: '#4fc3f7',
        },
        checkout_data: {
          custom: {
            product_id: product.id,
            product_type: product.type,
          },
        },
        preview: false,
      },
      relationships: {
        store: {
          data: { type: 'stores', id: storeId },
        },
        variant: {
          data: { type: 'variants', id: variantId },
        },
      },
    },
  };

  const result = await lsApi('POST', '/checkouts', body);
  const checkoutUrl = result.data.attributes.url;
  console.log(`  ✓ Checkout link: ${checkoutUrl}`);
  return checkoutUrl;
}

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  if (!process.env.LS_API_KEY && !process.argv.includes('--dry-run')) {
    console.error('❌ LS_API_KEY not set. Provide via environment variable.');
    console.error('   Usage: LS_API_KEY=sk_... node lemon-setup.js');
    console.error('   For dry run (no API calls): node lemon-setup.js --dry-run');
    process.exit(1);
  }

  if (process.argv.includes('--dry-run')) {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('  DRY RUN — Would create these products on Lemon Squeezy:');
    console.log('═══════════════════════════════════════════════════\n');
    for (const p of PRODUCTS) {
      console.log(`  ${p.name}`);
      console.log(`    Price: $${(p.price_cents / 100).toFixed(2)}`);
      console.log(`    Slug:  ${p.slug}`);
      console.log(`    Type:  ${p.type}`);
      console.log();
    }
    console.log(`  Total products: ${PRODUCTS.length}`);
    console.log(`  Total revenue/product: $${PRODUCTS.reduce((s, p) => s + p.price_cents / 100, 0).toFixed(2)}`);
    console.log('═══════════════════════════════════════════════════\n');
    return;
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log('  Lemon Squeezy Product Setup');
  console.log('═══════════════════════════════════════════════════\n');

  const storeId = await getStoreId();
  console.log(`  Store: ${storeId}\n`);

  const results = [];

  for (const product of PRODUCTS) {
    if (process.argv.includes('--product') && !process.argv.includes(product.id)) continue;

    console.log(`  ── ${product.name}`);
    try {
      const prodId = await ensureProduct(storeId, product);
      const varId = await ensureVariant(prodId, product);
      const priceId = await ensurePrice(varId, product);
      const checkoutUrl = await createCheckoutLink(storeId, varId, product);

      results.push({
        id: product.id,
        name: product.name,
        price: product.price_cents,
        checkoutUrl,
        productId: prodId,
        variantId: varId,
        priceId,
        licenseProduct: !!product.license,
      });
    } catch (err) {
      console.error(`  ✗ FAILED: ${err.message}`);
    }
    console.log();
  }

  // ── Summary ──
  console.log('═══════════════════════════════════════════════════');
  console.log('  Setup Complete');
  console.log('═══════════════════════════════════════════════════\n');
  
  for (const r of results) {
    console.log(`  ${r.name}`);
    console.log(`    Checkout: ${r.checkoutUrl}`);
    console.log(`    Product:  ${r.productId}`);
    console.log();
  }

  // Generate checkout links snippet for site integration
  console.log('─────────────────────────────────────────────────────');
  console.log('  Add these checkout links to the site:');
  console.log('─────────────────────────────────────────────────────\n');

  for (const r of results) {
    const slug = r.id.replace(/-/g, '_');
    console.log(`  const CHECKOUT_${slug.toUpperCase()} = '${r.checkoutUrl}';`);
    if (r.licenseProduct) {
      console.log(`\n  ── ${r.name} is a LICENSED product. Post-setup steps:`);
      console.log('  1. In the Lemon Squeezy dashboard, add a webhook:');
      console.log('     URL:    https://hermes-passiv.pages.dev/api/license/activate');
      console.log('     Events: order_created, subscription_created');
      console.log('  2. The Worker issues a key per order and emails it via LS receipt.');
      console.log('     Until webhook automation lands, issue keys manually with:');
      console.log('       node tools/license-admin.js issue 1   # then email to buyer');
      console.log('  3. Inject the checkout link into the buy button before deploy:');
      console.log(`       node tools/set_checkout_url.js "${r.checkoutUrl}"`);
    }
  }
}

main().catch(err => {
  console.error(`\n❌ Fatal: ${err.message}`);
  process.exit(1);
});