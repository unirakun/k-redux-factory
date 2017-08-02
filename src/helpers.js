export const reducer = mapper =>
  // middleware signature
  () => () => () => ctx => mapper(ctx.action, ctx.state)


export const mapAction = mapper =>
  // middleware signature
  () => () => () => ctx => ({
    ...ctx,
    action: mapper(ctx.action),
  })

export const mapPayload = actionMatches => mapper =>
  // middleware signature
  () => () => () => (ctx) => {
    const { payload, type } = ctx.action
    if (!actionMatches || actionMatches.test(type)) {
      return mapAction(action => ({ ...action, payload: mapper(payload) }))()()()(ctx)
    }
    return ctx
  }
