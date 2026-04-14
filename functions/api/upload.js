export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "no file" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }

    const key = Math.random().toString(36).slice(2, 10);
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    await env.ktv.put(`file:${key}`, JSON.stringify({
      name: file.name,
      type: file.type,
      size: file.size,
      base64
    }));

    return new Response(JSON.stringify({
      key,
      shareUrl: `${new URL(request.url).origin}/share/${key}`
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
