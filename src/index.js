function getRandomValue (minimal = 0, maximum = 1) {
  return Math.floor(Math.random() * (maximum - minimal + 1)) + minimal
}

function getRandomCharacter () {
  return String.fromCharCode(getRandomValue(97, 122))
}

function getRandomWord (minimal = 3, maximum = 8) {
  let randomWord = ``
  for (let index = 0; index < getRandomValue(minimal, maximum); index++) {
    randomWord += getRandomCharacter()
  }
  return randomWord
}

function getRandomWordBundle (minimal = 5, maximum = 10) {
  let randomWordBundle = ``
  for (let index = 0; index < getRandomValue(minimal, maximum); index++) {
    randomWordBundle += `${getRandomWord()} `
  }
  return randomWordBundle
}

function getRandomParagraph (minimal = 5, maximum = 10) {
  let randomSentence = getRandomWordBundle().trim()
  for (let index = 0; index < getRandomValue(minimal, maximum); index++) {
    randomSentence += `, ${getRandomWordBundle().trim()}`
  }
  return `${randomSentence.charAt(0).toUpperCase() + randomSentence.slice(1)}.`
}

function getPlaceholder (type, minimal, maximum) {
  minimal = Number(minimal)
  maximum = Number(maximum)
  let randomSentence = getRandomWordBundle(minimal, maximum).trim()
  switch (type) {
    case `heading`:
      return `${randomSentence.charAt(0).toUpperCase() + randomSentence.slice(1)}`
    case `sentence`:
      return `${randomSentence.charAt(0).toUpperCase() + randomSentence.slice(1)}.`
    case `paragraph`:
      return getRandomParagraph(minimal, maximum)
    case `capitalize`:
      return randomSentence.split(` `).map(capitalize => capitalize.substring(0, 1).toUpperCase() + capitalize.substring(1)).join(` `)
  }
}

function getData () {
  let dataLocation = document.querySelectorAll(`*`)
  for (let index = 0; index < dataLocation.length; index++) {
    if (dataLocation[index].dataset.placeholderText !== undefined) {
      if (dataLocation[index].dataset.placeholderText) {
        dataLocation[index].innerHTML = getPlaceholder(...dataLocation[index].dataset.placeholderText.split(`,`))
      } else {
        dataLocation[index].innerHTML = getPlaceholder()
      }
    }
  }
}

getData()
