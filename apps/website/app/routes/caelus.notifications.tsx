import { enGB, NOTIFICATION_TYPE_VALUES } from "@thatskyapplication/utility";
import { Bell, Zap } from "lucide-react";
import Permissions from "~/components/Permissions";
import { APPLICATION_NAME } from "~/utility/constants";

export default function Notifications() {
	return (
		<div className="relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-10 right-10 w-20 h-20 bg-amber-200/20 dark:bg-amber-400/10 rounded-full blur-xl animate-pulse" />
				<div
					className="absolute bottom-20 left-10 w-32 h-32 bg-orange-200/20 dark:bg-orange-400/10 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "1.5s" }}
				/>
			</div>
			<div className="relative z-10">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full mb-4">
						<Bell className="w-8 h-8 text-amber-600 dark:text-amber-400" />
					</div>
					<h1 className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
						Notifications
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Never miss important Sky events with automated notifications!
					</p>
				</div>
				<hr className="my-8" />
				<Permissions
					userPermissions={["Manage Server"]}
					appPermissions={[
						"Send Messages",
						"View Channel",
						"Mention @everyone, @here and All Roles",
					]}
				/>
				<section className="space-y-6">
					<h2>Setting up notifications</h2>
					<p>
						You'll need a channel to send notifications in and a role for {APPLICATION_NAME} to
						mention. Once you have both, it's time to use <code>/configure notifications</code>!
					</p>
					<p>
						When setting up notifications, you may choose an offset. For example, choosing an offset
						of 5 minutes means you will get notifications about the polluted geyser erupting 5
						minutes prior to it occurring.
					</p>
				</section>
				<section className="space-y-6">
					<h2>What notifications are available?</h2>
					<div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-700/50 rounded-xl p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
								<Bell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
							</div>
							<h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-0">
								Available Notification Types
							</h3>
						</div>
						<div className="grid md:grid-cols-2 gap-4">
							{NOTIFICATION_TYPE_VALUES.map((notification) => (
								<div
									key={notification}
									className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm"
								>
									<h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
										<Bell className="w-4 h-4 text-purple-600 dark:text-purple-400" />
										{enGB.general["notification-types"][notification]}
									</h4>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className="space-y-6">
					<h2>What will it look like?</h2>
					<p>
						When you first set up notifications, you may wonder what they look like, since it's
						likely not going to happen immediately. Check this out:
					</p>
					<div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/50 rounded-xl p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
								<Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
							</div>
							<h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-0">
								Example Notification
							</h3>
						</div>
						<img
							src="https://cdn.thatskyapplication.com/assets/notifications_example.webp"
							alt="Example of notifications in a channel showing polluted geyser alerts with role mentions"
							className="w-full max-w-lg rounded-md shadow-md border border-gray-200 dark:border-gray-600"
						/>
						<div className="mt-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
							<p className="text-green-800 dark:text-green-300 text-sm m-0 flex items-start gap-2">
								<Bell className="w-4 h-4 mt-0.5 flex-shrink-0" />
								As you can see, roles are mentioned when events occur with respect to the offset.
								Pretty nice!
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
