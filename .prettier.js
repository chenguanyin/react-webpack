module.exports = {
  printWidth: 100, //一行的字符数，如果超过会进行换行，默认为80
  jsxBracketSameLine: true, // jsx将 > 放在最后一行，而不是新的一行
  tabWidth: 2, //一个tab代表几个空格数
  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: true, //字符串是否使用单引号，默认为false(在jsx中配置无效, 默认都是双引号)
  semi: true, //行尾是否使用分号，默认为true
  trailingComma: "all", //是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  // parser: "babylon", //代码的解析引擎，默认为babylon，与babel相同。
  arrowParens: "avoid", // 箭头函数只有一个值的时候，是否包含括号()avoid 没有， always有
  endOfLine: "lf" // 换行符使用 lf
};
