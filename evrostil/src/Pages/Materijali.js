import React, { useMemo, useState, useEffect } from "react";
import "./Materijali.css";
import Footer from "../Components/footer.js";

const imagePath = (folder, file) => `/Materijali/${folder}/${file}.webp`;

const materialData = [
  {
    title: "Чешми (славини)",
    folder: "cesmi",
    icon: "fa-solid fa-faucet",
    description: "Практични модели за кујнски и бањски решенија.",
    files: [
      "image_1403093648_36-1",
      "cesma_10-1",
      "cesma_09-1",
      "cesma_08-1",
      "cesma_07-1",
      "cesma_06-1",
      "cesma_04-1",
      "cesma_03-1",
      "cesma_02-1",
    ],
  },
  {
    title: "Мијалници - гранит",
    folder: "mijalnici-granit",
    icon: "fa-solid fa-sink",
    description: "Гранитни мијалници за модерни кујнски решенија.",
    files: [
      "granit-14",
      "granit-13",
      "granit-12",
      "granit-11",
      "granit-10",
      "granit-09",
      "granit-08",
      "granit-07",
      "granit-06",
      "granit-05",
      "granit-04",
      "granit-03",
      "granit-02",
      "granit-01",
      "JUNIOR-KATALOG-2015-page-005-2",
      "JUNIOR-KATALOG-2015-page-004",
      "JUNIOR-KATALOG-2015-page-004-2",
    ],
  },
  {
    title: "Мијалници - инокс",
    folder: "mijalnici-inox",
    icon: "fa-solid fa-sink",
    description: "Инокс мијалници за практична и долготрајна употреба.",
    files: [
      "Inox-32",
      "Inox-31",
      "Inox-30",
      "Inox-29",
      "Inox-28",
      "Inox-27",
      "Inox-26",
      "Inox-24",
      "Inox-23",
      "Inox-22",
      "Inox-21",
      "Inox-19",
      "Inox-18",
      "Inox-17",
      "Inox-16",
      "Inox-15",
      "Inox-14",
      "Inox-12",
      "Inox-11",
      "Inox-10",
      "Inox-09",
      "Inox-08",
      "Inox-05",
      "Inox-04",
      "Inox-03",
      "Inox-02",
      "Inox-01",
      "JUNIOR-KATALOG-2015-page-003",
      "JUNIOR-KATALOG-2015-page-003-2",
      "JUNIOR-KATALOG-2015-page-002",
    ],
  },
  {
    title: "3D фолии за МДФ",
    folder: "3d-folii",
    icon: "fa-solid fa-cube",
    description: "Фолии за модерен изглед и заштитна завршна обработка.",
    files: [
      "фантазиски-декор",
      "фантазиски-декор-0943",
      "фантазиски-декор-0942",
      "фантазиски-декор-0032",
      "уни-декори-0937",
      "уни-декори-0078",
      "уни-декори-0059",
      "уни-декори-0058",
      "уни-декори-0009",
      "уни-декори-0003",
      "уни-декор-0894",
      "уни-декор-0891",
      "уни-декор-0886",
      "уни-декор-0885",
      "уни-декор-0884",
      "уни-декор-0822",
      "уни-декор-0807",
      "уни-декор-0792",
      "уни-декор-0791",
      "уни-декор-0789",
      "уни-декор-0787",
      "уни-декор-0784",
      "уни-декор-0783",
      "уни-декор-0781",
      "уни-декор-0758",
      "уни-декор-0609",
      "уни-декор-0594",
      "уни-декор-0363",
      "дрвни-декори-0939",
      "дрвни-декори-0927",
      "дрвни-декори-0904",
      "дрвни-декори-0903",
      "дрвни-декори-0902",
      "дрвни-декори-0892",
      "дрвни-декори-0336",
      "дрвни-декори-0257",
      "дрвни-декори-0254",
      "дрвни-декори-0253",
      "дрвни-декори-0248",
      "дрвни-декори-0239",
      "дрвни-декори-0235",
      "дрвни-декори-0215",
      "дрвни-декори-0009",
      "дрвни-декори-0008",
      "дрвни-декори-0005",
      "високо-сјајни-0016",
      "високо-сјајни-0014",
      "високо-сјајни-0012",
      "високо-сјајни-0011",
      "високо-сјајни-0010",
      "високо-сјајни-0007",
      "високо-сјајни-0005",
      "високо-сјајни-0004",
      "високо-сјајни-0003",
      "високо-сјајни-0002",
      "високо-сјајни-0001",
      "алкорен-0939",
      "алкорен-0927",
      "алкорен-0904",
      "алкорен-0903",
      "алкорен-0902",
      "алкорен-0892",
      "алкорен-0336",
      "0060-висок-сјај",
      "0060-висок-сјај-5",
      "0060-висок-сјај-4",
      "0060-висок-сјај-3",
      "0060-висок-сјај-2",
    ],
  },
  {
    title: "Оков за мебел",
    folder: "okov",
    icon: "fa-solid fa-screwdriver-wrench",
    description: "Окови, механизми и додатоци за изработка на мебел.",
    files: [
      "APR_6218-qpr",
      "APR_6245-qpr",
      "APR_6244-qpr",
      "APR_6226-qpr",
      "APR_6224-qpr",
      "APR_6221-qpr",
      "APR_6220-qpr",
      "APR_6217-qpr",
      "APR_6216-qpr",
      "APR_6213-qpr",
    ],
  },
  {
    title: "Абс и ПВЦ траки",
    folder: "abs-pvc",
    icon: "fa-solid fa-grip-lines",
    description: "Траки за кантирање и финална заштита на плочести материјали.",
    files: [
      "high-gloss-pvc-edge-band-tape-500x500",
      "APR_6270-qpr",
      "APR_6268-qpr",
    ],
  },
  {
    title: "Лесонит",
    folder: "lesonit",
    icon: "fa-solid fa-table-cells-large",
    description: "Тенки плочи за задни страни, фиоки и лесни конструкции.",
    files: ["lesonit", "881", "514pe", "381", "190pe", "101pe"],
  },
  {
    title: "Работни плочи",
    folder: "rabotni-ploci",
    icon: "fa-solid fa-ruler-combined",
    description: "Декори за кујнски и работни површини.",
    files: [
      "worktops-postform-04",
      "Tabako_37979",
      "Smreka-bartolo_K4338",
      "San-remo-pesok_34139",
      "S023",
      "S022-Spark",
      "R7913-3cm4cm",
      "R6480-3cm4cm",
      "R-6008",
      "Moka_37978",
      "Laramie-bor_34318",
      "Kamen_34016",
      "G008-LU",
      "G004-LU",
      "G001-LU",
      "Arizona-bor_34232",
      "Alpski-snezen-dab_4325",
      "4111-LU-stardust",
      "4110-LU-stardust",
      "4104-LU-stardust",
      "4103-LU-stardust",
      "4101-LU-stardust",
      "4100-LU-stardust",
      "3301",
      "70L-QZ-D93",
      "0001",
    ],
  },
  {
    title: "Медијапан",
    folder: "medijapan",
    icon: "fa-solid fa-square",
    description: "Медијапан во повеќе обработки и завршници.",
    files: [
      "fur_MDF",
      "dab",
      "buka",
      "am-orev",
      "Флекс-Медијапан",
      "Оплеменет-Медијапан",
      "Медијапан-Суров",
      "Грундиран-Медијапан",
    ],
  },
  {
    title: "Иверка - Kronospan",
    folder: "iverka-kronospan",
    icon: "fa-solid fa-th-large",
    description: "Kronospan иверка декори за мебел и ентериер.",
    files: [
      "R5137",
      "R-5816",
      "K022",
      "K021",
      "K020",
      "K019",
      "K018",
      "K017",
      "K016",
      "K015",
      "K014",
      "K013",
      "K012",
      "K011",
      "K010",
      "K009",
      "K008",
      "K007",
      "K006",
      "K005",
      "K004",
      "K003",
      "K002",
      "K001",
      "F7222",
      "F22-014",
      "F22-013",
      "F22-012",
      "F22-006",
      "F22-005",
      "F-06-180",
      "f-8816",
      "f-8812",
      "F-8582",
      "F-8567",
      "9944",
      "9775",
      "9763",
      "9755",
      "9462",
      "9461",
      "9345",
      "8996",
      "8995",
      "8984",
      "8953",
      "8921",
      "8686",
      "8657",
      "8656",
      "8601",
      "8547",
      "8545",
      "8509",
      "8508",
      "8436",
      "8435",
      "8417",
      "8414",
      "8413",
      "8410",
      "8409",
      "8362",
      "8361",
      "8349",
      "8348",
      "8313",
      "8312",
      "8203",
      "6597",
      "4299",
      "4298",
      "2216",
      "1792",
      "0854",
      "0776",
      "0775",
      "0740",
      "0729",
      "0514",
      "0381",
      "0375",
      "0344",
      "0190",
      "0164",
      "0110",
    ],
  },
  {
    title: "Иверка - Kastamonu",
    folder: "iverka-kastamonu",
    icon: "fa-solid fa-th-large",
    description: "Kastamonu иверка декори за мебел и ентериер.",
    files: [
      "A835",
      "A830",
      "A829",
      "A822",
      "A820",
      "A819",
      "A818",
      "A810",
      "A809",
      "A808",
      "A807",
      "A806",
      "A804",
      "A415",
      "A400",
      "A396",
      "A395",
      "A392",
      "A380",
      "A379",
      "A359",
      "A357",
      "A356",
      "A354-BOSFOR_01",
      "A353",
      "A319",
      "A316",
      "F-241",
      "F-240",
      "A-406",
      "A-394",
      "A-385",
      "A-318",
      "A-303",
      "d412",
      "d164",
      "d153",
      "d146",
      "d144",
      "d138",
      "d137",
      "d128",
      "d118",
      "d_149",
      "d_145",
      "d_143",
      "d_134",
      "d_133",
      "d_129",
      "d_126",
      "d_125",
      "d_123",
      "d_120",
      "d_117",
      "d_116",
      "d_114",
      "d_108",
      "d_107",
      "d_104",
      "d_102",
    ],
  },
];

