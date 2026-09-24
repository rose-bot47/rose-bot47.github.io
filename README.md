# rose.davison — personal site v2

Rebuilt from scratch on 2026-09-23. **Not deployed and not pushed.** The live site
(rose-bot47.github.io) and the old local folder `Rose'sPortfolio` are untouched.

## What it is
- A brutalist terminal page (the rain, the CRT, the amethyst block wordmark, one block
  per screen) with three cinematic star planes behind the rain, and Swiss rules for the
  images (12-column plates, figure numbers, hairlines) and every clickable thing
  (Helvetica, hard rectangles, one amber accent).
- **Run**: three real sites that open full screen *inside* the page (`#/app/surge`,
  `#/app/starfinder`, `#/app/iris`) with a bar to get back and a new-tab link. Browser
  Back closes them.
- **Coming soon**: SAGE Memory MCP plus the five launch-campaign drafts (labelled as
  drafts, not running).
- **Hardware**: exoskeletons, competition robots, embedded trackers and skills. The
  wording is the existing portfolio's, kept verbatim.
- A small shell at the bottom (`help`, `ls hardware`, `man exoskeleton`, `open surge`).

## Where the apps come from
| Path | Source |
|---|---|
| `apps/surge/` | copy of `Documents/Code/Surge` (index + how-it-works), 2026-09-23 |
| `apps/starfinder/` | `github.com/rose-bot47/StarFinder` at commit `1b7f263`, Apache-2.0 (LICENSE kept) |
| `apps/iris-demo/` | the Iris desktop viewer's real HTML/CSS with a demo script; feeds are drawn in the browser and labelled "simulated" |

If Surge changes, re-copy its two HTML files into `apps/surge/`.

## Run locally
`python -m http.server 8778` in this folder, then open http://127.0.0.1:8778/.
(The apps make live requests to map and elevation services, so serve it over http rather
than opening the file directly.)

## Privacy
SAGE is described generically. No family or personal memory content appears anywhere.
One campaign poster (the local-first one) was left out because its artwork shows real
memory text; that card is copy-only.
