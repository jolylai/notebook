import BinaryTreeNode from '../../data-structrue/demo/BinaryTreeNode';
import deepFirstSearch from '../index';

describe('deepFirstSearch', () => {
  test('should perform DFS operation on tree', () => {
    const nodeA = new BinaryTreeNode('A');
    const nodeB = new BinaryTreeNode('B');
    const nodeC = new BinaryTreeNode('C');
    const nodeD = new BinaryTreeNode('D');
    const nodeE = new BinaryTreeNode('E');
    const nodeF = new BinaryTreeNode('F');
    const nodeG = new BinaryTreeNode('G');

    nodeA.setLeft(nodeB).setRight(nodeC);
    nodeB.setLeft(nodeD).setRight(nodeE);
    nodeC.setLeft(nodeF).setRight(nodeG);

    // In-order traversing.
    expect(nodeA.toString()).toBe('D,B,E,A,F,C,G');

    const enterNodeCallback = jest.fn();
    const leaveNodeCallback = jest.fn();

    deepFirstSearch(nodeA);

    deepFirstSearch(nodeA, {
      enterNode: enterNodeCallback,
      leaveNode: leaveNodeCallback,
    });

    expect(enterNodeCallback).toHaveBeenCalledTimes(7);
    expect(leaveNodeCallback).toHaveBeenCalledTimes(7);

    // 检查进入节点
    expect(enterNodeCallback.mock.calls[0][0].value).toEqual('A');
    expect(enterNodeCallback.mock.calls[1][0].value).toEqual('B');
    expect(enterNodeCallback.mock.calls[2][0].value).toEqual('D');
    expect(enterNodeCallback.mock.calls[3][0].value).toEqual('E');
    expect(enterNodeCallback.mock.calls[4][0].value).toEqual('C');
    expect(enterNodeCallback.mock.calls[5][0].value).toEqual('F');
    expect(enterNodeCallback.mock.calls[6][0].value).toEqual('G');

    // 检查离开节点
    expect(leaveNodeCallback.mock.calls[0][0].value).toEqual('D');
    expect(leaveNodeCallback.mock.calls[1][0].value).toEqual('E');
    expect(leaveNodeCallback.mock.calls[2][0].value).toEqual('B');
    expect(leaveNodeCallback.mock.calls[3][0].value).toEqual('F');
    expect(leaveNodeCallback.mock.calls[4][0].value).toEqual('G');
    expect(leaveNodeCallback.mock.calls[5][0].value).toEqual('C');
    expect(leaveNodeCallback.mock.calls[6][0].value).toEqual('A');
  });

  test('allow user to redefine node visiting logic', () => {
    const nodeA = new BinaryTreeNode('A');
    const nodeB = new BinaryTreeNode('B');
    const nodeC = new BinaryTreeNode('C');
    const nodeD = new BinaryTreeNode('D');
    const nodeE = new BinaryTreeNode('E');
    const nodeF = new BinaryTreeNode('F');
    const nodeG = new BinaryTreeNode('G');

    nodeA.setLeft(nodeB).setRight(nodeC);
    nodeB.setLeft(nodeD).setRight(nodeE);
    nodeC.setLeft(nodeF).setRight(nodeG);

    // In-order traversing.
    expect(nodeA.toString()).toBe('D,B,E,A,F,C,G');

    const enterNodeCallback = jest.fn();
    const leaveNodeCallback = jest.fn();

    deepFirstSearch(nodeA);

    deepFirstSearch(nodeA, {
      allowTraversal: (node, child) => {
        return child.value !== 'B';
      },
      enterNode: enterNodeCallback,
      leaveNode: leaveNodeCallback,
    });

    expect(enterNodeCallback).toHaveBeenCalledTimes(4);
    expect(leaveNodeCallback).toHaveBeenCalledTimes(4);

    expect(enterNodeCallback.mock.calls[0][0].value).toEqual('A');
    expect(enterNodeCallback.mock.calls[1][0].value).toEqual('C');
    expect(enterNodeCallback.mock.calls[2][0].value).toEqual('F');
    expect(enterNodeCallback.mock.calls[3][0].value).toEqual('G');

    expect(leaveNodeCallback.mock.calls[0][0].value).toEqual('F');
    expect(leaveNodeCallback.mock.calls[1][0].value).toEqual('G');
    expect(leaveNodeCallback.mock.calls[2][0].value).toEqual('C');
    expect(leaveNodeCallback.mock.calls[3][0].value).toEqual('A');
  });
});
