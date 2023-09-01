import React, { useState, useRef } from 'react';
import Modal from '../modal/modal';
import styles from './Slider.module.css';

interface Image {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

interface ImageList {
  images: Image[];
}

function Slider({ images }: ImageList) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const galleryBlockRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const changeSlide = (index: number) => {
    if (galleryBlockRef.current) {
      const galleryBtn = galleryBlockRef.current.querySelector(`.${styles.gallery__button}`);
      const slideWidth = galleryBtn ? galleryBtn.getBoundingClientRect().width : 0;
      setActiveSlideIndex(index);
      galleryBlockRef.current.scrollLeft = slideWidth * index;
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.slider__container}>
      <button type='button' className={styles.main__img_block} onClick={openModal}>
        <img src={images[activeSlideIndex].url} alt='img' />
      </button>
      {isModalOpen && <Modal imageUrl={images[activeSlideIndex].url} onClose={closeModal} />}
      <div className={styles.slider__block}>
        <button
          className={styles.slider__prev_btn}
          type='button'
          onClick={() =>
            changeSlide(activeSlideIndex === 0 ? images.length - 1 : activeSlideIndex - 1)
          }
        >
          &lt;
        </button>
        <div className={styles.gallery__block} ref={galleryBlockRef}>
          {images.map((image, index) => (
            <button
              type='button'
              key={image.url}
              onClick={() => changeSlide(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  changeSlide(index);
                }
              }}
              className={`${styles.gallery__button} ${
                index === activeSlideIndex ? styles.activeSlide : ''
              }`}
            >
              <img src={image.url} alt={`Slide-${index}`} className={styles.gallery__img} />
            </button>
          ))}
        </div>
        <button
          className={styles.slider__next_btn}
          type='button'
          onClick={() => changeSlide((activeSlideIndex + 1) % images.length)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Slider;
