import Block from '../blots/block';

class BlockFormat extends Block {
  static create(cls) {
    let node = super.create();
    node.classList.add(cls);
    return node;
  }

  static formats(node) {
    return node.classList.value;
  }
}
BlockFormat.blotName = 'blockformat';
BlockFormat.tagName = 'div';


export default BlockFormat;
