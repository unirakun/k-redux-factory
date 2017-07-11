export const mapAction = mapper => () => () => ctx => ({
  ...ctx,
  action: mapper(ctx.action),
})

export const mapPayload = actionMatches => mapper => () => () => (ctx) => {
  const { payload, type } = ctx.action
  if (!actionMatches || actionMatches.test(type)) {
    return {
      ...ctx,
      action: {
        ...ctx.action,
        payload: mapper(payload),
      },
    }
  }
  return ctx
}
