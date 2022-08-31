import './Header.css'

function Header() {
    return (
        <nav>
            <div className='header--container'>
                <h1 className='header--title'>Art quiz</h1>
                <h2 className='header--sub-title'>See what you know</h2>
            </div>
            <div className='sub--header--container'>
                <h2 className='header--sub-title'>Powered by the The Metropolitan Museum of Art API</h2>
            </div>
        </nav>
    )
}

export default Header