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
				shard eruption lands, when daily reset occurs, etc., you're in the right place!
			</p>
			<InfoBox>
				Ensure {APPLICATION_NAME} is added to a server! By default, the required permission for this
				command is <code>Manage Server</code>.
			</InfoBox>
			<h2>Setting up notifications</h2>
			<p>
				You'll need a channel to send notifications in and a role for {APPLICATION_NAME} to mention.
				Once you have both, it's time to use <code>/notifications setup</code>!
			</p>
			<Video src="https://cdn.thatskyapplication.com/examples/notifications_setup.mp4" />
			<p>
				When setting up notifications, you may choose an offset. Here, we chose an offset of 5
				minutes. This means we will get notifications about the polluted geyser erupting 5 minutes
				prior to it occurring.
			</p>
			<h2>What notifications have I got set up?</h2>
			<p>
				After a long time, you may wonder what you have set up. It's only natural. At any point, you
				can use the <code>/notifications status</code> command to see what's going on, which is
				identical to the feedback you receive when you set up notifications.
			</p>
			<img
				src="https://cdn.thatskyapplication.com/examples/notifications_status.webp"
				alt="Showing the status of notifications."
				className="w-full max-w-lg rounded-md shadow-md"
			/>
			<p>
				You can see our offset of 5 is still here. Also, we can see every other kind of
				notification. Since none of them have been set up, they all appear as stopped. This may also
				be the case if {APPLICATION_NAME} suddenly lacks permissions to send notifications.
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
			<h2>Removing notifications</h2>
			<p>
				No longer want a notification? That's what <code>/notifications unset</code> is for. Let's
				remove that polluted geyser notification we had set up earlier:
			</p>
			<Video src="https://cdn.thatskyapplication.com/examples/notifications_unset.mp4" />
			<p>That's all there is to it.</p>
		</div>
	);
}
