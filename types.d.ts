// shim / compat
declare const WebKitMutationObserver: any

// greasemonkey
declare const GM_getValue: <T>(key: string, defaultValue: T) => T
declare const GM_setValue: <T>(key: string, value: T) => void
declare const GM_registerMenuCommand: (
  message: string,
  callback: () => void,
) => void

// Chart.js
declare const myPie: Function
declare const Chart: any

// google
declare const googleDocsUtil: any
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

/**
 * Query for new DOM nodes matching a specified selector.
 *
 * @override
 */
declare const onElementReady: (
  selector: string,
  options: { findFirst?: boolean; findOnce?: boolean },
  callback: (el: HTMLElement) => void,
) => void
/**
 * Query for new DOM nodes matching a specified selector.
 *
 * @override
 */
declare const queryForElements: (
  selector: string,
  options: { findFirst?: boolean; findOnce?: boolean },
  callback: (el: HTMLElement) => void,
) => void

/**
 * <br>
 *
 * **converted this stupid type, when possible, to `HTMLElement`** */
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

declare interface Document {
  // readonly scrollingElement: HTMLElement | null
  elementFromPoint(x: number, y: number): HTMLElement | null
  elementsFromPoint(x: number, y: number): HTMLElement[]
  getElementsByClassName(classNames: string): HTMLCollectionOf<HTMLElement>

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
