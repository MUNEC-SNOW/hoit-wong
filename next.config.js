module.exports = {
    async redirects() {
        return [
            {
                source: '/_error',
                destination: '/en/not-found',
                permanent: true,
            },
        ]
    },
}