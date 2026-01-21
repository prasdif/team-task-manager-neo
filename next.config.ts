import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Disable static exports for pages that use dynamic features
  output: undefined,
  // Experimental settings for better build compatibility
  experimental: {
    // Allow dynamic routes without errors
  },
};

export default nextConfig;
