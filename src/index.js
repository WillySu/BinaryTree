import D3BinaryTree from './lib/d3Svg/D3BinaryTree';
import './css/common.css';

function init () {
  const binaryTree = new D3BinaryTree();
  binaryTree.add(10);
  binaryTree.add(5);
  binaryTree.add(15);
  binaryTree.add(3);
  binaryTree.add(6);
  binaryTree.add(12);
  binaryTree.add(17);
  binaryTree.add([2, 20]);

  console.log('find', binaryTree.find(17));
  console.log('findGreatestChild', binaryTree.tree.findGreatestChild());
  console.log('findSmallestChild', binaryTree.tree.findSmallestChild());
  console.log('ASC', binaryTree.tree.travel());
  console.log('DESC', binaryTree.tree.travel({ direction: 'DESC' }));
}

document.addEventListener('DOMContentLoaded', init);
