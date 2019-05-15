import D3BinaryTree from './lib/d3Svg/D3BinaryTree';
import './css/common.css';

function init () {
  const addValueInput = document.getElementById('addValueInput');
  const addBtn = document.getElementById('addBtn');
  const extractSelect = document.getElementById('extractSelect');
  const extractBtn = document.getElementById('extractBtn');
  const binaryTree = new D3BinaryTree(document.getElementById('root'));
  binaryTree.add(100);
  binaryTree.add(50);
  binaryTree.add(200);
  binaryTree.add(300);
  binaryTree.add(150);
  binaryTree.add([125, 25, 75, 250, 400]);
  fillExtractList();
  /* binaryTree.add(12);
  binaryTree.add(17); */

  /* console.log('find', binaryTree.find(17));
  console.log('findGreatestChild', binaryTree.tree.findGreatestChild());
  console.log('findSmallestChild', binaryTree.tree.findSmallestChild());
  console.log('ASC', binaryTree.tree.traverse());
  console.log('DESC', binaryTree.tree.traverse({ direction: 'DESC' }).map(n => n.value)); */

  function addNewNode () {
    if (addValueInput.value) {
      binaryTree.add(Number(addValueInput.value));
      addValueInput.value = '';
      fillExtractList();
    }
  }

  function fillExtractList () {
    const list = binaryTree.tree.traverse().map(n => n.value);
    list.unshift('');

    while (extractSelect.children.length) {
      extractSelect.removeChild(extractSelect.children[0]);
    }

    list.forEach(v => {
      const option = document.createElement('option');
      option.value = v;
      option.label = v;
      extractSelect.appendChild(option);
    });
  }

  function extractNode () {
    if (extractSelect.value) {
      binaryTree.extract(Number(extractSelect.value));
      extractSelect.value = '';
      fillExtractList();
      console.log('Extract', binaryTree.tree.traverse());
    }
  }

  addValueInput.addEventListener('keyup', ev => {
    if (ev.keyCode === 13) {
      addNewNode();
    }
  });

  addBtn.addEventListener('click', addNewNode);
  extractBtn.addEventListener('click', extractNode);
}

document.addEventListener('DOMContentLoaded', init);
