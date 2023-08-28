module.exports = {
  samplesResolver: next => (root, args, context, info) => {
      console.log('getting here samplesResolver')
      return next(root, args, context, info)
  }
}