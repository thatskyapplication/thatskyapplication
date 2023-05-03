import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const Content = defineDocumentType(() => ({
	name: "Content",
	filePathPattern: `**/*.mdx`,
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		category: {
			type: "string",
			required: true,
		},
	},
	computedFields: {
		slug: {
			type: "string",
			// eslint-disable-next-line unicorn/prefer-string-replace-all
			resolve: (doc) => doc._raw.flattenedPath.replace(/\d+-/g, ""),
		},
		url: {
			type: "string",
			// eslint-disable-next-line unicorn/prefer-string-replace-all
			resolve: (doc) => `/features/${doc._raw.flattenedPath.replace(/\d+-/g, "")}`,
		},
	},
}));

export default makeSource({
	contentDirPath: "src/content",
	documentTypes: [Content],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeSlug],
	},
});
