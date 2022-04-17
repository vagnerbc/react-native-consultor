// Test Busca Fonologica Module.
import {
  moduleSqueeze,
  moduleIsOnlyVowels,
  moduleCleanString,
  moduleReplaceLetters,
  toFonema
} from '../busca-fonetica'

describe('Testes do modulo e submodulos da Busca Fonética', () => {
  test('Teste do submodulo squeeze', () => {
    expect(moduleSqueeze('palavvra')).toEqual('palavra')
    expect(moduleSqueeze('palavvvra')).toEqual('palavra')
    expect(moduleSqueeze('palla lavvra')).toEqual('pala lavra')
    expect(moduleSqueeze('serrrrra immmmmmagem')).toEqual('sera imagem')
    expect(moduleSqueeze('   serrrrra immmmmmagem   ')).toEqual('sera imagem')
    expect(moduleSqueeze('')).toEqual('')
  })

  test('Teste do submodulo isOnlyVwels', () => {
    expect(moduleIsOnlyVowels('ra')).toEqual(false)
    expect(moduleIsOnlyVowels('aiou')).toEqual(true)
    expect(moduleIsOnlyVowels('essa')).toEqual(false)
    expect(moduleIsOnlyVowels('    ai  ')).toEqual(true)
    expect(moduleIsOnlyVowels('aa    ai  ')).toEqual(true)
    expect(moduleIsOnlyVowels('')).toEqual(false)
    expect(moduleIsOnlyVowels('a34')).toEqual(false)
    expect(moduleIsOnlyVowels('a;e')).toEqual(false)
  })

  test('Teste do submodulo cleanString', () => {
    expect(moduleCleanString('ra4')).toEqual('RA')
    expect(moduleCleanString('casa  amarela não é verde!')).toEqual(
      'CASA  AMARELA NAO E VERDE'
    )
    expect(moduleCleanString('açúcar')).toEqual('AÇUCAR')
    expect(moduleCleanString('açúcar   ')).toEqual('AÇUCAR')
    expect(moduleCleanString('   sabãõ')).toEqual('SABAO')
    expect(moduleCleanString('açúcar RefINado')).toEqual('AÇUCAR REFINADO')
    expect(moduleCleanString('açúcar RÊfINado  ')).toEqual('AÇUCAR REFINADO')
    expect(moduleCleanString('')).toEqual('')
  })

  test('Teste do submodulo replaceLetters', () => {
    expect(moduleReplaceLetters('ueslei')).toEqual('VSR')
    expect(moduleReplaceLetters('azul')).toEqual('S')
    expect(moduleReplaceLetters('valter')).toEqual('VT')
    expect(moduleReplaceLetters('   ')).toEqual('')
    expect(moduleReplaceLetters('')).toEqual('')
  })

  test('Teste da funcao toFonema', () => {
    expect(toFonema('orgaozinho')).toEqual(toFonema('órgãozinho'))
    expect(toFonema('pollyana')).toEqual(toFonema('poliana'))
    expect(toFonema('wallyson')).toEqual(toFonema('uallison'))
    expect(toFonema('amarelo')).toEqual(toFonema('amarelu'))
    expect(toFonema('passocca')).toEqual(toFonema('páçocá'))
    expect(toFonema('chuchu')).toEqual(toFonema('xuxu'))
    expect(toFonema('casa')).toEqual(toFonema('kasa'))
    expect(toFonema('ueslei')).toEqual(toFonema('wesley'))
    expect(toFonema('ualisom')).toEqual(toFonema('wallysson'))
    expect(toFonema('valter')).toEqual(toFonema('walter'))
    expect(toFonema('walter')).toEqual(toFonema('ualter'))
    expect(toFonema('wilson')).toEqual(toFonema('uilson'))
    expect(toFonema('chapeuzinho')).toEqual(toFonema('xapeusim'))
    expect(toFonema('giovanna')).toEqual(toFonema('geovana'))
    expect(toFonema('macacão')).toEqual(toFonema('macacao'))
    expect(toFonema('macacao')).toEqual(toFonema('macacaho'))
    expect(toFonema('sapato azul')).toEqual(toFonema('sapato asu'))
    expect(toFonema('rua baltazar moreira')).toEqual(
      toFonema('r baltasar morera')
    )
    expect(toFonema('pato talo tato')).toEqual(toFonema('patu talu tatu'))
    expect(toFonema('japão')).toEqual(toFonema('japaum'))
    expect(toFonema('hora')).toEqual(toFonema('ora'))
    expect(toFonema('coca-cola')).toEqual(toFonema('cocacola'))
    expect(toFonema('detergente ypê')).toEqual(toFonema('dertergemte ipe'))
    expect(toFonema('amacianti fofura')).toEqual(toFonema('amaciante fofura'))
    expect(toFonema('sabao em po')).toEqual(toFonema('sabaum pó'))
    expect(toFonema('panetone bauduco')).toEqual(toFonema('panetoni bauducco'))
    expect(toFonema('sabao em pó azulim')).toEqual(
      toFonema('sabaum po asulinho')
    )
    expect(toFonema('açucar; união')).toEqual(toFonema('assuca$ uniaum'))
    expect(toFonema('uau')).toEqual(toFonema('uau'))
  })
})
