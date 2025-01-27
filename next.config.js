/** @type {import('next').NextConfig} */
const JavaScriptObfuscator = require('webpack-obfuscator');

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

    webpack(config, { isServer, dev }) {
        if (!isServer && !dev) {
            // Обфускация только для client-side и только в production
            config.plugins.push(
                new JavaScriptObfuscator(
                    {
                        rotateStringArray: true,
                        stringArray: true,
                        stringArrayEncoding: ['base64'],
                        stringArrayThreshold: 0.75,
                    },
                    []
                )
            );
        }
        return config;
    },
};

module.exports = nextConfig;