import React, { useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "./FlipBookCarousel.css";

const SLIDE_MS = 350;        // must match CSS transition
const BACK_SPEED_MS = 180;  // fallback close speed
const COVER_RESET_MS = 180; // debounce for cover reset

const Page = React.forwardRef(function Page({ children, className = "" }, ref) {
    return (
        <div ref={ref} className={`flip-page ${className}`}>
            {children}
        </div>
    );
});

export default function AstraFlipBook({ coverImg, pages = [] }) {
    const bookRef = useRef(null);
    const stageRef = useRef(null);

    const [size, setSize] = useState(null);

    // Position + flow control
    const [isClosed, setIsClosed] = useState(true);
    const [opening, setOpening] = useState(false);
    const [atLastSpread, setAtLastSpread] = useState(false);

    const lockRef = useRef(false);
    const coverResetTimer = useRef(null);

    const pf = () => bookRef.current?.pageFlip?.();

    // Ensure EVEN number of pages (prevents broken spreads)
    const contentPages = useMemo(() => {
        const arr = [...pages];
        if (arr.length % 2 !== 0) arr.push({ type: "blank" });
        return arr;
    }, [pages]);

    // Compute page size from cover aspect ratio (capped)
    useEffect(() => {
        const img = new Image();
        img.src = coverImg;
        img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight;

            const PAGE_MAX_W = 620;
            const PAGE_MAX_H = 920;

            let w = PAGE_MAX_W;
            let h = w / ratio;

            if (h > PAGE_MAX_H) {
                h = PAGE_MAX_H;
                w = h * ratio;
            }

            setSize({ w: Math.round(w), h: Math.round(h) });
        };
    }, [coverImg]);

    // This ONLY tracks where we are — it NEVER moves the book
    const syncState = () => {
        const inst = pf();
        if (!inst) return;

        const idx = inst.getCurrentPageIndex();
        const last = inst.getPageCount() - 1;

        setAtLastSpread(idx >= last - 1);
    };

    // OPEN: move first → then flip
    const openWithSlideThenFlip = (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();

        if (e?.currentTarget?.setPointerCapture && e.pointerId != null) {
            e.currentTarget.setPointerCapture(e.pointerId);
        }

        const inst = pf();
        if (!inst || lockRef.current || opening) return;
        if (inst.getCurrentPageIndex() !== 0) return;

        lockRef.current = true;
        setOpening(true);

        // move RIGHT first
        setIsClosed(false);

        setTimeout(() => {
            inst.flipNext();

            setTimeout(() => {
                setOpening(false);
                lockRef.current = false;
                syncState();
            }, 80);
        }, SLIDE_MS);
    };

    // CLOSE: animated flip back → then slide LEFT
    const goCoverAnimated = () => {
        const inst = pf();
        if (!inst || lockRef.current) return;

        lockRef.current = true;

        const finish = () => {
            setIsClosed(true);
            setAtLastSpread(false);
            lockRef.current = false;
            syncState();
        };

        if (typeof inst.flip === "function") {
            inst.flip(0);
            setTimeout(finish, 650);
            return;
        }

        const step = () => {
            const idx = inst.getCurrentPageIndex();
            if (idx <= 0) {
                inst.turnToPage(0);
                finish();
                return;
            }
            inst.flipPrev();
            setTimeout(step, BACK_SPEED_MS);
        };

        step();
    };

    // Flip handler with SAFE cover reset
    const handleFlip = () => {
        syncState();

        const inst = pf();
        if (!inst) return;

        const idx = inst.getCurrentPageIndex();

        if (coverResetTimer.current) {
            clearTimeout(coverResetTimer.current);
            coverResetTimer.current = null;
        }

        // Only reset position when we TRULY land on cover
        if (idx === 0 && !opening && !lockRef.current) {
            coverResetTimer.current = setTimeout(() => {
                const again = pf();
                if (!again) return;

                if (
                    again.getCurrentPageIndex() === 0 &&
                    !opening &&
                    !lockRef.current
                ) {
                    setIsClosed(true);
                }
            }, COVER_RESET_MS);
        }
    };

    // Last spread → next flip closes
    const handleEndNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        goCoverAnimated();
    };

    // Arrow keys (click book to focus)
    useEffect(() => {
        const onKeyDown = (e) => {
            const inst = pf();
            if (!inst) return;
            if (document.activeElement !== stageRef.current) return;

            if (e.key === "ArrowRight") {
                e.preventDefault();

                if (inst.getCurrentPageIndex() === 0) {
                    openWithSlideThenFlip(e);
                    return;
                }

                if (atLastSpread) {
                    goCoverAnimated();
                    return;
                }

                inst.flipNext();
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                inst.flipPrev();
            }

            if (e.key === "Home") {
                e.preventDefault();
                goCoverAnimated();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [atLastSpread, opening]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (coverResetTimer.current) clearTimeout(coverResetTimer.current);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => syncState(), 0);
    }, []);

    if (!size) return null;

    return (
        <div
            ref={stageRef}
            className="astraBookStage"
            tabIndex={0}
            style={{
                width: `${size.w * 2}px`,
                height: `${size.h}px`,
                ["--pageW"]: `${size.w}px`,
            }}
            onMouseDown={() => stageRef.current?.focus()}
            onTouchStart={() => stageRef.current?.focus()}
        >
            <div className={`astraBookAnchor ${isClosed ? "closed" : "open"}`}>
                <HTMLFlipBook
                    ref={bookRef}
                    startPage={0}
                    showCover={true}
                    usePortrait={false}
                    width={size.w}
                    height={size.h}
                    size="fixed"
                    flippingTime={350}
                    maxShadowOpacity={0.35}
                    mobileScrollSupport
                    onFlip={handleFlip}
                >
                    {/* COVER */}
                    <Page className="hard" data-density="hard">
                        <div className="cover">
                            <img src={coverImg} alt="Astra cover" />
                        </div>
                    </Page>

                    {/* CONTENT */}
                    {contentPages.map((p, i) => {
                        if (p.type === "img") {
                            return (
                                <Page key={i}>
                                    <div className="page-img">
                                        <img src={p.src} alt={p.alt || ""} />
                                    </div>
                                </Page>
                            );
                        }

                        if (p.type === "text") {
                            return (
                                <Page key={i}>
                                    <div className="page-text">
                                        {p.title && <h3>{p.title}</h3>}
                                        <p>{p.body}</p>
                                    </div>
                                </Page>
                            );
                        }

                        return (
                            <Page key={i}>
                                <div className="page-blank" />
                            </Page>
                        );
                    })}
                </HTMLFlipBook>
            </div>

            {/* OPEN START CATCHER */}
            {(isClosed || opening) && (
                <div
                    className="startOpenCatcher"
                    onPointerDown={openWithSlideThenFlip}
                />
            )}

            {/* END CLOSE CATCHER */}
            {atLastSpread && !isClosed && !opening && (
                <div
                    className="endNextCatcher"
                    onMouseDown={handleEndNext}
                    onTouchStart={handleEndNext}
                />
            )}
        </div>
    );
}
