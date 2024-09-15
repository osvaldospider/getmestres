export default {
    port: process.env.PORT || 3000,
    secretyKey: process.env.SECRETYKEY || '83822310-a320-4f68-91b5-f1cdf2e4e0f2',
    publicRoutes: process.env.PUBLICROUTES|| [
        'users/create',
        'users/auth',
        'customer/create'
    ]
}