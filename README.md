# Triad Studio — team portfolio

Responsive multi-page portfolio for Mansur, Yerasyl and Ansar.

## Pages

- Home, Team, three member profiles, Projects, Contact, Sign up, Log in and Profile.
- Light/dark mode saved in `localStorage`.
- Client-side authentication simulation saved in `localStorage`.
- JavaScript form validation with inline errors.
- Search and category filtering on the Projects page.
- GitHub REST API integration for the public repository signal.
- Responsive CSS Grid/Flexbox layouts and animated UI states.

## Run locally

Because the project uses `fetch()` for the GitHub API, run it through a local server rather than opening an HTML file directly:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## Assets

The Mansur and Yerasyl portraits are stored in `assets/team/`. Ansar currently uses a styled initials placeholder because `IMG_5330.heic` was not available in the provided Downloads folder. Replace the placeholder in `ansar.html` and `index.html` after adding the portrait to `assets/team/ansar.jpg`.
