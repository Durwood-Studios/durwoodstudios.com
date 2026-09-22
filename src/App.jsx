import { useEffect, useId, useRef, useState } from "react";
import "./styles.css";

const titles = {
  "/": "Durwood Studios — Considered design. Useful tools.",
  "/store": "Durwood Store — Digital products",
  "/labs": "Labs — Durwood Studios",
  "/work": "Work & experiments — Durwood Studios",
  "/how-i-help": "How I help — Durwood Studios",
  "/studio": "The studio — Durwood Studios",
  "/contact": "Contact — Durwood Studios",
  "/privacy": "Privacy — Durwood Studios",
  "/terms": "Website terms — Durwood Studios",
  "/accessibility": "Accessibility — Durwood Studios",
};
const email =
  import.meta.env.VITE_CONTACT_EMAIL || "dustin.snellings@durwoodstudios.com";
const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Link({ to, children, className = "" }) {
  return (
    <a className={className} href={to}>
      {children}
    </a>
  );
}
function Button({ to = "/contact", children = "Bring me a problem" }) {
  return (
    <Link to={to} className="button">
      {children}
      <Arrow />
    </Link>
  );
}
function Header({ path }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a href="/" className="wordmark" aria-label="Durwood Studios home">
        DURWOOD STUDIOS
      </a>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="navigation"
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="navigation"
        className={open ? "open" : ""}
        aria-label="Main navigation"
      >
        {[
          ["/store", "Store"],
          ["/studio", "Studio"],
          ["/labs", "Labs"],
          ["/contact", "Contact"],
        ].map(([href, label]) => (
          <Link key={href} to={href} className={path === href ? "active" : ""}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div>
        <a href="/" className="wordmark">
          DURWOOD STUDIOS
        </a>
        <p>
          A small studio for useful things.
          <br />
          Aiken, South Carolina.
        </p>
      </div>
      <div className="footer-links">
        <Link to="/contact">
          Start a conversation <Arrow />
        </Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/accessibility">Accessibility</Link>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Durwood Studios</p>
    </footer>
  );
}
function ProjectList() {
  return (
    <div className="projects">
      <article>
        <figure className="project-image">
          <img
            src="/assets/shader-study.png"
            alt="Concept study of light refracting through a glass prism"
            width="1904"
            height="826"
            loading="lazy"
          />
          <figcaption>Concept illustration</figcaption>
        </figure>
        <div className="project-caption">
          <h3>Light, with room to play.</h3>
          <span>01 / IN DEVELOPMENT</span>
        </div>
        <p>
          A browser playground for shaping glass, color, and light. Choose a
          look, adjust it, and save what you make.
        </p>
        <Link to="/work/shader-studio" className="text-link">
          Explore Shader Studio <Arrow />
        </Link>
      </article>
      <article>
        <figure className="project-image">
          <img
            src="/assets/learning-study.png"
            alt="Concept study of connected glass nodes on ivory paper"
            width="1904"
            height="826"
            loading="lazy"
          />
          <figcaption>Concept illustration</figcaption>
        </figure>
        <div className="project-caption">
          <h3>Make a difficult idea visible.</h3>
          <span>02 / IN DEVELOPMENT</span>
        </div>
        <p>
          An educational experiment in explaining neural networks through
          interaction. A place to explore how patterns become predictions.
        </p>
        <Link to="/work/neural-networks" className="text-link">
          Inside the experiment <Arrow />
        </Link>
      </article>
    </div>
  );
}
function Pine({ animated = false }) {
  const artworkId = useId().replace(/:/g, "");
  const needleRegions = [
    { name: "left", outline: "M0 140H450V370L307 500L240 570L100 670H0Z" },
    { name: "crown", outline: "M340 0H910V230L760 290L568 351L510 260Z" },
    { name: "right", outline: "M1000 170V670L850 650L705 416L750 350Z" },
  ];
  const ref = useRef(null);
  const [paused, setPaused] = useState(() => {
    try {
      return localStorage.getItem("durwood-motion") === "paused";
    } catch {
      return false;
    }
  });
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(preference.matches);
    const visibility = () => setHidden(document.hidden);
    preference.addEventListener("change", change);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`pine-art ${animated ? "animated" : ""} ${paused || reduced || hidden || !visible ? "paused" : ""}`}
    >
      <svg
        className="pine-vector"
        viewBox="0 0 1000 800"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {needleRegions.map(({ name, outline }) => (
            <clipPath key={name} id={`${artworkId}-${name}`}>
              <path d={outline} />
            </clipPath>
          ))}
          <clipPath id={`${artworkId}-wood`}>
            <path
              clipRule="evenodd"
              d={`M0 0H1000V800H0Z ${needleRegions.map((r) => r.outline).join(" ")}`}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${artworkId}-wood)`}>
          <use href="/assets/pine-branch.svg#pine-branch" />
        </g>
        {needleRegions.map(({ name }) => (
          <g key={name} className={`pine-needles pine-needles-${name}`}>
            <g clipPath={`url(#${artworkId}-${name})`}>
              <use href="/assets/pine-branch.svg#pine-branch" />
            </g>
          </g>
        ))}
      </svg>
      {animated && (
        <button
          className="motion-control"
          disabled={reduced}
          onClick={() => {
            const next = !paused;
            setPaused(next);
            try {
              localStorage.setItem(
                "durwood-motion",
                next ? "paused" : "playing",
              );
            } catch {}
          }}
        >
          {reduced
            ? "Reduced motion on"
            : paused
              ? "Resume motion"
              : "Pause motion"}
        </button>
      )}
    </div>
  );
}
function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow">AIKEN, SOUTH CAROLINA</p>
          <h1>
            Considered design.
            <br />
            Useful tools.
          </h1>
          <p className="hero-description">
            Digital products, creative experiments and
            <br className="desktop-break" /> room for what comes next.
          </p>
          <div className="hero-actions">
            <Button to="/store">Explore the store</Button>
            <Link to="/contact" className="text-link">
              Connect with the studio <Arrow />
            </Link>
          </div>
        </div>
        <Pine animated />
      </section>
      <section className="home-destinations">
        <article>
          <div>
            <p className="eyebrow">THE STORE</p>
            <h2>
              Useful things.
              <br />
              Room to grow.
            </h2>
            <p>
              A home for digital tools and creative resources. The first
              releases are still taking shape.
            </p>
            <Link to="/store" className="text-link">
              Explore the store <Arrow />
            </Link>
          </div>
          <figure>
            <img
              src="/assets/workshop-hero.png"
              alt="Concept artwork of a sunlit workbench"
            />
            <figcaption>STUDIO CONCEPT ARTWORK</figcaption>
          </figure>
        </article>
        <article>
          <div>
            <p className="eyebrow">INSIDE LABS</p>
            <h2>
              Experiments today.
              <br />
              Possibilities tomorrow.
            </h2>
            <p>A place for visual tools, learning and creative curiosity.</p>
            <Link to="/labs" className="text-link">
              Visit Labs <Arrow />
            </Link>
          </div>
          <figure>
            <img
              src="/assets/shader-study.png"
              alt="Concept artwork of a prism refracting light"
            />
            <figcaption>CONCEPT ILLUSTRATION</figcaption>
          </figure>
        </article>
      </section>
      <Closing />
    </>
  );
}
function Store() {
  const [state, setState] = useState({
    loading: true,
    products: [],
    error: "",
  });
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/catalog", { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw Error();
        const data = await r.json();
        if (!Array.isArray(data.products)) throw Error();
        setState({ loading: false, products: data.products, error: "" });
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setState({
            loading: false,
            products: [],
            error:
              "The store is temporarily unavailable. Please try again later.",
          });
      });
    return () => controller.abort();
  }, []);
  return (
    <>
      <PageIntro eyebrow="DURWOOD STORE" title="The Durwood collection.">
        <p>
          Digital products from an independent studio. A place to find useful
          tools, creative resources and whatever comes next.
        </p>
      </PageIntro>
      <section className="section store-state" aria-live="polite">
        <div className="catalog-heading">
          <span>ALL RELEASES</span>
          <span>DIGITAL TOOLS & CREATIVE RESOURCES</span>
        </div>
        {state.loading ? (
          <p>Opening the store…</p>
        ) : state.error ? (
          <>
            <h2>We couldn’t load the store.</h2>
            <p>{state.error}</p>
          </>
        ) : state.products.length === 0 ? (
          <>
            <p className="eyebrow">THE FIRST CHAPTER</p>
            <h2>Something starts here.</h2>
            <p>
              No products are on sale yet. This space will grow with each
              release.
            </p>
            <Link to="/labs" className="text-link">
              Explore what’s in the studio <Arrow />
            </Link>
          </>
        ) : (
          <div className="catalog-list">
            {state.products.map((product, i) => (
              <article className="catalog-row" key={product.id || i}>
                <div>
                  <h2>{product.name || product.title || "Studio release"}</h2>
                  <p>{product.description}</p>
                  <p className="eyebrow">
                    {product.format}{" "}
                    {product.version ? ` / VERSION ${product.version}` : ""}
                  </p>
                </div>
                <Link className="text-link" to="/contact">
                  Ask about this release <Arrow />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
      <Closing />
    </>
  );
}
function Closing() {
  return (
    <section className="closing">
      <h2>
        Something on your mind?{" "}
        <Link to="/contact">
          Come say hello. <Arrow />
        </Link>
      </h2>
    </section>
  );
}
function PageIntro({ eyebrow, title, children, secondary = false }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      {secondary ? <h2>{title}</h2> : <h1>{title}</h1>}
      <div className="intro">{children}</div>
    </section>
  );
}
function Work() {
  return (
    <>
      <PageIntro eyebrow="DURWOOD LABS" title="Curiosity, made tangible.">
        <p>
          Visual tools, learning experiments and ideas in progress. Follow the
          curiosity and see what takes shape.
        </p>
      </PageIntro>
      <section className="section">
        <ProjectList />
      </section>
      <Closing />
    </>
  );
}
function Project({ shader }) {
  return (
    <>
      <PageIntro
        eyebrow="STUDIO EXPERIMENT"
        title={shader ? "Shader Studio" : "How Neural Networks Learn"}
      >
        <p>
          {shader
            ? "A visual playground for light and glass."
            : "An interactive approach to a difficult idea."}
        </p>
      </PageIntro>
      <figure className="detail-image">
        <img
          src={
            shader ? "/assets/shader-study.png" : "/assets/learning-study.png"
          }
          alt={
            shader
              ? "Concept illustration of refracted light"
              : "Concept illustration of connected learning nodes"
          }
        />
        <figcaption>
          CONCEPT ILLUSTRATION / EXPERIMENT IN DEVELOPMENT
        </figcaption>
      </figure>
      <div className="article-layout section">
        <aside>
          <p className="eyebrow">PROJECT NOTES</p>
          <p>
            {shader
              ? "Visual tools / WebGL"
              : "Education / Interactive software"}
          </p>
          <p>Internal experiment</p>
        </aside>
        <article>
          <h2>
            {shader
              ? "Start with a look. Make it yours."
              : "Learning through exploration."}
          </h2>
          <p>
            {shader
              ? "Shader Studio makes a technical graphics experiment approachable: select one of four looks, adjust the glass and color, choose a canvas shape, then save a PNG. The current version includes settings export and restore."
              : "This project explores how to explain neural networks with interactive examples. It is educational work, with source licensing and publication permissions under review before public release."}
          </p>
          <h3>What exists today</h3>
          <p>
            {shader
              ? "A working local visual playground built around a glass-orb shader. Four presets are starting points for one shader—not four different rendering engines."
              : "A local educational codebase. It is not presented here as client work or as a commercially licensed Durwood product."}
          </p>
          {shader && isLocal ? (
            <a
              className="button"
              href="http://127.0.0.1:3000/"
              target="_blank"
              rel="noreferrer"
            >
              Open local playground <Arrow />
            </a>
          ) : (
            <p className="note">
              Public demo publication is still being prepared.
            </p>
          )}
          <h3>Why it belongs in the workshop</h3>
          <p>
            Small experiments let us test an idea, learn from the experience,
            and decide what deserves to grow.
          </p>
          <Link to="/labs" className="text-link">
            Back to Labs <Arrow />
          </Link>
        </article>
      </div>
    </>
  );
}
function Studio() {
  return (
    <>
      <section className="studio-banner">
        <Pine />
        <div>
          <p className="eyebrow">
            AIKEN, SOUTH CAROLINA / INDEPENDENT BY NATURE
          </p>
          <h1>
            Rooted here.
            <br />
            Open to everywhere.
          </h1>
        </div>
      </section>
      <section className="studio-almanac section">
        <div>
          <p className="eyebrow">THE STUDIO ALMANAC</p>
          <h2>Durwood is a place for ideas to become useful things.</h2>
          <p>
            We explore the space where creativity meets real life—using digital
            tools, thoughtful design, and careful attention to detail to turn
            curiosity into things that matter.
          </p>
          <p className="eyebrow">
            FOUNDED BY DUSTIN SNELLINGS / AIKEN, SOUTH CAROLINA
          </p>
        </div>
        <div className="studio-routes">
          {[
            [
              "Store",
              "Digital products and resources, released when they’re ready.",
              "/store",
            ],
            [
              "Labs",
              "Experiments, visual tools and new ideas in progress.",
              "/labs",
            ],
            [
              "Collaborate",
              "Let’s build something useful together.",
              "/contact",
            ],
          ].map(([title, copy, to]) => (
            <Link key={to} to={to}>
              <h2>
                {title} <Arrow />
              </h2>
              <p>{copy}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="process section">
        <p className="eyebrow">WHEN WE WORK TOGETHER</p>
        <h2>Understand. Build. Hand over.</h2>
        <ol>
          <li>
            <strong>Start with a conversation.</strong>
            <p>
              What happens now, what gets in the way, and what would a useful
              result look like?
            </p>
          </li>
          <li>
            <strong>Agree on a clear scope.</strong>
            <p>
              Deliverables, timing, cost and support go into writing before work
              starts.
            </p>
          </li>
          <li>
            <strong>Build, review and make it yours.</strong>
            <p>Test the agreed result and hand over with clear next steps.</p>
          </li>
        </ol>
      </section>
      <Closing />
    </>
  );
}
function Contact({ accessibility = false }) {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [attempt, setAttempt] = useState(null);
  async function submit(e) {
    e.preventDefault();
    if (sending) return;
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (accessibility) {
      values.topic = "General";
      values.message = `Accessibility report\nPage: ${values.page || "Not specified"}\n${values.message}`;
      delete values.page;
    }
    const signature = JSON.stringify(values);
    const id =
      attempt?.signature === signature ? attempt.id : crypto.randomUUID();
    setAttempt({ id, signature });
    setSending(true);
    setStatus("Sending your inquiry…");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, submissionId: id }),
        signal: AbortSignal.timeout(15000),
      });
      let data;
      try {
        data = await response.json();
      } catch {
        throw Error(
          "The studio service is unavailable. Your inquiry has not been confirmed. Please retry.",
        );
      }
      if (!response.ok)
        throw Error(
          data.error || "Your inquiry could not be confirmed. Please retry.",
        );
      if (!data.saved || !data.reference)
        throw Error("The studio did not confirm receipt. Please retry.");
      setReceipt(data.reference);
      setStatus("Your inquiry has been received and saved.");
    } catch (error) {
      setStatus(
        error.name === "TimeoutError"
          ? "Confirmation timed out. Retry to check the same submission without sending a duplicate."
          : error.message,
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <>
      <div className="contact-page">
        <PageIntro
          secondary={accessibility}
          eyebrow={
            accessibility
              ? "ACCESSIBILITY / REPORT A BARRIER"
              : "CONTACT / AIKEN, SOUTH CAROLINA"
          }
          title={
            accessibility
              ? "A better experience for everyone."
              : "What’s on your mind?"
          }
        >
          <p>
            {accessibility
              ? "Tell us which page you were using and what got in your way. Device and browser details help us investigate."
              : "We’d love to hear from you. Whether you’re exploring a project, have a question about our products, or just want to say hello, this is the place."}
          </p>
          <p className="contact-invitation">
            Good ideas start with a conversation.
          </p>
          <a className="text-link" href={`mailto:${email}`}>
            {email}
          </a>
        </PageIntro>
        <section className="contact-layout section">
          {receipt ? (
            <div className="receipt" role="status">
              <p className="eyebrow">RECEIVED</p>
              <h2>You’re in the inbox.</h2>
              <p>
                Your inquiry was saved. Keep this reference if you need to
                follow up.
              </p>
              <code>{receipt}</code>
              <p>No account needed. No extra steps.</p>
              <button
                className="button"
                onClick={() => {
                  setReceipt(null);
                  setAttempt(null);
                  setStatus("");
                }}
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  disabled={sending}
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  disabled={sending}
                />
              </label>
              {accessibility ? (
                <label>
                  Page or URL
                  <input
                    name="page"
                    type="text"
                    maxLength={500}
                    disabled={sending}
                  />
                </label>
              ) : (
                <fieldset className="topic-choices" disabled={sending}>
                  <legend>What brings you here?</legend>
                  {["General", "Collaboration", "Product support"].map(
                    (topic, i) => (
                      <label key={topic}>
                        <input
                          type="radio"
                          name="topic"
                          value={topic}
                          defaultChecked={i === 0}
                        />
                        {topic}
                      </label>
                    ),
                  )}
                </fieldset>
              )}
              <label>
                Your message
                <textarea
                  name="message"
                  rows={6}
                  required
                  minLength={10}
                  maxLength={5000}
                  disabled={sending}
                />
              </label>
              <div className="form-trap" aria-hidden="true">
                <label>
                  Leave this empty
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <p className="form-note">
                Please leave out passwords, payment details and sensitive
                records. Your inquiry is stored so the studio can respond.{" "}
                <Link to="/privacy">Privacy information</Link>
              </p>
              <button className="button" disabled={sending} type="submit">
                {sending ? "Sending…" : "Send inquiry"} <Arrow />
              </button>
              <output aria-live="polite">{status}</output>
            </form>
          )}
          <p className="form-note contact-direct">
            Prefer email? <a href={`mailto:${email}`}>{email}</a>
          </p>
          {isLocal && (
            <p className="form-note">
              Local preview: inquiries save to the development service on this
              Mac.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
const legal = {
  "/privacy": {
    title: "Privacy, plainly.",
    paras: [
      [
        "Inquiry forms",
        "The form sends your name, email, topic and message to the studio service. A receipt appears only after your inquiry is saved. In this local preview, the service runs on this Mac. Authorized DSOS access can retrieve inquiries when the operator explicitly syncs.",
      ],
      [
        "Storage and access",
        "This preview uses no advertising pixels, analytics or session replay. Inquiry contents are encrypted in the local service database; its encryption key is held separately on the same Mac. Authorized sync copies inquiries into the encrypted DSOS workspace. There is no automatic deletion schedule yet; retention and deletion operations must be defined before collecting public inquiries.",
      ],
      [
        "Before public launch",
        "Hosting providers may process request and security logs. The final hosting provider, retention practices, business contact, and applicable privacy rights must be documented before the website is published. This page describes the local build, not an established production privacy program.",
      ],
    ],
  },
  "/terms": {
    title: "Website use.",
    paras: [
      [
        "About the work",
        "Studio experiments are provided for exploration. Project descriptions identify what currently exists; they are not promises of results, availability, or fitness for a particular use.",
      ],
      [
        "Commissioned projects",
        "A conversation or inquiry does not create a project agreement. Deliverables, payment, intellectual-property rights, acceptance, and support need a separate written agreement.",
      ],
      [
        "Content and rights",
        "Do not assume that all educational material or experimental source is commercially licensed. Product-specific licenses and third-party rights govern any reuse. Illustrations are concept artwork, not photographs of completed Durwood products.",
      ],
      [
        "Launch review",
        "These are preliminary website-use notes. Entity details and final project, product, and consumer terms require review before public commercial use.",
      ],
    ],
  },
  "/accessibility": {
    title: "Made to be approachable.",
    paras: [
      [
        "Our approach",
        "This build uses semantic navigation, labeled forms, visible keyboard focus, responsive text and layout, and reduced-motion support. No information requires animation to understand.",
      ],
      [
        "Current limits",
        "This version has not received a full assistive-technology audit or certification. The linked Shader Studio experiment uses a visual canvas; its controls and descriptions do not provide an equivalent nonvisual rendering experience.",
      ],
      [
        "Report a barrier",
        "Email dustin.snellings@durwoodstudios.com with the page, action, device, and problem, or use the contact form.",
      ],
    ],
  },
};
function Legal({ path }) {
  const data = legal[path];
  return (
    <>
      <PageIntro eyebrow="STUDIO INFORMATION" title={data.title}>
        <p>Last reviewed for this local build: September 21, 2026.</p>
      </PageIntro>
      <div className="legal-layout section">
        <nav aria-label="On this page">
          <p className="eyebrow">ON THIS PAGE</p>
          {data.paras.map(([heading], i) => (
            <a key={heading} href={`#section-${i}`}>
              {heading}
            </a>
          ))}
          <a href={`mailto:${email}`}>Contact the studio</a>
        </nav>
        <article className="legal">
          {data.paras.map(([heading, body]) => (
            <section
              id={`section-${data.paras.findIndex((p) => p[0] === heading)}`}
              key={heading}
            >
              <h2>{heading}</h2>
              <p>{body}</p>
            </section>
          ))}
        </article>
      </div>
      {path === "/accessibility" && <Contact accessibility />}
    </>
  );
}
export function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  useEffect(() => {
    document.title =
      titles[path] ||
      (path.startsWith("/work/")
        ? "Studio experiment — Durwood Studios"
        : "Page not found — Durwood Studios");
  }, [path]);
  let content =
    path === "/" ? (
      <Home />
    ) : path === "/store" ? (
      <Store />
    ) : path === "/work" || path === "/labs" ? (
      <Work />
    ) : path === "/work/shader-studio" ? (
      <Project shader />
    ) : path === "/work/neural-networks" ? (
      <Project />
    ) : path === "/how-i-help" ? (
      <Studio />
    ) : path === "/studio" ? (
      <Studio />
    ) : path === "/contact" ? (
      <Contact />
    ) : legal[path] ? (
      <Legal path={path} />
    ) : (
      <section className="not-found">
        <p className="eyebrow">A LITTLE OFF THE PATH</p>
        <h1>404</h1>
        <h2>That page isn’t here.</h2>
        <p>Let’s get you somewhere useful.</p>
        <Button to="/">Back to home</Button>
        <div className="recovery-links">
          <Link to="/store">Store</Link>
          <Link to="/labs">Labs</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </section>
    );
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main">{content}</main>
      <Footer />
    </>
  );
}
