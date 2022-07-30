// 需要安装依赖:
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
    root: true,
    /* 指定如何解析语法。*/
    parser: 'vue-eslint-parser',
    /* 优先级低于parse的语法解析配置 */
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    globals: {
        uni: 'readonly',
        Nullable: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // typescript-eslint推荐规则,
        'prettier',
        'plugin:prettier/recommended',
    ],
    rules: {
        'no-var': 'error',
        semi: 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'vue/html-indent': [
            'error',
            2,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'vue/max-attributes-per-line': ['off'],
        'prettier/prettier': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/multi-word-component-names': 'off',
        'no-mutating-props': 'off',
        'vue/no-v-html': 'off',
        eqeqeq: 'error', // 要求使用 === 和 !==
        'no-dupe-args': 'error', // 禁止 function 定义中出现重名参数
        'no-func-assign': 2, //禁止重复的函数声明
        'no-unused-vars': 'error', // 禁止出现未使用过的变量
        camelcase: 'error', // 强制使用骆驼拼写法命名约定
        'no-mixed-spaces-and-tabs': 'error', //禁止混用tab和空格
        'no-template-curly-in-string': 2, //模版字符串检查
        'dot-location': [2, 'property'], //对象访问符的位置，换行的时候在行首
        'no-lone-blocks': 2, //禁止 不必要的块嵌套
        'no-redeclare': 2, //禁止重复声明变量
    },
})
