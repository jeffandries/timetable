import os from "node:os";

const interfaces = os.networkInterfaces();
const addresses = Object.values(interfaces)
  .flatMap((entries) => entries ?? [])
  .filter((entry) => entry.family === "IPv4" && !entry.internal)
  .map((entry) => entry.address);

const preferredAddress =
  addresses.find((address) => address.startsWith("192.168.")) ??
  addresses.find((address) => address.startsWith("10.")) ??
  addresses.find((address) => address.startsWith("172.")) ??
  addresses[0];

if (!preferredAddress) {
  console.log("Could not detect a local network address.");
  console.log("Make sure Wi-Fi is connected, then try again.");
} else {
  console.log(`Mobile test URL: http://${preferredAddress}:3000`);
}
