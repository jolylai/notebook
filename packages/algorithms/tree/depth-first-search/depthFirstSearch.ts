interface Node {
  left: Node;
  right: Node;
}

interface Options {
  enterNode?: (node: Node) => void;
  leaveNode?: (node: Node) => void;
  allowTraversal?: (node: Node, childNode: Node) => boolean;
}

const defaultOptions: Options = {
  enterNode: (node: Node) => {},
  leaveNode: (node: Node) => {},
  allowTraversal: (node: Node, childNode: Node) => true,
};

function depthFirstSearchRecursive(node: any, options: Required<Options>) {
  const { enterNode, leaveNode, allowTraversal } = options;

  enterNode(node);

  if (node.left && allowTraversal(node, node.left)) {
    depthFirstSearchRecursive(node.left, options);
  }

  if (node.right && allowTraversal(node, node.right)) {
    depthFirstSearchRecursive(node.right, options);
  }

  leaveNode(node);
}

export default function depthFirstSearch(node: any, options?: Options) {
  const mergedOption = Object.assign({}, defaultOptions, options);

  depthFirstSearchRecursive(node, mergedOption as Required<Options>);
}
