import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        backgroundColor: '#005ead',
        paddingTop: 100,
    },
    container: {
        backgroundColor: '#005ead',
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    loadingText: {
        textAlign: 'center',
        padding: 30,
        color: '#f4f4f4',
        fontSize: 25,
        textShadowRadius: 5,
        textShadowColor: "#00357d",
        textShadowOffset: {width: -2, height: 2},
        fontWeight: "bold",
    },
    elementContainer: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
    emptyElementContainer: {
        flex: 2, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
});