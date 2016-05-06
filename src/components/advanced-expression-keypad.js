/**
 * A keypad that includes all of the advanced expression symbols.
 */

const React = require('react');
const { connect } = require('react-redux');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const EmptyKeypadButton = require('./empty-keypad-button');
const TouchableKeypadButton = require('./touchable-keypad-button');
const { row, column, oneColumn } = require('./styles');
const { borderStyles, switchTypes } = require('../consts');
const { cursorContextPropType, keyIdPropType } = require('./prop-types');
const KeyConfigs = require('../data/key-configs');
const CursorContexts = require('./input/cursor-contexts');
const { keypadSwitch } = require('../settings');

const AdvancedExpressionKeypad = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.number.isRequired,
        cursorContext: cursorContextPropType.isRequired,
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        showToggle: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
            showToggle: keypadSwitch === switchTypes.TOGGLE,
        };
    },

    render() {
        const { currentPage, cursorContext, showToggle } = this.props;

        const firstPage = <View style={[row, styles.fullPage]}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_7}
                    borders={borderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_4}
                    borders={borderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_1}
                    borders={borderStyles.BOTTOM}
                />
                {/* TODO(charlie): Replace with the many-symbol button. */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.x}
                    borders={borderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_8} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_5} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_2} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_0}
                    borders={borderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_9} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_6} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_3} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DECIMAL}
                    borders={borderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.FRAC_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.PARENS_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.MINUS} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.PLUS}
                    borders={borderStyles.LEFT}
                />
            </View>
        </View>;

        const secondPage = <View style={[row, styles.fullPage]}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EQUAL_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LESS_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.GREATER_MULTI} />
                <EmptyKeypadButton borders={borderStyles.LEFT} />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EXP_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.RADICAL_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LOG_MULTI} />
                <EmptyKeypadButton borders={borderStyles.LEFT} />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.SIN} />
                <TouchableKeypadButton keyConfig={KeyConfigs.COS} />
                <TouchableKeypadButton keyConfig={KeyConfigs.TAN} />
                <EmptyKeypadButton borders={borderStyles.LEFT} />
            </View>
        </View>;

        // TODO(charlie): Simplify after user-testing.
        let topNavigationKey;
        if (showToggle) {
            topNavigationKey = currentPage === 0 ? KeyConfigs.MORE
                                                 : KeyConfigs.NUMBERS;
        } else {
            topNavigationKey = KeyConfigs.LEFT;
        }

        // TODO(charlie): Enable this selectively. It's odd that we could show
        // two `RIGHT` keys right now.
        let dismissOrJumpOutKey;
        if (cursorContext === CursorContexts.NESTED) {
            dismissOrJumpOutKey = KeyConfigs.RIGHT;
        } else {
            dismissOrJumpOutKey = KeyConfigs.DISMISS;
        }

        const sidebar = <View style={[column, oneColumn]}>
            <TouchableKeypadButton
                keyConfig={topNavigationKey}
                borders={borderStyles.LEFT}
            />
            <TouchableKeypadButton
                keyConfig={KeyConfigs.RIGHT}
                borders={borderStyles.LEFT}
            />
            <TouchableKeypadButton
                keyConfig={KeyConfigs.BACKSPACE}
                borders={borderStyles.LEFT}
            />
            <TouchableKeypadButton
                keyConfig={dismissOrJumpOutKey}
                borders={borderStyles.LEFT}
            />
        </View>;

        return <TwoPageKeypad
            currentPage={currentPage}
            firstPage={firstPage}
            secondPage={secondPage}
            sidebar={sidebar}
        />;
    },
});

const styles = StyleSheet.create({
    fullPage: {
        flexBasis: '100%',
    },
});

const mapStateToProps = (state) => {
    return {
        currentPage: state.pager.currentPage,
        cursorContext: state.input.cursor.context,
    };
};

module.exports = connect(mapStateToProps)(AdvancedExpressionKeypad);
