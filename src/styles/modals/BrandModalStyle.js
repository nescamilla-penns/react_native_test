import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#005ead',
    },
    buttonsContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'stretch',
    },
    title: {
        textAlign: "center",
        fontSize: 23,
        fontWeight: "800",
        color: "#fff",
        marginTop: 80,
        marginBottom: 20,
    },
    subtitle: {
        color: '#fff',
        paddingBottom: 10,
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
        width: 280,
    },
    button: {
        margin: 20,
        backgroundColor: "#004179",
        borderRadius: 50,
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
        fontSize: 19,
    },
    externalButtonContainer: {
        flex: 1,
    },
});