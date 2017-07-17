export const mapAction = mapper => () => () => ctx => ({
  ...ctx,
  action: mapper(ctx.action),
})

export const mapPayload = actionMatches => mapper => () => () => (ctx) => {
  const { payload, type } = ctx.action
  if (!actionMatches || actionMatches.test(type)) {
    return mapAction(action => ({ ...action, payload: mapper(payload) }))()()(ctx)
  }
  return ctx
}
