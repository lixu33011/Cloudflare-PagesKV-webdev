export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) return Response.json({ error: 'no file' }, { status: 400 });

    const key = Math.random().toString(36).substring(2, 10);
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    await env.FILE_KV.put(`file:${key}`, JSON.stringify({
      name: file.name,
      type: file.type,
      size: file.size,
      base64,
    }));

    return Response.json({
      key,
      shareUrl: `${new URL(request.url).origin}/share/${key}`
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
