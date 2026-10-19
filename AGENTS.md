<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Spotify now-playing is fetched server-side via a refresh-token flow in `src/lib/spotify.functions.ts` (secrets SPOTIFY_CLIENT_ID/SECRET/REFRESH_TOKEN); why: no Spotify connector exists and tokens must stay off the client.
- Outbound links on the portfolio are only rendered when a real, user-supplied destination exists; why: avoid pointing to unrelated pages.
- The public CV is generated with scripts/cv/generate.py using bundled editorial fonts and palette tokens from src/styles.css, then served as a static PDF; why: the download remains cohesive, reproducible and contains only approved public content, not hidden redaction layers.
- The photo-booth figure uses the original uploaded strip through a Lovable Assets pointer and only approved contact destinations; why: preserve the supplied photographs and avoid invented social accounts.
