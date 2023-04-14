# Iframe-Scrolling-Overlay

A slim, intuitive overlay to prevent pointer-events and scrolling in iframes if not necessary.

### Installation

Use npm to install the package

```npm install iframe-scrolling-overlay```

### Usage

js
- `import { initIframeOverlays } from "iframe-scrolling-overlay";`

css
- `@import "iframe-scrolling-overlay/dist/css/iframe-scrolling-overlay.min.css`

### API

Use the initIframeOverlays function immediately
 
- `initIframeOverlays(param1, param2)`

This function searches for Iframes and puts an overlay over them if the src-attribute 
of the iframe matches a substring in the array of param1.

#### Parameters

- `param1`: An array of strings which can be substrings of iframes-src-attribute
- `param2`: An object of options.

- `defaultOptions = {
    blur: true,
    dark: true
  }`
- to be continued

#### Examples

- `initIframeOverlays(['google.com/maps', 'myiframe.com/123'], {blur: false})`

## License

This project is licensed under the ISC License.
hese people for their contributions to my project.