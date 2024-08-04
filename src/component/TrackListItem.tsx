import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import LoaderKit from 'react-native-loader-kit'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Image } from 'expo-image';
import { TrackShortcutsMenu } from './TrackShortcutsMenu'
import { StopPropagation } from './utils/StopPropagation'

export type TrackListItemProps = {
	track: Track
    onTrackSelect: (track: Track) => void
}

export const TrackListItem = ({track, onTrackSelect: handleTrackSelect} : TrackListItemProps) => {

    const isActiveTrack = useActiveTrack()?.uri === track.url

    // const { playing } = useIsPlaying()

    return (
        <TouchableHighlight onPress={() => handleTrackSelect(track)}>
            <View style={styles.trackItemContainer}>
               <View>
                    <Image 
                        source = {unknownTrackImageUri}
                        style = {styles.trackArtworkImage}
                     />

                    {/* {isActiveTrack &&
						(playing ? (
							<LoaderKit
								style={styles.trackPlayingIconIndicator}
								name="LineScaleParty"
								color={colors.icon}
							/>
						) : (
							<Ionicons
								style={styles.trackPausedIndicator}
								name="play"
								size={24}
								color={colors.icon}
							/>
					))} */}
                </View>
                <View 
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View style={{width : '100%'}}>
                        <Text numberOfLines={1} 
                            style = {{
                                ...styles.trackTitleText,
                                color: isActiveTrack ? colors.primary : colors.text,
                            }}
                            >
                                {track.title}
                        </Text>

                        {track.artist && (
				            <Text numberOfLines={1} style={styles.trackArtistText}>
					            {track.artist}
				            </Text>
			            )}
                    </View>

                    <StopPropagation>
						<TrackShortcutsMenu track={track}>
							<Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
						</TrackShortcutsMenu>
					</StopPropagation>
                </View>
                
            </View>
        </TouchableHighlight>
    )
     
}

const styles = StyleSheet.create({
    trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},  
    trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
    trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
    trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
    trackPlayingIconIndicator: {
		position: 'absolute',
		top: 18,
		left: 16,
		width: 16,
		height: 16,
	},
    trackPausedIndicator: {
		position: 'absolute',
		top: 14,
		left: 14,
	},
})