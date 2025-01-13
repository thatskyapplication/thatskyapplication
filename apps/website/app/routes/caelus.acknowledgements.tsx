import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { APPLICATION_NAME, WIKI_URL } from "~/utility/constants";

export default function Acknowledgements() {
	return (
		<div>
			<h1 className="mt-4">Acknowledgements</h1>
			<hr />
			<p>
				{APPLICATION_NAME} has over 1,000 assets uploaded directly from the{" "}
				<a
					href={WIKI_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="regular-link inline-flex items-center transition duration-200"
				>
					Sky: Children of the Light
					<ArrowTopRightOnSquareIcon className="ml-1 w-4 h-4" />
				</a>{" "}
				wiki. We are thankful for them!
			</p>
		</div>
	);
}
