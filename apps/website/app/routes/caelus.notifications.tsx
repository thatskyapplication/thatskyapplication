import InfoBox from "~/components/InfoBox";
import Video from "~/components/Video";
import { APPLICATION_NAME } from "~/utility/constants";

export default function Notifications() {
	return (
		<div>
			<h1 className="mt-4">Notifications</h1>
			<hr />
			<p>
				If you're looking to be mentioned when the polluted geyser is going to erupt, when a strong
				shard eruption lands, when daily reset occurs, etc. you're in the right place!
			</p>
			<InfoBox>
				Ensure {APPLICATION_NAME} is added to a server! By default, the required permission for this
				command is <code>Manage Server</code>.
			</InfoBox>
			<h2>Setting up notifications</h2>
			<p>
				You'll need a channel to send notifications in and a role for {APPLICATION_NAME} to mention.
				Once you have both, it's time to use <code>/configure notifications</code>!
			</p>
			<Video src="https://cdn.thatskyapplication.com/examples/notifications_setup.mp4" />
			<p>
				When setting up notifications, you may choose an offset. Here, we chose an offset of 5
				minutes. This means we will get notifications about the polluted geyser erupting 5 minutes
				prior to it occurring.
			</p>
			<h2>What notifications have I got set up?</h2>
			<p>
				After a long time, you may wonder what you have set up. Simply use{" "}
				<code>/configure notifications</code> to see what's going on.
			</p>
			<h2>What will it look like?</h2>
			<p>
				When you first set up notifications, you may wonder what they look like, since it's likely
				not going to happen immediately. Check this out:
			</p>
			<img
				src="https://cdn.thatskyapplication.com/examples/notifications_example.webp"
				alt="Example of notifications in a channel."
				className="w-full max-w-lg rounded-md shadow-md"
			/>
			<p>
				As you can see, roles are mentioned when events occur with respect to the offset. Pretty
				nice!
			</p>
		</div>
	);
}
