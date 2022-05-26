import { sendMessage } from "webext-bridge";
import browser from "webextension-polyfill";

browser.browserAction.onClicked.addListener(async (currentTab) => {
  void sendMessage("action", null, `content-script@${currentTab.id}`);
});
