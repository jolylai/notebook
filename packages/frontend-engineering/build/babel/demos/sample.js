const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

let code = 'const a = 1';

// 解析成ast
const ast = parser.parse(code);

// 遍历
traverse(ast, {
  VariableDeclaration(path, state) {
    console.log('path: ', path.node);
    // 通过 path.node 访问实际的 AST 节点
    path.node.kind = 'var';
  },
});

// 生成代码
const transformedCode = generator(ast).code;
console.log('transformedCode: ', transformedCode);
