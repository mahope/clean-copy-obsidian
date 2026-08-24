#!/usr/bin/env node
/**
 * license-admin.js — issue/revoke/list Clean Copy Pro license keys.
 *
 * Keys live in the same Cloudflare KV namespace (VISITS) the Worker uses,
 * under lic:<key>. This script talks to KV via `wrangler` using the same
 * credentials deploy.sh uses (~/.hermes/.env).
 *
 * Usage:
 *   node tools/license-admin.js issue [N]     # create N keys, print them
 *   node tools/license-admin.js revoke <key>  # mark a key revoked
 *   node tools/license-admin.js list          # list keys + device counts
 *
 * Requires: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in env.
 */

const { execSync } = require('child_process');
const crypto = require('crypto');

const NAMESPACE = process.env.CF_KV_NAMESPACE_ID; // set in ~/.hermes/.env
if (!NAMESPACE) {
  console.error('CF_KV_NAMESPACE_ID not set — add it to ~/.hermes/.env');
  process.exit(1);
}

function wrangler(args) {
  return execSync(`npx --yes wrangler kv key ${args}`, {
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    env: process.env,
  });
}

function newKey() {
  return crypto.randomBytes(16).toString('hex'); // 32 hex chars
}

function putKey(key, record) {
  const tmp = `/tmp/lic-${key}.json`;
  require('fs').writeFileSync(tmp, JSON.stringify(record));
  wrangler(`put "lic:${key}" --path "${tmp}" --namespace-id ${NAMESPACE}`);
  require('fs').unlinkSync(tmp);
}

async function main() {
  const [cmd, arg] = process.argv.slice(2);

  if (cmd === 'issue') {
    const n = Math.max(1, parseInt(arg || '1', 10));
    for (let i = 0; i < n; i++) {
      const key = newKey();
      const record = {
        plan: 'pro-yearly',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 365 * 86400 * 1000).toISOString(),
        status: 'active',
        devices: [],
      };
      putKey(key, record);
      console.log(key);
    }
    return;
  }

  if (cmd === 'revoke') {
    if (!/^[a-f0-9]{32}$/.test(arg || '')) {
      console.error('Usage: license-admin.js revoke <32-hex-key>');
      process.exit(1);
    }
    let rec = { devices: [] };
    try {
      rec = JSON.parse(wrangler(`get "lic:${arg}" --namespace-id ${NAMESPACE}`));
    } catch {}
    rec.status = 'revoked';
    putKey(arg, rec);
    console.log(`Revoked ${arg}`);
    return;
  }

  if (cmd === 'list') {
    // wrangler has no direct JSON list here; fall back to per-day scan hint.
    console.log('Listing is done via: npx wrangler kv key list --namespace-id $CF_KV_NAMESPACE_ID | grep lic:');
    execSync(`npx --yes wrangler kv key list --namespace-id ${NAMESPACE} | grep lic: || true`, { stdio: 'inherit' });
    return;
  }

  console.error('Unknown command. Use: issue [N] | revoke <key> | list');
  process.exit(1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
