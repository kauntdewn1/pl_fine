export const GUMROAD_CONFIG = {
  APPLICATION_ID: import.meta.env.VITE_GUMROAD_APPLICATION_ID,
  APPLICATION_SECRET: import.meta.env.VITE_GUMROAD_APPLICATION_SECRET,
  ACCESS_TOKEN: import.meta.env.VITE_GUMROAD_ACCESS_TOKEN,
  BASE_URL: 'https://api.gumroad.com/v2',
  WEBHOOK_URL: 'https://webhook.site/4e3c1324-3b29-4797-84a9-4bd97ee157d4'
};

export const GUMROAD_PRODUCTS = {
  basico: {
    id: 'basiquinha',
    url: 'https://paulaazevedo.gumroad.com/l/basiquinha',
    price: '29.90'
  },
  vip: {
    id: 'vip',
    url: 'https://paulaazevedo.gumroad.com/l/vip',
    price: '59.90'
  }
}; 