const flatMaterials = materialData.map((material) => {
  const gallery = material.files.map((file) =>
    imagePath(material.folder, file),
  );

  return {
    ...material,
    image: gallery[0],
    gallery,
  };
});

const mijalniciSubcategories = flatMaterials
  .filter((material) => material.title.startsWith("Мијалници -"))
  .sort((a, b) => {
    if (a.title.toLowerCase().includes("инокс")) return -1;
    if (b.title.toLowerCase().includes("инокс")) return 1;
    return 0;
  });

const iverkaSubcategories = flatMaterials
  .filter((material) => material.title.startsWith("Иверка -"))
  .sort((a, b) => {
    if (a.title.toLowerCase().includes("kronospan")) return -1;
    if (b.title.toLowerCase().includes("kronospan")) return 1;
    return 0;
  });

const baseMaterials = flatMaterials.filter(
  (material) =>
    !material.title.startsWith("Мијалници -") &&
    !material.title.startsWith("Иверка -"),
);

const cleanSubcategoryTitle = (parentTitle, subcategoryTitle) => {
  if (parentTitle === "Мијалници") {
    return subcategoryTitle.replace("Мијалници - ", "");
  }

  if (parentTitle === "Иверка") {
    return subcategoryTitle.replace("Иверка - ", "");
  }

  return subcategoryTitle;
};

