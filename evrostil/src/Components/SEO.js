import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_IMAGE = "/logo512.webp";

function setMeta(name, content, attribute = "name") {
    if (!content) return;

    let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
}

function setLink(rel, href) {
    if (!href) return;

    let tag = document.head.querySelector(`link[rel="${rel}"]`);

    if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
    }

    tag.setAttribute("href", href);
}

export default function SEO({ title, description, image = DEFAULT_IMAGE, type = "website" }) {
    const location = useLocation();

    useEffect(() => {
        const siteName = "Евростил-М";
        const pageTitle = title ? `${title} | ${siteName}` : siteName;
        const canonicalUrl = `${window.location.origin}${location.pathname}`;
        const imageUrl = image.startsWith("http") ? image : `${window.location.origin}${image}`;

        document.documentElement.lang = "mk";
        document.title = pageTitle;

        setMeta("description", description);
        setMeta("robots", "index, follow");
        setMeta("og:site_name", siteName, "property");
        setMeta("og:type", type, "property");
        setMeta("og:title", pageTitle, "property");
        setMeta("og:description", description, "property");
        setMeta("og:url", canonicalUrl, "property");
        setMeta("og:image", imageUrl, "property");
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", pageTitle);
        setMeta("twitter:description", description);
        setMeta("twitter:image", imageUrl);
        setLink("canonical", canonicalUrl);
    }, [description, image, location.pathname, title, type]);

    return null;
}
