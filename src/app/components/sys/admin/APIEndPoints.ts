export const APIEndpoints = {

    CMS_URL: 'http://localhost:1337',
    PAS_URL: 'http://localhost:5000',
    AUTH_GATEWAY_URL: 'http://localhost:3000',
    AUTH_URLs: [
        {
            provider: 'google',
            url: 'http://localhost:3000/auth/google'
        },
        {
            provider: 'facebook',
            url: 'http://localhost:3000/auth/facebook'
        },
        {
            provider: 'twitter',
            url: 'http://localhost:3000/auth/twitter'
        },
        {
            provider: 'linkedin',
            url: 'http://localhost:3000/auth/linkedin'
        },
        {
            provider: 'line',
            url: 'http://localhost:3000/auth/line'
        },
        {
            provider: 'email',
            url: 'http://localhost:3000/local/login'
        }
    ],
    AUTH_CALLBACK_URL: 'http://localhost:4200/profile/:id'
}
