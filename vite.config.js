import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js',
            'vue-router': 'vue-router/dist/vue-router.esm-bundler.js',
        }
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify('production') // or 'development'
    },
    build: {
        lib: {
            entry: 'src/bundle.js', // path to your entry file
            name: 'VueBlocksBundle',      // global name for UMD/IIFE if needed
            formats: ['esm', 'umd'], // output formats
            fileName: (format) => `vue-blocks.${format}.js`,
        },
        outDir: 'dist', // This is the default, but you can set it explicitly
        emptyOutDir: true, // Optional: clears the dist folder before building
    },
})