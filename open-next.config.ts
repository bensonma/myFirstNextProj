import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import { defineOpenNextConfig } from "@opennextjs/aws";

export default defineOpenNextConfig({
  ...defineCloudflareConfig(),
  external: ["pg-cloudflare"],
});
