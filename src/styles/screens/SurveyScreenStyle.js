import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#005ead',
        paddingTop: 10,
    },
    title: {
        textAlign: "center",
        fontSize: 120,
        fontWeight: "bold",
        color: "#fff"
    },
    subtitle: {
        textAlign: "left",
        fontSize: 20,
        paddingLeft: 5,
        paddingTop: 10,
        color: "#fff",
    },
    item: {
        backgroundColor: '#fff',
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 8,
        borderColor: '#4caf50',
        borderRadius: 15,
        borderWidth: 6,
    },
    itemText: {
        color: "#000",
        textAlign: "left",
        fontSize: 23,
        flex: 1,
    },
    itemDateText: {
        color: "#548bdf",
        textAlign: "left",
        fontSize: 23,
        flex: 1,
        fontWeight: "bold",
        textShadowRadius: 1,
        textShadowColor: "#000",
        textShadowOffset: {width: 1, height: 1},
    },
    itemSelectedColor: {
        backgroundColor: '#005ead',
    },
    itemUnselectedColor: {
        backgroundColor: '#fff',
    },
    itemSyncBorderColor: {
        borderColor: '#4caf50',
    },
    itemUnsyncBorderColor: {
        borderColor: '#f44336',
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
    },
    button: {
        margin: 10,
        backgroundColor: "#004179",
        borderRadius: 50,
    },
    buttonText: {
        textAlign: 'center',
        padding: 16,
        color: 'white',
        fontSize: 19,
    },
    buttonNewText: {
        textAlign: 'center',
        padding: 16,
        color: '#4caf50',
        fontWeight: "bold",
        fontSize: 19,
        textShadowRadius: 1,
        textShadowColor: "#000",
        textShadowOffset: {width: 1, height: 1},
    },
    dateComponent: {
        width: 280,
    },
    container: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
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
    },
    containerFlex1: {
        flex: 2,
        backgroundColor: "#005ead",
        //padding: 20,
    },
    containerFlex6: {
        flex: 6,
    },
    syncImage: {
        width: 50, 
        height: 50, 
        margin: 10,
        marginTop: 20,
    },
});