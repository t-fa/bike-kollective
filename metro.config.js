/**
 * Had to add this file for Firebase to work with Expo
 * Sources:  https://stackoverflow.com/questions/72179070/
 *              react-native-bundling-failure-error-message-while-trying-to-resolve-module-i
 *
 *           https://docs.expo.dev/guides/customizing-metro/#adding-more-file-extensions-to--assetexts
 * */

module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    //added this
    resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
    },
};