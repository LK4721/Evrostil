import React from 'react'
import './Stanovi.css'
import Footer from "../Components/footer";
import kompleks1 from "../sliki/zgrada123.png";
import kompleks2 from "../sliki/zgrada45.png";
import astra from "../sliki/astra.png";
import coverPhoto from "../logos/coverphot.png";

import AstraFlipBook from "../Components/FlipBookCarousel.js";


function Stanovi() {
    return (
        <div className="StanoviWrapper">
            <div className="Stanovi">
            <div className="mainStanP">
                <div className="Astra">
                    <div className="pageTitle2">ASTRA RESIDENCE</div>

                    <div className="flipbook-container">
                        <AstraFlipBook
                            coverImg={astra} // starting page = astra image
                            pages={[
                                {
                                    type: "img", src: coverPhoto, alt: "ASTRA RESIDENCE",
                                },
                                { type: "img", src: "/bosura/slika1.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika2.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika3.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika4.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika5.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika6.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika7.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika8.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika9.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika10.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika11.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika12.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika13.jpg", alt: "Astra page 2" },
                                { type: "img", src: "/bosura/slika14.jpg", alt: "Astra page 2" },
                            ]}
                        />

                        <div className="flipbook-desc">
                            <div className='glaven'>
                                Откријте го <span>НОВИОТ</span><br/> Astra Residence комплекс од Евростил-М.
                            </div>

                            <div className="brosura-izvest">
                                Кликнете на сликата и отворете ја брошурата.
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="pageTitle2">Евростил-М Проекти</div>*/}
                <div className="DonePro">
                <div className="sectiontitle">Готови Проекти</div>
                <div className="projectWrap">
                    <div className="project linkmebel">
                        <img src={kompleks1} alt="kompleks" />
                        <div className="label">Комплекс 1</div>
                        <div className="Sold">Продадено</div>
                    </div>
                    <div className="project linkmebel">
                        <img src={kompleks2} alt="kompleks" />
                        <div className="label">Комплекс 2</div>
                        <div className="Sold">Продадено</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}
export default Stanovi;