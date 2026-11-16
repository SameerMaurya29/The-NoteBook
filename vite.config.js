import { offlinePlugin } from './scripts/offline-plugin.mjs';
import { personalLibraryPlugin } from './scripts/personal-library-plugin.mjs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({ plugins: [react(), offlinePlugin(), personalLibraryPlugin()], build: { manifest: true }, resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } } });
