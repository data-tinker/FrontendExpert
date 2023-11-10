const API_BASE_URL: string = 'https://api.frontendexpert.io/api/fe/testimonials';

let hasNext: boolean = false;
let lastId: string = '';
let canFetch: boolean = true;

const testDiv: HTMLElement | null = document.getElementById("testimonial-container");

const addToDom = (res: TestimonialsResponse): void => {
  if (res && res.testimonials) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    res.testimonials.forEach((item: Testimonial, index: number) => {
      const p: HTMLParagraphElement = document.createElement("p");
      p.textContent = item.message;
      p.classList.add("testimonial");
      fragment.appendChild(p);
      if (index === res.testimonials.length - 1) {
        lastId = item.id;
      }
    });
    testDiv?.appendChild(fragment);
    hasNext = res.hasNext;
    canFetch = true;
  }
}

const getTestimonialsAndAppend = async (): Promise<void> => {
  canFetch = false;
  const url: string = lastId ? `${API_BASE_URL}?limit=5&after=${lastId}` : `${API_BASE_URL}?limit=5`;
  const res: Response = await fetch(url)
  const testimonials = await res.json();
  addToDom(testimonials);
}

function scrollListener(this: HTMLElement): void {
  if (canFetch && hasNext) {
    const spaceLeftToScroll: number = this.scrollHeight - this.scrollTop - this.clientHeight;
    if (spaceLeftToScroll > 0) {
      return;
    }
    getTestimonialsAndAppend();
  }
}

testDiv?.addEventListener("scroll", scrollListener as EventListener);
getTestimonialsAndAppend();
