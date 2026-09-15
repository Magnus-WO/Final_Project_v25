export default async function handler(req, res) {
  console.log("Currency function called");

  const { currency } = req.query;

  if (!currency) {
    return res.status(400).json({
      error: "Currency is required",
    });
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/pair/NOK/${currency}/100`;

    console.log(
      "Requesting:",
      url.replace(process.env.CURRENCY_API_KEY, "***"),
    );

    const response = await fetch(url);

    console.log("ExchangeRate API status:", response.status);

    const data = await response.json();

    console.log("ExchangeRate API response:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || "Exchange rate request failed",
      });
    }

    return res.status(200).json({
      conversion_rate: data.conversion_rate,
    });
  } catch (error) {
    console.error("Currency function error:", error);

    return res.status(500).json({
      error: "Failed to fetch exchange rate",
      details: error.message,
    });
  }
}
