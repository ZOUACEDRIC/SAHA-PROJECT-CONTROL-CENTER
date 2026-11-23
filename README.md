# SAHA Project Control Center

Central portfolio dashboard for the projects and repositories managed by ZOUACEDRIC.

## What it does now

- Portfolio overview with counts by status and priority.
- Seeded project register for the known ZOUACEDRIC repositories and major engineering initiatives.
- Search, status filtering, priority view and delivery roadmap.
- Add, edit and delete portfolio records.
- Export the current portfolio as JSON.
- Optional public GitHub metadata check (stars, forks, default branch and last push date) through the unauthenticated GitHub API.
- Responsive desktop and mobile interface.

## Run locally

Open `index.html` in a browser, or serve the folder with any static web server. No build tools are required.

## Deploy

Deploy as a static site on GitHub Pages, Vercel, Netlify or another static host.

## Data and security model — read before use

The dashboard currently stores planning edits in the current browser's `localStorage`. JSON export is available for backup and transfer.

The **Sync public GitHub** button can retrieve metadata only for repositories visible without authentication. Private repositories return no public metadata. This browser-only application deliberately does not ask for or store a GitHub personal access token. Never put a GitHub token in frontend JavaScript, HTML, `localStorage`, or a public repository.

Statuses, priorities, health notes and next actions are management assessments, not GitHub issue state, CI state, deployment telemetry or proof that a feature works. The last public metadata check is displayed separately.

## Next integration milestone: secure live portfolio

To become a true multi-device, team-wide control center, add a server-side integration:

1. Authenticate the owner and approved team members.
2. Connect GitHub through a GitHub App (recommended) or a server-side OAuth flow with least-privilege repository permissions.
3. Keep installation credentials and tokens exclusively in server-side encrypted secrets.
4. Sync repository metadata, branches, commits, open issues, pull requests and GitHub Actions runs through scheduled jobs and on-demand refresh.
5. Store portfolio records, tasks, assignments, milestones and audit history in a shared PostgreSQL database.
6. Add role-based access, activity history, backups and error monitoring.
7. Add deployment-provider integrations only after the GitHub integration is stable.

Do not claim a repository, CI workflow or deployment is healthy merely because the dashboard itself loads.

## Portfolio delivery rule

**Finish → Test → Deploy → Monetize → Expand.**

Keep active work limited, assign one accountable owner per next action, and verify every release before marking it complete.
