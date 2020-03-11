import React from "react";

const helpPopup = ({values, setValues}) => {

    const message = () => (
        <div className="prepGuide">
            <h1 className="prep-guide-title">Photo Prep Guide</h1>
            <button  type="button" className="exit-button" onClick={toggleHelp}>
                X
            </button>
                
            <ul className="images-container-ul">
                <li>
                    <p className="photo-help-text">
                        To edit image first open -
                    </p>
                    <a 
                        href ="https://www.photopea.com/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="photo-help-text"
                    >
                        <p>photopea.com</p>
                    </a>
                </li>
                <li>
                    <p className="photo-help-text">
                    On top left corner click "File" then "New" 
                    </p>
                </li>
              
                <li>
                    <p className="photo-help-text">
                    Enter in "Name", then set "Width" and "Height" to 720. 
                    </p>
                    <img src="https://i.imgur.com/kAyoYf6.png" alt=""></img>
                </li>
                <li>
                    <p className="photo-help-text">
                        To scale image, hold "Shift" then 
                        drag the corner of bounding box of the 
                        image until satisfied
                    </p>
                    <img src="https://i.imgur.com/x8zNKnI.png" alt=""></img>
                </li>
                <li>
                    <p className="photo-help-text">
                    To export click "File" "Export as" "More" "WEBP" then click Save
                    </p>
                    <img src="https://i.imgur.com/fYxykBw.png" alt="export file"></img>
                </li>
                <li>
                    <p className="photo-help-text">
                        Now that the image is optimised Upload it to the website!
                    </p>
                </li>
            </ul>
        
        </div>
    );

    const toggleHelp = () => {
        setValues({
            ...values,
            showHelp: !values.showHelp
        })
    };
    
    return(
        <div>
            <button 
                className="button-yellow no-margin" 
                type="button" 
                onClick={toggleHelp}
            >
                View Photo Prep Guide?
            </button>
            {values.showHelp ?     
            message()
            : null}
        </div>
    )
}

export default helpPopup