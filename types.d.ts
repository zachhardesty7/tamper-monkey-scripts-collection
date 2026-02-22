// #region - misc
// shim / compat
declare const WebKitMutationObserver: any

// #region - scripts
// Chart.js
declare const myPie: Function
declare const Chart: any

// google
declare interface GoogleDocNode {
  index: number
  line: number
  lineIndex: number
  node: Element
  lineElement: Element
  text: string
}
declare interface GoogleDoc {
  nodes: GoogleDocNode[]
  text: string[]
  selectedText: string
  caret: {
    index: number
    lineIndex: number
    line: number
  }
  selectionRect: DOMRect
}

// piazza
declare const P: any

// youtube
declare const ytInitialData: any
declare const ytcfg: any

// FrankerFaceZ on Twitch
declare interface FFZHTMLVideoElement extends HTMLVideoElement {
  _ffz_compressor?: DynamicsCompressorNode
}
// #endregion

// #region - utils
interface OnElementReadyOptions {
  /**
   * stop querying after first successful pass and remove mutation observer
   *
   * @default false
   */
  findFirst?: boolean
  /**
   * find each element only a single time
   *
   * @default true
   */
  findOnce?: boolean
  /**
   * query based on specified `root` or `document`
   *
   * @default document
   */
  root?: Document | ShadowRoot | null
}

/** callback executed on each found/changed element */
type OnElementReadyCallback = (el: HTMLElement) => void

/** resolves with first found element */
type OnElementReadyReturn = Promise<Element>

/**
 * Wait for elements with a given CSS selector to enter the DOM. Returns a `Promise`
 * resolving with found/changed element and triggers a callback for every found/changed
 * element.
 */
declare let onElementReady: (
  /** CSS selector of elements to search / monitor */
  selector: string,
  options?: OnElementReadyOptions,
  /** callback executed on each found/changed element */
  callback?: OnElementReadyCallback,
) => Promise<Element>

/**
 * Internal function used by {@link onElementReady} to query for new DOM nodes matching a
 * specified selector.
 */
declare let queryForElements: (
  selector: string,
  options: OnElementReadyOptions,
  callback: OnElementReadyCallback,
) => void
// #endregion

// #region hide - overrides
/**
 * <br>
 *
 * **converted this stupid type, when possible, to `HTMLElement`**
 */
declare interface Element {
  nextElementSibling: HTMLElement | null
  previousElementSibling: HTMLElement | null
  onfullscreenchange: ((this: Element, ev: Event) => any) | null
  onfullscreenerror: ((this: Element, ev: Event) => any) | null
  getElementsByClassName(classNames: string): HTMLCollectionOf<HTMLElement>
  getElementsByTagName(qualifiedName: string): HTMLCollectionOf<HTMLElement>
  getElementsByTagNameNS(
    namespaceURI: string,
    localName: string,
  ): HTMLCollectionOf<HTMLElement>
  insertAdjacentElement(
    position: InsertPosition,
    insertedElement: Element,
  ): HTMLElement | null
  addEventListener<K extends keyof ElementEventMap>(
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  removeEventListener<K extends keyof ElementEventMap>(
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void
}

declare interface Element {
  style: CSSStyleDeclaration
  firstElementChild: HTMLElement | null
  lastElementChild: HTMLElement | null
}

declare interface DocumentOrShadowRoot {
  // readonly scrollingElement: HTMLElement | null
  elementFromPoint(x: number, y: number): HTMLElement | null
  elementsFromPoint(x: number, y: number): HTMLElement[]
}

declare interface Document {
  getElementsByClassName(classNames: string): HTMLCollectionOf<HTMLElement>
}

declare interface ParentNode {
  // keep these so we get advanced types when possible
  querySelector<K extends keyof HTMLElementTagNameMap>(
    selectors: K,
  ): HTMLElementTagNameMap[K] | null
  querySelector<K extends keyof SVGElementTagNameMap>(
    selectors: K,
  ): SVGElementTagNameMap[K] | null
  querySelector(selectors: string): HTMLElement | null

  // keep these so we get advanced types when possible
  querySelectorAll<K extends keyof HTMLElementTagNameMap>(
    selectors: K,
  ): NodeListOf<HTMLElementTagNameMap[K]>
  querySelectorAll<K extends keyof SVGElementTagNameMap>(
    selectors: K,
  ): NodeListOf<SVGElementTagNameMap[K]>
  querySelectorAll(selectors: string): NodeListOf<HTMLElement>
}
// #endregion
