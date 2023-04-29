import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const htmlPlugin = (title) => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), htmlPlugin(env.VITE_APP_NAME)],
    server: {
      port: env.VITE_PORT,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
        "@button": path.resolve(__dirname, "./src/components/Buttons/"),
        "@column": path.resolve(__dirname, "./src/components/Columns/"),
        "@datatable": path.resolve(__dirname, "./src/components/Datatable/"),
        "@detailtable": path.resolve(
          __dirname,
          "./src/components/DetailTable/"
        ),
        "@field": path.resolve(__dirname, "./src/components/Fields/"),
        "@filter": path.resolve(__dirname, "./src/components/Filters/"),
        "@icon": path.resolve(__dirname, "./src/components/Icons/"),
        "@layout": path.resolve(__dirname, "./src/components/Layouts/"),
        "@modal": path.resolve(__dirname, "./src/components/Modals/"),
        "@config": path.resolve(__dirname, "./src/config/"),
        "@constant": path.resolve(__dirname, "./src/constants/"),
        "@hook": path.resolve(__dirname, "./src/hooks/"),
        "@page": path.resolve(__dirname, "./src/pages/"),
        "@provider": path.resolve(__dirname, "./src/providers/"),
        "@reducer": path.resolve(__dirname, "./src/reducers/"),
        "@route": path.resolve(__dirname, "./src/routes/"),
        "@util": path.resolve(__dirname, "./src/utils/"),
      },
    },
  };
});
