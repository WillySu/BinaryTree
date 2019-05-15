import * as d3 from 'd3';
import D3FullScreenSvg from './D3FullScreenSvg';
import NodeTree from '../binaryTree/NodeTree';
import {
  getNodesByLevel,
  setCircles,
  setTexts,
  setLines,
  setNodesPosition
} from './d3BinaryTreeUtils.js';

export default class D3BinaryTree extends D3FullScreenSvg {
  constructor (root) {
    super(root);
    this.tree = new NodeTree();
    this.d3LineG = this.d3Svg.append('g');
    this.d3CircleG = this.d3Svg.append('g');
    this.d3TextG = this.d3Svg.append('g');
    this.nodeLevelList = [];

    this.resize();
  }

  add (value) {
    this.tree.add(value);
    this.update();
  }

  find (value) {
    return this.tree.find(value);
  }

  extract (value) {
    if (this.tree.extract(value)) {
      this.update();
    }
  }

  update () {
    super.update();

    const nodeList = setNodesPosition(this);

    const lines = this.d3LineG.selectAll('line').data(nodeList);
    setLines(lines);

    const circles = this.d3CircleG.selectAll('circle').data(nodeList);
    setCircles(circles);

    const texts = this.d3TextG.selectAll('text').data(nodeList);
    setTexts(texts);
  }
}

// https://d3indepth.com/selections/
