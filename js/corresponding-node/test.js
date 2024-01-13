const { correspondingNode } = require('./correspondingNode.js')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM({
  resources: 'usable',
  pretendToBeVisual: true,
})

global.document = dom.window.document;
global.window = dom.window;

const dom1 = document.createElement('div')
dom1.innerHTML = `
  <main>
    <h1>Heading</h1>
    <div>
      <h2>test1</h2>
      <p>test2 <em>emphasis</em></p>
    </div>  
  </main>
`
const dom2 = document.createElement('div')
dom2.innerHTML = `
  <article>
    <h1>Heading2</h1>
    <section>
      <img src="img.png" alt="image" />
      <h3>test5 <strong>strong</strong></h3>
    </section>  
  </article>
`

console.log(correspondingNode(dom1, dom2, dom1).innerHTML)
console.log(correspondingNode(dom1, dom2, dom1.children[0]).innerHTML)
