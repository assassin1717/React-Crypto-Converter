import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeItem: 'home'
        }
    }

    handleItemClick = (e, { id }) => {
        this.setState({
            activeItem: id
        })
    }

    componentDidMount() {
        let rawUrl = (window.location.href).split("/")
        this.setState({
            activeItem: rawUrl[rawUrl.length - 1] === '' ? 'home' : rawUrl[rawUrl.length - 1]
        })
    }

    render() {
        const { activeItem } = this.state

        return (
            <div id='header'>
                <Menu pointing secondary size='massive' color='blue'>
                    <Menu.Item
                        as={Link} to='/'
                        name='CRYPTO CALCULATOR'
                        id='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={Link} to='/tickers'
                        name='TICKERS'
                        id='tickers'
                        active={activeItem === 'tickers'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </div>
        )
    }
}

export default Header