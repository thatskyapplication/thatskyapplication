import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { APPLICATION_NAME } from "~/utility/constants";

interface PermissionsProps {
	userPermissions: string[];
	appPermissions: string[];
}

export default function Permissions({ userPermissions, appPermissions }: PermissionsProps) {
	const [permissionsExpanded, setPermissionsExpanded] = useState(false);

	return (
		<div className="my-4">
			<button
				type="button"
				onClick={() => setPermissionsExpanded(!permissionsExpanded)}
				className={
					"flex items-center gap-2 text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
				}
			>
				{permissionsExpanded ? (
					<ChevronDown className="w-4 h-4" />
				) : (
					<ChevronRight className="w-4 h-4" />
				)}
				<span className="text-sm font-medium">Permissions</span>
			</button>
			{permissionsExpanded && (
				<div
					className={
						"mt-3 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700 border rounded-lg p-4"
					}
				>
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<span className={"text-amber-700 dark:text-amber-300 text-sm"}>
								<strong>You:</strong>{" "}
								{userPermissions.map((permission, index) => (
									<span key={permission}>
										<code>{permission}</code>
										{index < userPermissions.length - 1 && " "}
									</span>
								))}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className={"text-amber-700 dark:text-amber-300 text-sm"}>
								<strong>{APPLICATION_NAME}:</strong>{" "}
								{appPermissions.map((permission, index) => (
									<span key={permission}>
										<code>{permission}</code>
										{index < appPermissions.length - 1 && " "}
									</span>
								))}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
