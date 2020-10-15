import { Queue } from "./queue";

export class Tree<T> {
  root: TreeNode<T> | null = null;

  constructor(values?: T[]) {
    if (values) {
      this.root = this.fromArray(values);
    }
  }

  fromArray(values: T[]) {
    let queue = new Queue<{ node: TreeNode<T>; index: number }>();
    let root = new TreeNode(values[0]);

    queue.enqueue({ node: root, index: 0 });

    while (queue.size() > 0) {
      const data = queue.dequeue();

      if (data) {
        let leftChildren = data.index * 2 + 1;
        let rightChildren = data.index * 2 + 2;

        if (leftChildren < values.length) {
          data.node.left = createNode(values[leftChildren]);
          if (data.node.left !== null) {
            queue.enqueue({ node: data.node.left, index: leftChildren });
          }
        }

        if (rightChildren < values.length) {
          data.node.right = createNode(values[rightChildren]);

          if (data.node.right !== null) {
            queue.enqueue({ node: data.node.right, index: rightChildren });
          }
        }
      }
    }

    return root;
  }

  toArray() {
    if (this.root === null) return null;
    let array = [];

    let queue = new Queue<TreeNode<T>>();

    queue.enqueue(this.root);

    while (queue.size() > 0) {
      let root = queue.dequeue();

      if (root) {
        array.push(root.value);
        if (root.left) queue.enqueue(root.left);
        if (root.right) queue.enqueue(root.right);

        if (root.left || root.right) {
          if (!root.left) array.push(root.left);
          if (!root.right) array.push(root.right);
        }
      }
    }

    return array;
  }
}

function createNode<T>(value: T) {
  if (value !== null) return new TreeNode(value);
  return null;
}

class TreeNode<T> {
  value: T | null = null;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value?: T) {
    if (value) this.value = value;
  }
}
