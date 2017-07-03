import Inline from '../blots/inline';


class ExtendedLink extends Inline {
  static get protocols() {
    return ['http', 'https', 'mailto'];
  }

  static create(value) {
    let node = super.create(value.href);
    let url = this.sanitize(value.href);
    node.setAttribute('href', url);
    node.setAttribute('target', value.target || '_self');
    return node;
  }

  static formats(domNode) {
    return { href: domNode.getAttribute('href'), target: domNode.getAttribute('target') };
  }

  static sanitize(url) {
    return sanitize(url, ['http', 'https', 'mailto']) ? url : 'about:blank';
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) return super.format(name, value);
    let url = this.constructor.sanitize(value.href);
    this.domNode.setAttribute('href', url);
    this.domNode.setAttribute('target', value.target || '_self');
  }
}
ExtendedLink.blotName = 'extendedLink';
ExtendedLink.tagName = 'A';

function sanitize(url, protocols) {
  let anchor = document.createElement('a');
  anchor.href = url;
  let protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

export default ExtendedLink;
