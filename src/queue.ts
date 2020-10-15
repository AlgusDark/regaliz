import { List } from "./linked-list";

export class Queue<T> {
  private items = new List<T>();

  enqueue(item: T) {
    this.items.addLast(item);
  }

  dequeue() {
    if (this.items.hasItems()) {
      let value = this.items.head.value;
      this.items.removeFirst();
      return value;
    }
  }

  peek() {
    if (this.items.hasItems()) {
      return this.items.head.value;
    }
  }

  size() {
    return this.items.size;
  }

  entries() {
    // TODO
  }

  [Symbol.iterator]() {
    // TODO
  }
}
