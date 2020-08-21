import {
  TitleBlock,
  TextBlock,
  TextColumnsBlock,
  ImageBlock
} from './classes/blocks'

export const model = [
  new TitleBlock('Constructor site', {
    tag: "h1",
    styles: "text-align: center; font-size: 2rem"
  }),

  new TextBlock('Добро пожаловать в мой конструктор сайтов. <br> Здесь Вы можете построить свой личный сайт, не обладая навыками программирования!', {
    styles: "font-size: 1.5rem;"
  }),

  new TextColumnsBlock([
    'Раз колонка',
    'Два колонка',
    'Три колонка'
  ], {
    styles: "background: ; font-size: 1.3rem"
  }),

  new ImageBlock('https://million-wallpapers.ru/wallpapers/0/9/18092400759048908771/kamenistoe-dno-ozera-i-zelenyj-les-vdaleke.jpg', {
    styles: "width: 300px; heigth: 300px; margin: 20px auto;",
    imageStyles: "opacity: 0.5;"
  })
]