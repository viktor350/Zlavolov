export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const currentDate = new Date();
    const validUntil = new Date(currentDate);
    validUntil.setDate(validUntil.getDate() + 7);
    
    const demoDeals = [
      {
        store: 'Tesco',
        product: 'Bravčové mäso 1kg (AUTO)',
        originalPrice: 5.99,
        salePrice: 3.99,
        category: 'maso',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 33,
        createdAt: new Date().toISOString(),
        source: 'auto-scraper'
      },
      {
        store: 'Lidl',
        product: 'Kuracie prsia 500g (AUTO)',
        originalPrice: 4.49,
        salePrice: 2.99,
        category: 'maso',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 33,
        createdAt: new Date().toISOString(),
        source: 'auto-scraper'
      },
      {
        store: 'Kaufland',
        product: 'Mlieko 1L (AUTO)',
        originalPrice: 1.29,
        salePrice: 0.89,
        category: 'mlieko',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 31,
        createdAt: new Date().toISOString(),
        source: 'auto-scraper'
      },
      {
        store: 'Tesco',
        product: 'Banány 1kg (AUTO)',
        originalPrice: 1.79,
        salePrice: 0.99,
        category: 'ovocie',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 45,
        createdAt: new Date().toISOString(),
        source: 'auto-scraper'
      },
      {
        store: 'Lidl',
        product: 'Šampón Pantene (AUTO)',
        originalPrice: 4.99,
        salePrice: 2.99,
        category: 'kozmetika',
        validUntil: validUntil.toISOString().split('T')[0],
        discount: 40,
        createdAt: new Date().toISOString(),
        source: 'auto-scraper'
      }
    ];

    return res.status(200).json({
      success: true,
      deals: demoDeals
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
