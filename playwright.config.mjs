import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'browser',use:{baseURL:'http://127.0.0.1:4173',browserName:'chromium'},webServer:{command:'npm run showcase -- --port 4173 --strictPort',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},reporter:'list'});
