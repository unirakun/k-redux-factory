export const payloadWrapper = actionMatches => wrapper => () => () => (ctx) => {
  const { payload, type } = ctx.action
  if (!actionMatches || actionMatches.test(type)) {
    return {
      ...ctx,
      action: {
        ...ctx.action,
        payload: wrapper ? wrapper(payload) : payload,
      },
    }
  }
  return ctx
}
