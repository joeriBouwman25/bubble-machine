
import updateGraph from '../d3/D3-graph.js'
import { fetchDataFromAPI } from '../apiData.js'
import { getOpenedSessionData } from './currentSessionData.js'

export const createSession = async () => {
  const sessionUl = document.querySelector('header > ul')
  const sessionId = await fetchDataFromAPI('POST', 'https://bubble-machine-api-dummy.herokuapp.com/rest/session')
  const newSession = document.createElement('li')
  const sessionNumber = document.createTextNode(`Session: ${await sessionId.sessionId}`)
  const sessionLink = document.createElement('a')
  sessionLink.href = `#${await sessionId.sessionId}`
  sessionLink.appendChild(sessionNumber)
  newSession.appendChild(sessionLink)
  newSession.setAttribute('class', sessionId.sessionId)

  const newButton = document.createElement('button')
  const buttonText = document.createTextNode('X')
  newButton.appendChild(buttonText)
  newButton.setAttribute('class', sessionId.sessionId)
  newSession.appendChild(newButton)
  sessionUl.insertAdjacentElement('beforeend', newSession)
  window.location.hash = sessionId.sessionId
  const data = await getOpenedSessionData(window.location.hash.slice(1))
  updateGraph(await data)
}