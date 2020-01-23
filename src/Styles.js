import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff3e6",
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
    profileText: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 35,
    },
    profileView: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        marginTop: 15,
    },
    profileCheckListText: {
        textAlign: "center",
        fontSize: 30,
        color: "red",
        marginTop: 10,
    },
    checkBox: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    },
    // checkList: {
    //     flex: 1,
    //     height: 30,
    //     backgroundColor: "grey",
    //     borderRadius: 5,
    //     justifyContent: "center"
    // },
    // checkBoxText: {
    //     color: "white",
    // },
    errorText: {
        marginTop: 10,
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
    },
    button: {
        height: 30, 
        width: 60, 
        backgroundColor: "#1af", 
        alignSelf: "center", 
        justifyContent: "center", 
        borderRadius: 5
    },
    buttonText: {
        textAlign: "center",
        color: "white",
    }
})