const RESUME = `
Name: Monika Singh. Location: Mohali, India. Email: 2829monikasingh@gmail.com. Phone: +919243146635.
Links: GitHub https://github.com/monika-singh-baghel ; LinkedIn https://www.linkedin.com/in/monika-singh-578701279/ ;
Codolio https://codolio.com/profile/cFfVFNmG ; LeetCode https://leetcode.com/u/monikasingh_91/ ;
HackerRank https://www.hackerrank.com/profile/3891monikasingh ; Codeforces https://codeforces.com/profile/3891monikasingh ;
CodeChef https://www.codechef.com/users/monikasingh_91

SUMMARY: Strong understanding of C/C++, data structures and algorithms, operating systems concepts and memory management.
Basic understanding of databases and SDLC. Problem-solving mindset, good communication and teamwork.

EDUCATION: B.E. Computer Science, Chandigarh University, Mohali, May 2023 - Present, CGPA 8.67.
Intermediate (CBSE), Chanakya Public School, Satna, 90.4%. Matriculation (CBSE), Chanakya Public School, Satna, 93%.

EXPERIENCE:
- Web Development Intern, Skillcraft Technology (Remote), Jun 2025 - Jul 2025. Built responsive websites with HTML, CSS, JavaScript, Bootstrap; implemented authentication and authorization. Tech: React, Node.js, Express, MongoDB, Tailwind CSS.
- Data Science Intern, Chandigarh University (Remote), May 2025 - Jun 2025. Data analysis and machine learning with Python; visualizations with Matplotlib and Seaborn.

PROJECTS:
- GovAi: Complaint Management and Resolution System (Oct 2025 - Apr 2026). Full-stack app for complaint registration, tracking and management. REST APIs with Node.js and Express, MongoDB Atlas, authentication, authorization, CORS, deployed on Vercel and Render. Tech: React, Node.js, Express, MongoDB, Tailwind CSS, TypeScript. Live: https://govai-complaint-system.vercel.app/
- SyncMeet: Real-Time Video Conferencing Platform (Apr 2026 - Jun 2026). Peer-to-peer audio/video with WebRTC and Socket.IO, STUN/ICE signaling, SDP negotiation, screen sharing, real-time chat, meeting history, bcrypt and token-based auth. Tech: WebRTC, Socket.IO, React, Node.js, Express, MongoDB, Material UI, Axios, Context API.

SKILLS: Languages: C, C++, Java, Python, HTML. Frameworks: React, React Native, Tailwind CSS, JavaScript, TypeScript. Tools: VS Code, Git, GitHub, Jest. Databases: SQL, NoSQL. Soft skills: problem-solving, communication, teamwork. Spoken: English, Hindi.

CERTIFICATIONS: Cloud Computing (NPTEL, 2025). Project Expo 2025 Phase 3, Chandigarh University (VibeFlow music player). Tekathon 4.0 internal hackathon of Smart India Hackathon, Chandigarh University, 2025.

INVOLVEMENT: Volunteer at IEEE Computational Intelligence (event coordination, technical activities). Class Representative, Chandigarh University, 4th and 5th semester.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const q = String(req.body?.question || "").slice(0, 300);
  if (!q) return res.status(400).json({ error: "Empty question" });

  try {
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": process.env.GEMINI_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text:
                "You answer questions about Monika Singh using ONLY the resume below. " +
                "If the answer is not in it, say you don't know. Plain text, no markdown, keep it short.\n\n" +
                RESUME,
            }],
          },
          contents: [{ role: "user", parts: [{ text: q }] }],
          generationConfig: { temperature: 0, maxOutputTokens: 400 },
        }),
      }
    );
    const d = await r.json();
    res.json({
      answer: d.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no answer right now.",
    });
  } catch (e) {
    res.status(500).json({ answer: "Sorry, the assistant is unavailable right now." });
  }
}
