// ==UserScript==
// @name         IMDB Table Gradient
// @namespace    https://openuserjs.org/users/zachhardesty7
// @version      0.0.1
// @description  gradient-ify
// @author       Zach Hardesty <zachhardesty7@users.noreply.github.com> (https://github.com/zachhardesty7)
// @match        https://docyx.github.io/imdb-table/*
// @icon         https://icons.duckduckgo.com/ip2/github.io.ico
// @copyright    2019-2021, Zach Hardesty (https://zachhardesty.com/)
// @license      GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @grant        none
// @require      https://greasyfork.org/scripts/419640-onelementready/code/onElementReady.js?version=887637
// ==/UserScript==

/* global onElementReady */

// https://github.com/docyx/imdb-table
onElementReady("table", { findOnce: false }, (el) => {
  for (const cell of el.querySelectorAll("td")) {
    const val = Number.parseFloat(cell.textContent)
    let color
    // color = `hsl(${(Math.max(0, val - 5)) * 25}deg 90% 50%)`
    /*
      if (val >= 8.5) {
        // color = `hsl(${(val - 8.5) / 1.5 * 100 + 45}deg 90% 50%)`
        color = `hsl(${(val - 8.5) * 100 + 45}deg 90% 50%)`
      } else if (val >= 7.5) {
        color = `hsl(${(val - 7.5) * 20 + 25}deg 90% 50%)`
      } else if (val >= 6.5) {
        color = `hsl(${(val - 6.5) * 25}deg 90% 50%)`
      } else if (val >= 5.5) {
        // color = `hsl(${(val - 5.5) * 100 + 45}deg 90% 50%)`
        color = `hsl(0deg 90% ${(val - 5.5) * 50}%)`
      } else {
        color = `hsl(0deg 0% 0%)`
        // color = `hsl(${(val - 8.5) / 1.5 * 100 + 45}deg 90% 50%)`
      }
      */

    /*
      if (val >= 7.5) {
        color = `hsl(${(val - 7.5) / 1.5 * 100 + 45}deg 90% 50%)`
      } else if (val >= 6.5) {
        color = `hsl(${(val - 6.5) * 20 + 25}deg 90% 50%)`
      } else if (val >= 5.5) {
        color = `hsl(${(val - 5.5) * 25}deg 90% 50%)`
      } else {
        color = `hsl(0deg 90% ${(val) / 5.5 * 25 + 25}%)`
      }
      */

    /* slight blue above 9, orange too quickly
      if (val >= 9.5) {
        color = `hsl(145deg 90% 50%)`
      } else if (val >= 7.5) {
        color = `hsl(${(val - 7.5) / 2 * 100 + 45}deg 90% 50%)`
      } else if (val >= 6.5) {
        color = `hsl(${(val - 6.5) * 20 + 25}deg 90% 50%)`
      } else if (val >= 5.5) {
        color = `hsl(${(val - 5.5) * 25}deg 90% 50%)`
      } else {
        color = `hsl(0deg 90% ${(val) / 5.5 * 25 + 25}%)`
      }
      */

    // green:  hsl(142.09deg 70.56% 45.29%)
    // yellow: hsl( 45.13deg 93.39% 47.45%)
    // orange: hsl( 24.58deg 94.98% 53.14%)
    // red:    hsl(  0.00deg 84.24% 60.20%)

    /* slight blue above 9, orange too quickly, using vars
      const GREEN = 9.5
      const YELLOW = 7.5
      const ORANGE = 6.5
      const RED = 5.5
      if (val >= GREEN) {
        color = `hsl(142deg 90% 50%)`
      } else if (val >= YELLOW) {
        color = `hsl(${(val - YELLOW) / (GREEN - YELLOW) * 97 + 45}deg 90% 50%)`
      } else if (val >= ORANGE) {
        color = `hsl(${(val - ORANGE) / (YELLOW - ORANGE) * 20 + 25}deg 90% 50%)`
      } else if (val >= RED) {
        color = `hsl(${(val - RED) / (ORANGE - RED) * 25}deg 90% 50%)`
      } else {
        color = `hsl(0deg 90% ${(val) / RED * 25 + 25}%)`
      }
      */

    const GREEN = {
      rating: 9.5,
      h: 142,
      s: 90,
      l: 50,
    }
    const YELLOW = {
      rating: 7.6,
      h: 60,
      s: 90,
      l: 50,
    }
    const ORANGE = {
      rating: 6.5,
      h: 24,
      s: 90,
      l: 50,
    }
    const RED = {
      rating: 5.5,
      h: 0,
      s: 90,
      l: 50,
    }

    if (val >= GREEN.rating) {
      // highest rating, blue
      color = `hsl(142deg 90% 50%)`
    } else if (val >= YELLOW.rating) {
      color = `hsl(${
        ((val - YELLOW.rating) / (GREEN.rating - YELLOW.rating)) *
          (GREEN.h - YELLOW.h) +
        YELLOW.h
      }deg 90% 50%)`
    } else if (val >= ORANGE.rating) {
      color = `hsl(${
        ((val - ORANGE.rating) / (YELLOW.rating - ORANGE.rating)) *
          (YELLOW.h - ORANGE.h) +
        ORANGE.h
      }deg 90% 50%)`
    } else if (val >= RED.rating) {
      color = `hsl(${
        ((val - RED.rating) / (ORANGE.rating - RED.rating)) * (ORANGE.h - RED.h) + RED.h
      }deg 90% 50%)`
    } else {
      color = `hsl(0deg 90% ${(val / RED.rating) * 25 + 25}%)`
    }

    // #region - apply gradient to sat/light
    // // green:  hsl(142.09deg 70.56% 45.29%)
    // // yellow: hsl( 60.00deg 93.39% 47.45%)
    // // orange: hsl( 24.58deg 94.98% 53.14%)
    // // red:    hsl(  0.00deg 84.24% 60.20%)

    // const HUES = [142, 60, 24, 0]
    // const SATS = [90, 90, 90, 90]
    // const LIGHTS = [50, 50, 50, 50]

    // let index;

    // if (val >= GREEN.r) {
    //   color = `hsl(142deg 90% 50%)`
    // } else if (val >= YELLOW.r) {
    //   index = 0
    //   color = `hsl(${
    //     ((val - YELLOW.r) / (GREEN.r - YELLOW.r)) * (GREEN.h - YELLOW.h) +
    //     YELLOW.h
    //   }deg 90% 50%)`
    // } else if (val >= ORANGE.r) {
    //   index = 1
    //   color = `hsl(${
    //     ((val - ORANGE.r) / (YELLOW.r - ORANGE.r)) * (YELLOW.h - ORANGE.h) +
    //     ORANGE.h
    //   }deg 90% 50%)`
    // } else if (val >= RED.r) {
    //   index = 2
    //   color = `hsl(${
    //     ((val - RED.r) / (ORANGE.r - RED.r)) * (ORANGE.h - RED.h) + RED.h
    //   }deg 90% 50%)`
    // } else {
    //   color = `hsl(0deg 90% ${(val / RED.r) * 25 + 25}%)`
    // }
    // #endregion

    cell.style.backgroundColor = color
    // background: linear-gradient(90deg, rgba(2,0,36,1) 0%,            rgba(239,68,68,1) 25%,      rgba(249,115,22,1) 50%,          rgba(234,178,8,1) 75%,           rgba(34,197,94,1) 100%);
    // background: linear-gradient(90deg, hsl(243.33deg 100% 7.06%) 0%, hsl(0deg 84.24% 60.2%) 25%, hsl(24.58deg 94.98% 53.14%) 50%, hsl(45.13deg 93.39% 47.45%) 75%, hsl(142.09deg 70.56% 45.29%) 100%)
  }
})
