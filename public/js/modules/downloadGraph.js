/* eslint-disable no-useless-escape */

// https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/

// Function to download svg image
export const downloadSVG = () => {
  // //get svg element.
  const svg2 = document.querySelector('svg')

  // get svg source.
  const serializer = new XMLSerializer()
  let source = serializer.serializeToString(svg2)

  // add name spaces.
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
  }
  if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
  }

  // add xml declaration
  source = '<?xml-stylesheet href="https://bubble-machine.herokuapp.com/css/style.css" version="1.0" standalone="no"?>\r\n' + source

  // convert svg source to URI data scheme.
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)

  // make from button a download svg button
  document.getElementById('downloadSVG').setAttribute('href', url)
  document.getElementById('downloadSVG').setAttribute('download', 'test.svg')
}
