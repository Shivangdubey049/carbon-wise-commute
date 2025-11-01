import { corsHeaders } from '../_shared/cors.ts';

console.log("Calculate route function started");

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { start, end, profile = 'foot-walking' } = await req.json();
    const apiKey = Deno.env.get('OPENROUTESERVICE_API_KEY');

    if (!apiKey) {
      throw new Error('OpenRouteService API key not configured');
    }

    // Validate coordinates
    if (!start || !end || !start.lon || !start.lat || !end.lon || !end.lat) {
      throw new Error('Start and end coordinates required');
    }

    console.log('Calculating route:', { start, end, profile });

    const url = `https://api.openrouteservice.org/v2/directions/${profile}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates: [[start.lon, start.lat], [end.lon, end.lat]],
        instructions: true,
        elevation: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouteService API error:', errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Route calculated successfully');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Route calculation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
