// Import Firebase (cez fetch API v serverless funkcii)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyD0sUoHDL9818MbPD9Cgsg5DPYwndOy-mE",
      authDomain: "zlavolov.firebaseapp.com",
      projectId: "zlavolov",
      storageBucket: "zlavolov.firebasestorage.app",
      messagingSenderId: "172750905126",
      appId: "1:172750905126:web:3365e888ded6728408ebe7"
    };

    // DEMO DATA - simulujeme scraping
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

    // Uložíme do Firebase pomocou REST API
    const savePromises = demoDeals.map(async (deal) => {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/deals`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: {
              store: { stringValue: deal.store },
              product: { stringValue: deal.product },
              originalPrice: { doubleValue: deal.originalPrice },
              salePrice: { doubleValue: deal.salePrice },
              category: { stringValue: deal.category },
              validUntil: { stringValue: deal.validUntil },
              discount: { integerValue: deal.discount },
              createdAt: { stringValue: deal.createdAt },
              source: { stringValue: deal.source }
            }
          })
        }
      );
      return response.json();
    });

    await Promise.all(savePromises);

    console.log(`✅ Uložil som ${demoDeals.length} akcií do Firebase`);

    return res.status(200).json({
      success: true,
      message: `Scraper dokončený! Pridaných ${demoDeals.length} akcií`,
      deals: demoDeals.length,
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
