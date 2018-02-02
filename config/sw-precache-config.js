const dest = "public";

module.exports = {
    staticFileGlobs: [dest + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    cacheId: 'vs-stair',
    maximumFileSizeToCacheInBytes: 23068672,

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
            urlPattern: /\/static\//,
            handler: "cacheFirst",
            options: {
                cache: {
                    name: 'static'
                }
            }
        }
    ]
};
