import {Link} from 'react-router-dom';

const Home = () => {

    return (
        <div className="row home">
            <div className="col1">
                <h2>FITNESS TRAKR</h2>
                <h3>Track and create routines on here</h3>
                <p>Yay exercise!</p>
                <button className="btn"><Link to="/routines">See Public Routines</Link></button>
            </div>
            <div className="col2">
                <img src="/" className="homeImage" alt="" />
                <div className="colorBox"></div>
            </div>
            
        </div>
    )
}

export default Home;