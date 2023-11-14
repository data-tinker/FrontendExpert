const {JSDOM} = require('jsdom');
const {readFileSync} = require('fs');
const chai = require('chai');
const spies = require('chai-spies');
const { getTestimonials } = require("./getTestimonials");
chai.use(spies);
const {expect, spy} = chai;

const html = readFileSync('index.html');

let testimonialContainer;

const resetSpies = () => {
  spy.restore();
  spy.on(global, 'fetch');
};

const resetDom = () => {
  const dom = new JSDOM(html, {
    resources: 'usable',
    pretendToBeVisual: true,
  });

  const convertStringToUrlObj = url => {
    const [base, params] = url.split('?');
    const paramPairs = params?.split('&');
    const urlObj = new URL(base);
    paramPairs?.forEach(paramStr => {
      const [key, value] = paramStr.split('=');
      urlObj.searchParams.set(key, value);
    });
    return urlObj;
  };

  global.document = dom.window.document;
  global.window = dom.window;
  global.fetch = url => {
    const urlObj = typeof url === 'object' ? url : convertStringToUrlObj(url);
    const acceptedUrls = [
      'https://www.algoexpert.io/api/testimonials', // old API endpoint
      'https://api.frontendexpert.io/api/fe/testimonials',
    ];
    if (!acceptedUrls.includes(urlObj.origin + urlObj.pathname)) {
      const response = {
        status: 404,
        ok: false,
        statusText: 'Not Found',
        type: 'cors',
        url: urlObj.toString(),
        redirected: false,
      };
      return Promise.resolve(response);
    }
    const limit = Number(urlObj.searchParams.get('limit'));
    const after = urlObj.searchParams.get('after');
    const testims = getTestimonials(limit, after);
    const response = {
      status: 200,
      ok: true,
      statusText: 'OK',
      type: 'cors',
      url: urlObj.toString(),
      redirected: false,
      json: async () => testims,
      text: async () => JSON.stringify(testims),
    };
    return Promise.resolve(response);
  };

  Object.defineProperty(window.HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      return this._scrollHeight || 0;
    },
    set(val) {
      this._scrollHeight = val;
    },
  });

  Object.defineProperty(window.HTMLElement.prototype, 'scrollTop', {
    configurable: true,
    get() {
      return this._scrollTop || 0;
    },
    set(val) {
      this._scrollTop = val;
    },
  });

  Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    get() {
      return this._clientHeight || 0;
    },
    set(val) {
      this._clientHeight = val;
    },
  });

  Object.defineProperty(window.HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return this._offsetHeight || 0;
    },
    set(val) {
      this._offsetHeight = val;
    },
  });

  Object.defineProperty(window.HTMLElement.prototype, 'innerText', {
    configurable: true,
    get() {
      return this.textContent;
    },
    set(val) {
      this.textContent = val;
    },
  });

  // Reset spies before importing the JS.
  resetSpies();

  delete require.cache[require.resolve('../index.js')];
  require('../index.js');

  testimonialContainer = document.getElementById('testimonial-container');
};
/* ---------------------------------- *
 * ----- BROWSER TESTING SET-UP ----- *
 * ---------------------------------- */

const TOTAL_TESTIMONIAL_COUNT = getTestimonials(10000).testimonials.length;
const PAGE_SIZE = 5;
const TOTAL_TESTIMONIAL_PAGES = Math.ceil(TOTAL_TESTIMONIAL_COUNT / PAGE_SIZE);

// Default values mimic scrolling to the bottom of the testimonial container.
const triggerScroll = async (scrollHeight = 100, scrollTop = 50, clientHeight = 50) => {
  testimonialContainer.scrollHeight = scrollHeight;
  testimonialContainer.scrollTop = scrollTop;
  testimonialContainer.clientHeight = clientHeight;
  testimonialContainer.offsetHeight = clientHeight;

  testimonialContainer.dispatchEvent(new window.Event('scroll'));
  // Flush async browser behavior.
  await new Promise(setImmediate);
};

const assertNumberOfTestimonialElements = n => {
  const testimonialElements = document.querySelectorAll('.testimonial');
  expect(testimonialElements.length).to.be.equal(n);
};

describe('infinite scroll', () => {
  beforeEach(() => {
    resetDom();
  });

  describe('before scrolling', () => {
    it('a page of testimonial elements should be added to the DOM', () => {
      assertNumberOfTestimonialElements(PAGE_SIZE);
    });

    it('testimonial elements should have the correct text', () => {
      const {testimonials} = getTestimonials(PAGE_SIZE);
      const testimonialElements = document.querySelectorAll('.testimonial');
      testimonialElements.forEach((testimonialElement, i) => {
        expect(testimonialElement.textContent).to.be.equal(testimonials[i].message);
      });
    });
  });

  describe('when scrolling', () => {
    it('scrolling once should add another page of testimonials elements to the DOM', async () => {
      await triggerScroll();
      assertNumberOfTestimonialElements(PAGE_SIZE * 2);
    });

    it(`scrolling past the max amount of testimonials shouldn't add more testimonial elements to the DOM`, async () => {
      // Mimic reaching the cap of our API.
      for (i = 1; i < TOTAL_TESTIMONIAL_PAGES; i++) {
        await triggerScroll();
      }
      assertNumberOfTestimonialElements(TOTAL_TESTIMONIAL_COUNT);
      await triggerScroll();
      await triggerScroll();
      await triggerScroll();
      await triggerScroll();
      assertNumberOfTestimonialElements(TOTAL_TESTIMONIAL_COUNT);
    });

    it(`scrolling past the max amount of testimonials shouldn't make calls to the API`, async () => {
      // Mimic reaching the cap of our API.
      for (i = 1; i < TOTAL_TESTIMONIAL_PAGES; i++) {
        await triggerScroll();
      }
      // Trigger extra scrolls.
      await triggerScroll(); // This shouldn't call the API.
      await triggerScroll(); // This shouldn't call the API.
      expect(global.fetch).to.have.been.called.exactly(TOTAL_TESTIMONIAL_PAGES); // Last 2 scrolls didn't call API.
    });
  });
});
