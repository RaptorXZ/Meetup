import avatar from '../images/avatar.png'

function Header() {

    return (
        <header>
            <h1>Meetup</h1>
            <button>
                <img src={avatar}></img>
                <h2>David1337</h2>
            </button>
        </header>
    )

}

export default Header