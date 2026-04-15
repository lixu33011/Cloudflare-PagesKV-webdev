export async function onRequestGet(context) {
  try {
    const { env, params } = context;
    const data = await env.FILE_KV.get(`file:${params.id}`);

    if (!data) {
      return Response.json({ error: "not found" }, { status: 404 });
    }

    return Response.json(JSON.parse(data));
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
