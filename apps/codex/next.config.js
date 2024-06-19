const _getPublicEnv = (prefix) => {
  const envs = process.env;
  const res = {};

  Object.keys(envs).forEach((k) => {
    if (k.startsWith(prefix)) {
      res[k] = envs[k];
    }
  });

  return res;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  reactStrictMode: false,
  trailingSlash: true,
  publicRuntimeConfig: {
    ..._getPublicEnv('NEXT_PUBLIC_'),
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // config.module.rules.push({
    //   test: /\.(tsx|ts)$/,
    //   use: [
    //     {
    //       loader: 'babel-loader',
    //       options" {
    //         plugins: [
    //           [

    //           ]
    //         ]
    //       }
    //     }
    //   ],
    // });

    return config;
  },
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
  },
  // env: {
  //   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  // }
  output: "standalone",
};

module.exports = nextConfig;
