import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        backgroundColor: '#005ead',
        paddingTop: 50,
    },
    title: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        margin: 16,
    },
    subtitle: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        margin: 16,
    },
    header: {
        backgroundColor: "#005ead",
        padding: 20,
    },
    button: {
        margin: 16,
        backgroundColor: "#004179",
        borderRadius: 50,
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
    buttonLogout: {
        margin: 16,
        backgroundColor: "#b91c1c",
        borderRadius: 50,
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: '#fff',
        fontSize: 19,
        textShadowRadius: 1,
        textShadowColor: "#000",
        textShadowOffset: {width: -1, height: 1},
    },
    arrowImage: {
        width: 17, 
        height: 30, 
        margin: 10,
        marginTop: 20,
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        margin: 16,
    }
});