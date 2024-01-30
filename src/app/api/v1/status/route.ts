export async function GET(request: Request) {
  const response = new Response(JSON.stringify({ status: "ok" }), {
    headers: { "content-type": "application/json" },
  });
  return response;
}
