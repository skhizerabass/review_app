import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { THEME_COLOR, THEME_SECONDARY_COLOR } from '../constants/colors';
import { FORMAT } from '../constants/configs';

const Review = (props) => {
    // console.log(props);
    const { user } = props.user;
    return (
        <View style={{ ...props.style, marginTop: 20 }}>
            <View style={styles.user}>
                <Image style={styles.avatar} />
                <Text style={styles.name}>{props.customer}</Text>
                {user && (user.ID === props.reviewer_id || user.type === 'Admin') ?
                    <Icon name={'delete'} size={23} style={{ paddingLeft: 40 }} onPress={props.removeComment} color={THEME_SECONDARY_COLOR} />
                    : null}
                {user && user.type === "Owner" ?
                    <Icon name={'pencil'} size={23} style={{ paddingLeft: 40 }} onPress={props.onReply} color={THEME_SECONDARY_COLOR} />
                    : null}

            </View>
            <View style={styles.ratingView}>
                <Rating
                    type='star'
                    readonly
                    showReadOnlyText={false}
                    ratingBackgroundColor={'transparent'}
                    startingValue={props.rating}
                    style={{ alignSelf: 'flex-start', paddingTop: 5, borderWidth: 0 }}
                    imageSize={15}
                    isDisabled={true}
                />
                <Text style={styles.date}>{moment(props.visit).format(FORMAT)}</Text>
            </View>
            {props.content ?
                <Text style={styles.comment}>
                    {props.content}
                </Text> : null}
            {props.reply ?
                <View style={styles.reply}>
                    <View style={styles.user}>
                        <Text style={styles.name}>{props.replier}</Text>

                        <Text style={styles.date}>{moment(props.updated_at).format(FORMAT)}</Text>

                    </View>
                    <Text style={styles.comment}>
                        {props.reply}
                    </Text>

                </View> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    reply: {
        borderRadius: 2,
        marginTop: 10,
        backgroundColor: '#EAEAEA',
        padding: 10
    },
    comment: {
        marginLeft: 5,
        marginTop: 5,
        fontSize: 14,
        color: THEME_SECONDARY_COLOR
    },
    date: {
        fontSize: 12,
        color: '#A0A0A0',
        marginLeft: 10,
        textAlign: 'right',
        flex: 1,
        marginTop: 4
    },
    ratingView: {
        marginTop: 5,
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center'

    },
    avatar: {
        height: 30,
        marginRight: 5,
        width: 30,
        borderRadius: 30,
        backgroundColor: THEME_COLOR
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5,
        flex: 1,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center'
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
)(Review);
