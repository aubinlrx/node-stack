// @flow

import connect from 'react-redux'

import Message from '../component/message'

const mapStateProps = state => ({
  message: state.hello.get('message'),
})

export default connect(mapStateProps)(Message)
