import Video from "~/components/Video";

export default function Spirits() {
	return (
		<div>
			<h1 className="mt-4">Spirits</h1>
			<hr />
			<div className="flex flex-wrap items-center">
				<p>
					Don't know what spirits are? They're these ghost-like entities that follow you around when
					you first relive them. They offer cosmetics you can purchase for candles, hearts, ascended
					candles, etc.,
				</p>
				<p>
					If you wish to know more about a spirit, you can use the <code>/spirit search</code>{" "}
					command to reveal all the information you're looking for!
				</p>
			</div>
			<Video src="https://cdn.thatskyapplication.com/examples/spirit_search.mp4" />
			<p>
				You can search via the name, season, etc. and even non-spirits will show if there is a
				match, such as the entities in the
				<span className="inline-block">
					<img
						src="https://cdn.thatskyapplication.com/icons/shattering.png"
						alt="Season of Shattering icon"
						className="h-5 w-5 inline-block"
					/>
					<span>Season of Shattering.</span>
				</span>{" "}
				If applicable, you may even toggle between seasonal and non-seasonal friendship trees!
			</p>
			<p>
				Some spirits have promotional videos. These were when thatgamecompany created elaborate
				videos about the spirits, but after a while, they decreased in quality and they eventually
				stopped making them altogether.
			</p>
			<p>
				You can also check the travelling spirit dates and returning spirit dates at a glance. If
				you want more information, click the name of the spirit at the top of the embed to be taken
				to the wiki!
			</p>
		</div>
	);
}
