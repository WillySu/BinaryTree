import D3FullScreenSvg from './lib/d3Svg/D3FullScreenSvg';
import './css/common.css';

function init () {
  const { clientWidth: width, clientHeight: height } = document.body;
  const fullScreenSvg = new D3FullScreenSvg({ height, width });

  function resizeFunc () {
    const { clientWidth: width, clientHeight: height } = document.body;
    fullScreenSvg.resize({ width,height });
  };
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeFunc, 1000);
  });
}

document.addEventListener('DOMContentLoaded', init);
