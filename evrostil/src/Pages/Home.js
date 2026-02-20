import React from 'react';
import './Home.css';
import render1 from '../sliki/renderHome1.png'
import render2 from '../sliki/renderHome2.png'
import render3 from '../sliki/renderHome3.png'
import Carousel from '../Components/Carousel'
import plan from '../sliki/planApartman.jpg'
import mebel from '../sliki/Mebel.jpg'
import wideo from '../sliki/EvrostilM.mp4'
import bricks from '../sliki/blackBrick.jpg'
import logoOutline from '../logos/outline logo.png'
import drawer from '../logos/drawer.png'
import leftLeg from '../logos/leftLeg.png'
import rightLeg from '../logos/rightLeg.png'
import hat from '../logos/Hat.png'
import text from '../logos/text.png'
import materijali from '../sliki/materijali.png'
import Footer from '../Components/footer.js'

function Home() {

    const images = [render1,render2,render3]

    return (
        <div className="HomeWrapper">
        <div className="Home">
            <div className="hero">
                <div className="image">
                    <Carousel images={images} />
                </div>
                <div className="text">
                    {/*<div className="ks">Квалитетни <span>Станови</span></div>*/}
                    {/*<div className="km">Квалитетен и Современ <span>Мебел</span></div>*/}
                    {/*<h3 className="slogan">Евростил со <span>Стил</span></h3>*/}
                    {/*<img className="srce" src={logoOutline}/>*/}
                    <img className="drawer1 drawer" src={drawer}/>
                    <img className="drawer2 drawer" src={drawer}/>
                    <img className="drawer3 drawer" src={drawer}/>
                    <img className="leftleg leg" src={leftLeg}/>
                    <img className="rightleg leg" src={rightLeg}/>
                    <img className="hat" src={hat}/>
                    <img className="textlogo" src={text}/>
                </div>
            </div>

            <div className="main">
                <div className="header">ШТО НУДИМЕ</div>
                <div className="linkovi">
                    <div className="linkplan">
                        <img src={plan} />
                        <div className="label">Станови</div>
                    </div>
                    <div className="linkmebel">
                        <img src={mebel} />
                        <div className="label">Мебел</div>
                    </div>
                    <div className="linkmebel">
                        <img src={materijali} />
                        <div className="label">Репроматеријали</div>
                    </div>
                </div>
            </div>


            <div className="bot">
            <div className="header">НАСКОРО</div>

            <div className="video">
                <div className="vidCont">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                >
                    <source src={wideo} type="video/mp4" />
                </video>
                </div>
                <div className="videoDesc">
                <div className="title1">ASTRA RESIDENCE by<br/> <span className="evro">ЕВРОСТИЛ-<span className="m">M</span></span></div>
                {/*<div className="title">Новиот модерен комплекс e лоциран во населба Софилар, Струмица</div>*/}
                <button className="learnmore">Дознај повеќе..</button>
                </div>
            </div>
        </div>
            <Footer />
        </div>
        </div>
    )
}

export default Home;