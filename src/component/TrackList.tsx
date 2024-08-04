// import library from '@/assets/data/library.json'
import { TrackListItem } from "@/component/TrackListItem";
import {  FlatList, FlatListProps, Text, View } from 'react-native';
import { utilsStyles } from '@/styles';
import TrackPlayer, { Track, useActiveTrack } from 'react-native-track-player';
import { Image } from 'expo-image';
import { unknownTrackImageUri } from '@/constants/images';
import { useRef } from 'react';
import { useQueue } from '@/store/queue';
import { QueueControls } from './QueueControls'


export type TrackListProps = Partial<FlatListProps<Track>>  & {
    id: string
    track: Track[]
    hideQueueControls?: boolean
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TrackList = ({id, track, hideQueueControls = false, ...flatlistProps}: TrackListProps) =>{ 

	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()

    const handleTrackSelect = async (selectedTrack: Track) => {
        const trackIndex = track.findIndex((track) => track.url === selectedTrack.url)

		if (trackIndex === -1) return

		const isChangingQueue = id !== activeQueueId

		if (isChangingQueue) {
			const beforeTracks = track.slice(0, trackIndex)
			const afterTracks = track.slice(trackIndex + 1)

			await TrackPlayer.reset()

			// we construct the new queue
			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)

			await TrackPlayer.play()

			queueOffset.current = trackIndex
			setActiveQueueId(id)
		} else {
			const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? track.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current

			await TrackPlayer.skip(nextTrackIndex)
			TrackPlayer.play()
		}
    }

    return (
        <FlatList 
            data={track} 
            contentContainerStyle = {{paddingTop: 10, paddingBottom: 128}}
            ListHeaderComponent={
				!hideQueueControls ? (
					<QueueControls tracks={track} style={{ paddingBottom: 20 }} />
				) : undefined
			}
            ListFooterComponent = {ItemDivider}
            ItemSeparatorComponent={ItemDivider}
            ListEmptyComponent={
            <View>
                <Text style={utilsStyles.emptyContentText}>
                    Không tìm thấy kết quả
                </Text>

                <Image
					source={{uri: unknownTrackImageUri }}
					style={utilsStyles.emptyContentImage}
					cachePolicy="memory-disk"
				/>
            </View>}
            renderItem={({item: track}) => (
                <TrackListItem 
                    track={track} onTrackSelect={handleTrackSelect}
                />
            )}
            {...flatlistProps}
        />
    )
}