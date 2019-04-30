import * as d3 from 'd3';

export default class D3FullScreenSvg {
  constructor (root) {
    this.root = root || document.body;
    this.d3Svg = d3.select(this.root).append('svg');
    this.init();
  }

  init () {
    const resize = this.resize.bind(this);

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 1000);
    });
  }

  update () {
    // to be overwritten by child class
  }

  resize () {
    const { innerWidth: width, innerHeight: height } = window;
    let needToUpdate = false;
    if (height !== undefined && this.height !== height) {
      this.height = height;
      this.d3Svg.attr('width', width);
      needToUpdate = true;
    }

    if (width !== undefined && this.width !== width) {
      this.width = width;
      this.d3Svg.attr('height', height);
      needToUpdate = true;
    }

    if (needToUpdate) {
      this.update();
    }
  }
}
