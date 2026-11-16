import test from 'node:test';
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import { profileKey, migrateLegacyProgress, LEGACY_KEYS } from '../src/lib/profileStorage.js';
import { signup, login, logout, continueAsGuest, getCurrentUser } from '../src/lib/localAuth.js';
class Storage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}
function reset() {
  globalThis.localStorage = new Storage();
  globalThis.window = new EventTarget();
  Object.defineProperty(globalThis, 'crypto', { value: webcrypto, configurable: true });
}
test('legacy progress copies once and originals remain unchanged', () => {
  const storage = new Storage();
  for (const key of LEGACY_KEYS) storage.setItem(key, JSON.stringify(key.includes("History") || key.includes("bookmarks") ? [] : { "python:x": 123 }));
  migrateLegacyProgress('alice', storage);
  migrateLegacyProgress('bob', storage);
  for (const key of LEGACY_KEYS) {
    assert.equal(storage.getItem(profileKey(key, 'alice')), storage.getItem(key));
    assert.equal(storage.getItem(profileKey(key, 'bob')), null);
  }
});
test('guest never claims legacy progress; existing profile data is preserved', () => {
  const storage = new Storage();
  storage.setItem('notebook:progress', '{"legacy":1}');
  storage.setItem(profileKey('notebook:progress', 'alice'), '{"existing":2}');
  migrateLegacyProgress('@guest', storage);
  assert.equal(storage.getItem('notebook:legacyOwner'), null);
  migrateLegacyProgress('alice', storage);
  assert.equal(storage.getItem(profileKey('notebook:progress', 'alice')), '{"existing":2}');
});
test('corrupt legacy data is retained and not marked migrated', () => {
  const storage = new Storage(); storage.setItem('notebook:progress', 'broken');
  assert.throws(() => migrateLegacyProgress('alice', storage));
  assert.equal(storage.getItem('notebook:legacyOwner'), null);
  assert.equal(storage.getItem('notebook:progress'), 'broken');
});
test('profiles use salted hashes, authenticate and isolate keys', async () => {
  reset();
  await signup('alice', 'sample-password');
  await signup('bob', 'sample-password');
  const users = JSON.parse(localStorage.getItem('tabula_users'));
  assert.equal(users.alice.password, undefined);
  assert.equal(users.alice.hash.length, 64);
  assert.notEqual(users.alice.hash, users.bob.hash);
  await assert.rejects(login('alice', 'wrong'));
  logout(); assert.equal(getCurrentUser(), null);
  await login('alice', 'sample-password');
  assert.equal(getCurrentUser().username, 'alice');
  assert.notEqual(profileKey('notebook:progress', 'alice'), profileKey('notebook:progress', 'bob'));
  assert.notEqual(profileKey('notebook:progress', '@guest'), profileKey('notebook:progress', 'alice'));
});
test('successful legacy login upgrades plaintext and preserves progress', async () => {
  reset(); localStorage.setItem('tabula_users', JSON.stringify({ old: { password: 'legacy', created: 1 } }));
  localStorage.setItem('notebook:progress', '{"java:test":123}');
  await assert.rejects(login('old', 'wrong'));
  assert.equal(JSON.parse(localStorage.getItem('tabula_users')).old.password, 'legacy');
  await login('old', 'legacy');
  const old = JSON.parse(localStorage.getItem('tabula_users')).old;
  assert.equal(old.password, undefined); assert.equal(old.created, 1); assert.ok(old.hash);
  assert.equal(localStorage.getItem(profileKey('notebook:progress', 'old')), '{"java:test":123}');
});
test('legacy current session receives migration before another signup', async () => {
  reset(); localStorage.setItem('tabula_users', '{"old":{"password":"legacy"}}');
  localStorage.setItem('tabula_session', '{"username":"old"}');
  localStorage.setItem('notebook:bookmarks', '["java:test"]');
  assert.equal(getCurrentUser().username, 'old');
  await signup('new', 'password');
  assert.equal(localStorage.getItem(profileKey('notebook:bookmarks', 'new')), null);
  assert.equal(localStorage.getItem(profileKey('notebook:bookmarks', 'old')), '["java:test"]');
});
test('guest and reserved names are handled safely', async () => {
  reset(); continueAsGuest(); assert.equal(getCurrentUser().guest, true);
  assert.equal(localStorage.getItem('notebook:legacyOwner'), null);
  for (const name of ['__proto__', 'constructor', '@guest', '']) await assert.rejects(signup(name, 'password'));
  localStorage.setItem('tabula_session', '{"username":"unknown"}');
  assert.equal(getCurrentUser(), null);
});
