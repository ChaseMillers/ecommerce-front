import React from "react";
import "./Footer.css";

const Footer = () => (
    <div className="footer">
    <div class='social-text'>Follow Us</div>
            <div class='contact-icons'> 
              <ul className='ul-icons'>
                <li><a class="fab fa-facebook" 
                href='https://www.facebook.com/'
                target="_blank"></a></li>

                <li><a class="fab fa-pinterest"
                href='https://www.pinterest.com/' 
                target="_blank"></a></li>

                <li><a class="fab fa-instagram"
                href='https://www.instagram.com/' 
                target="_blank"></a></li>
              </ul>
            </div>

        © 2020 beverage. All Rights Reserved.
    </div>
)

export default Footer