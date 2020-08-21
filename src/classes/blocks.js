import {
  col,
  row
} from '../utils'

class Block {
  constructor(value, options) {
    this.value = value
    this.options = options
  }
  toHTML() {
    throw new Error('Метод toHTML должен быть реализован!')
  }
}

export class TitleBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }

  toHTML() {
    const {
      tag,
      styles
    } = this.options;
    return row(col(`<${tag}>${this.value}</${tag}>`), styles)
  }
}

export class ImageBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }

  toHTML() {
    const {
      styles,
      imageStyles
    } = this.options;

    return row(`<img src=${this.value} style="${imageStyles}">`, styles)
  }
}

export class TextBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }

  toHTML() {
    const styles = this.options.styles;
    return row(col(`<p>${this.value}</p>`), styles)
  }
}

export class TextColumnsBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }

  toHTML() {
    const styles = this.options.styles;
    const html = this.value.map(item => col(item))
    return row(html.join(''), styles)
  }
}