# Project Requirements

## 1. What is this?
A digital agency portfolio website that shows off 3D and motion design skills to potential clients.

## 2. Who uses it?
- Who: potential clients, visitors browsing the agency's work
- How many people: public site, unlimited visitors
- Devices: must work well on both phone and desktop, phone-first

## 3. Features

### Feature 1: Hero section
- What it does: Full-screen intro with a 3D visual (a rotating object or abstract floating shapes) and a bold headline/tagline
- Done when: I open the page and see a smooth 3D visual animating within 2 seconds, with a headline over it

### Feature 2: Services section
- What it does: Lists the agency's services (e.g. 3D design, motion graphics, web development) as cards or a grid
- Done when: I scroll to this section and see each service clearly with a short description

### Feature 3: Portfolio section
- What it does: A grid or gallery of sample work items (use placeholder images/cards for now, real ones added later)
- Done when: I scroll to this section and see a responsive grid of work samples

### Feature 4: About section
- What it does: Short text about the agency, its style, and approach
- Done when: I scroll to this section and see readable text with maybe a subtle animation

### Feature 5: Contact section
- What it does: A contact form (name, email, message) or contact details, plus a call-to-action button
- Done when: I scroll to this section and see a working form layout (does not need to actually send email yet)

### Feature 6: 3D and motion effects
- What it does: Abstract floating shapes (spheres, cubes, blobs) in the background, particles/glow effects, and scroll-triggered animations (elements fade/slide in as I scroll)
- Done when: shapes move smoothly, particles/glow are visible, and sections animate in as I scroll down on both phone and desktop

## 4. NOT included (out of scope)
- No backend, no database, no real form submission yet
- No user login or accounts
- No payment system
- No CMS — content is hardcoded for now
- No real client images/logos yet — use clearly-labeled placeholders

## 5. Data and privacy
- What information is stored: none (no backend yet)
- Any private or personal information: no
- Who can READ what: public site, everyone can view
- Who can CHANGE what: only the developer, via GitHub
- Who is the admin: me

## 6. Look and feel
- Style: dark background with neon/glow accents, modern agency feel
- Must be mobile-first: yes
- Colours / logo: dark base (near-black), neon accent colors of your choice (e.g. cyan/purple/pink glow) — pick something that looks premium, not garish

## 7. Speed targets
- Page loads in under 3 seconds on an average phone
- Lighthouse mobile score of 80 or higher (3D/animation sites score lower than plain pages — 80 is the realistic bar here)
- Provide a "reduced motion" fallback for low-power devices/accessibility (fewer particles, simpler animation) if performance drops

## 8. Approved tools
- Hosting: static site (plain HTML/CSS/JS), deployable to Vercel later
- Database / login: none
- Framework: plain HTML/CSS/JavaScript with Three.js (loaded via CDN) for 3D, and a lightweight animation library if needed (e.g. GSAP via CDN). No build tools, no npm frameworks like React — keep it a single-file or few-file static site so it stays simple and fast to review.

## 9. Definition of done
The project is done only when ALL are true:
- Every feature's "Done when" test passes
- All automatic checks are green (build, tests, lint, secrets scan, security scan, dependency audit)
- No critical or high security findings
- I tested it on my phone and it feels smooth
- Only the data listed in section 5 is stored
