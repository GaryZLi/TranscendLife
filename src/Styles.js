import {StyleSheet, Dimensions} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d6d4d4",
        // backgroundColor: "#dedede"
    },
    TitleBarLook: {
        height: "10%",
        // height: Platform.OS === 'ios' ? 110 : 100,
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
    preferenceListText: {
        textAlign: "center",
        fontSize: 30,
        color: "black",
        marginTop: 10,
    },
    checkBox: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    },
    mealText: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 0.06 * Dimensions.get("window").width,
    },
    homeView: {
        height: "70%",
        marginTop: 10,
    },
    suggestedView: {
        width: "90%", 
        // height: 300, 
        backgroundColor: "white", 
        alignSelf: "center", 
        marginTop: 10,
        borderStyle: "solid",
        borderWidth: 2,
        // borderColor: "black",
        paddingLeft: 10,
        borderRadius: 5,
    },
    chooseButton: {
        alignSelf: "center",
        backgroundColor: "#33adff",
        height: 30,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 30,
        borderRadius: 5,
        color: "white",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#008ae6"
    },
    sideBarView: {
        width: "100%",
        backgroundColor: "#a6a6a6",
    },
    greetingText: {
        right: 0, 
        position: "absolute", 
        marginRight: 5, 
        color: "white",
        alignSelf: "center",
        fontSize: 18
    },
    sideBarOptions: {
        alignItems: "center",
        color: "white",
        marginTop: 20
    },
    searchBar: {
        width: "80%",
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 5,
        borderColor: "red"
    },
    searchBarText: {
        backgroundColor: "white", 
        paddingLeft: 10,
    },
    searchButton: {
        alignSelf: "center",
        backgroundColor: "#33adff",
        height: 30,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        borderRadius: 5,
        color: "white",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#008ae6"
    },
    distanceBox: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 30,
    }, 
    distanceTextBox: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "white",
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "center"
    },
    distanceChosen: {
        borderWidth: 2,
        borderColor: "red",
        borderStyle: "solid",
    },  
    sideBarOptionTexts: {
        color: "white",
        fontSize: 30,
        marginTop: 10,
        alignSelf: "center"
    },
    sideBarProfileSetting: {
        width: "80%", 
        borderTopColor: "black", 
        borderStyle: "solid", 
        alignSelf: "center"
    },
    mainView: {
        width: "100%",
        backgroundColor: "blue",
        paddingBottom: 100
    },  
    errorText: {
        marginTop: 10,
        color: 'red',
        textAlign: 'center',
    },
    inputBoxStyle: {
        height: 40,
        borderColor: 'black',
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
    },
    burgerMenu: {
        height: 3,
        width: 30,
        backgroundColor: "white",
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 5,
    }
})