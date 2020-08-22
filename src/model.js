import {
  TitleBlock,
  TextBlock,
  TextColumnsBlock,
  ImageBlock
} from './classes/blocks'
import {
  css
} from './utils'

export const model = [
  new TitleBlock('Кoнструктор сайтов', {
    tag: "h1",
    styles: css({
      'text-align': 'center',
      'font-size': '2rem',
      'color': 'white',
      'background': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,71,1) 44%, rgba(0,212,255,1) 100%)'
    })
  }),

  new TextBlock('Добро пожаловать в мой конструктор сайтов. <br> Здесь Вы можете построить простой сайт, не обладая навыками программирования!', {
    styles: css({
      "font-size": "1.5rem",
      'text-align': 'left',
      'margin': '15px 15px 15px 0px',
      'background': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(142,130,19,1) 50%, rgba(116,28,109,1) 100%)',
      'color': 'white'
    }),
  }),

  new TextColumnsBlock('Раз колонка, Два колонка, Три колонка', {
    styles: css({
      "font-size": "1.3rem"
    })
  }),

  new ImageBlock('https://besthqwallpapers.com/Uploads/3-3-2020/123592/javascript-fiery-logo-programming-language-orange-stone-background-creative-javascript-logo.jpg', {
    styles: css({
      "width": "600px",
      "heigth": "300px",
      "margin": "20px auto",
    }),
    imageStyles: "border-radius: 25px;"
  })
]