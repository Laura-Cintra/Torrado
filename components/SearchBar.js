import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

export default function SearchBar({ value, onChangeText, placeholder }) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color={colors.branco} />
            <TextInput
                style={styles.inputSearch}
                placeholder={placeholder}
                placeholderTextColor={colors.cinzaEscuro}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: colors.marromClaro,
        borderRadius: 20,
        paddingHorizontal: 12,
        marginBottom: 16,
        color: colors.texto,
    },
    inputSearch: {
        flex: 1,
        marginLeft: 8,
        color: colors.branco,
        borderWidth: 0,
        height: '100%',
        outlineStyle: 'none',
    },
});
