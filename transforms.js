module.exports = {
    snapshotShareBackgroundResolver: next => (root, args, context, info) => {
        console.log('getting here snapshotShareBackgroundResolver')
        return next(root, args, context, info)
    }
  }