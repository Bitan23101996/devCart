module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: 'defaults', //It converts modern JavaScript into code older browsers understand. [defaults: Support most modern browsers.]
            },
        ],

        [
            '@babel/preset-react',
            {
                runtime: 'automatic', //Babel automatically imports the necessary JSX runtime. [Do not need to import react from React]. React 17+ feature
            },
        ],

        '@babel/preset-typescript', //Removes TypeScript types. Converts JSX.
    ],
};


//Babel converts modern JavaScript, React JSX, and TypeScript into browser-compatible JavaScript.