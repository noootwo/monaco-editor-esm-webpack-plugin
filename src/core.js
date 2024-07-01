const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');
const NormalModuleWebpackReplacementPlugin = require("webpack/lib/NormalModuleReplacementPlugin");
const nls = require.resolve('monaco-editor-nls');

function MonacoEditorEsmWebpackPlugin({ isMonacoEditorWebpackPlugin = true, isReplaceNls = true, ...options } = {}) {
    if(isMonacoEditorWebpackPlugin) {
        this.plugin1 = new MonacoEditorWebpackPlugin(options);
    }
    if(isReplaceNls) {
        this.plugin2 = new NormalModuleWebpackReplacementPlugin(/\/(vscode\-)?nls\.js/, function(resource) {
            resource.request = nls;
            resource.resource = nls;
        });
    }
}

MonacoEditorEsmWebpackPlugin.prototype.apply = function(compiler) {
    this.plugin1 && this.plugin1.apply(compiler);
    this.plugin2 && this.plugin2.apply(compiler);
}

MonacoEditorEsmWebpackPlugin.loader = require.resolve('./loader');

module.exports = MonacoEditorEsmWebpackPlugin;