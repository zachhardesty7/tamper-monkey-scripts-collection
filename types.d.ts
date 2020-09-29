// shim / compait
declare const WebKitMutationObserver: any

// greasemonkey
declare const GM_getValue: Function
declare const GM_setValue: Function

// Chart.js
declare const myPie: Function
declare const Chart: any

// google
declare const googleDocsUtil: any

// piazza
declare const P: any

// youtube
declare const ytInitialData: any
declare const ytcfg: any

// from onElementReady gist
declare const onElementReady: (
  selector: string,
  options: { findFirst?: boolean; findOnce?: boolean },
  callback: (el: HTMLElement) => void
) => void
declare const queryForElements: (
  selector: string,
  options: { findFirst?: boolean; findOnce?: boolean },
  callback: (el: HTMLElement) => void
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
    localName: string
  ): HTMLCollectionOf<HTMLElement>
  insertAdjacentElement(
    position: InsertPosition,
    insertedElement: Element
  ): HTMLElement | null
  addEventListener<K extends keyof ElementEventMap>(
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void
  removeEventListener<K extends keyof ElementEventMap>(
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void
}

declare interface Element {
  firstElementChild: HTMLElement | null
  lastElementChild: HTMLElement | null
}

declare interface Document {
  readonly scrollingElement: HTMLElement | null
  elementFromPoint(x: number, y: number): HTMLElement | null
  elementsFromPoint(x: number, y: number): HTMLElement[]
  getElementsByClassName(classNames: string): HTMLCollectionOf<HTMLElement>

  // keep these so we get advanced types when possible
  querySelector<K extends keyof HTMLElementTagNameMap>(
    selectors: K
  ): HTMLElementTagNameMap[K] | null
  querySelector<K extends keyof SVGElementTagNameMap>(
    selectors: K
  ): SVGElementTagNameMap[K] | null
  querySelector(selectors: string): HTMLElement | null

  // keep these so we get advanced types when possible
  querySelectorAll<K extends keyof HTMLElementTagNameMap>(
    selectors: K
  ): NodeListOf<HTMLElementTagNameMap[K]>
  querySelectorAll<K extends keyof SVGElementTagNameMap>(
    selectors: K
  ): NodeListOf<SVGElementTagNameMap[K]>
  querySelectorAll(selectors: string): NodeListOf<HTMLElement>
}
