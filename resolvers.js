const resolverMap = {
    Query: {
        background: (obj, args, context, info) => {
            console.log('getting here background')
            return 'background'
        }
    }
}