export const runtime = 'edge';

let currentPricing = {
  maintenanceFeePerFloor: 200.0, // default fee in AUD
  currency: "AUD",
};

export async function GET() {
  return new Response(JSON.stringify(currentPricing), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  currentPricing = {
    ...currentPricing,
    ...body,
  };

  return new Response(JSON.stringify({
    message: "Pricing updated successfully.",
    newPricing: currentPricing,
  }), {
    headers: {
      'content-type': 'application/json',
    },
  });
}