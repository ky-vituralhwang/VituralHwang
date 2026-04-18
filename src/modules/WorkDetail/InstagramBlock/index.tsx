import style from "./style.module.scss";

const RESERVED_PATHS = new Set([
    "p",
    "reel",
    "tv",
    "explore",
    "accounts",
    "stories",
    "direct",
    "legal",
    "about",
]);

/** Turn a normal Instagram URL into one that works in an iframe (`…/embed/`). */
function toInstagramEmbedSrc(rawUrl: string): string | null {
    const trimmed = rawUrl.trim();
    if (!trimmed) return null;

    try {
        const url = new URL(trimmed);
        const host = url.hostname.replace(/^www\./, "");
        if (!host.includes("instagram.com") && host !== "instagr.am") {
            return null;
        }

        let pathname = url.pathname.replace(/\/+$/, "");
        const search = url.search;

        if (host === "instagr.am") {
            const parts = pathname.split("/").filter(Boolean);
            if (parts.length >= 2 && parts[0] === "p") {
                return `https://www.instagram.com/p/${parts[1]}/embed/${search}`;
            }
            if (parts.length === 1) {
                return `https://www.instagram.com/p/${parts[0]}/embed/${search}`;
            }
            return null;
        }

        if (/\/embed\/?$/.test(pathname)) {
            return `https://www.instagram.com${pathname}${search}`;
        }

        const parts = pathname.split("/").filter(Boolean);

        // /{username}/p/{id}/, /{username}/reel/{id}/, /{username}/tv/{id}/
        if (parts.length === 3) {
            const [, kind, id] = parts;
            if (kind === "p" || kind === "reel" || kind === "tv") {
                return `https://www.instagram.com/${kind}/${id}/embed/${search}`;
            }
        }

        if (parts.length >= 2) {
            const [kind, id] = parts;
            if (kind === "p" || kind === "reel" || kind === "tv") {
                return `https://www.instagram.com/${kind}/${id}/embed/${search}`;
            }
        }

        if (parts.length === 1) {
            const segment = parts[0];
            if (!RESERVED_PATHS.has(segment.toLowerCase())) {
                return `https://www.instagram.com/${segment}/embed/${search}`;
            }
        }

        return null;
    } catch {
        return null;
    }
}

type Props = {
    slice: any;
};

const WorkDetailSliceInstagramBlockModule = ({ slice }: Props) => {
    const { link_blog_instagram } = slice?.primary || {};

    const embedSrc = link_blog_instagram?.url
        ? toInstagramEmbedSrc(link_blog_instagram.url)
        : null;

    if (!embedSrc) {
        return null;
    }

    return (
        <div
            className={style.instagramEmbed}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container grid">
                <div className={style.instagramEmbed__frameWrap}>
                    <iframe
                        src={embedSrc}
                        title="Instagram embed"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                </div>
            </div>
        </div>
    );
};

export default WorkDetailSliceInstagramBlockModule;
