import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { ctpClient, projectKey } from '../../../BuildClient';
import { ClientData } from '../../../types/types';
import countryCodes from './countryCodes';
import AddressForm from './components/addressForm';
import PersonalForm from './components/personalForm';
import BillingAddressForm from './components/billingAddressForm';

import styles from './RegistrationForm.module.css';
import tryLogIn from '../../../core/utils/tryLogin';
import AuthContext from '../../../core/utils/authContext';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

function RegistrationForm() {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [initialSelectedCountry] = useState('Belarus');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingInitialSelectedCountry] = useState('Belarus');
  const [billingSelectedCountry, setBillingSelectedCountry] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [shippingDefaultAddress, setShippingDefaultAddress] = useState(false);
  const [billingDefaultAddress, setBillingDefaultAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);

  const [lastNameError, setLastNameError] = useState('');
  const [lastNameValid, setLastNameValid] = useState(false);

  const [birthDayError, setBirthDayError] = useState('');
  const [birthDayValid, setBirthDayValid] = useState(false);

  const [streetError, setStreetError] = useState('');
  const [streetValid, setStreetValid] = useState(false);

  const [cityError, setCityError] = useState('');
  const [cityValid, setCityValid] = useState(false);

  const [postalCodeError, setPostalCodeError] = useState('');
  const [postalCodeValid, setPostalCodeValid] = useState(false);

  const [billingStreetError, setBillingStreetError] = useState('');
  const [billingStreetValid, setBillingStreetValid] = useState(false);

  const [billingCityError, setBillingCityError] = useState('');
  const [billingCityValid, setBillingCityValid] = useState(false);

  const [billingPostalCodeError, setBillingPostalCodeError] = useState('');
  const [billingPostalCodeValid, setBillingPostalCodeValid] = useState(false);

  const submitRegistrationForm = async () => {
    let countryCode;

    if (!selectedCountry) {
      countryCode = countryCodes[initialSelectedCountry];
    } else {
      countryCode = countryCodes[selectedCountry];
    }

    let billingCountryCode;

    if (!selectedCountry) {
      billingCountryCode = countryCodes[billingInitialSelectedCountry];
    } else {
      billingCountryCode = countryCodes[billingSelectedCountry];
    }

    const newClientData: ClientData = {
      email,
      password,
      firstName,
      lastName,
      birthDay, // меняешь на dateOfBirth и по идее всё работатет
      addresses: [
        {
          streetName: street,
          city,
          postalCode,
          country: countryCode,
        },
        {
          streetName: showBillingAddress ? billingStreet : street,
          city: showBillingAddress ? billingCity : city,
          postalCode: showBillingAddress ? billingPostalCode : postalCode,
          country: showBillingAddress ? billingCountryCode : countryCode,
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
      defaultShippingAddress: shippingDefaultAddress ? 0 : undefined,
      defaultBillingAddress: billingDefaultAddress ? 1 : undefined,
    };

    const createCustomer = () => {
      return apiRoot
        .customers()
        .post({
          body: newClientData,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .execute();
    };

    await createCustomer();
  };

  return (
    <div className={styles.registration__form_block}>
      <form className={styles.registration__form}>
        <PersonalForm
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          setEmailError={setEmailError}
          emailValid={emailValid}
          setEmailValid={setEmailValid}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          passwordValid={passwordValid}
          setPasswordValid={setPasswordValid}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          firstName={firstName}
          setFirstName={setFirstName}
          firstNameError={firstNameError}
          setFirstNameError={setFirstNameError}
          firstNameValid={firstNameValid}
          setFirstNameValid={setFirstNameValid}
          lastName={lastName}
          setLastName={setLastName}
          lastNameError={lastNameError}
          setLastNameError={setLastNameError}
          lastNameValid={lastNameValid}
          setLastNameValid={setLastNameValid}
          birthDay={birthDay}
          setBirthDay={setBirthDay}
          birthDayError={birthDayError}
          setBirthDayError={setBirthDayError}
          birthDayValid={birthDayValid}
          setBirthDayValid={setBirthDayValid}
        />
        <p className={styles.address__title}>Shipping address:</p>
        <AddressForm
          street={street}
          setStreet={setStreet}
          streetError={streetError}
          setStreetError={setStreetError}
          streetValid={streetValid}
          setStreetValid={setStreetValid}
          city={city}
          setCity={setCity}
          cityError={cityError}
          setCityError={setCityError}
          cityValid={cityValid}
          setCityValid={setCityValid}
          initialSelectedCountry={initialSelectedCountry}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          postalCodeError={postalCodeError}
          setPostalCodeError={setPostalCodeError}
          postalCodeValid={postalCodeValid}
          setPostalCodeValid={setPostalCodeValid}
        />
        <div className={styles.checkboxes__block_shipping}>
          <div className={styles.checkbox__default_block}>
            <label className={styles.checkbox__label} htmlFor='defaultShippingAddress'>
              <input
                type='checkbox'
                checked={shippingDefaultAddress}
                onChange={(e) => setShippingDefaultAddress(e.target.checked)}
              />
              <span>Default address</span>
            </label>
          </div>

          <div className={styles.checkbox__show_billing}>
            <label className={styles.checkbox__label} htmlFor='showBillingAddress'>
              <input
                type='checkbox'
                checked={billingAddress}
                onChange={(e) => {
                  setBillingAddress(e.target.checked);
                  setShowBillingAddress(e.target.checked);
                }}
              />
              <span>Add billing address</span>
            </label>
          </div>
        </div>

        {showBillingAddress && (
          <div>
            <p className={styles.address__title}>Billing address:</p>
            <BillingAddressForm
              billingStreet={billingStreet}
              setBillingStreet={setBillingStreet}
              billingCity={billingCity}
              setBillingCity={setBillingCity}
              billingInitialSelectedCountry={billingInitialSelectedCountry}
              billingSelectedCountry={billingSelectedCountry}
              setBillingSelectedCountry={setBillingSelectedCountry}
              billingPostalCode={billingPostalCode}
              setBillingPostalCode={setBillingPostalCode}
              billingStreetError={billingStreetError}
              setBillingStreetError={setBillingStreetError}
              billingStreetValid={billingStreetValid}
              setBillingStreetValid={setBillingStreetValid}
              billingCityError={billingCityError}
              setBillingCityError={setBillingCityError}
              billingCityValid={billingCityValid}
              setBillingCityValid={setBillingCityValid}
              billingPostalCodeError={billingPostalCodeError}
              setBillingPostalCodeError={setBillingPostalCodeError}
              billingPostalCodeValid={billingPostalCodeValid}
              setBillingPostalCodeValid={setBillingPostalCodeValid}
            />
            <div className={styles.checkbox__default_block_shipping}>
              <label className={styles.checkbox__label} htmlFor='defaultBillingAddress'>
                <input
                  type='checkbox'
                  checked={billingDefaultAddress}
                  onChange={(e) => setBillingDefaultAddress(e.target.checked)}
                />
                <span>Default address</span>
              </label>
            </div>
          </div>
        )}

        <button
          type='button'
          className={styles.sign__btn}
          onClick={() => {
            submitRegistrationForm()
              .then(() => {
                tryLogIn(
                  email,
                  password,
                  setEmailError as Dispatch<SetStateAction<string | boolean>>,
                  navigate,
                )
                  .then(() => {
                    setIsAuth(localStorage.getItem('isAuth'));
                  })
                  .catch((error) => {
                    if (error instanceof Error) throw new Error('error');
                  });
              })
              .catch((error) => {
                if (error instanceof Error) throw new Error('Registration error');
              });
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
