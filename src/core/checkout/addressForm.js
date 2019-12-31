import Country from "./Countries"
import React, { useState, useEffect } from "react";

const AddressForm = ({setData, data}) => {

    const handleEmail = event => {
    setData({ 
        ...data, 
        email: event.target.value
    });
    };
    const handleName = event => {
    setData({ 
        ...data, 
        name: event.target.value,
    });
    };
    const handleAddress = event => {
    setData({ 
        ...data, 
        address: event.target.value,
    });
    };
    const handleApt = event => {
    setData({ 
        ...data, 
        apt: event.target.value,
    });
    };
    const handleCity = event => {
    setData({ 
        ...data, 
        city: event.target.value,
    });
    };
    const handleZip = event => {
    setData({ 
        ...data, 
        zip: event.target.value,
    });
    };
    const handleState = event => {
    setData({ 
        ...data, 
        state: event.target.value,
    });
    }; 

    const handleCountry = event => {
    setData({ 
        ...data, 
        country: event.target.value,
    });
    }

    const countryWasNotSellect = () => {
        if (data.country === undefined) {
            setData({ 
                ...data, 
                country: "US"
            })
        }
    }

    useEffect(() => {
        countryWasNotSellect();
    }, []);

    return(
        <div>
        <h1>Shipping Address</h1>
        <hr />
        <div className="full-address-bar">
        <label className="address">
            Email
            <span class="required"> *</span>
        </label>
        <div class="email-address">
            <textarea 
            autocomplete="email" 
            class="form-control" 
            name="email"
            placeholder="Enter your email" 
            required 
            type="email"
            onChange={handleEmail}   
            value={data.email}
            />
        </div>
        </div>

        <div class="shipping-address">
        <div className="full-address-bar">
            <div class="address">
            Ship to
            </div>
            <label className="address-title">
                Full name
                <span class="required"> *</span>
            </label>
            <textarea 
                autocomplete="name" 
                class="form-control" 
                name="name"
                maxlength="30" 
                placeholder="Enter your full name" 
                required
                type="text"
                onChange={handleName}   
                value={data.name}
            />
        </div>
        <div className="long-address-bar">
            <label className="address-title">
                Street address (shipping)
                <span class="required"> *</span>
            </label>
            <textarea
                class="form-control" 
                autocomplete="shipping street-address" 
                maxlength="28" 
                placeholder="Address" 
                required
                type="text"
                onChange={handleAddress}   
                value={data.address}
            />
        </div>

        <div className='mini-address-bar'>
            <label className="address-title">
                Apt./Suite
            </label>
            <textarea
                class="form-control" 
                maxlength="28" 
                placeholder="Apt./Suite" 
                type="text"
                onChange={handleApt}   
                value={data.apt}
            />
        </div>

        <div className="long-address-bar">
            <label className="address-title">
                City
                <span class="required"> *</span>
            </label>
            <textarea 
                class="form-control" 
                autocomplete="shipping locality"
                maxlength="25" 
                placeholder="City" 
                required
                type="text"
                onChange={handleCity}   
                value={data.city}
            />
        </div>

        <div className='mini-address-bar'>
            <label className="address-title">
                Postal code
                <span class="required"> *</span>
            </label>
            <textarea 
                class="form-control" 
                autocomplete="shipping postal-code"
                maxlength="15" 
                placeholder="ZIP" 
                required
                type="text"
                onChange={handleZip}   
                value={data.zip}
            />
        </div>

        <div className="half-address-bar">
            <label className="address-title">
                State or Province
                <span class="required"> *</span>
            </label>
            <textarea
                class="form-control" 
                autocomplete="shipping region"
                maxlength="25" 
                placeholder="State" 
                required
                type="text"
                onChange={handleState}   
                value={data.state}
            />
        </div>

        <div className='half-address-bar'>
            <label className="address-title">
                Country 
                <span class="required"> *</span>
            </label>
                <Country 
                handleCountry={handleCountry} 
                data={data}/> 
        </div>
        </div>
        </div>
    )}
export default AddressForm