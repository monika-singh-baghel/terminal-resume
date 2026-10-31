export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, email, message } = req.body || {};
  if (!name || !/^\S+@\S+\.\S+$/.test(email || "") || !message || message.length > 2000)
    return res.status(400).json({ error: "Invalid input" });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Resume Contact <onboarding@resend.dev>",
      to: ["2829monikasingh@gmail.com"],
      reply_to: email,
      subject: `New message from ${String(name).slice(0, 80)}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });
  res.status(r.ok ? 200 : 502).json({ ok: r.ok });
}
