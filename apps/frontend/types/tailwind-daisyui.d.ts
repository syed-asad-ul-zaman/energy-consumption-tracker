declare module "daisyui" {
  import { PluginCreator } from "tailwindcss/types/config";

  interface DaisyUIConfig {
    themes?: string[] | boolean;
    darkTheme?: string;
    base?: boolean;
    styled?: boolean;
    utils?: boolean;
    prefix?: string;
    logs?: boolean;
    themeRoot?: string;
  }

  const plugin: PluginCreator<DaisyUIConfig>;
  export default plugin;
}

declare module "tailwindcss/types/config" {
  interface PluginCreator {
    (options?: DaisyUIConfig): { handler: () => void };
  }
}
