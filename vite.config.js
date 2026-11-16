import { offlinePlugin } from './scripts/offline-plugin.mjs';
import { personalLibraryPlugin } from './scripts/personal-library-plugin.mjs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
// Site base path. "/" for a domain root (default). For GitHub Pages project sites set NOTEBOOK_BASE=/The-NoteBook/ at build time.
const raw = process.env.NOTEBOOK_BASE || '/';
const base = '/' + raw.replace(/^\/+|\/+$/g, '') + (raw.replace(/^\/+|\/+$/g, '') ? '/' : '');
export default defineConfig({ base, plugins: [react(), offlinePlugin(), personalLibraryPlugin()], build: { manifest: true }, resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } } });
