import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#005ead',
        paddingTop: 10,
    },
    item: {
        backgroundColor: '#ff0000',
        padding: 10,
        marginVertical: 6,
        marginHorizontal: 8,
        borderColor: '#00357d',
        borderRadius: 15,
        borderWidth: 1,
    },
    title: {
        textAlign: "center",
        fontSize: 23,
        fontWeight: "800",
        color: "#fff",
    },
    subtitle: {
        textAlign: "left",
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        color: "#fff",
    },
    error: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "800",
        color: "#ff0000",
    },
    inputForm: {
        borderColor: '#999',
        borderWidth: 1,
        margin: 8,
        fontSize: 18,
        paddingLeft: 20,
        fontWeight: '400',
        color: '#000',
        backgroundColor: "#fff",
        borderRadius: 50,
        height: 50,
    },
    button: {
        margin: 5,
        backgroundColor: "#004179",
        borderRadius: 50,
    },
    buttonText: {
        textAlign: 'center',
        padding: 16,
        color: 'white',
        fontSize: 19,
    },
    buttonNextText: {
        textAlign: 'center',
        padding: 16,
        color: '#4caf50',
        fontWeight: "bold",
        fontSize: 19,
        textShadowRadius: 1,
        textShadowColor: "#000",
        textShadowOffset: {width: 1, height: 1},
    },
    buttonsContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
    containerFlex1: {
        flex: 1,
        backgroundColor: "#005ead",
        padding: 10,
    },
    containerFlex6: {
        flex: 6,
    },
    switchContainer: {
        flex: 0.5, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
    switchTextContainer: {
        margin: 3,
    },
    switchText: {
        color:"#fff", 
        fontSize: 16,
    },
    itemContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'stretch',
    },
    itemContainerImage: {
        flex: 1, 
    },
    itemContainerText: {
        flex: 4,
        marginLeft: 20,
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
    itemText: {
        color: "#548bdf",
        textAlign: "left",
        fontSize: 18,
        fontWeight: "bold",
        textShadowRadius: 1,
        textShadowColor: "#000",
    },
    itemSelectedColor: {
        backgroundColor: '#004179',
    },
    itemUnselectedColor: {
        backgroundColor: '#fff',
    },
    dealerImage: {
        width: 43, 
        height: 30, 
        margin: 10,
        marginTop: 20,
    },
});