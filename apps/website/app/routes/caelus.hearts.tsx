import Video from "~/components/Video";

export default function Hearts() {
	return (
		<div>
			<h1 className="mt-4">Hearts</h1>
			<hr />
			<h2>Gifting hearts</h2>
			<p>
				To gift a heart, you use the <code>/heart gift</code> command. I mean, that's it. Simple.
			</p>
			<p>
				You want a video of it? Well, say no more! Prepare to be shown the power of gifting hearts!
			</p>
			<Video src="https://cdn.thatskyapplication.com/examples/heart_gift_chat_input.mp4" />
			<p>
				You can gift up to 3 hearts per day. You can also simply right-click a user and gift a heart
				directly:
			</p>
			<img
				src="https://cdn.thatskyapplication.com/examples/heart_gift_context_menu.webp"
				alt="Showing how to gift hearts via the context menu."
				className="w-full max-w-lg rounded-md shadow-md"
			/>
			<p>After reading this, you're practically a professional. Time to share the love!</p>
			<h2>Viewing your heart history</h2>
			<p>
				Ever wanted to see your gifted and received hearts? You can invoke the{" "}
				<code>/heart history</code> command!
			</p>
			<img
				src="https://cdn.thatskyapplication.com/examples/heart_history.webp"
				alt="Showing the history of hearts."
				className="w-full max-w-lg rounded-md shadow-md"
			/>
			<p>
				You can see how many you have gifted and received in total. You may also navigate your
				history to see how much love you've shared!
			</p>
		</div>
	);
}
