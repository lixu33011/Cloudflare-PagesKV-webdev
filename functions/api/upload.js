export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) return Response.json({ error: "no file" }, { status: 400 });

    // 生成随机key
    const key = Math.random().toString(36).slice(2, 10);

    // 文件转 base64
    const bytes = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(bytes)));

    // 存入 KV
    await env.FILE_KV.put(`file:${key}`, JSON.stringify({
      name: file.name,
      type: file.type,
      size: file.size,
      base64,
      time: new Date().toISOString()
    }));

    return Response.json({
      key,
      url: `${new URL(request.url).origin}/share.html?key=${key}`
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
