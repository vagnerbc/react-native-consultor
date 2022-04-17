/* eslint-disable eqeqeq */

type FonemaRule = (string | string[])[][]

type FonemasGrafemas = {
  [key: string]: FonemaRule
}

export function toFonema(grafema: string) {
  // Gera um pseudo-fonema para o grafema fornecido.
  if (!grafema || typeof grafema != 'string') {
    return null
  }

  let fonetizada = moduleCleanString(grafema)
  if (!fonetizada) {
    return null
  }

  if (fonetizada.split(' ').length > 1) {
    const composta = fonetizada.split(' ')
    for (const termo of composta) {
      const index = composta.indexOf(termo)
      if (!moduleIsOnlyVowels(termo)) {
        composta[index] = moduleReplaceLetters(termo)
      }
      fonetizada = composta.join(' ')
    }
  } else {
    if (!moduleIsOnlyVowels(fonetizada)) {
      fonetizada = moduleReplaceLetters(fonetizada)
    }
  }

  fonetizada = moduleSqueeze(fonetizada)
  return fonetizada
}

export function moduleCleanString(word: string) {
  if (!word || typeof word != 'string') {
    return ''
  }

  const no_trailing_spaces = word.trim()
  const only_letters = no_trailing_spaces.replace(/[0-9]/g, '')
  const no_punctuation = only_letters.replace(
    /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g,
    ''
  )
  const in_caps = no_punctuation.toUpperCase()
  word = ''
  for (const letter of in_caps) {
    if (letter == 'Ç') {
      word = word.concat(letter)
    } else {
      word = word.concat(
        letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      )
    }
  }
  return word
}

export function moduleIsOnlyVowels(word: string) {
  /// Checa se a palavra contem somente vogais.
  if (!word || typeof word != 'string') {
    return false
  }
  const test = word.trim().toUpperCase()
  for (const letter of test) {
    if (!/[AEIOU ]/.test(letter)) {
      return false
    }
  }
  return true
}

export function moduleReplaceLetters(grafema: string) {
  /// Substitui as letras por seu pseudo-fonema.
  if (!grafema || typeof grafema != 'string') {
    return ''
  }
  const word = grafema.trim()
  const fonemas_grafemas: FonemasGrafemas = {
    first_all: [
      [['Y'], 'I'],
      [['BR'], 'B'],
      [['PH'], 'F'],
      [['GR', 'MG', 'NG', 'RG'], 'G'],
      [['GE', 'GI', 'RJ', 'MJ', 'NJ'], 'J'],
      [['Q', 'CA', 'CO', 'CU'], 'K'],
      [['LH'], 'L'],
      [['NHO', 'N', 'RM', 'GM', 'MD', 'SM', 'AO'], 'M']
    ],

    second_all: [
      [['NH'], 'N'],
      [['PR'], 'P'],
      [['CH'], 'X'],
      [['Ç', 'X', 'TS', 'CE', 'CI', 'Z', 'RS'], 'S'],
      [['LT', 'TR', 'CT', 'RT', 'ST'], 'T'],
      [['W'], 'V']
    ],

    third_start: [[['U'], 'V']],

    fourth_end: [[['S', 'Z', 'R', 'R', 'M', 'N', 'L'], '']],

    fifth_all: [
      [['L'], 'R'],
      [['C'], 'K']
    ],

    sixth_all: [[['H'], '']],

    seventh_all: [[['A', 'E', 'I', 'O', 'U'], '']]
  }

  let fonetizada = word

  for (const [key, value] of Object.entries(fonemas_grafemas)) {
    if (key.includes('start')) {
      fonetizada = moduleReplacePrefix(fonetizada, value)
    }
    if (key.includes('all')) {
      fonetizada = moduleReplaceAll(fonetizada, value)
    }
    if (key.includes('end')) {
      fonetizada = moduleReplaceSufix(fonetizada, value)
    }
  }
  fonetizada = moduleSqueeze(fonetizada)
  return fonetizada
}

export function moduleReplacePrefix(
  word: string,
  fonemas_grafemas: FonemaRule
) {
  // Checa e substitui no prefixo da palavra.
  word = word.trim().toUpperCase()
  for (const relacao of fonemas_grafemas) {
    for (const termo of relacao[0]) {
      if (word[0] == termo && word.length > 1) {
        word = word.replace(termo, relacao[1] as string)
        word = relacao[1] + word.substring(1)
      }
    }
  }
  return word
}

export function moduleReplaceAll(word: string, fonemas_grafemas: FonemaRule) {
  word = word.trim().toUpperCase()
  for (const relacao of fonemas_grafemas) {
    for (const termo of relacao[0]) {
      while (word.includes(termo)) {
        word = word.replace(termo, relacao[1] as string)
      }
    }
  }
  return word
}

export function moduleReplaceSufix(word: string, fonemas_grafemas: FonemaRule) {
  word = word.trim().toUpperCase()
  for (const relacao of fonemas_grafemas) {
    for (const termo of relacao[0]) {
      if (termo == word[word.length - 1] && word.length > 1) {
        word = word.substring(0, word.length - 1) + relacao[1]
      }
    }
  }
  return word
}

export function moduleSqueeze(word: string) {
  // Substitui letras duplicadas.

  if (!word || typeof word != 'string') {
    return ''
  }
  let result = word.trim()
  try {
    for (let index = 0; index < word.length; index++) {
      if (result[index] == result[index + 1]) {
        const once = result[index].toString()
        const sub = once.toString() + once.toString()
        result = result.replace(sub, once)
        result = moduleSqueeze(result)
      }
    }
  } catch (error) {}
  return result
}
