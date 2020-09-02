import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { get_img_path } from "../functions/get_images"

const Header = ({ siteTitle }) => (
  <header>
    <div className="header-content container">
      <div className="header-logo" style={{backgroundImage: ''}}>
        <Link to="/">
        </Link>
      </div>
      <div className="header-parts">
        <div className="header-communication">
          <div className="header-btn uppercase">Sélectionnez une région</div>
          <div className="header-btn uppercase">Êtes-vous un patient ?</div>
          <div
            className="header-social-btn facebook-logo-mini background-image"
            style={{backgroundImage: get_img_path('/images/icons/social-networks/facebook.webp')}}
          ></div>
          <div
            className="header-social-btn linkedin-logo-mini background-image"
            style={{backgroundImage: get_img_path('/images/icons/social-networks/linkedin.webp')}}
          ></div>
          <div
            className="header-social-btn twitter-logo-mini background-image"
            style={{backgroundImage: get_img_path('/images/icons/social-networks/twitter.webp')}}
          ></div>
          <div
            className="header-social-btn instagram-logo-mini background-image"
            style={{backgroundImage: get_img_path('/images/icons/social-networks/instagram.webp')}}
          ></div>
          <div
            className="header-social-btn youtube-logo-mini background-image"
            style={{backgroundImage: get_img_path('/images/icons/social-networks/youtube.webp')}}
          ></div>
        </div>
        <div className="header-navigation">

        </div>
      </div>
  </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
