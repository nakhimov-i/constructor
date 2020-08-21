import './styles/styles.css'
import './scss/style.scss'
import {
  model
} from './model'
import {
  template
} from './templates'



const site = document.querySelector('#site')

model.forEach(block => {
  let generate = template[block.type];

  if (generate) {
    const html = generate(block);
    site.insertAdjacentHTML('beforeend', html);
  }
})