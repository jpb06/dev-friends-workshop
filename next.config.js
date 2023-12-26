module.exports = {
  pageExtensions: ['page.tsx'],
  distDir: 'dist',
  transpilePackages: ['@mui/system', '@mui/material'],
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
  },
};
