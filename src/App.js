import React, { Component } from 'react';
import './App.scss';
import Trends from './Trends/Trends'
//import History from './History/History'
import { Navbar, Hero, Footer, Container, Content, Section, Heading } from "react-bulma-components/full";
import GitHubLogo from './GitHub-Mark-32px.png'

class App extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Brand>
                        <Navbar.Item renderAs="a" href="#">
                            powered by
                            <img
                            src="https://bulma.io/images/bulma-logo.png"
                            alt="Bulma: a modern CSS framework based on Flexbox"
                            width="112"
                            height="28"
                            />
                        </Navbar.Item>
                        
                    </Navbar.Brand>
                    <Navbar.Menu active={this.state.open}>
                        <Navbar.Container position="end">
                            <Navbar.Item href="https://github.com/Yo1L/crypto-pwa" className="github">
                                <img src={GitHubLogo} alt="GitHub"/>
                                Yo1L
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>
                </Navbar>

                <Container>
                    <Hero>
                        <Hero.Body>
                            <Heading>Crypto PWA</Heading>
                            <Heading subtitle size={3}>
                                a Node.js server push values through <a href="www.pusher.com">Pusher</a>
                            </Heading>
                        </Hero.Body>
                    </Hero>
                
                    <Trends />
                </Container>

                <Hero size="fullheight">
                    <Hero.Head renderAs="header" />
                    <Hero.Body />
                    <Hero.Footer>
                        <Footer>
                            <Container>
                                <Content style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>Crypto-PWA</strong> by <a href="https://github.com/Yo1L/crypto-pwa">Yo1L</a>. 
                                    </p>
                                    <p>
                                        Source code is under <a href="http://opensource.org/licenses/mit-license.php">MIT</a> license.
                                    </p>
                                </Content>
                            </Container>
                        </Footer>
                    </Hero.Footer>
                </Hero>
            </div>
        );
    }
}

export default App;
