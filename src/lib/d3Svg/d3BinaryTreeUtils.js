export function getNodesByLevel (nodeList) {
  return nodeList.reduce((list, node) => {
    const { level, value } = node;
    if (value !== null) {
      if (list[level]) {
        list[level].push(node);
      } else {
        list[level] = [node];
      }
    }
    return list;
  }, []);
}

export function setNodesPosition ({ nodeList, width, height }) {
  const len = nodeList.length;
  const levelH = len === 0 ? height : Math.round(height / len);
  const levelWidth = Math.round(width /  Math.pow(2, len));
  const yAdjust = Math.round(levelH / 2);
  const rootCx = Math.round(width / 2);
  const w = width * .9;

  return nodeList.map(nodes => {
    return nodes.map(n => {
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
  });
}

function setCircle (circles) {
  circles
    .attr('cx', n => n.cx)
    .attr('cy', n => n.cy);
}

export function setCircles (circles) {
  setCircle(circles.enter().append('circle'));
  setCircle(circles);
  circles.exit().remove();
}

function setText (texts) {
  texts
    .attr('x', n => n.cx)
    .attr('y', n => n.cy)
    .text(n => n.value);
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
