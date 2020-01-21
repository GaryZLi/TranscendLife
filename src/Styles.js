import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    TitleBarLook: {
        height: Platform.OS === 'ios' ? 110 : 100,
        width: '100%',
        backgroundColor: 'red',
        paddingTop: Platform.OS === 'ios' ? 28 : 24,
        justifyContent: 'center',
    },
    TitleBarText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    signInText: {
        color: 'red',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
    },
    signUpText: {
        color: 'red',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    inputBoxStyle: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        width: '80%',
        fontSize: 20,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 5,
    }
})