import React from "react";
import Glide from '@glidejs/glide';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
export default function Slider(props) {

    React.useEffect(() => {

        const initGlide = () => {
            new Glide(`.${props.className || 'glide'}`, {
                type: props.type || 'slider',
                focusAt: 'center',
                startAt: 0,
                perView: props.perView || 3,
                autoplay: props.delay || 4000,
                gap: 20,
                breakpoints: {
                    800: {
                        perView: 1
                    },
                    600: {
                        perView: 1
                    }
                }
            }).mount();
        };
        initGlide();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={ props.className ? props.className + ' glide' : 'glide' }>

            { props.arrows && (

                <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                        <FaArrowLeft />
                    </button>
                </div>
            ) }
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    { props.images.map((el, i) => (
                        <li className='glide__slide' key={ i } style={ props.styleSlide || null } >
                            <img src={ el.path } alt={ el.alt } className="glide__image" key={ i } />
                            { el.title && <h3 className='glide__title'>{ el.title } </h3> }
                            { el.description && <small className='glide__description'>{ el.description } </small> }
                        </li>
                    )) }
                </ul>
            </div>

            { props.arrows && (

                <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                        <FaArrowRight />
                    </button>
                </div>
            ) }
            { props.bullets && (
                <div className="glide__bullets" data-glide-el="controls[nav]">
                    { props.images.map((el, i) => (
                        <button className="glide__bullet" key={ i } data-glide-dir={ "=" + i }></button>
                    )) }
                </div>
            ) }
        </div>
    );
}