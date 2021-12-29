import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { THEME_ACCENT_COLOR, THEME_COLOR, THEME_SECONDARY_COLOR } from '../constants/colors';

const RestaurantItem = (props) => {
    const { rating } = props;
    return (
        <TouchableOpacity onLongPress={!props.updateRestaurant ? () => { } : props.updateRestaurant} style={styles.container} onPress={props.onPress}>
            <Image style={styles.image} />
            {props.reviewed &&
                <View style={styles.reviewed}><Text style={styles.textReview}>Reviewed</Text></View>}

            <View style={styles.rightView}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{props.index + 1}. {props.Name}</Text>
                    <View style={styles.ratingView}>
                        <Rating
                            readonly
                            showReadOnlyText={false}
                            type='star'
                            ratingBackgroundColor={'transparent'}
                            startingValue={!props.rating ? 0 : rating.rating / rating.count}
                            style={{ alignSelf: 'flex-start', paddingTop: 5, borderWidth: 0 }}
                            imageSize={15}
                            isDisabled={true}
                        />
                        <Text style={styles.reviewsCount}>({rating ? rating.count : 0})</Text>
                    </View>
                    <Text style={styles.category}>{props.Category}</Text>
                </View>
                {props.reviewed &&
                    <Text style={styles.date}>Last Visit 24th Oct 2020</Text>}
            </View>
            {props.admin ?
                <Icon name={'delete'} size={23} style={{ paddingLeft: 40, alignSelf: 'center' }} onPress={props.removeRestaurant} color={THEME_SECONDARY_COLOR} />
                : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reviewsCount: {
        fontSize: 12,
        marginTop: 5,
        color: '#AEAEAE',
        marginLeft: 5,
    },
    date: {
        fontSize: 12,
        color: '#AEAEAE',
        alignContent: 'flex-end'
    },
    textReview: {
        fontStyle: 'italic',
        fontSize: 12,
        paddingRight: 10,
        paddingLeft: 4,
        paddingVertical: 2,
        borderRadius: 5,
        color: 'white',
        backgroundColor: THEME_ACCENT_COLOR
    },
    reviewed: {
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    category: {
        fontSize: 14,
        color: THEME_SECONDARY_COLOR
    },
    ratingView: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    rightView: {
        flex: 1,
        marginLeft: 10
    },
    title: {
        color: THEME_SECONDARY_COLOR,
        fontSize: 16
    },
    container: {
        flexDirection: 'row',
        borderBottomColor: '#EAEAEA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1
    },
    image: {
        backgroundColor: THEME_COLOR,
        borderRadius: 5,
        height: 100,
        width: 100
    }

})

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RestaurantItem);
