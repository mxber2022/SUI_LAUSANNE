import "./Header.css";

import headerImage from "./Assets/revive.png";

function Header () {

    return(
        <header className="header">
            <div className="header__animation"></div>
            <div className="header__container">
                <div className="header__content">
                    <h1 className="header__title">
                        Revive: Every idea deserves a chance.
                    </h1>
                </div>
                <div className="header__img">
                    <img src={headerImage} alt=""/>
                </div>
            </div>
        </header>
    );
}

export default Header;