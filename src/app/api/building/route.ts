
export const runtime = 'edge';
export async function GET() {
    const building = {
        name: "Aurora Tower",
        location: "12 Skyline Drive, Brisbane, QLD 4000",
        numberOfUnits: 120,
        lastRenovated: 2022,
        hasRooftopGarden: true
    };


  return new Response(JSON.stringify(building), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json',
    },
  });
}