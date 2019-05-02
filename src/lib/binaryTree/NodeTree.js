import Node from './Node';

export default class NodeTree {
  constructor (head) {
    this.head = head || new Node(); // Node
  }

  // if args can be a number or object
  // { level, value, parentNode, node (current node) }
  getNodeAttributes (args) {
    let level = 0;
    let parentNode = null;
    let node = this.head;
    let value = null;

    if (typeof args === 'object') {
      level = args.level || level;
      parentNode = args.parentNode || parentNode;
      node = args.node || node;
      value = args.value || value;
    } else if (typeof args === 'number') {
      value = args;
    }

    return { level, parentNode, node, value };
  }

  /*
  Possible values or args
  - 12 (Number)
  - [4, 12, 96] (Array of numbers)
  - { level, parentNode, node, value } // internal
  */
  add (args) {
    if (Array.isArray(args)) {
      args.forEach(a => this.add(a));
      return;
    }

    const attributes = this.getNodeAttributes(args);
    if (!attributes) {
      return;
    }

    const { level, parentNode, node, value } = attributes;

    const nextLevel = level + 1;
    let needToUpdateLevel = true;
    if (node.value === null) {
      node.value = value;
      node.counter = 1;
      node.level = level;
      node.parentNode = parentNode || null;
    } else if (value > node.value) {
      if (node.greaterNode) {
        return this.add({ level: nextLevel, parentNode: node, node: node.greaterNode, value });
      } else {
        node.greaterNode = new Node(value);
        node.greaterNode.level = nextLevel;
        node.greaterNode.parentNode = node;
      }
    } else if (value < node.value) {
      if (node.smallerNode) {
        return this.add({ level: nextLevel, parentNode: node, node: node.smallerNode, value });
      } else {
        node.smallerNode = new Node(value);
        node.smallerNode.level = nextLevel;
        node.smallerNode.parentNode = node;
      }
    } else if (value == node.value) {
      node.counter++;
    }
  }

  find (args) {
    const attributes = this.getNodeAttributes(args);
    if (!attributes) {
      return;
    }

    const { node, value } = attributes;

    if (node.value === value) {
      return node;
    }

    if (node.greaterNode) {
      return this.find({ node: node.greaterNode, value });
    } else if (node.smallerNode) {
      return this.find({ node: node.smallerNode, value });
    }
  }

  findGreatestChild (args) {
    const { node } = this.getNodeAttributes(args);

    if (node && node.greaterNode) {
      return this.findGreatestChild({ node: node.greaterNode });
    }

    return node;
  }

  findSmallestChild (args) {
    const { node } = this.getNodeAttributes(args);

    if (node && node.smallerNode) {
      return this.findSmallestChild({ node: node.smallerNode });
    }

    return node;
  }

  // direction: ASC or DESC
  traverse (args) {
    const { node } = this.getNodeAttributes(args);
    const direction = (args && args.direction) || 'ASC';
    const list = [];

    if (direction === 'ASC' && node.smallerNode) {
      list.push(...this.traverse({ node: node.smallerNode, direction }));
    } else if (direction === 'DESC' && node.greaterNode) {
      list.push(...this.traverse({ node: node.greaterNode, direction }));
    }

    if (node && node.value !== undefined) {
      list.push(node);
    }

    if (direction === 'ASC' && node.greaterNode) {
      list.push(...this.traverse({ node: node.greaterNode, direction }));
    } else if (direction === 'DESC' && node.smallerNode) {
      list.push(...this.traverse({ node: node.smallerNode, direction }));
    }

    return list;
  }

  extract (args) {
    const node = this.find(args);
    if (!node) {
      return;
    }

    const { parentNode, smallerNode, greaterNode, counter } = node;
    if (counter > 1) {
      node.counter = counter - 1;
      return node;
    }

    // leaf node
    if (!smallerNode && !greaterNode) {
      if (!parentNode) { // root
        this.head = new Node();
      } else if (parentNode.smallerNode === node) {
        parentNode.smallerNode = null;
      } else if (parentNode.greaterNode === node) {
        parentNode.greaterNode = null;
      }
    }

    if (!smallerNode || !greaterNode) {
      if (!parentNode) { // root
        this.head = new Node();
      } else if (parentNode.smallerNode === node) {
        parentNode.smallerNode = smallerNode || greaterNode;
      } else if (parentNode.greaterNode === node) {
        parentNode.greaterNode = smallerNode || greaterNode;
      }
    }

    let nodeToBePromoted; // replaced extracted node
    // !parentNode in case of root node
    if (parentNode.smallerNode === node) {
      nodeToBePromoted = findGreatestChild(node);
    } else if (parentNode.greaterNode === node) {
      nodeToBePromoted = findSmallestChild(node);
    }

    return node;
  }

  get maxLevel () {
    return Math.max(...this.traverse().map(n => n.level));
  }
}
