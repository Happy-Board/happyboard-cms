/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: 'https://example.com/',
            },
        ];
    },
    reactStrictMode: true,
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'res.cloudinary.com',
        ],
    },
};

export default nextConfig;
