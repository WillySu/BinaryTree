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
    this.d3CircleG = this.d3Svg.append('g');
    this.d3LineG = this.d3Svg.append('g');
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

  setNodeInLevelList () {
    const { width, height } = this;
    const nodeList = this.tree.traverse();
    const nodeLevelList = getNodesByLevel(nodeList);
    this.nodeLevelList = setNodesPosition({
      nodeList: nodeLevelList,
      width,
      height
    });
  }

  update () {
    super.update();

    this.setNodeInLevelList();
    const circleGroups = this.d3CircleG.selectAll('g').data(this.nodeLevelList);
    circleGroups.enter().append('g').attr('class', (d, i) => 'level-' + i);
    circleGroups.exit().remove();

    circleGroups.each((d, i, groups) => {
      const g = d3.select(groups[i]);
      const lines = g.selectAll('line').data(d);
      setLines(lines);

      const circles = g.selectAll('circle').data(d);
      setCircles(circles);

      const texts = g.selectAll('text').data(d);
      setTexts(texts);
    });
  }
}

// https://d3indepth.com/selections/
