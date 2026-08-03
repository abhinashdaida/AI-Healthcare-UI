const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, "public"),
        historyApiFallback: true,
        port: 3000,
        open: true
    },


    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        sourceType: "unambiguous"
                    }
                }
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
            },

        ]
    },
    resolve: {
        extensions: [".mjs", ".js", ".jsx"],
        fullySpecified: false,
        alias: {
            "@": path.resolve(__dirname, "src/"),
            "@components": path.resolve(__dirname, "src/shared/components/"),
            "@pages": path.resolve(__dirname, "src/pages/"),
            "@context": path.resolve(__dirname, "src/context/"),
            "@services": path.resolve(__dirname, "src/shared/services/"),
            "@assets": path.resolve(__dirname, "src/assets/"),
            "state-management": path.resolve(__dirname, "src/state-management/"),
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};
