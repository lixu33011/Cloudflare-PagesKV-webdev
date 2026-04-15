export async function onRequestGet(context) {
try {
const { env, params } = context;
const data = await env.FILE_KV.get(`file:${params.id}`);
if (!data) {
return Response.json({ error: "不存在" }, { status: 404 });
}
const f = JSON.parse(data);
const bin = atob(f.base64);
const bytes = new Uint8Array(bin.length);
for (let i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
return new Response(bytes, {
headers: {
"Content-Type": f.type || "application/octet-stream",
"Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(f.name)}`
}
});
} catch (e) {
return Response.json({ error: e.message }, { status: 500 });
}
}
