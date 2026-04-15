export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return Response.json({ error: "未选择文件" }, { status: 400 });
        }

        const key = Math.random().toString(36).slice(2, 10);
        const arrayBuffer = await file.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

        await env.FILE_KV.put(`file:${key}`, JSON.stringify({
            name: file.name,
            type: file.type,
            size: file.size,
            base64
        }));

        // ✅ 这是【直接下载链接】，不会跳主页
        const downloadUrl = `${new URL(request.url).origin}/api/${key}`;

        return Response.json({
            key: key,
            downloadUrl: downloadUrl
        });

    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
