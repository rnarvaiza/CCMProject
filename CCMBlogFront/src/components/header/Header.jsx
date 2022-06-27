import './header.css'

const Header = () => {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Cerveceros Caseros</span>
                <span className="headerTitleLg">Malaga</span>
            </div>
            <img
                className="headerImg"
                src="https://images.pexels.com/photos/5530253/pexels-photo-5530253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""/>
        </div>
    );
};

export default Header;