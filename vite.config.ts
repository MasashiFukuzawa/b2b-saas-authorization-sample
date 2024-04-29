import pages from "@hono/vite-cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";

const baseConfig = {
	ssr: {
		external: ["@prisma/client", "@prisma/adapter-d1"],
	},
};

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			...baseConfig,
			plugins: [client()],
		};
	}
	return {
		...baseConfig,
		plugins: [
			honox({
				devServer: { adapter },
			}),
			pages(),
		],
	};
});
