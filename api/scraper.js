export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vygenerujeme demo akcie
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
      }
    ];

    // Uložíme pomocou Firebase Client SDK
    // Použijeme dynamický import
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getFirestore, collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    const firebaseConfig = {
      apiKey: "AIzaSyD0sUoHDL9818MbPD9Cgsg5DPYwndOy-mE",
      authDomain: "zlavolov.firebaseapp.com",
      projectId: "zlavolov",
      storageBucket: "zlavolov.firebasestorage.app",
      messagingSenderId: "172750905126",
      appId: "1:172750905126:web:3365e888ded6728408ebe7"
    };

    const app = initializeApp(firebaseConfig, `scraper-${Date.now()}`);
    const db = getFirestore(app);

    // Uložíme každú akciu
    const savePromises = demoDeals.map(deal => 
      addDoc(collection(db, 'deals'), deal)
    );
    
    await Promise.all(savePromises);

    return res.status(200).json({
      success: true,
      message: `Scraper dokončený! Pridaných ${demoDeals.length} akcií`,
      deals: demoDeals.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Chyba:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
