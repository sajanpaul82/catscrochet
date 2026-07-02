# Cats Crochet Deployment Notes

This is a static mobile-only website. It can be hosted for free on static hosts because it only uses HTML, CSS, JavaScript, and SVG assets.

## Easiest Free Option: Netlify Drop

1. Go to https://app.netlify.com/drop
2. Drag the whole `crochet-shop` folder onto the page.
3. Netlify will create a public `.netlify.app` URL.
4. To update the site later, drag the updated folder into the same site's deploy area.

## GitHub Pages Option

1. Create a free GitHub account if needed.
2. Create a public repository.
3. Upload the files inside this `crochet-shop` folder.
4. In the repository, open Settings, then Pages.
5. Publish from the main branch.

GitHub Pages hosts static HTML, CSS, and JavaScript directly from a repository.

## Important Admin Note

The included admin page has a lightweight password screen.

Default admin password:

```text
CrochetAdmin2026!
```

To change it, edit `ADMIN_PASSWORD` in `admin.js`.

This password is only a front-end guard. Because this is a static website, someone technical could inspect the site files and find or bypass it. It is useful for testing and casual protection, but it is not secure enough for a real public admin.

The included admin page also uses browser local storage. That means it is useful for testing, but changes made in admin are saved only in the browser where you edited them. Visitors on other phones will not see those admin changes.

For a real online shop where admin edits update the public site for everyone, use one of these next steps:

- Shopify Starter or Shopify store
- Square Online
- Netlify plus a CMS
- Firebase or Supabase backend
- A small custom backend with login

For taking real payments, use a checkout provider such as Shopify, Square, Stripe, PayPal, or Etsy rather than collecting card details on this static site.
