import React from 'react'
import { Dimmer, Segment } from 'semantic-ui-react'

const Loader = props => {
    return (
        <Segment>
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        </Segment>
    )
}

export default Loader