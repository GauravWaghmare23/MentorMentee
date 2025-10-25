module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        overrides: [
            {
                test: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}','./app/(college)/*.{js,jsx,ts,tsx}','./app/(student)/*.{js,jsx,ts,tsx}','./app/(teacher)/*.{js,jsx,ts,tsx}','./app/(college)/*.{js,jsx,ts,tsx}'],
                plugins: ['nativewind/babel'],
            },
        ],
    };
};