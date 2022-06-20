/* eslint-disable no-unmodified-loop-condition */

import updateGraph from '../d3/D3-graph.js'
import { fetchDataFromAPI } from '../apiData.js'

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let play = false

export const autoPlay = async (sessionID) => {
  const counter = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
  const playDiv = document.querySelector("#play")
  const pauseDiv = document.querySelector("#pause")
  playDiv.classList.toggle("hidden")
  pauseDiv.classList.toggle("hidden")

  play = !play
  for (let i = await counter.step; i <= 100; i++) {
    while (play === true) {
      fetchDataFromAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
      const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
      updateGraph(await data)
      await wait(1000)
    }
  }
}