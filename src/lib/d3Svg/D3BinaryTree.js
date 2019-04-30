import * as d3 from 'd3';
import D3FullScreenSvg from './D3FullScreenSvg';
import NodeTree from '../binaryTree/NodeTree';
import {
  getNodesByLevel,
  setCircleAttributes,
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
      const circles = d3.select(groups[i]).selectAll('circle').data(d);
      circles.enter().append('circle').attr('cx', d => d.cx).attr('cy', d => d.cy);
      circles.attr('cx', d => d.cx).attr('cy', d => d.cy);
      circles.exit().remove();
    });
  }
}

// https://d3indepth.com/selections/
