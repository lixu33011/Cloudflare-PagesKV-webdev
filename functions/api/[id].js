export async function onRequestGet(context) {
  try {
    const { env, params } = context;
    const data = await env.ktv.get(`file:${params.id}`);

    if (!data) {
      return new Response(JSON.stringify({ error: "not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404
      });
    }

    return new Response(data, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
