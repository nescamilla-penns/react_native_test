import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#005ead',
    },
    item: {
        backgroundColor: '#ff0000',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
        borderColor: '#00357d',
        borderRadius: 15,
        borderWidth: 3,
    },
    title: {
        textAlign: "center",
        fontSize: 23,
        fontWeight: "800",
        color: "#fff",
    },
    inputForm: {
        borderColor: '#999',
        borderWidth: 1,
        margin: 8,
        fontSize: 18,
        fontWeight: '400',
        color: '#000',
        backgroundColor: "#fff",
        borderRadius: 15,
        height: 50,
    },
    button: {
        margin: 5,
        backgroundColor: "#004179",
        borderRadius: 50,
    },
    buttonCancel: {
        margin: 5,
        backgroundColor: "#b91c1c",
        borderRadius: 50,
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
        fontSize: 19,
    },
    buttonCancelText: {
        textAlign: 'center',
        padding: 20,
        color: '#f44336',
        fontWeight: "bold",
        fontSize: 19,
        textShadowRadius: 1,
        textShadowColor: "#000",
        textShadowOffset: {width: 1, height: 1},
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
        fontSize: 23,
        fontWeight: "bold",
        textShadowRadius: 1,
        textShadowColor: "#000",
        textShadowOffset: {width: 1, height: 1},
    },
    itemSelectedColor: {
        backgroundColor: '#004179',
    },
    itemUnselectedColor: {
        backgroundColor: '#fff',
    },
    productImage: {
        width: 48, 
        height: 50, 
        margin: 10,
        marginTop: 20,
    },
    containerFlex1: {
        flex: 1,
        backgroundColor: "#005ead",
        padding: 5,
    },
    containerFlex6: {
        flex: 6,
    },
    container: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
});