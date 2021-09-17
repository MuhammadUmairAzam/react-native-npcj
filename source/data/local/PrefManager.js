import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_SESSION_DATA_KEY = "@Session:UserData"
const IS_LOGIN_KEY = "@Session:IsUserLogin"

const createUserSession = async (sessionData, isLogin, onAdded) => {
    await AsyncStorage.setItem(USER_SESSION_DATA_KEY, JSON.stringify(sessionData));
    await AsyncStorage.setItem(IS_LOGIN_KEY, isLogin ? "true" : "false");
    onAdded()
}

const getUserSessionData = async (onLoaded) => {
    let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
    let jData = data ? JSON.parse(data) : null
    onLoaded(jData)
}

const updateSessionToken = async (token) => {
    let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
    if (data) {
        let jData = JSON.parse(data)
        jData.sessionToken = token
        await AsyncStorage.setItem(USER_SESSION_DATA_KEY, JSON.stringify(jData));
    }
}

const destroySession = async (onCompleted) => {
    await AsyncStorage.multiRemove([USER_SESSION_DATA_KEY, IS_LOGIN_KEY])
    onCompleted()
}

const updateLoginStatus = async (isLogin, onUpdated) => {
    await AsyncStorage.setItem(IS_LOGIN_KEY, isLogin ? "true" : "false");
    onUpdated()
}

const isUserLoggedIn = async (onResult) => {
    try {
        const val = await AsyncStorage.getItem(IS_LOGIN_KEY);
        onResult(val && val == "true")
    } catch (ex) {
        onResult(false)
        console.warn(ex.message)
    }
}

export {
    createUserSession, getUserSessionData, updateSessionToken, destroySession,
    updateLoginStatus, isUserLoggedIn
}