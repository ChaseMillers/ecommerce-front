import React, { useEffect, Suspense, lazy } from "react";
const Country = lazy(() =>
    import("./countries")
);

const AddressForm = ({setData, data}) => {
    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value });
    };
    
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return(
        <div>
            <h1>Shipping Address</h1>
            <hr />
            <div className="full-address-bar">
            <label className="address">
                Email
                <span className="required"> *</span>
            </label>
            <div className="email-address">
                <textarea 
                autoComplete="email" 
                className="form-control" 
                name="email"
                placeholder="Enter your email" 
                required 
                type="email"
                onChange={handleChange("email")}   
                value={data.email}
                />
            </div>
            </div>

            <div className="shipping-address">
            <div className="full-address-bar">
                <div className="address">
                Ship to
                </div>
                <label className="address-title">
                    Full name
                    <span className="required"> *</span>
                </label>
                <textarea 
                    autoComplete="name" 
                    className="form-control" 
                    maxLength="30" 
                    placeholder="Enter your full name" 
                    required
                    type="text"
                    onChange={handleChange("name")}    
                    value={data.name}
                />
            </div>
            <div className="long-address-bar">
                <label className="address-title">
                    Street address (shipping)
                    <span className="required"> *</span>
                </label>
                <textarea
                    className="form-control" 
                    autoComplete="shipping street-address" 
                    maxLength="28" 
                    placeholder="Address" 
                    required
                    type="text"
                    onChange={handleChange("address")}    
                    value={data.address}
                />
            </div>

            <div className='mini-address-bar'>
                <label className="address-title">
                    Apt./Suite
                </label>
                <textarea
                    className="form-control" 
                    maxLength="28" 
                    placeholder="Apt./Suite" 
                    type="text"
                    onChange={handleChange("apt")}    
                    value={data.apt}
                />
            </div>

            <div className="long-address-bar">
                <label className="address-title">
                    City
                    <span className="required"> *</span>
                </label>
                <textarea 
                    className="form-control" 
                    autoComplete="shipping locality"
                    maxLength="25" 
                    placeholder="City" 
                    required
                    type="text"
                    onChange={handleChange("city")}   
                    value={data.city}
                />
            </div>

            <div className='mini-address-bar'>
                <label className="address-title">
                    Postal code
                    <span className="required"> *</span>
                </label>
                <textarea 
                    className="form-control" 
                    autoComplete="shipping postal-code"
                    maxLength="15" 
                    placeholder="ZIP" 
                    required
                    type="text"
                    onChange={handleChange("zip")}    
                    value={data.zip}
                />
            </div>

            <div className="half-address-bar">
                <label className="address-title">
                    State or Province
                    <span className="required"> *</span>
                </label>
                <textarea
                    className="form-control" 
                    autoComplete="shipping region"
                    maxLength="25" 
                    placeholder="State" 
                    required
                    type="text"
                    onChange={handleChange("state")}  
                    value={data.state}
                />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <div className='half-address-bar'>
                    <label className="address-title">
                        Country 
                        <span className="required"> *</span>
                    </label>
                        <Country 
                        handleCountry={handleChange("country")}  
                        data={data}/> 
                </div>
            </Suspense>
            </div>
        </div>
    )}
export default AddressForm