# Simplify hero, single photo, LinkedIn call to action

## What changes

1. **Order of the page**: Hero, then Experience, then Projects, then Education, Community and Contact. Remove the four project tiles from the top so projects only appear once, after Experience.
2. **One photo, not three**: Replace the three-frame strip with a single portrait cut from your existing strip (the top frame by default; say if you prefer the middle or bottom). Same editorial frame and social links under it, sized larger so it sits in proportion with your name on mobile and desktop.
3. **Discreet CV download**: Remove the big "Download CV" button and the "PDF · October 2026" label. Keep a small "CV" download link in the top menu, plus one quiet underlined "Download CV" link in the contact area.
4. **Main call to action = LinkedIn**: Where the CV button sat, add a clear "Follow me on LinkedIn" button linking to https://www.linkedin.com/in/nikahamid. The contact section's headline button also becomes "Follow on LinkedIn".
5. Spotify "now playing" card stays below the call to action.

## Technical details

- Crop the top third of the supplied strip with ffmpeg, upload it as a new asset pointer, and use it in `PhotoBooth.tsx` (original strip pointer kept, not deleted).
- `src/routes/index.tsx`: delete the hero project grid and CV button/label, add the LinkedIn primary button, simplify the hero grid rows, and move `<ProjectsSection />` directly after the Experience section (already true; confirm order and remove the duplicate top listing).
- Verify at 390px and 1280px with Playwright for no overlap or overflow.
