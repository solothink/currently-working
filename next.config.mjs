/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_TRUST_HOST: process.env.NEXTAUTH_TRUST_HOST,
    NEXT_PUBLIC_DJANGO_API_BASE_URL:
      process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "idbookhotels.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "idbookhotels.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
