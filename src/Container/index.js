import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { COLOR, ThemeProvider} from 'react-native-material-ui';

const propTypes = {
    children: PropTypes.node.isRequired,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
const uiTheme = {
    palette: {
        primaryColor: COLOR.teal300,
        accentColor: COLOR.red500,
    },
};

class Container extends Component {
    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <View style={styles.container}>
                    {this.props.children}
                </View>
            </ThemeProvider>
        );
    }
}

Container.propTypes = propTypes;

export default Container;
