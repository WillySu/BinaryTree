export function setNodesPosition ({ tree, width, height }) {
  const len = tree.maxLevel + 1;
  const nodeList = tree.traverse();
  // To-do, improve sort's performance
  nodeList.sort((a, b) => a.level - b.level);

  const levelH = len === 0 ? height : Math.round(height / len);
  const levelWidth = Math.round(width /  Math.pow(2, len));
  const yAdjust = Math.round(levelH / 2);
  const rootCx = Math.round(width / 2);
  const w = width * .9;

  return nodeList.map(n => {
    const { level } = n;
    const xAdjust = level === 0 ? 0 : Math.round(w / Math.pow(2, level + 1));
    if (n.parentNode === null) {
      n.cx = rootCx;
    } else if (n.parentNode.greaterNode === n) {
      n.cx = n.parentNode.cx + xAdjust
    } else if (n.parentNode.smallerNode === n) {
      n.cx = n.parentNode.cx - xAdjust
    }

    n.cy = levelH * level + yAdjust;
    return n;
  });
}

const AREA_BY_COUNTER = 1810;
function getRadius (node) {
  const area = (node.counter || 1) * AREA_BY_COUNTER;
  return Math.round(Math.sqrt(area / Math.PI));
}

function setCircle (circles) {
  circles
    .attr('r', getRadius)
    .attr('cx', n => n.cx)
    .attr('cy', n => n.cy);
}

export function setCircles (circles) {
  setCircle(circles.enter().append('circle'));
  setCircle(circles);
  circles.exit().remove();
}

function getTextValue (node) {
  const { counter, value } = node;
  if (counter > 1) {
    return value + ' x ' + counter;
  }

  return value;
}

function setText (texts) {
  texts
    .attr('x', n => n.cx)
    .attr('y', n => n.cy)
    .text(getTextValue);
}

export function setTexts (texts) {
  setText(texts.enter().append('text'));
  setText(texts);
  texts.exit().remove();
}

function setLine (lines) {
  lines
    .attr('x1', n => n.cx)
    .attr('y1', n => n.cy)
    .attr('x2', n => (n.parentNode && n.parentNode.cx) || n.cx)
    .attr('y2', n => (n.parentNode && n.parentNode.cy) || n.cy);
}

export function setLines (lines) {
  setLine(lines.enter().append('line'));
  setLine(lines);
  lines.exit().remove();
}
