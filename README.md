# Terminal Resume

An interactive, browser-based terminal that showcases my resume through a command-line interface. Type commands, get answers, send me a message, or ask questions about my background.

**Live demo:** https://terminal-resume-kkmn.vercel.app/

Inspired by [ksidharth8/terminal-resume](https://github.com/ksidharth8/terminal-resume).

---

## Features

- **Command-line interface** with a command registry and typo suggestions (`projecs` gives "Did you mean: projects?")
- **Tab autocomplete**, including theme names
- **Command history** with the up and down arrow keys, saved between visits
- **6 themes** (default, dracula, nord, gruvbox, solarized, tokyo) that persist across sessions
- **Interactive `contact` form** with step-by-step prompts, validation, and an `esc` key to cancel; messages arrive as an email
- **AI-powered `ask` command** that answers questions using only the information in my resume
- **Clickable commands and links**, so it also works on mobile
- **`resume` command** that opens my PDF resume

---

## Commands

| Command | Description |
|---|---|
| `man` | List all commands |
| `about` | Profile summary |
| `education` | Academic background |
| `skills` | Technical skills |
| `experience` | Internships |
| `projects` | Projects with links |
| `certifications` | Certifications and events |
| `involvement` | Volunteering and leadership |
| `coding` | Competitive coding profiles |
| `socials` | External links |
| `contact` | Send me a message (interactive) |
| `ask <question>` | Ask about my resume |
| `resume` | Open my resume (PDF) |
| `theme <name>` | Switch theme |
| `whoami` | Who am I? |
| `clear` | Clear the terminal (or press Ctrl+L) |

Example:

```
ask what projects has she built
```

---

## Tech Stack

- HTML, CSS and vanilla JavaScript (single-page terminal UI, no build step)
- Vercel serverless functions (Node.js) for the backend
- [Resend](https://resend.com) for sending contact emails
- Google Gemini API for the `ask` command
- Deployed on Vercel

---

## Project Structure

```
terminal-resume/
├── index.html        # Terminal UI, commands, themes
├── resume.pdf        # Resume opened by the `resume` command
├── api/
│   ├── contact.js    # Serverless function: sends email via Resend
│   └── ask.js        # Serverless function: answers questions via Gemini
├── package.json
├── .env.example      # Names of the required environment variables
└── .gitignore
```

---

## Environment Variables

Never commit real keys. Set these in your Vercel project under **Settings → Environment Variables**:

| Name | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends the contact form emails |
| `GEMINI_API_KEY` | Powers the `ask` command |

For local development, create a `.env.local` file (already git-ignored) with the same two names.

---

## Run Locally

Requires Node.js.

```bash
git clone https://github.com/monika-singh-baghel/terminal-resume.git
cd terminal-resume
npx vercel dev
```

Then open the local URL it prints (usually `http://localhost:3000`). The `/api` routes only work under `vercel dev` or on Vercel, not when opening `index.html` directly.

---

## Deploy

1. Push this repo to GitHub.
2. Import it on [vercel.com](https://vercel.com) (**Add New → Project**).
3. Add `RESEND_API_KEY` and `GEMINI_API_KEY` as environment variables.
4. Click **Deploy**.

---

## Customize It For Yourself

- Edit the command outputs and links in `index.html` (the `C` object in the script).
- Replace the resume text in `api/ask.js` so `ask` answers from your information.
- Change the recipient email in `api/contact.js`.
- Replace `resume.pdf` with your own resume.

---

## Author

**Monika Singh**
B.E. Computer Science, Chandigarh University

- GitHub: [monika-singh-baghel](https://github.com/monika-singh-baghel)
- LinkedIn: [monika-singh-578701279](https://www.linkedin.com/in/monika-singh-578701279/)
- LeetCode: [monikasingh_91](https://leetcode.com/u/monikasingh_91/)
- Codolio: [cFfVFNmG](https://codolio.com/profile/cFfVFNmG)

---

## Acknowledgements

Idea and structure inspired by [ksidharth8/terminal-resume](https://github.com/ksidharth8/terminal-resume) (MIT license).
