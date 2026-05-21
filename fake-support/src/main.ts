import "./style.css";
import { startScam } from './scam'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="scam-root"></div>
`

startScam()