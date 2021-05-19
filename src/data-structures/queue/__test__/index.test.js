import Queue from '../Queue';

describe('Queue', () => {
  test('should create empty queue', () => {
    const queue = new Queue();

    expect(queue).not.toBeNull();
    expect(queue.LinkedList).not.toBeNull();
  });

  test('should enqueue data to queue', () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.toString()).toEqual('1,2');
  });
});
