// Jednoduchý scraper pre demo účely
export default async function handler(req, res) {
  // Povolíme CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // DEMO DATA - simulujeme akcie z obchodov
    const currentDate = new Date();
    const validUntil = new Date(currentDate);
    validUntil.setDate(validUntil.getDate() + 7);
    
    const demoDeals = [
      {
        store: 'Tesco',
        product: 'Bravčové mäso 1kg',
        originalPrice: 5.99,
        salePrice: 3.99,
        category: 'maso',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 33
      },
      {
        store: 'Lidl',
        product: 'Kuracie prsia 500g',
        originalPrice: 4.49,
        salePrice: 2.99,
        category: 'maso',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 33
      },
      {
        store: 'Kaufland',
        product: 'Mlieko 1L',
        originalPrice: 1.29,
        salePrice: 0.89,
        category: 'mlieko',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 31
      },
      {
        store: 'Tesco',
        product: 'Banány 1kg',
        originalPrice: 1.79,
        salePrice: 0.99,
        category: 'ovocie',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 45
      },
      {
        store: 'Lidl',
        product: 'Šampón Pantene',
        originalPrice: 4.99,
        salePrice: 2.99,
        category: 'kozmetika',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 40
      }
    ];

    console.log(`✅ Vygeneroval som ${demoDeals.length} demo akcií`);

    return res.status(200).json({
      success: true,
      message: `Scraper dokončený! Nájdených ${demoDeals.length} akcií`,
      deals: demoDeals,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Chyba v scraperi:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
