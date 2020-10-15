type ListWithItems<T> = {
  head: Node<T>;
  tail: Node<T>;
  size: number;
};

export class List<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  size = 0;

  constructor(values?: T[]) {
    if (values) {
      values.forEach(this.addLast);
    }
  }

  addFirst(value: T) {
    let temp = this.head;

    this.head = new Node(value);

    this.head.next = temp;

    if (!this.hasItems()) {
      this.tail = this.head;
    } else {
      temp!.previous = this.head;
    }

    this.size++;
  }

  addLast(value: T) {
    let node = new Node(value);

    if (!this.hasItems()) {
      this.head = node;
    } else {
      this.tail!.next = node;
      node.previous = this.tail;
    }

    this.tail = node;
    this.size++;
  }

  removeLast() {
    if (this.size !== 0) {
      if (this.size === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail!.next = null;
        this.tail = this.tail!.previous;
      }
      this.size--;
    }
  }

  removeFirst() {
    if (this.size !== 0) {
      this.head = this.head!.next;
      this.size--;
      if (!this.hasItems()) {
        this.tail = null;
      } else {
        this.head!.previous = null;
      }
    }
  }

  remove(value: T) {
    // TODO
  }

  /**
   * It would be nice to have a better Type Guard.
   * More info at https://github.com/microsoft/TypeScript/issues/11117
   */
  hasItems(): this is this & ListWithItems<T> {
    return this.size !== 0;
  }

  *entries() {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}

class Node<T> {
  value: T;
  next: Node<T> | null = null;
  previous: Node<T> | null = null;

  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
