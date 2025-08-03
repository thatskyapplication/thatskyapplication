import {
	MediaControlBar,
	MediaController,
	MediaFullscreenButton,
	MediaPlayButton,
	MediaTimeDisplay,
	MediaTimeRange,
} from "media-chrome/react";

interface VideoOptions {
	src: string;
}

export default function Video({ src }: VideoOptions) {
	return (
		<div className="relative w-full max-w-3xl aspect-video rounded-md overflow-hidden">
			<MediaController className="absolute top-0 left-0 w-full h-full rounded-md shadow-md overflow-hidden">
				<video
					className="w-full h-full object-cover rounded-md"
					controls={false}
					muted={true}
					poster="https://cdn.thatskyapplication.com/assets/sunset_16_9.webp"
					preload="metadata"
					slot="media"
					src={src}
				/>
				<MediaControlBar>
					<MediaPlayButton />
					<MediaTimeRange />
					<MediaTimeDisplay showDuration={true} />
					<MediaFullscreenButton />
				</MediaControlBar>
			</MediaController>
		</div>
	);
}
