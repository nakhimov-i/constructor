import {
  row,
  col
} from './utils'

function title(block) {
  const {
    tag,
    styles
  } = block.options;
  return row(col(`<${tag}>${block.value}</${tag}>`), styles)
}

function text(block) {
  const styles = block.options.styles;
  return row(col(`<p>${block.value}</p>`), styles)
}

function textColumns(block) {
  const styles = block.options.styles;
  const html = block.value.map(item => col(item))
  return row(html.join(''), styles)
}

function picture(block) {
  const {
    styles,
    imageStyles
  } = block.options;

  return row(`<img src=${block.value} style="${imageStyles}">`, styles)
}
export const template = {
  text,
  title,
  textColumns,
  picture
}