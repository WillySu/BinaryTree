import D3FullScreenSvg from './D3FullScreenSvg';
import NodeTree from '../binaryTree/NodeTree';

export default class D3BinaryTree extends D3FullScreenSvg {
  constructor (root) {
    super(root);

    this.tree = new NodeTree();
    this.d3CircleG = this.d3Svg.append('g');
  }

  add (value) {
    this.tree.add(value);
    this.update();
  }

  find (value) {
    return this.tree.find(value);
  }

  update () {
    const { level } = this.tree;
    console.log(this.tree);
  }
}
