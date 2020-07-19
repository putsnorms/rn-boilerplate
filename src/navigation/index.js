import React, {useState, useEffect} from 'react'
import * as authActions from 'src/redux/auth/actions'
import {AsyncStorage} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import Authenticated from './authenticated'
import Guest from './guest'

export default function RootNavigation() {
  const [initializing, setInitializing] = useState(true)
  const isAuthenticated = useSelector(state => state.AuthReducer.token)

  const dispatch = useDispatch()

  useEffect(() => {
    const initializeData = async() => {
      const _token = await AsyncStorage.getItem('_token_')
      const userData = await AsyncStorage.getItem('userData')

      if (_token) {
        dispatch(authActions.setUser(JSON.parse(userData)))
        dispatch(authActions.setToken(_token))
      }
    }

    setTimeout(() => {
      setInitializing(false)
    }, 1000)

    initializeData()
  }, [])

  if (initializing) {
    return null
  }

  return isAuthenticated ? (
    <Authenticated />
  ) : (
    <Guest />
  )
}