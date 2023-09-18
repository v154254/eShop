import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CartType } from '../../types/cart-types/cart-types';

import deleteCart from '../../core/services/testCart/deleteCart';
import getCartById from '../../core/services/Cart/getCartById';

import Container from '../../components/layout/container/Container';
import CartProductCard from '../../components/ui/CartProductCard/CartProductCard';

import styles from './Cart.module.css';
import sendPromoCode from '../../core/services/Cart/sendPromoCode';

function Cart() {
  const [cart, setCart] = useState<CartType>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const getTotalPrice = useCallback((newCart: CartType) => {
    setTotalPrice(newCart.totalPrice.centAmount);
    setCart(newCart);
  }, []);

  const handlePromoCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const applyPromo = useCallback(async () => {
    try {
      const newCart = await sendPromoCode(promoCode);
      getTotalPrice(newCart);
      setPromoApplied(true);
      setPromoError('');
    } catch (error) {
      setPromoApplied(false);
      setPromoError('This promo code does not exist');
    }
  }, [getTotalPrice, promoCode]);

  useEffect(() => {
    getCartById()
      .then((res) => {
        setCart(res);
        setTotalPrice(res.totalPrice.centAmount);
      })
      .catch(() => {});
  }, []);
  return (
    <section>
      <Container>
        {cart && cart.lineItems && cart.lineItems.length > 0 ? (
          <div className={styles.wrapper}>
            {cart.lineItems.map((item) => (
              <CartProductCard lineItem={item} key={item.id} getTotalPrice={getTotalPrice} />
            ))}
            <div className={styles.footer__wrapper}>
              <div>
                <p>Enter promo</p>
                <input type='text' onChange={handlePromoCodeChange} value={promoCode} />
                <button type='button' onClick={applyPromo}>
                  Apply
                </button>
              </div>
              <button
                className={styles.button_clear}
                type='button'
                onClick={() => {
                  getCartById()
                    .then((res) => {
                      deleteCart(res.id, res.version)
                        .then(() => {
                          setCart(undefined);
                          localStorage.setItem('cartId', '');
                        })
                        .catch(() => {});
                    })
                    .catch(() => {});
                }}
              >
                Clear cart
              </button>
              <div className={styles.total__wrapper}>
                <span>Total:</span>
                <span style={{ color: promoApplied ? 'green' : 'black' }}>
                  {promoApplied
                    ? ((totalPrice * 0.95) / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : (totalPrice / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                </span>
                <span
                  style={{
                    textDecoration: promoApplied ? 'line-through' : 'none',
                    color: promoApplied ? 'red' : 'black',
                  }}
                >
                  {(totalPrice / 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
              </div>
              <div style={{ color: 'red' }}>{promoError}</div>
            </div>
          </div>
        ) : (
          <div className={styles.empty__wrapper}>
            <div className={styles.empty__description}>
              <h3>Card is Empty</h3>
              <div>
                <span>Go to </span>
                <Link className={styles.empty_link} to='/categories/smartphones'>
                  Smartphones
                </Link>
              </div>
              <div>
                <span>Go to </span>
                <Link className={styles.empty_link} to='/categories/laptops'>
                  Laptops
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Cart;
