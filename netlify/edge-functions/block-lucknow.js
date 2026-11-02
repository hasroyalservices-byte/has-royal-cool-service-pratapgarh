export default async (request, context) => {
  // Netlify ke geolocation data se user ki city nikalna
  const city = context.geo?.city || "";

  // Agar user Lucknow se hai, toh security aur spam/abuse ki wajah se block karna
  if (city.toLowerCase() === "lucknow") {
    return new Response(
      `<!DOCTYPE html>
      <html lang="hi">
      <head>
          <meta charset="UTF-8">
          <title>Access Restricted</title>
          <style>
              body { font-family: Arial, sans-serif; background-color: #f4f6f9; text-align: center; padding-top: 80px; color: #333; }
              .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
              h1 { color: #d9534f; }
              p { line-height: 1.6; color: #555; }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Access Restricted</h1>
              <p><b>Notice:</b> Due to repeated spam submissions, unauthorized form entries, and abusive behavior detected from this region, access to this website has been temporarily restricted by the administrator to protect system integrity.</p>
              <p>If you believe this is a mistake, please contact the service provider directly.</p>
          </div>
      </body>
      </html>`,
      {
        status: 403,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  // Baaki sabhi legitimate locations ke liye traffic allow karna
  return context.next();
};

export const config = {
  path: "/*", // Puri website ke har ek page par ye rule apply hoga
};