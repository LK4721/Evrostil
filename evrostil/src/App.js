import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";
import SEO from "./Components/SEO";

import HomePage from "./Pages/Home";
import Stanovi from "./Pages/Stanovi";
import Mebel from "./Pages/Mebel";
import Uslugi from "./Pages/Uslugi";
import Kontakt from "./Pages/Kontakt";
import ZaNas from "./Pages/ZaNas";
import Materijali from "./Pages/Materijali";

const pageSeo = {
    "/": {
        description: "Евростил-М изработува мебел по мерка, нуди материјали и услуги за мебел, и гради квалитетни станбени објекти во Струмица.",
        image: "/Uslugi/mebelHeroPage.webp",
    },
    "/stanovi": {
        title: "Станови",
        description: "Станбени комплекси и реализирани објекти од Евростил-М со квалитетна градба, современи решенија и функционален простор.",
        image: "/Uslugi/astra.webp",
    },
    "/mebel": {
        title: "Мебел",
        description: "Мебел по мерка за кујни, плакари, детски соби, спални соби, комоди и деловни простори со прецизна изработка.",
        image: "/Uslugi/mebelHeroPage.webp",
    },
    "/galerija": {
        title: "Материјали",
        description: "Каталог на материјали, декори, работни плочи, оков, мијалници и додатоци за изработка на мебел.",
        image: "/Materijali/hero-materials.webp",
    },
    "/materijali": {
        title: "Материјали",
        description: "Каталог на материјали, декори, работни плочи, оков, мијалници и додатоци за изработка на мебел.",
        image: "/Materijali/hero-materials.webp",
    },
    "/uslugi": {
        title: "Услуги",
        description: "Професионални услуги за кроење, кантирање, бушење, монтажа и наем на опрема за мебел и товар.",
        image: "/Uslugi/kroenje-kantiranje-no-background.svg",
    },
    "/za-nas": {
        title: "За нас",
        description: "Евростил-М постои од 2003 година и работи со производство на мебел, материјали, услуги и изградба на станбени објекти.",
        image: "/Uslugi/20god.webp",
    },
    "/kontakt": {
        title: "Контакт",
        description: "Контактирајте го Евростил-М за мебел, станови, материјали и услуги. Телефон, email, работно време и локација во Струмица.",
        image: "/logo512.webp",
    },
};

function RouteWithSeo({ path, element }) {
    return (
        <>
            <SEO {...pageSeo[path]} />
            {element}
        </>
    );
}

function App() {
    return (
        <div className="App" onDragStart={(event) => event.preventDefault()}>
            <ScrollToTop />
            <Navbar />

            <Routes>
                <Route path="/" element={<RouteWithSeo path="/" element={<HomePage />} />} />
                <Route path="/stanovi" element={<RouteWithSeo path="/stanovi" element={<Stanovi />} />} />
                <Route path="/mebel" element={<RouteWithSeo path="/mebel" element={<Mebel />} />} />
                <Route path="/galerija" element={<RouteWithSeo path="/galerija" element={<Materijali />} />} />
                <Route path="/materijali" element={<RouteWithSeo path="/materijali" element={<Materijali />} />} />
                <Route path="/uslugi" element={<RouteWithSeo path="/uslugi" element={<Uslugi />} />} />
                <Route path="/za-nas" element={<RouteWithSeo path="/za-nas" element={<ZaNas />} />} />
                <Route path="/kontakt" element={<RouteWithSeo path="/kontakt" element={<Kontakt />} />} />
            </Routes>
        </div>
    );
}

export default App;
