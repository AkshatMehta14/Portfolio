# Personal Website

A modern, animated, single-page site for Akshat Mehta.

How to use

- Open `index.html` in a browser (no build step required).
- Replace placeholder images with your own under `assets/images/` and update `src` in `index.html`.
- Update buttons for your paper and apps with real links.

Customize content

- Edit section text directly in `index.html`.
- Colors and layout are controlled via CSS variables at the top of `styles.css`.
- Animations: scroll reveal uses IntersectionObserver, parallax uses `data-parallax` attributes, and hover tilt applies to elements with the `tilt` class.

Images

- Add your photos to `assets/images/` and change `img src` paths accordingly.
- Keep image sizes reasonable (under ~300KB) for performance.

Deployment

- You can host this on GitHub Pages, Netlify, or Vercel. Just deploy the root folder.

