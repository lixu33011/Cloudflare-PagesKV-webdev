export async function onRequestGet(context) {
try {
const { env } = context;
let list = [];
const keys = await env.FILE_KV.list({ prefix: "file:" });
for (let key of keys.keys) {
let json = await env.FILE_KV.get(key.name);
if (!json) continue;
let data = JSON.parse(json);
list.push({
key: key.name.replace("file:", ""),
name: data.name,
size: data.size
});
}
return Response.json(list);
} catch (e) {
return Response.json({ error: e.message }, { status: 500 });
}
}
