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
        //borderColor: '#00357d',
        borderTopColor: '#00357d',
        borderBottomColor: '#00357d',
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
        paddingLeft: 5,
        paddingTop: 10,
        color: "#fff",
    },
    button: {
        margin: 5,
        backgroundColor: "#004179",
        borderRadius: 50,
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
        fontSize: 19,
    },
    buttonNextText: {
        textAlign: 'center',
        padding: 20,
        color: '#4caf50',
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
        fontSize: 18,
        fontWeight: "bold",
        textShadowRadius: 1,
        textShadowColor: "#000",
        textShadowOffset: {width: 1, height: 1},
    },
    itemSelectedColor: {
        color: "#fff",
        backgroundColor: '#004179',
    },
    itemUnselectedColor: {
        backgroundColor: '#fff',
    },
    brandImage: {
        width: 50, 
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