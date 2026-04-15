export async function onRequestGet(context) {
  try {
    const { env, params } = context;
    const data = await env.FILE_KV.get(`file:${params.id}`);

    if (!data) {
      return new Response(JSON.stringify({ error: "文件不存在" }), {
        headers: { "Content-Type": "application/json" },
        status: 404
      });
    }

    const fileData = JSON.parse(data);
    // 把 base64 转回二进制
    const binaryString = atob(fileData.base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // 直接返回文件，触发下载
    return new Response(bytes, {
      headers: {
        "Content-Type": fileData.type,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(fileData.name)}"`,
        "Content-Length": fileData.size.toString()
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
