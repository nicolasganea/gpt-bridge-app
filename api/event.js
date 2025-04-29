import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST supported' });
  }

  const payload = req.body;

  console.log("📦 Forwarding event to Pipedream:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(
      'https://eongh48k3r3unw8.m.pipedream.net', // 🚨 YOUR PIPEDREAM WEBHOOK
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log("✅ Forwarded to Pipedream:", response.status);

    res.status(200).json({ message: 'Event forwarded to Pipedream successfully ✅' });
  } catch (error) {
    console.error("❌ Error forwarding to Pipedream:", error.message);
    res.status(500).json({ error: 'Failed to forward to Pipedream' });
  }
}
