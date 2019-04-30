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

  return nodeList.map(nodes => {
    return nodes.map(n => {
      const { level } = n;
      const xAdjust = level === 0 ? 0 : Math.round(width / Math.pow(2, level + 1));
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

export function setCircleAttributes ({ circles, levelH, rootCx, xAdjust, yAdjust }) {
  circles
    .attr('cx', node => getCx(node, rootCx, xAdjust))
    .attr('cy', node => levelH * node.level + yAdjust);
}