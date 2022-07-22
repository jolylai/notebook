import { describe, test } from 'vitest';
import { BinaryTreeNode } from 'data-structures';
import { expect } from 'vitest';
import { vi } from 'vitest';

import depthFirstSearch from '../depthFirstSearch';

describe('depthFirstSearch', () => {
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

    expect(nodeA.toString()).toBe('D,B,E,A,F,C,G');

    const enterNodeCb = vi.fn();
    const leaveNodeCb = vi.fn();

    depthFirstSearch(nodeA, { leaveNode: leaveNodeCb, enterNode: enterNodeCb });

    expect(enterNodeCb).toBeCalledTimes(7);
    expect(leaveNodeCb).toBeCalledTimes(7);

    expect(enterNodeCb.mock.calls[0][0].value).toBe('A');
    expect(enterNodeCb.mock.calls[1][0].value).toBe('B');
    expect(enterNodeCb.mock.calls[2][0].value).toBe('D');
    expect(enterNodeCb.mock.calls[3][0].value).toBe('E');
    expect(enterNodeCb.mock.calls[4][0].value).toBe('C');
    expect(enterNodeCb.mock.calls[5][0].value).toBe('F');
    expect(enterNodeCb.mock.calls[6][0].value).toBe('G');

    expect(leaveNodeCb.mock.calls[0][0].value).toBe('D');
    expect(leaveNodeCb.mock.calls[1][0].value).toBe('E');
    expect(leaveNodeCb.mock.calls[2][0].value).toBe('B');
    expect(leaveNodeCb.mock.calls[3][0].value).toBe('F');
    expect(leaveNodeCb.mock.calls[4][0].value).toBe('G');
    expect(leaveNodeCb.mock.calls[5][0].value).toBe('C');
    expect(leaveNodeCb.mock.calls[6][0].value).toBe('A');
  });
});
