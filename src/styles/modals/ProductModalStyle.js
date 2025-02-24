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
        justifyContent: 'flex-end', 
        alignItems: 'stretch',
    },
    label: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: "800",
        color: "#ffffff",
        marginTop: 15,
    },
    pickerComponent: {
        height: 50, 
        width: 190,
        color: '#fff',
    },
    title: {
        textAlign: "center",
        fontSize: 23,
        fontWeight: "800",
        color: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        marginTop: 20,
        marginBottom: 15,
    },
    subtitle: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "800",
        color: "#fff",
        marginTop: 40,
        marginBottom: 15,
    },
    inputForm: {
        borderColor: '#999',
        borderWidth: 1,
        margin: 8,
        fontSize: 18,
        fontWeight: '400',
        color: '#000',
        backgroundColor: "#fff",
        borderRadius: 50,
        width: 280,
        paddingLeft: 15,
    },
    button: {
        margin: 20,
        backgroundColor: "#004179",
        borderRadius: 50,
    },
    cameraContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgrounColor: '#000',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonsCameraContainer: {
        flex: 1,
        // marginTop: 600,
        marginBottom: 50,
        justifyContent: 'center',
        flexDirection: 'row', 
        alignItems: 'space-between',
    },
    buttonClose: {
        margin: 5,
        height: 70,
        width: 70,
        borderRadius: 40,
        backgroundColor: 'red',
        borderWidth: 3,
        borderColor: 'black',
    },
    buttonCamera: {
        margin: 5,
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: '#B2BEB5',
        borderWidth: 4,
        borderColor: 'white',
    },
    buttonBack: {
        margin: 15,
        marginRight: 50,
        height: 60,
        width: 60,
        backgroundColor: "#004179",
        borderRadius: 40,
    },
    buttonConfirm: {
        margin: 15,
        marginLeft: 50,
        height: 60,
        width: 60,
        backgroundColor: "#004179",
        borderRadius: 40,
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
        fontSize: 19,
    },
    buttonIcon: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
    },
    externalButtonContainer: {
        flex: 1,
    },
});