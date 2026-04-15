export async function onRequestDelete(context) {
  try {
    const { env, params } = context;
    await env.FILE_KV.delete(`file:${params.key}`);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
