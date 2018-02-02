const dest = "public";

module.exports = {
    staticFileGlobs: [dest + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    cacheId: 'portfolio_v2',
    stripPrefixMulti: {
        'public/': '/',
    },
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/fonts\.googleapis\.io/,
            handler: "fastest",
            options: {
                cache: {
                    maxEntries: 10,
                    name: "font-cache"
                }
            }
        },
        {
            urlPattern: /^https:\/\/fabs\.io/,
            handler: "fastest"
        },
        {
            urlPattern: /^https:\/\/portfolio-backend-prod\.heroku\.com\/api/,
            handler: "fastest",
            options: {
                cache: {
                    maxEntries: 50,
                    name: "api-cache"
                }
            }
        },
        {
            urlPattern: /^https:\/\/api\.flickr\.com\/services\/rest/,
            handler: "fastest",
            options: {
                cache: {
                    maxEntries: 50,
                    name: "flickr-rest-cache"
                }
            }
        },
        {
            urlPattern: /staticflickr\.com/,
            handler: "fastest",
            options: {
                cache: {
                    maxEntries: 50,
                    name: "flickr-cache"
                }
            }
        }
    ]
};
