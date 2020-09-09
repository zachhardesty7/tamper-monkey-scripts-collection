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