const getSubcategoryGallery = (subcategories) =>
  subcategories.reduce(
    (gallery, subcategory) => gallery.concat(subcategory.gallery),
    [],
  );

const materials = [
  ...baseMaterials,
  {
    title: "Мијалници",
    icon: "fa-solid fa-sink",
    description: "Гранитни и инокс мијалници за кујнски решенија.",
    image: mijalniciSubcategories[0]?.image,
    gallery: getSubcategoryGallery(mijalniciSubcategories),
    subcategories: mijalniciSubcategories,
  },
  {
    title: "Иверка",
    icon: "fa-solid fa-th-large",
    description: "Иверка декори од Kronospan и Kastamonu.",
    image: iverkaSubcategories[0]?.image,
    gallery: getSubcategoryGallery(iverkaSubcategories),
    subcategories: iverkaSubcategories,
  },
];

const CATEGORIES = materials.map((material) => ({
  title: material.title,
  description: material.description,
  icon: material.icon,
  photos: material.gallery,
  subcategories: material.subcategories || null,
}));

const preloadImageLinks = (urls) => {
  const links = urls.filter(Boolean).map((href) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
    return link;
  });

  return () => links.forEach((link) => link.parentNode?.removeChild(link));
};

const getVisiblePhotoCount = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth <= 560) return 1;
  if (window.innerWidth <= 950) return 2;
  if (window.innerWidth <= 1250) return 3;
  return 4;
};

