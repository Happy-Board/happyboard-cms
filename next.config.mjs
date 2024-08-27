/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'res.cloudinary.com',
        ],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    // assetPrefix: process.env.NODE_ENV === 'production' ? 'http://cdn.example.com' : 'http://cdn.example.com'

};

export default nextConfig;
