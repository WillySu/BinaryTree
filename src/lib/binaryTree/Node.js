export default class Node {
  constructor (value) {
    this.value = value || null;
    this.parentNode = null;
    this.smallerNode = null;
    this.greaterNode = null;
    this.counter = 0;
    this.level = 0;

    if (this.value !== null) {
      this.counter = 1;
    }
  }
}
