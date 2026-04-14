export async function onRequestGet(context) {
  const { env, params } = context;
  const key = params.key;
  const data = await env.FILE_KV.get(`file:${key}`);

  if (!data) return Response.json({ error: 'not found' }, { status: 404 });
  return Response.json(JSON.parse(data));
}
