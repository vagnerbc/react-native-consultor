/* eslint-disable no-undef */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    extraNodeModules: {
      data: path.resolve(__dirname, 'src/data'),
      domain: path.resolve(__dirname, 'src/domain'),
      infra: path.resolve(__dirname, 'src/infra'),
      jest: path.resolve(__dirname, 'src/jest'),
      main: path.resolve(__dirname, 'src/main'),
      presentation: path.resolve(__dirname, 'src/presentation'),
      types: path.resolve(__dirname, 'src/types'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  }
}
