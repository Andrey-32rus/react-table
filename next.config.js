/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/score',
                permanent: true, // Если это постоянное перенаправление (301), установите true
            },
        ];
    },
};

module.exports = nextConfig;