import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'lbgdxh20',
  dataset: 'production',
  apiVersion: '2025-06-16',
  useCdn: true,
}); 