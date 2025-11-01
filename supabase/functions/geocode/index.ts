import { corsHeaders } from '../_shared/cors.ts';

console.log("Geocode function started");

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, lat, lon } = await req.json();
    const apiKey = Deno.env.get('OPENROUTESERVICE_API_KEY');

    if (!apiKey) {
      throw new Error('OpenRouteService API key not configured');
    }

    let url: string;
    
    // If lat/lon provided, do reverse geocoding
    if (lat && lon) {
      url = `https://api.openrouteservice.org/geocode/reverse?api_key=${apiKey}&point.lon=${lon}&point.lat=${lat}`;
    } else if (query) {
      // Forward geocoding (search)
      url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(query)}&size=5`;
    } else {
      throw new Error('Either query or lat/lon must be provided');
    }

    console.log('Fetching from OpenRouteService:', url.replace(apiKey, '***'));

    const response = await fetch(url);
    const data = await response.json();

    console.log('Geocoding response received');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Geocoding error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
