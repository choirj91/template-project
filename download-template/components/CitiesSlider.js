import React, { useEffect } from 'react';
import classNames from 'classnames';

class CitiesSlider extends React.Component {
  constructor(props) {
    super(props);
    
    this.IMAGE_PARTS = 4;
    
    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;
    
    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }
  
  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }
  
  componentDidMount() {
    // this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }
  
  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }
  
  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }
  
  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      <div className={classNames('slider', { 's--ready': sliderReady })}>
        <p className="slider__top-heading">낙준's 영화관</p>
        <div className="slider__slides">
          {slides.map((slide, index) => (
            <div
              className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
              key={slide.city}
              >
              <div className="slider__slide-content">
                <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
                <h2 className="slider__slide-heading">
                  {slide.city.split('').map(l => <span key={l}>{l}</span>)}
                </h2>
                <a download target="_blank" href={slide.link} className="slider__slide-readmore" onClick={() => {slide.link ? {} : alert("Coninue")}}>영화 다운로드</a>
              </div>
              <div className="slider__slide-parts">
                {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                  <div className="slider__slide-part" key={i}>
                    <div className="slider__slide-part-inner" style={{ backgroundImage: slide.img ? `url(${slide.img})` : 'url(/static/2021-2022-next.jpg)', filter: slide.img ? "brightness(0.8)" : "brightness(0.5)" }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="slider__control" onClick={() => this.changeSlides(-1)} />
        <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
      </div>
    );
  }
}

const slides = [
  {
    city: '007 노 타임 투 다이',
    country: '2021',
    img: 'https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20211006_104%2F1633486650830aoJup_JPEG%2Fmovie_image.jpg',
    link: '2021_007_No_Time_To_Die_korea.mkv'
  },
  {
    city: 'Continue',
    img: '',
  },
  // {
  //   city: 'Prague',
  //   country: 'Czech Republic',
  //   img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
  // },
  // {
  //   city: 'Amsterdam',
  //   country: 'Netherlands',
  //   img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
  // },
  // {
  //   city: 'Moscow',
  //   country: 'Russia',
  //   img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
  // },
];

export default CitiesSlider;