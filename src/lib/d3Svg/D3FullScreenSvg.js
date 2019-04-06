import * as d3 from 'd3';

export default class D3FullScreenSvg {
  constructor ({ height, width, root }) {
    this.root = root || document.body;
    this.height = height;
    this.width = width;
    this.d3Svg = d3.select(this.root).append('svg'); // will be set 
    this.init();
  }

  init () {
    const { height, width } = this;
    this.resize({ height, width });
  }

  resize ({ height, width } = {}) {
    if (height !== undefined) {
      this.height = height;
      this.d3Svg.attr('width', width);
    }

    if (width !== undefined) {
      this.width = width;
      this.d3Svg.attr('height', height);
    }
  }
}
