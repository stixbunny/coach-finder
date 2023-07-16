import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { cwd } from 'node:process';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, cwd(), '');
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      'import.meta.env': env,
    },
  };
});
