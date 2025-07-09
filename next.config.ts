import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Recommendation: For production, consider setting ignoreDuringBuilds to false.
  // This ensures linting errors are caught during the build process, enforcing code quality.
  // If you keep it true, ensure you run `npm run lint` regularly.
  eslint: {
    ignoreDuringBuilds: false, // Changed from true
  },
  // You can add more config here later
};

export default nextConfig;