const getVisibleCategoryCount = () => {
  if (typeof window === "undefined") return 6;
  if (window.innerWidth <= 950) return CATEGORIES.length;
  return 6;
};

export default function Materijali() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [carouselStart, setCarouselStart] = useState(0);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(getVisiblePhotoCount);
  const [categoryStart, setCategoryStart] = useState(0);
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(
    getVisibleCategoryCount,
  );

  const activeCategory = useMemo(() => CATEGORIES[activeIndex], [activeIndex]);
  const visibleCategories = useMemo(() => {
    if (visibleCategoryCount >= CATEGORIES.length) {
      return CATEGORIES.map((category, index) => ({
        ...category,
        index,
      }));
    }

    return Array.from({ length: visibleCategoryCount }, (_, offset) => {
      const index = (categoryStart + offset) % CATEGORIES.length;

      return {
        ...CATEGORIES[index],
        index,
      };
    });
  }, [categoryStart, visibleCategoryCount]);

  const activePhotos = useMemo(() => {
    if (
      activeCategory?.subcategories &&
      activeSubcategoryIndex !== null &&
      activeCategory.subcategories[activeSubcategoryIndex]
    ) {
      return activeCategory.subcategories[activeSubcategoryIndex].gallery;
    }

    return activeCategory?.photos || [];
  }, [activeCategory, activeSubcategoryIndex]);

  const visiblePhotos = useMemo(() => {
    if (!activePhotos.length) return [];

    return Array.from(
      { length: Math.min(visiblePhotoCount, activePhotos.length) },
      (_, offset) => {
        const index = (carouselStart + offset) % activePhotos.length;

        return {
          src: activePhotos[index],
          index,
        };
      },
    );
  }, [activePhotos, carouselStart, visiblePhotoCount]);

  const fullscreenImage =
    fullscreenIndex === null ? null : activePhotos[fullscreenIndex];

  useEffect(() => {
    const cleanup = preloadImageLinks([
      "/Materijali/hero-materials.webp",
      ...activePhotos.slice(0, visiblePhotoCount),
    ]);

    return cleanup;
  }, [activePhotos, visiblePhotoCount]);

  useEffect(() => {
    const handleResize = () => {
      setVisiblePhotoCount(getVisiblePhotoCount());
      setVisibleCategoryCount(getVisibleCategoryCount());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const selectCategory = (index) => {
    setActiveIndex(index);
    setActiveSubcategoryIndex(null);
    setFullscreenIndex(null);
    setCarouselStart(0);
  };

  const selectSubcategory = (index) => {
    setActiveSubcategoryIndex(index);
    setFullscreenIndex(null);
    setCarouselStart(0);
  };

  const openFullscreen = (index) => {
    setFullscreenIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  const showPrevCategory = () => {
    if (visibleCategoryCount >= CATEGORIES.length) {
      setCategoryStart(0);
      return;
    }

    setCategoryStart((current) =>
      current === 0 ? CATEGORIES.length - 1 : current - 1,
    );
  };

  const showNextCategory = () => {
    if (visibleCategoryCount >= CATEGORIES.length) {
      setCategoryStart(0);
      return;
    }

    setCategoryStart((current) => (current + 1) % CATEGORIES.length);
  };

  const showPrevCarousel = () => {
    if (activePhotos.length <= visiblePhotoCount) {
      setCarouselStart(0);
      return;
    }

    setCarouselStart((current) =>
      current === 0 ? activePhotos.length - 1 : current - 1,
    );
  };

  const showNextCarousel = () => {
    if (activePhotos.length <= visiblePhotoCount) {
      setCarouselStart(0);
      return;
    }

    setCarouselStart((current) => (current + 1) % activePhotos.length);
  };

  const showPrevFullscreen = (event) => {
    event?.stopPropagation();

    setFullscreenIndex((current) =>
      current === 0 ? activePhotos.length - 1 : current - 1,
    );
  };

  const showNextFullscreen = (event) => {
    event?.stopPropagation();

    setFullscreenIndex((current) =>
      current === activePhotos.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    if (fullscreenIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFullscreenIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setFullscreenIndex((current) =>
          current === 0 ? activePhotos.length - 1 : current - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setFullscreenIndex((current) =>
          current === activePhotos.length - 1 ? 0 : current + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullscreenIndex, activePhotos.length]);

  return (
    <>
      <main className="MaterijaliWrapper">
        <section className="MaterijaliHero">
          <div className="MaterijaliHeroText">
            <span className="MaterijaliHeroEyebrow">ЕВРОСТИЛ-М</span>
            <h1 className="MaterijaliHeroTitle">МАТЕРИЈАЛИ</h1>
            <p>Квалитетни материјали. Безвременски дизајн.</p>
          </div>
        </section>

        <div className="MaterijaliCategoryCarousel">
          <button
            className="MaterijaliCategoryArrow"
            type="button"
            onClick={showPrevCategory}
            aria-label="Previous category"
          >
            ‹
          </button>

          <div className="MaterijaliCategoryBar">
            {visibleCategories.map((cat) => (
              <button
                key={cat.title}
                className={`MaterijaliCategoryBtn${
                  cat.index === activeIndex ? " active" : ""
                }`}
                type="button"
                onClick={() => selectCategory(cat.index)}
              >
                <span className="MaterijaliCategoryTitle">{cat.title}</span>
              </button>
            ))}
          </div>

          <button
            className="MaterijaliCategoryArrow"
            type="button"
            onClick={showNextCategory}
            aria-label="Next category"
          >
            ›
          </button>
        </div>

        <section className="MaterijaliContent">
          {activeCategory.subcategories && (
            <div className="MaterijaliFilterBar">
              <button
                type="button"
                className={activeSubcategoryIndex === null ? "active" : ""}
                onClick={() => {
                  setActiveSubcategoryIndex(null);
                  setFullscreenIndex(null);
                  setCarouselStart(0);
                }}
              >
                Сите
              </button>

              {activeCategory.subcategories.map((subcategory, index) => (
                <button
                  type="button"
                  key={subcategory.title}
                  className={activeSubcategoryIndex === index ? "active" : ""}
                  onClick={() => selectSubcategory(index)}
                >
                  {cleanSubcategoryTitle(
                    activeCategory.title,
                    subcategory.title,
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="MaterijaliCarouselShell">
            <button
              className="MaterijaliSideArrow left"
              type="button"
              onClick={showPrevCarousel}
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="MaterijaliCarouselGrid">
              {visiblePhotos.map(({ src, index }) => (
                <button
                  className="MaterijaliProjectCard"
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => openFullscreen(index)}
                >
                  <img
                    src={src}
                    alt={`${activeCategory.title} ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>

            <button
              className="MaterijaliSideArrow right"
              type="button"
              onClick={showNextCarousel}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </section>

        {fullscreenImage && (
          <div className="MaterijaliLightbox" onClick={closeFullscreen}>
            <button
              className="MaterijaliLightboxClose"
              type="button"
              aria-label="Close"
            >
              ×
            </button>

            <button
              className="MaterijaliLightboxArrow prev"
              type="button"
              onClick={showPrevFullscreen}
              aria-label="Previous"
            >
              ‹
            </button>

            <img
              src={fullscreenImage}
              alt="Материјали преглед"
              onClick={(event) => event.stopPropagation()}
            />

            <button
              className="MaterijaliLightboxArrow next"
              type="button"
              onClick={showNextFullscreen}
              aria-label="Next"
            >
              ›
            </button>

            <div className="MaterijaliLightboxCounter">
              {fullscreenIndex + 1} / {activePhotos.length}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
