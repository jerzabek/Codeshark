import React from 'react';
import bannerImage from '../../assets/images/header/header-home.jpg'
import '../../assets/style/common/banner.css'
import { Link } from 'react-router-dom';
import { LOGIN } from '../../Routes';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Home(props) {
  return (
    <div>
      <div className="banner-container">
        <img className="banner-background" src={bannerImage} alt="Banner" />
        <div className="container banner-content text-white">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-9 text-center text-md-start">
              <h1 className="banner-title fw-700">Welcome to<br /><span className="fw-800">CodeShark</span></h1>
              <p className="banner-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, exercitationem in. Adipisci labore quas, commodi fugiat optio eveniet consequatur vel quo hic quis molestiae corrupti totam perferendis ex id libero? Eius omnis aspernatur fugit quia.</p>
              <Link to={LOGIN} className='btn btn-info btn-lg btn-outline-light rounded-0 btn-cta px-5'>Sign up now!</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5 text-center">
        <h1>Welcome to CodeShark</h1>
        <p className='mb-1'>Brought to you with <i className="bi bi-suit-heart-fill text-danger"></i> by <span className="fw-bold">DomeFanClub</span></p>
        <p className="text-muted">Work in progress #proginz 2021./2022.</p>
      </div>
    </div>
  );
}

export default Home;